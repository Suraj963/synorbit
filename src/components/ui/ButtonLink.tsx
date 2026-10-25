import type { ComponentProps, ReactNode } from "react";
import type Link from "next/link";
import SpecularButton from "./SpecularButton";
import { specularPresets, type SpecularVariant } from "./specularPresets";
import styles from "./ButtonLink.module.css";

interface ButtonLinkProps {
  href: ComponentProps<typeof Link>["href"];
  variant?: SpecularVariant;
  className?: string;
  children: ReactNode;
}

/** A navigation link styled as a SpecularButton. Use SpecularButton itself for actions. */
export function ButtonLink({ href, variant = "primary", className, children }: ButtonLinkProps) {
  return (
    <SpecularButton
      href={href}
      {...specularPresets[variant]}
      className={[styles.button, className].filter(Boolean).join(" ")}
    >
      {children}
    </SpecularButton>
  );
}
