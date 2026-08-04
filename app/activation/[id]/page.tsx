import Link from "next/link";
import { CircleCheck, Clock3, MessageCircle, XCircle } from "lucide-react";
import { ActivationRefresher } from "@/components/activation-refresher";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { getEnrollment } from "@/lib/enrollments";
import { requireEnv } from "@/lib/config";

export const metadata = { title: "Activation status" };
export const dynamic = "force-dynamic";

export default async function ActivationPage({ params }: { params: Promise<{ id: string }> }) {
  const enrollment = await getEnrollment((await params).id);
  const whatsapp = requireEnv("NEXT_PUBLIC_WHATSAPP_NUMBER").replace(/[^\d]/g, "");
  if (!enrollment) return <main><SiteNav /><section className="container-shell grid min-h-[70vh] place-items-center"><div className="surface rounded-[var(--radius)] p-8 text-center"><XCircle className="mx-auto h-12 w-12 text-red-400" /><h1 className="mt-4 text-3xl font-black text-white">Activation request not found</h1><Link href="/canva" className="mt-6 inline-flex text-white underline">Start again</Link></div></section><SiteFooter /></main>;
  const complete = enrollment.status === "success";
  return <main><SiteNav /><ActivationRefresher active={!complete} /><section className="container-shell grid min-h-[70vh] place-items-center py-14"><div className="surface w-full max-w-2xl rounded-[var(--radius)] p-8 text-center">{complete ? <CircleCheck className="mx-auto h-14 w-14 text-[#32a81f]" /> : <Clock3 className="mx-auto h-14 w-14 text-amber-300" />}<h1 className="mt-5 text-3xl font-black text-white">{complete ? "Completion verified—activation unlocked" : "Waiting for OGAds confirmation"}</h1><p className="mt-4 leading-8 text-white/64">{complete ? <>Your request for <span className="font-bold text-white">{enrollment.buyer_email}</span> is ready for Canva Pro activation. Our team will send the invitation to that email.</> : "Finish every required step on one offer. This page checks automatically every 10 seconds; some advertisers may take a few minutes to report completion."}</p><div className="mt-7 flex flex-wrap justify-center gap-3">{complete ? <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent(`My OGAds completion was verified. Activation ID: ${enrollment.id}`)}`} className="focus-ring inline-flex items-center gap-2 rounded-[var(--radius)] bg-[#25D366] px-5 py-3 text-sm font-black text-white"><MessageCircle className="h-4 w-4" /> Contact activation team</a> : <Link href={`/canva?enrollment=${enrollment.id}`} className="focus-ring inline-flex rounded-[var(--radius)] bg-[var(--color-accent)] px-5 py-3 text-sm font-black text-white">Return to offers</Link>}</div></div></section><SiteFooter /></main>;
}
