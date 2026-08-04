import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Terms of Service" };

export default function TermsOfServicePage() {
  return <LegalPage title="Terms of Service" intro="By using Mot Web Services or selecting a sponsored offer, you agree to these terms." updatedAt="August 4, 2026">
    <LegalSection title="Sponsored offer service"><p>We display third-party CPA offers supplied through OGAds. Offer availability is personalized by country and device and can change at any time.</p></LegalSection>
    <LegalSection title="Third-party relationship"><p>Advertisers, not Mot Web Services, control their landing pages, eligibility rules, instructions, data collection, and completion decisions. Opening an offer does not guarantee qualification or credit.</p></LegalSection>
    <LegalSection title="User responsibilities"><p>Provide accurate information to advertisers, follow their instructions, review their terms and privacy policies, and do not use automated, misleading, duplicate, or fraudulent completion methods.</p></LegalSection>
    <LegalSection title="No direct payment"><p>Mot Web Services does not process a payment when you select an offer from this feed. Any transaction separately presented by an advertiser is governed by that advertiser&apos;s terms.</p></LegalSection>
    <LegalSection title="Support"><p>Our support channel is WhatsApp at <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
