import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      {...props}
      className="mt-10 text-2xl leading-tight font-semibold text-neutral-950 first:mt-0"
    />
  ),
  h3: (props) => <h3 {...props} className="mt-8 text-xl leading-tight font-semibold text-neutral-900" />,
  p: (props) => <p {...props} className="mt-4 text-base leading-relaxed text-neutral-700" />,
  ul: (props) => <ul {...props} className="mt-4 list-disc space-y-2 pl-6 text-neutral-700" />,
  ol: (props) => <ol {...props} className="mt-4 list-decimal space-y-2 pl-6 text-neutral-700" />,
  li: (props) => <li {...props} className="leading-relaxed" />,
  blockquote: (props) => (
    <blockquote {...props} className="mt-6 border-l-2 border-neutral-400 pl-4 text-neutral-700 italic" />
  ),
  a: (props) => (
    <a
      {...props}
      className="underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-950"
    />
  ),
  code: (props) => (
    <code
      {...props}
      className="rounded bg-neutral-100 px-1.5 py-0.5 font-mono text-[0.9em] text-neutral-800"
    />
  ),
  table: (props) => (
    <div className="mt-6 overflow-x-auto">
      <table {...props} className="w-full border-collapse text-sm" />
    </div>
  ),
  thead: (props) => <thead {...props} className="border-b border-neutral-300" />,
  th: (props) => (
    <th
      {...props}
      className="px-3 py-2 text-left text-xs font-semibold tracking-[0.06em] text-neutral-500 uppercase"
    />
  ),
  td: (props) => (
    <td {...props} className="border-b border-neutral-200 px-3 py-2 text-neutral-700" />
  ),
  img: (props) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} className="mt-6 w-full rounded-xl border border-black/10 bg-white" />
  ),
  hr: (props) => <hr {...props} className="mt-10 border-neutral-200" />,
};
