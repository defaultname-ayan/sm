import type { MetadataRoute } from "next";

import {
  getCaseStudySlugs,
  getParcelSlugs,
  getPostSlugs,
  getServiceSlugs,
} from "@/lib/data";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sudhasquare.in";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [parcels, posts, services, caseStudies] = await Promise.all([
    getParcelSlugs(),
    getPostSlugs(),
    getServiceSlugs(),
    getCaseStudySlugs(),
  ]);

  const now = new Date();

  const staticRoutes = [
    { path: "", priority: 1 },
    { path: "/land-bank", priority: 0.9 },
    { path: "/services", priority: 0.8 },
    { path: "/insights", priority: 0.7 },
    { path: "/case-studies", priority: 0.6 },
    { path: "/about", priority: 0.6 },
    { path: "/contact", priority: 0.6 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${BASE}${route.path}`,
      lastModified: now,
      priority: route.priority,
    })),
    ...parcels.map((slug) => ({
      url: `${BASE}/land-bank/${slug}`,
      lastModified: now,
      priority: 0.8,
    })),
    ...services.map((slug) => ({
      url: `${BASE}/services/${slug}`,
      lastModified: now,
      priority: 0.7,
    })),
    ...posts.map((slug) => ({
      url: `${BASE}/insights/${slug}`,
      lastModified: now,
      priority: 0.6,
    })),
    ...caseStudies.map((slug) => ({
      url: `${BASE}/case-studies/${slug}`,
      lastModified: now,
      priority: 0.5,
    })),
  ];
}
