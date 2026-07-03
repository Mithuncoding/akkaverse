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
