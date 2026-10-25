"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { Rocket } from "@/components/ui/Rocket";
import { LOADER_SKIP_CLASS } from "@/lib/loader";
import styles from "./LaunchLoader.module.css";


/** Matches the CSS timeline: the scene finishes and fades out by this point. */
const TOTAL_MS = 3400;

const PUFFS = [
  { x: -46, y: 6, size: 54, delay: 0.25 },
  { x: 40, y: 4, size: 62, delay: 0.3 },
  { x: -18, y: 14, size: 70, delay: 0.38 },
  { x: 22, y: 12, size: 58, delay: 0.42 },
  { x: -70, y: 18, size: 46, delay: 0.5 },
  { x: 68, y: 16, size: 50, delay: 0.55 },
];

/**
 * First-visit splash: a rocket launches from its pad, climbs through streaking
 * stars and lands on the moon, then the scene fades to reveal the page.
 *
 * Rendered on the server so it covers the page from the first frame; the whole
 * timeline is CSS, so it plays (and removes itself) even without JavaScript.
 * Shown once per browser session; click, tap or Escape skips it.
 */
const subscribeNever = () => () => {};
const readSkipped = () => document.documentElement.classList.contains(LOADER_SKIP_CLASS);
const serverSkipped = () => false;

export function LaunchLoader() {
  const [phase, setPhase] = useState<"show" | "leaving" | "done">("show");
  // Already shown this session: the inline script hid it before paint, so unmount it.
  const skipped = useSyncExternalStore(subscribeNever, readSkipped, serverSkipped);

  useEffect(() => {
    if (skipped || phase !== "show") return undefined;
    const timer = window.setTimeout(() => setPhase("done"), TOTAL_MS);
    const skip = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPhase("leaving");
    };
    window.addEventListener("keydown", skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("keydown", skip);
    };
  }, [skipped, phase]);

  useEffect(() => {
    if (phase !== "leaving") return undefined;
    const timer = window.setTimeout(() => setPhase("done"), 350);
    return () => window.clearTimeout(timer);
  }, [phase]);

  if (skipped || phase === "done") return null;

  return (
    <div
      className={`${styles.overlay} ${phase === "leaving" ? styles.leaving : ""}`}
      aria-hidden
      onClick={() => setPhase("leaving")}
    >
      <div className={`${styles.stars} ${styles.starsFar}`} />
      <div className={`${styles.stars} ${styles.starsNear}`} />

      {/* Moon with its orbit ring */}
      <div className={styles.moonSystem}>
        <span className={styles.moonRing} />
        <span className={styles.moon}>
          <i />
          <i />
          <i />
          <i />
        </span>
        <span className={styles.moonRingFront} />
        <span className={styles.flash} />
      </div>

      {/* Launch pad, smoke and rocket */}
      <div className={styles.ground} />
      <div className={styles.pad} />
      <div className={styles.smoke}>
        {PUFFS.map((puff, i) => (
          <span
            key={i}
            style={
              {
                "--x": `${puff.x}px`,
                "--y": `${puff.y}px`,
                "--size": `${puff.size}px`,
                "--delay": `${puff.delay}s`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className={styles.flight}>
        <div className={styles.shake}>
          <span className={styles.flame}>
            <i />
          </span>
          <Rocket idPrefix="loader" className={styles.rocket} />
        </div>
      </div>

      <div className={styles.brand}>
        <span className={styles.wordmark}>Synorbit</span>
        <span className={styles.status}>
          <span className={styles.statusLaunch}>Preparing for launch</span>
          <span className={styles.statusOrbit}>Entering orbit</span>
        </span>
        <span className={styles.progress}>
          <i />
        </span>
      </div>
    </div>
  );
}
