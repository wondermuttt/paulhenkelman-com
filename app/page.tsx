import Image from "next/image";
import Link from "next/link";

import { CardGrid } from "@/components/ui/card-grid";
import { CtaSection } from "@/components/ui/cta-section";
import { Section } from "@/components/ui/section";
import { SystemsDomainCard } from "@/components/ui/systems-domain-card";
import { WritingCard } from "@/components/ui/writing-card";
import { homeContent } from "@/content/home";
import { systemsDomains } from "@/content/systems";
import { getWritingEntries } from "@/lib/writing";

export default async function HomePage() {
  const writingEntries = await getWritingEntries();

  return (
    <>
      <section className="border-b border-black/10 bg-[#f6f4ef] py-20 sm:py-28">
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-10">
            <div className="max-w-4xl">
              <p className="mb-4 text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                {homeContent.hero.headerLine}
              </p>
              <div className="mb-4">
                <p className="text-sm font-semibold text-neutral-900">{homeContent.hero.identityName}</p>
                <p className="text-xs tracking-[0.12em] text-neutral-500 uppercase">
                  {homeContent.hero.identityRole}
                </p>
              </div>
              <h1 className="text-4xl leading-tight font-semibold text-neutral-950 sm:text-6xl sm:leading-[1.08]">
                {homeContent.hero.headline}
              </h1>
              <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-700 sm:text-xl">
                {homeContent.hero.supporting}
              </p>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-neutral-600 sm:text-base">
                {homeContent.hero.credibilitySignal}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-3">
                {homeContent.hero.primaryCtas.map((cta) => (
                  <Link
                    key={cta.href}
                    href={cta.href}
                    className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700"
                  >
                    {cta.label}
                  </Link>
                ))}
                <Link
                  href={homeContent.hero.secondaryCta.href}
                  className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-500 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700"
                >
                  {homeContent.hero.secondaryCta.label}
                </Link>
              </div>
            </div>

            <div className="mx-auto w-full max-w-xs lg:mx-0 lg:justify-self-end">
              <Image
                src="/images/paul-headshot-transparent-cropped.png"
                alt="Headshot of Paul Henkelman"
                width={1036}
                height={920}
                priority
                className="h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      <Section
        id="pillars"
        eyebrow="Core Focus"
        title="Architectural Priorities"
        intro="Domain depth, operational discipline, and systems-level design principles for AI capability that must perform under production conditions."
      >
        <CardGrid columns={2}>
          {homeContent.pillars.map((pillar) => (
            <article
              key={pillar.title}
              className="rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5"
            >
              <h3 className="text-xl font-semibold text-neutral-950">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700">{pillar.description}</p>
            </article>
          ))}
        </CardGrid>
      </Section>

      <Section
        id="domains"
        eyebrow="Systems"
        title="Architectural Domains"
        intro="Representative territory across AI architecture, distributed infrastructure, and operational intelligence systems."
        className="border-t border-black/10 bg-[#faf9f6]"
      >
        <CardGrid>
          {systemsDomains.map((domain) => (
            <SystemsDomainCard key={domain.slug} domain={domain} />
          ))}
        </CardGrid>
      </Section>

      <Section
        id="writing"
        eyebrow="Writing"
        title="Notes in Progress"
        intro={homeContent.writingIntro}
        className="border-t border-black/10"
      >
        <CardGrid>
          {writingEntries.slice(0, 3).map((entry) => (
            <WritingCard key={entry.slug} entry={entry} />
          ))}
        </CardGrid>
      </Section>

      <Section
        id="about-preview"
        eyebrow="About"
        title="A Systems-Oriented Perspective"
        intro={homeContent.aboutPreview}
        className="border-t border-black/10 bg-[#faf9f6]"
      >
        <Link
          href="/about"
          className="inline-flex items-center rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-500 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700"
        >
          Read About
        </Link>
      </Section>

      <CtaSection
        title="Connect"
        description={homeContent.connect}
        primary={{ label: "Contact", href: "/contact" }}
        secondary={{ label: "Explore Writing", href: "/writing" }}
      />
    </>
  );
}
