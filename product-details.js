// Product database with detailed information for each product
const products = {
    1: {
        id: 1,
        name: "Premium Red Cotton T-Shirt",
        price: 50.00,
        category: "T-shirt",
        description: "Made from 100% premium cotton, this red t-shirt offers exceptional comfort and breathability. Perfect for workouts or casual wear, it features moisture-wicking technology to keep you dry and comfortable during intense activities.",
        features: [
            "100% Premium Cotton Fabric",
            "Moisture-Wicking Technology", 
            "Breathable & Comfortable",
            "Machine Washable",
            "Available in Multiple Sizes"
        ],
        images: ["product-1.jpg", "product-1.jpg", "product-1.jpg", "product-1.jpg"]
    },
    2: {
        id: 2,
        name: "Pro Running Sports Shoes",
        price: 65.00,
        category: "Shoes", 
        description: "Engineered for performance runners, these sports shoes feature advanced cushioning technology and breathable mesh upper. The durable rubber outsole provides excellent traction on various surfaces.",
        features: [
            "Advanced Cushioning Technology",
            "Breathable Mesh Upper",
            "Durable Rubber Outsole", 
            "Lightweight Design",
            "Available in Multiple Colors"
        ],
        images: ["product-2.jpg", "product-2.jpg", "product-2.jpg", "product-2.jpg"]
    },
    3: {
        id: 3,
        name: "Comfort Fit Jogger Pants", 
        price: 65.00,
        category: "Pants",
        description: "These jogger pants combine style with functionality. Made from stretchable fabric with an elastic waistband and adjustable drawstring for perfect fit. Ideal for workouts or casual outings.",
        features: [
            "Stretchable Comfort Fabric",
            "Elastic Waistband with Drawstring",
            "Multiple Pocket Design",
            "Machine Washable",
            "Available in Multiple Colors"
        ],
        images: ["product-3.jpg", "product-3.jpg", "product-3.jpg", "product-3.jpg"]
    },
    4: {
        id: 4,
        name: "Classic Blue Polo Shirt",
        price: 45.00, 
        category: "Shirt",
        description: "A timeless classic polo shirt made from premium pique cotton. Features a comfortable fit, ribbed collar, and short sleeves. Perfect for both casual and semi-formal occasions.",
        features: [
            "Premium Pique Cotton",
            "Ribbed Collar & Cuffs",
            "Comfortable Fit",
            "Easy Care & Machine Washable",
            "Available in Multiple Colors"
        ],
        images: ["product-4.jpg", "product-4.jpg", "product-4.jpg", "product-4.jpg"]
    },
    5: {
        id: 5,
        name: "Urban Style High Top Sneakers",
        price: 50.00,
        category: "Shoes",
        description: "Street-style high top sneakers with premium leather upper and cushioned insole. Features lace-up closure and durable rubber sole for all-day comfort and style.",
        features: [
            "Premium Leather Upper", 
            "Cushioned Comfort Insole",
            "Lace-Up Closure",
            "Durable Rubber Sole",
            "Urban Street Style Design"
        ],
        images: ["product-5.jpg", "product-5.jpg", "product-5.jpg", "product-5.jpg"]
    },
    6: {
        id: 6,
        name: "Puma Performance T-Shirt",
        price: 55.00,
        category: "T-shirt",
        description: "Official Puma performance t-shirt with dryCELL technology that wicks sweat to keep you dry. Features the iconic Puma logo and comfortable athletic fit.",
        features: [
            "dryCELL Technology",
            "Moisture-Wicking Fabric", 
            "Iconic Puma Branding",
            "Athletic Fit Design",
            "Quick-Dry Material"
        ],
        images: ["product-6.jpg", "product-6.jpg", "product-6.jpg", "product-6.jpg"]
    },
    7: {
        id: 7,
        name: "Active Wear Sports T-Shirt",
        price: 50.00,
        category: "T-shirt", 
        description: "High-performance sports t-shirt designed for intense workouts. Features ventilation panels and stretch fabric for maximum mobility and comfort during exercise.",
        features: [
            "Ventilation Panel Design",
            "4-Way Stretch Fabric",
            "Anti-Odor Technology", 
            "Raglan Sleeves",
            "Athletic Performance Fit"
        ],
        images: ["product-7.jpg", "product-7.jpg", "product-7.jpg", "product-7.jpg"]
    },
    8: {
        id: 8,
        name: "Fashion Sports Watch",
        price: 50.00,
        category: "Watch",
        description: "Stylish sports watch with digital display and multiple sport modes. Features water resistance, stopwatch, and backlight for low-light conditions.",
        features: [
            "Digital Display with Backlight",
            "Water Resistant (50m)",
            "Multiple Sport Modes", 
            "Stopwatch Function",
            "Comfortable Silicone Strap"
        ],
        images: ["product-8.jpg", "product-8.jpg", "product-8.jpg", "product-8.jpg"]
    },
    9: {
        id: 9,
        name: "Smart Fitness Watch",
        price: 50.00,
        category: "Watch", 
        description: "Advanced smart fitness watch with heart rate monitoring, GPS tracking, and smartphone connectivity. Tracks your workouts, sleep, and daily activity.",
        features: [
            "Heart Rate Monitor",
            "GPS Tracking",
            "Smartphone Connectivity", 
            "Sleep Tracking",
            "7-Day Battery Life"
        ],
        images: ["product-9.jpg", "product-9.jpg", "product-9.jpg", "product-9.jpg"]
    },
    10: {
        id: 10,
        name: "Advanced Running Shoes",
        price: 50.00,
        category: "Shoes",
        description: "Next-generation running shoes with responsive cushioning and energy return technology. Designed for serious runners seeking performance and comfort.",
        features: [
            "Responsive Cushioning",
            "Energy Return Technology", 
            "Breathable Knit Upper",
            "Strategic Traction Pattern",
            "Lightweight Construction"
        ],
        images: ["product-10.jpg", "product-10.jpg", "product-10.jpg", "product-10.jpg"]
    },
    11: {
        id: 11,
        name: "Urban Knit Walker",
        price: 50.00,
        category: "Shoe",
        description: "Effortless style meets all-day comfort. These lightweight, slip-on knit sneakers are perfect for navigating the city street with ease and a clean, modern look.",
        features: [
            "Breathable Knit Upper",
            "Effortless Slip-On Design", 
            "Cushioned Rubber Outsole",
            "Minimalist Aesthetic",
            "Comfort-Fit Collar"
        ],
        images: ["product-11.jpg", "product-11.jpg", "product-11.jpg", "product-11.jpg"]
    },
    12: {
        id: 12,
        name: "Training Track Pants",
        price: 50.00,
        category: "Pants",
        description: "Versatile training track pants with tapered fit and elastic cuffs. Made from lightweight, stretchable fabric perfect for workouts or casual wear.",
        features: [
            "Tapered Fit with Elastic Cuffs",
            "Lightweight Stretch Fabric", 
            "Multiple Pockets",
            "Drawstring Waistband",
            "Quick-Dry Material"
        ],
        images: ["product-12.jpg", "product-12.jpg", "product-12.jpg", "product-12.jpg"]
    },
    13: {
        id: 13,
        name: "Smart Band 4",
        price: 79.99,
        category: "Smart Band",
        description: "The Mi Smart Band 4 features a 39.9% larger AMOLED color full-touch display with adjustable brightness. Track your heart rate, monitor your sleep, and stay connected with smartphone notifications. Water-resistant design perfect for swimming and all-day wear.",
        features: [
            "39.9% Larger AMOLED Color Display",
            "Heart Rate Monitoring",
            "Sleep Quality Tracking",
            "Water Resistant (50m)",
            "20-Day Battery Life",
            "Smartphone Notifications",
            "Multiple Sport Modes"
        ],
        images: ["exclusive.png", "exclusive.png", "exclusive.png", "exclusive.png"]
    }
};

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Get product ID from URL
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('product') || 1;
}

// Function to handle image loading with fade effect
function loadImageWithFade(imgElement, src, placeholder) {
    imgElement.onload = function() {
        // Hide the placeholder
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        // Show the image with fade effect
        imgElement.style.display = 'block';
        setTimeout(() => {
            imgElement.style.opacity = '1';
        }, 10);
    };
    
    imgElement.onerror = function() {
        // If image fails to load, hide placeholder and show default
        if (placeholder) {
            placeholder.style.display = 'none';
        }
        imgElement.src = 'images/product-1.jpg';
        imgElement.style.display = 'block';
        imgElement.style.opacity = '1';
    };
    
    // Start loading the image
    imgElement.src = src;
}

// Load product details
function loadProductDetails() {
    const productId = getProductIdFromUrl();
    const product = products[productId];
    
    if (product) {
        // Update page title
        document.title = `${product.name} - RedStore`;
        
        // Update product details IMMEDIATELY (no waiting)
        document.getElementById('breadcrumb').textContent = `Home / ${product.category}`;
        document.getElementById('product-title').textContent = product.name;
        document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
        document.getElementById('product-description').textContent = product.description;
        
        // Update features list
        const featuresList = document.getElementById('features-list');
        featuresList.innerHTML = '';
        product.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Load main product image
        const productImg = document.getElementById('productimg');
        const mainImageLoading = document.getElementById('main-image-loading');
        loadImageWithFade(productImg, `images/${product.images[0]}`, mainImageLoading);
        
        // Load small images
        const smallImages = document.querySelectorAll('.small-img');
        const smallLoadings = document.querySelectorAll('.small-loading');
        
        product.images.forEach((image, index) => {
            if (smallImages[index] && smallLoadings[index]) {
                loadImageWithFade(smallImages[index], `images/${image}`, smallLoadings[index]);
            }
        });
        
        // Handle size select for different product types
        const sizeSelect = document.getElementById('size-select');
        if (sizeSelect) {
            if (product.category === 'Smart Band') {
                sizeSelect.innerHTML = `
                    <option>Select Size</option>
                    <option>Small</option>
                    <option>Medium</option>
                    <option>Large</option>
                `;
            } else if (product.category === 'Shoes') {
                sizeSelect.innerHTML = `
                    <option>Select Size</option>
                    <option>US 7</option>
                    <option>US 8</option>
                    <option>US 9</option>
                    <option>US 10</option>
                    <option>US 11</option>
                `;
            } else {
                sizeSelect.innerHTML = `
                    <option>Select Size</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                `;
            }
        }
        
        // Add color select for Smart Band
        if (product.category === 'Smart Band') {
            const colorSelect = document.createElement('select');
            colorSelect.id = 'color-select';
            colorSelect.innerHTML = `
                <option>Select Color</option>
                <option>Black</option>
                <option>Blue</option>
                <option>Red</option>
            `;
            sizeSelect.insertAdjacentElement('afterend', colorSelect);
        }
        
        // Update add to cart button
        const addToCartBtn = document.getElementById('add-to-cart');
        addToCartBtn.href = `cart.html?add=${productId}`;
        addToCartBtn.onclick = function(e) {
            e.preventDefault();
            addToCart(productId);
        };
    }
}

// Add to cart function
function addToCart(productId) {
    const product = products[productId];
    const quantity = parseInt(document.getElementById('quantity').value) || 1;
    const sizeSelect = document.getElementById('size-select');
    const size = sizeSelect ? sizeSelect.value : 'One Size';
    const colorSelect = document.getElementById('color-select');
    const color = colorSelect ? colorSelect.value : 'Default';
    
    if (size === 'Select Size') {
        alert('Please select a size before adding to cart.');
        return;
    }
    
    if (colorSelect && color === 'Select Color') {
        alert('Please select a color before adding to cart.');
        return;
    }
    
    // Check if product already exists in cart with same size and color
    const existingItem = cart.find(item => 
        item.id === productId && 
        item.size === size && 
        item.color === color
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        const cartItem = {
            id: productId,
            name: product.name,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        };
        
        // Add color for Smart Band
        if (colorSelect) {
            cartItem.color = color;
        }
        
        cart.push(cartItem);
    }
    
    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Show confirmation and redirect
    alert(`${quantity} ${product.name} added to cart!`);
    window.location.href = 'cart.html';
}

// Image gallery functionality
function initImageGallery() {
    const productImg = document.getElementById("productimg");
    const smallImg = document.getElementsByClassName("small-img");

    if (productImg && smallImg.length > 0) {
        for (let i = 0; i < smallImg.length; i++) {
            smallImg[i].onclick = function(){
                productImg.src = smallImg[i].src;
            }
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadProductDetails();
    initImageGallery();
    
    // Initialize image styles
    const productImg = document.getElementById('productimg');
    const smallImages = document.querySelectorAll('.small-img');
    
    if (productImg) {
        productImg.style.opacity = '0';
        productImg.style.transition = 'opacity 0.3s ease';
    }
    
    smallImages.forEach(img => {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
    });
});
