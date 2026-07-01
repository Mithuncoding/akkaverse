/**
 * The Akkaverse Quiz Bank — a large, handcrafted, bilingual question museum.
 *
 * NOTHING here is AI-generated. Every question, answer, explanation and fun
 * fact is curated so the experience is instant, reliable and free. AI is used
 * only at play time as a *teacher* (explain deeper, hint, follow-ups) — never
 * to invent questions.
 *
 * Each question carries its own curated explanation and a fun fact, so even
 * fully offline the quiz teaches. A `wiki` title supplies a real photograph
 * (via lib/wiki.ts) so questions feel visual, not like a form.
 */

export type Difficulty = "easy" | "medium" | "hard";

export type QuizCategoryId =
  | "history"
  | "festivals"
  | "kings"
  | "dynasties"
  | "freedom"
  | "monuments"
  | "architecture"
  | "literature"
  | "language"
  | "geography"
  | "cuisine"
  | "wildlife"
  | "culture"
  | "dance"
  | "music"
  | "isro"
  | "bengaluru"
  | "temples"
  | "personalities"
  | "today";

export type Bi = { en: string; kn: string };

export type BankQuestion = {
  id: string;
  cat: QuizCategoryId;
  diff: Difficulty;
  q: Bi;
  /** Options in English and Kannada (same order; `answer` indexes both). */
  options: { en: string[]; kn: string[] };
  answer: number;
  /** Curated "why the correct answer is right" (works with zero AI). */
  explain: Bi;
  /** A memorable extra fact. */
  fact?: Bi;
  /** Wikipedia article title for a real image. */
  wiki?: string;
};

export type QuizCategory = {
  id: QuizCategoryId;
  emoji: string;
  label: Bi;
  /** "R G B" accent triplets (CSS-var friendly, purge-safe). */
  accent: string;
  accent2: string;
  /** Cover image (Wikipedia title). */
  wiki: string;
};

/* ══════════════════════════════════════════════════════════════════════ *
 * CATEGORIES
 * ══════════════════════════════════════════════════════════════════════ */
export const CATEGORIES: QuizCategory[] = [
  { id: "history", emoji: "📜", label: { en: "History", kn: "ಇತಿಹಾಸ" }, accent: "202 138 74", accent2: "120 74 40", wiki: "Hampi" },
  { id: "festivals", emoji: "🪔", label: { en: "Festivals", kn: "ಹಬ್ಬಗಳು" }, accent: "245 158 11", accent2: "190 66 40", wiki: "Mysore Palace" },
  { id: "kings", emoji: "👑", label: { en: "Kings", kn: "ಅರಸರು" }, accent: "212 175 55", accent2: "130 90 30", wiki: "Krishnadevaraya" },
  { id: "dynasties", emoji: "🏰", label: { en: "Dynasties", kn: "ರಾಜವಂಶಗಳು" }, accent: "168 130 90", accent2: "96 66 40", wiki: "Hoysala Empire" },
  { id: "freedom", emoji: "🕊", label: { en: "Freedom Fighters", kn: "ಸ್ವಾತಂತ್ರ್ಯ ಯೋಧರು" }, accent: "34 139 87", accent2: "20 90 56", wiki: "Kittur Chennamma" },
  { id: "monuments", emoji: "🏛", label: { en: "Monuments", kn: "ಸ್ಮಾರಕಗಳು" }, accent: "150 120 200", accent2: "90 70 140", wiki: "Gol Gumbaz" },
  { id: "architecture", emoji: "⛩", label: { en: "Architecture", kn: "ವಾಸ್ತುಶಿಲ್ಪ" }, accent: "180 140 100", accent2: "110 80 52", wiki: "Chennakeshava Temple, Belur" },
  { id: "literature", emoji: "📖", label: { en: "Literature", kn: "ಸಾಹಿತ್ಯ" }, accent: "120 150 210", accent2: "70 96 150", wiki: "Kuvempu" },
  { id: "language", emoji: "ಅ", label: { en: "Kannada Language", kn: "ಕನ್ನಡ ಭಾಷೆ" }, accent: "225 90 70", accent2: "150 50 44", wiki: "Kannada" },
  { id: "geography", emoji: "🗺", label: { en: "Geography", kn: "ಭೂಗೋಳ" }, accent: "70 170 150", accent2: "40 110 100", wiki: "Jog Falls" },
  { id: "cuisine", emoji: "🍲", label: { en: "Cuisine", kn: "ಆಹಾರ" }, accent: "230 130 60", accent2: "150 78 36", wiki: "Masala dosa" },
  { id: "wildlife", emoji: "🐅", label: { en: "Wildlife", kn: "ವನ್ಯಜೀವಿ" }, accent: "90 160 70", accent2: "50 100 44", wiki: "Bandipur National Park" },
  { id: "culture", emoji: "🎭", label: { en: "Culture", kn: "ಸಂಸ್ಕೃತಿ" }, accent: "210 100 150", accent2: "140 60 100", wiki: "Yakshagana" },
  { id: "dance", emoji: "💃", label: { en: "Dance", kn: "ನೃತ್ಯ" }, accent: "225 110 140", accent2: "150 64 92", wiki: "Yakshagana" },
  { id: "music", emoji: "🎶", label: { en: "Music", kn: "ಸಂಗೀತ" }, accent: "150 120 220", accent2: "92 72 150", wiki: "Purandara Dasa" },
  { id: "isro", emoji: "🚀", label: { en: "ISRO & Science", kn: "ಇಸ್ರೋ ಮತ್ತು ವಿಜ್ಞಾನ" }, accent: "90 140 230", accent2: "48 84 160", wiki: "ISRO" },
  { id: "bengaluru", emoji: "🌆", label: { en: "Bengaluru", kn: "ಬೆಂಗಳೂರು" }, accent: "120 160 210", accent2: "70 100 150", wiki: "Bengaluru" },
  { id: "temples", emoji: "🛕", label: { en: "Temples", kn: "ದೇವಾಲಯಗಳು" }, accent: "230 160 60", accent2: "150 96 34", wiki: "Virupaksha Temple, Hampi" },
  { id: "personalities", emoji: "⭐", label: { en: "Personalities", kn: "ವ್ಯಕ್ತಿಗಳು" }, accent: "220 150 80", accent2: "150 96 44", wiki: "Sir M. Visvesvaraya" },
  { id: "today", emoji: "📰", label: { en: "Karnataka Today", kn: "ಇಂದಿನ ಕರ್ನಾಟಕ" }, accent: "80 180 170", accent2: "44 116 108", wiki: "Vidhana Soudha" },
];

export function categoryById(id: QuizCategoryId): QuizCategory {
  return CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];
}

/* ══════════════════════════════════════════════════════════════════════ *
 * QUESTION BANK
 * ══════════════════════════════════════════════════════════════════════ */
export const QUIZ_BANK: BankQuestion[] = [
  /* ── History ─────────────────────────────────────────── */
  {
    id: "his-hampi",
    cat: "history",
    diff: "easy",
    q: { en: "Hampi was the capital of which empire?", kn: "ಹಂಪಿ ಯಾವ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು?" },
    options: {
      en: ["Vijayanagara", "Maurya", "Gupta", "Chola"],
      kn: ["ವಿಜಯನಗರ", "ಮೌರ್ಯ", "ಗುಪ್ತ", "ಚೋಳ"],
    },
    answer: 0,
    explain: { en: "Hampi was the capital of the Vijayanagara Empire, founded in 1336 CE.", kn: "ಹಂಪಿ ೧೩೩೬ರಲ್ಲಿ ಸ್ಥಾಪಿತ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿ." },
    fact: { en: "At its peak it was one of the largest cities in the world.", kn: "ಉಚ್ಛ್ರಾಯದಲ್ಲಿ ಇದು ಜಗತ್ತಿನ ಅತಿದೊಡ್ಡ ನಗರಗಳಲ್ಲಿ ಒಂದು." },
    wiki: "Hampi",
  },
  {
    id: "his-talikota",
    cat: "history",
    diff: "hard",
    q: { en: "In which year was the Battle of Talikota fought?", kn: "ತಾಳಿಕೋಟೆ ಕದನ ಯಾವ ವರ್ಷ ನಡೆಯಿತು?" },
    options: { en: ["1565", "1498", "1610", "1336"], kn: ["೧೫೬೫", "೧೪೯೮", "೧೬೧೦", "೧೩೩೬"] },
    answer: 0,
    explain: { en: "The 1565 Battle of Talikota led to the fall of Vijayanagara's capital.", kn: "೧೫೬೫ರ ತಾಳಿಕೋಟೆ ಕದನ ವಿಜಯನಗರ ರಾಜಧಾನಿಯ ಪತನಕ್ಕೆ ಕಾರಣವಾಯಿತು." },
    wiki: "Hampi",
  },
  {
    id: "his-1956",
    cat: "history",
    diff: "medium",
    q: { en: "In which year was the unified Mysore State (later Karnataka) formed?", kn: "ಏಕೀಕೃತ ಮೈಸೂರು ರಾಜ್ಯ (ನಂತರ ಕರ್ನಾಟಕ) ಯಾವ ವರ್ಷ ರಚನೆಯಾಯಿತು?" },
    options: { en: ["1956", "1947", "1973", "1965"], kn: ["೧೯೫೬", "೧೯೪೭", "೧೯೭೩", "೧೯೬೫"] },
    answer: 0,
    explain: { en: "The States Reorganisation Act unified Kannada regions on 1 Nov 1956.", kn: "೧೯೫೬ರ ನವೆಂಬರ್ ೧ರಂದು ಕನ್ನಡ ಪ್ರದೇಶಗಳು ಏಕೀಕೃತವಾದವು." },
    fact: { en: "It was renamed 'Karnataka' in 1973.", kn: "೧೯೭೩ರಲ್ಲಿ 'ಕರ್ನಾಟಕ' ಎಂದು ಮರುನಾಮಕರಣ." },
    wiki: "Karnataka",
  },
  {
    id: "his-badami",
    cat: "history",
    diff: "medium",
    q: { en: "Badami was the capital of which early dynasty?", kn: "ಬಾದಾಮಿ ಯಾವ ಆರಂಭಿಕ ರಾಜವಂಶದ ರಾಜಧಾನಿಯಾಗಿತ್ತು?" },
    options: { en: ["Chalukyas", "Hoysalas", "Kadambas", "Rashtrakutas"], kn: ["ಚಾಲುಕ್ಯರು", "ಹೊಯ್ಸಳರು", "ಕದಂಬರು", "ರಾಷ್ಟ್ರಕೂಟರು"] },
    answer: 0,
    explain: { en: "Badami (Vatapi) was the capital of the Badami Chalukyas.", kn: "ಬಾದಾಮಿ (ವಾತಾಪಿ) ಬಾದಾಮಿ ಚಾಲುಕ್ಯರ ರಾಜಧಾನಿ." },
    wiki: "Badami",
  },
  /* ── Festivals ───────────────────────────────────────── */
  {
    id: "fes-dasara",
    cat: "festivals",
    diff: "easy",
    q: { en: "Which goddess is central to Mysuru Dasara?", kn: "ಮೈಸೂರು ದಸರಾದ ಕೇಂದ್ರ ದೇವಿ ಯಾರು?" },
    options: { en: ["Chamundeshwari", "Meenakshi", "Kali", "Saraswati"], kn: ["ಚಾಮುಂಡೇಶ್ವರಿ", "ಮೀನಾಕ್ಷಿ", "ಕಾಳಿ", "ಸರಸ್ವತಿ"] },
    answer: 0,
    explain: { en: "Dasara celebrates Chamundeshwari's victory over Mahishasura.", kn: "ದಸರಾ ಚಾಮುಂಡೇಶ್ವರಿ ಮಹಿಷಾಸುರನನ್ನು ಸಂಹರಿಸಿದ ವಿಜಯವನ್ನು ಆಚರಿಸುತ್ತದೆ." },
    wiki: "Chamundeshwari Temple",
  },
  {
    id: "fes-howdah",
    cat: "festivals",
    diff: "medium",
    q: { en: "What is carried on the lead elephant in the Jamboo Savari?", kn: "ಜಂಬೂ ಸವಾರಿಯಲ್ಲಿ ಮುಂಚೂಣಿ ಆನೆಯ ಮೇಲೆ ಏನನ್ನು ಹೊರಲಾಗುತ್ತದೆ?" },
    options: { en: ["The golden howdah", "A silver flag", "A drum", "A throne of wood"], kn: ["ಚಿನ್ನದ ಅಂಬಾರಿ", "ಬೆಳ್ಳಿ ಧ್ವಜ", "ನಗಾರಿ", "ಮರದ ಸಿಂಹಾಸನ"] },
    answer: 0,
    explain: { en: "The ~750 kg golden howdah carries the idol of Chamundeshwari.", kn: "~೭೫೦ ಕೆ.ಜಿ. ಚಿನ್ನದ ಅಂಬಾರಿ ಚಾಮುಂಡೇಶ್ವರಿ ವಿಗ್ರಹವನ್ನು ಹೊರುತ್ತದೆ." },
    fact: { en: "Since 1971 the Goddess, not the king, rides in it.", kn: "೧೯೭೧ರಿಂದ ರಾಜನ ಬದಲು ದೇವಿ ಅದರಲ್ಲಿ ಸವಾರಿ." },
    wiki: "Mysore Palace",
  },
  {
    id: "fes-karaga",
    cat: "festivals",
    diff: "medium",
    q: { en: "Bengaluru Karaga is chiefly associated with which community's tradition?", kn: "ಬೆಂಗಳೂರು ಕರಗ ಮುಖ್ಯವಾಗಿ ಯಾವ ಸಮುದಾಯದ ಸಂಪ್ರದಾಯ?" },
    options: { en: ["Thigala", "Kodava", "Banjara", "Siddi"], kn: ["ತಿಗಳ", "ಕೊಡವ", "ಬಂಜಾರ", "ಸಿದ್ದಿ"] },
    answer: 0,
    explain: { en: "Karaga is a centuries-old festival of the Thigala community, honouring Draupadi.", kn: "ಕರಗ ದ್ರೌಪದಿಯನ್ನು ಗೌರವಿಸುವ ತಿಗಳ ಸಮುದಾಯದ ಶತಮಾನಗಳಷ್ಟು ಹಳೆಯ ಹಬ್ಬ." },
    wiki: "Bangalore Karaga",
  },
  /* ── Kings ───────────────────────────────────────────── */
  {
    id: "kin-krishnadevaraya",
    cat: "kings",
    diff: "easy",
    q: { en: "Which ruler led Vijayanagara to its golden age?", kn: "ವಿಜಯನಗರವನ್ನು ಸುವರ್ಣಯುಗಕ್ಕೆ ಕೊಂಡೊಯ್ದ ಅರಸ ಯಾರು?" },
    options: { en: ["Krishnadevaraya", "Tipu Sultan", "Pulakeshin II", "Mayurasharma"], kn: ["ಕೃಷ್ಣದೇವರಾಯ", "ಟಿಪ್ಪು ಸುಲ್ತಾನ್", "ಎರಡನೇ ಪುಲಕೇಶಿ", "ಮಯೂರಶರ್ಮ"] },
    answer: 0,
    explain: { en: "Krishnadevaraya (r. 1509–1529) was Vijayanagara's greatest emperor.", kn: "ಕೃಷ್ಣದೇವರಾಯ (೧೫೦೯–೧೫೨೯) ವಿಜಯನಗರದ ಶ್ರೇಷ್ಠ ಚಕ್ರವರ್ತಿ." },
    fact: { en: "He was also a scholar who wrote 'Amuktamalyada' in Telugu.", kn: "ಅವರು 'ಆಮುಕ್ತಮಾಲ್ಯದ' ಬರೆದ ವಿದ್ವಾಂಸರೂ ಆಗಿದ್ದರು." },
    wiki: "Krishnadevaraya",
  },
  {
    id: "kin-tipu",
    cat: "kings",
    diff: "easy",
    q: { en: "Who was known as the 'Tiger of Mysore'?", kn: "'ಮೈಸೂರಿನ ಹುಲಿ' ಎಂದು ಯಾರು ಪ್ರಸಿದ್ಧರಾಗಿದ್ದರು?" },
    options: { en: ["Tipu Sultan", "Hyder Ali", "Krishnaraja Wadiyar", "Kempegowda"], kn: ["ಟಿಪ್ಪು ಸುಲ್ತಾನ್", "ಹೈದರ್ ಅಲಿ", "ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್", "ಕೆಂಪೇಗೌಡ"] },
    answer: 0,
    explain: { en: "Tipu Sultan, ruler of Mysore, fiercely resisted the British.", kn: "ಮೈಸೂರಿನ ಅರಸ ಟಿಪ್ಪು ಸುಲ್ತಾನ್ ಬ್ರಿಟಿಷರನ್ನು ತೀವ್ರವಾಗಿ ಎದುರಿಸಿದರು." },
    fact: { en: "He pioneered the use of iron-cased war rockets (Mysorean rockets).", kn: "ಅವರು ಕಬ್ಬಿಣದ ಯುದ್ಧ ರಾಕೆಟ್‌ಗಳ ಬಳಕೆಯ ಪ್ರವರ್ತಕ." },
    wiki: "Tipu Sultan",
  },
  {
    id: "kin-pulakeshin",
    cat: "kings",
    diff: "hard",
    q: { en: "Which Chalukya king defeated Harshavardhana on the Narmada?", kn: "ನರ್ಮದಾ ತೀರದಲ್ಲಿ ಹರ್ಷವರ್ಧನನನ್ನು ಸೋಲಿಸಿದ ಚಾಲುಕ್ಯ ಅರಸ ಯಾರು?" },
    options: { en: ["Pulakeshin II", "Vishnuvardhana", "Someshvara I", "Vikramaditya VI"], kn: ["ಎರಡನೇ ಪುಲಕೇಶಿ", "ವಿಷ್ಣುವರ್ಧನ", "ಒಂದನೇ ಸೋಮೇಶ್ವರ", "ಆರನೇ ವಿಕ್ರಮಾದಿತ್ಯ"] },
    answer: 0,
    explain: { en: "Pulakeshin II halted Harsha's southern advance, a celebrated victory.", kn: "ಎರಡನೇ ಪುಲಕೇಶಿ ಹರ್ಷನ ದಕ್ಷಿಣ ದಂಡಯಾತ್ರೆಯನ್ನು ತಡೆದರು." },
    wiki: "Pulakeshin II",
  },
  /* ── Dynasties ───────────────────────────────────────── */
  {
    id: "dyn-hoysala",
    cat: "dynasties",
    diff: "medium",
    q: { en: "Belur and Halebidu are masterpieces of which dynasty?", kn: "ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡು ಯಾವ ರಾಜವಂಶದ ಶ್ರೇಷ್ಠಕೃತಿಗಳು?" },
    options: { en: ["Hoysalas", "Cholas", "Kadambas", "Nayakas"], kn: ["ಹೊಯ್ಸಳರು", "ಚೋಳರು", "ಕದಂಬರು", "ನಾಯಕರು"] },
    answer: 0,
    explain: { en: "The Hoysalas (11th–14th c.) built the intricately carved temples.", kn: "ಹೊಯ್ಸಳರು (೧೧–೧೪ನೇ ಶತಮಾನ) ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಯ ದೇವಾಲಯಗಳನ್ನು ಕಟ್ಟಿದರು." },
    wiki: "Hoysala architecture",
  },
  {
    id: "dyn-kadamba",
    cat: "dynasties",
    diff: "hard",
    q: { en: "Which was the first indigenous dynasty of Karnataka, based at Banavasi?", kn: "ಬನವಾಸಿ ಕೇಂದ್ರಿತ ಕರ್ನಾಟಕದ ಮೊದಲ ಸ್ವದೇಶಿ ರಾಜವಂಶ ಯಾವುದು?" },
    options: { en: ["Kadambas", "Gangas", "Hoysalas", "Chalukyas"], kn: ["ಕದಂಬರು", "ಗಂಗರು", "ಹೊಯ್ಸಳರು", "ಚಾಲುಕ್ಯರು"] },
    answer: 0,
    explain: { en: "The Kadambas of Banavasi (c. 345 CE) were founded by Mayurasharma.", kn: "ಬನವಾಸಿಯ ಕದಂಬರನ್ನು (ಸು. ೩೪೫) ಮಯೂರಶರ್ಮ ಸ್ಥಾಪಿಸಿದರು." },
    wiki: "Kadamba dynasty",
  },
  {
    id: "dyn-rashtrakuta",
    cat: "dynasties",
    diff: "hard",
    q: { en: "The Kailasa temple at Ellora was carved under which dynasty?", kn: "ಎಲ್ಲೋರಾದ ಕೈಲಾಸ ದೇವಾಲಯವನ್ನು ಯಾವ ರಾಜವಂಶದಲ್ಲಿ ಕೆತ್ತಲಾಯಿತು?" },
    options: { en: ["Rashtrakutas", "Hoysalas", "Kadambas", "Wadiyars"], kn: ["ರಾಷ್ಟ್ರಕೂಟರು", "ಹೊಯ್ಸಳರು", "ಕದಂಬರು", "ಒಡೆಯರು"] },
    answer: 0,
    explain: { en: "The Rashtrakuta king Krishna I commissioned the rock-cut Kailasa temple.", kn: "ರಾಷ್ಟ್ರಕೂಟ ಅರಸ ಒಂದನೇ ಕೃಷ್ಣ ಕೈಲಾಸ ದೇವಾಲಯವನ್ನು ನಿರ್ಮಿಸಿದರು." },
    wiki: "Rashtrakuta dynasty",
  },
  /* ── Freedom fighters ────────────────────────────────── */
  {
    id: "fre-chennamma",
    cat: "freedom",
    diff: "easy",
    q: { en: "Who was the queen of Kittur who fought the British in 1824?", kn: "೧೮೨೪ರಲ್ಲಿ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಹೋರಾಡಿದ ಕಿತ್ತೂರಿನ ರಾಣಿ ಯಾರು?" },
    options: { en: ["Kittur Chennamma", "Rani Abbakka", "Onake Obavva", "Keladi Chennamma"], kn: ["ಕಿತ್ತೂರು ಚೆನ್ನಮ್ಮ", "ರಾಣಿ ಅಬ್ಬಕ್ಕ", "ಒನಕೆ ಓಬವ್ವ", "ಕೆಳದಿ ಚೆನ್ನಮ್ಮ"] },
    answer: 0,
    explain: { en: "Kittur Chennamma led an armed revolt against the British in 1824, before 1857.", kn: "ಕಿತ್ತೂರು ಚೆನ್ನಮ್ಮ ೧೮೫೭ಕ್ಕೂ ಮುನ್ನ ೧೮೨೪ರಲ್ಲಿ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಸಶಸ್ತ್ರ ಬಂಡಾಯ ನಡೆಸಿದರು." },
    wiki: "Kittur Chennamma",
  },
  {
    id: "fre-sangolli",
    cat: "freedom",
    diff: "medium",
    q: { en: "Which warrior was a commander of Kittur Chennamma's forces?", kn: "ಕಿತ್ತೂರು ಚೆನ್ನಮ್ಮನ ಸೇನಾಪತಿ ಯಾರು?" },
    options: { en: ["Sangolli Rayanna", "Amara Sullia", "Halagali Bedas", "Kanakadasa"], kn: ["ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ", "ಅಮರ ಸುಳ್ಯ", "ಹಲಗಲಿ ಬೇಡರು", "ಕನಕದಾಸ"] },
    answer: 0,
    explain: { en: "Sangolli Rayanna continued the guerrilla struggle against the British.", kn: "ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಗೆರಿಲ್ಲಾ ಹೋರಾಟ ಮುಂದುವರಿಸಿದರು." },
    wiki: "Sangolli Rayanna",
  },
  {
    id: "fre-abbakka",
    cat: "freedom",
    diff: "medium",
    q: { en: "Rani Abbakka Chowta resisted which colonial power at Ullal?", kn: "ರಾಣಿ ಅಬ್ಬಕ್ಕ ಚೌಟ ಉಳ್ಳಾಲದಲ್ಲಿ ಯಾವ ವಸಾಹತು ಶಕ್ತಿಯನ್ನು ಎದುರಿಸಿದರು?" },
    options: { en: ["Portuguese", "British", "Dutch", "French"], kn: ["ಪೋರ್ಚುಗೀಸರು", "ಬ್ರಿಟಿಷರು", "ಡಚ್ಚರು", "ಫ್ರೆಂಚರು"] },
    answer: 0,
    explain: { en: "Abbakka, a Tuluva queen, fought the Portuguese in the 16th century.", kn: "ತುಳುವ ರಾಣಿ ಅಬ್ಬಕ್ಕ ೧೬ನೇ ಶತಮಾನದಲ್ಲಿ ಪೋರ್ಚುಗೀಸರೊಂದಿಗೆ ಹೋರಾಡಿದರು." },
    wiki: "Abbakka Chowta",
  },
  /* ── Monuments ───────────────────────────────────────── */
  {
    id: "mon-golgumbaz",
    cat: "monuments",
    diff: "medium",
    q: { en: "The Gol Gumbaz, famous for its whispering gallery, is in which city?", kn: "ಪಿಸುಮಾತಿನ ಗ್ಯಾಲರಿಗೆ ಪ್ರಸಿದ್ಧ ಗೋಲ್ ಗುಂಬಜ್ ಯಾವ ನಗರದಲ್ಲಿದೆ?" },
    options: { en: ["Vijayapura (Bijapur)", "Kalaburagi", "Ballari", "Raichur"], kn: ["ವಿಜಯಪುರ (ಬಿಜಾಪುರ)", "ಕಲಬುರಗಿ", "ಬಳ್ಳಾರಿ", "ರಾಯಚೂರು"] },
    answer: 0,
    explain: { en: "Gol Gumbaz in Vijayapura is the tomb of Mohammed Adil Shah.", kn: "ವಿಜಯಪುರದ ಗೋಲ್ ಗುಂಬಜ್ ಮೊಹಮ್ಮದ್ ಆದಿಲ್ ಷಾನ ಸಮಾಧಿ." },
    fact: { en: "It has one of the world's largest domes.", kn: "ಇದು ಜಗತ್ತಿನ ಅತಿದೊಡ್ಡ ಗುಮ್ಮಟಗಳಲ್ಲಿ ಒಂದು." },
    wiki: "Gol Gumbaz",
  },
  {
    id: "mon-stonechariot",
    cat: "monuments",
    diff: "easy",
    q: { en: "The iconic stone chariot stands in which temple at Hampi?", kn: "ಪ್ರಸಿದ್ಧ ಕಲ್ಲಿನ ರಥ ಹಂಪಿಯ ಯಾವ ದೇವಾಲಯದಲ್ಲಿದೆ?" },
    options: { en: ["Vittala Temple", "Virupaksha Temple", "Hazara Rama", "Badavilinga"], kn: ["ವಿಠಲ ದೇವಾಲಯ", "ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ", "ಹಜಾರ ರಾಮ", "ಬಡವಿಲಿಂಗ"] },
    answer: 0,
    explain: { en: "The stone chariot in the Vittala Temple is a symbol of Hampi.", kn: "ವಿಠಲ ದೇವಾಲಯದ ಕಲ್ಲಿನ ರಥ ಹಂಪಿಯ ಸಂಕೇತ." },
    wiki: "Vitthala Temple, Hampi",
  },
  /* ── Architecture ────────────────────────────────────── */
  {
    id: "arc-belur",
    cat: "architecture",
    diff: "medium",
    q: { en: "The Chennakeshava Temple at Belur was built by which Hoysala king?", kn: "ಬೇಲೂರಿನ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯವನ್ನು ಯಾವ ಹೊಯ್ಸಳ ಅರಸ ಕಟ್ಟಿಸಿದರು?" },
    options: { en: ["Vishnuvardhana", "Ballala II", "Narasimha I", "Someshvara"], kn: ["ವಿಷ್ಣುವರ್ಧನ", "ಎರಡನೇ ಬಲ್ಲಾಳ", "ಒಂದನೇ ನರಸಿಂಹ", "ಸೋಮೇಶ್ವರ"] },
    answer: 0,
    explain: { en: "Vishnuvardhana commissioned it around 1117 CE to mark a great victory.", kn: "ವಿಷ್ಣುವರ್ಧನ ಸು. ೧೧೧೭ರಲ್ಲಿ ವಿಜಯದ ನೆನಪಿಗೆ ಇದನ್ನು ಕಟ್ಟಿಸಿದರು." },
    wiki: "Chennakeshava Temple, Belur",
  },
  {
    id: "arc-soapstone",
    cat: "architecture",
    diff: "hard",
    q: { en: "Which material lets Hoysala temples have such fine, deep carving?", kn: "ಹೊಯ್ಸಳ ದೇವಾಲಯಗಳ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗೆ ಯಾವ ಶಿಲೆ ಕಾರಣ?" },
    options: { en: ["Soapstone (chloritic schist)", "Granite", "Marble", "Sandstone"], kn: ["ಬಳಪದ ಕಲ್ಲು", "ಗ್ರಾನೈಟ್", "ಅಮೃತಶಿಲೆ", "ಮರಳುಗಲ್ಲು"] },
    answer: 0,
    explain: { en: "Soft soapstone hardens with time, allowing jewel-like detail.", kn: "ಮೃದು ಬಳಪದ ಕಲ್ಲು ಕಾಲಾಂತರದಲ್ಲಿ ಗಟ್ಟಿಯಾಗಿ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗೆ ಅನುವಾಗುತ್ತದೆ." },
    wiki: "Hoysala architecture",
  },
  /* ── Literature ──────────────────────────────────────── */
  {
    id: "lit-kuvempu",
    cat: "literature",
    diff: "easy",
    q: { en: "Who wrote the Karnataka state anthem 'Jaya Bharata Jananiya Tanujate'?", kn: "'ಜಯ ಭಾರತ ಜನನಿಯ ತನುಜಾತೆ' ನಾಡಗೀತೆಯನ್ನು ಯಾರು ಬರೆದರು?" },
    options: { en: ["Kuvempu", "Bendre", "Karanth", "Masti"], kn: ["ಕುವೆಂಪು", "ಬೇಂದ್ರೆ", "ಕಾರಂತ", "ಮಾಸ್ತಿ"] },
    answer: 0,
    explain: { en: "Kuvempu (K. V. Puttappa) wrote it; he won the Jnanpith in 1967.", kn: "ಕುವೆಂಪು (ಕೆ.ವಿ. ಪುಟ್ಟಪ್ಪ) ಇದನ್ನು ಬರೆದರು; ೧೯೬೭ರಲ್ಲಿ ಜ್ಞಾನಪೀಠ ಪಡೆದರು." },
    wiki: "Kuvempu",
  },
  {
    id: "lit-jnanpith",
    cat: "literature",
    diff: "medium",
    q: { en: "Kannada has won how many Jnanpith Awards — the most of any Indian language?", kn: "ಯಾವುದೇ ಭಾರತೀಯ ಭಾಷೆಗಿಂತ ಹೆಚ್ಚು — ಕನ್ನಡಕ್ಕೆ ಎಷ್ಟು ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿಗಳು ಬಂದಿವೆ?" },
    options: { en: ["8", "5", "3", "10"], kn: ["೮", "೫", "೩", "೧೦"] },
    answer: 0,
    explain: { en: "Eight Kannada writers have won the Jnanpith — the highest for any language.", kn: "ಎಂಟು ಕನ್ನಡ ಸಾಹಿತಿಗಳು ಜ್ಞಾನಪೀಠ ಪಡೆದಿದ್ದಾರೆ — ಯಾವುದೇ ಭಾಷೆಗಿಂತ ಹೆಚ್ಚು." },
    wiki: "Kannada literature",
  },
  {
    id: "lit-pampa",
    cat: "literature",
    diff: "hard",
    q: { en: "Who is called 'Adikavi', the first great poet of Kannada?", kn: "ಕನ್ನಡದ ಮೊದಲ ಮಹಾಕವಿ 'ಆದಿಕವಿ' ಯಾರು?" },
    options: { en: ["Pampa", "Ranna", "Ponna", "Janna"], kn: ["ಪಂಪ", "ರನ್ನ", "ಪೊನ್ನ", "ಜನ್ನ"] },
    answer: 0,
    explain: { en: "Pampa (10th c.), author of Vikramarjuna Vijaya, is the Adikavi.", kn: "ವಿಕ್ರಮಾರ್ಜುನ ವಿಜಯದ ಕರ್ತೃ ಪಂಪ (೧೦ನೇ ಶತಮಾನ) ಆದಿಕವಿ." },
    wiki: "Pampa (poet)",
  },
  /* ── Kannada language ────────────────────────────────── */
  {
    id: "lan-kavirajamarga",
    cat: "language",
    diff: "hard",
    q: { en: "What is the earliest available literary work in Kannada?", kn: "ಕನ್ನಡದ ಲಭ್ಯವಿರುವ ಅತ್ಯಂತ ಪ್ರಾಚೀನ ಸಾಹಿತ್ಯ ಕೃತಿ ಯಾವುದು?" },
    options: { en: ["Kavirajamarga", "Kumaravyasa Bharata", "Vaddaradhane", "Pampa Bharata"], kn: ["ಕವಿರಾಜಮಾರ್ಗ", "ಕುಮಾರವ್ಯಾಸ ಭಾರತ", "ವಡ್ಡಾರಾಧನೆ", "ಪಂಪ ಭಾರತ"] },
    answer: 0,
    explain: { en: "Kavirajamarga (c. 850 CE), from the Rashtrakuta court, is the earliest.", kn: "ಕವಿರಾಜಮಾರ್ಗ (ಸು. ೮೫೦) ರಾಷ್ಟ್ರಕೂಟ ಕಾಲದ ಅತಿ ಪ್ರಾಚೀನ ಕೃತಿ." },
    wiki: "Kavirajamarga",
  },
  {
    id: "lan-classical",
    cat: "language",
    diff: "medium",
    q: { en: "Kannada is officially recognised by India as a what?", kn: "ಕನ್ನಡವನ್ನು ಭಾರತ ಅಧಿಕೃತವಾಗಿ ಯಾವುದೆಂದು ಗುರುತಿಸಿದೆ?" },
    options: { en: ["Classical language", "Foreign language", "Dialect", "Scheduled tribe language"], kn: ["ಶಾಸ್ತ್ರೀಯ ಭಾಷೆ", "ವಿದೇಶಿ ಭಾಷೆ", "ಉಪಭಾಷೆ", "ಬುಡಕಟ್ಟು ಭಾಷೆ"] },
    answer: 0,
    explain: { en: "Kannada was granted classical-language status in 2008.", kn: "೨೦೦೮ರಲ್ಲಿ ಕನ್ನಡಕ್ಕೆ ಶಾಸ್ತ್ರೀಯ ಭಾಷೆ ಸ್ಥಾನಮಾನ ದೊರೆಯಿತು." },
    wiki: "Kannada",
  },
  /* ── Geography ───────────────────────────────────────── */
  {
    id: "geo-jog",
    cat: "geography",
    diff: "easy",
    q: { en: "Jog Falls is formed by which river?", kn: "ಜೋಗ ಜಲಪಾತ ಯಾವ ನದಿಯಿಂದ ರೂಪುಗೊಳ್ಳುತ್ತದೆ?" },
    options: { en: ["Sharavathi", "Kaveri", "Tungabhadra", "Krishna"], kn: ["ಶರಾವತಿ", "ಕಾವೇರಿ", "ತುಂಗಭದ್ರಾ", "ಕೃಷ್ಣಾ"] },
    answer: 0,
    explain: { en: "Jog Falls is created by the Sharavathi river in Shivamogga district.", kn: "ಜೋಗ ಜಲಪಾತ ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆಯ ಶರಾವತಿ ನದಿಯಿಂದ ರೂಪುಗೊಳ್ಳುತ್ತದೆ." },
    wiki: "Jog Falls",
  },
  {
    id: "geo-highest",
    cat: "geography",
    diff: "hard",
    q: { en: "What is the highest peak in Karnataka?", kn: "ಕರ್ನಾಟಕದ ಅತಿ ಎತ್ತರದ ಶಿಖರ ಯಾವುದು?" },
    options: { en: ["Mullayanagiri", "Kudremukh", "Nandi Hills", "Kemmanagundi"], kn: ["ಮುಳ್ಳಯ್ಯನಗಿರಿ", "ಕುದುರೆಮುಖ", "ನಂದಿ ಬೆಟ್ಟ", "ಕೆಮ್ಮಣ್ಣುಗುಂಡಿ"] },
    answer: 0,
    explain: { en: "Mullayanagiri (~1930 m) in Chikkamagaluru is the tallest.", kn: "ಚಿಕ್ಕಮಗಳೂರಿನ ಮುಳ್ಳಯ್ಯನಗಿರಿ (~೧೯೩೦ ಮೀ) ಅತಿ ಎತ್ತರ." },
    wiki: "Mullayanagiri",
  },
  {
    id: "geo-kaveri",
    cat: "geography",
    diff: "medium",
    q: { en: "The Kaveri river rises at which place in Karnataka?", kn: "ಕಾವೇರಿ ನದಿ ಕರ್ನಾಟಕದ ಯಾವ ಸ್ಥಳದಲ್ಲಿ ಹುಟ್ಟುತ್ತದೆ?" },
    options: { en: ["Talakaveri (Kodagu)", "Gokak", "Sringeri", "Nandi Hills"], kn: ["ತಲಕಾವೇರಿ (ಕೊಡಗು)", "ಗೋಕಾಕ್", "ಶೃಂಗೇರಿ", "ನಂದಿ ಬೆಟ್ಟ"] },
    answer: 0,
    explain: { en: "The Kaveri originates at Talakaveri in the Brahmagiri hills of Kodagu.", kn: "ಕಾವೇರಿ ಕೊಡಗಿನ ಬ್ರಹ್ಮಗಿರಿ ಬೆಟ್ಟದ ತಲಕಾವೇರಿಯಲ್ಲಿ ಹುಟ್ಟುತ್ತದೆ." },
    wiki: "Talakaveri",
  },
  /* ── Cuisine ─────────────────────────────────────────── */
  {
    id: "cui-dosa",
    cat: "cuisine",
    diff: "easy",
    q: { en: "The Masala Dosa is famously associated with which state's cuisine?", kn: "ಮಸಾಲಾ ದೋಸೆ ಯಾವ ರಾಜ್ಯದ ಆಹಾರದೊಂದಿಗೆ ಪ್ರಸಿದ್ಧ?" },
    options: { en: ["Karnataka", "Punjab", "Bengal", "Gujarat"], kn: ["ಕರ್ನಾಟಕ", "ಪಂಜಾಬ್", "ಬಂಗಾಳ", "ಗುಜರಾತ್"] },
    answer: 0,
    explain: { en: "The Masala Dosa is popularly traced to Udupi cuisine in Karnataka.", kn: "ಮಸಾಲಾ ದೋಸೆ ಕರ್ನಾಟಕದ ಉಡುಪಿ ಆಹಾರ ಪರಂಪರೆಗೆ ಸೇರಿದೆ." },
    wiki: "Masala dosa",
  },
  {
    id: "cui-bisibele",
    cat: "cuisine",
    diff: "medium",
    q: { en: "Bisi Bele Bath is a hot dish made mainly of rice and what?", kn: "ಬಿಸಿ ಬೇಳೆ ಬಾತ್ ಮುಖ್ಯವಾಗಿ ಅನ್ನ ಮತ್ತು ಯಾವುದರಿಂದ ತಯಾರಾಗುತ್ತದೆ?" },
    options: { en: ["Lentils (bele)", "Wheat", "Ragi", "Corn"], kn: ["ಬೇಳೆ", "ಗೋಧಿ", "ರಾಗಿ", "ಜೋಳ"] },
    answer: 0,
    explain: { en: "'Bisi bele bath' literally means hot lentil-rice dish.", kn: "'ಬಿಸಿ ಬೇಳೆ ಬಾತ್' ಎಂದರೆ ಬಿಸಿ ಬೇಳೆ-ಅನ್ನದ ಖಾದ್ಯ." },
    wiki: "Bisi bele bath",
  },
  {
    id: "cui-mysorepak",
    cat: "cuisine",
    diff: "medium",
    q: { en: "The sweet Mysore Pak was first made in whose kitchen?", kn: "ಮೈಸೂರು ಪಾಕ್ ಸಿಹಿ ಮೊದಲು ಯಾರ ಅಡುಗೆಮನೆಯಲ್ಲಿ ತಯಾರಾಯಿತು?" },
    options: { en: ["The Mysore Palace", "A Udupi hotel", "A temple", "A British club"], kn: ["ಮೈಸೂರು ಅರಮನೆ", "ಉಡುಪಿ ಹೋಟೆಲ್", "ದೇವಾಲಯ", "ಬ್ರಿಟಿಷ್ ಕ್ಲಬ್"] },
    answer: 0,
    explain: { en: "It was created in the Mysore Palace kitchen by cook Kakasura Madappa.", kn: "ಇದನ್ನು ಅರಮನೆ ಬಾಣಸಿಗ ಕಾಕಾಸುರ ಮಾದಪ್ಪ ತಯಾರಿಸಿದರು." },
    wiki: "Mysore pak",
  },
  /* ── Wildlife ────────────────────────────────────────── */
  {
    id: "wil-bandipur",
    cat: "wildlife",
    diff: "medium",
    q: { en: "Bandipur National Park is especially known for protecting which animal?", kn: "ಬಂಡೀಪುರ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನ ಯಾವ ಪ್ರಾಣಿಯ ರಕ್ಷಣೆಗೆ ಪ್ರಸಿದ್ಧ?" },
    options: { en: ["Tiger", "Snow leopard", "Rhinoceros", "Camel"], kn: ["ಹುಲಿ", "ಹಿಮ ಚಿರತೆ", "ಘೇಂಡಾಮೃಗ", "ಒಂಟೆ"] },
    answer: 0,
    explain: { en: "Bandipur is a major Project Tiger reserve in the Western Ghats.", kn: "ಬಂಡೀಪುರ ಪಶ್ಚಿಮ ಘಟ್ಟದ ಪ್ರಮುಖ ಹುಲಿ ಸಂರಕ್ಷಿತ ಪ್ರದೇಶ." },
    wiki: "Bandipur National Park",
  },
  {
    id: "wil-statebird",
    cat: "wildlife",
    diff: "easy",
    q: { en: "What is the state bird of Karnataka?", kn: "ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಪಕ್ಷಿ ಯಾವುದು?" },
    options: { en: ["Indian roller (Neelakantha)", "Peacock", "Parrot", "Koel"], kn: ["ನೀಲಕಂಠ", "ನವಿಲು", "ಗಿಳಿ", "ಕೋಗಿಲೆ"] },
    answer: 0,
    explain: { en: "The Indian roller (Neelakantha) is Karnataka's state bird.", kn: "ನೀಲಕಂಠ ಪಕ್ಷಿ ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಪಕ್ಷಿ." },
    fact: { en: "The state animal is the elephant; the state tree is sandalwood.", kn: "ರಾಜ್ಯ ಪ್ರಾಣಿ ಆನೆ; ರಾಜ್ಯ ವೃಕ್ಷ ಶ್ರೀಗಂಧ." },
    wiki: "Indian roller",
  },
  /* ── Culture ─────────────────────────────────────────── */
  {
    id: "cul-yakshagana",
    cat: "culture",
    diff: "easy",
    q: { en: "Yakshagana, an overnight theatre form, comes mainly from which region?", kn: "ರಾತ್ರಿಯಿಡೀ ನಡೆಯುವ ಯಕ್ಷಗಾನ ಮುಖ್ಯವಾಗಿ ಯಾವ ಪ್ರದೇಶದ್ದು?" },
    options: { en: ["Coastal Karnataka", "North Karnataka", "Bengaluru", "Kodagu"], kn: ["ಕರಾವಳಿ ಕರ್ನಾಟಕ", "ಉತ್ತರ ಕರ್ನಾಟಕ", "ಬೆಂಗಳೂರು", "ಕೊಡಗು"] },
    answer: 0,
    explain: { en: "Yakshagana flourishes in coastal and Malenadu Karnataka.", kn: "ಯಕ್ಷಗಾನ ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು ಕರ್ನಾಟಕದಲ್ಲಿ ಪ್ರವರ್ಧಮಾನ." },
    wiki: "Yakshagana",
  },
  {
    id: "cul-channapatna",
    cat: "culture",
    diff: "medium",
    q: { en: "Channapatna is famous for making what, earning it 'Gombegala Ooru'?", kn: "ಚನ್ನಪಟ್ಟಣ 'ಗೊಂಬೆಗಳ ಊರು' ಎಂದು ಯಾವುದಕ್ಕೆ ಪ್ರಸಿದ್ಧ?" },
    options: { en: ["Wooden toys", "Silk sarees", "Steel", "Pottery"], kn: ["ಮರದ ಗೊಂಬೆಗಳು", "ರೇಷ್ಮೆ ಸೀರೆ", "ಉಕ್ಕು", "ಮಣ್ಣಿನ ಪಾತ್ರೆ"] },
    answer: 0,
    explain: { en: "Channapatna's lacquered wooden toys have a GI tag.", kn: "ಚನ್ನಪಟ್ಟಣದ ಲಕ್ಕಿನ ಮರದ ಗೊಂಬೆಗಳಿಗೆ ಜಿಐ ಟ್ಯಾಗ್ ಇದೆ." },
    wiki: "Channapatna",
  },
  /* ── Dance ───────────────────────────────────────────── */
  {
    id: "dan-dollu",
    cat: "dance",
    diff: "medium",
    q: { en: "Dollu Kunitha is a vigorous folk dance performed with what?", kn: "ಡೊಳ್ಳು ಕುಣಿತ ಯಾವುದರೊಂದಿಗೆ ನಡೆಸುವ ಶಕ್ತಿಶಾಲಿ ಜಾನಪದ ನೃತ್ಯ?" },
    options: { en: ["Large drums", "Swords", "Pots", "Peacock feathers"], kn: ["ದೊಡ್ಡ ಡೋಲುಗಳು", "ಖಡ್ಗ", "ಮಡಕೆ", "ನವಿಲುಗರಿ"] },
    answer: 0,
    explain: { en: "Dollu Kunitha is a drum dance of the Kuruba community.", kn: "ಡೊಳ್ಳು ಕುಣಿತ ಕುರುಬ ಸಮುದಾಯದ ಡೋಲು ನೃತ್ಯ." },
    wiki: "Dollu Kunitha",
  },
  {
    id: "dan-bharatanatyam",
    cat: "dance",
    diff: "hard",
    q: { en: "Which Kannada-origin scholar-king wrote extensively on dance and music?", kn: "ನೃತ್ಯ-ಸಂಗೀತದ ಬಗ್ಗೆ ವಿಸ್ತಾರವಾಗಿ ಬರೆದ ಕನ್ನಡ ನಾಡಿನ ವಿದ್ವಾಂಸ-ಅರಸ ಯಾರು?" },
    options: { en: ["Someshvara III", "Krishnadevaraya", "Tipu Sultan", "Vishnuvardhana"], kn: ["ಮೂರನೇ ಸೋಮೇಶ್ವರ", "ಕೃಷ್ಣದೇವರಾಯ", "ಟಿಪ್ಪು ಸುಲ್ತಾನ್", "ವಿಷ್ಣುವರ್ಧನ"] },
    answer: 0,
    explain: { en: "The Chalukya king Someshvara III wrote the encyclopaedic 'Manasollasa'.", kn: "ಚಾಲುಕ್ಯ ಅರಸ ಮೂರನೇ ಸೋಮೇಶ್ವರ ವಿಶ್ವಕೋಶ 'ಮಾನಸೊಲ್ಲಾಸ' ಬರೆದರು." },
    wiki: "Manasollasa",
  },
  /* ── Music ───────────────────────────────────────────── */
  {
    id: "mus-purandara",
    cat: "music",
    diff: "medium",
    q: { en: "Who is revered as the 'Pitamaha' (father) of Carnatic music?", kn: "ಕರ್ನಾಟಕ ಸಂಗೀತದ 'ಪಿತಾಮಹ' ಎಂದು ಯಾರನ್ನು ಗೌರವಿಸಲಾಗುತ್ತದೆ?" },
    options: { en: ["Purandara Dasa", "Kanaka Dasa", "Tyagaraja", "Basavanna"], kn: ["ಪುರಂದರ ದಾಸ", "ಕನಕ ದಾಸ", "ತ್ಯಾಗರಾಜ", "ಬಸವಣ್ಣ"] },
    answer: 0,
    explain: { en: "Purandara Dasa of Karnataka systematised Carnatic music teaching.", kn: "ಕರ್ನಾಟಕದ ಪುರಂದರ ದಾಸ ಕರ್ನಾಟಕ ಸಂಗೀತ ಬೋಧನೆಯನ್ನು ವ್ಯವಸ್ಥಿತಗೊಳಿಸಿದರು." },
    wiki: "Purandara Dasa",
  },
  {
    id: "mus-gangubai",
    cat: "music",
    diff: "hard",
    q: { en: "Gangubai Hangal was a legendary vocalist of which gharana?", kn: "ಗಂಗೂಬಾಯಿ ಹಾನಗಲ್ ಯಾವ ಘರಾನಾದ ಪ್ರಸಿದ್ಧ ಗಾಯಕಿ?" },
    options: { en: ["Kirana", "Gwalior", "Agra", "Patiala"], kn: ["ಕಿರಾಣಾ", "ಗ್ವಾಲಿಯರ್", "ಆಗ್ರಾ", "ಪಟಿಯಾಲಾ"] },
    answer: 0,
    explain: { en: "Gangubai Hangal was a doyen of the Kirana gharana of Hindustani music.", kn: "ಗಂಗೂಬಾಯಿ ಹಾನಗಲ್ ಹಿಂದೂಸ್ತಾನಿ ಸಂಗೀತದ ಕಿರಾಣಾ ಘರಾನಾದ ದಿಗ್ಗಜೆ." },
    wiki: "Gangubai Hangal",
  },
  /* ── ISRO & Science ──────────────────────────────────── */
  {
    id: "isr-hq",
    cat: "isro",
    diff: "easy",
    q: { en: "Where is ISRO headquartered?", kn: "ಇಸ್ರೋ ಪ್ರಧಾನ ಕಚೇರಿ ಎಲ್ಲಿದೆ?" },
    options: { en: ["Bengaluru", "Hyderabad", "Chennai", "Thiruvananthapuram"], kn: ["ಬೆಂಗಳೂರು", "ಹೈದರಾಬಾದ್", "ಚೆನ್ನೈ", "ತಿರುವನಂತಪುರ"] },
    answer: 0,
    explain: { en: "The Indian Space Research Organisation is headquartered in Bengaluru.", kn: "ಭಾರತೀಯ ಬಾಹ್ಯಾಕಾಶ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ ಬೆಂಗಳೂರಿನಲ್ಲಿದೆ." },
    wiki: "ISRO",
  },
  {
    id: "isr-chandrayaan3",
    cat: "isro",
    diff: "medium",
    q: { en: "Chandrayaan-3 made India the first to land near which lunar region in 2023?", kn: "೨೦೨೩ರಲ್ಲಿ ಚಂದ್ರಯಾನ-೩ ಚಂದ್ರನ ಯಾವ ಪ್ರದೇಶದ ಬಳಿ ಇಳಿದ ಮೊದಲ ದೇಶವನ್ನಾಗಿ ಭಾರತವನ್ನು ಮಾಡಿತು?" },
    options: { en: ["South pole", "North pole", "Far side centre", "Sea of Tranquility"], kn: ["ದಕ್ಷಿಣ ಧ್ರುವ", "ಉತ್ತರ ಧ್ರುವ", "ದೂರದ ಬದಿ", "ಶಾಂತಿ ಸಾಗರ"] },
    answer: 0,
    explain: { en: "Chandrayaan-3 (operated from Bengaluru) landed near the lunar south pole.", kn: "ಬೆಂಗಳೂರಿನಿಂದ ನಿರ್ವಹಿಸಲ್ಪಟ್ಟ ಚಂದ್ರಯಾನ-೩ ಚಂದ್ರನ ದಕ್ಷಿಣ ಧ್ರುವದ ಬಳಿ ಇಳಿಯಿತು." },
    wiki: "Chandrayaan-3",
  },
  {
    id: "isr-crv",
    cat: "isro",
    diff: "hard",
    q: { en: "Which Bengaluru-linked scientist is called the father of India's space programme?", kn: "ಭಾರತದ ಬಾಹ್ಯಾಕಾಶ ಕಾರ್ಯಕ್ರಮದ ಪಿತಾಮಹ ಎಂದು ಯಾರನ್ನು ಕರೆಯಲಾಗುತ್ತದೆ?" },
    options: { en: ["Vikram Sarabhai", "C. V. Raman", "Homi Bhabha", "Satish Dhawan"], kn: ["ವಿಕ್ರಮ್ ಸಾರಾಭಾಯಿ", "ಸಿ.ವಿ. ರಾಮನ್", "ಹೋಮಿ ಭಾಭಾ", "ಸತೀಶ್ ಧವನ್"] },
    answer: 0,
    explain: { en: "Vikram Sarabhai is regarded as the father of India's space programme.", kn: "ವಿಕ್ರಮ್ ಸಾರಾಭಾಯಿ ಭಾರತದ ಬಾಹ್ಯಾಕಾಶ ಕಾರ್ಯಕ್ರಮದ ಪಿತಾಮಹ." },
    fact: { en: "Nobel laureate C. V. Raman founded the Raman Research Institute in Bengaluru.", kn: "ನೊಬೆಲ್ ಪುರಸ್ಕೃತ ಸಿ.ವಿ. ರಾಮನ್ ಬೆಂಗಳೂರಿನ ರಾಮನ್ ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ ಸ್ಥಾಪಿಸಿದರು." },
    wiki: "Vikram Sarabhai",
  },
  /* ── Bengaluru ───────────────────────────────────────── */
  {
    id: "ben-kempegowda",
    cat: "bengaluru",
    diff: "easy",
    q: { en: "Who founded the city of Bengaluru in 1537?", kn: "೧೫೩೭ರಲ್ಲಿ ಬೆಂಗಳೂರು ನಗರವನ್ನು ಸ್ಥಾಪಿಸಿದವರು ಯಾರು?" },
    options: { en: ["Kempegowda", "Tipu Sultan", "Hyder Ali", "Krishnaraja Wadiyar"], kn: ["ಕೆಂಪೇಗೌಡ", "ಟಿಪ್ಪು ಸುಲ್ತಾನ್", "ಹೈದರ್ ಅಲಿ", "ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್"] },
    answer: 0,
    explain: { en: "Kempegowda I, a Vijayanagara chieftain, founded Bengaluru in 1537.", kn: "ವಿಜಯನಗರದ ಪಾಳೇಗಾರ ಒಂದನೇ ಕೆಂಪೇಗೌಡ ೧೫೩೭ರಲ್ಲಿ ಬೆಂಗಳೂರು ಸ್ಥಾಪಿಸಿದರು." },
    wiki: "Kempe Gowda I",
  },
  {
    id: "ben-siliconvalley",
    cat: "bengaluru",
    diff: "easy",
    q: { en: "Bengaluru is popularly called the '____ Valley of India'.", kn: "ಬೆಂಗಳೂರನ್ನು 'ಭಾರತದ ____ ಕಣಿವೆ' ಎಂದು ಕರೆಯಲಾಗುತ್ತದೆ." },
    options: { en: ["Silicon", "Diamond", "Green", "Steel"], kn: ["ಸಿಲಿಕಾನ್", "ವಜ್ರ", "ಹಸಿರು", "ಉಕ್ಕು"] },
    answer: 0,
    explain: { en: "Bengaluru is India's IT capital — the 'Silicon Valley of India'.", kn: "ಬೆಂಗಳೂರು ಭಾರತದ ಐಟಿ ರಾಜಧಾನಿ — 'ಭಾರತದ ಸಿಲಿಕಾನ್ ಕಣಿವೆ'." },
    wiki: "Bengaluru",
  },
  {
    id: "ben-lalbagh",
    cat: "bengaluru",
    diff: "medium",
    q: { en: "Lalbagh Botanical Garden was commissioned by whom?", kn: "ಲಾಲ್‌ಬಾಗ್ ಸಸ್ಯೋದ್ಯಾನವನ್ನು ಯಾರು ಆರಂಭಿಸಿದರು?" },
    options: { en: ["Hyder Ali", "Kempegowda", "The British", "Kanteerava"], kn: ["ಹೈದರ್ ಅಲಿ", "ಕೆಂಪೇಗೌಡ", "ಬ್ರಿಟಿಷರು", "ಕಂಠೀರವ"] },
    answer: 0,
    explain: { en: "Hyder Ali started Lalbagh; his son Tipu Sultan expanded it.", kn: "ಹೈದರ್ ಅಲಿ ಲಾಲ್‌ಬಾಗ್ ಆರಂಭಿಸಿದರು; ಮಗ ಟಿಪ್ಪು ವಿಸ್ತರಿಸಿದರು." },
    wiki: "Lalbagh",
  },
  /* ── Temples ─────────────────────────────────────────── */
  {
    id: "tem-virupaksha",
    cat: "temples",
    diff: "medium",
    q: { en: "The Virupaksha Temple at Hampi is dedicated to which deity?", kn: "ಹಂಪಿಯ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ ಯಾವ ದೇವರಿಗೆ ಸಮರ್ಪಿತ?" },
    options: { en: ["Shiva", "Vishnu", "Ganesha", "Surya"], kn: ["ಶಿವ", "ವಿಷ್ಣು", "ಗಣೇಶ", "ಸೂರ್ಯ"] },
    answer: 0,
    explain: { en: "Virupaksha (a form of Shiva) has been worshipped here for centuries.", kn: "ವಿರೂಪಾಕ್ಷ (ಶಿವನ ರೂಪ) ಇಲ್ಲಿ ಶತಮಾನಗಳಿಂದ ಪೂಜಿಸಲ್ಪಡುತ್ತಾನೆ." },
    wiki: "Virupaksha Temple, Hampi",
  },
  {
    id: "tem-gomateshwara",
    cat: "temples",
    diff: "easy",
    q: { en: "The monolithic statue of Gomateshwara (Bahubali) stands at which town?", kn: "ಗೊಮ್ಮಟೇಶ್ವರ (ಬಾಹುಬಲಿ) ಏಕಶಿಲಾ ಮೂರ್ತಿ ಯಾವ ಊರಿನಲ್ಲಿದೆ?" },
    options: { en: ["Shravanabelagola", "Sringeri", "Udupi", "Kollur"], kn: ["ಶ್ರವಣಬೆಳಗೊಳ", "ಶೃಂಗೇರಿ", "ಉಡುಪಿ", "ಕೊಲ್ಲೂರು"] },
    answer: 0,
    explain: { en: "The ~17 m Bahubali statue at Shravanabelagola is bathed in Mahamastakabhisheka.", kn: "ಶ್ರವಣಬೆಳಗೊಳದ ~೧೭ ಮೀ ಬಾಹುಬಲಿ ಮೂರ್ತಿಗೆ ಮಹಾಮಸ್ತಕಾಭಿಷೇಕ ನಡೆಯುತ್ತದೆ." },
    wiki: "Gommateshwara statue",
  },
  {
    id: "tem-udupi",
    cat: "temples",
    diff: "medium",
    q: { en: "The Krishna Temple at Udupi was established by which saint?", kn: "ಉಡುಪಿಯ ಕೃಷ್ಣ ದೇವಾಲಯವನ್ನು ಯಾವ ಸಂತರು ಸ್ಥಾಪಿಸಿದರು?" },
    options: { en: ["Madhvacharya", "Basavanna", "Ramanuja", "Shankaracharya"], kn: ["ಮಧ್ವಾಚಾರ್ಯ", "ಬಸವಣ್ಣ", "ರಾಮಾನುಜ", "ಶಂಕರಾಚಾರ್ಯ"] },
    answer: 0,
    explain: { en: "Madhvacharya, founder of Dvaita philosophy, established the Udupi Krishna temple.", kn: "ದ್ವೈತ ಸಿದ್ಧಾಂತದ ಸ್ಥಾಪಕ ಮಧ್ವಾಚಾರ್ಯ ಉಡುಪಿ ಕೃಷ್ಣ ದೇವಾಲಯ ಸ್ಥಾಪಿಸಿದರು." },
    wiki: "Sri Krishna Matha, Udupi",
  },
  /* ── Personalities ───────────────────────────────────── */
  {
    id: "per-visvesvaraya",
    cat: "personalities",
    diff: "easy",
    q: { en: "Whose birthday (15 Sept) is celebrated as Engineers' Day in India?", kn: "ಯಾರ ಜನ್ಮದಿನವನ್ನು (ಸೆ. ೧೫) ಭಾರತದಲ್ಲಿ ಇಂಜಿನಿಯರ್‌ಗಳ ದಿನವಾಗಿ ಆಚರಿಸಲಾಗುತ್ತದೆ?" },
    options: { en: ["Sir M. Visvesvaraya", "C. V. Raman", "Kuvempu", "C. N. R. Rao"], kn: ["ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ", "ಸಿ.ವಿ. ರಾಮನ್", "ಕುವೆಂಪು", "ಸಿ.ಎನ್.ಆರ್. ರಾವ್"] },
    answer: 0,
    explain: { en: "Sir M. Visvesvaraya, engineer of the KRS dam, is honoured on Engineers' Day.", kn: "ಕೆಆರ್‌ಎಸ್ ಅಣೆಕಟ್ಟಿನ ಶಿಲ್ಪಿ ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ ಅವರ ನೆನಪಿನಲ್ಲಿ ಇಂಜಿನಿಯರ್‌ಗಳ ದಿನ." },
    wiki: "M. Visvesvaraya",
  },
  {
    id: "per-cvraman",
    cat: "personalities",
    diff: "medium",
    q: { en: "Which Bengaluru-based scientist won the Nobel Prize in Physics (1930)?", kn: "ಬೆಂಗಳೂರಿನ ಯಾವ ವಿಜ್ಞಾನಿ ೧೯೩೦ರಲ್ಲಿ ಭೌತಶಾಸ್ತ್ರದ ನೊಬೆಲ್ ಪಡೆದರು?" },
    options: { en: ["C. V. Raman", "Homi Bhabha", "S. Chandrasekhar", "J. C. Bose"], kn: ["ಸಿ.ವಿ. ರಾಮನ್", "ಹೋಮಿ ಭಾಭಾ", "ಎಸ್. ಚಂದ್ರಶೇಖರ್", "ಜೆ.ಸಿ. ಬೋಸ್"] },
    answer: 0,
    explain: { en: "C. V. Raman won the 1930 Physics Nobel for the Raman Effect.", kn: "ಸಿ.ವಿ. ರಾಮನ್ 'ರಾಮನ್ ಪರಿಣಾಮ'ಕ್ಕಾಗಿ ೧೯೩೦ರ ನೊಬೆಲ್ ಪಡೆದರు." },
    wiki: "C. V. Raman",
  },
  {
    id: "per-rajkumar",
    cat: "personalities",
    diff: "medium",
    q: { en: "Who is the legendary matinee idol revered as 'Annavru' in Kannada cinema?", kn: "ಕನ್ನಡ ಚಿತ್ರರಂಗದಲ್ಲಿ 'ಅಣ್ಣಾವ್ರು' ಎಂದು ಗೌರವಿಸಲ್ಪಡುವ ದಂತಕಥೆ ಯಾರು?" },
    options: { en: ["Dr. Rajkumar", "Vishnuvardhan", "Ambareesh", "Shankar Nag"], kn: ["ಡಾ. ರಾಜ್‌ಕುಮಾರ್", "ವಿಷ್ಣುವರ್ಧನ್", "ಅಂಬರೀಶ್", "ಶಂಕರ್ ನಾಗ್"] },
    answer: 0,
    explain: { en: "Dr. Rajkumar, a cultural icon, championed Kannada language and cinema.", kn: "ಸಾಂಸ್ಕೃತಿಕ ಪ್ರತೀಕ ಡಾ. ರಾಜ್‌ಕುಮಾರ್ ಕನ್ನಡ ಭಾಷೆ-ಚಿತ್ರರಂಗದ ಹರಿಕಾರ." },
    wiki: "Rajkumar (actor)",
  },
  /* ── Karnataka Today ─────────────────────────────────── */
  {
    id: "tod-capital",
    cat: "today",
    diff: "easy",
    q: { en: "What is the capital of Karnataka?", kn: "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?" },
    options: { en: ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"], kn: ["ಬೆಂಗಳೂರು", "ಮೈಸೂರು", "ಹುಬ್ಬಳ್ಳಿ", "ಮಂಗಳೂರು"] },
    answer: 0,
    explain: { en: "Bengaluru is the capital and largest city of Karnataka.", kn: "ಬೆಂಗಳೂರು ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಮತ್ತು ಅತಿದೊಡ್ಡ ನಗರ." },
    wiki: "Vidhana Soudha",
  },
  {
    id: "tod-vidhanasoudha",
    cat: "today",
    diff: "medium",
    q: { en: "The Vidhana Soudha, seat of Karnataka's legislature, is built in which style?", kn: "ಕರ್ನಾಟಕ ವಿಧಾನಮಂಡಲದ ವಿಧಾನಸೌಧ ಯಾವ ಶೈಲಿಯಲ್ಲಿದೆ?" },
    options: { en: ["Neo-Dravidian", "Gothic", "Art Deco", "Mughal"], kn: ["ನವ-ದ್ರಾವಿಡ", "ಗೋಥಿಕ್", "ಆರ್ಟ್ ಡೆಕೊ", "ಮೊಘಲ್"] },
    answer: 0,
    explain: { en: "The granite Vidhana Soudha (1956) is in the Neo-Dravidian style.", kn: "ಗ್ರಾನೈಟ್ ವಿಧಾನಸೌಧ (೧೯೫೬) ನವ-ದ್ರಾವಿಡ ಶೈಲಿಯಲ್ಲಿದೆ." },
    wiki: "Vidhana Soudha",
  },
  {
    id: "tod-districts",
    cat: "today",
    diff: "hard",
    q: { en: "Approximately how many districts does Karnataka have today?", kn: "ಇಂದು ಕರ್ನಾಟಕದಲ್ಲಿ ಸುಮಾರು ಎಷ್ಟು ಜಿಲ್ಲೆಗಳಿವೆ?" },
    options: { en: ["31", "20", "25", "40"], kn: ["೩೧", "೨೦", "೨೫", "೪೦"] },
    answer: 0,
    explain: { en: "Karnataka is organised into 31 districts (as of recent reorganisation).", kn: "ಕರ್ನಾಟಕ ೩೧ ಜಿಲ್ಲೆಗಳಾಗಿ ವಿಂಗಡಿಸಲ್ಪಟ್ಟಿದೆ." },
    wiki: "Districts of Karnataka",
  },
];

/* ══════════════════════════════════════════════════════════════════════ *
 * SELECTORS (all pure + instant — no AI)
 * ══════════════════════════════════════════════════════════════════════ */

/** Deterministic shuffle from a seed (so daily challenges are stable). */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const a = [...arr];
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  const rnd = () => (s = (s * 16807) % 2147483647) / 2147483647;
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function questionsByCategory(cat: QuizCategoryId): BankQuestion[] {
  return QUIZ_BANK.filter((q) => q.cat === cat);
}

export function countByCategory(cat: QuizCategoryId): number {
  return questionsByCategory(cat).length;
}

/** Pick `n` questions matching a filter, shuffled (optionally seeded). */
export function pickQuestions(
  filter: { cats?: QuizCategoryId[]; diff?: Difficulty[]; n: number; seed?: number },
): BankQuestion[] {
  let pool = QUIZ_BANK;
  if (filter.cats?.length) pool = pool.filter((q) => filter.cats!.includes(q.cat));
  if (filter.diff?.length) pool = pool.filter((q) => filter.diff!.includes(q.diff));
  const seed = filter.seed ?? Math.floor(Math.random() * 1e9);
  return seededShuffle(pool, seed).slice(0, filter.n);
}

/** Today's daily challenge — deterministic for the calendar day. */
export function dailyChallenge(n = 7): BankQuestion[] {
  const now = new Date();
  const daySeed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  return pickQuestions({ n, seed: daySeed });
}

export const TOTAL_QUESTIONS = QUIZ_BANK.length;
