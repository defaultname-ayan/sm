import { ScrollReveal } from "@/components/motion/ScrollReveal";
import type { HomePage } from "@/lib/types";

export function Positioning({ home }: { home: HomePage }) {
  return (
    <section id="diligence" className="bg-ivory py-24 md:py-32">
      <div className="shell grid gap-14 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          <h2 className="font-display text-title font-medium text-balance text-navy">
            {home.positioningHeading}
          </h2>
          <div className="mt-8 space-y-5">
            {home.positioningBody?.map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="text-lede text-navy/65">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.12}>
          <ol className="overflow-hidden rounded-panel border border-navy/10 bg-white">
            {home.verifications?.map((item, i) => (
              <li
                key={item.label}
                className="group flex items-start gap-5 border-b border-navy/8 p-5 transition-colors duration-300 last:border-b-0 hover:bg-navy/2"
              >
                <span className="label-sm mt-0.5 shrink-0 text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-navy">{item.label}</p>
                  {item.detail && (
                    <p className="label-sm mt-1 text-navy/40">{item.detail}</p>
                  )}
                </div>
                <span
                  aria-hidden
                  className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-gold/15 text-[10px] text-[#8a6f13]"
                >
                  ✓
                </span>
              </li>
            ))}
          </ol>
        </ScrollReveal>
      </div>
    </section>
  );
}
