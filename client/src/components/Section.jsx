import Container from "./Container.jsx";

export default function Section({ children, className = "", eyebrow, id, lead, title, titleAs: Title = "h1" }) {
  return (
    <section className={["page-section", className].filter(Boolean).join(" ")} id={id}>
      <Container>
        {(eyebrow || title || lead) && (
          <div className="section-heading">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <Title>{title}</Title>}
            {lead && <p>{lead}</p>}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
