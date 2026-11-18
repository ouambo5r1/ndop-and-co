# Ndop & Co. – Online Store (SDC260 Project)

**Author:** Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
**Course:** SDC260 Web Development I – HTML, CSS, JS (ECPI University, term 202611E)
**Instructor:** Bethany Gottschall
**Started:** November 10, 2026

## Website Purpose

Ndop & Co. is a planned e-commerce website for a small business that sells handmade,
Cameroonian-inspired textiles and home goods, such as indigo *ndop* table runners,
embroidered totes, raffia baskets, and printed pillow covers. The site lets shoppers
browse products by category, read product details, add items to a cart, and complete
a simple checkout. It is built step by step with semantic HTML5, CSS, and JavaScript,
with accessibility (WCAG 2.2 AA color contrast, labels, keyboard focus) planned from
the first commit.

## Site Map

```
Store Homepage (index.html)
├── Shop / Catalog (shop.html) ── Product Detail (product.html?id=…)
│                                      └── Cart (cart.html)
├── Meet the Artisans / About (about.html)
└── Cart (cart.html) ── Checkout (checkout.html) ── Order Confirmation (confirmation.html)
```

## Brand Palette (Coolors)

| Color | Hex | Use |
|---|---|---|
| Space Indigo | `#1B2A4A` | Header, footer, headings |
| Floral White | `#FAF6EE` | Page background, text on indigo |
| Rusty Spice | `#B5482A` | Buttons and calls to action |
| Amber Honey | `#E0A526` | Accents, focus ring, promo bar |
| Carbon Black | `#222222` | Body text |

WebAIM Contrast Checker: `#222222` on `#FAF6EE` = 14.75:1, `#FFFFFF` on `#B5482A` = 5.35:1,
`#FAF6EE` on `#1B2A4A` = 13.19:1 (all pass WCAG AA for normal text).

## Planned Feature Roadmap

| Week (due date) | Milestone | Features and implementation tasks (estimated time) |
|---|---|---|
| Week 1 (Nov 15, 2026) | Planning and repository | Write proposal and product data model (3 h); build color palette and run contrast checks (1 h); create homepage prototype `index.html` + `css/styles.css` (3 h); create repo and README (1 h) |
| Week 2 (Nov 22, 2026) | Static pages and layout | Build `shop.html`, `product.html`, `about.html` with shared header/footer (4 h); responsive grid and mobile navigation (3 h); validate HTML/CSS with W3C validators (1 h) |
| Week 3 (Nov 29, 2026) | Product data and catalog with JavaScript | Store products in a JavaScript array of objects that follows the data model (2 h); render product cards from data (3 h); add search and category filter (3 h) |
| Week 4 (Dec 6, 2026) | Shopping cart | Add to cart / remove / update quantity (4 h); save cart in `localStorage` (2 h); show subtotal, tax, and shipping on `cart.html` (2 h) |
| Week 5 (Dec 13, 2026) | Checkout, testing, and launch | Checkout form with labels and validation (4 h); order confirmation page (1 h); accessibility audit with WAVE and Lighthouse plus keyboard testing (2 h); Chrome/Firefox/Edge testing and GitHub Pages publish (2 h) |

## Files

- `index.html` – initial Store Homepage prototype (author and date in the head comment)
- `css/styles.css` – brand palette and layout styles
- `README.md` – this file
