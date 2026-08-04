import Link from "next/link";
import { headers } from "next/headers";
import { ArrowLeft, CircleCheck, Clock3, MessageCircle } from "lucide-react";
import { OffersGrid } from "@/components/offers-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getEnrollment } from "@/lib/enrollments";
import { getOgAdsOffers, type PublicOffer } from "@/lib/ogads";

export const metadata = { title: "Complete an offer" };
export const dynamic = "force-dynamic";

export default async function CanvaOffersPage({ searchParams }: { searchParams: Promise<{ enrollment?: string }> }) {
  const id = (await searchParams).enrollment ?? "";
  const enrollment = await getEnrollment(id);
  if (!enrollment) return <main><SiteNav /><section className="container-shell grid min-h-[70vh] place-items-center py-14"><div className="surface max-w-xl rounded-[var(--radius)] p-8 text-center"><h1 className="text-3xl font-black text-white">Start your activation first</h1><p className="mt-4 text-white/64">Enter your Canva email before choosing an offer.</p><Link href="/canva" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] bg-white px-5 py-3 text-sm font-black text-black"><ArrowLeft className="h-4 w-4" /> Start activation</Link></div></section><SiteFooter /></main>;
  if (enrollment.status === "success") return <main><SiteNav /><section className="container-shell grid min-h-[70vh] place-items-center py-14"><div className="surface max-w-xl rounded-[var(--radius)] p-8 text-center"><CircleCheck className="mx-auto h-14 w-14 text-[#32a81f]" /><h1 className="mt-5 text-3xl font-black text-white">Offer completion verified</h1><p className="mt-4 leading-7 text-white/64">Your Canva Pro activation request for <span className="font-bold text-white">{enrollment.buyer_email}</span> is ready. Our team will send the invitation to this address.</p><Link href={`/activation/${id}`} className="focus-ring mt-6 inline-flex rounded-[var(--radius)] bg-[var(--color-accent)] px-5 py-3 text-sm font-black text-white">View activation status</Link></div></section><SiteFooter /></main>;

  const requestHeaders = await headers();
  const ip = requestHeaders.get("cf-connecting-ip") ?? requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? requestHeaders.get("x-real-ip") ?? "127.0.0.1";
  const userAgent = requestHeaders.get("user-agent") ?? "Mozilla/5.0";
  let offers: PublicOffer[] = [];
  let error: string | undefined;
  try { offers = await getOgAdsOffers(ip, userAgent, id); } catch (reason) { error = reason instanceof Error ? reason.message : "Offers are temporarily unavailable."; }

  return <main><div className="star-field" /><SiteNav /><section className="container-shell py-14">
    <div className="mx-auto max-w-4xl text-center"><div className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-amber-300/25 bg-amber-300/10 px-4 py-2 text-sm font-bold text-amber-100"><Clock3 className="h-4 w-4" /> Waiting for one verified completion</div><h1 className="mt-6 text-4xl font-black text-white sm:text-6xl">Choose and complete one offer</h1><p className="mt-5 text-lg leading-8 text-white/66">Complete every step shown by the advertiser. Keep this page available, then check your activation status after finishing. Simply opening or installing without meeting all requirements will not unlock Canva Pro.</p><p className="mt-3 text-sm text-white/45">Activation email: {enrollment.buyer_email}</p></div>
    <div className="mt-10"><OffersGrid offers={offers} error={error} /></div>
    <div className="mt-8 text-center"><Link href={`/activation/${id}`} className="focus-ring inline-flex items-center gap-2 rounded-[var(--radius)] border border-white/15 px-5 py-3 text-sm font-black text-white"><MessageCircle className="h-4 w-4" /> Check completion status</Link></div>
  </section><SiteFooter /></main>;
}
