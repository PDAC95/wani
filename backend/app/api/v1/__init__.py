"""
API v1 Package.

This package contains all v1 API routes and configuration.
"""

from fastapi import APIRouter
from .routes import router as routes_router

# Create main v1 router
router = APIRouter(prefix="/v1")

# Include all v1 routes
router.include_router(routes_router)

__all__ = ["router"]
