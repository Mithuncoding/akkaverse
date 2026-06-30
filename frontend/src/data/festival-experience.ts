/**
 * Festival Experience — the immersive layer behind each festival "world".
 *
 * This is NOT a catalogue. Every festival is described as a small theatre
 * production: its own palette, its own ambient particles, a cinematic
 * scene-by-scene script, a signature "wow" interaction, and seven adaptive
 * ways to experience it (Celebration, Heritage, Food, Culture, Journey,
 * Gallery, Kids). The Festivals view turns this data into a full-screen,
 * colour-shifting cultural museum.
 *
 * Images are real Wikipedia article titles — they are fetched live at runtime
 * by the same resilient engine that powers the Heritage Journey, so the museum
 * never shows a broken frame.
 */

export type Emotion =
  | "joyful"
  | "grand"
  | "spiritual"
  | "rural"
  | "folk"
  | "family"
  | "music"
  | "nature"
  | "royal";

/** Ambient particle personality for a festival world. */
export type Ambient =
  | "petal" // Ugadi — drifting mango leaves & blossoms
  | "diya" // Deepavali — rising warm sparks
  | "royal" // Dasara — golden floating motes
  | "torch" // Hampi — slow orange embers
  | "rain" // Kambala — monsoon streaks
  | "kite" // Sankranti — confetti drift
  | "lotus" // temple festivals — floating blossoms
  | "spark" // generic celebration
  | "dust"; // heritage calm

/** The signature interaction that makes judges stop scrolling. */
export type WowKind =
  | "palace" // Mysore Palace lights bulb-by-bulb
  | "lamps" // a field of diyas ignites
  | "rangoli" // a rangoli draws itself
  | "ruins" // Hampi reconstructs stone by stone
  | "buffalo" // Kambala race tracks the scroll
  | "bloom" // flowers bloom across the page
  | "crown" // a jewel crown assembles
  | "chariot"; // a temple chariot rolls through

export type Scene = {
  /** Wikipedia title for the live cinematic image. */
  wiki: string;
  imageTitle?: string;
  /** Short evocative line, present-tense, second person where possible. */
  en: string;
  kn: string;
  /** Optional tiny kicker shown above the line. */
  kickerEn?: string;
  kickerKn?: string;
  side?: "left" | "right" | "full";
};

export type FoodItem = {
  wiki: string;
  imageTitle?: string;
  nameEn: string;
  nameKn: string;
  noteEn: string;
  noteKn: string;
};

export type CultureItem = {
  icon: string;
  labelEn: string;
  labelKn: string;
  en: string;
  kn: string;
};

export type FactItem = {
  en: string;
  kn: string;
};

export type FestivalExperience = {
  /** "r g b" triples that drive the live --accent CSS variables. */
  accent: string;
  accent2: string;
  /** Background wash for the immersive world (two-stop radial). */
  skyTop: string;
  skyBottom: string;
  ambient: Ambient;
  wow: WowKind;
  emotions: Emotion[];
  taglineEn: string;
  taglineKn: string;
  /** Hero / cover image. */
  hero: string;
  heroImageTitle?: string;
  /** Cinematic opening — revealed scene by scene as you scroll. */
  scenes: Scene[];
  /** Heritage mode — history told as short movements. */
  heritageEn: string[];
  heritageKn: string[];
  legendEn: string;
  legendKn: string;
  kingsEn: string;
  kingsKn: string;
  /** Food mode. */
  foods: FoodItem[];
  /** Culture mode — dance, music, dress, craft. */
  culture: CultureItem[];
  /** Gallery mode — a cinematic image wall. */
  gallery: string[];
  /** Kids mode — one warm, simple story. */
  kidsEn: string;
  kidsKn: string;
  /** Did-you-know reveals. */
  facts: FactItem[];
};

const generic = {
  heritageEn: [
    "A tradition carried across generations of Kannadigas.",
    "Born in temple courtyards and village squares, it grew into a shared celebration.",
    "Today it blends old ritual with modern joy across Karnataka.",
  ],
  heritageKn: [
    "ತಲೆಮಾರುಗಳಿಂದ ಕನ್ನಡಿಗರು ಹೊತ್ತು ಸಾಗಿಸಿದ ಸಂಪ್ರದಾಯ.",
    "ದೇವಾಲಯದ ಪ್ರಾಂಗಣ ಮತ್ತು ಹಳ್ಳಿಯ ಚೌಕಗಳಲ್ಲಿ ಹುಟ್ಟಿ, ಹಂಚಿಕೆಯ ಆಚರಣೆಯಾಗಿ ಬೆಳೆಯಿತು.",
    "ಇಂದು ಇದು ಹಳೆಯ ಆಚರಣೆ ಮತ್ತು ಆಧುನಿಕ ಸಂತೋಷವನ್ನು ಬೆರೆಸುತ್ತದೆ.",
  ],
};

export const experiences: Record<string, FestivalExperience> = {
  dasara: {
    accent: "234 179 8",
    accent2: "190 24 93",
    skyTop: "59 7 100",
    skyBottom: "12 6 40",
    ambient: "royal",
    wow: "palace",
    emotions: ["grand", "royal", "joyful", "music"],
    taglineEn: "Ten nights when a kingdom remembers it is golden.",
    taglineKn: "ರಾಜ್ಯವು ತಾನು ಚಿನ್ನವೆಂದು ನೆನಪಿಸಿಕೊಳ್ಳುವ ಹತ್ತು ರಾತ್ರಿಗಳು.",
    hero: "Mysore Dasara",
    heroImageTitle: "Mysore Palace",
    scenes: [
      {
        wiki: "Mysore Palace",
        kickerEn: "Dusk falls on Mysuru",
        kickerKn: "ಮೈಸೂರಿನಲ್ಲಿ ಸಂಜೆ",
        en: "The palace stands dark against a violet sky, waiting.",
        kn: "ನೇರಳೆ ಆಕಾಶದೆದುರು ಅರಮನೆ ಕತ್ತಲಲ್ಲಿ ಕಾಯುತ್ತಿದೆ.",
        side: "full",
      },
      {
        wiki: "Chamundeshwari Temple",
        en: "On Chamundi Hill, the goddess is adorned — the festival's heart.",
        kn: "ಚಾಮುಂಡಿ ಬೆಟ್ಟದಲ್ಲಿ ದೇವಿಯ ಅಲಂಕಾರ — ಹಬ್ಬದ ಹೃದಯ.",
        side: "left",
      },
      {
        wiki: "Mysore Dasara",
        en: "Then, all at once, one hundred thousand bulbs catch fire.",
        kn: "ನಂತರ ಒಮ್ಮೆಲೇ ಒಂದು ಲಕ್ಷ ಬಲ್ಬ್‌ಗಳು ಬೆಳಗುತ್ತವೆ.",
        side: "right",
      },
      {
        wiki: "Jamboo Savari",
        imageTitle: "Mysore Dasara",
        en: "At dawn the golden howdah rides — Jamboo Savari begins.",
        kn: "ಬೆಳಗ್ಗೆ ಚಿನ್ನದ ಅಂಬಾರಿ ಸಾಗುತ್ತದೆ — ಜಂಬೂ ಸವಾರಿ ಆರಂಭ.",
        side: "left",
      },
    ],
    heritageEn: [
      "Dasara has been Mysuru's royal festival since the Vijayanagara kings, who held grand Mahanavami durbars.",
      "When Vijayanagara fell, the Wodeyars of Mysuru carried the tradition home in 1610 at Srirangapatna.",
      "Maharaja Krishnaraja Wodeyar IV gave it its modern splendour — and in 1932 first lit the palace in electric light.",
      "Today it is Karnataka's 'Nadahabba', the official festival of the whole state.",
    ],
    heritageKn: [
      "ವಿಜಯನಗರ ಅರಸರ ಮಹಾನವಮಿ ದರ್ಬಾರ್‌ಗಳಿಂದ ದಸರಾ ಮೈಸೂರಿನ ರಾಜ ಹಬ್ಬವಾಗಿದೆ.",
      "ವಿಜಯನಗರ ಪತನದ ನಂತರ, ಮೈಸೂರಿನ ಒಡೆಯರ್‌ಗಳು 1610ರಲ್ಲಿ ಶ್ರೀರಂಗಪಟ್ಟಣದಲ್ಲಿ ಸಂಪ್ರದಾಯವನ್ನು ಮುಂದುವರಿಸಿದರು.",
      "ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ ಇದಕ್ಕೆ ಆಧುನಿಕ ವೈಭವ ನೀಡಿ, 1932ರಲ್ಲಿ ಮೊದಲ ಬಾರಿಗೆ ಅರಮನೆಯನ್ನು ವಿದ್ಯುತ್ ದೀಪದಿಂದ ಬೆಳಗಿಸಿದರು.",
      "ಇಂದು ಇದು ಕರ್ನಾಟಕದ 'ನಾಡಹಬ್ಬ'.",
    ],
    legendEn:
      "The goddess Chamundeshwari slew the buffalo-demon Mahishasura on this hill — Mysuru itself is named after him, Mahishuru.",
    legendKn:
      "ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿ ಈ ಬೆಟ್ಟದಲ್ಲಿ ಮಹಿಷಾಸುರನನ್ನು ಸಂಹರಿಸಿದಳು — ಮೈಸೂರಿಗೆ ಅವನ ಹೆಸರಿನಿಂದಲೇ 'ಮಹಿಷೂರು' ಎಂದು ಹೆಸರು.",
    kingsEn: "Wodeyar dynasty · Krishnaraja Wodeyar IV · Vijayanagara emperors",
    kingsKn: "ಒಡೆಯರ್ ವಂಶ · ನಾಲ್ವಡಿ ಕೃಷ್ಣರಾಜ ಒಡೆಯರ್ · ವಿಜಯನಗರ ಚಕ್ರವರ್ತಿಗಳು",
    foods: [
      {
        wiki: "Mysore pak",
        nameEn: "Mysore Pak",
        nameKn: "ಮೈಸೂರು ಪಾಕ್",
        noteEn: "Born in this very palace kitchen — ghee, gram flour, sugar.",
        noteKn: "ಇದೇ ಅರಮನೆ ಅಡುಗೆಮನೆಯಲ್ಲಿ ಹುಟ್ಟಿದ್ದು — ತುಪ್ಪ, ಕಡಲೆಹಿಟ್ಟು, ಸಕ್ಕರೆ.",
      },
      {
        wiki: "Obbattu",
        imageTitle: "Puran poli",
        nameEn: "Holige",
        nameKn: "ಹೋಳಿಗೆ",
        noteEn: "Sweet lentil-stuffed flatbread for the festival table.",
        noteKn: "ಹಬ್ಬದ ಊಟಕ್ಕೆ ಸಿಹಿ ಬೇಳೆ ತುಂಬಿದ ಹೋಳಿಗೆ.",
      },
      {
        wiki: "Bisi bele bath",
        nameEn: "Bisi Bele Bath",
        nameKn: "ಬಿಸಿ ಬೇಳೆ ಬಾತ್",
        noteEn: "Mysuru's warming rice-and-lentil one-pot classic.",
        noteKn: "ಮೈಸೂರಿನ ಬಿಸಿ ಅನ್ನ-ಬೇಳೆಯ ಪ್ರಸಿದ್ಧ ಖಾದ್ಯ.",
      },
    ],
    culture: [
      {
        icon: "🐘",
        labelEn: "Procession",
        labelKn: "ಮೆರವಣಿಗೆ",
        en: "Caparisoned elephants carry the 750 kg golden howdah down Mysuru's streets.",
        kn: "ಅಲಂಕೃತ ಆನೆಗಳು 750 ಕೆಜಿ ಚಿನ್ನದ ಅಂಬಾರಿಯನ್ನು ಹೊತ್ತು ಸಾಗುತ್ತವೆ.",
      },
      {
        icon: "🎺",
        labelEn: "Music",
        labelKn: "ಸಂಗೀತ",
        en: "Nadaswaram and palace bands fill the air; nightly concerts on the palace lawns.",
        kn: "ನಾದಸ್ವರ ಮತ್ತು ಅರಮನೆ ವಾದ್ಯಗಳು; ಅರಮನೆ ಹುಲ್ಲುಹಾಸಿನಲ್ಲಿ ರಾತ್ರಿ ಸಂಗೀತ.",
      },
      {
        icon: "🔥",
        labelEn: "Torchlight",
        labelKn: "ಪಂಜಿನ ಕವಾಯತು",
        en: "The Panjina Kavayatu — a torchlight military parade closes the tenth night.",
        kn: "ಪಂಜಿನ ಕವಾಯತು — ಹತ್ತನೇ ರಾತ್ರಿ ಮುಗಿಸುವ ಪಂಜಿನ ಮೆರವಣಿಗೆ.",
      },
    ],
    gallery: [
      "Mysore Palace",
      "Mysore Dasara",
      "Chamundeshwari Temple",
      "Jamboo Savari",
      "Chamundi Hills",
      "Krishna Raja Wadiyar IV",
    ],
    kidsEn:
      "Long ago a fierce buffalo-demon troubled the land, until brave goddess Chamundeshwari rode out and won. Every year Mysuru says thank-you with elephants, lights and a golden chair that glitters like the sun!",
    kidsKn:
      "ಬಹಳ ಹಿಂದೆ ಒಂದು ಭಯಂಕರ ಕೋಣ-ರಾಕ್ಷಸ ನಾಡನ್ನು ಕಾಡುತ್ತಿತ್ತು, ಧೈರ್ಯಶಾಲಿ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿ ಗೆದ್ದಳು. ಪ್ರತಿ ವರ್ಷ ಮೈಸೂರು ಆನೆ, ದೀಪ ಮತ್ತು ಸೂರ್ಯನಂತೆ ಹೊಳೆಯುವ ಚಿನ್ನದ ಅಂಬಾರಿಯಿಂದ ಧನ್ಯವಾದ ಹೇಳುತ್ತದೆ!",
    facts: [
      {
        en: "The palace wears 97,000 bulbs and is lit for an hour every evening through Dasara.",
        kn: "ಅರಮನೆ 97,000 ಬಲ್ಬ್‌ಗಳನ್ನು ಧರಿಸುತ್ತದೆ, ದಸರಾ ಉದ್ದಕ್ಕೂ ಪ್ರತಿ ಸಂಜೆ ಒಂದು ಗಂಟೆ ಬೆಳಗುತ್ತದೆ.",
      },
      {
        en: "The golden howdah on the lead elephant carries about 750 kg of gold.",
        kn: "ಮುಂಚೂಣಿ ಆನೆಯ ಚಿನ್ನದ ಅಂಬಾರಿ ಸುಮಾರು 750 ಕೆಜಿ ಚಿನ್ನವನ್ನು ಹೊಂದಿದೆ.",
      },
      {
        en: "Mysuru Dasara has been celebrated for over 400 years.",
        kn: "ಮೈಸೂರು ದಸರಾ 400 ವರ್ಷಗಳಿಗೂ ಹೆಚ್ಚು ಕಾಲದಿಂದ ಆಚರಿಸಲಾಗುತ್ತಿದೆ.",
      },
    ],
  },

  deepavali: {
    accent: "245 158 11",
    accent2: "217 70 239",
    skyTop: "30 12 60",
    skyBottom: "8 5 25",
    ambient: "diya",
    wow: "lamps",
    emotions: ["joyful", "family", "spiritual", "grand"],
    taglineEn: "When every doorway becomes a small constellation.",
    taglineKn: "ಪ್ರತಿ ಬಾಗಿಲೂ ಪುಟ್ಟ ನಕ್ಷತ್ರಪುಂಜವಾಗುವಾಗ.",
    hero: "Diwali",
    heroImageTitle: "Diwali",
    scenes: [
      {
        wiki: "Diya (lamp)",
        imageTitle: "Diwali",
        kickerEn: "The first night",
        kickerKn: "ಮೊದಲ ರಾತ್ರಿ",
        en: "A single clay lamp is lit at the threshold, and darkness steps back.",
        kn: "ಬಾಗಿಲಲ್ಲಿ ಒಂದು ಮಣ್ಣಿನ ದೀಪ ಬೆಳಗುತ್ತದೆ, ಕತ್ತಲೆ ಹಿಂದೆ ಸರಿಯುತ್ತದೆ.",
        side: "full",
      },
      {
        wiki: "Rangoli",
        en: "At the doorstep a rangoli blooms in coloured powder.",
        kn: "ಬಾಗಿಲ ಮುಂದೆ ಬಣ್ಣದ ಪುಡಿಯಲ್ಲಿ ರಂಗೋಲಿ ಅರಳುತ್ತದೆ.",
        side: "left",
      },
      {
        wiki: "Diwali",
        en: "Lamp by lamp, the whole street becomes a river of light.",
        kn: "ದೀಪದಿಂದ ದೀಪಕ್ಕೆ, ಇಡೀ ಬೀದಿ ಬೆಳಕಿನ ನದಿಯಾಗುತ್ತದೆ.",
        side: "right",
      },
      {
        wiki: "Fireworks",
        en: "Far away the sky cracks open in gold and green.",
        kn: "ದೂರದಲ್ಲಿ ಆಕಾಶ ಚಿನ್ನ ಮತ್ತು ಹಸಿರಿನಲ್ಲಿ ಸಿಡಿಯುತ್ತದೆ.",
        side: "full",
      },
    ],
    heritageEn: [
      "Deepavali means 'a row of lamps' — light triumphing over darkness, knowledge over ignorance.",
      "In Karnataka it spans three days: Naraka Chaturdashi, Lakshmi Puja, and Bali Padyami.",
      "The dawn oil-bath on Naraka Chaturdashi recalls Krishna's victory over the demon Narakasura.",
    ],
    heritageKn: [
      "ದೀಪಾವಳಿ ಎಂದರೆ 'ದೀಪಗಳ ಸಾಲು' — ಕತ್ತಲೆಯ ಮೇಲೆ ಬೆಳಕಿನ ಗೆಲುವು.",
      "ಕರ್ನಾಟಕದಲ್ಲಿ ಮೂರು ದಿನ: ನರಕ ಚತುರ್ದಶಿ, ಲಕ್ಷ್ಮೀ ಪೂಜೆ, ಬಲಿ ಪಾಡ್ಯಮಿ.",
      "ನರಕ ಚತುರ್ದಶಿಯ ಬೆಳಗಿನ ಎಣ್ಣೆ ಸ್ನಾನ ಕೃಷ್ಣನ ನರಕಾಸುರ ಗೆಲುವನ್ನು ನೆನಪಿಸುತ್ತದೆ.",
    ],
    legendEn:
      "Krishna and Satyabhama freed sixteen thousand captives by defeating Narakasura — his last wish was that his death be remembered with lights, not tears.",
    legendKn:
      "ಕೃಷ್ಣ ಮತ್ತು ಸತ್ಯಭಾಮೆ ನರಕಾಸುರನನ್ನು ಸೋಲಿಸಿ ಹದಿನಾರು ಸಾವಿರ ಬಂಧಿಗಳನ್ನು ಬಿಡುಗಡೆ ಮಾಡಿದರು — ತನ್ನ ಸಾವನ್ನು ಕಣ್ಣೀರಲ್ಲಲ್ಲ, ದೀಪದಲ್ಲಿ ನೆನಪಿಸಬೇಕೆಂಬುದು ಅವನ ಕೊನೆಯ ಆಸೆ.",
    kingsEn: "Celebrated by every Kannada home, from coast to Deccan plateau.",
    kingsKn: "ಕರಾವಳಿಯಿಂದ ಬಯಲುಸೀಮೆವರೆಗೆ ಪ್ರತಿ ಕನ್ನಡ ಮನೆಯಲ್ಲೂ ಆಚರಣೆ.",
    foods: [
      {
        wiki: "Chakli",
        nameEn: "Chakli",
        nameKn: "ಚಕ್ಕುಲಿ",
        noteEn: "Crisp spiral savoury — the sound of Deepavali snacking.",
        noteKn: "ಗರಿಗರಿ ಸುರುಳಿ ಖಾರ — ದೀಪಾವಳಿ ತಿಂಡಿಯ ಶಬ್ದ.",
      },
      {
        wiki: "Laddu",
        nameEn: "Laddu",
        nameKn: "ಲಡ್ಡು",
        noteEn: "Golden spheres of celebration shared with every visitor.",
        noteKn: "ಪ್ರತಿ ಅತಿಥಿಯೊಂದಿಗೆ ಹಂಚುವ ಚಿನ್ನದ ಸಿಹಿ ಗೋಲಗಳು.",
      },
      {
        wiki: "Kodubale",
        nameEn: "Kodubale",
        nameKn: "ಕೋಡುಬಳೆ",
        noteEn: "Crunchy ring-shaped snack from old Karnataka kitchens.",
        noteKn: "ಹಳೆಯ ಕರ್ನಾಟಕ ಅಡುಗೆಮನೆಯ ಗರಿಗರಿ ಉಂಗುರ ತಿಂಡಿ.",
      },
    ],
    culture: [
      {
        icon: "🪔",
        labelEn: "Diyas",
        labelKn: "ಹಣತೆ",
        en: "Rows of clay lamps line every wall, window and water tank.",
        kn: "ಪ್ರತಿ ಗೋಡೆ, ಕಿಟಕಿ ಮತ್ತು ತೊಟ್ಟಿಯ ಮೇಲೆ ಮಣ್ಣಿನ ದೀಪಗಳ ಸಾಲು.",
      },
      {
        icon: "🎨",
        labelEn: "Rangoli",
        labelKn: "ರಂಗೋಲಿ",
        en: "Intricate floor art in rice flour and colour welcomes Lakshmi.",
        kn: "ಅಕ್ಕಿ ಹಿಟ್ಟು ಮತ್ತು ಬಣ್ಣದ ಸೂಕ್ಷ್ಮ ರಂಗೋಲಿ ಲಕ್ಷ್ಮಿಯನ್ನು ಸ್ವಾಗತಿಸುತ್ತದೆ.",
      },
      {
        icon: "🏰",
        labelEn: "Gomberu",
        labelKn: "ಗೊಂಬೆ",
        en: "Some homes build a 'Bali' fort of cow-dung, marking Bali Padyami.",
        kn: "ಕೆಲವು ಮನೆಗಳು ಬಲಿ ಪಾಡ್ಯಮಿಗಾಗಿ ಸಗಣಿಯ 'ಬಲಿ' ಕೋಟೆ ಕಟ್ಟುತ್ತವೆ.",
      },
    ],
    gallery: [
      "Diwali",
      "Diya (lamp)",
      "Rangoli",
      "Fireworks",
      "Lakshmi",
      "Sky lantern",
    ],
    kidsEn:
      "On Deepavali we light tiny clay lamps called diyas so that light wins over the dark. We draw colourful rangoli, eat sweets, and the whole street twinkles like the night sky came down to play!",
    kidsKn:
      "ದೀಪಾವಳಿಯಂದು ನಾವು ಹಣತೆ ಎಂಬ ಪುಟ್ಟ ಮಣ್ಣಿನ ದೀಪಗಳನ್ನು ಹಚ್ಚಿ ಕತ್ತಲೆಯ ಮೇಲೆ ಬೆಳಕು ಗೆಲ್ಲುವಂತೆ ಮಾಡುತ್ತೇವೆ. ಬಣ್ಣದ ರಂಗೋಲಿ ಬಿಡಿಸಿ, ಸಿಹಿ ತಿಂದು ಸಂಭ್ರಮಿಸುತ್ತೇವೆ!",
    facts: [
      {
        en: "In coastal Karnataka, families build and worship a small fort for King Bali on Bali Padyami.",
        kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕದಲ್ಲಿ ಬಲಿ ಪಾಡ್ಯಮಿಯಂದು ಬಲಿ ಚಕ್ರವರ್ತಿಗಾಗಿ ಪುಟ್ಟ ಕೋಟೆ ಕಟ್ಟಿ ಪೂಜಿಸುತ್ತಾರೆ.",
      },
      {
        en: "The pre-dawn oil bath, 'Abhyanjana', is considered as sacred as bathing in the Ganga.",
        kn: "ಬೆಳಗಿನ ಎಣ್ಣೆ ಸ್ನಾನ 'ಅಭ್ಯಂಜನ' ಗಂಗಾ ಸ್ನಾನದಷ್ಟೇ ಪವಿತ್ರವೆಂದು ಪರಿಗಣಿಸಲಾಗುತ್ತದೆ.",
      },
    ],
  },

  ugadi: {
    accent: "132 204 22",
    accent2: "236 72 153",
    skyTop: "16 64 40",
    skyBottom: "6 30 22",
    ambient: "petal",
    wow: "bloom",
    emotions: ["joyful", "family", "nature", "spiritual"],
    taglineEn: "A new year that tastes of neem and jaggery at once.",
    taglineKn: "ಬೇವು ಮತ್ತು ಬೆಲ್ಲ ಒಟ್ಟಿಗೆ ರುಚಿಸುವ ಹೊಸ ವರ್ಷ.",
    hero: "Ugadi",
    scenes: [
      {
        wiki: "Mango",
        imageTitle: "Mango",
        kickerEn: "Spring arrives",
        kickerKn: "ವಸಂತ ಆಗಮನ",
        en: "Fresh mango leaves are strung above the door as a toran.",
        kn: "ಬಾಗಿಲ ಮೇಲೆ ಹಸಿರು ಮಾವಿನ ಎಲೆಗಳ ತೋರಣ ಕಟ್ಟಲಾಗುತ್ತದೆ.",
        side: "full",
      },
      {
        wiki: "Rangoli",
        en: "The courtyard is washed and a fresh rangoli is drawn at dawn.",
        kn: "ಅಂಗಳವನ್ನು ತೊಳೆದು ಬೆಳಗ್ಗೆ ಹೊಸ ರಂಗೋಲಿ ಬಿಡಿಸಲಾಗುತ್ತದೆ.",
        side: "left",
      },
      {
        wiki: "Azadirachta indica",
        imageTitle: "Neem",
        en: "Neem flowers and jaggery are mixed — life's bitter and sweet, together.",
        kn: "ಬೇವಿನ ಹೂ ಮತ್ತು ಬೆಲ್ಲ ಬೆರೆಸಲಾಗುತ್ತದೆ — ಜೀವನದ ಕಹಿ ಮತ್ತು ಸಿಹಿ.",
        side: "right",
      },
      {
        wiki: "Panchangam",
        en: "Elders read the Panchanga — the year's almanac is foretold.",
        kn: "ಹಿರಿಯರು ಪಂಚಾಂಗ ಓದುತ್ತಾರೆ — ವರ್ಷದ ಭವಿಷ್ಯ ತಿಳಿಯುತ್ತದೆ.",
        side: "left",
      },
    ],
    heritageEn: [
      "Ugadi — from 'yuga' (age) and 'adi' (beginning) — marks the first day of the Hindu lunisolar year.",
      "It is said the creator Brahma began the universe on this day, so it greets renewal of every kind.",
      "Across Karnataka it opens spring: new clothes, clean homes, and the year's first verses of poetry.",
    ],
    heritageKn: [
      "ಯುಗಾದಿ — 'ಯುಗ' ಮತ್ತು 'ಆದಿ'ಯಿಂದ — ಚಾಂದ್ರಮಾನ ವರ್ಷದ ಮೊದಲ ದಿನ.",
      "ಬ್ರಹ್ಮ ಈ ದಿನ ಸೃಷ್ಟಿ ಆರಂಭಿಸಿದನೆಂದು ನಂಬಿಕೆ; ಆದ್ದರಿಂದ ಇದು ಎಲ್ಲ ನವೀಕರಣವನ್ನು ಸ್ವಾಗತಿಸುತ್ತದೆ.",
      "ಕರ್ನಾಟಕದಾದ್ಯಂತ ವಸಂತದ ಆರಂಭ: ಹೊಸ ಬಟ್ಟೆ, ಸ್ವಚ್ಛ ಮನೆ, ವರ್ಷದ ಮೊದಲ ಕವನ.",
    ],
    legendEn:
      "The bevu-bella ritual — neem for sorrow, jaggery for joy — teaches that a full year holds both, and both should be received with grace.",
    legendKn:
      "ಬೇವು-ಬೆಲ್ಲ ಆಚರಣೆ — ಕಹಿಗೆ ಬೇವು, ಸಿಹಿಗೆ ಬೆಲ್ಲ — ವರ್ಷವು ಎರಡನ್ನೂ ಹೊಂದಿದೆ, ಎರಡನ್ನೂ ಸಮಚಿತ್ತದಿಂದ ಸ್ವೀಕರಿಸಬೇಕೆಂದು ಕಲಿಸುತ್ತದೆ.",
    kingsEn: "A festival of the people, sung by poets from Pampa to modern Kannada verse.",
    kingsKn: "ಜನರ ಹಬ್ಬ, ಪಂಪನಿಂದ ಆಧುನಿಕ ಕನ್ನಡ ಕವಿಗಳವರೆಗೆ ಹಾಡಲ್ಪಟ್ಟದ್ದು.",
    foods: [
      {
        wiki: "Obbattu",
        imageTitle: "Puran poli",
        nameEn: "Holige / Obbattu",
        nameKn: "ಹೋಳಿಗೆ / ಒಬ್ಬಟ್ಟು",
        noteEn: "The defining Ugadi sweet — jaggery and lentil in a soft shell.",
        noteKn: "ಯುಗಾದಿಯ ಪ್ರಮುಖ ಸಿಹಿ — ಮೃದು ಹೊದಿಕೆಯಲ್ಲಿ ಬೆಲ್ಲ ಮತ್ತು ಬೇಳೆ.",
      },
      {
        wiki: "Mango",
        nameEn: "Mavinakai Chitranna",
        nameKn: "ಮಾವಿನಕಾಯಿ ಚಿತ್ರಾನ್ನ",
        noteEn: "Raw-mango rice — the tang of the new season.",
        noteKn: "ಮಾವಿನಕಾಯಿ ಅನ್ನ — ಹೊಸ ಋತುವಿನ ಹುಳಿ.",
      },
      {
        wiki: "Payasam",
        nameEn: "Payasa",
        nameKn: "ಪಾಯಸ",
        noteEn: "Sweet milk pudding to begin the year gently.",
        noteKn: "ವರ್ಷವನ್ನು ಸಿಹಿಯಾಗಿ ಆರಂಭಿಸಲು ಹಾಲಿನ ಪಾಯಸ.",
      },
    ],
    culture: [
      {
        icon: "🥭",
        labelEn: "Torana",
        labelKn: "ತೋರಣ",
        en: "Mango-leaf garlands frame every doorway in fresh green.",
        kn: "ಮಾವಿನ ಎಲೆಯ ತೋರಣ ಪ್ರತಿ ಬಾಗಿಲನ್ನು ಹಸಿರಿನಿಂದ ಅಲಂಕರಿಸುತ್ತದೆ.",
      },
      {
        icon: "📜",
        labelEn: "Panchanga",
        labelKn: "ಪಂಚಾಂಗ",
        en: "The Panchanga Shravana foretells rains, harvests and fortunes.",
        kn: "ಪಂಚಾಂಗ ಶ್ರವಣ ಮಳೆ, ಬೆಳೆ ಮತ್ತು ಭವಿಷ್ಯವನ್ನು ತಿಳಿಸುತ್ತದೆ.",
      },
      {
        icon: "🎶",
        labelEn: "Kavi Goshthi",
        labelKn: "ಕವಿ ಗೋಷ್ಠಿ",
        en: "Poets gather for Ugadi kavi goshthis — the year's first poetry.",
        kn: "ಕವಿಗಳು ಯುಗಾದಿ ಕವಿ ಗೋಷ್ಠಿಗೆ ಸೇರುತ್ತಾರೆ — ವರ್ಷದ ಮೊದಲ ಕಾವ್ಯ.",
      },
    ],
    gallery: ["Ugadi", "Mango", "Rangoli", "Azadirachta indica", "Jaggery", "Spring"],
    kidsEn:
      "Ugadi is the Kannada New Year! We hang mango leaves, draw rangoli, and taste a special mix of bitter neem and sweet jaggery — because a year, like life, has both. Happy new beginnings!",
    kidsKn:
      "ಯುಗಾದಿ ಕನ್ನಡ ಹೊಸ ವರ್ಷ! ನಾವು ಮಾವಿನ ಎಲೆ ಕಟ್ಟಿ, ರಂಗೋಲಿ ಬಿಡಿಸಿ, ಕಹಿ ಬೇವು ಮತ್ತು ಸಿಹಿ ಬೆಲ್ಲದ ವಿಶೇಷ ಮಿಶ್ರಣ ಸವಿಯುತ್ತೇವೆ!",
    facts: [
      {
        en: "Different regions begin their new year on different days — but Karnataka, Andhra and Maharashtra share this spring date.",
        kn: "ಬೇರೆ ಬೇರೆ ಪ್ರದೇಶಗಳು ಬೇರೆ ದಿನ ಹೊಸ ವರ್ಷ ಆರಂಭಿಸುತ್ತವೆ — ಕರ್ನಾಟಕ, ಆಂಧ್ರ, ಮಹಾರಾಷ್ಟ್ರ ಈ ವಸಂತ ದಿನವನ್ನು ಹಂಚಿಕೊಳ್ಳುತ್ತವೆ.",
      },
      {
        en: "The bevu-bella mixture traditionally has six tastes, one for each emotion of the coming year.",
        kn: "ಬೇವು-ಬೆಲ್ಲ ಮಿಶ್ರಣದಲ್ಲಿ ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಆರು ರುಚಿಗಳಿವೆ, ಬರುವ ವರ್ಷದ ಪ್ರತಿ ಭಾವಕ್ಕೆ ಒಂದು.",
      },
    ],
  },

  kambala: {
    accent: "56 189 248",
    accent2: "132 204 22",
    skyTop: "12 40 56",
    skyBottom: "5 20 30",
    ambient: "rain",
    wow: "buffalo",
    emotions: ["rural", "folk", "joyful"],
    taglineEn: "Two buffaloes, a slush of paddy water, and a village that roars.",
    taglineKn: "ಎರಡು ಕೋಣಗಳು, ಗದ್ದೆಯ ಕೆಸರು, ಮತ್ತು ಗರ್ಜಿಸುವ ಹಳ್ಳಿ.",
    hero: "Kambala",
    scenes: [
      {
        wiki: "Paddy field",
        kickerEn: "Coastal dawn",
        kickerKn: "ಕರಾವಳಿ ಬೆಳಗು",
        en: "Two parallel tracks of paddy slush gleam under a grey monsoon sky.",
        kn: "ಬೂದು ಮಳೆ ಆಕಾಶದಡಿ ಎರಡು ಸಮಾನಾಂತರ ಕೆಸರು ಗದ್ದೆಗಳು ಹೊಳೆಯುತ್ತವೆ.",
        side: "full",
      },
      {
        wiki: "Water buffalo",
        en: "A pair of buffaloes is yoked, muscles taut, breath steaming.",
        kn: "ಜೋಡಿ ಕೋಣಗಳನ್ನು ಕಟ್ಟಲಾಗುತ್ತದೆ, ಸ್ನಾಯುಗಳು ಬಿಗಿದು ಉಸಿರು ಹೊಗೆಯಾಗುತ್ತದೆ.",
        side: "left",
      },
      {
        wiki: "Kambala",
        en: "The whistle blows — they explode forward, water flying like glass.",
        kn: "ಸೀಟಿ ಮೊಳಗುತ್ತದೆ — ಅವು ಮುನ್ನುಗ್ಗುತ್ತವೆ, ನೀರು ಗಾಜಿನಂತೆ ಹಾರುತ್ತದೆ.",
        side: "right",
      },
      {
        wiki: "Kambala",
        en: "Mud splashes higher than the men; the crowd's roar shakes the field.",
        kn: "ಕೆಸರು ಜನರಿಗಿಂತ ಎತ್ತರಕ್ಕೆ ಚಿಮ್ಮುತ್ತದೆ; ಜನರ ಗರ್ಜನೆ ಗದ್ದೆಯನ್ನು ನಡುಗಿಸುತ್ತದೆ.",
        side: "full",
      },
    ],
    heritageEn: [
      "Kambala is a centuries-old buffalo race of coastal Karnataka's Tulu Nadu region.",
      "Once an offering to the gods for a good harvest, it became a fierce point of village pride.",
      "Modern Kambala is a celebrated sport — some runners have been timed faster than Olympic sprinters over short bursts.",
    ],
    heritageKn: [
      "ಕಂಬಳ ಕರಾವಳಿ ಕರ್ನಾಟಕದ ತುಳುನಾಡಿನ ಶತಮಾನಗಳ ಕೋಣಗಳ ಓಟ.",
      "ಒಮ್ಮೆ ಉತ್ತಮ ಬೆಳೆಗಾಗಿ ದೇವರಿಗೆ ಅರ್ಪಣೆ; ನಂತರ ಹಳ್ಳಿಯ ಹೆಮ್ಮೆಯ ಸ್ಪರ್ಧೆ.",
      "ಆಧುನಿಕ ಕಂಬಳ ಪ್ರಸಿದ್ಧ ಕ್ರೀಡೆ — ಕೆಲವು ಓಟಗಾರರು ಒಲಿಂಪಿಕ್ ಓಟಗಾರರಿಗಿಂತ ವೇಗವಾಗಿ ಓಡಿದ್ದಾರೆ.",
    ],
    legendEn:
      "Held in the months after the harvest, Kambala thanks the soil and the rain that fed it — a race run not for medals, but for the land.",
    legendKn:
      "ಸುಗ್ಗಿಯ ನಂತರದ ತಿಂಗಳಲ್ಲಿ ನಡೆಯುವ ಕಂಬಳ ಮಣ್ಣು ಮತ್ತು ಮಳೆಗೆ ಕೃತಜ್ಞತೆ ಸಲ್ಲಿಸುತ್ತದೆ.",
    kingsEn: "A living folk tradition of Dakshina Kannada & Udupi villages.",
    kingsKn: "ದಕ್ಷಿಣ ಕನ್ನಡ ಮತ್ತು ಉಡುಪಿ ಹಳ್ಳಿಗಳ ಜೀವಂತ ಜಾನಪದ ಸಂಪ್ರದಾಯ.",
    foods: [
      {
        wiki: "Neer dosa",
        nameEn: "Neer Dosa",
        nameKn: "ನೀರ್ ದೋಸೆ",
        noteEn: "Lace-thin coastal rice crepes, the taste of Tulu Nadu.",
        noteKn: "ತೆಳ್ಳಗಿನ ಕರಾವಳಿ ಅಕ್ಕಿ ದೋಸೆ, ತುಳುನಾಡಿನ ರುಚಿ.",
      },
      {
        wiki: "Kori rotti",
        nameEn: "Kori Rotti",
        nameKn: "ಕೋರಿ ರೊಟ್ಟಿ",
        noteEn: "Crisp rice wafers drowned in fiery chicken curry.",
        noteKn: "ಖಾರದ ಕೋಳಿ ಸಾರಿನಲ್ಲಿ ಗರಿಗರಿ ಅಕ್ಕಿ ರೊಟ್ಟಿ.",
      },
      {
        wiki: "Patrode",
        nameEn: "Patrode",
        nameKn: "ಪತ್ರೊಡೆ",
        noteEn: "Steamed colocasia-leaf rolls, a coastal monsoon favourite.",
        noteKn: "ಆವಿಯಲ್ಲಿ ಬೇಯಿಸಿದ ಕೆಸುವಿನ ಎಲೆ ಸುರುಳಿ.",
      },
    ],
    culture: [
      {
        icon: "🐃",
        labelEn: "The Race",
        labelKn: "ಓಟ",
        en: "Runners grip the plough and fly behind the buffaloes through the slush.",
        kn: "ಓಟಗಾರರು ನೇಗಿಲು ಹಿಡಿದು ಕೋಣಗಳ ಹಿಂದೆ ಕೆಸರಿನಲ್ಲಿ ಹಾರುತ್ತಾರೆ.",
      },
      {
        icon: "🥁",
        labelEn: "Cheer",
        labelKn: "ಹುರಿದುಂಬಿಸುವಿಕೆ",
        en: "Drums, whistles and thousands of villagers line the muddy track.",
        kn: "ಡೋಲು, ಸೀಟಿ ಮತ್ತು ಸಾವಿರಾರು ಹಳ್ಳಿಗರು ಕೆಸರು ಹಾದಿಯ ಸುತ್ತ.",
      },
      {
        icon: "💦",
        labelEn: "Kola",
        labelKn: "ಕೆಸರು",
        en: "Height of the splash off the 'kolu' marks a winning run.",
        kn: "ಕೆಸರಿನ ಚಿಮ್ಮುವಿಕೆಯ ಎತ್ತರವೇ ಗೆಲುವಿನ ಗುರುತು.",
      },
    ],
    gallery: ["Kambala", "Water buffalo", "Paddy field", "Tulu Nadu", "Monsoon", "Mangalore"],
    kidsEn:
      "Kambala is a super-fast buffalo race in muddy water! Two strong buffaloes run side by side while a person holds on and races behind them. Splash! The mud flies up to the sky and everyone cheers!",
    kidsKn:
      "ಕಂಬಳ ಕೆಸರು ನೀರಿನಲ್ಲಿ ನಡೆಯುವ ವೇಗದ ಕೋಣಗಳ ಓಟ! ಎರಡು ಬಲಿಷ್ಠ ಕೋಣಗಳು ಓಡುತ್ತವೆ, ಒಬ್ಬ ವ್ಯಕ್ತಿ ಹಿಂದೆ ಓಡುತ್ತಾನೆ. ಕೆಸರು ಆಕಾಶಕ್ಕೆ ಚಿಮ್ಮುತ್ತದೆ!",
    facts: [
      {
        en: "In 2016 a Kambala runner covered 100 m in the slush in about 13.6 seconds, sparking national headlines.",
        kn: "2016ರಲ್ಲಿ ಒಬ್ಬ ಕಂಬಳ ಓಟಗಾರ ಕೆಸರಿನಲ್ಲಿ 100 ಮೀ. ಸುಮಾರು 13.6 ಸೆಕೆಂಡಿನಲ್ಲಿ ಕ್ರಮಿಸಿದನು.",
      },
      {
        en: "The buffaloes are pampered athletes — massaged, specially fed, and never sold cheaply.",
        kn: "ಕೋಣಗಳು ಮುದ್ದಿನ ಕ್ರೀಡಾಪಟುಗಳು — ಮಸಾಜ್, ವಿಶೇಷ ಆಹಾರ, ಎಂದೂ ಅಗ್ಗವಾಗಿ ಮಾರಲ್ಪಡುವುದಿಲ್ಲ.",
      },
    ],
  },

  "hampi-utsav": {
    accent: "249 115 22",
    accent2: "168 85 247",
    skyTop: "40 20 8",
    skyBottom: "18 10 5",
    ambient: "torch",
    wow: "ruins",
    emotions: ["grand", "spiritual", "music", "royal"],
    taglineEn: "An empire of stone wakes for three nights of light and song.",
    taglineKn: "ಕಲ್ಲಿನ ಸಾಮ್ರಾಜ್ಯ ಮೂರು ರಾತ್ರಿಗಳ ಬೆಳಕು ಮತ್ತು ಸಂಗೀತಕ್ಕೆ ಎಚ್ಚರಗೊಳ್ಳುತ್ತದೆ.",
    hero: "Hampi",
    scenes: [
      {
        wiki: "Hampi",
        kickerEn: "Vijayanagara, after dusk",
        kickerKn: "ವಿಜಯನಗರ, ಸಂಜೆಯ ನಂತರ",
        en: "Boulders glow amber as the last light leaves the ruins.",
        kn: "ಕೊನೆಯ ಬೆಳಕು ಅವಶೇಷಗಳಿಂದ ಮರೆಯಾಗುತ್ತಿದ್ದಂತೆ ಬಂಡೆಗಳು ಕೇಸರಿ ಬಣ್ಣಕ್ಕೆ ತಿರುಗುತ್ತವೆ.",
        side: "full",
      },
      {
        wiki: "Virupaksha Temple, Hampi",
        en: "The Virupaksha gopura is lit; bells echo down empty bazaars.",
        kn: "ವಿರೂಪಾಕ್ಷ ಗೋಪುರ ಬೆಳಗುತ್ತದೆ; ಖಾಲಿ ಬಜಾರಿನಲ್ಲಿ ಗಂಟೆ ಮೊಳಗುತ್ತದೆ.",
        side: "left",
      },
      {
        wiki: "Stone Chariot, Hampi",
        imageTitle: "Vittala Temple",
        en: "The stone chariot seems ready to roll once more.",
        kn: "ಕಲ್ಲಿನ ರಥ ಮತ್ತೊಮ್ಮೆ ಉರುಳಲು ಸಿದ್ಧವಾದಂತೆ ಕಾಣುತ್ತದೆ.",
        side: "right",
      },
      {
        wiki: "Hampi",
        en: "Music rises among the pillars — and for a night, the empire lives.",
        kn: "ಕಂಬಗಳ ನಡುವೆ ಸಂಗೀತ ಏಳುತ್ತದೆ — ಒಂದು ರಾತ್ರಿ ಸಾಮ್ರಾಜ್ಯ ಜೀವಿಸುತ್ತದೆ.",
        side: "full",
      },
    ],
    heritageEn: [
      "Hampi was the capital of the Vijayanagara Empire — in the 1500s, one of the largest, richest cities on Earth.",
      "Hampi Utsava (Vijaya Utsava) revives that splendour with classical dance, folk art and son-et-lumière among the ruins.",
      "The ruins are a UNESCO World Heritage Site, a city of temples, bazaars and royal enclosures frozen in stone.",
    ],
    heritageKn: [
      "ಹಂಪಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿ — 1500ರ ದಶಕದಲ್ಲಿ ಭೂಮಿಯ ಅತಿದೊಡ್ಡ, ಶ್ರೀಮಂತ ನಗರಗಳಲ್ಲೊಂದು.",
      "ಹಂಪಿ ಉತ್ಸವ (ವಿಜಯ ಉತ್ಸವ) ಶಾಸ್ತ್ರೀಯ ನೃತ್ಯ, ಜಾನಪದ ಮತ್ತು ಬೆಳಕು-ಧ್ವನಿಯಿಂದ ಆ ವೈಭವವನ್ನು ಮರುಜೀವಿಸುತ್ತದೆ.",
      "ಅವಶೇಷಗಳು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ.",
    ],
    legendEn:
      "Travellers like Domingo Paes wrote that Vijayanagara was 'as large as Rome and very beautiful', its markets heaped with diamonds and rubies.",
    legendKn:
      "ಡೊಮಿಂಗೊ ಪಯಸ್‌ನಂತಹ ಪ್ರವಾಸಿಗಳು ವಿಜಯನಗರ 'ರೋಮ್‌ನಷ್ಟು ದೊಡ್ಡದು ಮತ್ತು ಬಹಳ ಸುಂದರ' ಎಂದು ಬರೆದರು.",
    kingsEn: "Krishnadevaraya · Vijayanagara emperors · the Tuluva dynasty",
    kingsKn: "ಕೃಷ್ಣದೇವರಾಯ · ವಿಜಯನಗರ ಚಕ್ರವರ್ತಿಗಳು · ತುಳುವ ವಂಶ",
    foods: [
      {
        wiki: "Jolada rotti",
        nameEn: "Jolada Rotti",
        nameKn: "ಜೋಳದ ರೊಟ್ಟಿ",
        noteEn: "Sorghum flatbread — the staple of the surrounding plains.",
        noteKn: "ಜೋಳದ ರೊಟ್ಟಿ — ಸುತ್ತಲಿನ ಬಯಲುಸೀಮೆಯ ಆಹಾರ.",
      },
      {
        wiki: "Ennegayi",
        imageTitle: "Stuffed brinjal",
        nameEn: "Badanekayi Ennegai",
        nameKn: "ಬದನೆಕಾಯಿ ಎಣ್ಣೆಗಾಯಿ",
        noteEn: "Stuffed brinjal in a rich peanut-sesame gravy.",
        noteKn: "ಶೇಂಗಾ-ಎಳ್ಳಿನ ಗಟ್ಟಿ ಸಾರಿನಲ್ಲಿ ತುಂಬಿದ ಬದನೆಕಾಯಿ.",
      },
      {
        wiki: "Holige",
        imageTitle: "Puran poli",
        nameEn: "Shenga Holige",
        nameKn: "ಶೇಂಗಾ ಹೋಳಿಗೆ",
        noteEn: "Groundnut-jaggery sweet flatbread of north Karnataka.",
        noteKn: "ಉತ್ತರ ಕರ್ನಾಟಕದ ಶೇಂಗಾ-ಬೆಲ್ಲದ ಸಿಹಿ ಹೋಳಿಗೆ.",
      },
    ],
    culture: [
      {
        icon: "💡",
        labelEn: "Light & Sound",
        labelKn: "ಬೆಳಕು-ಧ್ವನಿ",
        en: "A son-et-lumière narrates the empire's rise across the lit monuments.",
        kn: "ಬೆಳಗಿದ ಸ್ಮಾರಕಗಳ ಮೇಲೆ ಬೆಳಕು-ಧ್ವನಿ ಸಾಮ್ರಾಜ್ಯದ ಕಥೆ ಹೇಳುತ್ತದೆ.",
      },
      {
        icon: "💃",
        labelEn: "Dance",
        labelKn: "ನೃತ್ಯ",
        en: "Bharatanatyam and Kuchipudi performed where royal dancers once did.",
        kn: "ರಾಜ ನರ್ತಕಿಯರು ನರ್ತಿಸಿದಲ್ಲಿ ಭರತನಾಟ್ಯ ಮತ್ತು ಕೂಚಿಪುಡಿ.",
      },
      {
        icon: "🪕",
        labelEn: "Folk Arts",
        labelKn: "ಜಾನಪದ",
        en: "Puppetry, Dollu Kunitha and craft bazaars fill the ancient streets.",
        kn: "ಗೊಂಬೆಯಾಟ, ಡೊಳ್ಳು ಕುಣಿತ ಮತ್ತು ಕರಕುಶಲ ಬಜಾರ್‌ಗಳು.",
      },
    ],
    gallery: [
      "Hampi",
      "Virupaksha Temple, Hampi",
      "Stone Chariot, Hampi",
      "Vijayanagara",
      "Lotus Mahal",
      "Elephant Stables, Hampi",
    ],
    kidsEn:
      "Hampi is a giant city made of stone, built by kings long, long ago! During Hampi Utsava the old temples light up, dancers twirl, and a stone chariot looks like it might roll away. It's like the past wakes up to play!",
    kidsKn:
      "ಹಂಪಿ ಬಹಳ ಹಿಂದೆ ಅರಸರು ಕಟ್ಟಿದ ಕಲ್ಲಿನ ದೈತ್ಯ ನಗರ! ಹಂಪಿ ಉತ್ಸವದಲ್ಲಿ ಹಳೆಯ ದೇವಾಲಯಗಳು ಬೆಳಗುತ್ತವೆ, ನರ್ತಕಿಯರು ಕುಣಿಯುತ್ತಾರೆ, ಕಲ್ಲಿನ ರಥ ಉರುಳುವಂತೆ ಕಾಣುತ್ತದೆ!",
    facts: [
      {
        en: "Hampi has over 1,600 surviving monuments spread across 4,100 hectares.",
        kn: "ಹಂಪಿಯಲ್ಲಿ 4,100 ಹೆಕ್ಟೇರ್‌ಗಳಲ್ಲಿ 1,600ಕ್ಕೂ ಹೆಚ್ಚು ಸ್ಮಾರಕಗಳಿವೆ.",
      },
      {
        en: "The 56 pillars of the Vittala temple 'sing' — each gives a different musical note when tapped.",
        kn: "ವಿಠ್ಠಲ ದೇವಾಲಯದ 56 ಕಂಬಗಳು 'ಹಾಡುತ್ತವೆ' — ತಟ್ಟಿದಾಗ ಪ್ರತಿಯೊಂದೂ ಬೇರೆ ಸ್ವರ ನೀಡುತ್ತದೆ.",
      },
    ],
  },

  sankranti: {
    accent: "234 179 8",
    accent2: "59 130 246",
    skyTop: "30 58 92",
    skyBottom: "12 28 50",
    ambient: "kite",
    wow: "bloom",
    emotions: ["joyful", "family", "rural", "nature"],
    taglineEn: "Eat sweet, speak sweet — and let your kite touch the sun.",
    taglineKn: "ಎಳ್ಳು-ಬೆಲ್ಲ ತಿಂದು ಒಳ್ಳೆಯ ಮಾತಾಡಿ — ನಿಮ್ಮ ಗಾಳಿಪಟ ಸೂರ್ಯನನ್ನು ಮುಟ್ಟಲಿ.",
    hero: "Makar Sankranti",
    scenes: [
      {
        wiki: "Makar Sankranti",
        kickerEn: "The sun turns north",
        kickerKn: "ಸೂರ್ಯ ಉತ್ತರಕ್ಕೆ ತಿರುಗುತ್ತಾನೆ",
        en: "Fields stand golden with the gathered harvest.",
        kn: "ಗದ್ದೆಗಳು ಕೊಯ್ದ ಸುಗ್ಗಿಯಿಂದ ಚಿನ್ನದ ಬಣ್ಣದಲ್ಲಿವೆ.",
        side: "full",
      },
      {
        wiki: "Sesame",
        imageTitle: "Sesame seeds",
        en: "Sesame and jaggery are shared: 'eat sweet, speak sweet'.",
        kn: "ಎಳ್ಳು ಮತ್ತು ಬೆಲ್ಲ ಹಂಚಲಾಗುತ್ತದೆ: 'ಎಳ್ಳು-ಬೆಲ್ಲ ತಿಂದು ಒಳ್ಳೆಯ ಮಾತಾಡಿ'.",
        side: "left",
      },
      {
        wiki: "Kite",
        en: "Children send paper kites chasing the northward sun.",
        kn: "ಮಕ್ಕಳು ಉತ್ತರದ ಸೂರ್ಯನ ಹಿಂದೆ ಕಾಗದದ ಗಾಳಿಪಟ ಹಾರಿಸುತ್ತಾರೆ.",
        side: "right",
      },
    ],
    heritageEn: [
      "Makara Sankranti marks the sun's entry into Capricorn and its northward journey — longer, warmer days ahead.",
      "It is Karnataka's great harvest thanksgiving, honouring cattle, soil and sun.",
      "Neighbours exchange 'ellu-bella', a mix of sesame, jaggery, coconut and groundnut, sealing sweetness between them.",
    ],
    heritageKn: [
      "ಮಕರ ಸಂಕ್ರಾಂತಿ ಸೂರ್ಯನ ಮಕರ ರಾಶಿ ಪ್ರವೇಶ ಮತ್ತು ಉತ್ತರಾಯಣವನ್ನು ಸೂಚಿಸುತ್ತದೆ.",
      "ಇದು ಕರ್ನಾಟಕದ ಸುಗ್ಗಿಯ ಕೃತಜ್ಞತಾ ಹಬ್ಬ — ರಾಸು, ಮಣ್ಣು, ಸೂರ್ಯನಿಗೆ ಗೌರವ.",
      "ನೆರೆಹೊರೆಯವರು ಎಳ್ಳು, ಬೆಲ್ಲ, ಕೊಬ್ಬರಿ, ಶೇಂಗಾ ಮಿಶ್ರಿತ 'ಎಳ್ಳು-ಬೆಲ್ಲ' ಹಂಚುತ್ತಾರೆ.",
    ],
    legendEn:
      "The decorated cattle leap over fire in 'Kichchu Haayisuvudu' — a fearless, joyous blessing for the herd that feeds the village.",
    legendKn:
      "ಅಲಂಕೃತ ರಾಸುಗಳು 'ಕಿಚ್ಚು ಹಾಯಿಸುವುದು'ದಲ್ಲಿ ಬೆಂಕಿಯ ಮೇಲೆ ಹಾರುತ್ತವೆ — ಹಳ್ಳಿಯನ್ನು ಸಾಕುವ ಹಿಂಡಿಗೆ ಆಶೀರ್ವಾದ.",
    kingsEn: "A harvest festival of every farming village across the Deccan.",
    kingsKn: "ಡೆಕ್ಕನ್‌ನ ಪ್ರತಿ ಕೃಷಿ ಹಳ್ಳಿಯ ಸುಗ್ಗಿ ಹಬ್ಬ.",
    foods: [
      {
        wiki: "Sesame",
        imageTitle: "Sesame seeds",
        nameEn: "Ellu-Bella",
        nameKn: "ಎಳ್ಳು-ಬೆಲ್ಲ",
        noteEn: "Sesame, jaggery, copra & groundnut — sweetness to share.",
        noteKn: "ಎಳ್ಳು, ಬೆಲ್ಲ, ಕೊಬ್ಬರಿ, ಶೇಂಗಾ — ಹಂಚುವ ಸಿಹಿ.",
      },
      {
        wiki: "Pongal (dish)",
        nameEn: "Sakkare Pongal",
        nameKn: "ಸಕ್ಕರೆ ಪೊಂಗಲ್",
        noteEn: "Sweet rice cooked with the fresh harvest and jaggery.",
        noteKn: "ಹೊಸ ಸುಗ್ಗಿ ಮತ್ತು ಬೆಲ್ಲದಿಂದ ಬೇಯಿಸಿದ ಸಿಹಿ ಅನ್ನ.",
      },
      {
        wiki: "Sugarcane",
        nameEn: "Kabbu",
        nameKn: "ಕಬ್ಬು",
        noteEn: "Stalks of fresh sugarcane, the season's simplest sweet.",
        noteKn: "ತಾಜಾ ಕಬ್ಬಿನ ತುಂಡುಗಳು, ಋತುವಿನ ಸರಳ ಸಿಹಿ.",
      },
    ],
    culture: [
      {
        icon: "🐄",
        labelEn: "Cattle",
        labelKn: "ರಾಸು",
        en: "Cows and bulls are bathed, painted and garlanded in thanks.",
        kn: "ಹಸು ಮತ್ತು ಎತ್ತುಗಳನ್ನು ತೊಳೆದು, ಬಣ್ಣ ಹಚ್ಚಿ, ಹೂಮಾಲೆ ಹಾಕಲಾಗುತ್ತದೆ.",
      },
      {
        icon: "🪁",
        labelEn: "Kites",
        labelKn: "ಗಾಳಿಪಟ",
        en: "Skies fill with paper kites cut loose in friendly duels.",
        kn: "ಆಕಾಶ ಕಾಗದದ ಗಾಳಿಪಟಗಳಿಂದ ತುಂಬುತ್ತದೆ.",
      },
      {
        icon: "🔥",
        labelEn: "Kichchu",
        labelKn: "ಕಿಚ್ಚು",
        en: "Bonfires are lit and cattle leap across for blessing.",
        kn: "ಬೆಂಕಿ ಹಚ್ಚಿ ರಾಸುಗಳು ಅದರ ಮೇಲೆ ಹಾರುತ್ತವೆ.",
      },
    ],
    gallery: ["Makar Sankranti", "Kite", "Sesame", "Sugarcane", "Cattle", "Harvest"],
    kidsEn:
      "On Sankranti we share a yummy mix of sesame and jaggery and say 'eat sweet, speak sweet'! Cows get colourful paint and flowers, and the sky fills with kites flying as high as the clouds!",
    kidsKn:
      "ಸಂಕ್ರಾಂತಿಯಂದು ನಾವು ಎಳ್ಳು-ಬೆಲ್ಲ ಹಂಚಿ 'ಒಳ್ಳೆಯ ಮಾತಾಡಿ' ಎನ್ನುತ್ತೇವೆ! ಹಸುಗಳಿಗೆ ಬಣ್ಣ-ಹೂವು, ಆಕಾಶದಲ್ಲಿ ಎತ್ತರಕ್ಕೆ ಗಾಳಿಪಟ!",
    facts: [
      {
        en: "Sankranti is one of the few Hindu festivals fixed to the solar calendar — almost always 14 January.",
        kn: "ಸಂಕ್ರಾಂತಿ ಸೌರ ಪಂಚಾಂಗಕ್ಕೆ ನಿಗದಿತ ಅಪರೂಪದ ಹಬ್ಬ — ಬಹುತೇಕ ಯಾವಾಗಲೂ ಜನವರಿ 14.",
      },
    ],
  },

  karaga: {
    accent: "236 72 153",
    accent2: "234 179 8",
    skyTop: "30 10 40",
    skyBottom: "12 6 22",
    ambient: "lotus",
    wow: "chariot",
    emotions: ["spiritual", "folk", "grand"],
    taglineEn: "A tower of jasmine moves through the old city at midnight.",
    taglineKn: "ಮಲ್ಲಿಗೆಯ ಗೋಪುರ ಮಧ್ಯರಾತ್ರಿ ಹಳೆಯ ನಗರದಲ್ಲಿ ಸಾಗುತ್ತದೆ.",
    hero: "Bangalore Karaga",
    scenes: [
      {
        wiki: "Bangalore Karaga",
        kickerEn: "Old Bengaluru, midnight",
        kickerKn: "ಹಳೆಯ ಬೆಂಗಳೂರು, ಮಧ್ಯರಾತ್ರಿ",
        en: "A priest balances a towering floral karaga on his head — never touching it with hands.",
        kn: "ಅರ್ಚಕ ಎತ್ತರದ ಹೂವಿನ ಕರಗವನ್ನು ತಲೆಯ ಮೇಲೆ ಹೊರುತ್ತಾರೆ — ಕೈಯಿಂದ ಮುಟ್ಟದೆ.",
        side: "full",
      },
      {
        wiki: "Bangalore Karaga",
        en: "Bare-chested Veerakumaras flank him with drawn swords, chanting.",
        kn: "ಖಡ್ಗ ಹಿಡಿದ ವೀರಕುಮಾರರು ಜಪಿಸುತ್ತಾ ಜೊತೆಗಿರುತ್ತಾರೆ.",
        side: "left",
      },
      {
        wiki: "Dharmaraya Swamy Temple",
        imageTitle: "Bangalore Karaga",
        en: "Through narrow lanes the procession flows till dawn, honouring Draupadi.",
        kn: "ಕಿರಿದಾದ ಓಣಿಗಳಲ್ಲಿ ಮೆರವಣಿಗೆ ಬೆಳಗಿನವರೆಗೆ ಸಾಗುತ್ತದೆ.",
        side: "right",
      },
    ],
    heritageEn: [
      "Bengaluru Karaga is among the city's oldest festivals, kept by the Thigala community for centuries.",
      "It honours Draupadi of the Mahabharata, worshipped as Shakti, the mother goddess.",
      "The karaga-bearer trains in secret and, dressed as a bride, carries the pot all night without his hands.",
    ],
    heritageKn: [
      "ಬೆಂಗಳೂರು ಕರಗ ನಗರದ ಅತ್ಯಂತ ಹಳೆಯ ಹಬ್ಬಗಳಲ್ಲೊಂದು, ಶತಮಾನಗಳಿಂದ ತಿಗಳ ಸಮುದಾಯದಿಂದ ಆಚರಣೆ.",
      "ಮಹಾಭಾರತದ ದ್ರೌಪದಿಯನ್ನು ಶಕ್ತಿ ದೇವಿಯಾಗಿ ಪೂಜಿಸುತ್ತದೆ.",
      "ಕರಗ ಹೊರುವವರು ಗುಪ್ತವಾಗಿ ತರಬೇತಿ ಪಡೆದು, ವಧುವಿನಂತೆ ಸಿಂಗರಿಸಿಕೊಂಡು ರಾತ್ರಿಯಿಡೀ ಕೈಯಿಲ್ಲದೆ ಹೊರುತ್ತಾರೆ.",
    ],
    legendEn:
      "Legend says Draupadi created the Veerakumara warriors from her own power to defeat a demon — they still march beside her karaga each year.",
    legendKn:
      "ದ್ರೌಪದಿ ತನ್ನ ಶಕ್ತಿಯಿಂದ ವೀರಕುಮಾರರನ್ನು ಸೃಷ್ಟಿಸಿ ರಾಕ್ಷಸನನ್ನು ಸೋಲಿಸಿದಳೆಂದು ಪ್ರತೀತಿ.",
    kingsEn: "Kept alive by the Thigala (Vahnikula Kshatriya) community of Bengaluru.",
    kingsKn: "ಬೆಂಗಳೂರಿನ ತಿಗಳ ಸಮುದಾಯದಿಂದ ಜೀವಂತವಾಗಿರಿಸಲ್ಪಟ್ಟದ್ದು.",
    foods: [
      {
        wiki: "Ragi mudde",
        nameEn: "Ragi Mudde",
        nameKn: "ರಾಗಿ ಮುದ್ದೆ",
        noteEn: "Finger-millet balls — the old city's hearty staple.",
        noteKn: "ರಾಗಿ ಉಂಡೆ — ಹಳೆಯ ನಗರದ ಪೌಷ್ಟಿಕ ಆಹಾರ.",
      },
      {
        wiki: "Mavinakayi Chitranna",
        imageTitle: "Lemon rice",
        nameEn: "Chitranna",
        nameKn: "ಚಿತ್ರಾನ್ನ",
        noteEn: "Tangy seasoned rice offered and shared.",
        noteKn: "ಹುಳಿ ಒಗ್ಗರಣೆ ಅನ್ನ, ಅರ್ಪಿಸಿ ಹಂಚುವುದು.",
      },
    ],
    culture: [
      {
        icon: "🏺",
        labelEn: "The Karaga",
        labelKn: "ಕರಗ",
        en: "A pyramid of jasmine and a sacred pot, balanced for hours.",
        kn: "ಮಲ್ಲಿಗೆಯ ಗೋಪುರ ಮತ್ತು ಪವಿತ್ರ ಕಲಶ, ಗಂಟೆಗಳ ಕಾಲ ಸಮತೋಲನ.",
      },
      {
        icon: "⚔️",
        labelEn: "Veerakumaras",
        labelKn: "ವೀರಕುಮಾರರು",
        en: "Sword-bearing devotees guard the karaga through the night.",
        kn: "ಖಡ್ಗ ಹಿಡಿದ ಭಕ್ತರು ರಾತ್ರಿಯಿಡೀ ಕರಗವನ್ನು ಕಾಯುತ್ತಾರೆ.",
      },
    ],
    gallery: ["Bangalore Karaga", "Dharmaraya Swamy Temple", "Jasmine", "Draupadi", "Bangalore"],
    kidsEn:
      "On Karaga night, a priest carries a tall, beautiful pot covered in jasmine flowers on his head — all night, without ever touching it with his hands! Brave helpers with swords walk beside him. It's amazing to watch!",
    kidsKn:
      "ಕರಗದ ರಾತ್ರಿ ಅರ್ಚಕರು ಮಲ್ಲಿಗೆ ಹೂವಿನ ಎತ್ತರದ ಕಲಶವನ್ನು ತಲೆಯ ಮೇಲೆ ಹೊರುತ್ತಾರೆ — ರಾತ್ರಿಯಿಡೀ, ಕೈ ಮುಟ್ಟದೆ!",
    facts: [
      {
        en: "At one point the karaga procession traditionally visits a Sufi dargah — a centuries-old symbol of communal harmony.",
        kn: "ಕರಗ ಮೆರವಣಿಗೆ ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ಸೂಫಿ ದರ್ಗಾಕ್ಕೆ ಭೇಟಿ ನೀಡುತ್ತದೆ — ಶತಮಾನಗಳ ಸೌಹಾರ್ದದ ಸಂಕೇತ.",
      },
    ],
  },

  ganesha: {
    accent: "234 88 12",
    accent2: "220 38 38",
    skyTop: "40 30 10",
    skyBottom: "20 12 6",
    ambient: "lotus",
    wow: "bloom",
    emotions: ["family", "joyful", "spiritual"],
    taglineEn: "The elephant-headed friend arrives, and clay becomes god.",
    taglineKn: "ಆನೆಮುಖದ ಗೆಳೆಯ ಬರುತ್ತಾನೆ, ಮಣ್ಣು ದೇವರಾಗುತ್ತದೆ.",
    hero: "Ganesh Chaturthi",
    scenes: [
      {
        wiki: "Ganesha",
        kickerEn: "A welcome",
        kickerKn: "ಸ್ವಾಗತ",
        en: "A clay Ganesha is brought home with drums and joy.",
        kn: "ಮಣ್ಣಿನ ಗಣೇಶನನ್ನು ಡೋಲು ಮತ್ತು ಸಂತೋಷದಿಂದ ಮನೆಗೆ ತರಲಾಗುತ್ತದೆ.",
        side: "full",
      },
      {
        wiki: "Modak",
        en: "His favourite modaka sweets are offered in heaps.",
        kn: "ಅವನ ಪ್ರಿಯ ಮೋದಕವನ್ನು ರಾಶಿಯಾಗಿ ಅರ್ಪಿಸಲಾಗುತ್ತದೆ.",
        side: "left",
      },
      {
        wiki: "Ganesh Chaturthi",
        en: "After days of love, he is carried to the water for visarjana.",
        kn: "ಹಲವು ದಿನಗಳ ಪ್ರೀತಿಯ ನಂತರ, ವಿಸರ್ಜನೆಗೆ ನೀರಿನ ಕಡೆ ಸಾಗಿಸಲಾಗುತ್ತದೆ.",
        side: "right",
      },
    ],
    heritageEn: [
      "In Karnataka, Gowri Habba welcomes the goddess Gowri one day; her son Ganesha arrives the next.",
      "Clay idols are installed in homes and public pandals, worshipped for one, three, five or more days.",
      "The celebration ends in 'visarjana' — a joyous immersion procession returning the god to the waters.",
    ],
    heritageKn: [
      "ಕರ್ನಾಟಕದಲ್ಲಿ ಗೌರಿ ಹಬ್ಬ ಒಂದು ದಿನ ಗೌರಿ ದೇವಿಯನ್ನು ಸ್ವಾಗತಿಸುತ್ತದೆ; ಮರುದಿನ ಗಣೇಶ ಬರುತ್ತಾನೆ.",
      "ಮಣ್ಣಿನ ಮೂರ್ತಿಗಳನ್ನು ಮನೆ ಮತ್ತು ಪಂಡಾಲ್‌ಗಳಲ್ಲಿ ಪ್ರತಿಷ್ಠಾಪಿಸಲಾಗುತ್ತದೆ.",
      "ಆಚರಣೆ 'ವಿಸರ್ಜನೆ'ಯೊಂದಿಗೆ ಮುಗಿಯುತ್ತದೆ.",
    ],
    legendEn:
      "Goddess Parvati made Ganesha from turmeric paste to guard her door — a story of a mother's love that every Kannada child knows.",
    legendKn:
      "ಪಾರ್ವತಿ ತನ್ನ ಬಾಗಿಲನ್ನು ಕಾಯಲು ಅರಿಶಿನದಿಂದ ಗಣೇಶನನ್ನು ಸೃಷ್ಟಿಸಿದಳು — ಪ್ರತಿ ಕನ್ನಡ ಮಗುವಿಗೂ ತಿಳಿದ ತಾಯಿಯ ಪ್ರೀತಿಯ ಕಥೆ.",
    kingsEn: "A beloved home and community festival across all of Karnataka.",
    kingsKn: "ಕರ್ನಾಟಕದಾದ್ಯಂತ ಪ್ರೀತಿಯ ಮನೆ ಮತ್ತು ಸಮುದಾಯ ಹಬ್ಬ.",
    foods: [
      {
        wiki: "Modak",
        nameEn: "Kadubu / Modaka",
        nameKn: "ಕಡುಬು / ಮೋದಕ",
        noteEn: "Steamed rice dumplings of coconut and jaggery — Ganesha's favourite.",
        noteKn: "ಕೊಬ್ಬರಿ-ಬೆಲ್ಲದ ಆವಿ ಕಡುಬು — ಗಣೇಶನ ಪ್ರಿಯ.",
      },
      {
        wiki: "Chakli",
        nameEn: "Chakli",
        nameKn: "ಚಕ್ಕುಲಿ",
        noteEn: "Crisp savoury spirals for the festival platter.",
        noteKn: "ಹಬ್ಬದ ತಟ್ಟೆಗೆ ಗರಿಗರಿ ಚಕ್ಕುಲಿ.",
      },
      {
        wiki: "Payasam",
        nameEn: "Kadubu Payasa",
        nameKn: "ಪಾಯಸ",
        noteEn: "Sweet pudding to round off the offering.",
        noteKn: "ಅರ್ಪಣೆಯನ್ನು ಮುಗಿಸಲು ಸಿಹಿ ಪಾಯಸ.",
      },
    ],
    culture: [
      {
        icon: "🐘",
        labelEn: "Idols",
        labelKn: "ಮೂರ್ತಿ",
        en: "Eco-clay Ganeshas, from palm-sized to towering pandal giants.",
        kn: "ಪರಿಸರ ಸ್ನೇಹಿ ಮಣ್ಣಿನ ಗಣೇಶ, ಅಂಗೈಯಿಂದ ದೈತ್ಯ ಮೂರ್ತಿಯವರೆಗೆ.",
      },
      {
        icon: "🌊",
        labelEn: "Visarjana",
        labelKn: "ವಿಸರ್ಜನೆ",
        en: "Streets dance behind the idol to the immersion, singing farewell.",
        kn: "ವಿಸರ್ಜನೆಗೆ ಬೀದಿಗಳು ಮೂರ್ತಿಯ ಹಿಂದೆ ಕುಣಿದು ಬೀಳ್ಕೊಡುತ್ತವೆ.",
      },
    ],
    gallery: ["Ganesha", "Ganesh Chaturthi", "Modak", "Parvati", "Idol"],
    kidsEn:
      "Ganesha is the friendly god with an elephant head who loves sweets called modaka! We bring him home made of clay, sing and play for a few days, then say 'come back soon!' as he goes into the water.",
    kidsKn:
      "ಗಣೇಶ ಆನೆಮುಖದ ಪ್ರೀತಿಯ ದೇವರು, ಮೋದಕ ಅವನ ಪ್ರಿಯ! ಮಣ್ಣಿನ ಗಣೇಶನನ್ನು ಮನೆಗೆ ತಂದು ಕೆಲವು ದಿನ ಸಂಭ್ರಮಿಸಿ, ನೀರಿಗೆ ಬೀಳ್ಕೊಡುತ್ತೇವೆ!",
    facts: [
      {
        en: "Many Kannada families now choose eco-friendly clay idols that dissolve safely, protecting the lakes.",
        kn: "ಅನೇಕ ಕನ್ನಡ ಕುಟುಂಬಗಳು ಈಗ ಕೆರೆಗಳನ್ನು ರಕ್ಷಿಸಲು ಪರಿಸರ ಸ್ನೇಹಿ ಮಣ್ಣಿನ ಮೂರ್ತಿಗಳನ್ನು ಆರಿಸುತ್ತಾರೆ.",
      },
    ],
  },

};

/**
 * Fallback experience so every festival — even ones without a bespoke world —
 * still opens into a themed, animated room rather than a blank page.
 */
export function experienceFor(id: string): FestivalExperience {
  return (
    experiences[id] ?? {
      accent: "217 119 6",
      accent2: "190 24 93",
      skyTop: "30 20 50",
      skyBottom: "12 8 24",
      ambient: "spark",
      wow: "bloom",
      emotions: ["joyful", "spiritual"],
      taglineEn: "A celebration of Karnataka's living culture.",
      taglineKn: "ಕರ್ನಾಟಕದ ಜೀವಂತ ಸಂಸ್ಕೃತಿಯ ಆಚರಣೆ.",
      hero: "Karnataka",
      scenes: [],
      heritageEn: generic.heritageEn,
      heritageKn: generic.heritageKn,
      legendEn: "",
      legendKn: "",
      kingsEn: "",
      kingsKn: "",
      foods: [],
      culture: [],
      gallery: [],
      kidsEn: "",
      kidsKn: "",
      facts: [],
    }
  );
}

/** Emotion chips for the discovery entry. */
export const EMOTIONS: {
  id: Emotion;
  emoji: string;
  labelEn: string;
  labelKn: string;
}[] = [
  { id: "joyful", emoji: "✨", labelEn: "Something joyful", labelKn: "ಸಂತೋಷದ್ದು" },
  { id: "grand", emoji: "🔥", labelEn: "Grand celebrations", labelKn: "ವೈಭವದ್ದು" },
  { id: "spiritual", emoji: "🛕", labelEn: "Spiritual festivals", labelKn: "ಆಧ್ಯಾತ್ಮಿಕ" },
  { id: "rural", emoji: "🌾", labelEn: "Rural traditions", labelKn: "ಗ್ರಾಮೀಣ" },
  { id: "folk", emoji: "🎭", labelEn: "Folk culture", labelKn: "ಜಾನಪದ" },
  { id: "family", emoji: "👨‍👩‍👧", labelEn: "Family celebrations", labelKn: "ಕುಟುಂಬ" },
  { id: "music", emoji: "🎶", labelEn: "Music & dance", labelKn: "ಸಂಗೀತ-ನೃತ್ಯ" },
  { id: "nature", emoji: "🌺", labelEn: "Nature festivals", labelKn: "ಪ್ರಕೃತಿ" },
  { id: "royal", emoji: "👑", labelEn: "Royal festivals", labelKn: "ರಾಜಮನೆತನ" },
];
