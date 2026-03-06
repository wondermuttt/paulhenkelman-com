import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SystemsDomainCard } from "@/components/ui/systems-domain-card";
import { systemsDomains } from "@/content/systems";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Systems",
  description:
    "Territory map of architectural domains across AI operational systems, distributed infrastructure, optimization, agentic platforms, and forecasting systems.",
  path: "/systems",
});

export default function SystemsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Systems"
        title="Architectural Territory"
        description="A domain map of production-scale system architecture: reliability, orchestration, observability, and controlled operational behavior under real conditions."
      />

      <Section
        intro="These domains represent recurring architectural problems where model capability must be integrated with operational constraints, systems engineering, and organizational scale."
      >
        <div className="grid gap-5 md:grid-cols-2">
          {systemsDomains.map((domain) => (
            <SystemsDomainCard key={domain.slug} domain={domain} />
          ))}
        </div>
      </Section>
    </>
  );
}
