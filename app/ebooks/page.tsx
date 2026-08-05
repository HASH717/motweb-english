import Link from "next/link";
import { ArrowUpRight, BookOpen, LibraryBig, ShieldCheck } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { atomicHabits } from "@/lib/ebooks";

export const metadata = { title: "eBooks", description: "Discover books available through Mot Web Services." };

export default function EbooksPage() {
  return <main><div className="star-field" /><SiteNav />
    <section className="container-shell py-16">
      <div className="mx-auto max-w-3xl text-center"><div className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#cf19dd]/35 bg-[#cf19dd]/10 px-4 py-2 text-sm font-black text-white/78"><LibraryBig className="h-4 w-4 text-[#cf19dd]" /> Digital Library</div><h1 className="mt-6 text-4xl font-black text-white sm:text-6xl">Books Worth Reading. Ready When You Are.</h1><p className="mt-5 text-lg leading-8 text-white/64">Choose a title, complete one available offer, and unlock your personal download.</p></div>
      <div className="mx-auto mt-12 max-w-4xl"><article className="surface grid gap-7 overflow-hidden rounded-[calc(var(--radius)*1.4)] p-5 sm:p-7 md:grid-cols-[230px_1fr] md:items-center"><div className="overflow-hidden rounded-[var(--radius)] border border-white/10 bg-white"><img src={`/ebooks/${atomicHabits.slug}/cover`} alt={`${atomicHabits.title} cover`} className="aspect-[0.77] h-full w-full object-cover" /></div><div><p className="text-sm font-black uppercase tracking-[0.18em] text-[#8ee780]">Featured eBook</p><h2 className="mt-3 text-3xl font-black text-white">{atomicHabits.title}</h2><p className="mt-2 text-base font-bold text-[#cf19dd]">{atomicHabits.author}</p><p className="mt-4 leading-7 text-white/64">{atomicHabits.subtitle}</p><div className="mt-6 flex flex-wrap gap-3 text-sm font-bold text-white/72"><span className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/10 px-3 py-2"><BookOpen className="h-4 w-4 text-[#32a81f]" /> {atomicHabits.pages} pages</span><span className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/10 px-3 py-2"><ShieldCheck className="h-4 w-4 text-[#32a81f]" /> Secure PDF</span></div><Link href={`/ebooks/${atomicHabits.slug}`} className="focus-ring mt-7 inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#32a81f]/20">View book <ArrowUpRight className="h-4 w-4" /></Link></div></article></div>
    </section><SiteFooter /></main>;
}
