# Synorbit website

Marketing site for Synorbit, a website and web application development studio.

Built with Next.js 16 (App Router, Cache Components), TypeScript (strict), Material UI 9 for
theming and form controls, CSS Modules for layout, Motion for the portfolio filter animation,
React Hook Form + Zod for the enquiry form, and Lucide icons.

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev                  # http://localhost:3000
```

| Command         | What it does                     |
| --------------- | -------------------------------- |
| `npm run dev`   | Development server               |
| `npm run build` | Production build                 |
| `npm start`     | Serve the production build       |
| `npm run lint`  | ESLint (includes React Compiler rules) |
| `npx tsc --noEmit` | Type check                    |

## Environment variables

| Variable               | Required | Purpose |
| ---------------------- | -------- | ------- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Permanent domain for canonical URLs, sitemap, robots, and Open Graph. Defaults to `https://synorbit.vercel.app`. |
| `RESEND_API_KEY`       | For the form | Resend API key. Server-side only. |
| `CONTACT_TO_EMAIL`     | For the form | Inbox that receives enquiries. |
| `CONTACT_FROM_EMAIL`   | Recommended | Sender on a domain verified in Resend, e.g. `Synorbit Website <hello@yourdomain.com>`. |

Set these in Vercel under **Project → Settings → Environment Variables**.

### How the enquiry form works

`/contact` posts to `POST /api/contact` (`src/app/api/contact/route.ts`), which:

1. Re-validates every field with the same Zod schema the browser uses (`src/lib/validation.ts`).
2. Silently drops submissions that fill the hidden honeypot field or arrive within 3 seconds of the form loading.
3. Applies a best-effort rate limit of 5 requests per 10 minutes per IP address. This is held in memory, so on serverless hosting each instance counts separately. For a strict limit, back it with a shared store such as Vercel KV or Upstash.
4. Emails the enquiry through Resend's HTTP API, with `reply_to` set to the sender's address.

**Until `RESEND_API_KEY` and `CONTACT_TO_EMAIL` are set, enquiries are not sent.** The API returns `503 not_configured` and the form tells the visitor so, keeping their input and offering a pre-filled `mailto:` link instead.

## Project structure

```
src/
  app/                 Routes: /, /about, /services, /work, /work/[slug], /contact, /api/contact
                       plus robots.ts, sitemap.ts, manifest.ts, opengraph-image.tsx, not-found.tsx
  components/
    layout/            Navbar, MobileNavigation (lazy-loaded drawer), Footer
    sections/          Homepage sections, HeroVisual (CSS-only illustration), FinalCTA
    portfolio/         ProjectCard, ProjectMockup (CSS-drawn previews), WorkGrid (filters)
    contact/           ContactForm
    effects/           Galaxy (React Bits WebGL starfield, ported to TypeScript)
    services/          Service icon map
    ui/                ButtonLink, Logo, PageHeader
  data/                services.ts, projects.ts (content lives here)
  lib/                 site.ts (verified business details), validation.ts, metadata.ts,
                       enquiry-delivery.ts, utils.ts
  theme/               MUI theme + registry (mirrors the CSS tokens in app/globals.css)
  proxy.ts             Returns a real 404 for unknown /work/<slug> URLs
```

### Styling notes

- Design tokens live as CSS custom properties in `src/app/globals.css` and are mirrored in `src/theme/theme.ts`. Change both together.
- Cascade layers: `base` (resets) < `mui` (MUI/Emotion) < unlayered CSS Modules. Component styles therefore override MUI without `!important`, and resets never clobber MUI internals.
- The homepage hero background is the React Bits `Galaxy` WebGL starfield (`src/components/effects/Galaxy.tsx`), configured in `src/components/sections/HeroGalaxy.tsx`. It mounts only after page load when the browser is idle, uses lighter settings on phones, freezes for `prefers-reduced-motion`, and shows nothing (the hero still works) where WebGL2 is unavailable.
- Motion respects `prefers-reduced-motion`. The hero animation is pure CSS, so it costs no client JavaScript.

## Editing content

- **Contact details:** `src/lib/site.ts`. Only add details the business has confirmed.
- **Services:** `src/data/services.ts`. The homepage shows the four core services; the Services page shows all of them.
- **Portfolio:** `src/data/projects.ts`. `kind: "concept"` entries are labelled as concept studies everywhere they appear. Add client work only with the client's permission, and never add outcome metrics that weren't measured. To use real screenshots, replace `ProjectMockup` with `next/image`.
- **Budget and timeline options:** `src/lib/validation.ts`. These are indicative ranges, not published prices.

## Deployment

Deploy as a standard Next.js project on Vercel; no custom build settings are needed. After deploying to the permanent domain, set `NEXT_PUBLIC_SITE_URL` and redeploy so canonical and Open Graph URLs point to it.
