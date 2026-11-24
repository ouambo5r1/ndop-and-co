/*
    Project: SDC260 3.6 Project - Make It Click (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Product Detail page. Reads the product id from the address bar
             (product.html?id=NDP-1001), fills the page from js/products.js, and
             builds the "You may also like" cards from the same category.
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
document.getElementById("detail-stock").textContent = `In stock (${product.stockQuantity})`;
document.getElementById("qty").max = product.stockQuantity;

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
