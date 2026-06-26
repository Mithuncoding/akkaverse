"""
Business logic / domain layer.

Services orchestrate use-cases (e.g. "answer a heritage question with RAG").
They depend on repositories (data) and ai/ (LLM), but never on FastAPI itself —
keeping domain logic framework-agnostic and unit-testable.
"""
