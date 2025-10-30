"""
Pydantic Schemas Package.

This package contains all Pydantic schemas for request/response validation.
"""

from .user import UserCreate, UserResponse
from .auth import (
    LoginRequest,
    LoginResponse,
    RefreshRequest,
    RefreshResponse,
    TokenData,
    VerifyEmailRequest,
    ResendVerificationRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
)
from .common import (
    SuccessResponse,
    ErrorResponse,
    ErrorDetail,
    ValidationErrorResponse,
)

__all__ = [
    # User schemas
    "UserCreate",
    "UserResponse",
    # Auth schemas
    "LoginRequest",
    "LoginResponse",
    "RefreshRequest",
    "RefreshResponse",
    "TokenData",
    "VerifyEmailRequest",
    "ResendVerificationRequest",
    "ForgotPasswordRequest",
    "ResetPasswordRequest",
    # Common schemas
    "SuccessResponse",
    "ErrorResponse",
    "ErrorDetail",
    "ValidationErrorResponse",
]
