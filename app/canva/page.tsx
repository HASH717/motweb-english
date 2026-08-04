import { MessageCircle, ShieldCheck, Sparkles } from "lucide-react";
import { headers } from "next/headers";
import { OffersGrid } from "@/components/offers-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { requireEnv } from "@/lib/config";
import { getOgAdsOffers, type PublicOffer } from "@/lib/ogads";

export const metadata = {
  title: "Canva Pro Offers",
  description: "Choose an available sponsored offer to continue toward Canva Pro access."
};

export const dynamic = "force-dynamic";

export default async function CanvaPage() {
  const whatsappNumber = requireEnv("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/[^\d]/g, "");
  const headerList = await headers();
  const ip = headerList.get("cf-connecting-ip") ?? headerList.get("x-forwarded-for")?.split(",")[0]?.trim() ?? headerList.get("x-real-ip") ?? "";
  const userAgent = headerList.get("user-agent") ?? "";
  let offers: PublicOffer[] = [];
  let offerError: string | undefined;

  try {
    if (!ip || !userAgent) throw new Error("Visitor information is unavailable.");
    offers = await getOgAdsOffers(ip, userAgent);
  } catch (error) {
    offerError = error instanceof Error ? error.message : "Offers are temporarily unavailable.";
  }

  return <main>
    <div className="star-field" />
    <SiteNav />
    <section className="container-shell py-14">
      <div className="mx-auto max-w-5xl">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#32a81f]/40 bg-white/[0.04] px-4 py-2 text-sm font-black text-white/78"><Sparkles className="h-4 w-4 text-[#32a81f]" /> Sponsored offers</div>
          <h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-6xl">Choose an offer to continue</h1>
          <p className="mt-5 text-lg leading-8 text-white/66">Select an offer available for your location and device, then follow its instructions. Offers open securely in a new tab and are provided by third-party advertisers through OGAds.</p>
        </div>

        <div className="mt-9"><OffersGrid offers={offers} error={offerError} /></div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-5"><ShieldCheck className="h-5 w-5 text-[#32a81f]" /><p className="mt-3 text-sm font-black text-white">Offer availability varies</p><p className="mt-2 text-sm leading-6 text-white/58">Offers are selected by the advertiser based on your country, device, and eligibility. Mot Web Services does not control individual qualification decisions.</p></div>
          <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-5"><MessageCircle className="h-5 w-5 text-[#25D366]" /><p className="mt-3 text-sm font-black text-white">Need help?</p><p className="mt-2 text-sm leading-6 text-white/58">Contact our team if the offer list does not load or you have questions about the process.</p></div>
        </div>
      </div>
    </section>
    <a href={`https://wa.me/${whatsappNumber}`} aria-label="WhatsApp support" className="focus-ring fixed bottom-5 end-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/40 transition hover:scale-105"><MessageCircle className="h-7 w-7" /></a>
    <SiteFooter />
  </main>;
}
