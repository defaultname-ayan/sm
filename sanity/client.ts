import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanity, projectId } from "./env";

/**
 * Shared read client.
 *
 * `useCdn` is deliberately OFF. The CDN is a second cache in front of the
 * dataset, and combined with Next's own data cache it made published edits
 * take minutes to appear with no way to tell which layer was holding the
 * stale copy. Reads go straight to the API so there is exactly one source of
 * truth.
 */
export const client = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false,
      perspective: "published",
    })
  : null;
