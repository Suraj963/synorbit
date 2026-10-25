import Image from "next/image";
import type { MockupVariant } from "@/types/content";
import styles from "./ProjectMockup.module.css";

interface ProjectMockupProps {
  variant: MockupVariant;
  label: string;
  /** Real interface screenshot; falls back to the HTML/CSS-drawn preview. */
  screenshot?: string;
  sizes?: string;
  /** Set when the frame is above the fold, so the screenshot loads first. */
  preload?: boolean;
}

/** A browser frame showing a project's interface: a screenshot or a drawn preview. */
export function ProjectMockup({
  variant,
  label,
  screenshot,
  sizes = "(min-width: 768px) 50vw, 100vw",
  preload = false,
}: ProjectMockupProps) {
  return (
    <div className={`${styles.frame} ${styles[tones[variant]]}`} role="img" aria-label={label}>
      <div className={styles.window} aria-hidden>
        <div className={styles.chrome}>
          <i />
          <i />
          <i />
        </div>
        {screenshot ? (
          <div className={styles.shot}>
            <Image
              src={screenshot}
              alt=""
              fill
              sizes={sizes}
              preload={preload}
              className={styles.shotImage}
            />
          </div>
        ) : (
          <div className={styles.body}>{variants[variant]}</div>
        )}
      </div>
    </div>
  );
}

const tones: Record<MockupVariant, string> = {
  studio: "toneStudio",
  dashboard: "toneDashboard",
  booking: "toneBooking",
  storefront: "toneStorefront",
};

const variants: Record<MockupVariant, React.ReactNode> = {
  studio: (
    <div className={styles.studio}>
      <div className={styles.navRow}>
        <span className={styles.logoDot} />
        <span className={styles.navLinks}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={styles.navCta} />
      </div>
      <div className={styles.studioHero}>
        <div className={styles.studioCopy}>
          <span className={styles.h1} />
          <span className={styles.h1Short} />
          <span className={styles.p} />
          <span className={styles.pShort} />
          <span className={styles.ctaPair}>
            <i />
            <i />
          </span>
        </div>
        <div className={styles.studioOrbit}>
          <span className={styles.miniRing} />
          <span className={styles.miniWindow} />
          <span className={styles.miniWindowFront} />
          <span className={styles.miniSat} />
        </div>
      </div>
    </div>
  ),
  dashboard: (
    <div className={styles.dashboard}>
      <div className={styles.side}>
        <i className={styles.sideOn} />
        <i />
        <i />
        <i />
        <i />
      </div>
      <div className={styles.dashMain}>
        <div className={styles.kpis}>
          <i />
          <i />
          <i />
        </div>
        <div className={styles.table}>
          {["late", "ok", "ok", "hold", "ok"].map((s, i) => (
            <span key={i} className={styles.tr}>
              <i />
              <i />
              <b className={styles[s]} />
            </span>
          ))}
        </div>
      </div>
    </div>
  ),
  booking: (
    <div className={styles.booking}>
      <div className={styles.calendar}>
        {Array.from({ length: 28 }, (_, i) => (
          <i key={i} className={i === 15 ? styles.dayOn : [3, 9, 22].includes(i) ? styles.dayOff : ""} />
        ))}
      </div>
      <div className={styles.slots}>
        <span className={styles.slotTitle} />
        {[0, 1, 2, 3].map((i) => (
          <span key={i} className={i === 1 ? styles.slotOn : styles.slot} />
        ))}
        <span className={styles.confirm} />
      </div>
    </div>
  ),
  storefront: (
    <div className={styles.storefront}>
      <div className={styles.chips}>
        <i className={styles.chipOn} />
        <i />
        <i />
      </div>
      <div className={styles.products}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <span key={i} className={styles.product}>
            <i />
            <b />
            <em />
          </span>
        ))}
      </div>
    </div>
  ),
};
