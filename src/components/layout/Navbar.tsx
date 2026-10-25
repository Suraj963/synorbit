"use client";

import { Menu, X } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import SpecularButton from "@/components/ui/SpecularButton";
import { specularPresets } from "@/components/ui/specularPresets";
import { navLinks } from "@/lib/site";
import { isActive } from "@/lib/utils";
import styles from "./Navbar.module.css";

// The drawer (and MUI's modal machinery) loads only once the menu is first opened.
const MobileNavigation = dynamic(() =>
  import("./MobileNavigation").then((m) => m.MobileNavigation),
);

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuLoaded, setMenuLoaded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu if this layout is hidden by an Activity boundary.
  useLayoutEffect(() => () => setMenuOpen(false), []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.inner}`}>
        <Logo onNavigate={closeMenu} />

        <nav aria-label="Main" className={styles.desktopNav}>
          <ul className={styles.links}>
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`${styles.link} ${active ? styles.active : ""}`}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className={styles.actions}>
          <SpecularButton
            href="/contact"
            {...specularPresets.primary}
            size="sm"
            className={styles.cta}
          >
            Start a Project
          </SpecularButton>
          <button
            type="button"
            className={styles.menuButton}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => {
              setMenuLoaded(true);
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </div>

      {menuLoaded && <MobileNavigation open={menuOpen} onClose={closeMenu} pathname={pathname} />}
    </header>
  );
}
