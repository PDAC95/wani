"""
Wani - Logging Configuration
Structured logging with console and file handlers
"""

import logging
import sys
from pathlib import Path
from datetime import datetime
from app.core.config import settings

# Create logs directory if it doesn't exist
LOGS_DIR = Path(__file__).parent.parent.parent / "logs"
LOGS_DIR.mkdir(exist_ok=True)

# Log file path with timestamp
LOG_FILE = LOGS_DIR / f"wani_{datetime.now().strftime('%Y%m%d')}.log"


def setup_logging():
    """
    Configure logging for the application
    Sets up both console and file handlers with appropriate formatting
    """

    # Determine log level based on environment
    log_level = logging.DEBUG if settings.DEBUG else logging.INFO

    # Create formatter
    formatter = logging.Formatter(
        fmt="%(asctime)s | %(levelname)-8s | %(name)s:%(funcName)s:%(lineno)d | %(message)s",
        datefmt="%Y-%m-%d %H:%M:%S"
    )

    # Console handler (stdout)
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(log_level)
    console_handler.setFormatter(formatter)

    # File handler
    file_handler = logging.FileHandler(LOG_FILE, encoding="utf-8")
    file_handler.setLevel(logging.INFO)  # Always log INFO and above to file
    file_handler.setFormatter(formatter)

    # Configure root logger
    root_logger = logging.getLogger()
    root_logger.setLevel(log_level)

    # Remove existing handlers
    root_logger.handlers.clear()

    # Add handlers
    root_logger.addHandler(console_handler)
    root_logger.addHandler(file_handler)

    # Reduce noise from third-party libraries
    logging.getLogger("uvicorn").setLevel(logging.INFO)
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("sqlalchemy.engine").setLevel(logging.WARNING)
    logging.getLogger("asyncio").setLevel(logging.WARNING)

    # Log initialization
    logger = logging.getLogger(__name__)
    logger.info("=" * 60)
    logger.info("📝 Logging system initialized")
    logger.info(f"📁 Log file: {LOG_FILE}")
    logger.info(f"🔍 Log level: {logging.getLevelName(log_level)}")
    logger.info(f"🌐 Environment: {settings.NODE_ENV}")
    logger.info("=" * 60)


# Initialize logging when module is imported
setup_logging()

# Export logger for use in other modules
def get_logger(name: str) -> logging.Logger:
    """
    Get a logger instance with the specified name

    Args:
        name: Name for the logger (typically __name__)

    Returns:
        Logger instance
    """
    return logging.getLogger(name)


# Create application logger
logger = get_logger(__name__)
