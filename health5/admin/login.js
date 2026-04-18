// Admin Login JavaScript - MedRush

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

// Admin credentials (in production, this should be server-side)
const ADMIN_CREDENTIALS = [
    { username: 'admin', password: 'admin123', role: 'admin', name: 'Admin User' },
    { username: 'manager', password: 'manager123', role: 'manager', name: 'Manager User' },
    { username: 'staff', password: 'staff123', role: 'staff', name: 'Staff User' }
];

// Check if user is already logged in
document.addEventListener('DOMContentLoaded', function() {
    checkExistingLogin();
    setupRememberMe();
});

function checkExistingLogin() {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    const savedUsername = localStorage.getItem('adminUsername');
    
    if (isLoggedIn === 'true' && savedUsername) {
        // User is already logged in, redirect to dashboard
        window.location.href = 'index.html';
    }
}

function setupRememberMe() {
    const savedUsername = localStorage.getItem('rememberedUsername');
    if (savedUsername) {
        document.getElementById('username').value = savedUsername;
        document.getElementById('remember').checked = true;
    }
}

function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const rememberMe = document.getElementById('remember').checked;
    
    // Validate inputs
    if (!username || !password) {
        showNotification('Please enter both username and password', 'error');
        return;
    }
    
    // Show loading state
    const loginBtn = document.querySelector('.login-btn');
    const originalText = loginBtn.innerHTML;
    loginBtn.classList.add('loading');
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing In...';
    
    // Use AuthBridge for authentication
    authBridge.adminLogin({ username, password }, (result) => {
        // Reset button state
        loginBtn.classList.remove('loading');
        loginBtn.innerHTML = originalText;
        
        if (result.success) {
            // Successful login
            handleSuccessfulLogin(result.data, rememberMe);
        } else {
            // Failed login
            handleFailedLogin();
        }
    });
}

function handleSuccessfulLogin(authData, rememberMe) {
    // Save login state for backward compatibility
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminUsername', authData.user);
    localStorage.setItem('adminRole', authData.role);
    localStorage.setItem('adminName', getAdminName(authData.user));
    localStorage.setItem('loginTime', new Date().toISOString());
    
    // Handle remember me
    if (rememberMe) {
        localStorage.setItem('rememberedUsername', authData.user);
    } else {
        localStorage.removeItem('rememberedUsername');
    }
    
    // Show success message
    const userName = getAdminName(authData.user);
    showNotification(`Welcome back, ${userName}!`, 'success');
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
}

function getAdminName(username) {
    const names = {
        'admin': 'Admin User',
        'manager': 'Manager User',
        'staff': 'Staff User'
    };
    return names[username] || username;
}

function handleFailedLogin() {
    // Clear password field
    document.getElementById('password').value = '';
    
    // Show error message
    showNotification('Invalid username or password. Please try again.', 'error');
    
    // Add shake animation to form
    const form = document.querySelector('.login-card');
    form.style.animation = 'shake 0.5s';
    setTimeout(() => {
        form.style.animation = '';
    }, 500);
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

function showNotification(message, type = 'info') {
    const container = document.getElementById('notification-container');
    
    // Remove existing notifications
    const existingNotifications = container.querySelectorAll('.notification');
    existingNotifications.forEach(notif => notif.remove());
    
    // Create new notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        font-weight: 500;
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
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Handle forgot password
document.querySelector('.forgot-password').addEventListener('click', function(e) {
    e.preventDefault();
    showNotification('Please contact your system administrator to reset your password.', 'info');
});

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Handle Enter key in password field
document.getElementById('password').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        handleLogin(e);
    }
});

// Add input validation
document.getElementById('username').addEventListener('input', function(e) {
    const value = e.target.value;
    if (value.length > 0) {
        e.target.style.borderColor = 'var(--primary-color)';
    } else {
        e.target.style.borderColor = 'var(--border-color)';
    }
});

document.getElementById('password').addEventListener('input', function(e) {
    const value = e.target.value;
    if (value.length > 0) {
        e.target.style.borderColor = 'var(--primary-color)';
    } else {
        e.target.style.borderColor = 'var(--border-color)';
    }
});
