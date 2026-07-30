# 🎨 MarketBridge — Design System

> **Project:** MarketBridge — AI-Powered Digital Marketplace
> **Design Philosophy:** Premium, modern, trust-driven e-commerce experience
> **Last Updated:** 2026-07-30

---

## 1. Design Philosophy

MarketBridge's design must communicate three things at a glance:

1. **Trust** — Users are transacting money. Every pixel must feel secure, polished, and professional.
2. **Intelligence** — The AI features are a key differentiator. Design must make the AI feel present but non-intrusive — a helpful copilot, not a black box.
3. **Simplicity** — Despite the complexity (three user roles, AI engines, fraud systems), the interface must feel effortless.

### Design Style: **Modern Minimal with Warm Depth**

- Clean layouts with generous whitespace
- Soft shadows and subtle glassmorphism for elevation hierarchy
- Rounded corners (8px–16px radius) for approachability
- Micro-animations on all interactive elements (hover, click, transitions)
- Card-based layouts for product grids, dashboard widgets, and data display
- Dark mode as a first-class citizen (not an afterthought)

---

## 2. Color System

### Primary Palette

| Role | Color Name | Hex | HSL | Usage |
|------|-----------|-----|-----|-------|
| **Primary** | Royal Indigo | `#4F46E5` | `hsl(243, 75%, 59%)` | Primary buttons, active nav items, key CTAs, links |
| **Primary Light** | Soft Lavender | `#818CF8` | `hsl(239, 84%, 74%)` | Hover states, secondary highlights, badges |
| **Primary Dark** | Deep Indigo | `#3730A3` | `hsl(245, 58%, 42%)` | Active/pressed states, section headers |

### Secondary Palette

| Role | Color Name | Hex | HSL | Usage |
|------|-----------|-----|-----|-------|
| **Secondary** | Warm Amber | `#F59E0B` | `hsl(38, 92%, 50%)` | Seller-related CTAs, pricing highlights, star ratings |
| **Secondary Light** | Soft Gold | `#FCD34D` | `hsl(48, 96%, 64%)` | Sale badges, promotional banners, hover accents |
| **Secondary Dark** | Deep Amber | `#D97706` | `hsl(32, 95%, 44%)` | Active states on seller dashboard |

### Semantic / Status Colors

| Status | Color Name | Hex | Usage |
|--------|-----------|-----|-------|
| **Success** | Emerald | `#10B981` | Order confirmed, payment success, approved listings |
| **Warning** | Tangerine | `#F97316` | Low stock alerts, pending actions, AI suggestions |
| **Error** | Rose Red | `#EF4444` | Failed payments, validation errors, fraud alerts |
| **Info** | Sky Blue | `#3B82F6` | Notifications, tooltips, informational banners |

### Neutral Palette (Light Mode)

| Role | Hex | Usage |
|------|-----|-------|
| **Background** | `#F9FAFB` | Page background |
| **Surface** | `#FFFFFF` | Cards, modals, dropdowns |
| **Surface Elevated** | `#F3F4F6` | Nested cards, table rows (alt), input fields |
| **Border** | `#E5E7EB` | Card borders, dividers, input borders |
| **Text Primary** | `#111827` | Headings, body text |
| **Text Secondary** | `#6B7280` | Captions, labels, placeholder text |
| **Text Muted** | `#9CA3AF` | Disabled text, timestamps |

### Neutral Palette (Dark Mode)

| Role | Hex | Usage |
|------|-----|-------|
| **Background** | `#0F172A` | Page background (Slate 900) |
| **Surface** | `#1E293B` | Cards, modals (Slate 800) |
| **Surface Elevated** | `#334155` | Nested cards, table rows (Slate 700) |
| **Border** | `#475569` | Card borders, dividers (Slate 600) |
| **Text Primary** | `#F8FAFC` | Headings, body text (Slate 50) |
| **Text Secondary** | `#94A3B8` | Captions, labels (Slate 400) |
| **Text Muted** | `#64748B` | Disabled text (Slate 500) |

### Gradient Presets

```css
/* Hero sections, CTA banners */
--gradient-primary: linear-gradient(135deg, #4F46E5 0%, #7C3AED 50%, #EC4899 100%);

/* AI feature highlights, recommendation cards */
--gradient-ai: linear-gradient(135deg, #06B6D4 0%, #3B82F6 50%, #8B5CF6 100%);

/* Seller dashboard accents, pricing panels */
--gradient-seller: linear-gradient(135deg, #F59E0B 0%, #EF4444 100%);

/* Success states, completed order banners */
--gradient-success: linear-gradient(135deg, #10B981 0%, #06B6D4 100%);

/* Dark mode glassmorphism overlay */
--gradient-glass: linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
```

---

## 3. Typography

### Font Stack

```css
/* Primary — All UI text */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Display — Hero headings, marketing sections */
--font-display: 'Outfit', 'Inter', sans-serif;

/* Monospace — Code, order IDs, transaction hashes */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

> **Import from Google Fonts:**
> ```html
> <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Outfit:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
> ```

### Type Scale

| Token | Size | Weight | Line Height | Usage |
|-------|------|--------|-------------|-------|
| `display-xl` | 48px / 3rem | 800 (ExtraBold) | 1.1 | Hero headlines |
| `display-lg` | 36px / 2.25rem | 700 (Bold) | 1.2 | Section headers |
| `heading-1` | 30px / 1.875rem | 700 | 1.25 | Page titles |
| `heading-2` | 24px / 1.5rem | 600 (SemiBold) | 1.3 | Card headers, section titles |
| `heading-3` | 20px / 1.25rem | 600 | 1.35 | Sub-section headers |
| `heading-4` | 16px / 1rem | 600 | 1.4 | Widget titles, labels |
| `body-lg` | 18px / 1.125rem | 400 (Regular) | 1.6 | Feature descriptions |
| `body` | 16px / 1rem | 400 | 1.6 | Default body text |
| `body-sm` | 14px / 0.875rem | 400 | 1.5 | Table cells, form labels |
| `caption` | 12px / 0.75rem | 500 (Medium) | 1.4 | Timestamps, metadata, badges |
| `overline` | 11px / 0.6875rem | 600 | 1.5 | Uppercase labels, category tags |

---

## 4. Spacing System

Use an **8px base unit** for all spacing:

| Token | Value | Usage |
|-------|-------|-------|
| `space-1` | 4px | Tight padding (icon gaps, badge padding) |
| `space-2` | 8px | Default inline spacing |
| `space-3` | 12px | Form field gaps |
| `space-4` | 16px | Card internal padding, button padding |
| `space-5` | 24px | Section padding, card gaps in grids |
| `space-6` | 32px | Major section separation |
| `space-8` | 48px | Page section spacing |
| `space-10` | 64px | Hero section padding |
| `space-12` | 80px | Page top/bottom margins |

---

## 5. Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | 6px | Badges, small tags, tooltips |
| `radius-md` | 8px | Buttons, input fields, small cards |
| `radius-lg` | 12px | Cards, modals, dropdowns |
| `radius-xl` | 16px | Large cards, product image containers |
| `radius-2xl` | 24px | Hero sections, promotional banners |
| `radius-full` | 9999px | Avatars, circular buttons, pills |

---

## 6. Shadows & Elevation

### Light Mode

```css
--shadow-xs:   0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-sm:   0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04);
--shadow-md:   0 4px 6px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.04);
--shadow-lg:   0 10px 15px rgba(0, 0, 0, 0.08), 0 4px 6px rgba(0, 0, 0, 0.04);
--shadow-xl:   0 20px 25px rgba(0, 0, 0, 0.10), 0 8px 10px rgba(0, 0, 0, 0.04);
--shadow-glow: 0 0 20px rgba(79, 70, 229, 0.25);  /* Primary glow for focus states */
```

### Dark Mode

```css
--shadow-xs:   0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-sm:   0 1px 3px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3);
--shadow-md:   0 4px 6px rgba(0, 0, 0, 0.4), 0 2px 4px rgba(0, 0, 0, 0.3);
--shadow-lg:   0 10px 15px rgba(0, 0, 0, 0.45), 0 4px 6px rgba(0, 0, 0, 0.3);
--shadow-xl:   0 20px 25px rgba(0, 0, 0, 0.5), 0 8px 10px rgba(0, 0, 0, 0.35);
--shadow-glow: 0 0 25px rgba(129, 140, 248, 0.3);  /* Softer indigo glow */
```

### Glassmorphism

```css
.glass-card {
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: var(--radius-lg);
}

/* Use for: AI insight panels, floating toolbars, overlay widgets */
```

---

## 7. Component Design Tokens

### Buttons

| Variant | Background | Text | Border | Hover | Usage |
|---------|-----------|------|--------|-------|-------|
| **Primary** | `#4F46E5` | `#FFFFFF` | none | `#3730A3` + shadow-glow | Main CTAs: "Add to Cart", "Place Order" |
| **Secondary** | `transparent` | `#4F46E5` | `1px solid #4F46E5` | `#EEF2FF` bg | Secondary actions: "View Details", "Save" |
| **Ghost** | `transparent` | `#6B7280` | none | `#F3F4F6` bg | Tertiary: "Cancel", "Back" |
| **Danger** | `#EF4444` | `#FFFFFF` | none | `#DC2626` | Destructive: "Delete", "Suspend User" |
| **Success** | `#10B981` | `#FFFFFF` | none | `#059669` | Confirm: "Approve Listing", "Resolve Case" |

**Button Sizing:**

| Size | Padding | Font Size | Height | Radius |
|------|---------|-----------|--------|--------|
| `sm` | 8px 16px | 13px | 32px | `radius-md` |
| `md` | 10px 20px | 14px | 40px | `radius-md` |
| `lg` | 12px 28px | 16px | 48px | `radius-md` |
| `xl` | 16px 36px | 18px | 56px | `radius-lg` |

### Input Fields

```css
.input {
  height: 44px;
  padding: 10px 14px;
  border: 1.5px solid var(--border);
  border-radius: var(--radius-md);
  font-size: 15px;
  font-family: var(--font-primary);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  outline: none;
}

.input:invalid,
.input.error {
  border-color: var(--error);
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

### Cards

```css
.card {
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  box-shadow: var(--shadow-sm);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

/* Product cards get image container */
.product-card .image-container {
  border-radius: var(--radius-lg) var(--radius-lg) 0 0;
  overflow: hidden;
  aspect-ratio: 4/3;
}

.product-card .image-container img {
  transition: transform 0.3s ease;
}

.product-card:hover .image-container img {
  transform: scale(1.05);
}
```

---

## 8. Animation & Micro-Interactions

### Transition Defaults

```css
--transition-fast:    150ms ease;
--transition-base:    200ms ease;
--transition-smooth:  300ms cubic-bezier(0.4, 0, 0.2, 1);
--transition-spring:  400ms cubic-bezier(0.34, 1.56, 0.64, 1);
--transition-slow:    500ms ease;
```

### Required Micro-Animations

| Element | Animation | Timing |
|---------|-----------|--------|
| **Buttons** | Scale down 0.97 on press, glow on hover | `transition-fast` |
| **Cards** | Lift up 2px + shadow increase on hover | `transition-smooth` |
| **Product Images** | Scale to 1.05 on card hover | `transition-smooth` |
| **Navigation Links** | Underline slide-in from left on hover | `transition-base` |
| **Modal** | Fade in + scale from 0.95 to 1 | `transition-smooth` |
| **Dropdown** | Slide down + fade in | `transition-base` |
| **Toast Notifications** | Slide in from right + fade out | `transition-slow` |
| **Page Transitions** | Fade in on route change | `transition-smooth` |
| **Loading Skeletons** | Shimmer animation (gradient sweep) | 1.5s infinite |
| **AI Recommendation Cards** | Subtle pulse border glow (indigo → purple) | 2s infinite, subtle |
| **Add to Cart** | Button ripple + cart icon bounce | `transition-spring` |
| **Star Ratings** | Fill animation left-to-right on hover | `transition-fast` |

### Skeleton Loading Pattern

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg,
    var(--surface-elevated) 25%,
    var(--border) 50%,
    var(--surface-elevated) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-md);
}
```

---

## 9. Layout System

### Breakpoints

| Token | Value | Target |
|-------|-------|--------|
| `mobile` | 0 – 639px | Phones |
| `tablet` | 640px – 1023px | Tablets, small laptops |
| `desktop` | 1024px – 1279px | Laptops |
| `wide` | 1280px – 1535px | Desktops |
| `ultrawide` | 1536px+ | Large monitors |

### Container Widths

| Breakpoint | Max Width | Side Padding |
|------------|-----------|--------------|
| Mobile | 100% | 16px |
| Tablet | 100% | 24px |
| Desktop | 1024px | 32px |
| Wide | 1200px | 32px |
| Ultrawide | 1400px | 32px |

### Grid Systems

```css
/* Product grid — responsive auto-fill */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: var(--space-5);
}

/* Dashboard grid — fixed columns */
.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-5);
}

/* Dashboard sidebar layout */
.dashboard-layout {
  display: grid;
  grid-template-columns: 260px 1fr;
  min-height: 100vh;
}

@media (max-width: 1023px) {
  .dashboard-layout {
    grid-template-columns: 1fr;
  }
}
```

---

## 10. Iconography

**Icon Library:** [Lucide React](https://lucide.dev/) (open source, consistent, 1px stroke)

- **Style:** Outlined, 1.5px stroke weight
- **Default Size:** 20px × 20px
- **Color:** Inherits from parent text color (`currentColor`)
- **Touch Target:** Minimum 44px × 44px on mobile

### Key Icon Mapping

| Action | Icon | Context |
|--------|------|---------|
| Search | `Search` | Header search bar |
| Cart | `ShoppingCart` | Header, add-to-cart buttons |
| Wishlist | `Heart` | Product cards, wishlist page |
| User | `User` | Profile dropdown |
| Dashboard | `LayoutDashboard` | Sidebar navigation |
| Products | `Package` | Seller product management |
| Orders | `ClipboardList` | Order management |
| AI / Smart | `Sparkles` | AI recommendation badges, smart pricing |
| Fraud Alert | `ShieldAlert` | Admin fraud detection |
| Analytics | `BarChart3` | Reports and analytics |
| Notifications | `Bell` | Notification center |
| Settings | `Settings` | User settings |

---

## 11. Role-Specific Design Themes

Each user role has a subtle color accent throughout their dashboard:

| Role | Accent Color | Sidebar Tint | Badge Color | Rationale |
|------|-------------|-------------|-------------|-----------|
| **Buyer** | Royal Indigo `#4F46E5` | Indigo-tinted sidebar | Indigo badges | Trust, reliability — core shopping experience |
| **Seller** | Warm Amber `#F59E0B` | Amber-tinted sidebar | Amber badges | Energy, commerce — driving sales |
| **Admin** | Slate Teal `#0D9488` | Teal-tinted sidebar | Teal badges | Authority, control — platform governance |

---

## 12. AI Feature Design Language

AI-driven features must have a **distinct but cohesive** visual identity so users recognize them as intelligent features:

### AI Visual Markers
- **Icon:** `✨` Sparkles icon next to all AI-powered sections
- **Border:** 1px gradient border (cyan → blue → purple) on AI recommendation cards
- **Label:** "AI Suggested" or "Smart Pick" badge in `caption` size with `--gradient-ai` background
- **Tooltip:** Every AI suggestion has an ℹ️ icon that explains _why_ (e.g., "Based on your recent searches")

### AI Pricing Panel (Seller Dashboard)
```
┌─────────────────────────────────────────┐
│ ✨ AI Price Suggestion                  │
│                                         │
│  Suggested Price: $24.99                │
│  Your Current:    $29.99                │
│  Min Boundary:    $20.00                │
│  Max Boundary:    $35.00                │
│                                         │
│  📊 Reason: Competitor avg dropped 12%  │
│                                         │
│  [ Accept ]  [ Adjust ]  [ Dismiss ]    │
└─────────────────────────────────────────┘
```
- Gradient left-border (cyan → purple)
- Soft background tint (`rgba(59, 130, 246, 0.05)`)
- Never auto-applies — always requires seller action

---

## 13. Dark / Light Mode Implementation

> **Prototype Note:** Dark and light mode are first-class citizens. Every component must be tested in both themes.

### Strategy: CSS Custom Properties + `data-theme` Attribute

The theme is controlled by a `data-theme` attribute on the `<html>` element. All color tokens are defined as CSS custom properties that swap based on this attribute.

```css
/* Default: Light mode */
:root {
  --bg: #F9FAFB;
  --surface: #FFFFFF;
  --surface-elevated: #F3F4F6;
  --border: #E5E7EB;
  --text-primary: #111827;
  --text-secondary: #6B7280;
  --text-muted: #9CA3AF;
  /* ...all other tokens */
}

/* Dark mode override */
[data-theme="dark"] {
  --bg: #0F172A;
  --surface: #1E293B;
  --surface-elevated: #334155;
  --border: #475569;
  --text-primary: #F8FAFC;
  --text-secondary: #94A3B8;
  --text-muted: #64748B;
  /* ...all other tokens */
}
```

### Toggle Behavior

1. **First Visit:** Check `prefers-color-scheme` media query → apply matching theme
2. **User Toggle:** Store preference in `localStorage` key `marketbridge-theme`
3. **Subsequent Visits:** Read from `localStorage` first, fall back to system preference
4. **Transition:** Apply `transition: background-color 0.2s, color 0.2s, border-color 0.2s` to `body` during switch (avoid transitioning EVERY property for performance)

### Toggle Component Spec

```
[ ☀️ ] ← Light mode active (sun icon visible)
[ 🌙 ] ← Dark mode active (moon icon visible)
```

- Uses Lucide React icons: `Sun` and `Moon`
- Smooth icon rotation on toggle (180° spin, 300ms)
- Located in navbar, right-aligned before user avatar
- 40px × 40px touch target
- Subtle background on hover (`--surface-elevated`)

---

## 14. Accessibility Requirements

- **Color Contrast:** All text meets WCAG 2.1 AA (4.5:1 for body, 3:1 for large text)
- **Focus States:** Visible focus rings on all interactive elements (3px solid with primary glow)
- **Keyboard Navigation:** Full tab-order support across all pages
- **Screen Reader:** Semantic HTML, proper ARIA labels, alt text on all images
- **Reduced Motion:** Respect `prefers-reduced-motion` — disable animations for users who prefer it
- **Touch Targets:** Minimum 44px × 44px on mobile for all tappable elements
