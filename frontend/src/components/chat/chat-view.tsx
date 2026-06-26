"use client";

import * as React from "react";
import { Send, Mic, Sparkles, BookOpen } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { answerQuestion } from "@/data/knowledge";
import { listen, canListen, canSpeak } from "@/lib/speech";
import { ReadAloud } from "@/components/ui/read-aloud";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  role: "user" | "assistant";
  text: string;
  sources?: string[];
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
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const suggestions = [
    t("chat.suggest1"),
    t("chat.suggest2"),
    t("chat.suggest3"),
    t("chat.suggest4"),
  ];

  React.useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = React.useCallback(
    (raw: string) => {
      const text = raw.trim();
      if (!text) return;

      const userMsg: Message = { id: crypto.randomUUID(), role: "user", text };
      setMessages((m) => [...m, userMsg]);
      setInput("");
      setThinking(true);

      // Simulate retrieval latency for a natural feel.
      window.setTimeout(() => {
        const reply = answerQuestion(text, locale);
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: "assistant",
            text: reply.text,
            sources: reply.sources,
          },
        ]);
        setThinking(false);
      }, 650);
    },
    [locale],
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
    <div className="container py-10 md:py-14">
      <header className="mx-auto mb-8 max-w-2xl text-center">
        <span className="rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-sm text-muted-foreground">
          ✨ {t("chat.badge")}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-4xl">
          {t("chat.title")}
        </h1>
        <p className="mt-3 text-muted-foreground">{t("chat.subtitle")}</p>
      </header>

      <div className="mx-auto flex h-[calc(100vh-20rem)] min-h-[420px] max-w-3xl flex-col">
      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 space-y-4 overflow-y-auto rounded-2xl border border-border bg-card/40 p-4 md:p-6"
      >
        {messages.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Sparkles className="h-7 w-7" />
            </div>
            <p className="mt-4 text-sm font-medium text-muted-foreground">
              {t("chat.empty")}
            </p>
            <div className="mt-4 flex max-w-lg flex-wrap justify-center gap-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors hover:border-primary/40 hover:bg-accent"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg) => (
            <MessageBubble key={msg.id} msg={msg} speakLang={speechLang()} listenLabel={t("common.listen")} />
          ))
        )}

        {thinking && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span className="flex gap-1">
              <Dot /> <Dot delay="150ms" /> <Dot delay="300ms" />
            </span>
            {t("chat.thinking")}
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
          className="flex items-center gap-2 rounded-xl border border-border bg-background p-2 shadow-sm focus-within:border-primary/50"
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
            className="flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted-foreground"
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
  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm",
          isUser
            ? "rounded-br-sm bg-primary text-primary-foreground"
            : "rounded-bl-sm border border-border bg-background",
        )}
      >
        <p className="whitespace-pre-wrap leading-relaxed">{msg.text}</p>

        {!isUser && msg.sources && msg.sources.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center gap-1.5 border-t border-border pt-2">
            <BookOpen className="h-3.5 w-3.5 text-muted-foreground" />
            {msg.sources.map((s) => (
              <span
                key={s}
                className="rounded-full bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>
        )}

        {!isUser && canSpeak() && (
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
