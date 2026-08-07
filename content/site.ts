export const siteConfig = {
  name: "Paul Henkelman",
  defaultTitle:
    "Paul Henkelman | Enterprise AI Architecture, Agentic Systems, and Production AI",
  description:
    "Paul Henkelman designs and delivers enterprise AI systems: agentic services in production, AIOps platforms at 30M+ subscriber scale, and the infrastructure and governance that make them dependable.",
  url: "https://paulhenkelman.com",
  locale: "en_US",
  email: "contact@henkelman.net",
  footerIdentity:
    "Enterprise AI architecture: agentic systems, AI platforms, and production-scale operations.",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Systems", href: "/systems" },
    { label: "Speaking", href: "/speaking" },
    { label: "Writing", href: "/writing" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/paulhenkelman",
    github: "https://github.com/paulhenkelman",
    medium: "https://medium.com/@paulhenkelman",
  },
  socialLabelOrder: ["linkedin", "github", "medium"] as const,
};

export type SocialKey = (typeof siteConfig.socialLabelOrder)[number];

export const socialLabels: Record<SocialKey, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  medium: "Medium",
};
