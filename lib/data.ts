/**
 * Data access layer.
 *
 * Every page reads through these functions rather than touching the Sanity
 * client directly, which keeps one rule in one place: the site must render
 * completely whatever state the CMS is in.
 *
 * There are three states, and they are deliberately treated differently:
 *
 *   1. Sanity not configured  - serve seed content, so the site runs with no
 *                               setup at all.
 *   2. Configured but unseeded - the project exists but `npm run seed` has not
 *                               run yet. Empty lists fall back to seed content,
 *                               because an empty dataset is a setup step that
 *                               has not happened, not an editorial decision.
 *                               Without this, connecting a fresh project makes
 *                               most of the homepage vanish.
 *   3. Configured and seeded  - the dataset is real. An empty land bank now
 *                               means the client emptied it, and we show that
 *                               honestly.
 *
 * A failed query always falls back to seed content in every state: a Sanity
 * outage should degrade the site's freshness, never its structure.
 */

import { cache } from "react";

import { client } from "@/sanity/client";
import { hasSanity } from "@/sanity/env";

import * as seed from "./seed-data";
import {
  caseStudiesQuery,
  caseStudyBySlugQuery,
  caseStudySlugsQuery,
  clientLogosQuery,
  datasetSeededQuery,
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

/**
 * Every read goes to Sanity live, uncached.
 *
 * Content was previously cached for an hour, which meant a publish in the
 * Studio could take that long to reach the site, and a stale entry could even
 * make the build prerender a page for a parcel that had since been deleted.
 * For a site this size the queries are small and run in parallel, so reading
 * live costs little and removes the entire class of "why has it not updated"
 * problems: what you publish is what the next request serves.
 */
async function query<T>(q: string, params: Record<string, unknown> = {}): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(q, params, { cache: "no-store" });
  } catch (error) {
    // Next signals notFound(), redirect() and dynamic-rendering decisions by
    // throwing. Swallowing those breaks its control flow: during a build it
    // made pages silently prerender from seed content instead of the real
    // dataset. Only genuine query failures fall back.
    if (isFrameworkSignal(error)) throw error;
    console.error("[sanity] query failed, falling back to seed content:", error);
    return null;
  }
}

function isFrameworkSignal(error: unknown): boolean {
  const digest = (error as { digest?: unknown } | null)?.digest;
  return (
    typeof digest === "string" &&
    (digest === "NEXT_NOT_FOUND" ||
      digest.startsWith("NEXT_REDIRECT") ||
      digest.startsWith("NEXT_HTTP_ERROR_FALLBACK") ||
      digest.startsWith("DYNAMIC_SERVER_USAGE"))
  );
}

/**
 * Content is edited by hand, so a document can be published while still half
 * filled in. A parcel with no slug cannot be linked to and is dropped; every
 * other missing field degrades in the UI rather than throwing. Dropped
 * documents are named in the log so the gap is findable rather than silent.
 */
function renderable<T>(items: T[]): T[] {
  return items.filter((item) => {
    const doc = item as { _id?: string; slug?: string } | null;
    if (doc && typeof doc.slug === "string" && doc.slug.length > 0) return true;
    console.warn(
      `[sanity] Skipping document ${doc?._id ?? "(unknown)"}: it has no web address (slug) yet. ` +
        "Open it in /studio and press Generate next to the web address field.",
    );
    return false;
  });
}

/**
 * Has the dataset been seeded? Cached per request so the probe costs one
 * query per render at most, and cached by Next between renders like every
 * other read.
 */
const isSeeded = cache(async (): Promise<boolean> => {
  if (!hasSanity) return false;
  const seeded = await query<boolean>(datasetSeededQuery);
  if (seeded === false && process.env.NODE_ENV === "development") {
    console.warn(
      "[sanity] Connected, but this dataset has no starter content yet.\n" +
        "         Serving built-in content for anything the dataset is missing.\n" +
        "         Run `npm run seed` to make every section editable in /studio.",
    );
  }
  return seeded === true;
});

/**
 * A list read. Falls back to seed content when the query fails, and when the
 * result is empty on a dataset that has not been seeded yet.
 */
async function list<T>(q: string, fallback: T[]): Promise<T[]> {
  if (!hasSanity) return fallback;
  const data = await query<T[]>(q);
  if (data === null) return fallback;
  const usable = renderable(data);
  if (usable.length > 0) return usable;
  return (await isSeeded()) ? [] : fallback;
}

/**
 * A single document by slug. Mirrors `list()` on purpose: while the dataset is
 * unseeded the listing pages render seed content, so the detail page behind
 * each of those cards has to resolve too - otherwise every link 404s.
 */
async function bySlug<T>(
  q: string,
  slug: string,
  fallback: T | undefined,
): Promise<T | null> {
  if (!hasSanity) return fallback ?? null;
  const data = await query<T>(q, { slug });
  if (data) return data;
  return (await isSeeded()) ? null : (fallback ?? null);
}

/** A singleton read. Falls back whenever the document is absent. */
async function single<T extends object>(
  q: string,
  fallback: T,
  params: Record<string, unknown> = {},
): Promise<T> {
  if (!hasSanity) return fallback;
  const data = await query<T>(q, params);
  if (!data) return fallback;
  // Merge field by field rather than swapping the whole document. These are
  // single documents the client edits over time, and an individual field can
  // be blank long before the document as a whole is. Falling back per field
  // means a cleared heading shows the starter heading instead of rendering
  // nothing (or throwing on the way there).
  return { ...fallback, ...definedOnly(data) };
}

/** Drops null, undefined and empty-string values so they cannot mask a default. */
function definedOnly<T extends object>(source: T): Partial<T> {
  const out: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(source)) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    if (Array.isArray(value) && value.length === 0) continue;
    out[key] = value;
  }
  return out as Partial<T>;
}

// ── Singletons ─────────────────────────────────────────────────────────────

export async function getSiteSettings(): Promise<SiteSettings> {
  return single(siteSettingsQuery, seed.siteSettings);
}

export async function getHomePage(): Promise<HomePage> {
  return single(homePageQuery, seed.homePage);
}

/**
 * Header copy for one of the standard pages, by its fixed document id
 * (for example "page-about"). Falls back to the starter copy so a page never
 * renders headless while the client is still filling the Studio in.
 */
export async function getPageContent(id: string): Promise<PageContent> {
  return single(pageContentQuery, seed.pages[id], { id });
}

// ── Parcels ────────────────────────────────────────────────────────────────

export async function getParcels(): Promise<Parcel[]> {
  return list(parcelsQuery, seed.parcels);
}

export async function getFeaturedParcels(): Promise<Parcel[]> {
  return list(featuredParcelsQuery, seed.parcels.filter((p) => p.featured));
}

export async function getParcel(slug: string): Promise<Parcel | null> {
  return bySlug(parcelBySlugQuery, slug, seed.parcels.find((p) => p.slug === slug));
}

export async function getParcelSlugs(): Promise<string[]> {
  return list(parcelSlugsQuery, seed.parcels.map((p) => p.slug));
}

// ── Posts ──────────────────────────────────────────────────────────────────

export async function getPosts(): Promise<Post[]> {
  return list(postsQuery, seed.posts);
}

export async function getPost(slug: string): Promise<Post | null> {
  return bySlug(postBySlugQuery, slug, seed.posts.find((p) => p.slug === slug));
}

export async function getPostSlugs(): Promise<string[]> {
  return list(postSlugsQuery, seed.posts.map((p) => p.slug));
}

// ── Case studies ───────────────────────────────────────────────────────────

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return list(caseStudiesQuery, seed.caseStudies);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  return bySlug(caseStudyBySlugQuery, slug, seed.caseStudies.find((c) => c.slug === slug));
}

export async function getCaseStudySlugs(): Promise<string[]> {
  return list(caseStudySlugsQuery, seed.caseStudies.map((c) => c.slug));
}

// ── Services ───────────────────────────────────────────────────────────────

export async function getServices(): Promise<Service[]> {
  return list(servicesQuery, seed.services);
}

export async function getService(slug: string): Promise<Service | null> {
  return bySlug(serviceBySlugQuery, slug, seed.services.find((s) => s.slug === slug));
}

export async function getServiceSlugs(): Promise<string[]> {
  return list(serviceSlugsQuery, seed.services.map((s) => s.slug));
}

// ── Misc ───────────────────────────────────────────────────────────────────

export async function getClientLogos(): Promise<ClientLogo[]> {
  return list(clientLogosQuery, seed.clientLogos);
}

export async function getLatestBrochure(): Promise<Brochure | null> {
  if (!hasSanity) return seed.brochure;
  const data = await query<Brochure>(latestBrochureQuery);
  if (data) return data;
  return (await isSeeded()) ? null : seed.brochure;
}
