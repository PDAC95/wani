"""
Authentication Pydantic Schemas for Request/Response validation.

This module defines the Pydantic schemas for Authentication endpoints:
- LoginRequest: Schema for user login
- LoginResponse: Schema for login response with tokens
- RefreshRequest: Schema for token refresh
- TokenResponse: Schema for token data
"""

from typing import Optional
from pydantic import BaseModel, EmailStr, Field


class LoginRequest(BaseModel):
    """
    Schema for user login request.

    Attributes:
        email: User's email address
        password: User's password
    """
    email: EmailStr = Field(
        ...,
        description="User's email address",
        examples=["dev@jappi.ca"]
    )
    password: str = Field(
        ...,
        min_length=8,
        description="User's password (minimum 8 characters)",
        examples=["Password123"]
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "dev@jappi.ca",
                "password": "Password123"
            }
        }
    }


class TokenData(BaseModel):
    """
    Schema for token data.

    Attributes:
        access_token: JWT access token
        refresh_token: JWT refresh token
        token_type: Token type (always "bearer")
        expires_in: Token expiration time in seconds
    """
    access_token: str = Field(
        ...,
        description="JWT access token for API authentication"
    )
    refresh_token: str = Field(
        ...,
        description="JWT refresh token for obtaining new access tokens"
    )
    token_type: str = Field(
        default="bearer",
        description="Token type (OAuth2 standard)"
    )
    expires_in: int = Field(
        default=86400,
        description="Access token expiration time in seconds (24 hours)"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "token_type": "bearer",
                "expires_in": 86400
            }
        }
    }


class LoginResponse(BaseModel):
    """
    Schema for login response.

    Attributes:
        success: Always True for successful login
        message: Success message
        data: Login data including tokens and user info
    """
    success: bool = Field(
        True,
        description="Success indicator"
    )
    message: str = Field(
        ...,
        description="Success message"
    )
    data: dict = Field(
        ...,
        description="Login response data"
    )

    model_config = {
        "json_schema_extra": {
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


class RefreshRequest(BaseModel):
    """
    Schema for token refresh request.

    Attributes:
        refresh_token: JWT refresh token
    """
    refresh_token: str = Field(
        ...,
        description="JWT refresh token obtained from login"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "refresh_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        }
    }


class RefreshResponse(BaseModel):
    """
    Schema for token refresh response.

    Attributes:
        success: Always True for successful refresh
        message: Success message
        data: New tokens
    """
    success: bool = Field(
        True,
        description="Success indicator"
    )
    message: str = Field(
        ...,
        description="Success message"
    )
    data: TokenData = Field(
        ...,
        description="New tokens"
    )

    model_config = {
        "json_schema_extra": {
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


class VerifyEmailRequest(BaseModel):
    """
    Schema for email verification request.

    Attributes:
        token: Email verification token from email link
    """
    token: str = Field(
        ...,
        description="Email verification token"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
            }
        }
    }


class ResendVerificationRequest(BaseModel):
    """
    Schema for resend verification email request.

    Attributes:
        email: User's email address
    """
    email: EmailStr = Field(
        ...,
        description="User's email address"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "dev@jappi.ca"
            }
        }
    }


class ForgotPasswordRequest(BaseModel):
    """
    Schema for forgot password request.

    Attributes:
        email: User's email address
    """
    email: EmailStr = Field(
        ...,
        description="User's email address"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "email": "dev@jappi.ca"
            }
        }
    }


class ResetPasswordRequest(BaseModel):
    """
    Schema for password reset request.

    Attributes:
        token: Password reset token from email
        new_password: New password
    """
    token: str = Field(
        ...,
        description="Password reset token"
    )
    new_password: str = Field(
        ...,
        min_length=8,
        description="New password (minimum 8 characters)"
    )

    model_config = {
        "json_schema_extra": {
            "example": {
                "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                "new_password": "NewPassword123"
            }
        }
    }
