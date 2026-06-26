/**
 * Quiz question bank (bilingual, multi-topic, multi-difficulty).
 *
 * Drives the AI Quiz Generator. Questions are tagged by topic + difficulty so
 * the generator can assemble a quiz on demand. Each question stores the index
 * of the correct option. English and Kannada variants live side by side so the
 * quiz instantly localizes with the global language toggle.
 */

export type QuizTopic = "History" | "Culture" | "Geography" | "Language";
export type Difficulty = "Easy" | "Medium" | "Hard";

export type QuizQuestion = {
  id: string;
  topic: QuizTopic;
  difficulty: Difficulty;
  en: { q: string; options: string[] };
  kn: { q: string; options: string[] };
  /** Index into `options` (same order in both languages). */
  answer: number;
};

export const QUIZ_TOPICS: QuizTopic[] = ["History", "Culture", "Geography", "Language"];
export const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

export const questionBank: QuizQuestion[] = [
  {
    id: "q-hampi",
    topic: "History",
    difficulty: "Easy",
    en: {
      q: "Hampi was the capital of which empire?",
      options: ["Vijayanagara", "Maurya", "Gupta", "Chola"],
    },
    kn: {
      q: "ಹಂಪಿ ಯಾವ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು?",
      options: ["ವಿಜಯನಗರ", "ಮೌರ್ಯ", "ಗುಪ್ತ", "ಚೋಳ"],
    },
    answer: 0,
  },
  {
    id: "q-krishnadevaraya",
    topic: "History",
    difficulty: "Medium",
    en: {
      q: "Which ruler led Vijayanagara to its golden age?",
      options: ["Krishnadevaraya", "Tipu Sultan", "Pulakeshin II", "Mayurasharma"],
    },
    kn: {
      q: "ವಿಜಯನಗರವನ್ನು ಸುವರ್ಣಯುಗಕ್ಕೆ ಕೊಂಡೊಯ್ದ ಅರಸ ಯಾರು?",
      options: ["ಕೃಷ್ಣದೇವರಾಯ", "ಟಿಪ್ಪು ಸುಲ್ತಾನ್", "ಎರಡನೇ ಪುಲಕೇಶಿ", "ಮಯೂರಶರ್ಮ"],
    },
    answer: 0,
  },
  {
    id: "q-talikota",
    topic: "History",
    difficulty: "Hard",
    en: {
      q: "In which year was the Battle of Talikota fought?",
      options: ["1565", "1336", "1799", "1947"],
    },
    kn: {
      q: "ತಾಳಿಕೋಟೆ ಯುದ್ಧ ಯಾವ ವರ್ಷ ನಡೆಯಿತು?",
      options: ["1565", "1336", "1799", "1947"],
    },
    answer: 0,
  },
  {
    id: "q-basavanna",
    topic: "Culture",
    difficulty: "Easy",
    en: {
      q: "Basavanna is associated with which literary form?",
      options: ["Vachana", "Haiku", "Sonnet", "Ghazal"],
    },
    kn: {
      q: "ಬಸವಣ್ಣ ಯಾವ ಸಾಹಿತ್ಯ ಪ್ರಕಾರಕ್ಕೆ ಸಂಬಂಧಿಸಿದ್ದಾರೆ?",
      options: ["ವಚನ", "ಹೈಕು", "ಸಾನೆಟ್", "ಗಜಲ್"],
    },
    answer: 0,
  },
  {
    id: "q-yakshagana",
    topic: "Culture",
    difficulty: "Medium",
    en: {
      q: "Yakshagana is a traditional form of what?",
      options: ["Theatre", "Painting", "Pottery", "Weaving"],
    },
    kn: {
      q: "ಯಕ್ಷಗಾನ ಯಾವುದರ ಸಾಂಪ್ರದಾಯಿಕ ಪ್ರಕಾರ?",
      options: ["ರಂಗಭೂಮಿ", "ಚಿತ್ರಕಲೆ", "ಮಡಕೆ", "ನೇಯ್ಗೆ"],
    },
    answer: 0,
  },
  {
    id: "q-dasara",
    topic: "Culture",
    difficulty: "Easy",
    en: {
      q: "Which city is famous for its grand Dasara festival?",
      options: ["Mysuru", "Bengaluru", "Mangaluru", "Hubballi"],
    },
    kn: {
      q: "ಭವ್ಯ ದಸರಾ ಹಬ್ಬಕ್ಕೆ ಯಾವ ನಗರ ಪ್ರಸಿದ್ಧ?",
      options: ["ಮೈಸೂರು", "ಬೆಂಗಳೂರು", "ಮಂಗಳೂರು", "ಹುಬ್ಬಳ್ಳಿ"],
    },
    answer: 0,
  },
  {
    id: "q-capital",
    topic: "Geography",
    difficulty: "Easy",
    en: {
      q: "What is the capital of Karnataka?",
      options: ["Bengaluru", "Mysuru", "Hampi", "Belur"],
    },
    kn: {
      q: "ಕರ್ನಾಟಕದ ರಾಜಧಾನಿ ಯಾವುದು?",
      options: ["ಬೆಂಗಳೂರು", "ಮೈಸೂರು", "ಹಂಪಿ", "ಬೇಲೂರು"],
    },
    answer: 0,
  },
  {
    id: "q-river",
    topic: "Geography",
    difficulty: "Medium",
    en: {
      q: "Which river is considered the lifeline of southern Karnataka?",
      options: ["Kaveri", "Ganga", "Yamuna", "Godavari"],
    },
    kn: {
      q: "ದಕ್ಷಿಣ ಕರ್ನಾಟಕದ ಜೀವನಾಡಿ ಎಂದು ಪರಿಗಣಿಸಲಾದ ನದಿ ಯಾವುದು?",
      options: ["ಕಾವೇರಿ", "ಗಂಗಾ", "ಯಮುನಾ", "ಗೋದಾವರಿ"],
    },
    answer: 0,
  },
  {
    id: "q-jog",
    topic: "Geography",
    difficulty: "Hard",
    en: {
      q: "Jog Falls is formed by which river?",
      options: ["Sharavathi", "Kaveri", "Tungabhadra", "Krishna"],
    },
    kn: {
      q: "ಜೋಗ ಜಲಪಾತ ಯಾವ ನದಿಯಿಂದ ರೂಪುಗೊಂಡಿದೆ?",
      options: ["ಶರಾವತಿ", "ಕಾವೇರಿ", "ತುಂಗಭದ್ರಾ", "ಕೃಷ್ಣಾ"],
    },
    answer: 0,
  },
  {
    id: "q-script",
    topic: "Language",
    difficulty: "Easy",
    en: {
      q: "How many Jnanpith Awards has Kannada literature won?",
      options: ["8", "2", "5", "11"],
    },
    kn: {
      q: "ಕನ್ನಡ ಸಾಹಿತ್ಯ ಎಷ್ಟು ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿಗಳನ್ನು ಗೆದ್ದಿದೆ?",
      options: ["8", "2", "5", "11"],
    },
    answer: 0,
  },
  {
    id: "q-kavirajamarga",
    topic: "Language",
    difficulty: "Hard",
    en: {
      q: "Kavirajamarga, the earliest Kannada literary work, was written under which dynasty?",
      options: ["Rashtrakuta", "Hoysala", "Kadamba", "Wodeyar"],
    },
    kn: {
      q: "ಮೊದಲ ಕನ್ನಡ ಸಾಹಿತ್ಯ ಕೃತಿ 'ಕವಿರಾಜಮಾರ್ಗ' ಯಾವ ರಾಜವಂಶದ ಕಾಲದಲ್ಲಿ ರಚಿತವಾಯಿತು?",
      options: ["ರಾಷ್ಟ್ರಕೂಟ", "ಹೊಯ್ಸಳ", "ಕದಂಬ", "ಒಡೆಯರ್"],
    },
    answer: 0,
  },
  {
    id: "q-belur",
    topic: "History",
    difficulty: "Medium",
    en: {
      q: "The Chennakeshava Temple at Belur was built by which dynasty?",
      options: ["Hoysala", "Chalukya", "Vijayanagara", "Maurya"],
    },
    kn: {
      q: "ಬೇಲೂರಿನ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯವನ್ನು ಯಾವ ರಾಜವಂಶ ಕಟ್ಟಿಸಿತು?",
      options: ["ಹೊಯ್ಸಳ", "ಚಾಲುಕ್ಯ", "ವಿಜಯನಗರ", "ಮೌರ್ಯ"],
    },
    answer: 0,
  },
];

/** Build a quiz: filter by topic/difficulty, shuffle, and cap the count. */
export function generateQuiz(
  topic: QuizTopic | "All",
  difficulty: Difficulty | "All",
  count = 5,
): QuizQuestion[] {
  const pool = questionBank.filter(
    (q) =>
      (topic === "All" || q.topic === topic) &&
      (difficulty === "All" || q.difficulty === difficulty),
  );
  // Fisher–Yates shuffle for fair randomness.
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}
