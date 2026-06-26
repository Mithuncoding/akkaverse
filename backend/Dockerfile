# ============================================================
# Akkaverse Backend — Production Dockerfile
# Slim, multi-stage-friendly image for FastAPI + Uvicorn.
# ============================================================
FROM python:3.12-slim

# Prevent Python from writing .pyc files and buffering stdout/stderr
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1

WORKDIR /app

# Install dependencies first (better layer caching)
COPY requirements.txt .
RUN pip install --upgrade pip && pip install -r requirements.txt

# Copy application code
COPY . .

EXPOSE 8000

# Use 0.0.0.0 so the container is reachable from the host
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
