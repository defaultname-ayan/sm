import Link from "next/link";

import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Service } from "@/lib/types";

export function Services({
  services,
  heading,
}: {
  services: Service[];
  heading?: string;
}) {
  return (
    <section id="services" className="bg-stone py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          heading={heading ?? "Structured for every stage of acquisition."}
          surface="dark"
        />

        {/*
          A 1px gap over a light background renders as hairline rules between
          cells - a grid of lines rather than a grid of boxes.
        */}
        <div className="grid gap-px overflow-hidden rounded-panel bg-ivory/10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <ScrollReveal key={service._id} delay={Math.min(i, 5) * 0.06}>
              <Link
                href={`/services/${service.slug}`}
                className="group relative flex h-full flex-col bg-stone p-8 transition-colors duration-500 hover:bg-stone-raised"
              >
                <span className="label-sm self-start rounded-chip px-2.5 py-1.5 text-ivory/40 ring-1 ring-ivory/15">
                  {service.tag}
                </span>

                <h3 className="font-display mt-9 text-subheading font-medium text-ivory">
                  {service.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ivory/50">
                  {service.description}
                </p>

                <span className="label-sm mt-auto flex items-center gap-2 pt-8 text-gold opacity-0 transition-all duration-300 ease-[var(--ease-out-soft)] group-hover:translate-x-0 group-hover:opacity-100 md:-translate-x-2">
                  Learn more
                  <span aria-hidden>→</span>
                </span>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
