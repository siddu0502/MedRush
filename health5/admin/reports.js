// Reports JavaScript - MedRush Admin

document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
});

function initializeCharts() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5'],
            datasets: [{
                label: 'Sales (Rs)',
                data: [12000, 15000, 18000, 14000, 22000, 25000],
                borderColor: '#3498db',
                backgroundColor: 'rgba(52, 152, 219, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // Category Chart
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Pain Relief', 'Vitamins', 'Cold & Cough', 'Antibiotics', 'Diabetes'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: ['#3498db', '#2ecc71', '#f39c12', '#e74c3c', '#9b59b6']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });

    // User Chart
    const userCtx = document.getElementById('userChart').getContext('2d');
    new Chart(userCtx, {
        type: 'bar',
        data: {
            labels: ['Mar 1', 'Mar 8', 'Mar 15', 'Mar 22', 'Mar 29', 'Apr 5'],
            datasets: [{
                label: 'New Users',
                data: [45, 52, 48, 61, 58, 78],
                backgroundColor: '#2ecc71'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function applyDateFilter() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;
    const reportType = document.getElementById('reportType').value;
    
    showNotification(`Filter applied: ${reportType} from ${startDate} to ${endDate}`, 'success');
}

function generateReport() {
    showNotification('Report generated successfully', 'success');
}

function exportReport(type) {
    showNotification(`${type} report exported successfully`, 'success');
}

function exportAllReports() {
    showNotification('All reports exported successfully', 'success');
}
