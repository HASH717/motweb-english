export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  category: string;
  publishedAt: string;
  readTime: string;
  content: Array<{ heading: string; paragraphs: string[] }>;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-choose-a-digital-subscription-provider",
    title: "How to choose a digital subscription provider",
    description: "A practical checklist for buying digital subscriptions safely and avoiding unreliable sellers.",
    category: "Buying guides",
    publishedAt: "2026-08-03",
    readTime: "5 min read",
    content: [
      {
        heading: "Look for a clear activation process",
        paragraphs: [
          "A trustworthy provider explains exactly what happens after payment: which email receives access, how long activation normally takes, and where you can check your order status.",
          "Avoid offers that require you to hand over your personal password. A legitimate activation should use an invitation or another documented account flow."
        ]
      },
      {
        heading: "Check the support channel before paying",
        paragraphs: [
          "Make sure the provider publishes a real support channel and sets expectations for response times. Save your payment receipt and use the same email address when you contact support.",
          "Mot Web Services provides direct WhatsApp support and an order-status page for supported products."
        ]
      },
      {
        heading: "Read the refund and service terms",
        paragraphs: [
          "Digital products can have different refund rules from physical goods. Read the policy before checkout and confirm what is covered if activation fails or access is interrupted."
        ]
      }
    ]
  },
  {
    slug: "getting-started-with-canva-pro",
    title: "Getting started with Canva Pro",
    description: "What to prepare before activation and what to check after your Canva invitation arrives.",
    category: "Canva",
    publishedAt: "2026-08-03",
    readTime: "4 min read",
    content: [
      {
        heading: "Use an email address you control",
        paragraphs: [
          "Enter an email address that you can open immediately. Check the spelling carefully at checkout because your Canva invitation will be sent to that address."
        ]
      },
      {
        heading: "Accept the invitation",
        paragraphs: [
          "After activation, open the invitation from Canva and follow the official link. If it is not in your inbox, check spam and promotions folders before contacting support."
        ]
      },
      {
        heading: "Keep your account secure",
        paragraphs: [
          "Never share your email password. Use a unique password for Canva, enable multi-factor authentication when available, and contact support if the invitation does not match the email used at checkout."
        ]
      }
    ]
  },
  {
    slug: "protect-your-digital-accounts",
    title: "Five ways to protect your digital accounts",
    description: "Simple security habits that reduce the risk of losing access to subscriptions and creative work.",
    category: "Account security",
    publishedAt: "2026-08-03",
    readTime: "6 min read",
    content: [
      {
        heading: "Start with unique passwords",
        paragraphs: [
          "Use a password manager to generate a different password for every service. Reusing one password can turn a single data breach into access to several accounts."
        ]
      },
      {
        heading: "Turn on multi-factor authentication",
        paragraphs: [
          "An authenticator app or security key adds a second layer of protection. Store recovery codes somewhere safe and offline."
        ]
      },
      {
        heading: "Review invitations and links",
        paragraphs: [
          "Check the sender and destination before opening an account invitation. Official service emails should take you to the provider's real domain, not a lookalike page.",
          "Keep payment confirmations and support conversations so you can resolve activation questions quickly."
        ]
      }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
