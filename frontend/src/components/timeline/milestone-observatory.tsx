"use client";

import * as React from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CalendarRange,
  MapPin,
  Pause,
  Play,
  Shuffle,
  UserRound,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { useTranslation } from "@/i18n/language-provider";
import { JourneyFigure } from "@/components/timeline/journey-figure";
import { chapters } from "@/data/journey";
import {
  ERAS,
  timelineEvents,
  type Era,
  type TimelineEvent,
} from "@/data/timeline";

type EraFilter = Era | "All";

const SORTED_EVENTS = [...timelineEvents].sort(
  (first, second) => first.sortYear - second.sortYear,
);
const FIRST_YEAR = SORTED_EVENTS[0].sortYear;
const LAST_YEAR = SORTED_EVENTS[SORTED_EVENTS.length - 1].sortYear;

const chapterIdForEvent = (event: TimelineEvent) => {
  if (event.era === "Ancient") return "ancient-dawn";
  if (event.era === "Classical") return "chalukya-rashtrakuta";
  if (event.era === "Medieval") {
    return event.id === "basavanna-vachana" ? "vachana" : "hoysala";
  }
  if (event.era === "Vijayanagara") return "vijayanagara";
  if (event.era === "Mysore") return "mysore-tipu";
  return "modern";
};

const eventsForEra = (era: EraFilter) =>
  era === "All"
    ? SORTED_EVENTS
    : SORTED_EVENTS.filter((event) => event.era === era);

const scalePosition = (year: number) => {
  const ratio = (year - FIRST_YEAR) / (LAST_YEAR - FIRST_YEAR);
  return 4 + ratio * 92;
};

export function MilestoneObservatory({
  onGo,
}: {
  onGo: (id: string) => void;
}) {
  const { bi, t } = useTranslation();
  const [activeEra, setActiveEra] = React.useState<EraFilter>("All");
  const [selectedId, setSelectedId] = React.useState(SORTED_EVENTS[0].id);
  const [playing, setPlaying] = React.useState(false);
  const filteredEvents = eventsForEra(activeEra);
  const selectedEvent =
    filteredEvents.find((event) => event.id === selectedId) ?? filteredEvents[0];
  const selectedIndex = filteredEvents.findIndex(
    (event) => event.id === selectedEvent.id,
  );
  const chapter =
    chapters.find((item) => item.id === chapterIdForEvent(selectedEvent)) ??
    chapters[0];

  React.useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setSelectedId((currentId) => {
        const currentIndex = filteredEvents.findIndex(
          (event) => event.id === currentId,
        );
        return filteredEvents[(currentIndex + 1) % filteredEvents.length].id;
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [filteredEvents, playing]);

  const selectEra = (era: EraFilter) => {
    const nextEvents = eventsForEra(era);
    setActiveEra(era);
    setSelectedId((currentId) =>
      nextEvents.some((event) => event.id === currentId)
        ? currentId
        : nextEvents[0].id,
    );
    setPlaying(false);
  };

  const selectEvent = (event: TimelineEvent) => {
    setSelectedId(event.id);
    setPlaying(false);
  };

  const move = (direction: -1 | 1) => {
    const nextIndex =
      (selectedIndex + direction + filteredEvents.length) % filteredEvents.length;
    selectEvent(filteredEvents[nextIndex]);
  };

  const chooseRandom = () => {
    if (filteredEvents.length < 2) return;
    let nextIndex = selectedIndex;
    while (nextIndex === selectedIndex) {
      nextIndex = Math.floor(Math.random() * filteredEvents.length);
    }
    selectEvent(filteredEvents[nextIndex]);
  };

  return (
    <section
      id="chronoscope"
      style={
        {
          "--accent": chapter.accent,
          "--accent2": chapter.accent2,
        } as React.CSSProperties
      }
      className="relative scroll-mt-36 overflow-hidden border-b border-border bg-muted/30 py-16 sm:py-20 md:py-24"
    >
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(70%_70%_at_85%_20%,rgb(var(--accent)/0.12),transparent_65%)] transition-colors duration-700"
      />
      <div className="container relative">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase text-[rgb(var(--accent))]">
              <CalendarRange className="h-4 w-4" />
              {bi("The Chronoscope", "ಕಾಲದರ್ಶಕ")}
            </div>
            <h2 className="mt-3 max-w-3xl text-balance text-3xl font-black leading-tight sm:text-4xl md:text-5xl">
              {bi(
                "Every turning point. One living timeline.",
                "ಪ್ರತಿ ತಿರುವು. ಒಂದು ಜೀವಂತ ಕಾಲರೇಖೆ.",
              )}
            </h2>
            <p className="mt-4 max-w-2xl text-pretty text-muted-foreground md:text-lg">
              {bi(
                "Move across sixteen centuries of ideas, kingdoms and resistance. Every moment opens into the deeper story below.",
                "ಹದಿನಾರು ಶತಮಾನಗಳ ಕಲ್ಪನೆಗಳು, ಸಾಮ್ರಾಜ್ಯಗಳು ಮತ್ತು ಪ್ರತಿರೋಧದ ಮೂಲಕ ಸಾಗಿ. ಪ್ರತಿ ಕ್ಷಣವೂ ಕೆಳಗಿನ ಆಳವಾದ ಕಥೆಗೆ ತೆರೆಯುತ್ತದೆ.",
              )}
            </p>
          </div>
          <div className="flex divide-x divide-border border-y border-border lg:border">
            <Stat value={String(SORTED_EVENTS.length)} label={bi("moments", "ಕ್ಷಣಗಳು")} />
            <Stat value={String(ERAS.length)} label={bi("eras", "ಯುಗಗಳು")} />
            <Stat value={`${LAST_YEAR - FIRST_YEAR}+`} label={bi("years", "ವರ್ಷಗಳು")} />
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-lg border border-foreground/15 bg-foreground text-background shadow-[0_35px_90px_-45px_rgb(var(--accent)/0.75)] md:mt-12">
          <div className="flex items-center gap-2 overflow-x-auto border-b border-background/15 px-3 py-3 sm:px-5">
            <button
              type="button"
              onClick={() => selectEra("All")}
              className={cn(
                "shrink-0 rounded-md px-3 py-2 text-xs font-semibold transition-colors",
                activeEra === "All"
                  ? "bg-background text-foreground"
                  : "text-background/60 hover:bg-background/10 hover:text-background",
              )}
            >
              {bi("All eras", "ಎಲ್ಲಾ ಯುಗಗಳು")}
            </button>
            {ERAS.map((era) => (
              <button
                key={era}
                type="button"
                onClick={() => selectEra(era)}
                className={cn(
                  "shrink-0 rounded-md px-3 py-2 text-xs font-semibold transition-colors",
                  activeEra === era
                    ? "bg-background text-foreground"
                    : "text-background/60 hover:bg-background/10 hover:text-background",
                )}
              >
                {t(`era.${era}`)}
              </button>
            ))}
            <div className="ml-auto flex shrink-0 items-center gap-1 border-l border-background/15 pl-3">
              <button
                type="button"
                onClick={chooseRandom}
                title={bi("Surprise me", "ಆಕಸ್ಮಿಕ ಕ್ಷಣ")}
                aria-label={bi("Choose a random moment", "ಆಕಸ್ಮಿಕ ಕ್ಷಣ ಆರಿಸಿ")}
                className="grid h-8 w-8 place-items-center rounded-md text-background/60 transition-colors hover:bg-background/10 hover:text-background"
              >
                <Shuffle className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => setPlaying((value) => !value)}
                aria-label={
                  playing
                    ? bi("Pause automatic journey", "ಸ್ವಯಂ ಯಾತ್ರೆ ನಿಲ್ಲಿಸಿ")
                    : bi("Play automatic journey", "ಸ್ವಯಂ ಯಾತ್ರೆ ಆರಂಭಿಸಿ")
                }
                className={cn(
                  "inline-flex h-8 items-center gap-2 rounded-md px-2.5 text-xs font-semibold transition-colors",
                  playing
                    ? "bg-[rgb(var(--accent))] text-white"
                    : "text-background/70 hover:bg-background/10 hover:text-background",
                )}
              >
                {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
                {playing ? bi("Pause", "ನಿಲ್ಲಿಸಿ") : bi("Auto tour", "ಸ್ವಯಂ ಯಾತ್ರೆ")}
              </button>
            </div>
          </div>

          <div className="grid min-h-[34rem] lg:grid-cols-[1.05fr_0.95fr]">
            <div
              key={selectedEvent.id}
              aria-live="polite"
              className="animate-scene-in flex flex-col justify-between p-6 sm:p-8 md:p-10 lg:p-12"
            >
              <div>
                <div className="flex items-center justify-between gap-4">
                  <span
                    className="text-5xl font-black tabular-nums sm:text-6xl md:text-7xl"
                    style={{ color: `rgb(${chapter.accent})` }}
                  >
                    {selectedEvent.year.replace(" CE", "")}
                  </span>
                  <span className="text-xs font-semibold uppercase text-background/45">
                    {String(selectedIndex + 1).padStart(2, "0")} / {String(filteredEvents.length).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-3 text-xs font-semibold uppercase text-background/50">
                  {t(`era.${selectedEvent.era}`)} · {selectedEvent.year.includes("c.") ? bi("Approximate date", "ಅಂದಾಜು ದಿನಾಂಕ") : "CE"}
                </div>
                <h3 className="mt-5 max-w-2xl text-balance text-2xl font-bold leading-tight sm:text-3xl md:text-4xl">
                  {bi(selectedEvent.title, selectedEvent.titleKn ?? selectedEvent.title)}
                </h3>
                <p className="mt-5 max-w-xl text-pretty leading-relaxed text-background/70 sm:text-lg">
                  {bi(
                    selectedEvent.description,
                    selectedEvent.descriptionKn ?? selectedEvent.description,
                  )}
                </p>

                {(selectedEvent.place || selectedEvent.figure) && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {selectedEvent.place && (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-background/15 px-2.5 py-1.5 text-xs text-background/70">
                        <MapPin className="h-3.5 w-3.5" />
                        {selectedEvent.place}
                      </span>
                    )}
                    {selectedEvent.figure && (
                      <span className="inline-flex items-center gap-1.5 rounded-md border border-background/15 px-2.5 py-1.5 text-xs text-background/70">
                        <UserRound className="h-3.5 w-3.5" />
                        {selectedEvent.figure}
                      </span>
                    )}
                  </div>
                )}
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => move(-1)}
                  aria-label={bi("Previous moment", "ಹಿಂದಿನ ಕ್ಷಣ")}
                  className="grid h-10 w-10 place-items-center rounded-md border border-background/20 text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => move(1)}
                  aria-label={bi("Next moment", "ಮುಂದಿನ ಕ್ಷಣ")}
                  className="grid h-10 w-10 place-items-center rounded-md border border-background/20 text-background transition-colors hover:bg-background hover:text-foreground"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => onGo(chapter.id)}
                  className="ml-auto inline-flex h-10 items-center gap-2 rounded-md bg-background px-4 text-sm font-semibold text-foreground transition-transform active:scale-[0.98]"
                >
                  {bi("Enter this era", "ಈ ಯುಗಕ್ಕೆ ಪ್ರವೇಶಿಸಿ")}
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="relative min-h-80 overflow-hidden border-t border-background/15 lg:min-h-full lg:border-l lg:border-t-0">
              <JourneyFigure
                key={`${selectedEvent.id}-image`}
                wiki={selectedEvent.place ?? chapter.cover}
                alt={selectedEvent.title}
                rounded="none"
                lazy={false}
                className="absolute inset-0 h-full w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/10 to-transparent lg:bg-gradient-to-r" />
              <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                <div className="text-xs font-semibold uppercase text-white/60">
                  {bi("Continue the story", "ಕಥೆಯನ್ನು ಮುಂದುವರಿಸಿ")}
                </div>
                <div className="mt-1 text-xl font-bold text-white">
                  {bi(chapter.name, chapter.nameKn)}
                </div>
                <div className="mt-1 text-sm text-white/65">{chapter.years}</div>
              </div>
            </div>
          </div>

          <div className="border-t border-background/15 px-4 pb-5 pt-4 sm:px-8 sm:pb-7 sm:pt-5">
            <div className="relative h-12">
              <div className="absolute left-[4%] right-[4%] top-3 h-px bg-background/20" />
              <div
                className="absolute left-[4%] top-3 h-px bg-[rgb(var(--accent))] transition-[width] duration-500"
                style={{ width: `${scalePosition(selectedEvent.sortYear) - 4}%` }}
              />
              {filteredEvents.map((event) => {
                const isSelected = event.id === selectedEvent.id;
                return (
                  <button
                    key={event.id}
                    type="button"
                    onClick={() => selectEvent(event)}
                    title={`${event.year}: ${event.title}`}
                    aria-label={`${event.year}: ${event.title}`}
                    aria-current={isSelected ? "date" : undefined}
                    className="group absolute top-0 -translate-x-1/2"
                    style={{ left: `${scalePosition(event.sortYear)}%` }}
                  >
                    <span
                      className={cn(
                        "block h-6 w-6 rounded-full border-[7px] border-foreground transition-all",
                        isSelected
                          ? "scale-125 bg-[rgb(var(--accent))] ring-1 ring-[rgb(var(--accent))]"
                          : "bg-background/45 group-hover:scale-110 group-hover:bg-background",
                      )}
                    />
                    {isSelected && (
                      <span className="absolute left-1/2 top-8 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold text-background">
                        {event.year}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between text-[10px] font-semibold uppercase text-background/35">
              <span>{FIRST_YEAR} CE</span>
              <span>{LAST_YEAR} CE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="min-w-24 px-4 py-3 text-center sm:min-w-28 sm:px-5">
      <div className="text-xl font-black tabular-nums sm:text-2xl">{value}</div>
      <div className="text-[10px] font-semibold uppercase text-muted-foreground">
        {label}
      </div>
    </div>
  );
}