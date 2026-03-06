import type { Metadata } from "next";

import { PageIntro } from "@/components/ui/page-intro";
import { Section } from "@/components/ui/section";
import { SocialLinks } from "@/components/ui/social-links";
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
        <article className="max-w-3xl rounded-2xl border border-black/10 bg-white p-6">
          <h2 className="text-xl font-semibold text-neutral-950">Preferred channels</h2>
          <p className="mt-3 text-sm leading-relaxed text-neutral-700">
            The fastest way to connect is through LinkedIn or X. If you&apos;d like to talk about AI
            architecture, distributed systems, or collaboration, I&apos;d be glad to hear from you.
          </p>

          <div className="mt-6 inline-flex rounded-2xl border border-neutral-200 bg-[#f8f7f3] p-3">
            <SocialLinks
              direction="row"
              include={["linkedin", "x"] as const}
              showLabel={false}
              className="gap-2"
              iconButtonClassName="h-12 w-12 rounded-xl border-neutral-200 bg-white text-neutral-700 shadow-sm transition-all hover:-translate-y-0.5 hover:border-neutral-400 hover:shadow-md"
              iconClassName="h-5 w-5"
            />
          </div>

          <p className="mt-4 text-xs text-neutral-600">
            LinkedIn: /in/paulhenkelman · X: @paul_henkelman
          </p>
        </article>
      </Section>
    </>
  );
}
