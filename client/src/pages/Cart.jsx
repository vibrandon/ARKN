import Button from "../components/Button.jsx";
import Container from "../components/Container.jsx";
import { formatCartMoney, useCart } from "../cart/CartContext.jsx";

const reassuranceItems = ["Local MVP cart", "Quantity saved on this device", "Checkout not active yet"];

export default function Cart() {
  const { items, itemCount, removeItem, setItemQuantity, subtotalDisplay } = useCart();
  const isCartEmpty = items.length === 0;

  function itemLineTotal(item) {
    const amount = Number(item.price?.amount);
    return formatCartMoney(Number.isFinite(amount) ? amount * item.quantity : null, item.price?.currencyCode);
  }

  return (
    <Container className="cart-page" as="section" aria-labelledby="cart-heading">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">Cart</p>
          <h1 id="cart-heading">Your cart</h1>
          <p>
            {isCartEmpty
              ? "Your cart is empty. Start with the ARKN Silicone Bench Mat."
              : `${itemCount} ${itemCount === 1 ? "item" : "items"} reserved in your local MVP cart.`}
          </p>
        </div>
        {!isCartEmpty ? (
          <div className="cart-heading-meta" aria-label="Cart status">
            <span>{itemCount} {itemCount === 1 ? "item" : "items"}</span>
            <strong>{subtotalDisplay}</strong>
          </div>
        ) : null}
      </div>

      {isCartEmpty ? (
        <div className="empty-state cart-empty-state">
          <span className="cart-empty-mark" aria-hidden="true">ARKN</span>
          <h2>Build your bench setup.</h2>
          <p>No products have been added yet. Start with the silicone bench mat and review checkout later.</p>
          <Button to="/product">Continue Shopping</Button>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items" aria-label="Cart items">
            {items.map((item) => (
              <article className="cart-item" key={item.id}>
                {item.image ? (
                  <img className="cart-item-image" src={item.image.src} alt={item.image.alt} />
                ) : null}

                <div className="cart-item-details">
                  <div>
                    <h2>{item.title}</h2>
                    <p>{item.variantTitle}</p>
                  </div>
                  <div className="cart-item-meta">
                    {item.selectedOptions?.map((option) => (
                      <span key={`${item.id}-${option.name}`}>
                        {option.name}: {option.value}
                      </span>
                    ))}
                    <span>{formatCartMoney(item.price?.amount, item.price?.currencyCode)} each</span>
                  </div>
                </div>

                <div className="cart-item-actions">
                  <label className="field" htmlFor={`cart-quantity-${item.id}`}>
                    Quantity
                    <div className="quantity-control cart-quantity-control">
                      <button
                        type="button"
                        onClick={() => setItemQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity for ${item.title}`}
                      >
                        -
                      </button>
                      <input
                        id={`cart-quantity-${item.id}`}
                        min="1"
                        max="10"
                        type="number"
                        value={item.quantity}
                        onChange={(event) => setItemQuantity(item.id, event.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setItemQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity for ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                  </label>

                  <div className="cart-line-total">
                    <span>Line total</span>
                    <strong>{itemLineTotal(item)}</strong>
                  </div>

                  <button className="cart-remove-button" type="button" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </article>
            ))}
          </div>

          <aside className="cart-summary" aria-labelledby="cart-summary-heading">
            <div className="cart-summary-head">
              <p className="eyebrow">Summary</p>
              <h2 id="cart-summary-heading">Order summary</h2>
            </div>
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <strong>{subtotalDisplay}</strong>
            </div>
            <p className="cart-summary-note">Shipping and tax are not calculated yet. Checkout setup is still in progress.</p>
            <div className="cart-reassurance" aria-label="Cart notes">
              {reassuranceItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <button className="button button-primary cart-disabled-checkout" type="button" disabled>
              Checkout setup in progress
            </button>
            <Button to="/product" variant="secondary">
              Continue Shopping
            </Button>
          </aside>
        </div>
      )}
    </Container>
  );
}
