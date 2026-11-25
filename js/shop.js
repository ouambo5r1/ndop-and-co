/*
    Project: SDC260 4.7 Project - Smart Cart (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Builds the product cards on the Shop page (and the Featured Products on
             the homepage) from the PRODUCTS array with a loop. Adds the roadmap
             features for this week: keyword search, category filter, and a coupon
             box that updates the card prices on the page.
             Week 4: each card shows the available stock and an Add to Cart button
             (js/cart.js); sold-out cards are greyed out and cannot be added.
*/

/* ===== Page elements (some only exist on the Shop page) ===== */
const productGrid = document.getElementById("product-grid");
const featuredGrid = document.getElementById("featured-grid");
const searchBox = document.getElementById("shop-search");
const categoryButtons = document.querySelectorAll(".filter-btn");
const resultCount = document.getElementById("result-count");
const shopCouponForm = document.getElementById("shop-coupon-form");
const shopCouponInput = document.getElementById("shop-coupon");
const shopCouponMessage = document.getElementById("shop-coupon-message");

/* ===== Current filter state ===== */
let activeCategory = "All";
let searchTerm = "";
let activeCoupon = null;

/* ===== Build the HTML for one product card ===== */
function productCardHTML(product) {
    const unit = currentPrice(product);
    const final = discountedPrice(product, activeCoupon);

    // Price line: show the original price crossed out when a sale or coupon lowers it
    let priceHTML = money(unit);
    if (final < unit || product.salePrice !== null) {
        priceHTML = `<del>${money(product.price)}</del> <span class="sale">${money(final)}</span>`;
    }

    let couponNote = "";
    if (couponApplies(activeCoupon, product)) {
        couponNote = `<p class="coupon-tag">${activeCoupon.code}: ${activeCoupon.percent}% off</p>`;
    }

    // Stock line and Add to Cart button (stock comes from js/cart.js)
    const left = availableStock(product.productId);
    const soldOut = left <= 0;
    const stockText = soldOut ? "Out of stock" : left <= 3 ? `Only ${left} left` : `${left} in stock`;

    return `
        <article class="product-card${soldOut ? " sold-out" : ""}">
            <img src="${product.imageUrl}" alt="${product.imageAlt}">
            <p class="category-label">${product.category}</p>
            <h3>${product.name}</h3>
            <p class="card-text">${product.description}</p>
            <p class="price">${priceHTML}</p>
            ${couponNote}
            <p class="sku">${product.productId} <span class="stock-note${soldOut ? " none" : ""}">${stockText}</span></p>
            <div class="card-actions">
                <a class="btn btn-secondary" href="product.html?id=${product.productId}">View Details</a>
                <button type="button" class="btn btn-primary add-to-cart" data-id="${product.productId}"
                    ${soldOut ? "disabled" : ""} aria-label="Add ${product.name} to cart">${soldOut ? "Out of Stock" : "Add to Cart"}</button>
            </div>
        </article>
    `;
}

/* ===== Shop page: loop through the products and show the matching ones ===== */
function renderShop() {
    if (!productGrid) {
        return;
    }

    productGrid.innerHTML = "";
    let shown = 0;

    for (const product of PRODUCTS) {
        // Skip inactive products and products that do not match the filters
        if (!product.isActive) {
            continue;
        }
        const inCategory = activeCategory === "All" || product.category === activeCategory;
        const text = (product.name + " " + product.description + " " + product.category).toLowerCase();
        const matchesSearch = searchTerm === "" || text.includes(searchTerm.toLowerCase());

        if (inCategory && matchesSearch) {
            productGrid.innerHTML += productCardHTML(product);
            shown++;
        }
    }

    if (shown === 0) {
        productGrid.innerHTML = `<p class="empty-state">No products match "${searchTerm}". Try another word or choose All.</p>`;
    }

    resultCount.textContent = `Showing ${shown} of ${PRODUCTS.length} products`;
}

/* ===== Homepage: show only the featured products ===== */
function renderFeatured() {
    if (!featuredGrid) {
        return;
    }
    featuredGrid.innerHTML = "";
    PRODUCTS.filter(product => product.featured).forEach(product => {
        featuredGrid.innerHTML += productCardHTML(product);
    });
}

/* ===== Search box (also reads ?q= from the header search form) ===== */
if (searchBox) {
    const params = new URLSearchParams(window.location.search);
    searchTerm = params.get("q") || "";
    searchBox.value = searchTerm;

    searchBox.addEventListener("input", () => {
        searchTerm = searchBox.value.trim();
        renderShop();
    });
}

/* ===== Category filter buttons ===== */
categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
        activeCategory = button.dataset.category;

        // Show which button is active (for sighted users and screen readers)
        categoryButtons.forEach(other => other.setAttribute("aria-pressed", "false"));
        button.setAttribute("aria-pressed", "true");

        renderShop();
    });
});

/* ===== Coupon box on the Shop page ===== */
if (shopCouponForm) {
    shopCouponForm.addEventListener("submit", event => {
        event.preventDefault();
        const entered = shopCouponInput.value.trim();
        const coupon = findCoupon(entered);

        if (entered === "") {
            activeCoupon = null;
            shopCouponMessage.textContent = "Enter a coupon code first.";
            shopCouponMessage.className = "form-message error";
        } else if (coupon === null) {
            activeCoupon = null;
            shopCouponMessage.textContent = `"${entered}" is not a valid coupon code.`;
            shopCouponMessage.className = "form-message error";
        } else {
            activeCoupon = coupon;
            shopCouponMessage.textContent = `Coupon ${coupon.code} applied: ${coupon.label}. Prices below are updated.`;
            shopCouponMessage.className = "form-message success";
        }
        renderShop();
    });
}

/* ===== Add to Cart buttons (one listener for every card) ===== */
document.addEventListener("click", event => {
    const button = event.target.closest(".add-to-cart");
    if (button && !button.disabled) {
        addToCart(button.dataset.id, 1);
        renderShop();
        renderFeatured();
    }
});

// Re-draw if the cart changes in another tab
document.addEventListener("cartchange", () => { renderShop(); renderFeatured(); });

renderShop();
renderFeatured();
