import Link from "next/link";
import { headers } from "next/headers";
import { BookOpen, CheckCircle2, CircleCheck, Download, FileText, ShieldCheck } from "lucide-react";
import { ActivationRefresher } from "@/components/activation-refresher";
import { EnrollmentForm } from "@/components/enrollment-form";
import { OfferModal } from "@/components/offer-modal";
import { OffersGrid } from "@/components/offers-grid";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { atomicHabits } from "@/lib/ebooks";
import { getEnrollment } from "@/lib/enrollments";
import { getOgAdsOffers, type PublicOffer } from "@/lib/ogads";

export const metadata = { title: "Atomic Habits PDF", description: "Unlock your copy of Atomic Habits by James Clear." };
export const dynamic = "force-dynamic";

export default async function AtomicHabitsPage({ searchParams }: { searchParams: Promise<{ enrollment?: string }> }) {
  const enrollmentId = (await searchParams).enrollment ?? "";
  const found = enrollmentId ? await getEnrollment(enrollmentId) : null;
  const enrollment = found?.item_type === "ebook" && found.item_slug === atomicHabits.slug ? found : null;
  let offers: PublicOffer[] = [];
  let offerError: string | undefined;
  if (enrollment?.status === "pending") {
    const requestHeaders = await headers();
    const ip = requestHeaders.get("cf-connecting-ip") ?? requestHeaders.get("x-forwarded-for")?.split(",")[0]?.trim() ?? requestHeaders.get("x-real-ip") ?? "127.0.0.1";
    const userAgent = requestHeaders.get("user-agent") ?? "Mozilla/5.0";
    try { offers = await getOgAdsOffers(ip, userAgent, enrollment.id, `ebook-${atomicHabits.slug}`); }
    catch { offerError = "Offers are temporarily unavailable."; }
  }
  const complete = enrollment?.status === "success";

  return <main><div className="star-field" /><SiteNav /><ActivationRefresher active={Boolean(enrollment && !complete)} />
    <section className="container-shell py-14 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
        <div className="surface relative mx-auto w-full max-w-md overflow-hidden rounded-[calc(var(--radius)*1.4)] p-5"><div className="absolute inset-0 bg-gradient-to-br from-[#cf19dd]/14 via-transparent to-[#32a81f]/12" /><img src={`/ebooks/${atomicHabits.slug}/cover`} alt={`${atomicHabits.title} book cover`} className="relative aspect-[0.77] w-full rounded-[var(--radius)] border border-white/10 object-cover shadow-2xl shadow-black/50" /></div>
        <div><div className="inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#cf19dd]/35 bg-[#cf19dd]/10 px-4 py-2 text-sm font-black text-white/78"><BookOpen className="h-4 w-4 text-[#cf19dd]" /> Digital edition</div><h1 className="mt-6 text-4xl font-black leading-tight text-white sm:text-6xl">Unlock <span className="text-[#cf19dd]">Atomic Habits</span></h1><p className="mt-4 text-xl font-black text-white">by {atomicHabits.author}</p><p className="mt-5 max-w-2xl text-lg leading-8 text-white/64">{atomicHabits.subtitle}. Build better systems, make small changes, and create results that last.</p>
          <div className="mt-7 grid gap-3 sm:grid-cols-3">{[[FileText, `${atomicHabits.pages} pages`], [CheckCircle2, "Complete edition"], [ShieldCheck, "Secure access"]].map(([Icon, label]) => { const FeatureIcon = Icon as typeof FileText; return <div key={String(label)} className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-4"><FeatureIcon className="h-5 w-5 text-[#32a81f]" /><p className="mt-3 text-sm font-black text-white">{String(label)}</p></div>; })}</div>
          <div className="mt-8"><EnrollmentForm itemType="ebook" itemSlug={atomicHabits.slug} eyebrow="Unlock your eBook" title="Get your download" description="Enter your details, then complete one available offer to unlock the PDF." emailLabel="Your email address" buttonLabel="Continue to download" /></div>
        </div>
      </div>
    </section>
    {enrollment ? <OfferModal closeHref={`/ebooks/${atomicHabits.slug}`} eyebrow="Atomic Habits PDF" title={complete ? "Your download is ready" : "Complete one offer to unlock the book"} description={complete ? "Your completion has been confirmed. Download your personal copy below." : "Choose an option available for you and complete every required step. This page checks your status automatically."}>{complete ? <div className="py-8 text-center"><CircleCheck className="mx-auto h-16 w-16 text-[#32a81f]" /><h2 className="mt-5 text-3xl font-black text-white">Atomic Habits is unlocked</h2><p className="mt-3 text-white/64">Your secure PDF download is ready.</p><a href={`/ebooks/${atomicHabits.slug}/download?enrollment=${encodeURIComponent(enrollment.id)}`} className="focus-ring mt-7 inline-flex items-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-6 py-4 text-base font-black text-white shadow-lg shadow-[#32a81f]/20"><Download className="h-5 w-5" /> Download PDF</a></div> : <OffersGrid offers={offers} error={offerError} retryHref={`/ebooks/${atomicHabits.slug}?enrollment=${encodeURIComponent(enrollment.id)}`} />}</OfferModal> : null}
    <SiteFooter />
  </main>;
}
