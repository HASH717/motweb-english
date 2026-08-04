"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import { createEnrollmentAction, type EnrollmentFormState } from "@/app/actions/enrollment";

const initialState: EnrollmentFormState = {};

function SubmitButton() {
  const { pending } = useFormStatus();
  return <button disabled={pending} className="focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#32a81f]/25 transition hover:bg-[#3ac724] disabled:opacity-70">
    {pending ? <Loader2 className="h-5 w-5 animate-spin" /> : <ArrowRight className="h-5 w-5" />}
    {pending ? "Preparing offers..." : "Continue to free activation"}
  </button>;
}

export function EnrollmentForm() {
  const [state, action] = useActionState(createEnrollmentAction, initialState);
  return <form action={action} className="surface order-2 rounded-[var(--radius)] p-5 sm:p-7 lg:col-start-2 lg:row-span-2 lg:row-start-1">
    <p className="text-sm font-bold text-[#cf19dd]">Free activation</p>
    <h2 className="mt-2 text-2xl font-black text-white">Enter your Canva details</h2>
    <p className="mt-3 text-sm leading-6 text-white/58">We use this email to send your Canva Pro invitation after OGAds confirms your offer completion.</p>
    <div className="mt-6 grid gap-5">
      <label className="grid gap-2"><span className="text-sm font-bold text-white">Full name</span><input required name="name" minLength={2} maxLength={120} autoComplete="name" className="focus-ring rounded-[var(--radius)] border border-[var(--color-input-border)] bg-[var(--color-input-background)] px-4 py-3 text-white" /></label>
      <label className="grid gap-2"><span className="text-sm font-bold text-white">Your Canva email</span><input required name="email" type="email" autoComplete="email" dir="ltr" className="focus-ring rounded-[var(--radius)] border border-[var(--color-input-border)] bg-[var(--color-input-background)] px-4 py-3 text-white" placeholder="name@example.com" /></label>
      {state.error ? <div className="flex gap-2 rounded-[var(--radius)] border border-red-400/40 bg-red-500/10 p-4 text-sm font-bold text-red-100"><AlertCircle className="h-5 w-5 shrink-0" />{state.error}</div> : null}
      <SubmitButton />
    </div>
  </form>;
}
