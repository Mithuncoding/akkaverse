"use client";

import * as React from "react";

import {
  seedFamily,
  seedVoiceCapsules,
} from "@/lib/roots/seed";
import { useAuth } from "@/components/auth/auth-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

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

export type VoiceLegacyKind =
  | "blessing"
  | "proverb"
  | "story"
  | "song"
  | "recipe"
  | "advice";

export type VoiceCapsuleVisibility = "private" | "family" | "community";

export type VoiceCapsule = {
  id: string;
  personId: string;
  personName: string;
  kind: VoiceLegacyKind;
  title: string;
  kannada: string;
  english: string;
  village?: string;
  district?: string;
  /** IndexedDB key for an original recording; omitted for AI narration. */
  audioId?: string;
  /** Private Supabase Storage path for authenticated cross-device playback. */
  cloudAudioPath?: string;
  /** Same-origin recording intentionally included in family share links. */
  sharedAudioUrl?: string;
  visibility: VoiceCapsuleVisibility;
  consentConfirmed: boolean;
  createdAt: number;
};

export type RootsData = {
  version: 1;
  people: Person[];
  legacy: LegacyItem[];
  voiceCapsules: VoiceCapsule[];
  createdAt: number;
  updatedAt: number;
};

export type RootsSyncStatus = "local" | "syncing" | "synced" | "error";

const STORAGE_KEY = "akkaverse.roots.v1";
/** Marks that the default family has been seeded once, so "Start over"
 *  (which leaves an empty tree) is respected rather than re-seeded. */
const SEED_KEY = "akkaverse.roots.seeded";
const SEED_VERSION = "2";

const empty = (): RootsData => ({
  version: 1,
  people: [],
  legacy: [],
  voiceCapsules: [],
  createdAt: Date.now(),
  updatedAt: Date.now(),
});

export const uid = () =>
  `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 8)}`;

function storageKeyFor(userId?: string): string {
  return userId ? `${STORAGE_KEY}:${userId}` : STORAGE_KEY;
}

function normalizeRoots(value: unknown): RootsData | null {
  if (!value || typeof value !== "object") return null;
  const parsed = value as Partial<RootsData>;
  if (parsed.version !== 1 || !Array.isArray(parsed.people)) return null;
  const voiceCapsules = Array.isArray(parsed.voiceCapsules)
    ? parsed.voiceCapsules
    : [];
  const seededVoices = seedVoiceCapsules();
  const seededVoiceIds = new Set(seededVoices.map((capsule) => capsule.id));
  const demoVoiceCapsules =
    parsed.people.some((person) => person.id === "mithun")
      ? [
          ...seededVoices,
          ...voiceCapsules.filter(
            (capsule) => !seededVoiceIds.has(capsule.id),
          ),
        ]
      : voiceCapsules;
  return {
    ...empty(),
    ...parsed,
    people: parsed.people,
    legacy: Array.isArray(parsed.legacy) ? parsed.legacy : [],
    voiceCapsules: demoVoiceCapsules,
    createdAt:
      typeof parsed.createdAt === "number" ? parsed.createdAt : Date.now(),
    updatedAt:
      typeof parsed.updatedAt === "number"
        ? parsed.updatedAt
        : typeof parsed.createdAt === "number"
          ? parsed.createdAt
          : Date.now(),
  };
}

function read(key = STORAGE_KEY): RootsData {
  if (typeof window === "undefined") return empty();
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return empty();
    return normalizeRoots(JSON.parse(raw)) ?? empty();
  } catch {
    return empty();
  }
}

function write(data: RootsData, key = STORAGE_KEY) {
  try {
    window.localStorage.setItem(key, JSON.stringify(data));
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
  voiceCapsules: VoiceCapsule[];
  isDemoFamily: boolean;
  syncStatus: RootsSyncStatus;
  cloudEnabled: boolean;
  self: Person | null;
  districts: string[];
  addPerson: (input: NewPerson) => Person;
  updatePerson: (id: string, patch: Partial<Person>) => void;
  removePerson: (id: string) => void;
  addLegacy: (input: Omit<LegacyItem, "id" | "createdAt">) => LegacyItem;
  removeLegacy: (id: string) => void;
  addVoiceCapsule: (
    input: Omit<VoiceCapsule, "id" | "createdAt">,
  ) => VoiceCapsule;
  updateVoiceCapsule: (id: string, patch: Partial<VoiceCapsule>) => void;
  removeVoiceCapsule: (id: string) => void;
  reset: () => void;
};

const RootsContext = React.createContext<RootsContextValue | null>(null);

/** Provider — holds the single source of truth for the whole Roots page. */
export function RootsProvider({ children }: { children: React.ReactNode }) {
  const auth = useAuth();
  const userId = auth.user?.id;
  const [data, setData] = React.useState<RootsData>(empty);
  const [ready, setReady] = React.useState(false);
  const [syncStatus, setSyncStatus] =
    React.useState<RootsSyncStatus>("local");
  const [cloudReadyFor, setCloudReadyFor] = React.useState<string | null>(null);
  const activeStorageKey = React.useRef(STORAGE_KEY);
  const dataRef = React.useRef<RootsData>(data);

  React.useEffect(() => {
    dataRef.current = data;
  }, [data]);

  React.useEffect(() => {
    if (auth.status === "loading") return;
    // Seed the maker's family on first ever visit OR when the stored tree is
    // empty and was never seeded (e.g. a stale key from an earlier version).
    // An intentionally emptied tree ("Start over") is respected via SEED_KEY.
    let initial: RootsData;
    const nextStorageKey = storageKeyFor(userId);
    try {
      const raw = window.localStorage.getItem(nextStorageKey);
      if (userId) {
        if (raw) {
          initial = read(nextStorageKey);
        } else {
          const current = dataRef.current;
          const canMigrateAnonymous =
            activeStorageKey.current === STORAGE_KEY &&
            current.people.length > 0 &&
            !current.people.some((person) => person.id === "mithun");
          initial = canMigrateAnonymous
            ? { ...current, updatedAt: Date.now() }
            : { ...empty(), updatedAt: 0 };
          write(initial, nextStorageKey);
        }
      } else {
        const seededVer = window.localStorage.getItem(SEED_KEY);
        const parsed = raw ? read(nextStorageKey) : null;
        if (parsed && seededVer === SEED_VERSION) {
          initial = parsed;
          write(initial, nextStorageKey);
        } else {
          initial = seedFamily();
          write(initial, nextStorageKey);
        }
        window.localStorage.setItem(SEED_KEY, SEED_VERSION);
      }
    } catch {
      initial = userId ? empty() : seedFamily();
    }
    activeStorageKey.current = nextStorageKey;
    dataRef.current = initial;
    setCloudReadyFor(null);
    setSyncStatus(userId ? "syncing" : "local");
    setData(initial);
    setReady(true);
  }, [auth.status, userId]);

  React.useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!ready || !userId || !supabase) {
      setCloudReadyFor(null);
      if (!userId) setSyncStatus("local");
      return;
    }

    let cancelled = false;
    let channel: ReturnType<typeof supabase.channel> | null = null;

    const applyRemote = (value: unknown) => {
      const remote = normalizeRoots(value);
      if (!remote || remote.updatedAt <= dataRef.current.updatedAt) return;
      dataRef.current = remote;
      write(remote, activeStorageKey.current);
      setData(remote);
      setSyncStatus("synced");
    };

    void (async () => {
      setSyncStatus("syncing");
      const { data: row, error } = await supabase
        .from("family_archives")
        .select("data, updated_at")
        .eq("user_id", userId)
        .maybeSingle();

      if (cancelled) return;
      if (error) {
        setSyncStatus("error");
        return;
      }

      const remote = normalizeRoots(row?.data);
      const local = dataRef.current;
      if (remote && remote.updatedAt > local.updatedAt) {
        applyRemote(remote);
      } else {
        const { error: uploadError } = await supabase
          .from("family_archives")
          .upsert({
            user_id: userId,
            data: local,
            updated_at: new Date(local.updatedAt).toISOString(),
          });
        if (uploadError) {
          setSyncStatus("error");
          return;
        }
      }

      if (cancelled) return;
      setCloudReadyFor(userId);
      setSyncStatus("synced");
      channel = supabase
        .channel(`family-archive-${userId}`)
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "family_archives",
            filter: `user_id=eq.${userId}`,
          },
          (payload) => applyRemote((payload.new as { data?: unknown }).data),
        )
        .subscribe();
    })();

    return () => {
      cancelled = true;
      if (channel) void supabase.removeChannel(channel);
    };
  }, [ready, userId]);

  React.useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!userId || cloudReadyFor !== userId || !supabase) return;
    setSyncStatus("syncing");
    const timer = window.setTimeout(async () => {
      const { error } = await supabase.from("family_archives").upsert({
        user_id: userId,
        data,
        updated_at: new Date(data.updatedAt).toISOString(),
      });
      setSyncStatus(error ? "error" : "synced");
    }, 650);
    return () => window.clearTimeout(timer);
  }, [cloudReadyFor, data, userId]);

  const commit = React.useCallback(
    (fn: (prev: RootsData) => RootsData) => {
      setData((prev) => {
        const next = { ...fn(prev), updatedAt: Date.now() };
        dataRef.current = next;
        write(next, activeStorageKey.current);
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

  const addVoiceCapsule = React.useCallback(
    (input: Omit<VoiceCapsule, "id" | "createdAt">): VoiceCapsule => {
      const capsule: VoiceCapsule = {
        ...input,
        id: uid(),
        createdAt: Date.now(),
      };
      commit((prev) => ({
        ...prev,
        voiceCapsules: [capsule, ...prev.voiceCapsules],
      }));
      return capsule;
    },
    [commit],
  );

  const updateVoiceCapsule = React.useCallback(
    (id: string, patch: Partial<VoiceCapsule>) =>
      commit((prev) => ({
        ...prev,
        voiceCapsules: prev.voiceCapsules.map((capsule) =>
          capsule.id === id ? { ...capsule, ...patch, id } : capsule,
        ),
      })),
    [commit],
  );

  const removeVoiceCapsule = React.useCallback(
    (id: string) =>
      commit((prev) => ({
        ...prev,
        voiceCapsules: prev.voiceCapsules.filter(
          (capsule) => capsule.id !== id,
        ),
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
      voiceCapsules: data.voiceCapsules,
      isDemoFamily: data.people.some((person) => person.id === "mithun"),
      syncStatus,
      cloudEnabled: Boolean(userId && getSupabaseBrowserClient()),
      self,
      districts: [...set],
      addPerson,
      updatePerson,
      removePerson,
      addLegacy,
      removeLegacy,
      addVoiceCapsule,
      updateVoiceCapsule,
      removeVoiceCapsule,
      reset,
    };
  }, [
    data,
    ready,
    syncStatus,
    userId,
    addPerson,
    updatePerson,
    removePerson,
    addLegacy,
    removeLegacy,
    addVoiceCapsule,
    updateVoiceCapsule,
    removeVoiceCapsule,
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
