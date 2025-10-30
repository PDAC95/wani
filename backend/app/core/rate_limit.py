"""
Rate Limiting Configuration

This module provides the rate limiter instance used throughout the application.
The limiter is initialized here and imported by main.py and route files.
"""

from slowapi import Limiter
from slowapi.util import get_remote_address

# Initialize rate limiter
# Uses in-memory storage by default (for production, use Redis)
# Key function: get_remote_address - limits based on client IP
# Default limit: 1000 requests per hour (applies if no specific limit is set)
limiter = Limiter(
    key_func=get_remote_address,
    default_limits=["1000/hour"]
)
