import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, BookOpen } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { blogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Practical guides for digital subscriptions, Canva, and account security."
};

export default function BlogPage() {
  return (
    <main>
      <div className="star-field" />
      <SiteNav />
      <section className="container-shell py-16">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#cf19dd]/40 bg-white/[0.04] px-4 py-2 text-sm font-bold text-white/78">
            <BookOpen className="h-4 w-4 text-[#cf19dd]" aria-hidden="true" /> Mot Web Services Blog
          </div>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-6xl">Clear advice for your digital life.</h1>
          <p className="mt-5 text-lg leading-8 text-white/66">Buying guides, setup walkthroughs, and practical security advice from the Mot Web Services team.</p>
        </div>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.slug} className="surface flex flex-col rounded-[var(--radius)] p-6">
              <p className="text-sm font-bold text-[#cf19dd]">{post.category}</p>
              <h2 className="mt-3 text-2xl font-black text-white">{post.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-7 text-white/64">{post.description}</p>
              <div className="mt-6 flex items-center justify-between text-xs text-white/48">
                <time dateTime={post.publishedAt}>{new Date(`${post.publishedAt}T00:00:00Z`).toLocaleDateString("en", { dateStyle: "medium", timeZone: "UTC" })}</time>
                <span>{post.readTime}</span>
              </div>
              <Link href={`/blog/${post.slug}`} className="focus-ring mt-6 inline-flex items-center gap-2 text-sm font-black text-white hover:text-[#cf19dd]">
                Read article <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
