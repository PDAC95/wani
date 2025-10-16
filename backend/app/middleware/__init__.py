"""
Wani - Middleware Module
Custom middleware for error handling, rate limiting, etc.
"""

from app.middleware.error_handler import setup_exception_handlers, ErrorResponse

__all__ = ["setup_exception_handlers", "ErrorResponse"]
