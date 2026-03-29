# Gokulesh Pharmacy — MERN E-Commerce

Full-stack e-commerce for **Gokulesh Pharmacy**: Ayurvedic products (churan, goli, mukhwas, achar, masala, and more). Includes **JWT authentication**, **persistent cart**, **Cash on Delivery** and **PhonePe** online payments, **admin panel** with catalog and order management, and **local or Cloudinary** product images.

---

## Table of contents

1. [Features](#features)
2. [Pricing & discounts (business rules)](#pricing--discounts-business-rules)
3. [Tech stack](#tech-stack)
4. [Project structure](#project-structure)
5. [Prerequisites](#prerequisites)
6. [Quick start](#quick-start)
7. [Environment variables](#environment-variables)
8. [PhonePe payment gateway](#phonepe-payment-gateway)
9. [Admin access](#admin-access)
10. [Product images](#product-images)
11. [API reference](#api-reference)
12. [Production deployment](#production-deployment)
13. [Frontend production API URL](#frontend-production-api-url)
14. [Troubleshooting](#troubleshooting)
15. [Design notes](#design-notes)
16. [License](#license)

---

## Features

### Storefront

- Responsive, mobile-first UI (warm Ayurvedic-inspired theme)
- Home, category sections, featured products
- Product listing: category, search, price filters, pagination
- Product detail: gallery, description, add to cart
- **Shopping cart** persisted in `localStorage`
- **Checkout**: delivery address, order notes
- **Payments**: **COD** or **PhonePe** (redirect to hosted checkout)
- Register / login (email or mobile), profile and saved address
- **My Orders** with totals and **payment method** summary
- Policy pages: privacy, terms, refund, shipping, PhonePe disclosure

### Admin panel (`/admin`)

- **Dashboard**: counts, revenue aggregate, recent orders
- **Products**: CRUD, optional **multi-image upload**
- **Categories**: CRUD
- **Orders**: search, status updates, expandable details (items, address, notes)
- **Payment method** visible in the orders table and in expanded order details (COD, PhonePe; PhonePe instrument when returned by the gateway)
- **Users**: list customers

### Backend

- REST API under `/api`
- Order totals calculated on the server (`orderService.js`) from live product prices and stock
- **Payment method** stored on each order for admin and customer views

---

## Pricing & discounts (business rules)

These rules are implemented in **`server/services/orderService.js`** and mirrored for the UI in **`client/src/constants/orderPricing.js`**. The server is the source of truth when an order is placed.

| Rule | Detail |
|------|--------|
| **Delivery** | If order **subtotal &lt; ₹999**, delivery fee is **₹100**. If subtotal **≥ ₹999**, delivery is **free**. |
| **Auto discount** | Coupon code **GOKULESH10**: **10%** off subtotal when subtotal **≥ ₹1999**. Applied automatically (no manual code entry). Rounding: discount is rounded to the nearest rupee on the server. |
| **Total** | `(subtotal − discount) + delivery` (never negative subtotal after discount). |

COD and PhonePe flows both use the same calculation when the order is created.

---

## Tech stack

| Layer | Technology |
|--------|------------|
| Frontend | React 18, React Router 6, Context API (auth, cart), Axios, react-hot-toast |
| Styling | Custom CSS, variables |
| Backend | Node.js, Express 4 |
| Database | MongoDB, Mongoose 8 |
| Auth | JWT (`jsonwebtoken`), bcrypt |
| Payments | PhonePe Payment Gateway (`pg-sdk-node` v2) |
| Uploads | Multer; optional Cloudinary |
| Validation | express-validator (auth) |

---

## Project structure

```
gokulesh-pharmacy/
├── package.json              # Root: concurrently dev both apps (optional)
├── README.md
│
├── server/
│   ├── index.js             # Express app, CORS, routes, Mongo connect
│   ├── package.json
│   ├── .env                 # Secrets (not in git)
│   ├── .env.example         # Template
│   ├── models/              # User, Product, Category, Order
│   ├── routes/
│   │   ├── auth.js
│   │   ├── users.js
│   │   ├── products.js
│   │   ├── categories.js
│   │   ├── orders.js
│   │   ├── admin.js
│   │   └── payments.js      # PhonePe: /phonepe/order, /phonepe/confirm
│   ├── services/
│   │   └── orderService.js   # Totals, stock decrement, create order
│   ├── middleware/
│   │   └── auth.js           # JWT protect, adminOnly
│   ├── config/
│   │   ├── cloudinary.js     # Optional Cloudinary + local disk fallback
│   │   └── phonepeClient.js # PhonePe StandardCheckout client
│   └── uploads/products/    # Local image storage (default)
│
└── client/
    ├── package.json
    ├── public/
    └── src/
        ├── App.js
        ├── constants/
        │   └── orderPricing.js   # Delivery + auto-coupon (sync with server)
        ├── context/
        │   ├── AuthContext.js
        │   └── CartContext.js
        ├── components/
        ├── pages/
        │   ├── Admin/
        │   ├── Auth/
        │   ├── Cart/, Checkout/, Home/, Product/, Profile/, Policies/
        │   └── ...
        └── utils/
            ├── api.js
            └── paymentLabels.js  # Human-readable payment labels in UI
```

---

## Prerequisites

- **Node.js** 18 or newer
- **MongoDB** running locally or **MongoDB Atlas**
- **PhonePe Business** merchant account for online payments ([PhonePe Business](https://business.phonepe.com/pg/register)) — optional if you only use COD in dev

---

## Quick start

From the **`gokulesh-pharmacy`** folder (monorepo root):

```bash
# Install server + client dependencies
npm run install-all

# Terminal 1 — backend (after configuring server/.env)
cd server
npm i https://phonepe.mycloudrepo.io/public/repositories/phonepe-pg-sdk-node/releases/v2/phonepe-pg-sdk-node.tgz
npm run dev

# Terminal 2 — frontend
cd client
npm start
```

Or use **`npm run dev`** from the root if you have installed root `concurrently` (`npm install` at root): it runs server and client together (ensure PhonePe tarball is installed under `server` first).

| URL | Purpose |
|-----|---------|
| http://localhost:3000 | React app (dev server proxies `/api` to port 5000) |
| http://localhost:5000 | API — `GET /` returns `{ "message": "Gokulesh Pharmacy API Running" }` |

---

## Environment variables

Create **`server/.env`** by copying **`server/.env.example`**.

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | API port (default `5000`) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | Yes | Long random string for signing tokens |
| `JWT_EXPIRE` | No | Token lifetime (e.g. `7d`) |
| `CLIENT_URL` | Yes* | Frontend origin; used for CORS allowlist and PhonePe **redirect URL** build |
| `PHONEPE_CLIENT_ID` | For online pay | From PhonePe dashboard |
| `PHONEPE_CLIENT_SECRET` | For online pay | From PhonePe dashboard |
| `PHONEPE_CLIENT_VERSION` | No | Default `1.0.0` |
| `PHONEPE_ENV` | For online pay | `SANDBOX` or `PROD` — must match credential type |
| `CLOUDINARY_*` | No | Optional; enables cloud image URLs (see [Product images](#product-images)) |

\* In development, `http://localhost:3000` is typical. Do not wrap values in quotes unless your host requires it.

---

## PhonePe payment gateway

1. Obtain **Client ID** and **Client Secret** from PhonePe Business → Developer / API credentials.
2. Set **`PHONEPE_ENV=SANDBOX`** with sandbox keys, or **`PROD`** with production keys only.
3. In the PhonePe dashboard, register **redirect URL** exactly as users return:
   - Local: `http://localhost:3000/payment/phonepe/result`
   - Production: `https://yourdomain.com/payment/phonepe/result`
4. Ensure **`CLIENT_URL`** matches the site origin used in that redirect.

**Flow:** Authenticated user → `POST /api/payments/phonepe/order` (body includes `items`; amount is **quoted server-side**) → redirect to PhonePe → user pays → return to **`/payment/phonepe/result`** → `POST /api/payments/phonepe/confirm` creates the order with **`paymentMethod: 'PhonePe'`** and payment metadata when completed.

If **`PHONEPE_CLIENT_ID` / `SECRET`** are missing, the API responds that the gateway is not configured. Invalid credentials often surface as **401 / Unauthorized** in server logs when the SDK requests a token.

---

## Admin access

1. Register a normal user through the app.
2. In MongoDB, set that user’s `role` to `"admin"`:

   ```js
   db.users.updateOne(
     { email: "you@example.com" },
     { $set: { role: "admin" } }
   );
   ```

3. Log in and open **`/admin`**.

All `/api/admin/*` routes require a valid JWT **and** `role === 'admin'`.

---

## Product images

- **Default:** Admin upload stores files under **`server/uploads/products/`**, served at **`/uploads/products/<filename>`**.
- **Optional Cloudinary:** Set `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` in `server/.env`. When configured, uploads can use Cloudinary URLs (see `server/config/cloudinary.js`).

---

## API reference

Base path: **`/api`**. Protected routes expect header: **`Authorization: Bearer <token>`**.

### Auth (`/api/auth`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/register` | No | Register |
| POST | `/login` | No | Login |
| GET | `/me` | Yes | Current user |

### Users (`/api/users`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| GET | `/profile` | Yes | Get profile |
| PUT | `/profile` | Yes | Update profile / address |
| PUT | `/change-password` | Yes | Change password |

### Catalog (public)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/products` | List products (query: `category`, `search`, `featured`, `minPrice`, `maxPrice`, `page`, `limit`) |
| GET | `/products/:slug` | Product by slug |
| GET | `/categories` | All categories |

### Orders (customer)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/orders` | Yes | Place order. Body: `items`, `shippingAddress`, `notes`, optional `paymentMethod`, optional `paymentDetails`. Totals computed server-side. |
| GET | `/orders/my-orders` | Yes | List current user’s orders |
| GET | `/orders/:id` | Yes | Single order (owner only) |

### Payments

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/payments/phonepe/order` | Yes | Returns `checkoutUrl`, `merchantOrderId`, `amount` |
| POST | `/payments/phonepe/confirm` | Yes | Verifies payment state; creates order |

### Admin (`/api/admin`)

All routes: **JWT + admin role**.

| Method | Path | Description |
|--------|------|-------------|
| GET | `/dashboard` | Stats + recent orders |
| GET/POST | `/products` | List / create |
| PUT/DELETE | `/products/:id` | Update / soft-delete |
| GET/POST | `/categories` | List / create |
| PUT/DELETE | `/categories/:id` | Update / delete |
| GET | `/orders` | All orders (includes `paymentMethod`, `paymentDetails`) |
| PUT | `/orders/:id/status` | Update status |
| GET | `/users` | Customers |
| POST | `/upload` | Multipart image upload |

---

## Production deployment

1. **MongoDB:** Use a managed cluster (Atlas) with strong credentials and network rules.
2. **Server `.env`:** Production `MONGO_URI`, new **`JWT_SECRET`**, **`CLIENT_URL`** = public HTTPS frontend URL, **`PHONEPE_ENV=PROD`** and production PhonePe keys.
3. **PhonePe:** Production redirect URL must match `https://yourdomain.com/payment/phonepe/result`.
4. **Build frontend:** `cd client && npm run build`. Host the `build` folder on a static host **or** serve via Express **and** set **`REACT_APP_API_URL`** if the API is on another origin (see below).
5. **HTTPS:** Required for real payments and modern browser APIs.
6. **Process manager:** Use PM2, systemd, or your platform’s runner for `node index.js`.
7. **Reverse proxy:** Nginx (or similar) for TLS termination and forwarding to Node.
8. **Uploads:** Persist `uploads/` or rely on Cloudinary so images survive redeploys.

### Pre-launch checklist

- [ ] Production MongoDB + backups
- [ ] Strong, unique `JWT_SECRET`
- [ ] `CLIENT_URL` matches live site (scheme + host)
- [ ] PhonePe production keys + redirect URL + `PHONEPE_ENV=PROD`
- [ ] Admin user tested on production
- [ ] CORS: server allows your production frontend origin

---

## Frontend production API URL

In **`client`**, API base URL is chosen in **`src/utils/api.js`**:

- **Development:** requests go to **`/api`** (Create React App proxy → port 5000).
- **Production:** **`process.env.REACT_APP_API_URL`** if set (e.g. `https://api.yourdomain.com/api`), otherwise **`/api`** (same host as static files).

When the API lives on another domain, build with:

```bash
REACT_APP_API_URL=https://api.yourdomain.com/api npm run build
```

---

## Troubleshooting

| Issue | What to check |
|--------|----------------|
| **PhonePe 401 / Unauthorized** in logs | Client ID and secret match **`PHONEPE_ENV`** (sandbox vs prod); keys not expired; dashboard access enabled. |
| **CORS errors** | `CLIENT_URL` in `server/.env` includes your exact browser origin. |
| **Online payment “not configured”** | `PHONEPE_CLIENT_ID` and `PHONEPE_CLIENT_SECRET` set in `server/.env`. |
| **Order total mismatch** | Always compare with server response; cart UI uses the same rules as `orderPricing.js` / `orderService.js`. |
| **MongoDB connect fail** | `MONGO_URI`, firewall / IP allowlist on Atlas, database user password. |

---

## Design notes

- **Primary:** `#c8611a`
- **Accent:** `#e8a020`
- **Typography:** Playfair Display (headings), DM Sans (body)
- Breakpoints around **560px** and **900px**

---

## License

MIT — free to use and modify, including for commercial projects.

