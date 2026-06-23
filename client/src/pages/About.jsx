import Section from "../components/Section.jsx";

export default function About() {
  return (
    <Section
      eyebrow="About ARKN"
      title="Equipment for lifters who care about the setup."
      lead="ARKN, pronounced arcane, is a premium powerlifting brand built around focused tools, restrained design, and repeatable performance."
    >
      <div className="content-grid">
        <article className="surface-card">
          <span>01</span>
          <h2>Serious by default</h2>
          <p>ARKN avoids loud gym styling and focuses on durable details that belong in hard training environments.</p>
        </article>
        <article className="surface-card">
          <span>02</span>
          <h2>Minimal kit</h2>
          <p>The range starts with one deliberate product: a bench mat made to improve contact, hygiene, and consistency.</p>
        </article>
      </div>
    </Section>
  );
}

