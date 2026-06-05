# Storefront Backend API

Express.js + TypeScript REST API for the uiTHRIVE frontend. Uses an **in-memory data store** (no database required) — data resets on server restart.

---

## Getting Started

```bash
npm install
npm run dev        # development with ts-node (http://localhost:3001)
npm run build      # compile to /dist
npm start          # run compiled output
npm test           # run tests
```

Set `PORT` and `FRONTEND_URL` env vars as needed (defaults: `3001`, `http://localhost:5173`).

---

## API Reference

### Health
| Method | Endpoint  | Description |
|--------|-----------|-------------|
| GET    | `/health` | Server health check |

---

### Products — `/api/products`

#### `GET /api/products`
List products with filtering, sorting, and pagination.

**Query params:**
| Param      | Type    | Default   | Description |
|------------|---------|-----------|-------------|
| `archived` | boolean | `false`   | `true` / `false` / `all` |
| `search`   | string  | —         | Searches name, brand, description |
| `category` | string  | —         | Comma-separated: `Electronics,Shoes` |
| `brand`    | string  | —         | Comma-separated: `Apple,Nike` |
| `priceMin` | number  | `0`       | Minimum price |
| `priceMax` | number  | `2400`    | Maximum price |
| `sort`     | string  | `default` | `price-asc` / `price-desc` / `rating` |
| `page`     | number  | `1`       | Page number |
| `limit`    | number  | `20`      | Results per page (max 100) |

**Response:**
```json
{
  "success": true,
  "data": [...],
  "total": 14,
  "page": 1,
  "limit": 20,
  "totalPages": 1
}
```

#### `GET /api/products/meta`
Returns categories, brands, price range, and product counts.

#### `GET /api/products/:id`
Get a single product by ID.

#### `POST /api/products`
Create a new product.

**Body (JSON):**
```json
{
  "name": "Product Name",       // required
  "brand": "Apple",             // required
  "category": "Electronics",    // required
  "price": 999,                 // required
  "rating": 4.5,
  "reviews": 0,
  "sku": "SKU-001",
  "stock": 10,
  "color": "Black",
  "description": "...",
  "image": "https://..."
}
```

#### `PUT /api/products/:id`
Full update of a product (pass all fields).

#### `PATCH /api/products/:id/archive`
Archive a product (removes it from the active list).

#### `PATCH /api/products/:id/restore`
Restore an archived product back to active.

#### `DELETE /api/products/:id`
Permanently delete a product.

---

### Cart — `/api/cart`

Cart sessions are keyed by a `cartId` string — generate a UUID on the frontend and persist it in `localStorage`.

#### `GET /api/cart/:cartId`
Get current cart state.

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 1299,
    "count": 2
  }
}
```

#### `POST /api/cart/:cartId/items`
Add a product to the cart.

**Body:**
```json
{ "productId": 1, "qty": 1 }
```

#### `PATCH /api/cart/:cartId/items/:productId`
Update quantity of an item. Setting `qty` ≤ 0 removes it.

**Body:**
```json
{ "qty": 3 }
```

#### `DELETE /api/cart/:cartId/items/:productId`
Remove a specific item from the cart.

#### `DELETE /api/cart/:cartId`
Clear the entire cart.

---

## Connecting the Frontend

Update your frontend's API base URL

```ts
const API = "http://localhost:3001/api";

// Fetch active products
const res = await fetch(`${API}/products?archived=false`);
const { data } = await res.json();

// Archive a product
await fetch(`${API}/products/5/archive`, { method: "PATCH" });

// Add to cart
await fetch(`${API}/cart/my-cart-id/items`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ productId: 1, qty: 1 }),
});
```


## Testing

```bash
npm test     