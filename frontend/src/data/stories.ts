/**
 * Curated bilingual library of Karnataka's living stories — folktales,
 * legends, valour and Vachana wisdom. Each story is fully written in both
 * English and Kannada so the Story Weaver can present and read it aloud
 * without any paid API or external model.
 */

export type StoryTheme = "folklore" | "valour" | "mythology" | "literature";

export type Story = {
  id: string;
  theme: StoryTheme;
  emoji: string;
  titleEn: string;
  titleKn: string;
  /** A one-line hook shown on the card. */
  summaryEn: string;
  summaryKn: string;
  placeEn: string;
  placeKn: string;
  /** Wikipedia title used to fetch a live header photo (free, no key). */
  wiki: string;
  /** Story body as paragraphs, English and Kannada (same count, paired). */
  bodyEn: string[];
  bodyKn: string[];
  /** The takeaway / moral. */
  moralEn: string;
  moralKn: string;
};

export const STORY_THEMES: { id: StoryTheme; emoji: string; en: string; kn: string }[] = [
  { id: "folklore", emoji: "📖", en: "Folklore", kn: "ಜಾನಪದ" },
  { id: "valour", emoji: "⚔️", en: "Valour", kn: "ಶೌರ್ಯ" },
  { id: "mythology", emoji: "🕉️", en: "Mythology", kn: "ಪುರಾಣ" },
  { id: "literature", emoji: "✍️", en: "Literature", kn: "ಸಾಹಿತ್ಯ" },
];

export const stories: Story[] = [
  {
    id: "punyakoti",
    theme: "folklore",
    emoji: "🐄",
    titleEn: "Punyakoti, the Truthful Cow",
    titleKn: "ಸತ್ಯವಂತ ಹಸು ಪುಣ್ಯಕೋಟಿ",
    summaryEn: "A cow keeps her word to a hungry tiger — and truth itself wins.",
    summaryKn: "ಹಸಿದ ಹುಲಿಗೆ ಕೊಟ್ಟ ಮಾತನ್ನು ಹಸು ಉಳಿಸಿಕೊಳ್ಳುತ್ತದೆ — ಸತ್ಯವೇ ಗೆಲ್ಲುತ್ತದೆ.",
    placeEn: "Karnataka folk song",
    placeKn: "ಕರ್ನಾಟಕದ ಜಾನಪದ ಗೀತೆ",
    wiki: "Punyakoti",
    bodyEn: [
      "In a green Karnataka valley grazed a gentle cow named Punyakoti. One evening, as she returned home, a hungry tiger named Arbhuta sprang before her and roared that he would eat her at once.",
      "Punyakoti bowed and begged, 'My little calf waits for me, hungry and alone. Let me feed him one last time and say goodbye — I give you my word that I will return to you.' The tiger, surprised, let her go.",
      "She nursed her calf, told the herd to care for him, and — though everyone wept — walked straight back to the waiting tiger. 'I have kept my promise,' she said. 'Now you may eat me.'",
      "The tiger was so shaken by her truthfulness that he could not raise a paw. 'If a cow can be this honest,' he cried, 'what is my life worth?' He climbed a cliff and gave up his own life rather than break the spell of her goodness.",
    ],
    bodyKn: [
      "ಕರ್ನಾಟಕದ ಹಸಿರು ಕಣಿವೆಯಲ್ಲಿ ಪುಣ್ಯಕೋಟಿ ಎಂಬ ಸೌಮ್ಯ ಹಸು ಮೇಯುತ್ತಿತ್ತು. ಒಂದು ಸಂಜೆ ಮನೆಗೆ ಮರಳುವಾಗ ಅರ್ಭುತ ಎಂಬ ಹಸಿದ ಹುಲಿ ಎದುರಾಗಿ, 'ಈಗಲೇ ನಿನ್ನನ್ನು ತಿನ್ನುತ್ತೇನೆ' ಎಂದು ಗರ್ಜಿಸಿತು.",
      "ಪುಣ್ಯಕೋಟಿ ತಲೆಬಾಗಿ ಬೇಡಿಕೊಂಡಿತು — 'ನನ್ನ ಪುಟ್ಟ ಕರು ಹಸಿವಿನಿಂದ ಒಬ್ಬಂಟಿಯಾಗಿ ಕಾಯುತ್ತಿದೆ. ಕೊನೆಯ ಬಾರಿ ಹಾಲುಣಿಸಿ ಬೀಳ್ಕೊಡಲು ಬಿಡು — ನಾನು ಖಂಡಿತ ನಿನ್ನ ಬಳಿಗೆ ಮರಳಿ ಬರುತ್ತೇನೆ ಎಂದು ಮಾತು ಕೊಡುತ್ತೇನೆ.' ಆಶ್ಚರ್ಯಗೊಂಡ ಹುಲಿ ಅದನ್ನು ಬಿಟ್ಟಿತು.",
      "ಅದು ಕರುವಿಗೆ ಹಾಲುಣಿಸಿ, ಹಿಂಡಿಗೆ ಅದನ್ನು ನೋಡಿಕೊಳ್ಳಲು ಹೇಳಿ — ಎಲ್ಲರೂ ಅತ್ತರೂ — ಕಾಯುತ್ತಿದ್ದ ಹುಲಿಯ ಬಳಿಗೆ ನೇರವಾಗಿ ನಡೆದು ಬಂದಿತು. 'ನಾನು ನನ್ನ ಮಾತು ಉಳಿಸಿಕೊಂಡೆ; ಈಗ ನನ್ನನ್ನು ತಿನ್ನಬಹುದು' ಎಂದಿತು.",
      "ಅದರ ಸತ್ಯನಿಷ್ಠೆಯಿಂದ ಕಂಪಿಸಿದ ಹುಲಿಗೆ ಕೈಯೆತ್ತಲೂ ಆಗಲಿಲ್ಲ. 'ಹಸುವೇ ಇಷ್ಟು ಪ್ರಾಮಾಣಿಕವಾದರೆ, ನನ್ನ ಬದುಕಿಗೆ ಏನು ಬೆಲೆ?' ಎಂದು ಕೂಗಿ, ಅದರ ಒಳ್ಳೆಯತನವನ್ನು ಮುರಿಯುವ ಬದಲು ಬೆಟ್ಟವೇರಿ ತನ್ನ ಪ್ರಾಣವನ್ನೇ ತ್ಯಜಿಸಿತು.",
    ],
    moralEn: "A promise kept is stronger than any claw — truth can melt even a tiger's heart.",
    moralKn: "ಉಳಿಸಿಕೊಂಡ ಮಾತು ಯಾವ ಉಗುರಿಗಿಂತಲೂ ಬಲಶಾಲಿ — ಸತ್ಯ ಹುಲಿಯ ಹೃದಯವನ್ನೂ ಕರಗಿಸಬಲ್ಲದು.",
  },
  {
    id: "chamundeshwari",
    theme: "mythology",
    emoji: "🛕",
    titleEn: "Chamundeshwari and the Demon of Mysuru",
    titleKn: "ಚಾಮುಂಡೇಶ್ವರಿ ಮತ್ತು ಮಹಿಷಾಸುರ",
    summaryEn: "The goddess slays the buffalo-demon Mahishasura and gives Mysuru its name.",
    summaryKn: "ದೇವಿ ಮಹಿಷಾಸುರನನ್ನು ಸಂಹರಿಸಿ ಮೈಸೂರಿಗೆ ಹೆಸರು ನೀಡಿದ ಕಥೆ.",
    placeEn: "Chamundi Hills, Mysuru",
    placeKn: "ಚಾಮುಂಡಿ ಬೆಟ್ಟ, ಮೈಸೂರು",
    wiki: "Chamundeshwari",
    bodyEn: [
      "Long ago the buffalo-headed demon Mahishasura ruled the land with terror. Blessed that no man or god could kill him, he grew proud and cruel, and the people cried out for rescue.",
      "From the combined fire of the gods rose Goddess Chamundeshwari, riding a lion, weapons in her many hands. For nine days and nine nights she battled the shape-shifting demon across the hills.",
      "On the tenth day she struck him down upon the hill that still bears his name — Mahishuru, which softened over time into Mysuru. The grateful people built her temple atop the Chamundi Hills.",
      "To this day, the victory of good over evil is celebrated as Dasara, when Mysuru lights up and the goddess is carried through the streets in a golden procession.",
    ],
    bodyKn: [
      "ಬಹಳ ಹಿಂದೆ ಎಮ್ಮೆಯ ತಲೆಯ ರಾಕ್ಷಸ ಮಹಿಷಾಸುರ ನಾಡನ್ನು ಭಯದಿಂದ ಆಳುತ್ತಿದ್ದ. ಯಾವ ಮನುಷ್ಯನೂ ದೇವನೂ ತನ್ನನ್ನು ಕೊಲ್ಲಲಾರ ಎಂಬ ವರದಿಂದ ಅಹಂಕಾರಿಯೂ ಕ್ರೂರಿಯೂ ಆದ; ಜನರು ರಕ್ಷಣೆಗಾಗಿ ಮೊರೆಯಿಟ್ಟರು.",
      "ದೇವತೆಗಳ ಒಗ್ಗೂಡಿದ ತೇಜಸ್ಸಿನಿಂದ ಸಿಂಹವಾಹಿನಿ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿ ಅನೇಕ ಕೈಗಳಲ್ಲಿ ಆಯುಧ ಹಿಡಿದು ಉದಯಿಸಿದಳು. ರೂಪ ಬದಲಿಸುವ ಆ ರಾಕ್ಷಸನೊಂದಿಗೆ ಒಂಬತ್ತು ಹಗಲು–ರಾತ್ರಿ ಬೆಟ್ಟಗಳ ಮೇಲೆ ಹೋರಾಡಿದಳು.",
      "ಹತ್ತನೆಯ ದಿನ ಇಂದಿಗೂ ಅವನ ಹೆಸರನ್ನು ಹೊತ್ತ ಬೆಟ್ಟದ ಮೇಲೆ ಅವನನ್ನು ಸಂಹರಿಸಿದಳು — 'ಮಹಿಷೂರು' ಕಾಲಕ್ರಮೇಣ 'ಮೈಸೂರು' ಆಯಿತು. ಕೃತಜ್ಞ ಜನ ಚಾಮುಂಡಿ ಬೆಟ್ಟದ ಮೇಲೆ ಅವಳ ದೇವಾಲಯ ಕಟ್ಟಿದರು.",
      "ಇಂದಿಗೂ ಕೆಡುಕಿನ ಮೇಲೆ ಒಳಿತಿನ ಗೆಲುವನ್ನು ದಸರಾ ಎಂದು ಆಚರಿಸಲಾಗುತ್ತದೆ; ಆಗ ಮೈಸೂರು ಬೆಳಗುತ್ತದೆ, ದೇವಿಯನ್ನು ಚಿನ್ನದ ಮೆರವಣಿಗೆಯಲ್ಲಿ ಬೀದಿಗಳಲ್ಲಿ ಕೊಂಡೊಯ್ಯಲಾಗುತ್ತದೆ.",
    ],
    moralEn: "Even the darkest tyranny meets its dawn — and a city remembers its rescuer forever.",
    moralKn: "ಅತ್ಯಂತ ಕರಾಳ ದಬ್ಬಾಳಿಕೆಗೂ ಬೆಳಗಿನ ಉದಯವಿದೆ — ನಗರ ತನ್ನ ರಕ್ಷಕಳನ್ನು ಎಂದೆಂದಿಗೂ ನೆನೆಯುತ್ತದೆ.",
  },
  {
    id: "chennamma",
    theme: "valour",
    emoji: "🗡️",
    titleEn: "Rani Chennamma of Kittur",
    titleKn: "ಕಿತ್ತೂರು ರಾಣಿ ಚೆನ್ನಮ್ಮ",
    summaryEn: "A queen takes up arms against the British decades before 1857.",
    summaryKn: "1857ಕ್ಕೂ ದಶಕಗಳ ಮೊದಲೇ ಬ್ರಿಟಿಷರ ವಿರುದ್ಧ ಆಯುಧವೆತ್ತಿದ ರಾಣಿ.",
    placeEn: "Kittur, Belagavi",
    placeKn: "ಕಿತ್ತೂರು, ಬೆಳಗಾವಿ",
    wiki: "Kittur Chennamma",
    bodyEn: [
      "When the king of Kittur died without a surviving son, the British refused to recognise his adopted heir and moved to seize the kingdom under their 'doctrine of lapse'.",
      "Rani Chennamma, trained from girlhood in horse-riding, sword-fighting and archery, refused to surrender her people's land. In 1824 she led her army against the East India Company.",
      "In the first battle her forces routed the British and captured their officers. She offered peace, but the Company betrayed the truce and returned with a far larger force.",
      "Though Kittur finally fell and the Rani was imprisoned, her defiance lit a flame. Generations later her name still rings in Karnataka as one of India's earliest freedom fighters.",
    ],
    bodyKn: [
      "ಕಿತ್ತೂರಿನ ರಾಜ ಮಗನಿಲ್ಲದೆ ತೀರಿಕೊಂಡಾಗ, ಬ್ರಿಟಿಷರು ದತ್ತುಪುತ್ರನನ್ನು ಒಪ್ಪದೆ, ತಮ್ಮ 'ದತ್ತು ಮಕ್ಕಳಿಗೆ ಹಕ್ಕಿಲ್ಲ' ನೀತಿಯಡಿ ರಾಜ್ಯವನ್ನು ವಶಪಡಿಸಿಕೊಳ್ಳಲು ಮುಂದಾದರು.",
      "ಬಾಲ್ಯದಿಂದಲೇ ಕುದುರೆ ಸವಾರಿ, ಕತ್ತಿವರಸೆ ಮತ್ತು ಬಿಲ್ಲುವಿದ್ಯೆ ಕಲಿತಿದ್ದ ರಾಣಿ ಚೆನ್ನಮ್ಮ, ತನ್ನ ಜನರ ನೆಲವನ್ನು ಒಪ್ಪಿಸಲು ನಿರಾಕರಿಸಿದಳು. 1824ರಲ್ಲಿ ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಂಪನಿಯ ವಿರುದ್ಧ ಸೈನ್ಯ ನಡೆಸಿದಳು.",
      "ಮೊದಲ ಯುದ್ಧದಲ್ಲಿ ಅವಳ ಸೈನ್ಯ ಬ್ರಿಟಿಷರನ್ನು ಸೋಲಿಸಿ ಅವರ ಅಧಿಕಾರಿಗಳನ್ನು ಸೆರೆಹಿಡಿಯಿತು. ಅವಳು ಶಾಂತಿ ನೀಡಿದರೂ, ಕಂಪನಿ ಒಪ್ಪಂದ ಮುರಿದು ಬಹು ದೊಡ್ಡ ಸೈನ್ಯದೊಂದಿಗೆ ಮರಳಿ ಬಂದಿತು.",
      "ಕೊನೆಗೆ ಕಿತ್ತೂರು ಬಿದ್ದು ರಾಣಿ ಸೆರೆಯಾದರೂ, ಅವಳ ಪ್ರತಿಭಟನೆ ಒಂದು ಜ್ವಾಲೆ ಹೊತ್ತಿಸಿತು. ತಲೆಮಾರುಗಳ ನಂತರವೂ ಭಾರತದ ಮೊದಲ ಸ್ವಾತಂತ್ರ್ಯ ಹೋರಾಟಗಾರ್ತಿಯರಲ್ಲಿ ಒಬ್ಬಳಾಗಿ ಅವಳ ಹೆಸರು ಕರ್ನಾಟಕದಲ್ಲಿ ಮೊಳಗುತ್ತದೆ.",
    ],
    moralEn: "Courage planted early outlives defeat — one queen's stand can wake a nation.",
    moralKn: "ಮೊದಲೇ ಬಿತ್ತಿದ ಧೈರ್ಯ ಸೋಲನ್ನೂ ಮೀರಿ ಉಳಿಯುತ್ತದೆ — ಒಬ್ಬ ರಾಣಿಯ ನಿಲುವು ನಾಡನ್ನೇ ಎಚ್ಚರಿಸಬಲ್ಲದು.",
  },
  {
    id: "obavva",
    theme: "valour",
    emoji: "🪨",
    titleEn: "Onake Obavva and the Pestle",
    titleKn: "ಒನಕೆ ಓಬವ್ವ",
    summaryEn: "A lone woman guards a fort's secret gap with only a wooden pestle.",
    summaryKn: "ಒಬ್ಬಂಟಿ ಹೆಂಗಸು ಕೇವಲ ಒನಕೆಯಿಂದ ಕೋಟೆಯ ರಹಸ್ಯ ಸಂದಿಯನ್ನು ಕಾಯುತ್ತಾಳೆ.",
    placeEn: "Chitradurga Fort",
    placeKn: "ಚಿತ್ರದುರ್ಗ ಕೋಟೆ",
    wiki: "Onake Obavva",
    bodyEn: [
      "During the siege of Chitradurga, the enemy of Hyder Ali discovered a narrow crevice in the fort wall — wide enough for one soldier to slip through at a time.",
      "Obavva, wife of a fort guard, came to the spot to fetch water while her husband rested. She saw enemy soldiers squeezing through the gap one by one.",
      "With nothing but the heavy wooden pestle used to husk grain — an 'onake' — she struck down each soldier silently as he emerged, and dragged the bodies aside so the next would suspect nothing.",
      "Single-handedly she held the breach until help arrived, saving the fort. Her pestle became a symbol of how ordinary courage can guard a whole kingdom.",
    ],
    bodyKn: [
      "ಚಿತ್ರದುರ್ಗದ ಮುತ್ತಿಗೆಯ ಸಮಯದಲ್ಲಿ ಹೈದರ್ ಅಲಿಯ ಶತ್ರುಗಳಿಗೆ ಕೋಟೆಯ ಗೋಡೆಯಲ್ಲಿ ಕಿರಿದಾದ ಸಂದಿ ಸಿಕ್ಕಿತು — ಒಮ್ಮೆಗೆ ಒಬ್ಬ ಸೈನಿಕ ಮಾತ್ರ ನುಸುಳುವಷ್ಟು ಅಗಲ.",
      "ಕೋಟೆ ಕಾವಲುಗಾರನ ಹೆಂಡತಿ ಓಬವ್ವ, ಗಂಡ ವಿಶ್ರಾಂತಿ ಪಡೆಯುತ್ತಿದ್ದಾಗ ನೀರು ತರಲು ಆ ಸ್ಥಳಕ್ಕೆ ಬಂದಳು. ಶತ್ರು ಸೈನಿಕರು ಒಬ್ಬೊಬ್ಬರಾಗಿ ಸಂದಿಯಿಂದ ನುಸುಳುತ್ತಿರುವುದನ್ನು ಕಂಡಳು.",
      "ಧಾನ್ಯ ಕುಟ್ಟುವ ಭಾರವಾದ ಒನಕೆಯ ಹೊರತು ಬೇರೇನೂ ಇಲ್ಲದೆ, ಹೊರಬಂದ ಪ್ರತಿ ಸೈನಿಕನನ್ನೂ ಸದ್ದಿಲ್ಲದೆ ಹೊಡೆದುರುಳಿಸಿ, ಮುಂದಿನವನಿಗೆ ಸಂಶಯ ಬಾರದಂತೆ ಶವಗಳನ್ನು ಪಕ್ಕಕ್ಕೆ ಎಳೆದಳು.",
      "ಸಹಾಯ ಬರುವವರೆಗೆ ಒಬ್ಬಂಟಿಯಾಗಿ ಆ ಸಂದಿಯನ್ನು ಕಾಯ್ದು ಕೋಟೆಯನ್ನು ಉಳಿಸಿದಳು. ಅವಳ ಒನಕೆ ಸಾಮಾನ್ಯ ಧೈರ್ಯ ಇಡೀ ರಾಜ್ಯವನ್ನು ಕಾಯಬಲ್ಲದು ಎಂಬುದರ ಸಂಕೇತವಾಯಿತು.",
    ],
    moralEn: "You do not need an army to change history — only the will to stand your ground.",
    moralKn: "ಇತಿಹಾಸ ಬದಲಿಸಲು ಸೈನ್ಯ ಬೇಕಿಲ್ಲ — ನಿಂತ ನೆಲವನ್ನು ಕಾಯುವ ಛಲ ಸಾಕು.",
  },
  {
    id: "gommata",
    theme: "mythology",
    emoji: "🧘",
    titleEn: "Bahubali of Shravanabelagola",
    titleKn: "ಶ್ರವಣಬೆಳಗೊಳದ ಬಾಹುಬಲಿ",
    summaryEn: "A victorious prince renounces a kingdom won, and finds a greater triumph.",
    summaryKn: "ಗೆದ್ದ ರಾಜ್ಯವನ್ನೇ ತ್ಯಜಿಸಿ ದೊಡ್ಡ ಗೆಲುವು ಕಂಡ ರಾಜಕುಮಾರನ ಕಥೆ.",
    placeEn: "Shravanabelagola, Hassan",
    placeKn: "ಶ್ರವಣಬೆಳಗೊಳ, ಹಾಸನ",
    wiki: "Gommateshwara statue",
    bodyEn: [
      "Bahubali and his brother Bharata, sons of the first Jain Tirthankara, fought a duel to decide who would rule. Bahubali won — but at the moment of victory, he saw the emptiness of a crown bought with a brother's defeat.",
      "He laid down his kingdom and walked into the forest to meditate. So still and so long did he stand that creepers wound around his legs and anthills rose at his feet.",
      "In the 10th century the Ganga minister Chavundaraya carved his vision into a single 57-foot granite statue atop Vindhyagiri hill — among the tallest free-standing monolithic statues in the world.",
      "Every twelve years, in the Mahamastakabhisheka, the giant is bathed in milk, saffron and flowers, and pilgrims climb the hill to honour the warrior who conquered himself.",
    ],
    bodyKn: [
      "ಮೊದಲ ಜೈನ ತೀರ್ಥಂಕರರ ಮಕ್ಕಳಾದ ಬಾಹುಬಲಿ ಮತ್ತು ಭರತ ರಾಜ್ಯವನ್ನು ಯಾರು ಆಳಬೇಕೆಂದು ದ್ವಂದ್ವಯುದ್ಧ ನಡೆಸಿದರು. ಬಾಹುಬಲಿ ಗೆದ್ದ — ಆದರೆ ಗೆಲುವಿನ ಕ್ಷಣದಲ್ಲೇ, ಸಹೋದರನ ಸೋಲಿನಿಂದ ಪಡೆದ ಕಿರೀಟದ ಶೂನ್ಯತೆಯನ್ನು ಕಂಡ.",
      "ರಾಜ್ಯವನ್ನು ತೊರೆದು ತಪಸ್ಸಿಗಾಗಿ ಕಾಡಿಗೆ ನಡೆದ. ಎಷ್ಟು ನಿಶ್ಚಲನಾಗಿ ಎಷ್ಟು ಕಾಲ ನಿಂತನೆಂದರೆ, ಬಳ್ಳಿಗಳು ಅವನ ಕಾಲನ್ನು ಸುತ್ತಿಕೊಂಡವು, ಪಾದಗಳ ಬಳಿ ಹುತ್ತಗಳೆದ್ದವು.",
      "10ನೇ ಶತಮಾನದಲ್ಲಿ ಗಂಗ ಮಂತ್ರಿ ಚಾವುಂಡರಾಯ ಆ ದರ್ಶನವನ್ನು ವಿಂಧ್ಯಗಿರಿ ಬೆಟ್ಟದ ಮೇಲೆ 57 ಅಡಿ ಎತ್ತರದ ಏಕಶಿಲಾ ಮೂರ್ತಿಯಾಗಿ ಕೆತ್ತಿಸಿದ — ಜಗತ್ತಿನ ಅತಿ ಎತ್ತರದ ಏಕಶಿಲಾ ಮೂರ್ತಿಗಳಲ್ಲಿ ಒಂದು.",
      "ಪ್ರತಿ ಹನ್ನೆರಡು ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಮಹಾಮಸ್ತಕಾಭಿಷೇಕದಲ್ಲಿ ಆ ಬೃಹನ್ಮೂರ್ತಿಗೆ ಹಾಲು, ಕೇಸರಿ ಮತ್ತು ಹೂವಿನ ಅಭಿಷೇಕ ನಡೆಯುತ್ತದೆ; ತನ್ನನ್ನೇ ಗೆದ್ದ ಆ ವೀರನಿಗೆ ಗೌರವ ಸಲ್ಲಿಸಲು ಭಕ್ತರು ಬೆಟ್ಟವೇರುತ್ತಾರೆ.",
    ],
    moralEn: "The hardest victory is over one's own pride — and it stands taller than any throne.",
    moralKn: "ಅತ್ಯಂತ ಕಠಿಣ ಗೆಲುವು ತನ್ನದೇ ಅಹಂಕಾರದ ಮೇಲಿನದು — ಅದು ಯಾವ ಸಿಂಹಾಸನಕ್ಕಿಂತಲೂ ಎತ್ತರ.",
  },
  {
    id: "akkamahadevi",
    theme: "literature",
    emoji: "✍️",
    titleEn: "Akka Mahadevi's Vachanas",
    titleKn: "ಅಕ್ಕಮಹಾದೇವಿಯ ವಚನಗಳು",
    summaryEn: "A 12th-century mystic poet walks free of every chain but devotion.",
    summaryKn: "ಭಕ್ತಿಯ ಹೊರತು ಎಲ್ಲ ಬಂಧನವನ್ನೂ ಕಳಚಿದ 12ನೇ ಶತಮಾನದ ಕವಯಿತ್ರಿ.",
    placeEn: "Udutadi, Shivamogga",
    placeKn: "ಉಡುತಡಿ, ಶಿವಮೊಗ್ಗ",
    wiki: "Akka Mahadevi",
    bodyEn: [
      "Mahadevi was born in a small village of Karnataka, devoted from childhood to Lord Chenna Mallikarjuna. She saw the divine as her only true companion.",
      "Rejecting royal marriage and worldly comfort, she left palace and pretence behind and walked toward the Anubhava Mantapa of Kalyana — the great hall of sharanas where seekers debated truth as equals.",
      "There the elders questioned a woman who had renounced even clothing for her god. With fearless, luminous words she answered them, and her wisdom won their reverence.",
      "Her vachanas — short, free-verse poems in everyday Kannada — still speak across nine centuries, carrying the voice of a soul that would bow to nothing but love.",
    ],
    bodyKn: [
      "ಮಹಾದೇವಿ ಕರ್ನಾಟಕದ ಒಂದು ಪುಟ್ಟ ಹಳ್ಳಿಯಲ್ಲಿ ಜನಿಸಿ, ಬಾಲ್ಯದಿಂದಲೇ ಚೆನ್ನಮಲ್ಲಿಕಾರ್ಜುನನ ಭಕ್ತೆಯಾದಳು. ದೈವವನ್ನೇ ತನ್ನ ಏಕೈಕ ನಿಜ ಸಂಗಾತಿಯೆಂದು ಕಂಡಳು.",
      "ರಾಜವಿವಾಹ ಮತ್ತು ಲೌಕಿಕ ಸುಖವನ್ನು ತಿರಸ್ಕರಿಸಿ, ಅರಮನೆ ಮತ್ತು ಆಡಂಬರವನ್ನು ಹಿಂದೆ ಬಿಟ್ಟು, ಸತ್ಯವನ್ನು ಸಮಾನರಾಗಿ ಚರ್ಚಿಸುವ ಶರಣರ ಮಹಾಸಭೆ — ಕಲ್ಯಾಣದ ಅನುಭವ ಮಂಟಪದತ್ತ ನಡೆದಳು.",
      "ಅಲ್ಲಿ ಹಿರಿಯರು, ತನ್ನ ದೇವನಿಗಾಗಿ ಉಡುಪನ್ನೂ ತೊರೆದ ಈ ಹೆಣ್ಣನ್ನು ಪ್ರಶ್ನಿಸಿದರು. ನಿರ್ಭೀತ, ತೇಜೋಮಯ ಮಾತುಗಳಿಂದ ಅವಳು ಉತ್ತರಿಸಿದಳು; ಅವಳ ಜ್ಞಾನ ಅವರ ಗೌರವವನ್ನು ಗೆದ್ದಿತು.",
      "ದಿನನಿತ್ಯದ ಕನ್ನಡದಲ್ಲಿ ರಚಿಸಿದ ಅವಳ ಸಣ್ಣ, ಮುಕ್ತಛಂದದ ವಚನಗಳು — ಒಂಬತ್ತು ಶತಮಾನಗಳ ನಂತರವೂ — ಪ್ರೀತಿಯ ಹೊರತು ಯಾವುದಕ್ಕೂ ಬಾಗದ ಆತ್ಮದ ದನಿಯನ್ನು ಸಾರುತ್ತವೆ.",
    ],
    moralEn: "True freedom is to belong wholly to what you love — and to fear nothing else.",
    moralKn: "ನಿಜವಾದ ಸ್ವಾತಂತ್ರ್ಯವೆಂದರೆ ಪ್ರೀತಿಸುವುದಕ್ಕೆ ಸಂಪೂರ್ಣ ಸೇರುವುದು — ಮತ್ತೇನನ್ನೂ ಭಯಪಡದಿರುವುದು.",
  },
  {
    id: "talakadu",
    theme: "folklore",
    emoji: "🏜️",
    titleEn: "The Curse of Talakadu",
    titleKn: "ತಲಕಾಡಿನ ಶಾಪ",
    summaryEn: "A grieving queen's curse buries a temple-town in sand — or so the legend goes.",
    summaryKn: "ದುಃಖಿತ ರಾಣಿಯ ಶಾಪ ದೇವಾಲಯ ನಗರವನ್ನು ಮರಳಿನಲ್ಲಿ ಮುಚ್ಚಿತೆಂಬ ದಂತಕಥೆ.",
    placeEn: "Talakadu, Mysuru",
    placeKn: "ತಲಕಾಡು, ಮೈಸೂರು",
    wiki: "Talakadu",
    bodyEn: [
      "Talakadu was once a flourishing town of temples on the bank of the Kaveri. As the Vijayanagara power waned, the Wodeyars of Mysuru rose, and the region changed hands.",
      "Legend says Queen Alamelamma, widow of a fallen chief, was pursued for her jewels. Rather than yield them, she leapt into the Kaveri — but first she uttered a threefold curse.",
      "'May Talakadu turn to sand; may Malangi become a whirlpool; may the Mysuru kings never bear children.' To this day, drifting dunes bury Talakadu's temples, the river runs deep at Malangi, and the curse is still whispered in palace halls.",
      "Whether history or folklore, the half-buried temples of Talakadu — uncovered briefly during a rare festival once in years — remind every visitor how thin the line is between fact and legend.",
    ],
    bodyKn: [
      "ತಲಕಾಡು ಒಮ್ಮೆ ಕಾವೇರಿಯ ದಂಡೆಯಲ್ಲಿ ದೇವಾಲಯಗಳ ಸಮೃದ್ಧ ನಗರವಾಗಿತ್ತು. ವಿಜಯನಗರದ ಶಕ್ತಿ ಕ್ಷೀಣಿಸುತ್ತಿದ್ದಂತೆ ಮೈಸೂರಿನ ಒಡೆಯರ್ ವಂಶ ಬೆಳೆಯಿತು, ಪ್ರದೇಶ ಕೈ ಬದಲಾಯಿತು.",
      "ದಂತಕಥೆಯ ಪ್ರಕಾರ, ಸೋತ ನಾಯಕನ ವಿಧವೆ ರಾಣಿ ಅಲಮೇಲಮ್ಮಳನ್ನು ಅವಳ ಆಭರಣಗಳಿಗಾಗಿ ಬೆನ್ನಟ್ಟಲಾಯಿತು. ಅವುಗಳನ್ನು ಒಪ್ಪಿಸುವ ಬದಲು ಅವಳು ಕಾವೇರಿಗೆ ಹಾರಿದಳು — ಆದರೆ ಮೊದಲು ಮೂರು ಪಟ್ಟಿನ ಶಾಪವಿಟ್ಟಳು.",
      "'ತಲಕಾಡು ಮರಳಾಗಲಿ; ಮಾಲಂಗಿ ಸುಳಿಯಾಗಲಿ; ಮೈಸೂರು ಅರಸರಿಗೆ ಮಕ್ಕಳಾಗದಿರಲಿ.' ಇಂದಿಗೂ ಚಲಿಸುವ ಮರಳ ದಿಬ್ಬಗಳು ತಲಕಾಡಿನ ದೇವಾಲಯಗಳನ್ನು ಮುಚ್ಚಿವೆ, ಮಾಲಂಗಿಯಲ್ಲಿ ನದಿ ಆಳವಾಗಿ ಹರಿಯುತ್ತದೆ, ಅರಮನೆಯ ಸಭೆಗಳಲ್ಲಿ ಆ ಶಾಪ ಇಂದಿಗೂ ಪಿಸುಮಾತಾಗಿದೆ.",
      "ಇತಿಹಾಸವೋ ಜಾನಪದವೋ — ವರ್ಷಗಳಿಗೊಮ್ಮೆ ನಡೆಯುವ ಅಪರೂಪದ ಉತ್ಸವದಲ್ಲಿ ಸ್ವಲ್ಪ ಕಾಲ ಬಯಲಾಗುವ ತಲಕಾಡಿನ ಅರೆ-ಹೂತ ದೇವಾಲಯಗಳು, ಸತ್ಯ ಮತ್ತು ದಂತಕಥೆಯ ನಡುವಿನ ಗೆರೆ ಎಷ್ಟು ತೆಳುವೆಂದು ಪ್ರತಿ ಭೇಟಿಗಾರನಿಗೆ ನೆನಪಿಸುತ್ತವೆ.",
    ],
    moralEn: "Grief and injustice leave long shadows — and the land itself remembers them.",
    moralKn: "ದುಃಖ ಮತ್ತು ಅನ್ಯಾಯ ಉದ್ದ ನೆರಳುಗಳನ್ನು ಬಿಡುತ್ತವೆ — ನೆಲವೇ ಅವುಗಳನ್ನು ನೆನಪಿಟ್ಟುಕೊಳ್ಳುತ್ತದೆ.",
  },
  {
    id: "hampi-pampa",
    theme: "mythology",
    emoji: "🐒",
    titleEn: "Hampi and the Kingdom of Kishkindha",
    titleKn: "ಹಂಪಿ ಮತ್ತು ಕಿಷ್ಕಿಂಧೆ",
    summaryEn: "The boulder-strewn land where the Ramayana's monkey kingdom once stood.",
    summaryKn: "ರಾಮಾಯಣದ ವಾನರ ರಾಜ್ಯ ನೆಲೆಸಿತ್ತೆಂಬ ಬಂಡೆಗಳ ನಾಡು.",
    placeEn: "Hampi, Vijayanagara",
    placeKn: "ಹಂಪಿ, ವಿಜಯನಗರ",
    wiki: "Hampi",
    bodyEn: [
      "Among the golden boulders of Hampi flows the Tungabhadra, called Pampa in old texts. From her name comes 'Pampa-kshetra', which time wore down into 'Hampi'.",
      "Tradition holds this is Kishkindha, the monkey kingdom of the Ramayana, where Rama met Hanuman and Sugriva and forged the alliance that would rescue Sita.",
      "Centuries later, two brothers founded the Vijayanagara Empire here, and around the Virupaksha temple grew one of the richest cities the medieval world had ever seen — its bazaars said to trade in diamonds by the measure.",
      "Today the empire's stone chariots, musical pillars and ruined palaces sprawl across the rocks as a UNESCO World Heritage Site — a landscape where myth and history share the same horizon.",
    ],
    bodyKn: [
      "ಹಂಪಿಯ ಚಿನ್ನದ ಬಣ್ಣದ ಬಂಡೆಗಳ ನಡುವೆ ತುಂಗಭದ್ರಾ ಹರಿಯುತ್ತದೆ; ಹಳೆಯ ಗ್ರಂಥಗಳಲ್ಲಿ ಇದನ್ನು ಪಂಪಾ ಎನ್ನುತ್ತಾರೆ. ಅವಳ ಹೆಸರಿನಿಂದ 'ಪಂಪಾ-ಕ್ಷೇತ್ರ', ಕಾಲಕ್ರಮೇಣ 'ಹಂಪಿ' ಆಯಿತು.",
      "ಇದು ರಾಮಾಯಣದ ವಾನರ ರಾಜ್ಯ ಕಿಷ್ಕಿಂಧೆ ಎಂದು ಸಂಪ್ರದಾಯ ಹೇಳುತ್ತದೆ; ಇಲ್ಲಿಯೇ ರಾಮ ಹನುಮಂತ ಮತ್ತು ಸುಗ್ರೀವರನ್ನು ಭೇಟಿಯಾಗಿ, ಸೀತೆಯನ್ನು ಬಿಡಿಸುವ ಮೈತ್ರಿಯನ್ನು ಬೆಸೆದನಂತೆ.",
      "ಶತಮಾನಗಳ ನಂತರ ಇಬ್ಬರು ಸಹೋದರರು ಇಲ್ಲಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯವನ್ನು ಸ್ಥಾಪಿಸಿದರು; ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ ಸುತ್ತ ಮಧ್ಯಕಾಲೀನ ಜಗತ್ತು ಕಂಡ ಅತ್ಯಂತ ಶ್ರೀಮಂತ ನಗರಗಳಲ್ಲಿ ಒಂದು ಬೆಳೆಯಿತು — ಅದರ ಪೇಟೆಗಳಲ್ಲಿ ವಜ್ರಗಳನ್ನು ಅಳೆದು ಮಾರುತ್ತಿದ್ದರೆಂದು ಹೇಳುತ್ತಾರೆ.",
      "ಇಂದು ಆ ಸಾಮ್ರಾಜ್ಯದ ಕಲ್ಲಿನ ರಥಗಳು, ಸಂಗೀತದ ಕಂಬಗಳು ಮತ್ತು ಪಾಳುಬಿದ್ದ ಅರಮನೆಗಳು ಬಂಡೆಗಳ ಮೇಲೆ ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾಗಿ ಹರಡಿವೆ — ಪುರಾಣ ಮತ್ತು ಇತಿಹಾಸ ಒಂದೇ ದಿಗಂತವನ್ನು ಹಂಚಿಕೊಳ್ಳುವ ನೆಲ.",
    ],
    moralEn: "Some places hold so many stories that legend and history become one stone.",
    moralKn: "ಕೆಲವು ಸ್ಥಳಗಳು ಎಷ್ಟು ಕಥೆಗಳನ್ನು ಹೊತ್ತಿರುತ್ತವೆಂದರೆ ದಂತಕಥೆ ಮತ್ತು ಇತಿಹಾಸ ಒಂದೇ ಕಲ್ಲಾಗುತ್ತವೆ.",
  },
];
