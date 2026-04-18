// DOM elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const cartItems = document.getElementById('cartItems');
const cartTotal = document.getElementById('cartTotal');
const checkoutBtn = document.getElementById('checkoutBtn');

// Load cart from localStorage (using pharmacyCart)
let cart = JSON.parse(localStorage.getItem('pharmacyCart')) || [];

// Render cart
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Add some medicines to get started!</p>
                <a href="medicine.html" class="continue-shopping">Continue Shopping</a>
            </div>
        `;
        cartTotal.innerHTML = '';
        checkoutBtn.style.display = 'none';
        return;
    }

    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'cart-item';
        itemDiv.innerHTML = `
            <div class="cart-item-info">
                <div class="cart-item-icon">
                    <svg viewBox="0 0 24 24" width="40" height="40">
                        ${getIconForType(item.type)}
                    </svg>
                </div>
                <div>
                    <h3>${item.name}</h3>
                    <div class="cart-item-meta">${item.meta}</div>
                    <div class="cart-item-price">₹${item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})} each</div>
                </div>
            </div>
            <div class="quantity-controls">
                <div class="quantity">
                    <button class="quantity-btn" data-index="${index}" data-action="decrease"><i class="fas fa-minus"></i></button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn" data-index="${index}" data-action="increase"><i class="fas fa-plus"></i></button>
                </div>
                <div class="item-total">₹${itemTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>
                <button class="remove-btn" data-index="${index}"><i class="fas fa-trash"></i> Remove</button>
            </div>
        `;
        cartItems.appendChild(itemDiv);
    });

    cartTotal.innerHTML = `
        <div class="total-breakdown">
            <span>Subtotal (${cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
            <span>₹${total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
        </div>
        <div class="total-breakdown">
            <span>Shipping:</span>
            <span style="color: var(--success-color);">FREE</span>
        </div>
        <div class="total-final">
            <span>Total:</span>
            <span>₹${total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
        </div>
    `;
    checkoutBtn.style.display = 'block';
}

// Helper function to get SVG icon based on type
function getIconForType(type) {
    const icons = {
        vial: `<path d="M19 3h-4.18C14.4 1.84 13.3 1 12 1s-2.4.84-2.82 2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm7 16H5V5h1.18C6.6 6.16 7.7 7 9 7h6c1.3 0 2.4-.84 2.82-2H19v14z"></path><path d="M9 9h6v2H9z"></path>`,
        syringe: `<path d="M19.1 4.9C15.2 1 8.8 1 4.9 4.9S1 15.2 4.9 19.1s8.9 3.9 12.8 0L21.6 15l-1.4-1.4-3.9 3.9c-2.3 2.3-6.1 2.3-8.5 0s-2.3-6.1 0-8.5C9.2 7.7 11 7.1 13 7.1V3h2v4.1c.3 0 .6.1.9.1l2.5-2.5 1.4 1.4-2.5 2.5c.6.9 1 1.9 1.3 3L22 13v-2l-1.9-.3zM13 15c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"></path>`,
        capsule: `<path d="M17.75 7.94l-5.6-3.8c-.5-.33-1.1-.4-1.68-.26-.58.14-1.1.5-1.46.96l-5.6 8.35c-.75 1.12-.53 2.65.48 3.4.49.37 1.08.55 1.67.55.67 0 1.32-.27 1.8-.75l5.6-8.35c.75-1.12.53-2.65-.48-3.4zm-1.06 1.06l-5.6 8.35c-.24.36-.67.49-1.03.24-.36-.24-.49-.67-.24-1.03l5.6-8.35c.24-.36.67-.49 1.03-.24.36.25.49.68.24 1.03z"></path><path d="M18.9 17.2c-.67 0-1.32-.27-1.8-.75l-1.28-1.9-4.24 2.84c-.5.33-1.1.4-1.68-.26-.58.14-1.1.5-1.46.96l-1.4 2.08c-.75 1.12.53 2.65.48 3.4.49.37 1.08.55 1.67.55.67 0 1.32-.27 1.8-.75l1.4-2.08c.36-.54.96-.86 1.6-.86.13 0 .26.02.39.05l4.24-2.84c.64-.42.86-1.28.5-1.95-.3-.55-.88-.89-1.5-.89z"></path>`
    };
    return icons[type] || icons.capsule;
}

// Initial render
renderCart();

// Event listeners
cartItems.addEventListener('click', (e) => {
    const index = e.target.closest('[data-index]')?.dataset.index;
    if (index === undefined) return;
    
    if (e.target.classList.contains('quantity-btn') || e.target.closest('.quantity-btn')) {
        const btn = e.target.classList.contains('quantity-btn') ? e.target : e.target.closest('.quantity-btn');
        const action = btn.dataset.action;
        if (action === 'increase') {
            cart[index].quantity += 1;
        } else if (action === 'decrease' && cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        }
        localStorage.setItem('pharmacyCart', JSON.stringify(cart));
        renderCart();
    } else if (e.target.classList.contains('remove-btn') || e.target.closest('.remove-btn')) {
        cart.splice(index, 1);
        localStorage.setItem('pharmacyCart', JSON.stringify(cart));
        renderCart();
    }
});

checkoutBtn.addEventListener('click', () => {
    window.location.href = 'checkout.html';
});

// Hamburger menu
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}