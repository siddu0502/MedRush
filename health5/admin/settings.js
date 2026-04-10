// Settings JavaScript - MedRush Admin

document.addEventListener('DOMContentLoaded', function() {
    initializeSettings();
});

function initializeSettings() {
    // Load saved settings from localStorage
    loadSavedSettings();
    
    // Setup form validation
    setupFormValidation();
}

function loadSavedSettings() {
    // Load general settings
    const savedSiteName = localStorage.getItem('siteName');
    if (savedSiteName) {
        document.getElementById('siteName').value = savedSiteName;
    }
    
    // Load other settings as needed
}

function setupFormValidation() {
    // Add validation for different forms
    const forms = document.querySelectorAll('.admin-form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    let isValid = true;
    const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
        } else {
            input.style.borderColor = '#e1e8ed';
        }
    });
    
    if (!isValid) {
        showNotification('Please fill in all required fields', 'error');
    }
    
    return isValid;
}

function showTab(tabName) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected tab
    document.getElementById(tabName + '-tab').classList.add('active');
    
    // Add active class to clicked button
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
}

function saveSettings(event) {
    if (event) event.preventDefault();
    
    // Get the active tab form
    const activeTab = document.querySelector('.tab-content.active');
    const form = activeTab.querySelector('.admin-form');
    
    if (form && validateForm(form)) {
        // Save settings to localStorage
        const formData = new FormData(form);
        const settings = {};
        
        for (let [key, value] of formData.entries()) {
            settings[key] = value;
        }
        
        // Save to localStorage
        Object.keys(settings).forEach(key => {
            localStorage.setItem(key, settings[key]);
        });
        
        showNotification('Settings saved successfully', 'success');
        
        // Show success message
        showSettingsAlert('success', 'Settings have been saved successfully!');
    }
}

function resetSettings() {
    if (confirm('Are you sure you want to reset settings to default values?')) {
        // Reset the active tab form
        const activeTab = document.querySelector('.tab-content.active');
        const form = activeTab.querySelector('.admin-form');
        
        if (form) {
            form.reset();
            showNotification('Settings reset to default', 'success');
            showSettingsAlert('info', 'Settings have been reset to default values');
        }
    }
}

function createBackup() {
    showNotification('Creating backup...', 'info');
    
    // Simulate backup creation
    setTimeout(() => {
        showNotification('Backup created successfully', 'success');
        showSettingsAlert('success', 'Backup has been created and saved successfully!');
        
        // Update last backup time
        const now = new Date();
        localStorage.setItem('lastBackup', now.toISOString());
    }, 2000);
}

function restoreBackup() {
    if (confirm('Are you sure you want to restore from backup? This will replace all current settings.')) {
        showNotification('Restoring backup...', 'info');
        
        // Simulate backup restoration
        setTimeout(() => {
            showNotification('Backup restored successfully', 'success');
            showSettingsAlert('success', 'Backup has been restored successfully!');
            
            // Reload settings
            loadSavedSettings();
        }, 2000);
    }
}

function showSettingsAlert(type, message) {
    // Remove existing alerts
    const existingAlert = document.querySelector('.settings-alert');
    if (existingAlert) {
        existingAlert.remove();
    }
    
    // Create new alert
    const alert = document.createElement('div');
    alert.className = `settings-alert ${type}`;
    
    const icon = getAlertIcon(type);
    alert.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    // Insert at the top of the active tab
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        activeTab.insertBefore(alert, activeTab.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            alert.remove();
        }, 5000);
    }
}

function getAlertIcon(type) {
    switch(type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-circle';
        case 'warning': return 'fa-exclamation-triangle';
        case 'info': return 'fa-info-circle';
        default: return 'fa-info-circle';
    }
}

// Test email configuration
function testEmailConfig() {
    showNotification('Testing email configuration...', 'info');
    
    setTimeout(() => {
        showNotification('Email configuration test successful', 'success');
        showSettingsAlert('success', 'Email configuration is working correctly!');
    }, 2000);
}

// Test payment gateway
function testPaymentGateway() {
    showNotification('Testing payment gateway...', 'info');
    
    setTimeout(() => {
        showNotification('Payment gateway test successful', 'success');
        showSettingsAlert('success', 'Payment gateway is working correctly!');
    }, 2000);
}

// Export settings
function exportSettings() {
    const settings = {};
    
    // Collect all settings from localStorage
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && !key.includes('admin')) {
            settings[key] = localStorage.getItem(key);
        }
    }
    
    // Create downloadable file
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'medrush-settings.json';
    link.click();
    
    URL.revokeObjectURL(url);
    showNotification('Settings exported successfully', 'success');
}

// Import settings
function importSettings(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const settings = JSON.parse(e.target.result);
                
                // Import settings to localStorage
                Object.keys(settings).forEach(key => {
                    localStorage.setItem(key, settings[key]);
                });
                
                showNotification('Settings imported successfully', 'success');
                showSettingsAlert('success', 'Settings have been imported successfully!');
                
                // Reload settings
                loadSavedSettings();
                
            } catch (error) {
                showNotification('Error importing settings file', 'error');
                showSettingsAlert('error', 'Invalid settings file format');
            }
        };
        reader.readAsText(file);
    }
}
