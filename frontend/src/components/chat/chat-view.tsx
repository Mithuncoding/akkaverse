"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Send, Mic, Sparkles, BookOpen, Volume2, Pause, Loader2, Globe } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { answerQuestion } from "@/data/knowledge";
import { streamAkka, getAiEnabled } from "@/lib/gemini";
import { listen, canListen, canSpeak, fetchTtsUrl } from "@/lib/speech";
import { ReadAloud } from "@/components/ui/read-aloud";
import { Button } from "@/components/ui/button";
import { GUIDES, guideById } from "@/lib/ai/guides";
import type { ReplyLang, WebSource } from "@/lib/ai/client";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: string[];
  /** Live web citations (Wikipedia) that grounded this answer. */
  refs?: WebSource[];
  /** While true the bubble streams in word-by-word with a caret. */
  streaming?: boolean;
};

/**
 * ChatView — the Kannada AI Assistant.
 *
 * For the demo it answers from a curated, cited knowledge base (see
 * data/knowledge.ts) so it works with no API key. Voice input uses the Web
 * Speech API; answers can be read aloud (TTS) in English or Kannada.
 * The retrieval call is isolated, so swapping in the FastAPI/Gemini RAG
 * endpoint later is a one-line change.
 */
export function ChatView() {
  const { t, bi, locale, speechLang } = useTranslation();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [aiEnabled, setAiEnabled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const [guideId, setGuideId] = React.useState("akka");
  const [replyLang, setReplyLang] = React.useState<ReplyLang>("auto");
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const streamTimer = React.useRef<number | null>(null);
  const searchParams = useSearchParams();

  const guide = guideById(guideId);

  const replyOpts: { id: ReplyLang; label: string }[] = [
    { id: "auto", label: bi("Auto", "ಸ್ವಯಂ") },
    { id: "en", label: "EN" },
    { id: "kn", label: "ಕನ್ನಡ" },
    { id: "both", label: bi("Both", "ಎರಡೂ") },
  ];

  // Speech APIs only exist in the browser. Render client-only controls after
  // mount so the server and first client render match (avoids hydration error).
  React.useEffect(() => setMounted(true), []);

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  React.useEffect(() => {
    return () => {
      if (streamTimer.current) window.clearInterval(streamTimer.current);
    };
  }, []);

  // Resolve whether the server-side AI is available (badge only — no secrets).
  React.useEffect(() => {
    let alive = true;
    void getAiEnabled().then((on) => alive && setAiEnabled(on));
    return () => {
      alive = false;
    };
  }, []);

  /** Reveal an assistant reply word-by-word for a generative feel. */
  const streamReply = React.useCallback(
    (id: string, full: string, sources: string[]) => {
      const words = full.split(/(\s+)/); // keep whitespace tokens
      let shown = 0;
      if (streamTimer.current) window.clearInterval(streamTimer.current);
      streamTimer.current = window.setInterval(() => {
        shown += 1;
        const partial = words.slice(0, shown).join("");
        const done = shown >= words.length;
        setMessages((m) =>
          m.map((msg) =>
            msg.id === id
              ? {
                  ...msg,
                  text: partial,
                  streaming: !done,
                  sources: done ? sources : undefined,
                }
              : msg,
          ),
        );
        scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
        if (done && streamTimer.current) {
          window.clearInterval(streamTimer.current);
          streamTimer.current = null;
        }
      }, 22);
    },
    [],
  );

  const send = React.useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setThinking(true);

      // Always retrieve the curated, cited answer first — it grounds Akka
      // and is the fallback when no key is set or the call fails.
      const local = answerQuestion(text, locale);
      // The chosen guide colours the answer's voice (persona in context, not
      // the server system prompt — the key stays server-side).
      const context = `${guide.instruction}\n\n${local.text}`;

      void (async () => {
        const id = crypto.randomUUID();

        // Try real, live token streaming from the server.
        if (aiEnabled) {
          setThinking(false);
          setMessages((m) => [
            ...m,
            { id, role: "assistant", text: "", streaming: true },
          ]);
          let streamed = "";
          let webRefs: WebSource[] = [];
          const full = await streamAkka(text, context, {
            replyLang,
            onSources: (s) => {
              webRefs = s;
            },
            onToken: (tok) => {
              streamed += tok;
              setMessages((m) =>
                m.map((msg) =>
                  msg.id === id ? { ...msg, text: streamed } : msg,
                ),
              );
              scrollRef.current?.scrollTo({
                top: scrollRef.current.scrollHeight,
              });
            },
          });

          if (full && full.trim()) {
            const sources = Array.from(
              new Set([...local.sources, "Akka AI"]),
            );
            setMessages((m) =>
              m.map((msg) =>
                msg.id === id
                  ? { ...msg, text: full, streaming: false, sources, refs: webRefs }
                  : msg,
              ),
            );
            return;
          }

          // Streaming failed — gracefully replace with the curated answer.
          setMessages((m) => m.filter((msg) => msg.id !== id));
        }

        // Fallback: reveal the curated, cited answer word-by-word.
        setThinking(false);
        setMessages((m) => [
          ...m,
          { id, role: "assistant", text: "", streaming: true },
        ]);
        streamReply(id, local.text, local.sources);
      })();
    },
    [locale, streamReply, aiEnabled, guide.instruction, replyLang],
  );

  // Deep link support: /chat?guide=historian&q=Who%20was%20Kempegowda%3F
  // Any feature can send a visitor straight into a guided conversation.
  const sendRef = React.useRef(send);
  React.useEffect(() => {
    sendRef.current = send;
  });
  const bootstrapped = React.useRef(false);
  React.useEffect(() => {
    if (bootstrapped.current) return;
    const g = searchParams.get("guide");
    const q = searchParams.get("q");
    if (g && GUIDES.some((x) => x.id === g)) setGuideId(g);
    if (q) {
      bootstrapped.current = true;
      // Defer so the selected guide is applied before the question is sent.
      const t = window.setTimeout(() => sendRef.current(q), 80);
      return () => window.clearTimeout(t);
    }
    if (g) bootstrapped.current = true;
  }, [searchParams]);

  const onMic = React.useCallback(() => {
    if (listening) return;
    setListening(true);
    listen(
      (transcript) => send(transcript),
      {
        lang: speechLang(),
        onEnd: () => setListening(false),
      },
    );
  }, [listening, speechLang, send]);

  return (
    <div className="container py-6 md:py-14">
      <header className="mx-auto mb-5 max-w-2xl text-center md:mb-8">
        <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-muted-foreground shadow-soft sm:text-sm">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          ✨ {t("chat.badge")}
          {aiEnabled && (
            <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[11px] font-semibold text-primary">
              AI
            </span>
          )}
        </span>
        <h1 className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl">
          {t("chat.title")}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:mt-3 sm:text-base">
          {t("chat.subtitle")}
        </p>
      </header>

      {/* Guide picker — choose WHO you talk to about Karnataka. */}
      <div className="mx-auto mb-4 max-w-3xl">
        <div className="edge-carousel scroll-touch no-scrollbar -mx-[1.15rem] flex gap-2 px-[1.15rem] sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
          {GUIDES.map((g) => {
            const active = g.id === guideId;
            return (
              <button
                key={g.id}
                onClick={() => setGuideId(g.id)}
                aria-pressed={active}
                className={cn(
                  "flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-2 text-sm transition-all active:scale-95",
                  active
                    ? "border-primary/50 bg-primary/10 text-primary shadow-soft"
                    : "border-border bg-background/60 text-muted-foreground hover:border-primary/30 hover:text-foreground",
                )}
              >
                <span className="text-base">{g.emoji}</span>
                <span className="whitespace-nowrap font-medium">
                  {bi(g.name.en, g.name.kn)}
                </span>
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {bi(guide.tagline.en, guide.tagline.kn)}
        </p>

        {/* Reply language control */}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-muted-foreground">{bi("Reply in", "ಉತ್ತರ")}</span>
          {replyOpts.map((o) => (
            <button
              key={o.id}
              onClick={() => setReplyLang(o.id)}
              aria-pressed={replyLang === o.id}
              className={cn(
                "rounded-full border px-2.5 py-1 font-medium transition-colors",
                replyLang === o.id
                  ? "border-primary/50 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto flex h-[calc(100dvh-15rem)] min-h-[360px] max-w-3xl flex-col md:h-[calc(100vh-20rem)] md:min-h-[440px]">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="glass flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border p-4 md:p-6"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber-500 text-3xl shadow-glow">
              <span className="orbit-ping absolute inset-0 rounded-2xl border-2 border-primary/50" />
              <span aria-hidden>{guide.emoji}</span>
            </div>
            <p className="mt-5 text-sm font-medium text-muted-foreground">
              {bi(
                `Ask ${guide.name.en} anything about Karnataka`,
                `${guide.name.kn} ಅವರನ್ನು ಕರ್ನಾಟಕದ ಬಗ್ಗೆ ಕೇಳಿ`,
              )}
            </p>
            <div className="mt-4 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {guide.suggestions.map((s) => (
                <button
                  key={s.en}
                  onClick={() => send(s.en)}
                  className="group flex items-center gap-2.5 rounded-xl border border-border bg-background/60 px-4 py-3 text-left text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent hover:shadow-soft"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-base transition-colors group-hover:bg-primary/20">
                    {guide.emoji}
                  </span>
                  <span className="line-clamp-2">{bi(s.en, s.kn)}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div aria-live="polite" className="space-y-4">
            {messages.map((msg) => (
              <MessageBubble
                key={msg.id}
                msg={msg}
                speakLang={speechLang()}
                listenLabel={t("common.listen")}
                ttsLang={locale === "kn" ? "kn" : "en"}
                voiceLabel={bi("Play voice", "ಧ್ವನಿ ಕೇಳಿ")}
              />
            ))}
          </div>
        )}

        {thinking && (
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-500 text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </span>
            <div className="flex items-center gap-2 rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
              <span className="flex gap-1">
                <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
              </span>
              {t("chat.thinking")}
            </div>
          </div>
        )}
      </div>

      {/* Composer */}
      <div className="mt-3">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-center gap-2 rounded-xl border border-border bg-background p-2 shadow-sm transition-colors focus-within:border-primary/50 focus-within:shadow-glow"
        >
          {mounted && canListen() && (
            <Button
              type="button"
              variant={listening ? "default" : "ghost"}
              size="icon"
              onClick={onMic}
              aria-label={t("chat.speak")}
              className={cn(listening && "animate-pulse")}
            >
              <Mic className="h-5 w-5" />
            </Button>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={listening ? t("chat.listening") : t("chat.placeholder")}
            enterKeyHint="send"
            autoComplete="off"
            className="flex-1 bg-transparent px-2 text-base outline-none placeholder:text-muted-foreground sm:text-sm"
          />
          <Button type="submit" size="icon" disabled={!input.trim()} aria-label={t("chat.send")}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        <p className="mt-2 text-center text-xs text-muted-foreground">
          {t("chat.disclaimer")}
        </p>
      </div>
      </div>
    </div>
  );
}

function MessageBubble({
  msg,
  speakLang,
  listenLabel,
  ttsLang,
  voiceLabel,
}: {
  msg: Message;
  speakLang: "en-IN" | "kn-IN";
  listenLabel: string;
  ttsLang: "kn" | "en";
  voiceLabel: string;
}) {
  const isUser = msg.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-3 text-sm text-primary-foreground shadow-soft">
          <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start gap-3">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-amber-500 text-primary-foreground shadow-soft">
        <Sparkles className="h-4 w-4" />
      </span>
      <div className="max-w-[85%] rounded-2xl rounded-bl-sm border border-border bg-background px-4 py-3 text-sm shadow-soft">
        <p
          className={cn(
            "whitespace-pre-wrap leading-relaxed",
            msg.streaming && "type-caret",
          )}
        >
          {msg.text}
        </p>

        {!msg.streaming && msg.sources && msg.sources.length > 0 && (
          <div className="mt-3 flex animate-fade-up flex-wrap items-center gap-1.5 border-t border-border pt-2.5">
            <BookOpen className="h-3.5 w-3.5 text-primary" />
            {msg.sources.map((s) => (
              <span
                key={s}
                className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {!msg.streaming && msg.refs && msg.refs.length > 0 && (
          <div className="mt-2 flex animate-fade-up flex-wrap items-center gap-1.5">
            <Globe className="h-3.5 w-3.5 text-primary" />
            {msg.refs.map((r) => (
              <a
                key={r.url}
                href={r.url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-primary/25 bg-primary/5 px-2.5 py-0.5 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10"
              >
                {r.title}
              </a>
            ))}
          </div>
        )}

        {!msg.streaming && msg.text && (
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <CloudVoice text={msg.text} lang={ttsLang} label={voiceLabel} />
            {canSpeak() && (
              <ReadAloud text={msg.text} lang={speakLang} label={listenLabel} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/** Real cloud voice (Kannada or English) for an answer, via /api/tts. */
function CloudVoice({
  text,
  lang,
  label,
}: {
  text: string;
  lang: "kn" | "en";
  label: string;
}) {
  const [state, setState] = React.useState<"idle" | "loading" | "playing">(
    "idle",
  );
  const audioRef = React.useRef<HTMLAudioElement | null>(null);
  const urlRef = React.useRef<string | null>(null);

  React.useEffect(
    () => () => {
      audioRef.current?.pause();
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  const toggle = React.useCallback(async () => {
    if (state === "playing") {
      audioRef.current?.pause();
      setState("idle");
      return;
    }
    setState("loading");
    if (!urlRef.current) urlRef.current = await fetchTtsUrl(text, lang);
    if (!urlRef.current) {
      setState("idle");
      return;
    }
    const a = audioRef.current ?? new Audio();
    audioRef.current = a;
    a.src = urlRef.current;
    a.onended = () => setState("idle");
    a.onerror = () => setState("idle");
    try {
      await a.play();
      setState("playing");
    } catch {
      setState("idle");
    }
  }, [state, text, lang]);

  return (
    <button
      onClick={toggle}
      className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[11px] font-medium text-primary transition-colors hover:bg-primary/10 active:scale-95"
    >
      {state === "loading" ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : state === "playing" ? (
        <Pause className="h-3 w-3" />
      ) : (
        <Volume2 className="h-3 w-3" />
      )}
      {label}
    </button>
  );
}

function Dot({ delay = "0ms" }: { delay?: string }) {
  return (
    <span
      className="h-2 w-2 animate-bounce rounded-full bg-primary"
      style={{ animationDelay: delay }}
    />
  );
}
