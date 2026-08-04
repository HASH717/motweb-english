import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" intro="This policy explains how Mot Web Services handles information when displaying sponsored CPA offers." updatedAt="August 4, 2026">
    <LegalSection title="Information used to select offers"><p>When you request the offer list, your IP address and browser user-agent are sent securely from our server to OGAds. These values are required to return offers appropriate for your country and device.</p><p>We do not expose our OGAds API key to your browser and we do not store your IP address in our application database.</p></LegalSection>
    <LegalSection title="Third-party offers"><p>When you choose an offer, you leave Mot Web Services and visit an advertiser or offer provider. Their privacy policy and data practices apply to information you submit there.</p></LegalSection>
    <LegalSection title="How we use information"><p>We use request information only to retrieve eligible offers, operate the website, prevent abuse, and respond to support requests. We do not sell personal information.</p></LegalSection>
    <LegalSection title="Contact"><p>For a privacy request, contact us on WhatsApp at <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
