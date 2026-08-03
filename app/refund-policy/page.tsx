import { LegalPage, LegalSection } from "@/components/legal-page";

export const metadata = { title: "Refund Policy" };

export default function RefundPolicyPage() {
  return <LegalPage title="Refund Policy" intro="This policy explains when a payment for a Mot Web Services digital service may be refunded." updatedAt="August 3, 2026">
    <LegalSection title="When a refund may be available"><p>A refund may be available if activation fails because of our service or if the delivered subscription does not work after activation. Contact us on WhatsApp with the order email and evidence of the issue so we can review it.</p></LegalSection>
    <LegalSection title="When a refund is not available"><p>A refund is not available after successful activation and normal use. It also does not cover an incorrect email address, a deleted or rejected invitation, or a violation of the third-party platform&apos;s rules.</p></LegalSection>
    <LegalSection title="How requests are handled"><p>We first try to repair the activation or resend the invitation. If we confirm that the activation failed and cannot be corrected, we process an appropriate refund based on the original payment method.</p></LegalSection>
    <LegalSection title="Support"><p>Send refund and support requests by WhatsApp to <span dir="ltr">+213 559 086 142</span>.</p></LegalSection>
  </LegalPage>;
}
