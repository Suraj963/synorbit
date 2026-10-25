import { NextResponse, type NextRequest } from "next/server";
import { projects } from "@/data/projects";

const knownSlugs = new Set(projects.map((p) => p.slug));

/**
 * Unknown /work/<slug> pages would otherwise stream the not-found UI with a
 * 200 status. Rewriting to an unmatched path makes them a real 404.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split("/")[2];
  if (slug && !knownSlugs.has(decodeURIComponent(slug))) {
    return NextResponse.rewrite(new URL("/__not-found", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/work/:slug",
};
