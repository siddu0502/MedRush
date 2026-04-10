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
        // Check if user is already logged in
        const savedUser = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('currentUser');
        
        if (savedUser === 'true' && userData) {
            this.isLoggedIn = true;
            this.currentUser = JSON.parse(userData);
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
        const userData = {
            phone: this.currentPhoneNumber,
            name: `User ${this.currentPhoneNumber.slice(-4)}`,
            loginTime: new Date().toISOString(),
            loginCount: 1
        };

        // Save user data and login state
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
        // Clear session
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
