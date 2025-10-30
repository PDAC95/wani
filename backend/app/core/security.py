"""
Security utilities for password hashing, verification, and JWT tokens.

This module provides:
- Secure password hashing using bcrypt via passlib
- JWT token generation and verification for email verification
- Password reset token generation

Bcrypt is a battle-tested, adaptive hashing algorithm designed for securely
storing passwords.
"""

from datetime import datetime, timedelta
from typing import Optional, Dict, Any
from uuid import UUID

from passlib.context import CryptContext
from jose import jwt, JWTError

from app.core.config import settings

# Password hashing context using bcrypt
# - schemes: List of hashing schemes to support (bcrypt only)
# - deprecated: List of schemes that should be upgraded (none currently)
# - bcrypt__rounds: Number of rounds for bcrypt (default: 12, range: 4-31)
#   More rounds = slower but more secure. 12 is a good balance.
pwd_context = CryptContext(
    schemes=["bcrypt"],
    deprecated="auto",
    bcrypt__rounds=12
)


def hash_password(password: str) -> str:
    """
    Hash a plain-text password using bcrypt.

    This function takes a plain-text password and returns a bcrypt hash
    that is safe to store in the database. The hash includes the salt
    and algorithm parameters.

    Args:
        password: Plain-text password to hash

    Returns:
        Hashed password string (bcrypt hash with salt)

    Example:
        >>> hashed = hash_password("MySecurePassword123!")
        >>> print(hashed)
        $2b$12$randomsaltandhashedpasswordhere...

    Note:
        - Bcrypt automatically generates a random salt for each hash
        - The hash includes the salt, so no separate storage is needed
        - Each call with the same password produces a different hash
    """
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """
    Verify a plain-text password against a bcrypt hash.

    This function checks if a plain-text password matches a previously
    hashed password. It's constant-time to prevent timing attacks.

    Args:
        plain_password: Plain-text password to verify
        hashed_password: Bcrypt hash to verify against

    Returns:
        True if the password matches the hash, False otherwise

    Example:
        >>> hashed = hash_password("MyPassword123!")
        >>> verify_password("MyPassword123!", hashed)
        True
        >>> verify_password("WrongPassword", hashed)
        False

    Note:
        - This function is safe against timing attacks
        - Returns False for invalid hashes (doesn't raise exceptions)
        - Compatible with bcrypt hashes from other libraries
    """
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except Exception:
        # If verification fails due to invalid hash format or other errors,
        # return False instead of raising an exception
        return False


def needs_update(hashed_password: str) -> bool:
    """
    Check if a password hash needs to be updated.

    This is useful for upgrading password hashes when security parameters
    change (e.g., increasing bcrypt rounds).

    Args:
        hashed_password: Bcrypt hash to check

    Returns:
        True if the hash should be updated, False otherwise

    Example:
        >>> hashed = hash_password("MyPassword123!")
        >>> if needs_update(hashed):
        ...     new_hash = hash_password(plain_password)
        ...     # Update database with new_hash

    Note:
        - Returns True if the hash uses deprecated schemes or parameters
        - Returns False if the hash is up-to-date
        - Should be checked during login to opportunistically upgrade hashes
    """
    return pwd_context.needs_update(hashed_password)


# ==============================================================================
# JWT Token Functions for Email Verification and Password Reset
# ==============================================================================

def create_verification_token(user_id: UUID, expires_hours: int = 24) -> str:
    """
    Create a JWT token for email verification.

    This function generates a signed JWT token containing the user's ID
    and an expiration time. The token is used to verify email addresses
    when users click the verification link in their email.

    Args:
        user_id: User's UUID to embed in the token
        expires_hours: Token expiration time in hours (default: 24)

    Returns:
        JWT token string

    Example:
        >>> from uuid import uuid4
        >>> user_id = uuid4()
        >>> token = create_verification_token(user_id)
        >>> print(token)
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    Note:
        - Token is signed with JWT_SECRET from settings
        - Token expires after 24 hours by default
        - Token includes: user_id, type=email_verification, exp, iat
        - Cannot be forged without the secret key
    """
    # Calculate expiration time
    expire = datetime.utcnow() + timedelta(hours=expires_hours)

    # Create token payload
    payload = {
        "sub": str(user_id),  # Subject (user ID)
        "type": "email_verification",  # Token type
        "exp": expire,  # Expiration time
        "iat": datetime.utcnow(),  # Issued at time
    }

    # Encode JWT token
    token = jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )

    return token


def verify_verification_token(token: str) -> Optional[str]:
    """
    Verify and decode an email verification JWT token.

    This function validates the JWT token and extracts the user ID.
    It checks the signature, expiration, and token type.

    Args:
        token: JWT token string to verify

    Returns:
        User ID (as string) if token is valid, None otherwise

    Example:
        >>> token = create_verification_token(user_id)
        >>> user_id = verify_verification_token(token)
        >>> if user_id:
        ...     print(f"Valid token for user: {user_id}")
        ... else:
        ...     print("Invalid or expired token")

    Note:
        - Returns None if token is invalid, expired, or wrong type
        - Does not raise exceptions (safe to use in verification flow)
        - Validates token signature, expiration, and type
        - User ID is returned as string (convert to UUID if needed)
    """
    try:
        # Decode JWT token
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        # Verify token type
        token_type = payload.get("type")
        if token_type != "email_verification":
            return None

        # Extract user ID
        user_id = payload.get("sub")
        if user_id is None:
            return None

        return user_id

    except JWTError:
        # Token is invalid (expired, wrong signature, malformed, etc.)
        return None
    except Exception:
        # Unexpected error
        return None


def create_password_reset_token(user_id: UUID, expires_hours: int = 1) -> str:
    """
    Create a JWT token for password reset.

    This function generates a signed JWT token for password reset requests.
    The token has a shorter expiration time (1 hour) for security.

    Args:
        user_id: User's UUID to embed in the token
        expires_hours: Token expiration time in hours (default: 1)

    Returns:
        JWT token string

    Example:
        >>> from uuid import uuid4
        >>> user_id = uuid4()
        >>> token = create_password_reset_token(user_id)
        >>> print(token)
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    Note:
        - Token expires after 1 hour by default (security best practice)
        - Token includes: user_id, type=password_reset, exp, iat
        - Should be invalidated after successful password reset
    """
    # Calculate expiration time
    expire = datetime.utcnow() + timedelta(hours=expires_hours)

    # Create token payload
    payload = {
        "sub": str(user_id),  # Subject (user ID)
        "type": "password_reset",  # Token type
        "exp": expire,  # Expiration time
        "iat": datetime.utcnow(),  # Issued at time
    }

    # Encode JWT token
    token = jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )

    return token


def verify_password_reset_token(token: str) -> Optional[str]:
    """
    Verify and decode a password reset JWT token.

    This function validates the JWT token and extracts the user ID.
    It checks the signature, expiration, and token type.

    Args:
        token: JWT token string to verify

    Returns:
        User ID (as string) if token is valid, None otherwise

    Example:
        >>> token = create_password_reset_token(user_id)
        >>> user_id = verify_password_reset_token(token)
        >>> if user_id:
        ...     print(f"Valid token for user: {user_id}")
        ... else:
        ...     print("Invalid or expired token")

    Note:
        - Returns None if token is invalid, expired, or wrong type
        - Does not raise exceptions (safe to use in reset flow)
        - Token should be used only once and invalidated after use
        - User ID is returned as string (convert to UUID if needed)
    """
    try:
        # Decode JWT token
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        # Verify token type
        token_type = payload.get("type")
        if token_type != "password_reset":
            return None

        # Extract user ID
        user_id = payload.get("sub")
        if user_id is None:
            return None

        return user_id

    except JWTError:
        # Token is invalid (expired, wrong signature, malformed, etc.)
        return None
    except Exception:
        # Unexpected error
        return None


# ==============================================================================
# JWT Access & Refresh Token Functions for Authentication
# ==============================================================================

def create_access_token(
    user_id: UUID,
    expires_delta: Optional[timedelta] = None
) -> str:
    """
    Create a JWT access token for authentication.

    This function generates a signed JWT token for user authentication.
    Access tokens are short-lived (default: 24 hours) and used for API access.

    Args:
        user_id: User's UUID to embed in the token
        expires_delta: Optional custom expiration time (overrides default)

    Returns:
        JWT access token string

    Example:
        >>> from uuid import uuid4
        >>> user_id = uuid4()
        >>> token = create_access_token(user_id)
        >>> print(token)
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

        >>> # Custom expiration
        >>> from datetime import timedelta
        >>> token = create_access_token(user_id, expires_delta=timedelta(hours=2))

    Note:
        - Token is signed with JWT_SECRET from settings
        - Default expiration: JWT_EXPIRE_MINUTES from settings (24 hours)
        - Token includes: user_id, type=access, exp, iat
        - Use this token in Authorization header: "Bearer {token}"
    """
    # Calculate expiration time
    if expires_delta is None:
        expires_delta = timedelta(minutes=settings.JWT_EXPIRE_MINUTES)

    expire = datetime.utcnow() + expires_delta

    # Create token payload
    payload = {
        "sub": str(user_id),  # Subject (user ID)
        "type": "access",  # Token type
        "exp": expire,  # Expiration time
        "iat": datetime.utcnow(),  # Issued at time
    }

    # Encode JWT token
    token = jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )

    return token


def create_refresh_token(user_id: UUID) -> str:
    """
    Create a JWT refresh token for long-term authentication.

    This function generates a signed JWT token for refreshing access tokens.
    Refresh tokens are long-lived (default: 30 days) and should be stored securely.

    Args:
        user_id: User's UUID to embed in the token

    Returns:
        JWT refresh token string

    Example:
        >>> from uuid import uuid4
        >>> user_id = uuid4()
        >>> refresh_token = create_refresh_token(user_id)
        >>> print(refresh_token)
        eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

    Note:
        - Token is signed with JWT_SECRET from settings
        - Expiration: REFRESH_TOKEN_EXPIRE_DAYS from settings (30 days)
        - Token includes: user_id, type=refresh, exp, iat
        - Store securely (httpOnly cookie recommended)
        - Use to obtain new access tokens when they expire
    """
    # Calculate expiration time
    expire = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)

    # Create token payload
    payload = {
        "sub": str(user_id),  # Subject (user ID)
        "type": "refresh",  # Token type
        "exp": expire,  # Expiration time
        "iat": datetime.utcnow(),  # Issued at time
    }

    # Encode JWT token
    token = jwt.encode(
        payload,
        settings.JWT_SECRET,
        algorithm=settings.JWT_ALGORITHM
    )

    return token


def decode_token(token: str, expected_type: str = "access") -> Optional[Dict[str, Any]]:
    """
    Decode and verify a JWT token (access or refresh).

    This function validates the JWT token and extracts the payload.
    It checks the signature, expiration, and token type.

    Args:
        token: JWT token string to decode
        expected_type: Expected token type ("access" or "refresh")

    Returns:
        Token payload (dict) if valid, None otherwise

    Example:
        >>> token = create_access_token(user_id)
        >>> payload = decode_token(token, expected_type="access")
        >>> if payload:
        ...     user_id = payload.get("sub")
        ...     print(f"Valid token for user: {user_id}")
        ... else:
        ...     print("Invalid or expired token")

        >>> # For refresh tokens
        >>> refresh_token = create_refresh_token(user_id)
        >>> payload = decode_token(refresh_token, expected_type="refresh")

    Note:
        - Returns None if token is invalid, expired, or wrong type
        - Does not raise exceptions (safe to use in auth flow)
        - Validates token signature, expiration, and type
        - Payload includes: sub (user_id), type, exp, iat
    """
    try:
        # Decode JWT token
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=[settings.JWT_ALGORITHM]
        )

        # Verify token type
        token_type = payload.get("type")
        if token_type != expected_type:
            return None

        # Extract user ID
        user_id = payload.get("sub")
        if user_id is None:
            return None

        return payload

    except JWTError:
        # Token is invalid (expired, wrong signature, malformed, etc.)
        return None
    except Exception:
        # Unexpected error
        return None
