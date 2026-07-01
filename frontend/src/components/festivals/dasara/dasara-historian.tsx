"use client";

import * as React from "react";
import { Sparkles, Send, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { streamAkka, askAkka } from "@/lib/ai/client";
import { archiveGrounding, DASARA_TIMELINE } from "@/data/dasara-archive";

const PROMPTS = [
  { en: "Why was 1947 Dasara unique?", kn: "೧೯೪೭ರ ದಸರಾ ಏಕೆ ವಿಶಿಷ್ಟ?" },
  { en: "What changed after 1971?", kn: "೧೯೭೧ರ ನಂತರ ಏನು ಬದಲಾಯಿತು?" },
  { en: "Who rides in the golden howdah, and why?", kn: "ಚಿನ್ನದ ಅಂಬಾರಿಯಲ್ಲಿ ಯಾರು ಸವಾರಿ ಮಾಡುತ್ತಾರೆ?" },
  { en: "How did Independence change the festival?", kn: "ಸ್ವಾತಂತ್ರ್ಯ ಹಬ್ಬವನ್ನು ಹೇಗೆ ಬದಲಿಸಿತು?" },
];

const HISTORIAN_SYSTEM =
  "You are the Historian of the Living Archive of Mysuru Dasara. Answer ONLY using the archive context provided below. Be warm, vivid and concise (2-3 short paragraphs). If the archive does not contain the answer, say so honestly and do not invent facts, names, dates or chief guests. Clearly separate documented facts from interpretation. If the user writes in Kannada, reply in Kannada.";

/**
 * The AI Historian — a contextual guide grounded strictly in the archive.
 *
 * It sends the flattened, honest capsule corpus as context to /api/ask and
 * streams the reply. If AI is unavailable it falls back to a curated answer
 * drawn from the same capsules, so the panel is never dead.
 */
export function DasaraHistorian({ onJump }: { onJump: (year: number) => void }) {
  const { bi, locale } = useTranslation();
  const [q, setQ] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [asked, setAsked] = React.useState<string | null>(null);

  const ask = React.useCallback(
    async (question: string) => {
      const trimmed = question.trim();
      if (!trimmed || busy) return;
      setBusy(true);
      setAsked(trimmed);
      setAnswer("");
      setQ("");

      const context = `${HISTORIAN_SYSTEM}\n\nARCHIVE:\n${archiveGrounding()}`;

      // Stream tokens live from the server (NVIDIA NIM).
      let streamed = "";
      const full = await streamAkka(trimmed, context, {
        onToken: (tok) => {
          streamed += tok;
          setAnswer(streamed);
        },
      });
      setBusy(false);

      // If streaming yielded nothing, fall back to a one-shot call, then to a
      // curated answer grounded in the same capsules — the panel is never dead.
      if (!full || !full.trim()) {
        const one = await askAkka(trimmed, context);
        const text = one?.text ?? fallbackAnswer(trimmed);
        const tokens = text.split(/(\s+)/);
        let i = 0;
        const id = setInterval(() => {
          setAnswer((a) => a + tokens[i]);
          i += 1;
          if (i >= tokens.length) clearInterval(id);
        }, 18);
      }
    },
    [busy],
  );

  // Offer year jumps for any years the answer mentions.
  const mentioned = React.useMemo(() => {
    const found = new Set<number>();
    for (const m of answer.matchAll(/\b(19|20)\d{2}\b/g)) {
      const y = Number(m[0]);
      if (DASARA_TIMELINE.some((c) => c.year === y)) found.add(y);
    }
    return [...found].sort();
  }, [answer]);

  return (
    <div className="overflow-hidden rounded-3xl border border-amber-100/15 bg-gradient-to-b from-[rgb(var(--accent)/0.1)] to-black/30">
      <div className="border-b border-amber-100/10 px-5 py-4 sm:px-7">
        <h2 className="flex items-center gap-2 text-lg font-bold text-amber-50 sm:text-xl">
          <Sparkles className="h-5 w-5 text-[rgb(var(--accent))]" />
          {bi("Ask the Historian", "ಇತಿಹಾಸಕಾರರನ್ನು ಕೇಳಿ")}
        </h2>
        <p className="mt-1 text-sm text-amber-100/60">
          {bi(
            "Grounded strictly in this archive — it won't invent history.",
            "ಕಟ್ಟುನಿಟ್ಟಾಗಿ ಈ ಆರ್ಕೈವ್ ಆಧಾರಿತ — ಇತಿಹಾಸ ಸೃಷ್ಟಿಸುವುದಿಲ್ಲ.",
          )}
        </p>
      </div>

      <div className="p-5 sm:p-7">
        {/* Suggested prompts */}
        {!asked && (
          <div className="mb-5 flex flex-wrap gap-2">
            {PROMPTS.map((p, i) => (
              <button
                key={i}
                onClick={() => ask(locale === "kn" ? p.kn : p.en)}
                className="rounded-full border border-amber-100/15 bg-black/30 px-3.5 py-2 text-left text-xs text-amber-100/75 transition-colors hover:border-[rgb(var(--accent)/0.5)] hover:text-amber-50"
              >
                {bi(p.en, p.kn)}
              </button>
            ))}
          </div>
        )}

        {/* Conversation */}
        {asked && (
          <div className="mb-5 space-y-4">
            <p className="text-sm font-semibold text-amber-200/80">
              <span className="text-amber-200/50">Q · </span>
              {asked}
            </p>
            <div className="rounded-2xl border border-amber-100/10 bg-black/30 p-4">
              {busy && !answer ? (
                <p className="flex items-center gap-2 text-sm text-amber-100/60">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {bi("Consulting the archive…", "ಆರ್ಕೈವ್ ಪರಿಶೀಲಿಸುತ್ತಿದೆ…")}
                </p>
              ) : (
                <p
                  className="whitespace-pre-wrap text-sm leading-relaxed text-amber-50/90"
                  aria-live="polite"
                >
                  {answer}
                </p>
              )}
              {mentioned.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-amber-100/10 pt-3">
                  <span className="text-[11px] uppercase tracking-wide text-amber-200/50">
                    {bi("Jump to", "ಇಲ್ಲಿಗೆ ಹೋಗಿ")}:
                  </span>
                  {mentioned.map((y) => (
                    <button
                      key={y}
                      onClick={() => onJump(y)}
                      className="rounded-full bg-[rgb(var(--accent)/0.2)] px-2.5 py-1 text-xs font-semibold tabular-nums text-amber-100 hover:bg-[rgb(var(--accent)/0.35)]"
                    >
                      {y} →
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            ask(q);
          }}
          className="flex items-center gap-2 rounded-full border border-amber-100/20 bg-black/40 px-4 py-2 focus-within:border-[rgb(var(--accent)/0.6)]"
        >
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            enterKeyHint="send"
            placeholder={bi(
              "Ask anything about a century of Dasara…",
              "ಶತಮಾನದ ದಸರಾ ಬಗ್ಗೆ ಏನಾದರೂ ಕೇಳಿ…",
            )}
            className="w-full bg-transparent text-base text-amber-50 placeholder:text-amber-100/40 focus:outline-none sm:text-sm"
          />
          <button
            type="submit"
            disabled={busy || !q.trim()}
            aria-label={bi("Send", "ಕಳುಹಿಸಿ")}
            className={cn(
              "grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[rgb(var(--accent))] text-black transition-all active:scale-90",
              (busy || !q.trim()) && "opacity-40",
            )}
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

/** Curated fallback when AI is unavailable — still grounded in the capsules. */
function fallbackAnswer(question: string): string {
  const q = question.toLowerCase();
  const pick = (year: number) =>
    DASARA_TIMELINE.find((c) => c.year === year);

  if (q.includes("1971") || q.includes("howdah") || q.includes("goddess")) {
    const c = pick(1971);
    return c
      ? `${c.summaryEn}\n\n(From the archive's 1971 capsule — documented history.)`
      : "";
  }
  if (q.includes("1947") || q.includes("independ")) {
    const c = pick(1947);
    return c ? `${c.summaryEn}\n\n(From the archive's 1947 capsule.)` : "";
  }
  if (q.includes("karnataka") || q.includes("1973") || q.includes("name")) {
    const c = pick(1973);
    return c ? `${c.summaryEn}\n\n(From the archive's 1973 capsule.)` : "";
  }
  return "The AI historian is offline right now, but you can explore every documented year with the Time Machine above. Try scrubbing to 1947, 1971 or 2010 — the archive's turning points.";
}
