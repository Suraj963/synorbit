import { ArrowLeft, ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { HeaderParticles } from "@/components/ui/HeaderParticles";
import { Rocket } from "@/components/ui/Rocket";
import { navLinks } from "@/lib/site";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className={styles.wrap} aria-labelledby="nf-title">
      <div className={styles.particles} aria-hidden>
        <HeaderParticles />
      </div>

      <div className={`container ${styles.inner}`}>
        {/* "404" with the zero drawn as a moon in orbit, and a rocket drifting off course */}
        <div className={styles.scene} role="img" aria-label="404">
          <span className={styles.digit} aria-hidden>
            4
          </span>
          <span className={styles.moonSystem} aria-hidden>
            <span className={styles.ring} />
            <span className={`${styles.satellite} ${styles.farSide}`} />
            <span className={styles.moon}>
              <i />
              <i />
              <i />
            </span>
            <span className={styles.ringFront} />
            <span className={`${styles.satellite} ${styles.nearSide}`} />
          </span>
          <span className={styles.digit} aria-hidden>
            4
          </span>
          <span className={styles.lostRocket} aria-hidden>
            <span className={styles.sputter} />
            <Rocket idPrefix="lost" className={styles.rocket} />
          </span>
        </div>

        <p className={styles.eyebrow}>Lost in space</p>
        <h1 id="nf-title" className={styles.title}>
          This page has drifted out of orbit.
        </h1>
        <p className={styles.text}>
          The address may be mistyped, or the page may have moved. Let’s get you back on course.
        </p>

        <div className={styles.actions}>
          <ButtonLink href="/">
            <ArrowLeft aria-hidden /> Back to home
          </ButtonLink>
          <ButtonLink href="/contact" variant="secondary">
            Start a Project <ArrowRight aria-hidden />
          </ButtonLink>
        </div>

        <nav aria-label="Other pages" className={styles.links}>
          <span className={styles.linksLabel}>Or head to</span>
          <ul>
            {navLinks
              .filter((link) => link.href !== "/")
              .map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
