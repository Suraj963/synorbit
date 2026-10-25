import type { Project, ProjectCategory } from "@/types/content";

/**
 * Portfolio entries.
 *
 * At the time of writing, no client case studies have been published.
 * "concept" projects are self-initiated design and engineering studies and
 * are labelled as such everywhere they appear. Replace or extend this list
 * with real client work (with the client's permission) as it becomes
 * available, and never add outcome metrics that haven't been measured.
 */
export const projects: Project[] = [
  {
    slug: "synorbit-website",
    name: "Synorbit website",
    kind: "in-house",
    categories: ["Websites", "UI/UX"],
    summary:
      "Our own studio website: a multi-page site designed and built in-house to explain what we do and take project enquiries.",
    overview:
      "The previous Synorbit site was a single page that listed three services and a contact form that opened an email draft. We redesigned it as a five-page site that explains each service in detail, shows how we work, and takes structured project enquiries.",
    challenge:
      "Visitors needed to understand quickly that Synorbit builds websites and web applications, see enough detail to judge whether we fit their project, and contact us without friction, on any screen size.",
    approach: [
      "Rewrote the content around the questions a prospective client asks: what do you build, how do you work, and how do I start?",
      "Built a dark, logo-derived colour system and a hero illustration of an application window in orbit, drawn in HTML and CSS rather than heavy images.",
      "Kept most pages as server-rendered React components, loading client-side JavaScript only for navigation, filtering, and the enquiry form.",
      "Added a validated enquiry form with server-side checks and spam protection.",
    ],
    deliverables: [
      "Content structure and copy",
      "Visual design system",
      "Five-page responsive website",
      "Enquiry form with server-side validation",
      "Metadata, sitemap, and structured data",
    ],
    technologies: ["Next.js", "TypeScript", "Material UI", "Motion", "Zod", "Vercel"],
    mockup: "studio",
    screenshot: "/images/work/synorbit-website.webp",
    liveUrl: "https://synorbit.vercel.app",
  },
  {
    slug: "clinic-booking-portal",
    name: "Clinic booking portal",
    kind: "concept",
    categories: ["Web Applications", "UI/UX"],
    summary:
      "A concept for a patient-facing booking portal with a front-desk view for managing the day's appointments.",
    overview:
      "A self-initiated study exploring how a small clinic could move appointment booking from phone calls to a simple web portal, without making it harder for patients who are less comfortable online.",
    challenge:
      "Patients should be able to see real availability and book in a few steps on a phone. Front-desk staff need a clear view of the day, with walk-ins and phone bookings recorded in the same place.",
    approach: [
      "Mapped two journeys: a patient booking a slot, and a receptionist managing the day.",
      "Designed a slot picker with large touch targets and plain-language labels.",
      "Planned role-based access so staff and patients see different views of the same data.",
      "Specified validation and confirmation steps to reduce double bookings.",
    ],
    deliverables: ["User flows", "Wireframes", "Interface designs", "Front-end prototype"],
    technologies: ["React", "TypeScript", "REST API design"],
    mockup: "booking",
    screenshot: "/images/work/careplus-clinic-dashboard.webp",
  },
  {
    slug: "operations-dashboard",
    name: "Operations dashboard",
    kind: "concept",
    categories: ["Web Applications"],
    summary:
      "A concept for an internal dashboard that replaces a set of shared spreadsheets for tracking orders and their status.",
    overview:
      "A self-initiated study of a common problem: a growing team tracking orders across several spreadsheets, with nobody sure which copy is current.",
    challenge:
      "The dashboard needed to show what needs attention today, let people update status in one place, and give managers a weekly summary without exporting data by hand.",
    approach: [
      "Designed a status-first layout where overdue and blocked items surface at the top.",
      "Defined roles for team members and managers with different permissions.",
      "Sketched the data model and API endpoints for orders, statuses, and comments.",
      "Built an interactive front-end prototype with sample data.",
    ],
    deliverables: ["Data model outline", "Interface designs", "Interactive prototype"],
    technologies: ["Next.js", "TypeScript", "PostgreSQL schema design"],
    mockup: "dashboard",
    screenshot: "/images/work/careplus-operations-dashboard.webp",
  },
  {
    slug: "local-retail-storefront",
    name: "Local retail storefront",
    kind: "concept",
    categories: ["Websites"],
    summary:
      "A concept website for a neighbourhood shop that wants to show its range online and take enquiries over WhatsApp.",
    overview:
      "A self-initiated study of a lightweight online presence for a small retailer that isn't ready for full e-commerce but wants customers to browse before visiting.",
    challenge:
      "The shop owner needs to update products without technical help, and customers mostly browse on phones with patchy connections.",
    approach: [
      "Kept pages lightweight with optimised images and minimal JavaScript.",
      "Designed a simple product grid with category filters and clear prices.",
      "Added one-tap enquiry buttons that open WhatsApp with the product name filled in.",
      "Planned a simple content editing workflow for the owner.",
    ],
    deliverables: ["Page designs", "Responsive front-end build", "Content editing plan"],
    technologies: ["Next.js", "TypeScript", "Headless CMS planning"],
    mockup: "storefront",
    screenshot: "/images/work/nexmart-storefront.webp",
  },
];

export const projectCategories: ProjectCategory[] = Array.from(
  new Set(projects.flatMap((p) => p.categories)),
);

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
