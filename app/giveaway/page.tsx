import Link from "next/link";
import { Gift } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata = { title: "Giveaway" };

export default function GiveawayPage() {
  return <main><div className="star-field" /><SiteNav /><section className="container-shell grid min-h-[70vh] place-items-center py-16"><div className="surface max-w-2xl rounded-[var(--radius)] p-8 text-center"><Gift className="mx-auto h-12 w-12 text-[#cf19dd]" /><h1 className="mt-5 text-4xl font-black text-white">The Canva Pro giveaway has ended</h1><p className="mt-4 text-base leading-8 text-white/66">Entries closed on July 1, 2026. Thank you to everyone who participated. Follow Mot Web Services for future campaigns.</p><Link href="/canva" className="focus-ring mt-7 inline-flex rounded-[var(--radius)] bg-[var(--color-accent)] px-5 py-3 text-sm font-black text-white">Explore Canva Pro</Link></div></section><SiteFooter /></main>;
}
