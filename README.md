# 🪔 Akkaverse

> An AI-powered platform to **preserve, teach, and celebrate** Kannada language, history, culture, and heritage.

Akkaverse is not a chatbot. It is a production-grade, RAG-powered cultural learning
platform for Karnataka — combining a Kannada AI assistant, structured language
lessons, AI storytelling, an interactive heritage explorer, OCR, and voice.

---

## ✨ Vision

Karnataka has 2,000+ years of literature, dynasties, temples, folklore, and art.
Most of it is scattered, untranslated, or inaccessible to younger generations.
Akkaverse uses modern AI (RAG + embeddings + Gemini) grounded in a curated
knowledge base so that answers are **accurate, cited, and culturally faithful** —
not hallucinated.

---

## 🧱 Tech Stack

| Layer            | Technology |
|------------------|------------|
| Frontend         | Next.js (App Router), React, TypeScript, Tailwind CSS, shadcn/ui |
| Backend          | FastAPI (Python), Pydantic v2 |
| Database         | PostgreSQL |
| Auth             | Clerk |
| Storage          | Supabase Storage |
| AI               | Gemini API (OpenAI-compatible abstraction), RAG, embeddings |
| Vector DB        | ChromaDB (initial), pgvector-ready |
| Deploy           | Vercel (frontend), Render / Fly.io (backend) |

---

## 🏛️ Architecture

Akkaverse follows a **clean, layered architecture** with a clear separation
between the presentation layer (Next.js), the API layer (FastAPI), and the
domain/data layers. The frontend never talks to the database or AI providers
directly — everything flows through a versioned REST API.

```
┌──────────────────────────────────────────────────────────────┐
│                        Browser (User)                          │
└──────────────────────────────┬───────────────────────────────┘
                               │  HTTPS
┌──────────────────────────────▼───────────────────────────────┐
│   Next.js (Vercel)  —  UI, SSR/RSC, Clerk auth, Tailwind       │
└──────────────────────────────┬───────────────────────────────┘
                               │  REST  (/api/v1/*)  + JWT
┌──────────────────────────────▼───────────────────────────────┐
│   FastAPI (Render/Fly)                                          │
│   ┌─────────┐   ┌──────────┐   ┌──────────┐   ┌────────────┐  │
│   │  API    │──▶│ Services │──▶│  Repos   │──▶│ PostgreSQL │  │
│   │ (routes)│   │ (domain) │   │ (data)   │   └────────────┘  │
│   └─────────┘   └────┬─────┘                                   │
│                      │                                          │
│                ┌─────▼──────┐   ┌──────────┐                   │
│                │ RAG engine │──▶│ ChromaDB │   Gemini / LLM    │
│                └────────────┘   └──────────┘                   │
└────────────────────────────────────────────────────────────────┘
```

**Why this design?** It is the standard pattern interviewers expect: testable
(each layer is mockable), swappable (Gemini ⇄ OpenAI, Chroma ⇄ pgvector without
touching routes), and scalable (frontend and backend deploy and scale
independently).

---

## 📁 Repository Structure

```
akkaverse/
├── frontend/            # Next.js app (UI, SSR, client interactions)
├── backend/             # FastAPI app (API, AI/RAG, business logic)
├── docker-compose.yml   # Local dev orchestration (db + backend + frontend)
├── .env.example         # Shared/root environment template
└── README.md
```

See [frontend/README-structure](#frontend-structure) and
[backend/README-structure](#backend-structure) below for per-app details.

### Frontend structure
```
frontend/
├── src/
│   ├── app/             # App Router routes, layouts, pages
│   ├── components/      # Reusable React components
│   │   └── ui/          # shadcn/ui primitives (button, card, ...)
│   ├── lib/             # Helpers (cn, api client, fetch wrappers)
│   ├── config/          # Static site config (nav, metadata, features)
│   └── styles/          # Global CSS / Tailwind layers
├── public/              # Static assets (images, icons, fonts)
└── ...config files
```

### Backend structure
```
backend/
├── app/
│   ├── main.py          # FastAPI entrypoint + app factory
│   ├── core/            # Cross-cutting concerns: config, logging, security
│   ├── api/v1/          # Versioned REST API (routes grouped by feature)
│   ├── schemas/         # Pydantic request/response models (API contracts)
│   ├── services/        # Business logic / domain layer
│   ├── repositories/    # Data access (PostgreSQL queries)
│   ├── models/          # ORM / DB models
│   ├── ai/              # LLM clients, RAG engine, embeddings, prompts
│   └── db/              # Session, engine, migrations bootstrap
└── ...config files
```

---

## 🗺️ Development Plan

The project is built **incrementally**, one feature at a time.

| Phase | Focus |
|-------|-------|
| **Phase 1** | Foundation, Auth (Clerk), Homepage, Kannada AI Chat, Database |
| **Phase 2** | Learn Kannada, Heritage Timeline, Karnataka Explorer |
| **Phase 3** | Voice, OCR, RAG ingestion pipeline, Admin Dashboard |
| **Phase 4** | Deployment, Testing, Performance optimization |

✅ **Current status:** Phase 1 — Foundation scaffolding.

---

## 🚀 Getting Started (local)

> Full setup instructions are added as each part is implemented.

```bash
# 1. Backend
cd backend
python -m venv .venv && .venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn app.main:app --reload

# 2. Frontend
cd frontend
npm install
npm run dev
```

Or run everything with Docker:
```bash
docker compose up --build
```

---

## 📜 License

MIT — built as an open, educational heritage project.
