import type { SystemsDomain } from "@/content/systems";

type SystemsDomainCardProps = {
  domain: SystemsDomain;
};

export function SystemsDomainCard({ domain }: SystemsDomainCardProps) {
  return (
    <article className="h-full rounded-2xl border border-black/10 bg-white p-6 shadow-sm shadow-black/5">
      <h3 className="text-xl leading-snug font-semibold text-neutral-950">{domain.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-neutral-700">{domain.summary}</p>
      <p className="mt-4 border-t border-black/10 pt-4 text-sm leading-relaxed text-neutral-600">
        {domain.importance}
      </p>
    </article>
  );
}
