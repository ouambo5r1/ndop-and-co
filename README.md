# Ndop & Co. – Online Store (SDC260 Project)

**Author:** Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)  
**Course:** SDC260 Web Development I – HTML, CSS, JS (ECPI University, term 202611E)  
**Instructor:** Bethany Gottschall  
**Started:** November 10, 2026  
**Last updated:** November 24, 2026 (Week 5: Grand Opening – final version)

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

## Features

**Shopping**
- Product catalog of 12 handmade products built with JavaScript from a product data array (`js/products.js`), grouped by category.
- Search box in the header and a category filter on the Shop page.
- Product Detail page filled from the `?id=` in the address, with a quantity box.
- Shopping cart saved in `localStorage`: Add to Cart on every product card, quantity + and − buttons, Remove, Clear Cart, and live totals.
- Header cart count on every page, with a bounce and a message when an item is added.
- Stock tracking: each card shows how many are left; sold-out products turn grey, their button reads "Out of Stock," and a tooltip follows the cursor.

**Checkout**
- Checkout built from the real cart, with shipping and payment forms that are validated in JavaScript (clear error messages next to each field).
- Coupon codes (see the table below), shipping ($6.95, free at $75 or more), and a 6% sales tax estimate.
- Order Confirmation page built from the saved order. Card details are never saved.

**Contact and information**
- Contact form with validation, Meet the Artisans page, and a custom Page Not Found (404) page.

**Network Connection Test (Week 5)**
- `network.html` shows the Local Host Name, Current Communication Port, Current Transmission Protocol, and Last Time Launched.
- It reports "Local network recognized" on a local development server, "Live on the public web" on GitHub Pages, and "No network: opened as a file" for a `file://` page.
- The last launch time is kept in a cookie (`ndopLastLaunch`, 30 days, `SameSite=Lax`, `Secure` on HTTPS). The page also shows the browser's online or offline state.

**Accessibility and quality**
- Semantic HTML5 landmarks, a skip link, breadcrumbs, labeled form fields, visible focus outlines, and `aria-live` messages.
- Color contrast checked with the WebAIM Contrast Checker; every page passes an axe-core 4.10 scan (WCAG 2.2 AA rules) with 0 violations.
- Responsive layout with Flexbox, Grid, and media queries (tested at 390 px, 768 px, and 1280 px wide).
- Cross-browser smoke test in Chrome, Firefox, and WebKit (`tests/cross-browser-test.py`).

## Run the Site Locally

1. Clone the repository: `git clone https://github.com/ouambo5r1/ndop-and-co.git`
2. Open the folder in Visual Studio Code and install the **Live Preview** extension (Microsoft).
3. Open `index.html` and select **Show Preview**, or open `http://127.0.0.1:3000/index.html` in a browser.
4. Open **Network Test** in the footer to confirm the page says "Local network recognized."

Any local server works too, for example `python -m http.server 5500` from the project folder.
The cart, cookies, and checkout need a server; opening the files with `file://` shows the pages,
but browser storage is limited.

### Run the cross-browser test

```
pip install playwright
python -m playwright install firefox webkit
python tests/cross-browser-test.py
```

The script starts its own local server on port 5500 and prints PASS or FAIL for each check.

## Site Map

```
Store Homepage (index.html)
├── Shop / Catalog (shop.html) ── Product Detail (product.html)
│                                      └── Cart (cart.html)
├── Meet the Artisans / About (about.html)
├── Contact (contact.html)
├── Network Connection Test (network.html)
├── Cart (cart.html) ── Checkout (checkout.html) ── Order Confirmation (confirmation.html)
└── Page Not Found (404.html)
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
| Week 2 (Nov 22, 2026) | Static pages and responsive layout | Complete |
| Week 3 (Nov 29, 2026) | Product data and catalog with JavaScript; contact, shipping, and payment forms with validation; coupon codes | Complete |
| Week 4 (Dec 6, 2026) | Shopping cart saved in localStorage, stock tracking with Out of Stock states, checkout from the cart, and a real order confirmation | Complete |
| Week 5 (Dec 13, 2026) | Network Connection Test page, local testing, accessibility review, cross-browser testing, 404 page, and final documentation | Complete (final release) |

## Project Structure

```
ndop-and-co/
├── index.html            Store Homepage (featured products)
├── shop.html             Shop / catalog with search and category filter
├── product.html          Product Detail (filled from ?id=)
├── about.html            Meet the Artisans
├── contact.html          Contact form
├── cart.html             Shopping cart
├── checkout.html         Shipping and payment forms
├── confirmation.html     Order Confirmation
├── network.html          Network Connection Test (Week 5)
├── 404.html              Page Not Found (used by GitHub Pages)
├── css/
│   └── styles.css        Brand palette, layout, components, media queries
├── js/
│   ├── products.js       Product data array (12 products)
│   ├── cart.js           Cart and stock in localStorage, header count, feedback (every page)
│   ├── shop.js           Product cards, search, category filter, Shop coupon box
│   ├── product.js        Product Detail page
│   ├── cart-page.js      Cart page table, quantities, Remove, Clear Cart, totals
│   ├── checkout.js       Checkout summary, coupons, totals, order submission
│   ├── confirmation.js   Order Confirmation from the saved order
│   ├── coupons.js        Coupon codes and discount function
│   ├── validation.js     Form validation functions
│   └── network.js        Network Connection Test (Week 5)
├── images/               Product images (ndp-*.jpg) and favicon.svg
├── tests/
│   └── cross-browser-test.py   Playwright smoke test (Chrome, Firefox, WebKit)
└── README.md
```

## Browser Storage Used

| Key | Where | What it holds |
|---|---|---|
| `ndopCart` | localStorage | Cart items as `{ productId, quantity }` |
| `ndopStock` | localStorage | Units still available for each product |
| `ndopLastOrder` | localStorage | The last order (no card details), read by the confirmation page |
| `ndopLastLaunch` | cookie (30 days) | Last time the Network Connection Test page was opened |

## Coupon Codes

| Code | Discount |
|---|---|
| `NDOP10` | 10% off the whole order |
| `TEXTILE20` | 20% off Home Textiles |
| `BASKET15` | 15% off Woven Baskets |

The checkout page is a class project. Use the test card number 4242 4242 4242 4242 with any future
expiration date; no payment is processed.

## Course Copies

This public repository holds the Ndop & Co. website. Course copies of the same files are also
stored in my private school repository under `sdc260-week2/2.6_NdopAndCo/`,
`sdc260-week3/3.6_NdopAndCo/`, `sdc260-week4/4.7_NdopAndCo/`, and `sdc260-week5/5.5_NdopAndCo/`.

## Credits

Product images are simple illustrations made for this project (no stock photos).
All products, artisans, and orders on this site are fictional; it is a class project and no payments are processed.
