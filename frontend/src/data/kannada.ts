/**
 * Learn Kannada — curated learning content.
 *
 * Single source of truth for the alphabet, everyday vocabulary flashcards, and
 * quiz questions. All Kannada is written in the native script with a Latin
 * transliteration so absolute beginners can follow along.
 */

export type Letter = {
  /** Kannada glyph, e.g. "ಅ". */
  char: string;
  /** Latin transliteration, e.g. "a". */
  translit: string;
  /** Short hint for the sound, e.g. "as in 'up'". */
  hint: string;
};

/** Vowels — ಸ್ವರಗಳು */
export const VOWELS: Letter[] = [
  { char: "ಅ", translit: "a", hint: "as in 'up'" },
  { char: "ಆ", translit: "aa", hint: "as in 'father'" },
  { char: "ಇ", translit: "i", hint: "as in 'it'" },
  { char: "ಈ", translit: "ee", hint: "as in 'see'" },
  { char: "ಉ", translit: "u", hint: "as in 'put'" },
  { char: "ಊ", translit: "oo", hint: "as in 'food'" },
  { char: "ಋ", translit: "ru", hint: "rolled 'ru'" },
  { char: "ಎ", translit: "e", hint: "as in 'bed'" },
  { char: "ಏ", translit: "ee", hint: "long 'e'" },
  { char: "ಐ", translit: "ai", hint: "as in 'aisle'" },
  { char: "ಒ", translit: "o", hint: "as in 'go'" },
  { char: "ಓ", translit: "oo", hint: "long 'o'" },
  { char: "ಔ", translit: "au", hint: "as in 'cow'" },
  { char: "ಅಂ", translit: "am", hint: "nasal 'am'" },
  { char: "ಅಃ", translit: "aha", hint: "aspirated 'ah'" },
];

/** A selection of common consonants — ವ್ಯಂಜನಗಳು */
export const CONSONANTS: Letter[] = [
  { char: "ಕ", translit: "ka", hint: "as in 'car'" },
  { char: "ಖ", translit: "kha", hint: "aspirated 'k'" },
  { char: "ಗ", translit: "ga", hint: "as in 'go'" },
  { char: "ಘ", translit: "gha", hint: "aspirated 'g'" },
  { char: "ಚ", translit: "cha", hint: "as in 'chat'" },
  { char: "ಜ", translit: "ja", hint: "as in 'jam'" },
  { char: "ಟ", translit: "ta", hint: "hard 't'" },
  { char: "ಡ", translit: "da", hint: "hard 'd'" },
  { char: "ಣ", translit: "na", hint: "retroflex 'n'" },
  { char: "ತ", translit: "ta", hint: "soft 't'" },
  { char: "ದ", translit: "da", hint: "soft 'd'" },
  { char: "ನ", translit: "na", hint: "as in 'no'" },
  { char: "ಪ", translit: "pa", hint: "as in 'pat'" },
  { char: "ಬ", translit: "ba", hint: "as in 'bat'" },
  { char: "ಮ", translit: "ma", hint: "as in 'mat'" },
  { char: "ಯ", translit: "ya", hint: "as in 'yes'" },
  { char: "ರ", translit: "ra", hint: "rolled 'r'" },
  { char: "ಲ", translit: "la", hint: "as in 'let'" },
  { char: "ವ", translit: "va", hint: "as in 'van'" },
  { char: "ಶ", translit: "sha", hint: "as in 'ship'" },
  { char: "ಸ", translit: "sa", hint: "as in 'sun'" },
  { char: "ಹ", translit: "ha", hint: "as in 'hat'" },
  { char: "ಳ", translit: "la", hint: "retroflex 'l'" },
];

export type NumberItem = {
  /** Kannada numeral glyph, e.g. "೧". */
  glyph: string;
  /** Arabic numeral. */
  value: number;
  /** Kannada word in script. */
  word: string;
  /** Latin transliteration of the word. */
  translit: string;
};

/** Numerals 0–10 — ಸಂಖ್ಯೆಗಳು */
export const NUMBERS: NumberItem[] = [
  { glyph: "೦", value: 0, word: "ಸೊನ್ನೆ", translit: "sonne" },
  { glyph: "೧", value: 1, word: "ಒಂದು", translit: "ondu" },
  { glyph: "೨", value: 2, word: "ಎರಡು", translit: "eradu" },
  { glyph: "೩", value: 3, word: "ಮೂರು", translit: "mooru" },
  { glyph: "೪", value: 4, word: "ನಾಲ್ಕು", translit: "naalku" },
  { glyph: "೫", value: 5, word: "ಐದು", translit: "aidu" },
  { glyph: "೬", value: 6, word: "ಆರು", translit: "aaru" },
  { glyph: "೭", value: 7, word: "ಏಳು", translit: "elu" },
  { glyph: "೮", value: 8, word: "ಎಂಟು", translit: "entu" },
  { glyph: "೯", value: 9, word: "ಒಂಬತ್ತು", translit: "ombattu" },
  { glyph: "೧೦", value: 10, word: "ಹತ್ತು", translit: "hattu" },
];

export type Flashcard = {
  kn: string;
  translit: string;
  en: string;
  emoji: string;
};

/** Everyday words for flip-card practice. */
export const FLASHCARDS: Flashcard[] = [
  { kn: "ನಮಸ್ಕಾರ", translit: "namaskara", en: "Hello / Greetings", emoji: "🙏" },
  { kn: "ಧನ್ಯವಾದ", translit: "dhanyavaada", en: "Thank you", emoji: "😊" },
  { kn: "ನೀರು", translit: "neeru", en: "Water", emoji: "💧" },
  { kn: "ಊಟ", translit: "oota", en: "Meal / Food", emoji: "🍛" },
  { kn: "ಮನೆ", translit: "mane", en: "House / Home", emoji: "🏠" },
  { kn: "ಪುಸ್ತಕ", translit: "pustaka", en: "Book", emoji: "📖" },
  { kn: "ಗೆಳೆಯ", translit: "geleya", en: "Friend", emoji: "🤝" },
  { kn: "ಹೂವು", translit: "hoovu", en: "Flower", emoji: "🌸" },
  { kn: "ಸೂರ್ಯ", translit: "soorya", en: "Sun", emoji: "☀️" },
  { kn: "ಚಂದ್ರ", translit: "chandra", en: "Moon", emoji: "🌙" },
  { kn: "ಪ್ರೀತಿ", translit: "preeti", en: "Love", emoji: "❤️" },
  { kn: "ನಾಡು", translit: "naadu", en: "Land / Country", emoji: "🌍" },
];

export type QuizQuestion = {
  /** What we show as the prompt (Kannada glyph or word). */
  prompt: string;
  /** Transliteration shown under the prompt as a hint. */
  hint?: string;
  /** The correct answer. */
  answer: string;
  /** Multiple-choice options (includes the answer). */
  options: string[];
};

/** A small mixed quiz: letters, numbers, and vocabulary. */
export const QUIZ: QuizQuestion[] = [
  {
    prompt: "ಅ",
    answer: "a",
    options: ["a", "i", "u", "e"],
  },
  {
    prompt: "ಕ",
    answer: "ka",
    options: ["ga", "ka", "cha", "ta"],
  },
  {
    prompt: "ಮ",
    answer: "ma",
    options: ["na", "ma", "ba", "ra"],
  },
  {
    prompt: "೫",
    hint: "numeral",
    answer: "5",
    options: ["3", "5", "7", "9"],
  },
  {
    prompt: "ನಮಸ್ಕಾರ",
    hint: "namaskara",
    answer: "Hello",
    options: ["Thank you", "Water", "Hello", "Friend"],
  },
  {
    prompt: "ನೀರು",
    hint: "neeru",
    answer: "Water",
    options: ["Water", "Food", "House", "Book"],
  },
  {
    prompt: "ಧನ್ಯವಾದ",
    hint: "dhanyavaada",
    answer: "Thank you",
    options: ["Hello", "Thank you", "Love", "Friend"],
  },
  {
    prompt: "ಹೂವು",
    hint: "hoovu",
    answer: "Flower",
    options: ["Sun", "Moon", "Flower", "Land"],
  },
];
