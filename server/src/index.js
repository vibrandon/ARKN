import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";

const app = express();
const port = Number(process.env.PORT || 4000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const clientDistPath = path.resolve(__dirname, "../../client/dist");

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN
      ? process.env.CLIENT_ORIGIN.split(",").map((origin) => origin.trim())
      : true
  })
);
app.use(express.json({ limit: "64kb" }));

const PRODUCT_QUERY = `#graphql
  query ProductByHandle($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      description
      availableForSale
      featuredImage {
        url
        altText
        width
        height
      }
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 25) {
        nodes {
          id
          title
          availableForSale
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          selectedOptions {
            name
            value
          }
          image {
            url
            altText
            width
            height
          }
        }
      }
    }
  }
`;

const CART_CREATE_MUTATION = `#graphql
  mutation CartCreate($lines: [CartLineInput!]!) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        totalQuantity
        cost {
          subtotalAmount {
            amount
            currencyCode
          }
          totalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 10) {
          nodes {
            id
            quantity
            merchandise {
              ... on ProductVariant {
                id
                title
                price {
                  amount
                  currencyCode
                }
                product {
                  title
                  handle
                }
              }
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

function normalizeStoreDomain(domain) {
  return domain
    .replace(/^https?:\/\//, "")
    .replace(/\/.*$/, "")
    .trim();
}

function getShopifyConfig() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!domain || !token) {
    return null;
  }

  return {
    domain: normalizeStoreDomain(domain),
    token,
    apiVersion: process.env.SHOPIFY_API_VERSION || "2026-04",
    productHandle: process.env.SHOPIFY_PRODUCT_HANDLE || "arkn-silicone-bench-mat"
  };
}

async function shopifyRequest(query, variables, config) {
  const response = await fetch(`https://${config.domain}/api/${config.apiVersion}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": config.token
    },
    body: JSON.stringify({ query, variables })
  });

  const payload = await response.json().catch(() => null);

  if (!response.ok) {
    const message = payload?.errors?.[0]?.message || "Shopify request failed.";
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }

  if (payload?.errors?.length) {
    const error = new Error(payload.errors.map((item) => item.message).join(" "));
    error.status = 502;
    throw error;
  }

  return payload.data;
}

function normalizeProduct(product) {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    description: product.description,
    availableForSale: product.availableForSale,
    featuredImage: product.featuredImage,
    priceRange: product.priceRange,
    variants: product.variants.nodes.map((variant) => ({
      id: variant.id,
      title: variant.title,
      availableForSale: variant.availableForSale,
      price: variant.price,
      compareAtPrice: variant.compareAtPrice,
      selectedOptions: variant.selectedOptions,
      image: variant.image
    }))
  };
}

function requireShopifyConfig(res) {
  const config = getShopifyConfig();

  if (!config) {
    res.status(503).json({
      error: "SHOPIFY_CONFIG_MISSING",
      message: "Shopify is not connected yet. Add Storefront API credentials to server/.env."
    });
    return null;
  }

  return config;
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/product", async (_req, res) => {
  const config = requireShopifyConfig(res);
  if (!config) return;

  try {
    const data = await shopifyRequest(PRODUCT_QUERY, { handle: config.productHandle }, config);

    if (!data.product) {
      res.status(404).json({
        error: "PRODUCT_NOT_FOUND",
        message: `No Shopify product found for handle "${config.productHandle}".`
      });
      return;
    }

    res.json({ product: normalizeProduct(data.product) });
  } catch (error) {
    res.status(error.status || 502).json({
      error: "SHOPIFY_PRODUCT_ERROR",
      message: error.message
    });
  }
});

app.post("/api/cart", async (req, res) => {
  const config = requireShopifyConfig(res);
  if (!config) return;

  const variantId = String(req.body?.variantId || "");
  const quantity = Number(req.body?.quantity || 1);

  if (!variantId || !Number.isInteger(quantity) || quantity < 1 || quantity > 9) {
    res.status(400).json({
      error: "INVALID_CART_INPUT",
      message: "Choose a valid product option and quantity."
    });
    return;
  }

  try {
    const data = await shopifyRequest(
      CART_CREATE_MUTATION,
      {
        lines: [
          {
            merchandiseId: variantId,
            quantity
          }
        ]
      },
      config
    );

    const userErrors = data.cartCreate.userErrors || [];
    if (userErrors.length) {
      res.status(400).json({
        error: "SHOPIFY_CART_ERROR",
        message: userErrors.map((item) => item.message).join(" ")
      });
      return;
    }

    res.json({ cart: data.cartCreate.cart });
  } catch (error) {
    res.status(error.status || 502).json({
      error: "SHOPIFY_CART_ERROR",
      message: error.message
    });
  }
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientDistPath));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.listen(port, () => {
  console.log(`ARKN API listening on http://localhost:${port}`);
});

