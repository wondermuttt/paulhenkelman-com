type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-black/10 bg-[#f6f4ef] py-16 sm:py-20">
      <div className="mx-auto w-full max-w-4xl px-6">
        {eyebrow ? (
          <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">
            {eyebrow}
          </p>
        ) : null}
        <h1 className="text-4xl leading-tight font-semibold text-neutral-950 sm:text-5xl">{title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-neutral-700">{description}</p>
      </div>
    </section>
  );
}
