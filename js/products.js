/*
    Project: SDC260 3.6 Project - Make It Click (Ndop & Co. online store)
    Author: Rodrigue Sifor OUAMBO V MBOLIYOU (Student ID: OU26049981)
    Date: November 24, 2026 (last updated)
    Purpose: Product data for the whole site. Each product is an object that follows
             the data model from my Week 1 proposal (productId, name, category,
             description, price, salePrice, stockQuantity, imageUrl, imageAlt,
             details, weightOz, isActive). Other scripts loop over this array.
*/

const PRODUCTS = [
    {
        productId: "NDP-1001",
        name: "Ndop Indigo Table Runner",
        category: "Home Textiles",
        description: "Hand-dyed indigo cotton runner with a white geometric ndop pattern.",
        price: 48.00,
        salePrice: null,
        stockQuantity: 25,
        imageUrl: "images/ndp-1001.jpg",
        imageAlt: "Indigo table runner with white geometric pattern",
        details: "100% cotton; 14 x 72 in",
        weightOz: 12,
        isActive: true,
        featured: true
    },
    {
        productId: "NDP-1002",
        name: "Ndop Cloth Placemat Set",
        category: "Home Textiles",
        description: "Set of four indigo placemats with a stitched gold border.",
        price: 38.00,
        salePrice: null,
        stockQuantity: 12,
        imageUrl: "images/ndp-1002.jpg",
        imageAlt: "Four indigo placemats with a white diamond band and gold border",
        details: "Cotton; set of 4; 13 x 19 in each",
        weightOz: 14,
        isActive: true,
        featured: false
    },
    {
        productId: "NDP-1004",
        name: "Terracotta Print Pillow Cover",
        category: "Home Textiles",
        description: "Block-printed pillow cover in terracotta and gold with a hidden zipper.",
        price: 32.00,
        salePrice: null,
        stockQuantity: 18,
        imageUrl: "images/ndp-1004.jpg",
        imageAlt: "Square throw pillow cover in a terracotta and gold print",
        details: "Cotton; 18 x 18 in; insert not included",
        weightOz: 6,
        isActive: true,
        featured: true
    },
    {
        productId: "NDP-1005",
        name: "Indigo Geometric Throw",
        category: "Home Textiles",
        description: "Soft woven throw with a repeating diamond pattern for the sofa or bed.",
        price: 72.00,
        salePrice: null,
        stockQuantity: 8,
        imageUrl: "images/ndp-1005.jpg",
        imageAlt: "Navy throw blanket with a repeating diamond pattern",
        details: "Cotton blend; 50 x 60 in",
        weightOz: 32,
        isActive: true,
        featured: false
    },
    {
        productId: "NDP-2001",
        name: "Raffia Market Tote",
        category: "Bags & Totes",
        description: "Sturdy woven raffia tote with leather handles and a terracotta band.",
        price: 34.00,
        salePrice: null,
        stockQuantity: 10,
        imageUrl: "images/ndp-2001.jpg",
        imageAlt: "Woven raffia tote bag with brown leather handles and a red band",
        details: "Raffia and leather; 16 x 14 in",
        weightOz: 11,
        isActive: true,
        featured: false
    },
    {
        productId: "NDP-2003",
        name: "Toghu-Inspired Embroidered Tote",
        category: "Bags & Totes",
        description: "Black canvas tote with a hand-embroidered border in red, gold, and green.",
        price: 36.00,
        salePrice: 32.00,
        stockQuantity: 40,
        imageUrl: "images/ndp-2003.jpg",
        imageAlt: "Black tote with colorful embroidered border",
        details: "Cotton canvas; 15 x 16 in",
        weightOz: 10,
        isActive: true,
        featured: true
    },
    {
        productId: "NDP-2004",
        name: "Market Day Crossbody",
        category: "Bags & Totes",
        description: "Small terracotta crossbody bag with a gold stripe and adjustable strap.",
        price: 28.00,
        salePrice: null,
        stockQuantity: 15,
        imageUrl: "images/ndp-2004.jpg",
        imageAlt: "Terracotta crossbody bag with a gold stripe and dark strap",
        details: "Canvas; 9 x 7 in; 50 in strap",
        weightOz: 7,
        isActive: true,
        featured: false
    },
    {
        productId: "NDP-3001",
        name: "Coiled Raffia Fruit Bowl",
        category: "Woven Baskets",
        description: "Hand-coiled raffia bowl with indigo accent rings for fruit or keys.",
        price: 26.00,
        salePrice: null,
        stockQuantity: 9,
        imageUrl: "images/ndp-3001.jpg",
        imageAlt: "Top view of a round coiled raffia bowl with indigo rings",
        details: "Raffia; 12 in across; 4 in deep",
        weightOz: 8,
        isActive: true,
        featured: false
    },
    {
        productId: "NDP-3002",
        name: "Raffia Storage Basket",
        category: "Woven Baskets",
        description: "Round lidded basket woven from natural raffia for blankets or toys.",
        price: 29.00,
        salePrice: null,
        stockQuantity: 14,
        imageUrl: "images/ndp-3002.jpg",
        imageAlt: "Round woven raffia basket with a lid",
        details: "Raffia; 14 in across; 12 in tall",
        weightOz: 16,
        isActive: true,
        featured: true
    },
    {
        productId: "NDP-3005",
        name: "Nested Raffia Bowl Set",
        category: "Woven Baskets",
        description: "Three nesting bowls in natural raffia tones for display or storage.",
        price: 42.00,
        salePrice: null,
        stockQuantity: 6,
        imageUrl: "images/ndp-3005.jpg",
        imageAlt: "Set of three nested raffia bowls in decreasing sizes",
        details: "Raffia; 8, 10, and 12 in",
        weightOz: 15,
        isActive: true,
        featured: false
    },
    {
        productId: "NDP-4001",
        name: "Indigo Head Wrap",
        category: "Apparel",
        description: "Long indigo cotton head wrap with a gold band, easy to tie many ways.",
        price: 24.00,
        salePrice: null,
        stockQuantity: 20,
        imageUrl: "images/ndp-4001.jpg",
        imageAlt: "Folded indigo head wrap with a gold band",
        details: "Cotton; 22 x 70 in",
        weightOz: 5,
        isActive: true,
        featured: false
    },
    {
        productId: "NDP-4002",
        name: "Sun-Dyed Cotton Scarf",
        category: "Apparel",
        description: "Lightweight scarf sun-dyed in gold and terracotta bands.",
        price: 22.00,
        salePrice: null,
        stockQuantity: 3,
        imageUrl: "images/ndp-4002.jpg",
        imageAlt: "Draped sun-dyed cotton scarf in gold and terracotta bands",
        details: "Cotton voile; 20 x 72 in",
        weightOz: 4,
        isActive: true,
        featured: false
    }
];

// Return the price a shopper actually pays (sale price when there is one)
function currentPrice(product) {
    return product.salePrice !== null ? product.salePrice : product.price;
}

// Format a number as US dollars, e.g. 48 -> "$48.00"
function money(amount) {
    return "$" + amount.toFixed(2);
}

// Find one product by its productId
function findProduct(productId) {
    return PRODUCTS.find(product => product.productId === productId);
}
