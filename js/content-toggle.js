document.addEventListener('DOMContentLoaded', function() {
    // Get all read more buttons
    const readButtons = document.querySelectorAll('.btn-read');
    
    // Add click event listener to each button
    readButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Find the closest parent article
            const article = this.closest('.plant-card, .blog-post');
            if (!article) return;
            
            // Find the details section and preview
            const details = article.querySelector('.plant-details, .blog-details');
            const preview = article.querySelector('.plant-preview, .blog-preview');
            
            // Toggle the hidden class
            if (details) {
                details.classList.toggle('hidden');
                if (preview) {
                    preview.classList.toggle('hidden');
                }
                
                // Update button text
                this.textContent = details.classList.contains('hidden') ? 'Lire la suite' : 'Voir moins';
            }
        });
    });
});
