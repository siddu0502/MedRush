// Script for navigation and interactions
document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const getUser = () => JSON.parse(localStorage.getItem('medioxUser') || 'null');
    const setUser = (user) => localStorage.setItem('medioxUser', JSON.stringify(user));
    const clearUser = () => localStorage.removeItem('medioxUser');

    const navData = {
        guest: [
            { text: 'Login', id: 'nav-login', href: '#' },
            { text: 'Signup', id: 'nav-signup', href: '#' },
            { text: 'Home', href: 'index.html' },
            { text: 'Contact', href: 'contact.html' }
        ],
        user: [
            { text: 'Home', href: 'index.html' },
            { text: 'Medicines', href: 'medicines.html' },
            { text: 'Cart', href: 'cart.html', badgeId: 'cart-badge' },
            { text: 'My Orders', href: 'myorders.html' },
            { text: 'Contact', href: 'contact.html' },
            { text: 'Logout', id: 'nav-logout', href: '#' }
        ]
    };

    const renderNav = () => {
        const navList = document.querySelector('.navbar-nav');
        if (!navList) return;

        const user = getUser();
        const items = user ? navData.user : navData.guest;

        navList.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            const a = document.createElement('a');
            a.className = 'nav-link';
            if (item.id) a.id = item.id;
            a.href = item.href || '#';
            a.textContent = item.text;

            if (item.badgeId) {
                const badge = document.createElement('span');
                badge.className = 'badge bg-danger';
                badge.id = item.badgeId;
                badge.textContent = '0';
                a.appendChild(document.createTextNode(' '));
                a.appendChild(badge);
            }

            if (item.href && item.href === currentPage) {
                a.classList.add('active');
                a.setAttribute('aria-current', 'page');
            }

            navList.appendChild(li).appendChild(a);
        });

        updateCartBadge();
    };

    const showAuthPrompt = (mode) => {
        const email = prompt(`${mode} with email`);
        if (!email || !email.trim()) {
            alert('Email is required');
            return;
        }
        const user = { email: email.trim(), name: email.split('@')[0] };
        setUser(user);
        renderNav();
        alert(`${mode} successful. Welcome, ${user.name}!`);
    };

    const navCollapse = document.querySelector('.navbar-collapse');
    if (navCollapse) {
        navCollapse.addEventListener('click', (event) => {
            const target = event.target;
            if (!target.classList.contains('nav-link')) return;

            if (target.id === 'nav-login') {
                event.preventDefault();
                showAuthPrompt('Login');
                return;
            }

            if (target.id === 'nav-signup') {
                event.preventDefault();
                showAuthPrompt('Signup');
                return;
            }

            if (target.id === 'nav-logout') {
                event.preventDefault();
                clearUser();
                renderNav();
                alert('You have been logged out.');
                return;
            }
        });
    }

    const CART_KEY = 'medioxCart';
    const ORDERS_KEY = 'medioxOrders';

    const getCart = () => JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    const saveCart = (cart) => localStorage.setItem(CART_KEY, JSON.stringify(cart));

    const saveOrder = (orderData) => {
        const orders = getOrders();
        const orderId = 'ORD' + Date.now();
        const estimatedDelivery = new Date(Date.now() + 2 * 24 * 60 * 60 * 1000); // 2 days from order
        const order = {
            id: orderId,
            date: new Date().toLocaleString(),
            estimatedDelivery: estimatedDelivery.toLocaleDateString() + ' (est)',
            ...orderData,
            status: 'Processing'
        };
        orders.push(order);
        saveOrders(orders);
        return orderId;
    };

    const updateCartBadge = () => {
        const badge = document.getElementById('cart-badge');
        if (!badge) return;
        const cart = getCart();
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalQty;
    };

    const addToCart = (itemId) => {
        const cart = getCart();
        const existing = cart.find((item) => item.id === itemId);
        if (existing) {
            existing.quantity += 1;
        } else {
            const product = medicineData.find((med) => med.id === itemId);
            if (!product) return;
            cart.push({ id: product.id, name: product.name, price: product.price, quantity: 1 });
        }
        saveCart(cart);
        updateCartBadge();
    };

    const removeFromCart = (itemId) => {
        let cart = getCart();
        cart = cart.filter((item) => item.id !== itemId);
        saveCart(cart);
        updateCartBadge();
        if (currentPage === 'cart.html') {
            renderCartPage();
        }
    };

    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
        updateCartBadge();
    }

    // Doctor contact modal
    const doctorBtn = document.getElementById('talk-doctor-btn');
    const doctorModalOverlay = document.getElementById('doctor-modal-overlay');
    const doctorModalClose = document.getElementById('doctor-modal-close');

    if (doctorBtn && doctorModalOverlay) {
        doctorBtn.addEventListener('click', function() {
            doctorModalOverlay.classList.add('active');
        });
    }

    if (doctorModalClose && doctorModalOverlay) {
        doctorModalClose.addEventListener('click', function() {
            doctorModalOverlay.classList.remove('active');
        });
    }

    if (doctorModalOverlay) {
        doctorModalOverlay.addEventListener('click', function(e) {
            if (e.target === doctorModalOverlay) {
                doctorModalOverlay.classList.remove('active');
            }
        });
    }

    // Scan with camera
    const scanBtn = document.getElementById('scan-btn');
    const scanPreview = document.getElementById('scan-preview');
    const scanVideo = document.getElementById('scan-video');
    const stopScan = document.getElementById('stop-scan');
    let stream = null;

    if (scanBtn && scanPreview && scanVideo) {
        scanBtn.addEventListener('click', async function() {
            try {
                if (scanPreview.classList.contains('hidden')) {
                    stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
                    scanVideo.srcObject = stream;
                    scanPreview.classList.remove('hidden');
                } else {
                    if (stream) {
                        stream.getTracks().forEach(track => track.stop());
                        scanVideo.srcObject = null;
                    }
                    scanPreview.classList.add('hidden');
                }
            } catch (err) {
                alert('Camera access denied or not available.');
            }
        });
    }

    if (stopScan && scanPreview) {
        stopScan.addEventListener('click', function() {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                scanVideo.srcObject = null;
            }
            scanPreview.classList.add('hidden');
        });
    }

    // Medicine data shared across pages
    const medicineNames = [
        'Paracetamol 500mg', 'Ibuprofen 400mg', 'Amoxicillin 500mg', 'Metformin 500mg', 'Amlodipine 5mg',
        'Atorvastatin 10mg', 'Omeprazole 20mg', 'Ciprofloxacin 500mg', 'Levothyroxine 50mcg', 'Simvastatin 20mg',
        'Metoprolol 50mg', 'Lisinopril 10mg', 'Losartan 50mg', 'Hydrochlorothiazide 25mg', 'Cetirizine 10mg',
        'Salbutamol 100mcg', 'Fluoxetine 20mg', 'Tramadol 50mg', 'Prednisone 10mg', 'Azithromycin 250mg',
        'Clopidogrel 75mg', 'Ranitidine 150mg', 'Warfarin 5mg', 'Doxycycline 100mg', 'Levocetirizine 5mg',
        'Naproxen 250mg', 'Furosemide 40mg', 'Spironolactone 25mg', 'Esomeprazole 40mg'
    ];

    const medicineData = Array.from({ length: 300 }, (_, index) => {
        const id = index + 1;
        const baseName = medicineNames[index % medicineNames.length];
        const price = Number((40 + (id % 30) * 1.5 + (id % 5)).toFixed(2));
        return {
            id,
            name: `${baseName} (Batch ${Math.ceil(id / 30)})`,
            usage: `Take one tablet orally twice a day after meals for general management of symptoms.`,
            purpose: `Used for ${baseName.split(' ')[0].toLowerCase()} related disorders and symptom relief.`,
            composition: `Contains active component ${baseName}, plus microcrystalline cellulose, magnesium stearate, and colloidal silicon dioxide.`,                
            formula: `Empirical formula approximated for ${baseName}: C${12 + (id % 10)}H${14 + (id % 6)}N${1 + (id % 4)}O${2 + (id % 6)}`,
            price
        };
    });

    const renderMedicines = (items, resultsContainer) => {
        resultsContainer.innerHTML = items.length ? items.map(med => `
            <div class="medicine-card">
                <h4>${med.name}</h4>
                <p><strong>Usage:</strong> ${med.usage}</p>
                <p><strong>Purpose:</strong> ${med.purpose}</p>
                <p><strong>Composition:</strong> ${med.composition}</p>
                <p><strong>Formula:</strong> ${med.formula}</p>
                <p><strong>Price:</strong> ₹${med.price.toFixed(2)}</p>
                <button class="btn btn-outline-warning btn-sm add-to-cart-btn" data-id="${med.id}">
                    Add to cart
                </button>
            </div>
        `).join('') : '<p>No matching medicines found.</p>';

        const addToCartButtons = resultsContainer.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const id = Number(button.dataset.id);
                addToCart(id);
            });
        });
    };

    const runSearch = (query) => {
        const normalized = query.trim().toLowerCase();
        if (!normalized) {
            return [];
        }
        return medicineData.filter(med =>
            med.name.toLowerCase().includes(normalized) ||
            med.usage.toLowerCase().includes(normalized) ||
            med.purpose.toLowerCase().includes(normalized) ||
            med.composition.toLowerCase().includes(normalized) ||
            med.formula.toLowerCase().includes(normalized)
        );
    };

    const setupMedicineSearch = ({ searchInputId, resultsId, searchButtonId = null, live = false, showInitial = true }) => {
        const searchInput = document.getElementById(searchInputId);
        const resultsArea = document.getElementById(resultsId);
        const searchButton = searchButtonId ? document.getElementById(searchButtonId) : null;

        if (!searchInput || !resultsArea) return;

        if (showInitial) {
            renderMedicines(medicineData, resultsArea);
        } else {
            resultsArea.innerHTML = '<p>Search by medicine name to display results.</p>';
        }

        const performSearch = () => {
            const query = searchInput.value;
            if (!query.trim()) {
                resultsArea.innerHTML = '<p>Please enter a medicine keyword and click Search.</p>';
                return;
            }
            const filtered = runSearch(query);
            renderMedicines(filtered, resultsArea);
        };

        if (live) {
            searchInput.addEventListener('input', performSearch);
        }

        if (searchButton) {
            searchButton.addEventListener('click', performSearch);
        }

        searchInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    };

    if (currentPage === 'medicines.html') {
        setupMedicineSearch({ searchInputId: 'med-search', resultsId: 'medicine-results', live: true, showInitial: true });
    }

    if (currentPage === 'index.html') {
        setupMedicineSearch({ searchInputId: 'index-med-search', resultsId: 'index-medicine-results', searchButtonId: 'index-med-search-btn', live: false, showInitial: false });
    }

    const formatCurrency = (value) => '₹' + value.toFixed(2);

    const renderCartPage = () => {
        const cartContent = document.getElementById('cart-content');
        if (!cartContent) return;
        const cartItems = getCart();

        if (!cartItems.length) {
            cartContent.innerHTML = '<div class="alert alert-info">Your cart is empty. Please add medicines from the catalog.</div>';
            return;
        }

        const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

        cartContent.innerHTML = `
            <div class="table-responsive mb-4">
                <table class="table table-bordered">
                    <thead class="table-light">
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${cartItems.map(item => `
                            <tr>
                                <td>${item.name}</td>
                                <td>${formatCurrency(item.price)}</td>
                                <td>${item.quantity}</td>
                                <td>${formatCurrency(item.price * item.quantity)}</td>
                                <td><button class="btn btn-sm btn-outline-danger remove-from-cart" data-id="${item.id}">Remove</button></td>
                            </tr>
                        `).join('')}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th colspan="3" class="text-end">Total</th>
                            <th colspan="2">${formatCurrency(totalAmount)}</th>
                        </tr>
                    </tfoot>
                </table>
            </div>

            <h3>Checkout</h3>
            <form id="checkout-form" class="row g-3">
                <div class="col-md-6">
                    <label for="name" class="form-label">Full Name</label>
                    <input type="text" id="name" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label for="email" class="form-label">Email</label>
                    <input type="email" id="email" class="form-control" required>
                </div>
                <div class="col-md-6">
                    <label for="phone" class="form-label">Phone</label>
                    <input type="tel" id="phone" class="form-control" required>
                </div>
                <div class="col-12">
                    <label for="address" class="form-label">Address</label>
                    <textarea id="address" class="form-control" rows="3" required></textarea>
                </div>

                <div class="col-12">
                    <p class="fw-bold">Payment Method</p>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="paymentCard" value="Card" checked>
                        <label class="form-check-label" for="paymentCard">Card</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="paymentUpi" value="UPI">
                        <label class="form-check-label" for="paymentUpi">UPI (Google Pay, PhonePe, Paytm)</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="radio" name="paymentMethod" id="paymentCod" value="Cash on Delivery">
                        <label class="form-check-label" for="paymentCod">Cash on Delivery</label>
                    </div>
                </div>

                <div class="col-12">
                    <button type="submit" class="btn btn-primary">Submit Order</button>
                </div>
            </form>
            <div id="checkout-message" class="mt-3"></div>
        `;

        const removeButtons = cartContent.querySelectorAll('.remove-from-cart');
        removeButtons.forEach(button => {
            button.addEventListener('click', () => {
                const itemId = Number(button.dataset.id);
                removeFromCart(itemId);
            });
        });

        const checkoutForm = document.getElementById('checkout-form');
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const address = document.getElementById('address').value.trim();
            const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;

            if (!name || !email || !phone || !address) {
                document.getElementById('checkout-message').innerHTML = '<div class="alert alert-warning">Please fill in all details.</div>';
                return;
            }

            const cart = getCart();
            const orderData = {
                customer: { name, email, phone, address },
                items: cart,
                totalAmount: totalAmount,
                paymentMethod: paymentMethod
            };
            const orderId = saveOrder(orderData);

            saveCart([]);
            updateCartBadge();
            renderCartPage();

            document.getElementById('checkout-message').innerHTML = `
                <div class="alert alert-success">
                    Thank you, ${name}! Your order has been placed successfully.<br>
                    Order ID: ${orderId}<br>
                    Total amount: ${formatCurrency(totalAmount)}<br>
                    Payment method: ${paymentMethod}
                </div>
            `;
        });
    };

    const renderOrdersPage = () => {
        const ordersContainer = document.getElementById('orders-container');
        if (!ordersContainer) return;
        const orders = getOrders();

        if (!orders.length) {
            ordersContainer.innerHTML = '<div class="alert alert-info">You have no orders yet. Start shopping to place your first order.</div>';
            return;
        }

        ordersContainer.innerHTML = orders.map(order => `
            <div class="card mb-4">
                <div class="card-header bg-light">
                    <div class="row">
                        <div class="col-md-6">
                            <strong>Order ID: ${order.id}</strong>
                        </div>
                        <div class="col-md-6 text-end">
                            <span class="badge bg-${order.status === 'Processing' ? 'warning' : 'success'}">${order.status}</span>
                        </div>
                    </div>
                    <div class="row mt-2">
                        <div class="col-md-6">
                            <small class="text-muted">Date: ${order.date}</small>
                        </div>
                        <div class="col-md-6 text-end">
                            <small class="text-muted">Payment: ${order.paymentMethod}</small>
                        </div>
                    </div>
                    <div class="row mt-1">
                        <div class="col-md-12">
                            <small class="text-muted">Estimated Delivery: ${order.estimatedDelivery}</small>
                        </div>
                    </div>
                </div>
                <div class="card-body">
                    <div class="row mb-3">
                        <div class="col-md-6">
                            <h6>Customer Details</h6>
                            <p class="mb-1"><strong>${order.customer.name}</strong></p>
                            <p class="mb-1">${order.customer.email}</p>
                            <p class="mb-1">${order.customer.phone}</p>
                            <p class="mb-0">${order.customer.address}</p>
                        </div>
                        <div class="col-md-6">
                            <h6>Order Info</h6>
                            <p class="mb-1"><strong>Status:</strong> ${order.status}</p>
                            <p class="mb-1"><strong>Estimated Delivery:</strong> ${order.estimatedDelivery}</p>
                            <p class="mb-1"><strong>Total:</strong> ${formatCurrency(order.totalAmount)}</p>
                            <p class="mb-0"><strong>Payment:</strong> ${order.paymentMethod}</p>
                        </div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-12">
                            <h6>Order Items</h6>
                            <div class="table-responsive">
                                <table class="table table-sm">
                                    <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${order.items.map(item => `
                                            <tr>
                                                <td>${item.name}</td>
                                                <td>${item.quantity}</td>
                                                <td>${formatCurrency(item.price)}</td>
                                                <td>${formatCurrency(item.price * item.quantity)}</td>
                                            </tr>
                                        `).join('')}
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <th colspan="3" class="text-end">Total</th>
                                            <th>${formatCurrency(order.totalAmount)}</th>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    };

    renderNav();

    if (currentPage === 'cart.html') {
        renderCartPage();
    }

    if (currentPage === 'myorders.html') {
        renderOrdersPage();
    }

    // Smooth scrolling for anchor links (if any)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});