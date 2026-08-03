"use server";

import { redirect } from "next/navigation";
import { chargilyCheckoutUrl, getChargilySecretKey, requireEnv, siteUrl } from "@/lib/config";

export type CheckoutFormState = {
  status: "idle" | "error";
  message: string;
};

type ChargilyCheckoutResponse = {
  checkout_url?: string;
  url?: string;
  id?: string;
  message?: string;
};

async function verifyTurnstile(token: string): Promise<void> {
  const secret = requireEnv("TURNSTILE_SECRET_KEY");
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({
      secret,
      response: token
    })
  });

  if (!response.ok) {
    throw new Error("We could not verify the security check. Please try again.");
  }

  const result = (await response.json()) as { success?: boolean };

  if (!result.success) {
    throw new Error("Please complete the security check before payment.");
  }
}

function normalizeEmail(email: string): string {
  const value = email.trim().toLowerCase();
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  if (!isValid) {
    throw new Error("Please enter a valid email address.");
  }

  return value;
}

function normalizeName(name: string): string {
  const value = name.trim().replace(/\s+/g, " ");

  if (value.length < 2) {
    throw new Error("Please enter your full name.");
  }

  if (value.length > 120) {
    throw new Error("The name is too long.");
  }

  return value;
}

function isRedirectError(error: unknown): boolean {
  return typeof error === "object" && error !== null && "digest" in error && String((error as { digest?: unknown }).digest).startsWith("NEXT_REDIRECT");
}

export async function createCheckoutAction(_previousState: CheckoutFormState, formData: FormData): Promise<CheckoutFormState> {
  try {
    const email = normalizeEmail(String(formData.get("email") ?? ""));
    const name = normalizeName(String(formData.get("name") ?? ""));
    const turnstileToken = String(formData.get("cf-turnstile-response") ?? "");

    if (!turnstileToken) {
      throw new Error("Please wait for the security check to load and complete it before payment.");
    }

    await verifyTurnstile(turnstileToken);

    const successUrl = `${siteUrl}/checkout/status?email=${encodeURIComponent(email)}`;
    const failureUrl = `${siteUrl}/canva?payment=failed`;
    const webhookEndpoint = `${siteUrl}/api/webhooks/chargily`;
    const response = await fetch(chargilyCheckoutUrl, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getChargilySecretKey()}`,
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({
        amount: 500,
        currency: "dzd",
        success_url: successUrl,
        failure_url: failureUrl,
        webhook_endpoint: webhookEndpoint,
        metadata: {
          buyer_email: email,
          buyer_name: name,
          product: "Canva Pro (3 Years)"
        }
      })
    });

    const payload = (await response.json().catch(() => ({}))) as ChargilyCheckoutResponse;

    if (!response.ok) {
      throw new Error(payload.message ?? "We could not create the payment link. Please try again.");
    }

    const checkoutUrl = payload.checkout_url ?? payload.url;

    if (!checkoutUrl) {
      throw new Error("ChargilyPay did not return a payment link.");
    }

    redirect(checkoutUrl);
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return {
      status: "error",
      message: error instanceof Error ? error.message : "An unexpected error occurred. Please try again."
    };
  }
}
