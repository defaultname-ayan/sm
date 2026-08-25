/**
 * Pushes the starter content into a Sanity dataset.
 *
 * Run once after connecting a fresh Sanity project:
 *   npm run seed
 *
 * Safe to re-run — every document is written with a fixed `_id` via
 * `createOrReplace`, so a second run updates rather than duplicates. That does
 * mean it overwrites edits made in the Studio to these specific documents, so
 * it should not be run casually once the client has started working.
 *
 * Images referenced by the starter content are uploaded to Sanity so the
 * client sees real, croppable assets rather than external URLs.
 */

import { createClient } from "@sanity/client";

import {
  brochure,
  caseStudies,
  clientLogos,
  homePage,
  pages,
  parcels,
  posts,
  services,
  siteSettings,
} from "../lib/seed-data";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN ?? "";

if (!projectId) {
  console.error(
    "\n  NEXT_PUBLIC_SANITY_PROJECT_ID is not set.\n" +
      "  Add it to .env.local, then run this again.\n",
  );
  process.exit(1);
}

if (!token) {
  console.error(
    "\n  SANITY_API_WRITE_TOKEN is not set.\n" +
      "  Create one at https://sanity.io/manage → API → Tokens (Editor role),\n" +
      "  add it to .env.local, then run this again.\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2026-08-20",
  useCdn: false,
});

/** Uploaded assets are cached by URL so a shared image uploads only once. */
const assetCache = new Map<string, string>();

async function uploadImage(url: string): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | undefined> {
  if (assetCache.has(url)) {
    return {
      _type: "image",
      asset: { _type: "reference", _ref: assetCache.get(url)! },
    };
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const buffer = Buffer.from(await response.arrayBuffer());
    const filename = `${new URL(url).pathname.split("/").pop() ?? "image"}.jpg`;
    const asset = await client.assets.upload("image", buffer, { filename });

    assetCache.set(url, asset._id);
    process.stdout.write("  ·");

    return { _type: "image", asset: { _type: "reference", _ref: asset._id } };
  } catch (error) {
    console.warn(`\n  Could not upload ${url}: ${(error as Error).message}`);
    return undefined;
  }
}

/** Resolves a seed image (a URL string) to a Sanity image reference. */
async function img(source: unknown) {
  return typeof source === "string" ? await uploadImage(source) : undefined;
}

async function main() {
  console.log(`\n  Seeding ${projectId}/${dataset}\n`);

  process.stdout.write("  Uploading images");
  const heroImage = await img(homePage.heroImage);
  const infraImage = await img(homePage.infrastructureImage);

  const serviceImages = await Promise.all(services.map((s) => img(s.image)));
  const parcelCovers = await Promise.all(parcels.map((p) => img(p.coverImage)));
  const parcelGalleries = await Promise.all(
    parcels.map((p) => Promise.all((p.gallery ?? []).map((g) => img(g)))),
  );
  const caseImages = await Promise.all(caseStudies.map((c) => img(c.image)));
  const postCovers = await Promise.all(posts.map((p) => img(p.coverImage)));
  const pageEntries = Object.entries(pages);
  const pageImages = await Promise.all(pageEntries.map(([, c]) => img(c.image)));
  console.log(" done");

  const tx = client.transaction();

  tx.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    ...siteSettings,
    navigation: siteSettings.navigation?.map((link, i) => ({
      ...link,
      _key: `nav-${i}`,
      _type: "navLink",
    })),
    footerColumns: siteSettings.footerColumns?.map((column, i) => ({
      ...column,
      _key: `col-${i}`,
      _type: "footerColumn",
      links: column.links?.map((link, j) => ({
        ...link,
        _key: `col-${i}-link-${j}`,
        _type: "navLink",
      })),
    })),
  });

  // Header copy for the six standard pages. Fixed ids so the Studio can show
  // them as one editable item each.
  const PAGE_NAMES: Record<string, string> = {
    "page-landBank": "Land Bank",
    "page-services": "Services",
    "page-insights": "Insights",
    "page-caseStudies": "Case Studies",
    "page-about": "About",
    "page-contact": "Contact",
  };
  pageEntries.forEach(([id, content], i) => {
    tx.createOrReplace({
      _id: id,
      _type: "pageContent",
      name: PAGE_NAMES[id] ?? id,
      ...content,
      image: pageImages[i],
    });
  });

  tx.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    ...homePage,
    heroImage,
    infrastructureImage: infraImage,
    stats: homePage.stats?.map((s, i) => ({ ...s, _key: `stat-${i}` })),
    verifications: homePage.verifications?.map((v, i) => ({ ...v, _key: `ver-${i}` })),
    infrastructureVectors: homePage.infrastructureVectors?.map((v, i) => ({
      ...v,
      _key: `vec-${i}`,
    })),
    processSteps: homePage.processSteps?.map((s, i) => ({ ...s, _key: `step-${i}` })),
  });

  services.forEach((service, i) => {
    const { _id, slug, ...rest } = service;
    tx.createOrReplace({
      _id,
      _type: "service",
      ...rest,
      image: serviceImages[i],
      slug: { _type: "slug", current: slug },
    });
  });

  parcels.forEach((parcel, i) => {
    const { _id, slug, coordinates, ...rest } = parcel;
    tx.createOrReplace({
      _id,
      _type: "parcel",
      ...rest,
      slug: { _type: "slug", current: slug },
      coverImage: parcelCovers[i],
      gallery: parcelGalleries[i]
        .filter(Boolean)
        .map((image, g) => ({ ...image!, _key: `gal-${g}` })),
      coordinates: coordinates
        ? { _type: "geopoint", lat: coordinates.lat, lng: coordinates.lng }
        : undefined,
    });
  });

  caseStudies.forEach((study, i) => {
    const { _id, slug, ...rest } = study;
    tx.createOrReplace({
      _id,
      _type: "caseStudy",
      ...rest,
      image: caseImages[i],
      slug: { _type: "slug", current: slug },
    });
  });

  posts.forEach((post, i) => {
    const { _id, slug, ...rest } = post;
    tx.createOrReplace({
      _id,
      _type: "post",
      ...rest,
      coverImage: postCovers[i],
      slug: { _type: "slug", current: slug },
    });
  });

  clientLogos.forEach((logo) => {
    const { _id, ...rest } = logo;
    tx.createOrReplace({ _id, _type: "clientLogo", ...rest });
  });

  // The brochure document intentionally omits `file` — the PDF is the one
  // thing only the client can supply, and they upload it in the Studio.
  tx.createOrReplace({
    _id: brochure._id,
    _type: "brochure",
    issueMonth: brochure.issueMonth,
    coverSummary: brochure.coverSummary,
  });

  await tx.commit();

  const total =
    2 + Object.keys(pages).length + services.length + parcels.length +
    caseStudies.length + posts.length + clientLogos.length + 1;

  console.log(`  Wrote ${total} documents.\n`);
  console.log("  Next: open http://localhost:3000/studio to edit.\n");
  console.log(
    "  Note: the Land Opportunities brief has no PDF yet — upload one in\n" +
      "  the Studio under “Land Opportunities Briefs”.\n",
  );
}

main().catch((error) => {
  console.error("\n  Seeding failed:", error.message ?? error, "\n");
  process.exit(1);
});
