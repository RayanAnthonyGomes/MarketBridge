# 🏗️ MarketBridge — Build Phases (Prototype)

> **Project:** MarketBridge — AI-Powered Digital Marketplace
> **Scope:** Frontend-Only Prototype (React + Vite)
> **Mode:** Prototype — Mock data, dummy auth, no backend
> **Last Updated:** 2026-07-30

---

## ⚠️ Prototype Scope Notice

This document defines the build phases for the **frontend prototype only**. There is no real backend, database, Docker, or payment processing. All data is mock JSON, authentication uses hardcoded dummy credentials, and AI features are simulated with static/randomized data. The goal is to validate the **design, UX flows, and feature layout** before building the full stack.

For the full-stack architecture and requirements, see:
- [Architecture.md](file:///d:/MarketBridge%20-%20A%20Digital%20Market%20Place/MarketBridge/Architecture.md)
- [project-requirements-document.md](file:///d:/MarketBridge%20-%20A%20Digital%20Market%20Place/MarketBridge/project-requirements-document.md)

---

## Phase Overview

| Phase | Name | Focus Area | Est. Duration |
|-------|------|------------|---------------|
| 0 | Project Setup | Vite + React init, mock data, CSS design system, routing | 1–2 days |
| 1 | Core Layout & Auth Prototype | App shell, dummy login, theme toggle, route guards | 1–2 days |
| 2 | Marketplace & Product Pages | Homepage, search, product detail, cart, checkout, wishlist | 3–4 days |
| 3 | Dashboards & AI Feature Panels | Buyer/Seller/Admin dashboards, AI panels, notifications | 3–4 days |
| 4 | Polish & Interactions | Animations, responsive QA, dark/light mode QA, loading states | 1–2 days |

---

## 🔷 Phase 0 — Project Setup

**Goal:** Scaffold the React application, establish the CSS design system, create the mock data layer, and configure routing.

### Deliverables

- [ ] **Vite + React Init** — Initialize app in `frontend-web/` with Vite, React 18, and React Router v6
- [ ] **Dependencies** — Install: `react-router-dom`, `lucide-react`, `recharts`
- [ ] **Folder Structure**
  ```
  frontend-web/src/
  ├── assets/          # Static images, logos
  ├── components/      # Reusable UI components
  │   ├── layout/      # Navbar, Sidebar, Footer
  │   ├── ui/          # Button, Card, Input, Badge, Modal
  │   └── shared/      # ThemeToggle, StarRating, SearchBar
  ├── context/         # AuthContext, ThemeContext, CartContext
  ├── data/            # Mock JSON (products, users, orders, reviews)
  ├── hooks/           # Custom hooks
  ├── pages/           # All page components
  │   ├── auth/        # Login
  │   ├── buyer/       # BuyerDashboard, OrderTracking
  │   ├── seller/      # SellerDashboard
  │   ├── admin/       # AdminDashboard
  │   └── marketplace/ # Home, ProductList, ProductDetail, Cart, Checkout
  ├── styles/          # CSS files
  │   └── index.css    # Master design system
  ├── utils/           # Helper functions
  ├── App.jsx          # Router + layout
  └── main.jsx         # Entry point
  ```
- [ ] **CSS Design System** — Implement all tokens from [Design.md](file:///d:/MarketBridge%20-%20A%20Digital%20Market%20Place/MarketBridge/Design.md) as CSS custom properties with dark/light mode variants
- [ ] **Mock Data Files**
  - `products.json` — 25+ products across 5 categories (Electronics, Fashion, Home & Kitchen, Sports, Books)
  - `users.json` — 3 dummy users (buyer, seller, admin) with profiles
  - `orders.json` — 8–10 sample orders in various states
  - `reviews.json` — 15–20 product reviews with ratings
  - `notifications.json` — Sample notifications for each role
  - `categories.json` — Category tree
- [ ] **Route Config** — All routes defined in App.jsx with lazy loading

### Acceptance Criteria
- `npm run dev` launches the app without errors
- CSS custom properties toggle correctly between light and dark mode
- All mock data imports resolve correctly
- React Router navigates between placeholder pages

---

## 🔷 Phase 1 — Core Layout & Auth Prototype

**Goal:** Build the app shell (navbar, sidebar, footer), implement dummy authentication with role-based routing, and add the dark/light mode toggle.

### Features

- [ ] **Theme System**
  - ThemeContext with `light` / `dark` state
  - Toggle persisted in `localStorage`
  - Respect `prefers-color-scheme` on first visit
  - Smooth CSS transition on theme switch (200ms)
  - Toggle component in navbar (sun/moon icon swap)
- [ ] **Dummy Authentication**
  - AuthContext with login/logout functions
  - 3 hardcoded users:
    - 🛒 **Buyer:** `buyer@marketbridge.com` / `buyer123`
    - 🏪 **Seller:** `seller@marketbridge.com` / `seller123`
    - 🛡️ **Admin:** `admin@marketbridge.com` / `admin123`
  - Login page with email/password form
  - Role stored in context + `localStorage`
  - Auto-redirect to role-specific dashboard on login
  - Logout clears state and redirects to login
- [ ] **App Shell — Navbar**
  - MarketBridge logo + brand name
  - Search bar (functional in Phase 2)
  - Navigation links: Home, Products, Cart
  - User avatar dropdown (profile, dashboard, logout)
  - Theme toggle (sun/moon)
  - Notification bell icon (badge with count)
  - Cart icon (badge with item count)
- [ ] **App Shell — Sidebar (Dashboards only)**
  - Collapsible sidebar for dashboard pages
  - Role-specific navigation links
  - Active state highlighting
  - Role accent color theming (Indigo / Amber / Teal)
- [ ] **App Shell — Footer**
  - Copyright, links, social icons
  - Responsive stacking on mobile
- [ ] **Route Protection**
  - `<ProtectedRoute>` wrapper component
  - Unauthenticated → redirect to `/login`
  - Wrong role → redirect to correct dashboard
  - Public routes accessible without login (Home, Products, Product Detail)

### Acceptance Criteria
- Users can log in with any of the 3 dummy credentials
- Wrong credentials show an error message
- Theme toggle switches between light and dark mode instantly
- Navbar, sidebar, and footer render correctly in both modes
- Protected dashboard routes redirect unauthenticated users

---

## 🔷 Phase 2 — Marketplace & Product Pages

**Goal:** Build all buyer-facing marketplace pages with full interactivity using mock data.

### Features

- [ ] **Landing / Home Page**
  - Hero section with gradient background and CTA buttons
  - Category navigation bar (horizontal scroll on mobile)
  - Featured products carousel/grid (4–6 products)
  - "Trending Now" section
  - "✨ AI Recommended for You" section (mock recommendations)
  - Newsletter signup section (visual only)
- [ ] **Product Listing Page (`/products`)**
  - Search bar with debounced filtering
  - Sidebar filters: category, price range (slider), rating, availability
  - Sort dropdown: price low/high, newest, rating, popularity
  - Grid / list view toggle
  - Product cards with: image, title, price, rating stars, "Add to Cart" button
  - Hover animations (image zoom, card lift)
  - Results count and active filter chips
  - Pagination or "Load More"
- [ ] **Product Detail Page (`/products/:id`)**
  - Image gallery (main image + thumbnails, click to switch)
  - Product title, price, description, specifications
  - Star rating display + review count
  - Quantity selector + "Add to Cart" button
  - "Add to Wishlist" heart button
  - Seller info card
  - "✨ You May Also Like" section (mock related products)
  - Reviews section (list of mock reviews with ratings)
- [ ] **Shopping Cart (`/cart`)**
  - Cart items list with images, titles, prices
  - Quantity +/- controls per item
  - Remove item button
  - Cart summary sidebar: subtotal, estimated tax, total
  - "Proceed to Checkout" button
  - "Continue Shopping" link
  - Empty cart state with illustration
- [ ] **Checkout Page (`/checkout`)**
  - Address form (pre-filled from mock user data)
  - Payment form (mock — card number, expiry, CVV fields)
  - Order summary sidebar
  - "Place Order" button → success confirmation modal
  - Order confirmation page with order ID
- [ ] **Wishlist**
  - Heart icon toggle on product cards and detail pages
  - Wishlist page accessible from buyer dashboard
  - "Move to Cart" action per item
- [ ] **Order Tracking (`/orders/:id`)**
  - Visual timeline (Placed → Confirmed → Shipped → Delivered)
  - Current status highlighted
  - Estimated delivery date
  - Order details (items, address, payment summary)

### Acceptance Criteria
- Product search and filters work correctly against mock data
- Cart operations (add, remove, quantity) update in real-time
- Wishlist state persists during the session
- Checkout flow completes with a confirmation modal
- Order tracking timeline renders the correct status
- All pages render correctly in both light and dark mode

---

## 🔷 Phase 3 — Dashboards & AI Feature Panels

**Goal:** Build the role-specific dashboards with mock analytics, simulated AI features, and notification center.

### Features

- [ ] **Buyer Dashboard (`/dashboard/buyer`)**
  - Welcome header with user name
  - Recent orders widget (table with status badges)
  - Wishlist summary widget (top 4 items)
  - "✨ Recommended for You" widget (AI mock: 4 product cards)
  - Quick links: Track Order, Browse Products, Settings
- [ ] **Seller Dashboard (`/dashboard/seller`)**
  - Sales overview cards: Total Revenue, Units Sold, Conversion Rate, Avg Order Value
  - Sales chart (Recharts line/bar chart with mock monthly data)
  - My Products table (name, category, price, stock, status)
  - Product actions: Edit (modal), Toggle Active/Inactive
  - Incoming orders table (order ID, buyer, items, status, date)
  - **✨ AI Dynamic Pricing Panel**
    - Suggested price vs. current price
    - Min/max boundary display
    - Reason text: "Competitor avg dropped 12%"
    - Accept / Adjust / Dismiss buttons (visual interaction, mock state)
    - Gradient left-border AI visual identity
  - Inventory alerts widget (low-stock items)
- [ ] **Admin Dashboard (`/dashboard/admin`)**
  - Platform KPI cards: Total Users, Total Orders, Revenue, Active Listings
  - KPI trend sparklines (Recharts)
  - Product moderation queue (table: product name, seller, date, approve/reject buttons)
  - **🛡️ Fraud Alerts Panel**
    - Flagged transactions table (user, amount, risk level badge, date)
    - Risk levels: LOW (green), MEDIUM (amber), HIGH (orange), CRITICAL (red)
    - Actions: Investigate, Dismiss, Suspend User
    - Case detail modal
  - User management table (search, filter by role, suspend toggle)
  - Platform analytics charts (user growth, order volume — Recharts)
- [ ] **Settings / Profile (`/settings`)**
  - Profile form (name, email, avatar, address)
  - Password change form (visual only)
  - Notification preferences (toggle switches)
  - Theme preference (light/dark/system)
  - Account section
- [ ] **Notification Center**
  - Bell icon in navbar with unread count badge
  - Dropdown panel with notification list
  - Notification types: order updates, stock alerts, AI suggestions, fraud alerts
  - Mark as read / mark all as read
  - Timestamp display ("2 hours ago")

### Acceptance Criteria
- Each role sees only their designated dashboard
- Charts render with mock data and are interactive (hover tooltips)
- AI pricing panel shows mock suggestions with accept/dismiss functionality
- Fraud alerts display with correct risk-level color coding
- Notification dropdown opens with mock notification items
- All dashboards render correctly in both light and dark mode

---

## 🔷 Phase 4 — Polish & Interactions

**Goal:** Final quality pass — animations, responsive design, loading states, error states, and cross-theme QA.

### Features

- [ ] **Micro-Animations**
  - Button press scale (0.97)
  - Card hover lift (translateY -2px)
  - Product image zoom on hover (scale 1.05)
  - Nav link underline slide-in
  - Modal fade + scale entrance
  - Toast slide-in from right
  - Page fade transitions on route change
  - Skeleton shimmer loading
  - AI card pulse glow border
  - Cart icon bounce on add
  - Star rating fill animation
- [ ] **Responsive Design**
  - Mobile: hamburger menu, stacked layouts, full-width cards
  - Tablet: 2-column product grid, collapsible sidebar
  - Desktop: full layout as designed
  - Touch-friendly targets (44px minimum)
- [ ] **Loading & Empty States**
  - Skeleton loading screens for products, dashboards
  - Empty state illustrations: empty cart, no orders, no results
  - Spinner for simulated loading delays
- [ ] **Error States**
  - 404 Not Found page (styled with illustration)
  - Invalid login feedback
  - Form validation messages
- [ ] **Dark/Light Mode QA**
  - Verify every page in both modes
  - Check color contrast (WCAG AA)
  - Verify gradient and glassmorphism effects in dark mode
  - Test theme persistence across page refreshes
- [ ] **Performance**
  - Lazy load route components (React.lazy + Suspense)
  - Optimize images
  - Verify smooth 60fps animations

### Acceptance Criteria
- All animations are smooth and non-janky
- Every page is usable on mobile (375px), tablet (768px), and desktop (1440px)
- Dark and light modes look polished on every page
- 404 page renders for unknown routes
- No console errors or warnings
- Lighthouse performance score > 90

---

## 📌 Prototype Constraints

These constraints apply across ALL phases:

1. **No Backend** — All data comes from local JSON files and React state/context
2. **No Real Auth** — 3 hardcoded users only, no JWT, no registration
3. **No Real Payments** — Checkout is a visual form only, no Stripe/Razorpay
4. **No Docker** — Just `npm run dev` to start
5. **No Database** — localStorage for persistence (cart, theme, auth), everything else resets on refresh
6. **AI is Simulated** — Recommendation and pricing panels show mock data, not real ML models
7. **Dark + Light Mode** — Every component must work in both themes from day one

---

## 🔐 Dummy User Credentials

| Role | Email | Password | Dashboard Route |
|------|-------|----------|-----------------|
| 🛒 Buyer | `buyer@marketbridge.com` | `buyer123` | `/dashboard/buyer` |
| 🏪 Seller | `seller@marketbridge.com` | `seller123` | `/dashboard/seller` |
| 🛡️ Admin | `admin@marketbridge.com` | `admin123` | `/dashboard/admin` |
