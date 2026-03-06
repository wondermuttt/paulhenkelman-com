import Link from "next/link";

import { siteConfig, socialLabels, type SocialKey } from "@/content/site";

type SocialLinksProps = {
  className?: string;
  direction?: "row" | "column";
};

export function SocialLinks({ className, direction = "row" }: SocialLinksProps) {
  return (
    <ul
      className={`${direction === "row" ? "flex flex-wrap gap-4" : "flex flex-col gap-3"} ${className ?? ""}`.trim()}
    >
      {siteConfig.socialLabelOrder.map((key) => {
        const href = siteConfig.socialLinks[key];
        const label = socialLabels[key as SocialKey];

        return (
          <li key={key}>
            <Link
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-neutral-700 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700"
              aria-label={`Open ${label} profile`}
            >
              {label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
