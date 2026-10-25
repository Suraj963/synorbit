import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeroGalaxy } from "./HeroGalaxy";
import { HeroVisual } from "./HeroVisual";
import styles from "./Hero.module.css";

export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.galaxy} aria-hidden>
        <HeroGalaxy />
      </div>
      <div className={styles.scrim} aria-hidden />
      <div className={`container ${styles.grid}`}>
        <div className={styles.copy}>
          <p className={styles.eyebrow}>Digital engineering studio</p>
          <h1 id="hero-title" className={styles.title}>
            Digital experiences. <span className={styles.titleLine}>Engineered for growth.</span>
          </h1>
          <p className={styles.lead}>
            We design and develop modern websites and custom web applications that turn business
            ideas into useful, reliable digital experiences.
          </p>
          <div className={styles.actions}>
            <ButtonLink href="/contact">
              Start a Project <ArrowRight aria-hidden />
            </ButtonLink>
            <ButtonLink href="/work" variant="secondary">
              Explore Our Work
            </ButtonLink>
          </div>
          <p className={styles.note}>
            Prefer to talk first?{" "}
            <Link href="/contact#talk" className="text-link">
              Book a free 15-minute call
            </Link>
          </p>
        </div>
        <div className={styles.visual}>
          <HeroVisual />
        </div>
      </div>
    </section>
  );
}
