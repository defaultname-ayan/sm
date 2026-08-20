import { createClient } from "next-sanity";

import { apiVersion, dataset, hasSanity, projectId } from "./env";

/**
 * Shared read client. `useCdn` is on because every query on this site is
 * public, cacheable content - the CDN is both faster and cheaper.
 */
export const client = hasSanity
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: true,
      perspective: "published",
    })
  : null;
