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

