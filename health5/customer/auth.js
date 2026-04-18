// Login and Authentication System for MedRush

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

// Login and Authentication System for MedRush
class AuthManager {
    constructor() {
        this.isLoggedIn = false;
        this.currentUser = null;
        this.otpCode = null;
        this.loginStep = 'phone';
        this.currentPhoneNumber = '';
        this.initializeAuth();
    }

    initializeAuth() {
        // Check if user is already logged in using AuthBridge
        const currentUser = authBridge.getCurrentUser();
        if (currentUser && currentUser.type === 'customer') {
            this.isLoggedIn = true;
            this.currentUser = {
                phone: currentUser.user,
                name: 'Customer',
                type: 'customer'
            };
            this.updateUIForLoggedInUser();
        }

        this.setupAuthListeners();
        this.setupPageAccessControl();
    }

    setupAuthListeners() {
        const userBtn = document.getElementById('userBtn');
        const loginModal = document.getElementById('loginModal');
        const closeModal = document.getElementById('closeModal');
        const loginForm = document.querySelector('.login-form');

        if (userBtn) {
            userBtn.addEventListener('click', () => {
                if (this.isLoggedIn) {
                    const userName = this.currentUser?.name || 'User';
                    this.showInfo(`Logged in as ${userName}.`);
                    return;
                }
                this.showLoginModal();
            });
        }

        if (closeModal && loginModal) {
            closeModal.addEventListener('click', () => {
                this.hideLoginModal();
            });
        }

        if (loginForm) {
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleLoginSubmit();
            });
        }

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                this.hideLoginModal();
            }
        });
    }

    setupPageAccessControl() {
        // Check if user needs to login for current page
        const protectedPages = ['cart.html', 'orders.html', 'checkout.html'];
        const currentPage = window.location.pathname.split('/').pop();
        
        if (protectedPages.includes(currentPage) && !this.isLoggedIn) {
            // Show login modal immediately
            setTimeout(() => {
                this.showLoginModal();
                this.showLoginRequiredMessage();
            }, 500);
        }
    }

    showLoginModal() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.add('active');
            this.resetLoginForm();
        }
    }

    hideLoginModal() {
        const loginModal = document.getElementById('loginModal');
        if (loginModal) {
            loginModal.classList.remove('active');
        }
    }

    showLoginRequiredMessage() {
        const loginTitle = document.getElementById('loginTitle');
        if (loginTitle) {
            const originalTitle = loginTitle.textContent;
            loginTitle.innerHTML = `${originalTitle}<br><small style="color: #ef4444; font-size: 0.9rem;">Login required to access this page</small>`;
            
            setTimeout(() => {
                loginTitle.textContent = originalTitle;
            }, 5000);
        }
    }

    resetLoginForm() {
        const phone = document.getElementById('loginPhone');
        const otp = document.getElementById('loginOtp');
        const phoneGroup = document.getElementById('loginPhoneGroup');
        const otpGroup = document.getElementById('loginOtpGroup');
        const loginBtn = document.getElementById('loginBtn');
        const loginTitle = document.getElementById('loginTitle');

        if (phone) phone.value = '';
        if (otp) otp.value = '';
        if (phoneGroup) phoneGroup.style.display = 'block';
        if (otpGroup) otpGroup.style.display = 'none';
        if (loginBtn) loginBtn.textContent = 'Continue';
        if (loginTitle) loginTitle.textContent = 'Login with Phone';
        
        this.loginStep = 'phone';
    }

    handleLoginSubmit() {
        if (this.loginStep === 'phone') {
            this.handlePhoneSubmit();
        } else if (this.loginStep === 'otp') {
            this.handleOTPSubmit();
        }
    }

    handlePhoneSubmit() {
        const phone = document.getElementById('loginPhone');
        const rawValue = phone?.value || '';
        let phoneNumber = rawValue.replace(/\D/g, '');

        if (phoneNumber.length === 11 && phoneNumber.startsWith('0')) {
            phoneNumber = phoneNumber.slice(1);
        } else if (phoneNumber.length === 12 && phoneNumber.startsWith('91')) {
            phoneNumber = phoneNumber.slice(2);
        }

        if (!phoneNumber) {
            this.showError('Please enter your phone number');
            return;
        }

        if (!/^[0-9]{10}$/.test(phoneNumber)) {
            this.showError('Please enter a valid 10-digit phone number');
            return;
        }

        // Generate OTP for this phone number
        this.otpCode = this.generateOTP();
        this.sendOTP(phoneNumber);
    }

    sendOTP(phoneNumber) {
        // Save the OTP request for this phone
        this.setOtpForPhone(phoneNumber, this.otpCode);

        const loginBtn = document.getElementById('loginBtn');
        const originalText = loginBtn.textContent;
        loginBtn.textContent = 'Sending OTP...';
        loginBtn.disabled = true;

        // Simulate API call delay
        setTimeout(() => {
            this.showOTPScreen(phoneNumber);
            loginBtn.textContent = originalText;
            loginBtn.disabled = false;

            // Simulate OTP delivery
            this.showSuccess(`OTP sent to ${phoneNumber}. Your code is ${this.otpCode}`);
        }, 1200);
    }

    showOTPScreen(phoneNumber) {
        const phoneGroup = document.getElementById('loginPhoneGroup');
        const otpGroup = document.getElementById('loginOtpGroup');
        const loginTitle = document.getElementById('loginTitle');
        const phone = document.getElementById('loginPhone');

        if (phoneGroup) phoneGroup.style.display = 'none';
        if (otpGroup) otpGroup.style.display = 'block';
        if (loginTitle) loginTitle.textContent = 'Enter OTP';
        if (phone) phone.disabled = true;

        this.loginStep = 'otp';
        this.currentPhoneNumber = phoneNumber;

        // Focus on OTP input
        setTimeout(() => {
            const otpInput = document.getElementById('loginOtp');
            if (otpInput) otpInput.focus();
        }, 100);
    }

    handleOTPSubmit() {
        const otp = document.getElementById('loginOtp');
        const otpValue = otp?.value.trim() || '';

        if (!otpValue) {
            this.showError('Please enter the OTP');
            return;
        }

        if (!/^[0-9]{4}$/.test(otpValue)) {
            this.showError('Please enter a valid 4-digit OTP');
            return;
        }

        this.verifyOTP(otpValue);
    }

    verifyOTP(otpValue) {
        const loginBtn = document.getElementById('loginBtn');
        const originalText = loginBtn.textContent;
        loginBtn.textContent = 'Verifying...';
        loginBtn.disabled = true;

        setTimeout(() => {
            const expectedOtp = this.getOtpForPhone(this.currentPhoneNumber);
            if (otpValue === expectedOtp) {
                this.loginSuccess();
            } else {
                this.showError('Invalid OTP. Please try again.');
                loginBtn.textContent = originalText;
                loginBtn.disabled = false;
            }
        }, 1000);
    }

    loginSuccess() {
        // Use AuthBridge for customer login
        authBridge.customerLogin(this.currentPhoneNumber, (result) => {
            if (result.success) {
                const userData = {
                    phone: this.currentPhoneNumber,
                    name: `User ${this.currentPhoneNumber.slice(-4)}`,
                    loginTime: new Date().toISOString(),
                    loginCount: 1
                };

                // Save user data and login state for backward compatibility
                this.currentUser = userData;
                this.isLoggedIn = true;
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('currentUser', JSON.stringify(userData));
                this.savePhoneHistory(this.currentPhoneNumber);

                // Update UI
                this.updateUIForLoggedInUser();
                this.hideLoginModal();
                
                // Show success message
                this.showSuccess('Login successful! Welcome to MedRush.');
                
                // Redirect if needed
                const currentPage = window.location.pathname.split('/').pop();
                if (currentPage === 'index.html') {
                    // User was on home page, no redirect needed
                } else {
                    // User was trying to access a protected page, reload to show content
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                }
            } else {
                this.showError('Login failed. Please try again.');
            }
        });
    }

    updateUIForLoggedInUser() {
        const userBtn = document.getElementById('userBtn');
        if (userBtn && this.currentUser) {
            userBtn.innerHTML = '<i class="fas fa-user-check"></i>';
            userBtn.title = `Logged in as ${this.currentUser.name}`;
        }
    }

    generateOTP() {
        return Math.floor(1000 + Math.random() * 9000).toString();
    }

    loadOtpRequests() {
        const stored = localStorage.getItem('otpRequests');
        try {
            return stored ? JSON.parse(stored) : {};
        } catch (error) {
            return {};
        }
    }

    saveOtpRequests(requests) {
        localStorage.setItem('otpRequests', JSON.stringify(requests));
    }

    setOtpForPhone(phoneNumber, otp) {
        const requests = this.loadOtpRequests();
        requests[phoneNumber] = {
            otp,
            createdAt: new Date().toISOString()
        };
        this.saveOtpRequests(requests);
    }

    getOtpForPhone(phoneNumber) {
        const requests = this.loadOtpRequests();
        return requests[phoneNumber]?.otp || null;
    }

    savePhoneHistory(phoneNumber) {
        const history = this.loadPhoneHistory();
        const existing = history.find(item => item.phone === phoneNumber);
        const now = new Date().toISOString();

        if (existing) {
            existing.loginCount += 1;
            existing.lastLogin = now;
        } else {
            history.push({
                phone: phoneNumber,
                firstLogin: now,
                lastLogin: now,
                loginCount: 1
            });
        }

        localStorage.setItem('userPhoneHistory', JSON.stringify(history));
    }

    loadPhoneHistory() {
        const stored = localStorage.getItem('userPhoneHistory');
        try {
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            return [];
        }
    }

    logout() {
        // Use AuthBridge for logout
        authBridge.logout((result) => {
            if (result.success) {
                // Clear session for backward compatibility
                this.isLoggedIn = false;
                this.currentUser = null;
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('currentUser');

                // Update UI
                const userBtn = document.getElementById('userBtn');
                if (userBtn) {
                    userBtn.innerHTML = '<i class="fas fa-user-circle"></i>';
                    userBtn.title = 'Login';
                }

                // Show message
                this.showSuccess('You have been logged out successfully.');

                // Redirect to home if on protected page
                const protectedPages = ['cart.html', 'orders.html', 'checkout.html'];
                const currentPage = window.location.pathname.split('/').pop();
                if (protectedPages.includes(currentPage)) {
                    setTimeout(() => {
                        window.location.href = 'index.html';
                    }, 1000);
                }
            } else {
                this.showError('Logout failed.');
            }
        });
    }

    showError(message) {
        this.showMessage(message, 'error');
    }

    showSuccess(message) {
        this.showMessage(message, 'success');
    }

    showInfo(message) {
        this.showMessage(message, 'info');
    }

    showMessage(message, type) {
        const notification = document.createElement('div');
        notification.className = `auth-notification auth-${type}`;
        
        const icon = type === 'error' ? 'fa-exclamation-circle' : 
                    type === 'success' ? 'fa-check-circle' : 'fa-info-circle';
        
        notification.innerHTML = `
            <i class="fas ${icon}"></i>
            <span>${message}</span>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10001;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            max-width: 400px;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;

        document.body.appendChild(notification);

        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, type === 'error' ? 5000 : 3000);
    }

    // Public method to check login status
    requireLogin() {
        if (!this.isLoggedIn) {
            this.showLoginModal();
            this.showLoginRequiredMessage();
            return false;
        }
        return true;
    }
}

// Add CSS for user menu and notifications
const authStyles = document.createElement('style');
authStyles.textContent = `
    @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOutRight {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }

    .user-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .user-name {
        font-size: 0.8rem;
        font-weight: 600;
    }

    .user-menu {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        min-width: 250px;
        overflow: hidden;
    }

    .user-menu-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1rem;
        background: #f8fafc;
        border-bottom: 1px solid #e2e8f0;
    }

    .user-menu-header i {
        font-size: 2rem;
        color: var(--primary-color);
    }

    .user-menu-header .user-name {
        font-weight: 700;
        color: var(--text-color);
        margin-bottom: 0.25rem;
    }

    .user-phone {
        color: #64748b;
        font-size: 0.85rem;
    }

    .user-menu-actions {
        padding: 0.5rem;
    }

    .user-menu-btn {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: transparent;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
        color: var(--text-color);
        transition: background-color 0.2s ease;
    }

    .user-menu-btn:hover {
        background: #f1f5f9;
    }

    .logout-btn {
        color: #ef4444 !important;
        border-top: 1px solid #e2e8f0;
        margin-top: 0.5rem;
        padding-top: 1rem;
    }

    .logout-btn:hover {
        background: #fef2f2 !important;
    }

    .auth-notification {
        display: flex;
        align-items: center;
        gap: 0.75rem;
    }

    #otpInfo {
        color: #2563eb !important;
        margin-top: 0.5rem !important;
        display: block !important;
        font-size: 0.85rem !important;
    }

    .btn-submit:disabled {
        opacity: 0.6;
        cursor: not-allowed;
    }
`;
document.head.appendChild(authStyles);

// Initialize auth manager when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.authManager = new AuthManager();
});

// Make authManager globally accessible
window.authManager = null;
