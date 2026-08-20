import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { getSiteSettings } from "@/lib/data";

export default async function SiteLayout({
  children,
}: LayoutProps<"/">) {
  const settings = await getSiteSettings();

  return (
    <SmoothScroll>
      <a
        href="#main"
        className="label-sm sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-100 focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-ivory"
      >
        Skip to content
      </a>
      <Header settings={settings} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
      <div className="grain" aria-hidden />
      <WhatsAppButton number={settings.whatsappNumber} />
    </SmoothScroll>
  );
}
