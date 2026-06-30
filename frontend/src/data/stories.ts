/**
 * Curated bilingual library of Karnataka's living stories — folktales,
 * legends, valour and Vachana wisdom. Each story is fully written in both
 * English and Kannada so the Story Weaver can present and read it aloud
 * without any paid API or external model.
 *
 * Every story is told in six cinematic beats — setting, rising tension,
 * the turn, the climax and the legacy — so Story Mode can stage each one as
 * a sequence of distinct, immersive scenes.
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
      "In a green valley cradled by the hills of Karnataka, a gentle cow named Punyakoti grazed among her herd. The grass was sweet, the streams ran clear, and every evening she returned home to a small calf who waited for her at the edge of the meadow.",
      "One dusk, as the sky turned the colour of marigolds, a hungry tiger named Arbhuta sprang onto the path before her. 'For many days I have not eaten,' he roared, his eyes burning. 'Tonight, cow, I will feast on you.'",
      "Trembling yet calm, Punyakoti lowered her head. 'My little calf waits alone, hungry for my milk,' she pleaded. 'Let me feed him one last time and bid the herd farewell — and I give you my sacred word that I shall return to be your meal.' Astonished that any creature would walk back to its own death, the tiger let her go.",
      "She found her calf and let him drink his fill, nuzzling him close. Then she gathered the herd and asked them to raise her child as their own. 'Never lie, never break a promise,' she told him softly, 'for truth is the only wealth that lasts.' Though every cow wept, she turned and walked back toward the waiting tiger.",
      "Punyakoti stood before Arbhuta and bowed her head. 'I have kept my word,' she said. 'Now you may eat me.' But the tiger, who had never seen such honesty, found that he could not raise a single claw. Her truth had become a fire he could not cross.",
      "'If a humble cow can be this true,' he cried, 'then shame upon my life of cruelty!' Rather than break the spell of her goodness, he climbed a high cliff and gave up his own life. To this day the song of Punyakoti is sung to Kannada children, so that her promise lives on in every new heart.",
    ],
    bodyKn: [
      "ಕರ್ನಾಟಕದ ಬೆಟ್ಟಗಳ ನಡುವಿನ ಹಸಿರು ಕಣಿವೆಯಲ್ಲಿ ಪುಣ್ಯಕೋಟಿ ಎಂಬ ಸೌಮ್ಯ ಹಸು ತನ್ನ ಹಿಂಡಿನೊಂದಿಗೆ ಮೇಯುತ್ತಿತ್ತು. ಹುಲ್ಲು ಸಿಹಿಯಾಗಿತ್ತು, ತೊರೆಗಳು ತಿಳಿಯಾಗಿದ್ದವು; ಪ್ರತಿ ಸಂಜೆ ಹುಲ್ಲುಗಾವಲಿನ ಅಂಚಿನಲ್ಲಿ ಕಾಯುತ್ತಿದ್ದ ಪುಟ್ಟ ಕರುವಿನ ಬಳಿಗೆ ಅದು ಮರಳುತ್ತಿತ್ತು.",
      "ಒಂದು ಸಂಜೆ ಆಗಸ ಚೆಂಡುಹೂವಿನ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ, ಅರ್ಭುತ ಎಂಬ ಹಸಿದ ಹುಲಿ ದಾರಿಗೆ ಅಡ್ಡವಾಗಿ ನೆಗೆದು ನಿಂತಿತು. 'ಹಲವು ದಿನಗಳಿಂದ ನಾನು ಏನನ್ನೂ ತಿಂದಿಲ್ಲ,' ಎಂದು ಕಣ್ಣುರಿಸುತ್ತಾ ಗರ್ಜಿಸಿತು. 'ಇಂದು ರಾತ್ರಿ, ಹಸುವೇ, ನಿನ್ನನ್ನೇ ತಿನ್ನುತ್ತೇನೆ.'",
      "ನಡುಗುತ್ತಲೂ ಶಾಂತವಾಗಿ ಪುಣ್ಯಕೋಟಿ ತಲೆಬಾಗಿತು. 'ನನ್ನ ಪುಟ್ಟ ಕರು ಹಾಲಿಗಾಗಿ ಒಬ್ಬಂಟಿಯಾಗಿ ಕಾಯುತ್ತಿದೆ,' ಎಂದು ಬೇಡಿಕೊಂಡಿತು. 'ಕೊನೆಯ ಬಾರಿ ಅದಕ್ಕೆ ಹಾಲುಣಿಸಿ, ಹಿಂಡಿಗೆ ಬೀಳ್ಕೊಟ್ಟು ಬರುತ್ತೇನೆ — ನಿನ್ನ ಆಹಾರವಾಗಲು ಖಂಡಿತ ಮರಳುತ್ತೇನೆಂದು ಪವಿತ್ರ ಮಾತು ಕೊಡುತ್ತೇನೆ.' ಸಾವಿನ ಬಳಿಗೆ ತಾನಾಗಿ ಮರಳುವ ಜೀವಿಯನ್ನು ಕಂಡು ಬೆರಗಾದ ಹುಲಿ ಅದನ್ನು ಬಿಟ್ಟಿತು.",
      "ಅದು ಕರುವನ್ನು ಸೇರಿ ಹೊಟ್ಟೆ ತುಂಬಾ ಹಾಲುಣಿಸಿ ಮುದ್ದಿಸಿತು. ನಂತರ ಹಿಂಡನ್ನು ಒಟ್ಟುಗೂಡಿಸಿ, ತನ್ನ ಮಗುವನ್ನು ತಮ್ಮದೇ ಎಂದು ಸಾಕುವಂತೆ ಕೇಳಿಕೊಂಡಿತು. 'ಎಂದೂ ಸುಳ್ಳಾಡಬೇಡ, ಮಾತು ಮುರಿಯಬೇಡ — ಸತ್ಯವೊಂದೇ ಉಳಿಯುವ ಸಂಪತ್ತು,' ಎಂದು ಮೃದುವಾಗಿ ಹೇಳಿತು. ಎಲ್ಲ ಹಸುಗಳೂ ಕಣ್ಣೀರಿಟ್ಟರೂ, ಅದು ತಿರುಗಿ ಕಾಯುತ್ತಿದ್ದ ಹುಲಿಯತ್ತ ನಡೆಯಿತು.",
      "ಪುಣ್ಯಕೋಟಿ ಅರ್ಭುತನ ಮುಂದೆ ನಿಂತು ತಲೆತಗ್ಗಿಸಿತು. 'ನಾನು ನನ್ನ ಮಾತು ಉಳಿಸಿಕೊಂಡೆ; ಈಗ ನನ್ನನ್ನು ತಿನ್ನಬಹುದು,' ಎಂದಿತು. ಆದರೆ ಇಂಥ ಪ್ರಾಮಾಣಿಕತೆಯನ್ನು ಎಂದೂ ಕಾಣದ ಹುಲಿಗೆ ಒಂದು ಉಗುರನ್ನೂ ಎತ್ತಲಾಗಲಿಲ್ಲ. ಅದರ ಸತ್ಯ ದಾಟಲಾಗದ ಬೆಂಕಿಯಾಗಿತ್ತು.",
      "'ಒಂದು ಸಾಮಾನ್ಯ ಹಸು ಇಷ್ಟು ಸತ್ಯವಂತವಾದರೆ, ಕ್ರೂರತೆಯ ನನ್ನ ಬದುಕಿಗೆ ಧಿಕ್ಕಾರ!' ಎಂದು ಕೂಗಿತು. ಅದರ ಒಳ್ಳೆಯತನದ ಮೋಡಿಯನ್ನು ಮುರಿಯುವ ಬದಲು, ಎತ್ತರದ ಬೆಟ್ಟವೇರಿ ತನ್ನ ಪ್ರಾಣವನ್ನೇ ತ್ಯಜಿಸಿತು. ಇಂದಿಗೂ ಪುಣ್ಯಕೋಟಿಯ ಹಾಡನ್ನು ಕನ್ನಡದ ಮಕ್ಕಳಿಗೆ ಹಾಡಿ ಹೇಳುತ್ತಾರೆ; ಅದರ ಮಾತು ಪ್ರತಿ ಹೊಸ ಹೃದಯದಲ್ಲೂ ಬದುಕುತ್ತದೆ.",
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
      "Long ago, the buffalo-headed demon Mahishasura seized the land and ruled it with terror. Villages burned at his whim, and no one dared raise their eyes to him.",
      "He had won a fearsome boon: that no man and no god could ever kill him. Believing himself immortal, he grew crueler by the day, until the very heavens trembled and the people cried out for a saviour.",
      "Then the gods poured their anger into a single blinding flame, and from it rose Goddess Chamundeshwari — riding a roaring lion, a weapon flashing in each of her many hands. The demon had forgotten that his boon said nothing of a woman.",
      "For nine days and nine nights the goddess and the shape-shifting demon battled across the hills. He became a buffalo, a lion, a giant — but her blade followed him through every form, and the mountains shook with their war.",
      "On the tenth dawn she struck him down upon the hill that still carries his name — Mahishuru, which time softened into Mysuru. The grateful people climbed the slope and raised her temple where she stood victorious.",
      "To this day her triumph of good over evil is relived as Dasara, the festival of light. Mysuru blazes with a hundred thousand lamps, and the goddess is carried through the streets in a golden procession a city will never forget.",
    ],
    bodyKn: [
      "ಬಹಳ ಹಿಂದೆ ಎಮ್ಮೆಯ ತಲೆಯ ರಾಕ್ಷಸ ಮಹಿಷಾಸುರ ನಾಡನ್ನು ವಶಪಡಿಸಿಕೊಂಡು ಭಯದಿಂದ ಆಳಿದ. ಅವನ ಸನ್ನೆಗೆ ಹಳ್ಳಿಗಳು ಬೆಂಕಿಗಾಹುತಿಯಾಗುತ್ತಿದ್ದವು, ಅವನತ್ತ ಕಣ್ಣೆತ್ತಿ ನೋಡಲೂ ಯಾರೂ ಧೈರ್ಯ ಮಾಡುತ್ತಿರಲಿಲ್ಲ.",
      "ಯಾವ ಮನುಷ್ಯನೂ ದೇವನೂ ತನ್ನನ್ನು ಕೊಲ್ಲಲಾರ ಎಂಬ ಭಯಂಕರ ವರವನ್ನು ಅವನು ಪಡೆದಿದ್ದ. ತಾನು ಅಮರನೆಂದು ನಂಬಿ ದಿನದಿಂದ ದಿನಕ್ಕೆ ಕ್ರೂರನಾದ; ಸ್ವರ್ಗವೇ ನಡುಗಿತು, ಜನ ರಕ್ಷಕನಿಗಾಗಿ ಮೊರೆಯಿಟ್ಟರು.",
      "ಆಗ ದೇವತೆಗಳು ತಮ್ಮ ಕ್ರೋಧವನ್ನೆಲ್ಲ ಒಂದೇ ಪ್ರಜ್ವಲ ಜ್ವಾಲೆಗೆ ಸುರಿದರು; ಅದರಿಂದ ಗರ್ಜಿಸುವ ಸಿಂಹವನ್ನೇರಿ, ಅನೇಕ ಕೈಗಳಲ್ಲಿ ಆಯುಧ ಮಿಂಚಿಸುತ್ತಾ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿ ಉದಯಿಸಿದಳು. ತನ್ನ ವರ ಹೆಣ್ಣಿನ ಬಗ್ಗೆ ಏನನ್ನೂ ಹೇಳಿಲ್ಲವೆಂಬುದನ್ನು ರಾಕ್ಷಸ ಮರೆತಿದ್ದ.",
      "ಒಂಬತ್ತು ಹಗಲು, ಒಂಬತ್ತು ರಾತ್ರಿ ದೇವಿ ಮತ್ತು ರೂಪ ಬದಲಿಸುವ ರಾಕ್ಷಸ ಬೆಟ್ಟಗಳ ಮೇಲೆ ಹೋರಾಡಿದರು. ಅವನು ಎಮ್ಮೆಯಾದ, ಸಿಂಹವಾದ, ರಾಕ್ಷಸಾಕಾರವಾದ — ಆದರೆ ಪ್ರತಿ ರೂಪದಲ್ಲೂ ಅವಳ ಖಡ್ಗ ಅವನನ್ನು ಹಿಂಬಾಲಿಸಿತು, ಬೆಟ್ಟಗಳು ಆ ಯುದ್ಧಕ್ಕೆ ನಡುಗಿದವು.",
      "ಹತ್ತನೆಯ ಮುಂಜಾವಿನಲ್ಲಿ, ಇಂದಿಗೂ ಅವನ ಹೆಸರನ್ನು ಹೊತ್ತ ಬೆಟ್ಟದ ಮೇಲೆ ಅವಳು ಅವನನ್ನು ಸಂಹರಿಸಿದಳು — 'ಮಹಿಷೂರು' ಕಾಲಕ್ರಮೇಣ 'ಮೈಸೂರು' ಆಯಿತು. ಕೃತಜ್ಞ ಜನ ಬೆಟ್ಟವೇರಿ, ಅವಳು ಗೆದ್ದು ನಿಂತ ಸ್ಥಳದಲ್ಲೇ ದೇವಾಲಯ ಕಟ್ಟಿದರು.",
      "ಇಂದಿಗೂ ಕೆಡುಕಿನ ಮೇಲೆ ಒಳಿತಿನ ಆ ಗೆಲುವನ್ನು ಬೆಳಕಿನ ಹಬ್ಬ ದಸರಾ ಆಗಿ ಮರುಜೀವಿಸಲಾಗುತ್ತದೆ. ಮೈಸೂರು ಲಕ್ಷಾಂತರ ದೀಪಗಳಿಂದ ಬೆಳಗುತ್ತದೆ, ದೇವಿಯನ್ನು ನಗರವೇ ಮರೆಯದ ಚಿನ್ನದ ಮೆರವಣಿಗೆಯಲ್ಲಿ ಬೀದಿಗಳಲ್ಲಿ ಕೊಂಡೊಯ್ಯಲಾಗುತ್ತದೆ.",
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
      "Kittur was a proud little kingdom in the red-earth country near Belagavi, rich in fields and loyal in heart. When its king died leaving no living son, a shadow fell over the land.",
      "The British East India Company saw their chance. Refusing to recognise the king's adopted heir, they invoked their cruel 'doctrine of lapse' and moved to swallow Kittur into their empire.",
      "But the kingdom had a queen. Rani Chennamma, trained from girlhood in horse-riding, sword-fighting and archery, refused to hand over her people's land. 'I will not bow,' she declared, and called her soldiers to arms.",
      "In 1824 her army met the Company in open battle and routed them. British officers were captured, their commander fell, and for one shining moment a Kannada queen had defeated the masters of an empire.",
      "She offered peace and freed her prisoners in good faith — but the Company broke its word, returned with a far greater force, and laid siege. Kittur fought to the last, yet the walls finally fell and the Rani was taken captive.",
      "Chennamma died a prisoner, but her courage refused to die with her. Her lieutenant Sangolli Rayanna carried the fight on, and decades before 1857 her name had become a battle-cry. Karnataka still remembers her as one of India's first warriors for freedom.",
    ],
    bodyKn: [
      "ಕಿತ್ತೂರು ಬೆಳಗಾವಿಯ ಬಳಿಯ ಕೆಂಪುಮಣ್ಣಿನ ನಾಡಿನ ಹೆಮ್ಮೆಯ ಪುಟ್ಟ ರಾಜ್ಯ — ಹೊಲಗಳಿಂದ ಸಮೃದ್ಧ, ಹೃದಯದಿಂದ ನಿಷ್ಠ. ಮಗನಿಲ್ಲದೆ ಅದರ ರಾಜ ತೀರಿಕೊಂಡಾಗ ನಾಡಿನ ಮೇಲೆ ಕಾರ್ಮೋಡ ಕವಿಯಿತು.",
      "ಬ್ರಿಟಿಷ್ ಈಸ್ಟ್ ಇಂಡಿಯಾ ಕಂಪನಿ ತನ್ನ ಅವಕಾಶ ಕಂಡಿತು. ರಾಜನ ದತ್ತುಪುತ್ರನನ್ನು ಒಪ್ಪದೆ, ತಮ್ಮ ಕ್ರೂರ 'ದತ್ತು ಮಕ್ಕಳಿಗೆ ಹಕ್ಕಿಲ್ಲ' ನೀತಿಯನ್ನು ಮುಂದಿಟ್ಟು ಕಿತ್ತೂರನ್ನು ತಮ್ಮ ಸಾಮ್ರಾಜ್ಯಕ್ಕೆ ನುಂಗಲು ಹೊರಟಿತು.",
      "ಆದರೆ ಆ ರಾಜ್ಯಕ್ಕೆ ಒಬ್ಬ ರಾಣಿಯಿದ್ದಳು. ಬಾಲ್ಯದಿಂದಲೇ ಕುದುರೆ ಸವಾರಿ, ಕತ್ತಿವರಸೆ ಮತ್ತು ಬಿಲ್ಲುವಿದ್ಯೆ ಕಲಿತಿದ್ದ ರಾಣಿ ಚೆನ್ನಮ್ಮ, ತನ್ನ ಜನರ ನೆಲವನ್ನು ಒಪ್ಪಿಸಲು ನಿರಾಕರಿಸಿದಳು. 'ನಾನು ಬಾಗುವುದಿಲ್ಲ' ಎಂದು ಸಾರಿ ಸೈನಿಕರನ್ನು ಆಯುಧಕ್ಕೆ ಕರೆದಳು.",
      "1824ರಲ್ಲಿ ಅವಳ ಸೈನ್ಯ ಕಂಪನಿಯನ್ನು ಬಯಲು ಯುದ್ಧದಲ್ಲಿ ಎದುರಿಸಿ ಸದೆಬಡಿಯಿತು. ಬ್ರಿಟಿಷ್ ಅಧಿಕಾರಿಗಳು ಸೆರೆಯಾದರು, ಅವರ ದಂಡನಾಯಕ ಮಡಿದ; ಒಂದು ಪ್ರಜ್ವಲ ಕ್ಷಣದಲ್ಲಿ ಕನ್ನಡದ ರಾಣಿ ಸಾಮ್ರಾಜ್ಯದ ಒಡೆಯರನ್ನೇ ಸೋಲಿಸಿದಳು.",
      "ಸದ್ಭಾವದಿಂದ ಶಾಂತಿ ನೀಡಿ ಸೆರೆಯಾಳುಗಳನ್ನು ಬಿಡುಗಡೆ ಮಾಡಿದಳು — ಆದರೆ ಕಂಪನಿ ಮಾತು ಮುರಿದು, ಬಹು ದೊಡ್ಡ ಸೈನ್ಯದೊಂದಿಗೆ ಮರಳಿ ಮುತ್ತಿಗೆ ಹಾಕಿತು. ಕಿತ್ತೂರು ಕೊನೆಯವರೆಗೂ ಹೋರಾಡಿತು, ಆದರೆ ಕೊನೆಗೆ ಗೋಡೆಗಳು ಬಿದ್ದು ರಾಣಿ ಸೆರೆಯಾದಳು.",
      "ಚೆನ್ನಮ್ಮ ಸೆರೆಯಲ್ಲೇ ಮಡಿದಳು, ಆದರೆ ಅವಳ ಧೈರ್ಯ ಅವಳೊಂದಿಗೆ ಮಡಿಯಲಿಲ್ಲ. ಅವಳ ಸೇನಾನಿ ಸಂಗೊಳ್ಳಿ ರಾಯಣ್ಣ ಹೋರಾಟ ಮುಂದುವರಿಸಿದ; 1857ಕ್ಕೂ ದಶಕಗಳ ಮೊದಲೇ ಅವಳ ಹೆಸರು ರಣಘೋಷವಾಯಿತು. ಭಾರತದ ಮೊದಲ ಸ್ವಾತಂತ್ರ್ಯ ಯೋಧೆಯರಲ್ಲಿ ಒಬ್ಬಳಾಗಿ ಕರ್ನಾಟಕ ಅವಳನ್ನು ಇಂದಿಗೂ ನೆನೆಯುತ್ತದೆ.",
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
      "The great fort of Chitradurga rose from a sea of giant boulders, ringed by seven walls of stone. For years it had defied every army — including the forces of Hyder Ali, who could not breach its gates.",
      "At last his scouts found a secret weakness: a narrow crevice in the rock wall, a 'kindi' just wide enough for one soldier to wriggle through at a time. Quietly, they planned to slip an army inside, one man after another.",
      "That afternoon Obavva, the wife of a fort guard, came to the crevice to fetch water while her husband rested for his meal. As she bent to the spring, she saw an enemy soldier squeezing through the gap, a dagger gripped in his teeth.",
      "She had no sword — only the heavy wooden pestle she used to husk grain, an 'onake'. As the first soldier emerged, she struck him down with a single silent blow, then dragged his body aside so the next would suspect nothing and climb in after him.",
      "One by one they came, and one by one she felled them, the pestle rising and falling without a sound. When her husband returned, he found her standing alone amid the fallen — the breach still held, the fort still safe.",
      "Onake Obavva asked for no reward and is remembered by no grand title — yet the very crevice she guarded is named after her to this day. Her wooden pestle became a symbol that ordinary courage, in one pair of hands, can guard an entire kingdom.",
    ],
    bodyKn: [
      "ಚಿತ್ರದುರ್ಗದ ಮಹಾಕೋಟೆ ದೈತ್ಯ ಬಂಡೆಗಳ ಸಾಗರದಿಂದ ಎದ್ದು, ಏಳು ಸುತ್ತಿನ ಕಲ್ಲಿನ ಗೋಡೆಗಳಿಂದ ಸುತ್ತುವರಿದಿತ್ತು. ವರ್ಷಗಟ್ಟಲೆ ಅದು ಪ್ರತಿ ಸೈನ್ಯವನ್ನೂ — ಹೆಬ್ಬಾಗಿಲನ್ನು ಭೇದಿಸಲಾಗದ ಹೈದರ್ ಅಲಿಯ ಪಡೆಯನ್ನೂ — ಧಿಕ್ಕರಿಸಿತ್ತು.",
      "ಕೊನೆಗೆ ಅವನ ಗೂಢಚಾರರಿಗೆ ಒಂದು ರಹಸ್ಯ ದೌರ್ಬಲ್ಯ ಸಿಕ್ಕಿತು: ಕಲ್ಲಿನ ಗೋಡೆಯಲ್ಲಿ ಒಂದು ಕಿರಿದಾದ ಸಂದಿ — ಒಮ್ಮೆಗೆ ಒಬ್ಬ ಸೈನಿಕ ಮಾತ್ರ ತೂರಿಕೊಳ್ಳುವಷ್ಟು ಅಗಲದ 'ಕಿಂಡಿ'. ಒಬ್ಬೊಬ್ಬರಾಗಿ ಇಡೀ ಸೈನ್ಯವನ್ನು ಒಳಗೆ ನುಗ್ಗಿಸಲು ಸದ್ದಿಲ್ಲದೆ ಯೋಜಿಸಿದರು.",
      "ಆ ಮಧ್ಯಾಹ್ನ ಕೋಟೆ ಕಾವಲುಗಾರನ ಹೆಂಡತಿ ಓಬವ್ವ, ಗಂಡ ಊಟಕ್ಕೆ ವಿಶ್ರಮಿಸುತ್ತಿದ್ದಾಗ ನೀರು ತರಲು ಆ ಸಂದಿಯ ಬಳಿಗೆ ಬಂದಳು. ಚಿಲುಮೆಗೆ ಬಾಗಿದಾಗ, ಬಾಯಲ್ಲಿ ಕಠಾರಿ ಹಿಡಿದು ಸಂದಿಯಿಂದ ತೂರುತ್ತಿದ್ದ ಶತ್ರು ಸೈನಿಕನನ್ನು ಕಂಡಳು.",
      "ಅವಳ ಬಳಿ ಕತ್ತಿಯಿರಲಿಲ್ಲ — ಧಾನ್ಯ ಕುಟ್ಟುವ ಭಾರವಾದ ಒನಕೆ ಮಾತ್ರ. ಮೊದಲ ಸೈನಿಕ ಹೊರಬರುತ್ತಿದ್ದಂತೆ ಒಂದೇ ಮೌನ ಪೆಟ್ಟಿನಿಂದ ಅವನನ್ನು ಉರುಳಿಸಿ, ಮುಂದಿನವನಿಗೆ ಸಂಶಯ ಬಾರದಂತೆ ಶವವನ್ನು ಪಕ್ಕಕ್ಕೆ ಎಳೆದಳು — ಅವನೂ ಒಳನುಗ್ಗಿ ಬರುವಂತೆ.",
      "ಒಬ್ಬೊಬ್ಬರಾಗಿ ಬಂದರು, ಒಬ್ಬೊಬ್ಬರಾಗಿ ಸದ್ದಿಲ್ಲದೆ ಒನಕೆ ಏರಿಳಿಯುತ್ತಾ ಅವಳು ಉರುಳಿಸಿದಳು. ಗಂಡ ಮರಳಿ ಬಂದಾಗ, ಬಿದ್ದ ಶವಗಳ ನಡುವೆ ಒಬ್ಬಂಟಿಯಾಗಿ ನಿಂತಿದ್ದ ಅವಳನ್ನು ಕಂಡ — ಸಂದಿ ಇನ್ನೂ ಕಾಯಲ್ಪಟ್ಟಿತ್ತು, ಕೋಟೆ ಇನ್ನೂ ಸುರಕ್ಷಿತವಾಗಿತ್ತು.",
      "ಒನಕೆ ಓಬವ್ವ ಯಾವ ಬಹುಮಾನವನ್ನೂ ಕೇಳಲಿಲ್ಲ, ಯಾವ ದೊಡ್ಡ ಬಿರುದೂ ಇಲ್ಲ — ಆದರೂ ಅವಳು ಕಾಯ್ದ ಆ ಸಂದಿಗೆ ಇಂದಿಗೂ ಅವಳದೇ ಹೆಸರು. ಅವಳ ಒನಕೆ, ಒಂದು ಜೋಡಿ ಕೈಗಳ ಸಾಮಾನ್ಯ ಧೈರ್ಯ ಇಡೀ ರಾಜ್ಯವನ್ನೇ ಕಾಯಬಲ್ಲದು ಎಂಬುದರ ಸಂಕೇತವಾಯಿತು.",
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
      "Bahubali and his elder brother Bharata were the sons of Rishabhanatha, the first Jain Tirthankara. When their father renounced the world, the brothers could not agree on who should rule, and their armies gathered for war.",
      "To spare countless lives, the wise men proposed a duel between the brothers alone. Bahubali, the mightier of the two, won every contest — and in the very instant of victory, his raised fist froze in the air.",
      "He looked at his defeated brother and saw, all at once, the emptiness of a crown bought with a loved one's shame. Without a word he opened his hand, laid down the kingdom he had just won, and walked alone into the forest.",
      "There he stood in meditation, as still as the rock beneath him, for so long that creepers climbed and flowered around his legs and anthills rose at his feet. He had set out to conquer a brother; now he sought to conquer himself.",
      "Centuries later, in the 10th century, the Ganga minister Chavundaraya beheld that vision and had it carved into a single block of granite atop Vindhyagiri hill — a 57-foot colossus, among the tallest free-standing monolithic statues on earth.",
      "Every twelve years, in the great Mahamastakabhisheka, pilgrims climb the hill to bathe the giant in milk, saffron, sandal and flowers. They come not to honour a king who won a kingdom, but a prince who chose to let one go.",
    ],
    bodyKn: [
      "ಬಾಹುಬಲಿ ಮತ್ತು ಅವನ ಅಣ್ಣ ಭರತ — ಮೊದಲ ಜೈನ ತೀರ್ಥಂಕರ ಋಷಭನಾಥನ ಮಕ್ಕಳು. ತಂದೆ ಲೌಕಿಕವನ್ನು ತ್ಯಜಿಸಿದಾಗ, ಯಾರು ಆಳಬೇಕೆಂದು ಸಹೋದರರಿಗೆ ಒಮ್ಮತವಾಗದೆ, ಯುದ್ಧಕ್ಕಾಗಿ ಸೈನ್ಯಗಳು ನೆರೆದವು.",
      "ಅಸಂಖ್ಯ ಜೀವಗಳನ್ನು ಉಳಿಸಲು, ಸಹೋದರರಿಬ್ಬರ ನಡುವೆ ಮಾತ್ರ ದ್ವಂದ್ವಯುದ್ಧ ನಡೆಯಲಿ ಎಂದು ಹಿರಿಯರು ಸೂಚಿಸಿದರು. ಇಬ್ಬರಲ್ಲಿ ಬಲಶಾಲಿಯಾದ ಬಾಹುಬಲಿ ಪ್ರತಿ ಸ್ಪರ್ಧೆಯನ್ನೂ ಗೆದ್ದ — ಗೆಲುವಿನ ಕ್ಷಣದಲ್ಲೇ ಎತ್ತಿದ ಮುಷ್ಟಿ ಗಾಳಿಯಲ್ಲೇ ಹೆಪ್ಪುಗಟ್ಟಿತು.",
      "ಸೋತ ತನ್ನ ಅಣ್ಣನನ್ನು ನೋಡಿ, ಪ್ರೀತಿಪಾತ್ರನ ಅವಮಾನದಿಂದ ಪಡೆದ ಕಿರೀಟದ ಶೂನ್ಯತೆಯನ್ನು ಇದ್ದಕ್ಕಿದ್ದಂತೆ ಕಂಡ. ಮಾತಿಲ್ಲದೆ ಮುಷ್ಟಿ ಬಿಚ್ಚಿ, ಆಗಷ್ಟೇ ಗೆದ್ದ ರಾಜ್ಯವನ್ನು ಕೆಳಗಿಟ್ಟು, ಒಬ್ಬಂಟಿಯಾಗಿ ಕಾಡಿಗೆ ನಡೆದ.",
      "ಅಲ್ಲಿ ಅವನು, ತನ್ನ ಕೆಳಗಿನ ಬಂಡೆಯಷ್ಟೇ ನಿಶ್ಚಲನಾಗಿ, ಎಷ್ಟು ಕಾಲ ಧ್ಯಾನದಲ್ಲಿ ನಿಂತನೆಂದರೆ ಬಳ್ಳಿಗಳು ಅವನ ಕಾಲ ಸುತ್ತ ಹಬ್ಬಿ ಹೂ ಬಿಟ್ಟವು, ಪಾದಗಳ ಬಳಿ ಹುತ್ತಗಳೆದ್ದವು. ಅಣ್ಣನನ್ನು ಗೆಲ್ಲಲು ಹೊರಟವನು ಈಗ ತನ್ನನ್ನೇ ಗೆಲ್ಲಲು ಹೊರಟ.",
      "ಶತಮಾನಗಳ ನಂತರ, 10ನೇ ಶತಮಾನದಲ್ಲಿ, ಗಂಗ ಮಂತ್ರಿ ಚಾವುಂಡರಾಯ ಆ ದರ್ಶನವನ್ನು ವಿಂಧ್ಯಗಿರಿ ಬೆಟ್ಟದ ಮೇಲೆ ಒಂದೇ ಗ್ರಾನೈಟ್ ಶಿಲೆಯಲ್ಲಿ ಕೆತ್ತಿಸಿದ — 57 ಅಡಿ ಎತ್ತರದ ಬೃಹನ್ಮೂರ್ತಿ, ಜಗತ್ತಿನ ಅತಿ ಎತ್ತರದ ಏಕಶಿಲಾ ಮೂರ್ತಿಗಳಲ್ಲಿ ಒಂದು.",
      "ಪ್ರತಿ ಹನ್ನೆರಡು ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಮಹಾಮಸ್ತಕಾಭಿಷೇಕದಲ್ಲಿ ಭಕ್ತರು ಬೆಟ್ಟವೇರಿ, ಆ ಬೃಹನ್ಮೂರ್ತಿಗೆ ಹಾಲು, ಕೇಸರಿ, ಶ್ರೀಗಂಧ ಮತ್ತು ಹೂವಿನ ಅಭಿಷೇಕ ಮಾಡುತ್ತಾರೆ. ರಾಜ್ಯ ಗೆದ್ದ ರಾಜನನ್ನಲ್ಲ, ರಾಜ್ಯವನ್ನೇ ಬಿಟ್ಟುಕೊಟ್ಟ ರಾಜಕುಮಾರನನ್ನು ಗೌರವಿಸಲು ಅವರು ಬರುತ್ತಾರೆ.",
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
      "In the village of Udutadi in present-day Shivamogga, a girl named Mahadevi was born. From the time she could speak, her heart belonged to Lord Chenna Mallikarjuna — the 'Lord white as jasmine' — whom she called her only true husband.",
      "To her, the divine was not a distant idol but a constant companion who walked beside her through every field and forest. The world's riches and titles meant nothing next to that inner presence.",
      "A king desired her and pressed her into marriage, but palace walls could not hold a soul already pledged elsewhere. Rejecting royal comfort and even the garments of pretence, she walked out of the palace and turned toward Kalyana.",
      "There stood the Anubhava Mantapa — the 'hall of spiritual experience' founded by Basavanna — where saints and seekers of every caste and gender debated truth as equals. A woman walking in alone, owning nothing, was a challenge to them all.",
      "The elders questioned her sharply, testing the depth of one who had renounced even clothing for her god. With words of luminous, fearless fire she answered them, and even the great Allama Prabhu bowed to her wisdom.",
      "Her vachanas — short, unrhymed poems in the everyday Kannada of farmers and weavers — still speak across nine centuries. They carry the voice of a soul that bowed to nothing in this world, and feared nothing, because it had already given itself wholly to love.",
    ],
    bodyKn: [
      "ಇಂದಿನ ಶಿವಮೊಗ್ಗದ ಉಡುತಡಿ ಎಂಬ ಹಳ್ಳಿಯಲ್ಲಿ ಮಹಾದೇವಿ ಎಂಬ ಹೆಣ್ಣುಮಗು ಜನಿಸಿತು. ಮಾತು ಬಂದಂದಿನಿಂದಲೇ ಅವಳ ಹೃದಯ ಚೆನ್ನಮಲ್ಲಿಕಾರ್ಜುನನಿಗೆ — 'ಮಲ್ಲಿಗೆಯಂತೆ ಬೆಳ್ಳಗಿನ ಒಡೆಯ'ನಿಗೆ — ಸೇರಿತ್ತು; ಅವನನ್ನೇ ತನ್ನ ಏಕೈಕ ನಿಜ ಗಂಡನೆಂದು ಕರೆದಳು.",
      "ಅವಳಿಗೆ ದೈವ ದೂರದ ವಿಗ್ರಹವಾಗಿರಲಿಲ್ಲ, ಪ್ರತಿ ಹೊಲ–ಕಾಡಿನಲ್ಲೂ ಜೊತೆ ನಡೆಯುವ ನಿತ್ಯ ಸಂಗಾತಿಯಾಗಿದ್ದ. ಆ ಒಳಗಿನ ಇರವಿನ ಮುಂದೆ ಜಗತ್ತಿನ ಸಿರಿ ಮತ್ತು ಬಿರುದುಗಳು ಏನೂ ಅಲ್ಲವಾಗಿದ್ದವು.",
      "ಒಬ್ಬ ರಾಜ ಅವಳನ್ನು ಬಯಸಿ ವಿವಾಹಕ್ಕೆ ಒತ್ತಾಯಿಸಿದ, ಆದರೆ ಈಗಾಗಲೇ ಬೇರೆಡೆ ಒಪ್ಪಿಸಿಕೊಂಡ ಆತ್ಮವನ್ನು ಅರಮನೆಯ ಗೋಡೆಗಳು ಹಿಡಿದಿಡಲಾಗಲಿಲ್ಲ. ರಾಜಸುಖವನ್ನೂ, ಆಡಂಬರದ ಉಡುಪನ್ನೂ ತಿರಸ್ಕರಿಸಿ, ಅರಮನೆಯಿಂದ ಹೊರನಡೆದು ಕಲ್ಯಾಣದತ್ತ ತಿರುಗಿದಳು.",
      "ಅಲ್ಲಿ ಬಸವಣ್ಣ ಸ್ಥಾಪಿಸಿದ ಅನುಭವ ಮಂಟಪವಿತ್ತು — ಎಲ್ಲ ಜಾತಿ, ಲಿಂಗದ ಶರಣರು ಮತ್ತು ಸಾಧಕರು ಸತ್ಯವನ್ನು ಸಮಾನರಾಗಿ ಚರ್ಚಿಸುವ 'ಆಧ್ಯಾತ್ಮಿಕ ಅನುಭವದ ಸಭೆ'. ಏನೂ ಇಲ್ಲದೆ ಒಬ್ಬಂಟಿಯಾಗಿ ಒಳಬಂದ ಹೆಣ್ಣು ಅವರೆಲ್ಲರಿಗೂ ಒಂದು ಸವಾಲಾಗಿದ್ದಳು.",
      "ತನ್ನ ದೇವನಿಗಾಗಿ ಉಡುಪನ್ನೂ ತೊರೆದ ಅವಳ ಆಳವನ್ನು ಪರೀಕ್ಷಿಸುತ್ತಾ ಹಿರಿಯರು ಹರಿತವಾಗಿ ಪ್ರಶ್ನಿಸಿದರು. ತೇಜೋಮಯ, ನಿರ್ಭೀತ ಬೆಂಕಿಯ ಮಾತುಗಳಿಂದ ಅವಳು ಉತ್ತರಿಸಿದಳು; ಮಹಾನ್ ಅಲ್ಲಮಪ್ರಭು ಸಹ ಅವಳ ಜ್ಞಾನಕ್ಕೆ ತಲೆಬಾಗಿದ.",
      "ರೈತರ, ನೇಕಾರರ ದಿನನಿತ್ಯದ ಕನ್ನಡದಲ್ಲಿ ರಚಿಸಿದ ಅವಳ ಸಣ್ಣ, ಪ್ರಾಸವಿಲ್ಲದ ವಚನಗಳು — ಒಂಬತ್ತು ಶತಮಾನಗಳ ನಂತರವೂ ಮಾತನಾಡುತ್ತವೆ. ಪ್ರೀತಿಗೆ ತನ್ನನ್ನೇ ಸಂಪೂರ್ಣ ಒಪ್ಪಿಸಿದ್ದರಿಂದ ಈ ಜಗತ್ತಿನ ಯಾವುದಕ್ಕೂ ಬಾಗದ, ಯಾವುದಕ್ಕೂ ಹೆದರದ ಆತ್ಮದ ದನಿಯನ್ನು ಅವು ಹೊತ್ತಿವೆ.",
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
      "On the banks of the Kaveri once stood Talakadu, a glittering town crowned with more than thirty temples, where bells rang at dawn and the river ran bright past the shrines.",
      "As the power of the Vijayanagara empire faded, the Wodeyars of Mysuru rose to take its place, and the rich lands around Srirangapatna passed from hand to hand in war and intrigue.",
      "Legend tells of Alamelamma, widow of a fallen chief, who guarded her family's sacred jewels. When the Mysuru court sent soldiers to seize them, she fled to the edge of the Kaveri rather than surrender her trust.",
      "There, with the river roaring below, she flung the jewels and herself into the water — but not before she turned and uttered a threefold curse that would echo for centuries.",
      "'May Talakadu turn to barren sand; may Malangi become a deathless whirlpool; may the kings of Mysuru never bear an heir.' And it is said all three came strangely true — drifting dunes swallowed the temples, the river spun deep and dangerous at Malangi, and heir after heir eluded the throne.",
      "Whether history or folktale, the half-buried shrines of Talakadu — uncovered for only a few days during a rare festival held once in years — still draw pilgrims and wonderers alike, reminding each of them how thin the line is between fact and legend.",
    ],
    bodyKn: [
      "ಕಾವೇರಿಯ ದಂಡೆಯಲ್ಲಿ ಒಮ್ಮೆ ತಲಕಾಡು ಇತ್ತು — ಮೂವತ್ತಕ್ಕೂ ಹೆಚ್ಚು ದೇವಾಲಯಗಳಿಂದ ಕಂಗೊಳಿಸುತ್ತಿದ್ದ ಹೊಳೆಯುವ ನಗರ; ಮುಂಜಾವಿನಲ್ಲಿ ಗಂಟೆಗಳು ಮೊಳಗುತ್ತಿದ್ದವು, ಗುಡಿಗಳ ಪಕ್ಕ ನದಿ ತಿಳಿಯಾಗಿ ಹರಿಯುತ್ತಿತ್ತು.",
      "ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ಶಕ್ತಿ ಮಸುಕಾಗುತ್ತಿದ್ದಂತೆ, ಅದರ ಸ್ಥಾನ ತುಂಬಲು ಮೈಸೂರಿನ ಒಡೆಯರ್ ವಂಶ ಬೆಳೆಯಿತು; ಶ್ರೀರಂಗಪಟ್ಟಣದ ಸುತ್ತಿನ ಸಮೃದ್ಧ ನೆಲ ಯುದ್ಧ ಮತ್ತು ಒಳಸಂಚುಗಳಲ್ಲಿ ಕೈ ಬದಲಾಯಿತು.",
      "ಸೋತ ನಾಯಕನ ವಿಧವೆ ಅಲಮೇಲಮ್ಮ ತನ್ನ ಕುಟುಂಬದ ಪವಿತ್ರ ಆಭರಣಗಳನ್ನು ಕಾಯುತ್ತಿದ್ದಳೆಂದು ದಂತಕಥೆ ಹೇಳುತ್ತದೆ. ಅವುಗಳನ್ನು ವಶಪಡಿಸಿಕೊಳ್ಳಲು ಮೈಸೂರು ಆಸ್ಥಾನ ಸೈನಿಕರನ್ನು ಕಳಿಸಿದಾಗ, ತನ್ನ ನಂಬಿಕೆಯನ್ನು ಒಪ್ಪಿಸುವ ಬದಲು ಕಾವೇರಿಯ ಅಂಚಿಗೆ ಓಡಿದಳು.",
      "ಕೆಳಗೆ ನದಿ ಭೋರ್ಗರೆಯುತ್ತಿದ್ದಂತೆ, ಆಭರಣಗಳನ್ನೂ ತನ್ನನ್ನೂ ನೀರಿಗೆ ಎಸೆದಳು — ಆದರೆ ಮೊದಲು ತಿರುಗಿ, ಶತಮಾನಗಳ ಕಾಲ ಪ್ರತಿಧ್ವನಿಸುವ ಮೂರು ಪಟ್ಟಿನ ಶಾಪವಿಟ್ಟಳು.",
      "'ತಲಕಾಡು ಬರಡು ಮರಳಾಗಲಿ; ಮಾಲಂಗಿ ಸಾವಿರದ ಸುಳಿಯಾಗಲಿ; ಮೈಸೂರು ಅರಸರಿಗೆ ವಂಶೋದ್ಧಾರಕ ಮಗನಾಗದಿರಲಿ.' ಮೂರೂ ವಿಚಿತ್ರವಾಗಿ ನಿಜವಾದವೆಂದು ಹೇಳುತ್ತಾರೆ — ಚಲಿಸುವ ಮರಳ ದಿಬ್ಬಗಳು ದೇವಾಲಯಗಳನ್ನು ನುಂಗಿದವು, ಮಾಲಂಗಿಯಲ್ಲಿ ನದಿ ಆಳವಾಗಿ ಅಪಾಯಕಾರಿಯಾಗಿ ಸುತ್ತಿತು, ಒಬ್ಬೊಬ್ಬ ವಾರಸುದಾರನೂ ಸಿಂಹಾಸನದಿಂದ ತಪ್ಪಿಸಿಕೊಂಡ.",
      "ಇತಿಹಾಸವೋ ಜಾನಪದವೋ — ವರ್ಷಗಳಿಗೊಮ್ಮೆ ನಡೆಯುವ ಅಪರೂಪದ ಉತ್ಸವದಲ್ಲಿ ಕೆಲವೇ ದಿನ ಬಯಲಾಗುವ ತಲಕಾಡಿನ ಅರೆ-ಹೂತ ಗುಡಿಗಳು, ಇಂದಿಗೂ ಭಕ್ತರನ್ನೂ ಕುತೂಹಲಿಗಳನ್ನೂ ಸೆಳೆಯುತ್ತವೆ — ಸತ್ಯ ಮತ್ತು ದಂತಕಥೆಯ ನಡುವಿನ ಗೆರೆ ಎಷ್ಟು ತೆಳುವೆಂದು ನೆನಪಿಸುತ್ತವೆ.",
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
      "Among the golden boulders of Hampi flows the river Tungabhadra, known in the old texts as Pampa, daughter of Brahma. From her sacred name came 'Pampa-kshetra', which the centuries wore down into the single word 'Hampi'.",
      "Tradition holds that this rugged land of caves and crags is Kishkindha, the monkey kingdom of the Ramayana. Here, they say, Lord Rama met Hanuman and Sugriva and forged the alliance that would one day rescue Sita.",
      "Centuries later, two brothers — Hakka and Bukka — founded a new empire upon these rocks. From a small beginning grew Vijayanagara, the 'City of Victory', whose kings would rule much of southern India.",
      "Around the towering Virupaksha temple bloomed one of the richest cities the medieval world had ever seen. Travellers wrote in astonishment of bazaars where diamonds, pearls and rubies were heaped and sold by the measure.",
      "The empire's artisans carved wonders that still stand: a chariot hewn from a single stone, slender pillars that ring like music when struck, and palaces where queens once watched the elephants pass.",
      "In 1565 the city fell to a confederacy of sultans and was abandoned to the rocks. Today its temples and ruins sprawl across the boulders as a UNESCO World Heritage Site — a vast horizon where myth and history have become one stone.",
    ],
    bodyKn: [
      "ಹಂಪಿಯ ಚಿನ್ನದ ಬಣ್ಣದ ಬಂಡೆಗಳ ನಡುವೆ ತುಂಗಭದ್ರಾ ನದಿ ಹರಿಯುತ್ತದೆ; ಹಳೆಯ ಗ್ರಂಥಗಳಲ್ಲಿ ಇದನ್ನು ಬ್ರಹ್ಮನ ಮಗಳು ಪಂಪಾ ಎನ್ನುತ್ತಾರೆ. ಅವಳ ಪವಿತ್ರ ಹೆಸರಿನಿಂದ 'ಪಂಪಾ-ಕ್ಷೇತ್ರ', ಶತಮಾನಗಳಲ್ಲಿ ಸವೆದು 'ಹಂಪಿ' ಎಂಬ ಒಂದೇ ಪದವಾಯಿತು.",
      "ಗುಹೆ ಮತ್ತು ಬಂಡೆಗಳ ಈ ಒರಟು ನೆಲವೇ ರಾಮಾಯಣದ ವಾನರ ರಾಜ್ಯ ಕಿಷ್ಕಿಂಧೆ ಎಂದು ಸಂಪ್ರದಾಯ ಹೇಳುತ್ತದೆ. ಇಲ್ಲಿಯೇ ರಾಮ ಹನುಮಂತ ಮತ್ತು ಸುಗ್ರೀವರನ್ನು ಭೇಟಿಯಾಗಿ, ಮುಂದೊಂದು ದಿನ ಸೀತೆಯನ್ನು ಬಿಡಿಸುವ ಮೈತ್ರಿಯನ್ನು ಬೆಸೆದನೆಂದು ಹೇಳುತ್ತಾರೆ.",
      "ಶತಮಾನಗಳ ನಂತರ, ಹಕ್ಕ ಮತ್ತು ಬುಕ್ಕ ಎಂಬ ಇಬ್ಬರು ಸಹೋದರರು ಈ ಬಂಡೆಗಳ ಮೇಲೆ ಹೊಸ ಸಾಮ್ರಾಜ್ಯ ಸ್ಥಾಪಿಸಿದರು. ಪುಟ್ಟ ಆರಂಭದಿಂದ ವಿಜಯನಗರ — 'ಗೆಲುವಿನ ನಗರ' — ಬೆಳೆಯಿತು; ಅದರ ಅರಸರು ದಕ್ಷಿಣ ಭಾರತದ ಬಹುಭಾಗವನ್ನು ಆಳಿದರು.",
      "ಎತ್ತರದ ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯದ ಸುತ್ತ ಮಧ್ಯಕಾಲೀನ ಜಗತ್ತು ಕಂಡ ಅತ್ಯಂತ ಶ್ರೀಮಂತ ನಗರಗಳಲ್ಲಿ ಒಂದು ಅರಳಿತು. ವಜ್ರ, ಮುತ್ತು, ಮಾಣಿಕ್ಯಗಳನ್ನು ರಾಶಿ ಹಾಕಿ ಅಳೆದು ಮಾರುತ್ತಿದ್ದ ಪೇಟೆಗಳನ್ನು ಕಂಡು ಪ್ರವಾಸಿಗರು ಬೆರಗಿನಿಂದ ಬರೆದಿಟ್ಟರು.",
      "ಸಾಮ್ರಾಜ್ಯದ ಶಿಲ್ಪಿಗಳು ಇಂದಿಗೂ ನಿಂತಿರುವ ಅದ್ಭುತಗಳನ್ನು ಕೆತ್ತಿದರು: ಒಂದೇ ಕಲ್ಲಿನಿಂದ ಕೆತ್ತಿದ ರಥ, ತಟ್ಟಿದರೆ ಸಂಗೀತದಂತೆ ನಿನಾದಿಸುವ ತೆಳುಕಂಬಗಳು, ಮತ್ತು ರಾಣಿಯರು ಆನೆಗಳ ಮೆರವಣಿಗೆ ನೋಡುತ್ತಿದ್ದ ಅರಮನೆಗಳು.",
      "1565ರಲ್ಲಿ ಸುಲ್ತಾನರ ಒಕ್ಕೂಟಕ್ಕೆ ನಗರ ಬಿದ್ದು ಬಂಡೆಗಳ ನಡುವೆ ಪಾಳುಬಿತ್ತು. ಇಂದು ಅದರ ದೇವಾಲಯಗಳು ಮತ್ತು ಪಳೆಯುಳಿಕೆಗಳು ಯುನೆಸ್ಕೋ ವಿಶ್ವ ಪರಂಪರೆ ತಾಣವಾಗಿ ಬಂಡೆಗಳ ಮೇಲೆ ಹರಡಿವೆ — ಪುರಾಣ ಮತ್ತು ಇತಿಹಾಸ ಒಂದೇ ಕಲ್ಲಾಗಿರುವ ವಿಶಾಲ ದಿಗಂತ.",
    ],
    moralEn: "Some places hold so many stories that legend and history become one stone.",
    moralKn: "ಕೆಲವು ಸ್ಥಳಗಳು ಎಷ್ಟು ಕಥೆಗಳನ್ನು ಹೊತ್ತಿರುತ್ತವೆಂದರೆ ದಂತಕಥೆ ಮತ್ತು ಇತಿಹಾಸ ಒಂದೇ ಕಲ್ಲಾಗುತ್ತವೆ.",
  },
];
