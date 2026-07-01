"use client";

/**
 * Quiz progression — the "game layer" that turns questions into an adventure.
 *
 * Everything lives in localStorage (private, instant, free). A tiny external
 * store lets any component subscribe, so finishing a quiz in the Arena instantly
 * updates the hub, the rank bar and the museum. No server, no accounts.
 */

import * as React from "react";

import {
  CATEGORIES,
  categoryById,
  type QuizCategoryId,
} from "@/data/quiz-bank";

const KEY = "akkaverse.quiz.v2";

export type CatStat = { seen: number; correct: number };

export type QuizProfile = {
  xp: number;
  answered: number;
  correct: number;
  byCat: Partial<Record<QuizCategoryId, CatStat>>;
  quizzes: number;
  perfects: number;
  bestStreakInQuiz: number;
  dayStreak: number;
  lastPlayed: string; // YYYY-MM-DD
  dailyDone: string; // YYYY-MM-DD of last completed daily
  achievements: string[];
  collectibles: string[];
};

const EMPTY: QuizProfile = {
  xp: 0,
  answered: 0,
  correct: 0,
  byCat: {},
  quizzes: 0,
  perfects: 0,
  bestStreakInQuiz: 0,
  dayStreak: 0,
  lastPlayed: "",
  dailyDone: "",
  achievements: [],
  collectibles: [],
};

/* ── ranks ─────────────────────────────────────────────── */
export type Rank = { min: number; en: string; kn: string; emoji: string };
export const RANKS: Rank[] = [
  { min: 0, en: "Explorer", kn: "ಅನ್ವೇಷಕ", emoji: "🧭" },
  { min: 120, en: "Apprentice", kn: "ಶಿಷ್ಯ", emoji: "📗" },
  { min: 350, en: "Scholar", kn: "ವಿದ್ವಾಂಸ", emoji: "🎓" },
  { min: 750, en: "Historian", kn: "ಇತಿಹಾಸಜ್ಞ", emoji: "📜" },
  { min: 1400, en: "Sage", kn: "ಋಷಿ", emoji: "🔮" },
  { min: 2500, en: "Legend", kn: "ದಂತಕಥೆ", emoji: "🏆" },
];

export function rankFor(xp: number): { rank: Rank; next: Rank | null; progress: number } {
  let idx = 0;
  for (let i = 0; i < RANKS.length; i++) if (xp >= RANKS[i].min) idx = i;
  const rank = RANKS[idx];
  const next = RANKS[idx + 1] ?? null;
  const progress = next ? (xp - rank.min) / (next.min - rank.min) : 1;
  return { rank, next, progress: Math.max(0, Math.min(1, progress)) };
}

/* ── achievements ──────────────────────────────────────── */
export type Achievement = {
  id: string;
  emoji: string;
  en: string;
  kn: string;
  descEn: string;
  descKn: string;
  test: (p: QuizProfile) => boolean;
};

const catCorrect = (p: QuizProfile, cat: QuizCategoryId) => p.byCat[cat]?.correct ?? 0;
const catsWithCorrect = (p: QuizProfile) =>
  CATEGORIES.filter((c) => (p.byCat[c.id]?.correct ?? 0) > 0).length;

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first", emoji: "🌱", en: "First Steps", kn: "ಮೊದಲ ಹೆಜ್ಜೆ", descEn: "Finish your first quiz", descKn: "ಮೊದಲ ಕ್ವಿಜ್ ಮುಗಿಸಿ", test: (p) => p.quizzes >= 1 },
  { id: "perfect", emoji: "💯", en: "Perfect Score", kn: "ಪರಿಪೂರ್ಣ ಅಂಕ", descEn: "Get every question right in a quiz", descKn: "ಒಂದು ಕ್ವಿಜ್‌ನ ಎಲ್ಲ ಪ್ರಶ್ನೆ ಸರಿ", test: (p) => p.perfects >= 1 },
  { id: "dasara", emoji: "🪔", en: "Dasara Expert", kn: "ದಸರಾ ತಜ್ಞ", descEn: "5 correct in Festivals", descKn: "ಹಬ್ಬಗಳಲ್ಲಿ ೫ ಸರಿ", test: (p) => catCorrect(p, "festivals") >= 5 },
  { id: "hoysala", emoji: "⛩", en: "Hoysala Master", kn: "ಹೊಯ್ಸಳ ನಿಪುಣ", descEn: "5 correct in Architecture + Dynasties", descKn: "ವಾಸ್ತು+ರಾಜವಂಶದಲ್ಲಿ ೫ ಸರಿ", test: (p) => catCorrect(p, "architecture") + catCorrect(p, "dynasties") >= 5 },
  { id: "kannada", emoji: "ಅ", en: "Kannada Scholar", kn: "ಕನ್ನಡ ವಿದ್ವಾಂಸ", descEn: "5 correct in Language + Literature", descKn: "ಭಾಷೆ+ಸಾಹಿತ್ಯದಲ್ಲಿ ೫ ಸರಿ", test: (p) => catCorrect(p, "language") + catCorrect(p, "literature") >= 5 },
  { id: "temple", emoji: "🛕", en: "Temple Explorer", kn: "ದೇವಾಲಯ ಅನ್ವೇಷಕ", descEn: "5 correct in Temples", descKn: "ದೇವಾಲಯಗಳಲ್ಲಿ ೫ ಸರಿ", test: (p) => catCorrect(p, "temples") >= 5 },
  { id: "legend", emoji: "📜", en: "History Legend", kn: "ಇತಿಹಾಸ ದಂತಕಥೆ", descEn: "10 correct in History + Kings", descKn: "ಇತಿಹಾಸ+ಅರಸರಲ್ಲಿ ೧೦ ಸರಿ", test: (p) => catCorrect(p, "history") + catCorrect(p, "kings") >= 10 },
  { id: "silicon", emoji: "🚀", en: "Silicon Karnataka", kn: "ಸಿಲಿಕಾನ್ ಕರ್ನಾಟಕ", descEn: "5 correct in ISRO + Bengaluru", descKn: "ಇಸ್ರೋ+ಬೆಂಗಳೂರಿನಲ್ಲಿ ೫ ಸರಿ", test: (p) => catCorrect(p, "isro") + catCorrect(p, "bengaluru") >= 5 },
  { id: "polymath", emoji: "🌈", en: "Polymath", kn: "ಬಹುಜ್ಞಾನಿ", descEn: "Score in 12 different categories", descKn: "೧೨ ವಿಭಾಗಗಳಲ್ಲಿ ಅಂಕ", test: (p) => catsWithCorrect(p) >= 12 },
  { id: "streak7", emoji: "🔥", en: "7-Day Streak", kn: "೭ ದಿನಗಳ ಸರಣಿ", descEn: "Play 7 days in a row", descKn: "ಸತತ ೭ ದಿನ ಆಡಿ", test: (p) => p.dayStreak >= 7 },
  { id: "century", emoji: "🎯", en: "Centurion", kn: "ಶತಕವೀರ", descEn: "Answer 100 questions", descKn: "೧೦೦ ಪ್ರಶ್ನೆಗೆ ಉತ್ತರಿಸಿ", test: (p) => p.answered >= 100 },
  { id: "sharp", emoji: "⚡", en: "Sharp Streak", kn: "ತೀಕ್ಷ್ಣ ಸರಣಿ", descEn: "Get 8 in a row within a quiz", descKn: "ಒಂದೇ ಕ್ವಿಜ್‌ನಲ್ಲಿ ಸತತ ೮ ಸರಿ", test: (p) => p.bestStreakInQuiz >= 8 },
];

/* ── collectibles (a museum that fills as you learn) ───── */
export type Collectible = {
  id: string;
  cat: QuizCategoryId;
  emoji: string;
  en: string;
  kn: string;
  wiki: string;
  /** Correct answers needed in its category to unlock. */
  need: number;
};

export const COLLECTIBLES: Collectible[] = [
  { id: "c-krishnadevaraya", cat: "kings", emoji: "👑", en: "Krishnadevaraya", kn: "ಕೃಷ್ಣದೇವರಾಯ", wiki: "Krishnadevaraya", need: 2 },
  { id: "c-tipu", cat: "kings", emoji: "🐅", en: "Tiger of Mysore", kn: "ಮೈಸೂರಿನ ಹುಲಿ", wiki: "Tipu Sultan", need: 3 },
  { id: "c-chennamma", cat: "freedom", emoji: "🗡", en: "Kittur Chennamma", kn: "ಕಿತ್ತೂರು ಚೆನ್ನಮ್ಮ", wiki: "Kittur Chennamma", need: 2 },
  { id: "c-hampi", cat: "history", emoji: "🏛", en: "Hampi Ruins", kn: "ಹಂಪಿ ಅವಶೇಷ", wiki: "Hampi", need: 2 },
  { id: "c-golden-howdah", cat: "festivals", emoji: "🐘", en: "Golden Howdah", kn: "ಚಿನ್ನದ ಅಂಬಾರಿ", wiki: "Mysore Palace", need: 2 },
  { id: "c-belur", cat: "architecture", emoji: "⛩", en: "Belur Temple", kn: "ಬೇಲೂರು ದೇವಾಲಯ", wiki: "Chennakeshava Temple, Belur", need: 2 },
  { id: "c-golgumbaz", cat: "monuments", emoji: "🕌", en: "Gol Gumbaz", kn: "ಗೋಲ್ ಗುಂಬಜ್", wiki: "Gol Gumbaz", need: 2 },
  { id: "c-bahubali", cat: "temples", emoji: "🧘", en: "Gomateshwara", kn: "ಗೊಮ್ಮಟೇಶ್ವರ", wiki: "Gommateshwara statue", need: 2 },
  { id: "c-kuvempu", cat: "literature", emoji: "📖", en: "Kuvempu", kn: "ಕುವೆಂಪು", wiki: "Kuvempu", need: 2 },
  { id: "c-jog", cat: "geography", emoji: "💧", en: "Jog Falls", kn: "ಜೋಗ ಜಲಪಾತ", wiki: "Jog Falls", need: 2 },
  { id: "c-tiger", cat: "wildlife", emoji: "🐅", en: "Bandipur Tiger", kn: "ಬಂಡೀಪುರ ಹುಲಿ", wiki: "Bandipur National Park", need: 2 },
  { id: "c-dosa", cat: "cuisine", emoji: "🍽", en: "Masala Dosa", kn: "ಮಸಾಲಾ ದೋಸೆ", wiki: "Masala dosa", need: 2 },
  { id: "c-yakshagana", cat: "culture", emoji: "🎭", en: "Yakshagana", kn: "ಯಕ್ಷಗಾನ", wiki: "Yakshagana", need: 2 },
  { id: "c-purandara", cat: "music", emoji: "🎶", en: "Purandara Dasa", kn: "ಪುರಂದರ ದಾಸ", wiki: "Purandara Dasa", need: 2 },
  { id: "c-chandrayaan", cat: "isro", emoji: "🚀", en: "Chandrayaan-3", kn: "ಚಂದ್ರಯಾನ-೩", wiki: "Chandrayaan-3", need: 2 },
  { id: "c-vidhana", cat: "today", emoji: "🏛", en: "Vidhana Soudha", kn: "ವಿಧಾನಸೌಧ", wiki: "Vidhana Soudha", need: 2 },
  { id: "c-visvesvaraya", cat: "personalities", emoji: "⭐", en: "Sir M. V.", kn: "ಸರ್ ಎಂ.ವಿ.", wiki: "M. Visvesvaraya", need: 2 },
  { id: "c-kadamba", cat: "dynasties", emoji: "🏰", en: "Kadamba Crest", kn: "ಕದಂಬ ಲಾಂಛನ", wiki: "Kadamba dynasty", need: 2 },
  { id: "c-dollu", cat: "dance", emoji: "🥁", en: "Dollu Kunitha", kn: "ಡೊಳ್ಳು ಕುಣಿತ", wiki: "Dollu Kunitha", need: 2 },
  { id: "c-kannada", cat: "language", emoji: "ಅ", en: "Classical Kannada", kn: "ಶಾಸ್ತ್ರೀಯ ಕನ್ನಡ", wiki: "Kannada", need: 2 },
  { id: "c-kempegowda", cat: "bengaluru", emoji: "🏙", en: "Kempegowda", kn: "ಕೆಂಪೇಗೌಡ", wiki: "Kempe Gowda I", need: 2 },
];

/* ── external store ────────────────────────────────────── */
let profile: QuizProfile = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function load(): QuizProfile {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...(JSON.parse(raw) as QuizProfile) };
  } catch {
    /* ignore */
  }
  return EMPTY;
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(profile));
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l());
}

function ensureLoaded() {
  if (!loaded && typeof window !== "undefined") {
    profile = load();
    loaded = true;
  }
}

function todayStr(): string {
  return new Date().toISOString().slice(0, 10);
}

/** XP awarded per correct answer by difficulty. */
export const XP_BY_DIFF = { easy: 10, medium: 15, hard: 25 } as const;

export type SessionResult = {
  perCat: { cat: QuizCategoryId; correct: boolean; diff: "easy" | "medium" | "hard" }[];
  bestStreak: number;
  isPerfect: boolean;
  isDaily?: boolean;
  xpGained: number;
};

/** Commit a finished quiz; returns newly-unlocked achievement + collectible ids. */
export function commitSession(r: SessionResult): {
  achievements: Achievement[];
  collectibles: Collectible[];
} {
  ensureLoaded();
  const p: QuizProfile = structuredCloneSafe(profile);

  for (const a of r.perCat) {
    const cs = p.byCat[a.cat] ?? { seen: 0, correct: 0 };
    cs.seen += 1;
    if (a.correct) cs.correct += 1;
    p.byCat[a.cat] = cs;
    p.answered += 1;
    if (a.correct) p.correct += 1;
  }
  p.xp += r.xpGained;
  p.quizzes += 1;
  if (r.isPerfect) p.perfects += 1;
  p.bestStreakInQuiz = Math.max(p.bestStreakInQuiz, r.bestStreak);

  // Day streak.
  const today = todayStr();
  if (p.lastPlayed !== today) {
    const y = new Date();
    y.setDate(y.getDate() - 1);
    const yStr = y.toISOString().slice(0, 10);
    p.dayStreak = p.lastPlayed === yStr ? p.dayStreak + 1 : 1;
    p.lastPlayed = today;
  }
  if (r.isDaily) p.dailyDone = today;

  // Unlock achievements.
  const newAch: Achievement[] = [];
  for (const a of ACHIEVEMENTS) {
    if (!p.achievements.includes(a.id) && a.test(p)) {
      p.achievements.push(a.id);
      newAch.push(a);
    }
  }
  // Unlock collectibles.
  const newCol: Collectible[] = [];
  for (const c of COLLECTIBLES) {
    if (!p.collectibles.includes(c.id) && (p.byCat[c.cat]?.correct ?? 0) >= c.need) {
      p.collectibles.push(c.id);
      newCol.push(c);
    }
  }

  profile = p;
  persist();
  return { achievements: newAch, collectibles: newCol };
}

function structuredCloneSafe(p: QuizProfile): QuizProfile {
  return {
    ...p,
    byCat: Object.fromEntries(Object.entries(p.byCat).map(([k, v]) => [k, { ...v! }])) as QuizProfile["byCat"],
    achievements: [...p.achievements],
    collectibles: [...p.collectibles],
  };
}

export function resetProfile() {
  ensureLoaded();
  profile = { ...EMPTY, byCat: {}, achievements: [], collectibles: [] };
  persist();
}

/** React hook — subscribes to the profile store. */
export function useQuizProfile(): QuizProfile {
  const subscribe = React.useCallback((cb: () => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  }, []);
  // getSnapshot returns the module value WITHOUT touching localStorage, so the
  // server render and the first client render agree (both EMPTY). We then load
  // from localStorage in an effect and notify — no hydration mismatch.
  const store = React.useSyncExternalStore(subscribe, () => profile, () => EMPTY);
  React.useEffect(() => {
    if (!loaded) {
      profile = load();
      loaded = true;
      listeners.forEach((l) => l());
    }
  }, []);
  return store;
}

/** Weakest categories the learner should revisit (lowest accuracy, seen ≥1). */
export function weakestCategories(p: QuizProfile, n = 3): QuizCategoryId[] {
  const scored = CATEGORIES.map((c) => {
    const s = p.byCat[c.id];
    const acc = s && s.seen > 0 ? s.correct / s.seen : -1; // unseen sorts last
    return { id: c.id, acc, seen: s?.seen ?? 0 };
  })
    .filter((x) => x.seen > 0)
    .sort((a, b) => a.acc - b.acc);
  return scored.slice(0, n).map((x) => x.id);
}

/** Fresh categories not yet attempted (for "explore next"). */
export function unexploredCategories(p: QuizProfile, n = 3): QuizCategoryId[] {
  return CATEGORIES.filter((c) => !(p.byCat[c.id]?.seen)).slice(0, n).map((c) => c.id);
}

export function categoryLabel(id: QuizCategoryId) {
  return categoryById(id).label;
}
