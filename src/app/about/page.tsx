import { FinalCTA } from "@/components/sections/FinalCTA";
import { PageHeader } from "@/components/ui/PageHeader";
import { pageMetadata } from "@/lib/metadata";
import styles from "./page.module.css";

export const metadata = pageMetadata({
  title: "About Us",
  description:
    "Synorbit is a website and web application development studio that combines interface design with practical engineering.",
  path: "/about",
});

const principles = [
  {
    title: "Clarity",
    text: "Understand the problem before choosing the solution. We ask questions until the goal is specific enough to design for.",
  },
  {
    title: "Craft",
    text: "Pay attention to the details that make digital products useful and polished: spacing, wording, states, edge cases.",
  },
  {
    title: "Reliability",
    text: "Build with maintainability, testing, and predictable behaviour in mind, so the product keeps working after launch.",
  },
  {
    title: "Collaboration",
    text: "Keep requirements, decisions, and progress understandable throughout the project, for everyone involved.",
  },
];

const capabilities = [
  {
    title: "Requirements analysis",
    text: "Turning goals, constraints, and user needs into a scope that can be designed and built.",
  },
  {
    title: "Information architecture",
    text: "Deciding what content and features go where, and how people move between them.",
  },
  {
    title: "Responsive interface development",
    text: "Interfaces that adapt to phones, tablets, and large screens, built with accessible markup.",
  },
  {
    title: "Application architecture",
    text: "Structuring code, data, and services so the product is dependable and can grow.",
  },
  {
    title: "API integration",
    text: "Connecting to payment, messaging, mapping, or business systems when a project needs them.",
  },
  {
    title: "Testing and deployment",
    text: "Checking behaviour across devices and browsers, then releasing to reliable hosting.",
  },
  {
    title: "Ongoing improvements",
    text: "Iterating after launch, when that is part of the agreement.",
  },
];

const expectations = [
  {
    title: "A clear picture of your requirements",
    text: "We confirm what you need in writing before work begins, so we are solving the same problem.",
  },
  {
    title: "An honest conversation about scope",
    text: "We help you decide what belongs in the first release and what can wait, based on budget and priorities.",
  },
  {
    title: "Regular progress updates",
    text: "You hear from us at agreed intervals, with something to look at, not just a status line.",
  },
  {
    title: "Chances to review and give feedback",
    text: "Designs and working builds are shared at each stage, while changes are still easy to make.",
  },
  {
    title: "A clean handover",
    text: "Access, credentials, and documentation are handed over as agreed, so you stay in control of what you own.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        title="We turn complex requirements into clear digital experiences."
        lead="Synorbit is a studio focused on websites and web applications. We bring interface design and engineering together so that what looks right on screen also works reliably underneath."
      />

      <section className="section" aria-labelledby="intro-title">
        <div className={`container ${styles.intro}`}>
          <h2 id="intro-title" className="section-heading">
            What we focus on
          </h2>
          <div className={styles.introCopy} data-reveal>
            <p>
              Most of our work falls into two categories: websites that represent a business well,
              and web applications that help a business run. Both start the same way: by
              understanding who the users are, what they are trying to do, and what the business
              needs in return.
            </p>
            <p>
              We care about usability and technical quality equally. A beautiful interface that is
              slow or fragile lets people down, and so does solid code hidden behind a confusing
              screen. We aim for products that are easy to use and easy to look after.
            </p>
            <p>
              We prefer purposeful solutions over impressive-sounding ones. If a simpler approach
              meets the goal, we’ll recommend it, and we’ll explain the trade-offs when a more
              involved one is worth it.
            </p>
          </div>
        </div>
      </section>

      <section className="section section-paper" aria-labelledby="principles-title">
        <div className="container">
          <h2 id="principles-title" className="section-heading">
            Principles we work by
          </h2>
          <ul className={styles.principles} data-assemble>
            {principles.map((p) => (
              <li key={p.title} className={styles.principle}>
                <h3 className={styles.principleTitle}>{p.title}</h3>
                <p className={styles.principleText}>{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="capabilities-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.splitIntro}>
            <h2 id="capabilities-title" className="section-heading">
              Design and engineering, side by side
            </h2>
            <p className="section-lead">
              Design decisions affect how something is built, and technical constraints affect how
              it should be designed. Keeping both in one team avoids the gaps that open up when
              they are handed between separate groups. Which of these a project needs depends on its
              scope.
            </p>
          </div>
          <dl className={styles.capabilities} data-assemble>
            {capabilities.map((c) => (
              <div key={c.title} className={styles.capability}>
                <dt>{c.title}</dt>
                <dd>{c.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section" aria-labelledby="relationship-title">
        <div className={`container ${styles.split}`}>
          <div className={styles.splitIntro}>
            <h2 id="relationship-title" className="section-heading">
              Working together
            </h2>
            <p className="section-lead">What you can expect from us during a project.</p>
          </div>
          <ul className={styles.expectations} data-assemble>
            {expectations.map((e) => (
              <li key={e.title}>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <FinalCTA
        title="Let's build something useful."
        text="Tell us about your business and what you have in mind. We'll come back with questions, ideas, and a sensible next step."
        cta="Discuss Your Project"
      />
    </>
  );
}
