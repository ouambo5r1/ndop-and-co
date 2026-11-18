# Ndop & Co. – Online Store (SDC260 Project)

**Author:** Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)  
**Course:** SDC260 Web Development I – HTML, CSS, JS (ECPI University, term 202611E)  
**Instructor:** Bethany Gottschall  
**Started:** November 10, 2026  
**Last updated:** November 17, 2026 (Week 2: Style & Substance)

**Repository:** https://github.com/ouambo5r1/ndop-and-co  
**Live site (GitHub Pages):** https://ouambo5r1.github.io/ndop-and-co/

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
├── Shop / Catalog (shop.html) ── Product Detail (product.html)
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

## Feature Roadmap

| Week (due date) | Milestone | Status |
|---|---|---|
| Week 1 (Nov 15, 2026) | Planning and repository; homepage prototype | Complete |
| Week 2 (Nov 22, 2026) | Static pages and responsive layout | Complete (this milestone) |
| Week 3 (Nov 29, 2026) | Product data and catalog with JavaScript | Not started |
| Week 4 (Dec 6, 2026) | Shopping cart | Not started |
| Week 5 (Dec 13, 2026) | Checkout, testing, and launch | Not started |

## Files

- `index.html` – Store Homepage
- `shop.html` – Shop / catalog, grouped by category
- `product.html` – Product Detail page (Ndop Indigo Table Runner, NDP-1001)
- `about.html` – Meet the Artisans
- `cart.html` – Shopping cart layout (static sample items)
- `checkout.html` – Checkout form with labeled fields
- `confirmation.html` – Order Confirmation
- `css/styles.css` – Brand palette, shared layout, Flexbox/Grid, and media queries
- `images/` – Product images used on the catalog, detail, and cart pages
- `README.md` – this file

This public repository holds the Ndop & Co. website. Course copies of the same
files are also stored in the private school repository under `sdc260-week2/2.6_NdopAndCo/`.
