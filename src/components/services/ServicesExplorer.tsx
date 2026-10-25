"use client";

import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Folder from "@/components/effects/Folder";
import { ButtonLink } from "@/components/ui/ButtonLink";
import type { Service, ServiceId } from "@/types/content";
import { serviceIcons } from "./serviceIcons";
import styles from "./ServicesExplorer.module.css";

const tones: Record<ServiceId, string> = {
  websites: "#6f95ff",
  "web-apps": "#45d3e6",
  "ui-ux": "#a98bff",
  revamp: "#4fd69c",
  ai: "#f0c46a",
};

const panelId = (id: ServiceId) => `${id}-panel`;
const tabId = (id: ServiceId) => `${id}-tab`;

/**
 * The Services folder: opening it fans out one page per service, and choosing a
 * page (or a tab below) shows that service's details. Every panel is rendered
 * so the content stays in the HTML; only the chosen one is visible.
 */
export function ServicesExplorer({ services }: { services: Service[] }) {
  const [selected, setSelected] = useState<ServiceId>(services[0].id);
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const detailsRef = useRef<HTMLDivElement>(null);

  const show = (id: ServiceId, scroll: boolean) => {
    setSelected(id);
    window.history.replaceState(null, "", `#${id}`);
    if (!scroll) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Wait for the panel to become visible before scrolling to it.
    requestAnimationFrame(() =>
      detailsRef.current?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }),
    );
  };

  // Open the service named in the URL (e.g. /services#web-apps from the homepage).
  useEffect(() => {
    const fromHash = () => {
      const id = window.location.hash.slice(1);
      const match = services.find((s) => s.id === id);
      if (!match) return;
      setSelected(match.id);
      requestAnimationFrame(() => detailsRef.current?.scrollIntoView({ block: "start" }));
    };
    fromHash();
    window.addEventListener("hashchange", fromHash);
    return () => window.removeEventListener("hashchange", fromHash);
  }, [services]);

  // Phones get a smaller folder whose pages stack instead of fanning out sideways.
  useEffect(() => {
    const query = window.matchMedia("(max-width: 639px)");
    const update = () => setCompact(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <div className={styles.explorer}>
      <div className={`${styles.stage} ${compact ? styles.stageCompact : ""}`}>
        <Folder
          label="Services"
          color="#4f7bff"
          mode="flap"
          variant="solid"
          layout={compact ? "stack" : "spread"}
          size={compact ? 1.15 : 1.45}
          open={open}
          onOpenChange={setOpen}
          onItemClick={(_, index) => show(services[index].id, true)}
          zoomOnClick={false}
          draggable={false}
          tilt={0.4}
          className={styles.folder}
        >
          {services.map((service) => {
            const Icon = serviceIcons[service.id];
            return (
              <div
                key={service.id}
                className={`${styles.page} ${selected === service.id ? styles.pageActive : ""}`}
                style={{ "--tone": tones[service.id] } as React.CSSProperties}
              >
                <span className={styles.pageIcon}>
                  <Icon aria-hidden />
                </span>
                <span className={styles.pageTitle}>{service.title}</span>
                <span className={styles.pageTagline}>{service.tagline}</span>
                <span className={styles.pageMore}>View details</span>
              </div>
            );
          })}
        </Folder>
        <p className={styles.hint} aria-live="polite">
          {open ? "Choose a page to see what that service includes." : "Click the folder to see all our services."}
        </p>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Services" data-assemble>
        {services.map((service) => (
          <button
            key={service.id}
            id={tabId(service.id)}
            type="button"
            role="tab"
            aria-selected={selected === service.id}
            aria-controls={panelId(service.id)}
            className={styles.tab}
            style={{ "--tone": tones[service.id] } as React.CSSProperties}
            onClick={() => show(service.id, false)}
          >
            {service.title}
          </button>
        ))}
      </div>

      <div ref={detailsRef} className={styles.details}>
        {services.map((service) => {
          const Icon = serviceIcons[service.id];
          return (
            <section
              key={service.id}
              id={panelId(service.id)}
              role="tabpanel"
              aria-labelledby={tabId(service.id)}
              hidden={selected !== service.id}
              className={styles.panel}
              data-reveal
              style={{ "--tone": tones[service.id] } as React.CSSProperties}
            >
              <div className={styles.layout}>
                <div className={styles.head}>
                  <span className={styles.icon}>
                    <Icon aria-hidden />
                  </span>
                  <h2 className={styles.title}>{service.title}</h2>
                  <p className={styles.intro}>{service.intro}</p>
                  <div className={styles.forWho}>
                    <h3>Who it’s for</h3>
                    <p>{service.forWho}</p>
                  </div>
                </div>

                <div className={styles.body}>
                  <div className={styles.block}>
                    <h3>Problems it addresses</h3>
                    <ul className={styles.problems}>
                      {service.problems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.block}>
                    <h3>What we can cover</h3>
                    <ul className={styles.checklist}>
                      {service.capabilities.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.block}>
                    <h3>Typical deliverables</h3>
                    <ul className={styles.tags}>
                      {service.deliverables.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className={styles.block}>
                    <h3>How it works</h3>
                    <p className={styles.engagement}>{service.engagement}</p>
                  </div>

                  <div>
                    <ButtonLink href={`/contact?type=${service.enquiryType}`}>
                      {service.cta}
                      <ArrowRight aria-hidden />
                    </ButtonLink>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
