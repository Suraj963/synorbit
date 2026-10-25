import type { Metadata } from "next";
import { site } from "./site";

/**
 * Per-page metadata. Next.js replaces (rather than merges) a parent's
 * openGraph object, so shared fields are repeated here for every page.
 */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title?: string;
  description: string;
  path: string;
}): Metadata {
  const ogTitle = title ? `${title} | ${site.name}` : `${site.name} | Website and Web Application Development`;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      siteName: site.name,
      locale: "en_IN",
      title: ogTitle,
      description,
      url: path,
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Synorbit" }],
    },
    twitter: { card: "summary_large_image", title: ogTitle, description },
  };
}
