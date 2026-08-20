import {
  createImageUrlBuilder,
  type SanityImageSource,
} from "@sanity/image-url";

import { dataset, hasSanity, projectId } from "./env";

const builder = hasSanity
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/**
 * Resolves either a Sanity image object or a plain URL string to a usable
 * `src`. Seed content uses plain strings, Sanity content uses image objects,
 * this lets every component treat them identically.
 */
export function urlForImage(
  source: SanityImageSource | string | null | undefined,
  opts: { width?: number; height?: number; quality?: number } = {},
): string {
  if (!source) return "";
  if (typeof source === "string") return source;
  if (!builder) return "";

  let img = builder.image(source).auto("format").fit("crop");
  if (opts.width) img = img.width(opts.width);
  if (opts.height) img = img.height(opts.height);
  img = img.quality(opts.quality ?? 82);

  return img.url();
}
