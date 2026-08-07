export type SpeakingEngagement = {
  slug: string;
  event: string;
  date: string;
  location: string;
  topic: string;
  audience: string;
  summary: string;
};

export const speakingContent = {
  pageTitle: "Speaking",
  intro:
    "Invited talks on enterprise AI, AI and data governance, and world modeling, delivered to engineering audiences and to CIO/CTO/EVP leadership.",
};

export const speakingEngagements: SpeakingEngagement[] = [
  {
    slug: "cablelabs-tech-summit-2026",
    event: "CableLabs Tech Summit 2026",
    date: "April 2026",
    location: "Westminster, Colorado",
    topic: "AI & Data Governance",
    audience: "Technologists and technology leaders across CableLabs member operators",
    summary:
      "How an enterprise can govern AI and the data that feeds it without strangling delivery, and what changes once agentic systems reach production.",
  },
  {
    slug: "cablelabs-executive-strategy-retreat-2026",
    event: "CableLabs Executive Strategy Retreat",
    date: "June 2026",
    location: "Invited executive session",
    topic: "Agentic AI and Enterprise AI",
    audience: "CIO, CTO, and EVP leadership from across the industry",
    summary:
      "Where agentic AI and enterprise AI platforms are actually headed, AIOps included, and what it takes to run agentic capability as a dependable operation at carrier scale.",
  },
  {
    slug: "scte-rocky-mountain-symposium-2026",
    event: "SCTE Rocky Mountain Symposium: Resilience in the Age of AI",
    date: "July 15, 2026",
    location: "Denver, Colorado",
    topic: "AI in Network Management & Control, and the World-Model Future",
    audience: "Broadband engineers and technical leadership, Rocky Mountain chapter",
    summary:
      "The current state of AI in network management and control, AIOps included, followed by a longer look at world models and why they may give operational agents a real intuition for network behavior.",
  },
];
