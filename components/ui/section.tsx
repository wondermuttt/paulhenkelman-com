import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
};

export function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={`py-16 sm:py-20 ${className ?? ""}`.trim()}>
      <div className="mx-auto w-full max-w-6xl px-6">
        {(eyebrow || title || intro) && (
          <header className="mb-10 max-w-3xl">
            {eyebrow ? (
              <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
                {eyebrow}
              </p>
            ) : null}
            {title ? <h2 className="text-3xl leading-tight font-semibold text-neutral-950 sm:text-4xl">{title}</h2> : null}
            {intro ? <p className="mt-4 text-base leading-relaxed text-neutral-700 sm:text-lg">{intro}</p> : null}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
