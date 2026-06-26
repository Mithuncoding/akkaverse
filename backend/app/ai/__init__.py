"""
AI layer.

Houses the LLM provider abstraction (Gemini / OpenAI-compatible), the RAG
engine, embeddings, the vector-store client, and prompt templates. Isolating
this means the rest of the app treats "the AI" as a clean interface.
"""
