import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { navLinks, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...navLinks.map((link) => ({
      url: `${site.url}${link.href === "/" ? "" : link.href}`,
      changeFrequency: "monthly" as const,
      priority: link.href === "/" ? 1 : 0.8,
    })),
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      changeFrequency: "yearly" as const,
      priority: 0.5,
    })),
  ];
}
