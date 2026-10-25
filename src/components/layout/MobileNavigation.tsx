"use client";

import Drawer from "@mui/material/Drawer";
import { X } from "lucide-react";
import Link from "next/link";
import SpecularButton from "@/components/ui/SpecularButton";
import { specularPresets } from "@/components/ui/specularPresets";
import { navLinks, site } from "@/lib/site";
import { isActive } from "@/lib/utils";
import styles from "./MobileNavigation.module.css";

interface MobileNavigationProps {
  open: boolean;
  onClose: () => void;
  pathname: string;
}

export function MobileNavigation({ open, onClose, pathname }: MobileNavigationProps) {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { id: "mobile-navigation", className: styles.paper },
      }}
    >
      <div className={styles.top}>
        <span className={styles.title}>Menu</span>
        <button type="button" className={styles.close} onClick={onClose} aria-label="Close menu">
          <X aria-hidden />
        </button>
      </div>

      <nav aria-label="Mobile">
        <ul className={styles.links}>
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onNavigate={onClose}
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

      <div className={styles.footer}>
        <SpecularButton
          href="/contact"
          onNavigate={onClose}
          {...specularPresets.primary}
          className={styles.cta}
        >
          Start a Project
        </SpecularButton>
        <a href={`mailto:${site.email}`} className={styles.email}>
          {site.email}
        </a>
      </div>
    </Drawer>
  );
}
