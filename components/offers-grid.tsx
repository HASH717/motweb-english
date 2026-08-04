"use client";

import { useCallback, useEffect, useState } from "react";
import { ArrowUpRight, Loader2, RefreshCw, ShieldCheck } from "lucide-react";

type Offer = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  country: string | null;
  device: string | null;
  url: string;
};

export function OffersGrid() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadOffers = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/offers", { cache: "no-store" });
      const payload = await response.json() as { offers?: Offer[]; error?: string };
      if (!response.ok) throw new Error(payload.error ?? "Offers could not be loaded.");
      setOffers(Array.isArray(payload.offers) ? payload.offers : []);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Offers could not be loaded.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadOffers(); }, [loadOffers]);

  if (loading) {
    return <div className="surface grid min-h-64 place-items-center rounded-[var(--radius)] p-8 text-center"><div><Loader2 className="mx-auto h-9 w-9 animate-spin text-[#0bb8ef]" /><p className="mt-4 font-bold text-white">Finding offers available for you…</p></div></div>;
  }

  if (error) {
    return <div className="surface rounded-[var(--radius)] p-8 text-center"><p className="text-lg font-black text-white">Offers are temporarily unavailable</p><p className="mt-3 text-sm text-white/60">{error}</p><button type="button" onClick={() => void loadOffers()} className="focus-ring mt-5 inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/15 px-5 py-3 text-sm font-black text-white"><RefreshCw className="h-4 w-4" /> Try again</button></div>;
  }

  if (offers.length === 0) {
    return <div className="surface rounded-[var(--radius)] p-8 text-center"><p className="text-lg font-black text-white">No offers are available for your device or location right now.</p><button type="button" onClick={() => void loadOffers()} className="focus-ring mt-5 inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/15 px-5 py-3 text-sm font-black text-white"><RefreshCw className="h-4 w-4" /> Refresh offers</button></div>;
  }

  return <div className="grid gap-4 md:grid-cols-2">
    {offers.map((offer) => <article key={offer.id} className="surface flex flex-col rounded-[var(--radius)] p-5">
      <div className="flex items-start gap-4">
        {offer.imageUrl ? <img src={offer.imageUrl} alt="" loading="lazy" referrerPolicy="no-referrer" className="h-16 w-16 rounded-[var(--radius)] object-cover" /> : <div className="grid h-16 w-16 shrink-0 place-items-center rounded-[var(--radius)] bg-white/10"><ShieldCheck className="h-7 w-7 text-[#32a81f]" /></div>}
        <div><h2 className="text-lg font-black text-white">{offer.name}</h2>{offer.country || offer.device ? <p className="mt-1 text-xs font-bold uppercase tracking-wide text-white/45">{[offer.country, offer.device].filter(Boolean).join(" · ")}</p> : null}</div>
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-white/64">{offer.description}</p>
      <a href={offer.url} target="_blank" rel="nofollow sponsored noreferrer" className="focus-ring mt-5 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#32a81f]/20 transition hover:bg-[#3ac724]">View offer <ArrowUpRight className="h-4 w-4" /></a>
    </article>)}
  </div>;
}
