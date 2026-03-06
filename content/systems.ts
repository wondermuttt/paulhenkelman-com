export type SystemsDomain = {
  slug: string;
  title: string;
  summary: string;
  importance: string;
};

export const systemsDomains: SystemsDomain[] = [
  {
    slug: "ai-operational-systems",
    title: "AI Operational Systems",
    summary:
      "Architectures that move beyond model delivery to full production operation, including orchestration, telemetry, safeguards, and lifecycle governance.",
    importance:
      "Most AI initiatives fail between prototype and operations. This domain matters because it closes that gap by designing for reliability, monitoring, and controlled change from the beginning.",
  },
  {
    slug: "distributed-infrastructure-for-ai",
    title: "Distributed Infrastructure for AI",
    summary:
      "Compute, data, and network architecture patterns that support sustained AI workloads across distributed environments.",
    importance:
      "AI performance in production is constrained by systems behavior, not just model quality. Infrastructure design determines throughput, fault tolerance, and the practical ceiling of capability.",
  },
  {
    slug: "network-scale-optimization",
    title: "Network-Scale Optimization",
    summary:
      "Optimization and control architectures for large, interconnected operational networks where latency, capacity, and trade-offs must be continuously managed.",
    importance:
      "At network scale, local decisions generate global effects. Robust optimization architecture enables stable performance under changing demand and incomplete information.",
  },
  {
    slug: "agentic-platforms",
    title: "Agentic Platforms",
    summary:
      "Platform-level architecture for multi-step, tool-using agents with policy boundaries, execution controls, and operational observability.",
    importance:
      "Agentic capability without platform discipline becomes brittle. This domain is architecturally important because it converts autonomous capability into governed, auditable system behavior.",
  },
  {
    slug: "recommendation-and-forecasting",
    title: "Recommendation and Forecasting Systems",
    summary:
      "Systems that combine statistical learning, feedback loops, and decision interfaces to improve planning and prioritization in dynamic environments.",
    importance:
      "Forecasts and recommendations influence real operating decisions. Their architecture must handle drift, uncertainty, and human override without losing decision quality.",
  },
];
