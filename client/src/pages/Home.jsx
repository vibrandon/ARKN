import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import { arknBenchMatProduct } from "../data/products.js";

const problemPoints = [
  {
    title: "Slippery bench pads",
    text: "Sweat, worn vinyl, and inconsistent pad textures can break the setup before the press starts."
  },
  {
    title: "Changing contact points",
    text: "Different benches create different upper-back feel, even when the movement stays the same."
  },
  {
    title: "Poor upper-back grip",
    text: "When the shoulders cannot stay anchored, tightness leaks out of the position."
  }
];

const conversionBenefits = [
  {
    title: "Upper-back traction",
    text: "Textured silicone helps your setup feel deliberate instead of dependent on the bench pad."
  },
  {
    title: "Repeatable setup",
    text: "Use the same contact layer across home gyms, commercial gyms, and meet prep."
  },
  {
    title: "Portable by design",
    text: "Roll it, pack it, and keep a serious bench setup in your training bag."
  },
  {
    title: "Wipe-clean silicone",
    text: "A personal surface that cleans quickly after heavy sessions."
  }
];

const brandPrinciples = ["Minimal equipment", "Serious materials", "Built around the lift"];

export default function Home() {
  const product = arknBenchMatProduct;
  const heroImage = product.images.find((image) => image.role === "hero") ?? product.images[0];
  const faqPreview = product.faq.slice(0, 3);

  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-heading">
        <Container className="home-hero-inner">
          <div className="home-hero-copy">
            <div className="home-hero-meta">
              <p className="eyebrow">Premium powerlifting equipment</p>
              <span>MVP preview</span>
            </div>
            <h1 id="home-heading">ARKN Silicone Bench Mat</h1>
            <p className="home-hero-text">
              A portable silicone contact layer for stronger upper-back grip, repeatable setup, and
              serious bench sessions wherever you train.
            </p>
            <div className="hero-actions">
              <Button to="/product">View product</Button>
              <Button to="/faq" variant="secondary">
                Read FAQ
              </Button>
            </div>
          </div>

          <div className="home-hero-media" aria-label={`${product.title} product visual`}>
            <img src={heroImage.src} alt={heroImage.alt} />
            <div className="home-hero-card">
              <span>{product.price.display}</span>
              <strong>{product.variant.title}</strong>
              <p>{product.benefits[0].text}</p>
            </div>
          </div>
        </Container>
      </section>

      <Container className="home-section problem-section" as="section" aria-labelledby="problem-heading">
        <div className="home-section-kicker">
          <p className="eyebrow">The problem</p>
          <h2 id="problem-heading">The bench should not decide your setup.</h2>
        </div>
        <div className="home-card-grid three-card-grid">
          {problemPoints.map((point, index) => (
            <article className="home-card problem-card" key={point.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{point.title}</h3>
              <p>{point.text}</p>
            </article>
          ))}
        </div>
      </Container>

      <Container className="home-section solution-section" as="section" aria-labelledby="solution-heading">
        <div className="solution-panel">
          <div>
            <p className="eyebrow">The solution</p>
            <h2 id="solution-heading">{product.title}</h2>
            <p>
              A durable silicone bench layer designed for lifters who need upper-back traction, setup
              consistency, and a personal surface without adding bulky equipment.
            </p>
          </div>
          <div className="solution-points" aria-label="Product strengths">
            {product.features.map((feature) => (
              <div key={feature.title}>
                <strong>{feature.title}</strong>
                <span>{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <Container className="home-section" as="section" aria-labelledby="benefits-heading">
        <div className="home-section-heading">
          <p className="eyebrow">Benefits</p>
          <h2 id="benefits-heading">Built for the parts of bench setup that matter.</h2>
        </div>
        <div className="home-card-grid benefits-grid">
          {conversionBenefits.map((benefit) => (
            <article className="home-card benefit-card" key={benefit.title}>
              <h3>{benefit.title}</h3>
              <p>{benefit.text}</p>
            </article>
          ))}
        </div>
      </Container>

      <Container className="home-section in-use-section" as="section" aria-labelledby="in-use-heading">
        <div className="in-use-copy">
          <p className="eyebrow">In use</p>
          <h2 id="in-use-heading">Set your position once. Keep the same surface under you.</h2>
          <p>
            The mat is made to sit between lifter and bench pad, giving your upper back a cleaner
            interface for warmups, working sets, and heavy attempts.
          </p>
        </div>
        <div className="in-use-visual" aria-label="Product-in-use visual">
          <div className="bench-visual-surface">
            <img src={heroImage.src} alt="" aria-hidden="true" />
          </div>
        </div>
      </Container>

      <Container className="home-section brand-section" as="section" aria-labelledby="brand-heading">
        <div className="brand-copy">
          <p className="eyebrow">ARKN, pronounced arcane</p>
          <h2 id="brand-heading">Equipment for lifters who notice the small losses.</h2>
          <p>
            ARKN is a premium powerlifting brand focused on precise, durable tools. The bench mat is
            the first product because setup quality is not a detail. It is part of the lift.
          </p>
        </div>
        <div className="brand-principles" aria-label="ARKN principles">
          {brandPrinciples.map((principle) => (
            <span key={principle}>{principle}</span>
          ))}
        </div>
      </Container>

      <Container className="home-section faq-preview-section" as="section" aria-labelledby="faq-preview-heading">
        <div className="home-section-heading">
          <p className="eyebrow">FAQ</p>
          <h2 id="faq-preview-heading">Straight answers before launch.</h2>
        </div>
        <div className="faq-list">
          {faqPreview.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
        <Button to="/faq" variant="secondary">
          View all FAQ
        </Button>
      </Container>

      <Container className="home-final-cta" as="section" aria-labelledby="final-cta-heading">
        <p className="eyebrow">Ready for a cleaner setup</p>
        <h2 id="final-cta-heading">Make the bench feel like your bench.</h2>
        <p>Start with the contact point. The rest of the setup gets easier to repeat.</p>
        <Button to="/product">View {product.title}</Button>
      </Container>
    </div>
  );
}
