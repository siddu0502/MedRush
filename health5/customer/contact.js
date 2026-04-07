// DOM elements
const contactForm = document.getElementById('contactForm');

// Handle form submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulate sending message
    alert(`Thank you for your message, ${data.name}! We will get back to you soon.`);
    
    // Reset form
    contactForm.reset();
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}