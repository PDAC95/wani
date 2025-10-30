"""
Wani - User Model
Database model for user accounts with authentication and KYC
"""

from sqlalchemy import Column, String, Boolean, Integer, DateTime, Index
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func
from app.core.database import Base
import uuid


class User(Base):
    """
    User model for authentication and profile management

    Stores user account information including:
    - Authentication credentials (email, password_hash)
    - Personal information (full_name, phone)
    - Account status (is_verified, is_active)
    - KYC level and role
    """

    __tablename__ = "users"

    # Primary Key
    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4,
        index=True,
        comment="Unique user identifier"
    )

    # Authentication
    email = Column(
        String(255),
        unique=True,
        nullable=False,
        index=True,
        comment="User email address (unique, used for login)"
    )

    password_hash = Column(
        String(255),
        nullable=False,
        comment="Bcrypt hashed password (never store plain text)"
    )

    # Personal Information
    full_name = Column(
        String(255),
        nullable=False,
        comment="User's full legal name"
    )

    phone = Column(
        String(20),
        nullable=False,
        comment="User's phone number with country code"
    )

    # KYC and Permissions
    kyc_level = Column(
        Integer,
        nullable=False,
        default=0,
        comment="KYC verification level: 0=unverified, 1=basic, 2=advanced, 3=full"
    )

    role = Column(
        String(50),
        nullable=False,
        default="user",
        comment="User role: user, business, admin"
    )

    # Account Status
    is_verified = Column(
        Boolean,
        nullable=False,
        default=False,
        comment="Email verification status"
    )

    is_active = Column(
        Boolean,
        nullable=False,
        default=True,
        comment="Account active status (false = suspended/deleted)"
    )

    # Timestamps
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
        comment="Account creation timestamp"
    )

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
        comment="Last account update timestamp"
    )

    # Indexes for performance
    __table_args__ = (
        Index('ix_users_email_active', 'email', 'is_active'),
        Index('ix_users_kyc_level', 'kyc_level'),
        Index('ix_users_created_at', 'created_at'),
    )

    def __repr__(self):
        """String representation for debugging"""
        return f"<User(id={self.id}, email={self.email}, kyc_level={self.kyc_level})>"

    def to_dict(self):
        """Convert model to dictionary (excluding password_hash)"""
        return {
            "id": str(self.id),
            "email": self.email,
            "full_name": self.full_name,
            "phone": self.phone,
            "kyc_level": self.kyc_level,
            "role": self.role,
            "is_verified": self.is_verified,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
