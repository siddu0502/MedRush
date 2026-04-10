// Smart Page Search functionality for MedRush - Searches within current page content
class PageSearchManager {
    constructor() {
        this.searchInput = null;
        this.searchBtn = null;
        this.searchResults = [];
        this.initializePageSearch();
    }

    initializePageSearch() {
        // Initialize page search
        this.searchInput = document.getElementById('pageSearch');
        this.searchBtn = document.getElementById('pageSearchBtn');
        
        if (this.searchInput && this.searchBtn) {
            this.setupSearchListeners();
        }
    }

    setupSearchListeners() {
        // Search on button click
        this.searchBtn.addEventListener('click', () => {
            this.performPageSearch();
        });

        // Search on Enter key
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                this.performPageSearch();
            }
        });

        // Auto-suggest as user types
        let searchTimeout;
        this.searchInput.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                this.showPageResults(e.target.value);
            }, 300);
        });

        // Hide results when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-container') && !e.target.closest('.page-search-results')) {
                this.hidePageResults();
            }
        });
    }

    performPageSearch() {
        const query = this.searchInput.value.trim();
        if (!query) return;

        // Get all searchable elements on current page
        const searchableElements = this.getSearchablePageElements();
        const results = searchableElements.filter(element => 
            element.name.toLowerCase().includes(query.toLowerCase())
        );

        this.showPageResults(results, query);
    }

    showPageResults(results, query) {
        // Remove existing results
        this.hidePageResults();

        if (results.length === 0) {
            // Show no results message
            this.showNoPageResultsMessage(query);
            return;
        }

        // Create results container
        const resultsContainer = document.createElement('div');
        resultsContainer.className = 'page-search-results';
        
        resultsContainer.innerHTML = `
            <div class="page-results-header">
                <h4>Found ${results.length} result${results.length !== 1 ? 's' : ''}</h4>
                <button class="close-results" onclick="this.hidePageResults()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="page-results-list">
                ${results.map(item => this.renderPageResultItem(item)).join('')}
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
        resultsContainer.style.maxHeight = '300px';
        resultsContainer.style.overflowY = 'auto';

        document.body.appendChild(resultsContainer);

        // Add click handlers for results
        resultsContainer.addEventListener('click', (e) => {
            const resultItem = e.target.closest('.page-result-item');
            if (resultItem) {
                const element = resultItem.dataset.element;
                this.highlightSearchResult(element);
                
                // Scroll to the element
                if (element) {
                    this.scrollToElement(element);
                }
            }
        });
    }

    hidePageResults() {
        const existingResults = document.querySelector('.page-search-results');
        if (existingResults) {
            existingResults.remove();
        }
        
        // Clear all highlights
        this.clearHighlights();
    }

    showNoPageResultsMessage(query) {
        const messageContainer = document.createElement('div');
        messageContainer.className = 'page-search-results';
        messageContainer.innerHTML = `
            <div class="page-results-header">
                <h4>No results found for "${query}"</h4>
                <button class="close-results" onclick="this.hidePageResults()">
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
        messageContainer.style.padding = '1rem';
        messageContainer.style.textAlign = 'center';

        document.body.appendChild(messageContainer);

        // Auto-hide after 3 seconds
        setTimeout(() => {
            this.hidePageResults();
        }, 3000);
    }

    renderPageResultItem(item) {
        return `
            <div class="page-result-item" data-element="${item.element}">
                <div class="page-result-icon">
                    <i class="fas ${this.getIconForType(item.type)}"></i>
                </div>
                <div class="page-result-content">
                    <h5>${item.name}</h5>
                    <p class="page-result-type">${item.type}</p>
                    ${item.element ? `<p class="page-result-element">${item.element}</p>` : ''}
                </div>
            </div>
        `;
    }

    getSearchablePageElements() {
        // Get all searchable elements on current page
        const elements = [];
        
        // Service buttons
        const serviceButtons = document.querySelectorAll('.service-btn');
        serviceButtons.forEach(btn => {
            const span = btn.querySelector('span');
            if (span) {
                elements.push({
                    name: span.textContent,
                    type: 'service',
                    element: btn
                });
            }
        });

        // Medicine items (if on medicine page)
        const medicineItems = document.querySelectorAll('.medicine-item');
        medicineItems.forEach(item => {
            const nameElement = item.querySelector('.medicine-name');
            if (nameElement) {
                elements.push({
                    name: nameElement.textContent,
                    type: 'medicine',
                    element: item
                });
            }
        });

        // Generic items (if on generic page)
        const genericItems = document.querySelectorAll('.generic-item');
        genericItems.forEach(item => {
            const nameElement = item.querySelector('.generic-name');
            if (nameElement) {
                elements.push({
                    name: nameElement.textContent,
                    type: 'medicine',
                    element: item
                });
            }
        });

        // Cart items (if on cart page)
        const cartItems = document.querySelectorAll('.cart-item');
        cartItems.forEach(item => {
            const nameElement = item.querySelector('.cart-item-name');
            if (nameElement) {
                elements.push({
                    name: nameElement.textContent,
                    type: 'medicine',
                    element: item
                });
            }
        });

        // Order items (if on orders page)
        const orderItems = document.querySelectorAll('.order-item');
        orderItems.forEach(item => {
            const nameElement = item.querySelector('.order-item-name');
            if (nameElement) {
                elements.push({
                    name: nameElement.textContent,
                    type: 'medicine',
                    element: item
                });
            }
        });

        return elements;
    }

    getIconForType(type) {
        const icons = {
            medicine: 'fa-pills',
            service: 'fa-stethoscope',
            test: 'fa-flask'
        };
        return icons[type] || 'fa-search';
    }

    highlightSearchResult(element) {
        // Clear previous highlights
        this.clearHighlights();
        
        // Highlight the found element
        if (element) {
            element.style.border = '3px solid var(--primary-color)';
            element.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
            element.style.transform = 'scale(1.02)';
            
            // Scroll to element
            setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }, 100);
            
            // Remove highlight after 3 seconds
            setTimeout(() => {
                this.clearHighlights();
            }, 3000);
        }
    }

    clearHighlights() {
        // Remove all highlights
        const highlightedElements = document.querySelectorAll('[style*="border: 3px solid var(--primary-color)"]');
        highlightedElements.forEach(element => {
            element.style.border = '';
            element.style.boxShadow = '';
            element.style.transform = '';
        });
    }

    scrollToElement(element) {
        element.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'nearest' 
        });
    }
}

// Initialize page search when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.pageSearchManager = new PageSearchManager();
});
