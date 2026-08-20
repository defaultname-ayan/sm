import { Marquee } from "@/components/motion/Marquee";
import { Label } from "@/components/ui/Label";
import type { ClientLogo, SiteSettings } from "@/lib/types";

export function TrustStrip({
  clients,
  settings,
  label,
}: {
  clients: ClientLogo[];
  settings: SiteSettings;
  label?: string;
}) {
  if (clients.length === 0) return null;

  return (
    <section className="border-y border-navy/8 bg-ivory-shade py-14">
      <div className="shell flex flex-col gap-8 lg:flex-row lg:items-center">
        <div className="shrink-0 lg:w-56">
          <Label>{label ?? "Trusted by"}</Label>
        </div>

        <Marquee className="min-w-0 flex-1" speed={48}>
          {clients.map((client) => (
            <span
              key={client._id}
              className="label whitespace-nowrap text-navy/30 transition-colors duration-300 hover:text-navy/70"
            >
              {client.name}
            </span>
          ))}
        </Marquee>

        {/* Static information, so it takes the chip shape rather than the
            pill shape reserved for things you can click. */}
        {settings.reraNumber && (
          <div className="shrink-0 rounded-chip px-4 py-2.5 ring-1 ring-navy/12">
            <p className="label-sm text-navy/40">RERA Compliant</p>
            <p className="label-sm mt-0.5 text-navy/65">{settings.reraNumber}</p>
          </div>
        )}
      </div>
    </section>
  );
}
