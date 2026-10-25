import { ArrowRight } from "lucide-react";
import { ProjectCard } from "@/components/portfolio/ProjectCard";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { projects } from "@/data/projects";
import styles from "./FeaturedWork.module.css";

export function FeaturedWork() {
  const [featured, ...rest] = projects;
  const secondary = rest.slice(0, 2);

  return (
    <section className="section" aria-labelledby="work-title">
      <div className="container">
        <div className={styles.head}>
          <div>
            <h2 id="work-title" className="section-heading">
              Selected work
            </h2>
            <p className="section-lead">
              Our own studio site, alongside concept studies where we work through common business
              problems from brief to interface. Concept studies are labelled as such: they are not
              client projects.
            </p>
          </div>
          <ButtonLink href="/work" variant="secondary" className={styles.all}>
            View All Work <ArrowRight aria-hidden />
          </ButtonLink>
        </div>

        <div className={styles.grid} data-assemble>
          <div className={styles.featured}>
            <ProjectCard project={featured} featured />
          </div>
          {secondary.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
