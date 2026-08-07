import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { aboutContent } from "@/content/about";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "Paul Henkelman's path from U.S. Navy technical operations through thirty years of systems, networking, and software to leading enterprise AI strategy and architecture at Fortune 100 scale.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="About"
        title="Thirty Years of Systems, a Decade of AI at Scale"
        description="The background behind the systems on this site."
      />

      <Section title="Overview">
        <p className="max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg">
          {aboutContent.overview}
        </p>
      </Section>

      <Section
        title="Perspective"
        className="border-t border-black/10 bg-[#faf9f6]"
      >
        <p className="max-w-3xl text-base leading-relaxed text-neutral-700 sm:text-lg">
          {aboutContent.architecturePerspective}
        </p>
      </Section>

      <Section title="Career" className="border-t border-black/10">
        <div className="max-w-4xl space-y-6">
          {aboutContent.career.map((role) => (
            <article
              key={role.period}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg leading-snug font-semibold text-neutral-950 sm:text-xl">
                  {role.title}
                </h3>
                <p className="text-sm font-medium text-neutral-500">{role.period}</p>
              </div>
              <p className="mt-1 text-sm font-medium text-neutral-600">{role.org}</p>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{role.detail}</p>
            </article>
          ))}
        </div>
      </Section>

      <Section title="Education" className="border-t border-black/10 bg-[#faf9f6]">
        <div className="max-w-4xl space-y-4">
          {aboutContent.education.map((item) => (
            <article
              key={item.degree}
              className="rounded-2xl border border-black/10 bg-white p-6"
            >
              <h3 className="text-lg leading-snug font-semibold text-neutral-950">{item.degree}</h3>
              <p className="mt-1 text-sm font-medium text-neutral-600">{item.school}</p>
              {item.detail ? (
                <p className="mt-2 text-sm leading-relaxed text-neutral-700">{item.detail}</p>
              ) : null}
            </article>
          ))}
        </div>
      </Section>

      <Section title="Approach" className="border-t border-black/10">
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
