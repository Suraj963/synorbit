"use client";

import { useEffect } from "react";

/** Single elements that fade and slide up into place. */
const REVEAL_SELECTOR = "[data-reveal], main .section-heading, main .section-lead";
/** Groups whose children fly in from around the group and combine into the layout. */
const ASSEMBLE_SELECTOR = "[data-assemble]";

/** How far into the viewport (from the bottom) an element must be before it plays. */
const TRIGGER_RATIO = 0.88;
const REVEAL_MS = 900;
const ASSEMBLE_MS = 1100;
const STAGGER_MS = 80;
const EASE_OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
/** Slight overshoot so pieces "snap" into place. */
const EASE_SNAP = "cubic-bezier(0.25, 1.25, 0.4, 1)";

type Kind = "reveal" | "assemble";
type Pending = { kind: Kind; holds: Animation[] };

const REVEAL_FROM: Keyframe = { opacity: 0, translate: "0 48px" };
const TRANSPARENT = "rgba(0, 0, 0, 0)";

/**
 * Site-wide scroll animations using the Web Animations API.
 *
 * React's markup is never modified, so there are no hydration mismatches, and if
 * this never runs everything is simply visible. Elements below the fold are held
 * in their starting pose by a paused-in-place animation, then play once they are
 * well inside the viewport, so the motion is actually seen. Elements already on
 * screen at load are left alone. Skipped for prefers-reduced-motion.
 */
export function RevealObserver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (typeof Element.prototype.animate !== "function") return undefined;

    const pending = new Map<Element, Pending>();
    const seen = new WeakSet<Element>();

    const holdPose = (element: Element, pose: Keyframe) =>
      element.animate([pose, pose], { duration: 1, fill: "forwards" });

    /** Starting pose for one piece of a group: pushed out from the group centre and turned. */
    const scatter = (child: Element, group: DOMRect, index: number): Keyframe => {
      const box = child.getBoundingClientRect();
      const dx = box.left + box.width / 2 - (group.left + group.width / 2);
      const dy = box.top + box.height / 2 - (group.top + group.height / 2);
      const distance = Math.hypot(dx, dy);
      const [ux, uy] = distance > 1 ? [dx / distance, dy / distance] : [0, 1];
      const push = 70 + Math.min(distance, 420) * 0.35;
      const turn = (dx >= 0 ? 1 : -1) * (4 + (index % 3) * 2.5);
      // Keep the scattered piece inside the viewport horizontally, so it never
      // widens the page (some mobile browsers allow sideways panning to it).
      // The margin leaves room for the starting tilt.
      const width = document.documentElement.clientWidth;
      const margin = 16;
      const tx = Math.min(
        Math.max(ux * push, Math.min(0, margin - box.left)),
        Math.max(0, width - margin - box.right),
      );
      return {
        opacity: 0,
        translate: `${tx.toFixed(1)}px ${(uy * push + 24).toFixed(1)}px`,
        rotate: `${turn}deg`,
        scale: "0.86",
      };
    };

    /** A framed group (its own background/border) fades its frame in as the pieces land. */
    const frameOf = (group: Element) => {
      const style = getComputedStyle(group);
      const framed =
        style.backgroundColor !== TRANSPARENT || parseFloat(style.borderTopWidth) > 0;
      return framed
        ? {
            from: { backgroundColor: TRANSPARENT, borderColor: TRANSPARENT },
            to: { backgroundColor: style.backgroundColor, borderColor: style.borderTopColor },
          }
        : null;
    };

    const hold = (element: Element, kind: Kind) => {
      const holds: Animation[] = [];
      if (kind === "reveal") {
        holds.push(holdPose(element, REVEAL_FROM));
      } else {
        const group = element.getBoundingClientRect();
        Array.from(element.children).forEach((child, i) =>
          holds.push(holdPose(child, scatter(child, group, i))),
        );
        const frame = frameOf(element);
        if (frame) holds.push(holdPose(element, frame.from));
      }
      pending.set(element, { kind, holds });
    };

    const play = (element: Element, kind: Kind, order: number) => {
      const delay = Math.min(order, 5) * STAGGER_MS;
      if (kind === "reveal") {
        element.animate([REVEAL_FROM, { opacity: 1, translate: "0 0" }], {
          duration: REVEAL_MS,
          delay,
          easing: EASE_OUT,
          fill: "backwards",
        });
        return;
      }
      const group = element.getBoundingClientRect();
      const frame = frameOf(element);
      if (frame) {
        element.animate([frame.from, frame.to], {
          duration: 700,
          delay: delay + 350,
          easing: "ease-out",
          fill: "backwards",
        });
      }
      Array.from(element.children).forEach((child, i) => {
        child.animate(
          [scatter(child, group, i), { opacity: 1, translate: "0 0", rotate: "0deg", scale: "1" }],
          {
            duration: ASSEMBLE_MS,
            delay: delay + Math.min(i, 8) * STAGGER_MS,
            easing: EASE_SNAP,
            fill: "backwards",
          },
        );
      });
    };

    let frame = 0;
    const check = () => {
      frame = 0;
      const line = window.innerHeight * TRIGGER_RATIO;
      const ready: { element: Element; kind: Kind; top: number }[] = [];
      pending.forEach(({ kind, holds }, element) => {
        const box = element.getBoundingClientRect();
        if (box.width === 0 && box.height === 0) return; // hidden (display: none); wait
        if (box.top > line) return; // not far enough in yet
        holds.forEach((animation) => animation.cancel());
        pending.delete(element);
        // Scrolled straight past (e.g. End key): just show it.
        if (box.bottom < 0) return;
        ready.push({ element, kind, top: box.top });
      });
      ready
        .sort((a, b) => a.top - b.top)
        .forEach(({ element, kind }, order) => play(element, kind, order));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };

    const watch = (scope: ParentNode, skipVisible: boolean) => {
      const found: [Element, Kind][] = [
        ...Array.from(scope.querySelectorAll(REVEAL_SELECTOR), (e): [Element, Kind] => [e, "reveal"]),
        ...Array.from(scope.querySelectorAll(ASSEMBLE_SELECTOR), (e): [Element, Kind] => [e, "assemble"]),
      ];
      if (scope instanceof Element) {
        if (scope.matches(REVEAL_SELECTOR)) found.push([scope, "reveal"]);
        if (scope.matches(ASSEMBLE_SELECTOR)) found.push([scope, "assemble"]);
      }
      for (const [element, kind] of found) {
        if (seen.has(element)) continue;
        seen.add(element);
        // Pieces inside an assembling group move with it.
        if (kind === "reveal" && element.parentElement?.closest(ASSEMBLE_SELECTOR)) continue;
        const box = element.getBoundingClientRect();
        const onScreen = box.width > 0 && box.top < window.innerHeight && box.bottom > 0;
        if (onScreen && skipVisible) continue; // first paint: leave visible content alone
        hold(element, kind);
      }
      schedule();
    };

    watch(document, true);

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    // New pages (client navigation) and elements being shown or hidden.
    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        record.addedNodes.forEach((node) => {
          if (node instanceof Element) watch(node, false);
        });
      }
      schedule();
    });
    mutations.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden", "class", "style"],
    });

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      mutations.disconnect();
      pending.forEach(({ holds }) => holds.forEach((animation) => animation.cancel()));
    };
  }, []);

  return null;
}
