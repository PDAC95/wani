"""
Wani - Redis Cache Configuration
Upstash Redis connection for caching and session management
"""

import redis.asyncio as redis
from typing import Optional, Any
import json
import logging
from datetime import timedelta

from app.core.config import settings

logger = logging.getLogger(__name__)

# Global Redis client instance
redis_client: Optional[redis.Redis] = None


async def init_redis() -> redis.Redis:
    """
    Initialize Redis connection
    Called on application startup
    """
    global redis_client

    try:
        redis_client = redis.from_url(
            settings.REDIS_URL,
            encoding="utf-8",
            decode_responses=True,
            socket_timeout=5,
            socket_connect_timeout=5,
            retry_on_timeout=True,
            health_check_interval=30,
        )

        # Test connection
        await redis_client.ping()
        logger.info("✅ Redis connected successfully")
        return redis_client

    except Exception as e:
        logger.error(f"❌ Redis connection failed: {e}")
        raise


async def close_redis() -> None:
    """
    Close Redis connection
    Called on application shutdown
    """
    global redis_client

    if redis_client:
        await redis_client.close()
        logger.info("🔌 Redis connection closed")


async def get_redis() -> redis.Redis:
    """
    Get Redis client instance
    Usage:
        redis = await get_redis()
        await redis.set("key", "value")
    """
    global redis_client

    if redis_client is None:
        redis_client = await init_redis()

    return redis_client


async def check_redis_health() -> bool:
    """
    Check if Redis is healthy
    Returns True if connection is working
    """
    try:
        redis = await get_redis()
        await redis.ping()
        return True
    except Exception as e:
        logger.error(f"Redis health check failed: {e}")
        return False


# Cache Helper Functions

async def cache_set(
    key: str,
    value: Any,
    expire: Optional[int] = None
) -> bool:
    """
    Set a value in cache with optional expiration

    Args:
        key: Cache key
        value: Value to cache (will be JSON serialized)
        expire: Expiration time in seconds (None = no expiration)

    Returns:
        True if successful, False otherwise
    """
    try:
        redis = await get_redis()

        # Serialize complex objects to JSON
        if isinstance(value, (dict, list)):
            value = json.dumps(value)

        if expire:
            await redis.setex(key, expire, value)
        else:
            await redis.set(key, value)

        return True

    except Exception as e:
        logger.error(f"Cache set error for key '{key}': {e}")
        return False


async def cache_get(key: str) -> Optional[Any]:
    """
    Get a value from cache

    Args:
        key: Cache key

    Returns:
        Cached value or None if not found
    """
    try:
        redis = await get_redis()
        value = await redis.get(key)

        if value is None:
            return None

        # Try to deserialize JSON
        try:
            return json.loads(value)
        except (json.JSONDecodeError, TypeError):
            return value

    except Exception as e:
        logger.error(f"Cache get error for key '{key}': {e}")
        return None


async def cache_delete(key: str) -> bool:
    """
    Delete a value from cache

    Args:
        key: Cache key

    Returns:
        True if successful, False otherwise
    """
    try:
        redis = await get_redis()
        await redis.delete(key)
        return True

    except Exception as e:
        logger.error(f"Cache delete error for key '{key}': {e}")
        return False


async def cache_exists(key: str) -> bool:
    """
    Check if a key exists in cache

    Args:
        key: Cache key

    Returns:
        True if key exists, False otherwise
    """
    try:
        redis = await get_redis()
        return await redis.exists(key) > 0

    except Exception as e:
        logger.error(f"Cache exists error for key '{key}': {e}")
        return False


async def cache_increment(key: str, amount: int = 1) -> Optional[int]:
    """
    Increment a numeric value in cache
    Useful for rate limiting, counters, etc.

    Args:
        key: Cache key
        amount: Amount to increment by (default: 1)

    Returns:
        New value after increment, or None on error
    """
    try:
        redis = await get_redis()
        return await redis.incrby(key, amount)

    except Exception as e:
        logger.error(f"Cache increment error for key '{key}': {e}")
        return None


async def cache_expire(key: str, seconds: int) -> bool:
    """
    Set expiration time for an existing key

    Args:
        key: Cache key
        seconds: Expiration time in seconds

    Returns:
        True if successful, False otherwise
    """
    try:
        redis = await get_redis()
        await redis.expire(key, seconds)
        return True

    except Exception as e:
        logger.error(f"Cache expire error for key '{key}': {e}")
        return False


# Utility Functions for Common Use Cases

def get_user_session_key(user_id: str) -> str:
    """Generate Redis key for user session"""
    return f"session:user:{user_id}"


def get_rate_limit_key(identifier: str, endpoint: str) -> str:
    """Generate Redis key for rate limiting"""
    return f"ratelimit:{endpoint}:{identifier}"


def get_otp_key(phone: str) -> str:
    """Generate Redis key for OTP storage"""
    return f"otp:{phone}"


def get_transaction_lock_key(transaction_id: str) -> str:
    """Generate Redis key for transaction locking"""
    return f"lock:transaction:{transaction_id}"
