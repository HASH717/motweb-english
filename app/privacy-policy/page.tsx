import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" intro="This policy explains how Mot Web Services handles information when you buy a digital service or contact us." updatedAt="August 3, 2026">
    <LegalSection title="Information we collect"><p>We collect your name, email address, order status, and payment identifiers needed to complete purchases and activation. Support conversations may be retained to resolve your request.</p></LegalSection>
    <LegalSection title="How we use information"><p>We use your information to create the payment request, activate the service, deliver or track your invitation, prevent abuse, and provide support.</p><p>We do not sell your information. We share only what is necessary with service providers such as ChargilyPay, our database provider, and the product platform.</p></LegalSection>
    <LegalSection title="Payment and security"><p>Payments are processed by ChargilyPay. We do not store card or sensitive bank-payment details on this website. Cloudflare Turnstile helps protect forms from automated abuse.</p></LegalSection>
    <LegalSection title="Data retention and contact"><p>We retain order and support records for a reasonable period to provide service coverage, resolve disputes, and improve the service. For a privacy request, contact us on WhatsApp at <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
