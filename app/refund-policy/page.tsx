import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "CPA Offer Policy" };

export default function RefundPolicyPage() {
  return <LegalPage title="CPA Offer Policy" intro="Mot Web Services does not charge users for the sponsored CPA offers displayed on this website." updatedAt="August 4, 2026">
    <LegalSection title="No purchase from Mot Web Services"><p>The offer feed replaces direct payment on this website. Because Mot Web Services does not collect a payment for selecting an offer, there is no purchase for us to refund.</p></LegalSection>
    <LegalSection title="Advertiser requirements"><p>Each advertiser determines eligibility, completion requirements, availability, and any separate purchase or subscription terms shown on its destination page. Review those terms before proceeding.</p></LegalSection>
    <LegalSection title="Offer availability"><p>Offers may change or disappear without notice and may not be available for every country, device, or user. We cannot guarantee acceptance or completion credit from an advertiser.</p></LegalSection>
    <LegalSection title="Support"><p>If the offer list does not load, contact us on WhatsApp at <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
