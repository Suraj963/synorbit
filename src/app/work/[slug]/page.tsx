import { ArrowLeft, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { kindLabel } from "@/components/portfolio/ProjectCard";
import { ProjectMockup } from "@/components/portfolio/ProjectMockup";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getProject, projects } from "@/data/projects";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

// Every project page is prerendered from generateStaticParams and unknown slugs are
// 404'd by src/proxy.ts, so a blocking render (no streamed shell) is fine here.
export const instant = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const prefix = project.kind === "concept" ? "Concept study: " : "";
  return pageMetadata({
    title: `${prefix}${project.name}`,
    description: project.summary,
    path: `/work/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const isConcept = project.kind === "concept";

  return (
    <>
      <article>
        <header className={styles.header}>
          <div className="container">
            <Link href="/work" className={styles.back}>
              <ArrowLeft aria-hidden /> All work
            </Link>
            <p className={styles.meta}>
              <span className={`${styles.kind} ${isConcept ? styles.concept : ""}`}>
                {kindLabel[project.kind]}
              </span>
              <span>{project.categories.join(", ")}</span>
            </p>
            <h1 className={styles.title}>{project.name}</h1>
            <p className={styles.lead}>{project.overview}</p>
            {project.liveUrl && (
              <a href={project.liveUrl} className={styles.live} target="_blank" rel="noreferrer">
                Visit the live site <ArrowUpRight aria-hidden />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        </header>

        <div className="container">
          <div className={styles.visual} data-reveal>
            <ProjectMockup
              variant={project.mockup}
              screenshot={project.screenshot}
              sizes="(min-width: 1280px) 1200px, 100vw"
              preload
              label={`Interface preview of ${project.name}`}
            />
          </div>

          {isConcept && (
            <p className={styles.disclaimer} data-reveal>
              This is a concept study, not a client project. It shows how we would approach the
              problem; it does not describe a real deployment or its results.
            </p>
          )}

          <div className={styles.body}>
            <section className={styles.block} aria-labelledby="challenge" data-reveal>
              <h2 id="challenge">{isConcept ? "The problem" : "The challenge"}</h2>
              <p>{project.challenge}</p>
            </section>

            <section className={styles.block} aria-labelledby="approach" data-reveal>
              <h2 id="approach">Approach</h2>
              <ol className={styles.steps} data-assemble>
                {project.approach.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </section>

            <div className={styles.facts} data-reveal>
              <section aria-labelledby="deliverables">
                <h2 id="deliverables">Deliverables</h2>
                <ul>
                  {project.deliverables.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              </section>
              <section aria-labelledby="technologies">
                <h2 id="technologies">Technologies</h2>
                <ul className={styles.tech}>
                  {project.technologies.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </article>

      <div className={styles.spacer} />
      <FinalCTA
        title="Have a similar problem to solve?"
        text="Tell us about it. We'll share how we would approach it for your business."
      />
    </>
  );
}
