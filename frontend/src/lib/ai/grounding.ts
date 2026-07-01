/**
 * Grounding & seeded answers — the cheap, fast, reliable half of Akka.
 *
 * Two responsibilities:
 *  1. Prompt normalisation so semantically-identical questions share one cache
 *     slot (higher hit-rate → fewer paid calls).
 *  2. A small SEEDED answer set for the questions most likely to be asked on a
 *     demo stage. These return instantly and for free, so a live demo never
 *     waits on the network and never fails — the single biggest reliability win.
 *
 * These are pure functions (no browser/node APIs) so both the server route and
 * client helpers can share them.
 */

/** Lowercase, strip punctuation, collapse whitespace — a stable cache key. */
export function normalizeQuestion(q: string): string {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Curated, demo-ready answers for common questions. Kept short and accurate.
 * The route checks these before ever calling the model, so they are instant
 * and cost nothing. (This is grounding, not fabrication — all verifiable.)
 */
const SEEDED: { keys: string[]; answer: string }[] = [
  {
    keys: ["what is akkaverse", "about akkaverse", "tell me about akkaverse"],
    answer:
      "Akkaverse is an immersive digital home for Karnataka's heritage — its history, festivals, stories, monuments, language and culture. Explore an interactive map, travel a century of Mysuru Dasara in the Living Archive, learn Kannada, test yourself with quizzes, and ask me, Akka, anything about Karnataka along the way.",
  },
  {
    keys: [
      "what is mysore dasara",
      "what is mysuru dasara",
      "tell me about dasara",
      "what is dasara",
    ],
    answer:
      "Mysuru Dasara is Karnataka's grand 10-day 'Nada Habba' (state festival), marking Goddess Chamundeshwari's victory over the demon Mahishasura. Begun in the Vijayanagara tradition and carried on by the Wadiyars since the 1600s, its centrepiece is the Jamboo Savari — a procession in which the golden howdah, once bearing the Maharaja and since 1971 the Goddess, moves through a palace lit by nearly a lakh bulbs.",
  },
  {
    keys: ["who was basavanna", "what is vachana", "tell me about basavanna"],
    answer:
      "Basavanna (c. 1131–1167) was a 12th-century philosopher, statesman and social reformer who led the Vachana movement. Rejecting caste and empty ritual, he taught equality and devotion through 'Vachanas' — short, powerful Kannada poems — and founded the Anubhava Mantapa, an early democratic spiritual assembly. His famous line: 'Kayakave Kailasa' — work is worship.",
  },
  {
    keys: ["what is hampi", "tell me about hampi", "where is hampi"],
    answer:
      "Hampi was the capital of the Vijayanagara Empire, founded in 1336 CE. At its peak under Krishnadevaraya (1509–1529) it was among the world's largest, richest cities. Its ruins — the Virupaksha Temple, the Vittala Temple with its stone chariot and musical pillars, and the royal enclosures — form a UNESCO World Heritage Site.",
  },
];

/** Return a seeded answer if the question closely matches one, else null. */
export function seededAnswer(question: string): string | null {
  const n = normalizeQuestion(question);
  for (const entry of SEEDED) {
    if (entry.keys.some((k) => n === normalizeQuestion(k) || n.includes(normalizeQuestion(k)))) {
      return entry.answer;
    }
  }
  return null;
}

/**
 * Build a compact grounding context for a quiz explanation. Kept tiny to
 * minimise tokens — the model only needs the question, the options, and which
 * one is correct to write a good "why".
 */
export function buildQuizContext(input: {
  question: string;
  options: string[];
  correct: string;
  topic: string;
}): string {
  return [
    `Quiz topic: ${input.topic}.`,
    `Question: ${input.question}`,
    `Options: ${input.options.join(" | ")}`,
    `Correct answer: ${input.correct}`,
    `Task: In 2-3 sentences, explain WHY the correct answer is right and add one memorable fact. Do not just restate the answer.`,
  ].join("\n");
}
