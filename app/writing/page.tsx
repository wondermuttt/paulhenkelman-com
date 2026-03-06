import type { Metadata } from "next";

import { CardGrid } from "@/components/ui/card-grid";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { WritingCard } from "@/components/ui/writing-card";
import { writingContent } from "@/content/writing";
import { buildMetadata } from "@/lib/metadata";
import { getWritingEntries } from "@/lib/writing";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description:
    "Essays and notes on production AI architecture, distributed systems, agentic platforms, model epistemology, and operational reliability.",
  path: "/writing",
});

export default async function WritingPage() {
  const entries = await getWritingEntries();

  return (
    <>
      <PageIntro
        eyebrow="Writing"
        title={writingContent.pageTitle}
        description={writingContent.intro}
      />

      <Section intro={writingContent.statusNote}>
        <CardGrid>
          {entries.map((entry) => (
            <WritingCard key={entry.slug} entry={entry} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
}
