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
    "Invited talks on enterprise AI, AI and data governance, and world modeling, for audiences ranging from working engineers to CIO/CTO/EVP leadership.",
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
      "How enterprises can govern AI and the data that feeds it without strangling delivery: governance structures, responsible-AI practice, and what changes when agentic systems enter production.",
  },
  {
    slug: "cablelabs-executive-strategy-retreat-2026",
    event: "CableLabs Executive Strategy Retreat",
    date: "June 2026",
    location: "Invited executive session",
    topic: "Agentic AI and Enterprise AI",
    audience: "CIO, CTO, and EVP leadership from across the industry",
    summary:
      "Where agentic AI and enterprise AI platforms are actually headed, including AIOps: what it takes to move agentic capability from demonstration to dependable operations at carrier scale.",
  },
  {
    slug: "scte-rocky-mountain-symposium-2026",
    event: "SCTE Rocky Mountain Symposium: Resilience in the Age of AI",
    date: "July 15, 2026",
    location: "Denver, Colorado",
    topic: "AI in Network Management & Control, and the World-Model Future",
    audience: "Broadband engineers and technical leadership, Rocky Mountain chapter",
    summary:
      "AI-driven network management and control today, from AIOps detection through automated remediation, and where it goes next: world models that give operational agents human-like intuition about how the network actually behaves.",
  },
];
