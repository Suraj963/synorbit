import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/ButtonLink";
import styles from "./FinalCTA.module.css";

interface FinalCTAProps {
  title?: string;
  text?: string;
  cta?: string;
  href?: string;
}

export function FinalCTA({
  title = "Have a digital idea worth building?",
  text = "Tell us what you are planning. We'll help you work out the right approach to bring it to life.",
  cta = "Start a Project",
  href = "/contact",
}: FinalCTAProps) {
  return (
    <section className={styles.wrap} aria-labelledby="cta-title">
      <div className="container">
        <div className={styles.panel} data-reveal>
          <div className={styles.orbit} aria-hidden>
            <span className={styles.ring} />
            <span className={styles.ringInner} />
            <span className={styles.planet} />
          </div>
          <div className={styles.copy}>
            <h2 id="cta-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.text}>{text}</p>
            <ButtonLink href={href} className={styles.button}>
              {cta} <ArrowRight aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
