import { getCloudflareContext } from "@opennextjs/cloudflare";

export type Enrollment = {
  id: string;
  buyer_email: string;
  buyer_name: string | null;
  status: "pending" | "success" | "failed";
  created_at: string;
  completed_at: string | null;
  offer_id: string | null;
  item_type: "canva" | "ebook" | null;
  item_slug: string | null;
};

export async function getEnrollment(id: string) {
  if (!/^[0-9a-f-]{36}$/i.test(id)) return null;
  const { env } = getCloudflareContext();
  return env.DB.prepare(
    "SELECT id, buyer_email, buyer_name, status, created_at, completed_at, offer_id, item_type, item_slug FROM enrollments WHERE id = ? LIMIT 1"
  ).bind(id).first<Enrollment>();
}
