"use client";

import * as React from "react";
import { X, Lightbulb, Sparkles, Check, ChevronRight, Trophy, Flame, Send, Loader2 } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { streamAkka } from "@/lib/ai/client";
import { buildQuizContext } from "@/lib/ai/grounding";
import { CountUp } from "@/components/ui/count-up";
import { categoryById, type BankQuestion } from "@/data/quiz-bank";
import type { QuizMode } from "@/data/quiz-modes";
import {
  commitSession,
  rankFor,
  useQuizProfile,
  weakestCategories,
  categoryLabel,
  XP_BY_DIFF,
  type Achievement,
  type Collectible,
} from "@/lib/quiz/profile";

type Answer = { origIdx: number | null; correct: boolean };

/**
 * Quiz Arena — one engine, every adventure. Static questions load instantly;
 * AI is summoned only on demand as a teacher (hint / teach me more / ask).
 */
export function QuizArena({
  mode,
  questions,
  onExit,
}: {
  mode: QuizMode;
  questions: BankQuestion[];
  onExit: () => void;
}) {
  const { bi } = useTranslation();
  const [index, setIndex] = React.useState(0);
  const [answer, setAnswer] = React.useState<Answer | null>(null);
  const [streak, setStreak] = React.useState(0);
  const [bestStreak, setBestStreak] = React.useState(0);
  const [correctCount, setCorrectCount] = React.useState(0);
  const [xp, setXp] = React.useState(0);
  const results = React.useRef<{ cat: BankQuestion["cat"]; correct: boolean; diff: BankQuestion["diff"] }[]>([]);
  const [phase, setPhase] = React.useState<"play" | "done">("play");
  const [unlocks, setUnlocks] = React.useState<{ achievements: Achievement[]; collectibles: Collectible[] }>({ achievements: [], collectibles: [] });
  const [burst, setBurst] = React.useState(0);
  const [timeLeft, setTimeLeft] = React.useState(mode.timer);

  const q = questions[index];

  // Shuffle option order once per session so the correct answer isn't always first.
  const orders = React.useMemo(
    () =>
      questions.map((qq) => {
        const idx = qq.options.en.map((_, i) => i);
        for (let i = idx.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [idx[i], idx[j]] = [idx[j], idx[i]];
        }
        return idx;
      }),
    [questions],
  );

  const style = {
    ["--accent" as string]: mode.accent,
    ["--accent2" as string]: mode.accent2,
  } as React.CSSProperties;

  const reveal = React.useCallback(
    (origIdx: number | null) => {
      if (answer) return;
      const correct = origIdx === q.answer;
      setAnswer({ origIdx, correct });
      results.current.push({ cat: q.cat, correct, diff: q.diff });
      if (correct) {
        const gained = XP_BY_DIFF[q.diff] + Math.min(streak, 5) * 2;
        setXp((x) => x + gained);
        setCorrectCount((c) => c + 1);
        setStreak((s) => {
          const ns = s + 1;
          setBestStreak((b) => Math.max(b, ns));
          return ns;
        });
        setBurst((b) => b + 1);
      } else {
        setStreak(0);
      }
    },
    [answer, q, streak],
  );

  // Timer for timed modes.
  React.useEffect(() => {
    if (mode.timer === 0 || answer || phase !== "play") return;
    setTimeLeft(mode.timer);
    const started = Date.now();
    const id = setInterval(() => {
      const left = mode.timer - Math.floor((Date.now() - started) / 1000);
      setTimeLeft(left);
      if (left <= 0) {
        clearInterval(id);
        reveal(null); // timed out → counts as a miss, but we still teach
      }
    }, 250);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, mode.timer, phase]);

  const next = () => {
    if (index + 1 >= questions.length) {
      const isPerfect = correctCount === questions.length;
      const res = commitSession({
        perCat: results.current,
        bestStreak,
        isPerfect,
        isDaily: mode.id === "daily",
        xpGained: xp + (isPerfect ? 50 : 0),
      });
      setUnlocks(res);
      setPhase("done");
      return;
    }
    setIndex((i) => i + 1);
    setAnswer(null);
  };

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && phase === "play" && onExit();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [onExit, phase]);

  if (phase === "done") {
    return (
      <div style={style} className="fixed inset-0 z-[70] overflow-y-auto bg-[#0b0a12] text-white">
        <VictoryScreen
          mode={mode}
          correct={correctCount}
          total={questions.length}
          xp={xp + (correctCount === questions.length ? 50 : 0)}
          bestStreak={bestStreak}
          unlocks={unlocks}
          onExit={onExit}
        />
      </div>
    );
  }

  return (
    <div style={style} className="fixed inset-0 z-[70] flex flex-col bg-[#0b0a12] text-white">
      {burst > 0 && <Confetti key={burst} />}

      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 sm:px-6">
        <button onClick={onExit} aria-label="Close" className="rounded-full border border-white/15 p-2 hover:bg-white/10">
          <X className="h-5 w-5" />
        </button>
        <div className="flex-1">
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[rgb(var(--accent))] [transition:width_.4s_ease]"
              style={{ width: `${((index + (answer ? 1 : 0)) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <span className="text-sm font-semibold tabular-nums text-white/70">
          {index + 1}/{questions.length}
        </span>
        {streak >= 2 && (
          <span className="inline-flex items-center gap-1 rounded-full bg-orange-500/20 px-2.5 py-1 text-xs font-bold text-orange-300">
            <Flame className="h-3.5 w-3.5" /> {streak}
          </span>
        )}
      </div>

      <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col overflow-y-auto px-4 pb-6 sm:px-6">
        {/* Question card with image */}
        <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/10">
          <JourneyFigure
            wiki={q.wiki ?? categoryById(q.cat).wiki}
            alt=""
            rounded="none"
            kenBurns
            lazy={false}
            className="absolute inset-0 h-full w-full opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0a12]/70 via-[#0b0a12]/85 to-[#0b0a12]" />
          <div className="relative p-5 sm:p-7">
            <div className="flex items-center gap-2">
              <span className="text-lg">{categoryById(q.cat).emoji}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/60">
                {bi(categoryById(q.cat).label.en, categoryById(q.cat).label.kn)} · {q.diff}
              </span>
              {mode.timer > 0 && !answer && (
                <span className={cn("ml-auto rounded-full px-2.5 py-1 text-xs font-bold tabular-nums", timeLeft <= 5 ? "bg-rose-500/25 text-rose-200" : "bg-white/10 text-white/80")}>
                  ⏱ {Math.max(0, timeLeft)}s
                </span>
              )}
            </div>
            <h2 className="mt-3 text-balance text-xl font-bold leading-snug sm:text-2xl">
              {bi(q.q.en, q.q.kn)}
            </h2>
          </div>
        </div>

        {/* Options */}
        <div className="mt-4 grid gap-3">
          {orders[index].map((origIdx) => {
            const label = bi(q.options.en[origIdx], q.options.kn[origIdx]);
            const isCorrect = origIdx === q.answer;
            const isChosen = answer?.origIdx === origIdx;
            const show = !!answer;
            return (
              <button
                key={origIdx}
                onClick={() => reveal(origIdx)}
                disabled={show}
                className={cn(
                  "flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-left text-sm font-medium transition-all sm:text-base",
                  !show && "border-white/15 bg-white/5 hover:border-[rgb(var(--accent)/0.6)] hover:bg-white/10 active:scale-[0.99]",
                  show && isCorrect && "border-emerald-400 bg-emerald-400/15 text-emerald-100",
                  show && isChosen && !isCorrect && "border-rose-400 bg-rose-400/15 text-rose-100",
                  show && !isChosen && !isCorrect && "border-white/10 opacity-50",
                )}
              >
                {label}
                {show && isCorrect && <Check className="h-5 w-5 shrink-0 text-emerald-300" />}
                {show && isChosen && !isCorrect && <X className="h-5 w-5 shrink-0 text-rose-300" />}
              </button>
            );
          })}
        </div>

        {/* Pre-answer hint (AI, on demand) */}
        {!answer && <HintButton q={q} />}

        {/* Post-answer learning */}
        {answer && (
          <LearnPanel
            q={q}
            correct={answer.correct}
            timedOut={answer.origIdx === null}
            teachFirst={mode.teachFirst}
          />
        )}
      </div>

      {/* Bottom action */}
      {answer && (
        <div className="border-t border-white/10 bg-[#0b0a12] px-4 py-3 sm:px-6">
          <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
            <span className="text-sm font-semibold text-white/70">
              {answer.correct ? bi("Nice! 🎉", "ಚೆನ್ನಾಗಿದೆ! 🎉") : bi("Good try — now you know 💡", "ಒಳ್ಳೆಯ ಪ್ರಯತ್ನ — ಈಗ ತಿಳಿಯಿತು 💡")}
            </span>
            <button
              onClick={next}
              className="inline-flex items-center gap-1.5 rounded-full bg-[rgb(var(--accent))] px-5 py-2.5 text-sm font-bold text-black transition-transform active:scale-95"
            >
              {index + 1 >= questions.length ? bi("Finish", "ಮುಗಿಸಿ") : bi("Next", "ಮುಂದೆ")}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── AI hint (pre-answer, on demand) ───────────────────── */
function HintButton({ q }: { q: BankQuestion }) {
  const { bi, locale } = useTranslation();
  const [text, setText] = React.useState("");
  const [busy, setBusy] = React.useState(false);
  const [open, setOpen] = React.useState(false);

  const getHint = async () => {
    if (busy || open) return;
    setOpen(true);
    setBusy(true);
    const context = buildQuizContext({
      question: q.q.en,
      options: q.options.en,
      correct: q.options.en[q.answer],
      topic: categoryById(q.cat).label.en,
    });
    let acc = "";
    const full = await streamAkka(
      `Give a SHORT one-sentence hint that nudges toward the answer WITHOUT revealing it.${locale === "kn" ? " Reply in Kannada." : ""}`,
      context,
      { onToken: (t) => { acc += t; setText(acc); } },
    );
    setBusy(false);
    if (!full) setText(bi("Think about the era and place involved.", "ಕಾಲ ಮತ್ತು ಸ್ಥಳವನ್ನು ಯೋಚಿಸಿ."));
  };

  return (
    <div className="mt-4">
      {!open ? (
        <button
          onClick={getHint}
          className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 text-sm font-semibold text-amber-200 transition-all hover:bg-amber-300/20 active:scale-95"
        >
          <Lightbulb className="h-4 w-4" /> {bi("Give me a hint", "ಒಂದು ಸುಳಿವು ಕೊಡಿ")}
        </button>
      ) : (
        <div className="rounded-2xl border border-amber-300/25 bg-amber-300/5 p-4 text-sm text-amber-100">
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-300/80">
            <Lightbulb className="h-3.5 w-3.5" /> {bi("Hint", "ಸುಳಿವು")}
          </div>
          {busy && !text ? <Loader2 className="h-4 w-4 animate-spin" /> : <p className="whitespace-pre-wrap leading-relaxed">{text}</p>}
        </div>
      )}
    </div>
  );
}

/* ── Post-answer learning panel ────────────────────────── */
function LearnPanel({
  q,
  correct,
  timedOut,
  teachFirst,
}: {
  q: BankQuestion;
  correct: boolean;
  timedOut: boolean;
  teachFirst?: boolean;
}) {
  const { bi, locale } = useTranslation();
  const [teach, setTeach] = React.useState("");
  const [teachBusy, setTeachBusy] = React.useState(false);
  const [asked, setAsked] = React.useState(false);
  const [followup, setFollowup] = React.useState("");
  const [answerText, setAnswerText] = React.useState("");
  const [askBusy, setAskBusy] = React.useState(false);

  const context = React.useMemo(
    () =>
      buildQuizContext({
        question: q.q.en,
        options: q.options.en,
        correct: q.options.en[q.answer],
        topic: categoryById(q.cat).label.en,
      }),
    [q],
  );

  const teachMore = React.useCallback(async () => {
    if (teachBusy || teach) return;
    setTeachBusy(true);
    let acc = "";
    const full = await streamAkka(
      `Teach me more about this in 2-3 sentences: why the correct answer is right, why the others are wrong, and one memorable fact.${locale === "kn" ? " Reply in Kannada." : ""}`,
      context,
      { onToken: (t) => { acc += t; setTeach(acc); } },
    );
    setTeachBusy(false);
    if (!full) setTeach(bi("Explanations need the AI teacher online — but the summary above still teaches the key fact.", "AI ಶಿಕ್ಷಕ ಆನ್‌ಲೈನ್ ಬೇಕು — ಆದರೆ ಮೇಲಿನ ಸಾರಾಂಶ ಮುಖ್ಯ ಸಂಗತಿಯನ್ನು ಕಲಿಸುತ್ತದೆ."));
  }, [teachBusy, teach, context, locale, bi]);

  React.useEffect(() => {
    if (teachFirst) void teachMore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ask = async () => {
    const query = followup.trim();
    if (!query || askBusy) return;
    setAskBusy(true);
    setAsked(true);
    setAnswerText("");
    setFollowup("");
    let acc = "";
    const full = await streamAkka(
      `${query}${locale === "kn" ? " Reply in Kannada." : ""}`,
      context,
      { onToken: (t) => { acc += t; setAnswerText(acc); } },
    );
    setAskBusy(false);
    if (!full) setAnswerText(bi("The AI teacher is offline right now.", "AI ಶಿಕ್ಷಕ ಈಗ ಆಫ್‌ಲೈನ್."));
  };

  return (
    <div className="dasara-capsule-in mt-5 space-y-3">
      {/* Curated explanation — instant, always available */}
      <div className={cn("rounded-2xl border p-4", correct ? "border-emerald-400/30 bg-emerald-400/5" : "border-white/12 bg-white/5")}>
        <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/60">
          {timedOut ? bi("Time's up — the answer", "ಸಮಯ ಮುಗಿಯಿತು — ಉತ್ತರ") : bi("Why", "ಏಕೆ")}
        </div>
        <p className="text-sm leading-relaxed text-white/90">{bi(q.explain.en, q.explain.kn)}</p>
        {q.fact && (
          <p className="mt-2 flex gap-2 text-sm text-[rgb(var(--accent))]">
            <span>💡</span> {bi(q.fact.en, q.fact.kn)}
          </p>
        )}
      </div>

      {/* AI teacher */}
      {teach ? (
        <div className="rounded-2xl border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.08)] p-4">
          <div className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-[rgb(var(--accent))]">
            <Sparkles className="h-3.5 w-3.5" /> {bi("Akka teaches", "ಅಕ್ಕ ಕಲಿಸುತ್ತಾಳೆ")}
          </div>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/90">{teach}</p>
        </div>
      ) : (
        <button
          onClick={teachMore}
          disabled={teachBusy}
          className="inline-flex items-center gap-2 rounded-full border border-[rgb(var(--accent)/0.4)] bg-[rgb(var(--accent)/0.1)] px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-[rgb(var(--accent)/0.2)] active:scale-95"
        >
          {teachBusy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
          {bi("Teach me more", "ಇನ್ನಷ್ಟು ಕಲಿಸಿ")}
        </button>
      )}

      {/* Follow-up */}
      {asked && (
        <div className="rounded-2xl border border-white/12 bg-white/5 p-4">
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/90" aria-live="polite">
            {askBusy && !answerText ? <Loader2 className="h-4 w-4 animate-spin" /> : answerText}
          </p>
        </div>
      )}
      <form
        onSubmit={(e) => { e.preventDefault(); ask(); }}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 focus-within:border-[rgb(var(--accent)/0.5)]"
      >
        <input
          value={followup}
          onChange={(e) => setFollowup(e.target.value)}
          enterKeyHint="send"
          placeholder={bi("Ask a follow-up…", "ಹೆಚ್ಚಿನ ಪ್ರಶ್ನೆ ಕೇಳಿ…")}
          className="w-full bg-transparent text-base text-white placeholder:text-white/40 focus:outline-none sm:text-sm"
        />
        <button type="submit" disabled={askBusy || !followup.trim()} aria-label="Ask" className={cn("grid h-8 w-8 place-items-center rounded-full bg-[rgb(var(--accent))] text-black", (askBusy || !followup.trim()) && "opacity-40")}>
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}

/* ── Victory screen ────────────────────────────────────── */
function VictoryScreen({
  mode,
  correct,
  total,
  xp,
  bestStreak,
  unlocks,
  onExit,
}: {
  mode: QuizMode;
  correct: number;
  total: number;
  xp: number;
  bestStreak: number;
  unlocks: { achievements: Achievement[]; collectibles: Collectible[] };
  onExit: () => void;
}) {
  const { bi } = useTranslation();
  const profile = useQuizProfile();
  const pct = Math.round((correct / total) * 100);
  const { rank, next, progress } = rankFor(profile.xp);
  const weak = weakestCategories(profile, 2);
  const perfect = correct === total;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:py-14">
      {perfect && <Confetti count={60} />}
      <div className="text-center">
        <div className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-[rgb(var(--accent)/0.15)] text-5xl">
          {perfect ? "🏆" : pct >= 60 ? "🎉" : "🌱"}
        </div>
        <h2 className="mt-5 text-3xl font-black">
          {perfect ? bi("Perfect!", "ಪರಿಪೂರ್ಣ!") : pct >= 60 ? bi("Well played!", "ಚೆನ್ನಾಗಿ ಆಡಿದಿರಿ!") : bi("Keep going!", "ಮುಂದುವರಿಸಿ!")}
        </h2>
        <p className="mt-1 text-white/60">{bi(mode.en, mode.kn)}</p>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-3 gap-3">
        <Stat label={bi("Score", "ಅಂಕ")} value={`${correct}/${total}`} />
        <Stat label={bi("XP earned", "ಗಳಿಸಿದ XP")} value={<><CountUp value={xp} />+</>} />
        <Stat label={bi("Best streak", "ಗರಿಷ್ಠ ಸರಣಿ")} value={`🔥 ${bestStreak}`} />
      </div>

      {/* Rank */}
      <div className="mt-4 rounded-2xl border border-white/12 bg-white/5 p-4">
        <div className="flex items-center justify-between text-sm">
          <span className="font-bold">{rank.emoji} {bi(rank.en, rank.kn)}</span>
          <span className="text-white/50">{next ? bi(`Next: ${next.en}`, `ಮುಂದೆ: ${next.kn}`) : bi("Max rank", "ಗರಿಷ್ಠ")}</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[rgb(var(--accent))]" style={{ width: `${progress * 100}%` }} />
        </div>
      </div>

      {/* Unlocks */}
      {(unlocks.achievements.length > 0 || unlocks.collectibles.length > 0) && (
        <div className="mt-4 rounded-2xl border border-[rgb(var(--accent)/0.3)] bg-[rgb(var(--accent)/0.08)] p-4">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-[rgb(var(--accent))]">
            <Trophy className="h-4 w-4" /> {bi("Unlocked!", "ಅನ್‌ಲಾಕ್ ಆಯಿತು!")}
          </div>
          <div className="flex flex-wrap gap-2">
            {unlocks.achievements.map((a) => (
              <span key={a.id} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm">
                {a.emoji} {bi(a.en, a.kn)}
              </span>
            ))}
            {unlocks.collectibles.map((c) => (
              <span key={c.id} className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-sm">
                {c.emoji} {bi(c.en, c.kn)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Recommendation */}
      {weak.length > 0 && (
        <p className="mt-4 text-center text-sm text-white/60">
          {bi("Sharpen up next: ", "ಮುಂದೆ ಸುಧಾರಿಸಿ: ")}
          {weak.map((c, i) => (
            <span key={c} className="font-semibold text-white/80">
              {i > 0 && ", "}
              {bi(categoryLabel(c).en, categoryLabel(c).kn)}
            </span>
          ))}
        </p>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button onClick={onExit} className="flex-1 rounded-full bg-[rgb(var(--accent))] px-6 py-3 text-sm font-bold text-black transition-transform active:scale-95">
          {bi("Back to adventures", "ಸಾಹಸಗಳಿಗೆ ಹಿಂತಿರುಗಿ")}
        </button>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: React.ReactNode; value: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-white/12 bg-white/5 p-4 text-center">
      <div className="text-2xl font-black text-[rgb(var(--accent))]">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-white/50">{label}</div>
    </div>
  );
}

/* ── Confetti ──────────────────────────────────────────── */
function Confetti({ count = 28 }: { count?: number }) {
  const pieces = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.3,
        dur: 0.9 + Math.random() * 0.8,
        emoji: ["🎉", "✨", "🪔", "⭐", "🏆", "🎊"][i % 6],
        size: 12 + Math.random() * 14,
      })),
    [count],
  );
  return (
    <div className="pointer-events-none fixed inset-0 z-[80] overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          className="quiz-confetti absolute top-0"
          style={{
            left: `${p.left}%`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
