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
};
