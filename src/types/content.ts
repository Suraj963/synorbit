export type ServiceId = "websites" | "web-apps" | "ui-ux" | "revamp" | "ai";

export interface Service {
  id: ServiceId;
  title: string;
  /** A few words for compact places, like the pages in the Services folder. */
  tagline: string;
  /** One-line summary used on the homepage. */
  summary: string;
  /** Opening paragraph on the Services page. */
  intro: string;
  forWho: string;
  problems: string[];
  capabilities: string[];
  deliverables: string[];
  engagement: string;
  /** Label for the enquiry button on the Services page. */
  cta: string;
  /** Pre-selects the project type on the enquiry form. */
  enquiryType: ProjectType;
}

export type ProjectType = "website" | "web-app" | "revamp" | "ui-ux" | "ai" | "other";

export type ProjectCategory = "Websites" | "Web Applications" | "UI/UX";

/** "in-house" = real Synorbit work; "concept" = self-initiated study, not a client engagement. */
export type ProjectKind = "in-house" | "concept";

export type MockupVariant = "studio" | "dashboard" | "booking" | "storefront";

export interface Project {
  slug: string;
  name: string;
  kind: ProjectKind;
  categories: ProjectCategory[];
  summary: string;
  overview: string;
  challenge: string;
  approach: string[];
  deliverables: string[];
  technologies: string[];
  mockup: MockupVariant;
  /** Interface screenshot shown inside the browser frame instead of the drawn mockup. */
  screenshot?: string;
  liveUrl?: string;
}
