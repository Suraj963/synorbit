import type { SpecularButtonProps } from "./SpecularButton";

type Preset = Pick<
  SpecularButtonProps,
  | "size"
  | "radius"
  | "tint"
  | "tintOpacity"
  | "blur"
  | "textColor"
  | "lineColor"
  | "baseColor"
  | "idleIntensity"
  | "glow"
  | "proximity"
>;

/** Brand looks for SpecularButton. Colours mirror the tokens in src/app/globals.css. */
export const specularPresets = {
  /** Solid logo-blue button with a white edge light. */
  primary: {
    size: "md",
    radius: 999,
    tint: "#6f95ff",
    tintOpacity: 1,
    textColor: "#0a0d14",
    lineColor: "#ffffff",
    baseColor: "#93b0ff",
    idleIntensity: 0.5,
    glow: 1,
    proximity: 220,
  },
  /** Clear glass button with a blue edge light. */
  secondary: {
    size: "md",
    radius: 999,
    tint: "#ffffff",
    tintOpacity: 0.04,
    blur: 6,
    textColor: "#eef1f7",
    lineColor: "#93b0ff",
    baseColor: "#34415c",
    idleIntensity: 0.4,
    glow: 1,
    proximity: 220,
  },
} satisfies Record<string, Preset>;

export type SpecularVariant = keyof typeof specularPresets;
