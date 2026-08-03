import { MessageCircle, ShieldCheck } from "lucide-react";
import { CheckoutForm } from "@/components/checkout-form";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { requireEnv } from "@/lib/config";

export const metadata = {
  title: "Canva Pro"
};

export const dynamic = "force-dynamic";

export default function CanvaPage() {
  const turnstileSiteKey = requireEnv("NEXT_PUBLIC_TURNSTILE_SITE_KEY");
  const whatsappNumber = requireEnv("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/[^\d]/g, "");

  return (
    <main>
      <div className="star-field" />
      <SiteNav />

      <section className="container-shell grid min-h-[calc(100vh-4rem)] items-start gap-6 py-14 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-10">
        <div className="order-1 lg:col-start-1">
          <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">Canva Pro on your own email</h1>
          <p className="mt-5 text-xl font-black leading-9 text-[#cf19dd]">DZD 500 | Your own email | 3 years with service coverage</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-white/64">
            After payment, your order is registered automatically and your email is invited to Canva Pro. Track activation from the confirmation page using the same email address.
          </p>
        </div>

        <CheckoutForm turnstileSiteKey={turnstileSiteKey} />

        <div className="order-3 grid gap-3 sm:grid-cols-2 lg:col-start-1">
          <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-4">
            <ShieldCheck aria-hidden="true" className="mb-3 h-5 w-5 text-[#32a81f]" />
            <p className="text-sm font-bold text-white">Service-term coverage</p>
            <p className="mt-2 text-sm leading-6 text-white/58">Direct support for activation-related issues.</p>
          </div>
          <div className="rounded-[var(--radius)] border border-white/10 bg-white/[0.04] p-4">
            <MessageCircle aria-hidden="true" className="mb-3 h-5 w-5 text-[#25D366]" />
            <p className="text-sm font-bold text-white">WhatsApp support</p>
            <p className="mt-2 text-sm leading-6 text-white/58">Contact us directly after your purchase whenever you need help.</p>
          </div>
        </div>
      </section>

      <a
        href={`https://wa.me/${whatsappNumber}`}
        aria-label="WhatsApp support"
        className="focus-ring fixed bottom-5 end-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-2xl shadow-black/40 transition hover:scale-105"
      >
        <MessageCircle aria-hidden="true" className="h-7 w-7" />
      </a>

      <SiteFooter />
    </main>
  );
}
