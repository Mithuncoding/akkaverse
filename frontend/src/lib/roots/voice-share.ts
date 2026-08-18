import type { VoiceCapsule, VoiceLegacyKind } from "@/lib/roots/store";

export type VoiceLegacyPayload = {
  version: 1;
  personName: string;
  title: string;
  kind: VoiceLegacyKind;
  kannada: string;
  english: string;
  village?: string;
  district?: string;
  originalAudioUrl?: string;
  createdAt: number;
};

function toBase64Url(input: string): string {
  const base64 = btoa(
    encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    ),
  );
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromBase64Url(input: string): string {
  const binary = atob(input.replace(/-/g, "+").replace(/_/g, "/"));
  let encoded = "";
  for (let index = 0; index < binary.length; index += 1) {
    encoded += `%${binary.charCodeAt(index).toString(16).padStart(2, "0")}`;
  }
  return decodeURIComponent(encoded);
}

const clean = (value: unknown, max: number) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const cleanOriginalAudioUrl = (value: unknown) => {
  const url = clean(value, 240);
  return /^\/voices\/[a-z0-9/_-]+\.(mp3|m4a|mp4|wav|webm|ogg)$/i.test(url)
    ? url
    : undefined;
};

const KINDS: VoiceLegacyKind[] = [
  "blessing",
  "proverb",
  "story",
  "song",
  "recipe",
  "advice",
];

export function capsuleSharePayload(
  capsule: VoiceCapsule,
): VoiceLegacyPayload {
  return {
    version: 1,
    personName: capsule.personName,
    title: capsule.title,
    kind: capsule.kind,
    kannada: capsule.kannada,
    english: capsule.english,
    village: capsule.village,
    district: capsule.district,
    originalAudioUrl: capsule.sharedAudioUrl,
    createdAt: capsule.createdAt,
  };
}

export function encodeVoiceLegacy(payload: VoiceLegacyPayload): string {
  return toBase64Url(
    JSON.stringify({
      v: 1,
      p: clean(payload.personName, 100),
      t: clean(payload.title, 140),
      k: payload.kind,
      kn: clean(payload.kannada, 2400),
      en: clean(payload.english, 2400),
      l: clean(payload.village, 120),
      d: clean(payload.district, 120),
      a: cleanOriginalAudioUrl(payload.originalAudioUrl),
      c: Number.isFinite(payload.createdAt) ? payload.createdAt : Date.now(),
    }),
  );
}

export function decodeVoiceLegacy(token: string): VoiceLegacyPayload | null {
  try {
    const value = JSON.parse(fromBase64Url(token)) as Record<string, unknown>;
    const kind = KINDS.includes(value.k as VoiceLegacyKind)
      ? (value.k as VoiceLegacyKind)
      : "story";
    const kannada = clean(value.kn, 2400);
    const english = clean(value.en, 2400);
    if ((!kannada && !english) || !clean(value.p, 100)) return null;
    return {
      version: 1,
      personName: clean(value.p, 100),
      title: clean(value.t, 140) || "A family voice",
      kind,
      kannada,
      english,
      village: clean(value.l, 120) || undefined,
      district: clean(value.d, 120) || undefined,
      originalAudioUrl: cleanOriginalAudioUrl(value.a),
      createdAt:
        typeof value.c === "number" && Number.isFinite(value.c)
          ? value.c
          : Date.now(),
    };
  } catch {
    return null;
  }
}

export function buildVoiceLegacyUrl(payload: VoiceLegacyPayload): string {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `${origin}/voice-legacy?d=${encodeVoiceLegacy(payload)}`;
}