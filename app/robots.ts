import type { MetadataRoute } from "next";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudhasquare.in";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The CMS is for the client, not for search engines.
      disallow: "/studio",
    },
    sitemap: `${BASE}/sitemap.xml`,
  };
}
