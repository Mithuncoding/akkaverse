"""
Centralized logging configuration.

A single `configure_logging()` call sets up structured, readable logs for the
whole app. Centralizing this (instead of scattering `logging.basicConfig`)
means every module gets consistent formatting and levels.
"""

import logging
import sys

from app.core.config import settings


def configure_logging() -> None:
    """Configure root logging once, at application startup."""
    level = logging.DEBUG if settings.DEBUG else logging.INFO

    handler = logging.StreamHandler(sys.stdout)
    handler.setFormatter(
        logging.Formatter(
            fmt="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s",
            datefmt="%Y-%m-%d %H:%M:%S",
        )
    )

    root = logging.getLogger()
    root.handlers.clear()
    root.addHandler(handler)
    root.setLevel(level)

    # Tame noisy third-party loggers in dev.
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)


def get_logger(name: str) -> logging.Logger:
    """Convenience accessor so modules can do `logger = get_logger(__name__)`."""
    return logging.getLogger(name)
