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
    slug: "how-free-activation-offers-work",
    title: "How free activation offers work",
    description: "A simple guide to choosing an offer, completing its steps, and unlocking activation.",
    category: "Offer guides",
    publishedAt: "2026-08-04",
    readTime: "4 min read",
    content: [
      { heading: "Why choices differ", paragraphs: ["Available choices depend on your country and device, so two visitors may see different options.", "Choose an option that matches your device and that you are comfortable completing."] },
      { heading: "Read every step before starting", paragraphs: ["An offer may ask you to install an app, complete a tutorial, answer a survey, or finish another clearly stated task.", "Opening an offer alone is not enough. Complete every displayed step and allow a few minutes for confirmation."] },
      { heading: "Participate safely", paragraphs: ["Check the destination website, read its privacy policy, and never share your email or banking password. Do not use automated, duplicate, or misleading completion methods."] }
    ]
  },
  {
    slug: "getting-started-with-canva-pro",
    title: "Getting started with Canva Pro",
    description: "How to choose an available offer and protect your account while unlocking Canva Pro.",
    category: "Canva",
    publishedAt: "2026-08-03",
    readTime: "4 min read",
    content: [
      { heading: "Choose a suitable offer", paragraphs: ["Open the Canva Pro page, enter your Canva email, and choose an option that matches your device. Available choices may change over time."] },
      { heading: "Follow every instruction", paragraphs: ["The offer opens in a new tab. Read every requirement and complete it accurately, then return to check your activation status."] },
      { heading: "Keep your account secure", paragraphs: ["Never share your email password. Use a unique password for Canva, enable multi-factor authentication when available, and contact support if you have questions."] }
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
      { heading: "Start with unique passwords", paragraphs: ["Use a password manager to generate a different password for every service. Reusing one password can turn a single data breach into access to several accounts."] },
      { heading: "Turn on multi-factor authentication", paragraphs: ["An authenticator app or security key adds a second layer of protection. Store recovery codes somewhere safe and offline."] },
      { heading: "Review invitations and links", paragraphs: ["Check the sender and destination before opening an account invitation. Official service emails should take you to the provider's real domain, not a lookalike page.", "Keep relevant confirmations and support conversations so you can explain an activation issue clearly."] }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
