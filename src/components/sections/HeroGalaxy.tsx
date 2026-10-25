"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { StaticStars } from "@/components/effects/StaticStars";
import { hasSoftwareRendering } from "@/lib/webgl";

// WebGL only runs in the browser; loading it after hydration keeps it off the critical path.
const Galaxy = dynamic(() => import("@/components/effects/Galaxy"), { ssr: false });

type Mode = "pending" | "webgl" | "static";

/**
 * Starfield behind the homepage hero, tinted with the logo's blues and cyan.
 * Mounts only after the page has loaded and the main thread is idle, because
 * compiling the shaders is a long task that would otherwise delay interactivity.
 * Devices without graphics acceleration get a static CSS starfield instead, since
 * there each WebGL frame can take hundreds of milliseconds and starve the page.
 */
export function HeroGalaxy() {
  const [mode, setMode] = useState<Mode>("pending");
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let idle = 0;
    let timer = 0;
    const schedule = () => {
      // Phones get a lighter render: fewer star layers and a 1x pixel ratio.
      setCompact(window.matchMedia("(max-width: 767px)").matches);
      const start = () => setMode(hasSoftwareRendering() ? "static" : "webgl");
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(start, { timeout: 2500 });
      } else {
        timer = window.setTimeout(start, 1200);
      }
    };
    if (document.readyState === "complete") schedule();
    else window.addEventListener("load", schedule, { once: true });
    return () => {
      window.removeEventListener("load", schedule);
      if (idle) window.cancelIdleCallback(idle);
      if (timer) window.clearTimeout(timer);
    };
  }, []);

  // Backup check for slow GPUs the renderer name doesn't reveal: if frames are
  // consistently slow once the starfield is running, swap to the static version.
  useEffect(() => {
    if (mode !== "webgl") return undefined;
    const SAMPLE_MS = 1000;
    const SLOW_FRAME_MS = 50;
    let raf = 0;
    let start = 0;
    let frames = 0;
    const tick = (now: number) => {
      if (!start) start = now;
      else frames += 1;
      if (now - start < SAMPLE_MS) {
        raf = requestAnimationFrame(tick);
        return;
      }
      if (frames > 0 && (now - start) / frames > SLOW_FRAME_MS) setMode("static");
    };
    // Give the shaders a moment to compile before measuring.
    const delay = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, 600);
    return () => {
      window.clearTimeout(delay);
      cancelAnimationFrame(raf);
    };
  }, [mode]);

  if (mode === "pending") return null;
  if (mode === "static") return <StaticStars />;

  return (
    <Galaxy
      starColors={["#eef1f7", "#93b0ff", "#6f95ff", "#45d3e6"]}
      density={1.1}
      glowIntensity={0.5}
      starSize={1.3}
      flareIntensity={1}
      twinkleIntensity={0.3}
      starSpeed={0.5}
      rotationSpeed={0.05}
      focal={[0.72, 0.5]}
      mouseRepulsion
      repulsionStrength={2}
      clickWarp
      intro
      transparent
      layers={compact ? 3 : 4}
      dpr={compact ? 1 : 1.5}
    />
  );
}
