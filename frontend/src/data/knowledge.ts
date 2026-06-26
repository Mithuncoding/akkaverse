/**
 * Curated Karnataka knowledge base for the demo Assistant.
 *
 * Why a local KB? It lets the AI Assistant give accurate, *cited*, bilingual
 * answers with ZERO API keys — perfect for a reliable live demo. The answer
 * shape (text + sources) intentionally mirrors a RAG response, so this can be
 * swapped for the FastAPI + Gemini + ChromaDB backend with no UI changes.
 */

import type { Locale } from "@/i18n/translations";

export type KnowledgeAnswer = {
  /** Keywords (lowercased) that route a question to this entry. */
  match: string[];
  en: string;
  kn: string;
  sources: string[];
};

export const knowledgeBase: KnowledgeAnswer[] = [
  {
    match: ["hampi", "vijayanagara", "ಹಂಪಿ", "ವಿಜಯನಗರ"],
    en: "Hampi was the capital of the Vijayanagara Empire, founded in 1336 CE by Harihara I and Bukka Raya. At its peak under Krishnadevaraya (1509–1529), it was one of the world's largest and richest cities. Today its ruins — the Virupaksha Temple, Vittala Temple with its stone chariot and musical pillars, and the royal enclosures — are a UNESCO World Heritage Site.",
    kn: "ಹಂಪಿ ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯದ ರಾಜಧಾನಿಯಾಗಿತ್ತು, ಇದನ್ನು 1336ರಲ್ಲಿ ಹರಿಹರ ಮತ್ತು ಬುಕ್ಕರಾಯರು ಸ್ಥಾಪಿಸಿದರು. ಕೃಷ್ಣದೇವರಾಯನ (1509–1529) ಕಾಲದಲ್ಲಿ ಇದು ವಿಶ್ವದ ಅತಿದೊಡ್ಡ ಹಾಗೂ ಶ್ರೀಮಂತ ನಗರಗಳಲ್ಲಿ ಒಂದಾಗಿತ್ತು. ವಿರೂಪಾಕ್ಷ ದೇವಾಲಯ, ಕಲ್ಲಿನ ರಥವಿರುವ ವಿಠಲ ದೇವಾಲಯ — ಇವು ಈಗ UNESCO ವಿಶ್ವ ಪರಂಪರೆ ತಾಣ.",
    sources: ["Vijayanagara history", "UNESCO World Heritage — Hampi"],
  },
  {
    match: ["basavanna", "basava", "vachana", "lingayat", "ಬಸವ", "ವಚನ"],
    en: "Basavanna (c. 1131–1167) was a 12th-century philosopher, statesman, and social reformer who led the Vachana movement in Karnataka. He rejected caste discrimination and ritualism, championing equality and devotion through 'Vachanas' — short, powerful Kannada poems. His Anubhava Mantapa was an early democratic spiritual parliament. His famous line: 'Work is worship' (Kayakave Kailasa).",
    kn: "ಬಸವಣ್ಣ (ಸು. 1131–1167) 12ನೇ ಶತಮಾನದ ತತ್ವಜ್ಞಾನಿ, ರಾಜನೀತಿಜ್ಞ ಮತ್ತು ಸಮಾಜ ಸುಧಾರಕರಾಗಿದ್ದರು. ಅವರು ಜಾತಿ ಭೇದ ಮತ್ತು ಆಡಂಬರವನ್ನು ತಿರಸ್ಕರಿಸಿ, 'ವಚನ'ಗಳ ಮೂಲಕ ಸಮಾನತೆ ಮತ್ತು ಭಕ್ತಿಯನ್ನು ಬೋಧಿಸಿದರು. 'ಕಾಯಕವೇ ಕೈಲಾಸ' ಅವರ ಪ್ರಸಿದ್ಧ ನುಡಿ.",
    sources: ["Vachana literature", "Anubhava Mantapa"],
  },
  {
    match: ["dasara", "dussehra", "navaratri", "ದಸರಾ", "ನವರಾತ್ರಿ"],
    en: "Mysore Dasara is Karnataka's grand 10-day 'Nada Habba' (state festival), celebrating the goddess Chamundeshwari's victory over the demon Mahishasura. Started by the Vijayanagara kings and continued by the Wodeyars since the 1600s, its highlight is the Jumboo Savari — a procession of caparisoned elephants carrying the golden idol through a dazzlingly lit Mysore Palace.",
    kn: "ಮೈಸೂರು ದಸರಾ ಕರ್ನಾಟಕದ 10 ದಿನಗಳ ಭವ್ಯ 'ನಾಡಹಬ್ಬ', ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಿಯು ಮಹಿಷಾಸುರನನ್ನು ಸಂಹರಿಸಿದ ವಿಜಯವನ್ನು ಆಚರಿಸುತ್ತದೆ. ವಿಜಯನಗರದ ಅರಸರು ಆರಂಭಿಸಿ ಒಡೆಯರ್ ಮನೆತನ ಮುಂದುವರಿಸಿತು. ಪ್ರಮುಖ ಆಕರ್ಷಣೆ — ಅಲಂಕೃತ ಆನೆಗಳ ಜಂಬೂ ಸವಾರಿ ಮೆರವಣಿಗೆ.",
    sources: ["Mysore Wodeyar tradition", "Nada Habba"],
  },
  {
    match: ["yakshagana", "ಯಕ್ಷಗಾನ"],
    en: "Yakshagana is a vibrant traditional theatre form from coastal and Malenadu Karnataka, blending dance, music, dialogue, elaborate costumes, and towering headgear. Performed overnight, it dramatizes episodes from the Ramayana and Mahabharata, accompanied by the chande and maddale drums and a lead singer (Bhagavata).",
    kn: "ಯಕ್ಷಗಾನ ಕರಾವಳಿ ಮತ್ತು ಮಲೆನಾಡು ಕರ್ನಾಟಕದ ಜೀವಂತ ಸಾಂಪ್ರದಾಯಿಕ ರಂಗಭೂಮಿ ಕಲೆ — ನೃತ್ಯ, ಸಂಗೀತ, ಸಂಭಾಷಣೆ, ವರ್ಣರಂಜಿತ ವೇಷಭೂಷಣ ಮತ್ತು ಎತ್ತರದ ಕಿರೀಟಗಳ ಸಮ್ಮಿಲನ. ರಾಮಾಯಣ ಮತ್ತು ಮಹಾಭಾರತದ ಪ್ರಸಂಗಗಳನ್ನು ಚಂಡೆ-ಮದ್ದಳೆಯೊಂದಿಗೆ ರಾತ್ರಿಯಿಡೀ ಪ್ರದರ್ಶಿಸಲಾಗುತ್ತದೆ.",
    sources: ["Karnataka folk arts", "Coastal theatre traditions"],
  },
  {
    match: ["history", "karnataka history", "dynasty", "dynasties", "ಇತಿಹಾಸ", "ರಾಜವಂಶ"],
    en: "Karnataka's history spans the Kadambas (345 CE, Banavasi), Badami Chalukyas, Rashtrakutas, Hoysalas (Belur, Halebidu), the Vijayanagara Empire (Hampi), and the Wodeyars of Mysore. It gave the world the earliest Kannada literature (Kavirajamarga, c. 850 CE), the Vachana movement, and stunning temple architecture before becoming a unified state in 1956.",
    kn: "ಕರ್ನಾಟಕದ ಇತಿಹಾಸವು ಕದಂಬರು (345, ಬನವಾಸಿ), ಬಾದಾಮಿ ಚಾಲುಕ್ಯರು, ರಾಷ್ಟ್ರಕೂಟರು, ಹೊಯ್ಸಳರು (ಬೇಲೂರು, ಹಳೇಬೀಡು), ವಿಜಯನಗರ ಸಾಮ್ರಾಜ್ಯ (ಹಂಪಿ) ಮತ್ತು ಮೈಸೂರು ಒಡೆಯರನ್ನು ಒಳಗೊಂಡಿದೆ. 1956ರಲ್ಲಿ ಏಕೀಕೃತ ರಾಜ್ಯವಾಯಿತು.",
    sources: ["Karnataka Ekikarana", "Dynastic history"],
  },
  {
    match: ["belur", "halebidu", "hoysala", "ಬೇಲೂರು", "ಹಳೇಬೀಡು", "ಹೊಯ್ಸಳ"],
    en: "Belur and Halebidu are the jewels of Hoysala architecture (12th century). The Chennakeshava Temple at Belur, built by King Vishnuvardhana, and the Hoysaleswara Temple at Halebidu are famed for their breathtakingly intricate soapstone carvings — friezes of elephants, dancers, and entire epics in stone. They are UNESCO World Heritage Sites.",
    kn: "ಬೇಲೂರು ಮತ್ತು ಹಳೇಬೀಡು ಹೊಯ್ಸಳ ವಾಸ್ತುಶಿಲ್ಪದ ರತ್ನಗಳು (12ನೇ ಶತಮಾನ). ವಿಷ್ಣುವರ್ಧನನು ಕಟ್ಟಿಸಿದ ಬೇಲೂರಿನ ಚೆನ್ನಕೇಶವ ದೇವಾಲಯ ಮತ್ತು ಹಳೇಬೀಡಿನ ಹೊಯ್ಸಳೇಶ್ವರ ದೇವಾಲಯಗಳು ಸೂಕ್ಷ್ಮ ಕೆತ್ತನೆಗಳಿಗೆ ಪ್ರಸಿದ್ಧ. ಇವು UNESCO ವಿಶ್ವ ಪರಂಪರೆ ತಾಣಗಳು.",
    sources: ["Hoysala architecture", "UNESCO World Heritage"],
  },
  {
    match: ["kannada", "language", "learn kannada", "ಕನ್ನಡ", "ಭಾಷೆ"],
    en: "Kannada is a classical Dravidian language with over 1,500 years of literary history and around 50 million speakers. It has its own beautiful script, eight Jnanapith Awards (the most for any Indian language), and a rich tradition from Pampa and Ranna to Kuvempu. Start with the alphabet on our Learn page — ಕಲಿಯೋಣ!",
    kn: "ಕನ್ನಡ 1,500ಕ್ಕೂ ಹೆಚ್ಚು ವರ್ಷಗಳ ಸಾಹಿತ್ಯ ಇತಿಹಾಸವಿರುವ ಶ್ರೇಷ್ಠ ದ್ರಾವಿಡ ಭಾಷೆ, ಸುಮಾರು 5 ಕೋಟಿ ಮಾತನಾಡುವವರಿದ್ದಾರೆ. ಎಂಟು ಜ್ಞಾನಪೀಠ ಪ್ರಶಸ್ತಿಗಳು (ಭಾರತೀಯ ಭಾಷೆಗಳಲ್ಲೇ ಅತಿ ಹೆಚ್ಚು) ಕನ್ನಡಕ್ಕಿವೆ. ನಮ್ಮ Learn ಪುಟದಲ್ಲಿ ಅಕ್ಷರಮಾಲೆಯಿಂದ ಪ್ರಾರಂಭಿಸಿ — ಕಲಿಯೋಣ!",
    sources: ["Classical language status", "Kannada literature"],
  },
];

const FALLBACK = {
  en: "I'm the Akkaverse demo assistant. I can tell you about Hampi, Basavanna, Mysore Dasara, Yakshagana, Belur & Halebidu, Karnataka history, and the Kannada language. Connect a Gemini API key in the backend to unlock open-ended RAG answers on any topic.",
  kn: "ನಾನು ಅಕ್ಕವರ್ಸ್ ಡೆಮೊ ಸಹಾಯಕ. ಹಂಪಿ, ಬಸವಣ್ಣ, ಮೈಸೂರು ದಸರಾ, ಯಕ್ಷಗಾನ, ಬೇಲೂರು-ಹಳೇಬೀಡು, ಕರ್ನಾಟಕ ಇತಿಹಾಸ ಮತ್ತು ಕನ್ನಡ ಭಾಷೆಯ ಬಗ್ಗೆ ಹೇಳಬಲ್ಲೆ. ಯಾವುದೇ ವಿಷಯದ ಮೇಲೆ ಉತ್ತರಗಳಿಗಾಗಿ ಬ್ಯಾಕೆಂಡ್‌ನಲ್ಲಿ Gemini API ಕೀ ಸಂಪರ್ಕಿಸಿ.",
};

export type AssistantReply = { text: string; sources: string[] };

/** Compose an answer for the active locale ("both" stacks EN then ಕನ್ನಡ). */
function pick(en: string, kn: string, locale: Locale): string {
  if (locale === "kn") return kn;
  if (locale === "both") return `${en}\n\n${kn}`;
  return en;
}

/** Route a question to the best KB entry (simple keyword retrieval). */
export function answerQuestion(question: string, locale: Locale): AssistantReply {
  const q = question.toLowerCase();
  let best: KnowledgeAnswer | null = null;
  let bestScore = 0;

  for (const entry of knowledgeBase) {
    const score = entry.match.reduce(
      (acc, kw) => (q.includes(kw.toLowerCase()) ? acc + 1 : acc),
      0,
    );
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  if (best && bestScore > 0) {
    return { text: pick(best.en, best.kn, locale), sources: best.sources };
  }
  return { text: pick(FALLBACK.en, FALLBACK.kn, locale), sources: [] };
}
