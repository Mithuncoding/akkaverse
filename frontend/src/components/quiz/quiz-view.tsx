"use client";

import * as React from "react";
import { Trophy, RotateCcw, Check, X, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/language-provider";
import {
  QUIZ_TOPICS,
  DIFFICULTIES,
  generateQuiz,
  type QuizTopic,
  type Difficulty,
  type QuizQuestion,
} from "@/data/quiz";

type Phase = "setup" | "playing" | "done";

type LeaderEntry = { name: string; score: number; total: number; at: number };
const LB_KEY = "akkaverse.leaderboard";

function loadLeaderboard(): LeaderEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(window.localStorage.getItem(LB_KEY) ?? "[]");
  } catch {
    return [];
  }
}

/** AI Quiz Generator — setup, play, score, and a persistent local leaderboard. */
export function QuizView() {
  const { t, bi } = useTranslation();

  const [phase, setPhase] = React.useState<Phase>("setup");
  const [topic, setTopic] = React.useState<QuizTopic | "All">("All");
  const [difficulty, setDifficulty] = React.useState<Difficulty | "All">("All");

  const [questions, setQuestions] = React.useState<QuizQuestion[]>([]);
  const [index, setIndex] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [score, setScore] = React.useState(0);
  const [board, setBoard] = React.useState<LeaderEntry[]>([]);

  React.useEffect(() => setBoard(loadLeaderboard()), []);

  const start = () => {
    const q = generateQuiz(topic, difficulty, 5);
    if (q.length === 0) return;
    setQuestions(q);
    setIndex(0);
    setScore(0);
    setSelected(null);
    setPhase("playing");
  };

  const current = questions[index];
  const isLast = index === questions.length - 1;

  const choose = (optionIndex: number) => {
    if (selected !== null) return;
    setSelected(optionIndex);
    if (optionIndex === current.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (isLast) {
      finish();
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
  };

  const finish = () => {
    const finalScore = score; // score already includes the last correct answer
    const entry: LeaderEntry = {
      name: "You",
      score: finalScore,
      total: questions.length,
      at: Date.now(),
    };
    const updated = [...loadLeaderboard(), entry]
      .sort((a, b) => b.score / b.total - a.score / a.total || b.at - a.at)
      .slice(0, 8);
    window.localStorage.setItem(LB_KEY, JSON.stringify(updated));
    setBoard(updated);
    setPhase("done");
  };

  const reset = () => {
    setPhase("setup");
    setSelected(null);
  };

  return (
    <div className="container py-16 md:py-24">
      <header className="mx-auto mb-10 max-w-2xl text-center">
        <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
          🧠 {t("quiz.badge")}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          {t("quiz.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("quiz.subtitle")}</p>
      </header>

      <div className="mx-auto max-w-2xl">
        {phase === "setup" && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <Selector
              label={t("quiz.topic")}
              options={["All", ...QUIZ_TOPICS]}
              value={topic}
              onChange={(v) => setTopic(v as QuizTopic | "All")}
              render={(v) => (v === "All" ? t("common.all") : t(`quiz.topic.${v}`))}
            />
            <div className="h-5" />
            <Selector
              label={t("quiz.difficulty")}
              options={["All", ...DIFFICULTIES]}
              value={difficulty}
              onChange={(v) => setDifficulty(v as Difficulty | "All")}
              render={(v) => (v === "All" ? t("common.all") : t(`diff.${v}`))}
            />
            <Button onClick={start} size="lg" className="mt-7 w-full">
              <Sparkles className="h-4 w-4" /> {t("quiz.start")}
            </Button>

            {board.length > 0 && <Leaderboard board={board} t={t} />}
          </div>
        )}

        {phase === "playing" && current && (
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>
                {t("quiz.question")} {index + 1} {t("quiz.of")} {questions.length}
              </span>
              <span className="font-semibold text-primary">
                {t("quiz.score")}: {score}
              </span>
            </div>

            {/* Progress bar */}
            <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${((index + 1) / questions.length) * 100}%` }}
              />
            </div>

            <h2 className="text-lg font-semibold">
              {bi(current.en.q, current.kn.q)}
            </h2>

            <div className="mt-5 space-y-3">
              {current.en.options.map((enOpt, i) => {
                  const opt = bi(enOpt, current.kn.options[i] ?? enOpt);
                  const isCorrect = i === current.answer;
                  const isChosen = i === selected;
                  const reveal = selected !== null;
                  return (
                    <button
                      key={i}
                      onClick={() => choose(i)}
                      disabled={reveal}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all",
                        !reveal && "border-border hover:border-primary/50 hover:bg-accent",
                        reveal && isCorrect && "border-emerald-500 bg-emerald-500/10",
                        reveal && isChosen && !isCorrect && "border-rose-500 bg-rose-500/10",
                        reveal && !isChosen && !isCorrect && "border-border opacity-60",
                      )}
                    >
                      {opt}
                      {reveal && isCorrect && <Check className="h-4 w-4 text-emerald-600" />}
                      {reveal && isChosen && !isCorrect && <X className="h-4 w-4 text-rose-600" />}
                    </button>
                  );
                })}
            </div>

            {selected !== null && (
              <Button onClick={next} className="mt-6 w-full">
                {isLast ? t("quiz.finish") : t("quiz.next")}
              </Button>
            )}
          </div>
        )}

        {phase === "done" && (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Trophy className="h-8 w-8" />
            </div>
            <h2 className="mt-4 text-2xl font-bold">{t("quiz.resultTitle")}</h2>
            <p className="mt-2 text-muted-foreground">
              {t("quiz.youScored")}{" "}
              <span className="text-2xl font-bold text-primary">
                {score}/{questions.length}
              </span>
            </p>
            <Button onClick={reset} className="mt-6">
              <RotateCcw className="h-4 w-4" /> {t("quiz.restart")}
            </Button>
            <Leaderboard board={board} t={t} />
          </div>
        )}
      </div>
    </div>
  );
}

function Selector<T extends string>({
  label,
  options,
  value,
  onChange,
  render,
}: {
  label: string;
  options: T[];
  value: T;
  onChange: (v: T) => void;
  render: (v: T) => string;
}) {
  return (
    <div>
      <p className="mb-2 text-sm font-medium">{label}</p>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm transition-all",
              value === opt
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-primary/40 hover:text-foreground",
            )}
          >
            {render(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

function Leaderboard({
  board,
  t,
}: {
  board: LeaderEntry[];
  t: (k: string) => string;
}) {
  return (
    <div className="mt-8 text-left">
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <Trophy className="h-4 w-4 text-amber-500" /> {t("quiz.leaderboard")}
      </h3>
      {board.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("quiz.noScores")}</p>
      ) : (
        <ul className="space-y-1.5">
          {board.map((e, i) => (
            <li
              key={e.at}
              className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2 text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-5 text-center font-mono text-muted-foreground">
                  {i + 1}
                </span>
                {t("quiz.you")}
              </span>
              <span className="font-semibold text-primary">
                {e.score}/{e.total}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
