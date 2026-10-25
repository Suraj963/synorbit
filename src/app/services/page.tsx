import { FinalCTA } from "@/components/sections/FinalCTA";
import { ServicesExplorer } from "@/components/services/ServicesExplorer";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import { services } from "@/data/services";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Website development, custom web application development, UI/UX design, website revamps, and AI features, explained in detail.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        title="Services shaped around what you need to build."
        lead="Whether you need a new website, software for your team, or a better version of what you already have, open the folder to see what each service covers, who it suits, and how we would approach it."
      />

      <section className="section" aria-label="Our services">
        <div className="container">
          <ServicesExplorer services={services} />
        </div>
      </section>

      <section className="section" aria-labelledby="pricing-title">
        <div className={`container ${styles.pricing}`} data-reveal>
          <h2 id="pricing-title" className={styles.pricingTitle}>
            How pricing works
          </h2>
          <p>
            Every project is different, so we don’t publish fixed prices. Tell us what you need and
            we’ll prepare an estimate based on your scope, with a clear breakdown of what is
            included.
          </p>
        </div>
      </section>

      <FinalCTA
        title="Not sure which service fits?"
        text="Describe what you want to achieve and we'll suggest the right starting point, even if it's smaller than you expected."
        cta="Start a Project"
      />
    </>
  );
}
