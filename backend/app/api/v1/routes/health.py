"""
Health & readiness endpoints.

These are intentionally trivial but important: deployment platforms
(Render, Fly.io, Vercel, Kubernetes) ping a health endpoint to decide whether
the service is alive and ready to receive traffic.
"""

from fastapi import APIRouter

from app.core.config import settings
from app.schemas.common import HealthResponse

router = APIRouter(tags=["health"])


@router.get("/health", response_model=HealthResponse, summary="Liveness check")
async def health() -> HealthResponse:
    """Return basic service metadata to confirm the API is running."""
    return HealthResponse(
        status="ok",
        app=settings.APP_NAME,
        environment=settings.ENVIRONMENT,
        version="0.1.0",
    )
