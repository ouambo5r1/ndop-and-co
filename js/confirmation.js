/*
    Project: SDC260 5.5 Project - Grand Opening (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Order Confirmation page. Reads the last completed order that the
             checkout page saved in localStorage and shows the order number,
             items, totals, and shipping name and city.
*/

const confirmBox = document.getElementById("confirm-details");
let order = null;
try {
    order = JSON.parse(localStorage.getItem(ORDER_KEY));
} catch (error) {
    order = null;
}

if (!order) {
    document.getElementById("thanks-title").textContent = "No recent order found";
    confirmBox.innerHTML = `<p>We could not find a recent order on this device. Visit the Shop to start one.</p>`;
} else {
    const placed = new Date(order.placedAt);
    const lines = order.items.map(item =>
        `<li>${item.name} x ${item.quantity} &mdash; ${money(item.lineTotal)}</li>`).join("");
    confirmBox.innerHTML = `
        <p>Thank you, <span id="confirm-name"></span>! Your order has been received. This is a class project, so no payment was taken and nothing will ship.</p>
        <p class="order-number">Order number: ${order.orderNumber}</p>
        <p>Placed on ${placed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
           at ${placed.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}.
           Shipping to <span id="confirm-city"></span>.</p>
        <h2>Items in this order</h2>
        <ul>${lines}</ul>
        <p><strong>Subtotal:</strong> ${money(order.subtotal)}</p>
        ${order.discount > 0 ? `<p><strong>Coupon ${order.coupon}:</strong> -${money(order.discount)}</p>` : ""}
        <p><strong>Shipping:</strong> ${order.shipping === 0 ? "Free" : money(order.shipping)}</p>
        <p><strong>Estimated tax:</strong> ${money(order.tax)}</p>
        <p><strong>Total:</strong> ${money(order.total)}</p>
    `;
    // Text typed by the shopper is inserted with textContent, never as HTML
    document.getElementById("confirm-name").textContent = order.shipName;
    document.getElementById("confirm-city").textContent = `${order.shipCity}, ${order.shipState}`;
}
