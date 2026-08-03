"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpLeft, Lock, ShoppingCart, Sparkles } from "lucide-react";

type ProductCardProps = {
  title: string;
  description: string;
  price?: string;
  href?: string;
  imageSrc?: string;
  disabled?: boolean;
};

export function ProductCard({ title, description, price, href, imageSrc, disabled = false }: ProductCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45, ease: "easeOut" }}
      whileHover={disabled ? undefined : { y: -8 }}
      className={`surface relative flex min-h-64 flex-col justify-between overflow-hidden rounded-[var(--radius)] p-5 transition-shadow duration-300 ${
        disabled ? "opacity-55 grayscale" : ""
      }`}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-l from-[#32a81f] via-[#cf19dd] to-[#0bb8ef]" />
      <Sparkles aria-hidden="true" className="absolute end-5 top-9 h-4 w-4 text-[#32a81f]" />

      <div>
        {imageSrc ? (
          <div className="mb-5 overflow-hidden rounded-[var(--radius)] border border-white/10 bg-black/30">
            <Image src={imageSrc} alt={`${title} logo`} width={720} height={440} className="h-36 w-full object-cover" />
          </div>
        ) : null}

        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-[var(--radius)] bg-white/10 text-white shadow-inner shadow-white/10">
            {disabled ? <Lock aria-hidden="true" className="h-5 w-5" /> : <ShoppingCart aria-hidden="true" className="h-5 w-5" />}
          </div>
          <span className="rounded-[var(--radius)] border border-[#32a81f]/45 px-3 py-1 text-xs font-bold text-white/80">
            {disabled ? "Unavailable" : price}
          </span>
        </div>

        <h3 className="text-2xl font-black text-white">{title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/64">{description}</p>
      </div>

      {href && !disabled ? (
        <Link
          href={href}
          className="focus-ring mt-8 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#32a81f]/20 transition hover:bg-[#3ac724]"
        >
          Buy now
          <ArrowUpLeft aria-hidden="true" className="h-4 w-4" />
        </Link>
      ) : (
        <button
          type="button"
          disabled
          className="mt-8 inline-flex w-full cursor-not-allowed items-center justify-center rounded-[var(--radius)] border border-white/10 px-4 py-3 text-sm font-black text-white/60"
        >
          Currently unavailable
        </button>
      )}
    </motion.article>
  );
}
