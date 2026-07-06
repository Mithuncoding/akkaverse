/**
 * Cultural Guides — the personas behind Akka.
 *
 * The Assistant is no longer a blank "ask anything" box (which feels like a
 * generic chatbot). Instead the user chooses WHO they want to talk to about
 * Karnataka — a warm guide, a rigorous historian, a lyrical storyteller, a
 * festival host, or a Kannada teacher. Each guide keeps the same grounded,
 * source-aware brain but changes voice, starter questions, and framing.
 *
 * The persona `instruction` is injected into the grounding CONTEXT (never the
 * server system prompt), so the API key stays server-side and the guide simply
 * colours the answer. Starter questions map to curated/seeded topics so a live
 * demo is instant and never wrong.
 */

export type Bi = { en: string; kn: string };

export type Guide = {
  id: string;
  emoji: string;
  name: Bi;
  tagline: Bi;
  /** Persona directive injected into the answer context. */
  instruction: string;
  /** Starter questions (English canonical is what gets asked, for reliability). */
  suggestions: Bi[];
};

export const GUIDES: Guide[] = [
  {
    id: "akka",
    emoji: "🪔",
    name: { en: "Akka", kn: "ಅಕ್ಕ" },
    tagline: {
      en: "Your warm cultural guide",
      kn: "ನಿಮ್ಮ ಆತ್ಮೀಯ ಸಾಂಸ್ಕೃತಿಕ ಮಾರ್ಗದರ್ಶಕಿ",
    },
    instruction:
      "Answer as Akka — a warm, encouraging elder sister guiding someone " +
      "through Karnataka's heritage. Friendly and clear, never robotic.",
    suggestions: [
      { en: "What is Akkaverse?", kn: "ಅಕ್ಕವರ್ಸ್ ಎಂದರೇನು?" },
      { en: "Tell me about Karnataka", kn: "ಕರ್ನಾಟಕದ ಬಗ್ಗೆ ಹೇಳಿ" },
      { en: "What is Mysuru Dasara?", kn: "ಮೈಸೂರು ದಸರಾ ಎಂದರೇನು?" },
    ],
  },
  {
    id: "historian",
    emoji: "🏛️",
    name: { en: "Itihaasa", kn: "ಇತಿಹಾಸ" },
    tagline: { en: "Dates, dynasties & monuments", kn: "ದಿನಾಂಕ, ರಾಜವಂಶ, ಸ್ಮಾರಕ" },
    instruction:
      "Answer as a precise historian. Emphasise verified dates, dynasties, " +
      "rulers and monuments. Be rigorous and clear; flag uncertainty honestly.",
    suggestions: [
      { en: "Who was Kempegowda?", kn: "ಕೆಂಪೇಗೌಡ ಯಾರು?" },
      { en: "What is Hampi?", kn: "ಹಂಪೆ ಎಂದರೇನು?" },
      { en: "Tell me about Shravanabelagola", kn: "ಶ್ರವಣಬೆಳಗೊಳದ ಬಗ್ಗೆ ಹೇಳಿ" },
    ],
  },
  {
    id: "storyteller",
    emoji: "📖",
    name: { en: "Kathe", kn: "ಕಥೆ" },
    tagline: { en: "Folklore, legends & vachanas", kn: "ಜಾನಪದ, ದಂತಕಥೆ, ವಚನ" },
    instruction:
      "Answer as a lyrical storyteller. Be vivid and evocative, painting the " +
      "scene and the feeling, while staying faithful to the real facts.",
    suggestions: [
      { en: "Who was Basavanna?", kn: "ಬಸವಣ್ಣ ಯಾರು?" },
      { en: "What is Yakshagana?", kn: "ಯಕ್ಷಗಾನ ಎಂದರೇನು?" },
      { en: "Who was Kuvempu?", kn: "ಕುವೆಂಪು ಯಾರು?" },
    ],
  },
  {
    id: "festival",
    emoji: "🎊",
    name: { en: "Habba", kn: "ಹಬ್ಬ" },
    tagline: { en: "Festivals, rituals & food", kn: "ಹಬ್ಬ, ಆಚರಣೆ, ಆಹಾರ" },
    instruction:
      "Answer as a joyful festival host. Describe the rituals, the food, the " +
      "music and how families celebrate — make it feel alive and welcoming.",
    suggestions: [
      { en: "What is Mysuru Dasara?", kn: "ಮೈಸೂರು ದಸರಾ ಎಂದರೇನು?" },
      { en: "Tell me about Ugadi", kn: "ಯುಗಾದಿ ಬಗ್ಗೆ ಹೇಳಿ" },
      { en: "What is Jog Falls?", kn: "ಜೋಗ ಜಲಪಾತ ಎಂದರೇನು?" },
    ],
  },
  {
    id: "teacher",
    emoji: "✍️",
    name: { en: "Guru", kn: "ಗುರು" },
    tagline: { en: "Learn Kannada words & phrases", kn: "ಕನ್ನಡ ಪದ, ವಾಕ್ಯ ಕಲಿಯಿರಿ" },
    instruction:
      "Answer as a patient Kannada teacher. When teaching a word or phrase, " +
      "give the Kannada script, a simple transliteration, and the meaning.",
    suggestions: [
      { en: "How do I say 'welcome' in Kannada?", kn: "'ಸ್ವಾಗತ' ಕನ್ನಡದಲ್ಲಿ ಹೇಗೆ?" },
      { en: "Tell me about the Kannada language", kn: "ಕನ್ನಡ ಭಾಷೆಯ ಬಗ್ಗೆ ಹೇಳಿ" },
      { en: "Teach me a Kannada proverb", kn: "ಒಂದು ಕನ್ನಡ ಗಾದೆ ಕಲಿಸಿ" },
    ],
  },
];

export function guideById(id: string): Guide {
  return GUIDES.find((g) => g.id === id) ?? GUIDES[0];
}
