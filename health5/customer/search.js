// Enhanced Search functionality for MedRush - Shows results inline instead of redirecting
class SearchManager {
    constructor() {
        this.searchInput = null;
        this.searchBtn = null;
        this.searchResults = [];
        this.initializeSearch();
    }

    initializeSearch() {
        // Initialize global search
        this.searchInput = document.getElementById('globalSearch');
        this.searchBtn = document.getElementById('globalSearchBtn');
        
        if (this.searchInput && this.searchBtn) {
            this.setupSearchListeners();
        }

        // Initialize service search if exists
        const serviceSearch = document.getElementById('serviceSearch');
        const serviceSearchBtn = document.getElementById('searchBtn');
        
        if (serviceSearch && serviceSearchBtn) {
            this.setupServiceSearch(serviceSearch, serviceSearchBtn);
        }
    }

    setupSearchListeners() {
        // Search on button click
        this.searchBtn.addEventListener('click', () => {
            this.performSearch();
        });

        // Search on Enter key
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performSearch();
            }
        });

        // Auto-suggest as user types
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.showInlineResults(e.target.value);
            }, 300);
        });

        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container') && !e.target.closest('.inline-search-results')) {
                this.hideInlineResults();
            }
        });
    }

    setupServiceSearch(input, btn) {
        btn.addEventListener('click', () => {
            this.performServiceSearch(input.value);
        });

        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performServiceSearch(input.value);
            }
        });
    }

    performSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        // Store search query
        localStorage.setItem('lastSearchQuery', query);
        
        // Show inline search results
        this.showInlineResults(query);
    }

    performServiceSearch(query) {
        if (!query) return;
        
        // For service search, we can filter service buttons or redirect
        const serviceButtons = document.querySelectorAll('.service-btn');
        let foundMatch = false;

        serviceButtons.forEach(btn => {
            const serviceName = btn.querySelector('span')?.textContent.toLowerCase();
            if (serviceName && serviceName.includes(query.toLowerCase())) {
                btn.style.border = '3px solid var(--primary-color)';
                btn.style.transform = 'scale(1.05)';
                foundMatch = true;
                
                setTimeout(() => {
                    btn.style.border = '';
                    btn.style.transform = '';
                }, 2000);
            }
        });

        if (!foundMatch) {
            // If no service matches, perform global search
            this.searchInput.value = query;
            this.performSearch();
        }
    }

    showInlineResults(query) {
        if (!query || query.length < 2) {
            this.hideInlineResults();
            return;
        }

        const allItems = this.getSearchableItems();
        const results = allItems.filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
        );

        this.renderInlineResults(results, query);
    }

    hideInlineResults() {
        const existingResults = document.querySelector('.inline-search-results');
        if (existingResults) {
            existingResults.remove();
        }
    }

    renderInlineResults(results, query) {
        // Remove existing results
        this.hideInlineResults();

        if (results.length === 0) {
            // Show no results message
            this.showNoResultsMessage(query);
            return;
        }

        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'inline-search-results';
        
        resultsContainer.innerHTML = `
            <div class="inline-results-header">
                <h3>Search Results for "${query}"</h3>
                <p>Found ${results.length} result${results.length !== 1 ? 's' : ''}</p>
                <button class="close-results" onclick="this.hideInlineResults()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="inline-results-grid">
                ${results.map(item => this.renderInlineResultItem(item)).join('')}
            </div>
        `;

        // Position results below search bar
        const searchRect = this.searchInput.getBoundingClientRect();
        resultsContainer.style.position = 'absolute';
        resultsContainer.style.top = `${searchRect.bottom + 10}px`;
        resultsContainer.style.left = `${searchRect.left}px`;
        resultsContainer.style.width = `${Math.max(searchRect.width, 300)}px`;
        resultsContainer.style.zIndex = '1000';
        resultsContainer.style.background = 'white';
        resultsContainer.style.border = '1px solid #e2e8f0';
        resultsContainer.style.borderRadius = '8px';
        resultsContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        resultsContainer.style.maxHeight = '400px';
        resultsContainer.style.overflowY = 'auto';

        document.body.appendChild(resultsContainer);

        // Add click handlers for results
        resultsContainer.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.inline-result-item');
            if (resultItem) {
                const name = resultItem.dataset.name;
                const type = resultItem.dataset.type;
                
                // Add to cart functionality
                if (e.target.closest('.btn-add-to-cart')) {
                    this.addToCart(name, type);
                }
                
                // Navigate to medicine page if it's a medicine
                if (type === 'medicine') {
                    window.location.href = `medicine.html?search=${encodeURIComponent(name)}`;
                }
            }
        });
    }

    showNoResultsMessage(query) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'inline-search-results';
        messageContainer.innerHTML = `
            <div class="inline-results-header">
                <h3>Search Results for "${query}"</h3>
                <p>No results found</p>
                <button class="close-results" onclick="this.hideInlineResults()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        const searchRect = this.searchInput.getBoundingClientRect();
        messageContainer.style.position = 'absolute';
        messageContainer.style.top = `${searchRect.bottom + 10}px`;
        messageContainer.style.left = `${searchRect.left}px`;
        messageContainer.style.width = `${Math.max(searchRect.width, 300)}px`;
        messageContainer.style.zIndex = '1000';
        messageContainer.style.background = 'white';
        messageContainer.style.border = '1px solid #e2e8f0';
        messageContainer.style.borderRadius = '8px';
        messageContainer.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        messageContainer.style.padding = '1.5rem';
        messageContainer.style.textAlign = 'center';

        document.body.appendChild(messageContainer);

        // Auto-hide after 5 seconds
        setTimeout(() => {
            this.hideInlineResults();
        }, 5000);
    }

    renderInlineResultItem(item) {
        return `
            <div class="inline-result-item" data-name="${item.name}" data-type="${item.type}">
                <div class="inline-result-icon">
                    <i class="fas ${this.getIconForType(item.type)}"></i>
                </div>
                <div class="inline-result-content">
                    <h4>${item.name}</h4>
                    <p class="inline-result-category">${item.category}</p>
                    <p class="inline-result-type">${item.type}</p>
                    <button class="btn-add-to-cart" onclick="this.addToCart('${item.name}', '${item.type}')">
                        <i class="fas fa-cart-plus"></i> Add to Cart
                    </button>
                </div>
            </div>
        `;
    }

    getSearchableItems() {
        // Mock data for medicines and services
        return [
            { name: 'Paracetamol', type: 'medicine', category: 'fever' },
            { name: 'Aspirin', type: 'medicine', category: 'pain' },
            { name: 'Ibuprofen', type: 'medicine', category: 'pain' },
            { name: 'Cough Syrup', type: 'medicine', category: 'cough' },
            { name: 'Blood Test', type: 'test', category: 'diagnostic' },
            { name: 'COVID Test', type: 'test', category: 'diagnostic' },
            { name: 'Vitamin D', type: 'supplement', category: 'vitamins' },
            { name: 'Vitamin C', type: 'supplement', category: 'vitamins' },
            { name: 'Homeopathy Medicine', type: 'medicine', category: 'homeopathy' },
            { name: 'Doctor Consultation', type: 'service', category: 'consultation' }
        ];
    }

    getIconForType(type) {
        const icons = {
            medicine: 'fa-pills',
            test: 'fa-flask',
            supplement: 'fa-capsules',
            service: 'fa-stethoscope'
        };
        return icons[type] || 'fa-search';
    }

    // Add to cart functionality
    addToCart(name, type) {
        // Mock add to cart functionality
        const cart = JSON.parse(localStorage.getItem('pharmacyCart')) || [];
        const newItem = {
            name: name,
            type: type,
            meta: `${type.charAt(0).toUpperCase() + type.slice(1)} product`,
            price: Math.floor(Math.random() * 500) + 50,
            quantity: 1
        };
        
        cart.push(newItem);
        localStorage.setItem('pharmacyCart', JSON.stringify(cart));
        
        // Show success message
        this.showNotification(`${name} added to cart!`);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--success-color);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Global search functions
function addToCart(name, type) {
    window.searchManager.addToCart(name, type);
}

// Initialize search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.searchManager = new SearchManager();
    
    // Handle search results page
    const urlParams = new URLSearchParams(window.location.search);
    const query = urlParams.get('q');
    if (query && window.location.pathname.includes('search.html')) {
        // Don't initialize inline search on search results page
        return;
    }
});

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .search-suggestions {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        max-height: 300px;
        overflow-y: auto;
    }
    
    .suggestion-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 0.75rem 1rem;
        cursor: pointer;
        transition: background-color 0.2s ease;
    }
    
    .suggestion-item:hover {
        background-color: #f8fafc;
    }
    
    .suggestion-content {
        flex: 1;
    }
    
    .suggestion-name {
        display: block;
        font-weight: 600;
        color: var(--text-color);
    }
    
    .suggestion-type {
        display: block;
        font-size: 0.85rem;
        color: #64748b;
    }
    
    .no-results {
        text-align: center;
        padding: 3rem;
        color: #64748b;
    }
    
    .no-results i {
        font-size: 3rem;
        margin-bottom: 1rem;
        color: #cbd5e1;
    }
    
    .results-header {
        margin-bottom: 2rem;
    }
    
    .results-header h2 {
        color: var(--text-color);
        margin-bottom: 0.5rem;
    }
    
    .results-header p {
        color: #64748b;
    }
    
    .results-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 1.5rem;
    }
    
    .result-item {
        background: white;
        border: 1px solid #e2e8f0;
        border-radius: 12px;
        padding: 1.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        transition: all 0.2s ease;
    }
    
    .result-item:hover {
        box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        transform: translateY(-2px);
    }
    
    .result-icon {
        width: 50px;
        height: 50px;
        background: #f0f9ff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--primary-color);
        font-size: 1.2rem;
    }
    
    .result-content {
        flex: 1;
    }
    
    .result-content h3 {
        margin: 0 0 0.25rem 0;
        color: var(--text-color);
    }
    
    .result-category {
        color: #64748b;
        font-size: 0.9rem;
        margin: 0 0 0.25rem 0;
    }
    
    .result-type {
        color: var(--primary-color);
        font-size: 0.85rem;
        font-weight: 600;
        margin: 0;
    }
    
    .btn-add-to-cart {
        background: var(--primary-color);
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.85rem;
        transition: background-color 0.2s ease;
    }
    
    .btn-add-to-cart:hover {
        background: #0a5a72;
    }
`;
document.head.appendChild(style);
