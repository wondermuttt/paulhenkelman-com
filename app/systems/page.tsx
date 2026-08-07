import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SystemsDomainCard } from "@/components/ui/systems-domain-card";
import { systemsDomains } from "@/content/systems";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Systems",
  description:
    "The systems Paul Henkelman has designed and delivered: agentic AI services in production, AIOps at 30M+ subscriber scale, GPUaaS, open-source agent memory, and applied world-model research.",
  path: "/systems",
});

export default function SystemsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Systems"
        title="Systems Built and Running"
        description="What's been built, and the scale it runs at."
      />

      <Section>
        <div className="grid gap-5 md:grid-cols-2">
          {systemsDomains.map((domain) => (
            <SystemsDomainCard key={domain.slug} domain={domain} />
          ))}
        </div>
      </Section>
    </>
  );
}
