// main.js - CORRECTED VERSION
var MenuItems = document.getElementById("MenuItems");

MenuItems.style.maxHeight = "0px";

function menutoggle(){
    if(MenuItems.style.maxHeight == "0px")
    {
        MenuItems.style.maxHeight = "200px";
    }
    else{
        MenuItems.style.maxHeight = "0px";
    }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", function() {
    // ===== FIXED MOBILE TOUCH SCROLLING =====
    if (window.innerWidth <= 800) {
        const productLinks = document.querySelectorAll('.product-link');
        let isScrolling = false;
        let scrollTimer = null;
        let touchStartY = 0;
        let touchStartX = 0;
        
        productLinks.forEach(link => {
            // Track touch start position
            link.addEventListener('touchstart', function(e) {
                touchStartY = e.touches[0].clientY;
                touchStartX = e.touches[0].clientX;
                isScrolling = false;
                
                if (scrollTimer) {
                    clearTimeout(scrollTimer);
                }
                
                scrollTimer = setTimeout(() => {
                    isScrolling = true;
                }, 100);
            }, { passive: true });
            
            // Track touch move to detect scrolling
            link.addEventListener('touchmove', function(e) {
                const touchY = e.touches[0].clientY;
                const touchX = e.touches[0].clientX;
                const deltaY = Math.abs(touchY - touchStartY);
                const deltaX = Math.abs(touchX - touchStartX);
                
                if (deltaY > 10 || deltaX > 10) {
                    isScrolling = true;
                    if (scrollTimer) {
                        clearTimeout(scrollTimer);
                    }
                }
            }, { passive: true });
            
            // Handle touch end
            link.addEventListener('touchend', function(e) {
                if (scrollTimer) {
                    clearTimeout(scrollTimer);
                }
                
                if (!isScrolling) {
                    const href = this.getAttribute('href');
                    if (href && href !== '#') {
                        this.style.opacity = '0.7';
                        setTimeout(() => {
                            this.style.opacity = '1';
                            window.location.href = href;
                        }, 150);
                    }
                }
                
                setTimeout(() => {
                    isScrolling = false;
                }, 100);
            }, { passive: true });
            
            link.addEventListener('touchcancel', function(e) {
                if (scrollTimer) {
                    clearTimeout(scrollTimer);
                }
                isScrolling = false;
                this.style.opacity = '1';
            }, { passive: true });
        });
        
        // Disable hover effects on mobile
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 800px) {
                *:hover {
                    transform: none !important;
                    box-shadow: none !important;
                }
                
                .col-4:hover {
                    transform: none !important;
                }
                
                .product-link:hover {
                    opacity: 1 !important;
                }
                
                .product-link {
                    -webkit-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                    -webkit-tap-highlight-color: transparent;
                }
                
                .product-link:active {
                    opacity: 1 !important;
                    transition: opacity 0.3s;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // Update cart count on page load
    updateCartCount();
});

// Function to update cart count in navbar
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = document.querySelector('.cart-count');
    
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        if (totalItems > 0) {
            cartCount.textContent = totalItems;
            cartCount.style.display = 'flex';
        } else {
            cartCount.style.display = 'none';
        }
    }
}

// Function to show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}