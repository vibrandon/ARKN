import { useState } from "react";
import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import { useCart } from "../cart/CartContext.jsx";
import { arknBenchMatProduct } from "../data/products.js";

const galleryItems = [
  {
    id: "main",
    label: "Studio product view",
    type: "image"
  },
  {
    id: "texture",
    label: "Texture detail",
    type: "placeholder"
  },
  {
    id: "rolled",
    label: "Rolled profile",
    type: "placeholder"
  },
  {
    id: "setup",
    label: "Bench setup",
    type: "placeholder"
  }
];

const materialCare = [
  "Durable silicone surface built for repeated bench sessions.",
  "Textured contact face for upper-back grip and setup consistency.",
  "Wipe clean after training and allow to dry before packing.",
  "Roll loosely for storage; avoid sharp edges and prolonged direct heat."
];

const shippingReturns = [
  {
    title: "Shipping",
    text: "Shipping details will be confirmed before launch. The mat is designed to pack compactly without bulky packaging."
  },
  {
    title: "Returns",
    text: "Returns policy will stay simple and visible before purchase. Full storefront policy pages are already in place."
  }
];

export default function Product() {
  const product = arknBenchMatProduct;
  const heroImage = product.images.find((image) => image.role === "hero") ?? product.images[0];
  const selectedOptions = product.variant.selectedOptions.map((option) => option.value).join(" / ");
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [cartMessage, setCartMessage] = useState("");

  function setSafeQuantity(value) {
    const nextQuantity = Number(value);

    if (!Number.isFinite(nextQuantity)) {
      return;
    }

    setQuantity(Math.min(10, Math.max(1, Math.trunc(nextQuantity))));
    setCartMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    addItem(product, quantity);
    setCartMessage(`${quantity} ${quantity === 1 ? "mat" : "mats"} added to your cart.`);
  }

  return (
    <div className="product-page">
      <Container className="pdp-hero" as="section" aria-labelledby="product-heading">
        <div className="pdp-gallery" aria-label={`${product.title} gallery`}>
          <div className="pdp-main-image">
            <img src={heroImage.src} alt={heroImage.alt} />
          </div>
          <div className="pdp-thumbnails">
            {galleryItems.map((item, index) => (
              <div className="pdp-thumbnail" key={item.id}>
                {item.type === "image" ? (
                  <img src={heroImage.src} alt="" aria-hidden="true" />
                ) : (
                  <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                )}
                <strong>{item.label}</strong>
              </div>
            ))}
          </div>
        </div>

        <form className="pdp-buy-panel" onSubmit={handleSubmit}>
          <div className="pdp-buy-intro">
            <p className="eyebrow">Hero product</p>
            <h1 id="product-heading">{product.title}</h1>
            <p className="pdp-price">{product.price.display}</p>
            <p className="pdp-summary">
              A portable silicone contact layer for stronger upper-back grip, cleaner bench setup, and a
              more repeatable press.
            </p>
          </div>

          <ul className="pdp-benefit-list" aria-label="Product benefits">
            {product.benefits.map((benefit) => (
              <li key={benefit.title}>
                <strong>{benefit.title}</strong>
                <span>{benefit.text}</span>
              </li>
            ))}
          </ul>

          <div className="pdp-variant">
            <span>Variant</span>
            <strong>{selectedOptions || product.variant.title}</strong>
          </div>

          <label className="field" htmlFor="product-quantity">
            Quantity
            <div className="quantity-control product-quantity-control">
              <button type="button" onClick={() => setSafeQuantity(quantity - 1)} aria-label="Decrease quantity">
                -
              </button>
              <input
                id="product-quantity"
                min="1"
                max="10"
                type="number"
                value={quantity}
                onChange={(event) => setSafeQuantity(event.target.value)}
              />
              <button type="button" onClick={() => setSafeQuantity(quantity + 1)} aria-label="Increase quantity">
                +
              </button>
            </div>
          </label>

          <button className="button button-primary pdp-add-button" type="submit">
            Add to Cart
          </button>
          <p className="checkout-note" aria-live="polite">
            {cartMessage || "Build a local cart. Checkout setup is still in progress."}
          </p>

          <div className="pdp-trust-strip" aria-label="Purchase confidence">
            <span>Durable silicone</span>
            <span>Wipe-clean surface</span>
            <span>Portable setup layer</span>
          </div>
        </form>
      </Container>

      <Container className="pdp-section pdp-description" as="section" aria-labelledby="description-heading">
        <div>
          <p className="eyebrow">Description</p>
          <h2 id="description-heading">Control the bench contact point.</h2>
        </div>
        <p>
          {product.description} It is built for lifters who want better upper-back traction on worn,
          slick, or unfamiliar bench pads without carrying bulky accessories.
        </p>
      </Container>

      <Container className="pdp-section" as="section" aria-labelledby="features-heading">
        <div className="pdp-section-heading">
          <p className="eyebrow">Features</p>
          <h2 id="features-heading">Simple equipment with a clear job.</h2>
        </div>
        <div className="pdp-feature-grid">
          {product.features.map((feature, index) => (
            <article className="pdp-feature-card" key={feature.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </Container>

      <Container className="pdp-section pdp-care-section" as="section" aria-labelledby="care-heading">
        <div className="pdp-section-heading">
          <p className="eyebrow">Materials and care</p>
          <h2 id="care-heading">Made to be used, cleaned, and packed.</h2>
        </div>
        <ul className="pdp-care-list">
          {materialCare.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </Container>

      <Container className="pdp-section pdp-policy-section" as="section" aria-labelledby="shipping-returns-heading">
        <div className="pdp-section-heading">
          <p className="eyebrow">Shipping and returns</p>
          <h2 id="shipping-returns-heading">Clear policy pages before commerce goes live.</h2>
        </div>
        <div className="pdp-policy-grid">
          {shippingReturns.map((item) => (
            <article className="pdp-policy-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
        <div className="pdp-policy-actions">
          <Button to="/shipping" variant="secondary">
            Shipping details
          </Button>
          <Button to="/returns" variant="secondary">
            Returns details
          </Button>
        </div>
      </Container>

      <Container className="pdp-section pdp-faq-section" as="section" aria-labelledby="product-faq-heading">
        <div className="pdp-section-heading">
          <p className="eyebrow">Product FAQ</p>
          <h2 id="product-faq-heading">Practical answers for the first product.</h2>
        </div>

        <div className="faq-list">
          {product.faq.map((item, index) => (
            <details key={item.question} open={index === 0}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>

      <form className="mobile-add-bar" onSubmit={handleSubmit} aria-label="Mobile add to cart">
        <div>
          <strong>{product.title}</strong>
          <span>{product.price.display}</span>
        </div>
        <button className="button button-primary" type="submit">
          Add to Cart
        </button>
      </form>
    </div>
  );
}
