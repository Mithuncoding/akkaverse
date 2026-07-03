"use client";

import * as React from "react";

import { seedFamily } from "@/lib/roots/seed";

/**
 * Roots — data layer for the family-heritage experience.
 *
 * A single shared store (React context) persisted to localStorage
 * (offline-first) under one versioned key, so a future cloud sync can migrate
 * cleanly. Every component reads/writes through `useRoots()` — never storage
 * directly — and all consumers stay in sync because they share one provider.
 */

export type Relation =
  | "self"
  | "spouse"
  | "parent"
  | "grandparent"
  | "sibling"
  | "child"
  | "relative";

export type Person = {
  id: string;
  name: string;
  relation: Relation;
  /** The blood parent this person descends from (their elder). */
  parentId: string | null;
  /** Marriage partner, if any. */
  spouseId?: string | null;
  /** Generation row: 0 grandparents · 1 parents · 2 self · 3 children. */
  gen: number;
  village?: string;
  district?: string;
  occupation?: string;
  birthYear?: string;
  languages?: string;
  festival?: string;
  proverb?: string;
  /** A cherished memory or short biography. */
  memory?: string;
  /** Data-URL photo (kept small; stored locally). */
  photo?: string;
};

export type LegacyKind =
  | "recipe"
  | "proverb"
  | "song"
  | "ritual"
  | "advice"
  | "story";

export type LegacyItem = {
  id: string;
  kind: LegacyKind;
  title: string;
  body: string;
  from?: string;
  createdAt: number;
};

export type RootsData = {
  version: 1;
  people: Person[];
  legacy: LegacyItem[];
  createdAt: number;
};

const STORAGE_KEY = "akkaverse.roots.v1";
/** Marks that the default family has been seeded once, so "Start over"
 *  (which leaves an empty tree) is respected rather than re-seeded. */
const SEED_KEY = "akkaverse.roots.seeded";
const SEED_VERSION = "2";

const empty = (): RootsData => ({
  version: 1,
  people: [],
  legacy: [],
  createdAt: Date.now(),
});

export const uid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

function read(): RootsData {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return empty();
    const parsed = JSON.parse(raw) as RootsData;
    if (!parsed || parsed.version !== 1 || !Array.isArray(parsed.people)) {
      return empty();
    }
    return { ...empty(), ...parsed };
  } catch {
    return empty();
  }
}

function write(data: RootsData) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    /* quota / private mode — fail silently, app still works in-session */
  }
}

/** The generation each relation belongs to relative to "self" (row 2). */
export const RELATION_GEN: Record<Relation, number> = {
  grandparent: 0,
  parent: 1,
  self: 2,
  spouse: 2,
  sibling: 2,
  child: 3,
  relative: 2,
};

export type NewPerson = Partial<Omit<Person, "id" | "gen">> & {
  relation: Relation;
  gen?: number;
};

type RootsContextValue = {
  ready: boolean;
  people: Person[];
  legacy: LegacyItem[];
  self: Person | null;
  districts: string[];
  addPerson: (input: NewPerson) => Person;
  updatePerson: (id: string, patch: Partial<Person>) => void;
  removePerson: (id: string) => void;
  addLegacy: (input: Omit<LegacyItem, "id" | "createdAt">) => LegacyItem;
  removeLegacy: (id: string) => void;
  reset: () => void;
};

const RootsContext = React.createContext<RootsContextValue | null>(null);

/** Provider — holds the single source of truth for the whole Roots page. */
export function RootsProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = React.useState<RootsData>(empty);
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    // Seed the maker's family on first ever visit OR when the stored tree is
    // empty and was never seeded (e.g. a stale key from an earlier version).
    // An intentionally emptied tree ("Start over") is respected via SEED_KEY.
    let initial: RootsData;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      const seededVer = window.localStorage.getItem(SEED_KEY);
      const parsed = raw ? read() : null;
      // Respect data that belongs to the CURRENT seed version (including an
      // intentionally-emptied "Start over" tree). Anything older / missing is
      // (re)seeded so relationship fixes reach existing visitors.
      if (parsed && seededVer === SEED_VERSION) {
        initial = parsed;
      } else {
        initial = seedFamily();
        write(initial);
      }
      window.localStorage.setItem(SEED_KEY, SEED_VERSION);
    } catch {
      initial = seedFamily();
    }
    setData(initial);
    setReady(true);
  }, []);

  const commit = React.useCallback(
    (fn: (prev: RootsData) => RootsData) => {
      setData((prev) => {
        const next = fn(prev);
        write(next);
        return next;
      });
    },
    [],
  );

  const addPerson = React.useCallback(
    (input: NewPerson): Person => {
      const person: Person = {
        id: uid(),
        name: (input.name ?? "").trim() || "Unnamed",
        relation: input.relation,
        parentId: input.parentId ?? null,
        spouseId: input.spouseId ?? null,
        gen: input.gen ?? RELATION_GEN[input.relation],
        village: input.village,
        district: input.district,
        occupation: input.occupation,
        birthYear: input.birthYear,
        languages: input.languages,
        festival: input.festival,
        proverb: input.proverb,
        memory: input.memory,
        photo: input.photo,
      };
      commit((prev) => ({ ...prev, people: [...prev.people, person] }));
      return person;
    },
    [commit],
  );

  const updatePerson = React.useCallback(
    (id: string, patch: Partial<Person>) =>
      commit((prev) => ({
        ...prev,
        people: prev.people.map((p) => (p.id === id ? { ...p, ...patch } : p)),
      })),
    [commit],
  );

  const removePerson = React.useCallback(
    (id: string) =>
      commit((prev) => ({
        ...prev,
        people: prev.people
          .filter((p) => p.id !== id)
          .map((p) => (p.parentId === id ? { ...p, parentId: null } : p)),
      })),
    [commit],
  );

  const addLegacy = React.useCallback(
    (input: Omit<LegacyItem, "id" | "createdAt">): LegacyItem => {
      const item: LegacyItem = { ...input, id: uid(), createdAt: Date.now() };
      commit((prev) => ({ ...prev, legacy: [item, ...prev.legacy] }));
      return item;
    },
    [commit],
  );

  const removeLegacy = React.useCallback(
    (id: string) =>
      commit((prev) => ({
        ...prev,
        legacy: prev.legacy.filter((l) => l.id !== id),
      })),
    [commit],
  );

  const reset = React.useCallback(() => commit(() => empty()), [commit]);

  const value = React.useMemo<RootsContextValue>(() => {
    const self = data.people.find((p) => p.relation === "self") ?? null;
    const set = new Set<string>();
    for (const p of data.people) if (p.district) set.add(p.district.trim());
    return {
      ready,
      people: data.people,
      legacy: data.legacy,
      self,
      districts: [...set],
      addPerson,
      updatePerson,
      removePerson,
      addLegacy,
      removeLegacy,
      reset,
    };
  }, [
    data,
    ready,
    addPerson,
    updatePerson,
    removePerson,
    addLegacy,
    removeLegacy,
    reset,
  ]);

  return (
    <RootsContext.Provider value={value}>{children}</RootsContext.Provider>
  );
}

/** The single source of truth for the Roots experience. */
export function useRoots(): RootsContextValue {
  const ctx = React.useContext(RootsContext);
  if (!ctx) {
    throw new Error("useRoots must be used within <RootsProvider>");
  }
  return ctx;
}
