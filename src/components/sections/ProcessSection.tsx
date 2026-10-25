import styles from "./ProcessSection.module.css";

const steps = [
  {
    title: "Discover",
    text: "We learn about your business, your audience, and what the project needs to achieve.",
  },
  {
    title: "Define",
    text: "We agree on scope, user flows, technical direction, and what matters most for the first release.",
  },
  {
    title: "Design",
    text: "We structure the content and design the interface, sharing it with you for feedback.",
  },
  {
    title: "Develop",
    text: "We build with attention to quality, accessibility, and code that is easy to maintain.",
  },
  {
    title: "Deliver",
    text: "We test, refine, and deploy, then hand over or plan ongoing improvements if agreed.",
  },
];

export function ProcessSection() {
  return (
    <section className="section section-paper" aria-labelledby="process-title">
      <div className="container">
        <h2 id="process-title" className="section-heading">
          How a project comes together
        </h2>
        <p className="section-lead">
          Every project goes through these five stages. How long each one takes depends on the size
          and complexity of what we are building: a landing page and a customer portal move at very
          different speeds.
        </p>

        <ol className={styles.steps} data-assemble>
          {steps.map((step, index) => (
            <li key={step.title} className={styles.step}>
              <span className={styles.marker} aria-hidden>
                {index + 1}
              </span>
              <h3 className={styles.title}>{step.title}</h3>
              <p className={styles.text}>{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
