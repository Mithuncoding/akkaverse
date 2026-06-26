"""
Application configuration.

We use `pydantic-settings` so configuration is:
  * loaded from environment variables / `.env`,
  * type-validated at startup (fail fast on misconfiguration),
  * available as a single, importable, cached `settings` object.

Why a settings object instead of reading os.environ everywhere?
  -> One source of truth, testable, typed, and easy to mock in tests.
"""

from functools import lru_cache

from pydantic import Field
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Strongly-typed application settings sourced from the environment."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    # --- App metadata ---
    APP_NAME: str = "Akkaverse API"
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    API_V1_PREFIX: str = "/api/v1"

    # --- CORS ---
    # Comma-separated string in env -> parsed into a list below.
    BACKEND_CORS_ORIGINS: str = "http://localhost:3000"

    # --- Database ---
    DATABASE_URL: str = (
        "postgresql+psycopg://akkaverse:change_me@localhost:5432/akkaverse"
    )

    # --- AI providers ---
    GEMINI_API_KEY: str | None = None
    LLM_PROVIDER: str = "gemini"
    LLM_MODEL: str = "gemini-1.5-flash"

    # --- Auth (Clerk) ---
    CLERK_JWT_ISSUER: str | None = None
    CLERK_JWT_AUDIENCE: str | None = None

    @property
    def cors_origins(self) -> list[str]:
        """Return CORS origins as a clean list of strings."""
        return [o.strip() for o in self.BACKEND_CORS_ORIGINS.split(",") if o.strip()]

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT.lower() == "production"


@lru_cache
def get_settings() -> Settings:
    """
    Return a cached Settings instance.

    `lru_cache` ensures the env file is parsed exactly once per process,
    and lets tests override via dependency injection if needed.
    """
    return Settings()


settings = get_settings()
