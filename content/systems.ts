export type SystemsDomain = {
  slug: string;
  title: string;
  meta: string;
  summary: string;
  importance: string;
  link?: {
    href: string;
    label: string;
  };
};

export const systemsDomains: SystemsDomain[] = [
  {
    slug: "streaming-concierge",
    title: "Streaming Concierge",
    meta: "Charter's first customer-facing agentic AI service",
    summary:
      "Conceived the solution, built the fully functional prototype, and designed the production architecture (LangGraph, LangChain, custom and standardized MCP, Playwright-MCP) for an agentic system that executes service-activation steps on the customer's behalf, reducing roughly 2 hours of customer effort to about 2 minutes.",
    importance:
      "Demonstrated to all leadership levels including the CEO; guided the cross-team build to production launch serving thousands of customers per day. The design was adopted as Charter's reference architecture governing ongoing agentic development.",
  },
  {
    slug: "aiops-platform",
    title: "AIOps at National Scale",
    meta: "Detection, causal inference, prediction, and automated remediation · 30M+ subscribers",
    summary:
      "Designed the detection, causal-inference, prediction, and automated-remediation platform (Random Cut Forest, MAD-GAN, Bayesian networks) for customer-facing network issues across a 30M+ subscriber footprint; delivered the full PoC and implementation design and led multi-department development at enterprise scale.",
    importance:
      "Builds on pioneering Comcast's enterprise AIOps platform: ML alerting and event-correlation pipelines that cut false-positive alerts by 92%, petabyte-scale telemetry architecture, and automated anomaly response that materially reduced MTTR.",
  },
  {
    slug: "gpuaas",
    title: "GPUaaS: AI Infrastructure as a Business",
    meta: "Idea-to-inference platform on edge GPU infrastructure",
    summary:
      "Lead inference and MLOps/LLMOps architecture for a GPU-leasing initiative: an idea-to-inference platform with continuous training and enhancement loops, built to serve external AI workloads at commercial scale.",
    importance:
      "Personally direct large-scale training on EKS and SageMaker: 100+ LLM fine-tuning runs across Qwen and other open-weight families, full LLM pretraining, and world-model training.",
  },
  {
    slug: "noetix",
    title: "Noetix",
    meta: "Open source · sole author · MIT license",
    summary:
      "An open-source agentic memory system providing embedding-based semantic search and GraphRAG, wrapped in MCP as first-class agent memory.",
    importance:
      "Independently developed and in internal use at Charter. Agent memory is usually the weakest piece of an agentic architecture; Noetix gives it the same engineering weight as the agent itself.",
    link: {
      href: "https://github.com/paulhenkelman/noetix",
      label: "View on GitHub",
    },
  },
  {
    slug: "agentic-security",
    title: "Agentic Security Architecture",
    meta: "Patent disclosure filed",
    summary:
      "Agent-safe sensitive-data handling: security architecture for agentic systems that must work with credentials and PII under guardrail and human-in-the-loop patterns built for dynamic workflows.",
    importance:
      "A patent disclosure has been filed; technical detail will follow when the application publishes. The underlying problem is general: agentic systems inherit every data-exposure risk of the tools they orchestrate, and closing that gap is an architecture problem.",
  },
  {
    slug: "network-world-models",
    title: "Network Language World Models",
    meta: "Applied research · presented to GVP/SVP audiences",
    summary:
      "Research applying language world models (LWMs) to network management and automation, where agents require human-like operational intuition about how infrastructure actually behaves.",
    importance:
      "Presented at industry conference sessions, including the 2026 SCTE Rocky Mountain Symposium. World modeling is the likely next substrate for operational AI.",
  },
];
