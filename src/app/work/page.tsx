import { WorkGrid } from "@/components/portfolio/WorkGrid";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "Work",
  description:
    "Website and web application work by Synorbit, including our own studio site and clearly labelled concept studies.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHeader
        title="Selected work. Thoughtfully built."
        lead="Examples of how we approach design and engineering, from structuring content to building the interface."
      />

      <section className="section" aria-label="Projects">
        <div className="container">
          <aside className={styles.note} aria-label="About these projects" data-reveal>
            <p>
              <strong>About these projects.</strong> The Synorbit website is our own in-house
              build. The others are <em>concept studies</em>: self-initiated projects where we work
              through a realistic business problem. They are not client engagements and make no
              claims about results. Client case studies will be added here as projects are completed
              and approved for publication.
            </p>
          </aside>
          <WorkGrid />
        </div>
      </section>

      <FinalCTA
        title="Your project could be the next one here."
        text="Tell us what you're working on and we'll talk through how we would approach it."
      />
    </>
  );
}
