/**
 * Blessing share links — turn an ancestor's blessing into a self-contained
 * URL that a family can send to their children. The whole blessing is encoded
 * into the link itself (no server, no database), so the receiver simply opens
 * `/blessing?d=…` and sees the card. This makes Roots a genuine "pass it on"
 * moment instead of a private, single-player scrapbook.
 */

export type BlessingPayload = {
  /** The elder the blessing is from. */
  from: string;
  /** Their village / place (optional). */
  village: string;
  /** The blessing in Kannada. */
  kn: string;
  /** The blessing in English. */
  en: string;
};

/** UTF-8-safe base64url encode (handles Kannada / multi-byte text). */
function toBase64Url(input: string): string {
  const b64 = btoa(
    encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, (_, h) =>
      String.fromCharCode(parseInt(h, 16)),
    ),
  );
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

/** UTF-8-safe base64url decode. */
function fromBase64Url(input: string): string {
  const b64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64);
  let pct = "";
  for (let i = 0; i < bin.length; i += 1) {
    pct += "%" + ("00" + bin.charCodeAt(i).toString(16)).slice(-2);
  }
  return decodeURIComponent(pct);
}

/** Encode a blessing into a compact, URL-safe token. */
export function encodeBlessing(payload: BlessingPayload): string {
  return toBase64Url(
    JSON.stringify({
      f: payload.from ?? "",
      v: payload.village ?? "",
      k: payload.kn ?? "",
      e: payload.en ?? "",
    }),
  );
}

/** Decode a token back into a blessing, or null if it's malformed. */
export function decodeBlessing(token: string): BlessingPayload | null {
  try {
    const obj = JSON.parse(fromBase64Url(token)) as {
      f?: unknown;
      v?: unknown;
      k?: unknown;
      e?: unknown;
    };
    if (typeof obj.k !== "string" || typeof obj.e !== "string") return null;
    if (!obj.k && !obj.e) return null;
    return {
      from: typeof obj.f === "string" ? obj.f : "",
      village: typeof obj.v === "string" ? obj.v : "",
      kn: obj.k,
      en: obj.e,
    };
  } catch {
    return null;
  }
}

/** Build the full shareable URL for a blessing (absolute, current origin). */
export function buildBlessingUrl(payload: BlessingPayload): string {
  const token = encodeBlessing(payload);
  const origin =
    typeof window !== "undefined" ? window.location.origin : "";
  return `${origin}/blessing?d=${token}`;
}
