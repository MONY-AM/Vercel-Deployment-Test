
// Initialize cart from localStorage or create an empty array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Function to update the cart badge
const updateCartBadge = () => {
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cart.length;
    }
};
// Function to filter products by price
const filterProducts = () => {
    const filterValue = document.getElementById('filter').value;
    const productItems = document.querySelectorAll('.product-item');

    productItems.forEach(item => {
        const price = parseFloat(item.querySelector('.card-text').textContent.replace('$', ''));
        if (filterValue === 'all') {
            item.style.display = 'block'; // Show all products
        } else if (filterValue === 'low' && price <= 50) {
            item.style.display = 'block'; // Show low-priced products
        } else if (filterValue === 'medium' && price > 50 && price <= 100) {
            item.style.display = 'block'; // Show medium-priced products
        } else if (filterValue === 'high' && price > 100) {
            item.style.display = 'block'; // Show high-priced products
        } else {
            item.style.display = 'none'; // Hide products that don't match
        }
    });
};


// Function to render the cart items in the sidebar
const renderCartItems = () => {
    const cartItemsList = document.getElementById('cart-items-list');
    let total = 0;

    if (cartItemsList) {
        cartItemsList.innerHTML = ''; // Clear existing items

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item', 'd-flex', 'align-items-center', 'mb-2');
            cartItem.innerHTML = `
                <button class="btn btn-sm btn-danger remove-item me-2"><i class="bi bi-trash"></i></button>
                <span class="me-auto">${item.name} (x${item.quantity})</span>
                <button class="btn btn-sm btn-secondary decrease-quantity me-2">-</button>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="btn btn-sm btn-secondary increase-quantity ms-2">+</button>
            `;
            cartItemsList.appendChild(cartItem);

            total += item.price * item.quantity;

            // Event listeners for item actions
            cartItem.querySelector('.remove-item').addEventListener('click', () => removeItem(item));
            cartItem.querySelector('.increase-quantity').addEventListener('click', () => changeQuantity(item, 1));
            cartItem.querySelector('.decrease-quantity').addEventListener('click', () => changeQuantity(item, -1));
        });
       
    }
};

// Function to update cart count, localStorage, and re-render items
const updateCartCount = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartBadge();
    renderCartItems();
};

// Function to remove an item from the cart
const removeItem = (item) => {
    cart = cart.filter(cartItem => cartItem.name !== item.name);
    updateCartCount();
};

// Function to change item quantity
const changeQuantity = (item, amount) => {
    const cartItem = cart.find(cartItem => cartItem.name === item.name);
    if (cartItem) {
        cartItem.quantity += amount;
        if (cartItem.quantity <= 0) {
            removeItem(item); // Remove if quantity reaches 0
        } else {
            updateCartCount();
        }
    }
};

// Event listeners for "Add to Cart" buttons
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        const product = {
            name: button.getAttribute('data-product'),
            price: parseFloat(button.getAttribute('data-price')),
            quantity: 1
        };

const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        updateCartCount();
    });
});
const buyNowButtons = document.querySelectorAll('.buy-now');
buyNowButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        event.preventDefault();

        const product = {
            name: button.getAttribute('data-product'),
            price: parseFloat(button.getAttribute('data-price')),
            quantity: 1
        };

        const existingProduct = cart.find(item => item.name === product.name);
        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        updateCartCount();
        
        // Open the cart sidebar after adding to cart
        cartSidebar.classList.add('open');
    });
});


// Sidebar toggle functionality
const cartButton = document.getElementById('cart-Button');
const cartSidebar = document.getElementById('cart-sidebar');
const closeCartButton = document.getElementById('close-cart');

if (cartButton) {
    cartButton.addEventListener('click', () => {
        cartSidebar.classList.add('open');
    });
}

if (closeCartButton) {
    closeCartButton.addEventListener('click', () => {
        cartSidebar.classList.remove('open');
    });
}

// Populate order summary on the checkout page
const populateOrderSummary = () => {
    const orderSummary = document.getElementById('order-summary');
    const totalAmount = document.getElementById('total-amount');
    let total = 0;

    if (orderSummary && totalAmount) {
        orderSummary.innerHTML = ''; // Clear existing content

        if (cart.length > 0) {
            cart.forEach(item => {
                const itemRow = document.createElement('div');
                itemRow.classList.add('d-flex', 'justify-content-between', 'mb-2');
                itemRow.innerHTML = <span>${item.name} (x${item.quantity})</span>;
                orderSummary.appendChild(itemRow);

                total += item.price * item.quantity;
            });
        } else {
            orderSummary.innerHTML = '<p>Your cart is empty.</p>';
        }

    }
};

// Handle checkout form submission
const handleCheckoutForm = () => {
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const order = {
                id: Date.now(),
                items: cart,
                total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                address: document.getElementById('address').value,
                paymentMethod: document.getElementById('payment-method').value,
                date: new Date().toLocaleString(),
            };

            let orders = JSON.parse(localStorage.getItem('orders')) || [];
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));

            alert('Order placed successfully!');
            localStorage.removeItem('cart');
            window.location.href = 'index1.html';
        });
    }
};

// Proceed to Checkout button
const proceedToCheckoutButton = document.getElementById('proceed-to-checkout');
if (proceedToCheckoutButton) {
    proceedToCheckoutButton.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });
}

// Initialize all necessary scripts
const initializeScripts = () => {
    updateCartBadge();
    renderCartItems();
    handleCheckoutForm();
    populateOrderSummary();
};
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeScripts);
// Event listener for the filter dropdown
document.getElementById('filter').addEventListener('change', filterProducts);