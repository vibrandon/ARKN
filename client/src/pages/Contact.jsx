import Button from "../components/Button.jsx";
import Section from "../components/Section.jsx";

export default function Contact() {
  return (
    <Section
      eyebrow="Contact"
      title="Talk to ARKN."
      lead="Questions about the bench mat, orders, or wholesale availability can route through this page once support tooling is added."
    >
      <div className="surface-card narrow-card">
        <h2>Support contact</h2>
        <p>Contact form and support email integration are not wired yet.</p>
        <Button href="mailto:support@arkn.example" variant="secondary">
          Email support
        </Button>
      </div>
    </Section>
  );
}

