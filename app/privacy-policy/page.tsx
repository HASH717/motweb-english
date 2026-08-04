import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" intro="This policy explains how Mot Web Services handles information while showing offers and processing activation requests." updatedAt="August 4, 2026">
    <LegalSection title="Information used to select offers"><p>Your general location and device information are used to show choices that are available to you. We do not store your IP address in our application database.</p></LegalSection>
    <LegalSection title="Third-party offers"><p>When you choose an offer, you leave Mot Web Services and visit another website. That website&apos;s privacy policy applies to information you submit there.</p></LegalSection>
    <LegalSection title="How we use information"><p>We use your name and Canva email to track your activation request, prevent abuse, and respond to support questions. We do not sell personal information.</p></LegalSection>
    <LegalSection title="Contact"><p>For a privacy request, contact us on WhatsApp at <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
