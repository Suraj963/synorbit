import styles from "./ValueProposition.module.css";

const values = [
  {
    title: "Built around your business",
    text: "We shape each solution around your actual requirements, workflows, and the people who will use it, not around a template.",
  },
  {
    title: "Designed for real people",
    text: "Clear layouts, readable content, and accessible controls, so visitors and staff can do what they came to do without help.",
  },
  {
    title: "Engineered to evolve",
    text: "Well-structured, documented code that your team or ours can extend as your business changes.",
  },
];

export function ValueProposition() {
  return (
    <section className="section" aria-labelledby="value-title">
      <div className={`container ${styles.grid}`}>
        <div>
          <h2 id="value-title" className="section-heading">
            Technology should move your business forward.
          </h2>
          <p className="section-lead">
            A website or application is only worth building if it makes something easier: finding
            customers, serving them, or running the work behind the scenes. That means it has to be
            simple to use, dependable day to day, and straightforward to maintain.
          </p>
        </div>
        <ul className={styles.list} data-assemble>
          {values.map((value) => (
            <li key={value.title} className={styles.item}>
              <h3 className={styles.title}>{value.title}</h3>
              <p className={styles.text}>{value.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
