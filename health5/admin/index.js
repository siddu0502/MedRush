document.addEventListener('DOMContentLoaded', function() {
    updateNotificationCount();
});

function updateNotificationCount() {
    const stored = localStorage.getItem('orders');
    if (stored) {
        const orders = JSON.parse(stored);
        const pending = orders.filter(o => o.status === 'pending').length;
        document.getElementById('notification-count').textContent = pending;
    }
}