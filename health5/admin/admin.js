const ordersContainer = document.getElementById('ordersContainer');
const ordersTotalEl = document.getElementById('ordersTotal');
const availableMedicinesEl = document.getElementById('availableMedicines');
const medicineCatalogEl = document.getElementById('medicineCatalog');
const medicineSearchInput = document.getElementById('adminMedicineSearch');
const medicineSearchBtn = document.getElementById('adminMedicineSearchBtn');
const saveMedicineChangesBtn = document.getElementById('saveMedicineChanges');

const MEDICINE_STORAGE_KEY = 'medicineCatalog';
const ORDER_STORAGE_KEY = 'orders';
const STATUS_OPTIONS = ['Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
let adminMedicines = [];
const adminPage = document.body?.dataset?.adminPage || 'dashboard';

function getDefaultMedicines() {
    return [
        { id: 1, name: 'Avastin 100mg Injection', type: 'vial', meta: 'vial of 1 Injection', manufacturer: 'Roche Products India', composition: 'Bevacizumab (100mg)', price: 33863, isAvailable: true },
        { id: 2, name: 'Actorise 40 Injection', type: 'syringe', meta: 'prefilled syringe of 0.4 ml', manufacturer: 'Cipla Ltd', composition: 'Darbepoetin alfa (40mcg)', price: 2745.19, isAvailable: false },
        { id: 5, name: 'Azel 80 Capsule', type: 'capsule', meta: 'strip of 14 capsules', manufacturer: "Dr Reddy's Labs", composition: 'Enzalutamide (80mg)', price: 8156.25, isAvailable: true },
        { id: 9, name: 'Azacytin Injection', type: 'vial', meta: 'vial of 1 Injection', manufacturer: "Dr Reddy's Labs", composition: 'Azacitidine (100mg)', price: 5761.17, isAvailable: true },
        { id: 10, name: 'Benadryl Syrup', type: 'capsule', meta: '150ml bottle', manufacturer: 'Johnson & Johnson', composition: 'Diphenhydramine', price: 115, isAvailable: true },
        { id: 11, name: 'Brufen 400 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Abbott', composition: 'Ibuprofen (400mg)', price: 30.50, isAvailable: true },
        { id: 12, name: 'Calpol 500mg Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'GSK Pharma', composition: 'Paracetamol (500mg)', price: 15.1, isAvailable: true },
        { id: 13, name: 'Cetirizine Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Cipla Ltd', composition: 'Cetirizine (10mg)', price: 20, isAvailable: true },
        { id: 14, name: 'Dolo 650 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Micro Labs', composition: 'Paracetamol (650mg)', price: 30.9, isAvailable: true },
        { id: 30, name: 'Diamox Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Pfizer', composition: 'Acetazolamide (250mg)', price: 80.0, isAvailable: true },
        { id: 15, name: 'Ecosprin 75 Tablet', type: 'capsule', meta: 'strip of 14 tablets', manufacturer: 'USV Ltd', composition: 'Aspirin (75mg)', price: 5.4, isAvailable: true },
        { id: 31, name: 'Eliquis 5mg Tablet', type: 'capsule', meta: 'strip of 20 tablets', manufacturer: 'Pfizer', composition: 'Apixaban (5mg)', price: 1100.0, isAvailable: true },
        { id: 16, name: 'Farxiga 10mg Tablet', type: 'capsule', meta: 'strip of 14 tablets', manufacturer: 'AstraZeneca', composition: 'Dapagliflozin (10mg)', price: 550, isAvailable: true },
        { id: 32, name: 'Foracort Inhaler', type: 'syringe', meta: '200 MDI', manufacturer: 'Cipla Ltd', composition: 'Budesonide, Formoterol', price: 380.0, isAvailable: true },
        { id: 17, name: 'Gardasil 9 Injection', type: 'syringe', meta: 'prefilled syringe of 0.5 ml', manufacturer: 'MSD Pharma', composition: 'HPV 9-valent Vaccine', price: 10850, isAvailable: true },
        { id: 33, name: 'Glycomet 500mg SR', type: 'capsule', meta: 'strip of 20 tablets', manufacturer: 'USV Ltd', composition: 'Metformin (500mg)', price: 40.0, isAvailable: true },
        { id: 18, name: 'Humira 40mg Injection', type: 'syringe', meta: 'prefilled syringe', manufacturer: 'Abbott', composition: 'Adalimumab (40mg)', price: 25000, isAvailable: false },
        { id: 34, name: 'Hydrocortisone Cream', type: 'capsule', meta: '15g tube', manufacturer: 'GSK Pharma', composition: 'Hydrocortisone (1%)', price: 95.0, isAvailable: true },
        { id: 35, name: 'Ibugesic Plus Tablet', type: 'capsule', meta: 'strip of 20 tablets', manufacturer: 'Cipla Ltd', composition: 'Ibuprofen, Paracetamol', price: 45.0, isAvailable: true },
        { id: 36, name: 'Januvia 100mg Tablet', type: 'capsule', meta: 'strip of 7 tablets', manufacturer: 'MSD Pharma', composition: 'Sitagliptin (100mg)', price: 450.0, isAvailable: true },
        { id: 37, name: 'Ketorol-DT Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: "Dr Reddy's Labs", composition: 'Ketorolac (10mg)', price: 125.0, isAvailable: true },
        { id: 38, name: 'Levocetirizine Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Sun Pharma', composition: 'Levocetirizine (5mg)', price: 60.0, isAvailable: true },
        { id: 39, name: 'Lipitor 10mg Tablet', type: 'capsule', meta: 'strip of 30 tablets', manufacturer: 'Pfizer', composition: 'Atorvastatin (10mg)', price: 250.0, isAvailable: true },
        { id: 40, name: 'Metformin 500mg', type: 'capsule', meta: 'strip of 30 tablets', manufacturer: 'Various', composition: 'Metformin Hydrochloride', price: 50.0, isAvailable: true },
        { id: 41, name: 'Montair LC Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Cipla Ltd', composition: 'Montelukast, Levocetirizine', price: 220.0, isAvailable: true },
        { id: 42, name: 'Naxdom 500 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Sun Pharma', composition: 'Naproxen, Domperidone', price: 110.0, isAvailable: true },
        { id: 43, name: 'Oflox 200 Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Cipla Ltd', composition: 'Ofloxacin (200mg)', price: 85.0, isAvailable: true },
        { id: 44, name: 'Pantop-DSR Capsule', type: 'capsule', meta: 'strip of 15 capsules', manufacturer: 'Aristo Pharma', composition: 'Pantoprazole, Domperidone', price: 199.0, isAvailable: true },
        { id: 45, name: 'Rosuvas 10 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Sun Pharma', composition: 'Rosuvastatin (10mg)', price: 280.0, isAvailable: true },
        { id: 46, name: 'Stemetil MD Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Abbott', composition: 'Prochlorperazine Maleate', price: 150.0, isAvailable: true },
        { id: 47, name: 'Telma 40 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Glenmark', composition: 'Telmisartan (40mg)', price: 230.0, isAvailable: true },
        { id: 48, name: 'Thyronorm 50mcg', type: 'capsule', meta: 'bottle of 100 tablets', manufacturer: 'Abbott', composition: 'Thyroxine (50mg)', price: 140.0, isAvailable: true },
        { id: 49, name: 'Volini Spray', type: 'syringe', meta: '75ml spray can', manufacturer: 'Sun Pharma', composition: 'Diclofenac', price: 210.0, isAvailable: true },
        { id: 50, name: 'Xanax 0.5mg Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Pfizer', composition: 'Alprazolam (10mg)', price: 50.0, isAvailable: false },
        { id: 51, name: 'Zentel Tablet', type: 'capsule', meta: '1 tablet', manufacturer: 'GSK Pharma', composition: 'Albendazole (400mg)', price: 8.5, isAvailable: true }
    ];
}

function loadOrderData() {
    const stored = localStorage.getItem(ORDER_STORAGE_KEY);
    try {
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

function loadMedicineCatalog() {
    const stored = localStorage.getItem(MEDICINE_STORAGE_KEY);
    if (!stored) {
        const defaultData = getDefaultMedicines();
        localStorage.setItem(MEDICINE_STORAGE_KEY, JSON.stringify(defaultData));
        return defaultData;
    }

    try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : getDefaultMedicines();
    } catch {
        return getDefaultMedicines();
    }
}

function saveMedicineCatalog(items) {
    localStorage.setItem(MEDICINE_STORAGE_KEY, JSON.stringify(items));
}

function renderOrderSummary(orders) {
    if (!ordersTotalEl) return;
    ordersTotalEl.textContent = `${orders.length} Order${orders.length === 1 ? '' : 's'}`;
}

function renderOrders(orders) {
    if (!ordersContainer) return;
    if (!orders.length) {
        ordersContainer.innerHTML = `
            <div class="order-card">
                <h3>No stored orders</h3>
                <p>Customer orders will appear here after checkout.</p>
            </div>
        `;
        return;
    }

    ordersContainer.innerHTML = '';
    orders.forEach(order => {
        const orderDiv = document.createElement('div');
        orderDiv.className = 'order-card';

        const orderDate = new Date(order.date).toLocaleDateString('en-IN', {
            year: 'numeric', month: 'short', day: 'numeric'
        });

        orderDiv.innerHTML = `
            <div class="order-header">
                <div class="order-meta">
                    <strong>Order #${order.id}</strong>
                    <span>${orderDate}</span>
                    <span>${order.customerInfo.name} • ${order.customerInfo.phone}</span>
                </div>
                <div class="order-status">
                    <label for="status-${order.id}">Status</label>
                    <select id="status-${order.id}"></select>
                </div>
            </div>
            <div class="order-details">
                <div>
                    <strong>Delivery Address</strong>
                    <span>${order.customerInfo.address}, ${order.customerInfo.city} - ${order.customerInfo.pincode}</span>
                </div>
                <div>
                    <strong>Total</strong>
                    <span>₹${order.total.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
                <div class="order-list">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <div>
                                <strong>${item.name}</strong>
                                <span>${item.meta}</span>
                            </div>
                            <div>
                                <span>Qty: ${item.quantity}</span>
                                <span>₹${(item.price * item.quantity).toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const select = orderDiv.querySelector('select');
        STATUS_OPTIONS.forEach(status => {
            const option = document.createElement('option');
            option.value = status;
            option.textContent = status;
            if (status.toLowerCase() === order.status.toLowerCase()) {
                option.selected = true;
            }
            select.appendChild(option);
        });

        select.addEventListener('change', () => {
            order.status = select.value;
            saveOrderChanges(orders);
        });

        ordersContainer.appendChild(orderDiv);
    });
}

function saveOrderChanges(orders) {
    localStorage.setItem(ORDER_STORAGE_KEY, JSON.stringify(orders));
}

function renderMedicines(medicines) {
    if (!medicineCatalogEl) return;
    const availableCount = adminMedicines.filter(med => med.isAvailable).length;
    if (availableMedicinesEl) {
        availableMedicinesEl.textContent = `${availableCount} Visible`;
    }

    if (!medicines.length) {
        medicineCatalogEl.innerHTML = '<div class="medicine-card"><p>No medicine records available.</p></div>';
        return;
    }

    medicineCatalogEl.innerHTML = '';
    medicines.forEach(medicine => {
        const card = document.createElement('div');
        card.className = 'medicine-card';
        card.innerHTML = `
            <div>
                <h3>${medicine.name}</h3>
                <div class="medicine-meta">
                    <span><strong>Type:</strong> ${medicine.type}</span>
                    <span><strong>Manufacturer:</strong> ${medicine.manufacturer}</span>
                    <span><strong>Price:</strong> ₹${medicine.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
                </div>
            </div>
            <div class="medicine-control">
                <small>${medicine.isAvailable ? 'Visible to customers' : 'Hidden from customers'}</small>
                <label class="switch">
                    <input type="checkbox" data-id="${medicine.id}" ${medicine.isAvailable ? 'checked' : ''}>
                    <span class="slider"></span>
                </label>
            </div>
        `;

        const checkbox = card.querySelector('input[type="checkbox"]');
        checkbox.addEventListener('change', () => {
            medicine.isAvailable = checkbox.checked;
            saveMedicineCatalog(adminMedicines);
            const filtered = filterMedicines(adminMedicines, medicineSearchInput.value);
            renderMedicines(filtered);
        });

        medicineCatalogEl.appendChild(card);
    });
}

function filterMedicines(medicines, query) {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return medicines;
    return medicines.filter(med =>
        med.name.toLowerCase().includes(normalized) ||
        med.manufacturer.toLowerCase().includes(normalized) ||
        med.type.toLowerCase().includes(normalized) ||
        med.meta.toLowerCase().includes(normalized)
    );
}

function initializeAdminPage() {
    const orders = loadOrderData();
    adminMedicines = loadMedicineCatalog();

    renderOrderSummary(orders);

    if (adminPage === 'dashboard' || adminPage === 'orders') {
        renderOrders(orders);
    }

    if (adminPage === 'dashboard' || adminPage === 'medicines') {
        renderMedicines(adminMedicines);
    }

    if (medicineSearchBtn) {
        medicineSearchBtn.addEventListener('click', () => {
            const filtered = filterMedicines(adminMedicines, medicineSearchInput.value);
            renderMedicines(filtered);
        });
    }

    if (medicineSearchInput) {
        medicineSearchInput.addEventListener('input', () => {
            const filtered = filterMedicines(adminMedicines, medicineSearchInput.value);
            renderMedicines(filtered);
        });
    }

    if (saveMedicineChangesBtn) {
        saveMedicineChangesBtn.addEventListener('click', () => {
            saveMedicineCatalog(adminMedicines);
            renderMedicines(adminMedicines);
            alert('Medicine visibility updates saved. Customer pages will reflect changes after refresh.');
        });
    }
}

window.addEventListener('DOMContentLoaded', initializeAdminPage);

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}
