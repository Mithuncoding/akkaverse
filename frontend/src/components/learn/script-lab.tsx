"use client";

import * as React from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  CircleDot,
  Grid3X3,
  Hash,
  Languages,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ReadAloud } from "@/components/ui/read-aloud";
import { CONSONANTS, NUMBERS, VOWELS } from "@/data/kannada";
import {
  toggleLetterMastery,
  useLearnProfile,
} from "@/lib/learn/profile";

type ScriptGroup = "vowels" | "consonants" | "numbers";

type ScriptItem = {
  char: string;
  translit: string;
  hint: string;
  spoken: string;
};

const GROUP_META = {
  vowels: {
    icon: CircleDot,
    en: "Vowels",
    kn: "ಸ್ವರಗಳು",
    descriptionEn: "The open sounds that give every syllable its voice.",
    descriptionKn: "ಪ್ರತಿ ಅಕ್ಷರಕ್ಕೂ ಧ್ವನಿ ನೀಡುವ ಸ್ವರಗಳು.",
  },
  consonants: {
    icon: Grid3X3,
    en: "Consonants",
    kn: "ವ್ಯಂಜನಗಳು",
    descriptionEn: "The shapes that carry Kannada words and rhythm.",
    descriptionKn: "ಕನ್ನಡ ಪದ ಮತ್ತು ಲಯವನ್ನು ಹೊರುವ ವ್ಯಂಜನಗಳು.",
  },
  numbers: {
    icon: Hash,
    en: "Numbers",
    kn: "ಸಂಖ್ಯೆಗಳು",
    descriptionEn: "Read, recognise, and say Kannada numerals.",
    descriptionKn: "ಕನ್ನಡ ಅಂಕಿಗಳನ್ನು ಓದಿ, ಗುರುತಿಸಿ ಮತ್ತು ಹೇಳಿ.",
  },
} as const;

function itemsFor(group: ScriptGroup): ScriptItem[] {
  if (group === "vowels") {
    return VOWELS.map((letter) => ({
      ...letter,
      spoken: letter.char,
    }));
  }
  if (group === "consonants") {
    return CONSONANTS.map((letter) => ({
      ...letter,
      spoken: letter.char,
    }));
  }
  return NUMBERS.map((number) => ({
    char: number.glyph,
    translit: `${number.value} · ${number.translit}`,
    hint: number.word,
    spoken: number.word,
  }));
}

export function ScriptLab() {
  const { bi } = useTranslation();
  const profile = useLearnProfile();
  const [group, setGroup] = React.useState<ScriptGroup>("vowels");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const items = itemsFor(group);
  const selected = items[selectedIndex] ?? items[0];
  const meta = GROUP_META[group];
  const masteredInGroup = items.filter((item) =>
    profile.masteredLetters.includes(item.char),
  ).length;
  const isMastered = profile.masteredLetters.includes(selected.char);

  const selectGroup = (nextGroup: ScriptGroup) => {
    setGroup(nextGroup);
    setSelectedIndex(0);
  };

  const move = (direction: -1 | 1) => {
    setSelectedIndex(
      (index) => (index + direction + items.length) % items.length,
    );
  };

  return (
    <section aria-labelledby="script-lab-heading">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase text-primary">
            <Languages className="h-4 w-4" />
            {bi("Script Lab", "ಲಿಪಿ ಪ್ರಯೋಗಾಲಯ")}
          </div>
          <h2
            id="script-lab-heading"
            className="mt-2 text-2xl font-black tracking-tight sm:text-3xl"
          >
            {bi("See it. Hear it. Own it.", "ನೋಡಿ. ಕೇಳಿ. ಕಲಿಯಿರಿ.")}
          </h2>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            {bi(meta.descriptionEn, meta.descriptionKn)}
          </p>
        </div>
        <div className="shrink-0 text-sm text-muted-foreground">
          <span className="font-black text-foreground">{masteredInGroup}</span>
          {` / ${items.length} `}
          {bi("mastered", "ಕಲಿತಿದೆ")}
        </div>
      </div>

      <div
        role="tablist"
        aria-label={bi("Script groups", "ಲಿಪಿ ಗುಂಪುಗಳು")}
        className="mt-7 flex gap-1 overflow-x-auto border-b border-border"
      >
        {(Object.keys(GROUP_META) as ScriptGroup[]).map((item) => {
          const itemMeta = GROUP_META[item];
          const Icon = itemMeta.icon;
          return (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={group === item}
              onClick={() => selectGroup(item)}
              className={cn(
                "relative inline-flex h-11 shrink-0 items-center gap-2 px-4 text-sm font-semibold transition-colors",
                group === item
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {bi(itemMeta.en, itemMeta.kn)}
              {group === item && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-primary" />
              )}
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[22rem_minmax(0,1fr)] lg:items-start">
        <div className="overflow-hidden rounded-lg bg-foreground text-background lg:sticky lg:top-36">
          <div className="flex items-center justify-between border-b border-background/15 px-4 py-3 text-xs font-semibold uppercase text-background/55">
            <span>
              {String(selectedIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </span>
            <span>{bi(meta.en, meta.kn)}</span>
          </div>
          <div className="grid min-h-72 place-items-center px-6 py-10 text-center">
            <div>
              <div className="font-serif text-8xl font-black leading-none text-amber-400 sm:text-9xl">
                {selected.char}
              </div>
              <div className="mt-5 text-xl font-bold">{selected.translit}</div>
              <div className="mt-1 text-sm text-background/60">{selected.hint}</div>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-t border-background/15 p-3">
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label={bi("Previous character", "ಹಿಂದಿನ ಅಕ್ಷರ")}
              className="grid h-10 w-10 place-items-center rounded-md border border-background/20 transition-colors hover:bg-background hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <ReadAloud
              text={selected.spoken}
              lang="kn-IN"
              label={bi("Hear sound", "ಧ್ವನಿ ಕೇಳಿ")}
              className="h-10 justify-center rounded-md border-background/20 bg-background/10 text-background hover:bg-background hover:text-foreground"
            />
            <button
              type="button"
              onClick={() => move(1)}
              aria-label={bi("Next character", "ಮುಂದಿನ ಅಕ್ಷರ")}
              className="grid h-10 w-10 place-items-center rounded-md border border-background/20 transition-colors hover:bg-background hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => toggleLetterMastery(selected.char)}
            aria-pressed={isMastered}
            className={cn(
              "flex h-12 w-full items-center justify-center gap-2 border-t border-background/15 text-sm font-bold transition-colors",
              isMastered
                ? "bg-emerald-500 text-white"
                : "bg-amber-400 text-stone-950 hover:bg-amber-300",
            )}
          >
            <Check className="h-4 w-4" />
            {isMastered
              ? bi("Mastered", "ಕಲಿತಿದೆ")
              : bi("Mark as mastered", "ಕಲಿತಿದೆ ಎಂದು ಗುರುತಿಸಿ")}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-6 xl:grid-cols-8">
          {items.map((item, index) => {
            const active = index === selectedIndex;
            const mastered = profile.masteredLetters.includes(item.char);
            return (
              <button
                key={`${group}-${item.char}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                aria-label={`${item.char}, ${item.translit}`}
                aria-pressed={active}
                className={cn(
                  "relative aspect-square min-h-20 overflow-hidden rounded-md border bg-card p-2 text-center transition-all",
                  active
                    ? "border-primary shadow-[0_0_0_2px_hsl(var(--primary)/0.18)]"
                    : "border-border hover:-translate-y-0.5 hover:border-foreground/30",
                )}
              >
                {mastered && (
                  <span className="absolute right-1.5 top-1.5 grid h-4 w-4 place-items-center rounded-full bg-emerald-500 text-white">
                    <Check className="h-2.5 w-2.5" />
                  </span>
                )}
                <span className="block text-2xl font-bold sm:text-3xl">
                  {item.char}
                </span>
                <span className="mt-1 block truncate text-[10px] font-semibold text-muted-foreground">
                  {item.translit}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}