# MarketBridge Prototype — Task Tracker

## Documentation Updates
- [ ] Rewrite Build-Phases.md (8 → 5 prototype phases)
- [ ] Update Memory.md (pivot, new phase tracker)
- [ ] Add dark/light mode toggle spec to Design.md

## Phase 0 — Project Setup
- [ ] Initialize Vite + React app in `frontend-web/`
- [ ] Install dependencies (react-router, lucide-react, recharts)
- [ ] Set up folder structure (`components/`, `pages/`, `data/`, `context/`, `styles/`)
- [ ] Create CSS design system (`index.css` with all tokens from Design.md)
- [ ] Create mock data JSON files (products, users, orders, reviews, notifications)

## Phase 1 — Core Layout & Auth
- [ ] ThemeContext (dark/light mode with localStorage)
- [ ] AuthContext (3 dummy users, login/logout)
- [ ] CartContext (add/remove/quantity)
- [ ] App shell layout (Navbar, Sidebar, Footer)
- [ ] Theme toggle component
- [ ] Login page
- [ ] Route protection (role-based redirects)

## Phase 2 — Marketplace & Product Pages
- [ ] Landing/Home page (hero, featured, categories, trending)
- [ ] Product listing page (search, filters, sort, grid)
- [ ] Product detail page (gallery, reviews, add-to-cart, related)
- [ ] Cart page (items, quantities, subtotal)
- [ ] Checkout page (mock payment form)
- [ ] Wishlist functionality
- [ ] Order tracking page

## Phase 3 — Dashboards & AI Panels
- [ ] Buyer dashboard (orders, wishlist, recommendations)
- [ ] Seller dashboard (products, sales charts, AI pricing, orders)
- [ ] Admin dashboard (KPIs, moderation, fraud alerts, users)
- [ ] Settings/Profile page
- [ ] Notification center

## Phase 4 — Polish
- [ ] Micro-animations & hover states
- [ ] Responsive design (mobile/tablet/desktop)
- [ ] Loading skeletons
- [ ] 404 page
- [ ] Dark/light mode QA across all pages
- [ ] Final visual review
