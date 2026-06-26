"""
Akkaverse API — application entrypoint.

We use the *application factory* pattern (`create_app`) instead of a bare
module-level `app = FastAPI()`. Why?
  * Testability: tests can build a fresh app with overridden settings.
  * Clarity: all wiring (CORS, routers, error handlers, lifespan) lives in one
    obvious place.
  * Extensibility: middleware/observability can be added without touching routes.
"""

from contextlib import asynccontextmanager

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.api.v1.router import api_router
from app.core.config import settings
from app.core.logging import configure_logging, get_logger

logger = get_logger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Startup/shutdown hooks.

    On startup we configure logging and log the environment. Later this is where
    we'll warm the DB connection pool and the vector store / embedding model.
    """
    configure_logging()
    logger.info("Starting %s in %s mode", settings.APP_NAME, settings.ENVIRONMENT)
    yield
    logger.info("Shutting down %s", settings.APP_NAME)


def create_app() -> FastAPI:
    """Build and configure the FastAPI application."""
    app = FastAPI(
        title=settings.APP_NAME,
        version="0.1.0",
        description="AI platform to preserve and teach Kannada language & heritage.",
        docs_url="/docs",
        redoc_url="/redoc",
        lifespan=lifespan,
    )

    # --- CORS: allow the Next.js frontend to call the API in the browser ---
    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.cors_origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # --- Global fallback error handler: never leak stack traces to clients ---
    @app.exception_handler(Exception)
    async def unhandled_exception_handler(request: Request, exc: Exception):
        logger.exception("Unhandled error on %s %s", request.method, request.url.path)
        return JSONResponse(
            status_code=500,
            content={"detail": "Internal server error", "code": "internal_error"},
        )

    # --- Mount versioned API ---
    app.include_router(api_router, prefix=settings.API_V1_PREFIX)

    # --- Friendly root ---
    @app.get("/", tags=["root"], summary="API root")
    async def root() -> dict[str, str]:
        return {
            "message": "Welcome to Akkaverse API 🪔",
            "docs": "/docs",
            "health": f"{settings.API_V1_PREFIX}/health",
        }

    return app


app = create_app()
