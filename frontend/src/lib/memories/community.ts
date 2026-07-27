"use client";

import * as React from "react";

import { useAuth } from "@/components/auth/auth-provider";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";

export type CommunityCategory = "memory" | "proverb" | "song" | "story";

export type CommunityMemory = {
  id: string;
  user_id: string;
  author_name: string;
  text: string;
  category: CommunityCategory;
  district: string | null;
  created_at: string;
};

type CommunityStatus = "unavailable" | "loading" | "live" | "error";

function isMemory(value: unknown): value is CommunityMemory {
  if (!value || typeof value !== "object") return false;
  const row = value as Partial<CommunityMemory>;
  return (
    typeof row.id === "string" &&
    typeof row.user_id === "string" &&
    typeof row.author_name === "string" &&
    typeof row.text === "string" &&
    (row.category === "memory" ||
      row.category === "proverb" ||
      row.category === "song" ||
      row.category === "story") &&
    typeof row.created_at === "string"
  );
}

export function useCommunityMemories() {
  const auth = useAuth();
  const [items, setItems] = React.useState<CommunityMemory[]>([]);
  const [status, setStatus] = React.useState<CommunityStatus>("loading");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("unavailable");
      return;
    }

    let active = true;
    const add = (memory: CommunityMemory) =>
      setItems((current) => [
        memory,
        ...current.filter((item) => item.id !== memory.id),
      ]);

    void supabase
      .from("community_memories")
      .select("id, user_id, author_name, text, category, district, created_at")
      .order("created_at", { ascending: false })
      .limit(100)
      .then(({ data, error: loadError }) => {
        if (!active) return;
        if (loadError) {
          setError(loadError.message);
          setStatus("error");
          return;
        }
        setItems((data ?? []).filter(isMemory));
      });

    const channel = supabase
      .channel("community-memory-wall")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "community_memories" },
        (payload) => {
          if (isMemory(payload.new)) add(payload.new);
        },
      )
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "community_memories" },
        (payload) => {
          if (isMemory(payload.new)) add(payload.new);
        },
      )
      .on(
        "postgres_changes",
        { event: "DELETE", schema: "public", table: "community_memories" },
        (payload) => {
          const id = (payload.old as { id?: unknown }).id;
          if (typeof id === "string") {
            setItems((current) => current.filter((item) => item.id !== id));
          }
        },
      )
      .subscribe((subscription) => {
        if (!active) return;
        if (subscription === "SUBSCRIBED") setStatus("live");
        if (subscription === "CHANNEL_ERROR") setStatus("error");
      });

    return () => {
      active = false;
      void supabase.removeChannel(channel);
    };
  }, []);

  const publish = React.useCallback(
    async (input: {
      text: string;
      category: CommunityCategory;
      district?: string;
    }): Promise<string | null> => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase || !auth.user) return "Sign in to publish.";
      const { data, error: publishError } = await supabase
        .from("community_memories")
        .insert({
          user_id: auth.user.id,
          author_name: auth.displayName.slice(0, 80),
          text: input.text.trim().slice(0, 1000),
          category: input.category,
          district: input.district?.trim().slice(0, 100) || null,
        })
        .select("id, user_id, author_name, text, category, district, created_at")
        .single();
      if (publishError) return publishError.message;
      if (isMemory(data)) {
        setItems((current) => [
          data,
          ...current.filter((item) => item.id !== data.id),
        ]);
      }
      return null;
    },
    [auth.displayName, auth.user],
  );

  const remove = React.useCallback(
    async (id: string): Promise<string | null> => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase || !auth.user) return "Sign in to remove this memory.";
      const { error: removeError } = await supabase
        .from("community_memories")
        .delete()
        .eq("id", id)
        .eq("user_id", auth.user.id);
      if (removeError) return removeError.message;
      setItems((current) => current.filter((item) => item.id !== id));
      return null;
    },
    [auth.user],
  );

  return { items, status, error, publish, remove };
}