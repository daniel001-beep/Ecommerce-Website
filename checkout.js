
// Checkout functionality
document.addEventListener('DOMContentLoaded', function() {
    // Load cart items and display summary
    loadOrderSummary();
    
    // Update cart count
    updateCartCount();
    
    // Payment method toggle
    document.getElementById('paypal').addEventListener('change', function() {
        document.getElementById('card-details').style.display = 'none';
    });
    
    document.getElementById('card').addEventListener('change', function() {
        document.getElementById('card-details').style.display = 'block';
    });
    
    // Card number formatting
    document.getElementById('cardNumber').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formatted = value.match(/.{1,4}/g);
        if (formatted) {
            e.target.value = formatted.join(' ');
        }
    });
    
    // Expiry date formatting
    document.getElementById('expiry').addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        if (value.length >= 2) {
            e.target.value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
    });
    
    // CVV formatting
    document.getElementById('cvv').addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/[^0-9]/gi, '');
    });
    
    // Place order button
    document.querySelector('.place-order-btn').addEventListener('click', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            processOrder();
        }
    });
    
    // Mobile touch optimization
    if (window.innerWidth <= 800) {
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            input.addEventListener('touchstart', function(e) {
                e.stopPropagation();
            }, { passive: true });
        });
    }
});

function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const checkoutItems = document.getElementById('checkout-items');
    
    if (cart.length === 0) {
        checkoutItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        updateSummaryTotals(0);
        return;
    }
    
    let itemsHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;
        
        itemsHTML += `
            <div class="checkout-item">
                <div class="checkout-item-info">
                    <strong>${item.name}</strong>
                    <small>Size: ${item.size} | Qty: ${item.quantity}</small>
                </div>
                <div class="checkout-item-price">$${itemTotal.toFixed(2)}</div>
            </div>
        `;
    });
    
    checkoutItems.innerHTML = itemsHTML;
    updateSummaryTotals(subtotal);
}

function updateSummaryTotals(subtotal) {
    const shipping = subtotal > 100 ? 0 : 10.00;
    const tax = subtotal * 0.10;
    const total = subtotal + shipping + tax;
    
    document.getElementById('summary-subtotal').textContent = '$' + subtotal.toFixed(2);
    document.getElementById('summary-shipping').textContent = '$' + shipping.toFixed(2);
    document.getElementById('summary-tax').textContent = '$' + tax.toFixed(2);
    document.getElementById('summary-total').textContent = '$' + total.toFixed(2);
}

function validateForm() {
    const requiredFields = ['email', 'firstName', 'lastName', 'address', 'city', 'zip'];
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (!field.value.trim()) {
            field.style.borderColor = '#ff523b';
            isValid = false;
        } else {
            field.style.borderColor = '#ddd';
        }
    });
    
    // Validate email format
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.style.borderColor = '#ff523b';
        isValid = false;
    }
    
    // Check terms agreement
    const terms = document.getElementById('terms');
    if (!terms.checked) {
        alert('Please agree to the Terms & Conditions');
        isValid = false;
    }
    
    if (!isValid) {
        showNotification('Please fill in all required fields correctly', 'error');
    }
    
    return isValid;
}

function processOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    
    // Show loading state
    const btn = document.querySelector('.place-order-btn');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
    btn.disabled = true;
    
    // Simulate order processing
    setTimeout(() => {
        // Clear cart
        localStorage.removeItem('cart');
        
        // Show success message
        showNotification('Order placed successfully! Thank you for your purchase.', 'success');
        
        // Redirect to confirmation (you would create order-confirmation.html)
        setTimeout(() => {
            window.location.href = 'index.html?order=success';
        }, 2000);
        
        // Reset button
        btn.innerHTML = originalText;
        btn.disabled = false;
    }, 2000);
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.backgroundColor = type === 'success' ? '#28a745' : '#dc3545';
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    
    if (cartCountElement) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCountElement.textContent = totalItems;
        cartCountElement.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}
