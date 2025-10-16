"""
Wani - Database Configuration
PostgreSQL connection via Supabase with SQLAlchemy
"""

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, async_sessionmaker
from sqlalchemy.orm import declarative_base
from sqlalchemy.pool import NullPool
from typing import AsyncGenerator
import logging

from app.core.config import settings

# Configure logging
logger = logging.getLogger(__name__)

# Create SQLAlchemy Base for models
Base = declarative_base()

# Database engine configuration
engine = create_async_engine(
    settings.DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://"),
    echo=settings.DEBUG,  # Log SQL queries in debug mode
    pool_size=20,  # Connection pool size
    max_overflow=0,  # No additional connections beyond pool_size
    pool_pre_ping=True,  # Verify connections before using
    pool_recycle=3600,  # Recycle connections after 1 hour
)

# Session factory
AsyncSessionLocal = async_sessionmaker(
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autocommit=False,
    autoflush=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Dependency function to get database session
    Usage:
        @app.get("/endpoint")
        async def endpoint(db: AsyncSession = Depends(get_db)):
            # Use db session here
    """
    async with AsyncSessionLocal() as session:
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

        # Test connection
        async with engine.begin() as conn:
            # Import all models here to ensure they're registered
            from app.models import user, wallet, transaction  # noqa: F401

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
    try:
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
        async with engine.begin() as conn:
            await conn.execute("SELECT 1")
        return True
    except Exception as e:
        logger.error(f"Database health check failed: {str(e)}")
        return False
