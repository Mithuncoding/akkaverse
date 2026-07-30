"use client";

import * as React from "react";
import {
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Layers3,
  RotateCcw,
  Sprout,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ReadAloud } from "@/components/ui/read-aloud";
import {
  FLASHCARDS,
  type Flashcard,
  type WordCategory,
} from "@/data/kannada";
import {
  masteredWordCount,
  rateWord,
  useLearnProfile,
  type WordRating,
} from "@/lib/learn/profile";

type CategoryFilter = WordCategory | "all";

const CATEGORY_META: Record<
  CategoryFilter,
  { en: string; kn: string }
> = {
  all: { en: "All words", kn: "ಎಲ್ಲಾ ಪದಗಳು" },
  greetings: { en: "Greetings", kn: "ಅಭಿವಾದನೆ" },
  essentials: { en: "Essentials", kn: "ಅಗತ್ಯ ಪದಗಳು" },
  people: { en: "People", kn: "ಜನರು" },
  world: { en: "Around you", kn: "ನಿಮ್ಮ ಸುತ್ತ" },
};

const FILTERS = Object.keys(CATEGORY_META) as CategoryFilter[];

function strengthLabel(strength: number, bi: (en: string, kn: string) => string) {
  if (strength >= 2) return bi("Mastered", "ಕಲಿತಿದೆ");
  if (strength === 1) return bi("Learning", "ಕಲಿಯುತ್ತಿದೆ");
  return bi("New", "ಹೊಸದು");
}

export function WordStudio() {
  const { bi } = useTranslation();
  const profile = useLearnProfile();
  const [category, setCategory] = React.useState<CategoryFilter>("all");
  const [index, setIndex] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);
  const deck =
    category === "all"
      ? FLASHCARDS
      : FLASHCARDS.filter((card) => card.category === category);
  const card = deck[index] ?? deck[0];
  const strength = profile.wordStrength[card.kn] ?? 0;
  const mastered = masteredWordCount(profile);

  const selectCategory = (next: CategoryFilter) => {
    setCategory(next);
    setIndex(0);
    setFlipped(false);
  };

  const move = (direction: -1 | 1) => {
    setIndex((current) => (current + direction + deck.length) % deck.length);
    setFlipped(false);
  };

  const remember = (rating: WordRating) => {
    rateWord(card.kn, rating);
    move(1);
  };

  return (
    <section aria-labelledby="word-studio-heading">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
            <Layers3 className="h-4 w-4" />
            {bi("Word Studio", "ಪದಗಳ ಅಭ್ಯಾಸ")}
          </div>
          <h2
            id="word-studio-heading"
            className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
          >
            {bi("Build words into memory", "ಪದಗಳನ್ನು ನೆನಪಿನಲ್ಲಿ ಉಳಿಸಿ")}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {bi(
              "Hear each word, meet it in a sentence, then rate your recall.",
              "ಪ್ರತಿ ಪದವನ್ನು ಕೇಳಿ, ವಾಕ್ಯದಲ್ಲಿ ನೋಡಿ, ನಂತರ ನಿಮ್ಮ ನೆನಪನ್ನು ಗುರುತಿಸಿ.",
            )}
          </p>
        </div>
        <div className="shrink-0 text-sm text-muted-foreground">
          <span className="font-black text-foreground">{mastered}</span>
          {` / ${FLASHCARDS.length} `}
          {bi("mastered", "ಕಲಿತಿದೆ")}
        </div>
      </div>

      <div className="mt-7 flex gap-1 overflow-x-auto border-b border-border">
        {FILTERS.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => selectCategory(filter)}
            aria-pressed={category === filter}
            className={cn(
              "relative h-11 shrink-0 px-4 text-sm font-semibold transition-colors",
              category === filter
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {bi(CATEGORY_META[filter].en, CATEGORY_META[filter].kn)}
            {category === filter && (
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
            )}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <div>
          <button
            type="button"
            onClick={() => setFlipped((value) => !value)}
            aria-label={bi("Flip word card", "ಪದದ ಕಾರ್ಡ್ ತಿರುಗಿಸಿ")}
            className="relative block h-[25rem] w-full [perspective:1400px] sm:h-[28rem]"
          >
            <div
              className={cn(
                "relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d]",
                flipped && "[transform:rotateY(180deg)]",
              )}
            >
              <WordFace card={card} strength={strength} />
              <WordBack card={card} />
            </div>
          </button>

          <div className="mt-3 grid grid-cols-[auto_1fr_auto] gap-2">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={bi("Previous word", "ಹಿಂದಿನ ಪದ")}
              className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card transition-colors hover:border-foreground/30"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <ReadAloud
              key={card.kn}
              text={card.kn}
              lang="kn-IN"
              label={bi("Hear pronunciation", "ಉಚ್ಚಾರಣೆ ಕೇಳಿ")}
              preferCloudKannada
              className="h-11 justify-center rounded-md"
            />
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={bi("Next word", "ಮುಂದಿನ ಪದ")}
              className="grid h-11 w-11 place-items-center rounded-md border border-border bg-card transition-colors hover:border-foreground/30"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2" aria-label={bi("Rate your recall", "ನಿಮ್ಮ ನೆನಪನ್ನು ಗುರುತಿಸಿ")}>
            <RecallButton
              icon={RotateCcw}
              label={bi("Again", "ಮತ್ತೆ")}
              tone="again"
              onClick={() => remember("again")}
            />
            <RecallButton
              icon={Sprout}
              label={bi("Learning", "ಕಲಿಯುತ್ತಿದೆ")}
              tone="learning"
              onClick={() => remember("learning")}
            />
            <RecallButton
              icon={CheckCircle2}
              label={bi("Got it", "ಕಲಿತೆ")}
              tone="mastered"
              onClick={() => remember("mastered")}
            />
          </div>
        </div>

        <aside className="overflow-hidden rounded-lg border border-border bg-card lg:sticky lg:top-36">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="text-xs font-semibold uppercase text-muted-foreground">
              {bi(CATEGORY_META[category].en, CATEGORY_META[category].kn)}
            </div>
            <div className="text-xs font-bold tabular-nums">
              {index + 1} / {deck.length}
            </div>
          </div>
          <div className="max-h-[32rem] overflow-y-auto p-2">
            {deck.map((word, wordIndex) => {
              const wordStrength = profile.wordStrength[word.kn] ?? 0;
              return (
                <button
                  key={word.kn}
                  type="button"
                  onClick={() => {
                    setIndex(wordIndex);
                    setFlipped(false);
                  }}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors",
                    wordIndex === index ? "bg-muted" : "hover:bg-muted/60",
                  )}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-secondary text-lg">
                    {word.emoji}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{word.kn}</span>
                    <span className="block truncate text-xs text-muted-foreground">
                      {word.en}
                    </span>
                  </span>
                  {wordStrength >= 2 ? (
                    <Check className="h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <span className="h-2 w-2 shrink-0 rounded-full bg-border" />
                  )}
                </button>
              );
            })}
          </div>
        </aside>
      </div>
    </section>
  );
}

function WordFace({ card, strength }: { card: Flashcard; strength: number }) {
  const { bi } = useTranslation();
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-lg border border-border bg-card p-6 text-center [backface-visibility:hidden] sm:p-10">
      <div className="flex items-center justify-between text-xs font-semibold uppercase text-muted-foreground">
        <span>{bi(CATEGORY_META[card.category].en, CATEGORY_META[card.category].kn)}</span>
        <span>{strengthLabel(strength, bi)}</span>
      </div>
      <div className="grid flex-1 place-items-center">
        <div>
          <div className="text-5xl" aria-hidden>{card.emoji}</div>
          <div className="mt-5 text-5xl font-black sm:text-6xl">{card.kn}</div>
          <div className="mt-3 text-lg font-semibold text-primary">{card.translit}</div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-2 text-xs font-semibold text-muted-foreground">
        <RotateCcw className="h-3.5 w-3.5" />
        {bi("Reveal meaning", "ಅರ್ಥ ನೋಡಿ")}
      </div>
    </div>
  );
}

function WordBack({ card }: { card: Flashcard }) {
  const { bi } = useTranslation();
  return (
    <div className="absolute inset-0 flex flex-col overflow-hidden rounded-lg bg-stone-950 p-6 text-stone-50 [backface-visibility:hidden] [transform:rotateY(180deg)] sm:p-10">
      <div className="text-xs font-semibold uppercase text-white/50">
        {bi("Meaning & context", "ಅರ್ಥ ಮತ್ತು ಸಂದರ್ಭ")}
      </div>
      <div className="grid flex-1 place-items-center text-center">
        <div>
          <div className="text-3xl font-black sm:text-4xl">{card.en}</div>
          <div className="mx-auto my-7 h-px w-16 bg-amber-400" />
          <div className="text-2xl font-bold text-amber-400">{card.exampleKn}</div>
          <div className="mt-2 text-sm text-white/65">{card.exampleEn}</div>
        </div>
      </div>
      <div className="text-center text-xs font-semibold text-white/45">
        {bi("Return to Kannada", "ಕನ್ನಡಕ್ಕೆ ಹಿಂತಿರುಗಿ")}
      </div>
    </div>
  );
}

function RecallButton({
  icon: Icon,
  label,
  tone,
  onClick,
}: {
  icon: React.ElementType;
  label: string;
  tone: WordRating;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-12 items-center justify-center gap-2 rounded-md border text-xs font-bold transition-colors sm:text-sm",
        tone === "again" && "border-rose-500/30 bg-rose-500/5 text-rose-600 hover:bg-rose-500/10",
        tone === "learning" && "border-amber-500/30 bg-amber-500/5 text-amber-700 hover:bg-amber-500/10 dark:text-amber-400",
        tone === "mastered" && "border-emerald-500/30 bg-emerald-500/5 text-emerald-700 hover:bg-emerald-500/10 dark:text-emerald-400",
      )}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}