// Users Management JavaScript - MedRush Admin

let users = [];

document.addEventListener('DOMContentLoaded', function() {
    loadUsers();
});

function loadUsers() {
    users = [
        { id: 'USR-001', firstName: 'Rahul', lastName: 'Sharma', email: 'rahul.sharma@email.com', phone: '+91 9876543210', role: 'customer', status: 'active', orders: 24, joinedDate: '2026-03-15' },
        { id: 'USR-002', firstName: 'Priya', lastName: 'Patel', email: 'priya.patel@email.com', phone: '+91 9876543211', role: 'customer', status: 'active', orders: 18, joinedDate: '2026-02-20' },
        { id: 'USR-003', firstName: 'Amit', lastName: 'Kumar', email: 'amit.kumar@email.com', phone: '+91 9876543212', role: 'staff', status: 'active', orders: 0, joinedDate: '2026-01-10' }
    ];
    updateUsersTable();
}

function addUser(event) {
    event.preventDefault();
    
    const user = {
        id: 'USR-' + String(users.length + 1).padStart(3, '0'),
        firstName: document.getElementById('userFirstName').value,
        lastName: document.getElementById('userLastName').value,
        email: document.getElementById('userEmail').value,
        phone: document.getElementById('userPhone').value,
        role: document.getElementById('userRole').value,
        status: document.getElementById('userStatus').value,
        orders: 0,
        joinedDate: new Date().toISOString().split('T')[0]
    };
    
    users.push(user);
    updateUsersTable();
    showNotification('User added successfully', 'success');
    event.target.reset();
}

function viewUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        showNotification(`Viewing user: ${user.firstName} ${user.lastName}`, 'info');
    }
}

function editUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        document.getElementById('userFirstName').value = user.firstName;
        document.getElementById('userLastName').value = user.lastName;
        document.getElementById('userEmail').value = user.email;
        document.getElementById('userPhone').value = user.phone;
        document.getElementById('userRole').value = user.role;
        document.getElementById('userStatus').value = user.status;
        
        document.getElementById('manage-users').scrollIntoView({ behavior: 'smooth' });
        showNotification('Edit user details and update', 'info');
    }
}

function emailUser(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        window.location.href = `mailto:${user.email}`;
        showNotification(`Opening email client for ${user.email}`, 'info');
    }
}

function searchUsers() {
    const searchTerm = document.getElementById('searchUser').value.toLowerCase();
    const filteredUsers = users.filter(user => 
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm) ||
        user.phone.includes(searchTerm)
    );
    updateUsersTable(filteredUsers);
}

function filterUsers() {
    const role = document.getElementById('filterRole').value;
    const status = document.getElementById('filterUserStatus').value;
    
    let filteredUsers = users;
    
    if (role) {
        filteredUsers = filteredUsers.filter(u => u.role === role);
    }
    
    if (status) {
        filteredUsers = filteredUsers.filter(u => u.status === status);
    }
    
    updateUsersTable(filteredUsers);
}

function updateUsersTable(usersToShow = users) {
    const tbody = document.getElementById('usersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = usersToShow.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>
                <div class="user-info">
                    <div class="user-avatar-small">
                        <i class="fas ${getUserIcon(user.role)}"></i>
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
                <span class="role-badge ${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span>
            </td>
            <td><span class="status ${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></td>
            <td><strong>${user.orders}</strong></td>
            <td>
                <div class="date-info">
                    ${user.joinedDate}<br>
                    <small>${getTimeAgo(user.joinedDate)}</small>
                </div>
            </td>
            <td>
                <button class="action-btn" title="View" onclick="viewUser('${user.id}')"><i class="fas fa-eye"></i></button>
                <button class="action-btn" title="Edit" onclick="editUser('${user.id}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn" title="Email" onclick="emailUser('${user.id}')"><i class="fas fa-envelope"></i></button>
            </td>
        </tr>
    `).join('');
}

function getUserIcon(role) {
    switch(role) {
        case 'admin': return 'fa-user-shield';
        case 'staff': return 'fa-user-tie';
        default: return 'fa-user';
    }
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
}

function resetUserForm() {
    document.querySelector('#manage-users form').reset();
}

function exportUsers() {
    showNotification('Users exported successfully', 'success');
}

function bulkEmail() {
    showNotification('Bulk email feature coming soon', 'info');
}

function bulkDelete() {
    if (confirm('Are you sure you want to delete selected users?')) {
        showNotification('Selected users deleted', 'success');
    }
}
