import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import type { CSSProperties } from "react";
import ScrollStack, { ScrollStackItem } from "@/components/effects/ScrollStack";
import { serviceIcons } from "@/components/services/serviceIcons";
import { coreServices } from "@/data/services";
import type { ServiceId } from "@/types/content";
import styles from "./ServicesOverview.module.css";

/** Glow colour for each card, so the stacked edges are easy to tell apart. */
const tones: Partial<Record<ServiceId, string>> = {
  websites: "#6f95ff",
  "web-apps": "#45d3e6",
  "ui-ux": "#a98bff",
  revamp: "#4fd69c",
};

export function ServicesOverview() {
  return (
    <section className="section" aria-labelledby="services-title">
      <div className="container">
        <h2 id="services-title" className="section-heading">
          What we build
        </h2>
        <p className="section-lead">
          From a first website to software your team uses every day, we handle design and
          development together, so nothing gets lost between the two.
        </p>

        {/* Page scroll drives the stack; smoothScroll stays off so the wheel isn't hijacked. */}
        <ScrollStack
          useWindowScroll
          smoothScroll={false}
          className={styles.stack}
          stackPosition={112}
          itemDistance={64}
          itemStackDistance={28}
          itemScale={0.04}
          baseScale={0.88}
          dimAmount={0.3}
          holdDistance={120}
        >
          {coreServices.map((service) => {
            const Icon = serviceIcons[service.id];
            return (
              <ScrollStackItem
                key={service.id}
                itemClassName={styles.card}
                style={{ "--tone": tones[service.id] } as CSSProperties}
              >
                <article className={styles.body}>
                  <div className={styles.main}>
                    <span className={styles.icon}>
                      <Icon aria-hidden />
                    </span>
                    <h3 className={styles.title}>{service.title}</h3>
                    <p className={styles.summary}>{service.summary}</p>
                    <Link href={`/services#${service.id}`} className={styles.link}>
                      Learn more<span className="visually-hidden"> about {service.title}</span>
                      <ArrowRight aria-hidden />
                    </Link>
                  </div>
                  <div className={styles.aside}>
                    <h4 className={styles.asideTitle}>What it covers</h4>
                    <ul className={styles.list}>
                      {service.capabilities.slice(0, 4).map((item) => (
                        <li key={item}>
                          <Check aria-hidden />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              </ScrollStackItem>
            );
          })}
        </ScrollStack>

        <p className={styles.extra} data-reveal>
          We also add practical AI to websites and applications, such as chat assistants and
          workflow automation.{" "}
          <Link href="/services#ai" className="text-link">
            Read about AI features
          </Link>
        </p>
      </div>
    </section>
  );
}
