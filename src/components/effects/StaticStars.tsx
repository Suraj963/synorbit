import styles from "./StaticStars.module.css";

/** CSS-only starfield used in place of WebGL effects on devices without graphics acceleration. */
export function StaticStars() {
  return <div className={styles.staticStars} />;
}
