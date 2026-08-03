import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { blogPosts, getBlogPost } from "@/lib/blog";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPost((await params).slug);
  return post ? { title: post.title, description: post.description } : {};
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPost((await params).slug);
  if (!post) notFound();

  return (
    <main>
      <SiteNav />
      <article className="container-shell py-14">
        <div className="mx-auto max-w-3xl">
          <Link href="/blog" className="focus-ring inline-flex items-center gap-2 text-sm font-bold text-white/64 hover:text-white"><ArrowLeft className="h-4 w-4" /> Back to the blog</Link>
          <p className="mt-10 text-sm font-black text-[#cf19dd]">{post.category}</p>
          <h1 className="mt-3 text-4xl font-black leading-tight text-white sm:text-6xl">{post.title}</h1>
          <p className="mt-5 text-xl leading-8 text-white/66">{post.description}</p>
          <div className="mt-5 flex gap-4 text-sm text-white/48"><time dateTime={post.publishedAt}>{new Date(`${post.publishedAt}T00:00:00Z`).toLocaleDateString("en", { dateStyle: "long", timeZone: "UTC" })}</time><span>{post.readTime}</span></div>
          <div className="mt-12 grid gap-10">
            {post.content.map((section) => <section key={section.heading}><h2 className="text-2xl font-black text-white">{section.heading}</h2><div className="mt-4 grid gap-4">{section.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-white/68">{paragraph}</p>)}</div></section>)}
          </div>
        </div>
      </article>
      <SiteFooter />
    </main>
  );
}
