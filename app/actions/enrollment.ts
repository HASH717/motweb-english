"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { redirect } from "next/navigation";

export type EnrollmentFormState = { error?: string };

export async function createEnrollmentAction(_: EnrollmentFormState, formData: FormData): Promise<EnrollmentFormState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();

  if (name.length < 2 || name.length > 120) return { error: "Enter your full name." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { error: "Enter a valid Canva email address." };

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const { env } = getCloudflareContext();
  await env.DB.prepare(
    "INSERT INTO enrollments (id, buyer_email, buyer_name, status, created_at) VALUES (?, ?, ?, 'pending', ?)"
  ).bind(id, email, name, now).run();

  redirect(`/canva/offers?enrollment=${encodeURIComponent(id)}`);
}
