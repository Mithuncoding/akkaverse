/**
 * "Daily Heritage" content pool.
 *
 * Each day surfaces one of each: a historical event, a famous person, a Kannada
 * proverb, a temple, and a word-of-the-day. We pick deterministically by the
 * day-of-year so the selection is stable for everyone on a given day (and easy
 * to demo) — no backend required for the hackathon build.
 */

export type DailyItem = {
  en: string;
  kn: string;
  /** optional sub-line (translation / meaning / year) */
  metaEn?: string;
  metaKn?: string;
};

export type DailyHeritage = {
  event: DailyItem;
  person: DailyItem;
  proverb: DailyItem;
  temple: DailyItem;
  word: DailyItem;
};

const pool: DailyHeritage[] = [
  {
    event: {
      en: "Vijayanagara Empire founded at Hampi (1336 CE)",
      kn: "ಹಂಪಿಯಲ್ಲಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ ಸ್ಥಾಪನೆ (1336)",
    },
    person: {
      en: "Krishnadevaraya",
      kn: "ಕೃಷ್ಣದೇವರಾಯ",
      metaEn: "Greatest Vijayanagara emperor",
      metaKn: "ವಿಜಯನಗರದ ಶ್ರೇಷ್ಠ ಚಕ್ರವರ್ತಿ",
    },
    proverb: {
      en: "Drops make an ocean.",
      kn: "ಹನಿ ಹನಿ ಸೇರಿ ಹಳ್ಳ.",
    },
    temple: {
      en: "Virupaksha Temple, Hampi",
      kn: "ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ, ಹಂಪಿ",
    },
    word: {
      en: "Friend",
      kn: "ಸ್ನೇಹಿತ",
      metaEn: "snēhita",
      metaKn: "snēhita",
    },
  },
  {
    event: {
      en: "Hoysalas build Chennakeshava Temple, Belur (1117 CE)",
      kn: "ಬೇಲೂರಿನ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ನಿರ್ಮಾಣ (1117)",
    },
    person: {
      en: "Basavanna",
      kn: "ಬಸವಣ್ಣ",
      metaEn: "12th-c. social reformer & poet",
      metaKn: "12ನೇ ಶತಮಾನದ ಸಮಾಜ ಸುಧಾರಕ",
    },
    proverb: {
      en: "A word is worth a thousand.",
      kn: "ಮಾತು ಮುತ್ತು.",
    },
    temple: {
      en: "Chennakeshava Temple, Belur",
      kn: "ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ, ಬೇಲೂರು",
    },
    word: {
      en: "Water",
      kn: "ನೀರು",
      metaEn: "nīru",
      metaKn: "nīru",
    },
  },
  {
    event: {
      en: "Kavirajamarga, oldest Kannada text, written (c. 850 CE)",
      kn: "ಅತ್ಯಂತ ಹಳೆಯ ಕನ್ನಡ ಕೃತಿ ಕವಿರಾಜಮಾರ್ಗ ರಚನೆ (ಸುಮಾರು 850)",
    },
    person: {
      en: "Pampa",
      kn: "ಪಂಪ",
      metaEn: "Adikavi, father of Kannada poetry",
      metaKn: "ಆದಿಕವಿ, ಕನ್ನಡ ಕಾವ್ಯದ ಪಿತಾಮಹ",
    },
    proverb: {
      en: "Effort never fails.",
      kn: "ಪ್ರಯತ್ನ ಮಾಡಿದರೆ ಫಲ ಸಿಗುತ್ತದೆ.",
    },
    temple: {
      en: "Hoysaleswara Temple, Halebidu",
      kn: "ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯ, ಹಳೇಬೀಡು",
    },
    word: {
      en: "Light",
      kn: "ಬೆಳಕು",
      metaEn: "beḷaku",
      metaKn: "beḷaku",
    },
  },
];

/** Deterministic day-of-year picker so the "daily" content is stable. */
export function getDailyHeritage(date: Date = new Date()): DailyHeritage {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / 86_400_000);
  return pool[dayOfYear % pool.length];
}
