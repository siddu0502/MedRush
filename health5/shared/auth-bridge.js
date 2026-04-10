// Auth Bridge - Shared Authentication System
// This file handles cross-site authentication and data sharing between customer and admin

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

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthBridge;
}
