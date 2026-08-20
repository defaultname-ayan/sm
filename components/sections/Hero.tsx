"use client";

import { motion, useReducedMotion } from "motion/react";

import { TextReveal } from "@/components/motion/TextReveal";
import { Button } from "@/components/ui/Button";
import { SmartImage } from "@/components/ui/SmartImage";
import type { HomePage } from "@/lib/types";

/**
 * The hero carries one moment: who we are, what we do, where to go next.
 *
 * Four text elements at most (eyebrow, headline, subtext, CTAs). The headline
 * figures moved out to their own section below, because a metrics strip inside
 * the hero pushes the calls to action past the fold on short viewports and
 * turns a single statement into a feature list.
 */
export function Hero({ home }: { home: HomePage }) {
  const prefersReduced = useReducedMotion();

  return (
    // min-h-[100dvh], never h-screen: iOS Safari's collapsing toolbar makes
    // 100vh taller than the visible viewport and crops the CTAs.
    <section className="relative flex min-h-[38rem] flex-col justify-end overflow-hidden bg-navy pt-24 pb-20 md:min-h-[100dvh]">
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0"
          initial={prefersReduced ? false : { scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 14, ease: "linear" }}
        >
          <SmartImage
            source={home.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-55"
          />
        </motion.div>
        {/* Two overlays: one anchors the type, one keeps the top nav legible. */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/70 to-transparent" />
      </div>

      <div className="shell relative">
        <motion.p
          className="label text-gold"
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {home.heroEyebrow}
        </motion.p>

        <TextReveal
          text={home.heroHeading}
          as="h1"
          delay={0.1}
          className="font-display mt-5 max-w-4xl text-display font-medium text-balance text-ivory"
        />

        <motion.p
          className="mt-7 max-w-xl text-lede text-ivory/65"
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {home.heroSubheading}
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col gap-3 sm:flex-row"
          initial={prefersReduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
        >
          <Button
            href="/land-bank"
            className="bg-ivory text-navy hover:bg-gold-bright"
            variant="ghost"
          >
            View the land bank
            <span aria-hidden>→</span>
          </Button>
          <Button href="/contact" variant="outline" className="text-ivory">
            Enquire
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
