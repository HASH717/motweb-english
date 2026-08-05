"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

type OfferModalProps = {
  children: ReactNode;
  closeHref?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
};

export function OfferModal({ children, closeHref = "/canva", eyebrow = "Free Canva Pro activation", title = "Complete one offer to unlock activation", description = "Choose an option made for your country and device, then complete every step. Opening it alone does not count." }: OfferModalProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") window.location.assign(closeHref);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeHref]);

  return <div className="fixed inset-0 z-[80] grid place-items-center overflow-hidden bg-black/75 p-0 backdrop-blur-md sm:p-6" role="dialog" aria-modal="true" aria-labelledby="offers-modal-title">
    <Link href={closeHref} aria-label="Close offers" className="absolute inset-0 cursor-default" />
    <section className="surface relative z-10 flex h-[100dvh] w-full min-w-0 max-w-5xl flex-col overflow-hidden border-white/15 shadow-2xl shadow-black/60 sm:h-auto sm:max-h-[92vh] sm:rounded-[calc(var(--radius)*1.4)] sm:border">
      <div className="flex items-start justify-between gap-3 border-b border-white/10 px-4 py-4 sm:gap-5 sm:px-7 sm:py-5">
        <div className="min-w-0"><p className="text-[10px] font-black uppercase tracking-[0.16em] text-[#8ee780] sm:text-xs sm:tracking-[0.2em]">{eyebrow}</p><h2 id="offers-modal-title" className="mt-1.5 text-xl font-black leading-tight text-white sm:mt-2 sm:text-3xl">{title}</h2><p className="mt-2 max-w-3xl text-xs leading-5 text-white/58 sm:text-sm sm:leading-6">{description}</p></div>
        <Link href={closeHref} aria-label="Close offers" className="focus-ring grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white transition hover:bg-white/20 sm:h-10 sm:w-10"><X className="h-5 w-5" /></Link>
      </div>
      <div className="no-scrollbar min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain px-4 py-4 sm:px-7 sm:py-6">{children}</div>
    </section>
  </div>;
}
