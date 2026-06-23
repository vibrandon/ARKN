import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext(null);
const CART_STORAGE_KEY = "arkn-mvp-cart";
const MIN_QUANTITY = 1;
const MAX_QUANTITY = 10;

function clampQuantity(value) {
  const quantity = Number(value);

  if (!Number.isFinite(quantity)) {
    return MIN_QUANTITY;
  }

  return Math.min(MAX_QUANTITY, Math.max(MIN_QUANTITY, Math.trunc(quantity)));
}

function readStoredCart() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const storedCart = window.localStorage.getItem(CART_STORAGE_KEY);
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    return Array.isArray(parsedCart) ? parsedCart : [];
  } catch {
    return [];
  }
}

function getProductImage(product) {
  const heroImage = product.images.find((image) => image.role === "hero") ?? product.images[0];
  return heroImage ? { src: heroImage.src, alt: heroImage.alt } : null;
}

function toCartItem(product, quantity) {
  return {
    id: product.variant.id,
    productId: product.id,
    handle: product.handle,
    title: product.title,
    variantTitle: product.variant.title,
    selectedOptions: product.variant.selectedOptions,
    price: product.price,
    image: getProductImage(product),
    quantity: clampQuantity(quantity)
  };
}

export function formatCartMoney(amount, currencyCode = "GBP") {
  const numericAmount = Number(amount);

  if (!Number.isFinite(numericAmount)) {
    return "Price pending";
  }

  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: currencyCode
  }).format(numericAmount);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readStoredCart);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      // Cart persistence is best-effort for the MVP.
    }
  }, [items]);

  const cart = useMemo(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotalAmount = items.reduce((total, item) => {
      const itemAmount = Number(item.price?.amount);
      return Number.isFinite(itemAmount) ? total + itemAmount * item.quantity : total;
    }, 0);
    const currencyCode = items[0]?.price?.currencyCode ?? "GBP";

    return {
      items,
      itemCount,
      subtotalAmount,
      subtotalDisplay: formatCartMoney(subtotalAmount, currencyCode),
      addItem(product, quantity = 1) {
        const nextItem = toCartItem(product, quantity);

        setItems((currentItems) => {
          const existingItem = currentItems.find((item) => item.id === nextItem.id);

          if (!existingItem) {
            return [...currentItems, nextItem];
          }

          return currentItems.map((item) =>
            item.id === nextItem.id
              ? { ...item, quantity: clampQuantity(item.quantity + nextItem.quantity), price: nextItem.price }
              : item
          );
        });
      },
      setItemQuantity(itemId, quantity) {
        setItems((currentItems) =>
          currentItems.map((item) =>
            item.id === itemId ? { ...item, quantity: clampQuantity(quantity) } : item
          )
        );
      },
      removeItem(itemId) {
        setItems((currentItems) => currentItems.filter((item) => item.id !== itemId));
      }
    };
  }, [items]);

  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used within CartProvider.");
  }

  return cart;
}
