import { MessageCircle, ShieldCheck } from "lucide-react";
import { EnrollmentForm } from "@/components/enrollment-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { requireEnv } from "@/lib/config";

export const metadata = { title: "Free Canva Pro Activation", description: "Complete one sponsored offer instead of paying DZD 500 to request Canva Pro activation." };
export const dynamic = "force-dynamic";

export default function CanvaPage() {
  const whatsappNumber = requireEnv("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/[^\d]/g, "");
  return <main><div className="star-field" /><SiteNav />
    <section className="container-shell grid min-h-[calc(100vh-4rem)] items-start gap-6 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-10">
      <div className="order-1 lg:col-start-1"><h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">Activate Canva Pro without paying DZD 500</h1><p className="mt-5 text-xl font-black leading-9 text-[#cf19dd]">Complete one available offer instead of paying</p><p className="mt-5 max-w-2xl text-base leading-8 text-white/64">Enter the email you use for Canva, choose an offer available in your country, and complete every advertiser requirement. Once OGAds verifies the completion, your activation request is unlocked.</p></div>
      <EnrollmentForm />
      <div className="order-3 grid gap-3 sm:grid-cols-2 lg:col-start-1"><div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-4"><ShieldCheck className="mb-3 h-5 w-5 text-[#32a81f]" /><p className="text-sm font-bold text-white">Verified completion only</p><p className="mt-2 text-sm leading-6 text-white/58">Opening an offer is not enough; OGAds must confirm completion.</p></div><div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-4"><MessageCircle className="mb-3 h-5 w-5 text-[#25D366]" /><p className="text-sm font-bold text-white">Activation support</p><p className="mt-2 text-sm leading-6 text-white/58">Contact us if a completed offer remains pending.</p></div></div>
    </section>
    <a href={`https://wa.me/${whatsappNumber}`} aria-label="WhatsApp support" className="focus-ring fixed bottom-5 end-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl"><MessageCircle className="h-7 w-7" /></a><SiteFooter /></main>;
}
