// Theme handling for GreenThumb website
document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('.theme-toggle');
    const moonIcon = themeToggle.querySelector('i');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Vérifier le thème sauvegardé
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        moonIcon.classList.remove('fa-moon');
        moonIcon.classList.add('fa-sun');
    }

    // Gérer le changement de thème
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            moonIcon.classList.remove('fa-sun');
            moonIcon.classList.add('fa-moon');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            moonIcon.classList.remove('fa-moon');
            moonIcon.classList.add('fa-sun');
        }

        // Ajouter une animation de rotation
        moonIcon.classList.add('theme-toggle-spin');
        setTimeout(() => {
            moonIcon.classList.remove('theme-toggle-spin');
        }, 500);
    });

    // Mobile menu toggle
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Cart functionality
    updateCartCount();
});

// Update cart count from localStorage
function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    const count = localStorage.getItem('cartCount') || '0';
    cartCount.textContent = count;
}

// Add to cart function
function addToCart(productId, productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartCount', cart.reduce((total, item) => total + item.quantity, 0));
    updateCartCount();
}
