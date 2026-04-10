// DOM elements
const orderItems = document.getElementById('orderItems');
const subtotalEl = document.getElementById('subtotal');
const finalTotalEl = document.getElementById('finalTotal');
const checkoutForm = document.getElementById('checkoutForm');
const paymentModal = document.getElementById('paymentModal');
const successModal = document.getElementById('successModal');
const orderIdEl = document.getElementById('orderId');
const deliveryDateEl = document.getElementById('deliveryDate');

// Payment method elements
const paymentRadios = document.querySelectorAll('input[name="payment"]');
const cardDetails = document.getElementById('cardDetails');
const upiDetails = document.getElementById('upiDetails');

// Load cart from localStorage (using pharmacyCart)
let cart = JSON.parse(localStorage.getItem('pharmacyCart')) || [];

// Render order summary
function renderOrderSummary() {
    if (cart.length === 0) {
        window.location.href = 'cart.html'; // Redirect if no cart
        return;
    }

    orderItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'order-item';
        itemDiv.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p class="item-meta">${item.meta}</p>
                <p class="item-quantity">Quantity: ${item.quantity}</p>
            </div>
            <div class="item-price">
                <p>₹${item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})} each</p>
                <p class="item-total">₹${itemTotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}</p>
            </div>
        `;
        orderItems.appendChild(itemDiv);
    });

    subtotalEl.textContent = `₹${total.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    finalTotalEl.textContent = `₹${total.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
}

// Payment method handling
paymentRadios.forEach(radio => {
    radio.addEventListener('change', (e) => {
        const value = e.target.value;
        
        // Hide all payment details
        cardDetails.style.display = 'none';
        upiDetails.style.display = 'none';
        
        // Show relevant payment details
        if (value === 'card') {
            cardDetails.style.display = 'block';
        } else if (value === 'upi') {
            upiDetails.style.display = 'block';
        }
    });
});

// Format card number input
const cardNumberInput = document.getElementById('cardNumber');
if (cardNumberInput) {
    cardNumberInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\s/g, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
}

// Format expiry date input
const expiryInput = document.getElementById('expiry');
if (expiryInput) {
    expiryInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        e.target.value = value;
    });
}

// Generate order ID
function generateOrderId() {
    const timestamp = Date.now().toString();
    const random = Math.random().toString(36).substr(2, 5).toUpperCase();
    return `MR${timestamp.slice(-6)}${random}`;
}

// Calculate estimated delivery date
function getEstimatedDelivery() {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    return deliveryDate.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

// Validate form
function validateForm(formData) {
    const errors = [];
    
    if (!formData.fullName.trim()) errors.push('Full name is required');
    if (!formData.phone.trim()) errors.push('Phone number is required');
    if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) errors.push('Valid 10-digit phone number required');
    if (!formData.address.trim()) errors.push('Address is required');
    if (!formData.city.trim()) errors.push('City is required');
    if (!formData.pincode.trim()) errors.push('PIN code is required');
    if (!/^[0-9]{6}$/.test(formData.pincode)) errors.push('Valid 6-digit PIN code required');
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('cardNumber').value.replace(/\s/g, '');
        const expiry = document.getElementById('expiry').value;
        const cvv = document.getElementById('cvv').value;
        
        if (!cardNumber || cardNumber.length < 16) errors.push('Valid card number is required');
        if (!expiry || !/^\d{2}\/\d{2}$/.test(expiry)) errors.push('Valid expiry date is required');
        if (!cvv || cvv.length !== 3) errors.push('Valid CVV is required');
    } else if (paymentMethod === 'upi') {
        const upiId = document.getElementById('upiId').value;
        if (!upiId || !upiId.includes('@')) errors.push('Valid UPI ID is required');
    }
    
    return errors;
}

// Process payment (simulation)
async function processPayment(paymentMethod, orderData) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const isSuccessful = Math.random() > 0.05;
    
    if (!isSuccessful) {
        throw new Error('Payment failed. Please try again.');
    }
    
    return { success: true, transactionId: `TXN${Date.now()}` };
}

// Handle form submission
checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        fullName: document.getElementById('fullName').value,
        phone: document.getElementById('phone').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        pincode: document.getElementById('pincode').value
    };
    
    const errors = validateForm(formData);
    if (errors.length > 0) {
        alert('Please fix the following errors:\n\n' + errors.join('\n'));
        return;
    }
    
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    
    paymentModal.style.display = 'flex';
    
    try {
        const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const paymentResult = await processPayment(paymentMethod, { ...formData, total });
        
        const order = {
            id: generateOrderId(),
            date: new Date().toISOString(),
            items: [...cart],
            total: total,
            status: 'Confirmed',
            paymentMethod: paymentMethod,
            paymentStatus: 'Paid',
            transactionId: paymentResult.transactionId,
            customerInfo: {
                name: formData.fullName,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                pincode: formData.pincode
            },
            estimatedDelivery: getEstimatedDelivery()
        };
        
        let orders = JSON.parse(localStorage.getItem('orders')) || [];
        orders.unshift(order);
        localStorage.setItem('orders', JSON.stringify(orders));
        
        localStorage.setItem('pharmacyCart', JSON.stringify([]));
        
        paymentModal.style.display = 'none';
        orderIdEl.textContent = order.id;
        deliveryDateEl.textContent = order.estimatedDelivery;
        successModal.style.display = 'flex';
        
    } catch (error) {
        paymentModal.style.display = 'none';
        alert('Payment failed: ' + error.message);
    }
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === paymentModal) {
        paymentModal.style.display = 'none';
    }
    if (e.target === successModal) {
        successModal.style.display = 'none';
    }
});

// Initial render
renderOrderSummary();

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}