"""
Wani - Services Module
Business logic services for blockchain, payments, notifications, etc.
"""

from app.services.user_service import (
    UserService,
    UserServiceError,
    EmailAlreadyExistsError,
    UserNotFoundError,
    InvalidCredentialsError,
    AccountInactiveError
)

from app.services.email_service import (
    EmailService,
    EmailServiceError,
    EmailConfigurationError,
    EmailSendError,
    email_service
)

# Base exports
__all__ = [
    "UserService",
    "UserServiceError",
    "EmailAlreadyExistsError",
    "UserNotFoundError",
    "InvalidCredentialsError",
    "AccountInactiveError",
    "EmailService",
    "EmailServiceError",
    "EmailConfigurationError",
    "EmailSendError",
    "email_service",
]

# Conditional import for stellar_service (requires stellar_sdk)
try:
    from app.services.stellar_service import stellar_service, StellarService
    __all__.extend(["stellar_service", "StellarService"])
except ImportError:
    pass
