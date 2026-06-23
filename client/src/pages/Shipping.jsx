import Section from "../components/Section.jsx";

export default function Shipping() {
  return (
    <Section
      eyebrow="Shipping"
      title="Shipping information"
      lead="This page will explain shipping regions, processing times, and delivery expectations."
    >
      <div className="policy-copy">
        <p>Shipping details are not final yet. Add carrier, region, and fulfillment details before launch.</p>
      </div>
    </Section>
  );
}

