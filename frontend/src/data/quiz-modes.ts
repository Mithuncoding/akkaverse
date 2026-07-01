/**
 * Quiz "adventures" — the same fast, static bank framed as very different
 * experiences. One engine (the Arena), many journeys. No AI generation.
 */

import {
  pickQuestions,
  dailyChallenge,
  type BankQuestion,
  type QuizCategoryId,
} from "@/data/quiz-bank";

export type QuizMode = {
  id: string;
  emoji: string;
  en: string;
  kn: string;
  taglineEn: string;
  taglineKn: string;
  /** "R G B" accent triplets. */
  accent: string;
  accent2: string;
  /** Cover image (Wikipedia title). */
  wiki: string;
  /** Per-question timer in seconds (0 = untimed). */
  timer: number;
  /** Student mode leans into teaching (explanation opens automatically). */
  teachFirst?: boolean;
  /** How many questions. */
  count: number;
  /** Build this mode's question set (fresh each play, except daily). */
  build: () => BankQuestion[];
};

const catFilter = (cats: QuizCategoryId[], n: number, diff?: ("easy" | "medium" | "hard")[]) =>
  () => pickQuestions({ cats, n, diff });

export const QUIZ_MODES: QuizMode[] = [
  {
    id: "heritage",
    emoji: "🏛",
    en: "Heritage Explorer",
    kn: "ಪರಂಪರೆ ಅನ್ವೇಷಕ",
    taglineEn: "Journey across Karnataka — every answer unlocks the next wonder.",
    taglineKn: "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಪ್ರಯಾಣ — ಪ್ರತಿ ಉತ್ತರ ಹೊಸ ಅದ್ಭುತ ತೆರೆಯುತ್ತದೆ.",
    accent: "245 158 11",
    accent2: "180 66 40",
    wiki: "Hampi",
    timer: 0,
    count: 8,
    build: () => pickQuestions({ n: 8 }),
  },
  {
    id: "daily",
    emoji: "📅",
    en: "Daily Challenge",
    kn: "ದೈನಂದಿನ ಸವಾಲು",
    taglineEn: "A fresh handpicked set every day. Keep your streak alive!",
    taglineKn: "ಪ್ರತಿದಿನ ಹೊಸ ಆಯ್ದ ಪ್ರಶ್ನೆಗಳು. ನಿಮ್ಮ ಸರಣಿ ಉಳಿಸಿಕೊಳ್ಳಿ!",
    accent: "80 180 170",
    accent2: "44 116 108",
    wiki: "Vidhana Soudha",
    timer: 0,
    count: 7,
    build: () => dailyChallenge(7),
  },
  {
    id: "lightning",
    emoji: "⚡",
    en: "Lightning Mode",
    kn: "ಮಿಂಚಿನ ಸವಾಲು",
    taglineEn: "15 seconds per question. Think fast, score faster.",
    taglineKn: "ಪ್ರತಿ ಪ್ರಶ್ನೆಗೆ ೧೫ ಸೆಕೆಂಡ್. ವೇಗವಾಗಿ ಯೋಚಿಸಿ!",
    accent: "234 179 8",
    accent2: "190 100 30",
    wiki: "Jog Falls",
    timer: 15,
    count: 10,
    build: () => pickQuestions({ n: 10 }),
  },
  {
    id: "kingdom",
    emoji: "👑",
    en: "Kingdom Challenge",
    kn: "ಸಾಮ್ರಾಜ್ಯ ಸವಾಲು",
    taglineEn: "Rise through kings, dynasties and warriors of the past.",
    taglineKn: "ಅರಸರು, ರಾಜವಂಶಗಳು, ಯೋಧರ ಮೂಲಕ ಏರಿ.",
    accent: "212 175 55",
    accent2: "130 90 30",
    wiki: "Krishnadevaraya",
    timer: 0,
    count: 8,
    build: catFilter(["kings", "dynasties", "freedom", "history"], 8),
  },
  {
    id: "culture",
    emoji: "🎭",
    en: "Culture Quest",
    kn: "ಸಂಸ್ಕೃತಿ ಅನ್ವೇಷಣೆ",
    taglineEn: "Dance, music, food and festivals of the Kannada world.",
    taglineKn: "ಕನ್ನಡ ಲೋಕದ ನೃತ್ಯ, ಸಂಗೀತ, ಆಹಾರ, ಹಬ್ಬಗಳು.",
    accent: "210 100 150",
    accent2: "140 60 100",
    wiki: "Yakshagana",
    timer: 0,
    count: 8,
    build: catFilter(["culture", "dance", "music", "cuisine", "festivals"], 8),
  },
  {
    id: "temple",
    emoji: "🛕",
    en: "Temple Explorer",
    kn: "ದೇವಾಲಯ ಅನ್ವೇಷಕ",
    taglineEn: "Unlock temples, monuments and timeless architecture.",
    taglineKn: "ದೇವಾಲಯ, ಸ್ಮಾರಕ, ಕಾಲಾತೀತ ವಾಸ್ತುಶಿಲ್ಪ ತೆರೆಯಿರಿ.",
    accent: "230 160 60",
    accent2: "150 96 34",
    wiki: "Virupaksha Temple, Hampi",
    timer: 0,
    count: 8,
    build: catFilter(["temples", "architecture", "monuments"], 8),
  },
  {
    id: "student",
    emoji: "🎒",
    en: "Student Mode",
    kn: "ವಿದ್ಯಾರ್ಥಿ ಮೋಡ್",
    taglineEn: "No timer. Deep explanations after every question.",
    taglineKn: "ಟೈಮರ್ ಇಲ್ಲ. ಪ್ರತಿ ಪ್ರಶ್ನೆಯ ನಂತರ ವಿವರವಾದ ವಿವರಣೆ.",
    accent: "120 150 210",
    accent2: "70 96 150",
    wiki: "Kuvempu",
    timer: 0,
    teachFirst: true,
    count: 6,
    build: () => pickQuestions({ n: 6, diff: ["easy", "medium"] }),
  },
  {
    id: "master",
    emoji: "🧠",
    en: "Master Challenge",
    kn: "ಪ್ರವೀಣ ಸವಾಲು",
    taglineEn: "Only the hardest questions. For true Karnataka experts.",
    taglineKn: "ಅತ್ಯಂತ ಕಠಿಣ ಪ್ರಶ್ನೆಗಳು ಮಾತ್ರ. ನಿಜವಾದ ತಜ್ಞರಿಗೆ.",
    accent: "150 90 220",
    accent2: "92 50 150",
    wiki: "Gol Gumbaz",
    timer: 20,
    count: 8,
    build: () => {
      const hard = pickQuestions({ n: 8, diff: ["hard"] });
      return hard.length >= 5 ? hard : pickQuestions({ n: 8, diff: ["hard", "medium"] });
    },
  },
];

export function modeById(id: string): QuizMode | undefined {
  return QUIZ_MODES.find((m) => m.id === id);
}
