"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { redirect } from "next/navigation";

export type EnrollmentFormState = { error?: string };

export async function createEnrollmentAction(_: EnrollmentFormState, formData: FormData): Promise<EnrollmentFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const itemType = String(formData.get("itemType") ?? "canva");
  const itemSlug = String(formData.get("itemSlug") ?? "canva-pro");

  if (name.length < 2 || name.length > 120) return { error: "Enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { error: "Enter a valid email address." };
  const isCanva = itemType === "canva" && itemSlug === "canva-pro";
  const isAtomicHabits = itemType === "ebook" && itemSlug === "atomic-habits";
  if (!isCanva && !isAtomicHabits) return { error: "This item is not available." };

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const { env } = getCloudflareContext();
  await env.DB.prepare(
    "INSERT INTO enrollments (id, buyer_email, buyer_name, status, created_at, item_type, item_slug) VALUES (?, ?, ?, 'pending', ?, ?, ?)"
  ).bind(id, email, name, now, itemType, itemSlug).run();

  redirect(isCanva ? `/canva?enrollment=${encodeURIComponent(id)}` : `/ebooks/atomic-habits?enrollment=${encodeURIComponent(id)}`);
}
