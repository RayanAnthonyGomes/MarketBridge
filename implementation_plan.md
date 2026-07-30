# MarketBridge — Frontend Prototype Pivot

Pivot the project from a full-stack microservices build to a **frontend-only React prototype** with mock data, dummy authentication, and full dark/light mode support. The goal is a visually stunning, fully interactive prototype that showcases every feature — without any real backend, databases, or Docker.

## Proposed Changes

### 1. Update Documentation Files

These existing `.md` files need to be rewritten to reflect the prototype scope:

---

#### [MODIFY] [Build-Phases.md](file:///d:/MarketBridge%20-%20A%20Digital%20Market%20Place/MarketBridge/Build-Phases.md)

**Complete rewrite** of all 8 phases → condensed into **5 prototype-focused phases:**

| Phase | Name | What Changes |
|-------|------|-------------|
| 0 | Project Setup | ~~Docker, databases, backend~~ → Vite + React init, mock data layer, route structure |
| 1 | Core Layout & Auth Prototype | ~~JWT, bcrypt, RBAC~~ → Dummy login with 3 hardcoded users (buyer/seller/admin), theme toggle, shared layout shell |
| 2 | Marketplace & Product Pages | Same features but all data is mock JSON — search, filter, cart, wishlist, product detail |
| 3 | Dashboards & AI Feature Panels | Buyer/Seller/Admin dashboards with mock charts, AI recommendation cards, pricing suggestion panels, fraud alerts |
| 4 | Polish & Interactions | Animations, responsive testing, dark/light mode QA, loading states |

All references to Docker, PostgreSQL, MongoDB, Redis, AWS, microservices, Python, payment gateways, and CI/CD will be removed.

---

#### [MODIFY] [Memory.md](file:///d:/MarketBridge%20-%20A%20Digital%20Market%20Place/MarketBridge/Memory.md)

- Update "Current Status" to reflect prototype pivot
- Update "Up Next" queue to Phase 0 prototype tasks
- Update phase tracker from 8 → 5 phases
- Add session log entry for the pivot decision
- Add key decision entry for the pivot

---

#### [MODIFY] [Design.md](file:///d:/MarketBridge%20-%20A%20Digital%20Market%20Place/MarketBridge/Design.md)

- Mostly stays the same (design system is already excellent for the prototype)
- Add a section on **dark/light mode toggle implementation** (CSS custom properties strategy, `prefers-color-scheme` detection, toggle component spec)
- Add a note clarifying this is a prototype-first design system

---

### 2. Build the Frontend Prototype (React + Vite)

After docs are updated, the actual build will follow the new phases:

#### [NEW] `frontend-web/` — React App (Vite)

**Tech stack:**
- React 18 + Vite (fast dev server, no CRA bloat)
- React Router v6 (client-side routing)
- Vanilla CSS with CSS custom properties (per Design.md — no Tailwind)
- Lucide React (icons, per Design.md)
- Recharts or Chart.js (dashboard charts with mock data)
- Google Fonts: Inter + Outfit

**Mock data layer:**
- `src/data/` folder with JSON files for products, users, orders, reviews, notifications
- `src/context/AuthContext.jsx` — simple React context with 3 hardcoded users:
  - **Buyer:** `buyer@marketbridge.com` / `buyer123`
  - **Seller:** `seller@marketbridge.com` / `seller123`
  - **Admin:** `admin@marketbridge.com` / `admin123`
- `src/context/ThemeContext.jsx` — dark/light mode with localStorage persistence
- `src/context/CartContext.jsx` — cart state management

**Pages to build:**

| Page | Route | Role | Key Features |
|------|-------|------|-------------|
| Landing/Home | `/` | Public | Hero, featured products, categories, trending |
| Login | `/login` | Public | Role-based dummy login |
| Product Listing | `/products` | Buyer | Search, filters, sort, grid/list toggle |
| Product Detail | `/products/:id` | Buyer | Image gallery, reviews, add-to-cart, related products |
| Cart | `/cart` | Buyer | Items, quantity, subtotal, checkout button |
| Checkout | `/checkout` | Buyer | Mock payment form, order summary |
| Buyer Dashboard | `/dashboard/buyer` | Buyer | Orders, wishlist, recommendations |
| Seller Dashboard | `/dashboard/seller` | Seller | Products, sales charts, AI pricing panel, orders |
| Admin Dashboard | `/dashboard/admin` | Admin | Platform KPIs, moderation queue, fraud alerts, user management |
| Order Tracking | `/orders/:id` | Buyer | Timeline visualization, status |
| Settings/Profile | `/settings` | All | Profile edit, notification prefs, theme toggle |
| 404 | `*` | All | Styled not-found page |

> [!IMPORTANT]
> **No real backend, API calls, databases, Docker, or payment processing.** Everything runs from mock JSON data and React state/context. The prototype is purely a design and interaction showcase.

## Open Questions

1. **Should the prototype include a mobile-responsive hamburger menu, or is desktop-only sufficient for now?**
   - Recommendation: Include responsive design — it's part of the design system and relatively low effort with CSS Grid/Flexbox.

2. **For the mock product data, how many products should we seed?** 
   - Recommendation: ~20–30 products across 4–5 categories to make the marketplace feel real.

3. **Should the existing `Architecture.md`, `Rules.md`, and `project-requirements-document.md` also be updated to note the prototype scope, or leave them as-is for the eventual full build?**
   - Recommendation: Leave them as-is — they represent the full vision. The prototype docs (Build-Phases, Memory) will clearly state this is Phase 1 (prototype).

## Verification Plan

### Manual Verification
- Run `npm run dev` and visually inspect every page in both light and dark mode
- Test all 3 login roles and verify correct dashboard routing
- Test responsive layouts at mobile/tablet/desktop breakpoints
- Verify all micro-animations and hover states work smoothly
- Confirm cart operations (add/remove/quantity) persist correctly
