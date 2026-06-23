import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../cart/CartContext.jsx";

const LOGO_SRC = "/assets/arkn-logo.png";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Product", to: "/product" },
  { label: "About", to: "/about" },
  { label: "FAQ", to: "/faq" },
  { label: "Contact", to: "/contact" }
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [logoMissing, setLogoMissing] = useState(false);
  const { itemCount } = useCart();
  const cartLabel = `Cart, ${itemCount} ${itemCount === 1 ? "item" : "items"}`;

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <header className="site-header">
      <Link className="brand" to="/" aria-label="ARKN home" onClick={closeMenu}>
        {!logoMissing ? (
          <img src={LOGO_SRC} alt="ARKN" className="brand-logo" onError={() => setLogoMissing(true)} />
        ) : (
          <span className="brand-wordmark">ARKN</span>
        )}
      </Link>

      <button
        className="nav-toggle"
        type="button"
        aria-label="Toggle navigation"
        aria-expanded={isOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsOpen((current) => !current)}
      >
        <span />
        <span />
      </button>

      <div className={["nav-panel", isOpen ? "is-open" : ""].filter(Boolean).join(" ")} id="primary-navigation">
        <nav className="nav-links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} onClick={closeMenu}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <NavLink className="cart-link" to="/cart" aria-label={cartLabel} onClick={closeMenu}>
          <span>Cart</span>
          <span className="cart-count" aria-hidden="true">
            {itemCount}
          </span>
        </NavLink>
      </div>
    </header>
  );
}
