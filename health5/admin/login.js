// Admin Login JavaScript - MedRush

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
    
    // Simulate authentication delay
    setTimeout(() => {
        // Check credentials
        const user = ADMIN_CREDENTIALS.find(cred => 
            cred.username === username && cred.password === password
        );
        
        if (user) {
            // Successful login
            handleSuccessfulLogin(user, rememberMe);
        } else {
            // Failed login
            handleFailedLogin();
        }
        
        // Reset button state
        loginBtn.classList.remove('loading');
        loginBtn.innerHTML = originalText;
    }, 1500);
}

function handleSuccessfulLogin(user, rememberMe) {
    // Save login state
    localStorage.setItem('adminLoggedIn', 'true');
    localStorage.setItem('adminUsername', user.username);
    localStorage.setItem('adminRole', user.role);
    localStorage.setItem('adminName', user.name);
    localStorage.setItem('loginTime', new Date().toISOString());
    
    // Handle remember me
    if (rememberMe) {
        localStorage.setItem('rememberedUsername', user.username);
    } else {
        localStorage.removeItem('rememberedUsername');
    }
    
    // Show success message
    showNotification(`Welcome back, ${user.name}!`, 'success');
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1000);
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
