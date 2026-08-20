import Link from "next/link";

import type { SiteSettings } from "@/lib/types";

export function Footer({ settings }: { settings: SiteSettings }) {
  const year = new Date().getFullYear();
  const columns = settings.footerColumns ?? [];

  return (
    <footer className="bg-navy-deep pt-20 pb-10 text-ivory">
      <div className="shell">
        <div className="grid gap-12 border-b border-ivory/8 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-baseline gap-2.5">
              <span className="font-display text-lg font-semibold">
                {settings.companyName}
              </span>
              <span className="h-3.5 w-px bg-ivory/20" />
              <span className="label-sm text-ivory/45">{settings.tagline}</span>
            </div>
            {settings.footerBlurb && (
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-ivory/45">
                {settings.footerBlurb}
              </p>
            )}
            <address className="label-sm mt-7 space-y-1.5 text-ivory/35 not-italic">
              {settings.addressLines?.map((line) => <div key={line}>{line}</div>)}
              <div>
                <a
                  href={`mailto:${settings.email}`}
                  className="transition-colors hover:text-ivory/70"
                >
                  {settings.email}
                </a>
              </div>
              <div>
                <a
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-ivory/70"
                >
                  {settings.phone}
                </a>
              </div>
              {settings.reraNumber && <div>RERA: {settings.reraNumber}</div>}
            </address>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="label-sm text-ivory/30">{column.title}</h2>
              <ul className="mt-6 space-y-3.5">
                {column.links?.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ivory/45 transition-colors duration-200 hover:text-ivory"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-4 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="label-sm text-ivory/25">
            © {year} {settings.companyName}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {settings.linkedin && (
              <a
                href={settings.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm text-ivory/30 transition-colors hover:text-ivory/70"
              >
                LinkedIn
              </a>
            )}
            {settings.acres99Profile && (
              <a
                href={settings.acres99Profile}
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm text-ivory/30 transition-colors hover:text-ivory/70"
              >
                99acres
              </a>
            )}
            {settings.magicBricksProfile && (
              <a
                href={settings.magicBricksProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="label-sm text-ivory/30 transition-colors hover:text-ivory/70"
              >
                MagicBricks
              </a>
            )}
            <p className="label-sm text-ivory/20">{settings.descriptor}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
