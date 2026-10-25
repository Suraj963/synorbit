import Link from "next/link";
import type { Project } from "@/types/content";
import { ProjectMockup } from "./ProjectMockup";
import styles from "./ProjectCard.module.css";

export const kindLabel: Record<Project["kind"], string> = {
  "in-house": "In-house project",
  concept: "Concept study",
};

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  headingLevel?: "h2" | "h3";
}

export function ProjectCard({ project, featured = false, headingLevel: Heading = "h3" }: ProjectCardProps) {
  return (
    <article className={`${styles.card} ${featured ? styles.featured : ""}`}>
      <Link href={`/work/${project.slug}`} className={`project-link ${styles.link}`}>
        <div className={styles.media}>
          <ProjectMockup
            variant={project.mockup}
            screenshot={project.screenshot}
            label={`Preview of ${project.name}`}
          />
        </div>
        <div className={styles.body}>
          <p className={styles.meta}>
            <span className={`${styles.kind} ${styles[project.kind]}`}>{kindLabel[project.kind]}</span>
            <span>{project.categories.join(", ")}</span>
          </p>
          <Heading className={styles.title}>{project.name}</Heading>
          <p className={styles.summary}>{project.summary}</p>
          <span className={styles.more}>
            {project.kind === "concept" ? "Read the concept study" : "Read the case study"}
          </span>
        </div>
      </Link>
    </article>
  );
}
