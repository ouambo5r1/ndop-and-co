/*
    Project: SDC260 5.5 Project - Grand Opening (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Cart page. Builds the cart table from the saved cart (js/cart.js),
             lets the shopper change quantities, remove items, or clear the cart,
             and keeps the totals and the Proceed to Checkout button up to date.
*/

const TAX_RATE = 0.06;          // same rules as the checkout page
const FREE_SHIPPING_MIN = 75;
const SHIPPING_FEE = 6.95;

const cartBody = document.getElementById("cart-body");
const cartTable = document.getElementById("cart-table");
const emptyMessage = document.getElementById("cart-empty");
const totalsBox = document.getElementById("cart-totals");
const checkoutLink = document.getElementById("checkout-link");
const clearButton = document.getElementById("clear-cart");
const cartIntro = document.getElementById("cart-intro");

/* ===== Draw the cart ===== */
function renderCart() {
    cartBody.innerHTML = "";
    const empty = cart.length === 0;

    cartTable.hidden = empty;
    totalsBox.hidden = empty;
    clearButton.hidden = empty;
    emptyMessage.hidden = !empty;
    checkoutLink.classList.toggle("disabled", empty);
    checkoutLink.setAttribute("aria-disabled", empty);
    cartIntro.textContent = empty
        ? "Your cart is empty."
        : `You have ${cartCount()} item${cartCount() === 1 ? "" : "s"} in your cart. Your cart is saved on this device.`;

    cart.forEach(item => {
        const product = findProduct(item.productId);
        const unit = currentPrice(product);
        const left = availableStock(item.productId);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <div class="cart-item">
                    <img src="${product.imageUrl}" alt="">
                    <div>
                        <a href="product.html?id=${product.productId}"><strong>${product.name}</strong></a>
                        <p>${product.productId} &middot; ${left > 0 ? left + " more available" : "no more in stock"}</p>
                    </div>
                </div>
            </td>
            <td>${money(unit)}</td>
            <td>
                <div class="qty-controls">
                    <button type="button" class="qty-btn" data-action="decrease" data-id="${product.productId}" aria-label="Decrease ${product.name}">&minus;</button>
                    <span aria-live="polite">${item.quantity}</span>
                    <button type="button" class="qty-btn" data-action="increase" data-id="${product.productId}" aria-label="Increase ${product.name}" ${left <= 0 ? "disabled" : ""}>+</button>
                </div>
            </td>
            <td>${money(unit * item.quantity)}</td>
            <td><button type="button" class="link-btn" data-action="remove" data-id="${product.productId}" aria-label="Remove ${product.name}">Remove</button></td>
        `;
        cartBody.appendChild(row);
    });

    // Totals
    const subtotal = cartSubtotal();
    const shipping = subtotal >= FREE_SHIPPING_MIN || subtotal === 0 ? 0 : SHIPPING_FEE;
    const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
    document.getElementById("cart-subtotal").textContent = money(subtotal);
    document.getElementById("cart-shipping").textContent = shipping === 0 ? "Free" : money(shipping);
    document.getElementById("cart-tax").textContent = money(tax);
    document.getElementById("cart-total").textContent = money(subtotal + shipping + tax);
    document.getElementById("shipping-hint").textContent = subtotal >= FREE_SHIPPING_MIN
        ? "Your order ships free."
        : `Add ${money(FREE_SHIPPING_MIN - subtotal)} more for free shipping.`;
}

/* ===== Buttons in the table (one listener) ===== */
cartBody.addEventListener("click", event => {
    const button = event.target.closest("button");
    if (!button) {
        return;
    }
    const id = button.dataset.id;
    if (button.dataset.action === "increase") {
        changeQuantity(id, 1);
    } else if (button.dataset.action === "decrease") {
        changeQuantity(id, -1);
    } else if (button.dataset.action === "remove") {
        removeFromCart(id);
        showToast(`${findProduct(id).name} was removed from your cart`);
    }
    renderCart();
});

clearButton.addEventListener("click", () => {
    if (confirm("Remove every item from your cart?")) {
        clearCart();
        renderCart();
        showToast("Your cart is now empty");
    }
});

// The checkout link does nothing while the cart is empty
checkoutLink.addEventListener("click", event => {
    if (cart.length === 0) {
        event.preventDefault();
        showToast("Add an item before checking out.", true);
    }
});

document.addEventListener("cartchange", renderCart);
renderCart();
