document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            
            blogCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
            
            updatePagination();
        });
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    let searchTimeout;

    function normalizeText(text) {
        return text.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .trim();
    }

    function performSearch() {
        const searchTerm = normalizeText(searchInput.value);
        let hasResults = false;
        
        blogCards.forEach(card => {
            const title = normalizeText(card.querySelector('h2').textContent);
            const content = normalizeText(card.querySelector('p').textContent);
            const category = normalizeText(card.dataset.category);
            const tags = card.dataset.tags ? normalizeText(card.dataset.tags) : '';
            
            const matchesSearch = 
                title.includes(searchTerm) || 
                content.includes(searchTerm) || 
                category.includes(searchTerm) ||
                tags.includes(searchTerm);
            
            if (matchesSearch) {
                card.style.display = 'flex';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                hasResults = true;
            } else {
                card.style.display = 'none';
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
            }
        });
        
        // Afficher un message si aucun résultat
        const noResultsMessage = document.querySelector('.no-results');
        if (noResultsMessage) {
            noResultsMessage.style.display = hasResults || searchTerm === '' ? 'none' : 'block';
        }
        
        updatePagination();
    }

    // Debounce la recherche pour améliorer les performances
    searchInput.addEventListener('input', () => {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });

    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        performSearch();
    });

    // Ajouter la recherche par touche Entrée
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            performSearch();
        }
    });

    // Réinitialiser la recherche quand on efface le champ
    searchInput.addEventListener('search', () => {
        if (searchInput.value === '') {
            performSearch();
        }
    });

    // Blog search functionality
    const blogSearchInput = document.getElementById('blogSearchInput');
    const articleCards = document.querySelectorAll('.article-card');
    
    if (blogSearchInput) {
        blogSearchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            articleCards.forEach(card => {
                const title = card.querySelector('.article-title').textContent.toLowerCase();
                const content = card.querySelector('.article-preview').textContent.toLowerCase();
                const tags = Array.from(card.querySelectorAll('.article-tag')).map(tag => tag.textContent.toLowerCase());
                
                const matchesSearch = title.includes(searchTerm) || 
                                    content.includes(searchTerm) || 
                                    tags.some(tag => tag.includes(searchTerm));
                
                card.style.display = matchesSearch ? 'block' : 'none';
                
                // Animate the transition
                if (matchesSearch) {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                }
            });
            
            // Show/hide no results message
            const noResults = document.querySelector('.no-results');
            const visibleCards = Array.from(articleCards).filter(card => card.style.display !== 'none');
            
            if (noResults) {
                if (visibleCards.length === 0 && searchTerm !== '') {
                    noResults.style.display = 'block';
                } else {
                    noResults.style.display = 'none';
                }
            }
        });
    }
    
    // Add transition styles to article cards
    articleCards.forEach(card => {
        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    });

    // PDF Export functionality
    const exportButtons = document.querySelectorAll('.export-pdf-btn');
    
    exportButtons.forEach(button => {
        button.addEventListener('click', () => {
            const blogCard = button.closest('.blog-card');
            const content = blogCard.cloneNode(true);
            
            // Remove buttons from the PDF
            content.querySelectorAll('button').forEach(btn => btn.remove());
            
            const options = {
                margin: 1,
                filename: 'article-greenthumb.pdf',
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };
            
            html2pdf().from(content).set(options).save();
        });
    });

    // Read More functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', () => {
            const blogCard = button.closest('.blog-card');
            const content = blogCard.querySelector('p');
            
            if (content.classList.contains('expanded')) {
                content.classList.remove('expanded');
                button.textContent = 'Lire la suite';
            } else {
                content.classList.add('expanded');
                button.textContent = 'Réduire';
            }
        });
    });

    // Pagination functionality
    const itemsPerPage = 4;
    let currentPage = 1;
    
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    function updatePagination() {
        const visibleCards = Array.from(blogCards).filter(card => 
            card.style.display !== 'none'
        );
        
        const totalPages = Math.ceil(visibleCards.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        visibleCards.forEach((card, index) => {
            if (index >= startIndex && index < endIndex) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Update page numbers
        pageNumbers.forEach((pageNum, index) => {
            pageNum.classList.remove('active');
            if (index + 1 === currentPage) {
                pageNum.classList.add('active');
            }
        });
        
        // Update button states
        prevButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }
    
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });
    
    nextButton.addEventListener('click', () => {
        const totalPages = Math.ceil(blogCards.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
    
    pageNumbers.forEach((pageNum, index) => {
        pageNum.addEventListener('click', () => {
            currentPage = index + 1;
            updatePagination();
        });
    });
    
    // Initialize pagination
    updatePagination();
});

document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const articles = document.querySelectorAll('.article-card');
    
    // Fonction pour filtrer les articles
    function filterArticles() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasVisibleArticles = false;

        articles.forEach(article => {
            const title = article.querySelector('h3').textContent.toLowerCase();
            const content = article.querySelector('p').textContent.toLowerCase();
            
            if (searchTerm === '' || title.includes(searchTerm) || content.includes(searchTerm)) {
                article.style.display = '';
                // Animation d'apparition
                article.style.opacity = '0';
                article.style.transform = 'translateY(20px)';
                
                // Force le navigateur à recalculer le style
                article.offsetHeight;
                
                article.style.transition = 'all 0.3s ease-in-out';
                article.style.opacity = '1';
                article.style.transform = 'translateY(0)';
                hasVisibleArticles = true;
            } else {
                // Animation de disparition
                article.style.opacity = '0';
                article.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    if (article.style.opacity === '0') {
                        article.style.display = 'none';
                    }
                }, 300);
            }
        });

        // Gérer le message "Aucun article trouvé"
        let noResultsMessage = document.querySelector('.no-results-message');
        if (!hasVisibleArticles && searchTerm !== '') {
            if (!noResultsMessage) {
                noResultsMessage = document.createElement('p');
                noResultsMessage.className = 'no-results-message';
                noResultsMessage.textContent = 'Aucun article trouvé';
                noResultsMessage.style.textAlign = 'center';
                noResultsMessage.style.padding = '20px';
                noResultsMessage.style.color = '#666';
                document.querySelector('.blog-grid').appendChild(noResultsMessage);
                
                // Animation du message
                noResultsMessage.style.opacity = '0';
                noResultsMessage.style.transform = 'translateY(10px)';
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
        searchTimeout = setTimeout(filterArticles, 300);
    });

    // Initialiser les styles de transition pour tous les articles
    articles.forEach(article => {
        article.style.transition = 'all 0.3s ease-in-out';
    });
});

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
