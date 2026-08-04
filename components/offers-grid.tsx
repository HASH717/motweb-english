import { ArrowUpRight, RefreshCw, ShieldCheck } from "lucide-react";
import type { PublicOffer } from "@/lib/ogads";

export function OffersGrid({ offers, error, retryHref = "/canva" }: { offers: PublicOffer[]; error?: string; retryHref?: string }) {
  if (error) return <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-8 text-center"><p className="text-lg font-black text-white">Offers are temporarily unavailable</p><p className="mt-3 text-sm text-white/60">Please try again in a moment.</p><a href={retryHref} className="focus-ring mt-5 inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/15 px-5 py-3 text-sm font-black text-white"><RefreshCw className="h-4 w-4" /> Try again</a></div>;
  if (offers.length === 0) return <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-8 text-center"><p className="text-lg font-black text-white">No offers are available for you right now.</p><a href={retryHref} className="focus-ring mt-5 inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/15 px-5 py-3 text-sm font-black text-white"><RefreshCw className="h-4 w-4" /> Refresh offers</a></div>;

  return <div className="grid min-w-0 gap-3 sm:gap-4 md:grid-cols-2">
    {offers.map((offer) => <article key={offer.id} className="flex min-w-0 flex-col overflow-hidden rounded-[var(--radius)] border border-white/10 bg-white/[0.05] p-4 shadow-lg shadow-black/15 transition hover:-translate-y-0.5 hover:border-[#32a81f]/35 sm:p-5">
      <div className="flex min-w-0 items-start gap-3 sm:gap-4">
        {offer.imageUrl ? <img src={offer.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-14 w-14 shrink-0 rounded-[var(--radius)] object-cover sm:h-16 sm:w-16" /> : <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[var(--radius)] bg-white/10 sm:h-16 sm:w-16"><ShieldCheck className="h-7 w-7 text-[#32a81f]" /></div>}
        <div className="min-w-0"><h2 className="line-clamp-2 break-words text-base font-black leading-6 text-white sm:text-lg">{offer.name}</h2><p className="mt-1 text-[11px] font-bold uppercase tracking-wide text-[#8ee780]">Available for you</p></div>
      </div>
      <p className="mt-3 line-clamp-3 flex-1 break-words text-sm leading-6 text-white/64 sm:mt-4">{offer.description}</p>
      <a href={offer.url} target="_blank" rel="nofollow sponsored noreferrer" className="focus-ring mt-4 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#32a81f]/20 transition hover:bg-[#3ac724] sm:mt-5">Start this offer <ArrowUpRight className="h-4 w-4" /></a>
    </article>)}
  </div>;
}
