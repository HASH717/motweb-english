import Link from "next/link";
import { headers } from "next/headers";
import { CircleCheck, Clock3, MessageCircle, ShieldCheck } from "lucide-react";
import { EnrollmentForm } from "@/components/enrollment-form";
import { OfferModal } from "@/components/offer-modal";
import { OffersGrid } from "@/components/offers-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { requireEnv } from "@/lib/config";
import { getEnrollment } from "@/lib/enrollments";
import { getOgAdsOffers, type PublicOffer } from "@/lib/ogads";

export const metadata = { title: "Free Canva Pro Activation", description: "Complete one available offer to unlock your Canva Pro activation." };
export const dynamic = "force-dynamic";

export default async function CanvaPage({ searchParams }: { searchParams: Promise<{ enrollment?: string }> }) {
  const whatsappNumber = requireEnv("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/[^\d]/g, "");
  const enrollmentId = (await searchParams).enrollment ?? "";
  const enrollment = enrollmentId ? await getEnrollment(enrollmentId) : null;
  let offers: PublicOffer[] = [];
  let offerError: string | undefined;

  if (enrollment?.status === "pending") {
    const requestHeaders = await headers();
    const ip = requestHeaders.get("cf-connecting-ip") ?? requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? requestHeaders.get("x-real-ip") ?? "127.0.0.1";
    const userAgent = requestHeaders.get("user-agent") ?? "Mozilla/5.0";
    try { offers = await getOgAdsOffers(ip, userAgent, enrollment.id); }
    catch { offerError = "Offers are temporarily unavailable."; }
  }

  return <main><div className="star-field" /><SiteNav />
    <section className="container-shell grid min-h-[calc(100vh-4rem)] items-start gap-6 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-10">
      <div className="order-1 lg:col-start-1"><h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">Get Canva Pro in Three Simple Steps</h1><p className="mt-5 text-xl font-black leading-9 text-[#cf19dd]">Enter your email. Complete one offer. Unlock activation.</p><p className="mt-5 max-w-2xl text-base leading-8 text-white/64">Use the email connected to your Canva account, choose an option available for you, and complete every step. Once confirmed, your activation request is ready.</p></div>
      <EnrollmentForm />
      <div className="order-3 grid gap-3 sm:grid-cols-2 lg:col-start-1"><div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-4"><ShieldCheck className="mb-3 h-5 w-5 text-[#32a81f]" /><p className="text-sm font-bold text-white">Confirmed completions only</p><p className="mt-2 text-sm leading-6 text-white/58">Opening an offer is not enough; complete every required step.</p></div><div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-4"><MessageCircle className="mb-3 h-5 w-5 text-[#25D366]" /><p className="text-sm font-bold text-white">Activation support</p><p className="mt-2 text-sm leading-6 text-white/58">Contact us if a completed offer remains pending.</p></div></div>
    </section>

    {enrollment ? <OfferModal>{enrollment.status === "success" ? <div className="py-8 text-center"><CircleCheck className="mx-auto h-14 w-14 text-[#32a81f]" /><h3 className="mt-5 text-2xl font-black text-white">Offer completion verified</h3><p className="mx-auto mt-3 max-w-xl leading-7 text-white/64">Your Canva Pro activation for <span className="font-bold text-white">{enrollment.buyer_email}</span> is unlocked.</p><Link href={`/activation/${enrollment.id}`} className="focus-ring mt-6 inline-flex rounded-[var(--radius)] bg-[var(--color-accent)] px-5 py-3 text-sm font-black text-white">View activation status</Link></div> : <><div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-[var(--radius)] border border-amber-300/20 bg-amber-300/[0.07] px-4 py-3"><p className="flex items-center gap-2 text-sm font-bold text-amber-100"><Clock3 className="h-4 w-4" /> Waiting for one verified completion</p><Link href={`/activation/${enrollment.id}`} className="focus-ring text-sm font-black text-white underline decoration-white/30 underline-offset-4">Check status</Link></div><OffersGrid offers={offers} error={offerError} retryHref={`/canva?enrollment=${encodeURIComponent(enrollment.id)}`} /></>}</OfferModal> : null}

    <a href={`https://wa.me/${whatsappNumber}`} aria-label="WhatsApp support" className="focus-ring fixed bottom-5 end-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl"><MessageCircle className="h-7 w-7" /></a><SiteFooter /></main>;
}
