"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import { CheckCircle2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { BaseSyntheticEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import type { z } from "zod";
import SpecularButton from "@/components/ui/SpecularButton";
import { specularPresets } from "@/components/ui/specularPresets";
import { site } from "@/lib/site";
import {
  budgetOptions,
  enquirySchema,
  projectTypeOptions,
  timelineOptions,
  type EnquiryInput,
} from "@/lib/validation";
import styles from "./ContactForm.module.css";

type FormValues = z.input<typeof enquirySchema>;
type Status =
  | { kind: "idle" }
  | { kind: "success"; firstName: string }
  | { kind: "error"; reason: "not_configured" | "rate_limited" | "failed" };

const defaultValues: FormValues = {
  name: "",
  email: "",
  company: "",
  website: "",
  projectType: "" as FormValues["projectType"],
  budget: "",
  timeline: "",
  message: "",
};

function mailtoFor(values: FormValues) {
  const subject = `Project enquiry from ${values.name || "the website"}`;
  const body = [
    `Name: ${values.name}`,
    `Company: ${values.company || "-"}`,
    `Project type: ${projectTypeOptions.find((o) => o.value === values.projectType)?.label ?? "-"}`,
    "",
    values.message,
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const FORM_ID = "project-enquiry";

type ApiResponse = {
  ok: boolean;
  error?: string;
  fieldErrors?: Partial<Record<keyof EnquiryInput, string[]>>;
};

/** Posts the enquiry along with the spam-protection fields stored on the form element. */
async function postEnquiry(values: EnquiryInput, form: HTMLFormElement): Promise<ApiResponse> {
  const fax = (form.elements.namedItem("fax") as HTMLInputElement | null)?.value ?? "";
  const openedAt = Number(form.dataset.openedAt) || Date.now();
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...values, fax, elapsedMs: Date.now() - openedAt }),
  });
  const data = (await response.json().catch(() => ({}))) as Omit<ApiResponse, "ok">;
  return { ok: response.ok, ...data };
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const successHeading = useRef<HTMLHeadingElement>(null);

  const {
    control,
    handleSubmit,
    reset,
    setError,
    setValue,
    getValues,
    formState: { isSubmitting },
  } = useForm<FormValues, unknown, EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues,
    mode: "onTouched",
  });

  const showingForm = status.kind !== "success";

  // Record when the form appeared, so the server can reject instant (bot) submissions.
  useEffect(() => {
    const form = document.getElementById(FORM_ID);
    if (showingForm && form) form.dataset.openedAt = String(Date.now());
  }, [showingForm]);

  useEffect(() => {
    // Pre-select the project type when arriving from a service page (?type=web-app).
    const type = new URLSearchParams(window.location.search).get("type");
    const match = projectTypeOptions.find((o) => o.value === type);
    if (match) setValue("projectType", match.value);
  }, [setValue]);

  useEffect(() => {
    if (status.kind === "success") successHeading.current?.focus();
  }, [status]);

  const onSubmit = async (values: EnquiryInput, event?: BaseSyntheticEvent) => {
    setStatus({ kind: "idle" });
    try {
      const data = await postEnquiry(values, event?.target as HTMLFormElement);

      if (data.ok) {
        setStatus({ kind: "success", firstName: values.name.split(" ")[0] });
        reset(defaultValues);
        return;
      }
      if (data.error === "validation" && data.fieldErrors) {
        for (const [field, messages] of Object.entries(data.fieldErrors)) {
          if (messages?.[0]) setError(field as keyof EnquiryInput, { message: messages[0] });
        }
        return;
      }
      setStatus({
        kind: "error",
        reason:
          data.error === "not_configured"
            ? "not_configured"
            : data.error === "rate_limited"
              ? "rate_limited"
              : "failed",
      });
    } catch {
      setStatus({ kind: "error", reason: "failed" });
    }
  };

  if (status.kind === "success") {
    return (
      <div className={styles.success} role="status">
        <CheckCircle2 aria-hidden className={styles.successIcon} />
        <h2 ref={successHeading} tabIndex={-1} className={styles.successTitle}>
          Enquiry sent. Thanks, {status.firstName}.
        </h2>
        <p>
          We&apos;ll read through your project details and reply by email, usually within one
          working day. If anything is urgent, call or WhatsApp us on the numbers on this page.
        </p>
        <SpecularButton
          {...specularPresets.secondary}
          className={styles.action}
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another enquiry
        </SpecularButton>
      </div>
    );
  }

  return (
    <form
      id={FORM_ID}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={styles.form}
      aria-describedby="form-note"
    >
      <p id="form-note" className={styles.note}>
        Fields marked * are required.
      </p>

      <div className={styles.row}>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Full name"
              required
              autoComplete="name"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Work email"
              type="email"
              required
              autoComplete="email"
              inputMode="email"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
      </div>

      <div className={styles.row}>
        <Controller
          name="company"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Company or organisation"
              autoComplete="organization"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
        <Controller
          name="website"
          control={control}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Current website, if any"
              type="url"
              inputMode="url"
              autoComplete="url"
              placeholder="https://"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              fullWidth
            />
          )}
        />
      </div>

      <Controller
        name="projectType"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="What do you need?"
            required
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            fullWidth
          >
            {projectTypeOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <div className={styles.row}>
        <Controller
          name="budget"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Estimated budget" fullWidth helperText="Optional, helps us suggest a sensible scope">
              <MenuItem value="">
                <em>Prefer not to say</em>
              </MenuItem>
              {budgetOptions.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
        <Controller
          name="timeline"
          control={control}
          render={({ field }) => (
            <TextField {...field} select label="Expected timeline" fullWidth helperText="Optional">
              <MenuItem value="">
                <em>Not decided</em>
              </MenuItem>
              {timelineOptions.map((o) => (
                <MenuItem key={o.value} value={o.value}>
                  {o.label}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      </div>

      <Controller
        name="message"
        control={control}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Project description"
            required
            multiline
            minRows={5}
            error={!!fieldState.error}
            helperText={
              fieldState.error?.message ??
              "What are you building, who is it for, and what should it help them do? Links to references are welcome."
            }
            fullWidth
          />
        )}
      />

      {/* Honeypot: hidden from people and assistive tech; bots tend to fill it */}
      <div className={styles.trap} aria-hidden>
        <label>
          Fax number
          <input type="text" name="fax" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      {status.kind === "error" && (
        <Alert severity={status.reason === "rate_limited" ? "warning" : "error"} role="alert">
          {status.reason === "not_configured" && (
            <>
              Online enquiries aren&apos;t connected yet, so your message wasn&apos;t sent. Your
              details are still in the form.{" "}
              <a href={mailtoFor(getValues())} className={styles.alertLink}>
                Send it by email instead
              </a>
              .
            </>
          )}
          {status.reason === "rate_limited" &&
            "Too many enquiries were sent from this connection. Wait a few minutes and try again, or email us directly."}
          {status.reason === "failed" && (
            <>
              Your enquiry couldn&apos;t be sent. Check your connection and try again, or email{" "}
              <a href={mailtoFor(getValues())} className={styles.alertLink}>
                {site.email}
              </a>
              .
            </>
          )}
        </Alert>
      )}

      <div className={styles.submitRow}>
        <SpecularButton
          type="submit"
          {...specularPresets.primary}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className={`${styles.action} ${styles.submit}`}
        >
          {isSubmitting && <CircularProgress size={18} color="inherit" aria-hidden />}
          {isSubmitting ? "Sending enquiry…" : "Send enquiry"}
        </SpecularButton>
        <p className={styles.privacy}>
          Your details go to the Synorbit team by email and are used to reply to your enquiry.
        </p>
      </div>
    </form>
  );
}
