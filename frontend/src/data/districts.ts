/**
 * Karnataka districts — the dataset that powers the interactive map.
 *
 * `id` MUST match the `district` property in `public/karnataka.geojson` so the
 * map can link a polygon to its info. `wiki` is the Wikipedia article title we
 * use to pull a LIVE summary + photo at runtime (see `lib/wiki.ts`), so the
 * "news/info + image" for each district is always fresh rather than hard-coded.
 */

export type District = {
  /** Exact name as it appears in the GeoJSON `district` property. */
  id: string;
  nameEn: string;
  nameKn: string;
  /** Wikipedia article title used for the live summary + image. */
  wiki: string;
  /**
   * Optional landmark article to borrow a photo from when the district's own
   * article has no lead image (keeps every card illustrated).
   */
  imageTitle?: string;
  /** One-line curated highlight, shown instantly while live data loads. */
  tagEn: string;
  tagKn: string;
  emoji: string;
};

export const districts: District[] = [
  {
    id: "Bidar",
    nameEn: "Bidar",
    nameKn: "ಬೀದರ್",
    wiki: "Bidar",
    tagEn: "Bahmani fort city & the 'crown of Karnataka'.",
    tagKn: "ಬಹಮನಿ ಕೋಟೆ ನಗರ ಮತ್ತು 'ಕರ್ನಾಟಕದ ಕಿರೀಟ'.",
    emoji: "🏰",
  },
  {
    id: "Kalaburagi",
    nameEn: "Kalaburagi",
    nameKn: "ಕಲಬುರಗಿ",
    wiki: "Kalaburagi",
    tagEn: "Bahmani capital, famed for toor dal and Sufi shrines.",
    tagKn: "ಬಹಮನಿ ರಾಜಧಾನಿ, ತೊಗರಿ ಬೇಳೆ ಮತ್ತು ಸೂಫಿ ದರ್ಗಾಗಳಿಗೆ ಖ್ಯಾತಿ.",
    emoji: "🕌",
  },
  {
    id: "Belagavi",
    nameEn: "Belagavi",
    nameKn: "ಬೆಳಗಾವಿ",
    wiki: "Belagavi",
    imageTitle: "Belgaum Fort",
    tagEn: "Karnataka's second capital with a historic fort.",
    tagKn: "ಐತಿಹಾಸಿಕ ಕೋಟೆ ಹೊಂದಿರುವ ಕರ್ನಾಟಕದ ಎರಡನೇ ರಾಜಧಾನಿ.",
    emoji: "🏛️",
  },
  {
    id: "Yadgir",
    nameEn: "Yadgir",
    nameKn: "ಯಾದಗಿರಿ",
    wiki: "Yadgir",
    tagEn: "Rocky hill forts and the Bhima river basin.",
    tagKn: "ಬಂಡೆಗಲ್ಲಿನ ಬೆಟ್ಟದ ಕೋಟೆಗಳು ಮತ್ತು ಭೀಮಾ ನದಿ ಕಣಿವೆ.",
    emoji: "⛰️",
  },
  {
    id: "Bagalkote",
    nameEn: "Bagalkote",
    nameKn: "ಬಾಗಲಕೋಟೆ",
    wiki: "Bagalkot",
    imageTitle: "Badami cave temples",
    tagEn: "Gateway to Badami, Aihole & Pattadakal temples.",
    tagKn: "ಬಾದಾಮಿ, ಐಹೊಳೆ ಮತ್ತು ಪಟ್ಟದಕಲ್ ದೇವಾಲಯಗಳ ಹೆಬ್ಬಾಗಿಲು.",
    emoji: "🛕",
  },
  {
    id: "Raichur",
    nameEn: "Raichur",
    nameKn: "ರಾಯಚೂರು",
    wiki: "Raichur",
    tagEn: "Doab land between the Krishna and Tungabhadra.",
    tagKn: "ಕೃಷ್ಣಾ ಮತ್ತು ತುಂಗಭದ್ರಾ ನಡುವಿನ ದೋ-ಆಬ್ ನಾಡು.",
    emoji: "🌾",
  },
  {
    id: "Koppal",
    nameEn: "Koppal",
    nameKn: "ಕೊಪ್ಪಳ",
    wiki: "Koppal",
    imageTitle: "Anegundi",
    tagEn: "Ancient Kopana, near the ruins of Anegundi.",
    tagKn: "ಪ್ರಾಚೀನ ಕೊಪಣ, ಆನೆಗುಂದಿ ಅವಶೇಷಗಳ ಸಮೀಪ.",
    emoji: "🪨",
  },
  {
    id: "Gadag",
    nameEn: "Gadag",
    nameKn: "ಗದಗ",
    wiki: "Gadag",
    imageTitle: "Lakkundi",
    tagEn: "Chalukyan temples and handloom weaving.",
    tagKn: "ಚಾಲುಕ್ಯರ ದೇವಾಲಯಗಳು ಮತ್ತು ಕೈಮಗ್ಗ ನೇಯ್ಗೆ.",
    emoji: "🧵",
  },
  {
    id: "Ballari",
    nameEn: "Ballari",
    nameKn: "ಬಳ್ಳಾರಿ",
    wiki: "Ballari",
    tagEn: "Iron-ore heartland beside Vijayanagara.",
    tagKn: "ವಿಜಯನಗರದ ಪಕ್ಕದ ಕಬ್ಬಿಣ ಅದಿರಿನ ನಾಡು.",
    emoji: "⛏️",
  },
  {
    id: "Dharwad",
    nameEn: "Dharwad",
    nameKn: "ಧಾರವಾಡ",
    wiki: "Dharwad",
    tagEn: "Cradle of Hindustani music and the famous pedha.",
    tagKn: "ಹಿಂದೂಸ್ತಾನಿ ಸಂಗೀತದ ತೊಟ್ಟಿಲು ಮತ್ತು ಪ್ರಸಿದ್ಧ ಪೇಡ.",
    emoji: "🎶",
  },
  {
    id: "Uttara Kannada",
    nameEn: "Uttara Kannada",
    nameKn: "ಉತ್ತರ ಕನ್ನಡ",
    wiki: "Uttara Kannada",
    tagEn: "Western Ghats, beaches, and roaring waterfalls.",
    tagKn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು, ಕಡಲತೀರಗಳು ಮತ್ತು ಆರ್ಭಟಿಸುವ ಜಲಪಾತಗಳು.",
    emoji: "🏖️",
  },
  {
    id: "Haveri",
    nameEn: "Haveri",
    nameKn: "ಹಾವೇರಿ",
    wiki: "Haveri",
    tagEn: "Land of cardamom and the poet Kanaka Dasa.",
    tagKn: "ಏಲಕ್ಕಿಯ ನಾಡು ಮತ್ತು ಕನಕದಾಸರ ಜನ್ಮಭೂಮಿ.",
    emoji: "🌿",
  },
  {
    id: "Chitradurga",
    nameEn: "Chitradurga",
    nameKn: "ಚಿತ್ರದುರ್ಗ",
    wiki: "Chitradurga",
    imageTitle: "Chitradurga Fort",
    tagEn: "The mighty 'stone fortress' of seven hills.",
    tagKn: "ಏಳು ಬೆಟ್ಟಗಳ ಬೃಹತ್ 'ಕಲ್ಲಿನ ಕೋಟೆ'.",
    emoji: "🏯",
  },
  {
    id: "Davanagere",
    nameEn: "Davanagere",
    nameKn: "ದಾವಣಗೆರೆ",
    wiki: "Davanagere",
    imageTitle: "Harihareshwara Temple",
    tagEn: "'Manchester of Karnataka' and home of benne dosa.",
    tagKn: "'ಕರ್ನಾಟಕದ ಮ್ಯಾಂಚೆಸ್ಟರ್' ಮತ್ತು ಬೆಣ್ಣೆ ದೋಸೆಯ ನೆಲೆ.",
    emoji: "🥞",
  },
  {
    id: "Shivamogga",
    nameEn: "Shivamogga",
    nameKn: "ಶಿವಮೊಗ್ಗ",
    wiki: "Shivamogga",
    imageTitle: "Jog Falls",
    tagEn: "'Gateway to the Malnad' and Jog Falls.",
    tagKn: "'ಮಲೆನಾಡಿನ ಹೆಬ್ಬಾಗಿಲು' ಮತ್ತು ಜೋಗ ಜಲಪಾತ.",
    emoji: "🌊",
  },
  {
    id: "Udupi",
    nameEn: "Udupi",
    nameKn: "ಉಡುಪಿ",
    wiki: "Udupi",
    imageTitle: "Udupi Sri Krishna Matha",
    tagEn: "Krishna temple, golden beaches & iconic cuisine.",
    tagKn: "ಕೃಷ್ಣ ದೇವಾಲಯ, ಚಿನ್ನದ ಕಡಲತೀರ ಮತ್ತು ಪ್ರಸಿದ್ಧ ಊಟ.",
    emoji: "🍛",
  },
  {
    id: "Chikkamagaluru",
    nameEn: "Chikkamagaluru",
    nameKn: "ಚಿಕ್ಕಮಗಳೂರು",
    wiki: "Chikmagalur",
    tagEn: "Birthplace of Indian coffee, under Mullayanagiri.",
    tagKn: "ಭಾರತೀಯ ಕಾಫಿಯ ಜನ್ಮಸ್ಥಳ, ಮುಳ್ಳಯ್ಯನಗಿರಿಯ ತಪ್ಪಲು.",
    emoji: "☕",
  },
  {
    id: "Chikkaballapura",
    nameEn: "Chikkaballapura",
    nameKn: "ಚಿಕ್ಕಬಳ್ಳಾಪುರ",
    wiki: "Chikkaballapur",
    imageTitle: "Nandi Hills, India",
    tagEn: "Nandi Hills and the birthplace of Sir M. Visvesvaraya.",
    tagKn: "ನಂದಿ ಬೆಟ್ಟ ಮತ್ತು ಸರ್ ಎಂ. ವಿಶ್ವೇಶ್ವರಯ್ಯ ಜನ್ಮಸ್ಥಳ.",
    emoji: "🌄",
  },
  {
    id: "Hassan",
    nameEn: "Hassan",
    nameKn: "ಹಾಸನ",
    wiki: "Hassan, Karnataka",
    tagEn: "Hoysala heartland — Belur, Halebidu & Shravanabelagola.",
    tagKn: "ಹೊಯ್ಸಳರ ನಾಡು — ಬೇಲೂರು, ಹಳೇಬೀಡು ಮತ್ತು ಶ್ರವಣಬೆಳಗೊಳ.",
    emoji: "🛕",
  },
  {
    id: "Kolar",
    nameEn: "Kolar",
    nameKn: "ಕೋಲಾರ",
    wiki: "Kolar",
    imageTitle: "Kolar Gold Fields",
    tagEn: "The historic Kolar Gold Fields (KGF).",
    tagKn: "ಐತಿಹಾಸಿಕ ಕೋಲಾರ ಚಿನ್ನದ ಗಣಿ (ಕೆ.ಜಿ.ಎಫ್).",
    emoji: "🥇",
  },
  {
    id: "Bengaluru Rural",
    nameEn: "Bengaluru Rural",
    nameKn: "ಬೆಂಗಳೂರು ಗ್ರಾಮಾಂತರ",
    wiki: "Bangalore Rural district",
    imageTitle: "Devanahalli Fort",
    tagEn: "Silk towns and Nandi-region getaways.",
    tagKn: "ರೇಷ್ಮೆ ಪಟ್ಟಣಗಳು ಮತ್ತು ನಂದಿ ಪ್ರದೇಶದ ತಾಣಗಳು.",
    emoji: "🐛",
  },
  {
    id: "Dakshina Kannada",
    nameEn: "Dakshina Kannada",
    nameKn: "ದಕ್ಷಿಣ ಕನ್ನಡ",
    wiki: "Dakshina Kannada",
    tagEn: "Mangaluru coast, temples and coastal cuisine.",
    tagKn: "ಮಂಗಳೂರು ಕರಾವಳಿ, ದೇವಾಲಯಗಳು ಮತ್ತು ಕರಾವಳಿ ಊಟ.",
    emoji: "🥥",
  },
  {
    id: "Bengaluru Urban",
    nameEn: "Bengaluru Urban",
    nameKn: "ಬೆಂಗಳೂರು ನಗರ",
    wiki: "Bangalore",
    imageTitle: "Vidhana Soudha",
    tagEn: "The Garden City and India's Silicon Valley.",
    tagKn: "ಉದ್ಯಾನ ನಗರಿ ಮತ್ತು ಭಾರತದ ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ.",
    emoji: "🌆",
  },
  {
    id: "Kodagu",
    nameEn: "Kodagu",
    nameKn: "ಕೊಡಗು",
    wiki: "Kodagu district",
    tagEn: "'Scotland of India' — coffee, mist & the Kaveri.",
    tagKn: "'ಭಾರತದ ಸ್ಕಾಟ್ಲೆಂಡ್' — ಕಾಫಿ, ಮಂಜು ಮತ್ತು ಕಾವೇರಿ.",
    emoji: "⛰️",
  },
  {
    id: "Chamarajanagara",
    nameEn: "Chamarajanagara",
    nameKn: "ಚಾಮರಾಜನಗರ",
    wiki: "Chamarajanagar",
    tagEn: "Tiger reserves and the hill temple of Male Mahadeshwara.",
    tagKn: "ಹುಲಿ ಸಂರಕ್ಷಿತ ಪ್ರದೇಶ ಮತ್ತು ಮಲೆ ಮಹದೇಶ್ವರ ಬೆಟ್ಟ.",
    emoji: "🐯",
  },
  {
    id: "Tumakuru",
    nameEn: "Tumakuru",
    nameKn: "ತುಮಕೂರು",
    wiki: "Tumakuru",
    imageTitle: "Siddaganga Matha",
    tagEn: "Coconut country and the Siddaganga Mutt.",
    tagKn: "ತೆಂಗಿನ ನಾಡು ಮತ್ತು ಸಿದ್ಧಗಂಗಾ ಮಠ.",
    emoji: "🥥",
  },
  {
    id: "Ramanagara",
    nameEn: "Ramanagara",
    nameKn: "ರಾಮನಗರ",
    wiki: "Ramanagara",
    imageTitle: "Ramadevarabetta",
    tagEn: "Silk city and the granite hills of 'Sholay'.",
    tagKn: "ರೇಷ್ಮೆ ನಗರ ಮತ್ತು 'ಶೋಲೆ' ಚಿತ್ರದ ಗ್ರಾನೈಟ್ ಬೆಟ್ಟಗಳು.",
    emoji: "🧶",
  },
  {
    id: "Mandya",
    nameEn: "Mandya",
    nameKn: "ಮಂಡ್ಯ",
    wiki: "Mandya",
    tagEn: "Sugarcane bowl fed by the Kaveri and KRS dam.",
    tagKn: "ಕಾವೇರಿ ಮತ್ತು ಕೆ.ಆರ್.ಎಸ್ ಅಣೆಕಟ್ಟಿನ ಕಬ್ಬಿನ ನಾಡು.",
    emoji: "🌾",
  },
  {
    id: "Mysuru",
    nameEn: "Mysuru",
    nameKn: "ಮೈಸೂರು",
    wiki: "Mysore",
    imageTitle: "Mysore Palace",
    tagEn: "City of palaces and the world-famous Dasara.",
    tagKn: "ಅರಮನೆಗಳ ನಗರಿ ಮತ್ತು ವಿಶ್ವಪ್ರಸಿದ್ಧ ದಸರಾ.",
    emoji: "🏰",
  },
  {
    id: "Vijayapura",
    nameEn: "Vijayapura",
    nameKn: "ವಿಜಯಪುರ",
    wiki: "Vijayapura, Karnataka",
    imageTitle: "Gol Gumbaz",
    tagEn: "Home of the Gol Gumbaz, the great whispering dome.",
    tagKn: "ಗೋಲ ಗುಮ್ಮಟದ ನೆಲೆ, ಮಹಾನ್ ಪಿಸುಗುಟ್ಟುವ ಗುಮ್ಮಟ.",
    emoji: "🕌",
  },
];

export type DistrictHighlights = {
  en: [string, string, string];
  kn: [string, string, string];
};

/** Curated, offline-safe places and traditions worth discovering. */
export const districtHighlights: Record<string, DistrictHighlights> = {
  Bidar: {
    en: ["Bidar Fort", "Bahmani tombs", "Bidri metal craft"],
    kn: ["ಬೀದರ್ ಕೋಟೆ", "ಬಹಮನಿ ಸಮಾಧಿಗಳು", "ಬಿದ್ರಿ ಲೋಹಕಲೆ"],
  },
  Kalaburagi: {
    en: ["Kalaburagi Fort", "Banda Nawaz Dargah", "North Karnataka toor dal"],
    kn: ["ಕಲಬುರಗಿ ಕೋಟೆ", "ಬಂದಾ ನವಾಜ್ ದರ್ಗಾ", "ಉತ್ತರ ಕರ್ನಾಟಕದ ತೊಗರಿ ಬೇಳೆ"],
  },
  Belagavi: {
    en: ["Belagavi Fort", "Suvarna Vidhana Soudha", "Gokak Falls"],
    kn: ["ಬೆಳಗಾವಿ ಕೋಟೆ", "ಸುವರ್ಣ ವಿಧಾನ ಸೌಧ", "ಗೋಕಾಕ್ ಜಲಪಾತ"],
  },
  Yadgir: {
    en: ["Yadgir Fort", "Surapura heritage", "Bhima River basin"],
    kn: ["ಯಾದಗಿರಿ ಕೋಟೆ", "ಸುರಪುರ ಪರಂಪರೆ", "ಭೀಮಾ ನದಿ ಕಣಿವೆ"],
  },
  Bagalkote: {
    en: ["Badami cave temples", "Aihole temple town", "Pattadakal UNESCO site"],
    kn: ["ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು", "ಐಹೊಳೆ ದೇವಾಲಯ ನಗರ", "ಪಟ್ಟದಕಲ್ಲು ಯುನೆಸ್ಕೋ ತಾಣ"],
  },
  Raichur: {
    en: ["Raichur Fort", "Krishna-Tungabhadra Doab", "Maski inscription"],
    kn: ["ರಾಯಚೂರು ಕೋಟೆ", "ಕೃಷ್ಣಾ-ತುಂಗಭದ್ರಾ ದೋಆಬ್", "ಮಸ್ಕಿ ಶಾಸನ"],
  },
  Koppal: {
    en: ["Anegundi", "Anjanadri Hill", "Itagi Mahadeva Temple"],
    kn: ["ಆನೆಗುಂದಿ", "ಅಂಜನಾದ್ರಿ ಬೆಟ್ಟ", "ಇಟಗಿ ಮಹಾದೇವ ದೇವಾಲಯ"],
  },
  Gadag: {
    en: ["Lakkundi temples", "Trikuteshwara Temple", "Gadag handlooms"],
    kn: ["ಲಕ್ಕುಂಡಿ ದೇವಾಲಯಗಳು", "ತ್ರಿಕೂಟೇಶ್ವರ ದೇವಾಲಯ", "ಗದಗ ಕೈಮಗ್ಗ"],
  },
  Ballari: {
    en: ["Ballari Fort", "Sandur hills", "Daroji Sloth Bear Sanctuary"],
    kn: ["ಬಳ್ಳಾರಿ ಕೋಟೆ", "ಸಂಡೂರು ಬೆಟ್ಟಗಳು", "ದರೋಜಿ ಕರಡಿ ಧಾಮ"],
  },
  Dharwad: {
    en: ["Hindustani music", "Karnatak University", "Dharwad pedha"],
    kn: ["ಹಿಂದೂಸ್ತಾನಿ ಸಂಗೀತ", "ಕರ್ನಾಟಕ ವಿಶ್ವವಿದ್ಯಾಲಯ", "ಧಾರವಾಡ ಪೇಡಾ"],
  },
  "Uttara Kannada": {
    en: ["Gokarna coast", "Dandeli forests", "Unchalli Falls"],
    kn: ["ಗೋಕರ್ಣ ಕರಾವಳಿ", "ದಾಂಡೇಲಿ ಕಾಡುಗಳು", "ಉಂಚಳ್ಳಿ ಜಲಪಾತ"],
  },
  Haveri: {
    en: ["Byadgi chilli", "Kanaka Dasa's Bada", "Hangal temples"],
    kn: ["ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ", "ಕನಕದಾಸರ ಬಾಡ", "ಹಾನಗಲ್ ದೇವಾಲಯಗಳು"],
  },
  Chitradurga: {
    en: ["Seven-ringed fort", "Onake Obavva", "Chandravalli caves"],
    kn: ["ಏಳುಸುತ್ತಿನ ಕೋಟೆ", "ಒನಕೆ ಓಬವ್ವ", "ಚಂದ್ರವಳ್ಳಿ ಗುಹೆಗಳು"],
  },
  Davanagere: {
    en: ["Benne dose", "Historic textile trade", "Harihareshwara Temple"],
    kn: ["ಬೆಣ್ಣೆ ದೋಸೆ", "ಐತಿಹಾಸಿಕ ಜವಳಿ ವ್ಯಾಪಾರ", "ಹರಿಹರೇಶ್ವರ ದೇವಾಲಯ"],
  },
  Shivamogga: {
    en: ["Jog Falls", "Keladi and Ikkeri", "Agumbe rainforest"],
    kn: ["ಜೋಗ ಜಲಪಾತ", "ಕೆಳದಿ ಮತ್ತು ಇಕ್ಕೇರಿ", "ಆಗುಂಬೆ ಮಳೆಕಾಡು"],
  },
  Udupi: {
    en: ["Sri Krishna Matha", "Malpe and St Mary's Islands", "Yakshagana and cuisine"],
    kn: ["ಶ್ರೀ ಕೃಷ್ಣ ಮಠ", "ಮಲ್ಪೆ ಮತ್ತು ಸೈಂಟ್ ಮೇರೀಸ್ ದ್ವೀಪಗಳು", "ಯಕ್ಷಗಾನ ಮತ್ತು ಉಡುಪಿ ಅಡುಗೆ"],
  },
  Chikkamagaluru: {
    en: ["Mullayanagiri", "Baba Budangiri", "Coffee estates"],
    kn: ["ಮುಳ್ಳಯ್ಯನಗಿರಿ", "ಬಾಬಾ ಬುಡನ್‌ಗಿರಿ", "ಕಾಫಿ ತೋಟಗಳು"],
  },
  Chikkaballapura: {
    en: ["Nandi Hills", "Bhoga Nandeeshwara Temple", "Muddenahalli"],
    kn: ["ನಂದಿ ಬೆಟ್ಟ", "ಭೋಗ ನಂದೀಶ್ವರ ದೇವಾಲಯ", "ಮುದ್ದೇನಹಳ್ಳಿ"],
  },
  Hassan: {
    en: ["Belur", "Halebidu", "Shravanabelagola"],
    kn: ["ಬೇಲೂರು", "ಹಳೇಬೀಡು", "ಶ್ರವಣಬೆಳಗೊಳ"],
  },
  Kolar: {
    en: ["Kolaramma Temple", "Someshwara Temple", "Kolar Gold Fields"],
    kn: ["ಕೋಲಾರಮ್ಮ ದೇವಾಲಯ", "ಸೋಮೇಶ್ವರ ದೇವಾಲಯ", "ಕೋಲಾರ ಚಿನ್ನದ ಗಣಿ"],
  },
  "Bengaluru Rural": {
    en: ["Devanahalli Fort", "Doddaballapura weaving", "Ghati Subramanya"],
    kn: ["ದೇವನಹಳ್ಳಿ ಕೋಟೆ", "ದೊಡ್ಡಬಳ್ಳಾಪುರ ನೇಯ್ಗೆ", "ಘಾಟಿ ಸುಬ್ರಹ್ಮಣ್ಯ"],
  },
  "Dakshina Kannada": {
    en: ["Mangaluru coast", "Dharmasthala", "Yakshagana traditions"],
    kn: ["ಮಂಗಳೂರು ಕರಾವಳಿ", "ಧರ್ಮಸ್ಥಳ", "ಯಕ್ಷಗಾನ ಪರಂಪರೆ"],
  },
  "Bengaluru Urban": {
    en: ["Vidhana Soudha", "Lalbagh", "India's technology capital"],
    kn: ["ವಿಧಾನ ಸೌಧ", "ಲಾಲ್‌ಬಾಗ್", "ಭಾರತದ ತಂತ್ರಜ್ಞಾನ ರಾಜಧಾನಿ"],
  },
  Kodagu: {
    en: ["Talakaveri", "Madikeri Fort and Raja's Seat", "Coffee and Kodava culture"],
    kn: ["ತಲಕಾವೇರಿ", "ಮಡಿಕೇರಿ ಕೋಟೆ ಮತ್ತು ರಾಜಾಸೀಟ್", "ಕಾಫಿ ಮತ್ತು ಕೊಡವ ಸಂಸ್ಕೃತಿ"],
  },
  Chamarajanagara: {
    en: ["Bandipur Tiger Reserve", "Biligiriranga Hills", "Male Mahadeshwara Hills"],
    kn: ["ಬಂಡೀಪುರ ಹುಲಿ ಸಂರಕ್ಷಿತ ಪ್ರದೇಶ", "ಬಿಳಿಗಿರಿರಂಗನ ಬೆಟ್ಟ", "ಮಲೆ ಮಹದೇಶ್ವರ ಬೆಟ್ಟ"],
  },
  Tumakuru: {
    en: ["Siddaganga Matha", "Devarayanadurga", "Madhugiri hill fort"],
    kn: ["ಸಿದ್ಧಗಂಗಾ ಮಠ", "ದೇವರಾಯನದುರ್ಗ", "ಮಧುಗಿರಿ ಬೆಟ್ಟದ ಕೋಟೆ"],
  },
  Ramanagara: {
    en: ["Ramadevarabetta", "Channapatna toys", "Mekedatu gorge"],
    kn: ["ರಾಮದೇವರ ಬೆಟ್ಟ", "ಚನ್ನಪಟ್ಟಣದ ಗೊಂಬೆಗಳು", "ಮೇಕೆದಾಟು ಕಣಿವೆ"],
  },
  Mandya: {
    en: ["KRS and Brindavan Gardens", "Srirangapatna", "Ranganathittu sanctuary"],
    kn: ["ಕೆಆರ್‌ಎಸ್ ಮತ್ತು ಬೃಂದಾವನ ಉದ್ಯಾನ", "ಶ್ರೀರಂಗಪಟ್ಟಣ", "ರಂಗನತಿಟ್ಟು ಪಕ್ಷಿಧಾಮ"],
  },
  Mysuru: {
    en: ["Mysore Palace", "Chamundi Hills", "Mysuru Dasara"],
    kn: ["ಮೈಸೂರು ಅರಮನೆ", "ಚಾಮುಂಡಿ ಬೆಟ್ಟ", "ಮೈಸೂರು ದಸರಾ"],
  },
  Vijayapura: {
    en: ["Gol Gumbaz", "Ibrahim Rauza", "Adil Shahi architecture"],
    kn: ["ಗೋಲ ಗುಮ್ಮಟ", "ಇಬ್ರಾಹಿಂ ರೌಜಾ", "ಆದಿಲ್ ಶಾಹಿ ವಾಸ್ತುಶಿಲ್ಪ"],
  },
};

/** Quick lookup by GeoJSON district id. */
export const districtById = new Map(districts.map((d) => [d.id, d]));
