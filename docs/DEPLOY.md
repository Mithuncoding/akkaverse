# ▲ Deploying Akkaverse to Vercel

A complete, copy-paste guide to get Akkaverse live — including the **NVIDIA API key setup** that powers the Akka AI.

> **Good news:** the app works *without* any key (seeded answers + curated knowledge base + Wikipedia grounding). The key just unlocks richer, streamed AI answers. Web grounding and the Kannada voice are **keyless**.

---

## 0. Prerequisites

- A **GitHub** account with this repo pushed (see [Pushing to GitHub](#5-pushing-to-github)).
- A **Vercel** account — sign up free at <https://vercel.com> (log in with GitHub).
- (Optional, recommended) An **NVIDIA Build** account for the AI key.

---

## 1. Get your NVIDIA NIM API key (free)

The AI (“Akka”) uses NVIDIA NIM — an OpenAI-compatible inference endpoint that is **free** via NVIDIA Build credits.

1. Go to **<https://build.nvidia.com>** and sign in (create a free account if needed).
2. Pick a model — search for **`meta/llama-3.3-70b-instruct`** (recommended). Any NIM chat model works.
3. On the model page, click **“Get API Key”** (or **Build** → **API Keys**).
4. Click **Generate Key**. Copy the key — it looks like `nvapi-xxxxxxxxxxxxxxxx`.
5. **Keep it secret.** Never commit it, never paste it in the browser code, never share it in a screenshot.

> You do **not** need a credit card for the free tier. If a model is slow to respond on a weak network, switch to `meta/llama-3.1-8b-instruct` (faster).

---

## 2. Deploy to Vercel

1. Go to <https://vercel.com/new>.
2. **Import** your `akkaverse` GitHub repository.
3. **⚠️ Set the Root Directory to `frontend`.** This is the single most important setting — the Next.js app lives in `frontend/`, not the repo root.
   - On the import screen, click **Edit** next to *Root Directory* → choose **`frontend`**.
4. Framework preset auto-detects **Next.js** — keep the defaults:
   - Build command: `next build` (default)
   - Output: `.next` (default)
   - Install command: `npm install` (default)
5. Before clicking Deploy, add your environment variables (next section).
6. Click **Deploy**. Wait ~1–2 minutes. 🎉

---

## 3. Set environment variables (the API key)

In the Vercel import screen (or later under **Project → Settings → Environment Variables**), add:

| Name | Value | Notes |
|------|-------|-------|
| `NVIDIA_API_KEY` | `nvapi-…` (your key) | **Server-only.** Do NOT prefix with `NEXT_PUBLIC_`. |
| `NIM_MODEL` | `meta/llama-3.3-70b-instruct` | Optional. Best quality on Vercel. Use `meta/llama-3.1-8b-instruct` if you want faster/cheaper. |

- Apply to **Production** (and Preview/Development if you like).
- **Security note:** because there is no `NEXT_PUBLIC_` prefix, the key stays on the server and is never bundled into the browser.
- After adding or changing env vars, **redeploy** (Vercel → Deployments → ⋯ → Redeploy) so they take effect.

That's it — no other variables are required. Wikipedia grounding and Kannada TTS need no keys.

---

## 4. Verify it works

Once deployed, open your Vercel URL and check:

1. **AI feature flag:** visit `https://YOUR-APP.vercel.app/api/ask` in the browser.
   - Expected: `{"enabled":true,"model":"meta/llama-3.3-70b-instruct"}`
   - If `"enabled":false` → the key isn't set correctly; re-check `NVIDIA_API_KEY` and redeploy.
2. **Chat:** open `/chat`, pick a guide, ask *"What are the most visited places in Karnataka?"* — you should see a streamed answer with **🌐 Wikipedia source chips**.
3. **Kannada voice:** open `/roots` → *If They Could Speak* → **Open the letter** → **Hear in Kannada**. You should hear audio.
4. **Offline:** load the site, then go offline and reload — it should still open (PWA).

---

## 5. Pushing to GitHub

From the repo root:

```bash
git add .
git commit -m "Your message"
git push -u origin main
```

If it's your first push and asks for credentials, use a **GitHub Personal Access Token** (Settings → Developer settings → Tokens) as the password, or sign in via the GitHub CLI (`gh auth login`).

> The `.env.local` file (your real key) is **gitignored** and will never be pushed. Only `.env.example` (a template with no secrets) is tracked. Verify with `git status` before pushing.

---

## 6. Running locally

```bash
cd frontend
npm install

# create your local secrets file
cp .env.example .env.local     # then edit .env.local and paste your key
```

Then start the dev server:

```bash
npm run dev
```

Open <http://localhost:3000>.

### Corporate / intercepted networks (TLS)

On some corporate networks, Node's outbound HTTPS (to NVIDIA / Wikipedia) fails with a certificate error. Fix by trusting the system CA when starting dev:

```powershell
# PowerShell
$env:NODE_OPTIONS='--use-system-ca'; npm run dev
```

```bash
# macOS / Linux (bash)
NODE_OPTIONS='--use-system-ca' npm run dev
```

Vercel's build/runtime does **not** need this — normal CA trust works there.

### Useful scripts (from `frontend/`)

```bash
npm run dev         # start the dev server
npm run build       # production build
npm run typecheck   # tsc --noEmit
npm run lint        # eslint
```

---

## 7. Troubleshooting

| Symptom | Fix |
|--------|-----|
| Build fails: "No Next.js version detected" | Root Directory isn't set to `frontend`. Fix in Project → Settings → General → Root Directory. |
| `/api/ask` returns `"enabled":false` | `NVIDIA_API_KEY` missing/misspelled, or you didn't redeploy after adding it. |
| AI answers are empty / never stream | Key invalid or model too slow. Try `NIM_MODEL=meta/llama-3.1-8b-instruct` and redeploy. |
| Locally: AI/Wikipedia calls fail with cert error | Start dev with `NODE_OPTIONS='--use-system-ca'` (see above). |
| Kannada voice silent | The keyless TTS proxy may be blocked on that network; it falls back to the browser voice automatically. |
| Fonts/Kannada look wrong on first build locally | `next/font` downloads Google fonts at build; on corporate TLS start with `--use-system-ca`. |

---

## 8. Environment variables reference

| Variable | Required | Default | Purpose |
|----------|----------|---------|---------|
| `NVIDIA_API_KEY` | No (app works without it) | — | Enables live Akka AI. Server-only. |
| `NIM_MODEL` | No | `meta/llama-3.3-70b-instruct` | Which NIM model to use. |
| `NIM_BASE_URL` | No | `https://integrate.api.nvidia.com/v1` | Override the NIM endpoint. |

**Never** create a `NEXT_PUBLIC_NVIDIA_API_KEY` — that would leak the key to the browser.
