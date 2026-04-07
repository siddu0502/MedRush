// Admin Reports JavaScript for MedRush
class AdminReports {
    constructor() {
        this.initializeReports();
        this.setupEventListeners();
        this.loadReportsData();
        this.initializeCharts();
    }

    initializeReports() {
        console.log('Admin Reports initialized');
    }

    setupEventListeners() {
        // Report type filter
        const reportTypeSelect = document.getElementById('reportType');
        if (reportTypeSelect) {
            reportTypeSelect.addEventListener('change', () => {
                this.updateReportType();
            });
        }

        // Date filters
        const startDateInput = document.getElementById('startDate');
        const endDateInput = document.getElementById('endDate');
        const applyFilterBtn = document.getElementById('applyFilterBtn');

        if (applyFilterBtn) {
            applyFilterBtn.addEventListener('click', () => {
                this.applyDateFilter();
            });
        }

        // Sales period filter
        const salesPeriodSelect = document.getElementById('salesPeriod');
        if (salesPeriodSelect) {
            salesPeriodSelect.addEventListener('change', () => {
                this.updateSalesChart();
            });
        }

        // Refresh category button
        const refreshCategoryBtn = document.getElementById('refreshCategoryBtn');
        if (refreshCategoryBtn) {
            refreshCategoryBtn.addEventListener('click', () => {
                this.updateCategoryChart();
            });
        }

        // Export buttons
        const exportAllBtn = document.getElementById('exportAllBtn');
        if (exportAllBtn) {
            exportAllBtn.addEventListener('click', () => {
                this.exportAllReports();
            });
        }

        const exportUserBtn = document.getElementById('exportUserBtn');
        if (exportUserBtn) {
            exportUserBtn.addEventListener('click', () => {
                this.exportUserReport();
            });
        }

        const exportInventoryBtn = document.getElementById('exportInventoryBtn');
        if (exportInventoryBtn) {
            exportInventoryBtn.addEventListener('click', () => {
                this.exportInventoryReport();
            });
        }

        const generateReportBtn = document.getElementById('generateReportBtn');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', () => {
                this.generateCustomReport();
            });
        }
    }

    loadReportsData() {
        // Load sales overview data
        this.loadSalesOverview();
        
        // Load top products
        this.loadTopProducts();
        
        // Load user analytics
        this.loadUserAnalytics();
        
        // Load inventory report
        this.loadInventoryReport();
    }

    loadSalesOverview() {
        // Mock sales data
        const salesData = {
            totalRevenue: 482950,
            totalOrders: 1847,
            averageOrderValue: 261.50,
            conversionRate: 3.2
        };

        // Update overview cards
        const overviewNumbers = document.querySelectorAll('.overview-number');
        const values = [salesData.totalRevenue, salesData.totalOrders, salesData.averageOrderValue, salesData.conversionRate];
        
        overviewNumbers.forEach((element, index) => {
            if (values[index] !== undefined) {
                if (index === 0) {
                    element.textContent = '₹' + values[index].toLocaleString('en-IN');
                } else if (index === 3) {
                    element.textContent = values[index] + '%';
                } else {
                    element.textContent = values[index].toLocaleString('en-IN');
                }
            }
        });
    }

    loadTopProducts() {
        // Mock top products data
        this.topProducts = [
            { name: 'Paracetamol 500mg', category: 'Pain Relief', unitsSold: 342, revenue: 15390, growth: 12 },
            { name: 'Vitamin C 500mg', category: 'Vitamins', unitsSold: 287, revenue: 34440, growth: 8 },
            { name: 'Ibuprofen 400mg', category: 'Pain Relief', unitsSold: 198, revenue: 10890, growth: -3 },
            { name: 'Cough Syrup 100ml', category: 'Cold & Cough', unitsSold: 156, revenue: 13260, growth: 15 },
            { name: 'Vitamin D3 1000 IU', category: 'Vitamins', unitsSold: 142, revenue: 17040, growth: 20 }
        ];

        this.updateTopProductsTable();
    }

    updateTopProductsTable() {
        const tbody = document.querySelector('.products-table tbody');
        if (!tbody) return;

        tbody.innerHTML = this.topProducts.map(product => `
            <tr>
                <td>
                    <div class="product-info">
                        <i class="fas fa-pills"></i>
                        <span>${product.name}</span>
                    </div>
                </td>
                <td>${product.category}</td>
                <td><strong>${product.unitsSold}</strong></td>
                <td><strong>₹${product.revenue.toLocaleString('en-IN')}</strong></td>
                <td><span class="growth ${product.growth >= 0 ? 'positive' : 'negative'}">${product.growth >= 0 ? '+' : ''}${product.growth}%</span></td>
            </tr>
        `).join('');
    }

    loadUserAnalytics() {
        // Mock user analytics data
        this.userAnalytics = {
            totalUsers: 3291,
            activeUsers: 2847,
            newUsers: 342,
            returningUsers: 1892,
            inactiveUsers: 444
        };

        this.updateUserAnalytics();
    }

    updateUserAnalytics() {
        // Update activity stats
        const activityItems = document.querySelectorAll('.activity-item');
        const activityData = [
            { label: 'Active Users', value: this.userAnalytics.activeUsers, percentage: 86 },
            { label: 'New Users (This Month)', value: this.userAnalytics.newUsers, percentage: 10 },
            { label: 'Returning Users', value: this.userAnalytics.returningUsers, percentage: 57 },
            { label: 'Inactive Users', value: this.userAnalytics.inactiveUsers, percentage: 13 }
        ];

        activityItems.forEach((item, index) => {
            if (activityData[index]) {
                const label = item.querySelector('.activity-label');
                const value = item.querySelector('.activity-value');
                const progress = item.querySelector('.activity-progress');
                
                if (label) label.textContent = activityData[index].label;
                if (value) value.textContent = activityData[index].value;
                if (progress) progress.style.width = activityData[index].percentage + '%';
            }
        });
    }

    loadInventoryReport() {
        // Mock inventory data
        this.inventoryData = {
            totalProducts: 248,
            inStock: 195,
            lowStock: 42,
            outOfStock: 11
        };

        this.updateInventoryReport();
    }

    updateInventoryReport() {
        const inventoryNumbers = document.querySelectorAll('.inventory-number');
        const values = [this.inventoryData.totalProducts, this.inventoryData.inStock, this.inventoryData.lowStock, this.inventoryData.outOfStock];
        
        inventoryNumbers.forEach((element, index) => {
            if (values[index] !== undefined) {
                element.textContent = values[index];
            }
        });
    }

    initializeCharts() {
        if (typeof Chart !== 'undefined') {
            this.createSalesChart();
            this.createCategoryChart();
            this.createUserRegistrationChart();
        }
    }

    createSalesChart() {
        const ctx = document.getElementById('salesChart');
        if (!ctx) return;

        const salesData = this.getSalesData('7'); // Default to last 7 days

        this.salesChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: salesData.labels,
                datasets: [{
                    label: 'Sales (₹)',
                    data: salesData.values,
                    borderColor: '#3498db',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    tension: 0.4,
                    fill: true
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
                                return '₹' + value.toLocaleString('en-IN');
                            }
                        }
                    }
                }
            }
        });
    }

    getSalesChart() {
        const period = document.getElementById('salesPeriod')?.value || '7';
        this.updateSalesChart();
    }

    updateSalesChart() {
        if (!this.salesChart) return;

        const period = document.getElementById('salesPeriod')?.value || '7';
        const salesData = this.getSalesData(period);

        this.salesChart.data.labels = salesData.labels;
        this.salesChart.data.datasets[0].data = salesData.values;
        this.salesChart.update();
    }

    getSalesData(period) {
        const days = parseInt(period);
        const labels = [];
        const values = [];
        
        for (let i = days - 1; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
            values.push(Math.floor(Math.random() * 20000) + 10000);
        }
        
        return { labels, values };
    }

    createCategoryChart() {
        const ctx = document.getElementById('categoryChart');
        if (!ctx) return;

        const categoryData = this.getCategoryData();

        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: categoryData.labels,
                datasets: [{
                    data: categoryData.values,
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

    updateCategoryChart() {
        if (!this.categoryChart) return;

        const categoryData = this.getCategoryData();
        this.categoryChart.data.datasets[0].data = categoryData.values;
        this.categoryChart.update();
    }

    getCategoryData() {
        return {
            labels: ['Pain Relief', 'Vitamins', 'Cold & Cough', 'Antibiotics', 'Diabetes'],
            values: [35, 25, 20, 15, 5]
        };
    }

    createUserRegistrationChart() {
        const ctx = document.getElementById('userRegistrationChart');
        if (!ctx) return;

        const registrationData = this.getRegistrationData();

        this.userRegistrationChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: registrationData.labels,
                datasets: [{
                    label: 'New Users',
                    data: registrationData.values,
                    backgroundColor: '#2ecc71',
                    borderColor: '#27ae60',
                    borderWidth: 1
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
                            stepSize: 10
                        }
                    }
                }
            }
        });
    }

    getRegistrationData() {
        const labels = [];
        const values = [];
        
        for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            labels.push(date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }));
            values.push(Math.floor(Math.random() * 50) + 10);
        }
        
        return { labels, values };
    }

    updateReportType() {
        const reportType = document.getElementById('reportType').value;
        console.log('Report type changed to:', reportType);
        // In a real application, this would load different report data
    }

    applyDateFilter() {
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        if (startDate && endDate) {
            console.log('Applying date filter:', startDate, 'to', endDate);
            this.showNotification('Date filter applied', 'success');
            // In a real application, this would filter the report data
        }
    }

    generateCustomReport() {
        const reportType = document.getElementById('reportType').value;
        const startDate = document.getElementById('startDate').value;
        const endDate = document.getElementById('endDate').value;
        
        console.log('Generating custom report:', { reportType, startDate, endDate });
        this.showNotification('Custom report generated', 'success');
        
        // In a real application, this would generate and download a custom report
        this.downloadCustomReport(reportType);
    }

    downloadCustomReport(reportType) {
        const reportData = this.getReportData(reportType);
        const csv = this.convertReportToCSV(reportData, reportType);
        this.downloadFile(`${reportType}-report.csv`, csv);
    }

    getReportData(reportType) {
        // Mock report data based on type
        switch(reportType) {
            case 'sales':
                return {
                    headers: ['Date', 'Orders', 'Revenue', 'Customers'],
                    data: [
                        ['2026-04-06', 47, 12580, 42],
                        ['2026-04-05', 52, 14850, 48],
                        ['2026-04-04', 38, 11200, 35]
                    ]
                };
            case 'inventory':
                return {
                    headers: ['Product', 'Category', 'Stock', 'Min Stock', 'Status'],
                    data: [
                        ['Paracetamol 500mg', 'Pain Relief', 150, 20, 'In Stock'],
                        ['Aspirin 75mg', 'Pain Relief', 25, 30, 'Low Stock'],
                        ['Vitamin D3 1000 IU', 'Vitamins', 0, 15, 'Out of Stock']
                    ]
                };
            case 'users':
                return {
                    headers: ['User ID', 'Name', 'Email', 'Orders', 'Status'],
                    data: [
                        ['USR-001', 'Rahul Sharma', 'rahul@email.com', 24, 'Active'],
                        ['USR-002', 'Priya Patel', 'priya@email.com', 18, 'Active'],
                        ['USR-003', 'Amit Kumar', 'amit@email.com', 0, 'Staff']
                    ]
                };
            case 'financial':
                return {
                    headers: ['Date', 'Revenue', 'Cost', 'Profit', 'Margin'],
                    data: [
                        ['2026-04-06', 12580, 8920, 3660, '29.1%'],
                        ['2026-04-05', 14850, 10520, 4330, '29.2%'],
                        ['2026-04-04', 11200, 7950, 3250, '29.0%']
                    ]
                };
            default:
                return { headers: [], data: [] };
        }
    }

    convertReportToCSV(reportData, reportType) {
        let csv = `${reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report\n`;
        csv += `Generated: ${new Date().toLocaleString('en-IN')}\n\n`;
        csv += reportData.headers.join(',') + '\n';
        
        reportData.data.forEach(row => {
            csv += row.join(',') + '\n';
        });
        
        return csv;
    }

    exportAllReports() {
        console.log('Exporting all reports...');
        this.showNotification('All reports exported successfully', 'success');
        
        // Create a zip file with all reports (mock implementation)
        const reports = ['sales', 'inventory', 'users', 'financial'];
        reports.forEach(report => {
            this.downloadCustomReport(report);
        });
    }

    exportUserReport() {
        const userData = this.getReportData('users');
        const csv = this.convertReportToCSV(userData, 'users');
        this.downloadFile('user-analytics-report.csv', csv);
        this.showNotification('User report exported successfully', 'success');
    }

    exportInventoryReport() {
        const inventoryData = this.getReportData('inventory');
        const csv = this.convertReportToCSV(inventoryData, 'inventory');
        this.downloadFile('inventory-report.csv', csv);
        this.showNotification('Inventory report exported successfully', 'success');
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

// Initialize admin reports when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminReports = new AdminReports();
});

// Export for use in other files
window.AdminReports = AdminReports;
