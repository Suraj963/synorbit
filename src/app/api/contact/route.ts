import { budgetOptions, enquiryRequestSchema, labelFor, projectTypeOptions, timelineOptions } from "@/lib/validation";
import { deliverEnquiry, isDeliveryConfigured } from "@/lib/enquiry-delivery";
import { z } from "zod";

/** Submissions faster than this are almost certainly automated. */
const MIN_FILL_MS = 3000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

/**
 * Best-effort, per-instance rate limit. On serverless platforms each instance
 * has its own memory, so treat this as a speed bump rather than a guarantee.
 */
const hits = new Map<string, number[]>();

function isRateLimited(key: string, now: number) {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_LIMIT.max;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip, Date.now())) {
    return Response.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "invalid_json" }, { status: 400 });
  }

  const parsed = enquiryRequestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json(
      { error: "validation", fieldErrors: z.flattenError(parsed.error).fieldErrors },
      { status: 400 },
    );
  }

  const { fax, elapsedMs, ...enquiry } = parsed.data;

  // Honeypot or too fast: report success so bots get no signal, but drop it.
  if (fax || elapsedMs < MIN_FILL_MS) {
    return Response.json({ ok: true });
  }

  if (!isDeliveryConfigured()) {
    return Response.json({ error: "not_configured" }, { status: 503 });
  }

  try {
    await deliverEnquiry({
      ...enquiry,
      projectTypeLabel: labelFor(projectTypeOptions, enquiry.projectType),
      budgetLabel: labelFor(budgetOptions, enquiry.budget),
      timelineLabel: labelFor(timelineOptions, enquiry.timeline),
    });
  } catch (error) {
    // Log the failure without any of the enquirer's personal details.
    console.error("Enquiry delivery failed:", error instanceof Error ? error.message : "unknown");
    return Response.json({ error: "delivery_failed" }, { status: 502 });
  }

  return Response.json({ ok: true });
}
