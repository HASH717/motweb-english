import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Terms of Service" };

export default function TermsOfServicePage() {
  return <LegalPage title="Terms of Service" intro="By using Mot Web Services or selecting an offer, you agree to these terms." updatedAt="August 4, 2026">
    <LegalSection title="Available offers"><p>We display offers selected for your country and device. Availability can change at any time.</p></LegalSection>
    <LegalSection title="Third-party services"><p>Each offer provider controls its destination page, eligibility rules, instructions, data collection, and completion decisions. Opening an offer does not guarantee qualification or credit.</p></LegalSection>
    <LegalSection title="Your responsibilities"><p>Provide accurate information, follow the displayed instructions, review the provider&apos;s terms and privacy policy, and do not use automated, misleading, duplicate, or fraudulent completion methods.</p></LegalSection>
    <LegalSection title="Activation"><p>Your Canva Pro activation is unlocked only after a completed offer is confirmed. Any separate transaction shown on another website is governed by that website&apos;s terms.</p></LegalSection>
    <LegalSection title="Support"><p>Our support channel is WhatsApp at <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
