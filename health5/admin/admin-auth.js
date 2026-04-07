// Admin Authentication System for MedRush
class AdminAuth {
    constructor() {
        this.initializeAuth();
    }

    initializeAuth() {
        // Check if admin is logged in
        this.checkAuthStatus();
        
        // Setup logout functionality
        this.setupLogout();
        
        // Setup session management
        this.setupSessionManagement();
    }

    checkAuthStatus() {
        const adminToken = localStorage.getItem('adminToken');
        const adminUser = localStorage.getItem('adminUser');
        
        if (!adminToken || !adminUser) {
            // Redirect to admin login page
            this.redirectToLogin();
        } else {
            // Validate token (in real app, this would be an API call)
            this.validateToken(adminToken);
        }
    }

    validateToken(token) {
        // Simulate token validation
        try {
            const tokenData = JSON.parse(atob(token.split('.')[1]));
            const currentTime = Date.now() / 1000;
            
            if (tokenData.exp < currentTime) {
                // Token expired
                this.logout();
                this.redirectToLogin();
            } else {
                // Token valid, update admin info
                this.updateAdminInfo();
            }
        } catch (error) {
            // Invalid token
            this.logout();
            this.redirectToLogin();
        }
    }

    updateAdminInfo() {
        const adminUser = JSON.parse(localStorage.getItem('adminUser'));
        const adminInfoElements = document.querySelectorAll('.admin-info h3');
        const adminEmailElements = document.querySelectorAll('.admin-info p');
        
        adminInfoElements.forEach(element => {
            element.textContent = adminUser.name || 'Admin User';
        });
        
        adminEmailElements.forEach(element => {
            element.textContent = adminUser.email || 'admin@medrush.com';
        });
    }

    setupLogout() {
        const logoutBtn = document.getElementById('adminLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', (e) => {
                e.preventDefault();
                this.logout();
                this.redirectToLogin();
            });
        }
    }

    logout() {
        // Clear admin session
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        localStorage.removeItem('adminSession');
        
        // Show logout message
        this.showNotification('Logged out successfully', 'success');
    }

    redirectToLogin() {
        // Redirect to admin login page
        window.location.href = 'admin-login.html';
    }

    setupSessionManagement() {
        // Check session every minute
        setInterval(() => {
            this.checkSessionTimeout();
        }, 60000);

        // Setup activity tracking
        this.trackUserActivity();
    }

    checkSessionTimeout() {
        const sessionStart = localStorage.getItem('adminSession');
        const sessionTimeout = 30 * 60 * 1000; // 30 minutes
        
        if (sessionStart) {
            const elapsed = Date.now() - parseInt(sessionStart);
            if (elapsed > sessionTimeout) {
                this.showSessionTimeoutWarning();
            }
        }
    }

    showSessionTimeoutWarning() {
        const warning = confirm('Your session is about to expire. Do you want to extend it?');
        if (warning) {
            this.extendSession();
        } else {
            this.logout();
            this.redirectToLogin();
        }
    }

    extendSession() {
        localStorage.setItem('adminSession', Date.now().toString());
        this.showNotification('Session extended', 'success');
    }

    trackUserActivity() {
        const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
        
        events.forEach(event => {
            document.addEventListener(event, () => {
                this.extendSession();
            });
        });
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `alert alert-${type}`;
        notification.textContent = message;
        
        // Add to page
        const container = document.querySelector('.admin-content');
        if (container) {
            container.insertBefore(notification, container.firstChild);
            
            // Auto remove after 3 seconds
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }

    // Static method for login
    static login(credentials) {
        // Simulate API call for admin login
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Mock validation
                if (credentials.email === 'admin@medrush.com' && credentials.password === 'admin123') {
                    // Generate mock token
                    const token = this.generateToken();
                    const user = {
                        id: 1,
                        name: 'Admin User',
                        email: credentials.email,
                        role: 'admin'
                    };
                    
                    // Store in localStorage
                    localStorage.setItem('adminToken', token);
                    localStorage.setItem('adminUser', JSON.stringify(user));
                    localStorage.setItem('adminSession', Date.now().toString());
                    
                    resolve({ success: true, token, user });
                } else {
                    reject(new Error('Invalid credentials'));
                }
            }, 1000);
        });
    }

    static generateToken() {
        // Generate mock JWT token
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
        const payload = btoa(JSON.stringify({
            sub: 1,
            name: 'Admin User',
            email: 'admin@medrush.com',
            role: 'admin',
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60) // 24 hours
        }));
        const signature = 'mock-signature';
        
        return `${header}.${payload}.${signature}`;
    }
}

// Initialize admin authentication when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminAuth = new AdminAuth();
});

// Export for use in other files
window.AdminAuth = AdminAuth;
