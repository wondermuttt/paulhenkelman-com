import type { Metadata } from "next";

import { CardGrid } from "@/components/ui/card-grid";
import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { WritingCard } from "@/components/ui/writing-card";
import { writingContent } from "@/content/writing";
import { buildMetadata } from "@/lib/metadata";
import { getWritingListItems } from "@/lib/writing";

export const metadata: Metadata = buildMetadata({
  title: "Writing",
  description:
    "Essays by Paul Henkelman on how AI systems actually work and what it takes to run them in production, adapted from the AI curriculum he writes and teaches.",
  path: "/writing",
});

export default async function WritingPage() {
  const entries = await getWritingListItems();

  return (
    <>
      <PageIntro
        eyebrow="Writing"
        title={writingContent.pageTitle}
        description={writingContent.intro}
      />

      <Section>
        <CardGrid>
          {entries.map((entry) => (
            <WritingCard key={entry.href} entry={entry} />
          ))}
        </CardGrid>
      </Section>
    </>
  );
}
