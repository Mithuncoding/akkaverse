"use client";

import * as React from "react";
import {
  ArrowRight,
  BookOpenCheck,
  Flame,
  GraduationCap,
  Languages,
  Layers3,
  Target,
  Trophy,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { ChallengeStudio } from "@/components/learn/challenge-studio";
import { LearningPath, type LearnArea } from "@/components/learn/learning-path";
import { ScriptLab } from "@/components/learn/script-lab";
import { WordStudio } from "@/components/learn/word-studio";
import { useTranslation } from "@/i18n/language-provider";
import {
  masteredWordCount,
  rankForLearner,
  todayProgress,
  useLearnProfile,
} from "@/lib/learn/profile";

type LearnTab = "path" | LearnArea;

/** Learn Kannada — interactive, bilingual learning surface. */
export function LearnView() {
  const { bi } = useTranslation();
  const [tab, setTab] = React.useState<LearnTab>("path");
  const [quickStart, setQuickStart] = React.useState(false);
  const profile = useLearnProfile();
  const daily = todayProgress(profile);
  const learner = rankForLearner(profile.xp);

  const tabs: {
    id: LearnTab;
    icon: React.ElementType;
    en: string;
    kn: string;
  }[] = [
    { id: "path", icon: BookOpenCheck, en: "My path", kn: "ನನ್ನ ಪಥ" },
    { id: "script", icon: Languages, en: "Script Lab", kn: "ಲಿಪಿ ಅಭ್ಯಾಸ" },
    { id: "words", icon: Layers3, en: "Word Studio", kn: "ಪದ ಅಭ್ಯಾಸ" },
    { id: "challenge", icon: Target, en: "Challenge", kn: "ಸವಾಲು" },
  ];

  const openArea = (area: LearnArea) => {
    setQuickStart(false);
    setTab(area);
    window.requestAnimationFrame(() => {
      document.getElementById("learn-workspace")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const startDaily = () => {
    setQuickStart(true);
    setTab("challenge");
    window.requestAnimationFrame(() => {
      document.getElementById("learn-workspace")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  const consumeQuickStart = React.useCallback(() => setQuickStart(false), []);

  return (
    <div className="min-h-screen">
      <header className="relative overflow-hidden border-b border-foreground/10 bg-foreground text-background">
        <div
          aria-hidden
          className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgb(255_255_255/0.05)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.05)_1px,transparent_1px)] [background-size:32px_32px]"
        />
        <div className="container relative grid gap-8 py-10 md:grid-cols-[minmax(0,1.15fr)_minmax(21rem,0.85fr)] md:items-center md:py-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-amber-400">
              <GraduationCap className="h-4 w-4" />
              {bi("Akkaverse Kannada Academy", "ಅಕ್ಕಾವರ್ಸ್ ಕನ್ನಡ ಅಕಾಡೆಮಿ")}
            </div>
            <h1 className="mt-4 max-w-3xl text-balance text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              {bi("Kannada for real life", "ಜೀವನಕ್ಕಾಗಿ ಕನ್ನಡ")}
            </h1>
            <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-background/65 sm:text-lg">
              {bi(
                "Learn through sound, context, and a little progress every day.",
                "ಧ್ವನಿ, ಸಂದರ್ಭ ಮತ್ತು ಪ್ರತಿದಿನದ ಸಣ್ಣ ಪ್ರಗತಿಯ ಮೂಲಕ ಕಲಿಯಿರಿ.",
              )}
            </p>
            <button
              type="button"
              onClick={startDaily}
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-md bg-amber-400 px-5 text-sm font-black text-stone-950 transition-colors hover:bg-amber-300"
            >
              {daily.complete
                ? bi("Keep the streak alive", "ಸರಣಿಯನ್ನು ಮುಂದುವರಿಸಿ")
                : bi("Start today’s mission", "ಇಂದಿನ ಅಭ್ಯಾಸ ಆರಂಭಿಸಿ")}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="overflow-hidden rounded-lg border border-background/15 bg-background/5 backdrop-blur-sm">
            <div className="flex items-center gap-4 border-b border-background/15 p-5 sm:p-6">
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-md bg-amber-400 text-xl font-black text-stone-950">
                {learner.rank.glyph}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-semibold uppercase text-background/45">
                      {bi("Current rank", "ಪ್ರಸ್ತುತ ಹಂತ")}
                    </div>
                    <div className="mt-1 font-black">
                      {bi(learner.rank.en, learner.rank.kn)}
                    </div>
                  </div>
                  <span className="shrink-0 text-sm font-black text-amber-400">
                    {profile.xp} XP
                  </span>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-background/15">
                  <div
                    className="h-full rounded-full bg-amber-400 transition-[width] duration-500"
                    style={{ width: `${learner.progress * 100}%` }}
                  />
                </div>
                <div className="mt-1.5 text-[10px] text-background/45">
                  {learner.next
                    ? bi(
                        `${learner.next.min - profile.xp} XP to ${learner.next.en}`,
                        `${learner.next.kn} ಹಂತಕ್ಕೆ ${learner.next.min - profile.xp} XP`,
                      )
                    : bi("Highest rank reached", "ಅತ್ಯುನ್ನತ ಹಂತ ತಲುಪಿದೆ")}
                </div>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-background/15">
              <ProgressStat
                icon={Target}
                value={`${daily.xp}/${daily.goal}`}
                label={bi("Daily XP", "ದೈನಂದಿನ XP")}
                tone="text-amber-400"
              />
              <ProgressStat
                icon={Flame}
                value={String(profile.dayStreak)}
                label={bi("Day streak", "ದಿನಗಳ ಸರಣಿ")}
                tone="text-orange-400"
              />
              <ProgressStat
                icon={Trophy}
                value={String(
                  profile.masteredLetters.length + masteredWordCount(profile),
                )}
                label={bi("Mastered", "ಕಲಿತದ್ದು")}
                tone="text-emerald-400"
              />
            </div>
          </div>
        </div>
      </header>

      <nav
        className="sticky top-14 z-40 border-b border-border bg-background/90 backdrop-blur-xl md:top-16"
        aria-label={bi("Learn sections", "ಕಲಿಕೆಯ ವಿಭಾಗಗಳು")}
      >
        <div className="container flex h-16 items-stretch gap-1 overflow-x-auto">
          {tabs.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setQuickStart(false);
                  setTab(item.id);
                }}
                aria-current={tab === item.id ? "page" : undefined}
                className={cn(
                  "relative inline-flex min-w-max items-center gap-2 px-3 text-xs font-bold transition-colors sm:px-5 sm:text-sm",
                  tab === item.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
                {bi(item.en, item.kn)}
                {tab === item.id && (
                  <span className="absolute inset-x-2 bottom-0 h-0.5 bg-primary" />
                )}
              </button>
            );
          })}
        </div>
      </nav>

      <main id="learn-workspace" className="scroll-mt-36">
        <div className="container py-10 md:py-14">
          {tab === "path" && (
            <LearningPath onOpen={openArea} onStartDaily={startDaily} />
          )}
          {tab === "script" && <ScriptLab />}
          {tab === "words" && <WordStudio />}
          {tab === "challenge" && (
            <ChallengeStudio
              autoStart={quickStart}
              onAutoStartConsumed={consumeQuickStart}
            />
          )}
        </div>
      </main>
    </div>
  );
}
function ProgressStat({
  icon: Icon,
  value,
  label,
  tone,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
  tone: string;
}) {
  return (
    <div className="flex min-h-24 flex-col items-center justify-center px-2 text-center">
      <Icon className={cn("h-4 w-4", tone)} />
      <div className="mt-2 text-xl font-black tabular-nums">{value}</div>
      <div className="mt-0.5 text-[9px] font-semibold uppercase text-background/45 sm:text-[10px]">
        {label}
      </div>
    </div>
  );
}
