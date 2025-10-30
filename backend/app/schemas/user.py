"""
User Pydantic Schemas for Request/Response validation.

This module defines the Pydantic schemas for User entities:
- UserCreate: Schema for user registration/creation
- UserResponse: Schema for user data responses
"""

from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, ConfigDict, EmailStr, Field


class UserCreate(BaseModel):
    """
    Schema for creating a new user.

    Attributes:
        email: User's email address (required, validated)
        password: User's password (required, min 8 characters)
        full_name: User's full name (required)
        phone: User's phone number (optional)
    """
    email: EmailStr = Field(
        ...,
        description="User's email address",
        examples=["user@example.com"]
    )
    password: str = Field(
        ...,
        min_length=8,
        description="User's password (minimum 8 characters)",
        examples=["SecurePass123!"]
    )
    full_name: str = Field(
        ...,
        min_length=2,
        max_length=100,
        description="User's full name",
        examples=["John Doe"]
    )
    phone: Optional[str] = Field(
        None,
        max_length=20,
        description="User's phone number (optional)",
        examples=["+1234567890"]
    )


class UserResponse(BaseModel):
    """
    Schema for user response data.

    This schema is used to return user information in API responses.
    It's compatible with SQLAlchemy models via from_attributes=True.

    Attributes:
        id: User's unique identifier (UUID)
        email: User's email address
        full_name: User's full name
        phone: User's phone number (optional)
        is_verified: Email verification status
        is_active: Account active status
        kyc_level: KYC verification level (0-3)
        role: User's role (user, business, admin)
        created_at: Timestamp when the user was created
    """
    id: UUID = Field(
        ...,
        description="User's unique identifier"
    )
    email: EmailStr = Field(
        ...,
        description="User's email address"
    )
    full_name: str = Field(
        ...,
        description="User's full name"
    )
    phone: Optional[str] = Field(
        None,
        description="User's phone number (optional)"
    )
    is_verified: bool = Field(
        default=False,
        description="Email verification status"
    )
    is_active: bool = Field(
        default=True,
        description="Account active status"
    )
    kyc_level: int = Field(
        default=0,
        description="KYC verification level (0=unverified, 1=basic, 2=advanced, 3=full)",
        ge=0,
        le=3
    )
    role: str = Field(
        default="user",
        description="User's role (user, business, admin)"
    )
    created_at: datetime = Field(
        ...,
        description="Timestamp when the user was created"
    )

    # Pydantic v2 configuration for SQLAlchemy compatibility
    model_config = ConfigDict(
        from_attributes=True,
        json_schema_extra={
            "example": {
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
    )
