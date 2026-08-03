import type { ReactNode } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const whatsappNumber = "213559086142";

type LegalPageProps = {
  title: string;
  intro: string;
  updatedAt: string;
  children: ReactNode;
};

export function LegalPage({ title, intro, updatedAt, children }: LegalPageProps) {
  return (
    <main>
      <div className="star-field" />
      <SiteNav />

      <section className="container-shell py-14">
        <div className="surface mx-auto max-w-4xl rounded-[var(--radius)] p-6 sm:p-9">
          <p className="text-sm font-black text-[#cf19dd]">Mot Web Services</p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-white sm:text-5xl">{title}</h1>
          <p className="mt-4 text-base leading-8 text-white/66">{intro}</p>
          <p className="mt-3 text-sm font-semibold text-white/58">Last updated: {updatedAt}</p>

          <div className="mt-9 space-y-7 text-start text-white/72">{children}</div>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/" className="focus-ring rounded-[var(--radius)] text-sm font-bold text-white/72 transition hover:text-white">
              Back to the store
            </Link>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[#25D366] px-5 py-3 text-sm font-black text-white shadow-lg shadow-black/20 transition hover:scale-[1.01]"
            >
              <MessageCircle aria-hidden="true" className="h-4 w-4" />
              WhatsApp support
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-xl font-black text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-sm leading-7 text-white/66">{children}</div>
    </section>
  );
}
