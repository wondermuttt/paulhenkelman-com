export const siteConfig = {
  name: "Paul Henkelman",
  defaultTitle:
    "Paul Henkelman | AI Architecture, Distributed Systems, and Production AI",
  description:
    "Personal authority platform for Paul Henkelman on AI architecture, distributed systems, and production-scale operational intelligence.",
  url: "https://paulhenkelman.com",
  locale: "en_US",
  email: "contact@paulhenkelman.com",
  xHandle: "@paul_henkelman",
  footerIdentity:
    "Architecture leadership for production AI and distributed systems.",
  navigation: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Systems", href: "/systems" },
    { label: "Writing", href: "/writing" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: {
    linkedin: "https://linkedin.com/in/paulhenkelman",
    github: "https://github.com/paulhenkelman",
    x: "https://x.com/paul_henkelman",
    medium: "https://medium.com/@paulhenkelman",
  },
  socialLabelOrder: ["linkedin", "x", "github", "medium"] as const,
};

export type SocialKey = (typeof siteConfig.socialLabelOrder)[number];

export const socialLabels: Record<SocialKey, string> = {
  linkedin: "LinkedIn",
  github: "GitHub",
  x: "X",
  medium: "Medium",
};
