import Link from "next/link";

import { Section } from "@/components/ui/section";

export default function NotFound() {
  return (
    <Section>
      <div className="mx-auto max-w-2xl rounded-2xl border border-black/10 bg-white p-8 text-center">
        <p className="text-xs font-semibold tracking-[0.14em] text-neutral-500 uppercase">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-neutral-950">Page not found</h1>
        <p className="mt-4 text-neutral-700">
          The page you requested does not exist or has moved.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex rounded-full bg-neutral-900 px-5 py-2.5 text-sm font-medium text-neutral-50 transition-colors hover:bg-neutral-700"
        >
          Return home
        </Link>
      </div>
    </Section>
  );
}
