"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

type ScrollRevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger offset in seconds, for revealing a row of cards in sequence. */
  delay?: number;
  /** Distance travelled during the reveal, in pixels. */
  distance?: number;
  as?: "div" | "section" | "article" | "li" | "header" | "aside";
};

/**
 * The site's single entrance animation: a short rise with a fade, played once
 * when the element first enters the viewport.
 *
 * One reveal, used everywhere, is what keeps the page feeling composed. A
 * catalogue of different entrances is what makes a site feel generated.
 */
export function ScrollReveal({
  children,
  className,
  delay = 0,
  distance = 24,
  as = "div",
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const Component = motion[as];

  if (prefersReduced) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  return (
    <Component
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </Component>
  );
}
