import Section from "../components/Section.jsx";
import { arknBenchMatProduct } from "../data/products.js";

const storefrontFaqs = [
  {
    question: "Is checkout live yet?",
    answer: "Not in this shell. The route structure is ready, but commerce wiring is intentionally out of scope here."
  },
  {
    question: "Where should the logo file go?",
    answer: "Place the production logo at public/assets/arkn-logo.png inside the client app."
  }
];

export default function FAQ() {
  const faqs = [...arknBenchMatProduct.faq, ...storefrontFaqs];

  return (
    <Section eyebrow="FAQ" title="Answers before the full store goes live.">
      <div className="faq-list standalone-faq">
        {faqs.map((item, index) => (
          <details key={item.question} open={index === 0}>
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
