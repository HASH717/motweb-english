import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Offer Policy" };

export default function RefundPolicyPage() {
  return <LegalPage title="Offer Policy" intro="This policy explains how available offers and Canva Pro activation work." updatedAt="August 4, 2026">
    <LegalSection title="Activation requests"><p>Complete one available offer to unlock your Canva Pro activation request. Opening an offer without completing its steps does not qualify.</p></LegalSection>
    <LegalSection title="Offer requirements"><p>Each offer has its own eligibility rules and completion steps. Review all instructions before proceeding.</p></LegalSection>
    <LegalSection title="Offer availability"><p>Choices may change or disappear without notice and may not be available for every country, device, or visitor. Confirmation can sometimes take a few minutes.</p></LegalSection>
    <LegalSection title="Support"><p>If the offer list does not load, contact us on WhatsApp at <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
