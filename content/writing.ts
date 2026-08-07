export type ExternalWritingEntry = {
  title: string;
  description: string;
  publishedAt: string;
  status: string;
  href: string;
  source: string;
};

export const writingContent = {
  pageTitle: "Writing",
  intro:
    "Essays on how AI systems actually work and what it takes to run them in production.",
  externalEntries: [
    {
      title: "The CLI vs MCP Debate Is Missing the Point",
      description:
        "Why useful AI agents need more than just tools: the integration argument everyone is having is downstream of an architecture question almost nobody is asking.",
      publishedAt: "2026-03-09",
      status: "Essay",
      href: "https://medium.com/@paulhenkelman",
      source: "Medium",
    },
  ] satisfies ExternalWritingEntry[],
};
