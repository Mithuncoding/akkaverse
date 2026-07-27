"use client";

import * as React from "react";
import type { User } from "@supabase/supabase-js";

import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type AuthStatus =
  | "loading"
  | "authenticated"
  | "anonymous"
  | "unavailable";

export type AuthActionResult = {
  error?: string;
  needsConfirmation?: boolean;
};

type AuthContextValue = {
  user: User | null;
  status: AuthStatus;
  configured: boolean;
  displayName: string;
  signIn: (email: string, password: string) => Promise<AuthActionResult>;
  signUp: (
    email: string,
    password: string,
    displayName: string,
  ) => Promise<AuthActionResult>;
  sendPasswordReset: (email: string) => Promise<AuthActionResult>;
  updatePassword: (password: string) => Promise<AuthActionResult>;
  updateDisplayName: (displayName: string) => Promise<AuthActionResult>;
  deleteAccount: () => Promise<AuthActionResult>;
  signOut: () => Promise<void>;
};

const AuthContext = React.createContext<AuthContextValue | null>(null);

function nameFor(user: User | null): string {
  if (!user) return "";
  const metadataName = user.user_metadata?.display_name;
  if (typeof metadataName === "string" && metadataName.trim()) {
    return metadataName.trim();
  }
  return user.email?.split("@")[0] ?? "Kannadiga";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = React.useState<User | null>(null);
  const [status, setStatus] = React.useState<AuthStatus>(
    isSupabaseConfigured ? "loading" : "unavailable",
  );

  React.useEffect(() => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) {
      setStatus("unavailable");
      return;
    }

    let active = true;
    supabase.auth.getUser().then(({ data, error }) => {
      if (!active) return;
      const next = error ? null : data.user;
      setUser(next);
      setStatus(next ? "authenticated" : "anonymous");
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      const next = session?.user ?? null;
      setUser(next);
      setStatus(next ? "authenticated" : "anonymous");
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, []);

  const signIn = React.useCallback(
    async (email: string, password: string): Promise<AuthActionResult> => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return { error: "Authentication is not configured." };
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });
      return error ? { error: error.message } : {};
    },
    [],
  );

  const signUp = React.useCallback(
    async (
      email: string,
      password: string,
      displayName: string,
    ): Promise<AuthActionResult> => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return { error: "Authentication is not configured." };
      const redirectTo = `${window.location.origin}/auth/callback?next=/account`;
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: redirectTo,
          data: { display_name: displayName.trim() },
        },
      });
      if (error) return { error: error.message };
      return { needsConfirmation: !data.session };
    },
    [],
  );

  const sendPasswordReset = React.useCallback(
    async (email: string): Promise<AuthActionResult> => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return { error: "Authentication is not configured." };
      const redirectTo = `${window.location.origin}/auth/callback?next=/account?reset=1`;
      const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
        redirectTo,
      });
      return error ? { error: error.message } : {};
    },
    [],
  );

  const updatePassword = React.useCallback(
    async (password: string): Promise<AuthActionResult> => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return { error: "Authentication is not configured." };
      const { error } = await supabase.auth.updateUser({ password });
      return error ? { error: error.message } : {};
    },
    [],
  );

  const updateDisplayName = React.useCallback(
    async (displayName: string): Promise<AuthActionResult> => {
      const supabase = getSupabaseBrowserClient();
      if (!supabase) return { error: "Authentication is not configured." };
      const { data, error } = await supabase.auth.updateUser({
        data: { display_name: displayName.trim() },
      });
      if (!error && data.user) {
        await supabase
          .from("profiles")
          .update({
            display_name: displayName.trim(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", data.user.id);
      }
      if (data.user) setUser(data.user);
      return error ? { error: error.message } : {};
    },
    [],
  );

  const signOut = React.useCallback(async () => {
    const supabase = getSupabaseBrowserClient();
    if (supabase) await supabase.auth.signOut();
  }, []);

  const deleteAccount = React.useCallback(async (): Promise<AuthActionResult> => {
    const supabase = getSupabaseBrowserClient();
    if (!supabase) return { error: "Authentication is not configured." };
    const { error } = await supabase.rpc("delete_my_account");
    if (error) return { error: error.message };
    await supabase.auth.signOut({ scope: "local" });
    setUser(null);
    setStatus("anonymous");
    return {};
  }, []);

  const value = React.useMemo<AuthContextValue>(
    () => ({
      user,
      status,
      configured: isSupabaseConfigured,
      displayName: nameFor(user),
      signIn,
      signUp,
      sendPasswordReset,
      updatePassword,
      updateDisplayName,
      deleteAccount,
      signOut,
    }),
    [
      user,
      status,
      signIn,
      signUp,
      sendPasswordReset,
      updatePassword,
      updateDisplayName,
      deleteAccount,
      signOut,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const value = React.useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}