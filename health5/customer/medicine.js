const MEDICINE_STORAGE_KEY = 'medicineCatalog';

function loadMedicineCatalog() {
    const stored = localStorage.getItem(MEDICINE_STORAGE_KEY);
    
    // If medicines exist in storage, use them (these could be added by admin)
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            if (Array.isArray(parsed) && parsed.length > 0) {
                return parsed;
            }
        } catch (error) {
            console.error('Error parsing stored medicines:', error);
        }
    }
    
    // If no stored medicines, use default data
    const enhanced = defaultMedicineData.map(m => ({
        ...m,
        stock: m.isAvailable ? 50 : 0,
        status: m.isAvailable ? 'active' : 'inactive',
        category: m.category || 'general'
    }));
    localStorage.setItem(MEDICINE_STORAGE_KEY, JSON.stringify(enhanced));
    return enhanced;
}

function saveMedicineCatalog(items) {
    localStorage.setItem(MEDICINE_STORAGE_KEY, JSON.stringify(items));
}

function syncMedicines(updatedMedicines) {
    medicines = updatedMedicines;
    saveMedicineCatalog(updatedMedicines);
}

// Medicine data with modern pharmacy listing
const defaultMedicineData = [
    // A
    { id: 1, name: 'Avastin 100mg Injection', type: 'vial', meta: 'vial of 1 Injection', manufacturer: 'Roche Products India', composition: 'Bevacizumab (100mg)', price: 33863, isAvailable: true },
    { id: 2, name: 'Actorise 40 Injection', type: 'syringe', meta: 'prefilled syringe of 0.4 ml', manufacturer: 'Cipla Ltd', composition: 'Darbepoetin alfa (40mcg)', price: 2745.19, isAvailable: false },
    { id: 5, name: 'Azel 80 Capsule', type: 'capsule', meta: 'strip of 14 capsules', manufacturer: "Dr Reddy's Labs", composition: 'Enzalutamide (80mg)', price: 8156.25, isAvailable: true },
    { id: 9, name: 'Azacytin Injection', type: 'vial', meta: 'vial of 1 Injection', manufacturer: "Dr Reddy's Labs", composition: 'Azacitidine (100mg)', price: 5761.17, isAvailable: true },
    // B
    { id: 10, name: 'Benadryl Syrup', type: 'capsule', meta: '150ml bottle', manufacturer: 'Johnson & Johnson', composition: 'Diphenhydramine', price: 115, isAvailable: true },
    { id: 11, name: 'Brufen 400 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Abbott', composition: 'Ibuprofen (400mg)', price: 30.50, isAvailable: true },
    // C
    { id: 12, name: 'Calpol 500mg Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'GSK Pharma', composition: 'Paracetamol (500mg)', price: 15.1, isAvailable: true },
    { id: 13, name: 'Cetirizine Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Cipla Ltd', composition: 'Cetirizine (10mg)', price: 20, isAvailable: true },
    // D
    { id: 14, name: 'Dolo 650 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Micro Labs', composition: 'Paracetamol (650mg)', price: 30.9, isAvailable: true },
    { id: 30, name: 'Diamox Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Pfizer', composition: 'Acetazolamide (250mg)', price: 80.0, isAvailable: true },
    // E
    { id: 15, name: 'Ecosprin 75 Tablet', type: 'capsule', meta: 'strip of 14 tablets', manufacturer: 'USV Ltd', composition: 'Aspirin (75mg)', price: 5.4, isAvailable: true },
    { id: 31, name: 'Eliquis 5mg Tablet', type: 'capsule', meta: 'strip of 20 tablets', manufacturer: 'Pfizer', composition: 'Apixaban (5mg)', price: 1100.0, isAvailable: true },
    // F
    { id: 16, name: 'Farxiga 10mg Tablet', type: 'capsule', meta: 'strip of 14 tablets', manufacturer: 'AstraZeneca', composition: 'Dapagliflozin (10mg)', price: 550, isAvailable: true },
    { id: 32, name: 'Foracort Inhaler', type: 'syringe', meta: '200 MDI', manufacturer: 'Cipla Ltd', composition: 'Budesonide, Formoterol', price: 380.0, isAvailable: true },
    // G
    { id: 17, name: 'Gardasil 9 Injection', type: 'syringe', meta: 'prefilled syringe of 0.5 ml', manufacturer: 'MSD Pharma', composition: 'HPV 9-valent Vaccine', price: 10850, isAvailable: true },
    { id: 33, name: 'Glycomet 500mg SR', type: 'capsule', meta: 'strip of 20 tablets', manufacturer: 'USV Ltd', composition: 'Metformin (500mg)', price: 40.0, isAvailable: true },
    // H
    { id: 18, name: 'Humira 40mg Injection', type: 'syringe', meta: 'prefilled syringe', manufacturer: 'Abbott', composition: 'Adalimumab (40mg)', price: 25000, isAvailable: false },
    { id: 34, name: 'Hydrocortisone Cream', type: 'capsule', meta: '15g tube', manufacturer: 'GSK Pharma', composition: 'Hydrocortisone (1%)', price: 95.0, isAvailable: true },
    // I
    { id: 35, name: 'Ibugesic Plus Tablet', type: 'capsule', meta: 'strip of 20 tablets', manufacturer: 'Cipla Ltd', composition: 'Ibuprofen, Paracetamol', price: 45.0, isAvailable: true },
    // J
    { id: 36, name: 'Januvia 100mg Tablet', type: 'capsule', meta: 'strip of 7 tablets', manufacturer: 'MSD Pharma', composition: 'Sitagliptin (100mg)', price: 450.0, isAvailable: true },
    // K
    { id: 37, name: 'Ketorol-DT Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: "Dr Reddy's Labs", composition: 'Ketorolac (10mg)', price: 125.0, isAvailable: true },
    // L
    { id: 38, name: 'Levocetirizine Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Sun Pharma', composition: 'Levocetirizine (5mg)', price: 60.0, isAvailable: true },
    { id: 39, name: 'Lipitor 10mg Tablet', type: 'capsule', meta: 'strip of 30 tablets', manufacturer: 'Pfizer', composition: 'Atorvastatin (10mg)', price: 250.0, isAvailable: true },
    // M
    { id: 40, name: 'Metformin 500mg', type: 'capsule', meta: 'strip of 30 tablets', manufacturer: 'Various', composition: 'Metformin Hydrochloride', price: 50.0, isAvailable: true },
    { id: 41, name: 'Montair LC Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Cipla Ltd', composition: 'Montelukast, Levocetirizine', price: 220.0, isAvailable: true },
    // N
    { id: 42, name: 'Naxdom 500 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Sun Pharma', composition: 'Naproxen, Domperidone', price: 110.0, isAvailable: true },
    // O
    { id: 43, name: 'Oflox 200 Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Cipla Ltd', composition: 'Ofloxacin (200mg)', price: 85.0, isAvailable: true },
    // P
    { id: 44, name: 'Pantop-DSR Capsule', type: 'capsule', meta: 'strip of 15 capsules', manufacturer: 'Aristo Pharma', composition: 'Pantoprazole, Domperidone', price: 199.0, isAvailable: true },
    // R
    { id: 45, name: 'Rosuvas 10 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Sun Pharma', composition: 'Rosuvastatin (10mg)', price: 280.0, isAvailable: true },
    // S
    { id: 46, name: 'Stemetil MD Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Abbott', composition: 'Prochlorperazine Maleate', price: 150.0, isAvailable: true },
    // T
    { id: 47, name: 'Telma 40 Tablet', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'Glenmark', composition: 'Telmisartan (40mg)', price: 230.0, isAvailable: true },
    { id: 48, name: 'Thyronorm 50mcg', type: 'capsule', meta: 'bottle of 100 tablets', manufacturer: 'Abbott', composition: 'Thyroxine (50mcg)', price: 140.0, isAvailable: true },
    // V
    { id: 49, name: 'Volini Spray', type: 'syringe', meta: '75ml spray can', manufacturer: 'Sun Pharma', composition: 'Diclofenac', price: 210.0, isAvailable: true },
    // X
    { id: 50, name: 'Xanax 0.5mg Tablet', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Pfizer', composition: 'Alprazolam (0.5mg)', price: 50.0, isAvailable: false },
    // Z
    { id: 51, name: 'Zentel Tablet', type: 'capsule', meta: '1 tablet', manufacturer: 'GSK Pharma', composition: 'Albendazole (400mg)', price: 8.5, isAvailable: true }
];
// Load medicines and set up listeners for updates from admin
let medicines = loadMedicineCatalog();

// DOM elements
const searchInput = document.getElementById('medicineSearch');
const medicinesGrid = document.getElementById('medicinesGrid');
const cartCount = document.getElementById('cart-count');
const alphabetFilter = document.getElementById('alphabetFilter');

let currentQuery = '';
let activeLetter = 'All';

// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('pharmacyCart')) || [];
updateCartCount();

// Listen for storage changes (when admin adds medicines)
window.addEventListener('storage', (event) => {
    if (event.key === MEDICINE_STORAGE_KEY) {
        console.log('Medicines updated by admin, refreshing view...');
        medicines = loadMedicineCatalog();
        updateMedicines();
    }
});

// Reload medicines periodically to check for updates from admin
setInterval(() => {
    const updatedMedicines = loadMedicineCatalog();
    if (JSON.stringify(updatedMedicines) !== JSON.stringify(medicines)) {
        console.log('New medicines detected, updating display...');
        medicines = updatedMedicines;
        updateMedicines();
    }
}, 3000); // Check every 3 seconds

// Render medicines with modern design and SVG icons
function renderMedicines(medicinesToShow) {
    const visibleList = medicinesToShow.filter(med => med.isAvailable || med.stock > 0 || med.status === 'active');
    medicinesGrid.innerHTML = '';

    if (visibleList.length === 0) {
        medicinesGrid.innerHTML = '<p style="text-align:center;color:#6b7280;font-weight:600; padding: 3rem;">No medicines found for this search.</p>';
    } else {
        const cart = JSON.parse(localStorage.getItem('pharmacyCart')) || [];
        
        visibleList.forEach(medicine => {
            const card = document.createElement('div');
            card.className = 'medicine-card';
            
            const isInCart = cart.some(item => item.id === medicine.id);
            const isAvailable = medicine.isAvailable !== false && medicine.stock > 0 && medicine.status === 'active';
            
            // Get category display name
            const categoryMap = {
                'pain-relief': '💊 Pain Relief',
                'vitamins': '💉 Vitamins',
                'cold-cough': '🤒 Cold & Cough',
                'antibiotics': '⚕️ Antibiotics',
                'diabetes': '🩺 Diabetes',
                'general': '💊 General Medicine'
            };
            const categoryDisplay = categoryMap[medicine.category] || (medicine.category || '💊 General Medicine');
            
            const availabilityHtml = isAvailable 
                ? `<button class="add-to-cart-btn" data-id="${medicine.id}" ${isInCart ? 'disabled' : ''}>
                       ${isInCart ? '<i class="fas fa-check"></i> ADDED' : '<i class="fas fa-shopping-cart"></i> ADD TO CART'}
                   </button>`
                : `<span class="not-available">NOT AVAILABLE</span>`;
            
            const stockDisplay = medicine.stock ? `(Stock: ${medicine.stock})` : '';
            
            card.innerHTML = `
                <div class="medicine-main">
                    <div class="medicine-icon-container">
                        <svg class="medicine-icon" viewBox="0 0 24 24">
                            ${getIconForType(medicine.type)}
                        </svg>
                    </div>
                    <div class="medicine-details">
                        <div class="medicine-category">${categoryDisplay}</div>
                        <h3 class="medicine-name">${medicine.name}</h3>
                        <span class="prescription-tag">Rx Prescription Required</span>
                        <div class="product-meta">${medicine.meta || 'Medicine'}</div>
                        ${medicine.manufacturer ? `<div class="product-meta">Manufacturer: ${medicine.manufacturer}</div>` : ''}
                        ${medicine.composition ? `<div class="product-meta">Composition: ${medicine.composition}</div>` : ''}
                        ${medicine.description ? `<div class="product-meta">Description: ${medicine.description}</div>` : ''}
                        <div class="medicine-price">₹ ${medicine.price.toLocaleString('en-IN', {minimumFractionDigits: 2, maximumFractionDigits: 2})} ${stockDisplay}</div>
                    </div>
                </div>
                <div class="medicine-footer">
                    ${availabilityHtml}
                </div>
            `;
            medicinesGrid.appendChild(card);
        });
    }

    const medicineCountEl = document.getElementById('medicineCount');
    if (medicineCountEl) {
        medicineCountEl.textContent = `Showing ${visibleList.length} of ${medicines.length} total products`;
    }
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
renderAlphabetFilter();
renderMedicines(medicines);

// Search functionality
function performMedicineSearch() {
    currentQuery = searchInput.value.trim().toLowerCase();
    activeLetter = 'All';
    updateActiveFilterButton();
    updateMedicines();
}

function updateMedicines() {
    let filtered = medicines;

    if (activeLetter !== 'All') {
        filtered = filtered.filter(med => med.name.toUpperCase().startsWith(activeLetter));
    }

    if (currentQuery) {
        filtered = filtered.filter(med => med.name.toLowerCase().includes(currentQuery));
    }

    renderMedicines(filtered);
}

// Alphabet filter functions
function renderAlphabetFilter() {
    if (!alphabetFilter) return;

    const letters = ['All', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 
                     'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    alphabetFilter.innerHTML = letters.map(letter => {
        const activeClass = activeLetter === letter ? 'active' : '';
        return `<button class="alpha-btn ${activeClass}" data-letter="${letter}">${letter}</button>`;
    }).join('');
}

function updateActiveFilterButton() {
    const buttons = alphabetFilter.querySelectorAll('.alpha-btn');
    buttons.forEach(btn => {
        if (btn.dataset.letter === activeLetter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

alphabetFilter.addEventListener('click', (e) => {
    if (!e.target.classList.contains('alpha-btn')) return;
    
    activeLetter = e.target.dataset.letter || 'All';
    currentQuery = '';
    if (searchInput) searchInput.value = '';
    
    updateActiveFilterButton();
    updateMedicines();
});

searchInput.addEventListener('input', performMedicineSearch);

const medicineSearchBtn = document.getElementById('searchBtn');
if (medicineSearchBtn) {
    medicineSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performMedicineSearch();
    });
}

searchInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        performMedicineSearch();
    }
});

// Add to cart functionality with popup notification
medicinesGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
        const button = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
        const productId = parseInt(button.dataset.id);
        const productToAdd = medicines.find(p => p.id === productId);
        
        let cart = JSON.parse(localStorage.getItem('pharmacyCart')) || [];
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex > -1) {
            cart[existingItemIndex].quantity++;
        } else {
            cart.push({ ...productToAdd, quantity: 1 });
        }
        
        localStorage.setItem('pharmacyCart', JSON.stringify(cart));
        
        button.innerHTML = '<i class="fas fa-check"></i> ADDED';
        button.disabled = true;
        
        // Show success popup
        showAddToCartPopup(productToAdd);
        updateCartCount();
    }
});

// Show beautiful popup notification
function showAddToCartPopup(product) {
    // Create popup element
    const popup = document.createElement('div');
    popup.className = 'cart-popup';
    popup.innerHTML = `
        <div class="popup-content">
            <div class="popup-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="popup-message">
                <h4>Added to Cart!</h4>
                <p>${product.name}</p>
                <span class="popup-price">₹ ${product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>
            </div>
        </div>
    `;
    
    document.body.appendChild(popup);
    
    // Trigger animation
    setTimeout(() => popup.classList.add('show'), 10);
    
    // Remove after 2.5 seconds
    setTimeout(() => {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }, 2500);
}

function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    if (cartCount) {
        const pharmacyCart = JSON.parse(localStorage.getItem('pharmacyCart')) || [];
        const total = pharmacyCart.reduce((sum, item) => sum + item.quantity, 0);
        cartCount.textContent = total;
        
        // Update badge if exists
        const cartBadge = document.querySelector('.cart-badge');
        if (cartBadge) {
            cartBadge.textContent = total;
            cartBadge.style.display = total > 0 ? 'flex' : 'none';
        }
    }
}

// Hamburger menu (same as index)
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}