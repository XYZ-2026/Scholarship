import type { MetadataRoute } from "next";
import { countryScholarshipsMap } from "@/data/countryScholarships";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://abroadsimplified.com";

  // Base pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Country dynamic pages
  const countryRoutes: MetadataRoute.Sitemap = Object.keys(countryScholarshipsMap).map((slug) => ({
    url: `${baseUrl}/country/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...countryRoutes];
}
