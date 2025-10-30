"""
Wani - Configuration Management
Centralized configuration using Pydantic Settings
"""

from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import Field, field_validator
from typing import List, Optional
import os


class Settings(BaseSettings):
    """
    Application settings loaded from environment variables
    """

    # Server Configuration
    NODE_ENV: str = Field(default="development", description="Environment: development, staging, production")
    PORT: int = Field(default=8000, description="Server port")
    API_VERSION: str = Field(default="v1", description="API version")
    DEBUG: bool = Field(default=True, description="Debug mode")

    # Database Configuration (Supabase)
    DATABASE_URL: str = Field(..., description="PostgreSQL connection string from Supabase")
    SUPABASE_URL: str = Field(..., description="Supabase project URL")
    SUPABASE_KEY: str = Field(..., description="Supabase anon/public key")
    SUPABASE_JWT_SECRET: str = Field(..., description="Supabase JWT secret for token verification")

    # Redis Configuration
    REDIS_URL: str = Field(default="redis://localhost:6379/0", description="Redis connection URL")

    # Authentication Configuration
    JWT_SECRET: str = Field(..., description="Secret key for JWT token generation")
    JWT_ALGORITHM: str = Field(default="HS256", description="JWT signing algorithm")
    JWT_EXPIRE_MINUTES: int = Field(default=1440, description="JWT access token expiration (24 hours)")
    REFRESH_TOKEN_EXPIRE_DAYS: int = Field(default=30, description="Refresh token expiration (30 days)")

    # Stellar Blockchain Configuration
    STELLAR_NETWORK: str = Field(default="testnet", description="Stellar network: testnet or public")
    STELLAR_HORIZON_URL: str = Field(
        default="https://horizon-testnet.stellar.org",
        description="Stellar Horizon API URL"
    )
    STELLAR_HOT_WALLET_SECRET: str = Field(..., description="Hot wallet secret key (ENCRYPTED)")
    STELLAR_COLD_WALLET_PUBLIC: str = Field(..., description="Cold wallet public key")
    STELLAR_USDC_ISSUER: str = Field(
        default="GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
        description="USDC issuer on Stellar"
    )

    # Circle API Configuration (USD → USDC)
    CIRCLE_API_KEY: Optional[str] = Field(default=None, description="Circle API key")
    CIRCLE_ACCOUNT_ID: Optional[str] = Field(default=None, description="Circle account ID")
    CIRCLE_API_BASE_URL: str = Field(
        default="https://api-sandbox.circle.com/v1",
        description="Circle API base URL (sandbox for dev)"
    )

    # Bitso API Configuration (USDC → MXN, Cash-out)
    BITSO_API_KEY: Optional[str] = Field(default=None, description="Bitso API key")
    BITSO_API_SECRET: Optional[str] = Field(default=None, description="Bitso API secret")
    BITSO_API_BASE_URL: str = Field(
        default="https://api.bitso.com/v3",
        description="Bitso API base URL"
    )
    BITSO_STELLAR_DEPOSIT_ADDRESS: Optional[str] = Field(
        default=None,
        description="Bitso Stellar deposit address"
    )

    # Twilio Configuration (SMS OTP)
    TWILIO_ACCOUNT_SID: Optional[str] = Field(default=None, description="Twilio account SID")
    TWILIO_AUTH_TOKEN: Optional[str] = Field(default=None, description="Twilio auth token")
    TWILIO_PHONE_NUMBER: Optional[str] = Field(default=None, description="Twilio phone number")

    # SendGrid Configuration (Email - Legacy)
    SENDGRID_API_KEY: Optional[str] = Field(default=None, description="SendGrid API key")
    SENDGRID_FROM_EMAIL: str = Field(default="noreply@wani.app", description="Sender email")
    SENDGRID_FROM_NAME: str = Field(default="Wani", description="Sender name")

    # Resend Configuration (Email - Modern)
    RESEND_API_KEY: Optional[str] = Field(default=None, description="Resend API key")
    RESEND_FROM_EMAIL: str = Field(default="noreply@wani.app", description="Sender email (must be verified)")
    RESEND_FROM_NAME: str = Field(default="Wani", description="Sender name")
    FRONTEND_URL: str = Field(default="http://localhost:5173", description="Frontend URL for email links")

    # Sentry Configuration (Error Tracking)
    SENTRY_DSN: Optional[str] = Field(default=None, description="Sentry DSN for error tracking")
    SENTRY_ENVIRONMENT: str = Field(default="development", description="Sentry environment tag")

    # Telegram Bot (Alerts)
    TELEGRAM_BOT_TOKEN: Optional[str] = Field(default=None, description="Telegram bot token")
    TELEGRAM_CHAT_ID: Optional[str] = Field(default=None, description="Telegram chat ID for alerts")

    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = Field(default=60, description="Max requests per minute")
    RATE_LIMIT_PER_HOUR: int = Field(default=1000, description="Max requests per hour")

    # Hot Wallet Limits
    HOT_WALLET_MIN_BALANCE: int = Field(default=20000, description="Minimum hot wallet balance ($)")
    HOT_WALLET_MAX_BALANCE: int = Field(default=100000, description="Maximum hot wallet balance ($)")
    HOT_WALLET_ALERT_THRESHOLD: float = Field(default=0.3, description="Alert at 30% capacity")

    # KYC Limits (USDC)
    KYC_PENDING_DAILY_LIMIT: int = Field(default=100, description="Daily limit for non-KYC users")
    KYC_PENDING_MONTHLY_LIMIT: int = Field(default=500, description="Monthly limit for non-KYC users")
    KYC_APPROVED_DAILY_LIMIT: int = Field(default=10000, description="Daily limit for KYC approved")
    KYC_APPROVED_MONTHLY_LIMIT: int = Field(default=50000, description="Monthly limit for KYC approved")

    # CORS Configuration
    FRONTEND_WEB_URL: str = Field(default="http://localhost:5173", description="Frontend web URL")
    FRONTEND_MOBILE_URL: str = Field(default="exp://localhost:8081", description="Frontend mobile URL")
    ALLOWED_ORIGINS: Optional[str] = Field(
        default="http://localhost:5173,http://localhost:3000,http://localhost:8081",
        description="Comma-separated list of allowed CORS origins"
    )

    # File Upload
    MAX_UPLOAD_SIZE_MB: int = Field(default=5, description="Max file upload size in MB")
    ALLOWED_FILE_TYPES: Optional[str] = Field(
        default="image/jpeg,image/png,application/pdf",
        description="Comma-separated list of allowed file MIME types"
    )

    # Celery Configuration
    CELERY_BROKER_URL: str = Field(default="redis://localhost:6379/0", description="Celery broker URL")
    CELERY_RESULT_BACKEND: str = Field(default="redis://localhost:6379/0", description="Celery result backend")

    @field_validator("NODE_ENV")
    @classmethod
    def validate_environment(cls, v):
        """Validate environment is one of allowed values"""
        allowed = ["development", "staging", "production"]
        if v not in allowed:
            raise ValueError(f"NODE_ENV must be one of {allowed}")
        return v

    @field_validator("STELLAR_NETWORK")
    @classmethod
    def validate_stellar_network(cls, v):
        """Validate Stellar network is testnet or public"""
        allowed = ["testnet", "public"]
        if v not in allowed:
            raise ValueError(f"STELLAR_NETWORK must be one of {allowed}")
        return v

    @field_validator("JWT_ALGORITHM")
    @classmethod
    def validate_jwt_algorithm(cls, v):
        """Validate JWT algorithm"""
        allowed = ["HS256", "HS384", "HS512"]
        if v not in allowed:
            raise ValueError(f"JWT_ALGORITHM must be one of {allowed}")
        return v

    def get_allowed_origins(self) -> List[str]:
        """Parse and return ALLOWED_ORIGINS as a list"""
        if isinstance(self.ALLOWED_ORIGINS, str):
            return [origin.strip() for origin in self.ALLOWED_ORIGINS.split(",") if origin.strip()]
        return self.ALLOWED_ORIGINS or []

    def get_allowed_file_types(self) -> List[str]:
        """Parse and return ALLOWED_FILE_TYPES as a list"""
        if isinstance(self.ALLOWED_FILE_TYPES, str):
            return [ft.strip() for ft in self.ALLOWED_FILE_TYPES.split(",") if ft.strip()]
        return self.ALLOWED_FILE_TYPES

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",  # Ignore extra fields from .env
    )


# Create global settings instance
settings = Settings()


# Helper function to check if running in production
def is_production() -> bool:
    """Check if running in production environment"""
    return settings.NODE_ENV == "production"


# Helper function to check if running in development
def is_development() -> bool:
    """Check if running in development environment"""
    return settings.NODE_ENV == "development"
