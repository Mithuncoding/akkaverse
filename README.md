# 🪔 Akkaverse

> A bilingual (English + ಕನ್ನಡ) platform to **preserve, teach, and celebrate**
> Kannada language, history, culture, and heritage.

Akkaverse is a local-first **Next.js + Supabase** app. Authenticated families
sync a private archive and original recordings across devices, while the
community Memory Wall updates in real time. Row Level Security keeps each
family archive private. The core cultural content still works without an
account or AI key.

---

## ✨ What's inside

- **Assistant** — ask about Karnataka's history, temples, festivals and food.
- **Voice Legacy** — preserve an elder's words, add their original recording
   when available, and pass a private bilingual lesson to the next generation.
- **Accounts & realtime** — verified email authentication, private family sync,
   private audio storage, password recovery, and a live community wall.
- **Learn** — structured Kannada lessons with read-aloud.
- **Explore** — interactive Karnataka district map with cached Wikipedia info & photos.
- **Festivals, Stories & Timeline** — curated heritage content.
- **Quiz** — test your Karnataka knowledge.
- **Tools** — in-browser Kannada OCR (private, nothing is uploaded).
- **Memory Wall** — private family notes plus a realtime community archive.
- **Our Story** — a personal note from the maker.

Everything is bilingual and works in English, ಕನ್ನಡ, or both at once.

---

## 🧱 Tech Stack

| Layer    | Technology |
|----------|------------|
| Framework | Next.js (App Router), React, TypeScript |
| Styling   | Tailwind CSS, shadcn/ui |
| AI        | Language-aware NVIDIA NIM model pool through a server-only Next.js route, plus Wikipedia grounding |
| Voice     | Keyless synthesized Kannada TTS; optional original recordings |
| OCR       | Tesseract.js (runs in the browser) |
| Data      | Curated local datasets + cached Wikipedia (REST + PageImages) |
| Storage   | `localStorage` (family/capsules) + IndexedDB (original audio) |
| Identity & DB | Supabase Auth, Postgres, Realtime, Storage, and RLS |
| Server    | Next.js route handlers for AI and narration |
| Deploy    | Vercel |

An account is optional for browsing; it is required for cloud sync and public
contributions. `NVIDIA_API_KEY` remains optional and server-only. Follow
[docs/SUPABASE-SETUP.md](docs/SUPABASE-SETUP.md) once, then see
[docs/DEPLOY.md](docs/DEPLOY.md) for deployment.

---

## 📁 Repository Structure

```
akkaverse/
├── frontend/            # The Next.js app (everything lives here)
│   ├── src/
│   │   ├── app/         # App Router routes, layouts, pages
│   │   ├── components/  # React components (+ ui/ primitives)
│   │   ├── lib/         # Helpers (wiki, speech, utils)
│   │   ├── config/      # Site config (nav, features, metadata)
│   │   ├── data/        # Cached district manifest, curated datasets
│   │   └── i18n/        # English + Kannada translations
│   ├── public/          # Static assets (district images, geojson, photo)
│   └── scripts/         # Build-time helpers (district image cache)
└── README.md
```

---

## 🚀 Getting Started (local)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

Useful scripts (run from `frontend/`):

```bash
npm run dev         # start the dev server
npm run build       # production build
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
```

### Refresh district images (optional)

District photos and summaries are cached locally so the Explore map loads
instantly. To refresh them from Wikipedia:

```bash
node --use-system-ca frontend/scripts/cache-districts.mjs
```

---

## ▲ Deploy to Vercel

1. Push this repo to GitHub.
2. In Vercel, **Import** the repository.
3. Set the **Root Directory** to `frontend`.
4. Framework preset auto-detects **Next.js** — keep the defaults
   (`npm run build`). Add `NVIDIA_API_KEY` to enable live Akka answers; without
   it, seeded and curated fallback experiences still work.
5. Deploy. 🎉

---

## 📜 License

MIT — built as an open, educational heritage project by Mithun Rajanna.
