// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function addToCart(product) {
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Search functionality
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const searchResults = document.getElementById('searchResults');

const products = [
    { name: 'Menthe Marocaine', category: 'Plantes Aromatiques', price: 25 },
    { name: 'Oranger', category: 'Agrumes', price: 150 },
    { name: 'Palmier Dattier', category: 'Palmiers', price: 300 },
    // Add more products here
];

searchButton.addEventListener('click', performSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

function performSearch() {
    const query = searchInput.value.toLowerCase();
    const results = products.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.category.toLowerCase().includes(query)
    );
    
    displaySearchResults(results);
}

function displaySearchResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
        searchResults.innerHTML = '<p>Aucun résultat trouvé</p>';
        return;
    }
    
    results.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'category-card';
        productCard.innerHTML = `
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>${product.price} MAD</p>
            <button onclick="addToCart({name: '${product.name}', price: ${product.price}})">
                Ajouter au panier
            </button>
        `;
        searchResults.appendChild(productCard);
    });
}

// Export to PDF functionality
function exportToPDF() {
    const element = document.querySelector('.content-to-export');
    html2pdf()
        .from(element)
        .save('greenthumb-article.pdf');
}

// Gestion des saisons
document.addEventListener('DOMContentLoaded', function() {
    const seasonButtons = document.querySelectorAll('.season-btn');
    
    // Fonction pour afficher les plantes d'une saison
    function showPlants(season) {
        // Cacher toutes les sections de plantes
        document.querySelectorAll('.season-plants').forEach(section => {
            section.style.display = 'none';
        });
        
        // Afficher les plantes de la saison sélectionnée
        const selectedPlants = document.querySelector(`.season-plants[data-season="${season}"]`);
        if (selectedPlants) {
            selectedPlants.style.display = 'grid';
            // Ajouter l'animation
            selectedPlants.style.animation = 'none';
            selectedPlants.offsetHeight; // Forcer le reflow
            selectedPlants.style.animation = 'fadeIn 0.5s ease forwards';
        }
        
        // Mettre à jour les boutons
        seasonButtons.forEach(btn => {
            if (btn.getAttribute('data-season') === season) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }
    
    // Ajouter les écouteurs d'événements aux boutons
    seasonButtons.forEach(button => {
        button.addEventListener('click', function() {
            const season = this.getAttribute('data-season');
            showPlants(season);
        });
    });
    
    // Afficher les plantes d'été par défaut
    showPlants('ete');
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
    
    // Add export buttons to articles if they exist
    const exportButtons = document.querySelectorAll('.export-pdf-btn');
    exportButtons.forEach(button => {
        button.addEventListener('click', exportToPDF);
    });
});
