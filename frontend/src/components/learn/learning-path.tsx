"use client";

import * as React from "react";
import {
  ArrowRight,
  Award,
  BookOpenCheck,
  Check,
  Flame,
  Languages,
  Layers3,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { CONSONANTS, FLASHCARDS, NUMBERS, VOWELS } from "@/data/kannada";
import {
  masteredWordCount,
  todayProgress,
  useLearnProfile,
  type LearnProfile,
} from "@/lib/learn/profile";

export type LearnArea = "script" | "words" | "challenge";

type PathUnit = {
  id: LearnArea;
  icon: React.ElementType;
  number: string;
  en: string;
  kn: string;
  descriptionEn: string;
  descriptionKn: string;
  progress: number;
  progressLabel: string;
  color: string;
};

type Milestone = {
  id: string;
  icon: React.ElementType;
  en: string;
  kn: string;
  requirementEn: string;
  requirementKn: string;
  unlocked: (profile: LearnProfile) => boolean;
};

const MILESTONES: Milestone[] = [
  {
    id: "first-letter",
    icon: Languages,
    en: "First Glyph",
    kn: "ಮೊದಲ ಅಕ್ಷರ",
    requirementEn: "Master one character",
    requirementKn: "ಒಂದು ಅಕ್ಷರ ಕಲಿಯಿರಿ",
    unlocked: (profile) => profile.masteredLetters.length >= 1,
  },
  {
    id: "ten-letters",
    icon: BookOpenCheck,
    en: "Script Starter",
    kn: "ಲಿಪಿ ಆರಂಭಿಕ",
    requirementEn: "Master ten characters",
    requirementKn: "ಹತ್ತು ಅಕ್ಷರ ಕಲಿಯಿರಿ",
    unlocked: (profile) => profile.masteredLetters.length >= 10,
  },
  {
    id: "five-words",
    icon: Layers3,
    en: "Word Collector",
    kn: "ಪದ ಸಂಗ್ರಾಹಕ",
    requirementEn: "Master five words",
    requirementKn: "ಐದು ಪದ ಕಲಿಯಿರಿ",
    unlocked: (profile) => masteredWordCount(profile) >= 5,
  },
  {
    id: "daily-goal",
    icon: Flame,
    en: "Daily Promise",
    kn: "ದೈನಂದಿನ ಸಾಧನೆ",
    requirementEn: "Reach the daily XP goal",
    requirementKn: "ದೈನಂದಿನ XP ಗುರಿ ತಲುಪಿ",
    unlocked: (profile) => todayProgress(profile).complete,
  },
  {
    id: "perfect-run",
    icon: Trophy,
    en: "Perfect Recall",
    kn: "ಪರಿಪೂರ್ಣ ನೆನಪು",
    requirementEn: "Finish a perfect challenge",
    requirementKn: "ಪರಿಪೂರ್ಣ ಸವಾಲು ಮುಗಿಸಿ",
    unlocked: (profile) => profile.perfects >= 1,
  },
];

export function LearningPath({
  onOpen,
  onStartDaily,
}: {
  onOpen: (area: LearnArea) => void;
  onStartDaily: () => void;
}) {
  const { bi } = useTranslation();
  const profile = useLearnProfile();
  const daily = todayProgress(profile);
  const scriptTotal = VOWELS.length + CONSONANTS.length + NUMBERS.length;
  const wordTotal = FLASHCARDS.length;
  const accuracy = profile.answered
    ? Math.round((profile.correct / profile.answered) * 100)
    : 0;

  const units: PathUnit[] = [
    {
      id: "script",
      icon: Languages,
      number: "01",
      en: "Script & sound",
      kn: "ಲಿಪಿ ಮತ್ತು ಧ್ವನಿ",
      descriptionEn: "Recognise Kannada vowels, consonants, and numerals by sight and sound.",
      descriptionKn: "ಕನ್ನಡ ಸ್ವರ, ವ್ಯಂಜನ ಮತ್ತು ಸಂಖ್ಯೆಗಳನ್ನು ನೋಡಿ ಮತ್ತು ಕೇಳಿ ಗುರುತಿಸಿ.",
      progress: profile.masteredLetters.length / scriptTotal,
      progressLabel: `${profile.masteredLetters.length}/${scriptTotal}`,
      color: "bg-amber-500",
    },
    {
      id: "words",
      icon: Layers3,
      number: "02",
      en: "Everyday vocabulary",
      kn: "ದೈನಂದಿನ ಪದಗಳು",
      descriptionEn: "Build practical words through pronunciation, meaning, and real sentences.",
      descriptionKn: "ಉಚ್ಚಾರಣೆ, ಅರ್ಥ ಮತ್ತು ನೈಜ ವಾಕ್ಯಗಳ ಮೂಲಕ ಬಳಕೆಯ ಪದಗಳನ್ನು ಕಲಿಯಿರಿ.",
      progress: masteredWordCount(profile) / wordTotal,
      progressLabel: `${masteredWordCount(profile)}/${wordTotal}`,
      color: "bg-emerald-500",
    },
    {
      id: "challenge",
      icon: Target,
      number: "03",
      en: "Recall & respond",
      kn: "ನೆನಪು ಮತ್ತು ಉತ್ತರ",
      descriptionEn: "Turn recognition into confident recall with short adaptive challenges.",
      descriptionKn: "ಸಣ್ಣ ಸವಾಲುಗಳ ಮೂಲಕ ಗುರುತಿಸುವಿಕೆಯನ್ನು ಆತ್ಮವಿಶ್ವಾಸದ ನೆನಪಾಗಿಸಿ.",
      progress: Math.min(profile.sessions / 5, 1),
      progressLabel: profile.sessions
        ? `${accuracy}% ${bi("accuracy", "ನಿಖರತೆ")}`
        : bi("Not started", "ಆರಂಭಿಸಿಲ್ಲ"),
      color: "bg-sky-500",
    },
  ];

  const overallProgress =
    units.reduce((total, unit) => total + Math.min(unit.progress, 1), 0) /
    units.length;
  const unlockedCount = MILESTONES.filter((milestone) =>
    milestone.unlocked(profile),
  ).length;

  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
            <Sparkles className="h-4 w-4" />
            {bi("Guided path", "ಮಾರ್ಗದರ್ಶಿತ ಪಥ")}
          </div>
          <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            {bi("Your path to living Kannada", "ಜೀವಂತ ಕನ್ನಡದ ನಿಮ್ಮ ಪಥ")}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {bi(
              "Move from symbols to useful words, then prove recall in short focused runs.",
              "ಅಕ್ಷರಗಳಿಂದ ಬಳಕೆಯ ಪದಗಳಿಗೆ ಸಾಗಿ, ನಂತರ ಸಣ್ಣ ಸವಾಲುಗಳಲ್ಲಿ ನೆನಪನ್ನು ಪರೀಕ್ಷಿಸಿ.",
            )}
          </p>
        </div>
        <div className="shrink-0 text-sm font-bold tabular-nums">
          {Math.round(overallProgress * 100)}% {bi("course progress", "ಕೋರ್ಸ್ ಪ್ರಗತಿ")}
        </div>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <section className="overflow-hidden rounded-lg border border-border bg-card" aria-label={bi("Course units", "ಕೋರ್ಸ್ ಘಟಕಗಳು")}>
          {units.map((unit, index) => {
            const Icon = unit.icon;
            const progress = Math.min(Math.max(unit.progress, 0), 1);
            return (
              <button
                key={unit.id}
                type="button"
                onClick={() => onOpen(unit.id)}
                className={cn(
                  "group grid w-full gap-4 p-5 text-left transition-colors hover:bg-muted/55 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-center sm:p-6",
                  index > 0 && "border-t border-border",
                )}
              >
                <span className={cn("grid h-12 w-12 place-items-center rounded-md text-white", unit.color)}>
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="flex flex-wrap items-baseline gap-x-2">
                    <span className="text-[10px] font-bold uppercase text-muted-foreground">
                      {bi("Unit", "ಘಟಕ")} {unit.number}
                    </span>
                    <span className="font-black">{bi(unit.en, unit.kn)}</span>
                  </span>
                  <span className="mt-1.5 block max-w-xl text-sm leading-relaxed text-muted-foreground">
                    {bi(unit.descriptionEn, unit.descriptionKn)}
                  </span>
                  <span className="mt-3 flex items-center gap-3">
                    <span className="h-1.5 min-w-0 flex-1 overflow-hidden rounded-full bg-muted sm:max-w-xs">
                      <span
                        className={cn("block h-full rounded-full", unit.color)}
                        style={{ width: `${progress * 100}%` }}
                      />
                    </span>
                    <span className="shrink-0 text-[11px] font-bold text-muted-foreground">
                      {unit.progressLabel}
                    </span>
                  </span>
                </span>
                <ArrowRight className="hidden h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-foreground sm:block" />
              </button>
            );
          })}
        </section>

        <aside className="overflow-hidden rounded-lg bg-foreground text-background lg:sticky lg:top-36">
          <div className="p-6 sm:p-7">
            <div className="flex items-start justify-between gap-5">
              <div>
                <div className="text-xs font-semibold uppercase text-background/50">
                  {bi("Today’s mission", "ಇಂದಿನ ಅಭ್ಯಾಸ")}
                </div>
                <div className="mt-2 text-2xl font-black">
                  {daily.complete
                    ? bi("Goal complete", "ಗುರಿ ಪೂರ್ಣ")
                    : bi("Keep your Kannada alive", "ನಿಮ್ಮ ಕನ್ನಡವನ್ನು ಜೀವಂತವಾಗಿಡಿ")}
                </div>
              </div>
              <DailyRing progress={daily.progress} value={daily.xp} goal={daily.goal} />
            </div>
            <div className="mt-8 grid grid-cols-2 divide-x divide-background/15 border-y border-background/15 py-4 text-center">
              <div>
                <div className="text-lg font-black">5</div>
                <div className="text-[10px] font-semibold uppercase text-background/45">
                  {bi("Questions", "ಪ್ರಶ್ನೆಗಳು")}
                </div>
              </div>
              <div>
                <div className="text-lg font-black">~4</div>
                <div className="text-[10px] font-semibold uppercase text-background/45">
                  {bi("Minutes", "ನಿಮಿಷಗಳು")}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={onStartDaily}
              className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-md bg-amber-400 px-4 text-sm font-black text-stone-950 transition-colors hover:bg-amber-300"
            >
              {daily.complete
                ? bi("Practice another round", "ಮತ್ತೊಂದು ಅಭ್ಯಾಸ ಮಾಡಿ")
                : bi("Start daily mission", "ದೈನಂದಿನ ಅಭ್ಯಾಸ ಆರಂಭಿಸಿ")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </aside>
      </div>

      <section className="mt-14" aria-labelledby="milestones-heading">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
              <Award className="h-4 w-4" />
              {bi("Milestones", "ಮೈಲಿಗಲ್ಲುಗಳು")}
            </div>
            <h3 id="milestones-heading" className="mt-2 text-xl font-black sm:text-2xl">
              {bi("Proof of your progress", "ನಿಮ್ಮ ಪ್ರಗತಿಯ ಸಾಕ್ಷಿ")}
            </h3>
          </div>
          <div className="text-sm font-bold tabular-nums text-muted-foreground">
            {unlockedCount}/{MILESTONES.length}
          </div>
        </div>

        <div className="mt-6 grid overflow-hidden rounded-lg border border-border bg-card sm:grid-cols-2 lg:grid-cols-5">
          {MILESTONES.map((milestone, index) => {
            const Icon = milestone.icon;
            const unlocked = milestone.unlocked(profile);
            return (
              <div
                key={milestone.id}
                className={cn(
                  "min-h-44 p-5",
                  index > 0 && "border-t border-border sm:border-l",
                  index === 2 && "sm:border-l-0 lg:border-l",
                  unlocked ? "bg-amber-500/5" : "opacity-55 grayscale",
                )}
              >
                <span
                  className={cn(
                    "grid h-10 w-10 place-items-center rounded-md",
                    unlocked
                      ? "bg-amber-500 text-stone-950"
                      : "bg-muted text-muted-foreground",
                  )}
                >
                  {unlocked ? <Check className="h-5 w-5" /> : <Icon className="h-5 w-5" />}
                </span>
                <div className="mt-5 font-black">{bi(milestone.en, milestone.kn)}</div>
                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {bi(milestone.requirementEn, milestone.requirementKn)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function DailyRing({
  progress,
  value,
  goal,
}: {
  progress: number;
  value: number;
  goal: number;
}) {
  const offset = 100 - Math.min(progress, 1) * 100;
  return (
    <div className="relative h-16 w-16 shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 42 42" aria-hidden>
        <circle cx="21" cy="21" r="17" fill="none" stroke="currentColor" strokeWidth="3" className="text-background/15" />
        <circle
          cx="21"
          cy="21"
          r="17"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          pathLength="100"
          strokeDasharray="100"
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="text-amber-400 transition-[stroke-dashoffset] duration-500"
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center text-center">
        <div>
          <div className="text-sm font-black leading-none">{value}</div>
          <div className="mt-0.5 text-[8px] font-bold text-background/45">/{goal}</div>
        </div>
      </div>
    </div>
  );
}