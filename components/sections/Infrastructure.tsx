import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SmartImage } from "@/components/ui/SmartImage";
import type { HomePage } from "@/lib/types";

export function Infrastructure({ home }: { home: HomePage }) {
  if (!home.infrastructureHeading) return null;

  return (
    <section className="bg-ivory py-24 md:py-32">
      <div className="shell grid items-center gap-14 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          <div className="relative aspect-4/3 overflow-hidden rounded-panel bg-ivory-shade">
            <SmartImage
              source={home.infrastructureImage}
              alt=""
              fill
              sizes="(min-width: 768px) 45vw, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-navy/35 to-transparent" />
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="font-display text-heading font-medium text-balance text-navy">
            {home.infrastructureHeading}
          </h2>
          {home.infrastructureIntro && (
            <p className="mt-6 text-lede text-navy/60">
              {home.infrastructureIntro}
            </p>
          )}

          <ul className="mt-10 border-t border-navy/10">
            {home.infrastructureVectors?.map((vector) => (
              <li
                key={vector.label}
                className="-mx-3 flex gap-4 border-b border-navy/8 px-3 py-4 transition-colors duration-200 hover:bg-navy/2"
              >
                <span
                  aria-hidden
                  className="mt-2 size-1.5 shrink-0 rounded-full bg-gold"
                />
                <div>
                  <p className="text-sm font-medium text-navy">{vector.label}</p>
                  {vector.description && (
                    <p className="mt-1 text-[13px] leading-relaxed text-navy/50">
                      {vector.description}
                    </p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
