"""
API v1 Routes Package.

This package contains all route modules for API v1.
"""

from fastapi import APIRouter
from .auth import router as auth_router

# Create main router for v1 routes
router = APIRouter()

# Include all route modules
router.include_router(auth_router)

__all__ = ["router"]
