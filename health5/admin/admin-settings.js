// Admin Settings JavaScript for MedRush
class AdminSettings {
    constructor() {
        this.settings = {};
        this.initializeSettings();
        this.setupEventListeners();
        this.loadSettings();
    }

    initializeSettings() {
        console.log('Admin Settings initialized');
    }

    setupEventListeners() {
        // Tab navigation
        const tabBtns = document.querySelectorAll('.tab-btn');
        tabBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchTab(e.target.dataset.tab);
            });
        });

        // Save settings button
        const saveSettingsBtn = document.getElementById('saveSettingsBtn');
        if (saveSettingsBtn) {
            saveSettingsBtn.addEventListener('click', () => {
                this.saveAllSettings();
            });
        }

        // Reset button
        const resetBtn = document.getElementById('resetBtn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetToDefault();
            });
        }

        // Payment method checkboxes
        const paymentMethodCheckboxes = document.querySelectorAll('input[name="paymentMethod"]');
        paymentMethodCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.togglePaymentDetails(e.target.value, e.target.checked);
            });
        });

        // Shipping type radio buttons
        const shippingTypeRadios = document.querySelectorAll('input[name="shippingType"]');
        shippingTypeRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                this.toggleShippingDetails(e.target.value);
            });
        });

        // Backup now button
        const backupNowBtn = document.getElementById('backupNowBtn');
        if (backupNowBtn) {
            backupNowBtn.addEventListener('click', () => {
                this.createBackup();
            });
        }

        // Restore backup button
        const restoreBtn = document.getElementById('restoreBtn');
        if (restoreBtn) {
            restoreBtn.addEventListener('click', () => {
                this.restoreBackup();
            });
        }

        // Backup action buttons
        const backupActionBtns = document.querySelectorAll('.backup-item .btn');
        backupActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleBackupAction(e.target);
            });
        });
    }

    loadSettings() {
        // Load settings from localStorage (mock implementation)
        this.settings = {
            general: {
                siteName: 'MedRush',
                siteDescription: 'Your trusted online healthcare platform',
                contactEmail: 'support@medrush.com',
                contactPhone: '+91 8500333358',
                address: '123 Health Street, Medical City, MC 12345, India',
                currency: 'INR',
                timezone: 'Asia/Kolkata',
                maintenanceMode: false
            },
            payment: {
                methods: ['cod', 'card', 'upi'],
                cod: { minAmount: 100, maxAmount: 10000 },
                card: { provider: 'razorpay' },
                upi: { apps: ['gpay', 'phonepe', 'paytm'] },
                taxRate: 18
            },
            shipping: {
                type: 'free',
                freeShippingMinOrder: 500,
                flatShippingRate: 50,
                deliveryTime: '3-5 business days',
                expressDeliveryTime: '1-2 business days',
                expressDeliveryCharge: 100
            },
            email: {
                smtpHost: '',
                smtpPort: 587,
                smtpUsername: '',
                smtpPassword: '',
                fromEmail: 'noreply@medrush.com',
                fromName: 'MedRush',
                templates: ['order_confirmation', 'shipping_notification', 'delivery_confirmation', 'password_reset']
            },
            security: {
                twoFactorAuth: true,
                sessionTimeout: 30,
                passwordPolicy: ['min_length', 'uppercase', 'lowercase', 'number'],
                maxLoginAttempts: 5,
                lockoutDuration: 15
            },
            backup: {
                autoBackup: true,
                frequency: 'daily',
                backupTime: '02:00',
                retention: 30
            }
        };

        this.populateSettingsForms();
    }

    populateSettingsForms() {
        // Populate general settings
        this.populateGeneralSettings();
        
        // Populate payment settings
        this.populatePaymentSettings();
        
        // Populate shipping settings
        this.populateShippingSettings();
        
        // Populate email settings
        this.populateEmailSettings();
        
        // Populate security settings
        this.populateSecuritySettings();
        
        // Populate backup settings
        this.populateBackupSettings();
    }

    populateGeneralSettings() {
        const general = this.settings.general;
        
        document.getElementById('siteName').value = general.siteName;
        document.getElementById('siteDescription').value = general.siteDescription;
        document.getElementById('contactEmail').value = general.contactEmail;
        document.getElementById('contactPhone').value = general.contactPhone;
        document.getElementById('address').value = general.address;
        document.getElementById('currency').value = general.currency;
        document.getElementById('timezone').value = general.timezone;
        document.getElementById('maintenanceMode').checked = general.maintenanceMode;
    }

    populatePaymentSettings() {
        const payment = this.settings.payment;
        
        // Set payment method checkboxes
        payment.methods.forEach(method => {
            const checkbox = document.querySelector(`input[name="paymentMethod"][value="${method}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        // Set COD details
        document.getElementById('codMinAmount').value = payment.cod.minAmount;
        document.getElementById('codMaxAmount').value = payment.cod.maxAmount;
        
        // Set card provider
        document.getElementById('cardProvider').value = payment.card.provider;
        
        // Set UPI apps
        payment.upi.apps.forEach(app => {
            const checkbox = document.querySelector(`input[name="upiApp"][value="${app}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        // Set tax rate
        document.getElementById('taxRate').value = payment.taxRate;
    }

    populateShippingSettings() {
        const shipping = this.settings.shipping;
        
        // Set shipping type
        const shippingRadio = document.querySelector(`input[name="shippingType"][value="${shipping.type}"]`);
        if (shippingRadio) shippingRadio.checked = true;
        
        // Set shipping details
        document.getElementById('freeShippingMinOrder').value = shipping.freeShippingMinOrder;
        document.getElementById('flatShippingRate').value = shipping.flatShippingRate;
        document.getElementById('deliveryTime').value = shipping.deliveryTime;
        document.getElementById('expressDeliveryTime').value = shipping.expressDeliveryTime;
        document.getElementById('expressDeliveryCharge').value = shipping.expressDeliveryCharge;
    }

    populateEmailSettings() {
        const email = this.settings.email;
        
        document.getElementById('smtpHost').value = email.smtpHost;
        document.getElementById('smtpPort').value = email.smtpPort;
        document.getElementById('smtpUsername').value = email.smtpUsername;
        document.getElementById('smtpPassword').value = email.smtpPassword;
        document.getElementById('fromEmail').value = email.fromEmail;
        document.getElementById('fromName').value = email.fromName;
        
        // Set email templates
        email.templates.forEach(template => {
            const checkbox = document.querySelector(`input[name="emailTemplate"][value="${template}"]`);
            if (checkbox) checkbox.checked = true;
        });
    }

    populateSecuritySettings() {
        const security = this.settings.security;
        
        document.getElementById('sessionTimeout').value = security.sessionTimeout;
        document.getElementById('loginAttempts').value = security.maxLoginAttempts;
        document.getElementById('lockoutDuration').value = security.lockoutDuration;
        
        // Set password policy
        security.passwordPolicy.forEach(rule => {
            const checkbox = document.querySelector(`input[name="passwordRule"][value="${rule}"]`);
            if (checkbox) checkbox.checked = true;
        });
        
        document.getElementById('2fa').checked = security.twoFactorAuth;
    }

    populateBackupSettings() {
        const backup = this.settings.backup;
        
        document.getElementById('autoBackup').checked = backup.autoBackup;
        document.getElementById('backupFrequency').value = backup.frequency;
        document.getElementById('backupTime').value = backup.backupTime;
        document.getElementById('backupRetention').value = backup.retention;
    }

    switchTab(tabName) {
        // Remove active class from all tabs and contents
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        // Add active class to selected tab and content
        document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    togglePaymentDetails(method, checked) {
        const detailsElement = document.querySelector(`.payment-method input[value="${method}"]`).closest('.payment-method').querySelector('.payment-details');
        if (detailsElement) {
            detailsElement.style.display = checked ? 'block' : 'none';
        }
    }

    toggleShippingDetails(type) {
        // Hide all shipping details
        document.querySelectorAll('.shipping-details').forEach(detail => {
            detail.style.display = 'none';
        });
        
        // Show selected shipping details
        const selectedDetails = document.querySelector(`.shipping-method input[value="${type}"]`).closest('.shipping-method').querySelector('.shipping-details');
        if (selectedDetails) {
            selectedDetails.style.display = 'block';
        }
    }

    saveAllSettings() {
        // Collect all form data
        this.collectFormData();
        
        // Save to localStorage (mock implementation)
        localStorage.setItem('adminSettings', JSON.stringify(this.settings));
        
        this.showNotification('Settings saved successfully', 'success');
    }

    collectFormData() {
        // Collect general settings
        this.settings.general = {
            siteName: document.getElementById('siteName').value,
            siteDescription: document.getElementById('siteDescription').value,
            contactEmail: document.getElementById('contactEmail').value,
            contactPhone: document.getElementById('contactPhone').value,
            address: document.getElementById('address').value,
            currency: document.getElementById('currency').value,
            timezone: document.getElementById('timezone').value,
            maintenanceMode: document.getElementById('maintenanceMode').checked
        };
        
        // Collect payment settings
        const paymentMethods = Array.from(document.querySelectorAll('input[name="paymentMethod"]:checked')).map(cb => cb.value);
        const upiApps = Array.from(document.querySelectorAll('input[name="upiApp"]:checked')).map(cb => cb.value);
        
        this.settings.payment = {
            methods: paymentMethods,
            cod: {
                minAmount: parseInt(document.getElementById('codMinAmount').value),
                maxAmount: parseInt(document.getElementById('codMaxAmount').value)
            },
            card: {
                provider: document.getElementById('cardProvider').value
            },
            upi: {
                apps: upiApps
            },
            taxRate: parseFloat(document.getElementById('taxRate').value)
        };
        
        // Collect shipping settings
        const shippingType = document.querySelector('input[name="shippingType"]:checked').value;
        this.settings.shipping = {
            type: shippingType,
            freeShippingMinOrder: parseInt(document.getElementById('freeShippingMinOrder').value),
            flatShippingRate: parseInt(document.getElementById('flatShippingRate').value),
            deliveryTime: document.getElementById('deliveryTime').value,
            expressDeliveryTime: document.getElementById('expressDeliveryTime').value,
            expressDeliveryCharge: parseInt(document.getElementById('expressDeliveryCharge').value)
        };
        
        // Collect email settings
        const emailTemplates = Array.from(document.querySelectorAll('input[name="emailTemplate"]:checked')).map(cb => cb.value);
        
        this.settings.email = {
            smtpHost: document.getElementById('smtpHost').value,
            smtpPort: parseInt(document.getElementById('smtpPort').value),
            smtpUsername: document.getElementById('smtpUsername').value,
            smtpPassword: document.getElementById('smtpPassword').value,
            fromEmail: document.getElementById('fromEmail').value,
            fromName: document.getElementById('fromName').value,
            templates: emailTemplates
        };
        
        // Collect security settings
        const passwordPolicy = Array.from(document.querySelectorAll('input[name="passwordRule"]:checked')).map(cb => cb.value);
        
        this.settings.security = {
            twoFactorAuth: document.getElementById('2fa').checked,
            sessionTimeout: parseInt(document.getElementById('sessionTimeout').value),
            passwordPolicy: passwordPolicy,
            maxLoginAttempts: parseInt(document.getElementById('loginAttempts').value),
            lockoutDuration: parseInt(document.getElementById('lockoutDuration').value)
        };
        
        // Collect backup settings
        this.settings.backup = {
            autoBackup: document.getElementById('autoBackup').checked,
            frequency: document.getElementById('backupFrequency').value,
            backupTime: document.getElementById('backupTime').value,
            retention: parseInt(document.getElementById('backupRetention').value)
        };
    }

    resetToDefault() {
        if (confirm('Are you sure you want to reset all settings to default values? This action cannot be undone.')) {
            // Reset to default values
            this.loadSettings();
            this.populateSettingsForms();
            this.showNotification('Settings reset to default values', 'success');
        }
    }

    createBackup() {
        this.showNotification('Creating backup...', 'info');
        
        // Simulate backup creation
        setTimeout(() => {
            const backupData = {
                timestamp: new Date().toISOString(),
                settings: this.settings,
                version: '1.0.0'
            };
            
            const filename = `backup_${new Date().toISOString().split('T')[0].replace(/-/g, '_')}_${new Date().toTimeString().split(' ')[0].replace(/:/g, '_')}.json`;
            this.downloadFile(filename, JSON.stringify(backupData, null, 2));
            
            this.showNotification('Backup created successfully', 'success');
        }, 2000);
    }

    restoreBackup() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.addEventListener('change', (e) => {
            this.handleBackupRestore(e.target.files[0]);
        });
        input.click();
    }

    handleBackupRestore(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const backupData = JSON.parse(e.target.result);
                
                if (backupData.settings) {
                    this.settings = backupData.settings;
                    this.populateSettingsForms();
                    this.showNotification('Backup restored successfully', 'success');
                } else {
                    this.showNotification('Invalid backup file', 'error');
                }
            } catch (error) {
                this.showNotification('Error reading backup file', 'error');
            }
        };
        reader.readAsText(file);
    }

    handleBackupAction(button) {
        const action = button.textContent.trim();
        const backupItem = button.closest('.backup-item');
        const filename = backupItem.querySelector('strong').textContent;
        
        switch(action) {
            case 'Download':
                this.downloadBackup(filename);
                break;
            case 'Restore':
                this.restoreSpecificBackup(filename);
                break;
            case 'Delete':
                this.deleteBackup(filename, backupItem);
                break;
        }
    }

    downloadBackup(filename) {
        this.showNotification(`Downloading ${filename}...`, 'info');
        // In a real application, this would download the actual backup file
    }

    restoreSpecificBackup(filename) {
        if (confirm(`Are you sure you want to restore from ${filename}?`)) {
            this.showNotification(`Restoring from ${filename}...`, 'info');
            // In a real application, this would restore from the specific backup
        }
    }

    deleteBackup(filename, backupItem) {
        if (confirm(`Are you sure you want to delete ${filename}?`)) {
            backupItem.remove();
            this.showNotification(`${filename} deleted`, 'success');
        }
    }

    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'application/json' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `alert alert-${type}`;
        notification.textContent = message;
        
        const container = document.querySelector('.admin-content');
        if (container) {
            container.insertBefore(notification, container.firstChild);
            
            setTimeout(() => {
                notification.remove();
            }, 3000);
        }
    }
}

// Initialize admin settings when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminSettings = new AdminSettings();
});

// Export for use in other files
window.AdminSettings = AdminSettings;
