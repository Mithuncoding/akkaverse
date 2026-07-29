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

export type WordCategory = "greetings" | "essentials" | "people" | "world";

export type Flashcard = {
  kn: string;
  translit: string;
  en: string;
  emoji: string;
  category: WordCategory;
  exampleKn: string;
  exampleEn: string;
};

/** Everyday words grouped into a practical beginner curriculum. */
export const FLASHCARDS: Flashcard[] = [
  { kn: "ನಮಸ್ಕಾರ", translit: "namaskara", en: "Hello / Greetings", emoji: "🙏", category: "greetings", exampleKn: "ನಮಸ್ಕಾರ! ನೀವು ಹೇಗಿದ್ದೀರಿ?", exampleEn: "Hello! How are you?" },
  { kn: "ಧನ್ಯವಾದ", translit: "dhanyavaada", en: "Thank you", emoji: "😊", category: "greetings", exampleKn: "ತುಂಬಾ ಧನ್ಯವಾದ", exampleEn: "Thank you very much" },
  { kn: "ದಯವಿಟ್ಟು", translit: "dayavittu", en: "Please", emoji: "🤲", category: "greetings", exampleKn: "ದಯವಿಟ್ಟು ಕುಳಿತುಕೊಳ್ಳಿ", exampleEn: "Please sit down" },
  { kn: "ಕ್ಷಮಿಸಿ", translit: "kshamisi", en: "Sorry / Excuse me", emoji: "🙇", category: "greetings", exampleKn: "ಕ್ಷಮಿಸಿ, ನನಗೆ ಅರ್ಥವಾಗಲಿಲ್ಲ", exampleEn: "Sorry, I did not understand" },
  { kn: "ನೀರು", translit: "neeru", en: "Water", emoji: "💧", category: "essentials", exampleKn: "ನನಗೆ ನೀರು ಬೇಕು", exampleEn: "I need water" },
  { kn: "ಊಟ", translit: "oota", en: "Meal / Food", emoji: "🍛", category: "essentials", exampleKn: "ಊಟ ರುಚಿಯಾಗಿದೆ", exampleEn: "The meal is delicious" },
  { kn: "ಹೌದು", translit: "haudu", en: "Yes", emoji: "✓", category: "essentials", exampleKn: "ಹೌದು, ನನಗೆ ಕನ್ನಡ ಇಷ್ಟ", exampleEn: "Yes, I like Kannada" },
  { kn: "ಇಲ್ಲ", translit: "illa", en: "No / Not there", emoji: "×", category: "essentials", exampleKn: "ಇಲ್ಲ, ಧನ್ಯವಾದ", exampleEn: "No, thank you" },
  { kn: "ಸಮಯ", translit: "samaya", en: "Time", emoji: "⏱", category: "essentials", exampleKn: "ಈಗ ಸಮಯ ಎಷ್ಟು?", exampleEn: "What time is it now?" },
  { kn: "ಗೆಳೆಯ", translit: "geleya", en: "Friend", emoji: "🤝", category: "people", exampleKn: "ಅವನು ನನ್ನ ಗೆಳೆಯ", exampleEn: "He is my friend" },
  { kn: "ಪ್ರೀತಿ", translit: "preeti", en: "Love", emoji: "♥", category: "people", exampleKn: "ಪ್ರೀತಿ ಅಮೂಲ್ಯ", exampleEn: "Love is precious" },
  { kn: "ಅಮ್ಮ", translit: "amma", en: "Mother", emoji: "👩", category: "people", exampleKn: "ಇವರು ನನ್ನ ಅಮ್ಮ", exampleEn: "This is my mother" },
  { kn: "ಅಪ್ಪ", translit: "appa", en: "Father", emoji: "👨", category: "people", exampleKn: "ಇವರು ನನ್ನ ಅಪ್ಪ", exampleEn: "This is my father" },
  { kn: "ಮಗು", translit: "magu", en: "Child", emoji: "🧒", category: "people", exampleKn: "ಮಗು ಆಡುತ್ತಿದೆ", exampleEn: "The child is playing" },
  { kn: "ಮನೆ", translit: "mane", en: "House / Home", emoji: "⌂", category: "world", exampleKn: "ಇದು ನನ್ನ ಮನೆ", exampleEn: "This is my home" },
  { kn: "ಪುಸ್ತಕ", translit: "pustaka", en: "Book", emoji: "📖", category: "world", exampleKn: "ಇದು ಕನ್ನಡ ಪುಸ್ತಕ", exampleEn: "This is a Kannada book" },
  { kn: "ಹೂವು", translit: "hoovu", en: "Flower", emoji: "✿", category: "world", exampleKn: "ಇದು ಸುಂದರವಾದ ಹೂವು", exampleEn: "This is a beautiful flower" },
  { kn: "ಸೂರ್ಯ", translit: "soorya", en: "Sun", emoji: "☀", category: "world", exampleKn: "ಸೂರ್ಯ ಉದಯಿಸುತ್ತಾನೆ", exampleEn: "The sun rises" },
  { kn: "ಚಂದ್ರ", translit: "chandra", en: "Moon", emoji: "☾", category: "world", exampleKn: "ಚಂದ್ರ ಬೆಳಗುತ್ತಾನೆ", exampleEn: "The moon shines" },
  { kn: "ನಾಡು", translit: "naadu", en: "Land / Country", emoji: "◉", category: "world", exampleKn: "ಕರ್ನಾಟಕ ನಮ್ಮ ನಾಡು", exampleEn: "Karnataka is our land" },
  { kn: "ಶಾಲೆ", translit: "shaale", en: "School", emoji: "🏫", category: "world", exampleKn: "ನಾನು ಶಾಲೆಗೆ ಹೋಗುತ್ತೇನೆ", exampleEn: "I go to school" },
  { kn: "ರಸ್ತೆ", translit: "raste", en: "Road", emoji: "↟", category: "world", exampleKn: "ಈ ರಸ್ತೆ ಎಲ್ಲಿಗೆ ಹೋಗುತ್ತದೆ?", exampleEn: "Where does this road go?" },
  { kn: "ಮರ", translit: "mara", en: "Tree", emoji: "♣", category: "world", exampleKn: "ಇದು ದೊಡ್ಡ ಮರ", exampleEn: "This is a big tree" },
  { kn: "ಮಳೆ", translit: "male", en: "Rain", emoji: "☂", category: "world", exampleKn: "ಮಳೆ ಬರುತ್ತಿದೆ", exampleEn: "It is raining" },
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
