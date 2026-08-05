import { getCloudflareContext } from "@opennextjs/cloudflare";
import { atomicHabits } from "@/lib/ebooks";

export const dynamic = "force-dynamic";

export async function GET() {
  const { env } = getCloudflareContext();
  const cover = await env.EBOOKS_KV.get(atomicHabits.coverKey, "arrayBuffer");
  if (!cover) return new Response("Not found", { status: 404 });
  return new Response(cover, { headers: { "Content-Type": "image/png", "Cache-Control": "public, max-age=86400" } });
}
