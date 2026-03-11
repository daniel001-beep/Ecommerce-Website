// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Display cart items with new design
function displayCartItems() {
    const cartItemsContainer = document.getElementById('cart-items');
    const emptyCartMessage = document.getElementById('empty-cart-message');
    const cartContent = document.getElementById('cart-content');
    const itemCount = document.getElementById('item-count');

    // Clear existing items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        if (emptyCartMessage) emptyCartMessage.style.display = 'block';
        if (cartContent) cartContent.style.display = 'none';
        updateCartCount();
        return;
    }

    if (emptyCartMessage) emptyCartMessage.style.display = 'none';
    if (cartContent) cartContent.style.display = 'grid';
    if (itemCount) itemCount.textContent = cart.length;

    // Add each cart item to the container
    cart.forEach((item, index) => {
        const subtotal = item.price * item.quantity;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.setAttribute('data-index', index);
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="images/${item.image}" alt="${item.name}" onerror="this.src='images/product-1.jpg'">
            </div>
            <div class="cart-item-details">
                <h4>${item.name}</h4>
                <div class="cart-item-meta">
                    <span>Size: ${item.size}</span>
                    ${item.color ? `<span>Color: ${item.color}</span>` : ''}
                    <span>Price: $${item.price.toFixed(2)}</span>
                </div>
            </div>
            <div class="cart-item-quantity">
                <button class="quantity-btn decrease" data-index="${index}">-</button>
                <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-index="${index}">
                <button class="quantity-btn increase" data-index="${index}">+</button>
            </div>
            <div class="cart-item-subtotal">$${subtotal.toFixed(2)}</div>
            <div class="cart-item-remove">
                <button class="remove-btn" data-index="${index}" title="Remove item">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        cartItemsContainer.appendChild(cartItem);
    });

    // Update totals
    updateCartTotals();

    // Add event listeners
    addCartEventListeners();
    
    // Update cart count
    updateCartCount();
}

// Update cart totals
function updateCartTotals() {
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    const shipping = subtotal > 100 ? 0 : 10.00;
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;

    // Update display
    document.getElementById('cart-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('shipping-cost').textContent = '$' + shipping.toFixed(2);
    document.getElementById('tax-amount').textContent = '$' + tax.toFixed(2);
    document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
    
    // Update savings badge if free shipping
    const savingsBadge = document.querySelector('.savings-badge');
    if (savingsBadge) {
        if (shipping === 0) {
            savingsBadge.textContent = '🎉 You\'ve unlocked FREE shipping!';
            savingsBadge.style.display = 'block';
        } else {
            const amountNeeded = (100 - subtotal).toFixed(2);
            if (amountNeeded > 0) {
                savingsBadge.textContent = `Add $${amountNeeded} more for FREE shipping!`;
                savingsBadge.style.display = 'block';
            } else {
                savingsBadge.style.display = 'none';
            }
        }
    }
}

// Add event listeners
function addCartEventListeners() {
    // Quantity decrease buttons
    document.querySelectorAll('.quantity-btn.decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                showNotification('Quantity updated');
            }
        });
    });

    // Quantity increase buttons
    document.querySelectorAll('.quantity-btn.increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.getAttribute('data-index'));
            cart[index].quantity++;
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            showNotification('Quantity updated');
        });
    });

    // Quantity input changes
    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            const index = parseInt(this.getAttribute('data-index'));
            const newQuantity = parseInt(this.value);
            
            if (newQuantity < 1) {
                this.value = 1;
                cart[index].quantity = 1;
            } else {
                cart[index].quantity = newQuantity;
            }
            
            localStorage.setItem('cart', JSON.stringify(cart));
            displayCartItems();
            showNotification('Quantity updated');
        });
        
        // Mobile touch optimization
        input.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
    });

    // Remove buttons
    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const index = parseInt(this.getAttribute('data-index'));
            const itemName = cart[index].name;
            
            if (confirm(`Are you sure you want to remove "${itemName}" from your cart?`)) {
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                displayCartItems();
                showNotification('Item removed from cart');
            }
        });
        
        // Mobile touch optimization
        btn.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
    });

    // Clear cart button
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', clearCart);
        
        // Mobile touch optimization
        clearCartBtn.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
    }

    // Checkout button
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                alert('Your cart is empty! Add some items first.');
                return;
            }
            window.location.href = 'checkout.html';
        });
        
        // Mobile touch optimization
        checkoutBtn.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
    }

    // Promo code suggestions
    document.querySelectorAll('.promo-tag').forEach(tag => {
        tag.addEventListener('click', function() {
            const code = this.textContent;
            document.querySelector('.promo-input input').value = code;
            applyPromoCode(code);
        });
        
        // Mobile touch optimization
        tag.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
    });

    // Apply promo button
    const applyPromoBtn = document.querySelector('.apply-promo-btn');
    if (applyPromoBtn) {
        applyPromoBtn.addEventListener('click', function() {
            const promoInput = document.querySelector('.promo-input input');
            const code = promoInput.value.trim();
            if (code) {
                applyPromoCode(code);
                promoInput.value = '';
            }
        });
        
        // Mobile touch optimization
        applyPromoBtn.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
    }
}

// Apply promo code
function applyPromoCode(code) {
    const validPromos = {
        'WELCOME10': 0.10, // 10% off
        'SAVE20': 0.20, // 20% off
        'FREESHIP': 'freeship'
    };
    
    if (validPromos[code.toUpperCase()]) {
        const discount = validPromos[code.toUpperCase()];
        if (discount === 'freeship') {
            showNotification('🎉 Free shipping applied!');
            // You would implement shipping logic here
        } else {
            showNotification(`🎉 ${discount * 100}% discount applied!`);
            // You would implement discount logic here
        }
    } else {
        alert('Invalid promo code. Try WELCOME10, SAVE20, or FREESHIP');
    }
}

// Clear cart function
function clearCart() {
    if (cart.length === 0) {
        alert('Your cart is already empty!');
        return;
    }
    
    if (confirm('Are you sure you want to clear your entire cart? This cannot be undone.')) {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCartItems();
        showNotification('Cart cleared successfully');
    }
}

// Function to update cart count
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.cart-count, #cart-count');
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    cartCountElements.forEach(element => {
        if (totalItems > 0) {
            element.textContent = totalItems;
            element.style.display = 'flex';
        } else {
            element.style.display = 'none';
        }
    });
}

// Function to show notification
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Show with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize cart when page loads
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    
    // Add item to cart from URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const addItem = urlParams.get('add');
    if (addItem && !urlParams.get('added')) {
        // This would handle adding items from product details page
        window.location.href = window.location.pathname + '?added=true';
    }
    
    // Mobile touch optimization for cart page
    if (window.innerWidth <= 800) {
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            item.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            }, { passive: true });
        });
    }
});

// Apply promo code with actual discount calculation
function applyPromoCode(code) {
    const validPromos = {
        'WELCOME10': { type: 'percentage', value: 0.10 }, // 10% off
        'SAVE20': { type: 'percentage', value: 0.20 }, // 20% off
        'FREESHIP': { type: 'shipping', value: 0 }
    };
    
    const promo = validPromos[code.toUpperCase()];
    
    if (!promo) {
        showNotification('Invalid promo code', 'error');
        return false;
    }
    
    // Store active promo in localStorage
    localStorage.setItem('activePromo', JSON.stringify({
        code: code.toUpperCase(),
        ...promo
    }));
    
    // Apply the promo
    applyActivePromo();
    
    showNotification(`🎉 Promo code "${code.toUpperCase()}" applied successfully!`);
    return true;
}

// Apply active promo to cart totals
function applyActivePromo() {
    const activePromo = JSON.parse(localStorage.getItem('activePromo'));
    if (!activePromo) return;
    
    const subtotalElement = document.getElementById('cart-subtotal');
    const shippingElement = document.getElementById('shipping-cost');
    const taxElement = document.getElementById('tax-amount');
    const totalElement = document.getElementById('cart-total');
    
    let subtotal = parseFloat(subtotalElement.textContent.replace('$', ''));
    let shipping = parseFloat(shippingElement.textContent.replace('$', ''));
    let tax = parseFloat(taxElement.textContent.replace('$', ''));
    
    if (activePromo.type === 'percentage') {
        // Calculate discount
        const discount = subtotal * activePromo.value;
        subtotal -= discount;
        
        // Update tax based on new subtotal
        tax = subtotal * 0.10;
        
        // Show discount in savings badge
        const savingsBadge = document.querySelector('.savings-badge');
        if (savingsBadge) {
            savingsBadge.textContent = `🎉 ${activePromo.value * 100}% discount applied! Saved $${discount.toFixed(2)}`;
            savingsBadge.style.display = 'block';
            savingsBadge.style.background = 'linear-gradient(135deg, #ffc107, #ff9800)';
        }
    }
    
    if (activePromo.type === 'shipping') {
        shipping = 0;
        
        const savingsBadge = document.querySelector('.savings-badge');
        if (savingsBadge) {
            savingsBadge.textContent = '🎉 FREE shipping applied!';
            savingsBadge.style.display = 'block';
            savingsBadge.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        }
    }
    
    const total = subtotal + shipping + tax;
    
    // Update display
    subtotalElement.textContent = '$' + subtotal.toFixed(2);
    shippingElement.textContent = '$' + shipping.toFixed(2);
    taxElement.textContent = '$' + tax.toFixed(2);
    totalElement.textContent = '$' + total.toFixed(2);
}

// Update updateCartTotals function to consider active promo
function updateCartTotals() {
    let subtotal = 0;
    
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    let shipping = subtotal > 100 ? 0 : 10.00;
    let tax = subtotal * 0.10;
    let total = subtotal + shipping + tax;
    
    // Apply active promo if exists
    const activePromo = JSON.parse(localStorage.getItem('activePromo'));
    if (activePromo) {
        if (activePromo.type === 'percentage') {
            const discount = subtotal * activePromo.value;
            subtotal -= discount;
            tax = subtotal * 0.10;
            total = subtotal + shipping + tax;
        } else if (activePromo.type === 'shipping') {
            shipping = 0;
            total = subtotal + tax;
        }
    }
    
    // Update display
    document.getElementById('cart-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('shipping-cost').textContent = '$' + shipping.toFixed(2);
    document.getElementById('tax-amount').textContent = '$' + tax.toFixed(2);
    document.getElementById('cart-total').textContent = '$' + total.toFixed(2);
    
    // Update savings badge (only show if no active promo)
    if (!activePromo) {
        const savingsBadge = document.querySelector('.savings-badge');
        if (savingsBadge) {
            if (shipping === 0) {
                savingsBadge.textContent = '🎉 You\'ve unlocked FREE shipping!';
                savingsBadge.style.display = 'block';
            } else {
                const amountNeeded = (100 - subtotal).toFixed(2);
                if (amountNeeded > 0) {
                    savingsBadge.textContent = `Add $${amountNeeded} more for FREE shipping!`;
                    savingsBadge.style.display = 'block';
                } else {
                    savingsBadge.style.display = 'none';
                }
            }
        }
    }
}

// Also update the initialize function to apply active promo on page load
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    
    // Apply active promo if exists
    applyActivePromo();
    
    // ... rest of existing code ...
});