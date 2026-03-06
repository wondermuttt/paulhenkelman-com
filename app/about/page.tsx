import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { aboutContent } from "@/content/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "How Paul Henkelman approaches AI architecture, distributed systems, operational reliability, and model epistemology.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="Architecture as a Long-Horizon Discipline"
        description="A systems perspective on AI capability, operational reliability, and the structural decisions that determine whether intelligent platforms endure."
      />

      <Section title="Overview">
        <p className="max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg">
          {aboutContent.overview}
        </p>
      </Section>

      <Section
        title="Architecture Perspective"
        className="border-t border-black/10 bg-[#faf9f6]"
      >
        <p className="max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg">
          {aboutContent.architecturePerspective}
        </p>
      </Section>

      <Section title="Areas of Interest" className="border-t border-black/10">
        <ul className="max-w-3xl space-y-3">
          {aboutContent.interests.map((interest) => (
            <li
              key={interest}
              className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-relaxed text-neutral-700 sm:text-base"
            >
              {interest}
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Approach" className="border-t border-black/10 bg-[#faf9f6]">
        <div className="grid gap-5 md:grid-cols-3">
          {aboutContent.approach.map((item) => (
            <article key={item.title} className="rounded-2xl border border-black/10 bg-white p-6">
              <h3 className="text-lg font-semibold text-neutral-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{item.detail}</p>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
