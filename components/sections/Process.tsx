import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { HomePage } from "@/lib/types";

export function Process({ home }: { home: HomePage }) {
  const steps = home.processSteps ?? [];
  if (steps.length === 0) return null;

  return (
    <section className="border-t border-navy/8 bg-ivory py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          heading={home.processHeading ?? "Four stages. No surprises."}
        />

        <ol className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <ScrollReveal key={step.title} delay={i * 0.08} as="li">
              <div className="flex items-center gap-3">
                <span className="label-sm text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-navy/10" />
              </div>
              <h3 className="font-display mt-6 text-subheading font-medium text-navy">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-navy/55">
                {step.description}
              </p>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
