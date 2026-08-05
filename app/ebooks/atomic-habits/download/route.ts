import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest } from "next/server";
import { atomicHabits } from "@/lib/ebooks";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const enrollmentId = request.nextUrl.searchParams.get("enrollment") ?? "";
  if (!/^[0-9a-f-]{36}$/i.test(enrollmentId)) return new Response("Not found", { status: 404 });
  const { env } = getCloudflareContext();
  const enrollment = await env.DB.prepare("SELECT status, item_type, item_slug FROM enrollments WHERE id = ? LIMIT 1").bind(enrollmentId).first<{ status: string; item_type: string | null; item_slug: string | null }>();
  if (!enrollment || enrollment.status !== "success" || enrollment.item_type !== "ebook" || enrollment.item_slug !== atomicHabits.slug) return new Response("Complete an offer to unlock this download.", { status: 403 });
  const file = await env.EBOOKS_KV.get(atomicHabits.fileKey, "stream");
  if (!file) return new Response("File unavailable", { status: 503 });
  return new Response(file, { headers: { "Content-Type": "application/pdf", "Content-Length": String(atomicHabits.fileSize), "Content-Disposition": 'attachment; filename="Atomic-Habits-James-Clear.pdf"', "Cache-Control": "private, no-store", "X-Content-Type-Options": "nosniff" } });
}
