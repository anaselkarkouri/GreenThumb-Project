document.addEventListener('DOMContentLoaded', function() {
    // Get all export PDF buttons
    const exportButtons = document.querySelectorAll('.export-pdf-btn');
    
    // Add click event listener to each button
    exportButtons.forEach(button => {
        button.addEventListener('click', async function() {
            try {
                // Show loading indicator
                button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération PDF...';
                button.disabled = true;

                // Get the parent article
                const article = this.closest('.article-card');
                if (!article) return;
                
                // Create a clone of the article for PDF export
                const exportContent = article.cloneNode(true);
                
                // Remove the export button from the clone
                const exportBtn = exportContent.querySelector('.export-pdf-btn');
                if (exportBtn) {
                    exportBtn.remove();
                }
                
                // Get the garden name for the PDF filename
                const gardenName = article.querySelector('.article-title').textContent.trim();
                const filename = 'jardin-' + gardenName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '.pdf';
                
                // Configure PDF options
                const options = {
                    margin: [10, 10],
                    filename: filename,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: { 
                        scale: 2,
                        useCORS: true,
                        logging: false,
                        letterRendering: true
                    },
                    jsPDF: { 
                        unit: 'mm', 
                        format: 'a4', 
                        orientation: 'portrait',
                        compress: true
                    }
                };
                
                // Generate PDF
                await html2pdf()
                    .set(options)
                    .from(exportContent)
                    .save();

                // Reset button state
                button.innerHTML = '<i class="fas fa-file-pdf"></i> Exporter en PDF';
                button.disabled = false;
            } catch (error) {
                console.error('Error generating PDF:', error);
                // Reset button state and show error
                button.innerHTML = '<i class="fas fa-file-pdf"></i> Exporter en PDF';
                button.disabled = false;
                alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
            }
        });
    });
});
