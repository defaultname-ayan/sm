"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";

/**
 * Reveals a headline word by word.
 *
 * Animates on mount rather than on scroll: every heading this is used for,
 * the hero and each page header - is above the fold when the page loads, so
 * gating it behind an intersection observer adds a round-trip and risks
 * leaving the headline clipped inside its overflow-hidden mask if the
 * observer does not fire.
 *
 * Reserved for the primary heading of a page. Used on every heading it stops
 * being an accent and becomes a tic.
 */
export function TextReveal({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "p";
  delay?: number;
}) {
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((word, i) => (
          <Fragment key={`${word}-${i}`}>
            {/*
              The mask must wrap the word only. The inter-word space is a
              sibling text node: whitespace at the trailing edge of an
              inline-block is collapsed away, so a space kept inside the mask
              disappears and the headline renders as one run-on word.
            */}
            <span className="inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: delay + i * 0.045,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </Tag>
  );
}
