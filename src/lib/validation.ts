import { z } from "zod";
import type { ProjectType } from "@/types/content";

/**
 * Enquiry form options. Budget and timeline ranges are editable here and are
 * indicative only; they are not published prices or delivery commitments.
 */
export const projectTypeOptions: { value: ProjectType; label: string }[] = [
  { value: "website", label: "New website" },
  { value: "web-app", label: "Web application" },
  { value: "revamp", label: "Website revamp" },
  { value: "ui-ux", label: "UI/UX design" },
  { value: "ai", label: "AI features or automation" },
  { value: "other", label: "Something else" },
];

export const budgetOptions = [
  { value: "under-50k", label: "Under ₹50,000" },
  { value: "50k-1.5l", label: "₹50,000 – ₹1,50,000" },
  { value: "1.5l-5l", label: "₹1,50,000 – ₹5,00,000" },
  { value: "over-5l", label: "Over ₹5,00,000" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const timelineOptions = [
  { value: "asap", label: "As soon as possible" },
  { value: "1-3m", label: "Within 1–3 months" },
  { value: "3m-plus", label: "In more than 3 months" },
  { value: "flexible", label: "Flexible" },
] as const;

const optionalChoice = <T extends readonly { value: string }[]>(options: T) =>
  z
    .enum(options.map((o) => o.value) as [T[number]["value"], ...T[number]["value"][]])
    .or(z.literal(""))
    .optional();

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100, "Use 100 characters or fewer."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email address.")
    .max(200, "Use 200 characters or fewer.")
    .pipe(z.email("Enter an email address like name@company.com.")),
  company: z.string().trim().max(120, "Use 120 characters or fewer.").optional().or(z.literal("")),
  website: z
    .string()
    .trim()
    .max(200, "Use 200 characters or fewer.")
    .optional()
    .or(z.literal("")),
  projectType: z.enum(
    projectTypeOptions.map((o) => o.value) as [ProjectType, ...ProjectType[]],
    { error: "Choose the kind of project." },
  ),
  budget: optionalChoice(budgetOptions),
  timeline: optionalChoice(timelineOptions),
  message: z
    .string()
    .trim()
    .min(20, "Tell us a little more: at least 20 characters.")
    .max(4000, "Use 4,000 characters or fewer."),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

/** Fields the browser adds for spam protection; not shown to users. */
export const spamFieldsSchema = z.object({
  /** Honeypot: people leave it empty; anything else is treated as spam. */
  fax: z.string().max(500).optional(),
  /** Milliseconds since the form was rendered. */
  elapsedMs: z.number().int().nonnegative(),
});

export const enquiryRequestSchema = enquirySchema.extend(spamFieldsSchema.shape);

export function labelFor(
  options: readonly { value: string; label: string }[],
  value: string | undefined,
) {
  return options.find((o) => o.value === value)?.label ?? "Not specified";
}
