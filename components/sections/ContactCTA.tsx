import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { EnquiryForm } from "@/components/sections/EnquiryForm";
import type { SiteSettings } from "@/lib/types";
import { whatsappLink } from "@/lib/utils";

export function ContactCTA({
  settings,
  heading = "Tell us the requirement. We'll tell you honestly if it exists.",
  intro = "Extent, budget, preferred corridor and intended use. That's enough for a first conversation.",
}: {
  settings: SiteSettings;
  heading?: string;
  intro?: string;
}) {
  const rows = [
    { label: "Telephone", value: settings.phone, href: `tel:${settings.phone.replace(/\s/g, "")}` },
    { label: "Email", value: settings.email, href: `mailto:${settings.email}` },
    { label: "Office", value: settings.addressLines?.join(", ") ?? "" },
    { label: "RERA", value: settings.reraNumber ?? "" },
  ].filter((row) => row.value);

  const whatsapp = whatsappLink(
    settings.whatsappNumber,
    "Hello Sudha Square. I'd like to discuss a land requirement.",
  );

  return (
    <section
      id="contact"
      className="py-24 md:py-32"
      style={{
        // Navy into warm stone. The old gradient ran into a green, which
        // put a hue on the page that appears nowhere else in the brand.
        background: "linear-gradient(140deg, #0b132b 0%, #211d18 100%)",
      }}
    >
      <div className="shell grid gap-14 md:grid-cols-2 md:gap-20">
        <ScrollReveal>
          <h2 className="font-display text-title font-medium text-balance text-ivory">
            {heading}
          </h2>
          <p className="mt-6 text-lede text-ivory/55">{intro}</p>

          <dl className="mt-12">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex items-start gap-8 border-b border-ivory/8 py-4"
              >
                <dt className="label-sm w-20 shrink-0 pt-0.5 text-ivory/30">
                  {row.label}
                </dt>
                <dd className="text-sm text-ivory/70">
                  {row.href ? (
                    <a
                      href={row.href}
                      className="transition-colors hover:text-ivory"
                    >
                      {row.value}
                    </a>
                  ) : (
                    row.value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          {whatsapp && (
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="label-sm mt-8 inline-flex items-center gap-2 rounded-full border border-ivory/20 px-5 py-3 text-ivory/70 transition-all duration-300 hover:border-ivory/45 hover:text-ivory"
            >
              Message on WhatsApp
              <span aria-hidden>→</span>
            </a>
          )}
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <EnquiryForm surface="dark" />
        </ScrollReveal>
      </div>
    </section>
  );
}
