import { cacheLife } from "next/cache";
import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { navLinks, site } from "@/lib/site";
import styles from "./Footer.module.css";

async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`} data-assemble>
        <div className={styles.brand}>
          <Logo />
          <p className={styles.description}>
            We design and develop websites and web applications for businesses that want their
            digital presence to work as well as they do.
          </p>
        </div>

        <nav aria-label="Footer" className={styles.column}>
          <h2 className={styles.heading}>Pages</h2>
          <ul className={styles.list}>
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className={styles.link}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.column}>
          <h2 className={styles.heading}>Contact</h2>
          <ul className={styles.list}>
            <li>
              <a href={`mailto:${site.email}`} className={styles.link}>
                {site.email}
              </a>
            </li>
            {site.phones.map((phone) => (
              <li key={phone.tel}>
                <a href={`tel:${phone.tel}`} className={styles.link}>
                  {phone.display}
                </a>
              </li>
            ))}
            <li>
              <a href={site.instagram} className={styles.link} target="_blank" rel="noreferrer">
                Instagram<span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container">
        <p className={styles.bottom}>
          © <CopyrightYear /> Synorbit. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
