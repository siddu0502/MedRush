// Admin Orders Management JavaScript for MedRush
class AdminOrders {
    constructor() {
        this.orders = [];
        this.filteredOrders = [];
        this.selectedOrders = new Set();
        this.initializeOrders();
        this.setupEventListeners();
        this.loadOrdersData();
    }

    initializeOrders() {
        console.log('Admin Orders Management initialized');
    }

    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('orderSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterOrders(e.target.value);
            });
        }

        // Filter controls
        const filterControls = document.querySelectorAll('#statusFilter, #dateFilter, #paymentFilter');
        filterControls.forEach(select => {
            select.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Action buttons
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleOrderAction(e.target.closest('tr'), e.target.closest('.action-btn'));
            });
        });

        // Export orders button
        const exportOrdersBtn = document.getElementById('exportOrdersBtn');
        if (exportOrdersBtn) {
            exportOrdersBtn.addEventListener('click', () => {
                this.exportOrders();
            });
        }

        // Bulk update button
        const bulkUpdateBtn = document.getElementById('bulkUpdateBtn');
        if (bulkUpdateBtn) {
            bulkUpdateBtn.addEventListener('click', () => {
                this.showBulkUpdateModal();
            });
        }

        // Select all checkbox
        const selectAllCheckbox = document.getElementById('selectAll');
        if (selectAllCheckbox) {
            selectAllCheckbox.addEventListener('change', (e) => {
                this.selectAllOrders(e.target.checked);
            });
        }

        // Order checkboxes
        const orderCheckboxes = document.querySelectorAll('.order-checkbox');
        orderCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleOrderSelection(e.target.value, e.target.checked);
            });
        });

        // Modal close button
        const modalClose = document.getElementById('closeModal');
        if (modalClose) {
            modalClose.addEventListener('click', () => {
                this.closeOrderDetailsModal();
            });
        }
    }

    loadOrdersData() {
        // Mock orders data
        this.orders = [
            {
                id: 'ORD-001',
                customer: {
                    name: 'Rahul Sharma',
                    email: 'rahul.sharma@email.com',
                    phone: '+91 9876543210'
                },
                medicines: [
                    { name: 'Paracetamol 500mg', quantity: 2 },
                    { name: 'Vitamin C', quantity: 1 }
                ],
                total: 450.00,
                payment: 'COD',
                status: 'pending',
                date: '2026-04-06',
                time: '10:30 AM'
            },
            {
                id: 'ORD-002',
                customer: {
                    name: 'Priya Patel',
                    email: 'priya.patel@email.com',
                    phone: '+91 9876543211'
                },
                medicines: [
                    { name: 'Aspirin 75mg', quantity: 1 },
                    { name: 'Cough Syrup', quantity: 1 }
                ],
                total: 320.00,
                payment: 'Card',
                status: 'processing',
                date: '2026-04-06',
                time: '09:15 AM'
            },
            {
                id: 'ORD-003',
                customer: {
                    name: 'Amit Kumar',
                    email: 'amit.kumar@email.com',
                    phone: '+91 9876543212'
                },
                medicines: [
                    { name: 'Ibuprofen 400mg', quantity: 2 },
                    { name: 'Vitamin D3', quantity: 1 }
                ],
                total: 580.00,
                payment: 'UPI',
                status: 'out-for-delivery',
                date: '2026-04-05',
                time: '02:45 PM'
            },
            {
                id: 'ORD-004',
                customer: {
                    name: 'Sneha Reddy',
                    email: 'sneha.reddy@email.com',
                    phone: '+91 9876543213'
                },
                medicines: [
                    { name: 'Cough Syrup', quantity: 2 },
                    { name: 'Paracetamol 500mg', quantity: 1 }
                ],
                total: 285.00,
                payment: 'COD',
                status: 'delivered',
                date: '2026-04-05',
                time: '11:20 AM'
            },
            {
                id: 'ORD-005',
                customer: {
                    name: 'Vikram Singh',
                    email: 'vikram.singh@email.com',
                    phone: '+91 9876543214'
                },
                medicines: [
                    { name: 'Vitamin C', quantity: 3 },
                    { name: 'Vitamin D3', quantity: 2 }
                ],
                total: 680.00,
                payment: 'Card',
                status: 'cancelled',
                date: '2026-04-04',
                time: '04:30 PM'
            }
        ];

        this.filteredOrders = [...this.orders];
        this.updateOrdersTable();
        this.updateOrderStats();
    }

    filterOrders(searchTerm) {
        if (!searchTerm) {
            this.filteredOrders = [...this.orders];
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredOrders = this.orders.filter(order =>
                order.id.toLowerCase().includes(term) ||
                order.customer.name.toLowerCase().includes(term) ||
                order.medicines.some(med => med.name.toLowerCase().includes(term))
            );
        }
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.filteredOrders];

        // Status filter
        const statusFilter = document.getElementById('statusFilter').value;
        if (statusFilter) {
            filtered = filtered.filter(order => order.status === statusFilter);
        }

        // Date filter
        const dateFilter = document.getElementById('dateFilter').value;
        if (dateFilter) {
            filtered = this.filterByDate(filtered, dateFilter);
        }

        // Payment filter
        const paymentFilter = document.getElementById('paymentFilter').value;
        if (paymentFilter) {
            filtered = filtered.filter(order => order.payment.toLowerCase() === paymentFilter);
        }

        this.updateOrdersTable(filtered);
    }

    filterByDate(orders, filter) {
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);

        return orders.filter(order => {
            const orderDate = new Date(order.date);
            switch(filter) {
                case 'today':
                    return orderDate.toDateString() === today.toDateString();
                case 'yesterday':
                    return orderDate.toDateString() === yesterday.toDateString();
                case 'this-week':
                    return orderDate >= weekAgo;
                case 'this-month':
                    return orderDate >= monthAgo;
                default:
                    return true;
            }
        });
    }

    updateOrdersTable(orders = this.filteredOrders) {
        const tbody = document.querySelector('#ordersTable tbody');
        if (!tbody) return;

        tbody.innerHTML = orders.map(order => `
            <tr>
                <td>
                    <input type="checkbox" class="order-checkbox" value="${order.id}">
                </td>
                <td><strong>#${order.id}</strong></td>
                <td>
                    <div class="customer-info">
                        <strong>${order.customer.name}</strong><br>
                        <small>${order.customer.email}</small><br>
                        <small>${order.customer.phone}</small>
                    </div>
                </td>
                <td>
                    <div class="medicines-list">
                        ${order.medicines.map(med => `<span class="medicine-item">${med.name} (${med.quantity})</span><br>`).join('')}
                    </div>
                </td>
                <td><strong>₹${order.total.toFixed(2)}</strong></td>
                <td>
                    <span class="payment-method">${order.payment}</span>
                </td>
                <td>
                    <span class="status ${order.status.replace(' ', '-')}">${this.formatStatus(order.status)}</span>
                </td>
                <td>${order.date}<br><small>${order.time}</small></td>
                <td>
                    <div class="action-buttons">
                        <button class="action-btn view-btn" title="View">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="action-btn edit-btn" title="${this.getActionButtonText(order.status)}">
                            <i class="fas ${this.getActionButtonIcon(order.status)}"></i>
                        </button>
                        <button class="action-btn delete-btn" title="${this.getDeleteButtonText(order.status)}">
                            <i class="fas ${this.getDeleteButtonIcon(order.status)}"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        // Re-attach event listeners to new action buttons
        this.attachActionListeners();
    }

    formatStatus(status) {
        return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    getActionButtonText(status) {
        switch(status) {
            case 'pending': return 'Process';
            case 'processing': return 'Update';
            case 'out-for-delivery': return 'Track';
            case 'delivered': return 'Invoice';
            case 'cancelled': return 'Reason';
            default: return 'Edit';
        }
    }

    getActionButtonIcon(status) {
        switch(status) {
            case 'pending': return 'fa-spinner';
            case 'processing': return 'fa-edit';
            case 'out-for-delivery': return 'fa-map-marker-alt';
            case 'delivered': return 'fa-file-invoice';
            case 'cancelled': return 'fa-info-circle';
            default: return 'fa-edit';
        }
    }

    getDeleteButtonText(status) {
        switch(status) {
            case 'pending':
            case 'processing':
            case 'out-for-delivery': return 'Cancel';
            case 'delivered': return 'Return';
            case 'cancelled': return 'Delete';
            default: return 'Delete';
        }
    }

    getDeleteButtonIcon(status) {
        switch(status) {
            case 'pending':
            case 'processing':
            case 'out-for-delivery': return 'fa-times';
            case 'delivered': return 'fa-undo';
            case 'cancelled': return 'fa-trash';
            default: return 'fa-trash';
        }
    }

    attachActionListeners() {
        const actionBtns = document.querySelectorAll('#ordersTable .action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleOrderAction(e.target.closest('tr'), e.target.closest('.action-btn'));
            });
        });

        const orderCheckboxes = document.querySelectorAll('.order-checkbox');
        orderCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                this.toggleOrderSelection(e.target.value, e.target.checked);
            });
        });
    }

    handleOrderAction(row, actionBtn) {
        const orderId = row.querySelector('td:nth-child(2)').textContent.replace('#', '');
        const order = this.orders.find(o => o.id === orderId);
        
        if (!order) return;

        if (actionBtn.classList.contains('view-btn')) {
            this.viewOrderDetails(order);
        } else if (actionBtn.classList.contains('edit-btn')) {
            this.processOrder(order);
        } else if (actionBtn.classList.contains('delete-btn')) {
            this.cancelOrDeleteOrder(order);
        }
    }

    viewOrderDetails(order) {
        const modal = document.getElementById('orderDetailsModal');
        const modalBody = modal.querySelector('.order-details-content');
        
        modalBody.innerHTML = `
            <div class="order-detail-section">
                <h4>Order Information</h4>
                <p><strong>Order ID:</strong> #${order.id}</p>
                <p><strong>Date:</strong> ${order.date} at ${order.time}</p>
                <p><strong>Status:</strong> <span class="status ${order.status.replace(' ', '-')}">${this.formatStatus(order.status)}</span></p>
                <p><strong>Payment Method:</strong> ${order.payment}</p>
            </div>
            
            <div class="order-detail-section">
                <h4>Customer Information</h4>
                <p><strong>Name:</strong> ${order.customer.name}</p>
                <p><strong>Email:</strong> ${order.customer.email}</p>
                <p><strong>Phone:</strong> ${order.customer.phone}</p>
            </div>
            
            <div class="order-detail-section">
                <h4>Medicines</h4>
                <table class="medicines-table">
                    <thead>
                        <tr>
                            <th>Medicine</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${order.medicines.map(med => `
                            <tr>
                                <td>${med.name}</td>
                                <td>${med.quantity}</td>
                                <td>₹${(order.total / order.medicines.reduce((sum, m) => sum + m.quantity, 0)).toFixed(2)}</td>
                                <td>₹${((order.total / order.medicines.reduce((sum, m) => sum + m.quantity, 0)) * med.quantity).toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
            
            <div class="order-detail-section">
                <h4>Order Summary</h4>
                <p><strong>Subtotal:</strong> ₹${order.total.toFixed(2)}</p>
                <p><strong>Shipping:</strong> FREE</p>
                <p><strong>Total:</strong> <strong>₹${order.total.toFixed(2)}</strong></p>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    closeOrderDetailsModal() {
        const modal = document.getElementById('orderDetailsModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    processOrder(order) {
        const statusFlow = {
            'pending': 'processing',
            'processing': 'out-for-delivery',
            'out-for-delivery': 'delivered'
        };

        if (statusFlow[order.status]) {
            order.status = statusFlow[order.status];
            this.updateOrdersTable();
            this.updateOrderStats();
            this.showNotification(`Order #${order.id} updated to ${this.formatStatus(order.status)}`, 'success');
        } else {
            this.showNotification(`Cannot process order in ${this.formatStatus(order.status)} status`, 'warning');
        }
    }

    cancelOrDeleteOrder(order) {
        if (order.status === 'cancelled') {
            if (confirm(`Are you sure you want to delete order #${order.id}?`)) {
                const index = this.orders.findIndex(o => o.id === order.id);
                if (index > -1) {
                    this.orders.splice(index, 1);
                    this.filteredOrders = [...this.orders];
                    this.updateOrdersTable();
                    this.updateOrderStats();
                    this.showNotification(`Order #${order.id} deleted`, 'success');
                }
            }
        } else if (order.status === 'delivered') {
            this.showNotification(`Return request for order #${order.id}`, 'info');
        } else {
            if (confirm(`Are you sure you want to cancel order #${order.id}?`)) {
                order.status = 'cancelled';
                this.updateOrdersTable();
                this.updateOrderStats();
                this.showNotification(`Order #${order.id} cancelled`, 'success');
            }
        }
    }

    selectAllOrders(checked) {
        const checkboxes = document.querySelectorAll('.order-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = checked;
            this.toggleOrderSelection(checkbox.value, checked);
        });
    }

    toggleOrderSelection(orderId, selected) {
        if (selected) {
            this.selectedOrders.add(orderId);
        } else {
            this.selectedOrders.delete(orderId);
        }
    }

    showBulkUpdateModal() {
        if (this.selectedOrders.size === 0) {
            this.showNotification('Please select orders to update', 'warning');
            return;
        }

        const status = prompt('Enter new status (pending, processing, out-for-delivery, delivered, cancelled):');
        if (status && ['pending', 'processing', 'out-for-delivery', 'delivered', 'cancelled'].includes(status)) {
            this.bulkUpdateOrders(status);
        } else if (status) {
            this.showNotification('Invalid status', 'error');
        }
    }

    bulkUpdateOrders(newStatus) {
        let updatedCount = 0;
        
        this.selectedOrders.forEach(orderId => {
            const order = this.orders.find(o => o.id === orderId);
            if (order) {
                order.status = newStatus;
                updatedCount++;
            }
        });

        this.selectedOrders.clear();
        this.updateOrdersTable();
        this.updateOrderStats();
        this.showNotification(`${updatedCount} orders updated to ${this.formatStatus(newStatus)}`, 'success');
    }

    updateOrderStats() {
        const stats = {
            pending: this.orders.filter(o => o.status === 'pending').length,
            processing: this.orders.filter(o => o.status === 'processing').length,
            outForDelivery: this.orders.filter(o => o.status === 'out-for-delivery').length,
            deliveredToday: this.orders.filter(o => o.status === 'delivered' && o.date === new Date().toISOString().split('T')[0]).length
        };

        // Update stat cards
        const statNumbers = document.querySelectorAll('.stat-number');
        const values = [stats.pending, stats.processing, stats.outForDelivery, stats.deliveredToday];
        
        statNumbers.forEach((element, index) => {
            if (values[index] !== undefined) {
                element.textContent = values[index];
            }
        });
    }

    exportOrders() {
        const csv = this.convertOrdersToCSV();
        this.downloadFile('orders-export.csv', csv);
        this.showNotification('Orders exported successfully', 'success');
    }

    convertOrdersToCSV() {
        let csv = 'Order ID,Customer,Email,Phone,Medicines,Total,Payment,Status,Date,Time\n';
        
        this.orders.forEach(order => {
            const medicines = order.medicines.map(med => `${med.name}(${med.quantity})`).join(';');
            csv += `${order.id},${order.customer.name},${order.customer.email},${order.customer.phone},"${medicines}",${order.total},${order.payment},${order.status},${order.date},${order.time}\n`;
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

// Initialize admin orders when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminOrders = new AdminOrders();
});

// Export for use in other files
window.AdminOrders = AdminOrders;
