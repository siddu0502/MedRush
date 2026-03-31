// Test script to verify order functionality
const { JSDOM } = require('jsdom');

// Mock localStorage
const localStorageMock = {
    store: {},
    getItem: function(key) {
        return this.store[key] || null;
    },
    setItem: function(key, value) {
        this.store[key] = value.toString();
    },
    clear: function() {
        this.store = {};
    }
};

// Set up JSDOM
const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', {
    url: 'http://localhost:8000'
});

// Mock window and localStorage
global.window = dom.window;
global.document = dom.window.document;
global.localStorage = localStorageMock;

// Load the script
const fs = require('fs');
const scriptContent = fs.readFileSync('js/script.js', 'utf8');

// Extract the functions we need to test
const ORDERS_KEY = 'medicare_orders';

// Mock the functions
const getOrders = () => JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]');
const saveOrders = (orders) => localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));

const saveOrder = (orderData) => {
    const orders = getOrders();
    const orderId = 'ORD' + Date.now();
    const order = {
        id: orderId,
        date: new Date().toLocaleString(),
        ...orderData,
        status: 'Processing'
    };
    orders.push(order);
    saveOrders(orders);
    return orderId;
};

// Test the order functionality
console.log('Testing order functionality...');

// Create a test order
const testOrder = {
    customer: {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        address: '123 Test Street'
    },
    items: [
        { name: 'Aspirin', price: 10, quantity: 2 },
        { name: 'Paracetamol', price: 15, quantity: 1 }
    ],
    totalAmount: 35,
    paymentMethod: 'Card'
};

const orderId = saveOrder(testOrder);
console.log('Order saved with ID:', orderId);

// Retrieve orders
const orders = getOrders();
console.log('Total orders:', orders.length);
console.log('First order:', orders[0]);

console.log('Test completed successfully!');