import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/blog";

const baseUrl = "https://en.motweb.store";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/canva", "/ebooks", "/ebooks/atomic-habits", "/blog", "/giveaway", "/privacy-policy", "/refund-policy", "/terms-of-service"];
  return [
    ...staticPages.map((path) => ({ url: `${baseUrl}${path}`, lastModified: new Date() })),
    ...blogPosts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: new Date(post.publishedAt) }))
  ];
}
