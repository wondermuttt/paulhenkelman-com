import Link from "next/link";

import type { SystemsDomain } from "@/content/systems";

type SystemsDomainCardProps = {
  domain: SystemsDomain;
};

export function SystemsDomainCard({ domain }: SystemsDomainCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5">
      <h3 className="text-xl leading-snug font-semibold text-neutral-950">{domain.title}</h3>
      <p className="mt-1 text-xs font-medium tracking-[0.08em] text-neutral-500 uppercase">
        {domain.meta}
      </p>
      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{domain.summary}</p>
      <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-relaxed text-neutral-600">
        {domain.importance}
      </p>
      {domain.link ? (
        <p className="mt-auto pt-4">
          <Link
            href={domain.link.href}
            target="_blank"
            rel="noreferrer noopener"
            className="text-sm font-medium text-neutral-900 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-950 hover:decoration-neutral-600"
          >
            {domain.link.label} ↗
          </Link>
        </p>
      ) : null}
    </article>
  );
}
