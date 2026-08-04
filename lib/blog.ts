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
    slug: "how-sponsored-cpa-offers-work",
    title: "How sponsored CPA offers work",
    description: "A clear guide to location-aware offers, advertiser requirements, and safe participation.",
    category: "Offer guides",
    publishedAt: "2026-08-04",
    readTime: "5 min read",
    content: [
      {
        heading: "Why offers differ between visitors",
        paragraphs: [
          "CPA means cost per action. Advertisers make offers available for specific countries, devices, and audiences, so two visitors may see different choices.",
          "The Mot Web Services server asks OGAds for offers using your country and device signals, then displays eligible options without exposing the private API key."
        ]
      },
      {
        heading: "Read the requirement before starting",
        paragraphs: [
          "An offer may ask you to install an app, complete a tutorial, answer a survey, or take another clearly stated action. Open the offer and review its instructions before submitting information.",
          "Eligibility and completion decisions belong to the advertiser. An offer appearing in the feed does not guarantee that every visitor will qualify."
        ]
      },
      {
        heading: "Participate safely",
        paragraphs: [
          "Check the destination domain, read the advertiser's privacy policy, and never share an email or banking password. Do not use automated, duplicate, or misleading completion methods."
        ]
      }
    ]
  },
  {
    slug: "getting-started-with-canva-pro",
    title: "Getting started with Canva Pro",
    description: "How to choose a sponsored offer and protect your account while working toward Canva Pro access.",
    category: "Canva",
    publishedAt: "2026-08-03",
    readTime: "4 min read",
    content: [
      {
        heading: "Choose a suitable offer",
        paragraphs: [
          "Open the Canva Pro offers page and choose an option that matches your device and that you are comfortable completing. The list is supplied live and may change over time."
        ]
      },
      {
        heading: "Follow the advertiser's instructions",
        paragraphs: [
          "The sponsored offer opens in a new tab. Read every requirement and complete it accurately. The advertiser determines whether the action qualifies."
        ]
      },
      {
        heading: "Keep your account secure",
        paragraphs: [
          "Never share your email password. Use a unique password for Canva, enable multi-factor authentication when available, and contact support if you have questions about the Mot Web Services offer page."
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
          "Keep relevant advertiser confirmations and support conversations so you can explain a completion issue clearly."
        ]
      }
    ]
  }
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
