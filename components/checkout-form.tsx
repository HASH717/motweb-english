"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, Loader2 } from "lucide-react";
import { createCheckoutAction, type CheckoutFormState } from "@/app/actions/checkout";
import { TurnstileWidget } from "@/components/turnstile-widget";

type CheckoutFormProps = {
  turnstileSiteKey: string;
};

const initialState: CheckoutFormState = {
  status: "idle",
  message: ""
};

function PayButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="focus-ring inline-flex items-center justify-center gap-2 rounded-[var(--radius)] bg-[var(--color-accent)] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#32a81f]/25 transition hover:bg-[#3ac724] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? <Loader2 aria-hidden="true" className="h-5 w-5 animate-spin" /> : null}
      {pending ? "Creating your payment link..." : "Pay DZD 500 now"}
    </button>
  );
}

export function CheckoutForm({ turnstileSiteKey }: CheckoutFormProps) {
  const [state, formAction] = useActionState(createCheckoutAction, initialState);

  return (
    <form action={formAction} className="surface order-2 rounded-[var(--radius)] p-5 sm:p-7 lg:col-start-2 lg:row-span-2 lg:row-start-1">
      <div className="mb-6">
        <p className="text-sm font-bold text-[#cf19dd]">Checkout</p>
        <h2 className="mt-2 text-2xl font-black text-white">Complete your order</h2>
      </div>

      <div className="grid gap-5">
        <label className="grid gap-2 text-start">
          <span className="text-sm font-bold text-white">Full name</span>
          <input
            required
            name="name"
            type="text"
            minLength={2}
            maxLength={120}
            autoComplete="name"
            className="focus-ring rounded-[var(--radius)] border border-[var(--color-input-border)] bg-[var(--color-input-background)] px-4 py-3 text-base text-white placeholder:text-white/35"
            placeholder="Enter your name"
          />
        </label>

        <label className="grid gap-2 text-start">
          <span className="text-sm font-bold text-white">Your email address</span>
          <input
            required
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            className="focus-ring rounded-[var(--radius)] border border-[var(--color-input-border)] bg-[var(--color-input-background)] px-4 py-3 text-base text-white placeholder:text-white/35"
            placeholder="name@example.com"
            dir="ltr"
          />
        </label>

        <TurnstileWidget siteKey={turnstileSiteKey} />

        {state.message ? (
          <div className="flex items-start gap-2 rounded-[var(--radius)] border border-red-400/40 bg-red-500/10 p-4 text-sm font-bold leading-6 text-red-100">
            <AlertCircle aria-hidden="true" className="mt-0.5 h-5 w-5 shrink-0" />
            <span>{state.message}</span>
          </div>
        ) : null}

        <PayButton />
      </div>
    </form>
  );
}
