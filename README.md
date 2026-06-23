# ARKN Storefront MVP

Custom storefront MVP for the ARKN Silicone Bench Mat.

The app uses a React + Vite frontend and a small Node + Express backend. Shopify is the source of truth for products, variants, pricing, carts, orders, and checkout. The frontend talks to the local Express API only; the backend talks to the Shopify Storefront API and keeps the Storefront access token out of browser code.

Stripe direct checkout, custom card forms, customer auth, a database, and admin dashboards are not implemented in this version.

## Project Structure

```text
ARKN/
  client/   React + Vite storefront
  server/   Express API layer for Shopify Storefront API
```

## Frontend Setup

Install dependencies from the repo root:

```bash
npm install
```

Run both the frontend and backend:

```bash
npm run dev
```

Run the frontend only:

```bash
npm run dev:client
```

The storefront runs at:

```text
http://localhost:5173
```

The ARKN navbar logo should be placed at:

```text
client/public/assets/arkn-logo.png
```

Do not hardcode local machine paths into the app. The frontend should reference the public asset path only.

## Backend Setup

Create a backend environment file:

```bash
cp server/.env.example server/.env
```

Fill in `server/.env` with your Shopify Storefront API settings.

Run the backend only:

```bash
npm run dev:server
```

The API runs at:

```text
http://localhost:4000
```

Health check:

```text
GET http://localhost:4000/api/health
```

During local development, Vite proxies frontend `/api` requests to the backend at `http://localhost:4000`.

## Required Environment Variables

These variables belong in `server/.env`, not in frontend env files.

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:5173
SHOPIFY_STORE_DOMAIN=your-shop.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_storefront_access_token
SHOPIFY_PRODUCT_HANDLE=arkn-silicone-bench-mat
SHOPIFY_API_VERSION=2026-04
```

| Variable | Purpose |
| --- | --- |
| `PORT` | Local Express API port. Defaults to `4000`. |
| `CLIENT_ORIGIN` | Allowed frontend origin for CORS. Use `http://localhost:5173` for local Vite development. |
| `SHOPIFY_STORE_DOMAIN` | Shopify store domain, usually `your-shop.myshopify.com`. |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Storefront API token. Keep this server-side only. |
| `SHOPIFY_PRODUCT_HANDLE` | Product handle used by `GET /api/product`. Expected default: `arkn-silicone-bench-mat`. |
| `SHOPIFY_API_VERSION` | Shopify Storefront API version. Current example: `2026-04`. |

## Shopify Dashboard Setup

1. Create a product for the ARKN Silicone Bench Mat.
2. Add at least one purchasable variant.
3. Set the product handle to match `SHOPIFY_PRODUCT_HANDLE`.
   - Expected default: `arkn-silicone-bench-mat`
4. Add the product price and confirm the store currency.
5. Add product images.
6. Enable inventory tracking if Shopify should enforce stock availability.
7. Create a Storefront API access token.
8. Confirm the token has access needed to read products and create carts.
9. Add the token to `server/.env` as `SHOPIFY_STOREFRONT_ACCESS_TOKEN`.

Never commit real Shopify credentials. Never add Shopify tokens to frontend code or frontend env files.

## Testing Product Fetching

Start the backend:

```bash
npm run dev:server
```

Open:

```text
http://localhost:4000/api/product
```

Or test from the terminal:

```bash
curl http://localhost:4000/api/product
```

A successful response returns:

```json
{
  "product": {
    "id": "gid://shopify/Product/...",
    "title": "ARKN Silicone Bench Mat",
    "handle": "arkn-silicone-bench-mat",
    "description": "...",
    "availableForSale": true,
    "featuredImage": {},
    "priceRange": {},
    "variants": []
  }
}
```

Common setup errors:

| Error | Meaning |
| --- | --- |
| `SHOPIFY_CONFIG_MISSING` | `SHOPIFY_STORE_DOMAIN` or `SHOPIFY_STOREFRONT_ACCESS_TOKEN` is missing from `server/.env`. |
| `PRODUCT_NOT_FOUND` | No Shopify product exists for `SHOPIFY_PRODUCT_HANDLE`. Check the product handle in Shopify. |
| `SHOPIFY_PRODUCT_ERROR` | Shopify returned an API error. Check the store domain, token, API version, and Storefront API permissions. |

## Testing Cart and checkoutUrl Flow

The current backend exposes a Shopify cart create endpoint:

```text
POST /api/cart
```

Use a valid Shopify Product Variant GID from the `/api/product` response. Variant IDs look like:

```text
gid://shopify/ProductVariant/123456789
```

Test cart creation:

```bash
curl -X POST http://localhost:4000/api/cart \
  -H "Content-Type: application/json" \
  -d '{
    "variantId": "gid://shopify/ProductVariant/123456789",
    "quantity": 1
  }'
```

A successful response includes the Shopify cart, totals, line items, and hosted checkout URL:

```json
{
  "cart": {
    "id": "gid://shopify/Cart/...",
    "checkoutUrl": "https://your-shop.myshopify.com/cart/c/...",
    "totalQuantity": 1,
    "cost": {
      "subtotalAmount": {
        "amount": "49.00",
        "currencyCode": "GBP"
      },
      "totalAmount": {
        "amount": "49.00",
        "currencyCode": "GBP"
      }
    },
    "lines": {
      "nodes": []
    }
  }
}
```

Open `checkoutUrl` in a browser to confirm Shopify-hosted checkout is available.

Common cart errors:

| Error | Meaning |
| --- | --- |
| `INVALID_CART_INPUT` | Missing or invalid `variantId` or `quantity`. Quantity must be a whole number from 1 to 9. |
| `SHOPIFY_CONFIG_MISSING` | Shopify backend env vars are missing. |
| `SHOPIFY_CART_ERROR` | Shopify rejected the cart request or returned an API error. Check variant availability and token permissions. |

## Current Implementation Notes

- The frontend cart experience can still run locally for MVP development.
- The current backend cart endpoint is `POST /api/cart`.
- If the backend is later expanded to `/api/cart/create`, `/api/cart/lines/add`, `/api/cart/lines/update`, and `/api/cart/lines/remove`, update this README to match.
- Checkout is Shopify-hosted through `checkoutUrl`.
- Direct Stripe checkout is not implemented.
- Custom card forms are not implemented.
- Shopify credentials must stay server-side in `server/.env`.

## Useful Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Run frontend and backend together. |
| `npm run dev:client` | Run only the Vite frontend. |
| `npm run dev:server` | Run only the Express backend. |
| `npm run build` | Build the frontend. |
| `npm run start` | Start the Express backend. |
