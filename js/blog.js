document.addEventListener('DOMContentLoaded', function() {
    // Gestion de la pagination
    const pages = document.querySelectorAll('.blog-grid');
    const paginationButtons = document.querySelectorAll('.pagination-btn');

    // Récupérer la page sauvegardée ou utiliser la page 1 par défaut
    const currentPage = parseInt(localStorage.getItem('currentBlogPage')) || 1;

    function showPage(pageNumber) {
        // Cacher toutes les pages
        pages.forEach(page => {
            page.style.display = 'none';
            page.classList.add('hidden');
        });

        // Afficher la page sélectionnée
        const selectedPage = document.getElementById('page' + pageNumber);
        if (selectedPage) {
            selectedPage.style.display = 'grid';
            selectedPage.classList.remove('hidden');
            
            // Animation d'apparition
            selectedPage.style.opacity = '0';
            selectedPage.style.transform = 'translateY(20px)';
            
            // Force le navigateur à recalculer le style
            selectedPage.offsetHeight;
            
            selectedPage.style.transition = 'all 0.3s ease-in-out';
            selectedPage.style.opacity = '1';
            selectedPage.style.transform = 'translateY(0)';
        }

        // Mettre à jour les boutons de pagination
        paginationButtons.forEach(button => {
            button.classList.remove('active');
            if (button.dataset.page === pageNumber.toString()) {
                button.classList.add('active');
            }
        });

        // Sauvegarder la page courante
        localStorage.setItem('currentBlogPage', pageNumber);
    }

    // Ajouter les écouteurs d'événements pour les boutons de pagination
    paginationButtons.forEach(button => {
        button.addEventListener('click', () => {
            const pageNumber = parseInt(button.dataset.page);
            showPage(pageNumber);
        });
    });

    // Gestion du contenu détaillé des articles
    const readMoreButtons = document.querySelectorAll('.read-more');
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const articleContent = this.previousElementSibling;
            const isExpanded = articleContent.style.display === 'block';

            if (!isExpanded) {
                // Afficher le contenu
                articleContent.style.display = 'block';
                articleContent.style.opacity = '0';
                articleContent.style.maxHeight = '0';
                
                // Force le navigateur à recalculer le style
                articleContent.offsetHeight;
                
                // Animation d'apparition
                articleContent.style.transition = 'all 0.5s ease-in-out';
                articleContent.style.opacity = '1';
                articleContent.style.maxHeight = '1000px';
                
                // Changer le texte du bouton
                this.textContent = 'Voir moins';
            } else {
                // Animation de disparition
                articleContent.style.opacity = '0';
                articleContent.style.maxHeight = '0';
                
                // Attendre la fin de l'animation avant de cacher
                setTimeout(() => {
                    articleContent.style.display = 'none';
                }, 500);
                
                // Changer le texte du bouton
                this.textContent = 'Lire la suite';
            }
        });
    });

    // Afficher la page sauvegardée au chargement
    showPage(currentPage);

    // Gestion des formulaires de commentaires
    const commentForms = document.querySelectorAll('.comment-form');
    commentForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const nameInput = this.querySelector('input[type="text"]');
            const commentInput = this.querySelector('textarea');
            
            if (nameInput.value.trim() && commentInput.value.trim()) {
                // Ici vous pouvez ajouter la logique pour sauvegarder le commentaire
                alert('Commentaire publié avec succès !');
                nameInput.value = '';
                commentInput.value = '';
            }
        });
    });
});
