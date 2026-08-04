import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Shield, Sparkles, Timer } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

const products = [
  { title: "Netflix", imageSrc: "/images/services/netflix.png" },
  { title: "CapCut Pro", imageSrc: "/images/services/capcut.png" },
  { title: "YouTube Premium", imageSrc: "/images/services/youtube-premium.png" },
  { title: "ChatGPT", imageSrc: "/images/services/chatgpt.png" }
];

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

          <h1 className="max-w-3xl text-4xl font-black leading-tight text-white sm:text-6xl">Discover sponsored offers selected for your device and location.</h1>
          <p className="mt-5 text-2xl font-black leading-9 text-[#cf19dd]">Complete an available CPA offer to continue</p>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/66">
            Mot Web Services connects you with third-party promotional offers through OGAds. Availability and completion requirements depend on the advertiser, your device, and your location.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/canva"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-6 py-3 text-sm font-black text-white shadow-lg shadow-[#32a81f]/25 transition hover:bg-[#3ac724]"
            >
              View available offers
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
              ["Secure offer feed", Shield],
              ["Location matched", CheckCircle2],
              ["Updated live", Timer]
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
            title="Canva Pro Offers"
            description="Browse sponsored CPA offers currently available for your country and device."
            price="CPA offers"
            href="/canva"
            imageSrc="/images/services/canva.png"
          />
        </div>
      </section>

      <section id="products" className="container-shell py-16">
        <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-black text-white">Products</h2>
            <p className="mt-2 text-sm leading-6 text-white/58">Browse location-aware sponsored offers for Canva Pro access. More services are coming soon.</p>
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
