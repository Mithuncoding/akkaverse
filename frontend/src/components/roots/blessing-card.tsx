"use client";

import * as React from "react";

/**
 * BlessingCard — the pure, presentational parchment card carrying an
 * ancestor's Kannada blessing. It holds no buttons or hooks so it can be
 * (a) captured to PNG inside `HeritageCard`, and (b) rendered on the public
 * `/blessing` share page for anyone who receives the link.
 */
export const BlessingCard = React.forwardRef<
  HTMLDivElement,
  {
    from: string;
    village: string;
    blessingKn: string;
    blessingEn: string;
  }
>(function BlessingCard({ from, village, blessingKn, blessingEn }, ref) {
  return (
    <div
      ref={ref}
      className="relative w-[340px] overflow-hidden rounded-[1.5rem] border border-amber-900/30 px-8 py-10 text-center shadow-xl sm:w-[380px]"
      style={{
        background:
          "radial-gradient(120% 90% at 50% 0%, #fbf3df 0%, #f4e6c8 55%, #eddab0 100%)",
      }}
    >
      {/* corner flourishes */}
      <span className="pointer-events-none absolute left-4 top-4 text-2xl text-amber-800/40">
        ❧
      </span>
      <span className="pointer-events-none absolute right-4 top-4 scale-x-[-1] text-2xl text-amber-800/40">
        ❧
      </span>

      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-amber-800/80">
        ಆಶೀರ್ವಾದ · A BLESSING
      </p>

      <div className="mx-auto mt-5 h-px w-16 bg-amber-800/30" />

      <p
        className="mt-6 text-2xl leading-relaxed text-amber-950 sm:text-[1.7rem]"
        style={{ fontFamily: "var(--font-kn-serif), Georgia, serif" }}
      >
        {blessingKn}
      </p>

      <p className="mt-4 font-serif text-sm italic leading-relaxed text-amber-900/85">
        “{blessingEn}”
      </p>

      <div className="mx-auto mt-7 h-px w-16 bg-amber-800/30" />

      <p className="mt-5 font-serif text-base text-amber-950">— {from}</p>
      {village && (
        <p className="mt-0.5 text-xs uppercase tracking-[0.2em] text-amber-800/70">
          {village}
        </p>
      )}

      <p className="mt-8 text-[0.6rem] uppercase tracking-[0.3em] text-amber-800/60">
        Akkaverse · ನಮ್ಮ ಬೇರುಗಳು · Roots
      </p>
    </div>
  );
});
