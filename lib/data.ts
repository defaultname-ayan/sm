/**
 * Data access layer.
 *
 * Every page reads through these functions rather than touching the Sanity
 * client directly, which keeps one rule in one place: when Sanity is not
 * configured, serve seed content so the site still renders.
 *
 * Singletons additionally fall back when the document is missing, because a
 * freshly created dataset has no `siteSettings` or `homePage` document until
 * `npm run seed` runs - and a missing singleton would otherwise blank the site.
 * Lists deliberately do NOT fall back once Sanity is live: an empty land bank
 * means the client emptied it, and we should show that honestly.
 */

import { client } from "@/sanity/client";
import { hasSanity } from "@/sanity/env";

import * as seed from "./seed-data";
import {
  caseStudiesQuery,
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
  clientLogosQuery,
  featuredParcelsQuery,
  homePageQuery,
  latestBrochureQuery,
  parcelBySlugQuery,
  parcelSlugsQuery,
  pageContentQuery,
  parcelsQuery,
  postBySlugQuery,
  postSlugsQuery,
  postsQuery,
  serviceBySlugQuery,
  serviceSlugsQuery,
  servicesQuery,
  siteSettingsQuery,
} from "./queries";
import type {
  Brochure,
  CaseStudy,
  ClientLogo,
  HomePage,
  PageContent,
  Parcel,
  Post,
  Service,
  SiteSettings,
} from "./types";

/** Revalidate published content hourly; Sanity webhooks can shorten this later. */
const REVALIDATE = 3600;

async function query<T>(q: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(q, params, {
      next: { revalidate: REVALIDATE },
    });
  } catch (error) {
    console.error("[sanity] query failed, falling back to seed content:", error);
    return null;
  }
}

// ── Singletons ─────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!hasSanity) return seed.siteSettings;
  const data = await query<SiteSettings>(siteSettingsQuery);
  return data ?? seed.siteSettings;
}

export async function getHomePage(): Promise<HomePage> {
  if (!hasSanity) return seed.homePage;
  const data = await query<HomePage>(homePageQuery);
  return data ?? seed.homePage;
}

/**
 * Header copy for one of the standard pages, by its fixed document id
 * (for example "page.about"). Falls back to the starter copy so a page never
 * renders headless while the client is still filling the Studio in.
 */
export async function getPageContent(id: string): Promise<PageContent> {
  const fallback = seed.pages[id];
  if (!hasSanity) return fallback;
  const data = await query<PageContent>(pageContentQuery, { id });
  return data ?? fallback;
}

// ── Parcels ────────────────────────────────────────────────────────────────

export async function getParcels(): Promise<Parcel[]> {
  if (!hasSanity) return seed.parcels;
  return (await query<Parcel[]>(parcelsQuery)) ?? seed.parcels;
}

export async function getFeaturedParcels(): Promise<Parcel[]> {
  if (!hasSanity) return seed.parcels.filter((p) => p.featured);
  return (await query<Parcel[]>(featuredParcelsQuery)) ?? [];
}

export async function getParcel(slug: string): Promise<Parcel | null> {
  if (!hasSanity) return seed.parcels.find((p) => p.slug === slug) ?? null;
  return await query<Parcel>(parcelBySlugQuery, { slug });
}

export async function getParcelSlugs(): Promise<string[]> {
  if (!hasSanity) return seed.parcels.map((p) => p.slug);
  return (await query<string[]>(parcelSlugsQuery)) ?? [];
}

// ── Posts ──────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  if (!hasSanity) return seed.posts;
  return (await query<Post[]>(postsQuery)) ?? seed.posts;
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!hasSanity) return seed.posts.find((p) => p.slug === slug) ?? null;
  return await query<Post>(postBySlugQuery, { slug });
}

export async function getPostSlugs(): Promise<string[]> {
  if (!hasSanity) return seed.posts.map((p) => p.slug);
  return (await query<string[]>(postSlugsQuery)) ?? [];
}

// ── Case studies ───────────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudy[]> {
  if (!hasSanity) return seed.caseStudies;
  return (await query<CaseStudy[]>(caseStudiesQuery)) ?? seed.caseStudies;
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  if (!hasSanity) return seed.caseStudies.find((c) => c.slug === slug) ?? null;
  return await query<CaseStudy>(caseStudyBySlugQuery, { slug });
}

export async function getCaseStudySlugs(): Promise<string[]> {
  if (!hasSanity) return seed.caseStudies.map((c) => c.slug);
  return (await query<string[]>(caseStudySlugsQuery)) ?? [];
}

// ── Services ───────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  if (!hasSanity) return seed.services;
  return (await query<Service[]>(servicesQuery)) ?? seed.services;
}

export async function getService(slug: string): Promise<Service | null> {
  if (!hasSanity) return seed.services.find((s) => s.slug === slug) ?? null;
  return await query<Service>(serviceBySlugQuery, { slug });
}

export async function getServiceSlugs(): Promise<string[]> {
  if (!hasSanity) return seed.services.map((s) => s.slug);
  return (await query<string[]>(serviceSlugsQuery)) ?? [];
}

// ── Misc ───────────────────────────────────────────────────────────────────

export async function getClientLogos(): Promise<ClientLogo[]> {
  if (!hasSanity) return seed.clientLogos;
  return (await query<ClientLogo[]>(clientLogosQuery)) ?? seed.clientLogos;
}

export async function getLatestBrochure(): Promise<Brochure | null> {
  if (!hasSanity) return seed.brochure;
  return (await query<Brochure>(latestBrochureQuery)) ?? seed.brochure;
}
