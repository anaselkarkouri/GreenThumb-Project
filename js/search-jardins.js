document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const articles = document.querySelectorAll('.article-card');
    
    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        let hasResults = false;

        articles.forEach(article => {
            const title = article.querySelector('.article-title').textContent.toLowerCase();
            const content = article.querySelector('.article-excerpt').textContent.toLowerCase();
            const details = article.querySelector('.jardin-details').textContent.toLowerCase();
            
            // Check if the search term is found in title, content, or details
            if (title.includes(searchTerm) || 
                content.includes(searchTerm) || 
                details.includes(searchTerm)) {
                article.style.display = 'block';
                article.style.animation = 'fadeIn 0.5s ease-in-out';
                hasResults = true;
            } else {
                article.style.display = 'none';
            }
        });

        // Show no results message if needed
        const noResultsMsg = document.querySelector('.no-results-message');
        if (!hasResults) {
            if (!noResultsMsg) {
                const message = document.createElement('div');
                message.className = 'no-results-message';
                message.innerHTML = `
                    <div class="message-content">
                        <i class="fas fa-search"></i>
                        <p>Aucun jardin trouvé pour "${searchTerm}"</p>
                        <button class="reset-search">Voir tous les jardins</button>
                    </div>
                `;
                const grid = document.querySelector('.grid');
                grid.appendChild(message);

                // Add click event to reset button
                message.querySelector('.reset-search').addEventListener('click', resetSearch);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    function resetSearch() {
        searchInput.value = '';
        articles.forEach(article => {
            article.style.display = 'block';
            article.style.animation = 'fadeIn 0.5s ease-in-out';
        });
        const noResultsMsg = document.querySelector('.no-results-message');
        if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    // Search on button click
    searchButton.addEventListener('click', performSearch);

    // Search on enter key
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Live search as user types (with debounce)
    let searchTimeout;
    searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(performSearch, 300);
    });
});
