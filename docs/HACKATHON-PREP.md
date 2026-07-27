# 🏆 Akkaverse — Hackathon Preparation Guide

> **Event:** AKKA World Kannada Conference 2026 · Silver Jubilee
> **Track:** Cultural Continuity & Identity
> **One line:** *Akkaverse preserves an elder's Kannada words and turns them into a bilingual family heirloom and lesson for the next generation.*

---

## 1. The Story (tell this, don't list features)

Every diaspora family carries a quiet fear: **that the language ends with them.**

A grandmother in a village near Chikkaballapura speaks Kannada at dawn and at festivals. Her grandchild, growing up in Dallas, can say *ajji* — but can't read a single letter of ಕನ್ನಡ. Textbooks are boring. YouTube is passive. And nothing connects the child to the grandparent's world.

**Akkaverse is the bridge.**

It begins with *your* family. You plant your roots, preserve an elder's blessing, story, song, or recipe, and attach their original recording when the family is ready. Until then, Akkaverse uses a clearly labeled synthesized Kannada narrator. The words become a private bilingual capsule and a small lesson a grandchild can open from a family link. From that intimate moment, the whole culture opens outward: the villages they walked, the legends that shaped them, the festivals they celebrated, and a grounded AI guide named *Akka*.

It's not a set of pages. **It's one story — and it's yours.**

> Close every conversation and the demo on this line:
> **"A language doesn't die when the last speaker forgets. It dies when we stop passing it on. Akkaverse is how we pass it on. ನಮ್ಮ ಕಥೆ ಮುಂದುವರಿಯಲಿ — let our story continue."**

---

## 2. The 30-second elevator pitch

> "Akkaverse helps diaspora families preserve an elder's Kannada words and pass them to a child as a bilingual voice capsule and lesson. A family can use synthesized narration now, attach the elder's consented original recording later, and share only the capsule through a private link. From there they explore the places, stories, festivals, and language behind it with Akka, our source-grounded AI guide."

---

## 3. The 3-minute pitch (structured)

**Problem (35s).** The Kannada diaspora is one generation from silence. AKKA families watch their kids grow up unable to read ಕನ್ನಡ. Existing tools are boring or passive, and nothing connects a child abroad to a grandparent's village.

**Solution (40s).** Akkaverse begins with **Voice Legacy**: preserve an elder's words, attach an original recording with consent, and send a private bilingual capsule that teaches a child one Kannada phrase. Roots, Story Theater, the Dasara Archive, district Explorer, learning game, and grounded AI then open outward from that family story.

**Impact (30s).** Built for AKKA families and weekend Kannada schools. Browsing needs no login; verified accounts sync private family archives and original voices across devices, while consented community memories appear in real time. Show real pilot counts rather than projected numbers.

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

**0:50 — ROOTS + VOICE LEGACY (the emotional peak).** Click **Begin with your Roots**. Open the letter and play its clearly labeled Kannada narration. Create a Voice Capsule for a parent with **Fill demo blessing**, confirm family permission, and save. Explain: "The narration is temporary; the original recording replaces it here when the family is ready."

**2:00 — PASS IT ON.** Open **Child lesson**, answer the meaning question, then choose **Pass it on**. Scan/open the private family link on a second phone. Point to the privacy notice: the link exposes neither the family tree nor local original audio.

**2:45 — STORY THEATER.** Open one story, switch **Cinema → Storybook**. "Same heritage, lived three ways." Move on quickly.

**3:30 — AKKA (the AI).** Go to Chat. Ask a pre-tested but non-seeded question. Point at the Wikipedia source chips, repeat the question to demonstrate cached speed with citations intact, then switch the reply language to ಕನ್ನಡ.

**4:10 — The offline flourish.** On the production build, first reload once so the service worker controls the page and visit Roots while online. Then turn off Wi-Fi and reload that same visited page. Say: "Visited family experiences remain available through weak connectivity." Do not claim every unvisited route or cloud narration works offline.

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

**Q: Is that really the elder's voice?**
Not unless the family attaches an original recording. The default is explicitly labeled synthesized Kannada narration. Original audio is recorded or uploaded with consent, saved locally first, and privately synced for authenticated users. We never present synthetic audio as a relative's voice.

**Q: What happens when the original recording is attached?**
The existing capsule upgrades in place. Signed-in users sync it to a private Supabase Storage folder and other devices receive a short-lived signed URL. Public family links still carry only text and synthesized narration.

**Q: Can I ask it anything, or just Karnataka?**
It specialises in Karnataka and Kannada but also handles state comparisons, family/genealogy, travel, and general questions a curious visitor might ask.

### Data, privacy & security
**Q: Where does my family data live?**
Signed-out work stays local. Signed-in family archives live in an RLS-protected row keyed to the authenticated user; original recordings use a private Storage folder. A family link contains only selected text and metadata. Community memories are public by explicit action.

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
- **"Isn't Memory Wall just localStorage?"** → "It has two explicit modes: private account-scoped browser notes, and a realtime Supabase community wall. Verified users publish; RLS restricts deletion to the author."
- **"Isn't the content just Wikipedia?"** → "Imagery and live facts are sourced and *cited* from Wikipedia; the curated datasets, the bilingual authoring, and the experience are ours. The value is the emotional, bilingual design — not raw facts."
- **"Ask your AI a question I make up."** → Let them. It's grounded and honest; if unsure it says so. That's a feature, demo it confidently.

---

## 7. Architecture cheat-sheet (one-liners to say)

- "Bilingual **by architecture** — labels are i18n keys, so every string is English + ಕನ್ನಡ."
- "The AI key **never** reaches the browser — it's server-only in a Next.js route handler."
- "Answers are **grounded and cited** — live Wikipedia retrieval, not the model's memory."
- "**Reply language is a choice** — Auto, English, ಕನ್ನಡ, or both."
- "**Resilient PWA** — visited core pages and static heritage assets are cached; live AI and cloud narration still need a network."
- "**Graceful degradation** — seeded answers + curated KB mean it never fails on stage."

---

## 8. Known limitations (own them before judges raise them)

- Cloud sync requires a verified account; signed-out data remains device-local.
- Community publication is real and rate-limited; moderator approval remains the next production step.
- Hyper-current single facts (today's CM) are answered honestly, not guessed.
- Some imagery is sourced from Wikipedia (cited); commissioned media is a funding item.

*Owning these makes you look senior. Pretending they don't exist gets you caught.*
