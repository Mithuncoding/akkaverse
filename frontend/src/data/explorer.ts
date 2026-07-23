/**
 * Karnataka Explorer — curated places, monuments, cities, nature & cuisine.
 *
 * Bilingual (English + Kannada) so the same dataset powers both locales.
 * Categories align with the i18n keys: Temple, City, Heritage, Nature, Food.
 */

export type ExploreCategory =
  | "Temple"
  | "City"
  | "Heritage"
  | "Nature"
  | "Food";

export const EXPLORE_CATEGORIES: ExploreCategory[] = [
  "Temple",
  "City",
  "Heritage",
  "Nature",
  "Food",
];

export type ExploreItem = {
  id: string;
  category: ExploreCategory;
  emoji: string;
  nameEn: string;
  nameKn: string;
  /** Short location / region label. */
  locationEn: string;
  locationKn: string;
  descEn: string;
  descKn: string;
  factsEn: string[];
  factsKn: string[];
  /** Wikipedia article title used to cache a lead photo (scripts/cache-places.mjs). */
  wiki: string;
  /** District id (matches data/districts.ts) for cross-linking, if place-bound. */
  district?: string;
};

export const exploreItems: ExploreItem[] = [
  {
    id: "hampi",
    category: "Heritage",
    emoji: "🏛️",
    wiki: "Hampi",
    district: "Ballari",
    nameEn: "Hampi",
    nameKn: "ಹಂಪಿ",
    locationEn: "Vijayanagara district",
    locationKn: "ವಿಜಯನಗರ ಜಿಲ್ಲೆ",
    descEn:
      "The breathtaking ruins of the Vijayanagara Empire's capital — a UNESCO World Heritage Site set among giant boulders and the Tungabhadra river.",
    descKn:
      "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯ ಅದ್ಭುತ ಅವಶೇಷಗಳು — ಬೃಹತ್ ಬಂಡೆಗಳು ಮತ್ತು ತುಂಗಭದ್ರಾ ನದಿಯ ನಡುವೆ ಇರುವ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ.",
    factsEn: [
      "UNESCO World Heritage Site since 1986",
      "Famous for the Stone Chariot at Vittala Temple",
      "Once one of the richest cities in the world",
    ],
    factsKn: [
      "1986 ರಿಂದ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ",
      "ವಿಠ್ಠಲ ದೇವಾಲಯದ ಕಲ್ಲಿನ ರಥಕ್ಕೆ ಪ್ರಸಿದ್ಧ",
      "ಒಂದು ಕಾಲದಲ್ಲಿ ವಿಶ್ವದ ಶ್ರೀಮಂತ ನಗರಗಳಲ್ಲಿ ಒಂದು",
    ],
  },
  {
    id: "mysore-palace",
    category: "Heritage",
    emoji: "🏰",
    wiki: "Mysore Palace",
    district: "Mysuru",
    nameEn: "Mysore Palace",
    nameKn: "ಮೈಸೂರು ಅರಮನೆ",
    locationEn: "Mysuru",
    locationKn: "ಮೈಸೂರು",
    descEn:
      "The dazzling seat of the Wodeyar dynasty, illuminated by nearly 100,000 bulbs and the centrepiece of the world-famous Mysore Dasara.",
    descKn:
      "ಒಡೆಯರ್ ರಾಜವಂಶದ ಕಣ್ಣು ಕೋರೈಸುವ ಅರಮನೆ, ಸುಮಾರು 1,00,000 ಬಲ್ಬ್‌ಗಳಿಂದ ಬೆಳಗುತ್ತದೆ ಮತ್ತು ವಿಶ್ವಪ್ರಸಿದ್ಧ ಮೈಸೂರು ದಸರಾದ ಕೇಂದ್ರಬಿಂದು.",
    factsEn: [
      "Lit by ~97,000 bulbs on Sundays & festivals",
      "Indo-Saracenic architectural masterpiece",
      "Heart of the 10-day Mysore Dasara",
    ],
    factsKn: [
      "ಭಾನುವಾರ ಮತ್ತು ಹಬ್ಬಗಳಲ್ಲಿ ~97,000 ಬಲ್ಬ್‌ಗಳಿಂದ ಬೆಳಗುತ್ತದೆ",
      "ಇಂಡೋ-ಸಾರ್ಸೆನಿಕ್ ವಾಸ್ತುಶಿಲ್ಪದ ಮೇರುಕೃತಿ",
      "10 ದಿನಗಳ ಮೈಸೂರು ದಸರಾದ ಹೃದಯ",
    ],
  },
  {
    id: "belur-halebidu",
    category: "Temple",
    emoji: "🛕",
    wiki: "Chennakeshava Temple, Belur",
    district: "Hassan",
    nameEn: "Belur & Halebidu",
    nameKn: "ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡು",
    locationEn: "Hassan district",
    locationKn: "ಹಾಸನ ಜಿಲ್ಲೆ",
    descEn:
      "The crowning glory of Hoysala art — soapstone temples covered in astonishingly intricate carvings of gods, dancers, and stories.",
    descKn:
      "ಹೊಯ್ಸಳ ಕಲೆಯ ಶ್ರೇಷ್ಠ ಸಾಧನೆ — ದೇವರು, ನರ್ತಕಿಯರು ಮತ್ತು ಕಥೆಗಳ ಅತ್ಯಂತ ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗಳಿಂದ ಕೂಡಿದ ಬಳಪದ ಕಲ್ಲಿನ ದೇವಾಲಯಗಳು.",
    factsEn: [
      "Built by the Hoysalas in the 12th century",
      "Chennakeshava Temple took 103 years to complete",
      "On UNESCO's World Heritage list (2023)",
    ],
    factsKn: [
      "12ನೇ ಶತಮಾನದಲ್ಲಿ ಹೊಯ್ಸಳರಿಂದ ನಿರ್ಮಿತ",
      "ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ಪೂರ್ಣಗೊಳ್ಳಲು 103 ವರ್ಷ ಬೇಕಾಯಿತು",
      "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ಪಟ್ಟಿಯಲ್ಲಿ (2023)",
    ],
  },
  {
    id: "gomateshwara",
    category: "Temple",
    emoji: "🧘",
    wiki: "Gommateshwara statue",
    district: "Hassan",
    nameEn: "Gomateshwara, Shravanabelagola",
    nameKn: "ಗೊಮ್ಮಟೇಶ್ವರ, ಶ್ರವಣಬೆಳಗೊಳ",
    locationEn: "Hassan district",
    locationKn: "ಹಾಸನ ಜಿಲ್ಲೆ",
    descEn:
      "A 57-foot monolithic statue of Bahubali, one of the tallest free-standing statues in the world and a major Jain pilgrimage site.",
    descKn:
      "ಬಾಹುಬಲಿಯ 57 ಅಡಿ ಎತ್ತರದ ಏಕಶಿಲಾ ವಿಗ್ರಹ, ವಿಶ್ವದ ಅತಿ ಎತ್ತರದ ಸ್ವತಂತ್ರ ವಿಗ್ರಹಗಳಲ್ಲಿ ಒಂದು ಮತ್ತು ಪ್ರಮುಖ ಜೈನ ಯಾತ್ರಾ ಸ್ಥಳ.",
    factsEn: [
      "Carved from a single granite block ~983 CE",
      "Mahamastakabhisheka held every 12 years",
      "57 feet (17 m) tall",
    ],
    factsKn: [
      "~983 ರಲ್ಲಿ ಒಂದೇ ಗ್ರಾನೈಟ್ ಬಂಡೆಯಿಂದ ಕೆತ್ತಲಾಗಿದೆ",
      "ಪ್ರತಿ 12 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಮಹಾಮಸ್ತಕಾಭಿಷೇಕ",
      "57 ಅಡಿ (17 ಮೀ) ಎತ್ತರ",
    ],
  },
  {
    id: "bengaluru",
    category: "City",
    emoji: "🌆",
    wiki: "Bangalore",
    district: "Bengaluru Urban",
    nameEn: "Bengaluru",
    nameKn: "ಬೆಂಗಳೂರು",
    locationEn: "State capital",
    locationKn: "ರಾಜ್ಯ ರಾಜಧಾನಿ",
    descEn:
      "The Garden City and India's tech capital — a blend of heritage gardens, vibrant culture, and a global innovation hub.",
    descKn:
      "ಉದ್ಯಾನ ನಗರಿ ಮತ್ತು ಭಾರತದ ತಂತ್ರಜ್ಞಾನ ರಾಜಧಾನಿ — ಪರಂಪರೆಯ ಉದ್ಯಾನಗಳು, ರೋಮಾಂಚಕ ಸಂಸ್ಕೃತಿ ಮತ್ತು ಜಾಗತಿಕ ನಾವೀನ್ಯತೆಯ ಕೇಂದ್ರದ ಮಿಶ್ರಣ.",
    factsEn: [
      "Founded by Kempe Gowda in 1537",
      "Home to Lalbagh & Cubbon Park",
      "Known as the Silicon Valley of India",
    ],
    factsKn: [
      "1537 ರಲ್ಲಿ ಕೆಂಪೇಗೌಡರಿಂದ ಸ್ಥಾಪಿತ",
      "ಲಾಲ್‌ಬಾಗ್ ಮತ್ತು ಕಬ್ಬನ್ ಪಾರ್ಕ್‌ಗೆ ನೆಲೆ",
      "ಭಾರತದ ಸಿಲಿಕಾನ್ ವ್ಯಾಲಿ ಎಂದು ಖ್ಯಾತಿ",
    ],
  },
  {
    id: "jog-falls",
    category: "Nature",
    emoji: "🌊",
    wiki: "Jog Falls",
    district: "Shivamogga",
    nameEn: "Jog Falls",
    nameKn: "ಜೋಗ ಜಲಪಾತ",
    locationEn: "Shivamogga district",
    locationKn: "ಶಿವಮೊಗ್ಗ ಜಿಲ್ಲೆ",
    descEn:
      "One of India's tallest plunge waterfalls, where the Sharavathi river drops 253 metres in four roaring cascades.",
    descKn:
      "ಭಾರತದ ಅತಿ ಎತ್ತರದ ಜಲಪಾತಗಳಲ್ಲಿ ಒಂದು, ಇಲ್ಲಿ ಶರಾವತಿ ನದಿ ನಾಲ್ಕು ಆರ್ಭಟಿಸುವ ಧಾರೆಗಳಲ್ಲಿ 253 ಮೀಟರ್ ಬೀಳುತ್ತದೆ.",
    factsEn: [
      "Sharavathi river drops 253 m (830 ft)",
      "Four falls: Raja, Rani, Rover, Rocket",
      "Spectacular during the monsoon",
    ],
    factsKn: [
      "ಶರಾವತಿ ನದಿ 253 ಮೀ (830 ಅಡಿ) ಬೀಳುತ್ತದೆ",
      "ನಾಲ್ಕು ಧಾರೆಗಳು: ರಾಜ, ರಾಣಿ, ರೋವರ್, ರಾಕೆಟ್",
      "ಮಳೆಗಾಲದಲ್ಲಿ ಅದ್ಭುತ ದೃಶ್ಯ",
    ],
  },
  {
    id: "coorg",
    category: "Nature",
    emoji: "⛰️",
    wiki: "Madikeri",
    district: "Kodagu",
    nameEn: "Coorg (Kodagu)",
    nameKn: "ಕೊಡಗು",
    locationEn: "Western Ghats",
    locationKn: "ಪಶ್ಚಿಮ ಘಟ್ಟಗಳು",
    descEn:
      "The 'Scotland of India' — misty hills, coffee plantations, and the proud Kodava culture nestled in the Western Ghats.",
    descKn:
      "'ಭಾರತದ ಸ್ಕಾಟ್ಲೆಂಡ್' — ಮಂಜು ಮುಸುಕಿದ ಬೆಟ್ಟಗಳು, ಕಾಫಿ ತೋಟಗಳು ಮತ್ತು ಪಶ್ಚಿಮ ಘಟ್ಟಗಳಲ್ಲಿ ನೆಲೆಸಿರುವ ಹೆಮ್ಮೆಯ ಕೊಡವ ಸಂಸ್ಕೃತಿ.",
    factsEn: [
      "India's largest coffee-producing region",
      "Source of the river Kaveri (Talakaveri)",
      "Home to the martial Kodava community",
    ],
    factsKn: [
      "ಭಾರತದ ಅತಿ ದೊಡ್ಡ ಕಾಫಿ ಉತ್ಪಾದನಾ ಪ್ರದೇಶ",
      "ಕಾವೇರಿ ನದಿಯ ಉಗಮ (ತಲಕಾವೇರಿ)",
      "ಶೌರ್ಯದ ಕೊಡವ ಸಮುದಾಯದ ನೆಲೆ",
    ],
  },
  {
    id: "mysore-masala-dosa",
    category: "Food",
    emoji: "🥘",
    wiki: "Masala dosa",
    nameEn: "Mysore Masala Dosa",
    nameKn: "ಮೈಸೂರು ಮಸಾಲ ದೋಸೆ",
    locationEn: "Statewide favourite",
    locationKn: "ರಾಜ್ಯದಾದ್ಯಂತ ನೆಚ್ಚಿನ ತಿನಿಸು",
    descEn:
      "A crisp golden dosa spread with spicy red chutney and a soft potato filling — a beloved icon of Karnataka's cuisine.",
    descKn:
      "ಖಾರವಾದ ಕೆಂಪು ಚಟ್ನಿ ಮತ್ತು ಮೃದುವಾದ ಆಲೂಗಡ್ಡೆ ಪಲ್ಯದಿಂದ ಕೂಡಿದ ಗರಿಗರಿಯಾದ ಚಿನ್ನದ ದೋಸೆ — ಕರ್ನಾಟಕದ ಆಹಾರದ ಪ್ರೀತಿಯ ಸಂಕೇತ.",
    factsEn: [
      "Distinctive red garlic-chilli chutney",
      "Best with coconut chutney & sambar",
      "Popularised in Bengaluru's iconic eateries",
    ],
    factsKn: [
      "ವಿಶಿಷ್ಟ ಕೆಂಪು ಬೆಳ್ಳುಳ್ಳಿ-ಮೆಣಸಿನ ಚಟ್ನಿ",
      "ತೆಂಗಿನ ಚಟ್ನಿ ಮತ್ತು ಸಾಂಬಾರ್‌ನೊಂದಿಗೆ ಉತ್ತಮ",
      "ಬೆಂಗಳೂರಿನ ಪ್ರಸಿದ್ಧ ಹೋಟೆಲ್‌ಗಳಲ್ಲಿ ಜನಪ್ರಿಯ",
    ],
  },
  {
    id: "bisi-bele-bath",
    category: "Food",
    emoji: "🍲",
    wiki: "Bisi bele bath",
    nameEn: "Bisi Bele Bath",
    nameKn: "ಬಿಸಿ ಬೇಳೆ ಬಾತ್",
    locationEn: "Classic Karnataka dish",
    locationKn: "ಕರ್ನಾಟಕದ ಶ್ರೇಷ್ಠ ಖಾದ್ಯ",
    descEn:
      "A hearty, aromatic rice-and-lentil dish cooked with a special spice blend — comfort food born in the Mysore royal kitchens.",
    descKn:
      "ವಿಶೇಷ ಮಸಾಲೆ ಮಿಶ್ರಣದೊಂದಿಗೆ ಬೇಯಿಸಿದ ಪರಿಮಳಯುಕ್ತ ಅಕ್ಕಿ-ಬೇಳೆ ಖಾದ್ಯ — ಮೈಸೂರು ಅರಮನೆಯ ಅಡುಗೆಮನೆಯಲ್ಲಿ ಹುಟ್ಟಿದ ಆತ್ಮೀಯ ಆಹಾರ.",
    factsEn: [
      "Name literally means 'hot lentil rice'",
      "Uses a unique roasted spice powder",
      "Traditionally served with ghee & boondi",
    ],
    factsKn: [
      "ಹೆಸರಿನ ಅರ್ಥ ಅಕ್ಷರಶಃ 'ಬಿಸಿ ಬೇಳೆ ಅನ್ನ'",
      "ವಿಶಿಷ್ಟ ಹುರಿದ ಮಸಾಲೆ ಪುಡಿ ಬಳಸುತ್ತದೆ",
      "ಸಾಂಪ್ರದಾಯಿಕವಾಗಿ ತುಪ್ಪ ಮತ್ತು ಬೂಂದಿಯೊಂದಿಗೆ ಬಡಿಸಲಾಗುತ್ತದೆ",
    ],
  },
  {
    id: "badami-caves",
    category: "Heritage",
    emoji: "🪨",
    wiki: "Badami cave temples",
    district: "Bagalkote",
    nameEn: "Badami Cave Temples",
    nameKn: "ಬಾದಾಮಿ ಗುಹಾ ದೇವಾಲಯಗಳು",
    locationEn: "Bagalkot district",
    locationKn: "ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ",
    descEn:
      "Rock-cut cave temples carved into red sandstone cliffs by the Badami Chalukyas — masterworks of early Indian temple architecture.",
    descKn:
      "ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಬಂಡೆಗಳಲ್ಲಿ ಕೆತ್ತಿದ ಗುಹಾ ದೇವಾಲಯಗಳು — ಆರಂಭಿಕ ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ಮೇರುಕೃತಿಗಳು.",
    factsEn: [
      "Four caves dedicated to Hindu & Jain faiths",
      "Carved in the 6th century CE",
      "Overlooks the scenic Agastya lake",
    ],
    factsKn: [
      "ಹಿಂದೂ ಮತ್ತು ಜೈನ ಧರ್ಮಗಳಿಗೆ ಮೀಸಲಾದ ನಾಲ್ಕು ಗುಹೆಗಳು",
      "6ನೇ ಶತಮಾನದಲ್ಲಿ ಕೆತ್ತಲಾಗಿದೆ",
      "ರಮಣೀಯ ಅಗಸ್ತ್ಯ ಸರೋವರವನ್ನು ಎದುರಿಸುತ್ತದೆ",
    ],
  },
  {
    id: "gokarna",
    category: "Nature",
    emoji: "🏖️",
    wiki: "Gokarna, Karnataka",
    district: "Uttara Kannada",
    nameEn: "Gokarna",
    nameKn: "ಗೋಕರ್ಣ",
    locationEn: "Uttara Kannada coast",
    locationKn: "ಉತ್ತರ ಕನ್ನಡ ಕರಾವಳಿ",
    descEn:
      "A serene temple town on the Arabian Sea, famous for the Mahabaleshwar temple and pristine crescent beaches.",
    descKn:
      "ಅರಬ್ಬಿ ಸಮುದ್ರದ ತೀರದಲ್ಲಿರುವ ಶಾಂತ ದೇವಾಲಯ ಪಟ್ಟಣ, ಮಹಾಬಲೇಶ್ವರ ದೇವಾಲಯ ಮತ್ತು ನಿರ್ಮಲ ಅರ್ಧಚಂದ್ರಾಕಾರದ ಕಡಲತೀರಗಳಿಗೆ ಪ್ರಸಿದ್ಧ.",
    factsEn: [
      "Sacred Atmalinga at Mahabaleshwar temple",
      "Famous for Om & Kudle beaches",
      "A blend of pilgrimage and seaside calm",
    ],
    factsKn: [
      "ಮಹಾಬಲೇಶ್ವರ ದೇವಾಲಯದಲ್ಲಿ ಪವಿತ್ರ ಆತ್ಮಲಿಂಗ",
      "ಓಂ ಮತ್ತು ಕುಡ್ಲೆ ಕಡಲತೀರಗಳಿಗೆ ಪ್ರಸಿದ್ಧ",
      "ಯಾತ್ರೆ ಮತ್ತು ಕಡಲ ಶಾಂತಿಯ ಮಿಶ್ರಣ",
    ],
  },
];
