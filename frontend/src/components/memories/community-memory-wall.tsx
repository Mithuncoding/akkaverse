"use client";

import * as React from "react";
import Link from "next/link";
import {
  Cloud,
  Loader2,
  LockKeyhole,
  LogIn,
  Plus,
  Quote,
  Radio,
  Trash2,
  Users,
} from "lucide-react";

import { useAuth } from "@/components/auth/auth-provider";
import { ReadAloud } from "@/components/ui/read-aloud";
import { useTranslation } from "@/i18n/language-provider";
import {
  useCommunityMemories,
  type CommunityCategory,
} from "@/lib/memories/community";
import { cn } from "@/lib/utils";

type LocalMemory = {
  id: string;
  text: string;
  author: string;
  category: CommunityCategory;
  createdAt: number;
  seed?: boolean;
};

type Tab = "private" | "community";

const CATEGORIES: {
  id: CommunityCategory;
  emoji: string;
  en: string;
  kn: string;
}[] = [
  { id: "memory", emoji: "💭", en: "Memory", kn: "ನೆನಪು" },
  { id: "proverb", emoji: "🪔", en: "Proverb", kn: "ಗಾದೆ" },
  { id: "song", emoji: "🎵", en: "Folk song", kn: "ಜನಪದ ಹಾಡು" },
  { id: "story", emoji: "📖", en: "Story", kn: "ಕಥೆ" },
];

const SEEDS: LocalMemory[] = [
  { id: "seed-1", text: "ಅತಿಯಾದರೆ ಅಮೃತವೂ ವಿಷ.", author: "ಗಾದೆ ಮಾತು", category: "proverb", createdAt: 0, seed: true },
  { id: "seed-2", text: "ಕೈ ಕೆಸರಾದರೆ ಬಾಯಿ ಮೊಸರು.", author: "ಗಾದೆ ಮಾತು", category: "proverb", createdAt: 0, seed: true },
  { id: "seed-3", text: "ಹಿತ್ತಲ ಗಿಡ ಮದ್ದಲ್ಲ.", author: "ಗಾದೆ ಮಾತು", category: "proverb", createdAt: 0, seed: true },
];

const isKannada = (text: string) => /[\u0C80-\u0CFF]/.test(text);
const categoryFor = (id: CommunityCategory) =>
  CATEGORIES.find((category) => category.id === id) ?? CATEGORIES[0];

export function CommunityMemoryWall() {
  const { bi } = useTranslation();
  const auth = useAuth();
  const community = useCommunityMemories();
  const [tab, setTab] = React.useState<Tab>("private");
  const [localItems, setLocalItems] = React.useState<LocalMemory[]>([]);
  const [loadedKey, setLoadedKey] = React.useState("");
  const [text, setText] = React.useState("");
  const [author, setAuthor] = React.useState("");
  const [district, setDistrict] = React.useState("");
  const [category, setCategory] =
    React.useState<CommunityCategory>("memory");
  const [filter, setFilter] =
    React.useState<CommunityCategory | "all">("all");
  const [publishing, setPublishing] = React.useState(false);
  const [formError, setFormError] = React.useState("");

  const storageKey = auth.user
    ? `akkaverse.memories:${auth.user.id}`
    : "akkaverse.memories";

  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      setLocalItems(raw ? JSON.parse(raw) : []);
    } catch {
      setLocalItems([]);
    }
    setLoadedKey(storageKey);
  }, [storageKey]);

  React.useEffect(() => {
    if (loadedKey !== storageKey) return;
    localStorage.setItem(storageKey, JSON.stringify(localItems));
  }, [loadedKey, localItems, storageKey]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const body = text.trim();
    if (!body) return;
    setFormError("");
    if (tab === "private") {
      setLocalItems((current) => [
        {
          id: `m-${Date.now()}`,
          text: body,
          author: author.trim() || bi("Anonymous", "ಅನಾಮಧೇಯ"),
          category,
          createdAt: Date.now(),
        },
        ...current,
      ]);
      setText("");
      setAuthor("");
      return;
    }

    setPublishing(true);
    const error = await community.publish({ text: body, category, district });
    setPublishing(false);
    if (error) {
      setFormError(error);
      return;
    }
    setText("");
    setDistrict("");
  };

  const privateMemories = [...localItems, ...SEEDS];
  const visiblePrivate =
    filter === "all"
      ? privateMemories
      : privateMemories.filter((memory) => memory.category === filter);
  const visibleCommunity =
    filter === "all"
      ? community.items
      : community.items.filter((memory) => memory.category === filter);

  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dotgrid opacity-30" />
      <div className="container py-12 md:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {bi("Living Memory Wall", "ಜೀವಂತ ನೆನಪಿನ ಗೋಡೆ")}
          </p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            {bi("What one family remembers, a generation keeps", "ಒಂದು ಕುಟುಂಬ ನೆನಪಿಟ್ಟದ್ದು, ಒಂದು ಪೀಳಿಗೆ ಉಳಿಸುತ್ತದೆ")}
          </h1>
          <p className="mt-4 text-base text-muted-foreground sm:text-lg">
            {bi(
              "Keep a private family note on this device, or publish a consented proverb, song, story, or memory to the community in real time.",
              "ಈ ಸಾಧನದಲ್ಲಿ ಖಾಸಗಿ ಕುಟುಂಬದ ಟಿಪ್ಪಣಿ ಉಳಿಸಿ, ಅಥವಾ ಒಪ್ಪಿಗೆಯ ಗಾದೆ, ಹಾಡು, ಕಥೆ ಅಥವಾ ನೆನಪನ್ನು ಸಮುದಾಯಕ್ಕೆ ನೈಜ ಸಮಯದಲ್ಲಿ ಪ್ರಕಟಿಸಿ.",
            )}
          </p>
        </header>

        <div className="mx-auto mt-8 grid max-w-xl grid-cols-2 rounded-2xl border border-border bg-card p-1.5">
          <TabButton active={tab === "private"} onClick={() => setTab("private")} icon={LockKeyhole} label={bi("My family", "ನನ್ನ ಕುಟುಂಬ")} />
          <TabButton active={tab === "community"} onClick={() => setTab("community")} icon={Users} label={bi("Community live", "ಸಮುದಾಯ ಲೈವ್")} />
        </div>

        <div className="mx-auto mt-4 flex max-w-2xl items-center justify-center gap-2 text-xs text-muted-foreground">
          {tab === "private" ? (
            <><LockKeyhole className="h-3.5 w-3.5 text-primary" />{bi("Saved only in this account's browser cache", "ಈ ಖಾತೆಯ ಬ್ರೌಸರ್ ಕ್ಯಾಶ್‌ನಲ್ಲಿ ಮಾತ್ರ ಉಳಿಸಲಾಗಿದೆ")}</>
          ) : community.status === "live" ? (
            <><span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60" /><span className="relative h-2.5 w-2.5 rounded-full bg-emerald-500" /></span>{bi("Realtime connection active", "ನೈಜ-ಸಮಯ ಸಂಪರ್ಕ ಸಕ್ರಿಯ")}</>
          ) : community.status === "loading" ? (
            <><Loader2 className="h-3.5 w-3.5 animate-spin" />{bi("Connecting…", "ಸಂಪರ್ಕಿಸಲಾಗುತ್ತಿದೆ…")}</>
          ) : (
            <><Cloud className="h-3.5 w-3.5" />{bi("Supabase setup required", "Supabase ಸೆಟಪ್ ಅಗತ್ಯ")}</>
          )}
        </div>

        {tab === "community" && auth.status !== "authenticated" ? (
          <section className="mx-auto mt-8 max-w-2xl rounded-3xl border border-primary/20 bg-card p-7 text-center shadow-soft">
            <LogIn className="mx-auto h-7 w-7 text-primary" />
            <h2 className="mt-4 text-xl font-bold">{bi("Sign in to contribute", "ಕೊಡುಗೆ ನೀಡಲು ಸೈನ್ ಇನ್ ಮಾಡಿ")}</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {bi("Everyone can read the wall. A verified account is required to publish or remove your own memory.", "ಎಲ್ಲರೂ ಗೋಡೆಯನ್ನು ಓದಬಹುದು. ನಿಮ್ಮ ನೆನಪನ್ನು ಪ್ರಕಟಿಸಲು ಅಥವಾ ತೆಗೆದುಹಾಕಲು ದೃಢೀಕೃತ ಖಾತೆ ಅಗತ್ಯ.")}
            </p>
            <Link href="/login?next=/memories" className="mt-5 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground">
              <LogIn className="h-4 w-4" />{bi("Sign in", "ಸೈನ್ ಇನ್")}
            </Link>
          </section>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-8 max-w-2xl rounded-3xl border border-border bg-card p-5 shadow-soft sm:p-7">
            {tab === "community" && (
              <div className="mb-4 flex items-center justify-between gap-3 rounded-xl bg-primary/[0.06] px-3 py-2 text-xs">
                <span>{bi("Publishing as", "ಈ ಹೆಸರಿನಲ್ಲಿ ಪ್ರಕಟಿಸಲಾಗುತ್ತಿದೆ")} <strong>{auth.displayName}</strong></span>
                <span className="inline-flex items-center gap-1 text-emerald-600"><Radio className="h-3 w-3" /> Live</span>
              </div>
            )}
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              rows={4}
              maxLength={1000}
              placeholder={bi("Share a proverb, song, story, or memory…", "ಗಾದೆ, ಹಾಡು, ಕಥೆ ಅಥವಾ ನೆನಪನ್ನು ಹಂಚಿಕೊಳ್ಳಿ…")}
              className="w-full resize-y rounded-2xl border border-border bg-background/70 p-4 text-base outline-none focus:border-primary"
            />
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((item) => (
                <FilterChip key={item.id} label={`${item.emoji} ${bi(item.en, item.kn)}`} active={category === item.id} onClick={() => setCategory(item.id)} />
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              {tab === "private" ? (
                <input value={author} onChange={(event) => setAuthor(event.target.value)} placeholder={bi("Family member (optional)", "ಕುಟುಂಬದ ಸದಸ್ಯ (ಐಚ್ಛಿಕ)")} className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-base outline-none focus:border-primary" />
              ) : (
                <input value={district} onChange={(event) => setDistrict(event.target.value)} placeholder={bi("District or place (optional)", "ಜಿಲ್ಲೆ ಅಥವಾ ಸ್ಥಳ (ಐಚ್ಛಿಕ)")} className="h-11 flex-1 rounded-xl border border-border bg-background px-4 text-base outline-none focus:border-primary" />
              )}
              <button type="submit" disabled={!text.trim() || publishing} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground disabled:opacity-50">
                {publishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
                {tab === "private" ? bi("Save privately", "ಖಾಸಗಿಯಾಗಿ ಉಳಿಸಿ") : bi("Publish live", "ಲೈವ್ ಪ್ರಕಟಿಸಿ")}
              </button>
            </div>
            {formError && <p role="alert" className="mt-3 text-sm text-destructive">{formError}</p>}
          </form>
        )}

        <div className="scroll-touch no-scrollbar -mx-[1.15rem] mt-9 flex gap-2 overflow-x-auto px-[1.15rem] pb-1 sm:mx-0 sm:justify-center sm:overflow-visible sm:px-0">
          <FilterChip label={bi("All", "ಎಲ್ಲಾ")} active={filter === "all"} onClick={() => setFilter("all")} />
          {CATEGORIES.map((item) => (
            <FilterChip key={item.id} label={`${item.emoji} ${bi(item.en, item.kn)}`} active={filter === item.id} onClick={() => setFilter(item.id)} />
          ))}
        </div>

        {tab === "private" ? (
          <MemoryGrid
            memories={visiblePrivate.map((memory) => ({
              id: memory.id,
              text: memory.text,
              author: memory.author,
              category: memory.category,
              canDelete: !memory.seed,
            }))}
            onDelete={(id) => setLocalItems((current) => current.filter((item) => item.id !== id))}
          />
        ) : community.status === "unavailable" ? (
          <EmptyState text={bi("Connect Supabase to open the live wall.", "ಲೈವ್ ಗೋಡೆಯನ್ನು ತೆರೆಯಲು Supabase ಸಂಪರ್ಕಿಸಿ.")} />
        ) : community.status === "error" ? (
          <EmptyState text={community.error || bi("The live wall is temporarily unavailable.", "ಲೈವ್ ಗೋಡೆ ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ.")} />
        ) : (
          <MemoryGrid
            memories={visibleCommunity.map((memory) => ({
              id: memory.id,
              text: memory.text,
              author: memory.author_name,
              category: memory.category,
              place: memory.district ?? undefined,
              canDelete: memory.user_id === auth.user?.id,
            }))}
            onDelete={async (id) => {
              const error = await community.remove(id);
              if (error) setFormError(error);
            }}
          />
        )}
      </div>
    </main>
  );
}

type DisplayMemory = {
  id: string;
  text: string;
  author: string;
  category: CommunityCategory;
  place?: string;
  canDelete: boolean;
};

function MemoryGrid({ memories, onDelete }: { memories: DisplayMemory[]; onDelete: (id: string) => void | Promise<void> }) {
  const { bi } = useTranslation();
  if (memories.length === 0) return <EmptyState text={bi("Nothing here yet — be the first.", "ಇಲ್ಲಿ ಇನ್ನೂ ಏನೂ ಇಲ್ಲ — ಮೊದಲಿಗರಾಗಿ.")} />;
  return (
    <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5">
      {memories.map((memory) => {
        const category = categoryFor(memory.category);
        return (
          <article key={memory.id} className="group relative break-inside-avoid rounded-2xl border border-border bg-card/90 p-5 transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-glow">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">{category.emoji} {bi(category.en, category.kn)}</span>
              <div className="flex items-center gap-1">
                <ReadAloud text={memory.text} lang={isKannada(memory.text) ? "kn-IN" : "en-IN"} />
                {memory.canDelete && (
                  <button type="button" onClick={() => onDelete(memory.id)} aria-label={bi("Delete", "ಅಳಿಸಿ")} className="rounded-full p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
            <Quote className="mt-4 h-4 w-4 text-primary/50" />
            <p className="mt-2 whitespace-pre-line text-[15px] leading-relaxed">{memory.text}</p>
            <p className="mt-4 text-sm font-medium text-primary">— {memory.author}</p>
            {memory.place && <p className="mt-1 text-xs text-muted-foreground">{memory.place}</p>}
          </article>
        );
      })}
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }: { active: boolean; onClick: () => void; icon: React.ElementType; label: string }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("flex min-h-11 items-center justify-center gap-2 rounded-xl px-3 text-sm font-medium", active ? "bg-primary text-primary-foreground shadow-glow" : "text-muted-foreground")}>
      <Icon className="h-4 w-4" />{label}
    </button>
  );
}

function FilterChip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-pressed={active} className={cn("shrink-0 whitespace-nowrap rounded-full border px-3 py-1.5 text-sm", active ? "border-primary bg-primary text-primary-foreground" : "border-border bg-card text-muted-foreground")}>
      {label}
    </button>
  );
}

function EmptyState({ text }: { text: string }) {
  return <p className="mt-10 text-center text-sm text-muted-foreground">{text}</p>;
}