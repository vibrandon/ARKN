export async function fetchProduct() {
  const response = await fetch("/api/product");
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to load product from Shopify.");
  }

  return data.product;
}

export async function createCheckout({ variantId, quantity }) {
  const response = await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ variantId, quantity })
  });
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to create checkout.");
  }

  return data.cart;
}

