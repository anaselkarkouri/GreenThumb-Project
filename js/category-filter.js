document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const plantCards = document.querySelectorAll('.plant-card');

    // Function to filter plants
    function filterPlants(category) {
        plantCards.forEach(card => {
            if (category === 'all' || card.dataset.category === category) {
                card.style.display = 'block';
                // Add fade-in animation
                card.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                card.style.display = 'none';
            }
        });

        // Sauvegarder la catégorie sélectionnée
        localStorage.setItem('selectedCategory', category);
    }

    // Add click event to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter plants based on category
            filterPlants(button.dataset.category);
        });
    });

    // Restaurer la catégorie sélectionnée au chargement de la page
    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    const activeButton = document.querySelector(`.category-btn[data-category="${savedCategory}"]`);
    
    if (activeButton) {
        // Activer le bouton sauvegardé
        categoryButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
        
        // Appliquer le filtre sauvegardé
        filterPlants(savedCategory);
    }
});
