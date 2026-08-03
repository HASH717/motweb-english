"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";

type Enrollment = { status: "pending" | "success" | "failed" };

export function StatusPoller({ email }: { email: string }) {
  const [enrollment, setEnrollment] = useState<Enrollment | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function loadStatus() {
      try {
        const response = await fetch(`/api/order-status?email=${encodeURIComponent(email)}`, { cache: "no-store" });
        const result = await response.json() as { enrollment: Enrollment | null; error?: string };
        if (!response.ok) throw new Error(result.error ?? "Order lookup failed");
        if (active) { setEnrollment(result.enrollment); setError(null); }
      } catch (caught) {
        if (active) setError(caught instanceof Error ? caught.message : "Order lookup failed");
      }
    }
    void loadStatus();
    const interval = window.setInterval(loadStatus, 4000);
    return () => { active = false; window.clearInterval(interval); };
  }, [email]);

  if (error) return <div className="surface rounded-[var(--radius)] p-7 text-center"><XCircle className="mx-auto h-12 w-12 text-red-300" /><h1 className="mt-5 text-2xl font-black text-white">We could not retrieve your order</h1><p className="mt-3 text-sm text-white/62">{error}</p></div>;
  if (enrollment?.status === "success") return <div className="surface rounded-[var(--radius)] p-7 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-300" /><h1 className="mt-5 text-3xl font-black text-white">Canva Pro was activated successfully</h1><p className="mt-4 leading-8 text-white/66">Open your email and accept the Canva invitation. Check your spam folder or contact us if you cannot find it.</p></div>;
  if (enrollment?.status === "failed") return <div className="surface rounded-[var(--radius)] p-7 text-center"><XCircle className="mx-auto h-12 w-12 text-red-300" /><h1 className="mt-5 text-2xl font-black text-white">Activation did not complete automatically</h1><p className="mt-3 text-sm text-white/62">Our support team will review the order for {email}.</p></div>;
  return <div className="surface rounded-[var(--radius)] p-7 text-center"><Loader2 className="mx-auto h-12 w-12 animate-spin text-white" /><h1 className="mt-5 text-3xl font-black text-white">Your order is being activated</h1><p className="mt-4 leading-8 text-white/66">We are tracking the Canva Pro order for {email}. This page updates automatically.</p></div>;
}
