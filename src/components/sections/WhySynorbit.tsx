import styles from "./WhySynorbit.module.css";

const reasons = [
  {
    title: "You talk to the people doing the work",
    text: "Questions go straight to the designers and developers on your project, without layers of account management.",
  },
  {
    title: "Scope is agreed before we build",
    text: "We write down what is included, what isn't, and what happens if priorities change, so there are no surprises later.",
  },
  {
    title: "Design with a purpose",
    text: "Every layout decision is tied to something your visitors or users need to do.",
  },
  {
    title: "Code you can maintain",
    text: "Clear structure, sensible naming, and documentation, so future changes don't require a rewrite.",
  },
  {
    title: "Works on every screen",
    text: "We design and test for phones, tablets, and desktops from the start, not as an afterthought.",
  },
  {
    title: "Progress you can see",
    text: "Regular updates and working previews mean you always know where the project stands.",
  },
];

export function WhySynorbit() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className={`container ${styles.grid}`}>
        <div className={styles.intro}>
          <h2 id="why-title" className="section-heading">
            Why work with Synorbit
          </h2>
          <p className="section-lead">
            We are a focused studio. That shapes how we work: closely with you, with clear
            decisions, and with your business goals as the measure of whether something is done.
          </p>
        </div>
        <ul className={styles.list} data-assemble>
          {reasons.map((reason) => (
            <li key={reason.title} className={styles.item}>
              <h3 className={styles.title}>{reason.title}</h3>
              <p className={styles.text}>{reason.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
