import Link from "next/link";

import type { WritingEntry } from "@/lib/writing";

type WritingCardProps = {
  entry: WritingEntry;
};

function formatDate(dateString: string) {
  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function WritingCard({ entry }: WritingCardProps) {
  return (
    <article className="h-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5">
      <p className="text-xs font-medium tracking-[0.12em] text-neutral-500 uppercase">
        {entry.status} · {formatDate(entry.publishedAt)}
      </p>
      <h3 className="mt-3 text-xl leading-snug font-semibold text-neutral-950">
        <Link
          href={`/writing/${entry.slug}`}
          className="underline decoration-transparent underline-offset-4 transition-colors hover:decoration-neutral-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-700"
        >
          {entry.title}
        </Link>
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{entry.description}</p>
      <p className="mt-5 text-sm font-medium text-neutral-800">Read note</p>
    </article>
  );
}
