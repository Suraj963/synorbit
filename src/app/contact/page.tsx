import { AtSign, Mail, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import { site } from "@/lib/site";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Tell Synorbit about your website or web application project. Send an enquiry, email, call, or message us on WhatsApp.",
  path: "/contact",
});

const nextSteps = [
  "We read your enquiry and reply by email, usually within one working day.",
  "If it looks like a fit, we set up a short call to understand the details.",
  "We send a proposal with scope, approach, and an estimate for you to review.",
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Tell us what you're looking to build."
        lead="Share a little about your business, your idea, and what you need help with. We'll use the details to understand your requirements and discuss the next steps."
      />

      <section className="section" aria-label="Project enquiry">
        <div className={`container ${styles.grid}`}>
          <div className={styles.formPanel} data-reveal>
            <h2 className={styles.panelTitle}>Project enquiry</h2>
            <ContactForm />
          </div>

          <aside className={styles.aside} aria-label="Other ways to reach us" data-assemble>
            <div className={styles.card}>
              <h2 className={styles.asideTitle}>Reach us directly</h2>
              <ul className={styles.contacts}>
                <li>
                  <Mail aria-hidden />
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
                {site.phones.map((phone) => (
                  <li key={phone.tel}>
                    <Phone aria-hidden />
                    <span>
                      <a href={`tel:${phone.tel}`}>{phone.display}</a>
                      <a href={phone.whatsapp} target="_blank" rel="noreferrer" className={styles.whatsapp}>
                        <MessageCircle aria-hidden /> WhatsApp
                        <span className="visually-hidden"> {phone.display} (opens in a new tab)</span>
                      </a>
                    </span>
                  </li>
                ))}
                <li>
                  <AtSign aria-hidden />
                  <a href={site.instagram} target="_blank" rel="noreferrer">
                    @synorbit on Instagram
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.card} id="talk">
              <h2 className={styles.asideTitle}>Prefer to talk first?</h2>
              <p>
                Call or WhatsApp either number for a free 15-minute introductory call. No
                preparation needed: just tell us what you have in mind.
              </p>
            </div>

            <div className={styles.card}>
              <h2 className={styles.asideTitle}>What happens next</h2>
              <ol className={styles.steps}>
                {nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
