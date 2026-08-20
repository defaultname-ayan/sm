/**
 * Sanity connection details.
 *
 * The site is designed to run *without* Sanity configured: when `hasSanity`
 * is false the data layer serves seed content instead, so the site renders
 * fully before the CMS project exists. Fill in the two public vars in
 * `.env.local` to switch over to live content.
 */

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2026-08-20";

/** Sanity project IDs are lowercase alphanumeric. Guards against placeholder values. */
export const hasSanity = /^[a-z0-9]+$/.test(projectId);

/** Read token, only needed for draft previews. Never exposed to the client. */
export const readToken = process.env.SANITY_API_READ_TOKEN ?? "";
