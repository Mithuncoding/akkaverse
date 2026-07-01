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

  /* ═══════════════ EXPANSION PACK ═══════════════ */

  /* ── History ─────────────────────────────────────────── */
  {
    id: "his-ashoka-maski",
    cat: "history",
    diff: "hard",
    q: { en: "The Maski edict in Karnataka is famous for being the first to mention which emperor by name?", kn: "ಕರ್ನಾಟಕದ ಮಸ್ಕಿ ಶಾಸನ ಯಾವ ಚಕ್ರವರ್ತಿಯ ಹೆಸರನ್ನು ಮೊದಲ ಬಾರಿಗೆ ಉಲ್ಲೇಖಿಸಿದ್ದಕ್ಕೆ ಪ್ರಸಿದ್ಧ?" },
    options: { en: ["Ashoka", "Chandragupta", "Samudragupta", "Kanishka"], kn: ["ಅಶೋಕ", "ಚಂದ್ರಗುಪ್ತ", "ಸಮುದ್ರಗುಪ್ತ", "ಕನಿಷ್ಕ"] },
    answer: 0,
    explain: { en: "The Maski edict was the first Ashokan inscription to name 'Ashoka' directly.", kn: "ಮಸ್ಕಿ ಶಾಸನ 'ಅಶೋಕ' ಎಂಬ ಹೆಸರನ್ನು ನೇರವಾಗಿ ಉಲ್ಲೇಖಿಸಿದ ಮೊದಲ ಶಾಸನ." },
    wiki: "Maski",
  },
  {
    id: "his-vidyaranya",
    cat: "history",
    diff: "medium",
    q: { en: "Which sage is traditionally credited as the guiding force behind Vijayanagara's founding?", kn: "ವಿಜಯನಗರ ಸ್ಥಾಪನೆಯ ಹಿಂದಿನ ಮಾರ್ಗದರ್ಶಕ ಎಂದು ಸಂಪ್ರದಾಯಿಕವಾಗಿ ಯಾರನ್ನು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ?" },
    options: { en: ["Vidyaranya", "Madhvacharya", "Basavanna", "Ramanuja"], kn: ["ವಿದ್ಯಾರಣ್ಯ", "ಮಧ್ವಾಚಾರ್ಯ", "ಬಸವಣ್ಣ", "ರಾಮಾನುಜ"] },
    answer: 0,
    explain: { en: "Sage Vidyaranya guided Harihara and Bukka; the city Vidyanagara was named after him.", kn: "ವಿದ್ಯಾರಣ್ಯರು ಹರಿಹರ-ಬುಕ್ಕರಿಗೆ ಮಾರ್ಗದರ್ಶನ ನೀಡಿದರು." },
    wiki: "Vidyaranya",
  },
  {
    id: "his-srirangapatna",
    cat: "history",
    diff: "medium",
    q: { en: "Tipu Sultan died in 1799 defending which island fortress?", kn: "೧೭೯೯ರಲ್ಲಿ ಟಿಪ್ಪು ಸುಲ್ತಾನ್ ಯಾವ ದ್ವೀಪ ಕೋಟೆಯನ್ನು ರಕ್ಷಿಸುತ್ತಾ ಮಡಿದರು?" },
    options: { en: ["Srirangapatna", "Bidar", "Gulbarga", "Chitradurga"], kn: ["ಶ್ರೀರಂಗಪಟ್ಟಣ", "ಬೀದರ್", "ಗುಲ್ಬರ್ಗಾ", "ಚಿತ್ರದುರ್ಗ"] },
    answer: 0,
    explain: { en: "Tipu fell in the 1799 Siege of Srirangapatna against the British.", kn: "೧೭೯೯ರ ಶ್ರೀರಂಗಪಟ್ಟಣ ಮುತ್ತಿಗೆಯಲ್ಲಿ ಟಿಪ್ಪು ಮಡಿದರು." },
    wiki: "Srirangapatna",
  },
  {
    id: "his-ganga-talakad",
    cat: "history",
    diff: "hard",
    q: { en: "The Western Ganga dynasty ruled southern Karnataka from which capital?", kn: "ಪಶ್ಚಿಮ ಗಂಗ ರಾಜವಂಶ ದಕ್ಷಿಣ ಕರ್ನಾಟಕವನ್ನು ಯಾವ ರಾಜಧಾನಿಯಿಂದ ಆಳಿತು?" },
    options: { en: ["Talakadu", "Banavasi", "Manyakheta", "Dwarasamudra"], kn: ["ತಲಕಾಡು", "ಬನವಾಸಿ", "ಮಾನ್ಯಖೇಟ", "ದ್ವಾರಸಮುದ್ರ"] },
    answer: 0,
    explain: { en: "The Gangas ruled from Talakadu on the Kaveri.", kn: "ಗಂಗರು ಕಾವೇರಿ ತೀರದ ತಲಕಾಡಿನಿಂದ ಆಳಿದರು." },
    wiki: "Western Ganga dynasty",
  },
  /* ── Festivals ───────────────────────────────────────── */
  {
    id: "fes-torchlight",
    cat: "festivals",
    diff: "medium",
    q: { en: "The Dasara torchlight parade (Panjina Kavayatthu) is held at which Mysuru ground?", kn: "ದಸರಾ ಪಂಜಿನ ಕವಾಯತ್ತು ಮೈಸೂರಿನ ಯಾವ ಮೈದಾನದಲ್ಲಿ ನಡೆಯುತ್ತದೆ?" },
    options: { en: ["Bannimantap", "Chamundi Hill", "Kukkarahalli", "Lalitha Mahal"], kn: ["ಬನ್ನಿಮಂಟಪ", "ಚಾಮುಂಡಿ ಬೆಟ್ಟ", "ಕುಕ್ಕರಹಳ್ಳಿ", "ಲಲಿತಾ ಮಹಲ್"] },
    answer: 0,
    explain: { en: "The torchlight parade closes Dasara at the Bannimantap grounds.", kn: "ಬನ್ನಿಮಂಟಪದಲ್ಲಿ ಪಂಜಿನ ಕವಾಯತ್ತಿನೊಂದಿಗೆ ದಸರಾ ಸಮಾರೋಪ." },
    wiki: "Mysore Dasara",
  },
  {
    id: "fes-ugadi",
    cat: "festivals",
    diff: "easy",
    q: { en: "Ugadi marks what in Karnataka?", kn: "ಯುಗಾದಿ ಕರ್ನಾಟಕದಲ್ಲಿ ಏನನ್ನು ಸೂಚಿಸುತ್ತದೆ?" },
    options: { en: ["The New Year", "The harvest", "Mid-winter", "The monsoon"], kn: ["ಹೊಸ ವರ್ಷ", "ಸುಗ್ಗಿ", "ಚಳಿಗಾಲ", "ಮಳೆಗಾಲ"] },
    answer: 0,
    explain: { en: "Ugadi is the Kannada (and Telugu) New Year, marked by bevu-bella.", kn: "ಯುಗಾದಿ ಕನ್ನಡ ಹೊಸ ವರ್ಷ; ಬೇವು-ಬೆಲ್ಲ ಸಂಕೇತ." },
    wiki: "Ugadi",
  },
  {
    id: "fes-hampiutsava",
    cat: "festivals",
    diff: "medium",
    q: { en: "The Hampi Utsav / Vijaya Utsav celebrates the heritage of which site?", kn: "ಹಂಪಿ ಉತ್ಸವ / ವಿಜಯ ಉತ್ಸವ ಯಾವ ತಾಣದ ಪರಂಪರೆಯನ್ನು ಆಚರಿಸುತ್ತದೆ?" },
    options: { en: ["Hampi", "Badami", "Halebidu", "Bidar"], kn: ["ಹಂಪಿ", "ಬಾದಾಮಿ", "ಹಳೇಬೀಡು", "ಬೀದರ್"] },
    answer: 0,
    explain: { en: "Hampi Utsav showcases dance, music and light at the Vijayanagara ruins.", kn: "ಹಂಪಿ ಉತ್ಸವ ವಿಜಯನಗರ ಅವಶೇಷಗಳಲ್ಲಿ ನೃತ್ಯ-ಸಂಗೀತ ಪ್ರದರ್ಶನ." },
    wiki: "Hampi",
  },
  /* ── Kings ───────────────────────────────────────────── */
  {
    id: "kin-hyder",
    cat: "kings",
    diff: "medium",
    q: { en: "Who was Tipu Sultan's father and the de facto ruler of Mysore before him?", kn: "ಟಿಪ್ಪು ಸುಲ್ತಾನನ ತಂದೆ ಮತ್ತು ಅವನಿಗೂ ಮುನ್ನ ಮೈಸೂರಿನ ವಾಸ್ತವಿಕ ಆಡಳಿತಗಾರ ಯಾರು?" },
    options: { en: ["Hyder Ali", "Chikka Devaraja", "Kanteerava", "Nalwadi"], kn: ["ಹೈದರ್ ಅಲಿ", "ಚಿಕ್ಕ ದೇವರಾಜ", "ಕಂಠೀರವ", "ನಾಲ್ವಡಿ"] },
    answer: 0,
    explain: { en: "Hyder Ali rose from commander to ruler of Mysore; Tipu was his son.", kn: "ಹೈದರ್ ಅಲಿ ಸೇನಾಪತಿಯಿಂದ ಮೈಸೂರಿನ ಆಡಳಿತಗಾರರಾದರು; ಟಿಪ್ಪು ಅವರ ಮಗ." },
    wiki: "Hyder Ali",
  },
  {
    id: "kin-nalwadi",
    cat: "kings",
    diff: "medium",
    q: { en: "Which Wadiyar king, called 'Rajarshi', made Mysore a model progressive state?", kn: "'ರಾಜರ್ಷಿ' ಎಂದು ಕರೆಯಲ್ಪಡುವ, ಮೈಸೂರನ್ನು ಮಾದರಿ ಪ್ರಗತಿಶೀಲ ಸಂಸ್ಥಾನವಾಗಿಸಿದ ಒಡೆಯ ಯಾರು?" },
    options: { en: ["Krishnaraja Wadiyar IV", "Jayachamarajendra", "Chamaraja IX", "Kanteerava Narasaraja"], kn: ["ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್", "ಜಯಚಾಮರಾಜೇಂದ್ರ", "ಒಂಬತ್ತನೇ ಚಾಮರಾಜ", "ಕಂಠೀರವ ನರಸರಾಜ"] },
    answer: 0,
    explain: { en: "Krishnaraja Wadiyar IV (r. 1902–1940) presided over Mysore's golden progressive era.", kn: "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ (೧೯೦೨–೧೯೪೦) ಮೈಸೂರಿನ ಸುವರ್ಣ ಪ್ರಗತಿ ಯುಗ." },
    wiki: "Krishnaraja Wadiyar IV",
  },
  {
    id: "kin-vikramaditya",
    cat: "kings",
    diff: "hard",
    q: { en: "Which Kalyani Chalukya king started the 'Chalukya Vikrama Era'?", kn: "'ಚಾಲುಕ್ಯ ವಿಕ್ರಮ ಶಕೆ' ಆರಂಭಿಸಿದ ಕಲ್ಯಾಣಿ ಚಾಲುಕ್ಯ ಅರಸ ಯಾರು?" },
    options: { en: ["Vikramaditya VI", "Someshvara I", "Tailapa II", "Jayasimha II"], kn: ["ಆರನೇ ವಿಕ್ರಮಾದಿತ್ಯ", "ಒಂದನೇ ಸೋಮೇಶ್ವರ", "ಎರಡನೇ ತೈಲಪ", "ಎರಡನೇ ಜಯಸಿಂಹ"] },
    answer: 0,
    explain: { en: "Vikramaditya VI began his own era; Bilhana wrote his 'Vikramankadevacharita'.", kn: "ಆರನೇ ವಿಕ್ರಮಾದಿತ್ಯ ತನ್ನದೇ ಶಕೆ ಆರಂಭಿಸಿದರು." },
    wiki: "Vikramaditya VI",
  },
  /* ── Dynasties ───────────────────────────────────────── */
  {
    id: "dyn-rashtrakuta-cap",
    cat: "dynasties",
    diff: "hard",
    q: { en: "What was the capital of the Rashtrakuta dynasty?", kn: "ರಾಷ್ಟ್ರಕೂಟ ರಾಜವಂಶದ ರಾಜಧಾನಿ ಯಾವುದು?" },
    options: { en: ["Manyakheta", "Badami", "Talakadu", "Banavasi"], kn: ["ಮಾನ್ಯಖೇಟ", "ಬಾದಾಮಿ", "ತಲಕಾಡು", "ಬನವಾಸಿ"] },
    answer: 0,
    explain: { en: "The Rashtrakutas ruled from Manyakheta (modern Malkhed).", kn: "ರಾಷ್ಟ್ರಕೂಟರು ಮಾನ್ಯಖೇಟದಿಂದ (ಇಂದಿನ ಮಳಖೇಡ) ಆಳಿದರು." },
    wiki: "Rashtrakuta dynasty",
  },
  {
    id: "dyn-bahmani",
    cat: "dynasties",
    diff: "medium",
    q: { en: "Bidar and Kalaburagi were capitals of which medieval sultanate?", kn: "ಬೀದರ್ ಮತ್ತು ಕಲಬುರಗಿ ಯಾವ ಮಧ್ಯಕಾಲೀನ ಸುಲ್ತಾನರ ರಾಜಧಾನಿಗಳಾಗಿದ್ದವು?" },
    options: { en: ["Bahmani Sultanate", "Vijayanagara", "Mughals", "Adil Shahi only"], kn: ["ಬಹಮನಿ ಸುಲ್ತಾನರು", "ವಿಜಯನಗರ", "ಮೊಘಲರು", "ಆದಿಲ್ ಶಾಹಿ ಮಾತ್ರ"] },
    answer: 0,
    explain: { en: "The Bahmani Sultanate ruled from Kalaburagi then Bidar; Bidar has the famed Madrasa of Mahmud Gawan.", kn: "ಬಹಮನಿ ಸುಲ್ತಾನರು ಕಲಬುರಗಿ ನಂತರ ಬೀದರಿನಿಂದ ಆಳಿದರು." },
    wiki: "Bahmani Sultanate",
  },
  {
    id: "dyn-keladi",
    cat: "dynasties",
    diff: "hard",
    q: { en: "Rani Chennamma who sheltered a Maratha king belonged to which Nayaka dynasty?", kn: "ಮರಾಠಾ ಅರಸನಿಗೆ ಆಶ್ರಯ ನೀಡಿದ ರಾಣಿ ಚೆನ್ನಮ್ಮ ಯಾವ ನಾಯಕ ವಂಶದವರು?" },
    options: { en: ["Keladi (Ikkeri)", "Chitradurga", "Yelahanka", "Sandur"], kn: ["ಕೆಳದಿ (ಇಕ್ಕೇರಿ)", "ಚಿತ್ರದುರ್ಗ", "ಯಲಹಂಕ", "ಸಂಡೂರು"] },
    answer: 0,
    explain: { en: "Keladi Chennamma of the Keladi Nayakas defied Aurangzeb by sheltering Rajaram.", kn: "ಕೆಳದಿ ನಾಯಕರ ಕೆಳದಿ ಚೆನ್ನಮ್ಮ ರಾಜಾರಾಮನಿಗೆ ಆಶ್ರಯ ನೀಡಿ ಔರಂಗಜೇಬನನ್ನು ಎದುರಿಸಿದರು." },
    wiki: "Keladi Chennamma",
  },
  /* ── Freedom fighters ────────────────────────────────── */
  {
    id: "fre-obavva",
    cat: "freedom",
    diff: "medium",
    q: { en: "Onake Obavva heroically defended which fort with a pestle?", kn: "ಒನಕೆ ಓಬವ್ವ ಒನಕೆಯಿಂದ ಯಾವ ಕೋಟೆಯನ್ನು ವೀರೋಚಿತವಾಗಿ ರಕ್ಷಿಸಿದರು?" },
    options: { en: ["Chitradurga", "Bidar", "Bellary", "Gulbarga"], kn: ["ಚಿತ್ರದುರ್ಗ", "ಬೀದರ್", "ಬಳ್ಳಾರಿ", "ಗುಲ್ಬರ್ಗಾ"] },
    answer: 0,
    explain: { en: "Obavva single-handedly held off Hyder Ali's soldiers at Chitradurga fort.", kn: "ಓಬವ್ವ ಚಿತ್ರದುರ್ಗ ಕೋಟೆಯಲ್ಲಿ ಹೈದರ್ ಅಲಿಯ ಸೈನಿಕರನ್ನು ಏಕಾಂಗಿಯಾಗಿ ತಡೆದರು." },
    wiki: "Onake Obavva",
  },
  {
    id: "fre-hardekar",
    cat: "freedom",
    diff: "hard",
    q: { en: "Who designed the Kannada flag and is called 'Rashtrakavi' honouring the nation?", kn: "ಕನ್ನಡ ಬಾವುಟ ರೂಪಿಸಿದ, ದೇಶಭಕ್ತಿಗೆ ಹೆಸರಾದ ವ್ಯಕ್ತಿ ಯಾರು?" },
    options: { en: ["Hardekar Manjappa", "Aluru Venkata Rao", "Sangolli Rayanna", "Karnad Sadashiva Rao"], kn: ["ಹರ್ಡೇಕರ್ ಮಂಜಪ್ಪ", "ಆಲೂರು ವೆಂಕಟರಾವ್", "ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ", "ಕರ್ನಾಡ್ ಸದಾಶಿವ ರಾವ್"] },
    answer: 0,
    explain: { en: "Hardekar Manjappa, a Gandhian, is honoured as Karnataka's 'Rashtrakavi/Rashtriya'.", kn: "ಗಾಂಧಿವಾದಿ ಹರ್ಡೇಕರ್ ಮಂಜಪ್ಪ ಕರ್ನಾಟಕದ ರಾಷ್ಟ್ರೀಯ ಚೇತನ." },
    wiki: "Hardekar Manjappa",
  },
  {
    id: "fre-aluru",
    cat: "freedom",
    diff: "hard",
    q: { en: "Who is called 'Kannada Kulapurohita' for igniting the Karnataka unification movement?", kn: "ಕರ್ನಾಟಕ ಏಕೀಕರಣ ಚಳವಳಿಗೆ ಕಿಚ್ಚು ಹಚ್ಚಿದ 'ಕನ್ನಡ ಕುಲಪುರೋಹಿತ' ಯಾರು?" },
    options: { en: ["Aluru Venkata Rao", "Kuvempu", "Kengal Hanumanthaiah", "B. M. Srikantaiah"], kn: ["ಆಲೂರು ವೆಂಕಟರಾವ್", "ಕುವೆಂಪು", "ಕೆಂಗಲ್ ಹನುಮಂತಯ್ಯ", "ಬಿ.ಎಂ. ಶ್ರೀಕಂಠಯ್ಯ"] },
    answer: 0,
    explain: { en: "Aluru Venkata Rao's writings sparked the Karnataka Ekikarana movement.", kn: "ಆಲೂರು ವೆಂಕಟರಾವ್ ಅವರ ಬರಹಗಳು ಏಕೀಕರಣ ಚಳವಳಿಗೆ ಸ್ಫೂರ್ತಿ." },
    wiki: "Aluru Venkata Rao",
  },
  /* ── Monuments ───────────────────────────────────────── */
  {
    id: "mon-bidar",
    cat: "monuments",
    diff: "hard",
    q: { en: "The Mahmud Gawan Madrasa, a Persian-style college, is in which city?", kn: "ಪರ್ಷಿಯನ್ ಶೈಲಿಯ ಮಹಮೂದ್ ಗವಾನ್ ಮದ್ರಸಾ ಯಾವ ನಗರದಲ್ಲಿದೆ?" },
    options: { en: ["Bidar", "Vijayapura", "Kalaburagi", "Raichur"], kn: ["ಬೀದರ್", "ವಿಜಯಪುರ", "ಕಲಬುರಗಿ", "ರಾಯಚೂರು"] },
    answer: 0,
    explain: { en: "The 15th-century madrasa in Bidar is a gem of Bahmani architecture.", kn: "ಬೀದರಿನ ೧೫ನೇ ಶತಮಾನದ ಮದ್ರಸಾ ಬಹಮನಿ ವಾಸ್ತುಶಿಲ್ಪದ ರತ್ನ." },
    wiki: "Mahmud Gawan Madrasa",
  },
  {
    id: "mon-krs",
    cat: "monuments",
    diff: "easy",
    q: { en: "The Krishna Raja Sagara (KRS) dam and Brindavan Gardens are near which city?", kn: "ಕೃಷ್ಣರಾಜ ಸಾಗರ (ಕೆಆರ್‌ಎಸ್) ಅಣೆಕಟ್ಟು ಮತ್ತು ಬೃಂದಾವನ ಉದ್ಯಾನ ಯಾವ ನಗರದ ಬಳಿ?" },
    options: { en: ["Mysuru", "Ballari", "Hubballi", "Belagavi"], kn: ["ಮೈಸೂರು", "ಬಳ್ಳಾರಿ", "ಹುಬ್ಬಳ್ಳಿ", "ಬೆಳಗಾವಿ"] },
    answer: 0,
    explain: { en: "The KRS dam on the Kaveri, engineered by Sir M. V., is near Mysuru.", kn: "ಸರ್ ಎಂ.ವಿ. ವಿನ್ಯಾಸದ ಕಾವೇರಿಯ ಕೆಆರ್‌ಎಸ್ ಅಣೆಕಟ್ಟು ಮೈಸೂರಿನ ಬಳಿ." },
    wiki: "Krishna Raja Sagara",
  },
  {
    id: "mon-chitradurga",
    cat: "monuments",
    diff: "medium",
    q: { en: "The seven-ringed hill fort called 'Elusuttina Kote' is at which town?", kn: "'ಏಳುಸುತ್ತಿನ ಕೋಟೆ' ಎಂಬ ಬೆಟ್ಟದ ಕೋಟೆ ಯಾವ ಊರಿನಲ್ಲಿದೆ?" },
    options: { en: ["Chitradurga", "Bidar", "Basavakalyan", "Koppal"], kn: ["ಚಿತ್ರದುರ್ಗ", "ಬೀದರ್", "ಬಸವಕಲ್ಯಾಣ", "ಕೊಪ್ಪಳ"] },
    answer: 0,
    explain: { en: "Chitradurga's fort of seven walls is linked to Onake Obavva's heroism.", kn: "ಚಿತ್ರದುರ್ಗದ ಏಳುಸುತ್ತಿನ ಕೋಟೆ ಓಬವ್ವನ ವೀರಗಾಥೆಯೊಂದಿಗೆ ಸೇರಿದೆ." },
    wiki: "Chitradurga Fort",
  },
  /* ── Architecture ────────────────────────────────────── */
  {
    id: "arc-badami-caves",
    cat: "architecture",
    diff: "medium",
    q: { en: "The rock-cut cave temples of Badami were carved by which dynasty?", kn: "ಬಾದಾಮಿಯ ಗುಹಾ ದೇವಾಲಯಗಳನ್ನು ಯಾವ ರಾಜವಂಶ ಕೊರೆಯಿತು?" },
    options: { en: ["Badami Chalukyas", "Hoysalas", "Rashtrakutas", "Cholas"], kn: ["ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು", "ಹೊಯ್ಸಳರು", "ರಾಷ್ಟ್ರಕೂಟರು", "ಚೋಳರು"] },
    answer: 0,
    explain: { en: "The Badami Chalukyas cut four cave temples into the sandstone cliffs.", kn: "ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು ಮರಳುಗಲ್ಲಿನಲ್ಲಿ ನಾಲ್ಕು ಗುಹಾ ದೇವಾಲಯ ಕೊರೆದರು." },
    wiki: "Badami cave temples",
  },
  {
    id: "arc-aihole",
    cat: "architecture",
    diff: "hard",
    q: { en: "Which town is called the 'cradle of Indian temple architecture'?", kn: "'ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ತೊಟ್ಟಿಲು' ಎಂದು ಯಾವ ಊರನ್ನು ಕರೆಯುತ್ತಾರೆ?" },
    options: { en: ["Aihole", "Belur", "Hampi", "Sringeri"], kn: ["ಐಹೊಳೆ", "ಬೇಲೂರು", "ಹಂಪಿ", "ಶೃಂಗೇರಿ"] },
    answer: 0,
    explain: { en: "Aihole's early Chalukya temples earned it that title; Pattadakal is a UNESCO site nearby.", kn: "ಐಹೊಳೆಯ ಆರಂಭಿಕ ಚಾಲುಕ್ಯ ದೇವಾಲಯಗಳಿಂದ ಆ ಬಿರುದು." },
    wiki: "Aihole",
  },
  {
    id: "arc-pattadakal",
    cat: "architecture",
    diff: "medium",
    q: { en: "Pattadakal, a UNESCO site, is famous for temples of which two architectural styles blended?", kn: "ಯುನೆಸ್ಕೊ ತಾಣ ಪಟ್ಟದಕಲ್ಲು ಯಾವ ಎರಡು ಶೈಲಿಗಳ ಸಂಗಮದ ದೇವಾಲಯಗಳಿಗೆ ಪ್ರಸಿದ್ಧ?" },
    options: { en: ["Nagara & Dravida", "Gothic & Mughal", "Kadamba & Chola", "Vesara only"], kn: ["ನಾಗರ ಮತ್ತು ದ್ರಾವಿಡ", "ಗೋಥಿಕ್-ಮೊಘಲ್", "ಕದಂಬ-ಚೋಳ", "ವೇಸರ ಮಾತ್ರ"] },
    answer: 0,
    explain: { en: "Pattadakal blends northern Nagara and southern Dravida temple styles.", kn: "ಪಟ್ಟದಕಲ್ಲು ಉತ್ತರದ ನಾಗರ ಮತ್ತು ದಕ್ಷಿಣದ ದ್ರಾವಿಡ ಶೈಲಿಗಳ ಸಂಗಮ." },
    wiki: "Pattadakal",
  },
  /* ── Literature ──────────────────────────────────────── */
  {
    id: "lit-ratnatraya",
    cat: "literature",
    diff: "hard",
    q: { en: "Pampa, Ponna and Ranna together are known as the Kannada literary...?", kn: "ಪಂಪ, ಪೊನ್ನ ಮತ್ತು ರನ್ನ ಒಟ್ಟಾಗಿ ಕನ್ನಡ ಸಾಹಿತ್ಯದ...?" },
    options: { en: ["Ratnatraya (three gems)", "Navaratna", "Ashtadiggaja", "Dasavarga"], kn: ["ರತ್ನತ್ರಯ", "ನವರತ್ನ", "ಅಷ್ಟದಿಗ್ಗಜ", "ದಶವರ್ಗ"] },
    answer: 0,
    explain: { en: "These three 10th-century poets are the 'Ratnatraya' of Kannada.", kn: "ಈ ಮೂವರು ೧೦ನೇ ಶತಮಾನದ ಕವಿಗಳು ಕನ್ನಡದ 'ರತ್ನತ್ರಯ'." },
    wiki: "Ranna",
  },
  {
    id: "lit-kumaravyasa",
    cat: "literature",
    diff: "medium",
    q: { en: "Who wrote the beloved Kannada 'Karnata Bharata Kathamanjari' (Gadugina Bharata)?", kn: "ಕನ್ನಡದ 'ಕರ್ಣಾಟ ಭಾರತ ಕಥಾಮಂಜರಿ' (ಗದುಗಿನ ಭಾರತ) ಬರೆದವರು ಯಾರು?" },
    options: { en: ["Kumaravyasa", "Harihara", "Raghavanka", "Lakshmisha"], kn: ["ಕುಮಾರವ್ಯಾಸ", "ಹರಿಹರ", "ರಾಘವಾಂಕ", "ಲಕ್ಷ್ಮೀಶ"] },
    answer: 0,
    explain: { en: "Kumaravyasa's 15th-century Mahabharata retelling is a Kannada classic.", kn: "ಕುಮಾರವ್ಯಾಸನ ೧೫ನೇ ಶತಮಾನದ ಮಹಾಭಾರತ ಕನ್ನಡ ಶ್ರೇಷ್ಠಕೃತಿ." },
    wiki: "Kumara Vyasa",
  },
  {
    id: "lit-jnanpith-first",
    cat: "literature",
    diff: "hard",
    q: { en: "Who was the first Kannada writer to win the Jnanpith Award?", kn: "ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿ ಪಡೆದ ಮೊದಲ ಕನ್ನಡ ಸಾಹಿತಿ ಯಾರು?" },
    options: { en: ["Kuvempu", "Bendre", "Karanth", "Masti"], kn: ["ಕುವೆಂಪು", "ಬೇಂದ್ರೆ", "ಕಾರಂತ", "ಮಾಸ್ತಿ"] },
    answer: 0,
    explain: { en: "Kuvempu won the first Jnanpith for Kannada in 1967.", kn: "ಕುವೆಂಪು ೧೯೬೭ರಲ್ಲಿ ಕನ್ನಡಕ್ಕೆ ಮೊದಲ ಜ್ಞಾನಪೀಠ ಪಡೆದರು." },
    wiki: "Kuvempu",
  },
  /* ── Language ────────────────────────────────────────── */
  {
    id: "lan-halmidi",
    cat: "language",
    diff: "hard",
    q: { en: "The Halmidi inscription is significant as the earliest known what?", kn: "ಹಲ್ಮಿಡಿ ಶಾಸನ ಅತಿ ಪ್ರಾಚೀನ ಯಾವುದೆಂದು ಮಹತ್ವದ್ದು?" },
    options: { en: ["Kannada inscription", "Tamil inscription", "Sanskrit epic", "Coin legend"], kn: ["ಕನ್ನಡ ಶಾಸನ", "ತಮಿಳು ಶಾಸನ", "ಸಂಸ್ಕೃತ ಮಹಾಕಾವ್ಯ", "ನಾಣ್ಯ ಲಿಪಿ"] },
    answer: 0,
    explain: { en: "The Halmidi inscription (c. 450 CE) is the oldest known Kannada-language inscription.", kn: "ಹಲ್ಮಿಡಿ ಶಾಸನ (ಸು. ೪೫೦) ಅತಿ ಪ್ರಾಚೀನ ಕನ್ನಡ ಶಾಸನ." },
    wiki: "Halmidi inscription",
  },
  {
    id: "lan-vowels",
    cat: "language",
    diff: "easy",
    q: { en: "Kannada script is a type of writing system classified as what?", kn: "ಕನ್ನಡ ಲಿಪಿ ಯಾವ ಬಗೆಯ ಬರವಣಿಗೆ ವ್ಯವಸ್ಥೆ?" },
    options: { en: ["Abugida (alphasyllabary)", "Alphabet", "Logographic", "Abjad"], kn: ["ಅಬುಗಿಡ (ಅಕ್ಷರಮಾಲೆ)", "ವರ್ಣಮಾಲೆ", "ಚಿತ್ರಲಿಪಿ", "ಅಬ್ಜದ್"] },
    answer: 0,
    explain: { en: "Kannada is an abugida, where consonants carry an inherent vowel.", kn: "ಕನ್ನಡ ಒಂದು ಅಬುಗಿಡ; ವ್ಯಂಜನಗಳಿಗೆ ಸ್ವರ ಅಂತರ್ಗತ." },
    wiki: "Kannada script",
  },
  /* ── Geography ───────────────────────────────────────── */
  {
    id: "geo-coastline",
    cat: "geography",
    diff: "medium",
    q: { en: "Karnataka's coastline lies along which sea?", kn: "ಕರ್ನಾಟಕದ ಕರಾವಳಿ ಯಾವ ಸಮುದ್ರದ ಉದ್ದಕ್ಕೂ ಇದೆ?" },
    options: { en: ["Arabian Sea", "Bay of Bengal", "Indian Ocean directly", "Laccadive Sea only"], kn: ["ಅರಬ್ಬಿ ಸಮುದ್ರ", "ಬಂಗಾಳ ಕೊಲ್ಲಿ", "ನೇರ ಹಿಂದೂ ಮಹಾಸಾಗರ", "ಲಕ್ಷದ್ವೀಪ ಸಮುದ್ರ ಮಾತ್ರ"] },
    answer: 0,
    explain: { en: "The Karnataka (Karavali) coast runs along the Arabian Sea.", kn: "ಕರ್ನಾಟಕದ ಕರಾವಳಿ ಅರಬ್ಬಿ ಸಮುದ್ರದ ಉದ್ದಕ್ಕೂ ಇದೆ." },
    wiki: "Karnataka",
  },
  {
    id: "geo-hampi-river",
    cat: "geography",
    diff: "medium",
    q: { en: "Which river flows past Hampi?", kn: "ಹಂಪಿಯ ಪಕ್ಕದಲ್ಲಿ ಯಾವ ನದಿ ಹರಿಯುತ್ತದೆ?" },
    options: { en: ["Tungabhadra", "Kaveri", "Krishna", "Sharavathi"], kn: ["ತುಂಗಭದ್ರಾ", "ಕಾವೇರಿ", "ಕೃಷ್ಣಾ", "ಶರಾವತಿ"] },
    answer: 0,
    explain: { en: "The Tungabhadra river winds past the Hampi ruins.", kn: "ತುಂಗಭದ್ರಾ ನದಿ ಹಂಪಿ ಅವಶೇಷಗಳ ಪಕ್ಕ ಹರಿಯುತ್ತದೆ." },
    wiki: "Tungabhadra River",
  },
  {
    id: "geo-coffee",
    cat: "geography",
    diff: "easy",
    q: { en: "Which Karnataka district is India's coffee heartland?", kn: "ಕರ್ನಾಟಕದ ಯಾವ ಜಿಲ್ಲೆ ಭಾರತದ ಕಾಫಿ ಕೇಂದ್ರ?" },
    options: { en: ["Kodagu (Coorg)", "Bidar", "Raichur", "Koppal"], kn: ["ಕೊಡಗು", "ಬೀದರ್", "ರಾಯಚೂರು", "ಕೊಪ್ಪಳ"] },
    answer: 0,
    explain: { en: "Kodagu (Coorg) and Chikkamagaluru grow most of India's coffee.", kn: "ಕೊಡಗು ಮತ್ತು ಚಿಕ್ಕಮಗಳೂರು ಭಾರತದ ಬಹುಪಾಲು ಕಾಫಿ ಬೆಳೆಯುತ್ತವೆ." },
    wiki: "Kodagu district",
  },
  /* ── Cuisine ─────────────────────────────────────────── */
  {
    id: "cui-ragi",
    cat: "cuisine",
    diff: "easy",
    q: { en: "Ragi mudde, a staple of southern Karnataka, is made from which millet?", kn: "ದಕ್ಷಿಣ ಕರ್ನಾಟಕದ ಪ್ರಧಾನ ಆಹಾರ ರಾಗಿ ಮುದ್ದೆ ಯಾವ ಸಿರಿಧಾನ್ಯದಿಂದ ಮಾಡಲಾಗುತ್ತದೆ?" },
    options: { en: ["Finger millet (ragi)", "Rice", "Wheat", "Corn"], kn: ["ರಾಗಿ", "ಅಕ್ಕಿ", "ಗೋಧಿ", "ಜೋಳ"] },
    answer: 0,
    explain: { en: "Ragi mudde is a nutritious finger-millet ball eaten with saaru.", kn: "ರಾಗಿ ಮುದ್ದೆ ಸಾರಿನೊಂದಿಗೆ ತಿನ್ನುವ ಪೌಷ್ಟಿಕ ಆಹಾರ." },
    wiki: "Ragi mudde",
  },
  {
    id: "cui-dharwad",
    cat: "cuisine",
    diff: "medium",
    q: { en: "Which city gives its name to a famous GI-tagged milk-based peda?", kn: "ಪ್ರಸಿದ್ಧ ಜಿಐ ಟ್ಯಾಗ್ ಪಡೆದ ಹಾಲಿನ ಪೇಡ ಯಾವ ನಗರದ ಹೆಸರಿನದು?" },
    options: { en: ["Dharwad", "Belagavi", "Mysuru", "Udupi"], kn: ["ಧಾರವಾಡ", "ಬೆಳಗಾವಿ", "ಮೈಸೂರು", "ಉಡುಪಿ"] },
    answer: 0,
    explain: { en: "Dharwad peda has a Geographical Indication tag.", kn: "ಧಾರವಾಡ ಪೇಡಕ್ಕೆ ಭೌಗೋಳಿಕ ಸೂಚಕ (ಜಿಐ) ಟ್ಯಾಗ್ ಇದೆ." },
    wiki: "Dharwad pedha",
  },
  {
    id: "cui-udupi",
    cat: "cuisine",
    diff: "medium",
    q: { en: "Udupi cuisine is traditionally which type of food?", kn: "ಉಡುಪಿ ಆಹಾರ ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಯಾವ ಬಗೆಯದು?" },
    options: { en: ["Vegetarian (Sattvik)", "Seafood-based", "Meat-heavy", "Fermented only"], kn: ["ಸಸ್ಯಾಹಾರ (ಸಾತ್ವಿಕ)", "ಸಮುದ್ರಾಹಾರ", "ಮಾಂಸಾಹಾರ", "ಹುಳಿ ಮಾತ್ರ"] },
    answer: 0,
    explain: { en: "Udupi cuisine, tied to the Krishna Matha, is strictly vegetarian.", kn: "ಕೃಷ್ಣ ಮಠಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಉಡುಪಿ ಆಹಾರ ಸಂಪೂರ್ಣ ಸಸ್ಯಾಹಾರ." },
    wiki: "Udupi cuisine",
  },
  /* ── Wildlife ────────────────────────────────────────── */
  {
    id: "wil-kabini",
    cat: "wildlife",
    diff: "hard",
    q: { en: "The Kabini backwaters are famous for sightings of which rare black big cat?", kn: "ಕಬಿನಿ ಹಿನ್ನೀರು ಯಾವ ಅಪರೂಪದ ಕಪ್ಪು ದೊಡ್ಡ ಬೆಕ್ಕಿನ ದರ್ಶನಕ್ಕೆ ಪ್ರಸಿದ್ಧ?" },
    options: { en: ["Black panther", "Snow leopard", "Cheetah", "White tiger"], kn: ["ಕಪ್ಪು ಚಿರತೆ", "ಹಿಮ ಚಿರತೆ", "ಚೀತಾ", "ಬಿಳಿ ಹುಲಿ"] },
    answer: 0,
    explain: { en: "Kabini is renowned for its melanistic (black) leopard sightings.", kn: "ಕಬಿನಿ ಕಪ್ಪು ಚಿರತೆಯ ದರ್ಶನಕ್ಕೆ ಹೆಸರುವಾಸಿ." },
    wiki: "Kabini",
  },
  {
    id: "wil-jog-ghats",
    cat: "wildlife",
    diff: "medium",
    q: { en: "Karnataka's biodiverse mountain range, a UNESCO hotspot, is called the?", kn: "ಯುನೆಸ್ಕೊ ಜೀವವೈವಿಧ್ಯ ತಾಣವಾದ ಕರ್ನಾಟಕದ ಪರ್ವತ ಶ್ರೇಣಿ ಯಾವುದು?" },
    options: { en: ["Western Ghats", "Aravallis", "Nilgiris only", "Satpuras"], kn: ["ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು", "ಅರಾವಳಿ", "ನೀಲಗಿರಿ ಮಾತ್ರ", "ಸಾತ್ಪುರ"] },
    answer: 0,
    explain: { en: "The Western Ghats are among the world's eight 'hottest' biodiversity hotspots.", kn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು ವಿಶ್ವದ ಪ್ರಮುಖ ಜೀವವೈವಿಧ್ಯ ತಾಣಗಳಲ್ಲಿ ಒಂದು." },
    wiki: "Western Ghats",
  },
  /* ── Culture ─────────────────────────────────────────── */
  {
    id: "cul-bidriware",
    cat: "culture",
    diff: "hard",
    q: { en: "Bidriware, a striking silver-inlay metal craft, originates from which city?", kn: "ಬೆಳ್ಳಿ ಕೆತ್ತನೆಯ ಬಿದ್ರಿ ಕಲೆ ಯಾವ ನಗರದ್ದು?" },
    options: { en: ["Bidar", "Mysuru", "Channapatna", "Ilkal"], kn: ["ಬೀದರ್", "ಮೈಸೂರು", "ಚನ್ನಪಟ್ಟಣ", "ಇಳಕಲ್"] },
    answer: 0,
    explain: { en: "Bidriware, a GI craft, is named after Bidar.", kn: "ಜಿಐ ಕಲೆ ಬಿದ್ರಿವೇರ್ ಬೀದರಿನ ಹೆಸರಿನದು." },
    wiki: "Bidriware",
  },
  {
    id: "cul-ilkal",
    cat: "culture",
    diff: "medium",
    q: { en: "The Ilkal and Molakalmuru names are famous for which handloom product?", kn: "ಇಳಕಲ್ ಮತ್ತು ಮೊಳಕಾಲ್ಮುರು ಯಾವ ಕೈಮಗ್ಗ ಉತ್ಪನ್ನಕ್ಕೆ ಪ್ರಸಿದ್ಧ?" },
    options: { en: ["Sarees", "Carpets", "Toys", "Pottery"], kn: ["ಸೀರೆಗಳು", "ಜಮಖಾನ", "ಗೊಂಬೆಗಳು", "ಮಡಕೆ"] },
    answer: 0,
    explain: { en: "Ilkal sarees are a celebrated Karnataka handloom tradition.", kn: "ಇಳಕಲ್ ಸೀರೆಗಳು ಕರ್ನಾಟಕದ ಪ್ರಸಿದ್ಧ ಕೈಮಗ್ಗ ಪರಂಪರೆ." },
    wiki: "Ilkal saree",
  },
  /* ── Dance ───────────────────────────────────────────── */
  {
    id: "dan-veeragase",
    cat: "dance",
    diff: "medium",
    q: { en: "Veeragase, a vigorous dance, is associated with the worship of which deity?", kn: "ಶಕ್ತಿಶಾಲಿ ನೃತ್ಯ ವೀರಗಾಸೆ ಯಾವ ದೇವರ ಆರಾಧನೆಗೆ ಸಂಬಂಧಿಸಿದೆ?" },
    options: { en: ["Veerabhadra", "Vishnu", "Ganesha", "Surya"], kn: ["ವೀರಭದ್ರ", "ವಿಷ್ಣು", "ಗಣೇಶ", "ಸೂರ್ಯ"] },
    answer: 0,
    explain: { en: "Veeragase is a Shaivite dance honouring Veerabhadra, performed in Dasara.", kn: "ವೀರಗಾಸೆ ವೀರಭದ್ರನನ್ನು ಗೌರವಿಸುವ ಶೈವ ನೃತ್ಯ." },
    wiki: "Veeragase",
  },
  {
    id: "dan-kamsale",
    cat: "dance",
    diff: "hard",
    q: { en: "Kamsale is a folk dance-and-percussion tradition tied to the worship of which deity?", kn: "ಕಂಸಾಳೆ ಯಾವ ದೇವರ ಆರಾಧನೆಗೆ ಸಂಬಂಧಿಸಿದ ಜಾನಪದ ನೃತ್ಯ?" },
    options: { en: ["Mahadeshwara", "Manjunatha", "Chamundeshwari", "Anjaneya"], kn: ["ಮಹದೇಶ್ವರ", "ಮಂಜುನಾಥ", "ಚಾಮುಂಡೇಶ್ವರಿ", "ಆಂಜನೇಯ"] },
    answer: 0,
    explain: { en: "Kamsale is linked to Male Mahadeshwara devotion in southern Karnataka.", kn: "ಕಂಸಾಳೆ ಮಲೆ ಮಹದೇಶ್ವರ ಭಕ್ತಿಗೆ ಸಂಬಂಧಿಸಿದೆ." },
    wiki: "Kamsale",
  },
  /* ── Music ───────────────────────────────────────────── */
  {
    id: "mus-kanaka",
    cat: "music",
    diff: "medium",
    q: { en: "Which Haridasa saint-poet is remembered for the Kanakana Kindi at Udupi?", kn: "ಉಡುಪಿಯ ಕನಕನ ಕಿಂಡಿಗೆ ಸಂಬಂಧಿಸಿದ ಹರಿದಾಸ ಸಂತ-ಕವಿ ಯಾರು?" },
    options: { en: ["Kanaka Dasa", "Purandara Dasa", "Vadiraja", "Vijaya Dasa"], kn: ["ಕನಕ ದಾಸ", "ಪುರಂದರ ದಾಸ", "ವಾದಿರಾಜ", "ವಿಜಯ ದಾಸ"] },
    answer: 0,
    explain: { en: "Legend says Krishna turned to give darshan to Kanaka Dasa through the Kanakana Kindi.", kn: "ಕನಕ ದಾಸರಿಗೆ ಕನಕನ ಕಿಂಡಿಯ ಮೂಲಕ ಕೃಷ್ಣ ದರ್ಶನ ನೀಡಿದನೆಂಬ ನಂಬಿಕೆ." },
    wiki: "Kanaka Dasa",
  },
  {
    id: "mus-bhimsen",
    cat: "music",
    diff: "hard",
    q: { en: "Bharat Ratna vocalist Bhimsen Joshi belonged to which gharana rooted in Karnataka?", kn: "ಭಾರತ ರತ್ನ ಗಾಯಕ ಭೀಮಸೇನ್ ಜೋಶಿ ಯಾವ ಘರಾನಾದವರು?" },
    options: { en: ["Kirana", "Gwalior", "Jaipur", "Rampur"], kn: ["ಕಿರಾಣಾ", "ಗ್ವಾಲಿಯರ್", "ಜೈಪುರ", "ರಾಂಪುರ"] },
    answer: 0,
    explain: { en: "Bhimsen Joshi, from Gadag, was a titan of the Kirana gharana.", kn: "ಗದಗಿನ ಭೀಮಸೇನ್ ಜೋಶಿ ಕಿರಾಣಾ ಘರಾನಾದ ದಿಗ್ಗಜ." },
    wiki: "Bhimsen Joshi",
  },
  /* ── ISRO & Science ──────────────────────────────────── */
  {
    id: "isr-cnr",
    cat: "isro",
    diff: "medium",
    q: { en: "Which Bharat Ratna chemist from Bengaluru is a global authority on solid-state materials?", kn: "ಬೆಂಗಳೂರಿನ ಯಾವ ಭಾರತ ರತ್ನ ರಸಾಯನಶಾಸ್ತ್ರಜ್ಞ ಘನ-ಸ್ಥಿತಿ ವಸ್ತುಗಳ ಜಾಗತಿಕ ಪ್ರಾಧಿಕಾರ?" },
    options: { en: ["C. N. R. Rao", "C. V. Raman", "Raja Ramanna", "U. R. Rao"], kn: ["ಸಿ.ಎನ್.ಆರ್. ರಾವ್", "ಸಿ.ವಿ. ರಾಮನ್", "ರಾಜಾ ರಾಮಣ್ಣ", "ಯು.ಆರ್. ರಾವ್"] },
    answer: 0,
    explain: { en: "C. N. R. Rao, a Bharat Ratna, is a pioneer of solid-state and materials chemistry.", kn: "ಭಾರತ ರತ್ನ ಸಿ.ಎನ್.ಆರ್. ರಾವ್ ಘನ-ಸ್ಥಿತಿ ರಸಾಯನಶಾಸ್ತ್ರದ ಪ್ರವರ್ತಕ." },
    wiki: "C. N. R. Rao",
  },
  {
    id: "isr-mangalyaan",
    cat: "isro",
    diff: "medium",
    q: { en: "India's Mars Orbiter Mission (2013), managed from Bengaluru, is nicknamed?", kn: "ಬೆಂಗಳೂರಿನಿಂದ ನಿರ್ವಹಿಸಲ್ಪಟ್ಟ ಭಾರತದ ಮಂಗಳ ಯಾನ (೨೦೧೩) ಅಡ್ಡಹೆಸರು?" },
    options: { en: ["Mangalyaan", "Gaganyaan", "Aditya", "Shukrayaan"], kn: ["ಮಂಗಳಯಾನ", "ಗಗನಯಾನ", "ಆದಿತ್ಯ", "ಶುಕ್ರಯಾನ"] },
    answer: 0,
    explain: { en: "Mangalyaan made India the first nation to reach Mars orbit on its first attempt.", kn: "ಮೊದಲ ಪ್ರಯತ್ನದಲ್ಲೇ ಮಂಗಳ ಕಕ್ಷೆ ತಲುಪಿದ ಮೊದಲ ದೇಶ ಭಾರತ." },
    wiki: "Mars Orbiter Mission",
  },
  /* ── Bengaluru ───────────────────────────────────────── */
  {
    id: "ben-towers",
    cat: "bengaluru",
    diff: "medium",
    q: { en: "Kempegowda built four watchtowers to mark the intended limits of which city?", kn: "ಯಾವ ನಗರದ ಎಲ್ಲೆ ಗುರುತಿಸಲು ಕೆಂಪೇಗೌಡ ನಾಲ್ಕು ಕಾವಲು ಗೋಪುರ ಕಟ್ಟಿಸಿದರು?" },
    options: { en: ["Bengaluru", "Mysuru", "Tumakuru", "Kolar"], kn: ["ಬೆಂಗಳೂರು", "ಮೈಸೂರು", "ತುಮಕೂರು", "ಕೋಲಾರ"] },
    answer: 0,
    explain: { en: "Kempegowda II's four towers marked Bengaluru's boundaries — long since outgrown.", kn: "ಎರಡನೇ ಕೆಂಪೇಗೌಡನ ನಾಲ್ಕು ಗೋಪುರ ಬೆಂಗಳೂರಿನ ಎಲ್ಲೆ ಗುರುತಿಸಿದವು." },
    wiki: "Kempegowda tower",
  },
  {
    id: "ben-cubbon",
    cat: "bengaluru",
    diff: "easy",
    q: { en: "Which large green park lies in the heart of Bengaluru near Vidhana Soudha?", kn: "ವಿಧಾನಸೌಧದ ಬಳಿ ಬೆಂಗಳೂರಿನ ಹೃದಯಭಾಗದಲ್ಲಿರುವ ದೊಡ್ಡ ಹಸಿರು ಉದ್ಯಾನ ಯಾವುದು?" },
    options: { en: ["Cubbon Park", "Lalbagh", "Lumbini", "Freedom Park"], kn: ["ಕಬ್ಬನ್ ಪಾರ್ಕ್", "ಲಾಲ್‌ಬಾಗ್", "ಲುಂಬಿನಿ", "ಫ್ರೀಡಂ ಪಾರ್ಕ್"] },
    answer: 0,
    explain: { en: "Cubbon Park is a historic green lung beside the state's civic buildings.", kn: "ಕಬ್ಬನ್ ಪಾರ್ಕ್ ಸರ್ಕಾರಿ ಕಟ್ಟಡಗಳ ಪಕ್ಕದ ಐತಿಹಾಸಿಕ ಹಸಿರು ಪ್ರದೇಶ." },
    wiki: "Cubbon Park",
  },
  /* ── Temples ─────────────────────────────────────────── */
  {
    id: "tem-hoysaleswara",
    cat: "temples",
    diff: "medium",
    q: { en: "The twin-shrine Hoysaleswara temple is located at which town?", kn: "ಅವಳಿ ಗರ್ಭಗುಡಿಯ ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ ಯಾವ ಊರಿನಲ್ಲಿದೆ?" },
    options: { en: ["Halebidu", "Belur", "Somnathpur", "Sringeri"], kn: ["ಹಳೇಬೀಡು", "ಬೇಲೂರು", "ಸೋಮನಾಥಪುರ", "ಶೃಂಗೇರಿ"] },
    answer: 0,
    explain: { en: "The Hoysaleswara temple at Halebidu is famed for its dense carvings.", kn: "ಹಳೇಬೀಡಿನ ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ ದಟ್ಟ ಕೆತ್ತನೆಗೆ ಪ್ರಸಿದ್ಧ." },
    wiki: "Hoysaleswara Temple",
  },
  {
    id: "tem-somnathpur",
    cat: "temples",
    diff: "hard",
    q: { en: "The star-shaped Chennakeshava temple at Somanathapura was built under which empire?", kn: "ಸೋಮನಾಥಪುರದ ನಕ್ಷತ್ರಾಕಾರ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ಯಾವ ಸಾಮ್ರಾಜ್ಯದಲ್ಲಿ ಕಟ್ಟಲಾಯಿತು?" },
    options: { en: ["Hoysala", "Vijayanagara", "Chalukya", "Ganga"], kn: ["ಹೊಯ್ಸಳ", "ವಿಜಯನಗರ", "ಚಾಲುಕ್ಯ", "ಗಂಗ"] },
    answer: 0,
    explain: { en: "Somanathapura (1268 CE) is a Hoysala masterpiece and a UNESCO-listed temple.", kn: "ಸೋಮನಾಥಪುರ (೧೨೬೮) ಹೊಯ್ಸಳ ಶ್ರೇಷ್ಠಕೃತಿ, ಯುನೆಸ್ಕೊ ಪಟ್ಟಿಯಲ್ಲಿದೆ." },
    wiki: "Chennakesava Temple, Somanathapura",
  },
  {
    id: "tem-dharmasthala",
    cat: "temples",
    diff: "medium",
    q: { en: "Dharmasthala is a unique temple town where a Shiva shrine is administered by a family of which faith?", kn: "ಧರ್ಮಸ್ಥಳದ ಶಿವ ದೇಗುಲವನ್ನು ಯಾವ ಧರ್ಮದ ಕುಟುಂಬ ನಿರ್ವಹಿಸುತ್ತದೆ?" },
    options: { en: ["Jain", "Buddhist", "Sikh", "Christian"], kn: ["ಜೈನ", "ಬೌದ್ಧ", "ಸಿಖ್", "ಕ್ರೈಸ್ತ"] },
    answer: 0,
    explain: { en: "At Dharmasthala a Jain Heggade family administers the temple, with Vaishnava priests — a symbol of harmony.", kn: "ಧರ್ಮಸ್ಥಳದಲ್ಲಿ ಜೈನ ಹೆಗ್ಗಡೆ ಕುಟುಂಬ ದೇಗುಲ ನಿರ್ವಹಿಸುತ್ತದೆ — ಸೌಹಾರ್ದದ ಸಂಕೇತ." },
    wiki: "Dharmasthala Temple",
  },
  /* ── Personalities ───────────────────────────────────── */
  {
    id: "per-puttanna",
    cat: "personalities",
    diff: "hard",
    q: { en: "Who is the acclaimed Kannada film director known for classics like 'Nagarahavu'?", kn: "'ನಾಗರಹಾವು' ಮುಂತಾದ ಶ್ರೇಷ್ಠ ಚಿತ್ರಗಳ ಪ್ರಸಿದ್ಧ ಕನ್ನಡ ನಿರ್ದೇಶಕ ಯಾರು?" },
    options: { en: ["Puttanna Kanagal", "Girish Kasaravalli", "Shankar Nag", "T. S. Nagabharana"], kn: ["ಪುಟ್ಟಣ್ಣ ಕಣಗಾಲ್", "ಗಿರೀಶ್ ಕಾಸರವಳ್ಳಿ", "ಶಂಕರ್ ನಾಗ್", "ಟಿ.ಎಸ್. ನಾಗಾಭರಣ"] },
    answer: 0,
    explain: { en: "Puttanna Kanagal is a legendary figure of Kannada cinema's golden era.", kn: "ಪುಟ್ಟಣ್ಣ ಕಣಗಾಲ್ ಕನ್ನಡ ಚಿತ್ರರಂಗದ ಸುವರ್ಣ ಯುಗದ ದಂತಕಥೆ." },
    wiki: "Puttanna Kanagal",
  },
  {
    id: "per-anilkumble",
    cat: "personalities",
    diff: "easy",
    q: { en: "Which Bengaluru cricketer took all 10 wickets in a Test innings (1999)?", kn: "೧೯೯೯ರಲ್ಲಿ ಒಂದೇ ಟೆಸ್ಟ್ ಇನ್ನಿಂಗ್ಸ್‌ನಲ್ಲಿ ೧೦ ವಿಕೆಟ್ ಪಡೆದ ಬೆಂಗಳೂರಿನ ಕ್ರಿಕೆಟಿಗ ಯಾರು?" },
    options: { en: ["Anil Kumble", "Rahul Dravid", "Javagal Srinath", "G. R. Vishwanath"], kn: ["ಅನಿಲ್ ಕುಂಬ್ಳೆ", "ರಾಹುಲ್ ದ್ರಾವಿಡ್", "ಜವಗಲ್ ಶ್ರೀನಾಥ್", "ಜಿ.ಆರ್. ವಿಶ್ವನಾಥ್"] },
    answer: 0,
    explain: { en: "Anil Kumble took 10/74 vs Pakistan in Delhi, 1999 — only the second in Test history.", kn: "ಅನಿಲ್ ಕುಂಬ್ಳೆ ೧೯೯೯ರಲ್ಲಿ ೧೦/೭೪ ಪಡೆದರು — ಟೆಸ್ಟ್ ಇತಿಹಾಸದ ಎರಡನೇ ಬಾರಿ." },
    wiki: "Anil Kumble",
  },
  {
    id: "per-dravid",
    cat: "personalities",
    diff: "medium",
    q: { en: "Which Bengaluru batsman is nicknamed 'The Wall' of Indian cricket?", kn: "ಭಾರತ ಕ್ರಿಕೆಟ್‌ನ 'ಗೋಡೆ' ಎಂದು ಕರೆಯಲ್ಪಡುವ ಬೆಂಗಳೂರಿನ ಬ್ಯಾಟ್ಸ್‌ಮನ್ ಯಾರು?" },
    options: { en: ["Rahul Dravid", "Anil Kumble", "K. L. Rahul", "Robin Uthappa"], kn: ["ರಾಹುಲ್ ದ್ರಾವಿಡ್", "ಅನಿಲ್ ಕುಂಬ್ಳೆ", "ಕೆ.ಎಲ್. ರಾಹುಲ್", "ರಾಬಿನ್ ಉತ್ತಪ್ಪ"] },
    answer: 0,
    explain: { en: "Rahul Dravid, 'The Wall', is one of Test cricket's greatest batsmen.", kn: "ರಾಹುಲ್ ದ್ರಾವಿಡ್ 'ಗೋಡೆ' — ಟೆಸ್ಟ್ ಕ್ರಿಕೆಟ್‌ನ ಶ್ರೇಷ್ಠ ಬ್ಯಾಟ್ಸ್‌ಮನ್." },
    wiki: "Rahul Dravid",
  },
  /* ── Karnataka Today ─────────────────────────────────── */
  {
    id: "tod-rajyotsava",
    cat: "today",
    diff: "easy",
    q: { en: "Kannada Rajyotsava (Karnataka Formation Day) is celebrated on which date?", kn: "ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ ಯಾವ ದಿನಾಂಕದಂದು ಆಚರಿಸಲಾಗುತ್ತದೆ?" },
    options: { en: ["1 November", "15 August", "26 January", "1 May"], kn: ["ನವೆಂಬರ್ ೧", "ಆಗಸ್ಟ್ ೧೫", "ಜನವರಿ ೨೬", "ಮೇ ೧"] },
    answer: 0,
    explain: { en: "Karnataka was unified on 1 November 1956 — celebrated as Rajyotsava.", kn: "ಕರ್ನಾಟಕ ೧೯೫೬ ನವೆಂಬರ್ ೧ರಂದು ಏಕೀಕೃತ — ರಾಜ್ಯೋತ್ಸವ." },
    wiki: "Karnataka Rajyotsava",
  },
  {
    id: "tod-emblem",
    cat: "today",
    diff: "hard",
    q: { en: "The mythical two-headed bird on Karnataka's state emblem is called?", kn: "ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಲಾಂಛನದ ಎರಡು ತಲೆಯ ಪೌರಾಣಿಕ ಪಕ್ಷಿ ಯಾವುದು?" },
    options: { en: ["Gandaberunda", "Garuda", "Hamsa", "Mayura"], kn: ["ಗಂಡಬೇರುಂಡ", "ಗರುಡ", "ಹಂಸ", "ಮಯೂರ"] },
    answer: 0,
    explain: { en: "The Gandaberunda, a two-headed eagle, is Karnataka's state emblem, from Wadiyar heraldry.", kn: "ಎರಡು ತಲೆಯ ಗಂಡಬೇರುಂಡ ಕರ್ನಾಟಕದ ರಾಜ್ಯ ಲಾಂಛನ." },
    wiki: "Gandaberunda",
  },
  {
    id: "tod-language-official",
    cat: "today",
    diff: "easy",
    q: { en: "What is the official language of Karnataka?", kn: "ಕರ್ನಾಟಕದ ಅಧಿಕೃತ ಭಾಷೆ ಯಾವುದು?" },
    options: { en: ["Kannada", "Hindi", "Tulu", "Telugu"], kn: ["ಕನ್ನಡ", "ಹಿಂದಿ", "ತುಳು", "ತೆಲುಗು"] },
    answer: 0,
    explain: { en: "Kannada is the official language of Karnataka.", kn: "ಕನ್ನಡ ಕರ್ನಾಟಕದ ಅಧಿಕೃತ ಭಾಷೆ." },
    wiki: "Karnataka",
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
