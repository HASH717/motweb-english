import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";

const whatsappNumber = "213559086142";

const legalLinks = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/refund-policy", label: "CPA Offer Policy" },
  { href: "/terms-of-service", label: "Terms of Service" }
];

export function SiteFooter() {
  return (
    <footer id="support" className="site-footer py-12">
      <div className="container-shell grid gap-7 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-base font-black text-white">Mot Web Services</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-white/58">Location-aware sponsored offers and direct WhatsApp support from Mot Web Services.</p>

          <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-white/68">
            <Link href="/canva" className="focus-ring inline-flex items-center gap-2 rounded-[var(--radius)] transition hover:text-white">
              <ShieldCheck aria-hidden="true" className="h-4 w-4 text-[#32a81f]" />
              Service coverage
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center gap-2 rounded-[var(--radius)] transition hover:text-white"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4 text-[#25D366]" />
              <span dir="ltr">+213 559 086 142</span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:items-end">
          <p className="rounded-[var(--radius)] border border-[#32a81f]/30 bg-[#32a81f]/10 px-4 py-2 text-sm font-black text-[#8ee780]">No payment required · Complete one verified offer</p>
          <nav className="flex flex-wrap gap-3 text-sm font-semibold text-white/68 md:justify-end">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="focus-ring rounded-[var(--radius)] transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
