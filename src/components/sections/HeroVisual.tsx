import { Check } from "lucide-react";
import Image from "next/image";
import styles from "./HeroVisual.module.css";

// Separate copies from the portfolio images: Next's dev LCP check matches images by
// path, and the portfolio cards load these lazily further down the page.
const overview = "/images/hero/careplus-overview.webp";
const operations = "/images/hero/careplus-operations.webp";

/**
 * Hero illustration: two application windows and a phone in orbit, showing the
 * CarePlus concept dashboards. Server-rendered; entrance and orbit motion are
 * CSS animations that are disabled for prefers-reduced-motion.
 */
export function HeroVisual() {
  return (
    <div
      className={styles.stage}
      role="img"
      aria-label="Clinic dashboards on a desktop browser and a phone, with a form field and a deployment status circling them."
    >
      {/* The orbit is split into a layer behind the windows and one in front of them,
          so its near arc and satellites can pass over the windows. */}
      <div className={`${styles.orbit} ${styles.orbitBack}`} aria-hidden>
        <div className={styles.ringOuter} />
        <div className={`${styles.ring} ${styles.ringBack}`} />
        <span className={`${styles.satellite} ${styles.farSide}`} />
        <span className={`${styles.satellite} ${styles.moon} ${styles.farSide}`} />
      </div>
      <div className={`${styles.orbit} ${styles.orbitFront}`} aria-hidden>
        <div className={`${styles.ring} ${styles.ringFront}`} />
        <span className={`${styles.satellite} ${styles.nearSide}`} />
        <span className={`${styles.satellite} ${styles.moon} ${styles.nearSide}`} />
      </div>

      {/* Overview window, behind */}
      <div className={`${styles.window} ${styles.siteWindow}`} aria-hidden>
        <div className={styles.chrome}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>careplus.app/overview</span>
        </div>
        <div className={styles.shot}>
          <Image
            src={overview}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 380px, 60vw"
            className={styles.shotImage}
          />
        </div>
      </div>

      {/* Operations window, front */}
      <div className={`${styles.window} ${styles.appWindow}`} aria-hidden>
        <div className={styles.chrome}>
          <span className={styles.dots}>
            <i />
            <i />
            <i />
          </span>
          <span className={styles.url}>careplus.app/operations</span>
        </div>
        <div className={styles.shot}>
          <Image
            src={operations}
            alt=""
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 1024px) 460px, 70vw"
            className={styles.shotImage}
          />
        </div>
      </div>

      {/* Satellites */}
      <div className={`${styles.panel} ${styles.fieldPanel}`} aria-hidden>
        <span className={styles.fieldLabel}>Work email</span>
        <span className={styles.field}>
          name@company.com
          <span className={styles.fieldCheck}>
            <Check />
          </span>
        </span>
      </div>

      <div className={`${styles.panel} ${styles.deployPanel}`} aria-hidden>
        <span className={styles.liveDot} />
        Deployed to production
      </div>

      {/* Phone: the same app at mobile size, cropped to its charts */}
      <div className={`${styles.panel} ${styles.phone}`} aria-hidden>
        <span className={styles.phoneNotch} />
        <span className={styles.phoneScreen}>
          <Image
            src={operations}
            alt=""
            fill
            loading="eager"
            sizes="(min-width: 1024px) 260px, 40vw"
            className={styles.phoneImage}
          />
        </span>
      </div>
    </div>
  );
}
