"""
Wani - FastAPI Main Application
Entry point for the FastAPI backend server
"""

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
import logging
import sys
import asyncio
from slowapi import _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded

# Windows-specific event loop configuration for psycopg3
if sys.platform == 'win32':
    # Set the event loop policy to use selector on Windows
    # This is required for psycopg3 async to work on Windows
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Import core modules
from app.core.config import settings
from app.core.logger import get_logger
from app.core.database import init_db, close_db, check_db_health
from app.core.rate_limit import limiter
from app.middleware import setup_exception_handlers

# Import API routers
from app.api.v1 import router as api_v1_router

# Initialize logger
logger = get_logger(__name__)

# Initialize FastAPI app
app = FastAPI(
    title="Wani API",
    description="Remittance & Digital Wallet Platform - Peace of mind in every transaction",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# Add rate limiter to app state
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# Setup exception handlers
setup_exception_handlers(app)

# Configure CORS
# In development, allow all origins for easier mobile testing
# In production, use specific allowed origins from settings
if settings.NODE_ENV == "development":
    logger.info("CORS: Allowing all origins (development mode)")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],  # Allow all origins in development
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    logger.info(f"CORS: Allowing specific origins: {settings.get_allowed_origins()}")
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.get_allowed_origins(),
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include API routers
app.include_router(api_v1_router, prefix="/api")


@app.get("/health", tags=["Health"])
async def health_check():
    """
    Health check endpoint to verify API is running
    Returns server status, database health, and timestamp
    """
    # Check database health
    db_healthy = await check_db_health()

    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": {
                "status": "healthy" if db_healthy else "degraded",
                "service": "wani-api",
                "version": "1.0.0",
                "database": "healthy" if db_healthy else "unhealthy",
                "environment": settings.NODE_ENV,
                "timestamp": datetime.utcnow().isoformat() + "Z"
            },
            "error": None,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    )


@app.get("/", tags=["Root"])
async def root():
    """
    Root endpoint with API information
    """
    return JSONResponse(
        status_code=200,
        content={
            "success": True,
            "data": {
                "message": "Wani API - Remittance & Digital Wallet Platform",
                "tagline": "Peace of mind in every transaction (和 - Wa: Peace, Harmony)",
                "version": "1.0.0",
                "docs": "/api/docs",
                "health": "/health"
            },
            "error": None,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        }
    )


# Startup event
@app.on_event("startup")
async def startup_event():
    """
    Actions to perform on application startup
    """
    logger.info("=" * 60)
    logger.info("🚀 Wani API Server Starting...")
    logger.info("=" * 60)
    logger.info(f"📝 Version: 1.0.0")
    logger.info(f"🌐 Environment: {settings.NODE_ENV}")
    logger.info(f"📚 API Docs: http://localhost:{settings.PORT}/api/docs")
    logger.info(f"🏥 Health Check: http://localhost:{settings.PORT}/health")
    logger.info("=" * 60)

    # Initialize database connection
    try:
        await init_db()
    except Exception as e:
        logger.error(f"Failed to initialize database: {str(e)}", exc_info=True)
        logger.warning("⚠️  Server starting without database connection")


# Shutdown event
@app.on_event("shutdown")
async def shutdown_event():
    """
    Actions to perform on application shutdown
    """
    logger.info("=" * 60)
    logger.info("🛑 Wani API Server Shutting Down...")
    logger.info("=" * 60)

    # Close database connection
    await close_db()


if __name__ == "__main__":
    import uvicorn

    # Run server with uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=9000,
        reload=True,
        log_level="info"
    )
