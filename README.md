# MarketBridge Frontend

A React + Vite storefront for the MarketBridge app, with marketplace pages and role-based dashboards for buyers, sellers, and admins.

## Quick start

Install dependencies:

```bash
cd frontend-web
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app in your browser at:

```bash
http://localhost:5173
```

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run linting:

```bash
npm run lint
```

## What’s included

- React 19 with Vite
- React Router DOM for client-side routing
- Role-based protected routes for buyer, seller, and admin dashboards
- Cart and theme context providers
- Example product search, product detail, checkout, and login pages
- Recharts analytics support
- Lucide icons for UI controls

## App routes

### Public routes

- `/` — Home marketplace
- `/products` — Product grid and filtering
- `/products/:id` — Product details page
- `/cart` — Shopping cart
- `/login` — Authentication page

### Authenticated routes

- `/checkout` — Checkout page
- `/settings` — Settings view
- `/orders/:id` — Order details

### Role-based dashboards

Buyer routes (buyer access only):

- `/dashboard/buyer`
- `/dashboard/buyer/orders`
- `/dashboard/buyer/wishlist`
- `/dashboard/buyer/recommendations`

Seller routes (seller access only):

- `/dashboard/seller`
- `/dashboard/seller/products`
- `/dashboard/seller/orders`
- `/dashboard/seller/analytics`
- `/dashboard/seller/pricing`

Admin routes (admin access only):

- `/dashboard/admin`
- `/dashboard/admin/moderation`
- `/dashboard/admin/fraud`
- `/dashboard/admin/users`
- `/dashboard/admin/analytics`

### Error route

- `*` — Not found page

## Project structure

- `src/App.jsx` — Main route definitions and protected route handling
- `src/main.jsx` — App entry point
- `src/pages` — Marketplace, auth, buyer, seller, admin, and error pages
- `src/components/layout` — Shared layout components: `Navbar`, `Sidebar`, `Footer`
- `src/context` — Auth, cart, and theme providers
- `src/data` — Mock product and notification data
- `src/styles` — Global CSS styles

## Notes

- `BrowserRouter` is used in `src/App.jsx`.
- The navbar is hidden on `/login` and shown elsewhere.
- Protected dashboard routes automatically redirect unauthorized users.

## Troubleshooting

- If the dev server does not start, verify Node.js and npm are installed then run `npm install` again.
- If the build fails, check the terminal for syntax or route import errors.
- Run `npm run lint` to catch style or code issues early.
