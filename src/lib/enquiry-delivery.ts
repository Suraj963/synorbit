import "server-only";
import type { EnquiryInput } from "./validation";

/**
 * Sends enquiries by email through Resend's HTTP API (https://resend.com).
 *
 * Required environment variables (server-side only):
 *   RESEND_API_KEY      API key from the Resend dashboard
 *   CONTACT_TO_EMAIL    Inbox that receives enquiries
 * Optional:
 *   CONTACT_FROM_EMAIL  Verified sender, e.g. "Synorbit Website <hello@yourdomain.com>"
 */
export function isDeliveryConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
}

type Enquiry = EnquiryInput & {
  projectTypeLabel: string;
  budgetLabel: string;
  timelineLabel: string;
};

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function deliverEnquiry(enquiry: Enquiry) {
  const rows: [string, string][] = [
    ["Name", enquiry.name],
    ["Email", enquiry.email],
    ["Company", enquiry.company || "Not specified"],
    ["Current website", enquiry.website || "Not specified"],
    ["Project type", enquiry.projectTypeLabel],
    ["Budget", enquiry.budgetLabel],
    ["Timeline", enquiry.timelineLabel],
  ];

  const text = [
    ...rows.map(([k, v]) => `${k}: ${v}`),
    "",
    "Project description:",
    enquiry.message,
  ].join("\n");

  const html = `
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      ${rows
        .map(
          ([k, v]) =>
            `<tr><td style="color:#555"><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`,
        )
        .join("")}
    </table>
    <p style="font-family:sans-serif;font-size:14px"><strong>Project description</strong></p>
    <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(enquiry.message)}</p>
  `;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM_EMAIL || "Synorbit Website <onboarding@resend.dev>",
      to: [process.env.CONTACT_TO_EMAIL],
      reply_to: enquiry.email,
      subject: `New enquiry: ${enquiry.projectTypeLabel} from ${enquiry.name}`.slice(0, 200),
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!response.ok) {
    throw new Error(`Resend responded with ${response.status}`);
  }
}
