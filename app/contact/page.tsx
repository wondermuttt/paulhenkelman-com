import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Connect with Paul Henkelman about AI architecture, agentic systems, speaking, and collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Get in Touch"
        description="For conversations about AI architecture, agentic systems, speaking, or collaboration."
      />

      <Section>
        <article className="max-w-3xl rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="text-xl font-semibold text-neutral-950">Channels</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            LinkedIn is the fastest way to reach me. Email works too:{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-4 hover:decoration-neutral-600"
            >
              {siteConfig.email}
            </a>
            .
          </p>

          <div className="mt-6 inline-flex rounded-2xl border border-neutral-200 bg-[#f8f7f3] p-3">
            <SocialLinks
              direction="row"
              include={["linkedin", "github", "medium"] as const}
              showLabel={false}
              className="gap-2"
              iconButtonClassName="h-12 w-12 rounded-xl border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md"
              iconClassName="h-5 w-5"
            />
          </div>

          <p className="mt-4 text-xs text-neutral-600">
            LinkedIn: /in/paulhenkelman · GitHub: paulhenkelman · Medium: @paulhenkelman
          </p>
        </article>
      </Section>
    </>
  );
}
