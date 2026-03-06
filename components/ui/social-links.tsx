import Link from "next/link";

import { siteConfig, socialLabels, type SocialKey } from "@/content/site";

type SocialLinksProps = {
  className?: string;
  direction?: "row" | "column";
  include?: readonly SocialKey[];
  showLabel?: boolean;
  iconButtonClassName?: string;
  iconClassName?: string;
};

type SocialIconProps = {
  social: SocialKey;
  className?: string;
};

function SocialIcon({ social, className }: SocialIconProps) {
  const svgProps = {
    viewBox: "0 0 24 24",
    className,
    "aria-hidden": true as const,
  };

  switch (social) {
    case "linkedin":
      return (
        <svg
          {...svgProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );

    case "github":
      return (
        <svg
          {...svgProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3.3-.4 6.8-1.6 6.8-7.2A5.6 5.6 0 0 0 19.4 3.5 5.2 5.2 0 0 0 19.3 1S17.7.5 14 3.1a13.4 13.4 0 0 0-7 0C3.3.5 1.7 1 1.7 1a5.2 5.2 0 0 0-.1 2.5A5.6 5.6 0 0 0 .2 7.4c0 5.6 3.5 6.8 6.8 7.2a4.8 4.8 0 0 0-1 3.2v4" />
          <path d="M9 18c-4.5 2-5-2-7-2" />
        </svg>
      );

    case "x":
      return (
        <svg {...svgProps} fill="currentColor">
          <path d="M18.244 2h3.308l-7.226 8.26L22.83 22h-6.658l-5.214-6.817L4.99 22H1.68l7.73-8.835L1.254 2h6.827l4.713 6.231L18.244 2Zm-1.167 18h1.833L7.08 3.897H5.114L17.077 20Z" />
        </svg>
      );

    case "medium":
      return (
        <svg
          {...svgProps}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="6.5" cy="12" r="4.5" />
          <ellipse cx="14.5" cy="12" rx="2.8" ry="4.5" />
          <line x1="20" y1="7.5" x2="20" y2="16.5" />
        </svg>
      );

    default:
      return null;
  }
}

export function SocialLinks({
  className,
  direction = "row",
  include,
  showLabel = true,
  iconButtonClassName,
  iconClassName,
}: SocialLinksProps) {
  const keys = include ?? siteConfig.socialLabelOrder;
  const isIconOnly = !showLabel;
  const defaultIconButtonClassName =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-300 text-neutral-700 transition-colors hover:border-neutral-500 hover:bg-neutral-50 hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700";

  return (
    <ul
      className={`${
        direction === "row" ? "flex flex-wrap items-center gap-3" : "flex flex-col gap-3"
      } ${className ?? ""}`.trim()}
    >
      {keys.map((key) => {
        const href = siteConfig.socialLinks[key];
        const label = socialLabels[key];

        return (
          <li key={key}>
            <Link
              href={href}
              target="_blank"
              rel="noreferrer noopener"
              className={
                isIconOnly
                  ? `${defaultIconButtonClassName} ${iconButtonClassName ?? ""}`.trim()
                  : "inline-flex items-center gap-2 text-sm text-neutral-700 underline decoration-neutral-400 underline-offset-4 transition-colors hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-neutral-700"
              }
              aria-label={`Open ${label} profile`}
              title={label}
            >
              <SocialIcon
                social={key}
                className={isIconOnly ? iconClassName ?? "h-5 w-5" : "h-4 w-4"}
              />
              {showLabel ? <span>{label}</span> : <span className="sr-only">{label}</span>}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
