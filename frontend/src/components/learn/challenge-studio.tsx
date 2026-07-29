"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Flame,
  RotateCcw,
  Sparkles,
  Target,
  Trophy,
  X,
  Zap,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ReadAloud } from "@/components/ui/read-aloud";
import { FLASHCARDS, QUIZ } from "@/data/kannada";
import {
  commitLearnChallenge,
  rankForLearner,
  useLearnProfile,
} from "@/lib/learn/profile";

type ChallengeMode = "quick" | "mastery" | "words";
type ChallengePhase = "setup" | "playing" | "done";

type PracticeQuestion = {
  id: string;
  prompt: string;
  hint?: string;
  answer: string;
  options: string[];
  lessonEn: string;
  lessonKn: string;
};

const MODE_META: Record<
  ChallengeMode,
  {
    icon: React.ElementType;
    en: string;
    kn: string;
    descriptionEn: string;
    descriptionKn: string;
    count: number;
  }
> = {
  quick: {
    icon: Zap,
    en: "Quick Spark",
    kn: "ತ್ವರಿತ ಅಭ್ಯಾಸ",
    descriptionEn: "Five mixed questions for a fast daily win.",
    descriptionKn: "ದೈನಂದಿನ ಅಭ್ಯಾಸಕ್ಕಾಗಿ ಐದು ಮಿಶ್ರ ಪ್ರಶ್ನೆಗಳು.",
    count: 5,
  },
  mastery: {
    icon: Trophy,
    en: "Mastery Run",
    kn: "ಪರಿಣತಿ ಸವಾಲು",
    descriptionEn: "Ten questions across script, numbers, and words.",
    descriptionKn: "ಲಿಪಿ, ಸಂಖ್ಯೆ ಮತ್ತು ಪದಗಳ ಹತ್ತು ಪ್ರಶ್ನೆಗಳು.",
    count: 10,
  },
  words: {
    icon: Flame,
    en: "Word Rush",
    kn: "ಪದಗಳ ಸವಾಲು",
    descriptionEn: "Eight vocabulary questions from everyday Kannada.",
    descriptionKn: "ದೈನಂದಿನ ಕನ್ನಡದ ಎಂಟು ಪದ ಪ್ರಶ್ನೆಗಳು.",
    count: 8,
  },
};

const BASE_QUESTIONS: PracticeQuestion[] = QUIZ.map((question, index) => ({
  id: `base-${index}`,
  ...question,
  lessonEn: question.hint
    ? `${question.prompt} (${question.hint}) means ${question.answer}.`
    : `${question.prompt} is read as ${question.answer}.`,
  lessonKn: question.hint
    ? `${question.prompt} (${question.hint}) ಎಂದರೆ ${question.answer}.`
    : `${question.prompt} ಅನ್ನು ${question.answer} ಎಂದು ಓದುತ್ತಾರೆ.`,
}));

const WORD_QUESTIONS: PracticeQuestion[] = FLASHCARDS.map((card, index) => {
  const distractors = [1, 5, 11].map(
    (offset) => FLASHCARDS[(index + offset) % FLASHCARDS.length].en,
  );
  const choices = [card.en, ...distractors];
  const rotation = index % choices.length;
  const options = [...choices.slice(rotation), ...choices.slice(0, rotation)];
  return {
    id: `word-${card.kn}`,
    prompt: card.kn,
    hint: card.translit,
    answer: card.en,
    options,
    lessonEn: `${card.kn} (${card.translit}) means ${card.en}. ${card.exampleEn}.`,
    lessonKn: `${card.kn} (${card.translit}) ಎಂದರೆ ${card.en}. ${card.exampleKn}.`,
  };
});

const MIXED_QUESTIONS = [...BASE_QUESTIONS, ...WORD_QUESTIONS];

function buildQuestions(mode: ChallengeMode, attempt: number) {
  const source = mode === "words" ? WORD_QUESTIONS : MIXED_QUESTIONS;
  const count = MODE_META[mode].count;
  const offset = (attempt * 7 + (mode === "mastery" ? 3 : 0)) % source.length;
  const rotated = [...source.slice(offset), ...source.slice(0, offset)];
  return rotated.slice(0, count);
}

export function ChallengeStudio({
  autoStart = false,
  onAutoStartConsumed,
}: {
  autoStart?: boolean;
  onAutoStartConsumed?: () => void;
}) {
  const { bi } = useTranslation();
  const profile = useLearnProfile();
  const [phase, setPhase] = React.useState<ChallengePhase>(
    autoStart ? "playing" : "setup",
  );
  const [mode, setMode] = React.useState<ChallengeMode>("quick");
  const [, setAttempt] = React.useState(0);
  const [questions, setQuestions] = React.useState<PracticeQuestion[]>(() =>
    autoStart ? buildQuestions("quick", 0) : [],
  );
  const [index, setIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [run, setRun] = React.useState(0);
  const [bestRun, setBestRun] = React.useState(0);
  const [xpGained, setXpGained] = React.useState(0);
  const handledAutoStart = React.useRef(autoStart);

  const start = React.useCallback((nextMode: ChallengeMode) => {
    setMode(nextMode);
    setAttempt((currentAttempt) => {
      const nextAttempt = currentAttempt + 1;
      setQuestions(buildQuestions(nextMode, nextAttempt));
      return nextAttempt;
    });
    setIndex(0);
    setScore(0);
    setPicked(null);
    setRun(0);
    setBestRun(0);
    setXpGained(0);
    setPhase("playing");
  }, []);

  React.useEffect(() => {
    if (!autoStart) {
      handledAutoStart.current = false;
      return;
    }
    if (!handledAutoStart.current) start("quick");
    handledAutoStart.current = true;
    onAutoStartConsumed?.();
  }, [autoStart, onAutoStartConsumed, start]);

  const question = questions[index];

  const choose = (option: string) => {
    if (picked || !question) return;
    setPicked(option);
    if (option === question.answer) {
      const nextRun = run + 1;
      setScore((value) => value + 1);
      setRun(nextRun);
      setBestRun((value) => Math.max(value, nextRun));
    } else {
      setRun(0);
    }
  };

  const advance = () => {
    if (index + 1 < questions.length) {
      setIndex((value) => value + 1);
      setPicked(null);
      return;
    }
    const gained = commitLearnChallenge(score, questions.length);
    setXpGained(gained);
    setPhase("done");
  };

  if (phase === "setup") {
    const accuracy = profile.answered
      ? Math.round((profile.correct / profile.answered) * 100)
      : 0;
    return (
      <section aria-labelledby="challenge-heading">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
          <Target className="h-4 w-4" />
          {bi("Challenge Studio", "ಸವಾಲಿನ ಅಭ್ಯಾಸ")}
        </div>
        <h2
          id="challenge-heading"
          className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
        >
          {bi("Turn recall into confidence", "ನೆನಪನ್ನು ಆತ್ಮವಿಶ್ವಾಸವಾಗಿಸಿ")}
        </h2>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          {bi(
            "Choose a run. Every answer teaches, and every finish advances your Kannada rank.",
            "ಸವಾಲನ್ನು ಆರಿಸಿ. ಪ್ರತಿ ಉತ್ತರ ಕಲಿಸುತ್ತದೆ, ಪ್ರತಿ ಪೂರ್ಣಗೊಳಿಸುವಿಕೆ ನಿಮ್ಮ ಕನ್ನಡ ಹಂತವನ್ನು ಹೆಚ್ಚಿಸುತ್ತದೆ.",
          )}
        </p>

        <div className="mt-8 grid overflow-hidden rounded-lg border border-border bg-card md:grid-cols-3">
          {(Object.keys(MODE_META) as ChallengeMode[]).map((item, index) => {
            const itemMeta = MODE_META[item];
            const Icon = itemMeta.icon;
            return (
              <button
                key={item}
                type="button"
                onClick={() => start(item)}
                className={cn(
                  "group min-h-64 p-6 text-left transition-colors hover:bg-muted/60 sm:p-8",
                  index > 0 && "border-t border-border md:border-l md:border-t-0",
                )}
              >
                <span className="grid h-11 w-11 place-items-center rounded-md bg-foreground text-background transition-transform group-hover:-translate-y-0.5">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="mt-7 text-xl font-black">
                  {bi(itemMeta.en, itemMeta.kn)}
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {bi(itemMeta.descriptionEn, itemMeta.descriptionKn)}
                </p>
                <div className="mt-6 flex items-center justify-between text-xs font-bold uppercase text-primary">
                  <span>
                    {itemMeta.count} {bi("questions", "ಪ್ರಶ್ನೆಗಳು")}
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-3 divide-x divide-border border-y border-border">
          <SetupStat value={String(profile.sessions)} label={bi("Runs", "ಸವಾಲುಗಳು")} />
          <SetupStat value={`${accuracy}%`} label={bi("Accuracy", "ನಿಖರತೆ")} />
          <SetupStat value={String(profile.bestScore)} label={bi("Best score", "ಉತ್ತಮ ಅಂಕ")} />
        </div>
      </section>
    );
  }

  if (phase === "done") {
    const resultPercent = Math.round((score / questions.length) * 100);
    const learner = rankForLearner(profile.xp);
    return (
      <section className="mx-auto max-w-3xl" aria-live="polite">
        <div className="overflow-hidden rounded-lg border border-border bg-card">
          <div className="bg-foreground px-6 py-10 text-center text-background sm:px-10 sm:py-14">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-md bg-amber-400 text-stone-950">
              <Trophy className="h-7 w-7" />
            </span>
            <div className="mt-6 text-xs font-semibold uppercase text-background/55">
              {bi(MODE_META[mode].en, MODE_META[mode].kn)}
            </div>
            <h2 className="mt-2 text-3xl font-black sm:text-4xl">
              {resultPercent >= 80
                ? bi("Brilliant work", "ಅದ್ಭುತ ಸಾಧನೆ")
                : resultPercent >= 50
                  ? bi("Strong progress", "ಉತ್ತಮ ಪ್ರಗತಿ")
                  : bi("Every attempt builds fluency", "ಪ್ರತಿ ಪ್ರಯತ್ನವೂ ಭಾಷೆಯನ್ನು ಬೆಳೆಸುತ್ತದೆ")}
            </h2>
            <div className="mt-4 text-6xl font-black text-amber-400">
              {score}/{questions.length}
            </div>
          </div>
          <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
            <ResultStat value={`+${xpGained}`} label="XP" />
            <ResultStat value={`${resultPercent}%`} label={bi("Accuracy", "ನಿಖರತೆ")} />
            <ResultStat value={String(bestRun)} label={bi("Best streak", "ಉತ್ತಮ ಸರಣಿ")} />
          </div>
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold uppercase text-muted-foreground">
                  {bi("Current rank", "ಪ್ರಸ್ತುತ ಹಂತ")}
                </div>
                <div className="mt-1 font-black">
                  {bi(learner.rank.en, learner.rank.kn)}
                </div>
              </div>
              <div className="text-sm font-black text-primary">{profile.xp} XP</div>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary"
                style={{ width: `${learner.progress * 100}%` }}
              />
            </div>
            <div className="mt-7 flex flex-col gap-2 sm:flex-row sm:justify-center">
              <button
                type="button"
                onClick={() => start(mode)}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-foreground px-5 text-sm font-bold text-background"
              >
                <RotateCcw className="h-4 w-4" />
                {bi("Run it again", "ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ")}
              </button>
              <button
                type="button"
                onClick={() => setPhase("setup")}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border px-5 text-sm font-bold"
              >
                <ArrowLeft className="h-4 w-4" />
                {bi("Choose another mode", "ಬೇರೆ ಸವಾಲು ಆರಿಸಿ")}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!question) return null;
  const reveal = picked !== null;
  const correct = picked === question.answer;
  const progress = (index + (reveal ? 1 : 0)) / questions.length;
  const hasKannadaPrompt = /[\u0C80-\u0CFF]/.test(question.prompt);

  return (
    <section className="mx-auto max-w-3xl" aria-labelledby="question-heading">
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase text-primary">
            {bi(MODE_META[mode].en, MODE_META[mode].kn)}
          </div>
          <div className="mt-1 text-sm font-bold">
            {bi("Question", "ಪ್ರಶ್ನೆ")} {index + 1} / {questions.length}
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-xs font-bold">
          <Flame className={cn("h-4 w-4", run > 0 ? "text-orange-500" : "text-muted-foreground")} />
          {run} {bi("streak", "ಸರಣಿ")}
        </div>
      </div>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-300"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      <div className="mt-7 overflow-hidden rounded-lg border border-border bg-card">
        <div className="relative grid min-h-64 place-items-center p-8 text-center sm:min-h-72 sm:p-12">
          <div>
            <div className="text-xs font-semibold uppercase text-muted-foreground">
              {bi("Choose the meaning", "ಸರಿಯಾದ ಅರ್ಥವನ್ನು ಆರಿಸಿ")}
            </div>
            <h2 id="question-heading" className="mt-5 text-5xl font-black sm:text-6xl">
              {question.prompt}
            </h2>
            {question.hint && (
              <div className="mt-3 font-semibold text-primary">{question.hint}</div>
            )}
            {hasKannadaPrompt && (
              <ReadAloud
                text={question.prompt}
                lang="kn-IN"
                className="mx-auto mt-5 rounded-md"
                label={bi("Hear it", "ಕೇಳಿ")}
              />
            )}
          </div>
        </div>
        <div className="grid gap-px bg-border sm:grid-cols-2">
          {question.options.map((option) => {
            const isAnswer = option === question.answer;
            const isPicked = option === picked;
            return (
              <button
                key={option}
                type="button"
                onClick={() => choose(option)}
                disabled={reveal}
                className={cn(
                  "flex min-h-16 items-center justify-between gap-3 bg-background px-5 py-4 text-left text-sm font-bold transition-colors",
                  !reveal && "hover:bg-muted",
                  reveal && isAnswer && "bg-emerald-500/10 text-emerald-700 dark:text-emerald-400",
                  reveal && isPicked && !isAnswer && "bg-rose-500/10 text-rose-700 dark:text-rose-400",
                  reveal && !isAnswer && !isPicked && "text-muted-foreground opacity-55",
                )}
              >
                <span>{option}</span>
                {reveal && isAnswer && <Check className="h-4 w-4 shrink-0" />}
                {reveal && isPicked && !isAnswer && <X className="h-4 w-4 shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>

      {reveal && (
        <div
          className={cn(
            "mt-4 flex flex-col gap-4 rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5",
            correct
              ? "border-emerald-500/30 bg-emerald-500/5"
              : "border-amber-500/30 bg-amber-500/5",
          )}
          aria-live="polite"
        >
          <div className="flex min-w-0 items-start gap-3">
            <span
              className={cn(
                "mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md text-white",
                correct ? "bg-emerald-500" : "bg-amber-500",
              )}
            >
              {correct ? <Check className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            </span>
            <div>
              <div className="font-black">
                {correct ? bi("Exactly right", "ಸರಿಯಾದ ಉತ್ತರ") : bi("Learn this one", "ಇದನ್ನು ಕಲಿಯಿರಿ")}
              </div>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {bi(question.lessonEn, question.lessonKn)}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={advance}
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-md bg-foreground px-4 text-sm font-bold text-background"
          >
            {index + 1 === questions.length
              ? bi("See results", "ಫಲಿತಾಂಶ ನೋಡಿ")
              : bi("Next question", "ಮುಂದಿನ ಪ್ರಶ್ನೆ")}
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </section>
  );
}

function SetupStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-5 text-center sm:px-5">
      <div className="text-2xl font-black tabular-nums">{value}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}

function ResultStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-5 text-center sm:px-5 sm:py-6">
      <div className="text-xl font-black tabular-nums sm:text-2xl">{value}</div>
      <div className="mt-1 text-[10px] font-semibold uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}