// Admin Panel JavaScript - MedRush
// Main script file for all admin functionality

// Auth Bridge - Unified Authentication System
class AuthBridge {
    constructor() {
        this.storageKey = 'medrush_auth';
        this.adminPrefix = 'admin_';
        this.customerPrefix = 'customer_';
        this.init();
    }

    init() {
        // Initialize session management
        this.setupSessionSync();
        this.setupCrossDomainMessaging();
    }

    // Session synchronization between sites
    setupSessionSync() {
        // Check for existing auth data
        const authData = this.getAuthData();

        // Set up periodic sync
        setInterval(() => {
            this.syncSessions();
        }, 30000); // Sync every 30 seconds

        // Listen for storage events (for cross-tab sync)
        window.addEventListener('storage', (e) => {
            if (e.key === this.storageKey) {
                this.handleStorageChange(e);
            }
        });
    }

    // Cross-domain messaging setup
    setupCrossDomainMessaging() {
        window.addEventListener('message', (e) => {
            // Verify origin for security
            if (this.isValidOrigin(e.origin)) {
                this.handleCrossDomainMessage(e);
            }
        });
    }

    // Get authentication data
    getAuthData() {
        const data = localStorage.getItem(this.storageKey);
        return data ? JSON.parse(data) : null;
    }

    // Set authentication data
    setAuthData(data) {
        localStorage.setItem(this.storageKey, JSON.stringify(data));
        this.broadcastAuthChange(data);
    }

    // Admin login
    adminLogin(credentials, callback) {
        // Simulate backend authentication
        const validCredentials = {
            'admin': 'admin123',
            'manager': 'manager123',
            'staff': 'staff123'
        };

        setTimeout(() => {
            if (validCredentials[credentials.username] === credentials.password) {
                const authData = {
                    type: 'admin',
                    user: credentials.username,
                    role: this.getAdminRole(credentials.username),
                    timestamp: Date.now(),
                    sessionToken: this.generateSessionToken()
                };

                this.setAuthData(authData);
                callback({ success: true, data: authData });
            } else {
                callback({ success: false, error: 'Invalid credentials' });
            }
        }, 500);
    }

    // Customer login
    customerLogin(phoneNumber, callback) {
        // Simulate backend authentication
        setTimeout(() => {
            const authData = {
                type: 'customer',
                user: phoneNumber,
                role: 'customer',
                timestamp: Date.now(),
                sessionToken: this.generateSessionToken()
            };

            this.setAuthData(authData);
            callback({ success: true, data: authData });
        }, 500);
    }

    // Logout
    logout(callback) {
        const authData = this.getAuthData();
        if (authData) {
            // Clear session
            this.setAuthData(null);

            // Broadcast logout
            this.broadcastLogout();

            callback({ success: true });
        } else {
            callback({ success: false, error: 'No active session' });
        }
    }

    // Check if user is logged in
    isLoggedIn() {
        const authData = this.getAuthData();
        return authData && this.isValidSession(authData);
    }

    // Get current user info
    getCurrentUser() {
        const authData = this.getAuthData();
        return authData ? {
            type: authData.type,
            user: authData.user,
            role: authData.role
        } : null;
    }

    // Switch between admin and customer
    switchToAdmin(targetUrl = '../admin/index.html') {
        const authData = this.getAuthData();
        if (authData && authData.type === 'admin') {
            window.location.href = targetUrl;
        } else {
            this.showLoginModal('admin');
        }
    }

    switchToCustomer(targetUrl = '../customer/index.html') {
        const authData = this.getAuthData();
        if (authData && authData.type === 'customer') {
            window.location.href = targetUrl;
        } else {
            this.showLoginModal('customer');
        }
    }

    // Helper methods
    getAdminRole(username) {
        const roles = {
            'admin': 'administrator',
            'manager': 'manager',
            'staff': 'staff'
        };
        return roles[username] || 'user';
    }

    generateSessionToken() {
        return 'token_' + Math.random().toString(36).substr(2, 9) + Date.now();
    }

    isValidSession(authData) {
        const sessionAge = Date.now() - authData.timestamp;
        const maxAge = 24 * 60 * 60 * 1000; // 24 hours
        return sessionAge < maxAge;
    }

    isValidOrigin(origin) {
        // Add your domain validation logic here
        return origin.includes('localhost') || origin.includes('medrush');
    }

    handleStorageChange(event) {
        // Handle cross-tab authentication changes
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;
        this.onAuthStateChange(newValue);
    }

    handleCrossDomainMessage(event) {
        const { type, data } = event.data;

        switch(type) {
            case 'AUTH_REQUEST':
                this.handleAuthRequest(data, event.source);
                break;
            case 'AUTH_SYNC':
                this.handleAuthSync(data);
                break;
            case 'LOGOUT_BROADCAST':
                this.handleLogoutBroadcast();
                break;
        }
    }

    broadcastAuthChange(authData) {
        // Broadcast to other tabs/windows
        if (window.opener) {
            window.opener.postMessage({
                type: 'AUTH_SYNC',
                data: authData
            }, '*');
        }

        // Broadcast to iframes
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            iframe.contentWindow.postMessage({
                type: 'AUTH_SYNC',
                data: authData
            }, '*');
        });
    }

    broadcastLogout() {
        // Broadcast logout to all connected windows
        if (window.opener) {
            window.opener.postMessage({
                type: 'LOGOUT_BROADCAST'
            }, '*');
        }
    }

    syncSessions() {
        // Periodic session synchronization
        const authData = this.getAuthData();
        if (authData && !this.isValidSession(authData)) {
            // Session expired, logout
            this.logout(() => {});
        }
    }

    onAuthStateChange(authData) {
        // Override this method to handle auth state changes
        console.log('Auth state changed:', authData);
    }

    showLoginModal(type) {
        // Show appropriate login modal
        if (type === 'admin') {
            window.location.href = '../admin/login.html';
        } else {
            // Show customer login modal
            const modal = document.getElementById('loginModal');
            if (modal) {
                modal.classList.add('active');
            }
        }
    }

    // Data sharing between sites
    shareData(key, value) {
        const shareKey = `share_${key}`;
        localStorage.setItem(shareKey, JSON.stringify({
            value: value,
            timestamp: Date.now()
        }));
    }

    getSharedData(key) {
        const shareKey = `share_${key}`;
        const data = localStorage.getItem(shareKey);
        return data ? JSON.parse(data).value : null;
    }

    // Admin-specific methods
    getAdminStats() {
        // Simulate fetching admin statistics
        return {
            totalOrders: 1847,
            totalUsers: 892,
            totalMedicines: 248,
            revenue: 45200,
            pendingOrders: 23,
            todayOrders: 47
        };
    }

    // Customer-specific methods
    getCustomerOrders() {
        // Simulate fetching customer orders
        return [
            {
                id: 'ORD001',
                date: '2024-01-15',
                status: 'delivered',
                total: 1250,
                items: 3
            },
            {
                id: 'ORD002',
                date: '2024-01-18',
                status: 'processing',
                total: 890,
                items: 2
            }
        ];
    }
}

// Initialize the auth bridge
const authBridge = new AuthBridge();

// Connection Manager - Smart Cross-Site Navigation
class ConnectionManager {
    constructor() {
        this.authBridge = authBridge;
        this.init();
    }

    init() {
        this.setupConnectionButtons();
        this.setupAutoDetection();
        this.setupKeyboardShortcuts();
    }

    // Setup connection buttons on both sites
    setupConnectionButtons() {
        this.setupAdminConnectionButtons();
        this.setupCustomerConnectionButtons();
    }

    // Admin site connection buttons
    setupAdminConnectionButtons() {
        // Replace simple links with smart buttons
        const customerLinks = document.querySelectorAll('.customer-link');
        customerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToCustomer();
            });
        });
    }

    // Customer site connection buttons
    setupCustomerConnectionButtons() {
        // Add admin access button if not present
        this.addAdminAccessButton();
        
        // Setup existing admin buttons
        const adminButtons = document.querySelectorAll('.admin-access');
        adminButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchToAdmin();
            });
        });
    }

    // Smart admin access button for customer site
    addAdminAccessButton() {
        const headerControls = document.querySelector('.header-controls');
        if (headerControls && !headerControls.querySelector('.smart-admin-btn')) {
            const adminBtn = document.createElement('button');
            adminBtn.className = 'smart-admin-btn';
            adminBtn.innerHTML = '<i class="fas fa-user-shield"></i> Admin';
            adminBtn.onclick = () => this.switchToAdmin();
            
            // Insert before user button
            const userBtn = headerControls.querySelector('.user-btn');
            if (userBtn) {
                headerControls.insertBefore(adminBtn, userBtn);
            } else {
                headerControls.appendChild(adminBtn);
            }
        }
    }

    // Switch to customer site
    switchToCustomer() {
        const currentUser = this.authBridge.getCurrentUser();
        
        if (currentUser && currentUser.type === 'customer') {
            // Already logged in as customer, redirect
            this.navigate('../customer/index.html');
        } else if (currentUser && currentUser.type === 'admin') {
            // Admin logged in, switch to customer mode
            this.switchToCustomerMode();
        } else {
            // Not logged in, show customer login
            this.showCustomerLogin();
        }
    }

    // Switch to admin site
    switchToAdmin() {
        const currentUser = this.authBridge.getCurrentUser();
        
        if (currentUser && currentUser.type === 'admin') {
            // Already logged in as admin, redirect
            this.navigate('../admin/index.html');
        } else if (currentUser && currentUser.type === 'customer') {
            // Customer logged in, show admin login prompt
            this.showAdminLoginPrompt();
        } else {
            // Not logged in, show admin login
            this.showAdminLogin();
        }
    }

    // Navigate with session preservation
    navigate(url) {
        // Share current session data
        this.shareSessionData();
        
        // Navigate to target
        window.location.href = url;
    }

    // Share session data between sites
    shareSessionData() {
        const currentUser = this.authBridge.getCurrentUser();
        if (currentUser) {
            // Share user data
            this.authBridge.shareData('currentUser', currentUser);
            this.authBridge.shareData('lastActivity', Date.now());
        }
    }

    // Switch admin to customer mode
    switchToCustomerMode() {
        // Create customer session from admin session
        const adminUser = this.authBridge.getCurrentUser();
        const customerSession = {
            type: 'customer',
            user: 'guest_' + adminUser.user,
            role: 'guest',
            timestamp: Date.now(),
            sessionToken: this.authBridge.generateSessionToken(),
            originalAdminSession: adminUser
        };
        
        // Set customer session
        this.authBridge.setAuthData(customerSession);
        
        // Navigate to customer site
        this.navigate('../customer/index.html');
    }

    // Show customer login modal
    showCustomerLogin() {
        const modal = document.getElementById('loginModal');
        if (modal) {
            modal.classList.add('active');
        } else {
            // Fallback to customer login page
            this.navigate('../customer/index.html');
        }
    }

    // Show admin login prompt
    showAdminLoginPrompt() {
        const confirmed = confirm('You are currently logged in as a customer. Do you want to switch to admin login?');
        if (confirmed) {
            this.showAdminLogin();
        }
    }

    // Show admin login
    showAdminLogin() {
        this.navigate('../admin/login.html');
    }

    // Auto-detect and setup connection based on current site
    setupAutoDetection() {
        const currentPath = window.location.pathname;
        const isAdminSite = currentPath.includes('/admin/');
        const isCustomerSite = currentPath.includes('/customer/');
        
        if (isAdminSite) {
            this.setupAdminSiteFeatures();
        } else if (isCustomerSite) {
            this.setupCustomerSiteFeatures();
        }
    }

    // Admin site specific features
    setupAdminSiteFeatures() {
        // Add customer data preview
        this.addCustomerDataPreview();
        
        // Add quick customer switch
        this.addQuickCustomerSwitch();
    }

    // Customer site specific features
    setupCustomerSiteFeatures() {
        // Add admin status indicator
        this.addAdminStatusIndicator();
        
        // Add quick admin access
        this.addQuickAdminAccess();
    }

    // Add customer data preview for admin
    addCustomerDataPreview() {
        const adminContent = document.querySelector('.admin-content');
        if (adminContent) {
            const previewSection = document.createElement('div');
            previewSection.className = 'customer-data-preview';
            previewSection.innerHTML = `
                <h3>Customer Site Overview</h3>
                <div class="preview-stats">
                    <div class="preview-stat">
                        <span class="stat-number">${this.getCustomerOrderCount()}</span>
                        <span class="stat-label">Active Orders</span>
                    </div>
                    <div class="preview-stat">
                        <span class="stat-number">${this.getCustomerUserCount()}</span>
                        <span class="stat-label">Online Users</span>
                    </div>
                </div>
                <button class="preview-btn" onclick="connectionManager.switchToCustomer()">
                    <i class="fas fa-eye"></i> View Customer Site
                </button>
            `;
            
            // Insert after admin hero
            const adminHero = document.querySelector('.admin-hero');
            if (adminHero) {
                adminHero.parentNode.insertBefore(previewSection, adminHero.nextSibling);
            }
        }
    }

    // Add admin status indicator for customer
    addAdminStatusIndicator() {
        const currentUser = this.authBridge.getCurrentUser();
        if (currentUser && currentUser.type === 'admin') {
            const header = document.querySelector('.header');
            if (header) {
                const indicator = document.createElement('div');
                indicator.className = 'admin-status-indicator';
                indicator.innerHTML = `
                    <i class="fas fa-user-shield"></i>
                    <span>Admin Mode Active</span>
                `;
                header.appendChild(indicator);
            }
        }
    }

    // Setup keyboard shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl+Shift+A: Switch to Admin
            if (e.ctrlKey && e.shiftKey && e.key === 'A') {
                e.preventDefault();
                this.switchToAdmin();
            }
            
            // Ctrl+Shift+C: Switch to Customer
            if (e.ctrlKey && e.shiftKey && e.key === 'C') {
                e.preventDefault();
                this.switchToCustomer();
            }
            
            // Ctrl+Shift+S: Toggle between sites
            if (e.ctrlKey && e.shiftKey && e.key === 'S') {
                e.preventDefault();
                this.toggleSite();
            }
        });
    }

    // Toggle between sites
    toggleSite() {
        const currentPath = window.location.pathname;
        if (currentPath.includes('/admin/')) {
            this.switchToCustomer();
        } else {
            this.switchToAdmin();
        }
    }

    // Get customer order count (simulated)
    getCustomerOrderCount() {
        return Math.floor(Math.random() * 50) + 10;
    }

    // Get customer user count (simulated)
    getCustomerUserCount() {
        return Math.floor(Math.random() * 200) + 50;
    }

    // Add quick customer switch button
    addQuickCustomerSwitch() {
        const adminControls = document.querySelector('.admin-controls');
        if (adminControls && !adminControls.querySelector('.quick-customer-btn')) {
            const quickBtn = document.createElement('button');
            quickBtn.className = 'quick-customer-btn';
            quickBtn.innerHTML = '<i class="fas fa-exchange-alt"></i> Quick Switch';
            quickBtn.onclick = () => this.switchToCustomer();
            adminControls.appendChild(quickBtn);
        }
    }

    // Add quick admin access button
    addQuickAdminAccess() {
        const headerControls = document.querySelector('.header-controls');
        if (headerControls && !headerControls.querySelector('.quick-admin-btn')) {
            const quickBtn = document.createElement('button');
            quickBtn.className = 'quick-admin-btn';
            quickBtn.innerHTML = '<i class="fas fa-bolt"></i> Quick Admin';
            quickBtn.onclick = () => this.switchToAdmin();
            headerControls.appendChild(quickBtn);
        }
    }
}

// Initialize connection manager
const connectionManager = new ConnectionManager();

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
    const currentUser = authBridge.getCurrentUser();
    if (!currentUser || currentUser.type !== 'admin') {
        // Redirect to login page if not authenticated as admin
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
    // Use AuthBridge for logout
    authBridge.logout((result) => {
        if (result.success) {
            // Clear backward compatibility localStorage items
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
        } else {
            showNotification('Logout failed', 'error');
        }
    });
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
