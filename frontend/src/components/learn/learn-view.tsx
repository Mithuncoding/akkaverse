"use client";

import * as React from "react";
import { Volume2, RotateCcw, ChevronLeft, ChevronRight, Check, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/i18n/language-provider";
import { canSpeak, speak } from "@/lib/speech";
import {
  VOWELS,
  CONSONANTS,
  NUMBERS,
  FLASHCARDS,
  QUIZ,
  type Letter,
} from "@/data/kannada";

type Tab = "alphabet" | "flashcards" | "quiz";

/** Learn Kannada — interactive, bilingual learning surface. */
export function LearnView() {
  const { t } = useTranslation();
  const [tab, setTab] = React.useState<Tab>("alphabet");

  const tabs: { id: Tab; label: string }[] = [
    { id: "alphabet", label: t("learn.tab.alphabet") },
    { id: "flashcards", label: t("learn.tab.flashcards") },
    { id: "quiz", label: t("learn.tab.quiz") },
  ];

  return (
    <div className="container py-12 md:py-24">
      <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
        <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
          🎓 {t("learn.badge")}
        </span>
        <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
          {t("learn.title")}
        </h1>
        <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
          {t("learn.subtitle")}
        </p>
      </header>

      {/* Tab switcher */}
      <div className="mx-auto mb-8 flex w-fit gap-1 rounded-full border border-border bg-secondary/40 p-1 md:mb-12">
        {tabs.map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors sm:px-5",
              tab === item.id
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
            aria-pressed={tab === item.id}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === "alphabet" && <AlphabetSection />}
      {tab === "flashcards" && <FlashcardsSection />}
      {tab === "quiz" && <QuizSection />}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Alphabet                                                            */
/* ------------------------------------------------------------------ */

function AlphabetSection() {
  const { t } = useTranslation();
  return (
    <div className="space-y-12">
      <LetterGrid title={t("learn.vowels")} letters={VOWELS} />
      <LetterGrid title={t("learn.consonants")} letters={CONSONANTS} />
      <NumberGrid title={t("learn.numbers")} />
    </div>
  );
}

function LetterGrid({ title, letters }: { title: string; letters: Letter[] }) {
  const speakable = canSpeak();
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {letters.map((l) => (
          <button
            key={l.char + l.translit}
            onClick={() => speak(l.char)}
            disabled={!speakable}
            className="group flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
            title={l.hint}
          >
            <span className="text-3xl font-semibold">{l.char}</span>
            <span className="mt-1 text-xs font-medium text-primary">
              {l.translit}
            </span>
            <span className="mt-0.5 text-[10px] text-muted-foreground">
              {l.hint}
            </span>
            {speakable && (
              <Volume2 className="mt-2 h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            )}
          </button>
        ))}
      </div>
    </section>
  );
}

function NumberGrid({ title }: { title: string }) {
  const speakable = canSpeak();
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold tracking-tight">{title}</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6">
        {NUMBERS.map((n) => (
          <button
            key={n.value}
            onClick={() => speak(n.word)}
            disabled={!speakable}
            className="group flex flex-col items-center rounded-xl border border-border bg-card p-4 text-center transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-md"
          >
            <span className="text-3xl font-semibold">{n.glyph}</span>
            <span className="mt-1 text-xs font-medium text-primary">
              {n.value} · {n.translit}
            </span>
            <span className="mt-0.5 text-sm">{n.word}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Flashcards                                                          */
/* ------------------------------------------------------------------ */

function FlashcardsSection() {
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const card = FLASHCARDS[index];
  const speakable = canSpeak();

  const go = (dir: 1 | -1) => {
    setFlipped(false);
    setIndex((i) => (i + dir + FLASHCARDS.length) % FLASHCARDS.length);
  };

  return (
    <div className="mx-auto max-w-md">
      <p className="mb-3 text-center text-sm text-muted-foreground">
        {t("learn.flash.progress")} {index + 1} / {FLASHCARDS.length}
      </p>

      <button
        onClick={() => setFlipped((f) => !f)}
        className="relative h-64 w-full [perspective:1200px]"
        aria-label="Flip card"
      >
        <div
          className={cn(
            "relative h-full w-full rounded-2xl border border-border shadow-sm transition-transform duration-500 [transform-style:preserve-3d]",
            flipped && "[transform:rotateY(180deg)]",
          )}
        >
          {/* Front — Kannada */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-card [backface-visibility:hidden]">
            <span className="text-5xl">{card.emoji}</span>
            <span className="text-4xl font-semibold">{card.kn}</span>
            <span className="text-sm text-primary">{card.translit}</span>
          </div>
          {/* Back — English */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]">
            <span className="text-3xl font-semibold">{card.en}</span>
          </div>
        </div>
      </button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        {t("learn.flash.hint")}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3">
        <Button variant="outline" size="sm" onClick={() => go(-1)}>
          <ChevronLeft /> {t("learn.flash.prev")}
        </Button>
        {speakable && (
          <Button
            variant="secondary"
            size="sm"
            onClick={() => speak(card.kn)}
          >
            <Volume2 /> {t("chat.speak")}
          </Button>
        )}
        <Button variant="outline" size="sm" onClick={() => go(1)}>
          {t("learn.flash.next")} <ChevronRight />
        </Button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Quiz                                                                */
/* ------------------------------------------------------------------ */

function QuizSection() {
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [picked, setPicked] = React.useState<string | null>(null);
  const [done, setDone] = React.useState(false);

  const q = QUIZ[index];

  const choose = (option: string) => {
    if (picked) return;
    setPicked(option);
    if (option === q.answer) setScore((s) => s + 1);
  };

  const next = () => {
    if (index + 1 >= QUIZ.length) {
      setDone(true);
      return;
    }
    setIndex((i) => i + 1);
    setPicked(null);
  };

  const restart = () => {
    setIndex(0);
    setScore(0);
    setPicked(null);
    setDone(false);
  };

  if (done) {
    return (
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-10 text-center">
        <p className="text-2xl font-semibold">{t("learn.quiz.done")}</p>
        <p className="mt-3 text-4xl font-bold text-primary">
          {score} / {QUIZ.length}
        </p>
        <Button className="mt-6" onClick={restart}>
          <RotateCcw /> {t("learn.quiz.restart")}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {index + 1} / {QUIZ.length}
        </span>
        <span>
          {t("learn.quiz.score")}: {score}
        </span>
      </div>

      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <p className="text-sm text-muted-foreground">
          {t("learn.quiz.question")}
        </p>
        <p className="mt-4 text-6xl font-semibold">{q.prompt}</p>
        {q.hint && (
          <p className="mt-2 text-sm text-primary">{q.hint}</p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3">
        {q.options.map((option) => {
          const isAnswer = option === q.answer;
          const isPicked = option === picked;
          const reveal = picked !== null;
          return (
            <button
              key={option}
              onClick={() => choose(option)}
              disabled={reveal}
              className={cn(
                "flex items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors",
                !reveal && "border-border bg-card hover:border-primary/50",
                reveal && isAnswer && "border-emerald-500/60 bg-emerald-500/10",
                reveal &&
                  isPicked &&
                  !isAnswer &&
                  "border-red-500/60 bg-red-500/10",
                reveal && !isAnswer && !isPicked && "border-border opacity-60",
              )}
            >
              <span>{option}</span>
              {reveal && isAnswer && (
                <Check className="h-4 w-4 text-emerald-600" />
              )}
              {reveal && isPicked && !isAnswer && (
                <X className="h-4 w-4 text-red-600" />
              )}
            </button>
          );
        })}
      </div>

      {picked !== null && (
        <div className="mt-5 text-center">
          <p
            className={cn(
              "text-sm font-medium",
              picked === q.answer ? "text-emerald-600" : "text-red-600",
            )}
          >
            {picked === q.answer
              ? t("learn.quiz.correct")
              : t("learn.quiz.wrong")}
          </p>
          <Button className="mt-3" onClick={next}>
            {t("learn.quiz.next")} <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
}
