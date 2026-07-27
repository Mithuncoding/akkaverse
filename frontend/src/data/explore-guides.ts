export type GuideText = { en: string; kn: string };

export type ExploreGuide = {
  why: GuideText;
  best: GuideText;
  duration: GuideText;
  taste: GuideText;
  etiquette: GuideText;
  nearby: string[];
  mapQuery?: string;
};

export const exploreGuides: Record<string, ExploreGuide> = {
  hampi: {
    why: {
      en: "Hampi makes the scale of Vijayanagara tangible: sacred centres, royal enclosures, markets, water systems, and international trade survive in one connected landscape.",
      kn: "ಹಂಪಿಯು ವಿಜಯನಗರದ ವೈಭವವನ್ನು ನೇರವಾಗಿ ಅನುಭವಿಸಲು ಸಾಧ್ಯವಾಗಿಸುತ್ತದೆ: ಪವಿತ್ರ ಕೇಂದ್ರಗಳು, ರಾಜ ಆವರಣಗಳು, ಮಾರುಕಟ್ಟೆಗಳು, ನೀರಿನ ವ್ಯವಸ್ಥೆಗಳು ಮತ್ತು ಜಾಗತಿಕ ವ್ಯಾಪಾರದ ಗುರುತುಗಳು ಒಂದೇ ಭೂದೃಶ್ಯದಲ್ಲಿ ಉಳಿದಿವೆ.",
    },
    best: { en: "October–February; begin at sunrise", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಸೂರ್ಯೋದಯದಿಂದ ಆರಂಭಿಸಿ" },
    duration: { en: "Two full days", kn: "ಎರಡು ಪೂರ್ಣ ದಿನಗಳು" },
    taste: { en: "North Karnataka meals and local banana dishes around Kamalapura", kn: "ಕಮಲಾಪುರದ ಸುತ್ತ ಉತ್ತರ ಕರ್ನಾಟಕದ ಊಟ ಮತ್ತು ಸ್ಥಳೀಯ ಬಾಳೆಹಣ್ಣಿನ ತಿನಿಸುಗಳು" },
    etiquette: { en: "Do not climb fragile monuments; dress respectfully at active temples and carry water without leaving plastic behind.", kn: "ಸೂಕ್ಷ್ಮ ಸ್ಮಾರಕಗಳ ಮೇಲೆ ಹತ್ತಬೇಡಿ; ಸಕ್ರಿಯ ದೇವಾಲಯಗಳಲ್ಲಿ ಗೌರವಯುತ ಉಡುಗೆ ಧರಿಸಿ ಮತ್ತು ಪ್ಲಾಸ್ಟಿಕ್ ಬಿಡದೆ ನೀರು ಕೊಂಡೊಯ್ಯಿರಿ." },
    nearby: ["badami-caves", "pattadakal", "aihole"],
  },
  "mysore-palace": {
    why: {
      en: "The palace connects Wodeyar statecraft, craft traditions, music, painting, and the continuing public ritual of Dasara.",
      kn: "ಈ ಅರಮನೆಯು ಒಡೆಯರ್ ಆಡಳಿತ, ಕರಕುಶಲ ಪರಂಪರೆ, ಸಂಗೀತ, ಚಿತ್ರಕಲೆ ಮತ್ತು ಇಂದಿಗೂ ಜೀವಂತವಾಗಿರುವ ದಸರಾ ಸಾರ್ವಜನಿಕ ಆಚರಣೆಯನ್ನು ಜೋಡಿಸುತ್ತದೆ.",
    },
    best: { en: "October–February; illumination evenings", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ದೀಪಾಲಂಕಾರದ ಸಂಜೆಗಳು" },
    duration: { en: "Two to three hours", kn: "ಎರಡುರಿಂದ ಮೂರು ಗಂಟೆಗಳು" },
    taste: { en: "Mysore pak, masala dosa, and filter coffee", kn: "ಮೈಸೂರು ಪಾಕ್, ಮಸಾಲ ದೋಸೆ ಮತ್ತು ಫಿಲ್ಟರ್ ಕಾಫಿ" },
    etiquette: { en: "Follow current photography rules, remove footwear where directed, and expect larger crowds during Dasara.", kn: "ಪ್ರಸ್ತುತ ಛಾಯಾಚಿತ್ರ ನಿಯಮಗಳನ್ನು ಪಾಲಿಸಿ, ಸೂಚಿಸಿದಲ್ಲಿ ಪಾದರಕ್ಷೆ ತೆಗೆದು, ದಸರಾ ಸಮಯದಲ್ಲಿ ಹೆಚ್ಚಿನ ಜನಸಂದಣಿಯನ್ನು ನಿರೀಕ್ಷಿಸಿ." },
    nearby: ["gomateshwara", "bandipur", "mysore-masala-dosa"],
  },
  "belur-halebidu": {
    why: {
      en: "These temples are stone archives: epics, dancers, animals, jewellery, warfare, and daily life appear in unusually precise Hoysala sculpture.",
      kn: "ಈ ದೇವಾಲಯಗಳು ಕಲ್ಲಿನ ದಾಖಲೆಗಳು: ಮಹಾಕಾವ್ಯಗಳು, ನರ್ತಕಿಯರು, ಪ್ರಾಣಿಗಳು, ಆಭರಣಗಳು, ಯುದ್ಧ ಮತ್ತು ದೈನಂದಿನ ಜೀವನವು ಅಸಾಧಾರಣ ನಿಖರತೆಯ ಹೊಯ್ಸಳ ಶಿಲ್ಪಗಳಲ್ಲಿ ಕಾಣುತ್ತದೆ.",
    },
    best: { en: "October–February; soft morning light", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಮೃದುವಾದ ಬೆಳಗಿನ ಬೆಳಕು" },
    duration: { en: "One full day for both towns", kn: "ಎರಡೂ ಪಟ್ಟಣಗಳಿಗೆ ಒಂದು ಪೂರ್ಣ ದಿನ" },
    taste: { en: "Hassan-style vegetarian meals, akki rotti, and filter coffee", kn: "ಹಾಸನ ಶೈಲಿಯ ಸಸ್ಯಾಹಾರಿ ಊಟ, ಅಕ್ಕಿ ರೊಟ್ಟಿ ಮತ್ತು ಫಿಲ್ಟರ್ ಕಾಫಿ" },
    etiquette: { en: "Chennakeshava remains an active temple. Do not touch carvings; a local guide helps decode the narrative bands.", kn: "ಚೆನ್ನಕೇಶವ ಇನ್ನೂ ಸಕ್ರಿಯ ದೇವಾಲಯ. ಕೆತ್ತನೆಗಳನ್ನು ಮುಟ್ಟಬೇಡಿ; ಸ್ಥಳೀಯ ಮಾರ್ಗದರ್ಶಿ ಕಥಾಪಟ್ಟಿಗಳನ್ನು ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಹಾಯಕ." },
    nearby: ["gomateshwara", "coorg", "mysore-palace"],
  },
  gomateshwara: {
    why: {
      en: "The climb culminates in a radical Jain image of stillness and renunciation, while inscriptions reveal a millennium of patronage and pilgrimage.",
      kn: "ಬೆಟ್ಟದ ಏರಿಕೆಯ ಅಂತ್ಯದಲ್ಲಿ ಸ್ಥಿರತೆ ಮತ್ತು ತ್ಯಾಗದ ಗಾಢ ಜೈನ ಪ್ರತಿಮೆ ಕಾಣುತ್ತದೆ; ಶಾಸನಗಳು ಸಾವಿರ ವರ್ಷದ ಆಶ್ರಯ ಮತ್ತು ಯಾತ್ರೆಯ ಕಥೆ ಹೇಳುತ್ತವೆ.",
    },
    best: { en: "October–February; climb early", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಬೆಳಿಗ್ಗೆ ಬೇಗ ಏರಿ" },
    duration: { en: "Three to four hours", kn: "ಮೂರರಿಂದ ನಾಲ್ಕು ಗಂಟೆಗಳು" },
    taste: { en: "Simple vegetarian meals and Hassan-region snacks", kn: "ಸರಳ ಸಸ್ಯಾಹಾರಿ ಊಟ ಮತ್ತು ಹಾಸನ ಪ್ರದೇಶದ ತಿಂಡಿಗಳು" },
    etiquette: { en: "The hill is climbed barefoot. Dress modestly, carry water, and check accessibility needs before the many steps.", kn: "ಬೆಟ್ಟವನ್ನು ಬರಿಗಾಲಿನಲ್ಲಿ ಏರಬೇಕು. ಸರಳ ಉಡುಗೆ ಧರಿಸಿ, ನೀರು ಕೊಂಡೊಯ್ಯಿರಿ ಮತ್ತು ಅನೇಕ ಮೆಟ್ಟಿಲುಗಳಿಗೆ ಮುಂಚಿತವಾಗಿ ಸೌಲಭ್ಯ ಪರಿಶೀಲಿಸಿ." },
    nearby: ["belur-halebidu", "mysore-palace", "coorg"],
  },
  bengaluru: {
    why: {
      en: "Beyond the technology story, Bengaluru reveals older layers through pete markets, tanks, gardens, temples, cantonment neighbourhoods, theatre, and music.",
      kn: "ತಂತ್ರಜ್ಞಾನ ಕಥೆಯಾಚೆ ಬೆಂಗಳೂರು ಪೇಟೆ ಮಾರುಕಟ್ಟೆಗಳು, ಕೆರೆಗಳು, ಉದ್ಯಾನಗಳು, ದೇವಾಲಯಗಳು, ಕಂಟೋನ್ಮೆಂಟ್ ಪ್ರದೇಶಗಳು, ರಂಗಭೂಮಿ ಮತ್ತು ಸಂಗೀತದ ಹಳೆಯ ಪದರಗಳನ್ನು ತೋರಿಸುತ್ತದೆ.",
    },
    best: { en: "November–February; weekdays for museums", kn: "ನವೆಂಬರ್–ಫೆಬ್ರವರಿ; ಸಂಗ್ರಹಾಲಯಗಳಿಗೆ ವಾರದ ದಿನಗಳು" },
    duration: { en: "One to two days by neighbourhood", kn: "ಪ್ರದೇಶವಾರು ಒಂದರಿಂದ ಎರಡು ದಿನಗಳು" },
    taste: { en: "Dose, idli-vada, filter coffee, and military-hotel classics", kn: "ದೋಸೆ, ಇಡ್ಲಿ-ವಡೆ, ಫಿಲ್ಟರ್ ಕಾಫಿ ಮತ್ತು ಮಿಲಿಟರಿ ಹೋಟೆಲ್ ತಿನಿಸುಗಳು" },
    etiquette: { en: "Plan around traffic, use public transit where possible, and ask before photographing people in markets and places of worship.", kn: "ಸಂಚಾರವನ್ನು ಗಮನಿಸಿ ಯೋಜಿಸಿ, ಸಾಧ್ಯವಾದರೆ ಸಾರ್ವಜನಿಕ ಸಾರಿಗೆ ಬಳಸಿ ಮತ್ತು ಮಾರುಕಟ್ಟೆ ಹಾಗೂ ಪೂಜಾಸ್ಥಳಗಳಲ್ಲಿ ಜನರ ಚಿತ್ರ ತೆಗೆಯುವ ಮೊದಲು ಕೇಳಿ." },
    nearby: ["mysore-palace", "gomateshwara", "bandipur"],
  },
  "jog-falls": {
    why: {
      en: "Jog is both a dramatic monsoon landscape and part of the Sharavathi river system that shaped Malnad ecology and Karnataka's power history.",
      kn: "ಜೋಗವು ಅದ್ಭುತ ಮಳೆಗಾಲದ ಭೂದೃಶ್ಯ ಮಾತ್ರವಲ್ಲ; ಮಲೆನಾಡಿನ ಪರಿಸರ ಮತ್ತು ಕರ್ನಾಟಕದ ವಿದ್ಯುತ್ ಇತಿಹಾಸ ರೂಪಿಸಿದ ಶರಾವತಿ ನದಿ ವ್ಯವಸ್ಥೆಯ ಭಾಗವೂ ಆಗಿದೆ.",
    },
    best: { en: "August–December; flow varies with rain", kn: "ಆಗಸ್ಟ್–ಡಿಸೆಂಬರ್; ಮಳೆಯಂತೆ ನೀರಿನ ಹರಿವು ಬದಲಾಗುತ್ತದೆ" },
    duration: { en: "Half a day", kn: "ಅರ್ಧ ದಿನ" },
    taste: { en: "Malnad meals, akki rotti, and jackfruit preparations", kn: "ಮಲೆನಾಡು ಊಟ, ಅಕ್ಕಿ ರೊಟ್ಟಿ ಮತ್ತು ಹಲಸಿನ ತಿನಿಸುಗಳು" },
    etiquette: { en: "Stay behind barriers, expect slippery paths and mist, and never enter restricted river or cliff areas.", kn: "ತಡೆಗೋಡೆಗಳ ಹಿಂದೆ ಇರಿರಿ, ಜಾರುವ ದಾರಿ ಮತ್ತು ಮಂಜನ್ನು ನಿರೀಕ್ಷಿಸಿ, ನಿರ್ಬಂಧಿತ ನದಿ ಅಥವಾ ಬಂಡೆ ಪ್ರದೇಶಗಳಿಗೆ ಹೋಗಬೇಡಿ." },
    nearby: ["udupi-krishna", "dandeli", "gokarna"],
  },
  coorg: {
    why: {
      en: "Kodagu is not only scenery: Kodava customs, sacred groves, coffee labour, Kaveri worship, food, and martial memory form a distinct cultural region.",
      kn: "ಕೊಡಗು ಕೇವಲ ಪ್ರಕೃತಿ ದೃಶ್ಯವಲ್ಲ: ಕೊಡವ ಆಚರಣೆ, ದೇವರಕಾಡು, ಕಾಫಿ ಶ್ರಮ, ಕಾವೇರಿ ಆರಾಧನೆ, ಆಹಾರ ಮತ್ತು ಶೌರ್ಯ ಸ್ಮೃತಿ ಸೇರಿ ವಿಶಿಷ್ಟ ಸಾಂಸ್ಕೃತಿಕ ಪ್ರದೇಶ ರೂಪಿಸುತ್ತವೆ.",
    },
    best: { en: "October–March; monsoon for lush landscapes", kn: "ಅಕ್ಟೋಬರ್–ಮಾರ್ಚ್; ಹಸಿರು ದೃಶ್ಯಕ್ಕೆ ಮಳೆಗಾಲ" },
    duration: { en: "Two to three days", kn: "ಎರಡುರಿಂದ ಮೂರು ದಿನಗಳು" },
    taste: { en: "Kadambuttu, nool puttu, bamboo-shoot dishes, and Kodava pandi curry", kn: "ಕದಂಬುಟ್ಟು, ನೂಲ್ ಪುಟ್ಟು, ಬಿದಿರು ಕಳಲೆ ತಿನಿಸು ಮತ್ತು ಕೊಡವ ಪಾಂಡಿ ಕರಿ" },
    etiquette: { en: "Coffee estates and sacred groves may be private or protected. Enter only with permission and minimise plastic waste.", kn: "ಕಾಫಿ ತೋಟಗಳು ಮತ್ತು ದೇವರಕಾಡುಗಳು ಖಾಸಗಿ ಅಥವಾ ಸಂರಕ್ಷಿತವಾಗಿರಬಹುದು. ಅನುಮತಿಯೊಂದಿಗೆ ಮಾತ್ರ ಪ್ರವೇಶಿಸಿ ಮತ್ತು ಪ್ಲಾಸ್ಟಿಕ್ ತ್ಯಾಜ್ಯ ಕಡಿಮೆ ಮಾಡಿ." },
    nearby: ["mysore-palace", "bandipur", "belur-halebidu"],
  },
  "mysore-masala-dosa": {
    why: {
      en: "The dish shows how Karnataka's tiffin-room culture turns fermentation, griddle craft, chutney, and fast communal dining into everyday heritage.",
      kn: "ಈ ತಿನಿಸು ಕರ್ನಾಟಕದ ಟಿಫಿನ್ ರೂಂ ಸಂಸ್ಕೃತಿಯು ಹುದುಗಿಸುವಿಕೆ, ತವಾ ಕೌಶಲ್ಯ, ಚಟ್ನಿ ಮತ್ತು ವೇಗದ ಸಾಮೂಹಿಕ ಊಟವನ್ನು ದೈನಂದಿನ ಪರಂಪರೆಯಾಗಿ ಹೇಗೆ ರೂಪಿಸುತ್ತದೆ ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ.",
    },
    best: { en: "Breakfast or early evening, served fresh", kn: "ಉಪಾಹಾರ ಅಥವಾ ಸಂಜೆ ಬೇಗ, ತಾಜಾವಾಗಿ" },
    duration: { en: "Thirty to sixty minutes", kn: "ಮೂವತ್ತರಿಂದ ಅರವತ್ತು ನಿಮಿಷ" },
    taste: { en: "Pair with coconut chutney, sambar, and strong filter coffee", kn: "ತೆಂಗಿನ ಚಟ್ನಿ, ಸಾಂಬಾರ್ ಮತ್ತು ಗಟ್ಟಿ ಫಿಲ್ಟರ್ ಕಾಫಿಯೊಂದಿಗೆ ಸವಿಯಿರಿ" },
    etiquette: { en: "Order only what you can finish, eat while crisp, and ask about ghee or allergens when needed.", kn: "ತಿನ್ನಬಹುದಾದಷ್ಟೇ ಆರ್ಡರ್ ಮಾಡಿ, ಗರಿಗರಿಯಾಗಿರುವಾಗಲೇ ಸವಿಯಿರಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ತುಪ್ಪ ಅಥವಾ ಅಲರ್ಜಿ ಪದಾರ್ಥಗಳ ಬಗ್ಗೆ ಕೇಳಿ." },
    nearby: ["mysore-palace", "bisi-bele-bath", "bandipur"],
    mapQuery: "Mysore masala dosa Mysuru Karnataka",
  },
  "bisi-bele-bath": {
    why: {
      en: "This one-pot meal carries a regional grammar of rice, lentils, vegetables, tamarind, roasted spices, ghee, and hospitality.",
      kn: "ಈ ಒಂದೇ ಪಾತ್ರೆಯ ಊಟವು ಅಕ್ಕಿ, ಬೇಳೆ, ತರಕಾರಿ, ಹುಣಸೆ, ಹುರಿದ ಮಸಾಲೆ, ತುಪ್ಪ ಮತ್ತು ಆತಿಥ್ಯದ ಪ್ರಾದೇಶಿಕ ವ್ಯಾಕರಣವನ್ನು ಹೊತ್ತಿದೆ.",
    },
    best: { en: "Lunch; especially comforting in cool weather", kn: "ಮಧ್ಯಾಹ್ನದ ಊಟ; ತಂಪಾದ ಹವಾಮಾನದಲ್ಲಿ ವಿಶೇಷ" },
    duration: { en: "Thirty to sixty minutes", kn: "ಮೂವತ್ತರಿಂದ ಅರವತ್ತು ನಿಮಿಷ" },
    taste: { en: "Serve hot with ghee, boondi, chips, or a cooling raita", kn: "ತುಪ್ಪ, ಬೂಂದಿ, ಚಿಪ್ಸ್ ಅಥವಾ ತಂಪಾದ ರೈತದೊಂದಿಗೆ ಬಿಸಿಯಾಗಿ ಸವಿಯಿರಿ" },
    etiquette: { en: "Recipes vary by household; ask before judging authenticity and check nuts, ghee, or spice levels if needed.", kn: "ಮನೆಯಂತೆ ಪಾಕವಿಧಾನ ಬದಲಾಗುತ್ತದೆ; ಅಸಲಿತನ ತೀರ್ಮಾನಿಸುವ ಮೊದಲು ಕೇಳಿ ಮತ್ತು ಅಗತ್ಯವಿದ್ದರೆ ಬೀಜ, ತುಪ್ಪ ಅಥವಾ ಖಾರದ ಮಟ್ಟ ಪರಿಶೀಲಿಸಿ." },
    nearby: ["mysore-palace", "mysore-masala-dosa", "bengaluru"],
    mapQuery: "Bisi bele bath Karnataka restaurant",
  },
  "badami-caves": {
    why: {
      en: "Badami places early Chalukyan religious imagination inside the living geology of red sandstone, with Hindu and Jain images sharing one cliff.",
      kn: "ಬಾದಾಮಿಯು ಕೆಂಪು ಮರಳುಗಲ್ಲಿನ ಜೀವಂತ ಭೂವಿಜ್ಞಾನದೊಳಗೆ ಆರಂಭಿಕ ಚಾಲುಕ್ಯ ಧಾರ್ಮಿಕ ಕಲ್ಪನೆಯನ್ನು ತೋರಿಸುತ್ತದೆ; ಒಂದೇ ಬಂಡೆಯಲ್ಲಿ ಹಿಂದೂ ಮತ್ತು ಜೈನ ಚಿತ್ರಗಳು ಜೊತೆಯಾಗಿವೆ.",
    },
    best: { en: "October–February; early morning", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಬೆಳಿಗ್ಗೆ ಬೇಗ" },
    duration: { en: "Half a day; full day with town", kn: "ಅರ್ಧ ದಿನ; ಪಟ್ಟಣ ಸೇರಿ ಪೂರ್ಣ ದಿನ" },
    taste: { en: "Jolada rotti, ennegayi, pulses, and North Karnataka meals", kn: "ಜೋಳದ ರೊಟ್ಟಿ, ಎಣ್ಣೆಗಾಯಿ, ಬೇಳೆ ಮತ್ತು ಉತ್ತರ ಕರ್ನಾಟಕದ ಊಟ" },
    etiquette: { en: "Steps and rock surfaces can be hot or slippery. Do not touch reliefs and watch for monkeys around food.", kn: "ಮೆಟ್ಟಿಲು ಮತ್ತು ಬಂಡೆಗಳು ಬಿಸಿ ಅಥವಾ ಜಾರುವಂತಿರಬಹುದು. ಶಿಲ್ಪಗಳನ್ನು ಮುಟ್ಟಬೇಡಿ ಮತ್ತು ಆಹಾರದ ಬಳಿ ಕೋತಿಗಳ ಬಗ್ಗೆ ಎಚ್ಚರಿಕೆ ವಹಿಸಿ." },
    nearby: ["pattadakal", "aihole", "hampi"],
  },
  gokarna: {
    why: {
      en: "Gokarna holds two identities together: an old Shaiva pilgrimage town and a coastal landscape of fishing communities, coves, and walking paths.",
      kn: "ಗೋಕರ್ಣವು ಎರಡು ಗುರುತುಗಳನ್ನು ಒಟ್ಟಿಗೆ ಹೊತ್ತಿದೆ: ಪ್ರಾಚೀನ ಶೈವ ಯಾತ್ರಾ ಪಟ್ಟಣ ಮತ್ತು ಮೀನುಗಾರ ಸಮುದಾಯ, ಕೊಲ್ಲಿ ಹಾಗೂ ನಡೆಪಥಗಳ ಕರಾವಳಿ ಭೂದೃಶ್ಯ.",
    },
    best: { en: "October–February; avoid rough monsoon seas", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಮಳೆಗಾಲದ ಉಗ್ರ ಸಮುದ್ರ ತಪ್ಪಿಸಿ" },
    duration: { en: "One to two days", kn: "ಒಂದರಿಂದ ಎರಡು ದಿನಗಳು" },
    taste: { en: "Coastal vegetarian meals, fish cuisine, kokum, and fresh coconut", kn: "ಕರಾವಳಿ ಸಸ್ಯಾಹಾರಿ ಊಟ, ಮೀನು ತಿನಿಸು, ಕೋಕಂ ಮತ್ತು ತಾಜಾ ತೆಂಗು" },
    etiquette: { en: "Temple entry customs may vary; dress modestly in town, respect fishing activity, and take all beach waste back.", kn: "ದೇವಾಲಯ ಪ್ರವೇಶ ಸಂಪ್ರದಾಯ ಬದಲಾಗಬಹುದು; ಪಟ್ಟಣದಲ್ಲಿ ಸರಳ ಉಡುಗೆ ಧರಿಸಿ, ಮೀನುಗಾರಿಕೆಯನ್ನು ಗೌರವಿಸಿ ಮತ್ತು ಕಡಲತೀರದ ತ್ಯಾಜ್ಯವನ್ನು ಹಿಂದಕ್ಕೆ ತೆಗೆದುಕೊಂಡು ಹೋಗಿ." },
    nearby: ["murudeshwar", "dandeli", "udupi-krishna"],
  },
  pattadakal: {
    why: {
      en: "Pattadakal was a royal ceremonial landscape where Chalukyan architects confidently combined Dravida and Nagara temple forms.",
      kn: "ಪಟ್ಟದಕಲ್ಲು ಚಾಲುಕ್ಯ ವಾಸ್ತುಶಿಲ್ಪಿಗಳು ದ್ರಾವಿಡ ಮತ್ತು ನಾಗರ ದೇವಾಲಯ ರೂಪಗಳನ್ನು ಆತ್ಮವಿಶ್ವಾಸದಿಂದ ಸಂಯೋಜಿಸಿದ ರಾಜ ಸಮಾರಂಭದ ಭೂದೃಶ್ಯ.",
    },
    best: { en: "October–February; combine with Aihole", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಐಹೊಳೆಯೊಂದಿಗೆ ಭೇಟಿ" },
    duration: { en: "Two to three hours", kn: "ಎರಡುರಿಂದ ಮೂರು ಗಂಟೆಗಳು" },
    taste: { en: "North Karnataka thali, jolada rotti, and shenga chutney", kn: "ಉತ್ತರ ಕರ್ನಾಟಕದ ಊಟ, ಜೋಳದ ರೊಟ್ಟಿ ಮತ್ತು ಶೇಂಗಾ ಚಟ್ನಿ" },
    etiquette: { en: "Stay on marked paths, do not sit or climb on temple fabric, and use a guide to distinguish architectural styles.", kn: "ಗುರುತಿಸಿದ ದಾರಿಯಲ್ಲೇ ನಡೆಯಿರಿ, ದೇವಾಲಯದ ಕಟ್ಟಡದ ಮೇಲೆ ಕುಳಿತುಕೊಳ್ಳಬೇಡಿ ಅಥವಾ ಹತ್ತಬೇಡಿ ಮತ್ತು ಶೈಲಿಗಳ ವ್ಯತ್ಯಾಸಕ್ಕೆ ಮಾರ್ಗದರ್ಶಿ ಬಳಸಿ." },
    nearby: ["aihole", "badami-caves", "hampi"],
  },
  aihole: {
    why: {
      en: "Aihole lets visitors watch temple architecture evolve through experiments in plans, roofs, halls, inscriptions, and sacred imagery.",
      kn: "ಐಹೊಳೆ ಯೋಜನೆ, ಮೇಲ್ಛಾವಣಿ, ಮಂಟಪ, ಶಾಸನ ಮತ್ತು ಪವಿತ್ರ ಚಿತ್ರಗಳ ಪ್ರಯೋಗಗಳ ಮೂಲಕ ದೇವಾಲಯ ವಾಸ್ತುಶಿಲ್ಪ ಬೆಳೆಯುವುದನ್ನು ನೋಡಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ.",
    },
    best: { en: "October–February; morning or late afternoon", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಬೆಳಿಗ್ಗೆ ಅಥವಾ ಸಂಜೆ" },
    duration: { en: "Three to four hours", kn: "ಮೂರರಿಂದ ನಾಲ್ಕು ಗಂಟೆಗಳು" },
    taste: { en: "Jolada rotti, badanekayi preparations, curd, and local pulses", kn: "ಜೋಳದ ರೊಟ್ಟಿ, ಬದನೆಕಾಯಿ ತಿನಿಸು, ಮೊಸರು ಮತ್ತು ಸ್ಥಳೀಯ ಬೇಳೆ" },
    etiquette: { en: "The monuments sit within a living village. Respect homes and fields, avoid intrusive photography, and protect the stonework.", kn: "ಸ್ಮಾರಕಗಳು ಜೀವಂತ ಗ್ರಾಮದೊಳಿವೆ. ಮನೆ ಮತ್ತು ಹೊಲಗಳನ್ನು ಗೌರವಿಸಿ, ಅತಿಕ್ರಮಣಕಾರಿ ಛಾಯಾಚಿತ್ರ ತಪ್ಪಿಸಿ ಮತ್ತು ಕಲ್ಲಿನ ಕೆಲಸ ರಕ್ಷಿಸಿ." },
    nearby: ["pattadakal", "badami-caves", "hampi"],
  },
  "chitradurga-fort": {
    why: {
      en: "The fort turns natural boulders, reservoirs, gateways, and hidden passages into defence, while Onake Obavva anchors it in popular memory.",
      kn: "ಕೋಟೆಯು ನೈಸರ್ಗಿಕ ಬಂಡೆ, ಜಲಾಶಯ, ಬಾಗಿಲು ಮತ್ತು ರಹಸ್ಯ ಮಾರ್ಗಗಳನ್ನು ರಕ್ಷಣೆಯಾಗಿ ರೂಪಿಸುತ್ತದೆ; ಒನಕೆ ಓಬವ್ವ ಅದನ್ನು ಜನಸ್ಮೃತಿಯಲ್ಲಿ ನೆಲೆಗೊಳಿಸುತ್ತಾರೆ.",
    },
    best: { en: "November–February; start early", kn: "ನವೆಂಬರ್–ಫೆಬ್ರವರಿ; ಬೇಗ ಆರಂಭಿಸಿ" },
    duration: { en: "Three to five hours", kn: "ಮೂರರಿಂದ ಐದು ಗಂಟೆಗಳು" },
    taste: { en: "Davanagere benne dose, millet meals, and local groundnut snacks", kn: "ದಾವಣಗೆರೆ ಬೆಣ್ಣೆ ದೋಸೆ, ಸಿರಿಧಾನ್ಯ ಊಟ ಮತ್ತು ಸ್ಥಳೀಯ ಶೇಂಗಾ ತಿಂಡಿಗಳು" },
    etiquette: { en: "Wear shoes with grip, carry water, avoid isolated edges, and do not enter closed passages or reservoirs.", kn: "ಹಿಡಿತವಿರುವ ಪಾದರಕ್ಷೆ ಧರಿಸಿ, ನೀರು ಕೊಂಡೊಯ್ಯಿರಿ, ಒಂಟಿ ಅಂಚು ತಪ್ಪಿಸಿ ಮತ್ತು ಮುಚ್ಚಿದ ಮಾರ್ಗ ಅಥವಾ ಜಲಾಶಯ ಪ್ರವೇಶಿಸಬೇಡಿ." },
    nearby: ["hampi", "bengaluru", "mysore-palace"],
  },
  "udupi-krishna": {
    why: {
      en: "Udupi links Madhvacharya's philosophy, Kanaka Dasa's devotional memory, temple kitchens, music, and the rotating stewardship of eight mathas.",
      kn: "ಉಡುಪಿ ಮಧ್ವಾಚಾರ್ಯರ ತತ್ತ್ವ, ಕನಕದಾಸರ ಭಕ್ತಿ ಸ್ಮೃತಿ, ದೇವಾಲಯದ ಅಡುಗೆ, ಸಂಗೀತ ಮತ್ತು ಅಷ್ಟಮಠಗಳ ಪರ್ಯಾಯ ನಿರ್ವಹಣೆಯನ್ನು ಜೋಡಿಸುತ್ತದೆ.",
    },
    best: { en: "October–March; festival days are busiest", kn: "ಅಕ್ಟೋಬರ್–ಮಾರ್ಚ್; ಹಬ್ಬದ ದಿನಗಳಲ್ಲಿ ಹೆಚ್ಚು ಜನ" },
    duration: { en: "Two to four hours", kn: "ಎರಡುರಿಂದ ನಾಲ್ಕು ಗಂಟೆಗಳು" },
    taste: { en: "Traditional Udupi meal, goli baje, neer dose, and coastal sweets", kn: "ಸಾಂಪ್ರದಾಯಿಕ ಉಡುಪಿ ಊಟ, ಗೋಳಿ ಬಜೆ, ನೀರು ದೋಸೆ ಮತ್ತು ಕರಾವಳಿ ಸಿಹಿ" },
    etiquette: { en: "Follow temple dress, queue, photography, and dining rules; customs can change during festivals and Paryaya.", kn: "ದೇವಾಲಯದ ಉಡುಗೆ, ಸಾಲು, ಛಾಯಾಚಿತ್ರ ಮತ್ತು ಊಟದ ನಿಯಮ ಪಾಲಿಸಿ; ಹಬ್ಬ ಮತ್ತು ಪರ್ಯಾಯದ ವೇಳೆ ಸಂಪ್ರದಾಯ ಬದಲಾಗಬಹುದು." },
    nearby: ["murudeshwar", "gokarna", "jog-falls"],
  },
  murudeshwar: {
    why: {
      en: "Murudeshwar combines a modern monumental Shiva landscape with an older coastal Atmalinga tradition and views across the Arabian Sea.",
      kn: "ಮುರುಡೇಶ್ವರವು ಆಧುನಿಕ ಬೃಹತ್ ಶಿವ ಭೂದೃಶ್ಯವನ್ನು ಹಳೆಯ ಕರಾವಳಿ ಆತ್ಮಲಿಂಗ ಪರಂಪರೆ ಮತ್ತು ಅರಬ್ಬಿ ಸಮುದ್ರದ ನೋಟದೊಂದಿಗೆ ಜೋಡಿಸುತ್ತದೆ.",
    },
    best: { en: "October–February; sunrise or sunset", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಸೂರ್ಯೋದಯ ಅಥವಾ ಸೂರ್ಯಾಸ್ತ" },
    duration: { en: "Two to three hours", kn: "ಎರಡುರಿಂದ ಮೂರು ಗಂಟೆಗಳು" },
    taste: { en: "Coastal Karnataka fish meals, neer dose, and vegetarian temple-town fare", kn: "ಕರಾವಳಿ ಕರ್ನಾಟಕದ ಮೀನು ಊಟ, ನೀರು ದೋಸೆ ಮತ್ತು ದೇವಾಲಯ ಪಟ್ಟಣದ ಸಸ್ಯಾಹಾರಿ ಆಹಾರ" },
    etiquette: { en: "Respect active worship, sea warnings, and local fishing zones; verify current lift and viewpoint access on arrival.", kn: "ಸಕ್ರಿಯ ಪೂಜೆ, ಸಮುದ್ರ ಎಚ್ಚರಿಕೆ ಮತ್ತು ಸ್ಥಳೀಯ ಮೀನುಗಾರಿಕೆ ವಲಯ ಗೌರವಿಸಿ; ಲಿಫ್ಟ್ ಮತ್ತು ವೀಕ್ಷಣಾ ಸ್ಥಳದ ಪ್ರಸ್ತುತ ಪ್ರವೇಶವನ್ನು ಸ್ಥಳದಲ್ಲೇ ಪರಿಶೀಲಿಸಿ." },
    nearby: ["gokarna", "udupi-krishna", "dandeli"],
  },
  bandipur: {
    why: {
      en: "Bandipur protects a connected landscape rather than an isolated park, allowing elephants and other wildlife to move across state borders.",
      kn: "ಬಂಡೀಪುರವು ಪ್ರತ್ಯೇಕ ಉದ್ಯಾನವಲ್ಲ, ಸಂಪರ್ಕಿತ ಭೂದೃಶ್ಯವನ್ನು ರಕ್ಷಿಸುತ್ತದೆ; ಆನೆ ಮತ್ತು ಇತರ ವನ್ಯಜೀವಿಗಳು ರಾಜ್ಯ ಗಡಿಗಳಾಚೆ ಚಲಿಸಲು ಅವಕಾಶ ನೀಡುತ್ತದೆ.",
    },
    best: { en: "October–May; sightings are never guaranteed", kn: "ಅಕ್ಟೋಬರ್–ಮೇ; ವನ್ಯಜೀವಿ ಕಾಣುವುದು ಖಚಿತವಲ್ಲ" },
    duration: { en: "Half to one full day", kn: "ಅರ್ಧದಿಂದ ಒಂದು ಪೂರ್ಣ ದಿನ" },
    taste: { en: "Simple meals near Gundlupet; carry reusable water and avoid feeding wildlife", kn: "ಗುಂಡ್ಲುಪೇಟೆ ಸಮೀಪ ಸರಳ ಊಟ; ಮರುಬಳಕೆಯ ನೀರಿನ ಬಾಟಲಿ ಕೊಂಡೊಯ್ಯಿರಿ ಮತ್ತು ವನ್ಯಜೀವಿಗಳಿಗೆ ಆಹಾರ ಕೊಡಬೇಡಿ" },
    etiquette: { en: "Book only authorised safaris, keep silent, never feed animals, and obey speed and stopping restrictions on forest roads.", kn: "ಅಧಿಕೃತ ಸಫಾರಿ ಮಾತ್ರ ಬುಕ್ ಮಾಡಿ, ಮೌನವಾಗಿರಿ, ಪ್ರಾಣಿಗಳಿಗೆ ಆಹಾರ ಕೊಡಬೇಡಿ ಮತ್ತು ಅರಣ್ಯ ರಸ್ತೆಯ ವೇಗ ಹಾಗೂ ನಿಲುಗಡೆ ನಿಯಮ ಪಾಲಿಸಿ." },
    nearby: ["mysore-palace", "coorg", "gomateshwara"],
  },
  "bidar-fort": {
    why: {
      en: "Bidar Fort reveals the Deccan as a cosmopolitan centre where Persianate design, local craft, military engineering, and Sufi culture met.",
      kn: "ಬೀದರ್ ಕೋಟೆಯು ಪರ್ಷಿಯನ್ ವಿನ್ಯಾಸ, ಸ್ಥಳೀಯ ಕರಕುಶಲ, ಸೇನಾ ಎಂಜಿನಿಯರಿಂಗ್ ಮತ್ತು ಸೂಫಿ ಸಂಸ್ಕೃತಿ ಒಂದಾದ ವಿಶ್ವನಾಗರಿಕ ದಖ್ಖನ್ ಕೇಂದ್ರವನ್ನು ತೋರಿಸುತ್ತದೆ.",
    },
    best: { en: "October–February; morning light", kn: "ಅಕ್ಟೋಬರ್–ಫೆಬ್ರವರಿ; ಬೆಳಗಿನ ಬೆಳಕು" },
    duration: { en: "Three to four hours", kn: "ಮೂರರಿಂದ ನಾಲ್ಕು ಗಂಟೆಗಳು" },
    taste: { en: "Jolada rotti, tahari, local kebabs, and Bidriware-market snacks", kn: "ಜೋಳದ ರೊಟ್ಟಿ, ತಹರಿ, ಸ್ಥಳೀಯ ಕಬಾಬ್ ಮತ್ತು ಬಿದ್ರಿ ಮಾರುಕಟ್ಟೆಯ ತಿಂಡಿಗಳು" },
    etiquette: { en: "The complex is extensive and uneven. Protect surviving tilework and plaster, and ask before photographing worshippers nearby.", kn: "ಆವರಣ ವಿಶಾಲ ಮತ್ತು ಅಸಮವಾಗಿದೆ. ಉಳಿದ ಟೈಲ್ ಮತ್ತು ಗಾರೆ ಕೆಲಸ ರಕ್ಷಿಸಿ, ಸಮೀಪದ ಭಕ್ತರ ಚಿತ್ರ ತೆಗೆಯುವ ಮೊದಲು ಕೇಳಿ." },
    nearby: ["hampi", "pattadakal", "aihole"],
  },
  dandeli: {
    why: {
      en: "Dandeli shows how river, forest, wildlife, industry, and adventure tourism compete and coexist in the Western Ghats.",
      kn: "ದಾಂಡೇಲಿಯು ಪಶ್ಚಿಮ ಘಟ್ಟದಲ್ಲಿ ನದಿ, ಕಾಡು, ವನ್ಯಜೀವಿ, ಕೈಗಾರಿಕೆ ಮತ್ತು ಸಾಹಸ ಪ್ರವಾಸೋದ್ಯಮ ಹೇಗೆ ಸ್ಪರ್ಧಿಸಿ ಸಹಬಾಳ್ವೆ ನಡೆಸುತ್ತವೆ ಎಂಬುದನ್ನು ತೋರಿಸುತ್ತದೆ.",
    },
    best: { en: "October–March; rafting depends on releases", kn: "ಅಕ್ಟೋಬರ್–ಮಾರ್ಚ್; ರಾಫ್ಟಿಂಗ್ ನೀರಿನ ಬಿಡುಗಡೆಗೆ ಅವಲಂಬಿತ" },
    duration: { en: "Two days", kn: "ಎರಡು ದಿನಗಳು" },
    taste: { en: "North Karnataka meals, river fish where appropriate, and seasonal forest produce", kn: "ಉತ್ತರ ಕರ್ನಾಟಕದ ಊಟ, ಸೂಕ್ತ ಸ್ಥಳದಲ್ಲಿ ನದಿ ಮೀನು ಮತ್ತು ಋತುಮಾನ ಅರಣ್ಯ ಉತ್ಪನ್ನ" },
    etiquette: { en: "Use licensed operators and life jackets, keep distance from wildlife, and avoid loud music and litter in forest zones.", kn: "ಪರವಾನಗಿ ಪಡೆದ ನಿರ್ವಾಹಕರು ಮತ್ತು ಲೈಫ್ ಜಾಕೆಟ್ ಬಳಸಿ, ವನ್ಯಜೀವಿಗಳಿಂದ ದೂರವಿರಿ ಮತ್ತು ಅರಣ್ಯ ವಲಯದಲ್ಲಿ ಜೋರಾದ ಸಂಗೀತ ಹಾಗೂ ಕಸ ತಪ್ಪಿಸಿ." },
    nearby: ["gokarna", "murudeshwar", "jog-falls"],
  },
};

export function guideFor(id: string): ExploreGuide | null {
  return exploreGuides[id] ?? null;
}