/**
 * Heritage Journey — the cinematic data model behind Karnataka's living-museum
 * timeline. Each "chapter" is a civilizational era with rich, structured
 * content (rulers, capitals, architecture, script, trade, military, culture)
 * plus a curated gallery and a web of relations with neighbouring powers.
 *
 * Images are referenced by *Wikipedia article title* (not brittle file paths);
 * the JourneyFigure component fetches the correct lead photo at runtime and
 * gracefully falls back to a designed placeholder when offline.
 *
 * Content is curated from well-known historical milestones. Bilingual fields
 * (`*Kn`) power the EN ⇄ ಕನ್ನಡ experience; long-form English narration carries
 * the depth.
 */

import type { LucideIcon } from "lucide-react";
import {
  Landmark,
  ScrollText,
  Languages,
  Coins,
  Swords,
  Atom,
  Music,
  Flame,
  Ship,
  Sprout,
  Building2,
  Crown,
} from "lucide-react";

export type FacetKind =
  | "architecture"
  | "literature"
  | "script"
  | "trade"
  | "military"
  | "science"
  | "culture"
  | "faith"
  | "economy"
  | "legacy";

export const FACET_ICON: Record<FacetKind, LucideIcon> = {
  architecture: Landmark,
  literature: ScrollText,
  script: Languages,
  trade: Ship,
  military: Swords,
  science: Atom,
  culture: Music,
  faith: Flame,
  economy: Coins,
  legacy: Sprout,
};

export type Facet = {
  kind: FacetKind;
  /** Short bilingual kicker, e.g. "Architecture · ವಾಸ್ತುಶಿಲ್ಪ". */
  kicker: string;
  kickerKn: string;
  title: string;
  body: string;
  /** Optional Wikipedia title to illustrate this facet. */
  wiki?: string;
};

export type GalleryItem = {
  /** Wikipedia article title used to source the image. */
  wiki: string;
  caption: string;
  captionKn?: string;
  /** Loose kind label shown as a chip (Monument, Coin, Manuscript…). */
  tag: string;
  tagKn: string;
};

export type RelationKind = "alliance" | "rivalry" | "trade" | "cultural";

export type Relation = {
  kind: RelationKind;
  /** Who the era interacted with. */
  with: string;
  withKn: string;
  note: string;
};

export type ChapterFigure = {
  name: string;
  nameKn: string;
  role: string;
  roleKn: string;
  /** Wikipedia title for the portrait. */
  wiki: string;
  blurb: string;
  fact: string;
};

export type Chapter = {
  id: string;
  /** Roman-numeral order shown in the cover. */
  numeral: string;
  name: string;
  nameKn: string;
  /** Year range label, e.g. "345 – 753 CE". */
  years: string;
  sortStart: number;
  /** One-line poetic essence. */
  essence: string;
  essenceKn: string;
  /** Accent as an "R G B" triplet so components can theme via rgb(var()). */
  accent: string;
  accent2: string;
  /** Wikipedia title for the full-bleed cover image. */
  cover: string;
  /** Long-form narration. */
  lead: string;
  leadKn: string;
  /** Capital marker for the mini-map: [lng, lat] + label. */
  capital?: { name: string; nameKn: string; coords: [number, number] };
  atGlance: { label: string; labelKn: string; value: string; valueKn: string }[];
  facets: Facet[];
  gallery: GalleryItem[];
  relations: Relation[];
  figures: ChapterFigure[];
};

export const chapters: Chapter[] = [
  /* ------------------------------------------------------------------ */
  {
    id: "ancient-dawn",
    numeral: "I",
    name: "The First Light",
    nameKn: "ಮೊದಲ ಬೆಳಕು",
    years: "Prehistory – 600 CE",
    sortStart: -300,
    essence: "Ashoka's edicts, the first native kings, and the oldest words ever written in Kannada.",
    essenceKn: "ಅಶೋಕನ ಶಾಸನಗಳು, ಮೊದಲ ಸ್ಥಳೀಯ ಅರಸರು, ಮತ್ತು ಕನ್ನಡದ ಅತಿ ಪುರಾತನ ಬರಹ.",
    accent: "217 119 6",
    accent2: "180 83 9",
    cover: "Banavasi",
    lead: "Long before empires, the red soil of Karnataka held Neolithic ash-mounds and Iron Age megaliths. In the 3rd century BCE, Emperor Ashoka carved his Buddhist edicts into rock at Brahmagiri and Maski — the first time Karnataka enters written history. As the Mauryas faded, the Satavahanas and then home-grown powers rose: the Kadambas of Banavasi (345 CE), founded by the warrior-priest Mayurasharma, and the Western Gangas of Talakad. For the first time, kings governed in Kannada — and at Halmidi in 450 CE, an inscription was cut that remains the oldest dated record of the language alive today.",
    leadKn: "ಸಾಮ್ರಾಜ್ಯಗಳಿಗೂ ಮೊದಲೇ ಕರ್ನಾಟಕದ ಕೆಂಪು ಮಣ್ಣಿನಲ್ಲಿ ನವಶಿಲಾಯುಗದ ಬೂದಿದಿಬ್ಬಗಳಿದ್ದವು. ಕ್ರಿ.ಪೂ. 3ನೇ ಶತಮಾನದಲ್ಲಿ ಅಶೋಕ ಚಕ್ರವರ್ತಿ ಬ್ರಹ್ಮಗಿರಿಯಲ್ಲಿ ತನ್ನ ಶಾಸನಗಳನ್ನು ಕೆತ್ತಿಸಿದ — ಕರ್ನಾಟಕ ಇತಿಹಾಸದಲ್ಲಿ ಮೊದಲ ಬಾರಿ ದಾಖಲಾಯಿತು. ಬನವಾಸಿಯ ಕದಂಬರು (345) ಮತ್ತು ತಲಕಾಡಿನ ಗಂಗರು ಕನ್ನಡದಲ್ಲಿ ಆಳಿದರು. 450ರ ಹಲ್ಮಿಡಿ ಶಾಸನ ಇಂದಿಗೂ ಭಾಷೆಯ ಅತಿ ಹಳೆಯ ದಾಖಲೆ.",
    capital: { name: "Banavasi", nameKn: "ಬನವಾಸಿ", coords: [75.02, 14.53] },
    atGlance: [
      { label: "First capital", labelKn: "ಮೊದಲ ರಾಜಧಾನಿ", value: "Banavasi", valueKn: "ಬನವಾಸಿ" },
      { label: "Founder", labelKn: "ಸ್ಥಾಪಕ", value: "Mayurasharma", valueKn: "ಮಯೂರಶರ್ಮ" },
      { label: "Oldest Kannada", labelKn: "ಹಳೆಯ ಕನ್ನಡ", value: "Halmidi, 450 CE", valueKn: "ಹಲ್ಮಿಡಿ, 450" },
      { label: "Faiths", labelKn: "ಧರ್ಮಗಳು", value: "Jain · Buddhist · Hindu", valueKn: "ಜೈನ · ಬೌದ್ಧ · ಹಿಂದೂ" },
    ],
    facets: [
      {
        kind: "script",
        kicker: "Script · ಲಿಪಿ",
        kickerKn: "ಲಿಪಿ",
        title: "Kannada is born in stone",
        body: "The Halmidi inscription (450 CE) is the earliest dated Kannada writing — proof of a language already used for poetry and governance. Kannada script evolved from the Brahmi-derived Kadamba script, the common ancestor it shares with Telugu.",
      },
      {
        kind: "faith",
        kicker: "Faith · ಧರ್ಮ",
        kickerKn: "ಧರ್ಮ",
        title: "A land of three paths",
        body: "Ashoka's edicts spread Buddhist ethics; Jain monks made Shravanabelagola a centre of learning; and early Hindu shrines rose at Banavasi. Karnataka's tradition of religious pluralism begins here.",
        wiki: "Edicts of Ashoka",
      },
      {
        kind: "military",
        kicker: "Power · ಶಕ್ತಿ",
        kickerKn: "ಶಕ್ತಿ",
        title: "The first native crown",
        body: "Legend says Mayurasharma, a Brahmin scholar humiliated at the Pallava court, took up the sword and carved out the Kadamba kingdom — the first state ruled from Karnataka, by Kannadigas.",
        wiki: "Kadamba dynasty",
      },
    ],
    gallery: [
      { wiki: "Halmidi inscription", caption: "The Halmidi inscription — oldest Kannada", captionKn: "ಹಲ್ಮಿಡಿ ಶಾಸನ", tag: "Manuscript", tagKn: "ಶಾಸನ" },
      { wiki: "Gommateshwara statue", caption: "Shravanabelagola, a Jain beacon", captionKn: "ಶ್ರವಣಬೆಳಗೊಳ", tag: "Heritage", tagKn: "ಪರಂಪರೆ" },
      { wiki: "Talakad", caption: "Talakad, the buried Ganga capital", captionKn: "ತಲಕಾಡು", tag: "Heritage", tagKn: "ಪರಂಪರೆ" },
    ],
    relations: [
      { kind: "rivalry", with: "Pallavas", withKn: "ಪಲ್ಲವರು", note: "Mayurasharma's revolt against Pallava overlords founded the Kadamba state." },
      { kind: "cultural", with: "Mauryan Empire", withKn: "ಮೌರ್ಯ ಸಾಮ್ರಾಜ್ಯ", note: "Ashoka's rock edicts brought writing and Buddhist ethics to the region." },
    ],
    figures: [
      {
        name: "Mayurasharma",
        nameKn: "ಮಯೂರಶರ್ಮ",
        role: "Founder, Kadamba dynasty",
        roleKn: "ಕದಂಬ ಸ್ಥಾಪಕ",
        wiki: "Mayurasharma",
        blurb: "A Vedic scholar who traded the sacred grass for the spear and won Karnataka its first home-ruled kingdom.",
        fact: "He is said to have performed eighteen horse sacrifices to legitimise his new crown.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "chalukya-rashtrakuta",
    numeral: "II",
    name: "The Cradle of Temples",
    nameKn: "ದೇವಾಲಯಗಳ ತೊಟ್ಟಿಲು",
    years: "543 – 973 CE",
    sortStart: 543,
    essence: "From Badami's cliffs the Chalukyas invented an architecture — and the Rashtrakutas wrote Kannada's first book.",
    essenceKn: "ಬಾದಾಮಿಯ ಬಂಡೆಗಳಿಂದ ಚಾಲುಕ್ಯರು ಹೊಸ ವಾಸ್ತುಶಿಲ್ಪ ಸೃಷ್ಟಿಸಿದರು — ರಾಷ್ಟ್ರಕೂಟರು ಕನ್ನಡದ ಮೊದಲ ಗ್ರಂಥ ಬರೆದರು.",
    accent: "234 88 12",
    accent2: "194 65 12",
    cover: "Badami",
    lead: "From the red sandstone of Badami, the Chalukyas built a laboratory of stone. At Aihole, Badami and Pattadakal they fused northern (Nagara) and southern (Dravida) styles into the Vesara — a Karnataka invention that would shape a thousand years of temple-building. Under Pulakeshin II, the empire stretched coast to coast; in 618 CE he halted the great northern emperor Harsha at the Narmada, an event proudly recorded in the Aihole inscription. The Rashtrakutas who followed ruled much of the subcontinent from Manyakheta, carved the monolithic Kailasa temple at Ellora, and gave the world Kavirajamarga (c. 850 CE) — the oldest surviving work of Kannada literature, sponsored by emperor Amoghavarsha I.",
    leadKn: "ಬಾದಾಮಿಯ ಮರಳುಗಲ್ಲಿನಿಂದ ಚಾಲುಕ್ಯರು ಶಿಲೆಯ ಪ್ರಯೋಗಶಾಲೆ ನಿರ್ಮಿಸಿದರು. ಐಹೊಳೆ, ಬಾದಾಮಿ, ಪಟ್ಟದಕಲ್ಲುಗಳಲ್ಲಿ ನಾಗರ ಮತ್ತು ದ್ರಾವಿಡ ಶೈಲಿಗಳನ್ನು ಬೆಸೆದು 'ವೇಸರ' ಶೈಲಿ ಹುಟ್ಟಿಸಿದರು. ಎರಡನೇ ಪುಲಕೇಶಿ ಹರ್ಷನನ್ನು ತಡೆದ. ರಾಷ್ಟ್ರಕೂಟ ಅಮೋಘವರ್ಷ 'ಕವಿರಾಜಮಾರ್ಗ'ವನ್ನು (ಸು. 850) ಪೋಷಿಸಿದ — ಕನ್ನಡದ ಅತಿ ಹಳೆಯ ಲಭ್ಯ ಕೃತಿ.",
    capital: { name: "Badami (Vatapi)", nameKn: "ಬಾದಾಮಿ", coords: [75.68, 15.92] },
    atGlance: [
      { label: "Capital", labelKn: "ರಾಜಧಾನಿ", value: "Badami → Manyakheta", valueKn: "ಬಾದಾಮಿ → ಮಾನ್ಯಖೇಟ" },
      { label: "Peak ruler", labelKn: "ಶ್ರೇಷ್ಠ ಅರಸ", value: "Pulakeshin II", valueKn: "ಎರಡನೇ ಪುಲಕೇಶಿ" },
      { label: "Gift to the world", labelKn: "ಕೊಡುಗೆ", value: "Vesara architecture", valueKn: "ವೇಸರ ಶೈಲಿ" },
      { label: "UNESCO site", labelKn: "ಯುನೆಸ್ಕೋ", value: "Pattadakal", valueKn: "ಪಟ್ಟದಕಲ್ಲು" },
    ],
    facets: [
      {
        kind: "architecture",
        kicker: "Architecture · ವಾಸ್ತುಶಿಲ್ಪ",
        kickerKn: "ವಾಸ್ತುಶಿಲ್ಪ",
        title: "Where Indian temples grew up",
        body: "Aihole is called the 'cradle of Indian temple architecture.' At Pattadakal — a UNESCO World Heritage Site — ten temples stand side by side, a textbook in stone of how the Nagara and Dravida styles met and merged.",
      },
      {
        kind: "literature",
        kicker: "Literature · ಸಾಹಿತ್ಯ",
        kickerKn: "ಸಾಹಿತ್ಯ",
        title: "Kannada's first book",
        body: "Kavirajamarga (c. 850 CE), composed under Amoghavarsha I, is the earliest Kannada literary work. It already speaks of a confident literary culture 'from the Kaveri to the Godavari' where the people were skilled in poetry.",
        wiki: "Kavirajamarga",
      },
      {
        kind: "military",
        kicker: "War · ಯುದ್ಧ",
        kickerKn: "ಯುದ್ಧ",
        title: "The emperor who stopped Harsha",
        body: "In 618 CE Pulakeshin II defeated Harshavardhana of Kannauj on the banks of the Narmada — the only major check on Harsha's power. A Persian embassy from Khosrow II even visited his court.",
      },
      {
        kind: "trade",
        kicker: "Trade · ವ್ಯಾಪಾರ",
        kickerKn: "ವ್ಯಾಪಾರ",
        title: "Courts that spanned the seas",
        body: "Rashtrakuta wealth astonished foreign visitors; the Arab traveller Al-Masudi ranked their emperor among the four great kings of the world. Spices and textiles flowed to the Persian Gulf.",
        wiki: "Rashtrakuta dynasty",
      },
    ],
    gallery: [
      { wiki: "Badami cave temples", caption: "The rock-cut caves of Badami", captionKn: "ಬಾದಾಮಿ ಗುಹೆಗಳು", tag: "Monument", tagKn: "ಸ್ಮಾರಕ" },
      { wiki: "Pattadakal", caption: "The temple complex at Pattadakal", captionKn: "ಪಟ್ಟದಕಲ್ಲು", tag: "UNESCO", tagKn: "ಯುನೆಸ್ಕೋ" },
      { wiki: "Aihole", caption: "Durga temple, Aihole", captionKn: "ದುರ್ಗ ದೇವಾಲಯ, ಐಹೊಳೆ", tag: "Heritage", tagKn: "ಪರಂಪರೆ" },
      { wiki: "Kailasa Temple, Ellora", caption: "Kailasa at Ellora — carved top-down from one rock", captionKn: "ಎಲ್ಲೋರಾ ಕೈಲಾಸ", tag: "Wonder", tagKn: "ಅದ್ಭುತ" },
    ],
    relations: [
      { kind: "rivalry", with: "Pallavas of Kanchi", withKn: "ಕಂಚಿಯ ಪಲ್ಲವರು", note: "A century-long contest for the Deccan; both capitals were sacked in turn." },
      { kind: "rivalry", with: "Harsha of Kannauj", withKn: "ಕನ್ನೌಜ್‌ನ ಹರ್ಷ", note: "Pulakeshin II's victory at the Narmada (618 CE) defined the era." },
      { kind: "trade", with: "Abbasid Caliphate", withKn: "ಅಬ್ಬಾಸಿದ್ ಖಲೀಫರು", note: "Rashtrakuta ports traded spices and cloth with the Arab world." },
    ],
    figures: [
      {
        name: "Pulakeshin II",
        nameKn: "ಎರಡನೇ ಪುಲಕೇಶಿ",
        role: "Chalukya emperor",
        roleKn: "ಚಾಲುಕ್ಯ ಚಕ್ರವರ್ತಿ",
        wiki: "Pulakeshin II",
        blurb: "The greatest Chalukya, he ruled from sea to sea and was the only Indian king to defeat Harsha.",
        fact: "He exchanged ambassadors with the Sasanian Persian emperor Khosrow II — a meeting painted at Ajanta.",
      },
      {
        name: "Amoghavarsha I",
        nameKn: "ಒಂದನೇ ಅಮೋಘವರ್ಷ",
        role: "Rashtrakuta emperor & author",
        roleKn: "ರಾಷ್ಟ್ರಕೂಟ ಚಕ್ರವರ್ತಿ",
        wiki: "Amoghavarsha",
        blurb: "A philosopher-king who preferred letters to war and patronised Kannada's first literature.",
        fact: "Often called the 'Ashoka of the South' for his Jain devotion and peaceful temperament.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "hoysala",
    numeral: "III",
    name: "The Age of Stone Lace",
    nameKn: "ಶಿಲಾ ಕಸೂತಿಯ ಯುಗ",
    years: "1006 – 1346 CE",
    sortStart: 1006,
    essence: "The Hoysalas turned soapstone into lace — temples so detailed they still defy belief.",
    essenceKn: "ಹೊಯ್ಸಳರು ಬಳಪದ ಕಲ್ಲನ್ನು ಕಸೂತಿಯಾಗಿಸಿದರು — ಇಂದಿಗೂ ಬೆರಗುಗೊಳಿಸುವ ದೇವಾಲಯಗಳು.",
    accent: "225 29 72",
    accent2: "190 18 60",
    cover: "Chennakeshava Temple, Belur",
    lead: "From their hill capital at Dwarasamudra (Halebidu), the Hoysalas perfected an art unlike anything before. Carving in soft chloritic schist that hardens with time, their sculptors worked stone into jewellery — bracketed madanika figures, friezes of marching elephants, and the entire Ramayana wrapped around a wall. King Vishnuvardhana raised the Chennakeshava Temple at Belur in 1117; Halebidu and, in 2023, Somanathapura joined UNESCO's World Heritage list. This was also the age of the Western Chalukyas of Kalyani, whose ruler Vikramaditya VI began his own calendar era, and of the philosopher Ramanuja, who found refuge here.",
    leadKn: "ಹಳೇಬೀಡಿನ (ದ್ವಾರಸಮುದ್ರ) ಗಿರಿ ರಾಜಧಾನಿಯಿಂದ ಹೊಯ್ಸಳರು ಅಪೂರ್ವ ಕಲೆಯನ್ನು ಪರಿಪೂರ್ಣಗೊಳಿಸಿದರು. ಬಳಪದ ಕಲ್ಲನ್ನು ಆಭರಣವಾಗಿ ಕೆತ್ತಿದರು. ವಿಷ್ಣುವರ್ಧನ 1117ರಲ್ಲಿ ಬೇಲೂರಿನ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ಕಟ್ಟಿಸಿದ. ಹಳೇಬೀಡು ಮತ್ತು ಸೋಮನಾಥಪುರ ಯುನೆಸ್ಕೋ ಪಟ್ಟಿಯಲ್ಲಿವೆ.",
    capital: { name: "Halebidu", nameKn: "ಹಳೇಬೀಡು", coords: [75.99, 13.21] },
    atGlance: [
      { label: "Capital", labelKn: "ರಾಜಧಾನಿ", value: "Dwarasamudra (Halebidu)", valueKn: "ದ್ವಾರಸಮುದ್ರ" },
      { label: "Master builder", labelKn: "ನಿರ್ಮಾತೃ", value: "Vishnuvardhana", valueKn: "ವಿಷ್ಣುವರ್ಧನ" },
      { label: "Star sculptor", labelKn: "ಶಿಲ್ಪಿ", value: "Jakanachari (legend)", valueKn: "ಜಕಣಾಚಾರಿ" },
      { label: "UNESCO 2023", labelKn: "ಯುನೆಸ್ಕೋ 2023", value: "Belur · Halebidu · Somanathapura", valueKn: "ಬೇಲೂರು · ಹಳೇಬೀಡು" },
    ],
    facets: [
      {
        kind: "architecture",
        kicker: "Architecture · ವಾಸ್ತುಶಿಲ್ಪ",
        kickerKn: "ವಾಸ್ತುಶಿಲ್ಪ",
        title: "Stone carved like ivory",
        body: "Hoysala temples sit on star-shaped platforms and are covered in horizontal friezes — elephants for strength, lions for courage, horses for speed. Some pillars were lathe-turned to a mirror finish. Artists signed their work, a rarity in medieval India.",
      },
      {
        kind: "culture",
        kicker: "Dance · ನೃತ್ಯ",
        kickerKn: "ನೃತ್ಯ",
        title: "Queen Shantala's grace",
        body: "The bracket figures of Belur — the celebrated madanikas — are said to echo Queen Shantala Devi, a renowned dancer. They freeze music and movement in stone forever.",
      },
      {
        kind: "faith",
        kicker: "Philosophy · ತತ್ವ",
        kickerKn: "ತತ್ವ",
        title: "A refuge for Ramanuja",
        body: "The Vaishnava philosopher Ramanuja took shelter in Hoysala lands; his influence helped turn Vishnuvardhana from Jainism to Vaishnavism — a shift written across the temples themselves.",
        wiki: "Ramanuja",
      },
    ],
    gallery: [
      { wiki: "Hoysaleswara Temple", caption: "Hoysaleswara Temple, Halebidu", captionKn: "ಹೊಯ್ಸಳೇಶ್ವರ, ಹಳೇಬೀಡು", tag: "Monument", tagKn: "ಸ್ಮಾರಕ" },
      { wiki: "Chennakesava Temple, Somanathapura", caption: "Keshava Temple, Somanathapura", captionKn: "ಕೇಶವ, ಸೋಮನಾಥಪುರ", tag: "Heritage", tagKn: "ಪರಂಪರೆ" },
      { wiki: "Halebidu", caption: "Halebidu, the Hoysala capital", captionKn: "ಹಳೇಬೀಡು", tag: "Heritage", tagKn: "ಪರಂಪರೆ" },
    ],
    relations: [
      { kind: "rivalry", with: "Cholas of Tanjore", withKn: "ತಂಜಾವೂರಿನ ಚೋಳರು", note: "Vishnuvardhana's victories against the Cholas earned the Hoysalas independence." },
      { kind: "rivalry", with: "Seunas (Yadavas)", withKn: "ಸೇವುಣರು", note: "A constant struggle for the Deccan with the Yadavas of Devagiri." },
      { kind: "cultural", with: "Srivaishnava tradition", withKn: "ಶ್ರೀವೈಷ್ಣವ", note: "Ramanuja's arrival reshaped the kingdom's faith and art." },
    ],
    figures: [
      {
        name: "Vishnuvardhana",
        nameKn: "ವಿಷ್ಣುವರ್ಧನ",
        role: "Hoysala king",
        roleKn: "ಹೊಯ್ಸಳ ಅರಸ",
        wiki: "Vishnuvardhana",
        blurb: "Warrior and builder who freed the Hoysalas from Chola rule and commissioned the Belur masterpiece.",
        fact: "He built the Chennakeshava Temple to mark his victory at Talakad — it took 103 years to complete.",
      },
      {
        name: "Shantala Devi",
        nameKn: "ಶಾಂತಲಾ ದೇವಿ",
        role: "Queen & dancer",
        roleKn: "ರಾಣಿ ಮತ್ತು ನರ್ತಕಿ",
        wiki: "Shantala Devi",
        blurb: "A celebrated patron of dance and the arts, immortalised in the bracket sculptures of Belur.",
        fact: "Karnataka's state dance fellowship and films still carry her name as a symbol of grace.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "vachana",
    numeral: "IV",
    name: "The Revolution of Words",
    nameKn: "ವಚನ ಕ್ರಾಂತಿ",
    years: "12th century",
    sortStart: 1150,
    essence: "In Kalyana, a parliament of mystics declared that work is worship and all are equal — eight centuries early.",
    essenceKn: "ಕಲ್ಯಾಣದಲ್ಲಿ ಶರಣರ ಸಭೆ 'ಕಾಯಕವೇ ಕೈಲಾಸ', ಎಲ್ಲರೂ ಸಮಾನ ಎಂದು ಸಾರಿತು — ಎಂಟು ಶತಮಾನ ಮುಂಚೆ.",
    accent: "139 92 246",
    accent2: "109 40 217",
    cover: "Basavakalyan",
    lead: "Not every revolution is fought with armies. In 12th-century Kalyana, the statesman-mystic Basavanna gathered poets, cobblers, queens and farmers into the Anubhava Mantapa — a 'hall of experience' that worked like an early democratic parliament of ideas. They rejected caste, ritual and temple hierarchy, and poured their philosophy into Vachanas: short, fierce, free-verse poems in everyday Kannada. Akka Mahadevi walked away from royalty to write some of the boldest feminist verse in any language; Allama Prabhu presided as a riddling sage. Their movement gave Kannada a literature of conscience that ordinary people could recite — and still do.",
    leadKn: "ಎಲ್ಲ ಕ್ರಾಂತಿಗಳೂ ಸೈನ್ಯದಿಂದಲ್ಲ. 12ನೇ ಶತಮಾನದ ಕಲ್ಯಾಣದಲ್ಲಿ ಬಸವಣ್ಣ ಕವಿ, ಚಮ್ಮಾರ, ರಾಣಿ, ರೈತರನ್ನು 'ಅನುಭವ ಮಂಟಪ'ದಲ್ಲಿ ಒಗ್ಗೂಡಿಸಿದ. ಜಾತಿ, ಆಚಾರವನ್ನು ತಿರಸ್ಕರಿಸಿ ಸರಳ ಕನ್ನಡದ ವಚನಗಳಲ್ಲಿ ತತ್ವ ಹೇಳಿದರು. ಅಕ್ಕಮಹಾದೇವಿ ರಾಜವೈಭವ ತೊರೆದು ದಿಟ್ಟ ಕಾವ್ಯ ಬರೆದಳು.",
    capital: { name: "Kalyana", nameKn: "ಕಲ್ಯಾಣ", coords: [76.95, 17.87] },
    atGlance: [
      { label: "Movement", labelKn: "ಚಳವಳಿ", value: "Sharana / Vachana", valueKn: "ಶರಣ / ವಚನ" },
      { label: "Leader", labelKn: "ನಾಯಕ", value: "Basavanna", valueKn: "ಬಸವಣ್ಣ" },
      { label: "Idea", labelKn: "ತತ್ವ", value: "Kayaka — work is worship", valueKn: "ಕಾಯಕವೇ ಕೈಲಾಸ" },
      { label: "Form", labelKn: "ರೂಪ", value: "Free-verse Vachanas", valueKn: "ವಚನ ಸಾಹಿತ್ಯ" },
    ],
    facets: [
      {
        kind: "literature",
        kicker: "Literature · ಸಾಹಿತ್ಯ",
        kickerKn: "ಸಾಹಿತ್ಯ",
        title: "Poetry anyone could speak",
        body: "Vachanas abandoned ornate Sanskritic metre for plain spoken Kannada, each ending with the poet's signature 'mudra'. They remain among the most quoted lines in the language — 'Kayakave Kailasa' (work itself is heaven).",
      },
      {
        kind: "faith",
        kicker: "Reform · ಸುಧಾರಣೆ",
        kickerKn: "ಸುಧಾರಣೆ",
        title: "A parliament of equals",
        body: "The Anubhava Mantapa welcomed people of every caste and gender to debate philosophy as equals — a radical experiment in social democracy that predates such ideas in Europe by centuries.",
      },
      {
        kind: "culture",
        kicker: "Voice · ಧ್ವನಿ",
        kickerKn: "ಧ್ವನಿ",
        title: "Akka Mahadevi's defiance",
        body: "A 12th-century woman who renounced everything — clothing, court, convention — to seek the divine on her own terms, leaving verse of startling courage and intimacy.",
      },
    ],
    gallery: [
      { wiki: "Kudalasangama", caption: "Kudalasangama, Basavanna's shrine", captionKn: "ಕೂಡಲಸಂಗಮ", tag: "Place", tagKn: "ಸ್ಥಳ" },
      { wiki: "Bidar Fort", caption: "Bidar Fort, near Kalyana", captionKn: "ಬೀದರ್ ಕೋಟೆ", tag: "Fort", tagKn: "ಕೋಟೆ" },
    ],
    relations: [
      { kind: "rivalry", with: "Orthodox order", withKn: "ಸಂಪ್ರದಾಯವಾದಿಗಳು", note: "The movement's challenge to caste drew fierce backlash in Kalyana." },
      { kind: "cultural", with: "Kalachuris of Kalyani", withKn: "ಕಲಚೂರಿಗಳು", note: "Basavanna served as treasurer at the Kalachuri court of Bijjala II." },
    ],
    figures: [
      {
        name: "Basavanna",
        nameKn: "ಬಸವಣ್ಣ",
        role: "Philosopher & statesman",
        roleKn: "ತತ್ವಜ್ಞಾನಿ",
        wiki: "Basava",
        blurb: "The 12th-century reformer who built a casteless community of devotion and gave Kannada its conscience.",
        fact: "His image appears in India's Parliament, and he is honoured on Indian currency and stamps.",
      },
      {
        name: "Akka Mahadevi",
        nameKn: "ಅಕ್ಕಮಹಾದೇವಿ",
        role: "Mystic poet",
        roleKn: "ಮಿಸ್ಟಿಕ್ ಕವಯಿತ್ರಿ",
        wiki: "Akka Mahadevi",
        blurb: "One of the earliest women poets of Kannada, whose Vachanas blaze with spiritual and personal freedom.",
        fact: "She wrote around 430 Vachanas under the signature 'Chennamallikarjuna'.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "vijayanagara",
    numeral: "V",
    name: "The City of Victory",
    nameKn: "ವಿಜಯದ ನಗರ",
    years: "1336 – 1646 CE",
    sortStart: 1336,
    essence: "Hampi — a capital of half a million, where diamonds were sold by the street and temples sang.",
    essenceKn: "ಹಂಪಿ — ಐದು ಲಕ್ಷ ಜನರ ರಾಜಧಾನಿ, ಬೀದಿಗಳಲ್ಲಿ ವಜ್ರ ಮಾರಾಟ, ಹಾಡುವ ದೇವಾಲಯಗಳು.",
    accent: "245 158 11",
    accent2: "217 119 6",
    cover: "Hampi",
    lead: "Founded in 1336 by Harihara and Bukka to defend southern India, Vijayanagara grew into one of the richest cities on Earth. At its height under Krishnadevaraya (1509–1529), Hampi sprawled across 26 km² and held perhaps half a million people. Persian and Portuguese visitors wrote in astonishment of bazaars where pearls and diamonds were heaped like grain, of irrigation that turned rock into garden, and of the Vittala temple whose stone pillars ring like instruments. The empire was the great patron of Carnatic music and Telugu-Kannada literature — until a coalition of Deccan sultanates broke its army at Talikota in 1565, and the city was abandoned to time.",
    leadKn: "1336ರಲ್ಲಿ ಹರಿಹರ-ಬುಕ್ಕರಿಂದ ಸ್ಥಾಪಿತವಾದ ವಿಜಯನಗರ ಜಗತ್ತಿನ ಶ್ರೀಮಂತ ನಗರಗಳಲ್ಲಿ ಒಂದಾಯಿತು. ಕೃಷ್ಣದೇವರಾಯನ ಕಾಲದಲ್ಲಿ ಹಂಪಿ 26 ಚ.ಕಿ.ಮೀ ವಿಸ್ತಾರ, ಸುಮಾರು ಐದು ಲಕ್ಷ ಜನ. ವಿದೇಶಿ ಪ್ರವಾಸಿಗರು ವಜ್ರ-ಮುತ್ತಿನ ಮಾರುಕಟ್ಟೆ ಕಂಡು ಬೆರಗಾದರು. 1565ರ ತಾಳೀಕೋಟೆ ಯುದ್ಧದಲ್ಲಿ ಸೋಲು.",
    capital: { name: "Hampi", nameKn: "ಹಂಪಿ", coords: [76.46, 15.33] },
    atGlance: [
      { label: "Capital", labelKn: "ರಾಜಧಾನಿ", value: "Vijayanagara (Hampi)", valueKn: "ಹಂಪಿ" },
      { label: "Golden ruler", labelKn: "ಸುವರ್ಣ ಅರಸ", value: "Krishnadevaraya", valueKn: "ಕೃಷ್ಣದೇವರಾಯ" },
      { label: "Population", labelKn: "ಜನಸಂಖ್ಯೆ", value: "~500,000", valueKn: "~5 ಲಕ್ಷ" },
      { label: "End", labelKn: "ಅಂತ್ಯ", value: "Talikota, 1565", valueKn: "ತಾಳೀಕೋಟೆ, 1565" },
    ],
    facets: [
      {
        kind: "trade",
        kicker: "Trade · ವ್ಯಾಪಾರ",
        kickerKn: "ವ್ಯಾಪಾರ",
        title: "Diamonds sold like grain",
        body: "Portuguese chronicler Domingo Paes described Hampi's markets as overflowing with rubies, pearls and diamonds. The empire imported Arabian and Persian warhorses by the thousand and exported spices, cotton and iron across the Indian Ocean.",
      },
      {
        kind: "architecture",
        kicker: "Architecture · ವಾಸ್ತುಶಿಲ್ಪ",
        kickerKn: "ವಾಸ್ತುಶಿಲ್ಪ",
        title: "Temples that make music",
        body: "The Vittala temple's stone chariot is Karnataka's most famous monument, and its 56 'SaReGaMa' pillars produce musical notes when struck. The Virupaksha temple has been in continuous worship for over 700 years.",
      },
      {
        kind: "science",
        kicker: "Engineering · ಎಂಜಿನಿಯರಿಂಗ್",
        kickerKn: "ಎಂಜಿನಿಯರಿಂಗ್",
        title: "Water from rock",
        body: "Vijayanagara's hydraulic engineers built aqueducts, tanks and stepped wells that carried water across a granite landscape — feeding a vast city and its gardens in a near-desert.",
      },
      {
        kind: "literature",
        kicker: "Culture · ಸಂಸ್ಕೃತಿ",
        kickerKn: "ಸಂಸ್ಕೃತಿ",
        title: "A court of eight poets",
        body: "Krishnadevaraya — himself an author — kept the 'Ashtadiggajas', eight legendary poets, at court. The era also nurtured the Haridasa devotional tradition that became the foundation of Carnatic music.",
      },
    ],
    gallery: [
      { wiki: "Hampi", caption: "The boulder-strewn ruins of Vijayanagara", captionKn: "ಹಂಪಿ ಅವಶೇಷ", tag: "Heritage", tagKn: "ಪರಂಪರೆ" },
      { wiki: "Virupaksha Temple", caption: "Virupaksha temple gopura", captionKn: "ವಿರೂಪಾಕ್ಷ ಗೋಪುರ", tag: "UNESCO", tagKn: "ಯುನೆಸ್ಕೋ" },
      { wiki: "Lotus Mahal", caption: "Lotus Mahal, royal enclosure", captionKn: "ಕಮಲ ಮಹಲ್", tag: "Palace", tagKn: "ಅರಮನೆ" },
    ],
    relations: [
      { kind: "rivalry", with: "Deccan Sultanates", withKn: "ಡೆಕ್ಕನ್ ಸುಲ್ತಾನರು", note: "A shifting cold war that ended in the catastrophic defeat at Talikota (1565)." },
      { kind: "trade", with: "Portugal", withKn: "ಪೋರ್ಚುಗಲ್", note: "Goa-based Portuguese traders supplied warhorses and bought spices and gems." },
      { kind: "alliance", with: "Gajapatis & local chiefs", withKn: "ಗಜಪತಿಗಳು", note: "Krishnadevaraya's campaigns reshaped alliances across the eastern Deccan." },
    ],
    figures: [
      {
        name: "Krishnadevaraya",
        nameKn: "ಕೃಷ್ಣದೇವರಾಯ",
        role: "Emperor of Vijayanagara",
        roleKn: "ವಿಜಯನಗರ ಚಕ್ರವರ್ತಿ",
        wiki: "Krishnadevaraya",
        blurb: "Warrior, administrator and poet who carried the empire to its golden zenith of wealth and art.",
        fact: "He wrote 'Amuktamalyada', a Telugu epic, and was praised by the Portuguese as a just and brilliant king.",
      },
      {
        name: "Purandara Dasa",
        nameKn: "ಪುರಂದರ ದಾಸ",
        role: "Father of Carnatic music",
        roleKn: "ಕರ್ನಾಟಕ ಸಂಗೀತ ಪಿತಾಮಹ",
        wiki: "Purandara Dasa",
        blurb: "The Haridasa saint-composer who systematised Carnatic music teaching — still used to begin every lesson.",
        fact: "He is believed to have composed nearly 475,000 songs; the foundational exercises are his to this day.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "mysore-tipu",
    numeral: "VI",
    name: "Tigers and Rockets",
    nameKn: "ಹುಲಿಗಳು ಮತ್ತು ರಾಕೆಟ್‌ಗಳು",
    years: "1399 – 1799 CE",
    sortStart: 1399,
    essence: "The Wodeyars built a kingdom of music and Dasara; Tipu Sultan met the British with the world's first war rockets.",
    essenceKn: "ಒಡೆಯರು ಸಂಗೀತ-ದಸರಾದ ಸಂಸ್ಥಾನ ಕಟ್ಟಿದರು; ಟಿಪ್ಪು ಸುಲ್ತಾನ ಜಗತ್ತಿನ ಮೊದಲ ಯುದ್ಧ ರಾಕೆಟ್‌ಗಳಿಂದ ಬ್ರಿಟಿಷರನ್ನು ಎದುರಿಸಿದ.",
    accent: "16 185 129",
    accent2: "5 150 105",
    cover: "Mysore Palace",
    lead: "When Vijayanagara fell, its viceroys at Mysore — the Wodeyars — rose to inherit its culture, founding the dazzling Dasara that still lights up Mysore each autumn. In the 18th century, the brilliant general Hyder Ali and his son Tipu Sultan, the 'Tiger of Mysore', built one of the most advanced states in India. Tipu deployed iron-cased war rockets that shocked the British at Pollilur — technology the British reverse-engineered into the Congreve rocket. He fought four wars against the East India Company and fell, sword in hand, defending Srirangapatna in 1799. To this day Mysore stands for sandalwood, silk, palaces and the grandest festival in the south.",
    leadKn: "ವಿಜಯನಗರ ಪತನದ ನಂತರ ಮೈಸೂರಿನ ಒಡೆಯರು ಅದರ ಸಂಸ್ಕೃತಿಯ ವಾರಸುದಾರರಾದರು — ಇಂದಿಗೂ ಮೈಸೂರು ದಸರಾ ಬೆಳಗುತ್ತದೆ. 18ನೇ ಶತಮಾನದಲ್ಲಿ ಹೈದರ್ ಅಲಿ ಮತ್ತು ಟಿಪ್ಪು ಸುಲ್ತಾನ ಆಧುನಿಕ ರಾಜ್ಯ ಕಟ್ಟಿದರು. ಟಿಪ್ಪುವಿನ ಕಬ್ಬಿಣದ ರಾಕೆಟ್‌ಗಳು ಬ್ರಿಟಿಷರನ್ನು ಬೆಚ್ಚಿಬೀಳಿಸಿದವು. 1799ರಲ್ಲಿ ಶ್ರೀರಂಗಪಟ್ಟಣ ರಕ್ಷಿಸುತ್ತಾ ಮಡಿದ.",
    capital: { name: "Srirangapatna", nameKn: "ಶ್ರೀರಂಗಪಟ್ಟಣ", coords: [76.69, 12.41] },
    atGlance: [
      { label: "Dynasty", labelKn: "ರಾಜವಂಶ", value: "Wodeyars of Mysore", valueKn: "ಮೈಸೂರು ಒಡೆಯರು" },
      { label: "The Tiger", labelKn: "ಹುಲಿ", value: "Tipu Sultan", valueKn: "ಟಿಪ್ಪು ಸುಲ್ತಾನ" },
      { label: "Innovation", labelKn: "ಆವಿಷ್ಕಾರ", value: "Iron war rockets", valueKn: "ಕಬ್ಬಿಣದ ರಾಕೆಟ್" },
      { label: "Festival", labelKn: "ಹಬ್ಬ", value: "Mysore Dasara", valueKn: "ಮೈಸೂರು ದಸರಾ" },
    ],
    facets: [
      {
        kind: "science",
        kicker: "Technology · ತಂತ್ರಜ್ಞಾನ",
        kickerKn: "ತಂತ್ರಜ್ಞಾನ",
        title: "The first iron rockets",
        body: "Mysorean rockets used iron tubes for higher thrust and range — the most advanced of their day. After capturing examples at Srirangapatna, the British developed the Congreve rocket from them, carrying the technology into European warfare.",
      },
      {
        kind: "military",
        kicker: "Resistance · ಪ್ರತಿರೋಧ",
        kickerKn: "ಪ್ರತಿರೋಧ",
        title: "Four wars against an empire",
        body: "Across the Anglo-Mysore Wars, Hyder Ali and Tipu repeatedly checked British expansion in the south. Tipu modernised the army, the navy and the economy, and sought alliances as far as France and the Ottomans.",
        wiki: "Anglo-Mysore Wars",
      },
      {
        kind: "culture",
        kicker: "Festival · ಹಬ್ಬ",
        kickerKn: "ಹಬ್ಬ",
        title: "The grandeur of Dasara",
        body: "The Wodeyars' Nada Habba turns Mysore into a city of light for ten days, climaxing in the Jumboo Savari — caparisoned elephants carrying the golden howdah through streets lined with a million visitors.",
        wiki: "Mysore Dasara",
      },
      {
        kind: "economy",
        kicker: "Economy · ಆರ್ಥಿಕತೆ",
        kickerKn: "ಆರ್ಥಿಕತೆ",
        title: "Silk, sandalwood and sericulture",
        body: "Tipu Sultan introduced and promoted sericulture in Mysore — the foundation of Karnataka's silk industry, which still produces most of India's mulberry silk today.",
      },
    ],
    gallery: [
      { wiki: "Daria Daulat Bagh", caption: "Daria Daulat Bagh, Tipu's summer palace", captionKn: "ದರಿಯಾ ದೌಲತ್ ಬಾಗ್", tag: "Palace", tagKn: "ಅರಮನೆ" },
      { wiki: "Tipu's Tiger", caption: "Tipu's Tiger, the famed automaton", captionKn: "ಟಿಪ್ಪುವಿನ ಹುಲಿ", tag: "Artifact", tagKn: "ಕಲಾಕೃತಿ" },
      { wiki: "Srirangapatna", caption: "The island-fortress of Srirangapatna", captionKn: "ಶ್ರೀರಂಗಪಟ್ಟಣ ಕೋಟೆ", tag: "Fort", tagKn: "ಕೋಟೆ" },
    ],
    relations: [
      { kind: "rivalry", with: "British East India Company", withKn: "ಬ್ರಿಟಿಷ್ ಕಂಪನಿ", note: "Four Anglo-Mysore Wars (1767–1799) decided the fate of southern India." },
      { kind: "alliance", with: "France & Ottomans", withKn: "ಫ್ರಾನ್ಸ್ ಮತ್ತು ಒಟ್ಟೋಮನ್", note: "Tipu sought foreign allies against the British, even writing to Versailles and Istanbul." },
      { kind: "cultural", with: "Vijayanagara legacy", withKn: "ವಿಜಯನಗರ ಪರಂಪರೆ", note: "The Wodeyars consciously continued Vijayanagara's Dasara and patronage of arts." },
    ],
    figures: [
      {
        name: "Tipu Sultan",
        nameKn: "ಟಿಪ್ಪು ಸುಲ್ತಾನ",
        role: "Ruler of Mysore",
        roleKn: "ಮೈಸೂರು ಅರಸ",
        wiki: "Tipu Sultan",
        blurb: "Soldier-innovator who pioneered rocket warfare and died defending his capital against the British.",
        fact: "His throne was shaped like a tiger; the motto on his sword read 'better to live a day as a tiger…'.",
      },
      {
        name: "Kittur Rani Chennamma",
        nameKn: "ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ",
        role: "Queen of Kittur",
        roleKn: "ಕಿತ್ತೂರಿನ ರಾಣಿ",
        wiki: "Kittur Chennamma",
        blurb: "One of the first Indian rulers to take up arms against the British — in 1824, decades before 1857.",
        fact: "She defeated the East India Company in her first battle; a statue of her stands in India's Parliament.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "renaissance",
    numeral: "VII",
    name: "The Model State",
    nameKn: "ಮಾದರಿ ರಾಜ್ಯ",
    years: "1799 – 1947 CE",
    sortStart: 1799,
    essence: "Dams, universities and India's first hydroelectric lights — Mysore became the best-governed kingdom in India.",
    essenceKn: "ಅಣೆಕಟ್ಟುಗಳು, ವಿಶ್ವವಿದ್ಯಾಲಯಗಳು, ಭಾರತದ ಮೊದಲ ಜಲವಿದ್ಯುತ್ ದೀಪಗಳು — ಮೈಸೂರು ಭಾರತದ ಅತ್ಯುತ್ತಮ ಆಡಳಿತದ ಸಂಸ್ಥಾನವಾಯಿತು.",
    accent: "20 184 166",
    accent2: "13 148 136",
    cover: "Krishna Raja Sagara",
    lead: "Under the restored Wodeyars and their visionary Dewan, Sir M. Visvesvaraya, princely Mysore reinvented itself as a 'model state'. Visvesvaraya — engineer, statesman and Bharat Ratna — designed the Krishna Raja Sagara dam and automatic flood gates, founded the Mysore Soap Factory, the University of Mysore and the precursors to modern industry. In 1905 Bengaluru and the Kolar gold fields were among the first places in Asia lit by hydroelectric power. The Indian Institute of Science (1909), funded by Jamsetji Tata and the Maharaja, planted the seed of the science city to come. All the while, a Kannada literary renaissance — Kuvempu, Bendre, Masti — was reawakening the language's soul.",
    leadKn: "ಒಡೆಯರು ಮತ್ತು ದೂರದರ್ಶಿ ದಿವಾನ್ ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯನವರ ಕಾಲದಲ್ಲಿ ಮೈಸೂರು 'ಮಾದರಿ ರಾಜ್ಯ'ವಾಯಿತು. ವಿಶ್ವೇಶ್ವರಯ್ಯ ಕೃಷ್ಣರಾಜ ಸಾಗರ ಅಣೆಕಟ್ಟು, ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ ಸ್ಥಾಪಿಸಿದರು. 1905ರಲ್ಲಿ ಬೆಂಗಳೂರು ಏಷ್ಯಾದ ಮೊದಲ ಜಲವಿದ್ಯುತ್ ದೀಪ ಕಂಡ ನಗರಗಳಲ್ಲಿ ಒಂದು. ಕುವೆಂಪು, ಬೇಂದ್ರೆ ಕನ್ನಡ ನವೋದಯ ಆರಂಭಿಸಿದರು.",
    capital: { name: "Mysore", nameKn: "ಮೈಸೂರು", coords: [76.65, 12.30] },
    atGlance: [
      { label: "Architect of progress", labelKn: "ಪ್ರಗತಿಯ ಶಿಲ್ಪಿ", value: "Sir M. Visvesvaraya", valueKn: "ಸರ್ ಎಂ.ವಿ" },
      { label: "Landmark", labelKn: "ಮೈಲಿಗಲ್ಲು", value: "KRS Dam, 1924", valueKn: "ಕೆ.ಆರ್.ಎಸ್ ಅಣೆಕಟ್ಟು" },
      { label: "First in Asia", labelKn: "ಏಷ್ಯಾದ ಮೊದಲು", value: "Hydro-electric lights, 1905", valueKn: "ಜಲವಿದ್ಯುತ್, 1905" },
      { label: "Science seed", labelKn: "ವಿಜ್ಞಾನ ಬೀಜ", value: "IISc, 1909", valueKn: "ಐ.ಐ.ಎಸ್‌ಸಿ, 1909" },
    ],
    facets: [
      {
        kind: "science",
        kicker: "Engineering · ಎಂಜಿನಿಯರಿಂಗ್",
        kickerKn: "ಎಂಜಿನಿಯರಿಂಗ್",
        title: "The engineer who tamed rivers",
        body: "Visvesvaraya invented automatic weir sluice gates, designed the KRS dam that greened the Cauvery basin, and planned cities. India celebrates his birthday, 15 September, as Engineer's Day.",
      },
      {
        kind: "literature",
        kicker: "Literature · ಸಾಹಿತ್ಯ",
        kickerKn: "ಸಾಹಿತ್ಯ",
        title: "The Navodaya awakening",
        body: "A modern Kannada renaissance flowered — Kuvempu's epic verse, Bendre's lyric genius, Masti's stories. This generation would go on to win Karnataka a record eight Jnanpith Awards.",
        wiki: "Kuvempu",
      },
      {
        kind: "economy",
        kicker: "Industry · ಕೈಗಾರಿಕೆ",
        kickerKn: "ಕೈಗಾರಿಕೆ",
        title: "Building a modern economy",
        body: "Mysore established banks, factories and India's first university outside the British presidencies. The groundwork — IISc, HAL's future home, an educated workforce — set Bengaluru on its path.",
      },
    ],
    gallery: [
      { wiki: "Brindavan Gardens", caption: "Brindavan Gardens at the KRS dam", captionKn: "ಬೃಂದಾವನ ಉದ್ಯಾನ", tag: "Engineering", tagKn: "ಎಂಜಿನಿಯರಿಂಗ್" },
      { wiki: "University of Mysore", caption: "University of Mysore, founded 1916", captionKn: "ಮೈಸೂರು ವಿಶ್ವವಿದ್ಯಾಲಯ", tag: "Education", tagKn: "ಶಿಕ್ಷಣ" },
      { wiki: "Indian Institute of Science", caption: "IISc Bengaluru, founded 1909", captionKn: "ಐ.ಐ.ಎಸ್‌ಸಿ", tag: "Science", tagKn: "ವಿಜ್ಞಾನ" },
    ],
    relations: [
      { kind: "alliance", with: "Tata & the Maharaja", withKn: "ಟಾಟಾ ಮತ್ತು ಮಹಾರಾಜ", note: "Jamsetji Tata and Krishnaraja Wodeyar IV co-founded the Indian Institute of Science." },
      { kind: "cultural", with: "British Raj", withKn: "ಬ್ರಿಟಿಷ್ ಆಳ್ವಿಕೆ", note: "Princely Mysore balanced autonomy and reform under British paramountcy." },
    ],
    figures: [
      {
        name: "Sir M. Visvesvaraya",
        nameKn: "ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ",
        role: "Engineer & Dewan of Mysore",
        roleKn: "ಎಂಜಿನಿಯರ್, ದಿವಾನ್",
        wiki: "M. Visvesvaraya",
        blurb: "The legendary engineer-statesman whose dams, schools and industries built modern Karnataka.",
        fact: "Bharat Ratna (1955); his birthday is celebrated across India as Engineer's Day.",
      },
      {
        name: "Krishnaraja Wodeyar IV",
        nameKn: "ನಾಲ್ಕನೇ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್",
        role: "Maharaja of Mysore",
        roleKn: "ಮೈಸೂರು ಮಹಾರಾಜ",
        wiki: "Krishna Raja Wadiyar IV",
        blurb: "The 'Rajarshi' whose enlightened rule Gandhi called a model — reform, industry and the arts together.",
        fact: "Under him Mysore was widely regarded as the best-administered princely state in India.",
      },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: "modern",
    numeral: "VIII",
    name: "Silicon & Stars",
    nameKn: "ಸಿಲಿಕಾನ್ ಮತ್ತು ನಕ್ಷತ್ರಗಳು",
    years: "1947 – Today",
    sortStart: 1947,
    essence: "From the unification of Karnataka to rovers on the Moon — a state that codes the future and reaches the stars.",
    essenceKn: "ಕರ್ನಾಟಕ ಏಕೀಕರಣದಿಂದ ಚಂದ್ರನ ಮೇಲೆ ರೋವರ್‌ವರೆಗೆ — ಭವಿಷ್ಯವನ್ನು ಬರೆಯುವ, ನಕ್ಷತ್ರ ಮುಟ್ಟುವ ರಾಜ್ಯ.",
    accent: "14 165 233",
    accent2: "2 132 199",
    cover: "Bangalore",
    lead: "On 1 November 1956, Kannada-speaking regions long divided between Madras, Bombay, Hyderabad and Mysore were finally united — the dream of the Ekikarana movement realised. In 1973 the state took the name Karnataka. Then came the great acceleration: Bengaluru, already home to IISc, HAL and ISRO, became the Silicon Valley of India. Infosys and Wipro turned it into a global technology capital; ISRO, headquartered here, sent Chandrayaan to the Moon and Mangalyaan to Mars. The land of Pampa now holds eight Jnanpith Awards — more than any other Indian language — and produces cricket captains, chess and billiards champions, and the films of Dr. Rajkumar. Two thousand years of heritage, still writing new chapters.",
    leadKn: "1956ರ ನವೆಂಬರ್ 1ರಂದು ಚದುರಿಹೋಗಿದ್ದ ಕನ್ನಡ ಪ್ರದೇಶಗಳು ಒಗ್ಗೂಡಿದವು — ಏಕೀಕರಣದ ಕನಸು ನನಸಾಯಿತು. 1973ರಲ್ಲಿ 'ಕರ್ನಾಟಕ' ಎಂಬ ಹೆಸರು. ಬೆಂಗಳೂರು ಭಾರತದ ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ ಆಯಿತು — ಇನ್ಫೋಸಿಸ್, ವಿಪ್ರೋ, ಇಸ್ರೋ. ಚಂದ್ರಯಾನ-ಮಂಗಳಯಾನ ಇಲ್ಲಿಂದಲೇ. ಕನ್ನಡಕ್ಕೆ ಎಂಟು ಜ್ಞಾನಪೀಠ — ಭಾರತದಲ್ಲೇ ಅತಿ ಹೆಚ್ಚು.",
    capital: { name: "Bengaluru", nameKn: "ಬೆಂಗಳೂರು", coords: [77.59, 12.97] },
    atGlance: [
      { label: "Unification", labelKn: "ಏಕೀಕರಣ", value: "1 Nov 1956", valueKn: "1 ನವೆಂಬರ್ 1956" },
      { label: "Named Karnataka", labelKn: "ಕರ್ನಾಟಕ ನಾಮ", value: "1973", valueKn: "1973" },
      { label: "Jnanpith Awards", labelKn: "ಜ್ಞಾನಪೀಠ", value: "8 — most in India", valueKn: "8 — ಭಾರತದಲ್ಲೇ ಹೆಚ್ಚು" },
      { label: "Space & tech", labelKn: "ಬಾಹ್ಯಾಕಾಶ", value: "ISRO · Infosys · Wipro", valueKn: "ಇಸ್ರೋ · ಇನ್ಫೋಸಿಸ್" },
    ],
    facets: [
      {
        kind: "science",
        kicker: "Space · ಬಾಹ್ಯಾಕಾಶ",
        kickerKn: "ಬಾಹ್ಯಾಕಾಶ",
        title: "From Bengaluru to the Moon",
        body: "ISRO, headquartered in Bengaluru, designed Chandrayaan — which found water on the Moon — and Mangalyaan, India's first Mars mission, on a famously frugal budget. Chandrayaan-3 made India the first nation to land near the lunar south pole.",
        wiki: "Indian Space Research Organisation",
      },
      {
        kind: "economy",
        kicker: "Technology · ತಂತ್ರಜ್ಞಾನ",
        kickerKn: "ತಂತ್ರಜ್ಞಾನ",
        title: "The Silicon Valley of India",
        body: "From Infosys and Wipro to thousands of startups and global R&D centres, Bengaluru became India's IT capital — exporting software and ideas worldwide and minting a generation of founders.",
      },
      {
        kind: "literature",
        kicker: "Literature · ಸಾಹಿತ್ಯ",
        kickerKn: "ಸಾಹಿತ್ಯ",
        title: "Eight crowns of letters",
        body: "Kuvempu, Bendre, Karanth, Masti, Gokak, Ananthamurthy, Karnad and Bhyrappa-era greats — Kannada has won eight Jnanpith Awards, the most of any Indian language.",
      },
      {
        kind: "culture",
        kicker: "Legends · ದಂತಕಥೆಗಳು",
        kickerKn: "ದಂತಕಥೆಗಳು",
        title: "Champions of field and screen",
        body: "Karnataka gave India cricket captains Dravid and Kumble, badminton's Prakash Padukone, billiards' Pankaj Advani, and the beloved cinema of Dr. Rajkumar — culture as living as its monuments.",
        wiki: "Rajkumar (actor)",
      },
    ],
    gallery: [
      { wiki: "Vidhana Soudha", caption: "Vidhana Soudha, seat of Karnataka", captionKn: "ವಿಧಾನಸೌಧ", tag: "Landmark", tagKn: "ಹೆಗ್ಗುರುತು" },
      { wiki: "Chandrayaan-3", caption: "Chandrayaan-3, engineered in Bengaluru", captionKn: "ಚಂದ್ರಯಾನ-3", tag: "Space", tagKn: "ಬಾಹ್ಯಾಕಾಶ" },
      { wiki: "Infosys", caption: "Bengaluru, India's tech capital", captionKn: "ಬೆಂಗಳೂರು ತಂತ್ರಜ್ಞಾನ", tag: "Industry", tagKn: "ಕೈಗಾರಿಕೆ" },
    ],
    relations: [
      { kind: "cultural", with: "Karnataka Ekikarana", withKn: "ಕರ್ನಾಟಕ ಏಕೀಕರಣ", note: "Decades of movement united five fragmented Kannada regions into one state in 1956." },
      { kind: "alliance", with: "Global tech & science", withKn: "ಜಾಗತಿಕ ತಂತ್ರಜ್ಞಾನ", note: "Bengaluru links India to the world through software, aerospace and space research." },
    ],
    figures: [
      {
        name: "Kuvempu",
        nameKn: "ಕುವೆಂಪು",
        role: "Poet, first Kannada Jnanpith",
        roleKn: "ಕವಿ, ಮೊದಲ ಜ್ಞಾನಪೀಠ",
        wiki: "Kuvempu",
        blurb: "The towering poet of modern Kannada who wrote the state anthem and won its first Jnanpith Award.",
        fact: "He penned 'Jaya Bharata Jananiya Tanujate', Karnataka's official state song.",
      },
      {
        name: "N. R. Narayana Murthy",
        nameKn: "ಎನ್.ಆರ್. ನಾರಾಯಣ ಮೂರ್ತಿ",
        role: "Co-founder, Infosys",
        roleKn: "ಇನ್ಫೋಸಿಸ್ ಸಹ-ಸ್ಥಾಪಕ",
        wiki: "N. R. Narayana Murthy",
        blurb: "Helped turn Bengaluru into a global IT powerhouse and a symbol of India's knowledge economy.",
        fact: "He started Infosys in 1981 with capital borrowed from his wife, Sudha Murty.",
      },
    ],
  },
];

/* ====================================================================== */
/* Luminaries — the Hall of Fame gallery.                                  */
/* ====================================================================== */

export type LuminaryCategory =
  | "Rulers"
  | "Saints"
  | "Writers"
  | "Science"
  | "Arts"
  | "Sports"
  | "Modern";

export const LUMINARY_CATEGORIES: { id: LuminaryCategory; label: string; labelKn: string; icon: LucideIcon }[] = [
  { id: "Rulers", label: "Kings & Queens", labelKn: "ಅರಸರು & ರಾಣಿಯರು", icon: Crown },
  { id: "Saints", label: "Saints & Thinkers", labelKn: "ಶರಣರು & ಚಿಂತಕರು", icon: Flame },
  { id: "Writers", label: "Poets & Laureates", labelKn: "ಕವಿಗಳು & ಸಾಹಿತಿಗಳು", icon: ScrollText },
  { id: "Science", label: "Science & Engineering", labelKn: "ವಿಜ್ಞಾನ & ಎಂಜಿನಿಯರಿಂಗ್", icon: Atom },
  { id: "Arts", label: "Music & Cinema", labelKn: "ಸಂಗೀತ & ಸಿನಿಮಾ", icon: Music },
  { id: "Sports", label: "Sport Legends", labelKn: "ಕ್ರೀಡಾ ದಂತಕಥೆಗಳು", icon: Building2 },
  { id: "Modern", label: "Builders & Icons", labelKn: "ನಿರ್ಮಾತೃಗಳು", icon: Sprout },
];

export type Luminary = {
  name: string;
  nameKn: string;
  category: LuminaryCategory;
  era: string;
  /** Wikipedia title for the portrait. */
  wiki: string;
  blurb: string;
  achievement: string;
};

export const luminaries: Luminary[] = [
  // Rulers
  { name: "Krishnadevaraya", nameKn: "ಕೃಷ್ಣದೇವರಾಯ", category: "Rulers", era: "Vijayanagara", wiki: "Krishnadevaraya", blurb: "Emperor at Vijayanagara's golden zenith; warrior, poet and patron.", achievement: "Author of Amuktamalyada; kept eight legendary poets at court." },
  { name: "Kittur Rani Chennamma", nameKn: "ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ", category: "Rulers", era: "Mysore era", wiki: "Kittur Chennamma", blurb: "Queen who fought the British in 1824, long before 1857.", achievement: "Among the first Indian rulers to lead an armed revolt against the Company." },
  { name: "Tipu Sultan", nameKn: "ಟಿಪ್ಪು ಸುಲ್ತಾನ", category: "Rulers", era: "Mysore", wiki: "Tipu Sultan", blurb: "The Tiger of Mysore — rocket pioneer and relentless foe of empire.", achievement: "Deployed the world's first iron-cased war rockets." },
  { name: "Pulakeshin II", nameKn: "ಎರಡನೇ ಪುಲಕೇಶಿ", category: "Rulers", era: "Chalukya", wiki: "Pulakeshin II", blurb: "Chalukya emperor who ruled coast to coast.", achievement: "The only king to defeat Harsha of Kannauj." },

  // Saints & Thinkers
  { name: "Basavanna", nameKn: "ಬಸವಣ್ಣ", category: "Saints", era: "12th century", wiki: "Basava", blurb: "Reformer who built a casteless society of devotion and labour.", achievement: "Founded the Anubhava Mantapa and the Vachana movement." },
  { name: "Akka Mahadevi", nameKn: "ಅಕ್ಕಮಹಾದೇವಿ", category: "Saints", era: "12th century", wiki: "Akka Mahadevi", blurb: "Mystic poet of fearless spiritual freedom.", achievement: "~430 Vachanas signed 'Chennamallikarjuna'." },
  { name: "Madhvacharya", nameKn: "ಮಧ್ವಾಚಾರ್ಯ", category: "Saints", era: "13th century", wiki: "Madhvacharya", blurb: "Philosopher who founded the Dvaita school of Vedanta in Udupi.", achievement: "His Udupi tradition shaped Carnatic devotional culture." },

  // Writers
  { name: "Pampa", nameKn: "ಪಂಪ", category: "Writers", era: "10th century", wiki: "Pampa (poet)", blurb: "The 'Adikavi' — first great poet of Kannada.", achievement: "Wrote Vikramarjuna Vijaya and Adipurana." },
  { name: "Kuvempu", nameKn: "ಕುವೆಂಪು", category: "Writers", era: "Modern", wiki: "Kuvempu", blurb: "Towering poet of modern Kannada and humanist.", achievement: "First Kannada Jnanpith; wrote the state anthem." },
  { name: "Da Ra Bendre", nameKn: "ದ.ರಾ. ಬೇಂದ್ರೆ", category: "Writers", era: "Modern", wiki: "Dattatreya Ramachandra Bendre", blurb: "Lyric genius of Kannada poetry.", achievement: "Jnanpith Award, 1973." },
  { name: "Girish Karnad", nameKn: "ಗಿರೀಶ್ ಕಾರ್ನಾಡ್", category: "Writers", era: "Modern", wiki: "Girish Karnad", blurb: "Playwright, actor and public intellectual.", achievement: "Jnanpith Award; plays staged worldwide." },
  { name: "U. R. Ananthamurthy", nameKn: "ಯು.ಆರ್. ಅನಂತಮೂರ್ತಿ", category: "Writers", era: "Modern", wiki: "U. R. Ananthamurthy", blurb: "Novelist of conscience; author of Samskara.", achievement: "Jnanpith Award; Booker International finalist." },

  // Science & Engineering
  { name: "Sir M. Visvesvaraya", nameKn: "ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ", category: "Science", era: "Modern", wiki: "M. Visvesvaraya", blurb: "Engineer-statesman who built modern Karnataka.", achievement: "Bharat Ratna; Engineer's Day marks his birthday." },
  { name: "C. N. R. Rao", nameKn: "ಸಿ.ಎನ್.ಆರ್. ರಾವ್", category: "Science", era: "Modern", wiki: "C. N. R. Rao", blurb: "World-renowned solid-state and materials chemist.", achievement: "Bharat Ratna; one of the most-cited Indian scientists." },
  { name: "U. R. Rao", nameKn: "ಯು.ಆರ್. ರಾವ್", category: "Science", era: "Modern", wiki: "Udupi Ramachandra Rao", blurb: "Space scientist who led India's satellite programme.", achievement: "Oversaw Aryabhata and inducted into the Satellite Hall of Fame." },

  // Music & Cinema
  { name: "Purandara Dasa", nameKn: "ಪುರಂದರ ದಾಸ", category: "Arts", era: "Vijayanagara", wiki: "Purandara Dasa", blurb: "Father of Carnatic music.", achievement: "Designed the foundational system still used to teach Carnatic music." },
  { name: "Gangubai Hangal", nameKn: "ಗಂಗೂಬಾಯಿ ಹಾನಗಲ್", category: "Arts", era: "Modern", wiki: "Gangubai Hangal", blurb: "Doyenne of Hindustani classical (Kirana gharana).", achievement: "Padma Vibhushan; broke barriers as a woman vocalist." },
  { name: "Dr. Rajkumar", nameKn: "ಡಾ. ರಾಜ್‌ಕುಮಾರ್", category: "Arts", era: "Modern", wiki: "Rajkumar (actor)", blurb: "Beloved icon of Kannada cinema and singer.", achievement: "Dadasaheb Phalke Award; a cultural institution." },

  // Sports
  { name: "Rahul Dravid", nameKn: "ರಾಹುಲ್ ದ್ರಾವಿಡ್", category: "Sports", era: "Modern", wiki: "Rahul Dravid", blurb: "'The Wall' — one of cricket's greatest batsmen.", achievement: "13,000+ Test runs; World Cup-winning head coach." },
  { name: "Anil Kumble", nameKn: "ಅನಿಲ್ ಕುಂಬ್ಳೆ", category: "Sports", era: "Modern", wiki: "Anil Kumble", blurb: "India's highest Test wicket-taker.", achievement: "Took all 10 wickets in a Test innings — only the second ever." },
  { name: "Prakash Padukone", nameKn: "ಪ್ರಕಾಶ್ ಪಡುಕೋಣೆ", category: "Sports", era: "Modern", wiki: "Prakash Padukone", blurb: "First Indian to be world No. 1 in badminton.", achievement: "All England Open champion, 1980." },
  { name: "Pankaj Advani", nameKn: "ಪಂಕಜ್ ಅಡ್ವಾಣಿ", category: "Sports", era: "Modern", wiki: "Pankaj Advani (billiards player)", blurb: "Cue-sport phenomenon from Bengaluru.", achievement: "Over 25 world titles in billiards and snooker." },

  // Builders & Icons
  { name: "N. R. Narayana Murthy", nameKn: "ಎನ್.ಆರ್. ನಾರಾಯಣ ಮೂರ್ತಿ", category: "Modern", era: "Modern", wiki: "N. R. Narayana Murthy", blurb: "Co-founder of Infosys; face of India's IT story.", achievement: "Built a global software giant from Bengaluru." },
  { name: "Azim Premji", nameKn: "ಅಜೀಂ ಪ್ರೇಮ್‌ಜಿ", category: "Modern", era: "Modern", wiki: "Azim Premji", blurb: "Wipro chairman and India's foremost philanthropist.", achievement: "Pledged the majority of his wealth to education." },
  { name: "Sudha Murty", nameKn: "ಸುಧಾ ಮೂರ್ತಿ", category: "Modern", era: "Modern", wiki: "Sudha Murty", blurb: "Engineer, author and philanthropist.", achievement: "Padma Bhushan; chairs the Infosys Foundation." },
];
