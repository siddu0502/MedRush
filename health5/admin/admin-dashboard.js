// Admin Dashboard JavaScript for MedRush
class AdminDashboard {
    constructor() {
        this.initializeDashboard();
        this.loadDashboardData();
        this.setupEventListeners();
        this.initializeCharts();
    }

    initializeDashboard() {
        console.log('Admin Dashboard initialized');
    }

    loadDashboardData() {
        // Load dashboard statistics
        this.loadStats();
        this.loadRecentOrders();
        this.loadQuickActions();
    }

    loadStats() {
        // Mock data for statistics
        const stats = {
            totalMedicines: 248,
            totalOrders: 1847,
            totalUsers: 3291,
            revenue: 482950
        };

        // Update stat cards with animation
        this.animateNumber('.stat-number', stats);
    }

    animateNumber(selector, targetValues) {
        const elements = document.querySelectorAll(selector);
        const values = Object.values(targetValues);
        
        elements.forEach((element, index) => {
            const target = values[index];
            const duration = 2000;
            const start = 0;
            const increment = target / (duration / 16);
            let current = start;
            
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    current = target;
                    clearInterval(timer);
                }
                
                // Format number based on value
                if (typeof target === 'number' && target > 1000) {
                    element.textContent = this.formatNumber(Math.floor(current));
                } else if (typeof target === 'number') {
                    element.textContent = Math.floor(current).toString();
                } else {
                    element.textContent = target;
                }
            }, 16);
        });
    }

    formatNumber(num) {
        if (num >= 100000) {
            return (num / 100000).toFixed(1) + 'L';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    loadRecentOrders() {
        // Mock recent orders data
        const recentOrders = [
            {
                id: '#ORD-001',
                customer: 'Rahul Sharma',
                medicines: 'Paracetamol, Vitamin C',
                total: 450,
                status: 'pending',
                date: '2026-04-06'
            },
            {
                id: '#ORD-002',
                customer: 'Priya Patel',
                medicines: 'Aspirin, Cough Syrup',
                total: 320,
                status: 'processing',
                date: '2026-04-06'
            },
            {
                id: '#ORD-003',
                customer: 'Amit Kumar',
                medicines: 'Ibuprofen, Vitamin D',
                total: 580,
                status: 'delivered',
                date: '2026-04-05'
            }
        ];

        // Update recent orders table (already in HTML)
        console.log('Recent orders loaded:', recentOrders);
    }

    loadQuickActions() {
        // Quick actions are already in HTML
        console.log('Quick actions loaded');
    }

    setupEventListeners() {
        // Quick action buttons
        const quickActionBtns = document.querySelectorAll('.action-primary-btn');
        quickActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleQuickAction(e.target.textContent.trim());
            });
        });

        // Order action buttons
        const orderActionBtns = document.querySelectorAll('.action-btn');
        orderActionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleOrderAction(e.target.closest('tr'), e.target.closest('.action-btn').className);
            });
        });

        // View all orders link
        const viewAllBtn = document.querySelector('.view-all-btn');
        if (viewAllBtn) {
            viewAllBtn.addEventListener('click', (e) => {
                e.preventDefault();
                window.location.href = 'admin-orders.html';
            });
        }
    }

    handleQuickAction(action) {
        switch(action) {
            case 'Add Medicine':
                window.location.href = 'admin-medicines.html?action=add';
                break;
            case 'Manage Stock':
                window.location.href = 'admin-medicines.html#inventory';
                break;
            case 'View Reports':
                window.location.href = 'admin-reports.html';
                break;
            case 'Add User':
                window.location.href = 'admin-users.html?action=add';
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    handleOrderAction(row, actionClass) {
        const orderId = row.querySelector('td:first-child').textContent;
        
        if (actionClass.includes('view-btn')) {
            this.viewOrderDetails(orderId);
        } else if (actionClass.includes('edit-btn')) {
            this.editOrder(orderId);
        }
    }

    viewOrderDetails(orderId) {
        // Show order details modal
        console.log('View order details:', orderId);
        this.showNotification(`Viewing details for ${orderId}`, 'info');
    }

    editOrder(orderId) {
        // Edit order
        console.log('Edit order:', orderId);
        this.showNotification(`Editing ${orderId}`, 'info');
    }

    initializeCharts() {
        // Initialize dashboard charts if Chart.js is available
        if (typeof Chart !== 'undefined') {
            this.createSalesChart();
            this.createCategoryChart();
        }
    }

    createSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        const salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                datasets: [{
                    label: 'Sales',
                    data: [12000, 19000, 15000, 25000, 22000, 30000, 28000],
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return '₹' + value.toLocaleString();
                            }
                        }
                    }
                }
            }
        });
    }

    createCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        const categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Pain Relief', 'Vitamins', 'Cold & Cough', 'Antibiotics', 'Diabetes'],
                datasets: [{
                    data: [35, 25, 20, 15, 5],
                    backgroundColor: [
                        '#3498db',
                        '#2ecc71',
                        '#f39c12',
                        '#e74c3c',
                        '#9b59b6'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
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

    // Real-time updates
    startRealTimeUpdates() {
        // Update stats every 30 seconds
        setInterval(() => {
            this.updateRealTimeStats();
        }, 30000);
    }

    updateRealTimeStats() {
        // Simulate real-time stat updates
        console.log('Updating real-time stats...');
        // In a real application, this would fetch data from an API
    }

    // Export dashboard data
    exportDashboardData() {
        const dashboardData = {
            generated: new Date().toISOString(),
            stats: {
                totalMedicines: 248,
                totalOrders: 1847,
                totalUsers: 3291,
                revenue: 482950
            },
            recentOrders: [
                { id: '#ORD-001', customer: 'Rahul Sharma', total: 450, status: 'pending' },
                { id: '#ORD-002', customer: 'Priya Patel', total: 320, status: 'processing' },
                { id: '#ORD-003', customer: 'Amit Kumar', total: 580, status: 'delivered' }
            ]
        };

        // Create and download CSV
        const csv = this.convertToCSV(dashboardData);
        this.downloadFile('dashboard-export.csv', csv);
    }

    convertToCSV(data) {
        // Simple CSV conversion
        let csv = 'Dashboard Export\n';
        csv += `Generated,${data.generated}\n\n`;
        csv += 'Statistics\n';
        csv += 'Total Medicines,' + data.stats.totalMedicines + '\n';
        csv += 'Total Orders,' + data.stats.totalOrders + '\n';
        csv += 'Total Users,' + data.stats.totalUsers + '\n';
        csv += 'Revenue,' + data.stats.revenue + '\n\n';
        csv += 'Recent Orders\n';
        csv += 'Order ID,Customer,Total,Status\n';
        
        data.recentOrders.forEach(order => {
            csv += `${order.id},${order.customer},${order.total},${order.status}\n`;
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
}

// Initialize admin dashboard when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminDashboard = new AdminDashboard();
    
    // Start real-time updates
    window.adminDashboard.startRealTimeUpdates();
});

// Export for use in other files
window.AdminDashboard = AdminDashboard;
