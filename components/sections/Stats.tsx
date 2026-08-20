"use client";

import { AnimatedNumber } from "@/components/motion/AnimatedNumber";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { HomePage } from "@/lib/types";

/**
 * The headline figures, as their own band directly under the hero.
 *
 * Kept out of the hero so the hero stays a single statement, and given a
 * surface of its own so the numbers read as a claim the page is making rather
 * than decoration floating over photography.
 */
export function Stats({ home }: { home: HomePage }) {
  const stats = home.stats ?? [];
  if (stats.length === 0) return null;

  return (
    <section className="bg-navy-deep py-14">
      <div className="shell">
        <dl className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.label} delay={i * 0.07} distance={16}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <AnimatedNumber
                  value={stat.value}
                  className="font-display block text-3xl font-medium text-ivory tabular-nums md:text-4xl"
                />
                <span className="label-sm mt-2 block text-ivory/40">
                  {stat.label}
                </span>
              </dd>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
