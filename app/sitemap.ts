import type { MetadataRoute } from "next";

import { siteConfig } from "@/content/site";
import { getWritingEntries } from "@/lib/writing";

const staticRoutes = ["", "about", "systems", "writing", "contact"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const writingEntries = await getWritingEntries();

  const staticPages = staticRoutes.map((route) => ({
    url: `${siteConfig.url}/${route}`.replace(/\/$/, "") || siteConfig.url,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  })) as MetadataRoute.Sitemap;

  const writingPages = writingEntries.map((entry) => ({
    url: `${siteConfig.url}/writing/${entry.slug}`,
    lastModified: new Date(entry.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...writingPages];
}
