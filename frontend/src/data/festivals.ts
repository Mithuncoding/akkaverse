/**
 * Karnataka festivals — the dataset behind the Festival Calendar.
 *
 * Bilingual (English + Kannada). `month` is the primary Gregorian month used to
 * group the calendar; `whenEn/whenKn` give the human range. `wiki`/`imageTitle`
 * drive a live Wikipedia photo (see lib/wiki.ts), and `district` links a
 * festival back to its place on the map.
 */

export type Festival = {
  id: string;
  nameEn: string;
  nameKn: string;
  emoji: string;
  /** Primary month (1–12) for calendar grouping. */
  month: number;
  whenEn: string;
  whenKn: string;
  /** District id (matches data/districts.ts) or "Statewide". */
  district: string;
  placeEn: string;
  placeKn: string;
  /** Wikipedia article for the live lead photo. */
  wiki: string;
  imageTitle?: string;
  descEn: string;
  descKn: string;
  highlightsEn: string[];
  highlightsKn: string[];
};

export const festivals: Festival[] = [
  {
    id: "dasara",
    nameEn: "Mysuru Dasara",
    nameKn: "ಮೈಸೂರು ದಸರಾ",
    emoji: "🐘",
    month: 10,
    whenEn: "September – October",
    whenKn: "ಸೆಪ್ಟೆಂಬರ್ – ಅಕ್ಟೋಬರ್",
    district: "Mysuru",
    placeEn: "Mysuru",
    placeKn: "ಮೈಸೂರು",
    wiki: "Mysore Dasara",
    imageTitle: "Mysore Palace",
    descEn:
      "Karnataka's grand 'Nadahabba' (state festival), celebrating the goddess Chamundeshwari's victory over the demon Mahishasura. The Mysore Palace is lit by nearly 100,000 bulbs for ten dazzling nights.",
    descKn:
      "ಕರ್ನಾಟಕದ ವೈಭವದ 'ನಾಡಹಬ್ಬ', ಮಹಿಷಾಸುರನ ಮೇಲೆ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿಯ ವಿಜಯವನ್ನು ಆಚರಿಸುತ್ತದೆ. ಹತ್ತು ರಾತ್ರಿಗಳ ಕಾಲ ಮೈಸೂರು ಅರಮನೆ ಸುಮಾರು 1,00,000 ಬಲ್ಬ್‌ಗಳಿಂದ ಬೆಳಗುತ್ತದೆ.",
    highlightsEn: [
      "Jamboo Savari — the golden howdah elephant procession",
      "Palace illuminated every evening for 10 days",
      "Torchlight parade and cultural performances",
    ],
    highlightsKn: [
      "ಜಂಬೂ ಸವಾರಿ — ಚಿನ್ನದ ಅಂಬಾರಿ ಆನೆ ಮೆರವಣಿಗೆ",
      "10 ದಿನಗಳ ಕಾಲ ಪ್ರತಿ ಸಂಜೆ ಅರಮನೆ ದೀಪಾಲಂಕಾರ",
      "ಪಂಜಿನ ಕವಾಯತು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಕಾರ್ಯಕ್ರಮಗಳು",
    ],
  },
  {
    id: "hampi-utsav",
    nameEn: "Hampi Utsava",
    nameKn: "ಹಂಪಿ ಉತ್ಸವ",
    emoji: "🏛️",
    month: 11,
    whenEn: "November",
    whenKn: "ನವೆಂಬರ್",
    district: "Ballari",
    placeEn: "Hampi, Vijayanagara",
    placeKn: "ಹಂಪಿ, ವಿಜಯನಗರ",
    wiki: "Hampi",
    descEn:
      "Also called Vijaya Utsava, this festival brings the ruins of the Vijayanagara Empire alive with music, dance and light against the iconic boulders and temples.",
    descKn:
      "ವಿಜಯ ಉತ್ಸವ ಎಂದೂ ಕರೆಯಲ್ಪಡುವ ಈ ಹಬ್ಬವು ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಅವಶೇಷಗಳನ್ನು ಸಂಗೀತ, ನೃತ್ಯ ಮತ್ತು ಬೆಳಕಿನಿಂದ ಜೀವಂತಗೊಳಿಸುತ್ತದೆ.",
    highlightsEn: [
      "Light-and-sound shows among the monuments",
      "Classical and folk performances",
      "Puppet shows, crafts and processions",
    ],
    highlightsKn: [
      "ಸ್ಮಾರಕಗಳ ನಡುವೆ ಬೆಳಕು-ಧ್ವನಿ ಪ್ರದರ್ಶನ",
      "ಶಾಸ್ತ್ರೀಯ ಮತ್ತು ಜಾನಪದ ಪ್ರದರ್ಶನಗಳು",
      "ಗೊಂಬೆಯಾಟ, ಕರಕುಶಲ ಮತ್ತು ಮೆರವಣಿಗೆಗಳು",
    ],
  },
  {
    id: "ugadi",
    nameEn: "Ugadi",
    nameKn: "ಯುಗಾದಿ",
    emoji: "🌿",
    month: 4,
    whenEn: "March – April",
    whenKn: "ಮಾರ್ಚ್ – ಏಪ್ರಿಲ್",
    district: "Statewide",
    placeEn: "Across Karnataka",
    placeKn: "ಕರ್ನಾಟಕದಾದ್ಯಂತ",
    wiki: "Ugadi",
    descEn:
      "The Kannada New Year, marking the start of a new lunar calendar. Families welcome the year with bevu-bella — a bite of neem and jaggery symbolising life's bitterness and sweetness.",
    descKn:
      "ಕನ್ನಡ ಹೊಸ ವರ್ಷ, ಹೊಸ ಚಾಂದ್ರಮಾನ ಪಂಚಾಂಗದ ಆರಂಭ. ಜೀವನದ ಕಹಿ ಮತ್ತು ಸಿಹಿಯ ಸಂಕೇತವಾಗಿ ಬೇವು-ಬೆಲ್ಲ ಸವಿಯುತ್ತಾರೆ.",
    highlightsEn: [
      "Bevu-bella (neem & jaggery) ritual",
      "Mango-leaf torans and rangoli at every door",
      "Panchanga Shravana — reading the year's almanac",
    ],
    highlightsKn: [
      "ಬೇವು-ಬೆಲ್ಲ ಸವಿಯುವ ಆಚರಣೆ",
      "ಮಾವಿನ ಎಲೆ ತೋರಣ ಮತ್ತು ರಂಗೋಲಿ",
      "ಪಂಚಾಂಗ ಶ್ರವಣ — ವರ್ಷದ ಭವಿಷ್ಯ ಕೇಳುವಿಕೆ",
    ],
  },
  {
    id: "sankranti",
    nameEn: "Makara Sankranti",
    nameKn: "ಮಕರ ಸಂಕ್ರಾಂತಿ",
    emoji: "🪁",
         month: 1,
    whenEn: "14 January",
    whenKn: "ಜನವರಿ 14",
    district: "Statewide",
    placeEn: "Across Karnataka",
    placeKn: "ಕರ್ನಾಟಕದಾದ್ಯಂತ",
    wiki: "Makar Sankranti",
    descEn:
      "The harvest festival of the sun's northward journey. Kannadigas exchange 'ellu-bella' (sesame and jaggery) with the words 'eat sweet, speak sweet'.",
    descKn:
      "ಸೂರ್ಯನ ಉತ್ತರಾಯಣದ ಸುಗ್ಗಿ ಹಬ್ಬ. ಕನ್ನಡಿಗರು 'ಎಳ್ಳು-ಬೆಲ್ಲ ತಿಂದು ಒಳ್ಳೆಯ ಮಾತಾಡಿ' ಎಂದು ಎಳ್ಳು-ಬೆಲ್ಲ ಹಂಚುತ್ತಾರೆ.",
    highlightsEn: [
      "Ellu-bella exchange among neighbours",
      "Decorated cattle and 'Kichchu Haayisuvudu'",
      "Kite flying and harvest feasts",
    ],
    highlightsKn: [
      "ನೆರೆಹೊರೆಯವರೊಂದಿಗೆ ಎಳ್ಳು-ಬೆಲ್ಲ ಹಂಚಿಕೆ",
      "ಅಲಂಕೃತ ರಾಸುಗಳು ಮತ್ತು 'ಕಿಚ್ಚು ಹಾಯಿಸುವುದು'",
      "ಗಾಳಿಪಟ ಮತ್ತು ಸುಗ್ಗಿಯ ಔತಣ",
    ],
  },
  {
    id: "karaga",
    nameEn: "Bengaluru Karaga",
    nameKn: "ಬೆಂಗಳೂರು ಕರಗ",
    emoji: "🏺",
    month: 4,
    whenEn: "March – April",
    whenKn: "ಮಾರ್ಚ್ – ಏಪ್ರಿಲ್",
    district: "Bengaluru Urban",
    placeEn: "Dharmaraya Temple, Bengaluru",
    placeKn: "ಧರ್ಮರಾಯ ದೇವಾಲಯ, ಬೆಂಗಳೂರು",
    wiki: "Bangalore Karaga",
    descEn:
      "One of the city's oldest festivals, where a priest carries a towering floral 'karaga' pot on his head through the old city overnight, honouring the goddess Draupadi.",
    descKn:
      "ನಗರದ ಅತ್ಯಂತ ಹಳೆಯ ಹಬ್ಬಗಳಲ್ಲಿ ಒಂದು; ಅರ್ಚಕರು ದ್ರೌಪದಿ ದೇವಿಯ ಗೌರವಾರ್ಥ ಹೂವಿನ ಎತ್ತರದ 'ಕರಗ'ವನ್ನು ತಲೆಯ ಮೇಲೆ ಹೊತ್ತು ಹಳೆಯ ನಗರದಲ್ಲಿ ರಾತ್ರಿಯಿಡೀ ಸಾಗುತ್ತಾರೆ.",
    highlightsEn: [
      "Overnight floral karaga procession",
      "Veerakumaras with drawn swords",
      "Centuries-old Thigala community tradition",
    ],
    highlightsKn: [
      "ರಾತ್ರಿಯಿಡೀ ಹೂವಿನ ಕರಗ ಮೆರವಣಿಗೆ",
      "ಖಡ್ಗ ಹಿಡಿದ ವೀರಕುಮಾರರು",
      "ಶತಮಾನಗಳ ತಿಗಳ ಸಮುದಾಯದ ಸಂಪ್ರದಾಯ",
    ],
  },
  {
    id: "kambala",
    nameEn: "Kambala",
    nameKn: "ಕಂಬಳ",
    emoji: "🐃",
    month: 12,
    whenEn: "November – March",
    whenKn: "ನವೆಂಬರ್ – ಮಾರ್ಚ್",
    district: "Dakshina Kannada",
    placeEn: "Coastal Karnataka",
    placeKn: "ಕರಾವಳಿ ಕರ್ನಾಟಕ",
    wiki: "Kambala",
    descEn:
      "A traditional buffalo race run through slushy paddy fields, where jockeys sprint with pairs of buffaloes — a thrilling rural sport of the coastal districts.",
    descKn:
      "ಕೆಸರು ತುಂಬಿದ ಗದ್ದೆಗಳಲ್ಲಿ ನಡೆಯುವ ಸಾಂಪ್ರದಾಯಿಕ ಕೋಣಗಳ ಓಟ; ಓಟಗಾರರು ಜೋಡಿ ಕೋಣಗಳೊಂದಿಗೆ ವೇಗವಾಗಿ ಓಡುತ್ತಾರೆ — ಕರಾವಳಿ ಜಿಲ್ಲೆಗಳ ರೋಮಾಂಚಕ ಗ್ರಾಮೀಣ ಕ್ರೀಡೆ.",
    highlightsEn: [
      "Buffalo pairs racing through paddy slush",
      "Cheering crowds across coastal villages",
      "A living tradition, now a recognised sport",
    ],
    highlightsKn: [
      "ಗದ್ದೆಯ ಕೆಸರಿನಲ್ಲಿ ಕೋಣಗಳ ಓಟ",
      "ಕರಾವಳಿ ಹಳ್ಳಿಗಳಲ್ಲಿ ಹುರಿದುಂಬಿಸುವ ಜನಸಂದಣಿ",
      "ಜೀವಂತ ಸಂಪ್ರದಾಯ, ಈಗ ಮಾನ್ಯತೆ ಪಡೆದ ಕ್ರೀಡೆ",
    ],
  },
  {
    id: "pattadakal",
    nameEn: "Pattadakal Dance Festival",
    nameKn: "ಪಟ್ಟದಕಲ್ ನೃತ್ಯೋತ್ಸವ",
    emoji: "💃",
    month: 1,
    whenEn: "January",
    whenKn: "ಜನವರಿ",
    district: "Bagalkote",
    placeEn: "Pattadakal, Bagalkote",
    placeKn: "ಪಟ್ಟದಕಲ್, ಬಾಗಲಕೋಟೆ",
    wiki: "Pattadakal",
    descEn:
      "Classical dancers perform against the UNESCO World Heritage Chalukyan temples, a stunning celebration of art where stone and movement meet.",
    descKn:
      "ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆಯ ಚಾಲುಕ್ಯ ದೇವಾಲಯಗಳ ಹಿನ್ನೆಲೆಯಲ್ಲಿ ಶಾಸ್ತ್ರೀಯ ನೃತ್ಯ ಪ್ರದರ್ಶನ — ಕಲ್ಲು ಮತ್ತು ಚಲನೆ ಸಂಧಿಸುವ ಅದ್ಭುತ ಕಲಾ ಆಚರಣೆ.",
    highlightsEn: [
      "Bharatanatyam, Kuchipudi & more",
      "Performances at heritage temples",
      "Art, craft and food stalls",
    ],
    highlightsKn: [
      "ಭರತನಾಟ್ಯ, ಕೂಚಿಪುಡಿ ಮತ್ತು ಇನ್ನಷ್ಟು",
      "ಪರಂಪರೆ ದೇವಾಲಯಗಳಲ್ಲಿ ಪ್ರದರ್ಶನ",
      "ಕಲೆ, ಕರಕುಶಲ ಮತ್ತು ಆಹಾರ ಮಳಿಗೆಗಳು",
    ],
  },
  {
    id: "vairamudi",
    nameEn: "Vairamudi Brahmotsava",
    nameKn: "ವೈರಮುಡಿ ಬ್ರಹ್ಮೋತ್ಸವ",
    emoji: "👑",
    month: 3,
    whenEn: "March – April",
    whenKn: "ಮಾರ್ಚ್ – ಏಪ್ರಿಲ್",
    district: "Mandya",
    placeEn: "Melukote, Mandya",
    placeKn: "ಮೇಲುಕೋಟೆ, ಮಂಡ್ಯ",
    wiki: "Melukote",
    descEn:
      "At the hill temple of Melukote, the deity is adorned with the priceless diamond-studded Vairamudi crown — kept under guard and never measured — drawing lakhs of devotees.",
    descKn:
      "ಮೇಲುಕೋಟೆಯ ಬೆಟ್ಟದ ದೇವಾಲಯದಲ್ಲಿ ದೇವರಿಗೆ ಅಮೂಲ್ಯ ವಜ್ರಖಚಿತ ವೈರಮುಡಿ ಕಿರೀಟವನ್ನು ತೊಡಿಸಲಾಗುತ್ತದೆ — ಲಕ್ಷಾಂತರ ಭಕ್ತರನ್ನು ಸೆಳೆಯುತ್ತದೆ.",
    highlightsEn: [
      "The legendary diamond Vairamudi crown",
      "Night-long deity procession",
      "Lakhs of pilgrims on the hill",
    ],
    highlightsKn: [
      "ಪ್ರಸಿದ್ಧ ವಜ್ರದ ವೈರಮುಡಿ ಕಿರೀಟ",
      "ರಾತ್ರಿಯಿಡೀ ದೇವರ ಮೆರವಣಿಗೆ",
      "ಬೆಟ್ಟದ ಮೇಲೆ ಲಕ್ಷಾಂತರ ಯಾತ್ರಿಕರು",
    ],
  },
  {
    id: "ganesha",
    nameEn: "Gowri–Ganesha Habba",
    nameKn: "ಗೌರಿ–ಗಣೇಶ ಹಬ್ಬ",
    emoji: "🐘",
    month: 9,
    whenEn: "August – September",
    whenKn: "ಆಗಸ್ಟ್ – ಸೆಪ್ಟೆಂಬರ್",
    district: "Statewide",
    placeEn: "Across Karnataka",
    placeKn: "ಕರ್ನಾಟಕದಾದ್ಯಂತ",
    wiki: "Ganesh Chaturthi",
    descEn:
      "Goddess Gowri is welcomed one day, and her son Ganesha the next. Homes and pandals install clay idols, ending in joyful immersion processions.",
    descKn:
      "ಒಂದು ದಿನ ಗೌರಿ ದೇವಿಯನ್ನು, ಮರುದಿನ ಆಕೆಯ ಮಗ ಗಣೇಶನನ್ನು ಸ್ವಾಗತಿಸಲಾಗುತ್ತದೆ. ಮಣ್ಣಿನ ಮೂರ್ತಿಗಳನ್ನು ಪ್ರತಿಷ್ಠಾಪಿಸಿ ವಿಸರ್ಜನೆಯೊಂದಿಗೆ ಸಂಭ್ರಮಿಸಲಾಗುತ್ತದೆ.",
    highlightsEn: [
      "Clay idols at homes and pandals",
      "Modaka and kadubu sweets",
      "Colourful immersion processions",
    ],
    highlightsKn: [
      "ಮನೆ ಮತ್ತು ಪಂಡಾಲ್‌ಗಳಲ್ಲಿ ಮಣ್ಣಿನ ಮೂರ್ತಿಗಳು",
      "ಮೋದಕ ಮತ್ತು ಕಡುಬು ಸಿಹಿತಿಂಡಿ",
      "ವರ್ಣರಂಜಿತ ವಿಸರ್ಜನಾ ಮೆರವಣಿಗೆ",
    ],
  },
  {
    id: "kaveri-sankramana",
    nameEn: "Kaveri Sankramana",
    nameKn: "ಕಾವೇರಿ ಸಂಕ್ರಮಣ",
    emoji: "🌊",
    month: 10,
    whenEn: "Mid-October",
    whenKn: "ಅಕ್ಟೋಬರ್ ಮಧ್ಯ",
    district: "Kodagu",
    placeEn: "Talakaveri, Kodagu",
    placeKn: "ತಲಕಾವೇರಿ, ಕೊಡಗು",
    wiki: "Talakaveri",
    descEn:
      "At Talakaveri, the source of the river Kaveri, a sacred spring wells up at a precise moment (Tula Sankramana) and thousands gather to worship the river goddess.",
    descKn:
      "ಕಾವೇರಿ ನದಿಯ ಉಗಮ ತಲಕಾವೇರಿಯಲ್ಲಿ ನಿಗದಿತ ಕ್ಷಣದಲ್ಲಿ (ತುಲಾ ಸಂಕ್ರಮಣ) ಪವಿತ್ರ ಬುಗ್ಗೆ ಉಕ್ಕುತ್ತದೆ; ಸಾವಿರಾರು ಭಕ್ತರು ನದಿ ದೇವಿಯನ್ನು ಪೂಜಿಸುತ್ತಾರೆ.",
    highlightsEn: [
      "The sacred spring's exact-moment rise",
      "Holy dip and river worship",
      "Kodava traditions and offerings",
    ],
    highlightsKn: [
      "ನಿಖರ ಕ್ಷಣದಲ್ಲಿ ಪವಿತ್ರ ಬುಗ್ಗೆಯ ಉಕ್ಕುವಿಕೆ",
      "ಪವಿತ್ರ ಸ್ನಾನ ಮತ್ತು ನದಿ ಪೂಜೆ",
      "ಕೊಡವ ಸಂಪ್ರದಾಯ ಮತ್ತು ಸಮರ್ಪಣೆ",
    ],
  },
  {
    id: "banashankari",
    nameEn: "Banashankari Jatre",
    nameKn: "ಬನಶಂಕರಿ ಜಾತ್ರೆ",
    emoji: "🪔",
    month: 2,
    whenEn: "January – February",
    whenKn: "ಜನವರಿ – ಫೆಬ್ರವರಿ",
    district: "Bagalkote",
    placeEn: "Badami, Bagalkote",
    placeKn: "ಬಾದಾಮಿ, ಬಾಗಲಕೋಟೆ",
    wiki: "Banashankari Temple, Badami",
    descEn:
      "A vibrant temple fair near Badami honouring goddess Banashankari, famous for its lamp-lit Rathotsava (chariot festival) and a bustling, weeks-long village fair.",
    descKn:
      "ಬಾದಾಮಿ ಬಳಿ ಬನಶಂಕರಿ ದೇವಿಯ ರೋಮಾಂಚಕ ಜಾತ್ರೆ; ದೀಪಗಳ ರಥೋತ್ಸವ ಮತ್ತು ವಾರಗಳ ಕಾಲ ನಡೆಯುವ ಗ್ರಾಮೀಣ ಜಾತ್ರೆಗೆ ಪ್ರಸಿದ್ಧ.",
    highlightsEn: [
      "Lamp-lit chariot festival (Rathotsava)",
      "Boat rides on the Haridra Tirtha tank",
      "Weeks-long village fair and stalls",
    ],
    highlightsKn: [
      "ದೀಪಗಳ ರಥೋತ್ಸವ",
      "ಹರಿದ್ರಾ ತೀರ್ಥ ಕೊಳದಲ್ಲಿ ದೋಣಿ ವಿಹಾರ",
      "ವಾರಗಳ ಕಾಲ ಗ್ರಾಮೀಣ ಜಾತ್ರೆ ಮತ್ತು ಮಳಿಗೆಗಳು",
    ],
  },
  {
    id: "kadalekai",
    nameEn: "Kadalekai Parishe",
    nameKn: "ಕಡಲೆಕಾಯಿ ಪರಿಷೆ",
    emoji: "🥜",
    month: 11,
    whenEn: "November",
    whenKn: "ನವೆಂಬರ್",
    district: "Bengaluru Urban",
    placeEn: "Basavanagudi, Bengaluru",
    placeKn: "ಬಸವನಗುಡಿ, ಬೆಂಗಳೂರು",
    wiki: "Kadalekai Parishe",
    descEn:
      "Bengaluru's centuries-old groundnut fair around the Bull Temple, where farmers bring their first harvest of peanuts to offer and sell in a joyous street festival.",
    descKn:
      "ಬುಲ್ ಟೆಂಪಲ್ ಸುತ್ತ ಬೆಂಗಳೂರಿನ ಶತಮಾನಗಳ ಕಡಲೆಕಾಯಿ ಜಾತ್ರೆ; ರೈತರು ತಮ್ಮ ಮೊದಲ ಕಡಲೆಕಾಯಿ ಬೆಳೆಯನ್ನು ಅರ್ಪಿಸಿ ಮಾರಾಟ ಮಾಡುತ್ತಾರೆ.",
    highlightsEn: [
      "First groundnut harvest offered to Nandi",
      "Streets full of peanut stalls",
      "A beloved old-Bengaluru tradition",
    ],
    highlightsKn: [
      "ಮೊದಲ ಕಡಲೆಕಾಯಿ ಬೆಳೆ ನಂದಿಗೆ ಅರ್ಪಣೆ",
      "ಕಡಲೆಕಾಯಿ ಮಳಿಗೆಗಳಿಂದ ತುಂಬಿದ ಬೀದಿಗಳು",
      "ಹಳೆಯ ಬೆಂಗಳೂರಿನ ಪ್ರೀತಿಯ ಸಂಪ್ರದಾಯ",
    ],
  },
  {
    id: "deepavali",
    nameEn: "Deepavali",
    nameKn: "ದೀಪಾವಳಿ",
    emoji: "🪔",
    month: 11,
    whenEn: "October – November",
    whenKn: "ಅಕ್ಟೋಬರ್ – ನವೆಂಬರ್",
    district: "Statewide",
    placeEn: "Across Karnataka",
    placeKn: "ಕರ್ನಾಟಕದಾದ್ಯಂತ",
    wiki: "Diwali",
    imageTitle: "Diwali",
    descEn:
      "The festival of lights. Karnataka celebrates over three days — Naraka Chaturdashi's dawn oil-bath, Lakshmi Puja, and Bali Padyami — as rows of clay diyas, lanterns and fireworks turn every home and street into a river of light.",
    descKn:
      "ಬೆಳಕಿನ ಹಬ್ಬ. ಕರ್ನಾಟಕದಲ್ಲಿ ಮೂರು ದಿನ — ನರಕ ಚತುರ್ದಶಿಯ ಬೆಳಗಿನ ಎಣ್ಣೆ ಸ್ನಾನ, ಲಕ್ಷ್ಮೀ ಪೂಜೆ ಮತ್ತು ಬಲಿ ಪಾಡ್ಯಮಿ — ಮಣ್ಣಿನ ದೀಪ, ಹಣತೆ ಮತ್ತು ಪಟಾಕಿಗಳಿಂದ ಪ್ರತಿ ಮನೆಯೂ ಬೆಳಕಿನ ನದಿಯಾಗುತ್ತದೆ.",
    highlightsEn: [
      "Pre-dawn oil-bath on Naraka Chaturdashi",
      "Rows of clay diyas and sky lanterns",
      "Lakshmi Puja and Bali Padyami offerings",
    ],
    highlightsKn: [
      "ನರಕ ಚತುರ್ದಶಿಯಂದು ಬೆಳಗಿನ ಎಣ್ಣೆ ಸ್ನಾನ",
      "ಸಾಲು ಸಾಲು ಮಣ್ಣಿನ ದೀಪ ಮತ್ತು ಆಕಾಶ ಹಣತೆ",
      "ಲಕ್ಷ್ಮೀ ಪೂಜೆ ಮತ್ತು ಬಲಿ ಪಾಡ್ಯಮಿ ಸಮರ್ಪಣೆ",
    ],
  },
];

/** Months for grouping/labels (index 0 = January). */
export const MONTHS_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTHS_KN = [
  "ಜನವರಿ",
  "ಫೆಬ್ರವರಿ",
  "ಮಾರ್ಚ್",
  "ಏಪ್ರಿಲ್",
  "ಮೇ",
  "ಜೂನ್",
  "ಜುಲೈ",
  "ಆಗಸ್ಟ್",
  "ಸೆಪ್ಟೆಂಬರ್",
  "ಅಕ್ಟೋಬರ್",
  "ನವೆಂಬರ್",
  "ಡಿಸೆಂಬರ್",
];
