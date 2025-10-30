"""
Email Service - Handle transactional emails using Resend.

This service provides email functionality for:
- User verification emails
- Password reset emails
- Transaction notifications
- General notifications

Uses Resend as the email provider (modern alternative to SendGrid).
"""

from typing import Optional, Dict, Any
import logging
from datetime import datetime

try:
    import resend
    RESEND_AVAILABLE = True
except ImportError:
    RESEND_AVAILABLE = False

from app.core.config import settings


# Configure logging
logger = logging.getLogger(__name__)


class EmailServiceError(Exception):
    """Base exception for email service errors."""
    pass


class EmailConfigurationError(EmailServiceError):
    """Exception raised when email service is not configured."""
    pass


class EmailSendError(EmailServiceError):
    """Exception raised when email sending fails."""
    pass


class EmailService:
    """
    Service class for sending transactional emails via Resend.

    This service handles all email communications including:
    - User email verification
    - Password resets
    - Transaction confirmations
    - Account notifications

    Configuration:
        Requires RESEND_API_KEY in environment variables.
        Optional: RESEND_FROM_EMAIL, RESEND_FROM_NAME, FRONTEND_URL

    Example:
        >>> email_service = EmailService()
        >>> email_service.send_verification_email(
        ...     to_email="user@example.com",
        ...     user_name="John Doe",
        ...     verification_token="abc123"
        ... )
    """

    def __init__(self):
        """
        Initialize the EmailService with Resend configuration.

        Raises:
            EmailConfigurationError: If Resend is not available or not configured
        """
        # Always set basic configuration from settings
        self.from_email = settings.RESEND_FROM_EMAIL
        self.from_name = settings.RESEND_FROM_NAME
        self.frontend_url = settings.FRONTEND_URL

        if not RESEND_AVAILABLE:
            logger.warning("Resend package not installed. Install with: pip install resend")
            self._configured = False
            return

        if not settings.RESEND_API_KEY:
            logger.warning("RESEND_API_KEY not configured. Email service will be disabled.")
            self._configured = False
            return

        # Configure Resend with API key
        resend.api_key = settings.RESEND_API_KEY
        self._configured = True

        logger.info(f"EmailService initialized with sender: {self.from_name} <{self.from_email}>")

    def _check_configured(self):
        """
        Check if the email service is properly configured.

        Raises:
            EmailConfigurationError: If service is not configured
        """
        if not self._configured:
            raise EmailConfigurationError(
                "Email service is not configured. Please set RESEND_API_KEY in environment variables."
            )

    def send_verification_email(
        self,
        to_email: str,
        user_name: str,
        verification_token: str
    ) -> Dict[str, Any]:
        """
        Send an email verification email to a new user.

        This email contains a link to verify the user's email address.
        The verification link includes a token that will be validated
        by the backend.

        Args:
            to_email: Recipient email address
            user_name: User's full name for personalization
            verification_token: Unique token for verification

        Returns:
            Dict containing email sending result with 'id' field

        Raises:
            EmailConfigurationError: If service is not configured
            EmailSendError: If email sending fails

        Example:
            >>> result = email_service.send_verification_email(
            ...     to_email="user@example.com",
            ...     user_name="John Doe",
            ...     verification_token="abc123xyz"
            ... )
            >>> print(result['id'])  # Resend email ID
        """
        self._check_configured()

        # Build verification URL
        verification_url = f"{self.frontend_url}/verify-email?token={verification_token}"

        # Email subject
        subject = f"Welcome to {self.from_name}! Verify your email"

        # HTML email body
        html_body = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Verify Your Email</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
            <table role="presentation" style="width: 100%; border-collapse: collapse;">
                <tr>
                    <td style="padding: 40px 0; text-align: center; background-color: #f4f4f4;">
                        <table role="presentation" style="width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                            <!-- Header -->
                            <tr>
                                <td style="padding: 40px 30px; text-align: center; background-color: #4F46E5; border-radius: 8px 8px 0 0;">
                                    <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">{self.from_name}</h1>
                                </td>
                            </tr>

                            <!-- Body -->
                            <tr>
                                <td style="padding: 40px 30px;">
                                    <h2 style="margin: 0 0 20px 0; color: #333333; font-size: 24px;">
                                        Welcome, {user_name}!
                                    </h2>

                                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                                        Thank you for signing up with {self.from_name}. We're excited to have you on board!
                                    </p>

                                    <p style="margin: 0 0 30px 0; color: #666666; font-size: 16px; line-height: 1.5;">
                                        To get started, please verify your email address by clicking the button below:
                                    </p>

                                    <!-- CTA Button -->
                                    <table role="presentation" style="width: 100%; border-collapse: collapse;">
                                        <tr>
                                            <td style="text-align: center; padding: 0 0 30px 0;">
                                                <a href="{verification_url}"
                                                   style="display: inline-block; padding: 16px 40px; background-color: #4F46E5; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: bold;">
                                                    Verify Email Address
                                                </a>
                                            </td>
                                        </tr>
                                    </table>

                                    <p style="margin: 0 0 20px 0; color: #666666; font-size: 14px; line-height: 1.5;">
                                        Or copy and paste this link into your browser:
                                    </p>

                                    <p style="margin: 0 0 30px 0; padding: 12px; background-color: #f8f9fa; border-radius: 4px; word-break: break-all;">
                                        <a href="{verification_url}" style="color: #4F46E5; text-decoration: none; font-size: 14px;">
                                            {verification_url}
                                        </a>
                                    </p>

                                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 14px; line-height: 1.5;">
                                        This verification link will expire in 24 hours.
                                    </p>

                                    <p style="margin: 0; color: #999999; font-size: 14px; line-height: 1.5;">
                                        If you didn't create an account with {self.from_name}, you can safely ignore this email.
                                    </p>
                                </td>
                            </tr>

                            <!-- Footer -->
                            <tr>
                                <td style="padding: 30px; text-align: center; background-color: #f8f9fa; border-radius: 0 0 8px 8px;">
                                    <p style="margin: 0 0 10px 0; color: #999999; font-size: 12px;">
                                        &copy; {datetime.now().year} {self.from_name}. All rights reserved.
                                    </p>
                                    <p style="margin: 0; color: #999999; font-size: 12px;">
                                        This is an automated message, please do not reply.
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
            </table>
        </body>
        </html>
        """

        # Plain text version (fallback)
        text_body = f"""
        Welcome to {self.from_name}, {user_name}!

        Thank you for signing up. Please verify your email address by clicking the link below:

        {verification_url}

        This verification link will expire in 24 hours.

        If you didn't create an account with {self.from_name}, you can safely ignore this email.

        ---
        {self.from_name} Team
        """

        # Send email via Resend
        try:
            params = {
                "from": f"{self.from_name} <{self.from_email}>",
                "to": [to_email],
                "subject": subject,
                "html": html_body,
                "text": text_body,
            }

            response = resend.Emails.send(params)

            logger.info(f"Verification email sent to {to_email}, ID: {response.get('id')}")

            return {
                "success": True,
                "email_id": response.get("id"),
                "to": to_email,
                "subject": subject,
            }

        except Exception as e:
            logger.error(f"Failed to send verification email to {to_email}: {str(e)}")
            raise EmailSendError(f"Failed to send email: {str(e)}") from e

    def send_password_reset_email(
        self,
        to_email: str,
        user_name: str,
        reset_token: str
    ) -> Dict[str, Any]:
        """
        Send a password reset email.

        Args:
            to_email: Recipient email address
            user_name: User's full name
            reset_token: Unique token for password reset

        Returns:
            Dict containing email sending result

        Raises:
            EmailConfigurationError: If service is not configured
            EmailSendError: If email sending fails
        """
        self._check_configured()

        reset_url = f"{self.frontend_url}/reset-password?token={reset_token}"
        subject = "Reset Your Password"

        html_body = f"""
        <!DOCTYPE html>
        <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h2>Password Reset Request</h2>
            <p>Hi {user_name},</p>
            <p>We received a request to reset your password. Click the button below to reset it:</p>
            <p><a href="{reset_url}" style="display: inline-block; padding: 12px 24px; background-color: #4F46E5; color: white; text-decoration: none; border-radius: 4px;">Reset Password</a></p>
            <p>This link will expire in 1 hour.</p>
            <p>If you didn't request this, please ignore this email.</p>
            <p>Best regards,<br>{self.from_name} Team</p>
        </body>
        </html>
        """

        try:
            params = {
                "from": f"{self.from_name} <{self.from_email}>",
                "to": [to_email],
                "subject": subject,
                "html": html_body,
            }

            response = resend.Emails.send(params)
            logger.info(f"Password reset email sent to {to_email}")

            return {
                "success": True,
                "email_id": response.get("id"),
                "to": to_email,
            }

        except Exception as e:
            logger.error(f"Failed to send password reset email: {str(e)}")
            raise EmailSendError(f"Failed to send email: {str(e)}") from e

    def is_configured(self) -> bool:
        """
        Check if the email service is properly configured.

        Returns:
            True if configured, False otherwise
        """
        return self._configured


# Create a singleton instance
email_service = EmailService()
