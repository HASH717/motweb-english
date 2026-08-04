import { NextRequest, NextResponse } from "next/server";
import { requireEnv } from "@/lib/config";

export const dynamic = "force-dynamic";

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

type PublicOffer = {
  id: number;
  name: string;
  description: string;
  imageUrl: string | null;
  country: string | null;
  device: string | null;
  url: string;
};

const maxOffers = 8;

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

export async function GET(request: NextRequest) {
  const ip =
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip");
  const userAgent = request.headers.get("user-agent");

  if (!ip || !userAgent) {
    return NextResponse.json({ error: "Visitor information is unavailable." }, { status: 400 });
  }

  const endpoint = process.env.OGADS_API_ENDPOINT ?? "https://saveapp.store/api/v2";
  const url = new URL(endpoint);
  url.searchParams.set("ip", ip);
  url.searchParams.set("user_agent", userAgent);
  url.searchParams.set("max", String(maxOffers));

  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        authorization: `Bearer ${requireEnv("OGADS_API_KEY")}`
      },
      signal: AbortSignal.timeout(8000),
      cache: "no-store"
    });

    if (!response.ok) {
      console.error(JSON.stringify({ message: "OGAds request failed", status: response.status }));
      return NextResponse.json({ error: "Offers are temporarily unavailable." }, { status: 502 });
    }

    const payload: unknown = await response.json();
    const rawOffers = payload && typeof payload === "object" && "offers" in payload ? (payload as { offers?: unknown }).offers : null;
    const offers = Array.isArray(rawOffers)
      ? rawOffers.map(toPublicOffer).filter((offer): offer is PublicOffer => offer !== null).slice(0, maxOffers)
      : [];

    return NextResponse.json(
      { offers },
      { headers: { "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } }
    );
  } catch (error) {
    console.error(JSON.stringify({
      message: "OGAds request error",
      error: error instanceof Error ? error.message : "Unknown error"
    }));
    return NextResponse.json({ error: "Offers are temporarily unavailable." }, { status: 502 });
  }
}
