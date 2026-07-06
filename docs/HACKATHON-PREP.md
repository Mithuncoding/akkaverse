# 🏆 Akkaverse — Hackathon Preparation Guide

> **Event:** AKKA World Kannada Conference 2026 · Silver Jubilee
> **Track:** Cultural Continuity & Identity
> **One line:** *An AI-powered, bilingual home for Karnataka's heritage — built so a Kannada-American child can fall back in love with where they came from.*

---

## 1. The Story (tell this, don't list features)

Every diaspora family carries a quiet fear: **that the language ends with them.**

A grandmother in a village near Chikkaballapura speaks Kannada at dawn and at festivals. Her grandchild, growing up in Dallas, can say *ajji* — but can't read a single letter of ಕನ್ನಡ. Textbooks are boring. YouTube is passive. And nothing connects the child to the grandparent's world.

**Akkaverse is the bridge.**

It begins with *your* family. You plant your roots — the elders who made you — and Akkaverse writes a letter from your grandmother, in her own tongue, and **speaks it aloud in Kannada**. From that one intimate moment, the whole culture opens outward: the villages they walked (the map), the legends that shaped them (Story Theater), the festivals they celebrated (the Living Dasara Archive), the words they whispered (Kannada learning) — and a warm AI guide, *Akka*, who answers anything, grounded in real sources, in the language you choose.

It's not a set of pages. **It's one story — and it's yours.**

> Close every conversation and the demo on this line:
> **"A language doesn't die when the last speaker forgets. It dies when we stop passing it on. Akkaverse is how we pass it on. ನಮ್ಮ ಕಥೆ ಮುಂದುವರಿಯಲಿ — let our story continue."**

---

## 2. The 30-second elevator pitch

> "Akkaverse is a bilingual, AI-powered platform that preserves Karnataka's heritage — built for the Kannada diaspora. You start with your own family tree, hear a letter from your ancestor spoken in Kannada, and from there explore the districts, stories, festivals, and language they came from. Our AI guide, Akka, answers any question — grounded in live sources so it doesn't make things up — in English or Kannada, your choice. It runs free, offline-capable, on any phone."

---

## 3. The 3-minute pitch (structured)

**Problem (35s).** The Kannada diaspora is one generation from silence. AKKA families watch their kids grow up unable to read ಕನ್ನಡ. Existing tools are boring or passive, and nothing connects a child abroad to a grandparent's village.

**Solution (40s).** Akkaverse — an immersive, fully bilingual heritage platform. Ten experiences: **Roots** (family heritage), cinematic **Story Theater**, a **Dasara Living Archive**, a **district Explorer**, **Kannada learning**, a **quiz game**, and **Akka**, a grounded AI guide — all in English and ಕನ್ನಡ, side by side, so a parent and child use it *together*.

**Impact (30s).** Built for AKKA first: diaspora families, weekend Kannada classes, cultural chapters. Free, offline-capable (PWA), no login barrier — grandparents and kids can both use it today.

**AI (20s).** Akka is grounded in **live Wikipedia retrieval** and a curated knowledge base — so it teaches facts, marks uncertainty, and cites its sources instead of hallucinating. It even writes a letter from your ancestor and reads it aloud in Kannada.

**Technology (15s).** Next.js, a secure server-side AI layer (caching, rate-limiting, streaming), a Progressive Web App with offline caching, and a bilingual-by-architecture design system. AI via NVIDIA NIM.

**Future (25s).** Community oral-history capture so elders record proverbs and songs in their own voice; a school mode for Kannada Balagas; and AKKA-chapter content contributions — turning Akkaverse into the living archive of the global Kannada community.

**Closing (15s).** "We can't stop a generation from growing up abroad. But we can make sure they grow up knowing they came from somewhere beautiful. **ಕನ್ನಡ ಎಂದೆಂದಿಗೂ.**"

---

## 4. The 5-minute demo flow (exact clicks)

> Rehearse this 8–10 times until it's muscle memory. Fewer features, more feeling.

**0:00 — Open on a slide, not the app.** Look at the judges:
> "How many of you have a grandchild who can't read Kannada? *(pause)* This is for them."

**0:20 — Home page.** One breath of the hero. "Ten experiences live here. I'll show you three." Point to the **ನಮ್ಮ ಪಯಣ / The Journey** section: "Akkaverse isn't pages — it's one story."

**0:50 — ROOTS (the emotional peak).** Click **Begin with your Roots**. Open the seeded family. Scroll to **"If They Could Speak"** → **Open the letter** → **Hear [grandmother] in Kannada**. **Stay silent while it speaks.** Then **Save card** — "This is what a diaspora kid keeps forever." Point out **Continue their story** → their district, festivals, era.

**2:30 — STORY THEATER.** Open one story, switch **Cinema → Storybook**. "Same heritage, lived three ways." 20 seconds, move on.

**3:30 — AKKA (the AI).** Go to Chat. Pick the **Historian** guide. Ask a pre-tested question (e.g., *"What are the most visited places in Karnataka?"*). Point at the **🌐 Wikipedia source chips**: "It answers from live sources and cites them — it doesn't make things up." Switch reply language to **ಕನ್ನಡ**, ask again, tap **Play voice** — Akka speaks Kannada.

**4:10 — The offline flourish.** Turn off Wi-Fi. Reload. "Still works — it's a PWA, so a family with weak signal, or a kid on a plane, never loses access."

**4:40 — Close on emotion.** Back to the final slide (giant ಕ glyph):
> "A language doesn't die when the last speaker forgets. It dies when we stop passing it on. **ನಮ್ಮ ಕಥೆ ಮುಂದುವರಿಯಲಿ.**"
Stop. Silence. Put up the QR code.

---

## 5. Presentation psychology (make them remember you)

- **Peak-end rule:** engineer three moments — the opening line (primacy), the Kannada ancestor voice (peak), the closing blessing (end).
- **Silence is a weapon.** When the voice speaks, say nothing.
- **One concrete human,** not "users." Name a child. Specific beats abstract.
- **Speak one full Kannada sentence yourself,** with feeling — you *are* the community.
- **The offline reveal** proves a claim instead of stating it.
- **A takeaway artifact** (Heritage Card + QR) leaves the room with them.
- **The name is the message:** the project is "Akkaverse", the judges are "AKKA." Repeat it.
- **End on Kannada,** not English. The last sound in the room should be the language you're saving.

---

## 6. Probable technical questions (with strong answers)

### Architecture & stack
**Q: What's the stack?**
Next.js 14 (App Router) + React + TypeScript, Tailwind + shadcn/ui, deployed on Vercel. AI via NVIDIA NIM (OpenAI-compatible). It's a Progressive Web App with an offline service worker. Fully bilingual (English + Kannada) by architecture.

**Q: Frontend-only? Where's the backend?**
The heavy UI is client-side for speed and zero-cost hosting, but there *is* server code: **Next.js route handlers** (`/api/ask`, `/api/tts`) run server-side on Vercel. The AI key lives only there — it never reaches the browser.

**Q: What was the hardest part to build?**
The AI layer. `/api/ask` isn't a naked fetch — it does seeded answers, live web grounding, an LRU+TTL cache, in-flight de-duplication, per-IP rate limiting, SSE token streaming, and graceful fallback, plus a reply-language system. And making a *Kannada voice* work when browsers ship no Kannada TTS.

### AI & anti-hallucination
**Q: Isn't this just a ChatGPT wrapper?**
No. Three things make it different: (1) **live web grounding** — before answering, Akka retrieves real Wikipedia articles and answers from them; (2) it **cites its sources** as clickable links; (3) it's **honest** — for time-sensitive facts it says "this may have changed, check a current source" instead of guessing.

**Q: How do you prevent hallucination?**
Grounding + honesty. We inject retrieved Wikipedia text as the source of truth, and the system prompt forbids inventing names, dates, or statistics. We *deliberately rejected* a structured-data shortcut for "current CM" because it returned the Deputy CM — a confident wrong answer is worse than an honest "I'm not certain."

**Q: What model, and what does it cost?**
NVIDIA NIM, default `meta/llama-3.3-70b-instruct` — swappable with one env var. It's free via NVIDIA Build credits for the demo. The model is swappable; the cultural design and grounding are the real product.

**Q: Does the web search need an API key?**
No — it uses Wikipedia's public APIs (opensearch + full-text + extracts), keyless. Zero cost, no vendor lock-in.

**Q: What if the AI is down or there's no key?**
It still works. Common demo questions are **seeded** (instant, free), and there's a curated knowledge base fallback. The app never blocks on the network.

**Q: How does the Kannada voice work?**
Most devices have no Kannada TTS voice, so we proxy a free text-to-speech service server-side (`/api/tts`), chunk the text, and stream back MP3 — a real Kannada voice, no API key. It falls back to the browser voice if unavailable.

**Q: Can I ask it anything, or just Karnataka?**
It specialises in Karnataka and Kannada but also handles state comparisons, family/genealogy, travel, and general questions a curious visitor might ask.

### Data, privacy & security
**Q: Where does my family data live?**
Entirely in your browser (`localStorage`). Nothing is uploaded. That's a privacy feature — and honest: it's a private family archive, not a server database (yet).

**Q: Is the API key safe?**
Yes — it's read only from the server environment (`NVIDIA_API_KEY`, no `NEXT_PUBLIC_` prefix), so it's never bundled into the client. The browser talks only to our own `/api/ask`.

**Q: How do you stop abuse of the AI endpoint?**
A per-IP token-bucket rate limiter, tight timeouts, an LRU+TTL cache, and in-flight de-duplication so identical concurrent asks share one call.

### Scale & honesty
**Q: Could this scale to millions?**
The client and PWA scale trivially on Vercel's edge. The honest next step for true scale is a real database + accounts (for community contributions) and moving the rate-limit/cache to a shared store like Redis — on our roadmap.

**Q: What breaks first at 500 concurrent users?**
Nothing user-facing — static content and caching absorb it. The AI would be the bottleneck, which is why we seed + cache + rate-limit and degrade gracefully to curated answers.

**Q: What's your moat?**
Not the model (swappable). It's the **Kannada-first bilingual authenticity**, the **Roots/diaspora emotional design**, and being built *for the AKKA community*.

### Product
**Q: Who's your user?**
Diaspora families first — a parent and child using it together — plus weekend Kannada classes and cultural chapters.

**Q: What's the business model?**
Free and open for the community; institutional licensing (schools, tourism departments, AKKA chapters) and grants fund the content pipeline and oral-history archive.

**Q: Did you build this alone? How long?**
[Answer honestly — solo/team, timeframe.] Emphasise the breadth *and* polish shipped.

### Trap questions (stay calm, concede small, reframe)
- **"Isn't Memory Wall just localStorage?"** → "Yes, today it's a private family scrapbook. Turning it into a real, moderated community archive is our #1 roadmap item."
- **"Isn't the content just Wikipedia?"** → "Imagery and live facts are sourced and *cited* from Wikipedia; the curated datasets, the bilingual authoring, and the experience are ours. The value is the emotional, bilingual design — not raw facts."
- **"Ask your AI a question I make up."** → Let them. It's grounded and honest; if unsure it says so. That's a feature, demo it confidently.

---

## 7. Architecture cheat-sheet (one-liners to say)

- "Bilingual **by architecture** — labels are i18n keys, so every string is English + ಕನ್ನಡ."
- "The AI key **never** reaches the browser — it's server-only in a Next.js route handler."
- "Answers are **grounded and cited** — live Wikipedia retrieval, not the model's memory."
- "**Reply language is a choice** — Auto, English, ಕನ್ನಡ, or both."
- "**Offline-first** PWA — first visit fast, second nearly instant, works with no signal."
- "**Graceful degradation** — seeded answers + curated KB mean it never fails on stage."

---

## 8. Known limitations (own them before judges raise them)

- Family data is local-only (privacy plus: no accounts yet).
- "Community" features are single-player today — real community + moderation is roadmap.
- Hyper-current single facts (today's CM) are answered honestly, not guessed.
- Some imagery is sourced from Wikipedia (cited); commissioned media is a funding item.

*Owning these makes you look senior. Pretending they don't exist gets you caught.*
