"use client";

import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * A continuous horizontal drift, used for the client strip.
 *
 * The track is duplicated once and translated by exactly -50%, which is what
 * makes the loop seamless. The duplicate is hidden from assistive tech so the
 * names are not announced twice.
 *
 * Falls back to a plain wrapping row under reduced motion.
 */
export function Marquee({
  children,
  speed = 42,
  className = "",
}: {
  children: ReactNode;
  /** Seconds for one full pass. Higher is slower. */
  speed?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return (
      <div className={`flex flex-wrap items-center gap-x-10 gap-y-4 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <div
      className={`group relative flex overflow-hidden ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6rem, black calc(100% - 6rem), transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6rem, black calc(100% - 6rem), transparent)",
      }}
    >
      <div
        className="flex shrink-0 items-center gap-x-14 pr-14 [animation:marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
      </div>
      <div
        aria-hidden
        className="flex shrink-0 items-center gap-x-14 pr-14 [animation:marquee_var(--marquee-duration)_linear_infinite] group-hover:[animation-play-state:paused]"
        style={{ "--marquee-duration": `${speed}s` } as React.CSSProperties}
      >
        {children}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}
