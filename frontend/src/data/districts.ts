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
    tagEn: "The mighty 'stone fortress' of seven hills.",
    tagKn: "ಏಳು ಬೆಟ್ಟಗಳ ಬೃಹತ್ 'ಕಲ್ಲಿನ ಕೋಟೆ'.",
    emoji: "🏯",
  },
  {
    id: "Davanagere",
    nameEn: "Davanagere",
    nameKn: "ದಾವಣಗೆರೆ",
    wiki: "Davanagere",
    tagEn: "'Manchester of Karnataka' and home of benne dosa.",
    tagKn: "'ಕರ್ನಾಟಕದ ಮ್ಯಾಂಚೆಸ್ಟರ್' ಮತ್ತು ಬೆಣ್ಣೆ ದೋಸೆಯ ನೆಲೆ.",
    emoji: "🥞",
  },
  {
    id: "Shivamogga",
    nameEn: "Shivamogga",
    nameKn: "ಶಿವಮೊಗ್ಗ",
    wiki: "Shivamogga",
    tagEn: "'Gateway to the Malnad' and Jog Falls.",
    tagKn: "'ಮಲೆನಾಡಿನ ಹೆಬ್ಬಾಗಿಲು' ಮತ್ತು ಜೋಗ ಜಲಪಾತ.",
    emoji: "🌊",
  },
  {
    id: "Udupi",
    nameEn: "Udupi",
    nameKn: "ಉಡುಪಿ",
    wiki: "Udupi",
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
    tagEn: "City of palaces and the world-famous Dasara.",
    tagKn: "ಅರಮನೆಗಳ ನಗರಿ ಮತ್ತು ವಿಶ್ವಪ್ರಸಿದ್ಧ ದಸರಾ.",
    emoji: "🏰",
  },
  {
    id: "Vijayapura",
    nameEn: "Vijayapura",
    nameKn: "ವಿಜಯಪುರ",
    wiki: "Vijayapura, Karnataka",
    tagEn: "Home of the Gol Gumbaz, the great whispering dome.",
    tagKn: "ಗೋಲ ಗುಮ್ಮಟದ ನೆಲೆ, ಮಹಾನ್ ಪಿಸುಗುಟ್ಟುವ ಗುಮ್ಮಟ.",
    emoji: "🕌",
  },
];

/** Quick lookup by GeoJSON district id. */
export const districtById = new Map(districts.map((d) => [d.id, d]));
