import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { Button } from "@/components/ui/Button";
import { ParcelCard } from "@/components/ui/ParcelCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Parcel } from "@/lib/types";

export function LandBankPreview({
  parcels,
  eyebrow,
  heading,
}: {
  parcels: Parcel[];
  eyebrow?: string;
  heading?: string;
}) {
  if (parcels.length === 0) return null;

  return (
    <section id="landbank" className="bg-ivory py-24 md:py-32">
      <div className="shell">
        <SectionHeading
          eyebrow={eyebrow ?? "Land Bank"}
          heading={heading ?? "Currently mandated."}
          align="between"
        >
          <Button href="/land-bank" variant="outline" className="text-navy">
            View the land bank
            <span aria-hidden>→</span>
          </Button>
        </SectionHeading>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {parcels.slice(0, 6).map((parcel, i) => (
            <ScrollReveal key={parcel._id} delay={Math.min(i, 5) * 0.07}>
              <ParcelCard parcel={parcel} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
