import type { MetadataRoute } from "next";
import { countryScholarshipsMap } from "@/data/countryScholarships";
import { getWixCountryCounts } from "@/lib/wixCms";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://scholarship.abroadsimplified.com";

  // Base pages
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/finder`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/scholarships`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
  ];

  const cmsCounts = await getWixCountryCounts();
  const allSlugs = Array.from(new Set([...Object.keys(countryScholarshipsMap), ...Object.keys(cmsCounts)]));

  // Country dynamic pages
  const countryRoutes: MetadataRoute.Sitemap = allSlugs.map((slug) => ({
    url: `${baseUrl}/country/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...routes, ...countryRoutes];
}
