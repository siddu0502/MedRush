// DOM Elements
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const userBtn = document.getElementById('userBtn');
const loginModal = document.getElementById('loginModal');
const closeModal = document.getElementById('closeModal');
const loginForm = document.querySelector('.login-form');
const languageSelect = document.getElementById('languageSelect');
const talkButton = document.getElementById('talkButton');

// Always show navbar
const updateNavVisibility = () => {
    if (navMenu) {
        navMenu.style.display = 'flex';
        navMenu.classList.remove('active');
    }
};

// Close mobile menu when a nav link is clicked
const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
    });
});

// Update cart count
const updateCartCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartCountEl = document.getElementById('cart-count');
    if (cartCountEl) {
        cartCountEl.textContent = total;
    }
};

// Hamburger Menu Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// User Login Button
userBtn.addEventListener('click', () => {
    loginModal.classList.add('active');
});

// set initial nav state
updateNavVisibility();
updateCartCount();

// Letter by letter animation for hero text
const initHeroTextAnimation = () => {
    const animatedLines = document.querySelectorAll('.animated-line');
    
    animatedLines.forEach((line, lineIndex) => {
        const text = line.textContent;
        line.textContent = '';
        
        // Wrap each letter in a span
        text.split('').forEach((letter, letterIndex) => {
            const span = document.createElement('span');
            span.textContent = letter === ' ' ? '\u00A0' : letter; // Use non-breaking space
            span.style.animationDelay = `${(lineIndex * 0.3) + (letterIndex * 0.05)}s`;
            line.appendChild(span);
        });
    });
};

// Initialize animation when page loads
document.addEventListener('DOMContentLoaded', initHeroTextAnimation);

// Service Buttons - All 9 cards
const medicineBtn = document.getElementById('medicineBtn');
const genericBtn = document.getElementById('genericBtn');
const homeopathyBtn = document.getElementById('homeopathyBtn');
const labtestBtn = document.getElementById('labtestBtn');
const nutritionBtn = document.querySelector('.nutrition-btn');
const doctorBtn = document.querySelector('.doctor-btn');
const teleconsultBtn = document.querySelector('.teleconsult-btn');
const tipsBtn = document.querySelector('.tips-btn');
const pharmacyBtn = document.querySelector('.pharmacy-btn');

const allServiceBtns = [
    { btn: homeopathyBtn, name: 'Homeopathy' },
    { btn: labtestBtn, name: 'Lab Test' },
    { btn: nutritionBtn, name: 'Nutrition' },
    { btn: doctorBtn, name: 'Call Your Doctor' },
    { btn: teleconsultBtn, name: 'Teleconsultation' },
    { btn: tipsBtn, name: 'Health Tips' },
    { btn: pharmacyBtn, name: 'Pharmacy Near Me' }
];

allServiceBtns.forEach(({ btn, name }) => {
    if (btn) {
        btn.addEventListener('click', () => {
            console.log(`${name} selected`);
            alert(`Redirecting to ${name}...`);
        });
    }
});


// Service cards and search
const serviceSearch = document.getElementById('serviceSearch');
const serviceGrid = document.getElementById('serviceGrid');
const serviceCards = Array.from(document.querySelectorAll('.service-card'));

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceName = card.dataset.name;
        console.log(`${serviceName} card clicked`);
        alert(`Selected service: ${serviceName}`);
    });
});

function performServiceSearch() {
    const value = serviceSearch.value.trim().toLowerCase();
    serviceCards.forEach(card => {
        const name = card.dataset.name.toLowerCase();
        if (!value || name.includes(value)) {
            card.classList.remove('hidden');
        } else {
            card.classList.add('hidden');
        }
    });
}

serviceSearch.addEventListener('input', performServiceSearch);

const serviceSearchBtn = document.getElementById('searchBtn');
if (serviceSearchBtn) {
    serviceSearchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        performServiceSearch();
    });
}

serviceSearch.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        performServiceSearch();
    }
});

// Close Modal
closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.classList.remove('active');
    }
});

// One-time OTP for login progress
let loginStep = 'phone';
const OTP_CODE = '1234';

// Handle Login Form Submit
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const phoneEl = document.getElementById('phone');
    const otpEl = document.getElementById('otp');
    const otpGroup = document.getElementById('otpGroup');
    const loginTitle = document.getElementById('loginTitle');
    const loginBtn = document.getElementById('loginBtn');

    if (loginStep === 'phone') {
        const phone = phoneEl.value.trim();
        if (!/^[0-9]{10}$/.test(phone)) {
            alert('Please enter a valid 10-digit phone number.');
            return;
        }

        // Simulate send OTP
        loginStep = 'otp';
        phoneEl.disabled = true;
        otpGroup.style.display = 'block';
        loginTitle.textContent = 'Enter OTP';
        loginBtn.textContent = 'Verify OTP';
        alert(`OTP sent to ${phone}. Use: ${OTP_CODE}`);

    } else if (loginStep === 'otp') {
        const otp = otpEl.value.trim();
        if (!/^[0-9]{4}$/.test(otp)) {
            alert('Please enter a valid 4-digit OTP.');
            return;
        }

        if (otp !== OTP_CODE) {
            alert('Incorrect OTP. Please try again.');
            return;
        }

        sessionStorage.setItem('isLoggedIn', 'true');
        updateNavVisibility();

        alert('Login successful. You can now see Home, Cart, My orders, Contact us.');

        // reset to initial state
        loginStep = 'phone';
        phoneEl.disabled = false;
        phoneEl.value = '';
        otpEl.value = '';
        otpGroup.style.display = 'none';
        loginTitle.textContent = 'Login with Phone';
        loginBtn.textContent = 'Continue';
        loginForm.reset();
        loginModal.classList.remove('active');
    }
});

// Reset login modal state when closing
closeModal.addEventListener('click', () => {
    loginModal.classList.remove('active');
    loginStep = 'phone';
    document.getElementById('phone').disabled = false;
    document.getElementById('otpGroup').style.display = 'none';
    document.getElementById('loginTitle').textContent = 'Login with Phone';
    document.getElementById('loginBtn').textContent = 'Continue';
    loginForm.reset();
});

// Handle responsiveness
function handleResponsiveness() {
    if (window.innerWidth > 768 && navMenu) {
        if (hamburger) hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

window.addEventListener('resize', handleResponsiveness);

// Language selector and translations
const translations = {
    en: {
        heroTitle: 'Welcome to MedRush',
        heroSubtitle: 'Your trusted online healthcare platform',
        serviceSearchPlaceholder: 'Search for medicines, lab tests...',
        medicinText: 'Medicine',
        genericText: 'Generic',
        homeopathyText: 'Homeopathy',
        labtestText: 'Lab Test',
        nutritionText: 'Nutrition Med',
        doctorText: 'Call Your Doctor',
        contactTitle: 'Contact Us',
        footerMedrush: 'Your trusted online healthcare platform providing medicines, lab tests, and doctor consultation.',
        footerQuickLinks: 'Quick Links',
        footerContact: 'Contact Us',
        footerCopyright: ' 2026 MedRush. All rights reserved.'
    },
    hi: {
        heroTitle: '?????? ?? ????? ???',
        heroSubtitle: '???? ??????????? ??????????? ???????????',
        serviceSearchPlaceholder: 'Dawaiyan, lab test khojhein...',
        medicinText: '????',
        genericText: '??????',
        homeopathyText: '????????',
        labtestText: '???? ????',
        nutritionText: '????? ????',
        doctorText: '????? ?????? ????',
        contactTitle: '????? ??? ????? ????',
        footerMedrush: '???????, ????? ???? ?? ????? ????? ?????? ???? ?? ??????????? ???????????',
        footerQuickLinks: '?????? ?????',
        footerContact: '????? ????',
        footerCopyright: ' 2026 MedRush. ??? ????? ??????'
    },
    te: {
        serviceSearchPlaceholder: 'మందులు, ల్యాబ్ పరీక్షలు శోధించండి...',
        medicinText: 'మందు',
        genericText: 'జనరల్',
        homeopathyText: 'హోమీయోపతి',
        labtestText: 'ల్యాబ్ పరీక్ష',
        nutritionText: 'పోషక మందు',
        doctorText: 'మీ డాక్టర్‌ను కాల్ చేయండి',
        contactTitle: 'మాతో సంప్రదించండి',
        footerMedrush: 'మందులు, ల్యాబ్ పరీక్షలు మరియు డాక్టర్ కన్సల్టేషన్‌ను అందించే మీ నమ్మకమైన ఆన్‌లైన్ ఆరోగ్య సంరక్షణ ప్లాట్‌ఫారం.',
        footerQuickLinks: 'త్వరిత లింకులు',
        footerContact: 'మా ను సంప్రదించండి',
        footerCopyright: '© 2026 MedRush. అన్ని హక్కులు ఆదా.'
    }
};

function setLanguage(lang) {
    const langData = translations[lang] || translations.en;

    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };
    const setPlaceholder = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.placeholder = value;
    };

    setText('heroTitle', langData.heroTitle);
    setText('heroSubtitle', langData.heroSubtitle);
    setPlaceholder('serviceSearch', langData.serviceSearchPlaceholder);
    setText('medicineText', langData.medicinText);
    setText('genericText', langData.genericText);
    setText('homeopathyText', langData.homeopathyText);
    setText('labtestText', langData.labtestText);
    setText('nutritionText', langData.nutritionText);
    setText('doctorText', langData.doctorText);
    setText('contactTitle', langData.contactTitle);
    setText('footerDescription', langData.footerMedrush);
    setText('footerQuickLinks', langData.footerQuickLinks);
    setText('footerContact', langData.footerContact);
    setText('footerCopyright', langData.footerCopyright);
}

if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
        setLanguage(e.target.value);
    });
}

if (talkButton) {
    talkButton.addEventListener('click', () => {
        alert('Hi! How can we help you today?');
    });
}


// Smooth scroll for navigation links (if you add href attributes)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});

// Header scroll effect (optional - add shadow when scrolling)
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (window.scrollY > 0) {
        header.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
});

// Animate each character in the hero text block
function animateHeroText() {
    const lines = document.querySelectorAll('.animated-line');
    lines.forEach((line, lineIndex) => {
        const text = line.textContent;
        line.textContent = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.style.animationDelay = `${(lineIndex * 0.3) + (index * 0.06)}s`;
            // Preserve spaces by adding non-breaking space for space characters
            if (char === ' ') {
                span.style.whiteSpace = 'pre';
            }
            line.appendChild(span);
        });
    });
}

document.addEventListener('DOMContentLoaded', animateHeroText);