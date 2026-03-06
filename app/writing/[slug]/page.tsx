import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Section } from "@/components/ui/section";
import { buildMetadata } from "@/lib/metadata";
import { getWritingBySlug, getWritingEntries } from "@/lib/writing";

type WritingArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export async function generateStaticParams() {
  const entries = await getWritingEntries();

  return entries.map((entry) => ({
    slug: entry.slug,
  }));
}

export async function generateMetadata({ params }: WritingArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getWritingBySlug(slug).catch(() => null);

  if (!article) {
    return buildMetadata({
      title: "Writing",
      description: "Writing entries on AI architecture and distributed systems.",
      path: "/writing",
    });
  }

  return buildMetadata({
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    path: `/writing/${slug}`,
  });
}

export default async function WritingArticlePage({ params }: WritingArticlePageProps) {
  const { slug } = await params;
  const article = await getWritingBySlug(slug).catch(() => null);

  if (!article) {
    notFound();
  }

  return (
    <Section>
      <article className="mx-auto max-w-3xl rounded-2xl border border-black/10 bg-white p-8 sm:p-10">
        <p className="text-xs font-semibold tracking-[0.12em] text-neutral-500 uppercase">
          {article.frontmatter.status} · {formatDate(article.frontmatter.publishedAt)}
        </p>
        <h1 className="mt-3 text-3xl leading-tight font-semibold text-neutral-950 sm:text-4xl">
          {article.frontmatter.title}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-neutral-700">
          {article.frontmatter.description}
        </p>

        <div className="mt-10">{article.content}</div>
      </article>
    </Section>
  );
}
