/*
    Project: SDC260 4.7 Project - Smart Cart (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Shopping cart and inventory for the whole site. The cart and the
             available stock are saved in localStorage so they survive a refresh
             and a closed browser. Loaded on every page (after products.js) so the
             header cart count, Add to Cart feedback, and stock checks work everywhere.
*/

/* ===== localStorage keys ===== */
const CART_KEY = "ndopCart";      // [{ productId, quantity }]
const STOCK_KEY = "ndopStock";    // { "NDP-1001": 25, ... } units still available
const ORDER_KEY = "ndopLastOrder"; // the last completed order, read by confirmation.html

/* ===== Read and save ===== */
function loadCart() {
    try {
        const saved = JSON.parse(localStorage.getItem(CART_KEY));
        // Keep only entries that point to a real product with a positive quantity
        return Array.isArray(saved)
            ? saved.filter(item => findProduct(item.productId) && item.quantity > 0)
            : [];
    } catch (error) {
        return [];
    }
}

function loadStock() {
    let saved = {};
    try {
        saved = JSON.parse(localStorage.getItem(STOCK_KEY)) || {};
    } catch (error) {
        saved = {};
    }
    // Start every product at its stockQuantity the first time
    PRODUCTS.forEach(product => {
        if (typeof saved[product.productId] !== "number") {
            saved[product.productId] = product.stockQuantity;
        }
    });
    return saved;
}

let cart = loadCart();
let stock = loadStock();

function saveCart() {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    localStorage.setItem(STOCK_KEY, JSON.stringify(stock));
}

/* ===== Inventory helpers ===== */
function availableStock(productId) {
    return stock[productId] || 0;
}

function inCart(productId) {
    const item = cart.find(entry => entry.productId === productId);
    return item ? item.quantity : 0;
}

/* ===== Cart actions (each one updates stock and saves) ===== */

// Add one or more units. Returns how many were actually added.
function addToCart(productId, quantity = 1) {
    const amount = Math.min(quantity, availableStock(productId));
    if (amount <= 0) {
        showToast("Sorry, that item is out of stock.", true);
        return 0;
    }

    const item = cart.find(entry => entry.productId === productId);
    if (item) {
        item.quantity += amount;
    } else {
        cart.push({ productId: productId, quantity: amount });
    }
    stock[productId] -= amount;

    saveCart();
    updateCartBadge(true);
    const name = findProduct(productId).name;
    showToast(amount === 1 ? `${name} added to your cart` : `${amount} x ${name} added to your cart`);
    return amount;
}

// Change the quantity of a cart line by +1 or -1
function changeQuantity(productId, change) {
    const item = cart.find(entry => entry.productId === productId);
    if (!item) {
        return;
    }
    if (change > 0) {
        if (availableStock(productId) <= 0) {
            showToast("No more of this item is in stock.", true);
            return;
        }
        item.quantity++;
        stock[productId]--;
    } else {
        item.quantity--;
        stock[productId]++;
        if (item.quantity <= 0) {
            cart = cart.filter(entry => entry.productId !== productId);
        }
    }
    saveCart();
    updateCartBadge(false);
}

// Remove a whole line and put every unit back in stock
function removeFromCart(productId) {
    const item = cart.find(entry => entry.productId === productId);
    if (!item) {
        return;
    }
    stock[productId] += item.quantity;
    cart = cart.filter(entry => entry.productId !== productId);
    saveCart();
    updateCartBadge(false);
}

// Empty the cart and restore stock
function clearCart() {
    cart.forEach(item => {
        stock[item.productId] += item.quantity;
    });
    cart = [];
    saveCart();
    updateCartBadge(false);
}

// After a successful order: the units are sold, so stock stays reduced
function completeOrder(order) {
    localStorage.setItem(ORDER_KEY, JSON.stringify(order));
    cart = [];
    saveCart();
}

/* ===== Totals (shared by the cart and checkout pages) ===== */
function cartCount() {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartSubtotal() {
    return cart.reduce((sum, item) => sum + currentPrice(findProduct(item.productId)) * item.quantity, 0);
}

/* ===== Page feedback ===== */

// Header "Cart (n)" link on every page; bumps when something is added
function updateCartBadge(bump) {
    document.querySelectorAll('.nav-list a[href="cart.html"]').forEach(link => {
        link.textContent = `Cart (${cartCount()})`;
        link.setAttribute("aria-label", `Cart, ${cartCount()} items`);
        if (bump) {
            link.classList.remove("cart-bump");
            void link.offsetWidth;          // restart the animation
            link.classList.add("cart-bump");
        }
    });
}

// Small message in the corner (role=status so screen readers announce it)
function showToast(message, isError = false) {
    let toast = document.getElementById("toast");
    if (!toast) {
        toast = document.createElement("p");
        toast.id = "toast";
        toast.className = "toast";
        toast.setAttribute("role", "status");
        document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.toggle("toast-error", isError);
    toast.classList.add("show");
    clearTimeout(showToast.timer);
    showToast.timer = setTimeout(() => toast.classList.remove("show"), 2200);
}

/* ===== "Out of Stock" tooltip that follows the cursor ===== */
const stockTooltip = document.createElement("div");
stockTooltip.className = "stock-tooltip";
stockTooltip.textContent = "Out of Stock";
stockTooltip.setAttribute("aria-hidden", "true");
document.body.appendChild(stockTooltip);

document.addEventListener("mousemove", event => {
    const soldOut = event.target.closest(".sold-out");
    if (soldOut) {
        stockTooltip.style.left = `${event.clientX + 14}px`;
        stockTooltip.style.top = `${event.clientY + 14}px`;
        stockTooltip.classList.add("show");
    } else {
        stockTooltip.classList.remove("show");
    }
});

// Keep pages in sync if the cart changes in another tab
window.addEventListener("storage", event => {
    if (event.key === CART_KEY || event.key === STOCK_KEY) {
        cart = loadCart();
        stock = loadStock();
        updateCartBadge(false);
        document.dispatchEvent(new Event("cartchange"));
    }
});

updateCartBadge(false);
