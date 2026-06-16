import type { MetadataRoute } from "next";
import { NAV_LINKS, SITE } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return NAV_LINKS.map((link) => ({
    url: `${SITE.url}${link.href === "/" ? "" : link.href}`,
    changeFrequency: "monthly",
    priority: link.href === "/" ? 1 : 0.8,
  }));
}
