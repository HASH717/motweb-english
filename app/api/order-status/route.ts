import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";

type Enrollment = {
  id: string;
  buyer_email: string;
  status: "pending" | "success" | "failed";
  created_at: string;
  updated_at: string | null;
  error_message: string | null;
};

export async function GET(request: NextRequest) {
  const email = request.nextUrl.searchParams.get("email")?.trim().toLowerCase() ?? "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  const { env } = getCloudflareContext();
  const enrollment = await env.DB.prepare(
    "SELECT id, buyer_email, status, created_at, updated_at, error_message FROM enrollments WHERE buyer_email = ? ORDER BY created_at DESC LIMIT 1"
  ).bind(email).first<Enrollment>();
  return NextResponse.json({ enrollment }, { headers: { "Cache-Control": "no-store" } });
}
