import { ArrowUpRight, RefreshCw, ShieldCheck } from "lucide-react";
import type { PublicOffer } from "@/lib/ogads";

export function OffersGrid({ offers, error, retryHref = "/canva" }: { offers: PublicOffer[]; error?: string; retryHref?: string }) {
  if (error) {
    return <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-8 text-center"><p className="text-lg font-black text-white">Offers are temporarily unavailable</p><p className="mt-3 text-sm text-white/60">{error}</p><a href={retryHref} className="focus-ring mt-5 inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/15 px-5 py-3 text-sm font-black text-white"><RefreshCw className="h-4 w-4" /> Try again</a></div>;
  }

  if (offers.length === 0) {
    return <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-8 text-center"><p className="text-lg font-black text-white">No offers are available for your device or location right now.</p><a href={retryHref} className="focus-ring mt-5 inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/15 px-5 py-3 text-sm font-black text-white"><RefreshCw className="h-4 w-4" /> Refresh offers</a></div>;
  }

  return <div className="grid gap-4 md:grid-cols-2">
    {offers.map((offer) => <article key={offer.id} className="flex flex-col rounded-[var(--radius)] border border-white/10 bg-white/[0.05] p-5 shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:border-[#32a81f]/35">
      <div className="flex items-start gap-4">
        {offer.imageUrl ? <img src={offer.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-16 w-16 rounded-[var(--radius)] object-cover" /> : <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[var(--radius)] bg-white/10"><ShieldCheck className="h-7 w-7 text-[#32a81f]" /></div>}
        <div><h2 className="text-lg font-black text-white">{offer.name}</h2>{offer.country || offer.device ? <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/45">{[offer.country, offer.device].filter(Boolean).join(" · ")}</p> : null}</div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-white/64">{offer.description}</p>
      <a href={offer.url} target="_blank" rel="nofollow sponsored noreferrer" className="focus-ring mt-5 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#32a81f]/20 transition hover:bg-[#3ac724]">View offer <ArrowUpRight className="h-4 w-4" /></a>
    </article>)}
  </div>;
}
