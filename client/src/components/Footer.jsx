import { Link } from "react-router-dom";
import Container from "./Container.jsx";

const footerLinks = [
  {
    title: "Shop",
    links: [
      { label: "Silicone Bench Mat", to: "/product" },
      { label: "Cart", to: "/cart" }
    ]
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", to: "/faq" },
      { label: "Contact", to: "/contact" },
      { label: "Shipping", to: "/shipping" },
      { label: "Returns", to: "/returns" }
    ]
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Privacy", to: "/privacy" },
      { label: "Terms", to: "/terms" }
    ]
  }
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <div className="footer-brand">
          <span>ARKN / arcane</span>
          <strong>ARKN</strong>
          <p>Premium powerlifting equipment built for deliberate training.</p>
        </div>

        <div className="footer-links">
          {footerLinks.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2>{group.title}</h2>
              {group.links.map((link) => (
                <Link key={link.to} to={link.to}>
                  {link.label}
                </Link>
              ))}
            </nav>
          ))}
        </div>
      </Container>
    </footer>
  );
}
