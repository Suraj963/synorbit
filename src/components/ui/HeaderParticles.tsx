"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { StaticStars } from "@/components/effects/StaticStars";
import { hasSoftwareRendering } from "@/lib/webgl";

// WebGL only runs in the browser; loading it after hydration keeps it off the critical path.
const Particles = dynamic(() => import("@/components/effects/Particles"), { ssr: false });

/**
 * Particle field behind inner-page headers, in the logo's blues and cyan.
 * Mounts once the page has loaded and the main thread is idle, like the homepage Galaxy;
 * devices without graphics acceleration get a static starfield instead.
 */
export function HeaderParticles() {
  const [ready, setReady] = useState(false);
  const [compact, setCompact] = useState(false);
  const [software, setSoftware] = useState(false);

  useEffect(() => {
    let idle = 0;
    let timer = 0;
    const schedule = () => {
      // Phones get fewer particles and a 1x pixel ratio.
      setCompact(window.matchMedia("(max-width: 767px)").matches);
      setSoftware(hasSoftwareRendering());
      if (typeof window.requestIdleCallback === "function") {
        idle = window.requestIdleCallback(() => setReady(true), { timeout: 2500 });
      } else {
        timer = window.setTimeout(() => setReady(true), 1200);
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

  if (!ready) return null;
  if (software) return <StaticStars />;

  return (
    <Particles
      particleColors={["#eef1f7", "#93b0ff", "#6f95ff", "#45d3e6"]}
      particleCount={compact ? 120 : 220}
      particleSpread={10}
      speed={0.1}
      particleBaseSize={100}
      glow={0.5}
      twinkle={0.3}
      alphaParticles
      moveParticlesOnHover
      hoverEffect="parallax"
      pixelRatio={compact ? 1 : 1.5}
    />
  );
}
