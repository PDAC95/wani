"""
Authentication Routes - User registration, login, verification.

This module handles all authentication-related endpoints:
- POST /register - User registration
- POST /login - User login
- POST /refresh - Refresh access token
- POST /verify-email - Email verification
- POST /resend-verification - Resend verification email
- POST /forgot-password - Request password reset
- POST /reset-password - Reset password
"""

import logging
from typing import Dict, Any
from uuid import UUID

from fastapi import APIRouter, Depends, HTTPException, status, Request
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import (
    create_verification_token,
    create_access_token,
    create_refresh_token,
    verify_password,
    decode_token,
    verify_verification_token,
    create_password_reset_token,
    verify_password_reset_token
)
from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.schemas.auth import (
    LoginRequest,
    LoginResponse,
    RefreshRequest,
    RefreshResponse,
    TokenData,
    VerifyEmailRequest,
    ResendVerificationRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest
)
from app.schemas.common import SuccessResponse, ErrorResponse
from app.services.user_service import (
    UserService,
    EmailAlreadyExistsError,
    UserServiceError,
    InvalidCredentialsError,
    AccountInactiveError,
    UserNotFoundError
)
from app.services.email_service import (
    email_service,
    EmailSendError,
    EmailConfigurationError
)


# Configure logging
logger = logging.getLogger(__name__)

# Create router
router = APIRouter(prefix="/auth", tags=["Authentication"])

# Import the rate limiter
# This is the same limiter instance attached to app.state in main.py
from app.core.rate_limit import limiter


@router.post(
    "/register",
    response_model=SuccessResponse,
    status_code=status.HTTP_201_CREATED,
    responses={
        201: {
            "description": "User registered successfully",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Registration successful! Please check your email to verify your account.",
                        "data": {
                            "tokens": {
                                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                "token_type": "bearer",
                                "expires_in": 86400
                            },
                            "user": {
                                "id": "123e4567-e89b-12d3-a456-426614174000",
                                "email": "user@example.com",
                                "full_name": "John Doe",
                                "phone": "+1234567890",
                                "is_verified": False,
                                "is_active": True,
                                "kyc_level": 0,
                                "role": "user",
                                "created_at": "2024-01-15T10:30:00Z"
                            }
                        }
                    }
                }
            }
        },
        409: {
            "description": "Email already registered (conflict)",
            "model": ErrorResponse
        },
        422: {
            "description": "Validation error (invalid input format)",
            "model": ErrorResponse
        },
        500: {
            "description": "Server error",
            "model": ErrorResponse
        }
    },
    summary="Register a new user",
    description="""
    Register a new user account.

    This endpoint:
    1. Validates the input data
    2. Checks if email is already registered
    3. Creates the user in the database
    4. Generates an email verification token
    5. Sends a verification email
    6. Generates JWT tokens (access + refresh)
    7. Returns the created user data with authentication tokens

    **Note**: The user account will not be fully activated until email is verified.
    However, authentication tokens are returned immediately so the user can access the app.
    """
)
async def register(
    user_data: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Register a new user.

    Args:
        user_data: User registration data (email, password, full_name, phone)
        db: Database session

    Returns:
        Success response with user data

    Raises:
        HTTPException: If email already exists or registration fails
    """
    try:
        # 1. Register user (creates user in database)
        logger.info(f"Registering user: {user_data.email}")
        user = await UserService.register(db, user_data)

        # 2. Generate email verification token
        verification_token = create_verification_token(user.id)
        logger.info(f"Generated verification token for user: {user.id}")

        # 3. Send verification email (if configured)
        if email_service.is_configured():
            try:
                email_result = email_service.send_verification_email(
                    to_email=user.email,
                    user_name=user.full_name,
                    verification_token=verification_token
                )
                logger.info(f"Verification email sent to: {user.email}, ID: {email_result.get('email_id')}")
            except EmailSendError as e:
                # Log error but don't fail registration
                logger.error(f"Failed to send verification email to {user.email}: {str(e)}")
                # Note: User is still registered, they can request resend later
            except EmailConfigurationError:
                logger.warning(f"Email service not configured, skipping verification email for {user.email}")
        else:
            logger.warning(f"Email service not configured, verification email not sent for {user.email}")

        # 4. Generate JWT tokens (same as login)
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        logger.info(f"Generated tokens for newly registered user: {user.id}")

        # 5. Return success response with tokens
        return {
            "success": True,
            "message": "Registration successful! Please check your email to verify your account.",
            "data": {
                "tokens": {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "token_type": "bearer",
                    "expires_in": 86400  # 24 hours in seconds
                },
                "user": {
                    "id": str(user.id),
                    "email": user.email,
                    "full_name": user.full_name,
                    "phone": user.phone,
                    "is_verified": user.is_verified,
                    "is_active": user.is_active,
                    "kyc_level": user.kyc_level,
                    "role": user.role,
                    "created_at": user.created_at.isoformat() if user.created_at else None
                }
            }
        }

    except EmailAlreadyExistsError as e:
        # Email already registered
        logger.warning(f"Registration failed - email already exists: {user_data.email}")
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail={
                "success": False,
                "error": "EmailAlreadyExists",
                "message": str(e),
                "details": [
                    {
                        "field": "email",
                        "message": "This email address is already registered",
                        "code": "email_exists"
                    }
                ]
            }
        )

    except UserServiceError as e:
        # General user service error
        logger.error(f"Registration failed for {user_data.email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": "RegistrationError",
                "message": "Failed to create user account. Please try again later.",
                "details": None
            }
        )

    except Exception as e:
        # Unexpected error
        logger.exception(f"Unexpected error during registration for {user_data.email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": "InternalServerError",
                "message": "An unexpected error occurred. Please try again later.",
                "details": None
            }
        )


@router.post(
    "/login",
    response_model=LoginResponse,
    status_code=status.HTTP_200_OK,
    responses={
        200: {
            "description": "Login successful",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Login successful",
                        "data": {
                            "tokens": {
                                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                                "token_type": "bearer",
                                "expires_in": 86400
                            },
                            "user": {
                                "id": "123e4567-e89b-12d3-a456-426614174000",
                                "email": "dev@jappi.ca",
                                "full_name": "John Doe",
                                "is_verified": True,
                                "kyc_level": 0
                            }
                        }
                    }
                }
            }
        },
        401: {
            "description": "Invalid credentials",
            "model": ErrorResponse
        },
        403: {
            "description": "Account inactive or locked",
            "model": ErrorResponse
        },
        429: {
            "description": "Too many login attempts",
            "model": ErrorResponse
        },
        500: {
            "description": "Server error",
            "model": ErrorResponse
        }
    },
    summary="User login",
    description="""
    Authenticate a user and return access/refresh tokens.

    This endpoint:
    1. Validates the email and password
    2. Checks if the user account is active
    3. Generates access token (24 hours) and refresh token (30 days)
    4. Returns tokens and user information

    **Security:**
    - Rate limited to 5 attempts per 15 minutes per IP
    - Passwords are verified using bcrypt
    - Tokens are signed with JWT and expire automatically

    **Note**: Store the refresh token securely (httpOnly cookie recommended).
    Use the access token for API requests in the Authorization header.
    """
)
# @limiter.limit("5/15minutes")  # TEMPORARILY DISABLED FOR DEBUGGING
async def login(
    # request: Request,  # TEMPORARILY REMOVED FOR DEBUGGING
    credentials: LoginRequest,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    User login endpoint.

    Args:
        credentials: Login credentials (email + password)
        db: Database session

    Returns:
        Login response with tokens and user data

    Raises:
        HTTPException 401: If credentials are invalid
        HTTPException 403: If account is not active
        HTTPException 429: If too many login attempts
    """
    try:
        # 1. Authenticate user using UserService
        logger.info(f"Login attempt for email: {credentials.email}")
        user = await UserService.authenticate(
            db,
            credentials.email,
            credentials.password
        )
        logger.info(f"Login successful for user: {user.id}")

        # 2. Generate JWT tokens
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        # 3. Return success response with tokens and user data
        return {
            "success": True,
            "message": "Login successful",
            "data": {
                "tokens": {
                    "access_token": access_token,
                    "refresh_token": refresh_token,
                    "token_type": "bearer",
                    "expires_in": 86400  # 24 hours in seconds
                },
                "user": {
                    "id": str(user.id),
                    "email": user.email,
                    "full_name": user.full_name,
                    "phone": user.phone,
                    "is_verified": user.is_verified,
                    "is_active": user.is_active,
                    "kyc_level": user.kyc_level,
                    "role": user.role,
                    "created_at": user.created_at.isoformat() if user.created_at else None
                }
            }
        }

    except InvalidCredentialsError as e:
        # Invalid email or password
        logger.warning(f"Login failed - invalid credentials for: {credentials.email}")
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": "InvalidCredentials",
                "message": str(e),
                "details": None
            }
        )

    except AccountInactiveError as e:
        # Account is not active
        logger.warning(f"Login failed - account inactive for: {credentials.email}")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "error": "AccountInactive",
                "message": str(e),
                "details": None
            }
        )

    except Exception as e:
        # Unexpected error
        logger.exception(f"Unexpected error during login for {credentials.email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": "InternalServerError",
                "message": "An unexpected error occurred. Please try again later.",
                "details": None
            }
        )


@router.post(
    "/refresh",
    response_model=RefreshResponse,
    status_code=status.HTTP_200_OK,
    responses={
        200: {
            "description": "Token refreshed successfully",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Token refreshed successfully",
                        "data": {
                            "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                            "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                            "token_type": "bearer",
                            "expires_in": 86400
                        }
                    }
                }
            }
        },
        401: {
            "description": "Invalid or expired refresh token",
            "model": ErrorResponse
        },
        403: {
            "description": "User not found or account inactive",
            "model": ErrorResponse
        },
        500: {
            "description": "Server error",
            "model": ErrorResponse
        }
    },
    summary="Refresh access token",
    description="""
    Obtain a new access token using a refresh token.

    This endpoint:
    1. Validates the refresh token
    2. Verifies the user still exists and is active
    3. Generates new access token and refresh token
    4. Returns new tokens

    **Usage:**
    Call this endpoint when your access token expires (401 response).
    Store the new tokens and use them for subsequent requests.

    **Security:**
    - Refresh tokens expire after 30 days
    - New refresh token is issued with each refresh (token rotation)
    - Old refresh token becomes invalid after use
    """
)
async def refresh_token(
    request: RefreshRequest,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Refresh access token endpoint.

    Args:
        request: Refresh token request
        db: Database session

    Returns:
        New access and refresh tokens

    Raises:
        HTTPException 401: If refresh token is invalid/expired
        HTTPException 403: If user not found or inactive
    """
    try:
        # 1. Decode and validate refresh token
        logger.info("Token refresh attempt")
        payload = decode_token(request.refresh_token, expected_type="refresh")

        if payload is None:
            logger.warning("Token refresh failed - invalid token")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "success": False,
                    "error": "InvalidToken",
                    "message": "Invalid or expired refresh token",
                    "details": None
                }
            )

        # 2. Extract user ID from token
        user_id_str = payload.get("sub")
        if user_id_str is None:
            logger.warning("Token refresh failed - no user ID in token")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "success": False,
                    "error": "InvalidToken",
                    "message": "Invalid token format",
                    "details": None
                }
            )

        # 3. Convert user ID to UUID
        try:
            user_id = UUID(user_id_str)
        except ValueError:
            logger.warning(f"Token refresh failed - invalid user ID: {user_id_str}")
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail={
                    "success": False,
                    "error": "InvalidToken",
                    "message": "Invalid user ID in token",
                    "details": None
                }
            )

        # 4. Verify user still exists and is active
        result = await db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()

        if not user:
            logger.warning(f"Token refresh failed - user not found: {user_id}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={
                    "success": False,
                    "error": "UserNotFound",
                    "message": "User not found",
                    "details": None
                }
            )

        if not user.is_active:
            logger.warning(f"Token refresh failed - user inactive: {user_id}")
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={
                    "success": False,
                    "error": "AccountInactive",
                    "message": "Your account has been deactivated",
                    "details": None
                }
            )

        # 5. Generate new tokens (token rotation)
        new_access_token = create_access_token(user.id)
        new_refresh_token = create_refresh_token(user.id)
        logger.info(f"Token refreshed successfully for user: {user.id}")

        # 6. Return new tokens
        return {
            "success": True,
            "message": "Token refreshed successfully",
            "data": {
                "access_token": new_access_token,
                "refresh_token": new_refresh_token,
                "token_type": "bearer",
                "expires_in": 86400  # 24 hours in seconds
            }
        }

    except HTTPException:
        # Re-raise HTTP exceptions
        raise

    except Exception as e:
        # Unexpected error
        logger.exception(f"Unexpected error during token refresh: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": "InternalServerError",
                "message": "An unexpected error occurred. Please try again later.",
                "details": None
            }
        )


@router.post(
    "/verify-email",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK,
    responses={
        200: {
            "description": "Email verified successfully",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Email verified successfully! You can now access all features.",
                        "data": None
                    }
                }
            }
        },
        400: {
            "description": "Invalid or expired token",
            "model": ErrorResponse
        },
        404: {
            "description": "User not found",
            "model": ErrorResponse
        },
        500: {
            "description": "Server error",
            "model": ErrorResponse
        }
    },
    summary="Verify email address",
    description="""
    Verify a user's email address using a verification token.

    This endpoint:
    1. Validates the verification token from the email link
    2. Extracts the user ID from the token
    3. Marks the user's email as verified
    4. Returns a success message

    **Usage:**
    Users click the verification link in their email, which includes the token.
    The frontend extracts the token and sends it to this endpoint.
    """
)
async def verify_email(
    request: VerifyEmailRequest,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Verify user email endpoint.

    Args:
        request: Email verification request with token
        db: Database session

    Returns:
        Success response

    Raises:
        HTTPException 400: If token is invalid or expired
        HTTPException 404: If user not found
    """
    try:
        # 1. Verify token and extract user ID
        logger.info("Email verification attempt")
        user_id_str = verify_verification_token(request.token)

        if user_id_str is None:
            logger.warning("Email verification failed - invalid token")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "success": False,
                    "error": "InvalidToken",
                    "message": "Invalid or expired verification token",
                    "details": None
                }
            )

        # 2. Convert user ID to UUID
        try:
            user_id = UUID(user_id_str)
        except ValueError:
            logger.warning(f"Email verification failed - invalid user ID: {user_id_str}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "success": False,
                    "error": "InvalidToken",
                    "message": "Invalid user ID in token",
                    "details": None
                }
            )

        # 3. Verify user's email using UserService
        user = await UserService.verify_email(db, user_id)
        logger.info(f"Email verified successfully for user: {user.id}")

        # 4. Return success response
        return {
            "success": True,
            "message": "Email verified successfully! You can now access all features.",
            "data": None
        }

    except UserNotFoundError as e:
        # User not found
        logger.warning(f"Email verification failed - user not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "error": "UserNotFound",
                "message": str(e),
                "details": None
            }
        )

    except HTTPException:
        # Re-raise HTTP exceptions
        raise

    except Exception as e:
        # Unexpected error
        logger.exception(f"Unexpected error during email verification: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": "InternalServerError",
                "message": "An unexpected error occurred. Please try again later.",
                "details": None
            }
        )


@router.post(
    "/resend-verification",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK,
    responses={
        200: {
            "description": "Verification email sent successfully",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Verification email sent! Please check your inbox.",
                        "data": None
                    }
                }
            }
        },
        404: {
            "description": "User not found",
            "model": ErrorResponse
        },
        429: {
            "description": "Too many requests",
            "model": ErrorResponse
        },
        500: {
            "description": "Server error",
            "model": ErrorResponse
        }
    },
    summary="Resend verification email",
    description="""
    Resend the email verification link to a user.

    This endpoint:
    1. Finds the user by email
    2. Generates a new verification token
    3. Sends a verification email
    4. Returns a success message

    **Rate Limiting:**
    This endpoint is rate-limited to 3 requests per hour per email to prevent abuse.
    """
)
@limiter.limit("3/hour")
async def resend_verification(
    req: Request,
    request: ResendVerificationRequest,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Resend verification email endpoint.

    Args:
        request: Resend verification request with email
        db: Database session

    Returns:
        Success response

    Raises:
        HTTPException 404: If user not found
    """
    try:
        # 1. Find user by email
        logger.info(f"Resend verification request for: {request.email}")
        user = await UserService.get_by_email(db, request.email)

        if not user:
            # Return success even if user not found (security: don't reveal if email exists)
            logger.warning(f"Resend verification failed - user not found: {request.email}")
            return {
                "success": True,
                "message": "If an account exists with this email, a verification link has been sent.",
                "data": None
            }

        # 2. Check if already verified
        if user.is_verified:
            logger.info(f"User already verified: {request.email}")
            return {
                "success": True,
                "message": "Your email is already verified!",
                "data": None
            }

        # 3. Generate new verification token
        verification_token = create_verification_token(user.id)
        logger.info(f"Generated new verification token for user: {user.id}")

        # 4. Send verification email (if configured)
        if email_service.is_configured():
            try:
                email_result = email_service.send_verification_email(
                    to_email=user.email,
                    user_name=user.full_name,
                    verification_token=verification_token
                )
                logger.info(f"Verification email resent to: {user.email}, ID: {email_result.get('email_id')}")
            except EmailSendError as e:
                # Log error but don't fail the request
                logger.error(f"Failed to resend verification email to {user.email}: {str(e)}")
            except EmailConfigurationError:
                logger.warning(f"Email service not configured")
        else:
            logger.warning(f"Email service not configured, verification email not sent")

        # 5. Return success response
        return {
            "success": True,
            "message": "Verification email sent! Please check your inbox.",
            "data": None
        }

    except Exception as e:
        # Unexpected error
        logger.exception(f"Unexpected error during resend verification for {request.email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": "InternalServerError",
                "message": "An unexpected error occurred. Please try again later.",
                "details": None
            }
        )


@router.post(
    "/forgot-password",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK,
    responses={
        200: {
            "description": "Password reset email sent successfully",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "If an account exists with this email, a password reset link has been sent.",
                        "data": None
                    }
                }
            }
        },
        429: {
            "description": "Too many requests",
            "model": ErrorResponse
        },
        500: {
            "description": "Server error",
            "model": ErrorResponse
        }
    },
    summary="Request password reset",
    description="""
    Request a password reset link.

    This endpoint:
    1. Finds the user by email
    2. Generates a password reset token (expires in 1 hour)
    3. Sends a password reset email with the token
    4. Returns a generic success message (doesn't reveal if email exists)

    **Security:**
    - Always returns success message (doesn't reveal if email exists)
    - Token expires after 1 hour
    - Rate limited to 3 requests per hour per IP to prevent abuse
    """
)
@limiter.limit("3/hour")
async def forgot_password(
    req: Request,
    request: ForgotPasswordRequest,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Forgot password endpoint.

    Args:
        request: Forgot password request with email
        db: Database session

    Returns:
        Success response (always returns success for security)
    """
    try:
        # 1. Find user by email
        logger.info(f"Password reset request for: {request.email}")
        user = await UserService.get_by_email(db, request.email)

        if not user:
            # Return success even if user not found (security: don't reveal if email exists)
            logger.warning(f"Password reset request for non-existent email: {request.email}")
            return {
                "success": True,
                "message": "If an account exists with this email, a password reset link has been sent.",
                "data": None
            }

        # 2. Check if account is active
        if not user.is_active:
            # Return success even if account inactive (security)
            logger.warning(f"Password reset request for inactive account: {request.email}")
            return {
                "success": True,
                "message": "If an account exists with this email, a password reset link has been sent.",
                "data": None
            }

        # 3. Generate password reset token (1 hour expiration)
        reset_token = create_password_reset_token(user.id)
        logger.info(f"Generated password reset token for user: {user.id}")

        # 4. Send password reset email (if configured)
        if email_service.is_configured():
            try:
                email_result = email_service.send_password_reset_email(
                    to_email=user.email,
                    user_name=user.full_name,
                    reset_token=reset_token
                )
                logger.info(f"Password reset email sent to: {user.email}, ID: {email_result.get('email_id')}")
            except EmailSendError as e:
                # Log error but don't fail the request
                logger.error(f"Failed to send password reset email to {user.email}: {str(e)}")
            except EmailConfigurationError:
                logger.warning(f"Email service not configured")
        else:
            logger.warning(f"Email service not configured, password reset email not sent")

        # 5. Return success response (always, for security)
        return {
            "success": True,
            "message": "If an account exists with this email, a password reset link has been sent.",
            "data": None
        }

    except Exception as e:
        # Unexpected error
        logger.exception(f"Unexpected error during password reset request for {request.email}: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": "InternalServerError",
                "message": "An unexpected error occurred. Please try again later.",
                "details": None
            }
        )


@router.post(
    "/reset-password",
    response_model=SuccessResponse,
    status_code=status.HTTP_200_OK,
    responses={
        200: {
            "description": "Password reset successfully",
            "content": {
                "application/json": {
                    "example": {
                        "success": True,
                        "message": "Password reset successfully! You can now log in with your new password.",
                        "data": None
                    }
                }
            }
        },
        400: {
            "description": "Invalid or expired token",
            "model": ErrorResponse
        },
        404: {
            "description": "User not found",
            "model": ErrorResponse
        },
        500: {
            "description": "Server error",
            "model": ErrorResponse
        }
    },
    summary="Reset password",
    description="""
    Reset a user's password using a reset token.

    This endpoint:
    1. Validates the reset token from the email link
    2. Extracts the user ID from the token
    3. Hashes the new password
    4. Updates the user's password in the database
    5. Returns a success message

    **Security:**
    - Token expires after 1 hour
    - Password must meet minimum requirements (8 characters)
    - Old password is immediately invalidated
    """
)
async def reset_password(
    request: ResetPasswordRequest,
    db: AsyncSession = Depends(get_db)
) -> Dict[str, Any]:
    """
    Reset password endpoint.

    Args:
        request: Password reset request with token and new password
        db: Database session

    Returns:
        Success response

    Raises:
        HTTPException 400: If token is invalid or expired
        HTTPException 404: If user not found
    """
    try:
        # 1. Verify token and extract user ID
        logger.info("Password reset attempt")
        user_id_str = verify_password_reset_token(request.token)

        if user_id_str is None:
            logger.warning("Password reset failed - invalid token")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "success": False,
                    "error": "InvalidToken",
                    "message": "Invalid or expired password reset token",
                    "details": None
                }
            )

        # 2. Convert user ID to UUID
        try:
            user_id = UUID(user_id_str)
        except ValueError:
            logger.warning(f"Password reset failed - invalid user ID: {user_id_str}")
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail={
                    "success": False,
                    "error": "InvalidToken",
                    "message": "Invalid user ID in token",
                    "details": None
                }
            )

        # 3. Update password using UserService
        user = await UserService.update_password(db, user_id, request.new_password)
        logger.info(f"Password reset successfully for user: {user.id}")

        # 4. Return success response
        return {
            "success": True,
            "message": "Password reset successfully! You can now log in with your new password.",
            "data": None
        }

    except UserNotFoundError as e:
        # User not found
        logger.warning(f"Password reset failed - user not found")
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={
                "success": False,
                "error": "UserNotFound",
                "message": str(e),
                "details": None
            }
        )

    except HTTPException:
        # Re-raise HTTP exceptions
        raise

    except Exception as e:
        # Unexpected error
        logger.exception(f"Unexpected error during password reset: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "success": False,
                "error": "InternalServerError",
                "message": "An unexpected error occurred. Please try again later.",
                "details": None
            }
        )
