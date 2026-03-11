
// Product sorting functionality
document.addEventListener('DOMContentLoaded', function() {
    const sortSelect = document.querySelector('select');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortMethod = this.value;
        sortProducts(sortMethod);
    });
});

function sortProducts(method) {
    const productContainer = document.querySelector('.small-container .row:nth-of-type(2)');
    if (!productContainer) return;
    
    const productRows = productContainer.querySelectorAll('.row');
    if (!productRows.length) return;
    
    // For each row, collect all products
    let allProducts = [];
    
    productRows.forEach(row => {
        const products = row.querySelectorAll('.col-4');
        products.forEach(product => {
            allProducts.push({
                element: product,
                price: parseFloat(product.querySelector('p').textContent.replace('$', '')),
                name: product.querySelector('h4').textContent,
                rating: calculateRating(product.querySelector('.rating'))
            });
        });
    });
    
    // Sort based on method
    switch(method) {
        case 'Sort by Price':
            allProducts.sort((a, b) => a.price - b.price);
            break;
        case 'Sort by Popularity':
            // For demo, sort by rating (higher first)
            allProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'Sort by Rating':
            allProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'Sort by Sales':
            // For demo, sort by price (higher first as proxy for sales)
            allProducts.sort((a, b) => b.price - a.price);
            break;
        default:
            // Default sorting (original order)
            return;
    }
    
    // Clear container
    productRows.forEach(row => {
        row.innerHTML = '';
    });
    
    // Re-add sorted products
    const firstRow = productRows[0];
    const secondRow = productRows[1] || firstRow;
    const thirdRow = productRows[2] || firstRow;
    
    allProducts.forEach((product, index) => {
        let targetRow;
        
        if (index < 4) targetRow = firstRow;
        else if (index < 8) targetRow = secondRow;
        else targetRow = thirdRow;
        
        targetRow.appendChild(product.element);
    });
    
    // Show notification
    showNotification(`Products sorted by ${method}`);
}

function calculateRating(ratingElement) {
    if (!ratingElement) return 0;
    
    const stars = ratingElement.querySelectorAll('i');
    let rating = 0;
    
    stars.forEach(star => {
        if (star.classList.contains('fa-star')) {
            rating += 1;
        } else if (star.classList.contains('fa-star-half')) {
            rating += 0.5;
        }
    });
    
    return rating;
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <i class="fas fa-sort"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}
