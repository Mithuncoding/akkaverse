# 🪔 Akkaverse

> A bilingual (English + ಕನ್ನಡ) platform to **preserve, teach, and celebrate**
> Kannada language, history, culture, and heritage.

Akkaverse is a fully client-side **Next.js** app. It runs entirely in the
browser with **no backend, no database, and no API keys** — which makes it
free to run and a one-click deploy on **Vercel**.

---

## ✨ What's inside

- **Assistant** — ask about Karnataka's history, temples, festivals and food.
- **Learn** — structured Kannada lessons with read-aloud.
- **Explore** — interactive Karnataka district map with cached Wikipedia info & photos.
- **Festivals, Stories & Timeline** — curated heritage content.
- **Quiz** — test your Karnataka knowledge.
- **Tools** — in-browser Kannada OCR (private, nothing is uploaded).
- **Memory Wall** — a community scrapbook of proverbs, folk songs and memories (saved locally).
- **Our Story** — a personal note from the maker.

Everything is bilingual and works in English, ಕನ್ನಡ, or both at once.

---

## 🧱 Tech Stack

| Layer    | Technology |
|----------|------------|
| Framework | Next.js (App Router), React, TypeScript |
| Styling   | Tailwind CSS, shadcn/ui |
| Voice     | Web Speech API (browser TTS) |
| OCR       | Tesseract.js (runs in the browser) |
| Data      | Curated local datasets + cached Wikipedia (REST + PageImages) |
| Storage   | `localStorage` (Memory Wall) |
| Deploy    | Vercel |

No server, database, or third-party API keys are required.

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
   (`npm run build`). No environment variables are needed.
5. Deploy. 🎉

---

## 📜 License

MIT — built as an open, educational heritage project by Mithun Rajanna.
