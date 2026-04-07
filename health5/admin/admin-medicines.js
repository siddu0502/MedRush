// Admin Medicines Management JavaScript for MedRush
class AdminMedicines {
    constructor() {
        this.medicines = [];
        this.filteredMedicines = [];
        this.initializeMedicines();
        this.setupEventListeners();
        this.loadMedicinesData();
    }

    initializeMedicines() {
        console.log('Admin Medicines Management initialized');
    }

    setupEventListeners() {
        // Add medicine button
        const addMedicineBtn = document.getElementById('addMedicineBtn');
        if (addMedicineBtn) {
            addMedicineBtn.addEventListener('click', () => {
                this.showAddMedicineForm();
            });
        }

        // Cancel add button
        const cancelAddBtn = document.getElementById('cancelAddBtn');
        if (cancelAddBtn) {
            cancelAddBtn.addEventListener('click', () => {
                this.hideAddMedicineForm();
            });
        }

        // Medicine form submission
        const medicineForm = document.getElementById('medicineForm');
        if (medicineForm) {
            medicineForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleMedicineSubmit(e);
            });
        }

        // Search functionality
        const searchInput = document.getElementById('medicineSearch');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.filterMedicines(e.target.value);
            });
        }

        // Filter controls
        const filterControls = document.querySelectorAll('#categoryFilter, #stockFilter, #statusFilter');
        filterControls.forEach(select => {
            select.addEventListener('change', () => {
                this.applyFilters();
            });
        });

        // Action buttons
        const actionBtns = document.querySelectorAll('.action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleMedicineAction(e.target.closest('tr'), e.target.closest('.action-btn'));
            });
        });

        // Import/Export buttons
        const importBtn = document.getElementById('importBtn');
        if (importBtn) {
            importBtn.addEventListener('click', () => {
                this.importMedicines();
            });
        }

        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportMedicines();
            });
        }
    }

    loadMedicinesData() {
        // Mock medicines data
        this.medicines = [
            {
                id: 'MED001',
                name: 'Paracetamol 500mg',
                category: 'Pain Relief',
                manufacturer: 'Cipla Ltd',
                price: 45.00,
                stock: 150,
                minStock: 20,
                status: 'active'
            },
            {
                id: 'MED002',
                name: 'Aspirin 75mg',
                category: 'Pain Relief',
                manufacturer: 'Sun Pharma',
                price: 35.00,
                stock: 25,
                minStock: 30,
                status: 'active'
            },
            {
                id: 'MED003',
                name: 'Vitamin D3 1000 IU',
                category: 'Vitamins',
                manufacturer: 'Dabur',
                price: 120.00,
                stock: 0,
                minStock: 15,
                status: 'inactive'
            },
            {
                id: 'MED004',
                name: 'Ibuprofen 400mg',
                category: 'Pain Relief',
                manufacturer: 'Lupin',
                price: 55.00,
                stock: 200,
                minStock: 25,
                status: 'active'
            },
            {
                id: 'MED005',
                name: 'Cough Syrup 100ml',
                category: 'Cold & Cough',
                manufacturer: 'Himalaya',
                price: 85.00,
                stock: 75,
                minStock: 20,
                status: 'active'
            }
        ];

        this.filteredMedicines = [...this.medicines];
        this.updateMedicinesTable();
        this.updateInventorySummary();
    }

    showAddMedicineForm() {
        const form = document.getElementById('addMedicineForm');
        if (form) {
            form.style.display = 'block';
            form.scrollIntoView({ behavior: 'smooth' });
        }
    }

    hideAddMedicineForm() {
        const form = document.getElementById('addMedicineForm');
        if (form) {
            form.style.display = 'none';
            form.reset();
        }
    }

    handleMedicineSubmit(e) {
        const formData = new FormData(e.target);
        const medicine = {
            id: 'MED' + String(this.medicines.length + 1).padStart(3, '0'),
            name: formData.get('medicineName'),
            category: formData.get('category'),
            manufacturer: formData.get('manufacturer'),
            price: parseFloat(formData.get('price')),
            stock: parseInt(formData.get('stock')),
            minStock: parseInt(formData.get('minStock')),
            status: 'active'
        };

        this.medicines.push(medicine);
        this.filteredMedicines = [...this.medicines];
        this.updateMedicinesTable();
        this.updateInventorySummary();
        this.hideAddMedicineForm();
        this.showNotification('Medicine added successfully', 'success');
    }

    filterMedicines(searchTerm) {
        if (!searchTerm) {
            this.filteredMedicines = [...this.medicines];
        } else {
            const term = searchTerm.toLowerCase();
            this.filteredMedicines = this.medicines.filter(medicine =>
                medicine.name.toLowerCase().includes(term) ||
                medicine.category.toLowerCase().includes(term) ||
                medicine.manufacturer.toLowerCase().includes(term)
            );
        }
        this.applyFilters();
    }

    applyFilters() {
        let filtered = [...this.filteredMedicines];

        // Category filter
        const categoryFilter = document.getElementById('categoryFilter').value;
        if (categoryFilter) {
            filtered = filtered.filter(medicine => 
                medicine.category.toLowerCase().replace(' ', '-') === categoryFilter
            );
        }

        // Stock filter
        const stockFilter = document.getElementById('stockFilter').value;
        if (stockFilter) {
            filtered = filtered.filter(medicine => {
                switch(stockFilter) {
                    case 'in-stock':
                        return medicine.stock > medicine.minStock;
                    case 'low-stock':
                        return medicine.stock > 0 && medicine.stock <= medicine.minStock;
                    case 'out-of-stock':
                        return medicine.stock === 0;
                    default:
                        return true;
                }
            });
        }

        // Status filter
        const statusFilter = document.getElementById('statusFilter').value;
        if (statusFilter) {
            filtered = filtered.filter(medicine => medicine.status === statusFilter);
        }

        this.updateMedicinesTable(filtered);
    }

    updateMedicinesTable(medicines = this.filteredMedicines) {
        const tbody = document.querySelector('#medicinesTable tbody');
        if (!tbody) return;

        tbody.innerHTML = medicines.map(medicine => `
            <tr>
                <td>#${medicine.id}</td>
                <td>${medicine.name}</td>
                <td>${medicine.category}</td>
                <td>${medicine.manufacturer}</td>
                <td>₹${medicine.price.toFixed(2)}</td>
                <td>
                    <span class="stock-status ${this.getStockStatusClass(medicine)}">${medicine.stock}</span>
                </td>
                <td><span class="status ${medicine.status}">${medicine.status}</span></td>
                <td>
                    <button class="action-btn view-btn" title="View">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete-btn" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        // Re-attach event listeners to new action buttons
        this.attachActionListeners();
    }

    getStockStatusClass(medicine) {
        if (medicine.stock === 0) return 'out-of-stock';
        if (medicine.stock <= medicine.minStock) return 'low-stock';
        return 'in-stock';
    }

    attachActionListeners() {
        const actionBtns = document.querySelectorAll('#medicinesTable .action-btn');
        actionBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.handleMedicineAction(e.target.closest('tr'), e.target.closest('.action-btn'));
            });
        });
    }

    handleMedicineAction(row, actionBtn) {
        const medicineId = row.querySelector('td:first-child').textContent.replace('#', '');
        const medicine = this.medicines.find(m => m.id === medicineId);
        
        if (!medicine) return;

        if (actionBtn.classList.contains('view-btn')) {
            this.viewMedicineDetails(medicine);
        } else if (actionBtn.classList.contains('edit-btn')) {
            this.editMedicine(medicine);
        } else if (actionBtn.classList.contains('delete-btn')) {
            this.deleteMedicine(medicine);
        }
    }

    viewMedicineDetails(medicine) {
        console.log('View medicine details:', medicine);
        this.showNotification(`Viewing details for ${medicine.name}`, 'info');
    }

    editMedicine(medicine) {
        console.log('Edit medicine:', medicine);
        this.showNotification(`Editing ${medicine.name}`, 'info');
    }

    deleteMedicine(medicine) {
        if (confirm(`Are you sure you want to delete ${medicine.name}?`)) {
            const index = this.medicines.findIndex(m => m.id === medicine.id);
            if (index > -1) {
                this.medicines.splice(index, 1);
                this.filteredMedicines = [...this.medicines];
                this.updateMedicinesTable();
                this.updateInventorySummary();
                this.showNotification(`${medicine.name} deleted successfully`, 'success');
            }
        }
    }

    updateInventorySummary() {
        const summary = {
            total: this.medicines.length,
            inStock: this.medicines.filter(m => m.stock > m.minStock).length,
            lowStock: this.medicines.filter(m => m.stock > 0 && m.stock <= m.minStock).length,
            outOfStock: this.medicines.filter(m => m.stock === 0).length
        };

        // Update summary cards
        const summaryCards = document.querySelectorAll('.summary-card');
        summaryCards.forEach((card, index) => {
            const number = card.querySelector('.summary-number');
            if (number) {
                const values = [summary.total, summary.inStock, summary.lowStock, summary.outOfStock];
                number.textContent = values[index];
            }
        });
    }

    importMedicines() {
        // Create file input for CSV import
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.csv';
        input.addEventListener('change', (e) => {
            this.handleFileImport(e.target.files[0]);
        });
        input.click();
    }

    handleFileImport(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const csv = e.target.result;
            this.parseCSVAndImport(csv);
        };
        reader.readAsText(file);
    }

    parseCSVAndImport(csv) {
        // Simple CSV parsing (mock implementation)
        const lines = csv.split('\n');
        const headers = lines[0].split(',');
        
        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim()) {
                const values = lines[i].split(',');
                const medicine = {
                    id: 'MED' + String(this.medicines.length + 1).padStart(3, '0'),
                    name: values[0] || '',
                    category: values[1] || '',
                    manufacturer: values[2] || '',
                    price: parseFloat(values[3]) || 0,
                    stock: parseInt(values[4]) || 0,
                    minStock: parseInt(values[5]) || 10,
                    status: 'active'
                };
                
                if (medicine.name) {
                    this.medicines.push(medicine);
                }
            }
        }

        this.filteredMedicines = [...this.medicines];
        this.updateMedicinesTable();
        this.updateInventorySummary();
        this.showNotification('Medicines imported successfully', 'success');
    }

    exportMedicines() {
        const csv = this.convertMedicinesToCSV();
        this.downloadFile('medicines-export.csv', csv);
        this.showNotification('Medicines exported successfully', 'success');
    }

    convertMedicinesToCSV() {
        let csv = 'ID,Name,Category,Manufacturer,Price,Stock,Min Stock,Status\n';
        
        this.medicines.forEach(medicine => {
            csv += `${medicine.id},${medicine.name},${medicine.category},${medicine.manufacturer},${medicine.price},${medicine.stock},${medicine.minStock},${medicine.status}\n`;
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

// Initialize admin medicines when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.adminMedicines = new AdminMedicines();
});

// Export for use in other files
window.AdminMedicines = AdminMedicines;
