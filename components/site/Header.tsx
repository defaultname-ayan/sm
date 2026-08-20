"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type { SiteSettings } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * Every page opens on a navy band, so the header can start transparent with
 * light type and morph to ivory once the user scrolls past it. Keeping that
 * contract means the header never has to guess what is underneath it.
 */
export function Header({ settings }: { settings: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  // Navigating closes the menu. Done on click rather than in an effect on
  // `pathname`, which would set state synchronously on every route change.
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const nav = settings.navigation ?? [];
  const prefersReduced = useReducedMotion();

  // Motion's scroll value rather than a scroll listener: it is read off the
  // animation frame loop, so it does not add a main-thread handler that runs
  // on every scroll event.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (y) => {
    const next = y > 48;
    setScrolled((current) => (current === next ? current : next));
  });

  // The open mobile menu is a modal surface - lock the page behind it.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[var(--ease-out-soft)]",
        solid
          ? "border-b border-navy/8 bg-ivory/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      {/*
        A three-column grid on desktop, so the menu is centred against the
        page rather than against whatever space is left over. With
        `justify-between` the menu drifts by the difference between the logo
        and the button widths, which is what it was doing.
        Mobile keeps a simple two-item flex row: logo and the toggle.
      */}
      <div className="shell flex h-18 items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          className="group flex items-baseline gap-2.5 md:justify-self-start"
          aria-label={`${settings.companyName}, home`}
        >
          <span
            className={cn(
              "font-display text-lg font-semibold tracking-tight transition-colors duration-500",
              solid ? "text-navy" : "text-ivory",
            )}
          >
            {settings.companyName}
          </span>
          <span
            className={cn(
              "h-3.5 w-px transition-colors duration-500",
              solid ? "bg-navy/25" : "bg-ivory/30",
            )}
          />
          <span
            className={cn(
              "label-sm transition-colors duration-500",
              solid ? "text-navy/50" : "text-ivory/60",
            )}
          >
            {settings.tagline}
          </span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex md:justify-self-center">
          {nav.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "label-sm group relative py-1 transition-colors duration-300",
                  solid
                    ? active
                      ? "text-navy"
                      : "text-navy/55 hover:text-navy"
                    : active
                      ? "text-ivory"
                      : "text-ivory/65 hover:text-ivory",
                )}
              >
                {item.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-gold transition-all duration-300 ease-[var(--ease-out-soft)]",
                    active ? "w-full" : "w-0 group-hover:w-full",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block md:justify-self-end">
          <Link
            href="/contact"
            className={cn(
              "label-sm rounded-full border px-5 py-2.5 transition-all duration-300 hover:scale-[0.98]",
              solid
                ? "border-navy/25 text-navy hover:border-navy/50"
                : "border-ivory/30 text-ivory hover:border-ivory/60",
            )}
          >
            Enquire
          </Link>
        </div>

        <button
          type="button"
          className="-mr-2 p-2 md:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span className="flex w-5 flex-col gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className={cn(
                  "block h-px origin-center transition-all duration-300 ease-[var(--ease-out-soft)]",
                  solid ? "bg-navy" : "bg-ivory",
                  menuOpen && i === 0 && "translate-y-[7px] rotate-45",
                  menuOpen && i === 1 && "scale-x-0 opacity-0",
                  menuOpen && i === 2 && "-translate-y-[7px] -rotate-45",
                )}
              />
            ))}
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            className="overflow-hidden border-t border-navy/8 bg-ivory md:hidden"
            initial={prefersReduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={prefersReduced ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="shell flex flex-col gap-1 py-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="label border-b border-navy/6 py-4 text-navy/70 transition-colors hover:text-navy"
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={closeMenu}
                className="label-sm mt-5 self-start rounded-full bg-navy px-6 py-3.5 text-ivory"
              >
                Enquire
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
