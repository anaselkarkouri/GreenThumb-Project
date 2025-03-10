// Advanced Search functionality
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    // Extended product database
    const products = [
        {
            name: 'Menthe Marocaine',
            category: 'Plantes Aromatiques',
            price: 25,
            description: 'Menthe fraîche traditionnelle marocaine, parfaite pour le thé',
            image: 'images/menthe.jpg'
        },
        {
            name: 'Oranger',
            category: 'Agrumes',
            price: 150,
            description: 'Oranger produisant des oranges douces et juteuses',
            image: 'images/oranger.jpg'
        },
        {
            name: 'Palmier Dattier',
            category: 'Palmiers',
            price: 300,
            description: 'Palmier dattier traditionnel marocain',
            image: 'images/palmier.jpg'
        },
        {
            name: 'Jasmin Marocain',
            category: 'Plantes Ornementales',
            price: 45,
            description: 'Jasmin parfumé traditionnel',
            image: 'images/jasmin.jpg'
        },
        {
            name: 'Olivier',
            category: 'Arbres Fruitiers',
            price: 200,
            description: 'Olivier traditionnel marocain',
            image: 'images/olivier.jpg'
        }
    ];
    
    // Search with debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(() => {
            const query = searchInput.value.toLowerCase();
            performSearch(query);
        }, 300);
    });
    
    function performSearch(query) {
        const results = products.filter(product => 
            product.name.toLowerCase().includes(query) ||
            product.category.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
        );
        
        displayResults(results);
    }
    
    function displayResults(results) {
        searchResults.innerHTML = '';
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="no-results">
                    <p>Aucun résultat trouvé</p>
                </div>
            `;
            return;
        }
        
        results.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="category">${product.category}</p>
                    <p class="description">${product.description}</p>
                    <p class="price">${product.price} MAD</p>
                    <button onclick="addToCart(${JSON.stringify(product)})">
                        Ajouter au panier
                    </button>
                </div>
            `;
            searchResults.appendChild(productCard);
        });
    }
    
    // Export search results to PDF
    window.exportSearchResults = function() {
        if (searchResults.children.length === 0) return;
        
        const content = document.createElement('div');
        content.innerHTML = `
            <h2>Résultats de recherche - GreenThumb</h2>
            <p>Date: ${new Date().toLocaleDateString()}</p>
            ${searchResults.innerHTML}
        `;
        
        html2pdf()
            .from(content)
            .save('recherche-greenthumb.pdf');
    };
});
