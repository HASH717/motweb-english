"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, Menu, ShoppingBag, X } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks: Array<{ href: string; label: string; featured?: boolean }> = [
  { href: "/", label: "Store" },
  { href: "/canva", label: "Canva Pro" },
  { href: "/blog", label: "Blog" },
  { href: "#support", label: "Support" }
];

export function SiteNav() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[rgba(8,1,18,0.8)] backdrop-blur-xl">
      <nav className="container-shell flex min-h-16 items-center justify-between gap-3">
        <Link href="/" onClick={closeMenu} className="focus-ring flex items-center gap-3 rounded-[var(--radius)]">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-[#cf19dd] via-[#2430d4] to-[#0bb8ef] p-1 shadow-lg shadow-[#cf19dd]/20">
            <Image src="/images/mot-logo.png" alt="Mot Web Services logo" width={40} height={40} className="h-10 w-10 rounded-full object-cover" priority />
          </span>
          <span className="flex flex-col">
            <span className="text-sm font-black uppercase tracking-[0.18em] text-white">MOT</span>
            <span className="text-xs font-medium text-white/62">Web Services</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 text-sm font-semibold text-white/68 md:flex">
          {navLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a key={link.href} className="focus-ring rounded-[var(--radius)] transition hover:text-white" href={link.href}>
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                className={`focus-ring rounded-[var(--radius)] transition hover:text-white ${
                  link.featured
                    ? "inline-flex items-center gap-2 border border-[#cf19dd]/45 bg-gradient-to-l from-[#cf19dd]/22 to-[#0bb8ef]/18 px-3 py-2 text-white shadow-lg shadow-[#cf19dd]/10"
                    : ""
                }`}
                href={link.href}
              >
                {link.featured ? <Gift aria-hidden="true" className="h-4 w-4 text-[#cf19dd]" /> : null}
                {link.label}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/canva"
            onClick={closeMenu}
            className="focus-ring hidden items-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#32a81f]/20 transition hover:bg-[#3ac724] sm:inline-flex"
          >
            <ShoppingBag aria-hidden="true" className="h-4 w-4" />
            View offers
          </Link>
          <button
            type="button"
            onClick={() => setIsOpen((current) => !current)}
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-[var(--radius)] border border-white/[0.12] bg-white/[0.08] text-white transition hover:bg-white/[0.14] md:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X aria-hidden="true" className="h-5 w-5" /> : <Menu aria-hidden="true" className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 md:hidden">
          <div className="container-shell grid gap-2 py-3 text-sm font-bold text-white/78">
            {navLinks.map((link) =>
              link.href.startsWith("#") ? (
                <a key={link.href} href={link.href} onClick={closeMenu} className="focus-ring rounded-[var(--radius)] px-3 py-3 transition hover:bg-white/[0.08] hover:text-white">
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  className={`focus-ring rounded-[var(--radius)] px-3 py-3 transition hover:bg-white/[0.08] hover:text-white ${
                    link.featured ? "inline-flex items-center justify-center gap-2 bg-gradient-to-l from-[#cf19dd] to-[#0bb8ef] text-white shadow-lg shadow-[#cf19dd]/20" : ""
                  }`}
                >
                  {link.featured ? <Gift aria-hidden="true" className="h-4 w-4" /> : null}
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/canva"
              onClick={closeMenu}
              className="focus-ring mt-1 inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-4 py-3 text-sm font-black text-white shadow-lg shadow-[#32a81f]/20"
            >
              <ShoppingBag aria-hidden="true" className="h-4 w-4" />
              View offers
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
