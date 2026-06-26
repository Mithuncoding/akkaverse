/**
 * Curated Karnataka heritage timeline data.
 *
 * This is the single source of truth for the Heritage Timeline feature.
 * Keeping it as typed, structured data (instead of hardcoded JSX) means the
 * same dataset can later be:
 *   - served from the FastAPI backend / database,
 *   - indexed into the vector store for RAG,
 *   - reused by the Explorer and Quiz features.
 *
 * Each entry is intentionally sourced from well-known historical milestones.
 */

export type Era =
  | "Ancient"
  | "Classical"
  | "Medieval"
  | "Vijayanagara"
  | "Mysore"
  | "Modern";

export type TimelineEvent = {
  id: string;
  /** Display year label, e.g. "345 CE" or "c. 850 CE" */
  year: string;
  /** Numeric sort key (negative = BCE) */
  sortYear: number;
  era: Era;
  title: string;
  description: string;
  /** Kannada title (falls back to English if absent) */
  titleKn?: string;
  /** Kannada description (falls back to English if absent) */
  descriptionKn?: string;
  /** Optional place to anchor the event geographically (used later by Explorer) */
  place?: string;
  /** Optional notable figure connected to the event */
  figure?: string;
};

/** Visual identity per era — drives chip + accent colors in the UI. */
export const ERA_META: Record<Era, { label: string; dot: string; chip: string }> = {
  Ancient: {
    label: "Ancient",
    dot: "bg-amber-500",
    chip: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
  },
  Classical: {
    label: "Classical",
    dot: "bg-orange-500",
    chip: "bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20",
  },
  Medieval: {
    label: "Medieval",
    dot: "bg-rose-500",
    chip: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20",
  },
  Vijayanagara: {
    label: "Vijayanagara",
    dot: "bg-violet-500",
    chip: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
  },
  Mysore: {
    label: "Mysore",
    dot: "bg-emerald-500",
    chip: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
  },
  Modern: {
    label: "Modern",
    dot: "bg-sky-500",
    chip: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/20",
  },
};

export const ERAS: Era[] = [
  "Ancient",
  "Classical",
  "Medieval",
  "Vijayanagara",
  "Mysore",
  "Modern",
];

export const timelineEvents: TimelineEvent[] = [
  {
    id: "kadamba-banavasi",
    year: "345 CE",
    sortYear: 345,
    era: "Ancient",
    title: "Kadamba dynasty founded at Banavasi",
    description:
      "Mayurasharma established the Kadamba kingdom — the first native power of Karnataka and among the earliest to use Kannada for administration.",
    titleKn: "ಬನವಾಸಿಯಲ್ಲಿ ಕದಂಬ ರಾಜವಂಶ ಸ್ಥಾಪನೆ",
    descriptionKn:
      "ಮಯೂರಶರ್ಮ ಕದಂಬ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಸ್ಥಾಪಿಸಿದರು — ಕರ್ನಾಟಕದ ಮೊದಲ ಸ್ಥಳೀಯ ಶಕ್ತಿ ಮತ್ತು ಆಡಳಿತದಲ್ಲಿ ಕನ್ನಡವನ್ನು ಬಳಸಿದ ಮೊದಲಿಗರಲ್ಲಿ ಒಂದು.",
    place: "Banavasi",
    figure: "Mayurasharma",
  },
  {
    id: "badami-chalukyas",
    year: "543 CE",
    sortYear: 543,
    era: "Classical",
    title: "Badami Chalukyas rise to power",
    description:
      "Pulakeshin I founded the Chalukya dynasty at Vatapi (Badami), ushering in a golden age of rock-cut temple architecture.",
    titleKn: "ಬಾದಾಮಿ ಚಾಲುಕ್ಯರ ಉದಯ",
    descriptionKn:
      "ಒಂದನೇ ಪುಲಕೇಶಿ ವಾತಾಪಿ (ಬಾದಾಮಿ)ಯಲ್ಲಿ ಚಾಲುಕ್ಯ ರಾಜವಂಶವನ್ನು ಸ್ಥಾಪಿಸಿ, ಶಿಲಾ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ಸುವರ್ಣಯುಗಕ್ಕೆ ನಾಂದಿ ಹಾಡಿದರು.",
    place: "Badami",
    figure: "Pulakeshin I",
  },
  {
    id: "aihole-inscription",
    year: "634 CE",
    sortYear: 634,
    era: "Classical",
    title: "The Aihole inscription",
    description:
      "Composed by the poet Ravikirti, it celebrates Pulakeshin II and is a landmark of early Kannada-region epigraphy.",
    titleKn: "ಐಹೊಳೆ ಶಾಸನ",
    descriptionKn:
      "ಕವಿ ರವಿಕೀರ್ತಿ ರಚಿಸಿದ ಈ ಶಾಸನ ಎರಡನೇ ಪುಲಕೇಶಿಯನ್ನು ಕೊಂಡಾಡುತ್ತದೆ ಮತ್ತು ಆರಂಭಿಕ ಕನ್ನಡ ನಾಡಿನ ಶಾಸನಶಾಸ್ತ್ರದ ಮೈಲಿಗಲ್ಲು.",
    place: "Aihole",
    figure: "Pulakeshin II",
  },
  {
    id: "kavirajamarga",
    year: "c. 850 CE",
    sortYear: 850,
    era: "Classical",
    title: "Kavirajamarga — earliest Kannada literature",
    description:
      "Written under the Rashtrakuta emperor Amoghavarsha I, it is the oldest surviving literary work in Kannada, on poetics and grammar.",
    titleKn: "ಕವಿರಾಜಮಾರ್ಗ — ಅತ್ಯಂತ ಹಳೆಯ ಕನ್ನಡ ಸಾಹಿತ್ಯ",
    descriptionKn:
      "ರಾಷ್ಟ್ರಕೂಟ ಚಕ್ರವರ್ತಿ ಒಂದನೇ ಅಮೋಘವರ್ಷನ ಕಾಲದಲ್ಲಿ ರಚಿತವಾದ, ಕಾವ್ಯ ಮತ್ತು ವ್ಯಾಕರಣದ ಮೇಲಿನ ಕನ್ನಡದ ಅತ್ಯಂತ ಹಳೆಯ ಲಭ್ಯ ಕೃತಿ.",
    figure: "Amoghavarsha I",
  },
  {
    id: "basavanna-vachana",
    year: "c. 1160 CE",
    sortYear: 1160,
    era: "Medieval",
    title: "Basavanna & the Vachana movement",
    description:
      "Basavanna led a social-spiritual revolution promoting equality, devotion, and the Kannada Vachana poetry of the Sharanas.",
    titleKn: "ಬಸವಣ್ಣ ಮತ್ತು ವಚನ ಚಳವಳಿ",
    descriptionKn:
      "ಬಸವಣ್ಣ ಸಮಾನತೆ, ಭಕ್ತಿ ಮತ್ತು ಶರಣರ ಕನ್ನಡ ವಚನ ಸಾಹಿತ್ಯವನ್ನು ಪ್ರಚಾರ ಮಾಡುವ ಸಾಮಾಜಿಕ-ಆಧ್ಯಾತ್ಮಿಕ ಕ್ರಾಂತಿಯನ್ನು ಮುನ್ನಡೆಸಿದರು.",
    place: "Kalyana (Basavakalyan)",
    figure: "Basavanna",
  },
  {
    id: "hoysala-belur",
    year: "1117 CE",
    sortYear: 1117,
    era: "Medieval",
    title: "Hoysalas build the Chennakeshava Temple, Belur",
    description:
      "Under Vishnuvardhana, Hoysala artisans created intricately carved soapstone temples that remain masterpieces of Indian art.",
    titleKn: "ಹೊಯ್ಸಳರಿಂದ ಬೇಲೂರಿನ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ನಿರ್ಮಾಣ",
    descriptionKn:
      "ವಿಷ್ಣುವರ್ಧನನ ಕಾಲದಲ್ಲಿ ಹೊಯ್ಸಳ ಶಿಲ್ಪಿಗಳು ಭಾರತೀಯ ಕಲೆಯ ಮೇರುಕೃತಿಗಳಾದ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಯ ಬಳಪದ ಕಲ್ಲಿನ ದೇವಾಲಯಗಳನ್ನು ನಿರ್ಮಿಸಿದರು.",
    place: "Belur",
    figure: "Vishnuvardhana",
  },
  {
    id: "vijayanagara-founded",
    year: "1336 CE",
    sortYear: 1336,
    era: "Vijayanagara",
    title: "Vijayanagara Empire founded at Hampi",
    description:
      "Harihara I and Bukka Raya founded one of South India's greatest empires, with Hampi (Vijayanagara) as its magnificent capital.",
    titleKn: "ಹಂಪಿಯಲ್ಲಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ ಸ್ಥಾಪನೆ",
    descriptionKn:
      "ಒಂದನೇ ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕರಾಯ ದಕ್ಷಿಣ ಭಾರತದ ಶ್ರೇಷ್ಠ ಸಾಮ್ರಾಜ್ಯಗಳಲ್ಲಿ ಒಂದನ್ನು ಸ್ಥಾಪಿಸಿದರು, ಹಂಪಿ (ವಿಜಯನಗರ) ಅದರ ವೈಭವಯುತ ರಾಜಧಾನಿ.",
    place: "Hampi",
    figure: "Harihara I & Bukka Raya",
  },
  {
    id: "krishnadevaraya",
    year: "1509 CE",
    sortYear: 1509,
    era: "Vijayanagara",
    title: "Krishnadevaraya's golden age",
    description:
      "The coronation of Krishnadevaraya marked the empire's zenith in art, literature, trade, and temple-building.",
    titleKn: "ಕೃಷ್ಣದೇವರಾಯನ ಸುವರ್ಣಯುಗ",
    descriptionKn:
      "ಕೃಷ್ಣದೇವರಾಯನ ಪಟ್ಟಾಭಿಷೇಕ ಕಲೆ, ಸಾಹಿತ್ಯ, ವ್ಯಾಪಾರ ಮತ್ತು ದೇವಾಲಯ ನಿರ್ಮಾಣದಲ್ಲಿ ಸಾಮ್ರಾಜ್ಯದ ಉತ್ತುಂಗವನ್ನು ಗುರುತಿಸಿತು.",
    place: "Hampi",
    figure: "Krishnadevaraya",
  },
  {
    id: "talikota",
    year: "1565 CE",
    sortYear: 1565,
    era: "Vijayanagara",
    title: "Battle of Talikota",
    description:
      "A coalition of Deccan sultanates defeated Vijayanagara, leading to the decline and sacking of Hampi.",
    titleKn: "ತಾಳೀಕೋಟೆ ಯುದ್ಧ",
    descriptionKn:
      "ಡೆಕ್ಕನ್ ಸುಲ್ತಾನರ ಒಕ್ಕೂಟ ವಿಜಯನಗರವನ್ನು ಸೋಲಿಸಿತು, ಇದು ಹಂಪಿಯ ಅವನತಿ ಮತ್ತು ನಾಶಕ್ಕೆ ಕಾರಣವಾಯಿತು.",
    place: "Talikota",
  },
  {
    id: "wodeyar-mysore",
    year: "1399 CE",
    sortYear: 1399,
    era: "Mysore",
    title: "Wodeyar dynasty of Mysore begins",
    description:
      "The Wodeyars established the kingdom of Mysore, which would shape Karnataka's culture, music, and Dasara traditions for centuries.",
    titleKn: "ಮೈಸೂರಿನ ಒಡೆಯರ್ ರಾಜವಂಶ ಆರಂಭ",
    descriptionKn:
      "ಒಡೆಯರ್‌ಗಳು ಮೈಸೂರು ಸಂಸ್ಥಾನವನ್ನು ಸ್ಥಾಪಿಸಿದರು, ಇದು ಶತಮಾನಗಳ ಕಾಲ ಕರ್ನಾಟಕದ ಸಂಸ್ಕೃತಿ, ಸಂಗೀತ ಮತ್ತು ದಸರಾ ಸಂಪ್ರದಾಯಗಳನ್ನು ರೂಪಿಸಿತು.",
    place: "Mysore",
  },
  {
    id: "tipu-sultan",
    year: "1782 CE",
    sortYear: 1782,
    era: "Mysore",
    title: "Reign of Tipu Sultan",
    description:
      "The 'Tiger of Mysore' modernised the army, pioneered rocket artillery, and fiercely resisted British expansion.",
    titleKn: "ಟಿಪ್ಪು ಸುಲ್ತಾನನ ಆಳ್ವಿಕೆ",
    descriptionKn:
      "'ಮೈಸೂರು ಹುಲಿ' ಸೈನ್ಯವನ್ನು ಆಧುನೀಕರಿಸಿ, ರಾಕೆಟ್ ಫಿರಂಗಿಯನ್ನು ಪರಿಚಯಿಸಿ, ಬ್ರಿಟಿಷ್ ವಿಸ್ತರಣೆಯನ್ನು ತೀವ್ರವಾಗಿ ವಿರೋಧಿಸಿದರು.",
    place: "Srirangapatna",
    figure: "Tipu Sultan",
  },
  {
    id: "fall-srirangapatna",
    year: "1799 CE",
    sortYear: 1799,
    era: "Mysore",
    title: "Fall of Srirangapatna",
    description:
      "Tipu Sultan died defending his capital in the Fourth Anglo-Mysore War, a turning point in South Indian history.",
    titleKn: "ಶ್ರೀರಂಗಪಟ್ಟಣದ ಪತನ",
    descriptionKn:
      "ನಾಲ್ಕನೇ ಆಂಗ್ಲೋ-ಮೈಸೂರು ಯುದ್ಧದಲ್ಲಿ ತನ್ನ ರಾಜಧಾನಿಯನ್ನು ರಕ್ಷಿಸುತ್ತಾ ಟಿಪ್ಪು ಸುಲ್ತಾನ ಮಡಿದರು — ದಕ್ಷಿಣ ಭಾರತ ಇತಿಹಾಸದ ಮಹತ್ವದ ತಿರುವು.",
    place: "Srirangapatna",
  },
  {
    id: "mysore-state-1956",
    year: "1956 CE",
    sortYear: 1956,
    era: "Modern",
    title: "Unification — Mysore State formed",
    description:
      "The States Reorganisation Act united Kannada-speaking regions into a single state, fulfilling the dream of Karnataka Ekikarana.",
    titleKn: "ಏಕೀಕರಣ — ಮೈಸೂರು ರಾಜ್ಯ ರಚನೆ",
    descriptionKn:
      "ರಾಜ್ಯಗಳ ಪುನರ್ ರಚನೆ ಕಾಯ್ದೆ ಕನ್ನಡ ಮಾತನಾಡುವ ಪ್ರದೇಶಗಳನ್ನು ಒಂದೇ ರಾಜ್ಯವಾಗಿ ಒಗ್ಗೂಡಿಸಿ, ಕರ್ನಾಟಕ ಏಕೀಕರಣದ ಕನಸನ್ನು ನನಸಾಗಿಸಿತು.",
  },
  {
    id: "renamed-karnataka",
    year: "1973 CE",
    sortYear: 1973,
    era: "Modern",
    title: "Mysore State renamed Karnataka",
    description:
      "On 1 November 1973, the state was renamed Karnataka, celebrated annually as Kannada Rajyotsava.",
    titleKn: "ಮೈಸೂರು ರಾಜ್ಯ ಕರ್ನಾಟಕ ಎಂದು ಮರುನಾಮಕರಣ",
    descriptionKn:
      "1973ರ ನವೆಂಬರ್ 1ರಂದು ರಾಜ್ಯವನ್ನು ಕರ್ನಾಟಕ ಎಂದು ಮರುನಾಮಕರಣ ಮಾಡಲಾಯಿತು, ಇದನ್ನು ಪ್ರತಿವರ್ಷ ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವವಾಗಿ ಆಚರಿಸಲಾಗುತ್ತದೆ.",
  },
];
