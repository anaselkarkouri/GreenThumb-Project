document.addEventListener('DOMContentLoaded', function() {
    // Éléments DOM
    const searchInput = document.getElementById('searchInput');
    const plantCards = document.querySelectorAll('.plant-card');
    const categoryButtons = document.querySelectorAll('.category-btn');
    let currentCategory = 'all';

    // Initialiser les transitions pour les animations
    plantCards.forEach(card => {
        card.style.transition = 'all 0.3s ease-in-out';
        card.style.opacity = '1';
        card.style.transform = 'scale(1)';
    });

    // Fonction de filtrage des plantes
    function filterPlants() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasVisiblePlants = false;

        plantCards.forEach(card => {
            const plantName = card.querySelector('h3').textContent.toLowerCase();
            const plantDescription = card.querySelector('.plant-preview').textContent.toLowerCase();
            const plantCategory = card.dataset.category;
            
            // Vérifier si la plante correspond à la recherche (nom ou description)
            const matchesSearch = searchTerm === '' || 
                                plantName.includes(searchTerm) || 
                                plantDescription.includes(searchTerm);
            
            // Vérifier si la plante correspond à la catégorie sélectionnée
            const matchesCategory = currentCategory === 'all' || 
                                  plantCategory === currentCategory;

            // Appliquer le filtre avec animation
            if (matchesSearch && matchesCategory) {
                if (card.style.display === 'none') {
                    card.style.display = '';
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    
                    // Forcer un reflow pour que l'animation fonctionne
                    card.offsetHeight;
                    
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1)';
                }
                hasVisiblePlants = true;
            } else {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    if (card.style.opacity === '0') {
                        card.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Gérer le message "Aucune plante trouvée"
        updateNoResultsMessage(hasVisiblePlants, searchTerm);
    }

    // Fonction pour mettre à jour le message "Aucune plante trouvée"
    function updateNoResultsMessage(hasVisiblePlants, searchTerm) {
        let noResultsMessage = document.querySelector('.no-results-message');
        
        if (!hasVisiblePlants && searchTerm !== '') {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('p');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.textContent = 'Aucune plante trouvée';
                document.querySelector('.plantes-grid').appendChild(noResultsMessage);
                
                // Animer l'apparition du message
                noResultsMessage.style.opacity = '0';
                noResultsMessage.style.transform = 'translateY(10px)';
                
                // Forcer un reflow
                noResultsMessage.offsetHeight;
                
                noResultsMessage.style.transition = 'all 0.3s ease-in-out';
                noResultsMessage.style.opacity = '1';
                noResultsMessage.style.transform = 'translateY(0)';
            }
        } else if (noResultsMessage) {
            noResultsMessage.style.opacity = '0';
            noResultsMessage.style.transform = 'translateY(10px)';
            setTimeout(() => {
                noResultsMessage.remove();
            }, 300);
        }
    }

    // Écouteur d'événement pour la recherche avec debounce
    let searchTimeout;
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterPlants, 300);
    });

    // Écouteur d'événement pour les boutons de catégorie
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Mettre à jour l'état actif des boutons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Mettre à jour la catégorie et filtrer
            currentCategory = button.dataset.category;
            filterPlants();
        });
    });
});
