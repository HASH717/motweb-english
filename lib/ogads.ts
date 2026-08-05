import { requireEnv } from "@/lib/config";

type OgAdsOffer = {
  offerid?: unknown;
  name?: unknown;
  name_short?: unknown;
  description?: unknown;
  adcopy?: unknown;
  picture?: unknown;
  country?: unknown;
  device?: unknown;
  link?: unknown;
};

export type PublicOffer = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  country: string | null;
  device: string | null;
  url: string;
};

function optionalString(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function safeHttpUrl(value: unknown): string | null {
  const candidate = optionalString(value);
  if (!candidate) return null;
  try {
    const url = new URL(candidate);
    return url.protocol === "https:" || url.protocol === "http:" ? url.toString() : null;
  } catch {
    return null;
  }
}

function toPublicOffer(value: unknown): PublicOffer | null {
  if (!value || typeof value !== "object") return null;
  const offer = value as OgAdsOffer;
  const id = typeof offer.offerid === "number" ? offer.offerid : Number(offer.offerid);
  const name = optionalString(offer.name_short) ?? optionalString(offer.name);
  const url = safeHttpUrl(offer.link);
  if (!Number.isSafeInteger(id) || !name || !url) return null;

  return {
    id,
    name,
    description: optionalString(offer.adcopy) ?? optionalString(offer.description) ?? "Complete this offer to continue.",
    imageUrl: safeHttpUrl(offer.picture),
    country: optionalString(offer.country),
    device: optionalString(offer.device),
    url
  };
}

export async function getOgAdsOffers(ip: string, userAgent: string, enrollmentId?: string, itemTag = "canva-pro"): Promise<PublicOffer[]> {
  const endpoint = process.env.OGADS_API_ENDPOINT ?? "https://saveapp.store/api/v2";
  const url = new URL(endpoint);
  url.searchParams.set("ip", ip);
  url.searchParams.set("user_agent", userAgent);
  url.searchParams.set("max", "8");
  if (enrollmentId) {
    url.searchParams.set("aff_sub4", enrollmentId);
    url.searchParams.set("aff_sub5", itemTag.slice(0, 100));
  }

  const response = await fetch(url, {
    headers: { accept: "application/json", authorization: `Bearer ${requireEnv("OGADS_API_KEY")}` },
    signal: AbortSignal.timeout(8000),
    cache: "no-store"
  });

  if (!response.ok) {
    console.error(JSON.stringify({ message: "OGAds request failed", status: response.status }));
    throw new Error("Offers are temporarily unavailable.");
  }

  const payload: unknown = await response.json();
  const rawOffers = payload && typeof payload === "object" && "offers" in payload ? (payload as { offers?: unknown }).offers : null;
  return Array.isArray(rawOffers)
    ? rawOffers.map(toPublicOffer).filter((offer): offer is PublicOffer => offer !== null).slice(0, 8)
    : [];
}
