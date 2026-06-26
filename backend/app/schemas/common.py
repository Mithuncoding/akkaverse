"""
Reusable API response/error schemas.

Defining a consistent envelope for errors (and simple OK responses) early on
keeps the whole API predictable for the frontend — every error looks the same.
"""

from typing import Generic, TypeVar

from pydantic import BaseModel

T = TypeVar("T")


class HealthResponse(BaseModel):
    """Returned by the health-check endpoint."""

    status: str
    app: str
    environment: str
    version: str


class ErrorResponse(BaseModel):
    """Standard error envelope returned for handled exceptions."""

    detail: str
    code: str | None = None


class DataResponse(BaseModel, Generic[T]):
    """Generic success envelope: `{ "data": <payload> }`."""

    data: T
