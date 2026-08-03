import { Suspense } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { StatusPoller } from "@/components/status-poller";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata = { title: "Order Status" };
type StatusPageProps = { searchParams: Promise<{ email?: string }> };

export default async function CheckoutStatusPage({ searchParams }: StatusPageProps) {
  const email = (await searchParams).email?.trim().toLowerCase() ?? "";
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  return <main><SiteNav /><section className="container-shell grid min-h-[calc(100vh-4rem)] place-items-center py-14"><div className="w-full max-w-2xl">
    {isEmailValid ? <Suspense fallback={<div className="surface rounded-[var(--radius)] p-7 text-center text-white">Loading...</div>}><StatusPoller email={email} /></Suspense> :
      <div className="surface rounded-[var(--radius)] p-7 text-center"><h1 className="text-3xl font-black text-white">This order-status link is incomplete</h1><p className="mt-4 text-base leading-8 text-white/66">Return to the Canva page and enter the correct email address.</p><Link href="/canva" className="focus-ring mt-6 inline-flex items-center gap-2 rounded-[var(--radius)] bg-white px-5 py-3 text-sm font-black text-[var(--color-secondary)]"><ArrowLeft className="h-4 w-4" /> Back to checkout</Link></div>}
  </div></section><SiteFooter /></main>;
}
