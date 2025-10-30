"""
Wani - Database Configuration
PostgreSQL connection via Supabase with SQLAlchemy
"""

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool
from sqlalchemy import text
from typing import AsyncGenerator
import logging
import sys
import asyncio

from app.core.config import settings

# Windows-specific event loop configuration for psycopg3
if sys.platform == 'win32':
    # Set the event loop policy to use selector on Windows
    # This is required for psycopg3 async to work on Windows
    asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

# Configure logging
logger = logging.getLogger(__name__)

# Create SQLAlchemy Base for models
Base = declarative_base()

# Global variables for engine and session factory (lazy initialization)
engine = None
AsyncSessionLocal = None


def get_async_engine():
    """
    Get or create the async database engine with lazy initialization.
    This ensures the engine is created AFTER the event loop policy is properly configured.
    """
    global engine
    if engine is None:
        logger.info("Creating async database engine with psycopg3...")
        # Using psycopg3 (async) driver - compatible with Python 3.13+
        engine = create_async_engine(
            settings.DATABASE_URL.replace("postgresql://", "postgresql+psycopg://"),
            echo=settings.DEBUG,  # Log SQL queries in debug mode
            pool_size=20,  # Connection pool size
            max_overflow=0,  # No additional connections beyond pool_size
            pool_pre_ping=True,  # Verify connections before using
            pool_recycle=3600,  # Recycle connections after 1 hour
        )
        logger.info("✅ Database engine created successfully")
    return engine


def get_session_factory():
    """
    Get or create the async session factory.
    """
    global AsyncSessionLocal
    if AsyncSessionLocal is None:
        engine = get_async_engine()
        AsyncSessionLocal = async_sessionmaker(
            engine,
            class_=AsyncSession,
            expire_on_commit=False,
            autocommit=False,
            autoflush=False,
        )
    return AsyncSessionLocal


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency function to get database session
    Usage:
        @app.get("/endpoint")
        async def endpoint(db: AsyncSession = Depends(get_db)):
            # Use db session here
    """
    session_factory = get_session_factory()
    async with session_factory() as session:
        try:
            yield session
            await session.commit()
        except Exception as e:
            await session.rollback()
            logger.error(f"Database session error: {str(e)}", exc_info=True)
            raise
        finally:
            await session.close()


async def init_db():
    """
    Initialize database connection and create tables
    Called during application startup
    """
    try:
        logger.info("🗄️  Initializing database connection...")

        # Get the engine (will create it if not exists)
        db_engine = get_async_engine()

        # Test connection
        async with db_engine.begin() as conn:
            # Import all models here to ensure they're registered
            # Import user model
            from app.models import user  # noqa: F401

            # Create tables (for development only, use Alembic in production)
            if settings.DEBUG:
                logger.warning("⚠️  DEBUG mode: Creating tables automatically")
                await conn.run_sync(Base.metadata.create_all)

        logger.info("✅ Database connection established successfully")
        return True

    except Exception as e:
        logger.error(f"❌ Database connection failed: {str(e)}", exc_info=True)
        raise


async def close_db():
    """
    Close database connection
    Called during application shutdown
    """
    global engine
    try:
        if engine is not None:
            logger.info("🔌 Closing database connection...")
            await engine.dispose()
            logger.info("✅ Database connection closed successfully")
    except Exception as e:
        logger.error(f"❌ Error closing database: {str(e)}", exc_info=True)


# Health check function
async def check_db_health() -> bool:
    """
    Check if database connection is healthy
    Returns True if connection is successful
    """
    try:
        db_engine = get_async_engine()
        async with db_engine.begin() as conn:
            await conn.execute(text("SELECT 1"))
        return True
    except Exception as e:
        logger.error(f"Database health check failed: {str(e)}")
        return False
