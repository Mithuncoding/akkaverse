"use client";

import * as React from "react";

const STORAGE_KEY = "akkaverse.learn.v1";
const DAILY_GOAL = 40;

export type WordRating = "again" | "learning" | "mastered";

export type LearnProfile = {
  xp: number;
  todayXp: number;
  today: string;
  dayStreak: number;
  lastPracticed: string;
  masteredLetters: string[];
  wordStrength: Record<string, number>;
  answered: number;
  correct: number;
  sessions: number;
  perfects: number;
  bestScore: number;
};

const EMPTY_PROFILE: LearnProfile = {
  xp: 0,
  todayXp: 0,
  today: "",
  dayStreak: 0,
  lastPracticed: "",
  masteredLetters: [],
  wordStrength: {},
  answered: 0,
  correct: 0,
  sessions: 0,
  perfects: 0,
  bestScore: 0,
};

export type LearnerRank = {
  min: number;
  en: string;
  kn: string;
  glyph: string;
};

export const LEARNER_RANKS: LearnerRank[] = [
  { min: 0, en: "First Step", kn: "ಮೊದಲ ಹೆಜ್ಜೆ", glyph: "ಅ" },
  { min: 100, en: "Letter Explorer", kn: "ಅಕ್ಷರ ಅನ್ವೇಷಕ", glyph: "ಕ" },
  { min: 300, en: "Word Weaver", kn: "ಪದ ನೇಕಾರ", glyph: "ಪ" },
  { min: 700, en: "Conversation Maker", kn: "ಸಂಭಾಷಣಾಕಾರ", glyph: "ಮ" },
  { min: 1400, en: "Kannada Keeper", kn: "ಕನ್ನಡ ಕಾವಲುಗಾರ", glyph: "ಕಂ" },
];

export function rankForLearner(xp: number) {
  let index = 0;
  for (let i = 0; i < LEARNER_RANKS.length; i += 1) {
    if (xp >= LEARNER_RANKS[i].min) index = i;
  }
  const rank = LEARNER_RANKS[index];
  const next = LEARNER_RANKS[index + 1] ?? null;
  const progress = next
    ? (xp - rank.min) / Math.max(next.min - rank.min, 1)
    : 1;
  return { rank, next, progress: Math.min(Math.max(progress, 0), 1) };
}

export function todayProgress(profile: LearnProfile) {
  const xp = profile.today === todayString() ? profile.todayXp : 0;
  return {
    xp,
    goal: DAILY_GOAL,
    progress: Math.min(xp / DAILY_GOAL, 1),
    complete: xp >= DAILY_GOAL,
  };
}

export function masteredWordCount(profile: LearnProfile) {
  return Object.values(profile.wordStrength).filter((strength) => strength >= 2)
    .length;
}

let profile = EMPTY_PROFILE;
let loaded = false;
const listeners = new Set<() => void>();

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function loadProfile(): LearnProfile {
  if (typeof window === "undefined") return EMPTY_PROFILE;
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved) as Partial<LearnProfile>;
      return {
        ...EMPTY_PROFILE,
        ...parsed,
        masteredLetters: [...(parsed.masteredLetters ?? [])],
        wordStrength: { ...(parsed.wordStrength ?? {}) },
      };
    }
  } catch {
    // Learning still works when storage is unavailable.
  }
  return EMPTY_PROFILE;
}

function ensureLoaded() {
  if (!loaded && typeof window !== "undefined") {
    profile = loadProfile();
    loaded = true;
  }
}

function persist(next: LearnProfile) {
  profile = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  } catch {
    // Keep the in-memory session when storage is unavailable.
  }
  listeners.forEach((listener) => listener());
}

function withPractice(next: LearnProfile, gainedXp: number): LearnProfile {
  const today = todayString();
  const isNewDay = next.lastPracticed !== today;
  let dayStreak = next.dayStreak;
  if (isNewDay) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    dayStreak = next.lastPracticed === yesterday.toISOString().slice(0, 10)
      ? next.dayStreak + 1
      : 1;
  }
  return {
    ...next,
    xp: next.xp + gainedXp,
    todayXp: next.today === today ? next.todayXp + gainedXp : gainedXp,
    today,
    dayStreak,
    lastPracticed: today,
  };
}

export function toggleLetterMastery(char: string) {
  ensureLoaded();
  const mastered = profile.masteredLetters.includes(char);
  const next = {
    ...profile,
    masteredLetters: mastered
      ? profile.masteredLetters.filter((item) => item !== char)
      : [...profile.masteredLetters, char],
  };
  persist(mastered ? next : withPractice(next, 5));
}

export function rateWord(word: string, rating: WordRating) {
  ensureLoaded();
  const value = rating === "again" ? 0 : rating === "learning" ? 1 : 2;
  const previous = profile.wordStrength[word] ?? 0;
  const gainedXp = value > previous ? (value === 2 ? 8 : 3) : 1;
  const next = {
    ...profile,
    wordStrength: { ...profile.wordStrength, [word]: value },
  };
  persist(withPractice(next, gainedXp));
}

export function commitLearnChallenge(correct: number, total: number) {
  ensureLoaded();
  const gainedXp = correct * 10 + (correct === total ? 20 : 0);
  const next = {
    ...profile,
    answered: profile.answered + total,
    correct: profile.correct + correct,
    sessions: profile.sessions + 1,
    perfects: profile.perfects + (correct === total ? 1 : 0),
    bestScore: Math.max(profile.bestScore, correct),
  };
  persist(withPractice(next, gainedXp));
  return gainedXp;
}

export function useLearnProfile() {
  const subscribe = React.useCallback((callback: () => void) => {
    listeners.add(callback);
    return () => listeners.delete(callback);
  }, []);
  const store = React.useSyncExternalStore(
    subscribe,
    () => profile,
    () => EMPTY_PROFILE,
  );
  React.useEffect(() => {
    if (!loaded) {
      profile = loadProfile();
      loaded = true;
      listeners.forEach((listener) => listener());
    }
  }, []);
  return store;
}