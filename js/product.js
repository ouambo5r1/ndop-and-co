/*
    Project: SDC260 4.7 Project - Smart Cart (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Product Detail page. Reads the product id from the address bar
             (product.html?id=NDP-1001), fills the page from js/products.js, and
             builds the "You may also like" cards from the same category.
             Week 4: the quantity form adds to the real cart and respects stock.
*/

const params = new URLSearchParams(window.location.search);
const product = findProduct(params.get("id")) || PRODUCTS[0];

// Fill in the main product details
document.title = `${product.name} | Ndop & Co.`;
document.getElementById("detail-crumb-cat").textContent = product.category;
document.getElementById("detail-crumb-name").textContent = product.name;
document.getElementById("detail-image").src = product.imageUrl;
document.getElementById("detail-image").alt = product.imageAlt;
document.getElementById("detail-category").textContent = product.category;
document.getElementById("detail-name").textContent = product.name;
document.getElementById("detail-description").textContent = product.description;
document.getElementById("detail-id").textContent = product.productId;
document.getElementById("detail-details").textContent = product.details;
document.getElementById("detail-weight").textContent = `${product.weightOz} oz`;
/* ===== Stock and the Add to Cart form ===== */
const addForm = document.querySelector(".add-form");
const qtyInput = document.getElementById("qty");
const addButton = addForm.querySelector("button");

function showStock() {
    const left = availableStock(product.productId);
    document.getElementById("detail-stock").textContent = left > 0 ? `In stock (${left} available)` : "Out of stock";
    qtyInput.max = Math.max(left, 1);
    qtyInput.disabled = left <= 0;
    addButton.disabled = left <= 0;
    addButton.textContent = left > 0 ? "Add to Cart" : "Out of Stock";
    addForm.classList.toggle("sold-out", left <= 0);
}

addForm.addEventListener("submit", event => {
    event.preventDefault();
    const wanted = parseInt(qtyInput.value, 10);
    if (!Number.isInteger(wanted) || wanted < 1) {
        showToast("Enter a quantity of 1 or more.", true);
        return;
    }
    const added = addToCart(product.productId, wanted);
    if (added > 0 && added < wanted) {
        showToast(`Only ${added} were available, so ${added} were added.`);
    }
    qtyInput.value = 1;
    showStock();
});

document.addEventListener("cartchange", showStock);
showStock();

const priceBox = document.getElementById("detail-price");
priceBox.innerHTML = product.salePrice !== null
    ? `<del>${money(product.price)}</del> <span class="sale">${money(product.salePrice)}</span>`
    : money(product.price);

// Related products: up to three others from the same category, then any others
const related = PRODUCTS.filter(item => item.productId !== product.productId && item.category === product.category)
    .concat(PRODUCTS.filter(item => item.category !== product.category))
    .slice(0, 3);

const relatedGrid = document.getElementById("related-grid");
for (const item of related) {
    relatedGrid.innerHTML += `
        <article class="product-card">
            <img src="${item.imageUrl}" alt="${item.imageAlt}">
            <h3>${item.name}</h3>
            <p class="price">${money(currentPrice(item))}</p>
            <a class="btn btn-primary" href="product.html?id=${item.productId}">View Details</a>
        </article>
    `;
}
