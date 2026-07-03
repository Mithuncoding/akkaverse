"use client";

import * as React from "react";
import { Feather, Loader2, RefreshCw } from "lucide-react";

import { useTranslation } from "@/i18n/language-provider";
import { Button } from "@/components/ui/button";
import type { Person } from "@/lib/roots/store";
import { streamAncestorLetter } from "@/lib/roots/ai";

export function AncestorLetter({ people }: { people: Person[] }) {
  const { bi } = useTranslation();
  const self = React.useMemo(
    () => people.find((p) => p.relation === "self") ?? null,
    [people],
  );
  const elders = React.useMemo(
    () => people.filter((p) => p.gen < 2).sort((a, b) => a.gen - b.gen),
    [people],
  );
  const [text, setText] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const abortRef = React.useRef<AbortController | null>(null);

  const write = React.useCallback(async () => {
    if (loading) return;
    abortRef.current?.abort();
    const ctrl = new AbortController();
    abortRef.current = ctrl;
    setText("");
    setLoading(true);
    const full = await streamAncestorLetter(
      self,
      elders,
      (tok) => setText((t) => t + tok),
      ctrl.signal,
    );
    if (!ctrl.signal.aborted) {
      if (full) setText((t) => (t.length < full.length ? full : t));
      setLoading(false);
    }
  }, [loading, self, elders]);

  React.useEffect(() => () => abortRef.current?.abort(), []);

  const from = elders[0]?.name ?? bi("Your ancestor", "ನಿಮ್ಮ ಪೂರ್ವಜ");

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-primary/20 p-1">
      {/* warm ambient */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-blob left-[15%] top-6 h-48 w-48 animate-float-slow bg-primary/25" />
        <div className="aurora-blob right-[12%] bottom-6 h-56 w-56 animate-float bg-amber-400/20" />
      </div>

      <div className="roots-paper relative rounded-[1.85rem] px-6 py-10 sm:px-14 sm:py-14">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-amber-800">
            <Feather className="h-4 w-4" />
            {bi("If They Could Speak", "ಅವರು ಮಾತಾಡಬಲ್ಲರಾದರೆ")}
          </div>

          {!text && !loading && (
            <div className="mt-8 text-center">
              <p className="font-serif text-2xl leading-snug text-amber-950 sm:text-3xl">
                {bi(
                  "A letter from those who came before — to those yet to come.",
                  "ಹಿಂದೆ ಬಂದವರಿಂದ ಮುಂದೆ ಬರುವವರಿಗೆ ಒಂದು ಪತ್ರ.",
                )}
              </p>
              <Button
                onClick={write}
                className="mt-8 h-12 gap-2 rounded-full bg-amber-900 px-7 text-base text-amber-50 hover:bg-amber-950"
              >
                <Feather className="h-4 w-4" />
                {bi("Write the letter", "ಪತ್ರ ಬರೆಯಿರಿ")}
              </Button>
            </div>
          )}

          {(text || loading) && (
            <article className="mt-8">
              <p className="font-serif text-lg text-amber-900">
                {bi("My dear ones,", "ನನ್ನ ಪ್ರೀತಿಯವರೇ,")}
              </p>
              <div className="mt-4 whitespace-pre-wrap font-serif text-lg leading-loose text-amber-950 sm:text-xl">
                {text}
                {loading && <span className="type-caret" />}
              </div>
              {!loading && text && (
                <div className="mt-8 flex items-center justify-between">
                  <p className="font-serif text-lg italic text-amber-900">
                    — {from}
                  </p>
                  <button
                    onClick={write}
                    className="inline-flex items-center gap-1.5 rounded-full border border-amber-900/30 px-3 py-1.5 text-xs font-medium text-amber-900 transition-colors hover:bg-amber-900/10"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    {bi("Write again", "ಮತ್ತೆ ಬರೆಯಿರಿ")}
                  </button>
                </div>
              )}
              {loading && !text && (
                <div className="mt-4 inline-flex items-center gap-2 text-sm text-amber-800">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {bi("Dipping the pen…", "ಲೇಖನಿ ಅದ್ದುತ್ತಿದೆ…")}
                </div>
              )}
            </article>
          )}
        </div>
      </div>
    </div>
  );
}
