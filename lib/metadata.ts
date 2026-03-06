import type { Metadata } from "next";

import { siteConfig } from "@/content/site";

export const defaultOgImage = "/og/paulhenkelman-og.svg";

export const baseMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: "%s | Paul Henkelman",
  },
  description: siteConfig.description,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: "Paul Henkelman social preview image",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    creator: siteConfig.xHandle,
    images: [defaultOgImage],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

type MetadataInput = {
  title: string;
  description: string;
  path: string;
};

export function buildMetadata({ title, description, path }: MetadataInput): Metadata {
  const fullTitle = `${title} | Paul Henkelman`;
  const absoluteUrl = new URL(path, siteConfig.url).toString();

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title: fullTitle,
      description,
      url: absoluteUrl,
      images: [
        {
          url: defaultOgImage,
          width: 1200,
          height: 630,
          alt: "Paul Henkelman social preview image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: siteConfig.xHandle,
      title: fullTitle,
      description,
      images: [defaultOgImage],
    },
  };
}
