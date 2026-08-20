import type { SchemaTypeDefinition } from "sanity";

import { brochure } from "./documents/brochure";
import { caseStudy } from "./documents/caseStudy";
import { clientLogo } from "./documents/clientLogo";
import { pageContent } from "./documents/pageContent";
import { parcel } from "./documents/parcel";
import { post } from "./documents/post";
import { service } from "./documents/service";
import { blockContent } from "./objects/blockContent";
import { listingLinks } from "./objects/listingLinks";
import { navLink } from "./objects/navLink";
import { seo } from "./objects/seo";
import { homePage } from "./singletons/homePage";
import { siteSettings } from "./singletons/siteSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  // Singletons
  siteSettings,
  homePage,
  // Documents
  parcel,
  post,
  pageContent,
  caseStudy,
  service,
  clientLogo,
  brochure,
  // Objects
  blockContent,
  listingLinks,
  navLink,
  seo,
];
