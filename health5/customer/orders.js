// DOM elements
const ordersContainer = document.getElementById('ordersContainer');

// Load orders from localStorage
let orders = JSON.parse(localStorage.getItem('orders')) || [];

// Get status color
function getStatusColor(status) {
    switch(status.toLowerCase()) {
        case 'confirmed': return '#10b981';
        case 'processing': return '#f59e0b';
        case 'shipped': return '#3b82f6';
        case 'delivered': return '#10b981';
        case 'cancelled': return '#ef4444';
        default: return '#6b7280';
    }
}

// Get payment method display
function getPaymentMethod(method) {
    switch(method) {
        case 'cod': return 'Cash on Delivery';
        case 'card': return 'Credit/Debit Card';
        case 'upi': return 'UPI Payment';
        default: return method;
    }
}

// Render orders
function renderOrders() {
    if (orders.length === 0) {
        ordersContainer.innerHTML = `
            <div class="no-orders">
                <i class="fas fa-shopping-bag"></i>
                <h2>No orders yet</h2>
                <p>You haven't placed any orders. Start shopping!</p>
                <a href="index.html" class="shop-now">Shop Now</a>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = '';
    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-card';
        
        const orderDate = new Date(order.date);
        const formattedDate = orderDate.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        orderDiv.innerHTML = `
            <div class="order-header">
                <div class="order-info">
                    <div class="order-id">Order #${order.id}</div>
                    <div class="order-date">${formattedDate}</div>
                    <div class="payment-method">${getPaymentMethod(order.paymentMethod)}</div>
                </div>
                <div class="order-status" style="color: ${getStatusColor(order.status)}; border-color: ${getStatusColor(order.status)};">
                    ${order.status}
                </div>
            </div>
            
            <div class="customer-info">
                <h4>Delivery Address</h4>
                <p>${order.customerInfo.name}</p>
                <p>${order.customerInfo.address}, ${order.customerInfo.city} - ${order.customerInfo.pincode}</p>
                <p>📱 ${order.customerInfo.phone}</p>
            </div>
            
            <div class="order-items">
                <h4>Order Items</h4>
                ${order.items.map(item => `
                    <div class="order-item">
                        <div class="item-details">
                            <span class="item-name">${item.name}</span>
                            <span class="item-meta">${item.meta}</span>
                            <span class="item-quantity">Qty: ${item.quantity}</span>
                        </div>
                        <div class="item-price">
                            <span>₹${item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})} each</span>
                            <span class="item-total">₹${(item.price * item.quantity).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="order-footer">
                <div class="order-summary">
                    <div class="summary-row">
                        <span>Subtotal (${order.items.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                        <span>₹${order.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                    </div>
                    <div class="summary-row">
                        <span>Shipping:</span>
                        <span style="color: var(--success-color);">FREE</span>
                    </div>
                    <div class="summary-row total-row">
                        <span>Total:</span>
                        <span>₹${order.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                    </div>
                </div>
                
                <div class="order-actions">
                    ${order.estimatedDelivery ? `
                        <div class="delivery-info">
                            <i class="fas fa-truck"></i>
                            <span>Estimated Delivery: ${order.estimatedDelivery}</span>
                        </div>
                    ` : ''}
                    ${order.transactionId ? `
                        <div class="transaction-info">
                            <i class="fas fa-receipt"></i>
                            <span>Transaction ID: ${order.transactionId}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
        ordersContainer.appendChild(orderDiv);
    });
}

// Simulate order status updates (for demo purposes)
function updateOrderStatuses() {
    const statusFlow = ['Confirmed', 'Processing', 'Shipped', 'Delivered'];
    
    orders.forEach((order, index) => {
        const currentStatusIndex = statusFlow.indexOf(order.status);
        if (currentStatusIndex < statusFlow.length - 1) {
            // Random chance to update status (for demo)
            if (Math.random() > 0.7) {
                order.status = statusFlow[currentStatusIndex + 1];
            }
        }
    });
    
    localStorage.setItem('orders', JSON.stringify(orders));
    renderOrders();
}

// Initial render
renderOrders();

// Update statuses every 30 seconds (for demo)
setInterval(updateOrderStatuses, 30000);

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// User login button
const userBtn = document.getElementById('userBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');

if (userBtn && loginModal) {
    userBtn.addEventListener('click', () => {
        loginModal.classList.add('active');
    });
}

if (closeModal && loginModal) {
    closeModal.addEventListener('click', () => {
        loginModal.classList.remove('active');
    });
}

// Talk button
const talkButton = document.getElementById('talkButton');
if (talkButton) {
    talkButton.addEventListener('click', () => {
        alert('Hi! How can we help you today?');
    });
}