"use client";

import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Splits a display figure into its numeric core and whatever surrounds it, so
 * "₹560 Cr" animates the 560 while keeping the currency mark and unit fixed.
 * Returns null when there is no number to animate (e.g. an em dash).
 */
function splitFigure(value: string) {
  const match = value.match(/^(\D*)([\d,.]+)([\s\S]*)$/);
  if (!match) return null;

  const [, prefix, digits, suffix] = match;
  const numeric = Number(digits.replace(/,/g, ""));
  if (!Number.isFinite(numeric)) return null;

  const decimals = digits.includes(".")
    ? (digits.split(".")[1]?.length ?? 0)
    : 0;
  const grouped = digits.includes(",");

  return { prefix, suffix, numeric, decimals, grouped };
}

/**
 * Counts a figure up once, the first time it scrolls into view.
 *
 * The rendered text falls back to the plain `value` whenever the count is not
 * running - before it enters view, under reduced motion, and if the figure has
 * no number in it. That matters beyond tidiness: it means the real figure is
 * what server-renders and what survives if the animation frame loop never runs
 * (JS disabled, a throttled background tab), rather than a stranded zero.
 */
export function AnimatedNumber({
  value,
  className,
  duration = 1600,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const prefersReduced = useReducedMotion();

  // Memoised: this is an effect dependency, and a fresh object each render
  // would restart the count from zero on every re-render.
  const parsed = useMemo(() => splitFigure(value), [value]);
  const running = Boolean(parsed) && !prefersReduced && inView;

  const [ticked, setTicked] = useState(value);

  useEffect(() => {
    if (!running || !parsed) return;

    const { prefix, suffix, numeric, decimals, grouped } = parsed;
    const start = performance.now();
    let frame = 0;

    const format = (n: number) => {
      const fixed = n.toFixed(decimals);
      const withGrouping = grouped
        ? Number(fixed).toLocaleString("en-IN", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          })
        : fixed;
      return `${prefix}${withGrouping}${suffix}`;
    };

    // Every setState below happens inside the frame callback, never
    // synchronously in the effect body.
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      // Ease-out quint: most of the count happens early, then it settles.
      const eased = 1 - Math.pow(1 - progress, 5);

      if (progress < 1) {
        setTicked(format(numeric * eased));
        frame = requestAnimationFrame(tick);
      } else {
        setTicked(value);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running, parsed, duration, value]);

  return (
    <span ref={ref} className={className}>
      {/* Reserves the final width so the count never reflows its neighbours. */}
      <span aria-hidden className="invisible block h-0 overflow-hidden">
        {value}
      </span>
      <span>{running ? ticked : value}</span>
    </span>
  );
}
