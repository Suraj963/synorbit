import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Synorbit: website and web application development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const logoData = await readFile(join(process.cwd(), "public/brand/synorbit-mark.png"), "base64");
const logoSrc = `data:image/png;base64,${logoData}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "radial-gradient(circle at 85% 20%, #1c2b55 0%, #0a0d14 60%)",
          color: "#eef1f7",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img src={logoSrc} height={64} alt="" />
          <div style={{ fontSize: 40, fontWeight: 600 }}>Synorbit</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            Digital experiences.
          </div>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            Engineered for growth.
          </div>
          <div style={{ fontSize: 30, color: "#9aa4b8", marginTop: 12 }}>
            Website and web application development
          </div>
        </div>
      </div>
    ),
    size,
  );
}
