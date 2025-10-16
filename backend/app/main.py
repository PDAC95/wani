"""
Wani - FastAPI Main Application
Entry point for the FastAPI backend server
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from datetime import datetime
import logging

# Import core modules
from app.core.config import settings
from app.core.logger import get_logger
from app.core.database import init_db, close_db, check_db_health
from app.middleware import setup_exception_handlers

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

# Setup exception handlers
setup_exception_handlers(app)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.get_allowed_origins(),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
        port=8000,
        reload=True,
        log_level="info"
    )
