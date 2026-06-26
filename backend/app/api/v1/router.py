"""
API v1 aggregate router.

Each feature gets its own route module (chat, lessons, explorer, ...).
We include them all here so `main.py` only needs to mount ONE router.
This keeps the entrypoint clean and makes adding features a one-line change.
"""

from fastapi import APIRouter

from app.api.v1.routes import health

api_router = APIRouter()

# Mount feature routers. New features (chat, lessons, ...) get added here.
api_router.include_router(health.router)
