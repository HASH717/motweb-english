import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/activation/", "/ogads/", "/ebooks/atomic-habits/download"]
    },
    sitemap: "https://en.motweb.store/sitemap.xml",
    host: "https://en.motweb.store"
  };
}
