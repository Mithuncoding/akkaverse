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
  {
    id: "pattadakal",
    category: "Heritage",
    emoji: "🏛️",
    wiki: "Group of Monuments at Pattadakal",
    district: "Bagalkote",
    nameEn: "Pattadakal",
    nameKn: "ಪಟ್ಟದಕಲ್ಲು",
    locationEn: "Bagalkote district",
    locationKn: "ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ",
    descEn:
      "A ceremonial Chalukyan capital where northern and southern temple styles meet beside the Malaprabha river — now a UNESCO World Heritage Site.",
    descKn:
      "ಮಲಪ್ರಭಾ ನದಿಯ ತೀರದಲ್ಲಿ ಉತ್ತರ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ದೇವಾಲಯ ಶೈಲಿಗಳು ಒಂದಾಗುವ ಚಾಲುಕ್ಯರ ಪಟ್ಟಾಭಿಷೇಕ ರಾಜಧಾನಿ — ಇಂದು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ.",
    factsEn: [
      "UNESCO World Heritage Site since 1987",
      "Ten major temples from the 7th–8th centuries",
      "Virupaksha Temple commemorates a royal victory",
    ],
    factsKn: [
      "1987 ರಿಂದ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ",
      "7–8ನೇ ಶತಮಾನದ ಹತ್ತು ಪ್ರಮುಖ ದೇವಾಲಯಗಳು",
      "ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯವು ರಾಜ ವಿಜಯದ ಸ್ಮಾರಕ",
    ],
  },
  {
    id: "aihole",
    category: "Heritage",
    emoji: "🪷",
    wiki: "Durga temple, Aihole",
    district: "Bagalkote",
    nameEn: "Aihole",
    nameKn: "ಐಹೊಳೆ",
    locationEn: "Bagalkote district",
    locationKn: "ಬಾಗಲಕೋಟೆ ಜಿಲ್ಲೆ",
    descEn:
      "Often called a laboratory of Indian temple architecture, Aihole holds more than a hundred shrines where Chalukyan builders tested bold new forms.",
    descKn:
      "ಭಾರತೀಯ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪದ ಪ್ರಯೋಗಶಾಲೆ ಎಂದು ಕರೆಯಲ್ಪಡುವ ಐಹೊಳೆಯಲ್ಲಿ ಚಾಲುಕ್ಯ ಶಿಲ್ಪಿಗಳು ಹೊಸ ರೂಪಗಳನ್ನು ಪ್ರಯೋಗಿಸಿದ ನೂರಕ್ಕೂ ಹೆಚ್ಚು ದೇವಾಲಯಗಳಿವೆ.",
    factsEn: [
      "More than 120 stone and cave temples",
      "Durga Temple is famed for its apsidal plan",
      "The Meguti inscription records Chalukyan history",
    ],
    factsKn: [
      "120ಕ್ಕೂ ಹೆಚ್ಚು ಕಲ್ಲು ಮತ್ತು ಗುಹಾ ದೇವಾಲಯಗಳು",
      "ದುರ್ಗಾ ದೇವಾಲಯವು ಅರ್ಧವೃತ್ತಾಕಾರದ ವಿನ್ಯಾಸಕ್ಕೆ ಪ್ರಸಿದ್ಧ",
      "ಮೇಗುತಿ ಶಾಸನವು ಚಾಲುಕ್ಯ ಇತಿಹಾಸ ದಾಖಲಿಸುತ್ತದೆ",
    ],
  },
  {
    id: "chitradurga-fort",
    category: "Heritage",
    emoji: "🏯",
    wiki: "Chitradurga",
    district: "Chitradurga",
    nameEn: "Chitradurga Fort",
    nameKn: "ಚಿತ್ರದುರ್ಗ ಕೋಟೆ",
    locationEn: "Chitradurga district",
    locationKn: "ಚಿತ್ರದುರ್ಗ ಜಿಲ್ಲೆ",
    descEn:
      "Seven rings of stone walls climb a boulder-strewn hill, carrying the remembered courage of Onake Obavva and centuries of Nayaka strategy.",
    descKn:
      "ಬಂಡೆಗಳಿಂದ ಕೂಡಿದ ಬೆಟ್ಟದ ಮೇಲೆ ಏಳು ಸುತ್ತಿನ ಕಲ್ಲಿನ ಗೋಡೆಗಳು ಏರುತ್ತವೆ; ಒನಕೆ ಓಬವ್ವನ ಧೈರ್ಯ ಮತ್ತು ನಾಯಕ ಅರಸರ ಯುದ್ಧತಂತ್ರವನ್ನು ಸ್ಮರಿಸುತ್ತವೆ.",
    factsEn: [
      "Known as Yelu Suttina Kote — the fort of seven circles",
      "Onake Obavva defended a secret passage",
      "Built and expanded between the 10th and 18th centuries",
    ],
    factsKn: [
      "ಏಳು ಸುತ್ತಿನ ಕೋಟೆ ಎಂದು ಪ್ರಸಿದ್ಧ",
      "ಒನಕೆ ಓಬವ್ವ ರಹಸ್ಯ ಕಿಂಡಿಯನ್ನು ರಕ್ಷಿಸಿದರು",
      "10ರಿಂದ 18ನೇ ಶತಮಾನದವರೆಗೆ ನಿರ್ಮಿಸಿ ವಿಸ್ತರಿಸಲಾಗಿದೆ",
    ],
  },
  {
    id: "udupi-krishna",
    category: "Temple",
    emoji: "🛕",
    wiki: "Udupi",
    district: "Udupi",
    nameEn: "Udupi Sri Krishna Matha",
    nameKn: "ಉಡುಪಿ ಶ್ರೀಕೃಷ್ಣ ಮಠ",
    locationEn: "Udupi",
    locationKn: "ಉಡುಪಿ",
    descEn:
      "A living centre of Dvaita philosophy founded by Madhvacharya, where Krishna is viewed through the nine-holed Kanakana Kindi and eight mathas share worship.",
    descKn:
      "ಮಧ್ವಾಚಾರ್ಯರು ಸ್ಥಾಪಿಸಿದ ದ್ವೈತ ತತ್ತ್ವದ ಜೀವಂತ ಕೇಂದ್ರ; ಕನಕನ ಕಿಂಡಿಯ ಒಂಬತ್ತು ರಂಧ್ರಗಳ ಮೂಲಕ ಕೃಷ್ಣನ ದರ್ಶನ ಮತ್ತು ಅಷ್ಟಮಠಗಳ ಪರ್ಯಾಯ ಪೂಜೆ ಇಲ್ಲಿನ ವೈಶಿಷ್ಟ್ಯ.",
    factsEn: [
      "Founded by Madhvacharya in the 13th century",
      "Paryaya transfers worship every two years",
      "Kanakana Kindi remembers the poet-saint Kanaka Dasa",
    ],
    factsKn: [
      "13ನೇ ಶತಮಾನದಲ್ಲಿ ಮಧ್ವಾಚಾರ್ಯರಿಂದ ಸ್ಥಾಪನೆ",
      "ಪ್ರತಿ ಎರಡು ವರ್ಷಕ್ಕೊಮ್ಮೆ ಪರ್ಯಾಯ ಪೂಜೆ ಬದಲಾಗುತ್ತದೆ",
      "ಕನಕನ ಕಿಂಡಿ ಸಂತಕವಿ ಕನಕದಾಸರನ್ನು ಸ್ಮರಿಸುತ್ತದೆ",
    ],
  },
  {
    id: "murudeshwar",
    category: "Temple",
    emoji: "🔱",
    wiki: "Murdeshwar",
    district: "Uttara Kannada",
    nameEn: "Murudeshwar",
    nameKn: "ಮುರುಡೇಶ್ವರ",
    locationEn: "Uttara Kannada coast",
    locationKn: "ಉತ್ತರ ಕನ್ನಡ ಕರಾವಳಿ",
    descEn:
      "A towering Shiva statue faces the Arabian Sea from Kanduka Hill, joining a sacred Atmalinga legend with dramatic coastal scenery.",
    descKn:
      "ಕಂದುಕ ಬೆಟ್ಟದಿಂದ ಅರಬ್ಬಿ ಸಮುದ್ರದತ್ತ ಮುಖಮಾಡಿರುವ ಬೃಹತ್ ಶಿವನ ಪ್ರತಿಮೆ, ಪವಿತ್ರ ಆತ್ಮಲಿಂಗದ ಪುರಾಣವನ್ನು ಅದ್ಭುತ ಕರಾವಳಿ ದೃಶ್ಯದೊಂದಿಗೆ ಜೋಡಿಸುತ್ತದೆ.",
    factsEn: [
      "The Shiva statue rises about 37 metres",
      "A 20-storey gopura overlooks the coast",
      "Nearby Netrani Island is known for diving",
    ],
    factsKn: [
      "ಶಿವನ ಪ್ರತಿಮೆ ಸುಮಾರು 37 ಮೀಟರ್ ಎತ್ತರ",
      "20 ಮಹಡಿಗಳ ಗೋಪುರದಿಂದ ಕರಾವಳಿ ನೋಟ",
      "ಸಮೀಪದ ನೇತ್ರಾಣಿ ದ್ವೀಪ ಡೈವಿಂಗ್‌ಗೆ ಪ್ರಸಿದ್ಧ",
    ],
  },
  {
    id: "bandipur",
    category: "Nature",
    emoji: "🐘",
    wiki: "Bandipur National Park",
    district: "Chamarajanagar",
    nameEn: "Bandipur National Park",
    nameKn: "ಬಂಡೀಪುರ ರಾಷ್ಟ್ರೀಯ ಉದ್ಯಾನ",
    locationEn: "Chamarajanagar district",
    locationKn: "ಚಾಮರಾಜನಗರ ಜಿಲ್ಲೆ",
    descEn:
      "Dry deciduous forest in the Nilgiri Biosphere Reserve, protecting elephants, tigers, gaur, and a vital wildlife corridor across southern India.",
    descKn:
      "ನೀಲಗಿರಿ ಜೀವಗೋಳ ಮೀಸಲು ಪ್ರದೇಶದ ಒಣ ಎಲೆಉದುರುವ ಕಾಡು; ಆನೆ, ಹುಲಿ, ಕಾಡೆಮ್ಮೆ ಮತ್ತು ದಕ್ಷಿಣ ಭಾರತದ ಪ್ರಮುಖ ವನ್ಯಜೀವಿ ಮಾರ್ಗವನ್ನು ರಕ್ಷಿಸುತ್ತದೆ.",
    factsEn: [
      "Part of the Nilgiri Biosphere Reserve",
      "A major Project Tiger reserve",
      "Connects habitats across Karnataka, Kerala, and Tamil Nadu",
    ],
    factsKn: [
      "ನೀಲಗಿರಿ ಜೀವಗೋಳ ಮೀಸಲು ಪ್ರದೇಶದ ಭಾಗ",
      "ಪ್ರಮುಖ ಪ್ರಾಜೆಕ್ಟ್ ಟೈಗರ್ ಅಭಯಾರಣ್ಯ",
      "ಕರ್ನಾಟಕ, ಕೇರಳ ಮತ್ತು ತಮಿಳುನಾಡಿನ ಆವಾಸಗಳನ್ನು ಜೋಡಿಸುತ್ತದೆ",
    ],
  },
  {
    id: "bidar-fort",
    category: "Heritage",
    emoji: "🏰",
    wiki: "Bidar Fort",
    district: "Bidar",
    nameEn: "Bidar Fort",
    nameKn: "ಬೀದರ್ ಕೋಟೆ",
    locationEn: "Bidar",
    locationKn: "ಬೀದರ್",
    descEn:
      "The red-laterite citadel of the Bahmani sultans, filled with Persianate palaces, ingenious water channels, and the layered culture of the Deccan.",
    descKn:
      "ಬಹಮನಿ ಸುಲ್ತಾನರ ಕೆಂಪು ಜಂಬಿಟ್ಟಿಗೆ ಕೋಟೆ; ಪರ್ಷಿಯನ್ ಶೈಲಿಯ ಅರಮನೆಗಳು, ಚತುರ ನೀರಿನ ಕಾಲುವೆಗಳು ಮತ್ತು ದಖ್ಖನ್‌ನ ಬಹುಪದರ ಸಂಸ್ಕೃತಿಯನ್ನು ಹೊತ್ತಿದೆ.",
    factsEn: [
      "Rebuilt as the Bahmani capital in 1427",
      "Its walls contain more than thirty monuments",
      "The nearby madrasa of Mahmud Gawan is a Deccan landmark",
    ],
    factsKn: [
      "1427ರಲ್ಲಿ ಬಹಮನಿ ರಾಜಧಾನಿಯಾಗಿ ಮರುನಿರ್ಮಾಣ",
      "ಗೋಡೆಗಳೊಳಗೆ ಮೂವತ್ತಕ್ಕೂ ಹೆಚ್ಚು ಸ್ಮಾರಕಗಳು",
      "ಸಮೀಪದ ಮಹಮೂದ್ ಗವಾನ್ ಮದರಸಾ ದಖ್ಖನ್‌ನ ಹೆಗ್ಗುರುತು",
    ],
  },
  {
    id: "dandeli",
    category: "Nature",
    emoji: "🛶",
    wiki: "Dandeli",
    district: "Uttara Kannada",
    nameEn: "Dandeli",
    nameKn: "ದಾಂಡೇಲಿ",
    locationEn: "Uttara Kannada district",
    locationKn: "ಉತ್ತರ ಕನ್ನಡ ಜಿಲ್ಲೆ",
    descEn:
      "Dense Western Ghats forest around the Kali river, known for hornbills, rafting, limestone caves, and community life shaped by the woods.",
    descKn:
      "ಕಾಳಿ ನದಿಯ ಸುತ್ತಲಿನ ದಟ್ಟ ಪಶ್ಚಿಮ ಘಟ್ಟದ ಕಾಡು; ಹಾರ್ನ್‌ಬಿಲ್ ಹಕ್ಕಿಗಳು, ರಾಫ್ಟಿಂಗ್, ಸುಣ್ಣದ ಕಲ್ಲಿನ ಗುಹೆಗಳು ಮತ್ತು ಅರಣ್ಯಾಧಾರಿತ ಸಮುದಾಯ ಜೀವನಕ್ಕೆ ಪ್ರಸಿದ್ಧ.",
    factsEn: [
      "White-water rafting runs on the Kali river",
      "An important habitat for great hornbills",
      "Syntheri Rocks reveal dramatic limestone formations",
    ],
    factsKn: [
      "ಕಾಳಿ ನದಿಯಲ್ಲಿ ವೈಟ್-ವಾಟರ್ ರಾಫ್ಟಿಂಗ್",
      "ದೊಡ್ಡ ಹಾರ್ನ್‌ಬಿಲ್ ಹಕ್ಕಿಗಳ ಪ್ರಮುಖ ಆವಾಸ",
      "ಸಿಂಥೇರಿ ಬಂಡೆಗಳು ಅದ್ಭುತ ಸುಣ್ಣದಕಲ್ಲಿನ ರಚನೆ ತೋರಿಸುತ್ತವೆ",
    ],
  },
];
