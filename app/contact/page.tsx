import type { Metadata } from "next";
import Link from "next/link";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
import { siteConfig } from "@/content/site";
import { buildMetadata } from "@/lib/metadata";

export const metadata: Metadata = buildMetadata({
  title: "Contact",
  description:
    "Connect with Paul Henkelman for conversations on AI architecture, distributed systems, speaking, and thoughtful collaboration.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contact"
        title="Open to Thoughtful Conversation"
        description="Paul is open to conversations related to AI architecture, distributed systems, speaking opportunities, and thoughtful collaboration."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-[1.5fr_1fr]">
          <article className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-xl font-semibold text-neutral-950">Preferred channels</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              The links below are centralized in a single configuration file for easy updates as this
              platform evolves.
            </p>
            <div className="mt-6">
              <SocialLinks direction="column" />
            </div>
          </article>

          <article className="rounded-2xl border border-black/10 bg-white p-6">
            <h2 className="text-xl font-semibold text-neutral-950">Email</h2>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">
              Placeholder address for direct outreach:
            </p>
            <Link
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex rounded-full border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-500 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700"
            >
              {siteConfig.email}
            </Link>
          </article>
        </div>
      </Section>
    </>
  );
}
