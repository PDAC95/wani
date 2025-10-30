"""
Wani - Error Handling Middleware
Global exception handler with standard error response format
"""

from fastapi import Request, status
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError
from starlette.exceptions import HTTPException as StarletteHTTPException
from datetime import datetime
import logging
import traceback
import uuid

logger = logging.getLogger(__name__)


class ErrorResponse:
    """Standard error response format"""

    @staticmethod
    def create(
        code: str,
        message: str,
        details: dict = None,
        status_code: int = 500
    ) -> JSONResponse:
        """
        Create standardized error response

        Args:
            code: Error code (e.g., "VALIDATION_ERROR")
            message: Human-readable error message
            details: Additional error details (optional)
            status_code: HTTP status code

        Returns:
            JSONResponse with standardized error format
        """
        return JSONResponse(
            status_code=status_code,
            content={
                "success": False,
                "data": None,
                "error": {
                    "code": code,
                    "message": message,
                    "details": details or {}
                },
                "timestamp": datetime.utcnow().isoformat() + "Z"
            }
        )


async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """
    Handle HTTP exceptions from FastAPI/Starlette

    Args:
        request: The incoming request
        exc: The HTTP exception

    Returns:
        Standardized error response
    """
    # Generate request ID for tracking
    request_id = str(uuid.uuid4())

    # Log the error
    logger.warning(
        f"HTTP Exception: {exc.status_code} - {exc.detail}",
        extra={
            "request_id": request_id,
            "method": request.method,
            "url": str(request.url),
            "status_code": exc.status_code
        }
    )

    # Extract error details if available
    detail = exc.detail
    error_code = f"HTTP_{exc.status_code}"
    error_message = detail if isinstance(detail, str) else "Request failed"
    error_details = detail if isinstance(detail, dict) else {}

    # Always include request_id for tracking
    error_details["request_id"] = request_id

    return ErrorResponse.create(
        code=error_code,
        message=error_message,
        details=error_details,
        status_code=exc.status_code
    )


async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """
    Handle Pydantic validation errors

    Args:
        request: The incoming request
        exc: The validation error

    Returns:
        Standardized error response with validation details
    """
    # Generate request ID for tracking
    request_id = str(uuid.uuid4())

    # Extract validation errors
    validation_errors = []
    for error in exc.errors():
        field = ".".join(str(loc) for loc in error["loc"])
        validation_errors.append({
            "field": field,
            "message": error["msg"],
            "type": error["type"]
        })

    # Log validation error
    logger.warning(
        f"Validation Error: {len(validation_errors)} field(s) failed validation",
        extra={
            "request_id": request_id,
            "method": request.method,
            "url": str(request.url),
            "errors": validation_errors
        }
    )

    return ErrorResponse.create(
        code="VALIDATION_ERROR",
        message="Request validation failed",
        details={
            "request_id": request_id,
            "validation_errors": validation_errors
        },
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY
    )


async def general_exception_handler(request: Request, exc: Exception):
    """
    Handle unexpected exceptions

    Args:
        request: The incoming request
        exc: The exception

    Returns:
        Standardized error response for internal server error
    """
    # Generate request ID for tracking
    request_id = str(uuid.uuid4())

    # Log the error with full traceback
    logger.error(
        f"Unhandled Exception: {type(exc).__name__} - {str(exc)}",
        exc_info=True,
        extra={
            "request_id": request_id,
            "method": request.method,
            "url": str(request.url),
            "exception_type": type(exc).__name__,
            "traceback": traceback.format_exc()
        }
    )

    # In production, don't expose internal error details
    from app.core.config import is_production

    if is_production():
        error_message = "An internal error occurred. Please try again later."
        error_details = {"request_id": request_id}
    else:
        error_message = f"{type(exc).__name__}: {str(exc)}"
        error_details = {
            "request_id": request_id,
            "exception_type": type(exc).__name__,
            "exception_message": str(exc)
        }

    return ErrorResponse.create(
        code="INTERNAL_ERROR",
        message=error_message,
        details=error_details,
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR
    )


def setup_exception_handlers(app):
    """
    Register all exception handlers with the FastAPI application

    Args:
        app: FastAPI application instance
    """
    app.add_exception_handler(StarletteHTTPException, http_exception_handler)
    app.add_exception_handler(RequestValidationError, validation_exception_handler)
    app.add_exception_handler(Exception, general_exception_handler)

    logger.info("✅ Exception handlers registered successfully")
