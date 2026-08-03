import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Terms of Service" };

export default function TermsOfServicePage() {
  return <LegalPage title="Terms of Service" intro="By using Mot Web Services or purchasing a digital service, you agree to these terms." updatedAt="August 3, 2026">
    <LegalSection title="Our service"><p>We provide digital services and subscriptions. The current offer is Canva Pro for three years on the customer&apos;s own email address.</p><p>Activation instructions may vary by service and are provided through the order-status page or WhatsApp when necessary.</p></LegalSection>
    <LegalSection title="Customer responsibilities"><p>You must provide a valid, accessible email address and follow the order-status page after payment.</p><p>You are responsible for accepting invitations, following activation instructions, and complying with the third-party platform&apos;s terms.</p></LegalSection>
    <LegalSection title="Activation and delivery"><p>Activation starts after payment is confirmed. Most orders update automatically; uncommon cases may require manual support.</p><p>If activation is delayed, contact us on WhatsApp with the email used for the order.</p></LegalSection>
    <LegalSection title="Refunds"><p>Refunds are governed by the Refund Policy published on this website. In summary, a refund may be available if we cannot activate the service or the delivered service does not work.</p></LegalSection>
    <LegalSection title="Support"><p>Our official support channel is WhatsApp at <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
