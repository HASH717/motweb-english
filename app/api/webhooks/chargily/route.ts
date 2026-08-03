import crypto from "node:crypto";
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import { getChargilySecretKey } from "@/lib/config";

export const runtime = "nodejs";

type ChargilyWebhookEvent = {
  type?: string;
  data?: {
    metadata?: Record<string, unknown>;
    customer?: {
      email?: string | null;
    } | null;
  };
};

function timingSafeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  if (left.length !== right.length) {
    return false;
  }

  return crypto.timingSafeEqual(left, right);
}

function extractEmail(event: ChargilyWebhookEvent): string | null {
  const metadataEmail = event.data?.metadata?.buyer_email;
  const customerEmail = event.data?.customer?.email;
  const email = typeof metadataEmail === "string" ? metadataEmail : customerEmail;

  if (!email) {
    return null;
  }

  const normalized = email.trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized) ? normalized : null;
}

export async function POST(request: NextRequest) {
  const rawBody = await request.text();
  const signature = request.headers.get("signature") ?? request.headers.get("x-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 403 });
  }

  const computedSignature = crypto.createHmac("sha256", getChargilySecretKey()).update(rawBody).digest("hex");

  if (!timingSafeEqual(computedSignature, signature)) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 403 });
  }

  let event: ChargilyWebhookEvent;

  try {
    event = JSON.parse(rawBody) as ChargilyWebhookEvent;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  if (event.type === "checkout.paid") {
    const email = extractEmail(event);

    if (!email) {
      return NextResponse.json({ error: "Buyer email not found" }, { status: 400 });
    }

    const { env } = getCloudflareContext();
    const now = new Date().toISOString();
    try {
      await env.DB.prepare("INSERT INTO enrollments (id, buyer_email, status, created_at) VALUES (?, ?, ?, ?)")
        .bind(crypto.randomUUID(), email, "pending", now)
        .run();
    } catch (error) {
      console.error("Enrollment insert failed", error);
      return NextResponse.json({ error: "Enrollment insert failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ ok: true });
}
