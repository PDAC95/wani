"""
User Service - Business logic for user management.

This service handles user-related operations including:
- User registration with email validation
- Password hashing and security
- User queries and updates
"""

from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.exc import IntegrityError
from sqlalchemy import select

from uuid import UUID

from app.models.user import User
from app.schemas.user import UserCreate, UserResponse
from app.core.security import hash_password, verify_password


class UserServiceError(Exception):
    """Base exception for user service errors."""
    pass


class EmailAlreadyExistsError(UserServiceError):
    """Exception raised when attempting to register with an existing email."""
    pass


class UserNotFoundError(UserServiceError):
    """Exception raised when a user is not found."""
    pass


class InvalidCredentialsError(UserServiceError):
    """Exception raised when authentication fails due to invalid credentials."""
    pass


class AccountInactiveError(UserServiceError):
    """Exception raised when attempting to authenticate with an inactive account."""
    pass


class UserService:
    """
    Service class for user management operations.

    This class encapsulates all business logic related to users,
    including registration, authentication, and profile management.
    """

    @staticmethod
    async def register(db: AsyncSession, user_data: UserCreate) -> UserResponse:
        """
        Register a new user in the system.

        This method performs the following steps:
        1. Validates that the email is unique
        2. Hashes the password securely using bcrypt
        3. Creates the user record in the database
        4. Returns the created user data (without password)

        Args:
            db: SQLAlchemy async database session
            user_data: UserCreate schema with registration data

        Returns:
            UserResponse: Created user data (excluding password)

        Raises:
            EmailAlreadyExistsError: If email is already registered
            UserServiceError: For other registration errors

        Example:
            >>> from app.core.database import get_db
            >>> async with get_db() as db:
            ...     user_data = UserCreate(
            ...         email="user@example.com",
            ...         password="SecurePassword123!",
            ...         full_name="John Doe",
            ...         phone="+1234567890"
            ...     )
            ...     user = await UserService.register(db, user_data)
            ...     print(user.email)
            user@example.com
        """
        # 1. Validate email uniqueness
        result = await db.execute(select(User).filter(User.email == user_data.email))
        existing_user = result.scalar_one_or_none()
        if existing_user:
            raise EmailAlreadyExistsError(
                f"Email '{user_data.email}' is already registered"
            )

        # 2. Hash the password
        password_hash = hash_password(user_data.password)

        # 3. Create user instance
        # Note: phone is optional in UserCreate but required in User model
        # If not provided, we'll use an empty string as default
        db_user = User(
            email=user_data.email,
            password_hash=password_hash,
            full_name=user_data.full_name,
            phone=user_data.phone or "",  # Handle optional phone
            # Default values from model:
            # kyc_level=0, role="user", is_verified=False, is_active=True
        )

        # 4. Save to database
        try:
            db.add(db_user)
            await db.commit()
            await db.refresh(db_user)  # Refresh to get generated fields (id, timestamps)
        except IntegrityError as e:
            await db.rollback()
            # This should not happen due to our email check above,
            # but handle race conditions
            raise EmailAlreadyExistsError(
                f"Email '{user_data.email}' is already registered"
            ) from e
        except Exception as e:
            await db.rollback()
            raise UserServiceError(f"Failed to create user: {str(e)}") from e

        # 5. Return user response (Pydantic will handle conversion)
        return UserResponse.model_validate(db_user)

    @staticmethod
    async def get_by_email(db: AsyncSession, email: str) -> Optional[User]:
        """
        Retrieve a user by email address.

        Args:
            db: SQLAlchemy async database session
            email: User's email address

        Returns:
            User model instance if found, None otherwise

        Example:
            >>> user = await UserService.get_by_email(db, "user@example.com")
            >>> if user:
            ...     print(user.full_name)
        """
        result = await db.execute(select(User).filter(User.email == email))
        return result.scalar_one_or_none()

    @staticmethod
    async def get_by_id(db: AsyncSession, user_id: str) -> Optional[User]:
        """
        Retrieve a user by ID.

        Args:
            db: SQLAlchemy async database session
            user_id: User's UUID as string

        Returns:
            User model instance if found, None otherwise

        Example:
            >>> user = await UserService.get_by_id(db, "123e4567-e89b-12d3-a456-426614174000")
            >>> if user:
            ...     print(user.email)
        """
        result = await db.execute(select(User).filter(User.id == user_id))
        return result.scalar_one_or_none()

    @staticmethod
    async def authenticate(db: AsyncSession, email: str, password: str) -> User:
        """
        Authenticate a user with email and password.

        This method performs the following steps:
        1. Finds the user by email
        2. Verifies the password using bcrypt
        3. Checks if the account is active
        4. Returns the authenticated user

        Args:
            db: SQLAlchemy async database session
            email: User's email address
            password: Plain-text password

        Returns:
            User model instance if authentication succeeds

        Raises:
            InvalidCredentialsError: If email or password is incorrect
            AccountInactiveError: If the account is not active

        Example:
            >>> try:
            ...     user = await UserService.authenticate(db, "user@example.com", "password123")
            ...     print("Login successful!")
            ... except InvalidCredentialsError:
            ...     print("Invalid credentials")
            ... except AccountInactiveError:
            ...     print("Account is inactive")
        """
        # 1. Find user by email
        user = await UserService.get_by_email(db, email)
        if not user:
            raise InvalidCredentialsError("Invalid email or password")

        # 2. Verify password
        if not verify_password(password, user.password_hash):
            raise InvalidCredentialsError("Invalid email or password")

        # 3. Check if user is active
        if not user.is_active:
            raise AccountInactiveError(
                "Your account has been deactivated. Please contact support."
            )

        # 4. Return authenticated user
        return user

    @staticmethod
    async def is_email_available(db: AsyncSession, email: str) -> bool:
        """
        Check if an email address is available for registration.

        Args:
            db: SQLAlchemy async database session
            email: Email address to check

        Returns:
            True if email is available, False if already registered

        Example:
            >>> if await UserService.is_email_available(db, "new@example.com"):
            ...     print("Email available!")
            ... else:
            ...     print("Email already registered")
        """
        result = await db.execute(select(User).filter(User.email == email))
        existing_user = result.scalar_one_or_none()
        return existing_user is None

    @staticmethod
    async def verify_email(db: AsyncSession, user_id: UUID) -> User:
        """
        Verify a user's email address.

        This method marks a user's email as verified by setting is_verified to True.

        Args:
            db: SQLAlchemy async database session
            user_id: User's UUID

        Returns:
            Updated User model instance

        Raises:
            UserNotFoundError: If user does not exist

        Example:
            >>> user = await UserService.verify_email(db, user_id)
            >>> print(f"Email verified: {user.is_verified}")
        """
        # 1. Find user by ID
        result = await db.execute(select(User).filter(User.id == user_id))
        user = result.scalar_one_or_none()

        if not user:
            raise UserNotFoundError(f"User with ID '{user_id}' not found")

        # 2. Update verification status
        user.is_verified = True

        # 3. Save to database
        try:
            await db.commit()
            await db.refresh(user)
        except Exception as e:
            await db.rollback()
            raise UserServiceError(f"Failed to verify email: {str(e)}") from e

        return user

    @staticmethod
    async def update_password(db: AsyncSession, user_id: UUID, new_password: str) -> User:
        """
        Update a user's password.

        This method hashes the new password and updates it in the database.

        Args:
            db: SQLAlchemy async database session
            user_id: User's UUID
            new_password: New plain-text password

        Returns:
            Updated User model instance

        Raises:
            UserNotFoundError: If user does not exist

        Example:
            >>> user = await UserService.update_password(db, user_id, "NewSecurePassword123!")
            >>> print("Password updated successfully")
        """
        # 1. Find user by ID
        result = await db.execute(select(User).filter(User.id == user_id))
        user = result.scalar_one_or_none()

        if not user:
            raise UserNotFoundError(f"User with ID '{user_id}' not found")

        # 2. Hash the new password
        user.password_hash = hash_password(new_password)

        # 3. Save to database
        try:
            await db.commit()
            await db.refresh(user)
        except Exception as e:
            await db.rollback()
            raise UserServiceError(f"Failed to update password: {str(e)}") from e

        return user
