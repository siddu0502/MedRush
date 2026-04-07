// Admin Users Management JavaScript for MedRush
class AdminUsers {
    constructor() {
        this.users = [];
        this.filteredUsers = [];
        this.selectedUsers = new Set();
        this.initializeUsers();
        this.setupEventListeners();
        this.loadUsersData();
    }

    initializeUsers() {
        console.log('Admin Users Management initialized');
    }

    setupEventListeners() {
        // Add user button
        const addUserBtn = document.getElementById('addUserBtn');
        if (addUserBtn) {
            addUserBtn.addEventListener('click', () => {
                this.showAddUserForm();
            });
        }

        // Cancel add button
        const cancelAddBtn = document.getElementById('cancelAddBtn');
        if (cancelAddBtn) {
            cancelAddBtn.addEventListener('click', () => {
                this.hideAddUserForm();
            });
        }

        // User form submission
        const userForm = document.getElementById('userForm');
        if (userForm) {
            userForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleUserSubmit(e);
            });
        }

        // Search functionality
        const searchInput = document.getElementById('userSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterUsers(e.target.value);
            });
        }

        // Filter controls
        const filterControls = document.querySelectorAll('#statusFilter, #roleFilter, #dateFilter');
        filterControls.forEach(select => {
            select.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Action buttons
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleUserAction(e.target.closest('tr'), e.target.closest('.action-btn'));
            });
        });

        // Export users button
        const exportUsersBtn = document.getElementById('exportUsersBtn');
        if (exportUsersBtn) {
            exportUsersBtn.addEventListener('click', () => {
                this.exportUsers();
            });
        }

        // Bulk email button
        const bulkEmailBtn = document.getElementById('bulkEmailBtn');
        if (bulkEmailBtn) {
            bulkEmailBtn.addEventListener('click', () => {
                this.showBulkEmailModal();
            });
        }

        // Select all checkbox
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                this.selectAllUsers(e.target.checked);
            });
        }

        // User checkboxes
        const userCheckboxes = document.querySelectorAll('.user-checkbox');
        userCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleUserSelection(e.target.value, e.target.checked);
            });
        });
    }

    loadUsersData() {
        // Mock users data
        this.users = [
            {
                id: 'USR-001',
                firstName: 'Rahul',
                lastName: 'Sharma',
                email: 'rahul.sharma@email.com',
                phone: '+91 9876543210',
                role: 'customer',
                status: 'active',
                orders: 24,
                joinedDate: '2026-03-15',
                lastActive: '2026-04-06'
            },
            {
                id: 'USR-002',
                firstName: 'Priya',
                lastName: 'Patel',
                email: 'priya.patel@email.com',
                phone: '+91 9876543211',
                role: 'customer',
                status: 'active',
                orders: 18,
                joinedDate: '2026-02-20',
                lastActive: '2026-04-05'
            },
            {
                id: 'USR-003',
                firstName: 'Amit',
                lastName: 'Kumar',
                email: 'amit.kumar@email.com',
                phone: '+91 9876543212',
                role: 'staff',
                status: 'active',
                orders: 0,
                joinedDate: '2026-01-10',
                lastActive: '2026-04-06'
            },
            {
                id: 'USR-004',
                firstName: 'Sneha',
                lastName: 'Reddy',
                email: 'sneha.reddy@email.com',
                phone: '+91 9876543213',
                role: 'customer',
                status: 'inactive',
                orders: 8,
                joinedDate: '2025-12-15',
                lastActive: '2026-03-20'
            },
            {
                id: 'USR-005',
                firstName: 'Vikram',
                lastName: 'Singh',
                email: 'vikram.singh@email.com',
                phone: '+91 9876543214',
                role: 'customer',
                status: 'blocked',
                orders: 15,
                joinedDate: '2025-11-20',
                lastActive: '2026-03-15'
            }
        ];

        this.filteredUsers = [...this.users];
        this.updateUsersTable();
        this.updateUserStats();
    }

    showAddUserForm() {
        const form = document.getElementById('addUserForm');
        if (form) {
            form.style.display = 'block';
            form.scrollIntoView({ behavior: 'smooth' });
        }
    }

    hideAddUserForm() {
        const form = document.getElementById('addUserForm');
        if (form) {
            form.style.display = 'none';
            form.reset();
        }
    }

    handleUserSubmit(e) {
        const formData = new FormData(e.target);
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
            this.showNotification('Passwords do not match', 'error');
            return;
        }

        const user = {
            id: 'USR' + String(this.users.length + 1).padStart(3, '0'),
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            role: formData.get('role'),
            status: formData.get('status'),
            orders: 0,
            joinedDate: new Date().toISOString().split('T')[0],
            lastActive: new Date().toISOString().split('T')[0]
        };

        this.users.push(user);
        this.filteredUsers = [...this.users];
        this.updateUsersTable();
        this.updateUserStats();
        this.hideAddUserForm();
        this.showNotification('User created successfully', 'success');
    }

    filterUsers(searchTerm) {
        if (!searchTerm) {
            this.filteredUsers = [...this.users];
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredUsers = this.users.filter(user =>
                `${user.firstName} ${user.lastName}`.toLowerCase().includes(term) ||
                user.email.toLowerCase().includes(term) ||
                user.phone.includes(term)
            );
        }
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.filteredUsers];

        // Status filter
        const statusFilter = document.getElementById('statusFilter').value;
        if (statusFilter) {
            filtered = filtered.filter(user => user.status === statusFilter);
        }

        // Role filter
        const roleFilter = document.getElementById('roleFilter').value;
        if (roleFilter) {
            filtered = filtered.filter(user => user.role === roleFilter);
        }

        // Date filter
        const dateFilter = document.getElementById('dateFilter').value;
        if (dateFilter) {
            filtered = this.filterByDate(filtered, dateFilter);
        }

        this.updateUsersTable(filtered);
    }

    filterByDate(users, filter) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        return users.filter(user => {
            const userDate = new Date(user.joinedDate);
            switch(filter) {
                case 'today':
                    return userDate.toDateString() === today.toDateString();
                case 'yesterday':
                    return userDate.toDateString() === yesterday.toDateString();
                case 'this-week':
                    return userDate >= weekAgo;
                case 'this-month':
                    return userDate >= monthAgo;
                default:
                    return true;
            }
        });
    }

    updateUsersTable(users = this.filteredUsers) {
        const tbody = document.querySelector('#usersTable tbody');
        if (!tbody) return;

        tbody.innerHTML = users.map(user => `
            <tr>
                <td>
                    <input type="checkbox" class="user-checkbox" value="${user.id}">
                </td>
                <td>
                    <div class="user-info">
                        <div class="user-avatar">
                            <i class="fas ${this.getUserIcon(user.role)}"></i>
                        </div>
                        <div class="user-details">
                            <strong>${user.firstName} ${user.lastName}</strong><br>
                            <small>ID: ${user.id}</small>
                        </div>
                    </div>
                </td>
                <td>
                    <div class="contact-info">
                        <small>${user.email}</small><br>
                        <small>${user.phone}</small>
                    </div>
                </td>
                <td>
                    <span class="role-badge ${user.role}">${this.formatRole(user.role)}</span>
                </td>
                <td>
                    <span class="status ${user.status}">${this.formatStatus(user.status)}</span>
                </td>
                <td>
                    <strong>${user.orders}</strong><br>
                    <small>orders</small>
                </td>
                <td>${this.formatDate(user.joinedDate)}<br><small>${this.getTimeAgo(user.joinedDate)}</small></td>
                <td>${this.formatDate(user.lastActive)}<br><small>${this.getTimeAgo(user.lastActive)}</small></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view-btn" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" title="Edit">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button class="action-btn email-btn" title="Email">
                            <i class="fas fa-envelope"></i>
                        </button>
                        <button class="action-btn ${user.status === 'blocked' ? 'unblock-btn' : 'block-btn'}" title="${user.status === 'blocked' ? 'Unblock' : 'Block'}">
                            <i class="fas ${user.status === 'blocked' ? 'fa-check' : 'fa-ban'}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Re-attach event listeners to new action buttons
        this.attachActionListeners();
    }

    getUserIcon(role) {
        switch(role) {
            case 'admin': return 'fa-user-shield';
            case 'staff': return 'fa-user-tie';
            default: return 'fa-user';
        }
    }

    formatRole(role) {
        return role.charAt(0).toUpperCase() + role.slice(1);
    }

    formatStatus(status) {
        return status.charAt(0).toUpperCase() + status.slice(1);
    }

    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
    }

    getTimeAgo(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays < 7) return `${diffDays} days ago`;
        if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
        return `${Math.floor(diffDays / 365)} years ago`;
    }

    attachActionListeners() {
        const actionBtns = document.querySelectorAll('#usersTable .action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleUserAction(e.target.closest('tr'), e.target.closest('.action-btn'));
            });
        });

        const userCheckboxes = document.querySelectorAll('.user-checkbox');
        userCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleUserSelection(e.target.value, e.target.checked);
            });
        });
    }

    handleUserAction(row, actionBtn) {
        const userId = row.querySelector('td:nth-child(2) .user-details small').textContent.replace('ID: ', '');
        const user = this.users.find(u => u.id === userId);
        
        if (!user) return;

        if (actionBtn.classList.contains('view-btn')) {
            this.viewUserDetails(user);
        } else if (actionBtn.classList.contains('edit-btn')) {
            this.editUser(user);
        } else if (actionBtn.classList.contains('email-btn')) {
            this.emailUser(user);
        } else if (actionBtn.classList.contains('block-btn')) {
            this.blockUser(user);
        } else if (actionBtn.classList.contains('unblock-btn')) {
            this.unblockUser(user);
        }
    }

    viewUserDetails(user) {
        console.log('View user details:', user);
        this.showNotification(`Viewing details for ${user.firstName} ${user.lastName}`, 'info');
    }

    editUser(user) {
        console.log('Edit user:', user);
        this.showNotification(`Editing ${user.firstName} ${user.lastName}`, 'info');
    }

    emailUser(user) {
        window.location.href = `mailto:${user.email}`;
        this.showNotification(`Opening email client for ${user.email}`, 'info');
    }

    blockUser(user) {
        if (confirm(`Are you sure you want to block ${user.firstName} ${user.lastName}?`)) {
            user.status = 'blocked';
            this.updateUsersTable();
            this.updateUserStats();
            this.showNotification(`${user.firstName} ${user.lastName} has been blocked`, 'success');
        }
    }

    unblockUser(user) {
        if (confirm(`Are you sure you want to unblock ${user.firstName} ${user.lastName}?`)) {
            user.status = 'active';
            this.updateUsersTable();
            this.updateUserStats();
            this.showNotification(`${user.firstName} ${user.lastName} has been unblocked`, 'success');
        }
    }

    selectAllUsers(checked) {
        const checkboxes = document.querySelectorAll('.user-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
            this.toggleUserSelection(checkbox.value, checked);
        });
    }

    toggleUserSelection(userId, selected) {
        if (selected) {
            this.selectedUsers.add(userId);
        } else {
            this.selectedUsers.delete(userId);
        }
    }

    showBulkEmailModal() {
        if (this.selectedUsers.size === 0) {
            this.showNotification('Please select users to email', 'warning');
            return;
        }

        const subject = prompt('Enter email subject:');
        if (subject) {
            this.sendBulkEmail(subject);
        }
    }

    sendBulkEmail(subject) {
        const selectedUsersList = Array.from(this.selectedUsers).map(userId => {
            const user = this.users.find(u => u.id === userId);
            return user ? user.email : '';
        }).filter(email => email);

        if (selectedUsersList.length > 0) {
            window.location.href = `mailto:${selectedUsersList.join(',')}?subject=${encodeURIComponent(subject)}`;
            this.showNotification(`Email opened for ${selectedUsersList.length} users`, 'success');
        }
    }

    updateUserStats() {
        const stats = {
            total: this.users.length,
            active: this.users.filter(u => u.status === 'active').length,
            newThisMonth: this.users.filter(u => {
                const joinedDate = new Date(u.joinedDate);
                const thisMonth = new Date();
                return joinedDate.getMonth() === thisMonth.getMonth() && 
                       joinedDate.getFullYear() === thisMonth.getFullYear();
            }).length,
            blocked: this.users.filter(u => u.status === 'blocked').length
        };

        // Update stat cards
        const statNumbers = document.querySelectorAll('.stat-number');
        const values = [stats.total, stats.active, stats.newThisMonth, stats.blocked];
        
        statNumbers.forEach((element, index) => {
            if (values[index] !== undefined) {
                element.textContent = values[index];
            }
        });
    }

    exportUsers() {
        const csv = this.convertUsersToCSV();
        this.downloadFile('users-export.csv', csv);
        this.showNotification('Users exported successfully', 'success');
    }

    convertUsersToCSV() {
        let csv = 'ID,First Name,Last Name,Email,Phone,Role,Status,Orders,Joined Date,Last Active\n';
        
        this.users.forEach(user => {
            csv += `${user.id},${user.firstName},${user.lastName},${user.email},${user.phone},${user.role},${user.status},${user.orders},${user.joinedDate},${user.lastActive}\n`;
        });
        
        return csv;
    }

    downloadFile(filename, content) {
        const blob = new Blob([content], { type: 'text/csv' });
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

// Initialize admin users when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminUsers = new AdminUsers();
});

// Export for use in other files
window.AdminUsers = AdminUsers;
