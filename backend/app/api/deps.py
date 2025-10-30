"""
API Dependencies - Authentication and authorization dependencies.

This module provides FastAPI dependencies for:
- Token extraction and validation
- Current user retrieval
- Permission checking (active users, KYC levels, roles)
"""

from typing import Optional
from uuid import UUID

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.core.database import get_db
from app.core.security import decode_token
from app.models.user import User


# HTTP Bearer token security scheme
security = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: AsyncSession = Depends(get_db)
) -> User:
    """
    Get the current authenticated user from JWT token.

    This dependency:
    1. Extracts the JWT token from Authorization header
    2. Validates and decodes the token
    3. Retrieves the user from the database
    4. Returns the user object

    Args:
        credentials: HTTP Bearer token from Authorization header
        db: Database session

    Returns:
        User object if token is valid and user exists

    Raises:
        HTTPException 401: If token is invalid or user not found

    Example:
        @router.get("/me")
        async def get_me(current_user: User = Depends(get_current_user)):
            return {"user": current_user.to_dict()}
    """
    # Extract token from credentials
    token = credentials.credentials

    # Decode and validate token
    payload = decode_token(token, expected_type="access")
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": "InvalidToken",
                "message": "Invalid or expired authentication token",
                "details": None
            },
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Extract user ID from token
    user_id_str = payload.get("sub")
    if user_id_str is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": "InvalidToken",
                "message": "Token does not contain user ID",
                "details": None
            },
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Convert user ID to UUID
    try:
        user_id = UUID(user_id_str)
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": "InvalidToken",
                "message": "Invalid user ID in token",
                "details": None
            },
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Retrieve user from database
    result = await db.execute(
        select(User).where(User.id == user_id)
    )
    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail={
                "success": False,
                "error": "UserNotFound",
                "message": "User not found",
                "details": None
            },
            headers={"WWW-Authenticate": "Bearer"},
        )

    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user)
) -> User:
    """
    Get the current authenticated user and verify they are active.

    This dependency builds on get_current_user and adds an additional
    check to ensure the user account is active (not suspended/deleted).

    Args:
        current_user: User object from get_current_user

    Returns:
        User object if active

    Raises:
        HTTPException 403: If user account is not active

    Example:
        @router.post("/send-money")
        async def send_money(
            current_user: User = Depends(get_current_active_user)
        ):
            # Only active users can send money
            pass
    """
    if not current_user.is_active:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "error": "AccountInactive",
                "message": "Your account is not active. Please contact support.",
                "details": None
            }
        )

    return current_user


async def get_current_verified_user(
    current_user: User = Depends(get_current_active_user)
) -> User:
    """
    Get the current authenticated user and verify they have verified their email.

    This dependency builds on get_current_active_user and adds an additional
    check to ensure the user has verified their email address.

    Args:
        current_user: User object from get_current_active_user

    Returns:
        User object if email is verified

    Raises:
        HTTPException 403: If email is not verified

    Example:
        @router.post("/withdraw")
        async def withdraw(
            current_user: User = Depends(get_current_verified_user)
        ):
            # Only verified users can withdraw
            pass
    """
    if not current_user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "success": False,
                "error": "EmailNotVerified",
                "message": "Please verify your email address to access this feature.",
                "details": {
                    "action_required": "verify_email",
                    "endpoint": "/api/v1/auth/resend-verification"
                }
            }
        )

    return current_user


def require_kyc_level(min_level: int):
    """
    Factory function to create a dependency that requires a minimum KYC level.

    This allows you to protect endpoints that require specific KYC verification levels.

    Args:
        min_level: Minimum KYC level required (0-3)
            - 0: Unverified (default)
            - 1: Basic KYC (phone verified)
            - 2: Advanced KYC (ID document verified)
            - 3: Full KYC (address verified)

    Returns:
        Dependency function

    Example:
        # Require KYC level 2 for high-value transactions
        @router.post("/send-large-amount")
        async def send_large_amount(
            current_user: User = Depends(require_kyc_level(2))
        ):
            # Only KYC level 2+ users can access
            pass
    """
    async def kyc_checker(
        current_user: User = Depends(get_current_verified_user)
    ) -> User:
        if current_user.kyc_level < min_level:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={
                    "success": False,
                    "error": "InsufficientKYC",
                    "message": f"This action requires KYC level {min_level}. Your current level: {current_user.kyc_level}",
                    "details": {
                        "current_kyc_level": current_user.kyc_level,
                        "required_kyc_level": min_level,
                        "action_required": "complete_kyc",
                        "endpoint": "/api/v1/kyc/start"
                    }
                }
            )
        return current_user

    return kyc_checker


def require_role(allowed_roles: list[str]):
    """
    Factory function to create a dependency that requires specific user roles.

    This allows you to protect endpoints that require specific roles (admin, business, etc).

    Args:
        allowed_roles: List of allowed roles (e.g., ["admin", "business"])

    Returns:
        Dependency function

    Example:
        # Require admin role
        @router.get("/admin/users")
        async def list_all_users(
            current_user: User = Depends(require_role(["admin"]))
        ):
            # Only admins can access
            pass

        # Require admin or business role
        @router.get("/business/reports")
        async def get_reports(
            current_user: User = Depends(require_role(["admin", "business"]))
        ):
            # Admins and business users can access
            pass
    """
    async def role_checker(
        current_user: User = Depends(get_current_active_user)
    ) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail={
                    "success": False,
                    "error": "InsufficientPermissions",
                    "message": f"This action requires one of these roles: {', '.join(allowed_roles)}",
                    "details": {
                        "current_role": current_user.role,
                        "required_roles": allowed_roles
                    }
                }
            )
        return current_user

    return role_checker


async def get_optional_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(HTTPBearer(auto_error=False)),
    db: AsyncSession = Depends(get_db)
) -> Optional[User]:
    """
    Get the current user if authenticated, otherwise return None.

    This dependency is useful for endpoints that work differently for
    authenticated vs anonymous users, but don't require authentication.

    Args:
        credentials: Optional HTTP Bearer token
        db: Database session

    Returns:
        User object if token is valid, None otherwise

    Example:
        @router.get("/products")
        async def list_products(
            user: Optional[User] = Depends(get_optional_user)
        ):
            # Show personalized products if user is authenticated
            if user:
                return {"products": get_personalized_products(user)}
            else:
                return {"products": get_public_products()}
    """
    if credentials is None:
        return None

    try:
        # Extract token
        token = credentials.credentials

        # Decode token
        payload = decode_token(token, expected_type="access")
        if payload is None:
            return None

        # Extract user ID
        user_id_str = payload.get("sub")
        if user_id_str is None:
            return None

        # Convert to UUID
        user_id = UUID(user_id_str)

        # Retrieve user
        result = await db.execute(
            select(User).where(User.id == user_id)
        )
        user = result.scalar_one_or_none()

        return user

    except Exception:
        # If anything fails, just return None (don't raise exception)
        return None
