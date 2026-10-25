import type { ReactNode } from "react";
import { HeaderParticles } from "./HeaderParticles";
import styles from "./PageHeader.module.css";

interface PageHeaderProps {
  title: string;
  lead: ReactNode;
  children?: ReactNode;
}

/** Opening block for inner pages; holds the page's only <h1>. */
export function PageHeader({ title, lead, children }: PageHeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.particles} aria-hidden>
        <HeaderParticles />
      </div>
      {/* Orbit motif, echoing the logo and the homepage hero */}
      <div className={styles.orbit} aria-hidden>
        <span className={styles.core} />
        <span className={styles.ringOuter} />
        <span className={styles.ringInner} />
        <span className={styles.ring} />
        <span className={styles.arc} />
        <span className={styles.satellite} />
        <span className={`${styles.satellite} ${styles.moon}`} />
      </div>
      <div className={`container ${styles.inner}`}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.lead}>{lead}</p>
        {children}
      </div>
    </header>
  );
}
