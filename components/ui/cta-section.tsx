import Link from "next/link";

type Cta = {
  label: string;
  href: string;
};

type CtaSectionProps = {
  title: string;
  description: string;
  primary: Cta;
  secondary?: Cta;
};

export function CtaSection({ title, description, primary, secondary }: CtaSectionProps) {
  return (
    <section className="border-t border-black/10 bg-[#f6f4ef] py-16 sm:py-20">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl leading-tight font-semibold text-neutral-950 sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg">{description}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link
            href={primary.href}
            className="rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-800 transition-colors hover:border-neutral-500 hover:bg-neutral-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
