"use client";

import { streamAkka, askAkka } from "@/lib/ai/client";
import type { Person } from "@/lib/roots/store";

/**
 * Roots AI — a heritage historian's voice.
 *
 * Thin, prompt-crafting wrappers over the shared NIM client. Each function
 * degrades gracefully (returns null / does nothing) when AI is unavailable,
 * so the experience never blocks. Prompts are tuned to be warm and human —
 * "a village elder telling a story", never encyclopaedic.
 */

const HISTORIAN =
  "You are a warm Kannada heritage historian for Akkaverse. Write with feeling, " +
  "like an elder recalling home — vivid, proud, human. Never sound like an " +
  "encyclopaedia. Keep it tight and beautiful.";

/** Stream an emotional heritage portrait of a village / district. */
export function streamHeritage(
  village: string,
  district: string,
  onToken: (t: string) => void,
  signal?: AbortSignal,
): Promise<string | null> {
  const place = [village, district].filter(Boolean).join(", ");
  const question =
    `Tell me about ${place} in Karnataka as a heritage portrait. In 5 short ` +
    `sections with these exact markdown headers, 1-2 sentences each:\n` +
    `## Soul of the place\n## Temples & landmarks\n## On the plate\n` +
    `## Words & dialect\n## Festivals & famous names\n` +
    `Warm, specific, emotional. If unsure of specifics, speak to the region.`;
  return streamAkka(question, HISTORIAN, { onToken, signal });
}

/** Stream a letter from an ancestor to the generations to come. */
export function streamAncestorLetter(
  self: Person | null,
  elders: Person[],
  onToken: (t: string) => void,
  signal?: AbortSignal,
): Promise<string | null> {
  const elder = elders[0];
  const from = elder?.name || "your grandparent";
  const village = elder?.village || self?.village || "our village";
  const district = elder?.district || self?.district || "Karnataka";
  const to = self?.name || "my dear child";
  const question =
    `Write a short, deeply moving letter (about 120 words) from ${from}, an ` +
    `elder of ${village}, ${district}, addressed to their descendant ${to} and ` +
    `the generations still to come. Speak of roots, the soil, festivals, the ` +
    `mother tongue Kannada, and the quiet hope that they never forget where ` +
    `they came from. First person, tender, no clichés. End with a single line ` +
    `of blessing in Kannada with its English meaning in brackets.`;
  return streamAkka(question, HISTORIAN, { onToken, signal });
}

/* -------------------------------------------------------------------------- */
/*        Curated bilingual ancestor letter — the demo-safe centrepiece       */
/* -------------------------------------------------------------------------- */

/**
 * A hand-authored, deeply personal letter that is ALWAYS available — instant,
 * bilingual, offline, and (crucially) never hallucinated. The AI path adds
 * variety, but this guarantees the signature "Voice of the Ancestor" moment
 * works every single time, even with no network and no API key.
 */
export type AncestorLetter = {
  en: string;
  kn: string;
  blessingEn: string;
  blessingKn: string;
  from: string;
  village: string;
};

const BLESSING_KN = "ನಿನ್ನ ಬೇರುಗಳನ್ನು ಎಂದಿಗೂ ಮರೆಯದಿರು, ಕಂದಾ.";
const BLESSING_EN = "Never forget your roots, my child.";

export function curatedAncestorLetter(opts: {
  from?: string;
  to?: string;
  village?: string;
  district?: string;
}): AncestorLetter {
  const from = opts.from?.trim() || "your ancestor";
  const to = opts.to?.trim() || "my dear child";
  const village = opts.village?.trim() || "our village";
  const district = opts.district?.trim();
  const place = [village, district].filter(Boolean).join(", ");

  const en = [
    `My dear ${to},`,
    "",
    `I write to you from ${place}, where the red earth first held our name. ` +
      "I never saw your face, yet I have loved you across every harvest and " +
      "every prayer. Remember this: we were farmers of ragi and keepers of " +
      "small kindnesses. We spoke Kannada softly at dawn and loudly at " +
      "festivals, and it carried us through droughts no rain could break.",
    "",
    "Wherever you stand now — however far the sea has taken you — do not let " +
      "our words grow quiet in your mouth. A language is a house; keep a lamp " +
      "burning in it. When you say 'ajji', say it in Kannada, and I will hear you.",
    "",
    "You are the harvest we prayed for.",
  ].join("\n");

  const kn = [
    `ನನ್ನ ಪ್ರೀತಿಯ ${to},`,
    "",
    `ನಾನು ನಿನಗೆ ${place} ಇಂದ ಬರೆಯುತ್ತಿದ್ದೇನೆ — ಇದೇ ಕೆಂಪು ಮಣ್ಣು ಮೊದಲು ನಮ್ಮ ` +
      "ಹೆಸರನ್ನು ಹಿಡಿದಿಟ್ಟದ್ದು. ನಾನು ನಿನ್ನ ಮುಖವನ್ನು ಕಂಡಿಲ್ಲ, ಆದರೂ ಪ್ರತಿ ಸುಗ್ಗಿಯಲ್ಲೂ " +
      "ಪ್ರತಿ ಪ್ರಾರ್ಥನೆಯಲ್ಲೂ ನಿನ್ನನ್ನು ಪ್ರೀತಿಸಿದ್ದೇನೆ. ಇದನ್ನು ನೆನಪಿಡು: ನಾವು ರಾಗಿ " +
      "ಬೆಳೆದ ರೈತರು, ಸಣ್ಣ ಕರುಣೆಗಳ ಕಾವಲುಗಾರರು. ಬೆಳಗಿನ ಜಾವ ಮೆಲ್ಲನೆ, ಹಬ್ಬಗಳಲ್ಲಿ " +
      "ಗಟ್ಟಿಯಾಗಿ ಕನ್ನಡ ಮಾತಾಡಿದೆವು; ಅದೇ ನಮ್ಮನ್ನು ಬರಗಾಲಗಳಲ್ಲೂ ಹಿಡಿದಿಟ್ಟಿತು.",
    "",
    "ಈಗ ನೀನು ಎಲ್ಲೇ ಇರಲಿ — ಕಡಲು ನಿನ್ನನ್ನು ಎಷ್ಟೇ ದೂರ ಕೊಂಡೊಯ್ದಿರಲಿ — ನಮ್ಮ ನುಡಿ " +
      "ನಿನ್ನ ಬಾಯಲ್ಲಿ ಮೌನವಾಗದಿರಲಿ. ಭಾಷೆ ಒಂದು ಮನೆ; ಅದರಲ್ಲಿ ದೀಪ ಆರದಂತೆ ನೋಡಿಕೋ. " +
      "'ಅಜ್ಜಿ' ಎಂದು ಕನ್ನಡದಲ್ಲಿ ಕರೆ, ನಾನು ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತೇನೆ.",
    "",
    "ನೀನೇ ನಾವು ಪ್ರಾರ್ಥಿಸಿದ ಸುಗ್ಗಿ.",
  ].join("\n");

  return {
    en,
    kn,
    blessingEn: BLESSING_EN,
    blessingKn: BLESSING_KN,
    from,
    village: place,
  };
}

/** A one-line personalised welcome after onboarding. */
export async function generateWelcome(person: {
  name: string;
  village?: string;
  district?: string;
}): Promise<string | null> {
  const place = [person.village, person.district].filter(Boolean).join(", ");
  const res = await askAkka(
    `In one warm sentence (max 22 words), welcome ${person.name} from ${place} ` +
      `to Roots, honouring their family's heritage. No emojis.`,
    HISTORIAN,
  );
  return res?.text ?? null;
}
