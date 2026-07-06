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
  {
    keys: [
      "who was kempegowda",
      "who founded bangalore",
      "who founded bengaluru",
      "tell me about kempegowda",
    ],
    answer:
      "Kempegowda I (1510–1569) was a chieftain under the Vijayanagara Empire and the founder of Bengaluru. Around 1537 he laid out the original town with its fort and four watchtowers marking the city's boundaries. He is remembered as the visionary architect of Karnataka's capital, honoured today in the city's airport and many landmarks.",
  },
  {
    keys: [
      "what is yakshagana",
      "tell me about yakshagana",
      "what is yaksha gana",
    ],
    answer:
      "Yakshagana is a vibrant traditional theatre form of coastal Karnataka that blends dance, music, spoken word and dazzling costume. Performed through the night, it dramatises episodes from the Ramayana, Mahabharata and Puranas, led by a singer (bhagavata) and drummers. Its towering headgear, painted faces and improvised dialogue make it one of India's most spectacular folk arts.",
  },
  {
    keys: ["who was kuvempu", "tell me about kuvempu", "who is kuvempu"],
    answer:
      "Kuvempu (K. V. Puttappa, 1904–1994) was a towering Kannada poet and the first Kannada writer to receive the Jnanpith Award. He wrote the state anthem 'Jaya Bharata Jananiya Tanujate' and championed 'Vishwa Manava' — the idea that every child is born a universal human. His epic 'Sri Ramayana Darshanam' reimagined the Ramayana in modern Kannada.",
  },
  {
    keys: [
      "tell me about kannada language",
      "what is kannada",
      "how old is kannada",
      "about kannada",
    ],
    answer:
      "Kannada is a classical Dravidian language spoken by around 50 million people, mainly in Karnataka. With inscriptions dating back roughly 1,500–2,000 years (the Halmidi inscription of c. 450 CE is a landmark), it has one of the richest literary traditions in India — honoured with eight Jnanpith Awards, more than any other Indian language.",
  },
  {
    keys: [
      "what is jog falls",
      "tell me about jog falls",
      "where is jog falls",
    ],
    answer:
      "Jog Falls, on the Sharavathi River in Shivamogga district, is among India's tallest plunge waterfalls, dropping about 253 metres in four distinct cascades known as Raja, Rani, Roarer and Rocket. It is most spectacular during the monsoon, when the full force of the river thunders over the cliffs.",
  },
  {
    keys: [
      "what is shravanabelagola",
      "who is bahubali",
      "tell me about gommateshwara",
      "what is gommateshwara",
    ],
    answer:
      "Shravanabelagola in Hassan district is home to the 57-foot monolithic statue of Gommateshwara (Bahubali), carved around 983 CE under the Ganga minister Chavundaraya. One of the world's tallest free-standing statues, it is a major Jain pilgrimage site. Every 12 years the grand Mahamastakabhisheka anoints the statue with milk, saffron and flowers.",
  },
  {
    keys: [
      "tell me about karnataka",
      "what is karnataka",
      "about karnataka",
    ],
    answer:
      "Karnataka is a state in south-west India, formed on 1 November 1956 and renamed from Mysore State to Karnataka in 1973. Its capital is Bengaluru. From the empires of the Kadambas, Chalukyas, Hoysalas and Vijayanagara to sandalwood, coffee, Carnatic and Hindustani music, temple architecture and the Kannada language, it holds one of India's deepest and most varied cultural heritages.",
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
