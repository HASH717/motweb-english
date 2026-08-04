import { getCloudflareContext } from "@opennextjs/cloudflare";
import { requireEnv } from "@/lib/config";

export const dynamic = "force-dynamic";
export const metadata = { robots: { index: false, follow: false } };

type Query = { key?: string; enrollment?: string; transaction?: string; offer?: string; status?: string };

export default async function OgAdsPostbackPage({ searchParams }: { searchParams: Promise<Query> }) {
  const query = await searchParams;
  const expected = requireEnv("OGADS_POSTBACK_SECRET");
  if (!query.key || query.key !== expected || !query.enrollment || !/^[0-9a-f-]{36}$/i.test(query.enrollment)) return <pre>ERROR</pre>;

  const now = new Date().toISOString();
  const transaction = query.transaction?.slice(0, 200) || `ogads-${query.enrollment}`;
  const offer = query.offer?.slice(0, 100) || null;
  const { env } = getCloudflareContext();
  await env.DB.prepare(
    "UPDATE enrollments SET status = 'success', completed_at = ?, updated_at = ?, transaction_id = ?, offer_id = ?, error_message = NULL WHERE id = ? AND status = 'pending'"
  ).bind(now, now, transaction, offer, query.enrollment).run();
  return <pre>OK</pre>;
}
