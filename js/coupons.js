/*
    Project: SDC260 5.5 Project - Grand Opening (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Coupon codes and the discount function. A coupon can take a percentage
             off the whole order ("order") or only off products in one category.
             Used on the Shop page (live card prices) and on the Checkout page.
*/

const COUPONS = [
    { code: "NDOP10",    percent: 10, appliesTo: "order",         label: "10% off your whole order" },
    { code: "TEXTILE20", percent: 20, appliesTo: "Home Textiles", label: "20% off Home Textiles" },
    { code: "BASKET15",  percent: 15, appliesTo: "Woven Baskets", label: "15% off Woven Baskets" }
];

// Look up a coupon. Codes are not case sensitive and spaces are ignored.
// Returns the coupon object, or null if the code does not exist.
function findCoupon(code) {
    const cleaned = String(code || "").trim().toUpperCase();
    if (cleaned === "") {
        return null;
    }
    return COUPONS.find(coupon => coupon.code === cleaned) || null;
}

// Does this coupon apply to this product?
function couponApplies(coupon, product) {
    return coupon !== null && (coupon.appliesTo === "order" || coupon.appliesTo === product.category);
}

// Discount function: returns the unit price after the coupon (rounded to cents)
function discountedPrice(product, coupon) {
    const base = currentPrice(product);
    if (!couponApplies(coupon, product)) {
        return base;
    }
    return Math.round(base * (100 - coupon.percent)) / 100;
}
