import { Brief } from "@/components/sections/Brief";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { CorridorMap } from "@/components/sections/CorridorMap";
import { Hero } from "@/components/sections/Hero";
import { Infrastructure } from "@/components/sections/Infrastructure";
import { Insights } from "@/components/sections/Insights";
import { LandBankPreview } from "@/components/sections/LandBankPreview";
import { Positioning } from "@/components/sections/Positioning";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { Stats } from "@/components/sections/Stats";
import { TrustStrip } from "@/components/sections/TrustStrip";
import {
  getCaseStudies,
  getClientLogos,
  getHomePage,
  getLatestBrochure,
  getParcels,
  getPosts,
  getServices,
  getSiteSettings,
} from "@/lib/data";

export default async function HomePage() {
  const [home, settings, services, parcels, caseStudies, posts, clients, brochure] =
    await Promise.all([
      getHomePage(),
      getSiteSettings(),
      getServices(),
      getParcels(),
      getCaseStudies(),
      getPosts(),
      getClientLogos(),
      getLatestBrochure(),
    ]);

  const featured = parcels.filter((p) => p.featured);

  return (
    <>
      <Hero home={home} />
      <Stats home={home} />
      <TrustStrip
        clients={clients}
        settings={settings}
        label={home.trustedByLabel}
      />
      <Positioning home={home} />
      <Services services={services} heading={home.servicesHeading} />
      <LandBankPreview
        parcels={featured.length > 0 ? featured : parcels}
        eyebrow={home.landBankEyebrow}
        heading={home.landBankHeading}
      />
      <CorridorMap parcels={parcels} heading={home.corridorsHeading} />
      <Infrastructure home={home} />
      <CaseStudies
        caseStudies={caseStudies}
        eyebrow={home.caseStudiesEyebrow}
        heading={home.caseStudiesHeading}
      />
      <Brief
        brochure={brochure}
        settings={settings}
        heading={home.briefHeading}
        intro={home.briefIntro}
      />
      <Insights
        posts={posts}
        eyebrow={home.insightsEyebrow}
        heading={home.insightsHeading}
      />
      <Process home={home} />
      <ContactCTA
        settings={settings}
        heading={home.contactHeading}
        intro={home.contactIntro}
      />
    </>
  );
}
