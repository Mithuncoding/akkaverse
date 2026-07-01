"use client";

import * as React from "react";
import { Send, Mic, Sparkles, BookOpen, Compass, Landmark, PartyPopper, Languages } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { answerQuestion } from "@/data/knowledge";
import { streamAkka, getAiEnabled } from "@/lib/gemini";
import { listen, canListen, canSpeak } from "@/lib/speech";
import { ReadAloud } from "@/components/ui/read-aloud";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: string[];
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
  const { t, locale, speechLang } = useTranslation();
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [aiEnabled, setAiEnabled] = React.useState(false);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const streamTimer = React.useRef<number | null>(null);

  const suggestions = [
    { icon: Landmark, text: t("chat.suggest1") },
    { icon: Compass, text: t("chat.suggest2") },
    { icon: PartyPopper, text: t("chat.suggest3") },
    { icon: Languages, text: t("chat.suggest4") },
  ];

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

      void (async () => {
        const id = crypto.randomUUID();

        // Try real, live token streaming from the server (NVIDIA NIM).
        if (aiEnabled) {
          setThinking(false);
          setMessages((m) => [
            ...m,
            { id, role: "assistant", text: "", streaming: true },
          ]);
          let streamed = "";
          const full = await streamAkka(text, local.text, {
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
              new Set([...local.sources, "NVIDIA NIM · Llama 3.1"]),
            );
            setMessages((m) =>
              m.map((msg) =>
                msg.id === id
                  ? { ...msg, text: full, streaming: false, sources }
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
    [locale, streamReply, aiEnabled],
  );

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
              NVIDIA NIM
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

      <div className="mx-auto flex h-[calc(100dvh-15rem)] min-h-[360px] max-w-3xl flex-col md:h-[calc(100vh-20rem)] md:min-h-[440px]">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="glass flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border p-4 md:p-6"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-amber-500 text-primary-foreground shadow-glow">
              <span className="orbit-ping absolute inset-0 rounded-2xl border-2 border-primary/50" />
              <Sparkles className="h-8 w-8" />
            </div>
            <p className="mt-5 text-sm font-medium text-muted-foreground">
              {t("chat.empty")}
            </p>
            <div className="mt-4 grid w-full max-w-lg gap-2 sm:grid-cols-2">
              {suggestions.map(({ icon: Icon, text }) => (
                <button
                  key={text}
                  onClick={() => send(text)}
                  className="group flex items-center gap-2.5 rounded-xl border border-border bg-background/60 px-4 py-3 text-left text-sm text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/40 hover:bg-accent hover:shadow-soft"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="line-clamp-2">{text}</span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div aria-live="polite" className="space-y-4">
            {messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} speakLang={speechLang()} listenLabel={t("common.listen")} />
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
          {canListen() && (
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
}: {
  msg: Message;
  speakLang: "en-IN" | "kn-IN";
  listenLabel: string;
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

        {!msg.streaming && canSpeak() && (
          <div className="mt-2">
            <ReadAloud text={msg.text} lang={speakLang} label={listenLabel} />
          </div>
        )}
      </div>
    </div>
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
