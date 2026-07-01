/**
 * The Living Archive of Mysuru Dasara — the historical dataset.
 *
 * ─────────────────────────────────────────────────────────────────────────
 * HONESTY POLICY (read this before adding a year)
 * ─────────────────────────────────────────────────────────────────────────
 * This archive must never fabricate history. Every capsule carries a
 * `confidence` flag that the UI surfaces to the visitor:
 *
 *   • "documented"    — the core facts are well attested (rulers, dates,
 *                       constitutional milestones, the structure of the
 *                       festival, widely-recorded events).
 *   • "partial"       — the decade/period is documented, but fine details of
 *                       this specific year's celebration are sparse; the
 *                       capsule leans on the surrounding, verifiable context.
 *   • "reconstructed" — imagery is an *artistic* impression of the period,
 *                       NOT an authentic photograph. Clearly labelled as such.
 *
 * Imagery is sourced at runtime from Wikipedia article titles (same engine as
 * the rest of Akkaverse — see lib/wiki.ts). Where a genuine period photograph
 * is unlikely to exist, the `wiki` titles point at enduring subjects (the
 * Palace, Chamundi Hills, the reigning Maharaja) and the caption makes clear
 * the visitor is looking at the *place/person*, not a photo of that year.
 *
 * Nothing here asserts a chief guest, a specific elephant, or an anecdote
 * unless it is genuinely on the historical record. When the record is silent,
 * the field is simply omitted rather than invented.
 */

export type Confidence = "documented" | "partial" | "reconstructed";

/** A palette + mood epoch. Accents are "R G B" triplets (CSS-var friendly). */
export type DasaraEra = {
  id: string;
  fromYear: number;
  toYear: number;
  labelEn: string;
  labelKn: string;
  /** Ruling / titular head of the House of Wadiyar in this epoch. */
  headEn: string;
  headKn: string;
  accent: string;
  accent2: string;
  /** Visual grammar the UI shifts into (grain, tint, type). */
  filmEn: string;
  filmKn: string;
};

/** One bilingual fact line. */
type Bi = { en: string; kn: string };

export type DasaraYear = {
  year: number;
  eraId: string;
  confidence: Confidence;
  titleEn: string;
  titleKn: string;
  summaryEn: string;
  summaryKn: string;
  ruler?: Bi;
  /** Major highlights of the celebration. */
  highlights: Bi[];
  /** What changed compared with the previous capsule. */
  changed?: Bi;
  royal?: Bi;
  government?: Bi;
  /** Cultural events / performances of note. */
  cultural?: Bi[];
  /** Interesting stories, rare facts, anecdotes on the record. */
  stories?: Bi[];
  newTradition?: Bi;
  discontinued?: Bi;
  historicMoment?: Bi;
  /** The wider world that year — India / Karnataka / globe. */
  india?: Bi;
  karnataka?: Bi;
  world?: Bi;
  /** Wikipedia article titles that supply the gallery imagery. */
  wiki: string[];
  /** Short bilingual captions, paired 1:1 with `wiki`. */
  captions?: Bi[];
};

/** A scattered discovery — a "hidden treasure" the visitor can uncover. */
export type Treasure = {
  id: string;
  year: number;
  kind: "photograph" | "headline" | "anecdote" | "tradition" | "document";
  titleEn: string;
  titleKn: string;
  bodyEn: string;
  bodyKn: string;
  confidence: Confidence;
};

/* ══════════════════════════════════════════════════════════════════════ *
 * ERAS — the palette evolves as the century turns
 * ══════════════════════════════════════════════════════════════════════ */
export const DASARA_ERAS: DasaraEra[] = [
  {
    id: "rajarshi",
    fromYear: 1902,
    toYear: 1940,
    labelEn: "The Rajarshi's Golden Court",
    labelKn: "ರಾಜರ್ಷಿಯ ಸುವರ್ಣ ದರ್ಬಾರ್",
    headEn: "Krishnaraja Wadiyar IV",
    headKn: "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್",
    accent: "184 138 74",
    accent2: "110 74 38",
    filmEn: "Silver-gelatin sepia · candle-and-gaslight glow · engraved titling",
    filmKn: "ಸಿಪಿಯಾ ಛಾಯಾಚಿತ್ರ · ದೀಪದ ಬೆಳಕು · ಕೆತ್ತಿದ ಅಕ್ಷರ",
  },
  {
    id: "last-maharaja",
    fromYear: 1940,
    toYear: 1950,
    labelEn: "The Last Maharaja",
    labelKn: "ಕೊನೆಯ ಮಹಾರಾಜ",
    headEn: "Jayachamarajendra Wadiyar",
    headKn: "ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್",
    accent: "170 126 78",
    accent2: "96 66 40",
    filmEn: "War-era monochrome · rationed brightness · newsprint headlines",
    filmKn: "ಯುದ್ಧಕಾಲದ ಕಪ್ಪು-ಬಿಳುಪು · ಪತ್ರಿಕಾ ತಲೆಬರಹ",
  },
  {
    id: "rajpramukh",
    fromYear: 1950,
    toYear: 1971,
    labelEn: "Republic & Rajpramukh",
    labelKn: "ಗಣರಾಜ್ಯ ಮತ್ತು ರಾಜಪ್ರಮುಖ",
    headEn: "Jayachamarajendra Wadiyar (Rajpramukh / Governor)",
    headKn: "ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್ (ರಾಜಪ್ರಮುಖ)",
    accent: "198 150 80",
    accent2: "112 80 46",
    filmEn: "Early colour bleed · Nehru-era optimism · letterpress posters",
    filmKn: "ಆರಂಭಿಕ ಬಣ್ಣ · ನೆಹರೂ ಯುಗದ ಆಶಾವಾದ · ಮುದ್ರಿತ ಪೋಸ್ಟರ್",
  },
  {
    id: "peoples-festival",
    fromYear: 1971,
    toYear: 2000,
    labelEn: "The People's Festival",
    labelKn: "ಜನರ ಹಬ್ಬ",
    headEn: "The Goddess in the Golden Howdah",
    headKn: "ಚಿನ್ನದ ಅಂಬಾರಿಯಲ್ಲಿ ದೇವಿ",
    accent: "214 148 66",
    accent2: "150 82 44",
    filmEn: "Kodachrome saturation · state-festival scale · offset print",
    filmKn: "ಕೊಡಾಕ್ರೋಮ್ ಬಣ್ಣ · ರಾಜ್ಯೋತ್ಸವ ವಿಸ್ತಾರ",
  },
  {
    id: "nada-habba",
    fromYear: 2000,
    toYear: 2100,
    labelEn: "Nada Habba — The Digital Age",
    labelKn: "ನಾಡ ಹಬ್ಬ — ಡಿಜಿಟಲ್ ಯುಗ",
    headEn: "Titular Wadiyars · Government of Karnataka",
    headKn: "ಒಡೆಯರ್ ಮನೆತನ · ಕರ್ನಾಟಕ ಸರ್ಕಾರ",
    accent: "245 158 11",
    accent2: "190 66 40",
    filmEn: "LED brilliance · drone vistas · 4K broadcast · one-lakh bulbs",
    filmKn: "ಎಲ್‌ಇಡಿ ಬೆಳಕು · ಡ್ರೋನ್ ದೃಶ್ಯ · ಒಂದು ಲಕ್ಷ ಬಲ್ಬ್",
  },
];

export function eraForYear(year: number): DasaraEra {
  // Later eras win at their boundary year (e.g. 1971 → People's Festival).
  const hit = [...DASARA_ERAS]
    .reverse()
    .find((e) => year >= e.fromYear && year < e.toYear + 1);
  return hit ?? DASARA_ERAS[0];
}

/* ══════════════════════════════════════════════════════════════════════ *
 * YEAR CAPSULES — historically honest time capsules
 * ══════════════════════════════════════════════════════════════════════ */
export const DASARA_YEARS: DasaraYear[] = [
  /* ───────────────────────── 1930s ───────────────────────── */
  {
    year: 1930,
    eraId: "rajarshi",
    confidence: "documented",
    titleEn: "The Model State Celebrates",
    titleKn: "ಮಾದರಿ ಸಂಸ್ಥಾನದ ಸಂಭ್ರಮ",
    summaryEn:
      "Under Maharaja Krishnaraja Wadiyar IV, Mysore was admired across India as a 'model state'. The Dasara Durbar was its crown jewel — a private royal court where the Maharaja held the ceremonial darbar seated on the gem-set Golden Throne, and the Jamboo Savari carried him through the city in the golden howdah.",
    summaryKn:
      "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ ಆಳ್ವಿಕೆಯಲ್ಲಿ ಮೈಸೂರು 'ಮಾದರಿ ಸಂಸ್ಥಾನ' ಎಂದು ಹೆಸರಾಗಿತ್ತು. ದಸರಾ ದರ್ಬಾರ್ ಅದರ ಕಿರೀಟದ ಮಣಿ — ಮಹಾರಾಜರು ಚಿನ್ನದ ಸಿಂಹಾಸನದಲ್ಲಿ ಕುಳಿತು ದರ್ಬಾರ್ ನಡೆಸುತ್ತಿದ್ದರು.",
    ruler: {
      en: "Krishnaraja Wadiyar IV (reigned 1902–1940)",
      kn: "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ (೧೯೦೨–೧೯೪೦)",
    },
    highlights: [
      {
        en: "The Maharaja holds the private Dasara Durbar on the jewelled Golden Throne (Chinnada Simhasana).",
        kn: "ಮಹಾರಾಜರು ಚಿನ್ನದ ಸಿಂಹಾಸನದಲ್ಲಿ ಖಾಸಗಿ ದಸರಾ ದರ್ಬಾರ್ ನಡೆಸುತ್ತಾರೆ.",
      },
      {
        en: "Jamboo Savari: the Maharaja rides through Mysore in the golden howdah atop a caparisoned elephant.",
        kn: "ಜಂಬೂ ಸವಾರಿ: ಅಲಂಕೃತ ಆನೆಯ ಮೇಲಿನ ಚಿನ್ನದ ಅಂಬಾರಿಯಲ್ಲಿ ಮಹಾರಾಜರ ಮೆರವಣಿಗೆ.",
      },
      {
        en: "Torchlight parade (Panjina Kavayatthu) closes the ten days at the Bannimantap grounds.",
        kn: "ಬನ್ನಿಮಂಟಪದಲ್ಲಿ ಪಂಜಿನ ಕವಾಯತ್ತಿನೊಂದಿಗೆ ಹತ್ತು ದಿನಗಳ ಸಮಾರೋಪ.",
      },
    ],
    royal: {
      en: "The howdah's occupant is the reigning Maharaja himself — Dasara is still the sovereign's festival.",
      kn: "ಅಂಬಾರಿಯಲ್ಲಿ ಸ್ವತಃ ಆಳುವ ಮಹಾರಾಜರೇ — ದಸರಾ ಇನ್ನೂ ರಾಜನ ಹಬ್ಬ.",
    },
    government: {
      en: "Princely State of Mysore, ruled by the Wadiyars under British paramountcy; Dewan-led administration.",
      kn: "ಬ್ರಿಟಿಷ್ ಅಧೀನದಲ್ಲಿ ಒಡೆಯರ್ ಆಳ್ವಿಕೆಯ ಮೈಸೂರು ಸಂಸ್ಥಾನ; ದಿವಾನರ ಆಡಳಿತ.",
    },
    stories: [
      {
        en: "The Mysore Palace was among the earliest buildings in India lit by electricity — the Dasara illumination dazzled visitors decades before most Indian cities had power.",
        kn: "ಮೈಸೂರು ಅರಮನೆ ಭಾರತದಲ್ಲೇ ವಿದ್ಯುತ್ ದೀಪ ಪಡೆದ ಮೊದಲ ಕಟ್ಟಡಗಳಲ್ಲಿ ಒಂದು.",
      },
    ],
    india: {
      en: "1930: Gandhi's Salt March and the Civil Disobedience Movement galvanise the freedom struggle.",
      kn: "೧೯೩೦: ಗಾಂಧಿಯ ಉಪ್ಪಿನ ಸತ್ಯಾಗ್ರಹ ಮತ್ತು ಅಸಹಕಾರ ಚಳವಳಿ.",
    },
    world: {
      en: "The Great Depression grips the world economy.",
      kn: "ಜಾಗತಿಕ ಆರ್ಥಿಕ ಮಹಾ ಕುಸಿತ (ಗ್ರೇಟ್ ಡಿಪ್ರೆಶನ್).",
    },
    wiki: ["Mysore Palace", "Krishnaraja Wadiyar IV", "Golden Throne of Mysore"],
    captions: [
      {
        en: "The Amba Vilas (Mysore) Palace — the stage of the Durbar.",
        kn: "ಅಂಬಾ ವಿಲಾಸ ಅರಮನೆ — ದರ್ಬಾರಿನ ವೇದಿಕೆ.",
      },
      {
        en: "Maharaja Krishnaraja Wadiyar IV, the 'Rajarshi'.",
        kn: "ರಾಜರ್ಷಿ ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್.",
      },
      {
        en: "The gem-set Golden Throne, shown only during Dasara.",
        kn: "ದಸರಾ ಸಮಯದಲ್ಲಿ ಮಾತ್ರ ಪ್ರದರ್ಶಿತ ಚಿನ್ನದ ಸಿಂಹಾಸನ.",
      },
    ],
  },
  {
    year: 1938,
    eraId: "rajarshi",
    confidence: "partial",
    titleEn: "Twilight of a Long Reign",
    titleKn: "ಸುದೀರ್ಘ ಆಳ್ವಿಕೆಯ ಸಂಜೆ",
    summaryEn:
      "Late in Krishnaraja Wadiyar IV's 38-year reign, the Dasara Durbar had settled into a magnificent, deeply codified ritual. Detailed accounts of individual years in this decade are uneven, but the shape of the festival — Durbar, Jamboo Savari, torchlight parade — is well documented.",
    summaryKn:
      "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ ೩೮ ವರ್ಷಗಳ ಆಳ್ವಿಕೆಯ ಅಂತ್ಯದ ವೇಳೆಗೆ ದಸರಾ ದರ್ಬಾರ್ ಆಳವಾಗಿ ರೂಪುಗೊಂಡ ಆಚರಣೆಯಾಗಿತ್ತು.",
    ruler: {
      en: "Krishnaraja Wadiyar IV (reigned 1902–1940)",
      kn: "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ (೧೯೦೨–೧೯೪೦)",
    },
    highlights: [
      {
        en: "The ten-day Navaratri Durbar continues in its mature, ceremonial form.",
        kn: "ಹತ್ತು ದಿನಗಳ ನವರಾತ್ರಿ ದರ್ಬಾರ್ ಪಕ್ವ ಆಚರಣಾ ರೂಪದಲ್ಲಿ ಮುಂದುವರಿಯುತ್ತದೆ.",
      },
    ],
    changed: {
      en: "Little changes ritually year to year — the reign's stability is itself the story.",
      kn: "ಆಚರಣೆಯಲ್ಲಿ ವರ್ಷದಿಂದ ವರ್ಷಕ್ಕೆ ಬದಲಾವಣೆ ಕಡಿಮೆ — ಆಳ್ವಿಕೆಯ ಸ್ಥಿರತೆಯೇ ಕಥೆ.",
    },
    india: {
      en: "1938: Subhas Chandra Bose is elected Congress president; the freedom movement intensifies.",
      kn: "೧೯೩೮: ಸುಭಾಷ್ ಚಂದ್ರ ಬೋಸ್ ಕಾಂಗ್ರೆಸ್ ಅಧ್ಯಕ್ಷರಾಗಿ ಆಯ್ಕೆ.",
    },
    world: {
      en: "Europe slides toward the Second World War.",
      kn: "ಯುರೋಪ್ ಎರಡನೇ ಮಹಾಯುದ್ಧದತ್ತ ಜಾರುತ್ತದೆ.",
    },
    wiki: ["Mysore Palace", "Dasara"],
    captions: [
      {
        en: "Artistic impression via the enduring Palace — period photographs of this exact year are scarce.",
        kn: "ಈ ನಿಖರ ವರ್ಷದ ಛಾಯಾಚಿತ್ರಗಳು ವಿರಳ — ಶಾಶ್ವತ ಅರಮನೆಯ ಮೂಲಕ ಕಲ್ಪನೆ.",
      },
    ],
  },
  /* ───────────────────────── 1940s ───────────────────────── */
  {
    year: 1940,
    eraId: "last-maharaja",
    confidence: "documented",
    titleEn: "A New Maharaja Ascends",
    titleKn: "ಹೊಸ ಮಹಾರಾಜರ ಪಟ್ಟಾಭಿಷೇಕ",
    summaryEn:
      "Krishnaraja Wadiyar IV died in August 1940. His nephew, the 21-year-old Jayachamarajendra Wadiyar, ascended the throne — he would become the last ruling Maharaja of Mysore. Dasara that year marked a generational handover of the golden howdah.",
    summaryKn:
      "೧೯೪೦ರ ಆಗಸ್ಟ್‌ನಲ್ಲಿ ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ ನಿಧನರಾದರು. ೨೧ ವರ್ಷದ ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್ ಸಿಂಹಾಸನವೇರಿದರು — ಮೈಸೂರಿನ ಕೊನೆಯ ಆಳುವ ಮಹಾರಾಜ.",
    ruler: {
      en: "Jayachamarajendra Wadiyar (reign begins 1940)",
      kn: "ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್ (೧೯೪೦ರಲ್ಲಿ ಆಳ್ವಿಕೆ ಆರಂಭ)",
    },
    highlights: [
      {
        en: "A young Maharaja takes his place on the Golden Throne for the Dasara Durbar.",
        kn: "ಯುವ ಮಹಾರಾಜರು ದಸರಾ ದರ್ಬಾರಿಗೆ ಚಿನ್ನದ ಸಿಂಹಾಸನವೇರುತ್ತಾರೆ.",
      },
    ],
    changed: {
      en: "The sovereign in the howdah changes for the first time in 38 years.",
      kn: "೩೮ ವರ್ಷಗಳಲ್ಲಿ ಮೊದಲ ಬಾರಿಗೆ ಅಂಬಾರಿಯ ರಾಜ ಬದಲಾಗುತ್ತಾನೆ.",
    },
    historicMoment: {
      en: "Accession of Jayachamarajendra Wadiyar — a musician, philosopher and the dynasty's final crowned ruler.",
      kn: "ಸಂಗೀತಜ್ಞ, ತತ್ವಜ್ಞಾನಿ ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ ಪಟ್ಟಾಭಿಷೇಕ.",
    },
    india: {
      en: "1940: India is drawn into the Second World War; the Quit India movement is two years away.",
      kn: "೧೯೪೦: ಎರಡನೇ ಮಹಾಯುದ್ಧದಲ್ಲಿ ಭಾರತ.",
    },
    world: {
      en: "The Battle of Britain rages across European skies.",
      kn: "ಬ್ರಿಟನ್ ಕದನ ಯುರೋಪಿನ ಆಕಾಶದಲ್ಲಿ.",
    },
    wiki: ["Jayachamarajendra Wadiyar", "Mysore Palace"],
    captions: [
      {
        en: "Jayachamarajendra Wadiyar, the last Maharaja of Mysore.",
        kn: "ಮೈಸೂರಿನ ಕೊನೆಯ ಮಹಾರಾಜ ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್.",
      },
    ],
  },
  {
    year: 1947,
    eraId: "last-maharaja",
    confidence: "documented",
    titleEn: "The First Dasara of a Free India",
    titleKn: "ಸ್ವತಂತ್ರ ಭಾರತದ ಮೊದಲ ದಸರಾ",
    summaryEn:
      "India became independent on 15 August 1947. Mysore acceded to the new Indian Union, and Maharaja Jayachamarajendra Wadiyar signed the Instrument of Accession. That autumn's Dasara was the first celebrated in a free country — the sovereign's festival now unfolding inside a new nation.",
    summaryKn:
      "೧೯೪೭ರ ಆಗಸ್ಟ್ ೧೫ರಂದು ಭಾರತ ಸ್ವತಂತ್ರವಾಯಿತು. ಮೈಸೂರು ಭಾರತ ಒಕ್ಕೂಟಕ್ಕೆ ಸೇರಿತು; ಮಹಾರಾಜ ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್ ವಿಲೀನ ಪತ್ರಕ್ಕೆ ಸಹಿ ಹಾಕಿದರು. ಆ ಶರತ್ಕಾಲದ ದಸರಾ ಸ್ವತಂತ್ರ ದೇಶದ ಮೊದಲ ಆಚರಣೆ.",
    ruler: {
      en: "Maharaja Jayachamarajendra Wadiyar",
      kn: "ಮಹಾರಾಜ ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್",
    },
    highlights: [
      {
        en: "The Durbar and Jamboo Savari proceed as before — but now under the flag of a free India.",
        kn: "ದರ್ಬಾರ್ ಮತ್ತು ಜಂಬೂ ಸವಾರಿ ಮೊದಲಿನಂತೆ — ಆದರೆ ಈಗ ಸ್ವತಂತ್ರ ಭಾರತದ ಧ್ವಜದಡಿ.",
      },
    ],
    changed: {
      en: "The political ground shifts: the princely order begins merging into the Indian Union.",
      kn: "ರಾಜಕೀಯ ನೆಲೆ ಬದಲಾಗುತ್ತದೆ: ಸಂಸ್ಥಾನಗಳು ಭಾರತ ಒಕ್ಕೂಟದೊಂದಿಗೆ ವಿಲೀನ ಆರಂಭ.",
    },
    government: {
      en: "Mysore accedes to India; Jayachamarajendra Wadiyar signs the Instrument of Accession (1947).",
      kn: "ಮೈಸೂರು ಭಾರತಕ್ಕೆ ವಿಲೀನ; ಒಡೆಯರ್ ವಿಲೀನ ಪತ್ರಕ್ಕೆ ಸಹಿ (೧೯೪೭).",
    },
    historicMoment: {
      en: "The last sovereign Dasara era meets the dawn of the Republic-to-be.",
      kn: "ಕೊನೆಯ ಸಾರ್ವಭೌಮ ದಸರಾ ಯುಗ ಗಣರಾಜ್ಯದ ಉದಯವನ್ನು ಎದುರುಗೊಳ್ಳುತ್ತದೆ.",
    },
    india: {
      en: "15 August 1947: India wins independence; Partition reshapes the subcontinent.",
      kn: "೧೯೪೭ ಆಗಸ್ಟ್ ೧೫: ಭಾರತಕ್ಕೆ ಸ್ವಾತಂತ್ರ್ಯ; ವಿಭಜನೆ.",
    },
    karnataka: {
      en: "Mysore State is one of the largest princely states to accede smoothly to the Union.",
      kn: "ಮೈಸೂರು ಒಕ್ಕೂಟಕ್ಕೆ ಸುಗಮವಾಗಿ ಸೇರಿದ ದೊಡ್ಡ ಸಂಸ್ಥಾನಗಳಲ್ಲಿ ಒಂದು.",
    },
    world: {
      en: "The post-war world redraws its map; the Cold War begins to form.",
      kn: "ಯುದ್ಧಾನಂತರ ಜಗತ್ತು ಹೊಸ ನಕ್ಷೆ ಬರೆಯುತ್ತದೆ.",
    },
    wiki: [
      "Jayachamarajendra Wadiyar",
      "Mysore Palace",
      "Dasara",
    ],
    captions: [
      {
        en: "Jayachamarajendra Wadiyar, who signed Mysore's accession to India.",
        kn: "ಮೈಸೂರಿನ ವಿಲೀನಕ್ಕೆ ಸಹಿ ಹಾಕಿದ ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್.",
      },
      {
        en: "The illuminated Palace — beacon of a newly free city.",
        kn: "ಬೆಳಗಿದ ಅರಮನೆ — ಹೊಸ ಸ್ವತಂತ್ರ ನಗರದ ದೀಪಸ್ತಂಭ.",
      },
    ],
  },
  /* ───────────────────────── 1950s ───────────────────────── */
  {
    year: 1950,
    eraId: "rajpramukh",
    confidence: "documented",
    titleEn: "From Maharaja to Rajpramukh",
    titleKn: "ಮಹಾರಾಜನಿಂದ ರಾಜಪ್ರಮುಖ",
    summaryEn:
      "On 26 January 1950 India became a republic. Jayachamarajendra Wadiyar ceased to be a sovereign ruler and became Rajpramukh (constitutional head) of Mysore State. Dasara continued — but the man in the howdah was now a citizen-official of a republic, not a king.",
    summaryKn:
      "೧೯೫೦ರ ಜನವರಿ ೨೬ರಂದು ಭಾರತ ಗಣರಾಜ್ಯವಾಯಿತು. ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್ ಸಾರ್ವಭೌಮ ರಾಜನಾಗಿ ಉಳಿಯದೆ ಮೈಸೂರು ರಾಜ್ಯದ ರಾಜಪ್ರಮುಖರಾದರು.",
    ruler: {
      en: "Jayachamarajendra Wadiyar (Rajpramukh of Mysore, 1950–1956)",
      kn: "ಜಯಚಾಮರಾಜೇಂದ್ರ ಒಡೆಯರ್ (ರಾಜಪ್ರಮುಖ, ೧೯೫೦–೧೯೫೬)",
    },
    highlights: [
      {
        en: "The royal Durbar continues, now within a constitutional, republican frame.",
        kn: "ರಾಜ ದರ್ಬಾರ್ ಈಗ ಗಣರಾಜ್ಯ ಚೌಕಟ್ಟಿನೊಳಗೆ ಮುಂದುವರಿಯುತ್ತದೆ.",
      },
    ],
    changed: {
      en: "The title changes from sovereign Maharaja to Rajpramukh — the beginning of the crown's constitutional twilight.",
      kn: "ಸಾರ್ವಭೌಮ ಮಹಾರಾಜನಿಂದ ರಾಜಪ್ರಮುಖನಿಗೆ ಬದಲಾವಣೆ.",
    },
    historicMoment: {
      en: "India's Constitution comes into force (26 January 1950).",
      kn: "ಭಾರತದ ಸಂವಿಧಾನ ಜಾರಿ (೧೯೫೦ ಜನವರಿ ೨೬).",
    },
    india: {
      en: "1950: India becomes a sovereign democratic republic; Rajendra Prasad is first President.",
      kn: "೧೯೫೦: ಭಾರತ ಸಾರ್ವಭೌಮ ಪ್ರಜಾಸತ್ತಾತ್ಮಕ ಗಣರಾಜ್ಯ.",
    },
    world: {
      en: "The Korean War begins; the post-war order hardens into two blocs.",
      kn: "ಕೊರಿಯಾ ಯುದ್ಧ ಆರಂಭ.",
    },
    wiki: ["Jayachamarajendra Wadiyar", "Mysore Palace"],
    captions: [
      {
        en: "Jayachamarajendra Wadiyar as Rajpramukh of Mysore State.",
        kn: "ಮೈಸೂರು ರಾಜ್ಯದ ರಾಜಪ್ರಮುಖರಾಗಿ ಒಡೆಯರ್.",
      },
    ],
  },
  {
    year: 1956,
    eraId: "rajpramukh",
    confidence: "documented",
    titleEn: "A Bigger Mysore is Born",
    titleKn: "ವಿಶಾಲ ಮೈಸೂರಿನ ಜನನ",
    summaryEn:
      "On 1 November 1956 the States Reorganisation Act redrew India on linguistic lines. Kannada-speaking regions from Bombay, Hyderabad, Madras and Coorg were merged into an enlarged Mysore State. Dasara — long the festival of the old princely capital — now belonged to a much larger Kannada homeland.",
    summaryKn:
      "೧೯೫೬ರ ನವೆಂಬರ್ ೧ರಂದು ರಾಜ್ಯ ಪುನರ್ವಿಂಗಡಣೆ ಕಾಯ್ದೆಯಿಂದ ಭಾಷಾವಾರು ಗಡಿ ಎಳೆಯಲಾಯಿತು. ಕನ್ನಡ ಪ್ರದೇಶಗಳು ವಿಶಾಲ ಮೈಸೂರು ರಾಜ್ಯಕ್ಕೆ ಸೇರಿದವು.",
    highlights: [
      {
        en: "Dasara's audience widens as a unified Kannada state takes shape around Mysore.",
        kn: "ಏಕೀಕೃತ ಕನ್ನಡ ರಾಜ್ಯ ರೂಪುಗೊಳ್ಳುತ್ತಿದ್ದಂತೆ ದಸರಾದ ವ್ಯಾಪ್ತಿ ವಿಸ್ತಾರ.",
      },
    ],
    changed: {
      en: "Mysore State is enlarged fourfold; the festival's meaning starts turning from dynastic to regional.",
      kn: "ಮೈಸೂರು ರಾಜ್ಯ ವಿಸ್ತಾರ; ಹಬ್ಬದ ಅರ್ಥ ರಾಜವಂಶದಿಂದ ಪ್ರಾದೇಶಿಕದತ್ತ.",
    },
    government: {
      en: "States Reorganisation Act, 1956 unifies Kannada-speaking areas.",
      kn: "೧೯೫೬ರ ರಾಜ್ಯ ಪುನರ್ವಿಂಗಡಣೆ ಕಾಯ್ದೆ.",
    },
    historicMoment: {
      en: "The linguistic state of (greater) Mysore is formed — a milestone toward modern Karnataka.",
      kn: "ವಿಶಾಲ ಮೈಸೂರು ರಾಜ್ಯ ರಚನೆ — ಆಧುನಿಕ ಕರ್ನಾಟಕದತ್ತ ಮೈಲಿಗಲ್ಲು.",
    },
    karnataka: {
      en: "1 November — later celebrated as Kannada Rajyotsava — marks the unification.",
      kn: "ನವೆಂಬರ್ ೧ — ಕನ್ನಡ ರಾಜ್ಯೋತ್ಸವ.",
    },
    india: {
      en: "1956: India is reorganised into linguistic states.",
      kn: "೧೯೫೬: ಭಾರತ ಭಾಷಾವಾರು ರಾಜ್ಯಗಳಾಗಿ ಪುನರ್ರಚನೆ.",
    },
    wiki: ["Karnataka", "Mysore Palace", "Jayachamarajendra Wadiyar"],
    captions: [
      {
        en: "The Kannada homeland that grew around Mysore's festival.",
        kn: "ಮೈಸೂರಿನ ಹಬ್ಬದ ಸುತ್ತ ಬೆಳೆದ ಕನ್ನಡ ನಾಡು.",
      },
    ],
  },
  /* ───────────────────────── 1960s ───────────────────────── */
  {
    year: 1965,
    eraId: "rajpramukh",
    confidence: "partial",
    titleEn: "The Palace in Early Colour",
    titleKn: "ಆರಂಭಿಕ ಬಣ್ಣದಲ್ಲಿ ಅರಮನೆ",
    summaryEn:
      "By the mid-1960s Dasara was a beloved public spectacle photographed increasingly in colour. The Wadiyars still hosted the private Durbar, and the illuminated palace drew growing crowds of citizens and tourists. Year-by-year specifics are documented unevenly, but the festival's rhythm was firmly set.",
    summaryKn:
      "೧೯೬೦ರ ದಶಕದ ಮಧ್ಯದ ವೇಳೆಗೆ ದಸರಾ ಬಣ್ಣದ ಛಾಯಾಚಿತ್ರಗಳಲ್ಲಿ ದಾಖಲಾಗುತ್ತಿತ್ತು. ಒಡೆಯರ್ ಇನ್ನೂ ಖಾಸಗಿ ದರ್ಬಾರ್ ನಡೆಸುತ್ತಿದ್ದರು.",
    highlights: [
      {
        en: "Illuminated-palace tourism grows; the torchlight parade remains the grand finale.",
        kn: "ಬೆಳಗಿದ ಅರಮನೆ ಪ್ರವಾಸೋದ್ಯಮ ಬೆಳೆಯುತ್ತದೆ; ಪಂಜಿನ ಕವಾಯತ್ತು ಸಮಾರೋಪ.",
      },
    ],
    india: {
      en: "1965: the India–Pakistan war of that year dominates national life.",
      kn: "೧೯೬೫: ಭಾರತ–ಪಾಕಿಸ್ತಾನ ಯುದ್ಧ.",
    },
    world: {
      en: "The space race and the Cold War define the decade.",
      kn: "ಬಾಹ್ಯಾಕಾಶ ಸ್ಪರ್ಧೆ ಮತ್ತು ಶೀತಲ ಸಮರ.",
    },
    wiki: ["Mysore Palace", "Dasara"],
    captions: [
      {
        en: "The Palace illumination — increasingly captured in colour film.",
        kn: "ಅರಮನೆ ದೀಪಾಲಂಕಾರ — ಬಣ್ಣದ ಫಿಲ್ಮ್‌ನಲ್ಲಿ.",
      },
    ],
  },
  /* ───────────────────────── 1970s ───────────────────────── */
  {
    year: 1971,
    eraId: "peoples-festival",
    confidence: "documented",
    titleEn: "The Crown Sets Down — the Goddess Rises",
    titleKn: "ಕಿರೀಟ ಇಳಿಯುತ್ತದೆ — ದೇವಿ ಏರುತ್ತಾಳೆ",
    summaryEn:
      "In 1971 the 26th Amendment abolished the privy purses and official recognition of India's former rulers. This is the great turning point of Mysuru Dasara: no longer able to ride as a sovereign, the Wadiyar stepped out of the state procession, and the idol of Goddess Chamundeshwari came to occupy the golden howdah. The king's festival had become the people's — and the Goddess's.",
    summaryKn:
      "೧೯೭೧ರಲ್ಲಿ ೨೬ನೇ ಸಂವಿಧಾನ ತಿದ್ದುಪಡಿಯಿಂದ ರಾಜಧನ ಮತ್ತು ರಾಜರ ಅಧಿಕೃತ ಮಾನ್ಯತೆ ರದ್ದಾಯಿತು. ಇದು ದಸರಾದ ಮಹಾ ತಿರುವು: ಅಂಬಾರಿಯಲ್ಲಿ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿಯ ವಿಗ್ರಹ ಸ್ಥಾನ ಪಡೆಯಿತು.",
    highlights: [
      {
        en: "The idol of Goddess Chamundeshwari now rides in the golden howdah instead of the ruler.",
        kn: "ಈಗ ರಾಜನ ಬದಲು ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿಯ ವಿಗ್ರಹ ಚಿನ್ನದ ಅಂಬಾರಿಯಲ್ಲಿ.",
      },
      {
        en: "The state increasingly takes on the organisation of the public festival.",
        kn: "ಸಾರ್ವಜನಿಕ ಹಬ್ಬದ ಸಂಘಟನೆಯನ್ನು ಸರ್ಕಾರ ಹೆಚ್ಚಾಗಿ ವಹಿಸಿಕೊಳ್ಳುತ್ತದೆ.",
      },
    ],
    changed: {
      en: "The single biggest change in Dasara's modern history: the sovereign leaves the howdah forever; the Goddess takes his place.",
      kn: "ಆಧುನಿಕ ದಸರಾ ಇತಿಹಾಸದ ದೊಡ್ಡ ಬದಲಾವಣೆ: ರಾಜ ಅಂಬಾರಿ ತೊರೆಯುತ್ತಾನೆ; ದೇವಿ ಸ್ಥಾನ ಪಡೆಯುತ್ತಾಳೆ.",
    },
    discontinued: {
      en: "The reigning ruler ceases to ride in the state Jamboo Savari.",
      kn: "ಆಳುವ ರಾಜ ಜಂಬೂ ಸವಾರಿಯಲ್ಲಿ ಸವಾರಿ ಮಾಡುವುದು ನಿಲ್ಲುತ್ತದೆ.",
    },
    newTradition: {
      en: "The utsava-murti of Chamundeshwari in the golden howdah becomes the enduring symbol of Dasara.",
      kn: "ಚಿನ್ನದ ಅಂಬಾರಿಯಲ್ಲಿ ಚಾಮುಂಡೇಶ್ವರಿಯ ಉತ್ಸವಮೂರ್ತಿ ದಸರಾದ ಶಾಶ್ವತ ಸಂಕೇತ.",
    },
    government: {
      en: "26th Constitutional Amendment (1971) abolishes privy purses and princely privileges.",
      kn: "೨೬ನೇ ಸಂವಿಧಾನ ತಿದ್ದುಪಡಿ (೧೯೭೧) ರಾಜಧನ ರದ್ದು.",
    },
    historicMoment: {
      en: "Dasara transitions from a dynastic rite to a state/public festival.",
      kn: "ದಸರಾ ರಾಜವಂಶದ ಆಚರಣೆಯಿಂದ ಸಾರ್ವಜನಿಕ ಹಬ್ಬಕ್ಕೆ.",
    },
    india: {
      en: "1971: the Indo-Pakistani War leads to the creation of Bangladesh.",
      kn: "೧೯೭೧: ಭಾರತ–ಪಾಕ್ ಯುದ್ಧ; ಬಾಂಗ್ಲಾದೇಶ ಉದಯ.",
    },
    world: {
      en: "Global decolonisation and Cold War rivalries continue to reshape nations.",
      kn: "ಜಾಗತಿಕ ವಸಾಹತುಶಾಹಿ ಅಂತ್ಯ ಮತ್ತು ಶೀತಲ ಸಮರ.",
    },
    wiki: [
      "Chamundeshwari Temple",
      "Chamundi Hills",
      "Mysore Palace",
    ],
    captions: [
      {
        en: "Chamundeshwari — the presiding Goddess who now leads the procession.",
        kn: "ಈಗ ಮೆರವಣಿಗೆ ಮುನ್ನಡೆಸುವ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿ.",
      },
      {
        en: "Chamundi Hills, where Dasara is ceremonially inaugurated.",
        kn: "ದಸರಾ ಉದ್ಘಾಟನೆಗೊಳ್ಳುವ ಚಾಮುಂಡಿ ಬೆಟ್ಟ.",
      },
    ],
  },
  {
    year: 1973,
    eraId: "peoples-festival",
    confidence: "documented",
    titleEn: "Mysore Becomes Karnataka",
    titleKn: "ಮೈಸೂರು ಕರ್ನಾಟಕವಾಗುತ್ತದೆ",
    summaryEn:
      "On 1 November 1973 the enlarged Mysore State was renamed Karnataka. Dasara — the Nadahabba, or 'state festival' — was now the official festival of Karnataka, celebrated with growing government participation while retaining its royal and religious heart at the Mysore Palace.",
    summaryKn:
      "೧೯೭೩ರ ನವೆಂಬರ್ ೧ರಂದು ವಿಶಾಲ ಮೈಸೂರು ರಾಜ್ಯಕ್ಕೆ 'ಕರ್ನಾಟಕ' ಎಂದು ಮರುನಾಮಕರಣ. ದಸರಾ ಈಗ ಕರ್ನಾಟಕದ ನಾಡಹಬ್ಬ.",
    highlights: [
      {
        en: "Dasara is formally the Nadahabba (state festival) of the newly named Karnataka.",
        kn: "ದಸರಾ ಕರ್ನಾಟಕದ ಅಧಿಕೃತ ನಾಡಹಬ್ಬ.",
      },
    ],
    changed: {
      en: "The state's very name changes; Dasara's identity as Karnataka's festival is cemented.",
      kn: "ರಾಜ್ಯದ ಹೆಸರೇ ಬದಲಾಗುತ್ತದೆ; ದಸರಾ ಕರ್ನಾಟಕದ ಹಬ್ಬವಾಗಿ ದೃಢ.",
    },
    government: {
      en: "1 November 1973: Mysore State is renamed Karnataka.",
      kn: "೧೯೭೩ ನವೆಂಬರ್ ೧: ಮೈಸೂರು ರಾಜ್ಯ 'ಕರ್ನಾಟಕ' ಎಂದು ಮರುನಾಮಕರಣ.",
    },
    karnataka: {
      en: "The name 'Karnataka' becomes official under Chief Minister Devaraj Urs.",
      kn: "ಮುಖ್ಯಮಂತ್ರಿ ದೇವರಾಜ ಅರಸ್ ಅವರ ಕಾಲದಲ್ಲಿ 'ಕರ್ನಾಟಕ' ಹೆಸರು ಅಧಿಕೃತ.",
    },
    wiki: ["Karnataka", "Mysore Palace", "Chamundeshwari Temple"],
    captions: [
      {
        en: "Karnataka — whose state festival Dasara had now become.",
        kn: "ಕರ್ನಾಟಕ — ಇದರ ನಾಡಹಬ್ಬವಾದ ದಸರಾ.",
      },
    ],
  },
  /* ───────────────────────── 1980s ───────────────────────── */
  {
    year: 1985,
    eraId: "peoples-festival",
    confidence: "partial",
    titleEn: "A Festival of the Whole State",
    titleKn: "ಇಡೀ ರಾಜ್ಯದ ಹಬ್ಬ",
    summaryEn:
      "Through the 1980s the government-organised Dasara grew into a broad cultural fair: music and dance from across Karnataka, exhibitions, and the film-lit palace as its glowing centrepiece. The titular Wadiyar continued the private palace Durbar in parallel with the public celebration.",
    summaryKn:
      "೧೯೮೦ರ ದಶಕದಲ್ಲಿ ಸರ್ಕಾರಿ ದಸರಾ ವಿಶಾಲ ಸಾಂಸ್ಕೃತಿಕ ಜಾತ್ರೆಯಾಗಿ ಬೆಳೆಯಿತು: ಸಂಗೀತ, ನೃತ್ಯ, ಪ್ರದರ್ಶನಗಳು.",
    highlights: [
      {
        en: "A ten-day cultural programme showcases Karnataka's arts alongside the palace illumination.",
        kn: "ಅರಮನೆ ದೀಪಾಲಂಕಾರದೊಂದಿಗೆ ಹತ್ತು ದಿನಗಳ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮ.",
      },
    ],
    cultural: [
      {
        en: "Classical and folk performances from across the state feature prominently.",
        kn: "ರಾಜ್ಯದಾದ್ಯಂತ ಶಾಸ್ತ್ರೀಯ ಮತ್ತು ಜಾನಪದ ಪ್ರದರ್ಶನಗಳು.",
      },
    ],
    india: {
      en: "The mid-1980s: India begins tentative economic and technological modernisation.",
      kn: "೧೯೮೦ರ ದಶಕ: ಭಾರತದ ಆರಂಭಿಕ ಆಧುನೀಕರಣ.",
    },
    wiki: ["Mysore Palace", "Dasara", "Chamundi Hills"],
    captions: [
      {
        en: "The palace as the glowing heart of a state-wide cultural fair.",
        kn: "ರಾಜ್ಯವ್ಯಾಪಿ ಸಾಂಸ್ಕೃತಿಕ ಜಾತ್ರೆಯ ಬೆಳಗುವ ಹೃದಯ.",
      },
    ],
  },
  /* ───────────────────────── 1990s ───────────────────────── */
  {
    year: 1999,
    eraId: "peoples-festival",
    confidence: "partial",
    titleEn: "Turn of the Millennium",
    titleKn: "ಸಹಸ್ರಮಾನದ ತಿರುವು",
    summaryEn:
      "As the 20th century closed, Dasara was a fully modern state festival: nationally televised, tourism-driven, and technologically illuminated, yet still anchored by the Jamboo Savari and the Chamundeshwari howdah. The lead elephants that carry the golden howdah had by now become celebrated public figures in their own right.",
    summaryKn:
      "೨೦ನೇ ಶತಮಾನದ ಅಂತ್ಯದ ವೇಳೆಗೆ ದಸರಾ ಸಂಪೂರ್ಣ ಆಧುನಿಕ ರಾಜ್ಯೋತ್ಸವ: ದೂರದರ್ಶನ ಪ್ರಸಾರ, ಪ್ರವಾಸೋದ್ಯಮ, ತಂತ್ರಜ್ಞಾನದ ದೀಪಾಲಂಕಾರ.",
    highlights: [
      {
        en: "Televised Jamboo Savari brings Dasara into homes across India.",
        kn: "ದೂರದರ್ಶನದ ಜಂಬೂ ಸವಾರಿ ದಸರಾವನ್ನು ಮನೆಮನೆಗೆ ತಲುಪಿಸುತ್ತದೆ.",
      },
    ],
    stories: [
      {
        en: "The lead 'howdah elephants' — trained for years to carry the ~750 kg golden howdah — become beloved festival celebrities.",
        kn: "~೭೫೦ ಕೆ.ಜಿ. ಚಿನ್ನದ ಅಂಬಾರಿ ಹೊರುವ ಆನೆಗಳು ಹಬ್ಬದ ಪ್ರಸಿದ್ಧ ಪಾತ್ರಗಳಾಗುತ್ತವೆ.",
      },
    ],
    india: {
      en: "1999: India's IT boom accelerates, with Bangalore/Bengaluru at its centre.",
      kn: "೧೯೯೯: ಬೆಂಗಳೂರು ಕೇಂದ್ರಿತ ಐಟಿ ಉತ್ಕರ್ಷ.",
    },
    world: {
      en: "The world braces for Y2K as the millennium turns.",
      kn: "ಸಹಸ್ರಮಾನ ಬದಲಾವಣೆ; Y2K ಆತಂಕ.",
    },
    wiki: ["Mysore Palace", "Dasara", "Chamundeshwari Temple"],
    captions: [
      {
        en: "A televised, tourism-era Dasara at the illuminated palace.",
        kn: "ದೂರದರ್ಶನ ಯುಗದ ದಸರಾ.",
      },
    ],
  },
  /* ───────────────────────── 2000s ───────────────────────── */
  {
    year: 2010,
    eraId: "nada-habba",
    confidence: "documented",
    titleEn: "Four Hundred Years of Dasara",
    titleKn: "ದಸರಾದ ನಾನೂರು ವರ್ಷ",
    summaryEn:
      "2010 marked the 400th year of the Mysore Dasara tradition, tracing its lineage to Raja Wadiyar I, who is recorded as celebrating Navaratri at Srirangapatna in 1610. Karnataka observed the quatercentenary with special grandeur — a milestone linking the modern LED-lit festival to a four-century-old ritual.",
    summaryKn:
      "೧೬೧೦ರಲ್ಲಿ ಶ್ರೀರಂಗಪಟ್ಟಣದಲ್ಲಿ ರಾಜ ಒಡೆಯರ್ ನವರಾತ್ರಿ ಆಚರಿಸಿದ ಪರಂಪರೆಗೆ ೨೦೧೦ ಆ ಸಂಪ್ರದಾಯದ ೪೦೦ನೇ ವರ್ಷ. ಕರ್ನಾಟಕ ವಿಶೇಷ ವೈಭವದಿಂದ ಆಚರಿಸಿತು.",
    highlights: [
      {
        en: "Quatercentenary (400-year) celebrations of the Mysore Dasara tradition.",
        kn: "ಮೈಸೂರು ದಸರಾ ಪರಂಪರೆಯ ೪೦೦ನೇ ವರ್ಷಾಚರಣೆ.",
      },
      {
        en: "The palace glows with roughly a lakh (~97,000) light bulbs each evening.",
        kn: "ಪ್ರತಿ ಸಂಜೆ ಸುಮಾರು ಒಂದು ಲಕ್ಷ ಬಲ್ಬ್‌ಗಳಿಂದ ಅರಮನೆ ಬೆಳಗುತ್ತದೆ.",
      },
    ],
    historicMoment: {
      en: "400 years connect Raja Wadiyar I's 1610 Navaratri to the 21st-century Nadahabba.",
      kn: "೧೬೧೦ರ ರಾಜ ಒಡೆಯರ ನವರಾತ್ರಿಯಿಂದ ೨೧ನೇ ಶತಮಾನದ ನಾಡಹಬ್ಬದವರೆಗೆ ೪೦೦ ವರ್ಷ.",
    },
    india: {
      en: "2010: India's economy surges; Bengaluru cements its global-tech reputation.",
      kn: "೨೦೧೦: ಭಾರತದ ಆರ್ಥಿಕ ಉತ್ಕರ್ಷ.",
    },
    wiki: ["Mysore Palace", "Dasara", "Srirangapatna"],
    captions: [
      {
        en: "The palace under ~one lakh bulbs — the signature image of modern Dasara.",
        kn: "ಸುಮಾರು ಒಂದು ಲಕ್ಷ ಬಲ್ಬ್‌ಗಳ ಅರಮನೆ.",
      },
      {
        en: "Srirangapatna, where Raja Wadiyar I's 1610 Navaratri seeded the tradition.",
        kn: "೧೬೧೦ರ ನವರಾತ್ರಿ ಆರಂಭವಾದ ಶ್ರೀರಂಗಪಟ್ಟಣ.",
      },
    ],
  },
  {
    year: 2013,
    eraId: "nada-habba",
    confidence: "documented",
    titleEn: "The Passing of a Titular King",
    titleKn: "ಒಬ್ಬ ಪಟ್ಟದ ರಾಜನ ನಿರ್ಗಮನ",
    summaryEn:
      "Srikantadatta Narasimharaja Wadiyar — the titular head of the royal family, who had kept the private palace Durbar alive for decades — died in December 2013. His passing left the ceremonial throne without an heir until an adoption two years later, casting a poignant shadow over the era's private royal rituals.",
    summaryKn:
      "ದಶಕಗಳ ಕಾಲ ಖಾಸಗಿ ಅರಮನೆ ದರ್ಬಾರ್ ಜೀವಂತವಾಗಿಟ್ಟಿದ್ದ ರಾಜಮನೆತನದ ಪಟ್ಟದ ಮುಖ್ಯಸ್ಥ ಶ್ರೀಕಂಠದತ್ತ ನರಸಿಂಹರಾಜ ಒಡೆಯರ್ ೨೦೧೩ರ ಡಿಸೆಂಬರ್‌ನಲ್ಲಿ ನಿಧನರಾದರು.",
    highlights: [
      {
        en: "The public state Dasara proceeds while the palace mourns its titular head.",
        kn: "ಅರಮನೆ ತನ್ನ ಪಟ್ಟದ ಮುಖ್ಯಸ್ಥನನ್ನು ಶೋಕಿಸುತ್ತಿರುವಾಗ ಸಾರ್ವಜನಿಕ ದಸರಾ ಮುಂದುವರಿಯುತ್ತದೆ.",
      },
    ],
    royal: {
      en: "Srikantadatta Narasimharaja Wadiyar (1953–2013), titular Maharaja and custodian of the private Durbar.",
      kn: "ಪಟ್ಟದ ಮಹಾರಾಜ ಶ್ರೀಕಂಠದತ್ತ ನರಸಿಂಹರಾಜ ಒಡೆಯರ್ (೧೯೫೩–೨೦೧೩).",
    },
    historicMoment: {
      en: "The private royal Durbar loses its long-time host; succession becomes an open question.",
      kn: "ಖಾಸಗಿ ರಾಜ ದರ್ಬಾರ್ ತನ್ನ ದೀರ್ಘಕಾಲದ ಆತಿಥೇಯನನ್ನು ಕಳೆದುಕೊಳ್ಳುತ್ತದೆ.",
    },
    india: {
      en: "2013: India debates growth, governance and a coming general election.",
      kn: "೨೦೧೩: ಭಾರತದಲ್ಲಿ ಚುನಾವಣಾ ಪೂರ್ವ ಚರ್ಚೆಗಳು.",
    },
    wiki: ["Mysore Palace", "Srikantadatta Narasimharaja Wadiyar"],
    captions: [
      {
        en: "The palace whose private Durbar he sustained for decades.",
        kn: "ದಶಕಗಳ ಕಾಲ ಅವರು ಉಳಿಸಿದ ಖಾಸಗಿ ದರ್ಬಾರಿನ ಅರಮನೆ.",
      },
    ],
  },
  /* ───────────────────────── 2020s ───────────────────────── */
  {
    year: 2020,
    eraId: "nada-habba",
    confidence: "documented",
    titleEn: "The Dasara Without Crowds",
    titleKn: "ಜನಸಂದಣಿ ಇಲ್ಲದ ದಸರಾ",
    summaryEn:
      "The COVID-19 pandemic forced an unprecedented Dasara. In 2020 the government held a simple, symbolic celebration: the rituals and a drastically scaled-down Jamboo Savari were conducted with minimal participants and no public crowds, and citizens watched the illuminated palace on television and online rather than on the streets.",
    summaryKn:
      "ಕೋವಿಡ್-೧೯ ಸಾಂಕ್ರಾಮಿಕದಿಂದ ೨೦೨೦ರ ದಸರಾ ಅಭೂತಪೂರ್ವ. ಸರಳ, ಸಾಂಕೇತಿಕ ಆಚರಣೆ; ಸೀಮಿತ ಜನರೊಂದಿಗೆ ಸಂಕ್ಷಿಪ್ತ ಜಂಬೂ ಸವಾರಿ; ಸಾರ್ವಜನಿಕ ಜನಸಂದಣಿ ಇಲ್ಲ.",
    highlights: [
      {
        en: "A symbolic, low-key Jamboo Savari is held without the usual public crowds.",
        kn: "ಎಂದಿನ ಜನಸಂದಣಿ ಇಲ್ಲದೆ ಸಾಂಕೇತಿಕ ಜಂಬೂ ಸವಾರಿ.",
      },
      {
        en: "Citizens experience Dasara via television and live streaming.",
        kn: "ದೂರದರ್ಶನ ಮತ್ತು ಆನ್‌ಲೈನ್ ಮೂಲಕ ಜನ ದಸರಾ ವೀಕ್ಷಣೆ.",
      },
    ],
    changed: {
      en: "For the first time in living memory, the festival is deliberately held without a public audience.",
      kn: "ಜೀವಿತಕಾಲದಲ್ಲೇ ಮೊದಲ ಬಾರಿಗೆ ಸಾರ್ವಜನಿಕರಿಲ್ಲದೆ ಉದ್ದೇಶಪೂರ್ವಕ ಆಚರಣೆ.",
    },
    government: {
      en: "COVID-19 protocols shape a restricted, symbolic celebration.",
      kn: "ಕೋವಿಡ್ ನಿಯಮಗಳಿಂದ ಸೀಮಿತ, ಸಾಂಕೇತಿಕ ಆಚರಣೆ.",
    },
    historicMoment: {
      en: "A century-old public spectacle continues in near-empty streets — ritual endures without the crowd.",
      kn: "ಶತಮಾನದ ಸಾರ್ವಜನಿಕ ದೃಶ್ಯ ಖಾಲಿ ಬೀದಿಗಳಲ್ಲಿ ಮುಂದುವರಿಯುತ್ತದೆ.",
    },
    india: {
      en: "2020: the COVID-19 pandemic upends life across India and the world.",
      kn: "೨೦೨೦: ಕೋವಿಡ್-೧೯ ಸಾಂಕ್ರಾಮಿಕ.",
    },
    world: {
      en: "A global pandemic halts travel, gatherings and festivals worldwide.",
      kn: "ಜಾಗತಿಕ ಸಾಂಕ್ರಾಮಿಕ; ಪ್ರಪಂಚದಾದ್ಯಂತ ಹಬ್ಬಗಳಿಗೆ ಅಡ್ಡಿ.",
    },
    wiki: ["Mysore Palace", "Dasara", "Chamundeshwari Temple"],
    captions: [
      {
        en: "The illuminated palace — watched from home, not the street, in 2020.",
        kn: "೨೦೨೦: ಬೀದಿಯಲ್ಲಲ್ಲ, ಮನೆಯಿಂದ ವೀಕ್ಷಿಸಿದ ಅರಮನೆ.",
      },
    ],
  },
  {
    year: 2015,
    eraId: "nada-habba",
    confidence: "documented",
    titleEn: "A New Titular Maharaja",
    titleKn: "ಹೊಸ ಪಟ್ಟದ ಮಹಾರಾಜ",
    summaryEn:
      "In 2015 Yaduveer Krishnadatta Chamaraja Wadiyar was adopted into the royal family and installed as the titular Maharaja, reviving the private palace Durbar after the 2013 vacancy. The public state Dasara and the family's private Durbar have continued side by side ever since.",
    summaryKn:
      "೨೦೧೫ರಲ್ಲಿ ಯದುವೀರ್ ಕೃಷ್ಣದತ್ತ ಚಾಮರಾಜ ಒಡೆಯರ್ ರಾಜಮನೆತನಕ್ಕೆ ದತ್ತು ಸ್ವೀಕೃತರಾಗಿ ಪಟ್ಟದ ಮಹಾರಾಜರಾದರು; ಖಾಸಗಿ ಅರಮನೆ ದರ್ಬಾರ್ ಪುನಃ ಆರಂಭ.",
    highlights: [
      {
        en: "A newly installed titular Maharaja resumes the private palace Durbar.",
        kn: "ಹೊಸದಾಗಿ ಪಟ್ಟಕ್ಕೆ ಬಂದ ಮಹಾರಾಜರು ಖಾಸಗಿ ಅರಮನೆ ದರ್ಬಾರ್ ಪುನರಾರಂಭಿಸುತ್ತಾರೆ.",
      },
    ],
    royal: {
      en: "Yaduveer Krishnadatta Chamaraja Wadiyar becomes titular Maharaja (2015).",
      kn: "ಯದುವೀರ್ ಕೃಷ್ಣದತ್ತ ಚಾಮರಾಜ ಒಡೆಯರ್ ಪಟ್ಟದ ಮಹಾರಾಜ (೨೦೧೫).",
    },
    changed: {
      en: "The private royal Durbar, dormant since 2013, is revived by the new titular head.",
      kn: "೨೦೧೩ರಿಂದ ಸ್ಥಗಿತವಾಗಿದ್ದ ಖಾಸಗಿ ದರ್ಬಾರ್ ಪುನಃ ಆರಂಭ.",
    },
    india: {
      en: "2015: India pushes Digital India and rapid urban-tech growth.",
      kn: "೨೦೧೫: ಡಿಜಿಟಲ್ ಇಂಡಿಯಾ ಅಭಿಯಾನ.",
    },
    wiki: ["Mysore Palace", "Chamundeshwari Temple"],
    captions: [
      {
        en: "The palace, whose private Durbar was revived in 2015.",
        kn: "೨೦೧೫ರಲ್ಲಿ ಖಾಸಗಿ ದರ್ಬಾರ್ ಪುನರುಜ್ಜೀವನಗೊಂಡ ಅರಮನೆ.",
      },
    ],
  },
  {
    year: 2025,
    eraId: "nada-habba",
    confidence: "documented",
    titleEn: "The Nadahabba of Today",
    titleKn: "ಇಂದಿನ ನಾಡಹಬ್ಬ",
    summaryEn:
      "Today's Dasara is a fully-fledged Nadahabba: ten days of state-organised culture, a globally-streamed Jamboo Savari, the Goddess Chamundeshwari in the golden howdah, an LED-brilliant palace, drone-filmed vistas, and lakhs of visitors — while the Wadiyar family's private Durbar preserves the ritual's ancient soul inside the palace.",
    summaryKn:
      "ಇಂದಿನ ದಸರಾ ಪೂರ್ಣ ನಾಡಹಬ್ಬ: ಹತ್ತು ದಿನಗಳ ಸರ್ಕಾರಿ ಸಂಸ್ಕೃತಿ, ಜಾಗತಿಕ ಪ್ರಸಾರದ ಜಂಬೂ ಸವಾರಿ, ಚಿನ್ನದ ಅಂಬಾರಿಯಲ್ಲಿ ಚಾಮುಂಡೇಶ್ವರಿ, ಎಲ್‌ಇಡಿ ಅರಮನೆ, ಲಕ್ಷಾಂತರ ಪ್ರವಾಸಿಗರು.",
    highlights: [
      {
        en: "Government-organised cultural programmes span ten days across Mysuru.",
        kn: "ಮೈಸೂರಿನಾದ್ಯಂತ ಹತ್ತು ದಿನಗಳ ಸರ್ಕಾರಿ ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು.",
      },
      {
        en: "The Jamboo Savari from the palace to Bannimantap is streamed worldwide.",
        kn: "ಅರಮನೆಯಿಂದ ಬನ್ನಿಮಂಟಪದವರೆಗಿನ ಜಂಬೂ ಸವಾರಿ ಜಾಗತಿಕ ಪ್ರಸಾರ.",
      },
      {
        en: "The palace is lit by roughly one lakh bulbs every evening of the festival.",
        kn: "ಹಬ್ಬದ ಪ್ರತಿ ಸಂಜೆ ಸುಮಾರು ಒಂದು ಲಕ್ಷ ಬಲ್ಬ್‌ಗಳಿಂದ ಅರಮನೆ ಬೆಳಗು.",
      },
    ],
    cultural: [
      {
        en: "Yuva Dasara, food and film festivals, wrestling, and a grand torchlight parade round out the programme.",
        kn: "ಯುವ ದಸರಾ, ಆಹಾರ ಮತ್ತು ಚಲನಚಿತ್ರೋತ್ಸವ, ಕುಸ್ತಿ, ಪಂಜಿನ ಕವಾಯತ್ತು.",
      },
    ],
    world: {
      en: "In a connected age, Mysuru Dasara is watched live across the globe.",
      kn: "ಸಂಪರ್ಕ ಯುಗದಲ್ಲಿ ಮೈಸೂರು ದಸರಾ ವಿಶ್ವದಾದ್ಯಂತ ನೇರ ಪ್ರಸಾರ.",
    },
    wiki: [
      "Mysore Palace",
      "Dasara",
      "Chamundeshwari Temple",
      "Chamundi Hills",
    ],
    captions: [
      {
        en: "The modern Nadahabba: LED-lit, drone-filmed, globally watched.",
        kn: "ಆಧುನಿಕ ನಾಡಹಬ್ಬ: ಎಲ್‌ಇಡಿ, ಡ್ರೋನ್, ಜಾಗತಿಕ ವೀಕ್ಷಣೆ.",
      },
      {
        en: "The Jamboo Savari — its enduring, world-famous centrepiece.",
        kn: "ಜಂಬೂ ಸವಾರಿ — ಅದರ ಶಾಶ್ವತ ಆಕರ್ಷಣೆ.",
      },
    ],
  },
];

/** Year capsules sorted chronologically (the spine of the time machine). */
export const DASARA_TIMELINE = [...DASARA_YEARS].sort((a, b) => a.year - b.year);

export function yearCapsule(year: number): DasaraYear | undefined {
  return DASARA_YEARS.find((y) => y.year === year);
}

/* ══════════════════════════════════════════════════════════════════════ *
 * HIDDEN TREASURES — scattered discoveries
 * ══════════════════════════════════════════════════════════════════════ */
export const DASARA_TREASURES: Treasure[] = [
  {
    id: "electric-palace",
    year: 1930,
    kind: "anecdote",
    titleEn: "The Palace That Shone Before the City",
    titleKn: "ನಗರಕ್ಕೂ ಮೊದಲೇ ಬೆಳಗಿದ ಅರಮನೆ",
    bodyEn:
      "Mysore was one of the first princely states to embrace electricity, and the Palace's Dasara illumination amazed visitors at a time when most of India still lit its nights with oil and flame.",
    bodyKn:
      "ವಿದ್ಯುತ್ ಅಳವಡಿಸಿಕೊಂಡ ಮೊದಲ ಸಂಸ್ಥಾನಗಳಲ್ಲಿ ಮೈಸೂರು ಒಂದು; ಬಹುತೇಕ ಭಾರತ ಎಣ್ಣೆದೀಪ ಬಳಸುತ್ತಿದ್ದಾಗ ಅರಮನೆ ಬೆಳಗುತ್ತಿತ್ತು.",
    confidence: "documented",
  },
  {
    id: "howdah-gold",
    year: 1999,
    kind: "document",
    titleEn: "Three-Quarters of a Tonne of Gold",
    titleKn: "ಕಾಲು ಟನ್‌ಗೂ ಹೆಚ್ಚು ಚಿನ್ನ",
    bodyEn:
      "The golden howdah carried in the Jamboo Savari is famously said to weigh around 750 kilograms of gold — a treasure that turns a single elephant into a moving throne.",
    bodyKn:
      "ಜಂಬೂ ಸವಾರಿಯ ಚಿನ್ನದ ಅಂಬಾರಿ ಸುಮಾರು ೭೫೦ ಕೆ.ಜಿ. ಚಿನ್ನ ತೂಗುತ್ತದೆ ಎಂದು ಪ್ರಸಿದ್ಧ.",
    confidence: "documented",
  },
  {
    id: "goddess-howdah",
    year: 1971,
    kind: "tradition",
    titleEn: "The Year the King Stepped Down",
    titleKn: "ರಾಜ ಇಳಿದ ವರ್ಷ",
    bodyEn:
      "After the 1971 abolition of privy purses, the ruler no longer rode in the state procession. The idol of Goddess Chamundeshwari took the golden howdah — and has ridden there ever since.",
    bodyKn:
      "೧೯೭೧ರ ನಂತರ ರಾಜ ಮೆರವಣಿಗೆಯಲ್ಲಿ ಸವಾರಿ ಮಾಡಲಿಲ್ಲ; ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿ ಅಂಬಾರಿ ಏರಿದಳು.",
    confidence: "documented",
  },
  {
    id: "lakh-bulbs",
    year: 2025,
    kind: "photograph",
    titleEn: "One Lakh Points of Light",
    titleKn: "ಒಂದು ಲಕ್ಷ ಬೆಳಕಿನ ಬಿಂದುಗಳು",
    bodyEn:
      "Each Dasara evening the Mysore Palace is outlined by roughly 97,000–100,000 bulbs, switched on at dusk to turn the building into a constellation of gold.",
    bodyKn:
      "ಪ್ರತಿ ದಸರಾ ಸಂಜೆ ಸುಮಾರು ೯೭,೦೦೦–೧,೦೦,೦೦೦ ಬಲ್ಬ್‌ಗಳಿಂದ ಅರಮನೆ ಚಿನ್ನದ ನಕ್ಷತ್ರಪುಂಜವಾಗುತ್ತದೆ.",
    confidence: "documented",
  },
  {
    id: "srirangapatna-1610",
    year: 2010,
    kind: "headline",
    titleEn: "It Began in 1610",
    titleKn: "ಆರಂಭ ೧೬೧೦",
    bodyEn:
      "The Wadiyar Dasara is traced to Raja Wadiyar I celebrating Navaratri at Srirangapatna in 1610, inheriting the Mahanavami tradition of the Vijayanagara Empire.",
    bodyKn:
      "ವಿಜಯನಗರದ ಮಹಾನವಮಿ ಪರಂಪರೆಯನ್ನು ಪಡೆದು ೧೬೧೦ರಲ್ಲಿ ಶ್ರೀರಂಗಪಟ್ಟಣದಲ್ಲಿ ರಾಜ ಒಡೆಯರ್ ನವರಾತ್ರಿ ಆಚರಿಸಿದರು.",
    confidence: "documented",
  },
];

/* ══════════════════════════════════════════════════════════════════════ *
 * SEARCH INDEX — flatten capsules for the search bar
 * ══════════════════════════════════════════════════════════════════════ */
export type SearchHit = { year: number; label: string; snippet: string };

/** Build a lightweight, bilingual search corpus over the capsules. */
export function searchArchive(query: string): SearchHit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const y of DASARA_TIMELINE) {
    const hay = [
      String(y.year),
      y.titleEn,
      y.titleKn,
      y.summaryEn,
      y.summaryKn,
      y.ruler?.en ?? "",
      y.ruler?.kn ?? "",
      ...y.highlights.flatMap((h) => [h.en, h.kn]),
      y.historicMoment?.en ?? "",
      y.government?.en ?? "",
      ...(y.stories?.flatMap((s) => [s.en, s.kn]) ?? []),
    ]
      .join(" \u0000 ")
      .toLowerCase();
    if (hay.includes(q)) {
      hits.push({
        year: y.year,
        label: `${y.year} — ${y.titleEn}`,
        snippet: y.summaryEn.slice(0, 140) + "…",
      });
    }
  }
  return hits;
}

/** Compact, model-ready grounding text for the AI historian. */
export function archiveGrounding(): string {
  return DASARA_TIMELINE.map((y) => {
    const parts = [
      `YEAR ${y.year} (${y.confidence}): ${y.titleEn}.`,
      y.summaryEn,
      y.ruler ? `Ruler/head: ${y.ruler.en}.` : "",
      y.changed ? `Changed vs before: ${y.changed.en}` : "",
      y.historicMoment ? `Historic moment: ${y.historicMoment.en}` : "",
      y.highlights.map((h) => `- ${h.en}`).join(" "),
    ].filter(Boolean);
    return parts.join(" ");
  }).join("\n\n");
}
