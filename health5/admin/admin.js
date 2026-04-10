// Admin Panel JavaScript - MedRush
// Main script file for all admin functionality

// Global variables
let medicines = [];
let orders = [];
let users = [];

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    initializeAdmin();
    loadMockData();
    setupEventListeners();
});

function initializeAdmin() {
    console.log('Admin Panel Initialized');
    if (checkAuth()) {
        setupMobileMenu();
        loadMockData();
        setupEventListeners();
    }
}

function checkAuth() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
        // Redirect to login page if not authenticated
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

function setupMobileMenu() {
    // No sidebar toggle needed since we have only top navigation
    console.log('Mobile menu setup complete');
}

function loadMockData() {
    medicines = [
        { id: 'MED-001', name: 'Paracetamol 500mg', category: 'pain-relief', price: 45.00, stock: 150, status: 'active' },
        { id: 'MED-002', name: 'Vitamin C 500mg', category: 'vitamins', price: 120.00, stock: 25, status: 'active' },
        { id: 'MED-003', name: 'Aspirin 75mg', category: 'pain-relief', price: 35.00, stock: 0, status: 'inactive' }
    ];

    orders = [
        { id: 'ORD-001', customer: 'Rahul Sharma', phone: '+91 9876543210', medicines: 'Paracetamol 500mg (2), Vitamin C 500mg (1)', total: 450.00, payment: 'COD', status: 'pending', date: '2026-04-06' },
        { id: 'ORD-002', customer: 'Priya Patel', phone: '+91 9876543211', medicines: 'Aspirin 75mg (1), Cough Syrup 100ml (1)', total: 320.00, payment: 'Card', status: 'processing', date: '2026-04-06' }
    ];

    users = [
        { id: 'USR-001', firstName: 'Rahul', lastName: 'Sharma', email: 'rahul.sharma@email.com', phone: '+91 9876543210', role: 'customer', status: 'active', orders: 24, joinedDate: '2026-03-15' },
        { id: 'USR-002', firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@email.com', phone: '+91 9876543211', role: 'customer', status: 'active', orders: 18, joinedDate: '2026-02-20' }
    ];
}

function setupEventListeners() {
    console.log('Event listeners setup complete');
}

function logout() {
    // Clear all admin-related localStorage
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
    localStorage.removeItem('adminRole');
    localStorage.removeItem('adminName');
    localStorage.removeItem('loginTime');
    
    showNotification('Logged out successfully', 'success');
    
    // Redirect to admin login page
    setTimeout(() => {
        window.location.href = 'login.html';
    }, 1000);
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 6px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
    `;
    
    switch(type) {
        case 'success':
            notification.style.background = '#d4edda';
            notification.style.color = '#155724';
            notification.style.border = '1px solid #c3e6cb';
            break;
        case 'error':
            notification.style.background = '#f8d7da';
            notification.style.color = '#721c24';
            notification.style.border = '1px solid #f5c6cb';
            break;
        case 'warning':
            notification.style.background = '#fff3cd';
            notification.style.color = '#856404';
            notification.style.border = '1px solid #ffeaa7';
            break;
        default:
            notification.style.background = '#d1ecf1';
            notification.style.color = '#0c5460';
            notification.style.border = '1px solid #bee5eb';
    }
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);
