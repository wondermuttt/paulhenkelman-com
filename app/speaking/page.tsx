import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { speakingContent, speakingEngagements } from "@/content/speaking";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Speaking",
  description:
    "Invited talks by Paul Henkelman on enterprise AI, agentic systems, AI & data governance, and world modeling, at CableLabs and SCTE events.",
  path: "/speaking",
});

export default function SpeakingPage() {
  return (
    <>
      <PageIntro
        eyebrow="Speaking"
        title={speakingContent.pageTitle}
        description={speakingContent.intro}
      />

      <Section>
        <div className="max-w-4xl space-y-6">
          {speakingEngagements.map((talk) => (
            <article
              key={talk.slug}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5 sm:p-8"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h2 className="text-xl leading-snug font-semibold text-neutral-950 sm:text-2xl">
                  {talk.event}
                </h2>
                <p className="text-sm font-medium text-neutral-500">{talk.date}</p>
              </div>
              <p className="mt-1 text-xs font-medium tracking-[0.08em] text-neutral-500 uppercase">
                {talk.topic} · {talk.location}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base">
                {talk.summary}
              </p>
              <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-relaxed text-neutral-600">
                Audience: {talk.audience}
              </p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
