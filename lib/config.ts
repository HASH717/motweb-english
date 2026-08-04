export function requireEnv(name: string): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://motweb-english.motraxagency.workers.dev";

export const openWaApiUrl = process.env.OPENWA_API_URL?.replace(/\/$/, "") ?? "";

export const openWaSessionId = process.env.OPENWA_SESSION_ID ?? "";

export function isOpenWaEnabled(): boolean {
  return process.env.OPENWA_ENABLED?.toLowerCase() === "true";
}
