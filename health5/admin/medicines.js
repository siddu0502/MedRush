// Medicines Management JavaScript - MedRush Admin

let medicines = [];
let editingId = null;

document.addEventListener('DOMContentLoaded', function() {
    loadMedicines();
});

function loadMedicines() {
    let stored = localStorage.getItem('medicineCatalog');
    if (!stored) {
        medicines = [
            { id: 1, name: 'Paracetamol 500mg', category: 'pain-relief', price: 45.00, stock: 150, status: 'active', type: 'capsule', meta: 'strip of 15 tablets', manufacturer: 'GSK', composition: 'Paracetamol', isAvailable: true },
            { id: 2, name: 'Vitamin C 500mg', category: 'vitamins', price: 120.00, stock: 25, status: 'active', type: 'capsule', meta: 'strip of 10 tablets', manufacturer: 'Cipla', composition: 'Vitamin C', isAvailable: true },
            { id: 3, name: 'Aspirin 75mg', category: 'pain-relief', price: 35.00, stock: 0, status: 'inactive', type: 'capsule', meta: 'strip of 14 tablets', manufacturer: 'USV', composition: 'Aspirin', isAvailable: false }
        ];
        localStorage.setItem('medicineCatalog', JSON.stringify(medicines));
    } else {
        medicines = JSON.parse(stored);
    }
    updateMedicinesTable();
}

function saveMedicines() {
    localStorage.setItem('medicineCatalog', JSON.stringify(medicines));
}

function addOrUpdateMedicine(event) {
    event.preventDefault();
    if (editingId) {
        const medicine = medicines.find(m => m.id === editingId);
        if (medicine) {
            medicine.name = document.getElementById('medicineName').value;
            medicine.category = document.getElementById('medicineCategory').value;
            medicine.price = parseFloat(document.getElementById('medicinePrice').value);
            medicine.stock = parseInt(document.getElementById('medicineStock').value);
            medicine.isAvailable = medicine.stock > 0;
            medicine.status = medicine.isAvailable ? 'active' : 'inactive';
            medicine.description = document.getElementById('medicineDescription').value || '';
            saveMedicines();
            updateMedicinesTable();
            showNotification('Medicine updated successfully', 'success');
            editingId = null;
            document.getElementById('submitBtn').textContent = 'Add Medicine';
            event.target.reset();
        }
    } else {
        const medicine = {
            id: medicines.length > 0 ? Math.max(...medicines.map(m => m.id)) + 1 : 1,
            name: document.getElementById('medicineName').value,
            category: document.getElementById('medicineCategory').value,
            price: parseFloat(document.getElementById('medicinePrice').value),
            stock: parseInt(document.getElementById('medicineStock').value),
            isAvailable: true,
            status: 'active',
            description: document.getElementById('medicineDescription').value || '',
            type: 'capsule',
            meta: 'strip of 10 tablets',
            manufacturer: 'Various',
            composition: document.getElementById('medicineName').value
        };
        medicine.isAvailable = medicine.stock > 0;
        medicine.status = medicine.isAvailable ? 'active' : 'inactive';
        medicines.push(medicine);
        saveMedicines();
        updateMedicinesTable();
        showNotification('Medicine added successfully', 'success');
        event.target.reset();
    }
}

function editMedicine(medicineId) {
    const medicine = medicines.find(m => m.id === medicineId);
    if (medicine) {
        document.getElementById('medicineName').value = medicine.name;
        document.getElementById('medicineCategory').value = medicine.category;
        document.getElementById('medicinePrice').value = medicine.price;
        document.getElementById('medicineStock').value = medicine.stock;
        document.getElementById('medicineDescription').value = medicine.description || '';
        editingId = medicineId;
        document.getElementById('submitBtn').textContent = 'Update Medicine';
        document.getElementById('add-medicine').scrollIntoView({ behavior: 'smooth' });
        showNotification('Edit medicine details and update', 'info');
    }
}

function deleteMedicine(medicineId) {
    if (confirm('Are you sure you want to delete this medicine?')) {
        medicines = medicines.filter(m => m.id !== medicineId);
        saveMedicines();
        updateMedicinesTable();
        showNotification('Medicine deleted successfully', 'success');
    }
}

function addMedicine(event) {
    event.preventDefault();
    
    const medicine = {
        id: 'MED-' + String(medicines.length + 1).padStart(3, '0'),
        name: document.getElementById('medicineName').value,
        category: document.getElementById('medicineCategory').value,
        price: parseFloat(document.getElementById('medicinePrice').value),
        stock: parseInt(document.getElementById('medicineStock').value),
        description: document.getElementById('medicineDescription').value,
        status: 'active'
    };
    
    medicines.push(medicine);
    updateMedicinesTable();
    showNotification('Medicine added successfully', 'success');
    event.target.reset();
}

function editMedicine(medicineId) {
    const medicine = medicines.find(m => m.id === medicineId);
    if (medicine) {
        document.getElementById('medicineName').value = medicine.name;
        document.getElementById('medicineCategory').value = medicine.category;
        document.getElementById('medicinePrice').value = medicine.price;
        document.getElementById('medicineStock').value = medicine.stock;
        document.getElementById('medicineDescription').value = medicine.description || '';
        
        document.getElementById('add-medicine').scrollIntoView({ behavior: 'smooth' });
        showNotification('Edit medicine details and update', 'info');
    }
}

function deleteMedicine(medicineId) {
    if (confirm('Are you sure you want to delete this medicine?')) {
        medicines = medicines.filter(m => m.id !== medicineId);
        updateMedicinesTable();
        showNotification('Medicine deleted successfully', 'success');
    }
}

function searchMedicines() {
    const searchTerm = document.getElementById('searchMedicine').value.toLowerCase();
    const filteredMedicines = medicines.filter(medicine => 
        medicine.name.toLowerCase().includes(searchTerm) ||
        medicine.category.toLowerCase().includes(searchTerm)
    );
    updateMedicinesTable(filteredMedicines);
}

function filterMedicines() {
    const category = document.getElementById('filterCategory').value;
    const stockLevel = document.getElementById('filterStock').value;
    
    let filteredMedicines = medicines;
    
    if (category) {
        filteredMedicines = filteredMedicines.filter(m => m.category === category);
    }
    
    if (stockLevel) {
        filteredMedicines = filteredMedicines.filter(m => {
            if (stockLevel === 'in-stock') return m.stock > 20;
            if (stockLevel === 'low-stock') return m.stock > 0 && m.stock <= 20;
            if (stockLevel === 'out-of-stock') return m.stock === 0;
            return true;
        });
    }
    
    updateMedicinesTable(filteredMedicines);
}

function updateMedicinesTable(medicinesToShow = medicines) {
    const tbody = document.getElementById('medicinesTableBody');
    if (!tbody) return;
    
    tbody.innerHTML = medicinesToShow.map(medicine => `
        <tr>
            <td>${medicine.id}</td>
            <td>${medicine.name}</td>
            <td>${formatCategory(medicine.category)}</td>
            <td>${medicine.price.toFixed(2)}</td>
            <td>${medicine.stock}</td>
            <td><span class="status ${getStockStatus(medicine.stock)}">${getStockStatusText(medicine.stock)}</span></td>
            <td>
                <button class="action-btn" title="Edit" onclick="editMedicine('${medicine.id}')"><i class="fas fa-edit"></i></button>
                <button class="action-btn" title="Delete" onclick="deleteMedicine('${medicine.id}')"><i class="fas fa-trash"></i></button>
            </td>
        </tr>
    `).join('');
}

function formatCategory(category) {
    return category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function getStockStatus(stock) {
    if (stock === 0) return 'cancelled';
    if (stock <= 20) return 'pending';
    return 'active';
}

function getStockStatusText(stock) {
    if (stock === 0) return 'Out of Stock';
    if (stock <= 20) return 'Low Stock';
    return 'In Stock';
}

function resetForm() {
    event.target.closest('form').reset();
}
