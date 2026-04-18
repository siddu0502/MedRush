// Orders Management JavaScript - MedRush Admin

let orders = [];

document.addEventListener('DOMContentLoaded', function() {
    loadOrders();
    setInterval(updateNotificationCount, 10000);
});

function loadOrders() {
    let stored = localStorage.getItem('orders');
    if (!stored) {
        orders = [];
    } else {
        orders = JSON.parse(stored);
    }
    updateOrdersTable();
    updateNotificationCount();
}

function saveOrders() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

function updateNotificationCount() {
    const pending = orders.filter(o => o.status === 'pending').length;
    const countEl = document.getElementById('notification-count');
    if (countEl) countEl.textContent = pending;
}

function viewOrder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const modal = document.getElementById('orderModal');
        const content = document.getElementById('orderModalContent');
        
        content.innerHTML = `
            <div class="order-detail-section">
                <h4>Order Information</h4>
                <p><strong>Order ID:</strong> #${order.id}</p>
                <p><strong>Customer:</strong> ${order.customerInfo.name}</p>
                <p><strong>Phone:</strong> ${order.customerInfo.phone}</p>
                <p><strong>Address:</strong> ${order.customerInfo.address}, ${order.customerInfo.city} - ${order.customerInfo.pincode}</p>
                <p><strong>Date:</strong> ${new Date(order.date).toLocaleDateString()}</p>
                <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
                <p><strong>Status:</strong> <span class="status ${order.status}">${order.status}</span></p>
            </div>
            
            <div class="order-detail-section">
                <h4>Medicines</h4>
                <ul>
                    ${order.items.map(item => `<li>${item.name} (${item.meta}) - Qty: ${item.quantity} - ₹${item.price.toFixed(2)} each</li>`).join('')}
                </ul>
            </div>
            
            <div class="order-detail-section">
                <h4>Order Summary</h4>
                <p><strong>Subtotal:</strong> Rs ${order.total.toFixed(2)}</p>
                <p><strong>Total:</strong> <strong>Rs ${order.total.toFixed(2)}</strong></p>
            </div>
            
            <div class="order-detail-section">
                <h4>Status Timeline</h4>
                <div class="status-timeline">
                    <div class="status-timeline-item completed">
                        <div class="status-timeline-content">
                            <h5>Order Placed</h5>
                            <small>${new Date(order.date).toLocaleDateString()}</small>
                        </div>
                    </div>
                    ${order.status !== 'pending' ? `
                    <div class="status-timeline-item completed">
                        <div class="status-timeline-content">
                            <h5>Order Confirmed</h5>
                            <small>${new Date(order.date).toLocaleDateString()}</small>
                        </div>
                    </div>` : ''}
                    ${order.status === 'processing' ? `
                    <div class="status-timeline-item pending">
                        <div class="status-timeline-content">
                            <h5>Processing</h5>
                            <small>In Progress</small>
                        </div>
                    </div>` : ''}
                    ${order.status === 'delivered' ? `
                    <div class="status-timeline-item completed">
                        <div class="status-timeline-content">
                            <h5>Out for Delivery</h5>
                            <small>${new Date(order.date).toLocaleDateString()}</small>
                        </div>
                    </div>
                    <div class="status-timeline-item completed">
                        <div class="status-timeline-content">
                            <h5>Delivered</h5>
                            <small>${new Date(order.date).toLocaleDateString()}</small>
                        </div>
                    </div>` : ''}
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }
}

function closeOrderModal() {
    document.getElementById('orderModal').style.display = 'none';
}

function updateOrderStatus(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        const newStatus = prompt('Enter new status (pending/processing/delivered/cancelled):', order.status);
        if (newStatus && ['pending', 'processing', 'delivered', 'cancelled'].includes(newStatus)) {
            order.status = newStatus;
            saveOrders();
            updateOrdersTable();
            updateNotificationCount();
            showNotification('Order status updated successfully', 'success');
        }
    }
}

function searchOrders() {
    const searchTerm = document.getElementById('searchOrder').value.toLowerCase();
    const filteredOrders = orders.filter(order => 
        order.id.toLowerCase().includes(searchTerm) ||
        order.customer.toLowerCase().includes(searchTerm) ||
        order.medicines.toLowerCase().includes(searchTerm)
    );
    updateOrdersTable(filteredOrders);
}

function filterOrders() {
    const status = document.getElementById('filterStatus').value;
    const date = document.getElementById('filterDate').value;
    
    let filteredOrders = orders;
    
    if (status) {
        filteredOrders = filteredOrders.filter(o => o.status === status);
    }
    
    if (date) {
        const today = new Date();
        switch(date) {
            case 'today':
                filteredOrders = filteredOrders.filter(o => {
                    const orderDate = new Date(o.date);
                    return orderDate.toDateString() === today.toDateString();
                });
                break;
            case 'yesterday':
                const yesterday = new Date(today);
                yesterday.setDate(yesterday.getDate() - 1);
                filteredOrders = filteredOrders.filter(o => {
                    const orderDate = new Date(o.date);
                    return orderDate.toDateString() === yesterday.toDateString();
                });
                break;
            case 'this-week':
                const weekAgo = new Date(today);
                weekAgo.setDate(weekAgo.getDate() - 7);
                filteredOrders = filteredOrders.filter(o => {
                    const orderDate = new Date(o.date);
                    return orderDate >= weekAgo;
                });
                break;
            case 'this-month':
                const monthAgo = new Date(today);
                monthAgo.setMonth(monthAgo.getMonth() - 1);
                filteredOrders = filteredOrders.filter(o => {
                    const orderDate = new Date(o.date);
                    return orderDate >= monthAgo;
                });
                break;
        }
    }
    
    updateOrdersTable(filteredOrders);
}

function updateOrdersTable(ordersToShow = orders) {
    const tbody = document.getElementById('ordersTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = ordersToShow.map(order => `
        <tr>
            <td>#${order.id}</td>
            <td>
                <div class="customer-info">
                    <strong>${order.customerInfo.name}</strong><br>
                    <small>${order.customerInfo.phone}</small>
                </div>
            </td>
            <td>
                <div class="medicines-list">
                    ${order.items.map(item => `${item.name} (${item.quantity})`).join(', ')}
                </div>
            </td>
            <td>${order.total.toFixed(2)}</td>
            <td><span class="payment-method">${order.paymentMethod}</span></td>
            <td><span class="status ${order.status}">${order.status}</span></td>
            <td>${new Date(order.date).toLocaleDateString()}</td>
            <td>
                <button class="action-btn" title="View" onclick="viewOrder('${order.id}')"><i class="fas fa-eye"></i></button>
                <button class="action-btn" title="Update Status" onclick="updateOrderStatus('${order.id}')"><i class="fas fa-edit"></i></button>
            </td>
        </tr>
    `).join('');
}

function exportOrders() {
    showNotification('Orders exported successfully', 'success');
}

function bulkUpdateStatus() {
    showNotification('Bulk update feature coming soon', 'info');
}

function bulkDelete() {
    if (confirm('Are you sure you want to delete selected items?')) {
        showNotification('Selected items deleted', 'success');
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('orderModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
