export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getChargilySecretKey(): string {
  return requireEnv("CHARGILY_SECRET_KEY");
}

export const chargilyCheckoutUrl = process.env.CHARGILY_CHECKOUT_URL ?? "https://pay.chargily.net/api/v2/checkouts";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://motweb-english.motraxagency.workers.dev";

export const openWaApiUrl = process.env.OPENWA_API_URL?.replace(/\/$/, "") ?? "";

export const openWaSessionId = process.env.OPENWA_SESSION_ID ?? "";

export function isOpenWaEnabled(): boolean {
  return process.env.OPENWA_ENABLED?.toLowerCase() === "true";
}
