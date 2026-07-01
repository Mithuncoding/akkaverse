/**
 * Back-compat shim. The Akka client now lives in `lib/ai/client.ts` (NVIDIA
 * NIM). This file re-exports it so existing `@/lib/gemini` imports keep working
 * while new code can import from `@/lib/ai/client` directly.
 */

export {
  askAkka,
  askGemini,
  streamAkka,
  getAiEnabled,
  type AkkaResult,
  type GeminiResult,
} from "@/lib/ai/client";
