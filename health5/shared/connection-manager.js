// Connection Manager - Smart Cross-Site Navigation
// Handles intelligent switching between admin and customer sites

class ConnectionManager {
    constructor() {
        this.authBridge = window.authBridge;
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

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ConnectionManager;
}
