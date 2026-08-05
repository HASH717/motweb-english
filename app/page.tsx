import Link from "next/link";
import { ArrowUpRight, BookOpen, CheckCircle2, Shield, Sparkles, Timer } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const products = [
  { title: "Netflix", imageSrc: "/images/services/netflix.png" },
  { title: "CapCut Pro", imageSrc: "/images/services/capcut.png" },
  { title: "YouTube Premium", imageSrc: "/images/services/youtube-premium.png" },
  { title: "ChatGPT", imageSrc: "/images/services/chatgpt.png" }
];

export const dynamic = "force-dynamic";

export default function StorefrontPage() {
  return (
    <main>
      <div className="star-field" />
      <SiteNav />

      <section className="container-shell grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-[var(--radius)] border border-[#32a81f]/45 bg-[#12091f]/80 px-4 py-2 text-sm font-bold text-white/78">
            <Sparkles aria-hidden="true" className="h-4 w-4 text-[#32a81f]" />
            Mot Web Services Store
          </div>

          <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">Your Canva Pro Upgrade Starts Here.</h1>
          <p className="mt-5 text-2xl font-black leading-9 text-[#cf19dd]">One quick offer. Your activation unlocked.</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
            Enter your Canva email, choose an offer available for you, and complete its steps. Once your completion is confirmed, your Canva Pro activation is ready.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/canva"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#32a81f]/25 transition hover:bg-[#3ac724]"
            >
              Get Canva Pro
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <a
              href="#products"
              className="focus-ring inline-flex items-center justify-center rounded-[var(--radius)] border border-[#32a81f]/45 px-6 py-3 text-sm font-bold text-white transition hover:border-[#cf19dd]/70"
            >
              Browse products
            </a>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["Safe and simple", Shield],
              ["Made for your location", CheckCircle2],
              ["Fresh choices", Timer]
            ].map(([label, Icon]) => (
              <div key={String(label)} className="flex items-center gap-3 rounded-[var(--radius)] border border-white/10 bg-white/[0.04] px-4 py-3">
                <Icon aria-hidden="true" className="h-5 w-5 text-[#32a81f]" />
                <span className="text-sm font-bold text-white/78">{String(label)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="surface relative overflow-hidden rounded-[var(--radius)] p-6">
          <div className="absolute end-10 top-10 h-20 w-20 rounded-full bg-gradient-to-b from-[#cf19dd] to-[#7658ff] blur-sm" />
          <div className="absolute bottom-8 start-8 h-12 w-12 rounded-full bg-gradient-to-b from-[#cf19dd] to-[#0bb8ef]" />
          <ProductCard
            title="Canva Pro Activation"
            description="Complete one available offer to unlock your Canva Pro activation."
            price="Start free"
            href="/canva"
            imageSrc="/images/services/canva.png"
          />
        </div>
      </section>

      <section id="ebooks" className="container-shell py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between"><div><div className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-[0.18em] text-[#cf19dd]"><BookOpen className="h-4 w-4" /> New category</div><h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">eBooks</h2><p className="mt-2 max-w-2xl text-sm leading-6 text-white/58">Build your digital library. Complete one available offer to unlock each title.</p></div><Link href="/ebooks" className="focus-ring inline-flex items-center gap-2 text-sm font-black text-white/76 hover:text-white">Browse eBooks <ArrowUpRight className="h-4 w-4" /></Link></div>
        <div className="grid gap-5 lg:grid-cols-[1fr_1.4fr]"><ProductCard title="Atomic Habits" description="James Clear's practical guide to building good habits, breaking bad ones, and making small changes that compound." price="PDF" href="/ebooks/atomic-habits" imageSrc="/ebooks/atomic-habits/cover" ctaLabel="View eBook" /><div className="surface grid place-items-center rounded-[var(--radius)] border border-dashed border-white/15 p-8 text-center"><div><BookOpen className="mx-auto h-10 w-10 text-white/30" /><p className="mt-4 text-lg font-black text-white">More books coming soon</p><p className="mt-2 text-sm text-white/58">New titles will appear here as they are added.</p></div></div></div>
      </section>

      <section id="products" className="container-shell py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black text-white">Products</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Start your Canva Pro activation in a few simple steps. More services are coming soon.</p>
          </div>
          <Link href="/canva" className="focus-ring inline-flex items-center gap-2 rounded-[var(--radius)] text-sm font-bold text-white/76 hover:text-white">
            Canva details
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard
              key={product.title}
              title={product.title}
              description="This product is not currently available from Mot Web Services."
              imageSrc={product.imageSrc}
              disabled
            />
          ))}
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
