import Image from "next/image";
import Link from "next/link";
import styles from "./Logo.module.css";

export function Logo({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link href="/" className={styles.logo} aria-label="Synorbit home" onNavigate={onNavigate}>
      <Image
        src="/brand/synorbit-mark.png"
        alt=""
        width={159}
        height={128}
        className={styles.mark}
        loading="eager"
      />
      <span className={styles.wordmark}>Synorbit</span>
    </Link>
  );
}
