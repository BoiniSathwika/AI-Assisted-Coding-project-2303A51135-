# 🌸 GlowCo — Full-Stack Skincare E-Commerce

A complete, production-ready skincare e-commerce platform.

## 🗂 Project Structure

```
glowco/
├── frontend/               ← React.js app
│   ├── public/
│   └── src/
│       ├── components/     ← Navbar, Footer, ProductCard, StarRating, etc.
│       ├── context/        ← ThemeContext, AuthContext, CartContext
│       ├── pages/          ← All 13 pages
│       └── utils/          ← api.js (Axios + JWT), data.js (sample data)
│
└── backend/                ← Node.js + Express REST API
    ├── config/             ← db.js (MongoDB connection)
    ├── middleware/         ← auth.js (JWT protect + adminOnly)
    ├── models/             ← User, Product, Order, Review
    ├── routes/             ← users, products, orders, reviews, admin
    └── utils/              ← email.js, seed.js
```

---

## ⚡ Quick Start (Local Development)

### Prerequisites
- Node.js 18+ and npm
- MongoDB Atlas account (free tier works)

---

### 1. Backend Setup

```bash
cd backend
npm install

# Create your .env file
cp .env.example .env
# Edit .env and fill in your MONGO_URI and JWT_SECRET

# Seed sample data (creates admin + products)
npm run seed

# Start the development server
npm run dev
# → API running at http://localhost:5000
```

**Test it:**
```
GET http://localhost:5000/api/health
GET http://localhost:5000/api/products
```

---

### 2. Frontend Setup

```bash
cd frontend
npm install

# Create your .env file
cp .env.example .env
# REACT_APP_API_URL=http://localhost:5000/api

npm start
# → App running at http://localhost:3000
```

---

### 3. Demo Credentials

| Role     | Email                 | Password    |
|----------|-----------------------|-------------|
| Admin    | admin@glowco.com      | admin123    |
| Customer | priya@example.com     | password123 |

Admin panel is accessible at `/admin` after signing in as admin.

---

## 🔑 Features

### Frontend
- ✅ Home page (hero, categories, featured products, testimonials, newsletter)
- ✅ Shop page (filter by category, skin type, price; sort; search)
- ✅ Product detail page (description, ingredients, reviews, related products)
- ✅ Cart with quantity controls and shipping calculator
- ✅ Checkout (2-step: shipping + payment)
- ✅ Wishlist
- ✅ JWT Authentication (login / signup)
- ✅ User profile dashboard
- ✅ Order history
- ✅ Skin Type Quiz (4 questions → personalized result)
- ✅ AI-powered product recommendations based on skin type
- ✅ Routine Builder (morning & evening step-by-step routines)
- ✅ Blog / Skincare Journal
- ✅ About Us page
- ✅ Contact page
- ✅ Admin Panel (stats, manage products/orders/users)
- ✅ Dark Mode toggle (persisted to localStorage)
- ✅ Toast notifications
- ✅ Mobile responsive
- ✅ Cart and wishlist persist across sessions (localStorage)

### Backend
- ✅ JWT authentication (register / login / protected routes)
- ✅ bcrypt password hashing
- ✅ Role-based access (user / admin)
- ✅ Products API with full filtering, sorting, pagination, search
- ✅ Orders API (create, view, history)
- ✅ Reviews API (add, list, verified purchase badge)
- ✅ Admin API (stats, CRUD products, update orders, manage users)
- ✅ Nodemailer order confirmation email
- ✅ Rate limiting (100 req / 15 min per IP)
- ✅ Helmet security headers
- ✅ CORS configured

---

## 🌐 API Reference

```
Base URL: http://localhost:5000/api

AUTH / USERS
  POST   /users/register         Register new user
  POST   /users/login            Login → returns JWT
  GET    /users/me               Get own profile       [auth]
  PUT    /users/profile          Update profile        [auth]
  PUT    /users/wishlist/:id     Toggle wishlist item  [auth]
  PUT    /users/change-password  Change password       [auth]

PRODUCTS
  GET    /products               List (filter/sort/search/paginate)
  GET    /products/featured      Featured products
  GET    /products/recommend/:skinType   AI recommendations
  GET    /products/:id           Single product

ORDERS
  POST   /orders                 Create order          [auth]
  GET    /orders/mine            My orders             [auth]
  GET    /orders/:id             Single order          [auth]

REVIEWS
  GET    /reviews/product/:id    Reviews for product
  POST   /reviews/:productId     Add review            [auth]
  DELETE /reviews/:id            Delete own review     [auth]

ADMIN                            (all require admin role)
  GET    /admin/stats            Dashboard stats
  GET    /admin/products         All products
  POST   /admin/products         Create product
  PUT    /admin/products/:id     Update product
  DELETE /admin/products/:id     Deactivate product
  GET    /admin/orders           All orders
  PUT    /admin/orders/:id/status Update order status
  GET    /admin/users            All users
  PUT    /admin/users/:id        Update user role
  DELETE /admin/reviews/:id      Delete any review

HEALTH
  GET    /health                 Server health check
```

---

## 🚀 Deployment

### Database — MongoDB Atlas (free)
1. Sign up at https://mongodb.com/cloud/atlas
2. Create a free M0 cluster
3. Add a DB user (username + password)
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Copy your connection string → paste into backend `.env` as `MONGO_URI`

### Backend — Render.com (free tier)
1. Push `backend/` to a GitHub repo
2. New Web Service on Render → connect your repo
3. Build command: `npm install`
4. Start command: `node server.js`
5. Add all environment variables from `.env`
6. Deploy → copy your Render URL

### Frontend — Vercel (free)
1. Push `frontend/` to a GitHub repo
2. Import project on https://vercel.com
3. Set env var: `REACT_APP_API_URL=https://your-render-url.onrender.com/api`
4. Deploy → live instantly

---

## 🔧 Tech Stack

| Layer      | Technology                        |
|------------|-----------------------------------|
| Frontend   | React 18, React Router 6          |
| Styling    | CSS Variables (custom design system) |
| Animations | Framer Motion (optional)          |
| Backend    | Node.js, Express 4                |
| Database   | MongoDB + Mongoose                |
| Auth       | JWT (jsonwebtoken) + bcryptjs     |
| Email      | Nodemailer (Gmail SMTP)           |
| Security   | Helmet, express-rate-limit, CORS  |
| Payments   | Stripe (optional, keys in .env)   |

---

## 📝 Environment Variables

### Backend `.env`
```
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=30d
FRONTEND_URL=http://localhost:3000
EMAIL_USER=your@gmail.com
EMAIL_PASS=your_app_password
STRIPE_SECRET_KEY=sk_test_...       (optional)
STRIPE_WEBHOOK_SECRET=whsec_...     (optional)
```

### Frontend `.env`
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_STRIPE_PUBLIC_KEY=pk_test_...   (optional)
```

---

## 🌱 Adding Stripe Payments

1. Install: `npm install stripe` (backend), `npm install @stripe/stripe-js @stripe/react-stripe-js` (frontend)
2. Create a Payment Intent on the backend in `routes/orders.js`
3. Use `<Elements>` and `<CardElement>` from Stripe in `CheckoutPage.js`
4. Add your Stripe keys to both `.env` files

---

Made with 💖 by GlowCo
