"use client";

import * as React from "react";
import { Plus, Trash2, Quote } from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { ReadAloud } from "@/components/ui/read-aloud";

/** A single contributed memory. */
type Memory = {
  id: string;
  text: string;
  author: string;
  category: Category;
  createdAt: number;
  /** Seeds ship with the app and can't be deleted. */
  seed?: boolean;
};

type Category = "memory" | "proverb" | "song" | "story";

const CATEGORIES: { id: Category; emoji: string; en: string; kn: string }[] = [
  { id: "memory", emoji: "💭", en: "Memory", kn: "ನೆನಪು" },
  { id: "proverb", emoji: "🪔", en: "Proverb", kn: "ಗಾದೆ" },
  { id: "song", emoji: "🎵", en: "Folk song", kn: "ಜನಪದ ಹಾಡು" },
  { id: "story", emoji: "📖", en: "Story", kn: "ಕಥೆ" },
];

const catOf = (id: Category) =>
  CATEGORIES.find((c) => c.id === id) ?? CATEGORIES[0];

const STORAGE_KEY = "akkaverse.memories";

/** Pre-seeded Kannada proverbs so the wall is never empty. */
const SEEDS: Memory[] = [
  {
    id: "seed-1",
    text: "ಅತಿಯಾದರೆ ಅಮೃತವೂ ವಿಷ.",
    author: "ಗಾದೆ ಮಾತು",
    category: "proverb",
    createdAt: 0,
    seed: true,
  },
  {
    id: "seed-2",
    text: "ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು.",
    author: "ಗಾದೆ ಮಾತು",
    category: "proverb",
    createdAt: 0,
    seed: true,
  },
  {
    id: "seed-3",
    text: "ಹಿತ್ತಲ ಗಿಡ ಮದ್ದಲ್ಲ.",
    author: "ಗಾದೆ ಮಾತು",
    category: "proverb",
    createdAt: 0,
    seed: true,
  },
];

/** True when the string contains Kannada script (to pick the read-aloud voice). */
const isKannada = (s: string) => /[\u0C80-\u0CFF]/.test(s);

/**
 * Memory Wall — a community heritage scrapbook.
 *
 * Visitors add a proverb, folk song, story, or a memory from their elders.
 * Everything is saved in the browser (localStorage) — no account, no backend,
 * fully free — so the wall grows on each device while honouring the project's
 * mission of preserving what elders carry.
 */
export function MemoryWallView() {
  const { bi, locale } = useTranslation();
  const [items, setItems] = React.useState<Memory[]>([]);
  const [text, setText] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [category, setCategory] = React.useState<Category>("memory");
  const [filter, setFilter] = React.useState<Category | "all">("all");
  const [loaded, setLoaded] = React.useState(false);

  // Load saved memories once on mount.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const saved: Memory[] = raw ? JSON.parse(raw) : [];
      setItems(saved);
    } catch {
      setItems([]);
    }
    setLoaded(true);
  }, []);

  // Persist whenever the user's memories change (seeds are never stored).
  React.useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, loaded]);

  const add = (e: React.FormEvent) => {
    e.preventDefault();
    const body = text.trim();
    if (!body) return;
    const entry: Memory = {
      id: `m-${Date.now()}`,
      text: body,
      author: author.trim() || bi("Anonymous", "ಅನಾಮಧೇಯ"),
      category,
      createdAt: Date.now(),
    };
    setItems((prev) => [entry, ...prev]);
    setText("");
    setAuthor("");
  };

  const remove = (id: string) =>
    setItems((prev) => prev.filter((m) => m.id !== id));

  // Seeds first only when nothing user-made matches; otherwise newest first.
  const all = React.useMemo(() => [...items, ...SEEDS], [items]);
  const visible = React.useMemo(
    () => (filter === "all" ? all : all.filter((m) => m.category === filter)),
    [all, filter],
  );

  return (
    <div className="relative overflow-hidden">
      {/* Aurora backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[10%] top-16 h-64 w-64 animate-float-slow bg-primary/25" />
        <div className="aurora-blob right-[8%] top-40 h-72 w-72 animate-float bg-amber-400/20" />
        <div className="absolute inset-0 bg-dotgrid [mask-image:radial-gradient(60%_45%_at_50%_15%,#000,transparent)]" />
      </div>

      <div className="container py-12 md:py-24">
        {/* Header */}
        <header className="mx-auto mb-8 max-w-2xl text-center md:mb-10">
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm text-muted-foreground shadow-soft">
            🧱 {bi("Memory Wall", "ನೆನಪಿನ ಗೋಡೆ")}
          </span>
          <h1 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            <span className="gradient-text">
              {bi("Leave a memory", "ಒಂದು ನೆನಪು ಬಿಡಿ")}
            </span>
          </h1>
          <p className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg">
            {bi(
              "Add a proverb, a folk song, a story, or a memory from your elders. Every note helps keep Kannada heritage alive for the next generation.",
              "ಒಂದು ಗಾದೆ, ಜನಪದ ಹಾಡು, ಕಥೆ ಅಥವಾ ಹಿರಿಯರ ನೆನಪನ್ನು ಸೇರಿಸಿ. ಪ್ರತಿ ಬರಹವೂ ಕನ್ನಡ ಪರಂಪರೆಯನ್ನು ಮುಂದಿನ ಪೀಳಿಗೆಗೆ ಜೀವಂತವಾಗಿಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
            )}
          </p>
        </header>

        {/* Add form */}
        <form
          onSubmit={add}
          className="glass mx-auto mb-12 max-w-2xl rounded-3xl p-6 shadow-soft"
        >
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={3}
            placeholder={bi(
              "Share a proverb, song, story, or memory…",
              "ಗಾದೆ, ಹಾಡು, ಕಥೆ ಅಥವಾ ನೆನಪನ್ನು ಹಂಚಿಕೊಳ್ಳಿ…",
            )}
            className="w-full resize-none rounded-2xl border border-border bg-background/60 p-4 text-base outline-none transition-colors focus:border-primary"
          />

          <div className="mt-3 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setCategory(c.id)}
                aria-pressed={category === c.id}
                className={cn(
                  "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
                  category === c.id
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {c.emoji} {bi(c.en, c.kn)}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <input
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder={bi("Your name (optional)", "ನಿಮ್ಮ ಹೆಸರು (ಐಚ್ಛಿಕ)")}
              className="flex-1 rounded-full border border-border bg-background/60 px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary"
            />
            <button
              type="submit"
              disabled={!text.trim()}
              className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <Plus className="h-4 w-4" />
              {bi("Add to wall", "ಗೋಡೆಗೆ ಸೇರಿಸಿ")}
            </button>
          </div>
        </form>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap justify-center gap-2">
          <FilterChip
            label={bi("All", "ಎಲ್ಲಾ")}
            active={filter === "all"}
            onClick={() => setFilter("all")}
          />
          {CATEGORIES.map((c) => (
            <FilterChip
              key={c.id}
              label={`${c.emoji} ${bi(c.en, c.kn)}`}
              active={filter === c.id}
              onClick={() => setFilter(c.id)}
            />
          ))}
        </div>

        {/* Wall */}
        {visible.length === 0 ? (
          <p className="text-center text-muted-foreground">
            {bi("Nothing here yet — be the first.", "ಇಲ್ಲಿ ಇನ್ನೂ ಏನೂ ಇಲ್ಲ — ಮೊದಲಿಗರಾಗಿ.")}
          </p>
        ) : (
          <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
            {visible.map((m) => {
              const c = catOf(m.category);
              return (
                <article
                  key={m.id}
                  className="glow-ring group relative break-inside-avoid rounded-2xl border border-border bg-card/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow"
                >
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                      {c.emoji} {bi(c.en, c.kn)}
                    </span>
                    <div className="flex items-center gap-1">
                      <ReadAloud
                        text={m.text}
                        lang={isKannada(m.text) ? "kn-IN" : "en-IN"}
                      />
                      {!m.seed && (
                        <button
                          onClick={() => remove(m.id)}
                          aria-label={bi("Delete", "ಅಳಿಸಿ")}
                          className="rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  <Quote className="mt-3 h-4 w-4 text-primary/50" />
                  <p className="mt-2 whitespace-pre-line text-pretty text-[15px] leading-relaxed">
                    {m.text}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary">
                    — {m.author}
                  </p>
                </article>
              );
            })}
          </div>
        )}

        {/* Count */}
        {loaded && items.length > 0 && (
          <p className="mt-10 text-center text-sm text-muted-foreground">
            {locale === "kn"
              ? `${items.length} ನೆನಪುಗಳನ್ನು ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ`
              : bi(
                  `${items.length} memories saved on this device`,
                  `${items.length} ನೆನಪುಗಳನ್ನು ಈ ಸಾಧನದಲ್ಲಿ ಉಳಿಸಲಾಗಿದೆ`,
                )}
          </p>
        )}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border bg-card text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </button>
  );
}
