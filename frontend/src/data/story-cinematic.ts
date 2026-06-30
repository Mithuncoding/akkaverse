/**
 * Cinematic enrichment layer for Story Mode.
 *
 * The base `stories.ts` holds the words; this file adds the *atmosphere* —
 * the emotional mood that drives colour, lighting and ambient particles, the
 * cinematic scene titles, the gallery of real imagery (sourced live from
 * Wikipedia), and the geography for Journey Mode. Keeping it separate leaves
 * the bilingual prose untouched while letting the experience layer evolve.
 *
 * Each story has six scenes paired 1:1 with the six body paragraphs, and six
 * gallery titles — every title verified to resolve to a real lead image on
 * Wikipedia, so the theater never shows an empty frame.
 *
 * Accents are "R G B" triplet strings, applied as CSS variables and consumed
 * via arbitrary classes like `rgb(var(--accent)/0.3)`.
 */

export type Mood = "peaceful" | "war" | "royal" | "spiritual" | "mystery";

export type ParticleKind = "firefly" | "ember" | "spark" | "lotus" | "dust";

export type MoodTheme = {
  /** Primary accent as "R G B". */
  accent: string;
  /** Secondary accent as "R G B". */
  accent2: string;
  particle: ParticleKind;
  /** Short evocative label for the mood badge. */
  label: string;
  labelKn: string;
};

export const MOOD_THEME: Record<Mood, MoodTheme> = {
  peaceful: {
    accent: "16 185 129",
    accent2: "13 148 136",
    particle: "firefly",
    label: "Serene",
    labelKn: "ಶಾಂತ",
  },
  war: {
    accent: "239 68 68",
    accent2: "234 88 12",
    particle: "ember",
    label: "Valour",
    labelKn: "ಶೌರ್ಯ",
  },
  royal: {
    accent: "245 158 11",
    accent2: "217 119 6",
    particle: "spark",
    label: "Regal",
    labelKn: "ರಾಜಸಿಕ",
  },
  spiritual: {
    accent: "139 92 246",
    accent2: "99 102 241",
    particle: "lotus",
    label: "Sacred",
    labelKn: "ಪವಿತ್ರ",
  },
  mystery: {
    accent: "148 163 184",
    accent2: "126 34 206",
    particle: "dust",
    label: "Mystery",
    labelKn: "ನಿಗೂಢ",
  },
};

export type SceneMeta = { en: string; kn: string };

export type StoryCinematic = {
  mood: Mood;
  /** Large decorative motif glyph behind the title. */
  motif: string;
  /** Map location for Journey Mode: [lng, lat]. */
  coords: [number, number];
  /** Real Wikipedia article titles used for live imagery (one per scene). */
  gallery: string[];
  /** Cinematic title for each scene, paired 1:1 with the story's body paragraphs. */
  scenes: SceneMeta[];
};

export const cinematic: Record<string, StoryCinematic> = {
  punyakoti: {
    mood: "peaceful",
    motif: "🐄",
    coords: [75.72, 14.62],
    gallery: [
      "Western Ghats",
      "Bengal tiger",
      "Indian cattle",
      "Bannerghatta National Park",
      "Tungabhadra River",
      "Punyakoti",
    ],
    scenes: [
      { en: "A Green Valley", kn: "ಹಸಿರು ಕಣಿವೆ" },
      { en: "The Hungry Tiger", kn: "ಹಸಿದ ಹುಲಿ" },
      { en: "A Promise Given", kn: "ಕೊಟ್ಟ ಮಾತು" },
      { en: "The Last Farewell", kn: "ಕೊನೆಯ ಬೀಳ್ಕೊಡುಗೆ" },
      { en: "Truth Triumphs", kn: "ಸತ್ಯದ ಗೆಲುವು" },
      { en: "A Song That Lives", kn: "ಬದುಕುವ ಹಾಡು" },
    ],
  },
  chamundeshwari: {
    mood: "royal",
    motif: "🛕",
    coords: [76.673, 12.272],
    gallery: [
      "Statue of Mahishasura",
      "Mahishasura",
      "Chamundeshwari Temple",
      "Chamundi Hills",
      "Mysore Palace",
      "Mysore Dasara",
    ],
    scenes: [
      { en: "A Reign of Terror", kn: "ಭಯದ ಆಳ್ವಿಕೆ" },
      { en: "The Unkillable Demon", kn: "ಅಮರ ರಾಕ್ಷಸ" },
      { en: "The Goddess Rises", kn: "ದೇವಿಯ ಉದಯ" },
      { en: "Nine Nights of War", kn: "ಒಂಬತ್ತು ರಾತ್ರಿಗಳ ಯುದ್ಧ" },
      { en: "A City Is Named", kn: "ನಗರಕ್ಕೆ ಹೆಸರು" },
      { en: "The Festival of Light", kn: "ಬೆಳಕಿನ ಹಬ್ಬ" },
    ],
  },
  chennamma: {
    mood: "war",
    motif: "🗡️",
    coords: [74.805, 15.622],
    gallery: [
      "Kittur Fort",
      "Kittur",
      "Kittur Chennamma",
      "Belagavi",
      "Indian Rebellion of 1857",
      "Sangolli Rayanna",
    ],
    scenes: [
      { en: "The Throne Falls Empty", kn: "ಬರಿದಾದ ಸಿಂಹಾಸನ" },
      { en: "The Doctrine of Lapse", kn: "ದತ್ತು ನೀತಿ" },
      { en: "A Queen Takes Arms", kn: "ಆಯುಧವೆತ್ತಿದ ರಾಣಿ" },
      { en: "The First Victory", kn: "ಮೊದಲ ಗೆಲುವು" },
      { en: "Betrayal at Kittur", kn: "ಕಿತ್ತೂರಿನ ವಂಚನೆ" },
      { en: "A Flame That Outlives", kn: "ಉಳಿಯುವ ಜ್ವಾಲೆ" },
    ],
  },
  obavva: {
    mood: "war",
    motif: "🪨",
    coords: [76.398, 14.23],
    gallery: [
      "Chitradurga Fort",
      "Chitradurga",
      "Onake Obavva",
      "Hyder Ali",
      "Madakari Nayaka",
      "Tipu Sultan",
    ],
    scenes: [
      { en: "The Fort of Seven Walls", kn: "ಏಳು ಸುತ್ತಿನ ಕೋಟೆ" },
      { en: "The Secret Crevice", kn: "ರಹಸ್ಯ ಕಿಂಡಿ" },
      { en: "A Woman at the Spring", kn: "ಚಿಲುಮೆಯ ಬಳಿ ಹೆಂಗಸು" },
      { en: "The Silent Pestle", kn: "ಮೌನ ಒನಕೆ" },
      { en: "The Breach Holds", kn: "ಸಂದಿ ಉಳಿಯಿತು" },
      { en: "Her Name on the Stone", kn: "ಕಲ್ಲಿನ ಮೇಲೆ ಅವಳ ಹೆಸರು" },
    ],
  },
  gommata: {
    mood: "spiritual",
    motif: "🧘",
    coords: [76.488, 12.857],
    gallery: [
      "Bahubali",
      "Shravanabelagola",
      "Chandragiri, Shravanabelagola",
      "Vindhyagiri Hill, Shravanabelagola",
      "Gommateshwara statue",
      "Mahamastakabhisheka",
    ],
    scenes: [
      { en: "A Duel for a Throne", kn: "ಸಿಂಹಾಸನಕ್ಕಾಗಿ ದ್ವಂದ್ವ" },
      { en: "The Frozen Fist", kn: "ಹೆಪ್ಪುಗಟ್ಟಿದ ಮುಷ್ಟಿ" },
      { en: "The Hollow Crown", kn: "ಟೊಳ್ಳು ಕಿರೀಟ" },
      { en: "Still as Stone", kn: "ಶಿಲೆಯಂತೆ ನಿಶ್ಚಲ" },
      { en: "Carved from One Rock", kn: "ಒಂದೇ ಶಿಲೆಯಿಂದ" },
      { en: "Bathed in Devotion", kn: "ಭಕ್ತಿಯ ಅಭಿಷೇಕ" },
    ],
  },
  akkamahadevi: {
    mood: "spiritual",
    motif: "✍️",
    coords: [75.565, 13.93],
    gallery: [
      "Akka Mahadevi",
      "Srisailam",
      "Shivamogga",
      "Anubhava Mantapa",
      "Basava",
      "Vachana sahitya",
    ],
    scenes: [
      { en: "Born to Devotion", kn: "ಭಕ್ತಿಗಾಗಿ ಜನನ" },
      { en: "The Only Companion", kn: "ಏಕೈಕ ಸಂಗಾತಿ" },
      { en: "Walking Away", kn: "ತೊರೆದು ನಡೆದದ್ದು" },
      { en: "The Hall of Equals", kn: "ಸಮಾನರ ಸಭೆ" },
      { en: "Words of Fire", kn: "ಬೆಂಕಿಯ ಮಾತು" },
      { en: "Across Nine Centuries", kn: "ಒಂಬತ್ತು ಶತಮಾನ ಮೀರಿ" },
    ],
  },
  talakadu: {
    mood: "mystery",
    motif: "🏜️",
    coords: [77.027, 12.192],
    gallery: [
      "Vaidyeshwara Temple, Talakad",
      "Srirangapatna",
      "Wadiyar dynasty",
      "Kaveri",
      "Talakadu",
      "Mysore Kingdom",
    ],
    scenes: [
      { en: "A Town of Temples", kn: "ದೇವಾಲಯಗಳ ನಗರ" },
      { en: "The Tide of Power", kn: "ಅಧಿಕಾರದ ಅಲೆ" },
      { en: "The Queen Pursued", kn: "ಬೆನ್ನಟ್ಟಿದ ರಾಣಿ" },
      { en: "The Threefold Curse", kn: "ಮೂರು ಪಟ್ಟಿನ ಶಾಪ" },
      { en: "Buried in Sand", kn: "ಮರಳಿನಲ್ಲಿ ಹೂತು" },
      { en: "Where Legend Lingers", kn: "ದಂತಕಥೆ ಉಳಿದಲ್ಲಿ" },
    ],
  },
  "hampi-pampa": {
    mood: "royal",
    motif: "🐒",
    coords: [76.462, 15.335],
    gallery: [
      "Tungabhadra River",
      "Hampi",
      "Virupaksha Temple",
      "Vijayanagara",
      "Stone Chariot",
      "Vittala Temple",
    ],
    scenes: [
      { en: "The River Pampa", kn: "ಪಂಪಾ ನದಿ" },
      { en: "Kingdom of Kishkindha", kn: "ಕಿಷ್ಕಿಂಧೆ" },
      { en: "Two Brothers, One Empire", kn: "ಇಬ್ಬರು ಸಹೋದರರು" },
      { en: "A City of Diamonds", kn: "ವಜ್ರಗಳ ನಗರ" },
      { en: "Chariots of Stone", kn: "ಕಲ್ಲಿನ ರಥಗಳು" },
      { en: "Myth Meets History", kn: "ಪುರಾಣ–ಇತಿಹಾಸ ಸಂಗಮ" },
    ],
  },
};

/** Safe accessor — every story has cinematic data, but fall back gracefully. */
export function cinematicFor(id: string): StoryCinematic {
  return (
    cinematic[id] ?? {
      mood: "peaceful",
      motif: "📖",
      coords: [76.2, 14.8],
      gallery: [],
      scenes: [],
    }
  );
}
