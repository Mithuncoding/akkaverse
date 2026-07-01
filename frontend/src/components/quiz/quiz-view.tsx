"use client";

import * as React from "react";
import { Trophy, Flame, Sparkles, ChevronRight, RotateCcw } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { CountUp } from "@/components/ui/count-up";
import { QuizArena } from "@/components/quiz/quiz-arena";
import { QuizMuseum } from "@/components/quiz/quiz-museum";
import {
  CATEGORIES,
  pickQuestions,
  TOTAL_QUESTIONS,
  type BankQuestion,
} from "@/data/quiz-bank";
import { QUIZ_MODES, type QuizMode } from "@/data/quiz-modes";
import {
  COLLECTIBLES,
  rankFor,
  useQuizProfile,
  resetProfile,
} from "@/lib/quiz/profile";

/**
 * The Quiz — reimagined as an exploration game, not a form.
 *
 * A hub of "adventures" (modes) over a large, handcrafted static bank. Play
 * loads instantly; AI appears only as an on-demand teacher inside the Arena.
 * Progress, ranks, streaks, achievements and a collectibles museum turn
 * learning into a journey.
 */
export function QuizView() {
  const { bi } = useTranslation();
  const profile = useQuizProfile();
  const [launch, setLaunch] = React.useState<{ mode: QuizMode; questions: BankQuestion[] } | null>(null);
  const [museum, setMuseum] = React.useState(false);

  const today = new Date().toISOString().slice(0, 10);
  const dailyDone = profile.dailyDone === today;
  const { rank, next, progress } = rankFor(profile.xp);

  const start = React.useCallback((mode: QuizMode) => {
    const questions = mode.build();
    if (questions.length === 0) return;
    setLaunch({ mode, questions });
  }, []);

  const startCategory = React.useCallback((catId: (typeof CATEGORIES)[number]) => {
    const mode: QuizMode = {
      id: `cat-${catId.id}`,
      emoji: catId.emoji,
      en: catId.label.en,
      kn: catId.label.kn,
      taglineEn: "",
      taglineKn: "",
      accent: catId.accent,
      accent2: catId.accent2,
      wiki: catId.wiki,
      timer: 0,
      count: 6,
      build: () => pickQuestions({ cats: [catId.id], n: 6 }),
    };
    start(mode);
  }, [start]);

  if (launch) {
    return (
      <QuizArena
        mode={launch.mode}
        questions={launch.questions}
        onExit={() => setLaunch(null)}
      />
    );
  }

  const collected = COLLECTIBLES.filter((c) => profile.collectibles.includes(c.id)).length;
  const daily = QUIZ_MODES.find((m) => m.id === "daily")!;

  return (
    <div className="relative overflow-hidden">
      {museum && <QuizMuseum onClose={() => setMuseum(false)} />}

      {/* Ambient backdrop */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(70%_60%_at_50%_0%,hsl(var(--primary)/0.12),transparent)]" />

      <div className="container relative py-10 md:py-16">
        {/* Header */}
        <header className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-primary" /> {bi("Play · Explore · Collect", "ಆಡಿ · ಅನ್ವೇಷಿಸಿ · ಸಂಗ್ರಹಿಸಿ")}
          </span>
          <h1 className="mt-5 text-balance text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
            {bi("Karnataka Quest", "ಕರ್ನಾಟಕ ಕ್ವೆಸ್ಟ್")}
          </h1>
          <p className="mt-3 text-pretty text-base text-muted-foreground sm:text-lg">
            {bi(
              `Not a quiz — an adventure. ${TOTAL_QUESTIONS}+ handcrafted questions, ${QUIZ_MODES.length} game modes, ranks, streaks and a museum to fill.`,
              `ಕ್ವಿಜ್ ಅಲ್ಲ — ಒಂದು ಸಾಹಸ. ${TOTAL_QUESTIONS}+ ಕೈಯಿಂದ ರಚಿಸಿದ ಪ್ರಶ್ನೆಗಳು, ${QUIZ_MODES.length} ಆಟದ ಮೋಡ್‌ಗಳು, ಶ್ರೇಣಿಗಳು, ಸರಣಿಗಳು.`,
            )}
          </p>
        </header>

        {/* Profile / rank bar */}
        <section className="mx-auto mt-8 max-w-3xl rounded-3xl border border-border bg-card p-5 shadow-soft">
          <div className="flex flex-wrap items-center gap-4">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-3xl">{rank.emoji}</div>
            <div className="min-w-[140px] flex-1">
              <div className="flex items-baseline justify-between gap-2">
                <span className="font-bold">{bi(rank.en, rank.kn)}</span>
                <span className="text-xs text-muted-foreground">
                  {profile.xp} XP{next ? ` · ${next.min - profile.xp} ${bi("to", "ಗೆ")} ${bi(next.en, next.kn)}` : ""}
                </span>
              </div>
              <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                <div className="h-full rounded-full bg-primary [transition:width_.5s_ease]" style={{ width: `${progress * 100}%` }} />
              </div>
            </div>
            <div className="flex gap-2">
              <MiniStat icon={<Flame className="h-4 w-4 text-orange-500" />} value={profile.dayStreak} label={bi("streak", "ಸರಣಿ")} />
              <MiniStat icon={<Trophy className="h-4 w-4 text-amber-500" />} value={`${collected}/${COLLECTIBLES.length}`} label={bi("museum", "ಮ್ಯೂಸಿಯಂ")} />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <button onClick={() => setMuseum(true)} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform active:scale-95">
              <Trophy className="h-4 w-4" /> {bi("Open museum", "ಮ್ಯೂಸಿಯಂ ತೆರೆಯಿರಿ")}
            </button>
            {profile.answered > 0 && (
              <button
                onClick={() => { if (confirm(bi("Reset all quiz progress?", "ಎಲ್ಲಾ ಪ್ರಗತಿಯನ್ನು ಮರುಹೊಂದಿಸುವುದೇ?"))) resetProfile(); }}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" /> {bi("Reset", "ಮರುಹೊಂದಿಸಿ")}
              </button>
            )}
          </div>
        </section>

        {/* Daily challenge */}
        <section className="mx-auto mt-6 max-w-3xl">
          <button
            onClick={() => start(daily)}
            style={{ ["--accent" as string]: daily.accent } as React.CSSProperties}
            className="group relative block w-full overflow-hidden rounded-3xl text-left ring-1 ring-border transition-all hover:-translate-y-0.5 hover:shadow-2xl"
          >
            <JourneyFigure wiki={daily.wiki} alt="" rounded="none" kenBurns className="absolute inset-0 h-full w-full" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0a12]/95 via-[#0b0a12]/70 to-transparent" />
            <div className="relative flex items-center gap-4 p-5 sm:p-6">
              <span className="text-4xl">{dailyDone ? "✅" : "📅"}</span>
              <div className="flex-1">
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-200/80">{bi("Daily Challenge", "ದೈನಂದಿನ ಸವಾಲು")}</div>
                <h3 className="text-lg font-black text-white sm:text-xl">
                  {dailyDone ? bi("Done for today — come back tomorrow!", "ಇಂದಿಗೆ ಮುಗಿದಿದೆ — ನಾಳೆ ಬನ್ನಿ!") : bi("Today's 7 questions are ready", "ಇಂದಿನ ೭ ಪ್ರಶ್ನೆಗಳು ಸಿದ್ಧ")}
                </h3>
              </div>
              <ChevronRight className="h-6 w-6 text-white/70 transition-transform group-hover:translate-x-1" />
            </div>
          </button>
        </section>

        {/* Adventures / modes */}
        <section className="mt-12">
          <h2 className="mb-5 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {bi("Choose your adventure", "ನಿಮ್ಮ ಸಾಹಸವನ್ನು ಆರಿಸಿ")}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {QUIZ_MODES.filter((m) => m.id !== "daily").map((m) => (
              <button
                key={m.id}
                onClick={() => start(m)}
                style={{ ["--accent" as string]: m.accent, ["--accent2" as string]: m.accent2 } as React.CSSProperties}
                className="group relative aspect-[16/10] overflow-hidden rounded-3xl text-left ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-2xl active:scale-[0.99]"
              >
                <JourneyFigure wiki={m.wiki} alt={m.en} rounded="none" kenBurns className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0a12]/95 via-[#0b0a12]/45 to-transparent" />
                <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_50%_120%,rgb(var(--accent)/0.4),transparent_60%)] opacity-70 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                  <span className="text-3xl drop-shadow">{m.emoji}</span>
                  <h3 className="mt-1.5 text-lg font-black text-white drop-shadow">{bi(m.en, m.kn)}</h3>
                  <p className="mt-1 text-xs text-white/75 line-clamp-2">{bi(m.taglineEn, m.taglineKn)}</p>
                  <span className="mt-2 inline-flex items-center gap-1 rounded-full bg-[rgb(var(--accent))] px-3 py-1 text-[11px] font-bold text-black opacity-0 transition-opacity group-hover:opacity-100">
                    {m.timer > 0 ? `⏱ ${m.timer}s` : bi("Play", "ಆಡಿ")} · {m.count} Q
                  </span>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Categories — pick a theme */}
        <section className="mt-14">
          <h2 className="mb-5 text-center text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {bi("Or master a subject", "ಅಥವಾ ಒಂದು ವಿಷಯದಲ್ಲಿ ಪಾರಂಗತರಾಗಿ")}
          </h2>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {CATEGORIES.map((c) => {
              const s = profile.byCat[c.id];
              const mastery = s && s.seen > 0 ? Math.round((s.correct / s.seen) * 100) : 0;
              return (
                <button
                  key={c.id}
                  onClick={() => startCategory(c)}
                  className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 text-left transition-all hover:border-primary/40 hover:shadow-soft active:scale-[0.98]"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-2xl">{c.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold">{bi(c.label.en, c.label.kn)}</p>
                    <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-secondary">
                      <div className="h-full rounded-full bg-primary" style={{ width: `${mastery}%` }} />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </section>

        {/* Stats footer */}
        {profile.answered > 0 && (
          <section className="mx-auto mt-14 grid max-w-2xl grid-cols-3 gap-3 text-center">
            <FooterStat value={<CountUp value={profile.answered} />} label={bi("answered", "ಉತ್ತರಿಸಿದ")} />
            <FooterStat value={<CountUp value={profile.correct} />} label={bi("correct", "ಸರಿ")} />
            <FooterStat value={<><CountUp value={profile.achievements.length} />/{15}</>} label={bi("badges", "ಪದಕಗಳು")} />
          </section>
        )}
      </div>
    </div>
  );
}

function MiniStat({ icon, value, label }: { icon: React.ReactNode; value: React.ReactNode; label: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-3 py-2">
      {icon}
      <div className="leading-tight">
        <div className="text-sm font-bold tabular-nums">{value}</div>
        <div className="text-[10px] uppercase tracking-wide text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}

function FooterStat({ value, label }: { value: React.ReactNode; label: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <div className="text-2xl font-black text-primary">{value}</div>
      <div className="mt-1 text-[11px] uppercase tracking-wide text-muted-foreground">{label}</div>
    </div>
  );
}
