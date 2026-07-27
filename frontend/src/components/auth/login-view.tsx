"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowRight,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  Loader2,
  LockKeyhole,
  Mail,
  UserPlus,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/auth-provider";
import { useTranslation } from "@/i18n/language-provider";
import { cn } from "@/lib/utils";

type Mode = "signin" | "signup" | "reset";

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-background/75 pl-11 pr-4 text-base outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/15";

export function LoginView() {
  const { bi } = useTranslation();
  const auth = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mode, setMode] = React.useState<Mode>("signin");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [busy, setBusy] = React.useState(false);
  const [error, setError] = React.useState("");
  const [message, setMessage] = React.useState("");

  const requestedNext = searchParams.get("next") ?? "/account";
  const next =
    requestedNext.startsWith("/") && !requestedNext.startsWith("//")
      ? requestedNext
      : "/account";

  React.useEffect(() => {
    if (auth.status === "authenticated") router.replace(next);
  }, [auth.status, next, router]);

  React.useEffect(() => {
    const callbackError = searchParams.get("error");
    if (callbackError) setError(callbackError);
  }, [searchParams]);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setMessage("");
    if (!email.trim()) {
      setError(bi("Enter your email address.", "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ."));
      return;
    }
    if (mode !== "reset" && password.length < 8) {
      setError(
        bi(
          "Use at least 8 characters for your password.",
          "ಪಾಸ್‌ವರ್ಡ್‌ಗೆ ಕನಿಷ್ಠ 8 ಅಕ್ಷರಗಳನ್ನು ಬಳಸಿ.",
        ),
      );
      return;
    }
    if (mode === "signup" && !name.trim()) {
      setError(bi("Enter your name.", "ನಿಮ್ಮ ಹೆಸರು ನಮೂದಿಸಿ."));
      return;
    }

    setBusy(true);
    const result =
      mode === "signin"
        ? await auth.signIn(email, password)
        : mode === "signup"
          ? await auth.signUp(email, password, name)
          : await auth.sendPasswordReset(email);
    setBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }
    if (mode === "reset") {
      setMessage(
        bi(
          "Password reset email sent. Open it on this device to continue.",
          "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸುವ ಇಮೇಲ್ ಕಳುಹಿಸಲಾಗಿದೆ. ಮುಂದುವರಿಸಲು ಈ ಸಾಧನದಲ್ಲಿ ತೆರೆಯಿರಿ.",
        ),
      );
      return;
    }
    if (result.needsConfirmation) {
      setMessage(
        bi(
          "Account created. Check your email and confirm it before signing in.",
          "ಖಾತೆ ರಚಿಸಲಾಗಿದೆ. ಸೈನ್ ಇನ್ ಮಾಡುವ ಮೊದಲು ನಿಮ್ಮ ಇಮೇಲ್ ದೃಢೀಕರಿಸಿ.",
        ),
      );
    }
  };

  if (!auth.configured) {
    return (
      <main className="container grid min-h-[75dvh] place-items-center py-14">
        <div className="w-full max-w-xl rounded-3xl border border-primary/20 bg-card p-6 shadow-soft sm:p-9">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary">
            <KeyRound className="h-5 w-5" />
          </span>
          <h1 className="mt-5 text-2xl font-bold tracking-tight sm:text-3xl">
            {bi("Connect Supabase to enable accounts", "ಖಾತೆಗಳಿಗೆ Supabase ಸಂಪರ್ಕಿಸಿ")}
          </h1>
          <p className="mt-3 text-muted-foreground">
            {bi(
              "The authentication UI is installed. Add the project URL and publishable key to frontend/.env.local, then restart the app.",
              "ದೃಢೀಕರಣ UI ಸಿದ್ಧವಾಗಿದೆ. frontend/.env.local ಗೆ ಪ್ರಾಜೆಕ್ಟ್ URL ಮತ್ತು publishable key ಸೇರಿಸಿ, ನಂತರ ಆಪ್ ಮರುಪ್ರಾರಂಭಿಸಿ.",
            )}
          </p>
          <div className="mt-5 rounded-2xl border border-border bg-background/70 p-4 font-mono text-xs leading-6 text-muted-foreground">
            NEXT_PUBLIC_SUPABASE_URL=...
            <br />
            NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=...
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            {bi(
              "These are public browser values. Never place the service-role key in this app.",
              "ಇವು ಸಾರ್ವಜನಿಕ ಬ್ರೌಸರ್ ಮೌಲ್ಯಗಳು. service-role key ಅನ್ನು ಈ ಆಪ್‌ನಲ್ಲಿ ಎಂದಿಗೂ ಸೇರಿಸಬೇಡಿ.",
            )}
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link href="/">{bi("Return home", "ಮುಖಪುಟಕ್ಕೆ ಹಿಂತಿರುಗಿ")}</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="relative overflow-hidden py-12 sm:py-20">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-dotgrid opacity-35" />
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <section className="max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {bi("Your private heritage home", "ನಿಮ್ಮ ಖಾಸಗಿ ಪರಂಪರೆಯ ಮನೆ")}
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            {bi("Carry your family story across devices", "ನಿಮ್ಮ ಕುಟುಂಬದ ಕಥೆಯನ್ನು ಸಾಧನಗಳಾದ್ಯಂತ ಕೊಂಡೊಯ್ಯಿರಿ")}
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {bi(
              "Sign in to sync your family tree, preserve memories, and contribute to the living community wall in real time.",
              "ಕುಟುಂಬ ಮರವನ್ನು ಸಿಂಕ್ ಮಾಡಲು, ನೆನಪುಗಳನ್ನು ಉಳಿಸಲು ಮತ್ತು ಜೀವಂತ ಸಮುದಾಯ ಗೋಡೆಗೆ ನೈಜ ಸಮಯದಲ್ಲಿ ಕೊಡುಗೆ ನೀಡಲು ಸೈನ್ ಇನ್ ಮಾಡಿ.",
            )}
          </p>
          <div className="mt-7 grid gap-3 text-sm sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            <TrustPoint icon={LockKeyhole} text={bi("Row-level privacy", "ಸಾಲು-ಮಟ್ಟದ ಗೌಪ್ಯತೆ")} />
            <TrustPoint icon={CheckCircle2} text={bi("Verified email", "ದೃಢೀಕೃತ ಇಮೇಲ್")} />
            <TrustPoint icon={ArrowRight} text={bi("Realtime sync", "ನೈಜ-ಸಮಯ ಸಿಂಕ್")} />
          </div>
        </section>

        <section className="mx-auto w-full max-w-md rounded-3xl border border-border bg-card/90 p-5 shadow-soft backdrop-blur sm:p-8">
          {mode !== "reset" ? (
            <div className="grid grid-cols-2 rounded-xl bg-secondary p-1">
              <ModeButton active={mode === "signin"} onClick={() => setMode("signin")}>
                {bi("Sign in", "ಸೈನ್ ಇನ್")}
              </ModeButton>
              <ModeButton active={mode === "signup"} onClick={() => setMode("signup")}>
                {bi("Create account", "ಖಾತೆ ರಚಿಸಿ")}
              </ModeButton>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="text-sm font-medium text-primary"
            >
              ← {bi("Back to sign in", "ಸೈನ್ ಇನ್‌ಗೆ ಹಿಂತಿರುಗಿ")}
            </button>
          )}

          <div className="mt-7">
            <h2 className="text-2xl font-bold tracking-tight">
              {mode === "signin"
                ? bi("Welcome back", "ಮತ್ತೆ ಸ್ವಾಗತ")
                : mode === "signup"
                  ? bi("Create your family home", "ನಿಮ್ಮ ಕುಟುಂಬದ ಮನೆ ರಚಿಸಿ")
                  : bi("Reset your password", "ಪಾಸ್‌ವರ್ಡ್ ಮರುಹೊಂದಿಸಿ")}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {mode === "reset"
                ? bi("We will email you a secure reset link.", "ಸುರಕ್ಷಿತ ಮರುಹೊಂದಿಸುವ ಲಿಂಕ್ ಅನ್ನು ಇಮೇಲ್ ಮಾಡುತ್ತೇವೆ.")
                : bi("Protected by Supabase Auth and row-level security.", "Supabase Auth ಮತ್ತು ಸಾಲು-ಮಟ್ಟದ ಭದ್ರತೆಯಿಂದ ರಕ್ಷಿಸಲಾಗಿದೆ.")}
            </p>
          </div>

          <form onSubmit={submit} className="mt-6 space-y-4">
            {mode === "signup" && (
              <label className="block text-sm font-medium">
                {bi("Your name", "ನಿಮ್ಮ ಹೆಸರು")}
                <div className="relative mt-1.5">
                  <UserPlus className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    className={inputClass}
                    placeholder={bi("Mithun Rajanna", "ನಿಮ್ಮ ಹೆಸರು")}
                  />
                </div>
              </label>
            )}

            <label className="block text-sm font-medium">
              {bi("Email", "ಇಮೇಲ್")}
              <div className="relative mt-1.5">
                <Mail className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                  inputMode="email"
                  required
                  className={inputClass}
                  placeholder="you@example.com"
                />
              </div>
            </label>

            {mode !== "reset" && (
              <label className="block text-sm font-medium">
                {bi("Password", "ಪಾಸ್‌ವರ್ಡ್")}
                <div className="relative mt-1.5">
                  <LockKeyhole className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    required
                    minLength={8}
                    className={cn(inputClass, "pr-12")}
                    placeholder={bi("At least 8 characters", "ಕನಿಷ್ಠ 8 ಅಕ್ಷರಗಳು")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((visible) => !visible)}
                    aria-label={bi("Toggle password visibility", "ಪಾಸ್‌ವರ್ಡ್ ತೋರಿಸಿ ಅಥವಾ ಮರೆಮಾಡಿ")}
                    className="absolute right-3 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-secondary"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </label>
            )}

            {error && (
              <p role="alert" className="rounded-xl bg-destructive/10 px-3 py-2.5 text-sm text-destructive">
                {error}
              </p>
            )}
            {message && (
              <p role="status" className="rounded-xl bg-emerald-500/10 px-3 py-2.5 text-sm text-emerald-700 dark:text-emerald-300">
                {message}
              </p>
            )}

            <Button type="submit" disabled={busy} className="h-12 w-full gap-2 rounded-xl text-base">
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : mode === "signup" ? <UserPlus className="h-4 w-4" /> : <KeyRound className="h-4 w-4" />}
              {mode === "signin"
                ? bi("Sign in securely", "ಸುರಕ್ಷಿತವಾಗಿ ಸೈನ್ ಇನ್")
                : mode === "signup"
                  ? bi("Create account", "ಖಾತೆ ರಚಿಸಿ")
                  : bi("Send reset email", "ಮರುಹೊಂದಿಸುವ ಇಮೇಲ್ ಕಳುಹಿಸಿ")}
            </Button>
          </form>

          {mode === "signin" && (
            <button
              type="button"
              onClick={() => {
                setMode("reset");
                setError("");
                setMessage("");
              }}
              className="mt-4 w-full text-center text-sm text-muted-foreground hover:text-primary"
            >
              {bi("Forgot password?", "ಪಾಸ್‌ವರ್ಡ್ ಮರೆತಿರಾ?")}
            </button>
          )}
        </section>
      </div>
    </main>
  );
}

function ModeButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-10 rounded-lg px-3 text-sm font-medium transition-colors",
        active ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
      )}
    >
      {children}
    </button>
  );
}

function TrustPoint({ icon: Icon, text }: { icon: React.ElementType; text: string }) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-card/70 px-3 py-2.5">
      <Icon className="h-4 w-4 shrink-0 text-primary" />
      <span>{text}</span>
    </div>
  );
}