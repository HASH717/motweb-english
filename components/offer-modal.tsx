"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

export function OfferModal({ children }: { children: ReactNode }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") window.location.assign("/canva");
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  return <div className="fixed inset-0 z-[80] grid place-items-center bg-black/75 p-3 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-labelledby="offers-modal-title">
    <Link href="/canva" aria-label="Close offers" className="absolute inset-0 cursor-default" />
    <section className="surface relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-[calc(var(--radius)*1.4)] border border-white/15 shadow-2xl shadow-black/60">
      <div className="flex items-start justify-between gap-5 border-b border-white/10 px-5 py-5 sm:px-7">
        <div><p className="text-xs font-black uppercase tracking-[0.2em] text-[#8ee780]">Free Canva Pro activation</p><h2 id="offers-modal-title" className="mt-2 text-2xl font-black text-white sm:text-3xl">Complete one offer to unlock activation</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-white/58">Choose an offer available for your country and device, then complete every requirement. Opening an offer alone does not count.</p></div>
        <Link href="/canva" aria-label="Close offers" className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20"><X className="h-5 w-5" /></Link>
      </div>
      <div className="overflow-y-auto overscroll-contain px-5 py-5 sm:px-7 sm:py-6">{children}</div>
    </section>
  </div>;
}
