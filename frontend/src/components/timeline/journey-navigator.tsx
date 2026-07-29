"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Clock3,
  Landmark,
  MapPin,
  Search,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { chapters } from "@/data/journey";
import { timelineEvents } from "@/data/timeline";

type SearchKind = "era" | "milestone" | "person" | "place" | "idea";

type SearchItem = {
  id: string;
  kind: SearchKind;
  title: string;
  titleKn: string;
  eyebrow: string;
  eyebrowKn: string;
  detail: string;
  detailKn: string;
  targetId: string;
  searchText: string;
};

const KIND_META: Record<
  SearchKind,
  { icon: LucideIcon; label: string; labelKn: string }
> = {
  era: { icon: BookOpen, label: "Era", labelKn: "ಯುಗ" },
  milestone: { icon: Clock3, label: "Milestone", labelKn: "ಮೈಲಿಗಲ್ಲು" },
  person: { icon: UserRound, label: "Person", labelKn: "ವ್ಯಕ್ತಿ" },
  place: { icon: MapPin, label: "Place", labelKn: "ಸ್ಥಳ" },
  idea: { icon: Sparkles, label: "Idea", labelKn: "ಕಲ್ಪನೆ" },
};

const chapterIdForEvent = (event: (typeof timelineEvents)[number]) => {
  if (event.era === "Ancient") return "ancient-dawn";
  if (event.era === "Classical") return "chalukya-rashtrakuta";
  if (event.era === "Medieval") {
    return event.id === "basavanna-vachana" ? "vachana" : "hoysala";
  }
  if (event.era === "Vijayanagara") return "vijayanagara";
  if (event.era === "Mysore") return "mysore-tipu";
  return "modern";
};

const SEARCH_ITEMS: SearchItem[] = [
  ...chapters.flatMap<SearchItem>((chapter) => [
    {
      id: `era-${chapter.id}`,
      kind: "era",
      title: chapter.name,
      titleKn: chapter.nameKn,
      eyebrow: chapter.years,
      eyebrowKn: chapter.years,
      detail: chapter.essence,
      detailKn: chapter.essenceKn,
      targetId: chapter.id,
      searchText: `${chapter.name} ${chapter.nameKn} ${chapter.years} ${chapter.essence} ${chapter.essenceKn}`,
    },
    ...chapter.figures.map((figure) => ({
      id: `person-${chapter.id}-${figure.name}`,
      kind: "person" as const,
      title: figure.name,
      titleKn: figure.nameKn,
      eyebrow: figure.role,
      eyebrowKn: figure.roleKn,
      detail: figure.blurb,
      detailKn: figure.blurb,
      targetId: chapter.id,
      searchText: `${figure.name} ${figure.nameKn} ${figure.role} ${figure.roleKn} ${figure.blurb} ${figure.fact}`,
    })),
    ...chapter.facets.map((facet) => ({
      id: `idea-${chapter.id}-${facet.title}`,
      kind: "idea" as const,
      title: facet.title,
      titleKn: facet.title,
      eyebrow: facet.kicker.split(" · ")[0],
      eyebrowKn: facet.kickerKn,
      detail: facet.body,
      detailKn: facet.body,
      targetId: chapter.id,
      searchText: `${facet.title} ${facet.kicker} ${facet.kickerKn} ${facet.body}`,
    })),
    ...(chapter.capital
      ? [
          {
            id: `place-${chapter.id}`,
            kind: "place" as const,
            title: chapter.capital.name,
            titleKn: chapter.capital.nameKn,
            eyebrow: `Capital of ${chapter.name}`,
            eyebrowKn: `${chapter.nameKn} ರಾಜಧಾನಿ`,
            detail: chapter.essence,
            detailKn: chapter.essenceKn,
            targetId: chapter.id,
            searchText: `${chapter.capital.name} ${chapter.capital.nameKn} ${chapter.name} ${chapter.nameKn}`,
          },
        ]
      : []),
  ]),
  ...timelineEvents.map<SearchItem>((event) => {
    return {
      id: `milestone-${event.id}`,
      kind: "milestone",
      title: event.title,
      titleKn: event.titleKn ?? event.title,
      eyebrow: event.year,
      eyebrowKn: event.year,
      detail: event.description,
      detailKn: event.descriptionKn ?? event.description,
      targetId: chapterIdForEvent(event),
      searchText: `${event.year} ${event.title} ${event.titleKn ?? ""} ${event.description} ${event.descriptionKn ?? ""} ${event.place ?? ""} ${event.figure ?? ""}`,
    };
  }),
];

function searchHistory(query: string) {
  const words = query.toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  if (!words.length) {
    return SEARCH_ITEMS.filter((item) => item.kind === "era").slice(0, 8);
  }

  return SEARCH_ITEMS.filter((item) => {
    const haystack = item.searchText.toLocaleLowerCase();
    return words.every((word) => haystack.includes(word));
  }).slice(0, 18);
}

export function JourneyNavigator({
  active,
  progress,
  onGo,
}: {
  active: number;
  progress: number;
  onGo: (id: string) => void;
}) {
  const { bi } = useTranslation();
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selected, setSelected] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const activeChapter = chapters[active] ?? chapters[0];
  const results = searchHistory(query);

  React.useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setOpen((value) => !value);
      }
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  React.useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  React.useEffect(() => setSelected(0), [query]);

  const move = (direction: -1 | 1) => {
    const next = Math.min(Math.max(active + direction, 0), chapters.length - 1);
    onGo(chapters[next].id);
  };

  const choose = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    onGo(item.targetId);
  };

  return (
    <>
      <nav
        aria-label={bi("Journey navigator", "ಯಾತ್ರೆ ಮಾರ್ಗದರ್ಶಿ")}
        className="sticky top-16 z-40 border-y border-border/70 bg-background/90 shadow-[0_10px_40px_-24px_hsl(var(--foreground)/0.35)] backdrop-blur-xl"
      >
        <div className="container flex h-[4.5rem] items-center gap-3">
          <div className="flex min-w-0 items-center gap-3 lg:w-56 lg:shrink-0">
            <span
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-xs font-black text-white shadow-sm"
              style={{ backgroundColor: `rgb(${activeChapter.accent})` }}
            >
              {activeChapter.numeral}
            </span>
            <div className="min-w-0">
              <div className="truncate text-sm font-bold leading-tight">
                {bi(activeChapter.name, activeChapter.nameKn)}
              </div>
              <div className="mt-0.5 text-[11px] font-semibold uppercase text-muted-foreground">
                {activeChapter.years}
              </div>
            </div>
          </div>

          <div className="relative hidden min-w-0 flex-1 px-2 lg:block">
            <div className="absolute left-5 right-5 top-3 h-px bg-border" />
            <div
              className="absolute left-5 top-3 h-px bg-foreground transition-[width] duration-300"
              style={{ width: `calc((100% - 2.5rem) * ${progress / 100})` }}
            />
            <div className="relative grid grid-cols-8">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.id}
                  type="button"
                  onClick={() => onGo(chapter.id)}
                  aria-label={`${chapter.name}, ${chapter.years}`}
                  aria-current={active === index ? "step" : undefined}
                  className="group flex min-w-0 flex-col items-center gap-1.5"
                >
                  <span
                    className={cn(
                      "h-6 w-6 rounded-full border-[5px] transition-all duration-300",
                      active === index
                        ? "scale-110 border-background ring-2"
                        : "border-background opacity-50 group-hover:scale-110 group-hover:opacity-100",
                    )}
                    style={{
                      backgroundColor: `rgb(${chapter.accent})`,
                      ...(active === index
                        ? { boxShadow: `0 0 0 2px rgb(${chapter.accent})` }
                        : {}),
                    }}
                  />
                  <span
                    className={cn(
                      "max-w-full truncate text-[10px] font-semibold transition-colors",
                      active === index ? "text-foreground" : "text-muted-foreground",
                    )}
                  >
                    {chapter.years.split(" ")[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="ml-auto flex shrink-0 items-center gap-1.5">
            <span className="mr-1 hidden text-xs tabular-nums text-muted-foreground xl:inline">
              {Math.round(progress)}%
            </span>
            <button
              type="button"
              onClick={() => move(-1)}
              disabled={active === 0}
              aria-label={bi("Previous era", "ಹಿಂದಿನ ಯುಗ")}
              className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card transition-colors hover:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              disabled={active === chapters.length - 1}
              aria-label={bi("Next era", "ಮುಂದಿನ ಯುಗ")}
              className="grid h-9 w-9 place-items-center rounded-md border border-border bg-card transition-colors hover:border-foreground/30 disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={bi("Explore history", "ಇತಿಹಾಸ ಹುಡುಕಿ")}
              className="ml-1 inline-flex h-9 items-center gap-2 rounded-md bg-foreground px-3 text-xs font-semibold text-background transition-transform active:scale-[0.97]"
            >
              <Search className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">
                {bi("Explore history", "ಇತಿಹಾಸ ಹುಡುಕಿ")}
              </span>
            </button>
          </div>
        </div>
        <div className="h-0.5 bg-border/40 lg:hidden">
          <div
            className="h-full transition-[width] duration-300"
            style={{
              width: `${progress}%`,
              backgroundColor: `rgb(${activeChapter.accent})`,
            }}
          />
        </div>
      </nav>

      {open && (
        <div
          className="fixed inset-0 z-[80] flex items-start justify-center bg-foreground/55 p-3 pt-[8vh] backdrop-blur-sm sm:p-6 sm:pt-[10vh]"
          onMouseDown={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={bi("Explore Karnataka history", "ಕರ್ನಾಟಕ ಇತಿಹಾಸ ಹುಡುಕಿ")}
            className="flex max-h-[80vh] w-full max-w-3xl flex-col overflow-hidden rounded-lg border border-border bg-background shadow-2xl"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-3 border-b border-border px-4 sm:px-5">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setSelected((value) => Math.min(value + 1, results.length - 1));
                  }
                  if (event.key === "ArrowUp") {
                    event.preventDefault();
                    setSelected((value) => Math.max(value - 1, 0));
                  }
                  if (event.key === "Enter" && results[selected]) {
                    choose(results[selected]);
                  }
                }}
                placeholder={bi(
                  "Search people, places, empires, ideas…",
                  "ವ್ಯಕ್ತಿಗಳು, ಸ್ಥಳಗಳು, ಸಾಮ್ರಾಜ್ಯಗಳನ್ನು ಹುಡುಕಿ…",
                )}
                className="h-16 min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={bi("Close", "ಮುಚ್ಚಿ")}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="border-b border-border bg-muted/35 px-5 py-2 text-[11px] font-semibold uppercase text-muted-foreground">
              {query
                ? bi(`${results.length} discoveries`, `${results.length} ಫಲಿತಾಂಶಗಳು`)
                : bi("Choose an era or start typing", "ಯುಗವನ್ನು ಆರಿಸಿ ಅಥವಾ ಹುಡುಕಿ")}
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto p-2">
              {results.length > 0 ? (
                <ul role="listbox" aria-label={bi("Search results", "ಹುಡುಕಾಟ ಫಲಿತಾಂಶಗಳು")}>
                  {results.map((item, index) => {
                    const meta = KIND_META[item.kind];
                    const Icon = meta.icon;
                    const target = chapters.find((chapter) => chapter.id === item.targetId);
                    return (
                      <li key={item.id}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={selected === index}
                          onMouseEnter={() => setSelected(index)}
                          onClick={() => choose(item)}
                          className={cn(
                            "flex w-full items-start gap-3 rounded-md p-3 text-left transition-colors sm:p-4",
                            selected === index ? "bg-muted" : "hover:bg-muted/60",
                          )}
                        >
                          <span
                            className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-md text-white"
                            style={{ backgroundColor: `rgb(${target?.accent ?? "217 119 6"})` }}
                          >
                            <Icon className="h-4 w-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                              <span className="font-semibold leading-tight">
                                {bi(item.title, item.titleKn)}
                              </span>
                              <span className="text-[10px] font-semibold uppercase text-muted-foreground">
                                {bi(meta.label, meta.labelKn)} · {bi(item.eyebrow, item.eyebrowKn)}
                              </span>
                            </span>
                            <span className="mt-1 line-clamp-2 block text-sm leading-relaxed text-muted-foreground">
                              {bi(item.detail, item.detailKn)}
                            </span>
                          </span>
                          <ArrowRight className="mt-2 h-4 w-4 shrink-0 text-muted-foreground" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <div className="grid min-h-56 place-items-center px-6 text-center">
                  <div>
                    <Landmark className="mx-auto h-7 w-7 text-muted-foreground" />
                    <p className="mt-3 font-semibold">
                      {bi("No history found", "ಯಾವುದೇ ಇತಿಹಾಸ ಕಂಡುಬಂದಿಲ್ಲ")}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {bi("Try a ruler, monument, year, or movement.", "ಅರಸ, ಸ್ಮಾರಕ, ವರ್ಷ ಅಥವಾ ಚಳವಳಿಯನ್ನು ಹುಡುಕಿ.")}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}