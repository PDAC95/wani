"""
Common Pydantic schemas for API responses.

This module defines standard response formats for the API:
- Success responses
- Error responses
- Validation error responses
"""

from typing import Any, Optional, List, Dict
from pydantic import BaseModel, Field


class SuccessResponse(BaseModel):
    """
    Standard success response format.

    Attributes:
        success: Always True for success responses
        message: Human-readable success message
        data: Response data (any type)
    """
    success: bool = Field(True, description="Success indicator")
    message: str = Field(..., description="Success message")
    data: Any = Field(None, description="Response data")

    model_config = {
        "json_schema_extra": {
            "example": {
                "success": True,
                "message": "Operation completed successfully",
                "data": {"id": "123", "name": "Example"}
            }
        }
    }


class ErrorDetail(BaseModel):
    """
    Individual error detail.

    Attributes:
        field: Field name that caused the error (optional)
        message: Error message
        code: Error code (optional)
    """
    field: Optional[str] = Field(None, description="Field name")
    message: str = Field(..., description="Error message")
    code: Optional[str] = Field(None, description="Error code")


class ErrorResponse(BaseModel):
    """
    Standard error response format.

    Attributes:
        success: Always False for error responses
        error: Error type/code
        message: Human-readable error message
        details: Additional error details (optional)
    """
    success: bool = Field(False, description="Success indicator")
    error: str = Field(..., description="Error type or code")
    message: str = Field(..., description="Error message")
    details: Optional[List[ErrorDetail]] = Field(None, description="Error details")

    model_config = {
        "json_schema_extra": {
            "example": {
                "success": False,
                "error": "ValidationError",
                "message": "Validation failed",
                "details": [
                    {
                        "field": "email",
                        "message": "Invalid email format",
                        "code": "invalid_email"
                    }
                ]
            }
        }
    }


class ValidationErrorResponse(BaseModel):
    """
    Validation error response format (422).

    Attributes:
        success: Always False
        error: Always "ValidationError"
        message: Human-readable error message
        details: List of validation errors
    """
    success: bool = Field(False, description="Success indicator")
    error: str = Field("ValidationError", description="Error type")
    message: str = Field(..., description="Error message")
    details: List[ErrorDetail] = Field(..., description="Validation errors")
