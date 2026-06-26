/**
 * Browser Text-to-Speech helper (Web Speech API).
 *
 * Used by Learn, the Assistant, Festivals and Stories to "read aloud" Kannada
 * and English. It runs entirely client-side — no backend or API key needed,
 * which makes it a reliable, zero-cost demo of the "Voice" feature.
 *
 * A single global controller drives all read-aloud buttons so only one thing
 * speaks at a time, and any UI can reflect play / pause / stop / speed.
 */

export type SpeechStatus = "idle" | "playing" | "paused";

export type SpeechState = {
  status: SpeechStatus;
  /** Identifier of the snippet currently owning the speaker, or null. */
  activeId: string | null;
  /** Playback rate shared across every read-aloud control. */
  rate: number;
};

export const SPEECH_RATES = [0.75, 1, 1.25, 1.5] as const;

let state: SpeechState = { status: "idle", activeId: null, rate: 1 };
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function setState(patch: Partial<SpeechState>) {
  state = { ...state, ...patch };
  emit();
}

/** Subscribe to controller changes (used by the React hook). */
export function subscribeSpeech(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getSpeechState(): SpeechState {
  return state;
}

/** Whether speech synthesis is available in this browser. */
export function canSpeak(): boolean {
  return typeof window !== "undefined" && "speechSynthesis" in window;
}

function pickVoice(lang: string): SpeechSynthesisVoice | undefined {
  const voices = window.speechSynthesis.getVoices();
  return (
    voices.find((v) => v.lang === lang) ??
    voices.find((v) => v.lang.startsWith(lang.split("-")[0]))
  );
}

/** Whether a usable voice exists for the given language (e.g. "kn-IN"). */
export function hasVoice(lang: string): boolean {
  if (!canSpeak()) return false;
  return pickVoice(lang) !== undefined;
}

/**
 * Resolve the voice and effective language to use. If the device has no voice
 * for the requested language (very common for Kannada), we fall back to an
 * available voice so audio still plays — otherwise the utterance ends instantly
 * and the on-screen controls vanish.
 */
function resolveVoice(lang: string): { voice?: SpeechSynthesisVoice; lang: string } {
  const match = pickVoice(lang);
  if (match) return { voice: match, lang };

  const voices = window.speechSynthesis.getVoices();
  const fallback =
    voices.find((v) => v.lang.startsWith("en")) ?? voices[0];
  return fallback ? { voice: fallback, lang: fallback.lang } : { lang };
}

// Warm up the voice list as early as possible so the very first utterance
// already has a matching voice (Chrome loads voices asynchronously).
if (typeof window !== "undefined" && "speechSynthesis" in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

let current: { text: string; lang: "kn-IN" | "en-IN"; id: string } | null = null;

// Every play attempt gets a token; only the latest token may mutate state.
// This makes us immune to the Chrome race where cancel() makes a freshly
// queued utterance fire `onend`/`onerror` immediately.
let speakToken = 0;

// Chrome silently pauses long utterances after ~15s. A periodic pause/resume
// nudge keeps speech (and therefore the controls) alive until it truly ends.
let keepAlive: ReturnType<typeof setInterval> | null = null;

function startKeepAlive() {
  stopKeepAlive();
  keepAlive = setInterval(() => {
    if (!canSpeak()) return;
    if (state.status === "playing") {
      window.speechSynthesis.pause();
      window.speechSynthesis.resume();
    }
  }, 10000);
}

function stopKeepAlive() {
  if (keepAlive) {
    clearInterval(keepAlive);
    keepAlive = null;
  }
}

/** Start (or restart) speaking a snippet, taking ownership of the speaker. */
export function playSpeech(
  id: string,
  text: string,
  lang: "kn-IN" | "en-IN" = "kn-IN",
) {
  if (!canSpeak()) return;
  const synth = window.speechSynthesis;
  const token = ++speakToken;
  const wasBusy = synth.speaking || synth.paused;

  if (wasBusy) synth.cancel();

  current = { text, lang, id };
  setState({ status: "playing", activeId: id });

  const speakNow = () => {
    // A newer play call has superseded this one — abandon it.
    if (token !== speakToken) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = state.rate;
    const resolved = resolveVoice(lang);
    utterance.lang = resolved.lang;
    if (resolved.voice) utterance.voice = resolved.voice;

    const finish = () => {
      if (token === speakToken && state.activeId === id) {
        current = null;
        stopKeepAlive();
        setState({ status: "idle", activeId: null });
      }
    };
    utterance.onend = finish;
    utterance.onerror = finish;

    startKeepAlive();
    synth.speak(utterance);
  };

  // If we just cancelled an active utterance, defer slightly: speaking
  // immediately after cancel() can make the new utterance end instantly.
  if (wasBusy) {
    setTimeout(speakNow, 120);
  } else {
    speakNow();
  }
}

export function pauseSpeech() {
  if (!canSpeak() || state.status !== "playing") return;
  window.speechSynthesis.pause();
  setState({ status: "paused" });
}

export function resumeSpeech() {
  if (!canSpeak() || state.status !== "paused") return;
  window.speechSynthesis.resume();
  setState({ status: "playing" });
}

export function stopSpeech() {
  if (!canSpeak()) return;
  speakToken++; // invalidate any pending/active utterance callbacks
  window.speechSynthesis.cancel();
  current = null;
  stopKeepAlive();
  setState({ status: "idle", activeId: null });
}

/**
 * Change playback speed for all controls. If something is currently speaking,
 * it restarts from the beginning at the new rate (the Web Speech API can't
 * retune an utterance mid-flight).
 */
export function setSpeechRate(rate: number) {
  setState({ rate });
  if (current && state.status !== "idle") {
    playSpeech(current.id, current.text, current.lang);
  }
}

/** Legacy fire-and-forget helper, now routed through the global controller. */
export function speak(text: string, lang: "kn-IN" | "en-IN" = "kn-IN") {
  playSpeech(`speak:${text}`, text, lang);
}


/* -------------------------------------------------------------------------- */
/*                          Speech-to-Text (input)                            */
/* -------------------------------------------------------------------------- */

// The Web Speech API recognition class is vendor-prefixed in some browsers and
// not in the standard TS DOM lib, so we look it up dynamically and type loosely.
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
};

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike;
    webkitSpeechRecognition?: new () => SpeechRecognitionLike;
  };
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null;
}

/** Whether voice input (speech recognition) is supported. */
export function canListen(): boolean {
  return getRecognitionCtor() !== null;
}

/**
 * Start a one-shot voice capture. Returns a `stop()` function.
 * `onResult` fires with the final transcript; `onEnd` always fires on stop.
 */
export function listen(
  onResult: (text: string) => void,
  options: { lang?: "kn-IN" | "en-IN"; onEnd?: () => void } = {},
): () => void {
  const Ctor = getRecognitionCtor();
  if (!Ctor) return () => {};

  const recognition = new Ctor();
  recognition.lang = options.lang ?? "en-IN";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onresult = (event) => {
    const transcript = event.results[0]?.[0]?.transcript ?? "";
    if (transcript) onResult(transcript);
  };
  recognition.onerror = () => options.onEnd?.();
  recognition.onend = () => options.onEnd?.();

  recognition.start();
  return () => recognition.stop();
}
