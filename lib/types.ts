import type { PortableTextBlock } from "next-sanity";

/**
 * Images arrive either as a Sanity asset object (live content) or a plain URL
 * string (seed content). `urlForImage` normalises both, so components never
 * need to know which they were handed.
 */
export type ImageSource =
  | string
  | { _type?: string; asset?: { _ref?: string; _type?: string }; alt?: string };

export type DealType = "Outright Sale" | "JDA";
export type ParcelStatus = "Available" | "Under Negotiation" | "Mandated";
export type Zone =
  | "North Hyderabad"
  | "South Hyderabad"
  | "East Hyderabad"
  | "West Hyderabad";

export type Parcel = {
  _id: string;
  slug: string;
  location: string;
  district: string;
  zone: Zone;
  acres: number;
  zoning: string;
  dealType: DealType;
  status: ParcelStatus;
  titleStatus?: string;
  surveyNumbers?: string[];
  proximity?: string;
  priceOnRequest?: boolean;
  priceLabel?: string;
  featured?: boolean;
  coordinates?: { lat: number; lng: number };
  coverImage: ImageSource;
  gallery?: ImageSource[];
  body?: PortableTextBlock[];
  listingLinks?: { acres99?: string; magicBricks?: string };
  seo?: Seo;
};

export type Post = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  coverImage?: ImageSource;
  author?: string;
  publishedAt: string;
  body?: PortableTextBlock[];
  seo?: Seo;
};

export type CaseStudy = {
  _id: string;
  slug: string;
  type: string;
  location: string;
  acreage: string;
  structure: string;
  narrative: string;
  image: ImageSource;
  body?: PortableTextBlock[];
  order?: number;
  seo?: Seo;
};

export type Service = {
  _id: string;
  slug: string;
  title: string;
  tag: string;
  description: string;
  body?: PortableTextBlock[];
  image?: ImageSource;
  order: number;
  seo?: Seo;
};

export type ClientLogo = {
  _id: string;
  name: string;
  logo?: ImageSource;
  order?: number;
};

export type Brochure = {
  _id: string;
  issueMonth: string;
  coverSummary?: string[];
  fileUrl?: string;
};

export type Seo = {
  metaTitle?: string;
  metaDescription?: string;
  shareImage?: ImageSource;
};

export type NavLink = { label: string; href: string };

export type FooterColumn = { title: string; links?: NavLink[] };

/** Header copy for one of the standard pages. */
export type PageContent = {
  eyebrow?: string;
  heading: string;
  intro?: string;
  image?: ImageSource;
  seo?: Seo;
};

export type SiteSettings = {
  companyName: string;
  tagline: string;
  descriptor: string;
  reraNumber?: string;
  phone: string;
  email: string;
  whatsappNumber?: string;
  addressLines?: string[];
  linkedin?: string;
  acres99Profile?: string;
  magicBricksProfile?: string;
  navigation?: NavLink[];
  footerBlurb?: string;
  footerColumns?: FooterColumn[];
  seo?: Seo;
};

export type HomePage = {
  heroEyebrow?: string;
  heroHeading: string;
  heroSubheading: string;
  heroImage?: ImageSource;
  stats?: { value: string; label: string }[];
  positioningHeading: string;
  positioningBody?: string[];
  verifications?: { label: string; detail?: string }[];
  infrastructureHeading?: string;
  infrastructureIntro?: string;
  infrastructureImage?: ImageSource;
  infrastructureVectors?: { label: string; description?: string }[];
  processHeading?: string;
  processSteps?: { title: string; description: string }[];
  // Section headings, so no copy on the homepage is trapped in the code.
  trustedByLabel?: string;
  servicesHeading?: string;
  landBankEyebrow?: string;
  landBankHeading?: string;
  corridorsHeading?: string;
  caseStudiesEyebrow?: string;
  caseStudiesHeading?: string;
  briefHeading?: string;
  briefIntro?: string;
  insightsEyebrow?: string;
  insightsHeading?: string;
  contactHeading?: string;
  contactIntro?: string;
};
