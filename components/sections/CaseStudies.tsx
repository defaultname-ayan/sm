import Link from "next/link";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SmartImage } from "@/components/ui/SmartImage";
import type { CaseStudy } from "@/lib/types";

/**
 * Asymmetric composition: the first mandate leads at full width, the rest
 * stack beside it as compact rows.
 *
 * Deliberately not three equal cards. That layout already carries the land
 * bank on this page, and repeating it here would make two unrelated sections
 * read as the same thing.
 *
 * Cell count follows item count, so a fourth case study extends the stack
 * rather than leaving a hole in a fixed grid.
 */
export function CaseStudies({
  caseStudies,
  eyebrow,
  heading,
}: {
  caseStudies: CaseStudy[];
  eyebrow?: string;
  heading?: string;
}) {
  if (caseStudies.length === 0) return null;

  const [lead, ...rest] = caseStudies;

  return (
    <section id="case-studies" className="bg-stone py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={eyebrow ?? "Case Studies"}
          heading={heading ?? "Deals structured. Capital deployed."}
          surface="dark"
        />

        <div className="grid gap-6 lg:grid-cols-12">
          <ScrollReveal className={rest.length > 0 ? "lg:col-span-7" : "lg:col-span-12"}>
            <Link
              href={`/case-studies/${lead.slug}`}
              className="group flex h-full flex-col overflow-hidden rounded-panel border border-ivory/10 transition-colors duration-500 hover:border-ivory/25"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-navy">
                <SmartImage
                  source={lead.image}
                  alt={`${lead.type} in ${lead.location}`}
                  fill
                  sizes="(min-width: 1024px) 55vw, 92vw"
                  className="object-cover opacity-75 transition-all duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.04] group-hover:opacity-90"
                />
              </div>

              <div className="flex flex-1 flex-col p-7">
                <p className="label-sm text-gold-bright">{lead.type}</p>
                <h3 className="font-display mt-3 text-heading font-medium text-balance text-ivory">
                  {lead.location}
                </h3>

                <dl className="mt-6 flex gap-8">
                  <div>
                    <dt className="label-sm text-ivory/30">Extent</dt>
                    <dd className="font-display mt-1 text-xl font-medium whitespace-nowrap text-ivory">
                      {lead.acreage}
                    </dd>
                  </div>
                  <div className="min-w-0">
                    <dt className="label-sm text-ivory/30">Structure</dt>
                    <dd className="label-sm mt-2 text-ivory/60">{lead.structure}</dd>
                  </div>
                </dl>

                <p className="mt-6 max-w-prose text-sm leading-relaxed text-ivory/50">
                  {lead.narrative}
                </p>

                <span className="label-sm mt-auto flex items-center gap-2 pt-7 text-ivory/40 transition-colors duration-300 group-hover:text-gold-bright">
                  Read the case study
                  <span
                    aria-hidden
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
              </div>
            </Link>
          </ScrollReveal>

          {rest.length > 0 && (
            <div className="flex flex-col gap-6 lg:col-span-5">
              {rest.map((study, i) => (
                <ScrollReveal key={study._id} delay={0.08 + i * 0.08} className="flex-1">
                  <Link
                    href={`/case-studies/${study.slug}`}
                    className="group flex h-full gap-5 overflow-hidden rounded-panel border border-ivory/10 p-5 transition-colors duration-500 hover:border-ivory/25"
                  >
                    <div className="relative size-24 shrink-0 overflow-hidden rounded-card bg-navy sm:size-28">
                      <SmartImage
                        source={study.image}
                        alt={`${study.type} in ${study.location}`}
                        fill
                        sizes="112px"
                        className="object-cover opacity-75 transition-opacity duration-500 group-hover:opacity-95"
                      />
                    </div>

                    <div className="flex min-w-0 flex-col">
                      <p className="label-sm text-gold-bright">{study.type}</p>
                      <h3 className="font-display mt-2 text-base font-medium text-ivory">
                        {study.location}
                      </h3>
                      <p className="label-sm mt-2 text-ivory/40">
                        {study.acreage}
                      </p>
                      <p className="label-sm mt-auto pt-4 text-ivory/60">
                        {study.structure}
                      </p>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
