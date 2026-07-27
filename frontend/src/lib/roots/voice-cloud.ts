"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";

const BUCKET = "voice-legacies";

export async function uploadVoiceToCloud(
  userId: string,
  capsuleId: string,
  audio: Blob,
): Promise<string> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) throw new Error("Cloud storage is not configured.");
  const path = `${userId}/${capsuleId}`;
  const { error } = await supabase.storage.from(BUCKET).upload(path, audio, {
    upsert: true,
    contentType: audio.type || "audio/webm",
    cacheControl: "3600",
  });
  if (error) throw error;
  return path;
}

export async function signedVoiceUrl(path: string): Promise<string | null> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return null;
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(path, 60 * 60);
  return error ? null : data.signedUrl;
}

export async function deleteCloudVoice(path: string): Promise<void> {
  const supabase = getSupabaseBrowserClient();
  if (!supabase) return;
  const { error } = await supabase.storage.from(BUCKET).remove([path]);
  if (error) throw error;
}