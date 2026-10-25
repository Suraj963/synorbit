import type { Service } from "@/types/content";

export const services: Service[] = [
  {
    id: "websites",
    tagline: "Business sites, landing pages and online stores",
    title: "Website Development",
    summary:
      "Responsive, accessible websites that explain what your business does and make it easy for visitors to take the next step.",
    intro:
      "Your website is often the first conversation a customer has with your business. We build business sites, corporate sites, landing pages, and online stores that load quickly, read clearly, and work on every screen size.",
    forWho:
      "Businesses launching for the first time, companies whose site no longer reflects what they do, and teams that need a focused landing page for a product or campaign.",
    problems: [
      "Visitors can't quickly tell what you offer or who it's for",
      "The site looks broken or cramped on phones",
      "Updating content means waiting on a developer",
      "Pages are slow and hard for search engines to understand",
    ],
    capabilities: [
      "Responsive layouts designed for phones first",
      "Information architecture and page structure",
      "Accessible, keyboard-friendly interfaces",
      "Search-engine-friendly markup and metadata",
      "Content management integration when you need to edit pages yourself",
      "Image and code optimisation for fast loading",
      "Analytics setup on request",
      "Deployment, domain setup, and handover",
    ],
    deliverables: [
      "Sitemap and page structure",
      "Visual design for key pages",
      "Production website, deployed",
      "Handover notes for editing and hosting",
    ],
    engagement:
      "We start with a short call about your goals and audience, agree on pages and scope, share designs for review, then build and launch. You review progress at each stage.",
    cta: "Discuss a website project",
    enquiryType: "website",
  },
  {
    id: "web-apps",
    tagline: "Portals, dashboards and workflow tools",
    title: "Web Application Development",
    summary:
      "Custom browser-based software: dashboards, customer portals, booking systems, and internal tools built around how your team works.",
    intro:
      "Some work doesn't fit inside an ordinary website. When customers need to log in, book, track, or submit something, or when your team is juggling spreadsheets and messages to run a process, a web application can bring that work into one place.",
    forWho:
      "Teams replacing manual workflows, businesses offering self-service to their customers, and founders turning an idea into a first working product.",
    problems: [
      "Day-to-day operations run on spreadsheets, chats, and copy-paste",
      "Customers have to call or email for things they could do themselves",
      "Off-the-shelf tools don't match how the business actually works",
      "Information lives in several systems that don't talk to each other",
    ],
    capabilities: [
      "Customer portals and self-service areas",
      "Administrative dashboards and reporting views",
      "Booking, enquiry, and approval workflows",
      "Data entry and record management tools",
      "Role-based access for different kinds of users",
      "Integration with third-party services through their APIs",
      "Authentication, input validation, and error handling",
      "Database design when the application needs its own backend",
    ],
    deliverables: [
      "Agreed feature scope and user flows",
      "Interface designs for core screens",
      "Working application, tested and deployed",
      "Technical documentation and handover",
    ],
    engagement:
      "Applications vary a lot in size, so we begin by mapping the users, tasks, and data involved. We agree on a first version that solves the core problem, build it in reviewable stages, and plan further features from real feedback. Which features are included always depends on the agreed scope.",
    cta: "Discuss a web application",
    enquiryType: "web-app",
  },
  {
    id: "ui-ux",
    tagline: "User journeys, wireframes and interfaces",
    title: "UI/UX Design",
    summary:
      "User journeys, wireframes, and interface design that make your product easier to understand and quicker to use.",
    intro:
      "Good design is mostly about removing confusion. We look at who uses your product, what they are trying to get done, and where they get stuck, then design screens that make the important tasks obvious.",
    forWho:
      "Teams planning a new product, businesses whose site or app gets frequent \"how do I…\" questions, and developers who need a clear design to build from.",
    problems: [
      "Users drop off before finishing a sign-up, booking, or purchase",
      "Navigation has grown without a plan and is hard to follow",
      "Screens are inconsistent because there is no shared design system",
      "Developers are building without agreed designs",
    ],
    capabilities: [
      "User and task research",
      "User flows and journey mapping",
      "Information architecture",
      "Wireframes for layout and structure",
      "Clickable prototypes for early feedback",
      "High-fidelity interface design",
      "Reusable component and style systems",
    ],
    deliverables: [
      "User flows and sitemap",
      "Wireframes and prototype",
      "Final interface designs",
      "Component and style guidelines for developers",
    ],
    engagement:
      "Design work can stand on its own or lead straight into development with us. We work in short review cycles so you can react to structure before visual detail.",
    cta: "Discuss a design project",
    enquiryType: "ui-ux",
  },
  {
    id: "revamp",
    tagline: "Modernise and speed up an existing site",
    title: "Website Revamp and Optimization",
    summary:
      "Modernise an existing website: fix mobile layouts, clarify navigation, improve accessibility, and speed up loading.",
    intro:
      "You don't always need to start from scratch. We review your current site, identify what is holding it back, and improve it, whether that means a visual refresh, a structural clean-up, or targeted fixes.",
    forWho:
      "Businesses with a site that works but looks dated, loads slowly, or has become difficult to maintain.",
    problems: [
      "The design no longer matches the quality of your business",
      "Layouts break or overflow on phones and tablets",
      "Visitors struggle to find key pages",
      "Accessibility and performance issues have built up over time",
    ],
    capabilities: [
      "Visual modernisation",
      "Responsive layout fixes",
      "Navigation and content hierarchy improvements",
      "Accessibility review and fixes",
      "Performance optimisation",
      "Technical SEO fundamentals",
      "Code and component clean-up where appropriate",
    ],
    deliverables: [
      "Review of the current site with prioritised findings",
      "Agreed list of improvements",
      "Updated site, deployed",
      "Notes on what changed and why",
    ],
    engagement:
      "We start with a review and share what we find in plain language. You choose which improvements to make. We can't promise particular search rankings or speed scores, but we explain every change and how we measured it.",
    cta: "Discuss a website revamp",
    enquiryType: "revamp",
  },
  {
    id: "ai",
    tagline: "Assistants, agents and automation",
    title: "AI Features and Automation",
    summary:
      "Practical AI added to your website or application: chatbots, assistants, and automated workflows that cut repetitive work.",
    intro:
      "AI is useful when it takes a clear, repetitive job off someone's plate. We add assistants, chatbots, and automated steps to websites and applications where they make a measurable difference to the people using them.",
    forWho:
      "Businesses answering the same customer questions every day, and teams with repetitive document, data-entry, or routing tasks.",
    problems: [
      "Staff spend hours answering the same questions",
      "Information has to be copied between tools by hand",
      "Requests sit in an inbox waiting to be sorted",
    ],
    capabilities: [
      "Website and in-app chat assistants",
      "AI agents that carry out defined tasks",
      "Workflow automation between the tools you already use",
      "Guardrails and human review for sensitive steps",
    ],
    deliverables: [
      "Agreed use case and success criteria",
      "Working integration in your site or application",
      "Usage notes and handover",
    ],
    engagement:
      "We start with one well-defined task, test it with real examples, and expand only once it works reliably.",
    cta: "Discuss an AI feature",
    enquiryType: "ai",
  },
];

/** The four core services highlighted on the homepage. */
export const coreServices = services.filter((s) => s.id !== "ai");

export function getService(id: Service["id"]) {
  return services.find((s) => s.id === id);
}
