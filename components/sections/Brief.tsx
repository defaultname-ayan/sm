"use client";

import { useActionState } from "react";

import { requestBrochure, type FormState } from "@/app/actions";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { Brochure, SiteSettings } from "@/lib/types";
import { formatMonth } from "@/lib/utils";

const INITIAL: FormState = { ok: false, message: "" };

export function Brief({
  brochure,
  settings,
  heading,
  intro,
}: {
  brochure: Brochure | null;
  settings: SiteSettings;
  heading?: string;
  intro?: string;
}) {
  const [state, action, pending] = useActionState(requestBrochure, INITIAL);

  if (!brochure) return null;

  return (
    <section id="brief" className="border-t border-navy/8 bg-ivory py-24 md:py-32">
      <div className="shell grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          {/* The brief's cover, rendered rather than photographed - it stays
              accurate as the issue month changes. */}
          <div className="flex aspect-3/4 max-w-sm flex-col justify-between rounded-panel bg-navy p-9">
            <div>
              <p className="label-sm text-gold">Monthly Intelligence Brief</p>
              <p className="font-display mt-7 text-3xl leading-tight font-medium text-ivory">
                Land
                <br />
                Opportunities
              </p>
              <div className="mt-5 h-px w-8 bg-gold" />
              <ul className="label-sm mt-7 space-y-2.5 text-ivory/40">
                {brochure.coverSummary?.map((line) => <li key={line}>{line}</li>)}
              </ul>
            </div>
            <div>
              <div className="h-px w-full bg-ivory/10" />
              <p className="label-sm mt-4 text-ivory/25">
                {settings.companyName} {settings.tagline}
              </p>
              <p className="label-sm mt-1 text-ivory/20">
                {formatMonth(brochure.issueMonth)}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-heading font-medium text-balance text-navy">
            {heading ?? "The intelligence layer behind our mandates."}
          </h2>
          <p className="mt-6 text-lede text-navy/60">
            {intro ??
              "A monthly dispatch of newly mandated land, closed transactions, corridor pricing and market observations, written for buyers, not search engines."}
          </p>

          {state.ok ? (
            <p
              role="status"
              className="label-sm mt-9 rounded-panel border border-navy/20 bg-navy/5 px-6 py-4 text-navy"
            >
              ✓&nbsp;&nbsp;{state.message}
            </p>
          ) : (
            <form action={action} className="mt-9">
              <div className="flex overflow-hidden rounded-full border border-navy/15 focus-within:border-navy/40">
                <label htmlFor="brief-email" className="sr-only">
                  Your email address
                </label>
                <input
                  id="brief-email"
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="Your email address"
                  aria-invalid={Boolean(state.fieldErrors?.email)}
                  className="min-w-0 flex-1 bg-transparent px-5 py-3.5 text-sm text-navy outline-none placeholder:text-navy/30"
                />
                {/* Honeypot - hidden from people, irresistible to bots. */}
                <input
                  type="text"
                  name="company"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden
                  className="hidden"
                />
                <button
                  type="submit"
                  disabled={pending}
                  className="label-sm shrink-0 bg-navy px-6 text-ivory transition-colors duration-200 hover:bg-navy-raised disabled:opacity-60"
                >
                  {pending ? "Sending…" : "Send it to me"}
                </button>
              </div>

              {state.message && !state.ok && (
                <p role="alert" className="mt-3 text-[13px] text-red-700">
                  {state.message}
                </p>
              )}

              <p className="label-sm mt-3 text-navy/30">
                No frequency commitment. Unsubscribe any time.
              </p>
            </form>
          )}

          {brochure.fileUrl && (
            <a
              href={brochure.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="label-sm mt-6 inline-flex items-center gap-2 text-navy/50 underline underline-offset-4 transition-colors hover:text-navy"
            >
              Or download the current issue directly
              <span aria-hidden>↓</span>
            </a>
          )}
        </ScrollReveal>
      </div>
    </section>
  );
}
