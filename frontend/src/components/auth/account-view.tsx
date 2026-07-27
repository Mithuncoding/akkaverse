"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  Cloud,
  KeyRound,
  Loader2,
  LogOut,
  Save,
  ShieldCheck,
  Trash2,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";
import { useTranslation } from "@/i18n/language-provider";

export function AccountView() {
  const { bi } = useTranslation();
  const auth = useAuth();
  const searchParams = useSearchParams();
  const [name, setName] = React.useState(auth.displayName);
  const [password, setPassword] = React.useState("");
  const [busy, setBusy] = React.useState<
    "name" | "password" | "signout" | "delete" | null
  >(null);
  const [message, setMessage] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => setName(auth.displayName), [auth.displayName]);

  if (auth.status === "loading") {
    return (
      <main className="container grid min-h-[70dvh] place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </main>
    );
  }

  if (auth.status !== "authenticated" || !auth.user) {
    return (
      <main className="container grid min-h-[70dvh] place-items-center py-14 text-center">
        <div className="max-w-md">
          <UserRound className="mx-auto h-10 w-10 text-primary" />
          <h1 className="mt-5 text-3xl font-bold">{bi("Your account", "ನಿಮ್ಮ ಖಾತೆ")}</h1>
          <p className="mt-3 text-muted-foreground">
            {bi("Sign in to sync your private heritage archive.", "ನಿಮ್ಮ ಖಾಸಗಿ ಪರಂಪರೆ ಸಂಗ್ರಹವನ್ನು ಸಿಂಕ್ ಮಾಡಲು ಸೈನ್ ಇನ್ ಮಾಡಿ.")}
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/login?next=/account">{bi("Sign in or create account", "ಸೈನ್ ಇನ್ ಅಥವಾ ಖಾತೆ ರಚಿಸಿ")}</Link>
          </Button>
        </div>
      </main>
    );
  }

  const saveName = async () => {
    setBusy("name");
    setError("");
    setMessage("");
    const result = await auth.updateDisplayName(name);
    setBusy(null);
    if (result.error) setError(result.error);
    else setMessage(bi("Name updated.", "ಹೆಸರು ನವೀಕರಿಸಲಾಗಿದೆ."));
  };

  const savePassword = async () => {
    if (password.length < 8) {
      setError(bi("Use at least 8 characters.", "ಕನಿಷ್ಠ 8 ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ."));
      return;
    }
    setBusy("password");
    setError("");
    setMessage("");
    const result = await auth.updatePassword(password);
    setBusy(null);
    if (result.error) setError(result.error);
    else {
      setPassword("");
      setMessage(bi("Password updated securely.", "ಪಾಸ್‌ವರ್ಡ್ ಸುರಕ್ಷಿತವಾಗಿ ನವೀಕರಿಸಲಾಗಿದೆ."));
    }
  };

  return (
    <main className="container max-w-4xl py-12 sm:py-20">
      <header className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary text-xl font-bold text-primary-foreground shadow-glow">
            {auth.displayName.slice(0, 1).toUpperCase()}
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              {bi("Private family account", "ಖಾಸಗಿ ಕುಟುಂಬದ ಖಾತೆ")}
            </p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight">{auth.displayName}</h1>
            <p className="text-sm text-muted-foreground">{auth.user.email}</p>
          </div>
        </div>
        <Button
          variant="outline"
          disabled={busy === "signout"}
          onClick={async () => {
            setBusy("signout");
            await auth.signOut();
          }}
          className="gap-2 rounded-full"
        >
          {busy === "signout" ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogOut className="h-4 w-4" />}
          {bi("Sign out", "ಸೈನ್ ಔಟ್")}
        </Button>
      </header>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatusCard icon={CheckCircle2} title={bi("Email verified", "ಇಮೇಲ್ ದೃಢೀಕೃತ")} detail={auth.user.email_confirmed_at ? bi("Confirmed", "ದೃಢೀಕರಿಸಲಾಗಿದೆ") : bi("Check your inbox", "ಇನ್‌ಬಾಕ್ಸ್ ಪರಿಶೀಲಿಸಿ")} />
        <StatusCard icon={ShieldCheck} title={bi("Private by policy", "ನೀತಿಯಿಂದ ಖಾಸಗಿ")} detail={bi("Only your user ID", "ನಿಮ್ಮ user ID ಮಾತ್ರ")} />
        <StatusCard icon={Cloud} title={bi("Cloud archive", "ಕ್ಲೌಡ್ ಸಂಗ್ರಹ")} detail={bi("Realtime ready", "ನೈಜ-ಸಮಯ ಸಿದ್ಧ")} />
      </div>

      {(message || error) && (
        <p className={`mt-6 rounded-xl px-4 py-3 text-sm ${error ? "bg-destructive/10 text-destructive" : "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300"}`}>
          {error || message}
        </p>
      )}

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="font-semibold">{bi("Profile name", "ಪ್ರೊಫೈಲ್ ಹೆಸರು")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {bi("Shown on your contributions.", "ನಿಮ್ಮ ಕೊಡುಗೆಗಳಲ್ಲಿ ತೋರಿಸಲಾಗುತ್ತದೆ.")}
          </p>
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="mt-4 h-11 w-full rounded-xl border border-border bg-background px-4 text-base outline-none focus:border-primary"
          />
          <Button onClick={saveName} disabled={!name.trim() || busy === "name"} className="mt-3 gap-2 rounded-full">
            {busy === "name" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {bi("Save name", "ಹೆಸರು ಉಳಿಸಿ")}
          </Button>
        </section>

        <section className="rounded-2xl border border-border bg-card p-5 sm:p-6">
          <h2 className="font-semibold">{bi("Security", "ಭದ್ರತೆ")}</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            {searchParams.get("reset") === "1"
              ? bi("Choose your new password now.", "ಈಗ ನಿಮ್ಮ ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ ಆಯ್ಕೆಮಾಡಿ.")
              : bi("Change your password at any time.", "ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಪಾಸ್‌ವರ್ಡ್ ಬದಲಿಸಿ.")}
          </p>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={8}
            autoComplete="new-password"
            placeholder={bi("New password (8+ characters)", "ಹೊಸ ಪಾಸ್‌ವರ್ಡ್ (8+ ಅಕ್ಷರಗಳು)")}
            className="mt-4 h-11 w-full rounded-xl border border-border bg-background px-4 text-base outline-none focus:border-primary"
          />
          <Button onClick={savePassword} disabled={!password || busy === "password"} className="mt-3 gap-2 rounded-full">
            {busy === "password" ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
            {bi("Update password", "ಪಾಸ್‌ವರ್ಡ್ ನವೀಕರಿಸಿ")}
          </Button>
        </section>
      </div>

      <section className="mt-8 rounded-2xl border border-destructive/25 bg-destructive/[0.04] p-5 sm:p-6">
        <h2 className="font-semibold text-destructive">
          {bi("Delete account", "ಖಾತೆ ಅಳಿಸಿ")}
        </h2>
        <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          {bi(
            "Permanently deletes your login, cloud family archive, community contributions, and cloud voice files. Browser-only copies may remain on this device until its site data is cleared.",
            "ನಿಮ್ಮ ಲಾಗಿನ್, ಕ್ಲೌಡ್ ಕುಟುಂಬ ಸಂಗ್ರಹ, ಸಮುದಾಯ ಕೊಡುಗೆಗಳು ಮತ್ತು ಕ್ಲೌಡ್ ಧ್ವನಿ ಕಡತಗಳನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸುತ್ತದೆ. ಈ ಸಾಧನದ ಸೈಟ್ ಡೇಟಾ ತೆರವುಗೊಳಿಸುವವರೆಗೆ ಬ್ರೌಸರ್ ಪ್ರತಿಗಳು ಉಳಿಯಬಹುದು.",
          )}
        </p>
        <Button
          variant="outline"
          disabled={busy === "delete"}
          onClick={async () => {
            const confirmed = window.confirm(
              bi(
                "Permanently delete this account and all cloud data? This cannot be undone.",
                "ಈ ಖಾತೆ ಮತ್ತು ಎಲ್ಲಾ ಕ್ಲೌಡ್ ಡೇಟಾವನ್ನು ಶಾಶ್ವತವಾಗಿ ಅಳಿಸುವುದೇ? ಇದನ್ನು ಹಿಂಪಡೆಯಲಾಗದು.",
              ),
            );
            if (!confirmed) return;
            setBusy("delete");
            setError("");
            const result = await auth.deleteAccount();
            setBusy(null);
            if (result.error) setError(result.error);
          }}
          className="mt-4 gap-2 rounded-full border-destructive/40 text-destructive hover:bg-destructive hover:text-destructive-foreground"
        >
          {busy === "delete" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
          {bi("Delete my account", "ನನ್ನ ಖಾತೆ ಅಳಿಸಿ")}
        </Button>
      </section>
    </main>
  );
}

function StatusCard({ icon: Icon, title, detail }: { icon: React.ElementType; title: string; detail: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4">
      <Icon className="h-5 w-5 text-primary" />
      <p className="mt-3 text-sm font-semibold">{title}</p>
      <p className="mt-0.5 text-xs text-muted-foreground">{detail}</p>
    </div>
  );
}