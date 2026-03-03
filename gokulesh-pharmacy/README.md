# 🌿 Gokulesh Pharmacy — Full MERN Stack E-Commerce

A complete, production-ready Ayurvedic products e-commerce website for **Gokulesh Pharmacy**, featuring churan, goli, mukhwas, and more — with **PhonePe** online payment and local product image uploads.

---

## 📁 Project Structure

```
gokulesh-pharmacy/
├── server/                   # Node.js + Express Backend
│   ├── models/               # MongoDB Mongoose models
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── auth.js           # Login/Register
│   │   ├── users.js          # Profile management
│   │   ├── products.js       # Public product APIs
│   │   ├── categories.js     # Category APIs
│   │   ├── orders.js         # Order APIs (COD + payment method)
│   │   ├── admin.js          # Admin + image upload
│   │   └── payments.js       # PhonePe order + confirm
│   ├── services/
│   │   └── orderService.js   # Shared order creation logic
│   ├── middleware/
│   │   └── auth.js           # JWT + Role middleware
│   ├── config/
│   │   ├── cloudinary.js     # Local multer upload (uploads/products/)
│   │   └── phonepeClient.js  # PhonePe SDK client
│   ├── uploads/products/     # Product images (local)
│   ├── .env                  # Your secrets (see below)
│   ├── .env.example          # Template — copy to .env
│   ├── index.js
│   └── package.json
│
└── client/
    ├── public/index.html
    └── src/
        ├── components/       # Header, Footer, ProductCard
        ├── context/          # AuthContext, CartContext
        ├── pages/
        │   ├── Checkout/     # CheckoutPage, PhonePeResultPage
        │   └── ...
        ├── utils/api.js
        ├── App.js
        └── App.css
```

---

## 🚀 Setup & Run (Local)

### 1. Prerequisites

- **Node.js** 18+
- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/cloud/atlas))
- **PhonePe PG** merchant account (for online payments): [PhonePe Business](https://business.phonepe.com/pg/register)

---

### 2. Backend

```bash
cd server
npm install
npm i https://phonepe.mycloudrepo.io/public/repositories/phonepe-pg-sdk-node/releases/v2/phonepe-pg-sdk-node.tgz
```

Create **`server/.env`** (see **“How to add .env”** below), then:

```bash
npm run dev
```

Server runs at **http://localhost:5000**. Health check: `GET http://localhost:5000/`.

---

### 3. Frontend

```bash
cd client
npm install
npm start
```

App runs at **http://localhost:3000** (proxies API to port 5000).

---

### 4. Admin user

1. Register a user in the app (e.g. `admin@yourdomain.com`).
2. In MongoDB (Compass or shell):

```js
db.users.updateOne(
  { email: "admin@yourdomain.com" },
  { $set: { role: "admin" } }
)
```

3. Log in and open **/admin**.

---

### 5. Test

| Flow | What to do |
|------|------------|
| **COD** | Checkout → Cash on Delivery → place order → **My Orders**. |
| **PhonePe** | Checkout → Online Payment → pay on PhonePe → return to `/payment/phonepe/result` → **My Orders**. |
| **Admin image** | Admin → Products → Add/Edit → **Upload Images** (files go to `server/uploads/products/`). |

---

## 🔐 How to add details in `.env`

### Step 1: Create the file

- In the **`server`** folder, create a file named **`.env`** (no space, no `.txt`).
- You can copy from the template:  
  `cp .env.example .env`  
  then edit `.env`.

### Step 2: Fill each variable

| Variable | Where to get it | Example (local) |
|----------|------------------|------------------|
| **PORT** | Optional; server port | `5000` |
| **MONGO_URI** | Your MongoDB connection string | `mongodb://localhost:27017/gokulesh-pharmacy` or Atlas URI |
| **JWT_SECRET** | Any long random string (32+ chars) | `mySuperSecretJwtKey2024ChangeInProd` |
| **JWT_EXPIRE** | How long login lasts | `7d` |
| **CLIENT_URL** | URL of your frontend | `http://localhost:3000` |
| **PHONEPE_CLIENT_ID** | PhonePe Business → Developer → API credentials | From dashboard |
| **PHONEPE_CLIENT_SECRET** | Same place as Client ID | From dashboard |
| **PHONEPE_CLIENT_VERSION** | Usually `1.0.0` | `1.0.0` |
| **PHONEPE_ENV** | `SANDBOX` = test, `PROD` = live | `SANDBOX` |

### Step 3: Example `server/.env` (local)

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/gokulesh-pharmacy
JWT_SECRET=mySuperSecretJwtKey2024ChangeInProd
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:3000

PHONEPE_CLIENT_ID=PG_SANDBOX_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PHONEPE_CLIENT_SECRET=your_secret_from_phonepe_dashboard
PHONEPE_CLIENT_VERSION=1.0.0
PHONEPE_ENV=SANDBOX
```

- **Do not** put quotes around values.
- **Do not** commit `.env` to git (it should be in `.gitignore`).
- PhonePe: sign up at [PhonePe Business](https://business.phonepe.com/pg/register), then in the dashboard get **Client ID** and **Client Secret** (Sandbox for testing, Production for live).

### Step 4: PhonePe redirect URL

- In PhonePe merchant dashboard, set **Redirect URL** to where users land after payment:
  - Local: `http://localhost:3000/payment/phonepe/result`
  - Production: `https://yourdomain.com/payment/phonepe/result`

---

## 🌍 Production deployment

### 1. `.env` for production

Use a **separate** `.env` on the production server (or use your host’s env config). Set:

| Variable | Production value |
|----------|-------------------|
| **MONGO_URI** | Production MongoDB URI (e.g. Atlas cluster, strong password) |
| **JWT_SECRET** | New, long random secret (different from dev) |
| **CLIENT_URL** | Your live frontend URL, e.g. `https://www.gokuleshpharmacy.com` |
| **PHONEPE_CLIENT_ID** | **Production** credentials from PhonePe (not Sandbox) |
| **PHONEPE_CLIENT_SECRET** | **Production** secret from PhonePe |
| **PHONEPE_ENV** | `PROD` |
| **PORT** | Whatever your host uses (e.g. `5000` or `process.env.PORT`) |

Example:

```env
PORT=5000
MONGO_URI=mongodb+srv://user:password@cluster.mongodb.net/gokulesh-pharmacy?retryWrites=true&w=majority
JWT_SECRET=another-very-long-random-string-for-production-only
JWT_EXPIRE=7d
CLIENT_URL=https://www.gokuleshpharmacy.com

PHONEPE_CLIENT_ID=PG_PROD_xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
PHONEPE_CLIENT_SECRET=your_production_secret
PHONEPE_CLIENT_VERSION=1.0.0
PHONEPE_ENV=PROD
```

### 2. PhonePe in production

- In PhonePe dashboard, switch to **Production** and get Production **Client ID** and **Client Secret**.
- Set Production **Redirect URL** to:  
  `https://yourdomain.com/payment/phonepe/result`

### 3. Build and serve frontend

```bash
cd client
npm run build
```

- Upload the **`build`** folder to your static host (Vercel, Netlify, S3, etc.), **or**
- Serve it from the same server as the API (e.g. `app.use(express.static(path.join(__dirname, '../client/build'))` and point your server to the React build).

Ensure the frontend is served over **HTTPS** and the domain matches **CLIENT_URL**.

### 4. Backend in production

- Run the Node server with the production `.env` (e.g. `node index.js` or `npm start`).
- Use a process manager (PM2, systemd) and reverse proxy (Nginx) with HTTPS.
- Keep **CORS**: the server already uses `CLIENT_URL`; ensure it matches your live frontend URL.

### 5. Uploads and database

- **uploads/products/** is created automatically; on some hosts you may need a persistent volume so images survive restarts.
- Back up MongoDB regularly (e.g. Atlas backups).

### 6. Checklist before go-live

- [ ] `PHONEPE_ENV=PROD` and production PhonePe credentials
- [ ] `CLIENT_URL` = exact production frontend URL (with `https://`)
- [ ] Strong `JWT_SECRET` (only in production env)
- [ ] Production MongoDB URI and backups
- [ ] Redirect URL in PhonePe set to `https://yourdomain.com/payment/phonepe/result`
- [ ] Frontend built and served over HTTPS
- [ ] Admin user created and tested

---

## 🌐 Key Features

### Customer-facing

- Responsive, mobile-first design (warm theme)
- Browse products by category, search, filter by price
- Product detail with image gallery, benefits, ingredients
- Cart (persistent via localStorage)
- **Checkout**: **Cash on Delivery (COD)** or **Online Payment (PhonePe)** — UPI, cards, net banking
- Register / login (email or mobile)
- Profile and address management
- Order history

### Admin panel (`/admin`)

- Dashboard: products, orders, revenue, customers
- Products: create, edit, delete; **upload product images** (saved in `server/uploads/products/`)
- Categories: CRUD
- Orders: list and update status
- Users: view customer list

---

## 🖼 Product images (local upload)

- Admin adds product images via **file upload** in the product form (no external image URLs required).
- Images are stored under **`server/uploads/products/`** and served at `/uploads/products/<filename>`.
- Allowed: image files only, max 5MB per file.  
- Optional: you can still paste image URLs in the “Image URLs” field for existing or external images.

---

## 🏗 API endpoints (summary)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/me` | Current user |
| GET | `/api/products` | List products (filters) |
| GET | `/api/products/:slug` | Single product |
| GET | `/api/categories` | All categories |
| POST | `/api/orders` | Place order (COD or after payment) |
| GET | `/api/orders/my-orders` | User's orders |
| POST | `/api/payments/phonepe/order` | Create PhonePe order, get checkout URL |
| POST | `/api/payments/phonepe/confirm` | Confirm payment and create order |
| GET/POST/PUT/DELETE | `/api/admin/*` | Admin (products, categories, orders, users, upload) |

---

## 🎨 Design system

- **Primary**: `#c8611a` (warm spice)
- **Accent**: `#e8a020` (gold)
- **Fonts**: Playfair Display (headings), DM Sans (body)
- Mobile-first; breakpoints at 560px, 900px

---

## 📦 Tech stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, React Router 6, Context API |
| Styling | Custom CSS variables |
| Backend | Node.js, Express |
| Database | MongoDB, Mongoose |
| Auth | JWT (jsonwebtoken) |
| Payments | PhonePe PG (pg-sdk-node) |
| Image upload | Multer, local disk (`uploads/products/`) |
| Notifications | react-hot-toast |

---

## 📝 License

MIT — Free to use for commercial projects.
