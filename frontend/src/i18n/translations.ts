/**
 * Akkaverse bilingual dictionary (English ⇄ ಕನ್ನಡ).
 *
 * We use FLAT, dot-namespaced keys (e.g. "home.heroTitle") stored as plain
 * string maps. Why flat instead of a heavy i18n library?
 *   - Zero runtime dependency, tiny bundle — important for a fast demo.
 *   - Fully type-safe and trivial to look up.
 *   - Kannada falls back to English automatically if a key is missing,
 *     so the UI never shows a broken/empty string.
 *
 * `t(key)` resolves: current locale -> English fallback -> the key itself.
 */

export type Locale = "en" | "kn" | "both";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "en", label: "English", short: "EN" },
  { code: "kn", label: "ಕನ್ನಡ", short: "ಕ" },
  { code: "both", label: "Both", short: "EN+ಕ" },
];

type Dict = Record<string, string>;

const en: Dict = {
  // ---- brand / nav ----
  "brand.tagline": "The living universe of Kannada heritage.",
  "nav.assistant": "Assistant",
  "nav.learn": "Learn",
  "nav.explore": "Explore",
  "nav.festivals": "Festivals",
  "nav.stories": "Stories",
  "nav.timeline": "Timeline",
  "nav.quiz": "Quiz",
  "nav.about": "Our Story",
  "common.getStarted": "Get started",
  "common.soon": "Soon",
  "common.all": "All",
  "common.backHome": "Back to home",
  "common.listen": "Listen",

  // ---- home ----
  "home.badge": "Preserving Kannada heritage with AI",
  "home.heroPre": "The living universe of",
  "home.heroHighlight": "Kannada heritage",
  "home.heroPost": "",
  "home.heroSubtitle":
    "An AI platform to preserve and teach Kannada language, history, culture, literature, festivals, temples, and folklore — grounded in real sources.",
  "home.ctaAsk": "Ask the Assistant",
  "home.ctaLearn": "Start learning Kannada",
  "home.featuresTitle": "Everything Karnataka, in one place",
  "home.featuresSubtitle":
    "Grounded in real sources — not invented. Built for learners, travellers, and the curious.",
  "home.ctaSectionTitle": "ಕನ್ನಡ ಕಲಿಯೋಣ — let's learn Kannada together.",
  "home.ctaSectionText":
    "Akkaverse grows one feature at a time. Explore the heritage timeline, learn the alphabet, and discover Karnataka.",
  "home.ctaSectionBtn": "Explore the timeline",
  "home.footerTagline": "Built with ♥ for Karnataka.",

  // ---- features ----
  "feature.assistant.title": "Kannada AI Assistant",
  "feature.assistant.desc":
    "Ask anything about Karnataka's history, temples, and culture — answered with citations.",
  "feature.learn.title": "Learn Kannada",
  "feature.learn.desc":
    "Structured lessons from alphabet to fluency, with quizzes, flashcards, and progress tracking.",
  "feature.stories.title": "AI Storytelling",
  "feature.stories.desc":
    "Karnataka's folktales and legends — Punyakoti, Bahubali, Rani Chennamma and more, read aloud.",
  "feature.explore.title": "Karnataka Explorer",
  "feature.explore.desc":
    "Districts, temples, UNESCO sites, dynasties, and food — with maps and timelines.",
  "feature.festivals.title": "Festival Calendar",
  "feature.festivals.desc":
    "Karnataka's festivals month by month — with live photos, read-aloud and the stories behind them.",
  "feature.timeline.title": "Heritage Timeline",
  "feature.timeline.desc":
    "A beautiful, interactive walk through 2,000 years of Karnataka history.",
  "feature.quiz.title": "AI Quiz Generator",
  "feature.quiz.desc":
    "Generate quizzes by topic and difficulty, track your score, and top the leaderboard.",
  "feature.tools.title": "Kannada OCR & Voice",
  "feature.tools.desc":
    "Extract Kannada text from images, translate, and listen — speak and be understood.",

  // ---- timeline ----
  "timeline.badge": "Heritage Timeline",
  "timeline.title": "1,700 years of Karnataka, one scroll",
  "timeline.subtitle":
    "From the Kadambas of Banavasi to modern Karnataka — explore the dynasties, thinkers, and monuments that shaped a civilization. Filter by era to focus your journey.",
  "timeline.allEras": "All eras",
  "era.Ancient": "Ancient",
  "era.Classical": "Classical",
  "era.Medieval": "Medieval",
  "era.Vijayanagara": "Vijayanagara",
  "era.Mysore": "Mysore",
  "era.Modern": "Modern",

  // ---- learn ----
  "learn.badge": "Learn Kannada",
  "learn.title": "Learn Kannada, the joyful way",
  "learn.subtitle":
    "Start with the alphabet, practise with flashcards, and test yourself with a quiz. ಕಲಿಯೋಣ ಬನ್ನಿ!",
  "learn.tab.alphabet": "Alphabet",
  "learn.tab.flashcards": "Flashcards",
  "learn.tab.quiz": "Quiz",
  "learn.vowels": "Vowels — ಸ್ವರಗಳು",
  "learn.consonants": "Consonants — ವ್ಯಂಜನಗಳು",
  "learn.numbers": "Numbers — ಸಂಖ್ಯೆಗಳು",
  "learn.flash.hint": "Tap the card to flip",
  "learn.flash.prev": "Previous",
  "learn.flash.next": "Next",
  "learn.flash.progress": "Card",
  "learn.quiz.question": "What does this mean?",
  "learn.quiz.score": "Score",
  "learn.quiz.next": "Next question",
  "learn.quiz.restart": "Restart quiz",
  "learn.quiz.correct": "Correct! 🎉",
  "learn.quiz.wrong": "Not quite — try the next one.",
  "learn.quiz.done": "Quiz complete!",

  // ---- explore ----
  "explore.badge": "Karnataka Explorer",
  "explore.title": "Discover the soul of Karnataka",
  "explore.subtitle":
    "Temples, cities, dynasties, and flavours — explore the places and people that define Karnataka's heritage.",
  "explore.all": "All",
  "explore.facts": "Highlights",
  "explore.tab.map": "District Map",
  "explore.tab.places": "Places",
  "explore.map.hint": "Hover a district",
  "explore.map.empty":
    "Click any district on the map to see a live summary and photo.",
  "explore.map.district": "District of Karnataka",
  "explore.map.noInfo": "No live summary available right now.",
  "explore.map.readMore": "Read on Wikipedia",
  "festival.badge": "Festival Calendar",
  "festival.title": "The festivals of Karnataka",
  "festival.subtitle":
    "From Mysuru Dasara to coastal Kambala — explore the celebrations that light up Karnataka through the year, with live photos and read-aloud.",
  "festival.upcoming": "Coming up",
  "festival.all": "All year",
  "festival.whatHappens": "What happens",
  "story.badge": "Story Weaver",
  "story.title": "Stories of Karnataka",
  "story.subtitle":
    "Folktales, legends and Vachana wisdom — woven by theme and read aloud, in English and Kannada.",
  "story.surprise": "Weave me a story",
  "story.all": "All",
  "story.read": "Read story",
  "story.listen": "Listen to the story",
  "story.moral": "The moral",
  "cat.Temple": "Temples",
  "cat.City": "Cities",
  "cat.Heritage": "Heritage Sites",
  "cat.Nature": "Nature",
  "cat.Food": "Food",

  // ---- chat ----
  "chat.badge": "Kannada AI Assistant",
  "chat.title": "Ask anything about Karnataka",
  "chat.subtitle":
    "History, temples, festivals, food, language — ask in English or Kannada.",
  "chat.placeholder": "Ask about Hampi, Basavanna, Mysore Dasara…",
  "chat.send": "Send",
  "chat.speak": "Speak",
  "chat.listening": "Listening…",
  "chat.thinking": "Thinking…",
  "chat.empty": "Try one of these to get started:",
  "chat.disclaimer":
    "Demo assistant — connect a Gemini API key in the backend for full AI answers.",
  "chat.suggest1": "Who built Hampi?",
  "chat.suggest2": "Explain Basavanna.",
  "chat.suggest3": "Tell me about Mysore Dasara.",
  "chat.suggest4": "What is Yakshagana?",

  // ---- quiz ----
  "quiz.badge": "AI Quiz Generator",
  "quiz.title": "Test your Karnataka knowledge",
  "quiz.subtitle":
    "Pick a topic and difficulty, and we'll generate a quiz. Beat your high score!",
  "quiz.topic": "Topic",
  "quiz.difficulty": "Difficulty",
  "quiz.start": "Generate quiz",
  "quiz.question": "Question",
  "quiz.of": "of",
  "quiz.score": "Score",
  "quiz.next": "Next",
  "quiz.finish": "Finish",
  "quiz.restart": "Play again",
  "quiz.correct": "Correct!",
  "quiz.wrong": "Wrong",
  "quiz.resultTitle": "Quiz complete!",
  "quiz.youScored": "You scored",
  "quiz.leaderboard": "Leaderboard",
  "quiz.you": "You",
  "quiz.noScores": "No scores yet — be the first!",
  "quiz.topic.History": "History",
  "quiz.topic.Culture": "Culture",
  "quiz.topic.Geography": "Geography",
  "quiz.topic.Language": "Language",
  "diff.Easy": "Easy",
  "diff.Medium": "Medium",
  "diff.Hard": "Hard",

  // ---- tools (OCR) ----
  "tools.badge": "Kannada OCR",
  "tools.title": "Read Kannada from any image",
  "tools.subtitle":
    "Upload a photo of Kannada text — a sign, a page, a temple inscription — and extract, listen, and learn.",
  "tools.upload": "Upload image",
  "tools.dropHint": "PNG or JPG · drag & drop or click",
  "tools.extracting": "Extracting text…",
  "tools.extracted": "Extracted text",
  "tools.tryImage": "Try a sample",
  "tools.clear": "Clear",
  "tools.note":
    "Demo OCR runs in your browser. Connect the backend OCR service for production-grade accuracy.",
};

const kn: Dict = {
  // ---- brand / nav ----
  "brand.tagline": "ಕನ್ನಡ ಪರಂಪರೆಯ ಜೀವಂತ ವಿಶ್ವ.",
  "nav.assistant": "ಸಹಾಯಕ",
  "nav.learn": "ಕಲಿ",
  "nav.explore": "ಅನ್ವೇಷಿಸಿ",
  "nav.festivals": "ಹಬ್ಬಗಳು",
  "nav.stories": "ಕಥೆಗಳು",
  "nav.timeline": "ಕಾಲರೇಖೆ",
  "nav.quiz": "ರಸಪ್ರಶ್ನೆ",
  "nav.about": "ನಮ್ಮ ಕಥೆ",
  "common.getStarted": "ಪ್ರಾರಂಭಿಸಿ",
  "common.soon": "ಶೀಘ್ರದಲ್ಲೇ",
  "common.all": "ಎಲ್ಲಾ",
  "common.backHome": "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ",
  "common.listen": "ಕೇಳಿ",

  // ---- home ----
  "home.badge": "AI ಮೂಲಕ ಕನ್ನಡ ಪರಂಪರೆಯ ಸಂರಕ್ಷಣೆ",
  "home.heroPre": "",
  "home.heroHighlight": "ಕನ್ನಡ ಪರಂಪರೆಯ",
  "home.heroPost": "ಜೀವಂತ ವಿಶ್ವ",
  "home.heroSubtitle":
    "ಕನ್ನಡ ಭಾಷೆ, ಇತಿಹಾಸ, ಸಂಸ್ಕೃತಿ, ಸಾಹಿತ್ಯ, ಹಬ್ಬಗಳು, ದೇವಾಲಯಗಳು ಮತ್ತು ಜಾನಪದವನ್ನು ಸಂರಕ್ಷಿಸಿ ಕಲಿಸುವ AI ವೇದಿಕೆ — ನೈಜ ಮೂಲಗಳ ಆಧಾರದ ಮೇಲೆ.",
  "home.ctaAsk": "ಸಹಾಯಕನನ್ನು ಕೇಳಿ",
  "home.ctaLearn": "ಕನ್ನಡ ಕಲಿಯಲು ಪ್ರಾರಂಭಿಸಿ",
  "home.featuresTitle": "ಕರ್ನಾಟಕದ ಎಲ್ಲವೂ, ಒಂದೇ ಕಡೆ",
  "home.featuresSubtitle":
    "ನೈಜ ಮೂಲಗಳ ಆಧಾರದಲ್ಲಿ — ಕಲ್ಪಿತವಲ್ಲ. ಕಲಿಯುವವರಿಗೆ, ಪ್ರಯಾಣಿಕರಿಗೆ ಮತ್ತು ಕುತೂಹಲಿಗಳಿಗೆ.",
  "home.ctaSectionTitle": "ಕನ್ನಡ ಕಲಿಯೋಣ — ಒಟ್ಟಿಗೆ ಕನ್ನಡ ಕಲಿಯೋಣ.",
  "home.ctaSectionText":
    "ಅಕ್ಕವರ್ಸ್ ಒಂದೊಂದೇ ವೈಶಿಷ್ಟ್ಯದಿಂದ ಬೆಳೆಯುತ್ತದೆ. ಪರಂಪರೆಯ ಕಾಲರೇಖೆಯನ್ನು ಅನ್ವೇಷಿಸಿ, ಅಕ್ಷರಮಾಲೆ ಕಲಿಯಿರಿ, ಕರ್ನಾಟಕವನ್ನು ಕಂಡುಕೊಳ್ಳಿ.",
  "home.ctaSectionBtn": "ಕಾಲರೇಖೆಯನ್ನು ಅನ್ವೇಷಿಸಿ",
  "home.footerTagline": "ಕರ್ನಾಟಕಕ್ಕಾಗಿ ♥ ನಿಂದ ನಿರ್ಮಿಸಲಾಗಿದೆ.",

  // ---- features ----
  "feature.assistant.title": "ಕನ್ನಡ AI ಸಹಾಯಕ",
  "feature.assistant.desc":
    "ಕರ್ನಾಟಕದ ಇತಿಹಾಸ, ದೇವಾಲಯಗಳು ಮತ್ತು ಸಂಸ್ಕೃತಿಯ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ — ಉಲ್ಲೇಖಗಳೊಂದಿಗೆ ಉತ್ತರ.",
  "feature.learn.title": "ಕನ್ನಡ ಕಲಿಯಿರಿ",
  "feature.learn.desc":
    "ಅಕ್ಷರಮಾಲೆಯಿಂದ ನಿರರ್ಗಳತೆಯವರೆಗೆ ರಚನಾತ್ಮಕ ಪಾಠಗಳು, ರಸಪ್ರಶ್ನೆಗಳು ಮತ್ತು ಫ್ಲ್ಯಾಶ್‌ಕಾರ್ಡ್‌ಗಳು.",
  "feature.stories.title": "AI ಕಥೆ ಹೇಳುವಿಕೆ",
  "feature.stories.desc":
    "ಕರ್ನಾಟಕದ ಜಾನಪದ ಕಥೆಗಳು — ಪುಣ್ಯಕೊಟಿ, ಬಾಹುಬಲಿ, ರಾಣಿ ಚೆನ್ನಮ್ಮ ಮತ್ತು ಹೆಚ್ಚು, ಓದಿ ಹೇಳಲಾಗುತ್ತದೆ.",
  "feature.explore.title": "ಕರ್ನಾಟಕ ಅನ್ವೇಷಣೆ",
  "feature.explore.desc":
    "ಜಿಲ್ಲೆಗಳು, ದೇವಾಲಯಗಳು, UNESCO ತಾಣಗಳು, ರಾಜವಂಶಗಳು ಮತ್ತು ಆಹಾರ — ನಕ್ಷೆಗಳೊಂದಿಗೆ.",
  "feature.festivals.title": "ಹಬ್ಬಗಳ ಕ್ಯಾಲೆಂಡರ್",
  "feature.festivals.desc":
    "ಕರ್ನಾಟಕದ ಹಬ್ಬಗಳು ತಿಂಗಳಿಂದ ತಿಂಗಳು — ಲೈವ್ ಛಾಯಾಚಿತ್ರ, ಓದುವ ಸೌಲಭ್ಯ ಮತ್ತು ಕಥೆಗಳೊಂದಿಗೆ.",
  "feature.timeline.title": "ಪರಂಪರೆಯ ಕಾಲರೇಖೆ",
  "feature.timeline.desc":
    "ಕರ್ನಾಟಕ ಇತಿಹಾಸದ 2,000 ವರ್ಷಗಳ ಸುಂದರ, ಸಂವಾದಾತ್ಮಕ ಪ್ರಯಾಣ.",
  "feature.quiz.title": "AI ರಸಪ್ರಶ್ನೆ ಜನರೇಟರ್",
  "feature.quiz.desc":
    "ವಿಷಯ ಮತ್ತು ಕಠಿಣತೆಗನುಸಾರ ರಸಪ್ರಶ್ನೆ ರಚಿಸಿ, ಅಂಕ ಗಳಿಸಿ, ಅಂಕಪಟ್ಟಿಯಲ್ಲಿ ಮೇಲೆ ಬನ್ನಿ.",
  "feature.tools.title": "ಕನ್ನಡ OCR ಮತ್ತು ಧ್ವನಿ",
  "feature.tools.desc":
    "ಚಿತ್ರಗಳಿಂದ ಕನ್ನಡ ಪಠ್ಯವನ್ನು ಹೊರತೆಗೆಯಿರಿ, ಭಾಷಾಂತರಿಸಿ ಮತ್ತು ಕೇಳಿ.",

  // ---- timeline ----
  "timeline.badge": "ಪರಂಪರೆಯ ಕಾಲರೇಖೆ",
  "timeline.title": "ಕರ್ನಾಟಕದ 1,700 ವರ್ಷಗಳು, ಒಂದೇ ಸ್ಕ್ರಾಲ್‌ನಲ್ಲಿ",
  "timeline.subtitle":
    "ಬನವಾಸಿಯ ಕದಂಬರಿಂದ ಆಧುನಿಕ ಕರ್ನಾಟಕದವರೆಗೆ — ನಾಗರಿಕತೆಯನ್ನು ರೂಪಿಸಿದ ರಾಜವಂಶಗಳು, ಚಿಂತಕರು ಮತ್ತು ಸ್ಮಾರಕಗಳನ್ನು ಅನ್ವೇಷಿಸಿ. ಯುಗದ ಮೂಲಕ ಫಿಲ್ಟರ್ ಮಾಡಿ.",
  "timeline.allEras": "ಎಲ್ಲಾ ಯುಗಗಳು",
  "era.Ancient": "ಪ್ರಾಚೀನ",
  "era.Classical": "ಶಾಸ್ತ್ರೀಯ",
  "era.Medieval": "ಮಧ್ಯಕಾಲೀನ",
  "era.Vijayanagara": "ವಿಜಯನಗರ",
  "era.Mysore": "ಮೈಸೂರು",
  "era.Modern": "ಆಧುನಿಕ",

  // ---- learn ----
  "learn.badge": "ಕನ್ನಡ ಕಲಿಯಿರಿ",
  "learn.title": "ಸಂತೋಷದಿಂದ ಕನ್ನಡ ಕಲಿಯಿರಿ",
  "learn.subtitle":
    "ಅಕ್ಷರಮಾಲೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ, ಫ್ಲ್ಯಾಶ್‌ಕಾರ್ಡ್‌ಗಳಿಂದ ಅಭ್ಯಾಸ ಮಾಡಿ, ರಸಪ್ರಶ್ನೆಯಿಂದ ಪರೀಕ್ಷಿಸಿಕೊಳ್ಳಿ. ಕಲಿಯೋಣ ಬನ್ನಿ!",
  "learn.tab.alphabet": "ಅಕ್ಷರಮಾಲೆ",
  "learn.tab.flashcards": "ಫ್ಲ್ಯಾಶ್‌ಕಾರ್ಡ್",
  "learn.tab.quiz": "ರಸಪ್ರಶ್ನೆ",
  "learn.vowels": "ಸ್ವರಗಳು — Vowels",
  "learn.consonants": "ವ್ಯಂಜನಗಳು — Consonants",
  "learn.numbers": "ಸಂಖ್ಯೆಗಳು — Numbers",
  "learn.flash.hint": "ತಿರುಗಿಸಲು ಕಾರ್ಡ್ ಮೇಲೆ ಒತ್ತಿ",
  "learn.flash.prev": "ಹಿಂದಿನ",
  "learn.flash.next": "ಮುಂದಿನ",
  "learn.flash.progress": "ಕಾರ್ಡ್",
  "learn.quiz.question": "ಇದರ ಅರ್ಥವೇನು?",
  "learn.quiz.score": "ಅಂಕ",
  "learn.quiz.next": "ಮುಂದಿನ ಪ್ರಶ್ನೆ",
  "learn.quiz.restart": "ರಸಪ್ರಶ್ನೆ ಮರುಪ್ರಾರಂಭಿಸಿ",
  "learn.quiz.correct": "ಸರಿ! 🎉",
  "learn.quiz.wrong": "ಸರಿಯಾಗಿಲ್ಲ — ಮುಂದಿನದನ್ನು ಪ್ರಯತ್ನಿಸಿ.",
  "learn.quiz.done": "ರಸಪ್ರಶ್ನೆ ಮುಗಿಯಿತು!",

  // ---- explore ----
  "explore.badge": "ಕರ್ನಾಟಕ ಅನ್ವೇಷಣೆ",
  "explore.title": "ಕರ್ನಾಟಕದ ಆತ್ಮವನ್ನು ಕಂಡುಕೊಳ್ಳಿ",
  "explore.subtitle":
    "ದೇವಾಲಯಗಳು, ನಗರಗಳು, ರಾಜವಂಶಗಳು ಮತ್ತು ರುಚಿಗಳು — ಕರ್ನಾಟಕದ ಪರಂಪರೆಯನ್ನು ವ್ಯಾಖ್ಯಾನಿಸುವ ಸ್ಥಳಗಳು ಮತ್ತು ಜನರನ್ನು ಅನ್ವೇಷಿಸಿ.",
  "explore.all": "ಎಲ್ಲಾ",
  "explore.facts": "ವಿಶೇಷತೆಗಳು",
  "explore.tab.map": "ಜಿಲ್ಲಾ ನಕ್ಷೆ",
  "explore.tab.places": "ಸ್ಥಳಗಳು",
  "explore.map.hint": "ಜಿಲ್ಲೆಯ ಮೇಲೆ ಸುಳಿಯಿರಿ",
  "explore.map.empty":
    "ಲೈವ್ ಸಾರಾಂಶ ಮತ್ತು ಛಾಯಾಚಿತ್ರ ನೋಡಲು ನಕ್ಷೆಯ ಯಾವುದೇ ಜಿಲ್ಲೆಯ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ.",
  "explore.map.district": "ಕರ್ನಾಟಕದ ಜಿಲ್ಲೆ",
  "explore.map.noInfo": "ಸದ್ಯಕ್ಕೆ ಲೈವ್ ಸಾರಾಂಶ ಲಭ್ಯವಿಲ್ಲ.",
  "explore.map.readMore": "ವಿಕಿಪೀಡಿಯಾದಲ್ಲಿ ಓದಿ",
  "festival.badge": "ಹಬ್ಬಗಳ ಕ್ಯಾಲೆಂಡರ್",
  "festival.title": "ಕರ್ನಾಟಕದ ಹಬ್ಬಗಳು",
  "festival.subtitle":
    "ಮೈಸೂರು ದಸರಾದಿಂದ ಕರಾವಳಿಯ ಕಂಬಳದವರೆಗೆ — ವರ್ಷವಿಡೀ ಕರ್ನಾಟಕವನ್ನು ಬೆಳಗಿಸುವ ಆಚರಣೆಗಳು, ಲೈವ್ ಛಾಯಾಚಿತ್ರ ಮತ್ತು ಓದುವ ಆಯ್ಕೆಯೊಂದಿಗೆ.",
  "festival.upcoming": "ಮುಂದಿನ ಹಬ್ಬಗಳು",
  "festival.all": "ವರ್ಷವಿಡೀ",
  "festival.whatHappens": "ಏನು ನಡೆಯುತ್ತದೆ",
  "story.badge": "ಕಥೆ ಹೆಣಿಗೆ",
  "story.title": "ಕರ್ನಾಟಕದ ಕಥೆಗಳು",
  "story.subtitle":
    "ಜಾನಪದ ಕಥೆಗಳು, ದಂತಕಥೆಗಳು ಮತ್ತು ವಚನದ ಜ್ಞಾನ — ವಿಷಯವಾರು ಹೆಣೆದು ಓದಿ ಹೇಳಲಾಗುತ್ತದೆ, ಇಂಗ್ಲಿಷ್ ಮತ್ತು ಕನ್ನಡದಲ್ಲಿ.",
  "story.surprise": "ನನಗೊಂದು ಕಥೆ ಹೆಣಿ",
  "story.all": "ಎಲ್ಲಾ",
  "story.read": "ಕಥೆ ಓದಿ",
  "story.listen": "ಕಥೆಯನ್ನು ಕೇಳಿ",
  "story.moral": "ನೀತಿ",
  "cat.Temple": "ದೇವಾಲಯಗಳು",
  "cat.City": "ನಗರಗಳು",
  "cat.Heritage": "ಪರಂಪರೆ ತಾಣಗಳು",
  "cat.Nature": "ಪ್ರಕೃತಿ",
  "cat.Food": "ಆಹಾರ",

  // ---- chat ----
  "chat.badge": "ಕನ್ನಡ AI ಸಹಾಯಕ",
  "chat.title": "ಕರ್ನಾಟಕದ ಬಗ್ಗೆ ಏನನ್ನಾದರೂ ಕೇಳಿ",
  "chat.subtitle":
    "ಇತಿಹಾಸ, ದೇವಾಲಯಗಳು, ಹಬ್ಬಗಳು, ಆಹಾರ, ಭಾಷೆ — ಇಂಗ್ಲಿಷ್ ಅಥವಾ ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ.",
  "chat.placeholder": "ಹಂಪಿ, ಬಸವಣ್ಣ, ಮೈಸೂರು ದಸರಾ ಬಗ್ಗೆ ಕೇಳಿ…",
  "chat.send": "ಕಳುಹಿಸಿ",
  "chat.speak": "ಮಾತನಾಡಿ",
  "chat.listening": "ಆಲಿಸುತ್ತಿದೆ…",
  "chat.thinking": "ಯೋಚಿಸುತ್ತಿದೆ…",
  "chat.empty": "ಪ್ರಾರಂಭಿಸಲು ಇವುಗಳಲ್ಲಿ ಒಂದನ್ನು ಪ್ರಯತ್ನಿಸಿ:",
  "chat.disclaimer":
    "ಡೆಮೊ ಸಹಾಯಕ — ಪೂರ್ಣ AI ಉತ್ತರಗಳಿಗಾಗಿ ಬ್ಯಾಕೆಂಡ್‌ನಲ್ಲಿ Gemini API ಕೀ ಸಂಪರ್ಕಿಸಿ.",
  "chat.suggest1": "ಹಂಪಿಯನ್ನು ಯಾರು ಕಟ್ಟಿದರು?",
  "chat.suggest2": "ಬಸವಣ್ಣನ ಬಗ್ಗೆ ವಿವರಿಸಿ.",
  "chat.suggest3": "ಮೈಸೂರು ದಸರಾ ಬಗ್ಗೆ ಹೇಳಿ.",
  "chat.suggest4": "ಯಕ್ಷಗಾನ ಎಂದರೇನು?",

  // ---- quiz ----
  "quiz.badge": "AI ರಸಪ್ರಶ್ನೆ ಜನರೇಟರ್",
  "quiz.title": "ನಿಮ್ಮ ಕರ್ನಾಟಕ ಜ್ಞಾನವನ್ನು ಪರೀಕ್ಷಿಸಿ",
  "quiz.subtitle":
    "ವಿಷಯ ಮತ್ತು ಕಠಿಣತೆಯನ್ನು ಆರಿಸಿ, ನಾವು ರಸಪ್ರಶ್ನೆ ರಚಿಸುತ್ತೇವೆ. ನಿಮ್ಮ ಅತ್ಯುತ್ತಮ ಅಂಕ ಮೀರಿಸಿ!",
  "quiz.topic": "ವಿಷಯ",
  "quiz.difficulty": "ಕಠಿಣತೆ",
  "quiz.start": "ರಸಪ್ರಶ್ನೆ ರಚಿಸಿ",
  "quiz.question": "ಪ್ರಶ್ನೆ",
  "quiz.of": "/",
  "quiz.score": "ಅಂಕ",
  "quiz.next": "ಮುಂದಿನ",
  "quiz.finish": "ಮುಗಿಸಿ",
  "quiz.restart": "ಮತ್ತೆ ಆಡಿ",
  "quiz.correct": "ಸರಿ!",
  "quiz.wrong": "ತಪ್ಪು",
  "quiz.resultTitle": "ರಸಪ್ರಶ್ನೆ ಮುಗಿಯಿತು!",
  "quiz.youScored": "ನೀವು ಗಳಿಸಿದ ಅಂಕ",
  "quiz.leaderboard": "ಅಂಕಪಟ್ಟಿ",
  "quiz.you": "ನೀವು",
  "quiz.noScores": "ಇನ್ನೂ ಅಂಕಗಳಿಲ್ಲ — ಮೊದಲಿಗರಾಗಿ!",
  "quiz.topic.History": "ಇತಿಹಾಸ",
  "quiz.topic.Culture": "ಸಂಸ್ಕೃತಿ",
  "quiz.topic.Geography": "ಭೂಗೋಳ",
  "quiz.topic.Language": "ಭಾಷೆ",
  "diff.Easy": "ಸುಲಭ",
  "diff.Medium": "ಮಧ್ಯಮ",
  "diff.Hard": "ಕಠಿಣ",

  // ---- tools (OCR) ----
  "tools.badge": "ಕನ್ನಡ OCR",
  "tools.title": "ಯಾವುದೇ ಚಿತ್ರದಿಂದ ಕನ್ನಡ ಓದಿ",
  "tools.subtitle":
    "ಕನ್ನಡ ಪಠ್ಯದ ಫೋಟೋ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ — ಫಲಕ, ಪುಟ ಅಥವಾ ಶಾಸನ — ಪಠ್ಯ ಹೊರತೆಗೆಯಿರಿ, ಕೇಳಿ ಮತ್ತು ಕಲಿಯಿರಿ.",
  "tools.upload": "ಚಿತ್ರ ಅಪ್‌ಲೋಡ್ ಮಾಡಿ",
  "tools.dropHint": "PNG ಅಥವಾ JPG · ಎಳೆದು ಬಿಡಿ ಅಥವಾ ಕ್ಲಿಕ್ ಮಾಡಿ",
  "tools.extracting": "ಪಠ್ಯ ಹೊರತೆಗೆಯುತ್ತಿದೆ…",
  "tools.extracted": "ಹೊರತೆಗೆದ ಪಠ್ಯ",
  "tools.tryImage": "ಮಾದರಿ ಪ್ರಯತ್ನಿಸಿ",
  "tools.clear": "ಅಳಿಸಿ",
  "tools.note":
    "ಡೆಮೊ OCR ನಿಮ್ಮ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಚಲಿಸುತ್ತದೆ. ಉತ್ಪಾದನಾ-ಮಟ್ಟದ ನಿಖರತೆಗಾಗಿ ಬ್ಯಾಕೆಂಡ್ OCR ಸೇವೆ ಸಂಪರ್ಕಿಸಿ.",
};

/** Only English and Kannada have real dictionaries; "both" is rendered by
 * composing the two at runtime in the language provider. */
export const translations: Record<"en" | "kn", Dict> = { en, kn };
