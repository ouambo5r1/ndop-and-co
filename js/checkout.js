/*
    Project: SDC260 5.5 Project - Grand Opening (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Checkout page logic. Builds the order summary from product data,
             applies coupon codes with the discount function, recalculates the
             subtotal, discount, shipping, tax, and total, and validates the
             Shipping and Purchase forms before the order is placed.
             Week 4: the order now comes from the saved cart (js/cart.js). A placed
             order is saved for the confirmation page and the cart is emptied.
*/

/* ===== Order settings ===== */
const TAX_RATE = 0.06;              // 6% sales tax estimate
const FREE_SHIPPING_MIN = 75;       // free shipping at $75 or more
const SHIPPING_FEE = 6.95;

// The order is whatever is in the saved cart
const orderItems = cart;

let appliedCoupon = null;

/* ===== Page elements ===== */
const summaryLines = document.getElementById("summary-lines");
const summarySubtotal = document.getElementById("summary-subtotal");
const summaryDiscount = document.getElementById("summary-discount");
const summaryShipping = document.getElementById("summary-shipping");
const summaryTax = document.getElementById("summary-tax");
const summaryTotal = document.getElementById("summary-total");
const couponInput = document.getElementById("coupon");
const couponButton = document.getElementById("apply-coupon");
const couponMessage = document.getElementById("coupon-message");
const shippingForm = document.getElementById("shipping-form");
const purchaseForm = document.getElementById("purchase-form");
const checkoutStatus = document.getElementById("checkout-status");

/* ===== Calculate all of the totals ===== */
function calculateTotals() {
    let subtotal = 0;
    let discount = 0;

    orderItems.forEach(item => {
        const product = findProduct(item.productId);
        const full = currentPrice(product) * item.quantity;
        const after = discountedPrice(product, appliedCoupon) * item.quantity;
        subtotal += full;
        discount += full - after;
    });

    const afterDiscount = subtotal - discount;
    const shipping = afterDiscount >= FREE_SHIPPING_MIN || afterDiscount === 0 ? 0 : SHIPPING_FEE;
    const tax = Math.round(afterDiscount * TAX_RATE * 100) / 100;
    const total = afterDiscount + shipping + tax;

    return { subtotal, discount, shipping, tax, total };
}

/* ===== Show the order summary ===== */
function renderSummary() {
    summaryLines.innerHTML = "";

    if (orderItems.length === 0) {
        summaryLines.innerHTML = `<p>Your cart is empty. <a href="shop.html">Visit the Shop</a></p>`;
    }

    orderItems.forEach(item => {
        const product = findProduct(item.productId);
        const full = currentPrice(product) * item.quantity;
        const after = discountedPrice(product, appliedCoupon) * item.quantity;
        const priceText = after < full ? `<del>${money(full)}</del> ${money(after)}` : money(full);

        summaryLines.innerHTML += `
            <p>${product.name} x ${item.quantity} <span>${priceText}</span></p>
        `;
    });

    const totals = calculateTotals();
    summarySubtotal.textContent = money(totals.subtotal);
    summaryDiscount.textContent = totals.discount > 0 ? "-" + money(totals.discount) : "$0.00";
    summaryShipping.textContent = totals.shipping === 0 ? "Free" : money(totals.shipping);
    summaryTax.textContent = money(totals.tax);
    summaryTotal.textContent = money(totals.total);
}

/* ===== Coupon: check that it exists, then apply it ===== */
function applyCoupon() {
    const entered = couponInput.value.trim();
    const coupon = findCoupon(entered);

    if (entered === "") {
        appliedCoupon = null;
        couponMessage.textContent = "No coupon entered.";
        couponMessage.className = "form-message";
    } else if (coupon === null) {
        appliedCoupon = null;
        couponMessage.textContent = `"${entered}" is not a valid coupon code.`;
        couponMessage.className = "form-message error";
    } else {
        const matches = orderItems.some(item => couponApplies(coupon, findProduct(item.productId)));
        appliedCoupon = coupon;
        couponMessage.textContent = matches
            ? `Coupon ${coupon.code} applied: ${coupon.label}.`
            : `Coupon ${coupon.code} is valid (${coupon.label}), but no items in this order qualify.`;
        couponMessage.className = matches ? "form-message success" : "form-message";
    }
    renderSummary();
}

couponButton.addEventListener("click", applyCoupon);

/* ===== Validation rules for each form ===== */
const shippingRules = [
    ["ship-name", value => validateName(value, "Full name")],
    ["ship-street", value => validateRequired(value, "Street address")],
    ["ship-city", value => validateName(value, "City")],
    ["ship-state", validateState],
    ["ship-zip", validateZip],
    ["ship-phone", validatePhone]
];

const purchaseRules = [
    ["card-name", value => validateName(value, "Cardholder name")],
    ["card-number", validateCardNumber],
    ["card-exp", validateExpiry],
    ["card-cvc", validateCVC]
];

liveValidate(shippingRules);
liveValidate(purchaseRules);

// The Place Order button belongs to the purchase form, but both forms must pass
purchaseForm.addEventListener("submit", event => {
    event.preventDefault();

    const shippingOK = validateForm(shippingRules);
    const purchaseOK = validateForm(purchaseRules);

    if (!shippingOK) {
        document.querySelector("#shipping-form .invalid").focus();
    }

    if (orderItems.length === 0) {
        checkoutStatus.textContent = "Your cart is empty. Add items in the Shop before placing an order.";
        checkoutStatus.className = "form-message error";
        return;
    }

    if (shippingOK && purchaseOK) {
        const totals = calculateTotals();
        const now = new Date();
        // Save only what the confirmation page needs (never the card details)
        const order = {
            orderNumber: `NDP-${now.getFullYear()}-${String(now.getTime()).slice(-6)}`,
            placedAt: now.toISOString(),
            items: orderItems.map(item => {
                const product = findProduct(item.productId);
                return {
                    productId: item.productId,
                    name: product.name,
                    quantity: item.quantity,
                    lineTotal: discountedPrice(product, appliedCoupon) * item.quantity
                };
            }),
            coupon: appliedCoupon ? appliedCoupon.code : null,
            subtotal: totals.subtotal,
            discount: totals.discount,
            shipping: totals.shipping,
            tax: totals.tax,
            total: totals.total,
            shipName: document.getElementById("ship-name").value.trim(),
            shipCity: document.getElementById("ship-city").value.trim(),
            shipState: document.getElementById("ship-state").value.trim().toUpperCase()
        };
        completeOrder(order);
        updateCartBadge(false);
        checkoutStatus.textContent = `Order ${order.orderNumber} placed! Total: ${money(totals.total)}. Redirecting to your confirmation...`;
        checkoutStatus.className = "form-message success";
        setTimeout(() => { window.location.href = "confirmation.html"; }, 1500);
    } else {
        checkoutStatus.textContent = "Please fix the highlighted fields before placing the order.";
        checkoutStatus.className = "form-message error";
    }
});

// Stop the shipping form from submitting on its own (Enter key)
shippingForm.addEventListener("submit", event => event.preventDefault());

renderSummary();
