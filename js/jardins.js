// Gestion de la recherche
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    const jardinCards = document.querySelectorAll('.jardin-card');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        jardinCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            const details = card.querySelector('.jardin-details').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm) || details.includes(searchTerm)) {
                card.style.display = 'flex';
                card.classList.add('fade-in');
            } else {
                card.style.display = 'none';
                card.classList.remove('fade-in');
            }
        });
        
        updatePagination();
    }

    searchInput.addEventListener('input', performSearch);
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // PDF Export functionality
    const exportButtons = document.querySelectorAll('.export-pdf-btn');
    exportButtons.forEach(button => {
        button.addEventListener('click', function() {
            const jardinCard = this.closest('.jardin-card');
            const title = jardinCard.querySelector('h3').textContent;
            
            const opt = {
                margin: 1,
                filename: `${title}.pdf`,
                image: { type: 'jpeg', quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
            };

            // Add loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exportation...';
            button.disabled = true;

            // Create a clone of the article to modify for PDF
            const jardinClone = jardinCard.cloneNode(true);
            jardinClone.style.width = '100%';
            jardinClone.style.maxWidth = '800px';
            jardinClone.style.margin = '0 auto';
            jardinClone.style.padding = '20px';
            
            // Generate PDF
            html2pdf().from(jardinClone).set(opt).save()
                .then(() => {
                    // Reset button state with success message
                    button.innerHTML = '<i class="fas fa-check"></i> Exporté !';
                    setTimeout(() => {
                        button.innerHTML = '<i class="fas fa-file-pdf"></i> Exporter en PDF';
                        button.disabled = false;
                    }, 2000);
                })
                .catch(err => {
                    console.error('Erreur lors de l\'export:', err);
                    button.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Erreur';
                    button.disabled = false;
                });
        });
    });

    // Garden Planning Canvas
    const canvas = document.getElementById('gardenCanvas');
    const ctx = canvas.getContext('2d');
    const clearButton = document.getElementById('clearCanvas');
    const saveButton = document.getElementById('savePlan');
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // Set canvas size
    function resizeCanvas() {
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetWidth * 0.75; // 4:3 ratio
    }

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Drawing functionality
    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [
            e.offsetX || e.touches[0].clientX - canvas.offsetLeft,
            e.offsetY || e.touches[0].clientY - canvas.offsetTop
        ];
    }

    function draw(e) {
        if (!isDrawing) return;
        
        const currentX = e.offsetX || e.touches[0].clientX - canvas.offsetLeft;
        const currentY = e.offsetY || e.touches[0].clientY - canvas.offsetTop;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(currentX, currentY);
        ctx.strokeStyle = '#2ecc71';
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        [lastX, lastY] = [currentX, currentY];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', startDrawing);
    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('touchend', stopDrawing);

    // Clear canvas
    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    });

    // Save canvas
    saveButton.addEventListener('click', () => {
        const link = document.createElement('a');
        link.download = 'mon-plan-de-jardin.png';
        link.href = canvas.toDataURL();
        link.click();
    });

    // Initialize garden elements
    const gardenElements = [
        { name: 'Fontaine', icon: 'water' },
        { name: 'Arbre', icon: 'tree' },
        { name: 'Banc', icon: 'bench' },
        { name: 'Pergola', icon: 'archway' },
        { name: 'Plante', icon: 'seedling' }
    ];

    const draggableContainer = document.getElementById('draggableElements');
    gardenElements.forEach(element => {
        const div = document.createElement('div');
        div.className = 'garden-element';
        div.innerHTML = `
            <i class="fas fa-${element.icon}"></i>
            <span>${element.name}</span>
        `;
        draggableContainer.appendChild(div);
    });

    // Garden Planning Drag and Drop
    const draggableElements = document.querySelectorAll('.garden-element');
    const gardenCanvas = document.getElementById('gardenCanvas');
    const saveButton = document.getElementById('saveGarden');

    // Load saved garden layout
    let gardenLayout = JSON.parse(localStorage.getItem('gardenLayout')) || [];
    
    // Initialize garden with saved layout
    gardenLayout.forEach(element => {
        createGardenElement(element.type, element.position);
    });

    draggableElements.forEach(element => {
        element.addEventListener('dragstart', handleDragStart);
        element.addEventListener('dragend', handleDragEnd);
    });

    gardenCanvas.addEventListener('dragover', handleDragOver);
    gardenCanvas.addEventListener('drop', handleDrop);

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.dataset.type);
        e.target.classList.add('dragging');
    }

    function handleDragEnd(e) {
        e.target.classList.remove('dragging');
    }

    function handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
    }

    function handleDrop(e) {
        e.preventDefault();
        const elementType = e.dataTransfer.getData('text/plain');
        
        const rect = gardenCanvas.getBoundingClientRect();
        const position = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        createGardenElement(elementType, position);
        updateGardenLayout();
    }

    function createGardenElement(type, position) {
        const element = document.createElement('div');
        element.className = 'garden-element placed';
        element.dataset.type = type;
        
        const img = document.createElement('img');
        img.src = `images/elements/${type}.png`;
        img.alt = type;
        
        element.appendChild(img);
        element.style.left = `${position.x}px`;
        element.style.top = `${position.y}px`;
        
        // Add delete functionality
        element.addEventListener('dblclick', () => {
            element.remove();
            updateGardenLayout();
        });
        
        gardenCanvas.appendChild(element);
    }

    function updateGardenLayout() {
        const placedElements = gardenCanvas.querySelectorAll('.garden-element.placed');
        gardenLayout = Array.from(placedElements).map(element => ({
            type: element.dataset.type,
            position: {
                x: parseInt(element.style.left),
                y: parseInt(element.style.top)
            }
        }));
        
        localStorage.setItem('gardenLayout', JSON.stringify(gardenLayout));
    }

    saveButton.addEventListener('click', () => {
        updateGardenLayout();
        alert('Plan de jardin sauvegardé !');
    });

    // Pagination functionality
    const itemsPerPage = 4;
    let currentPage = 1;
    
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    function updatePagination() {
        const visibleCards = Array.from(jardinCards).filter(card => 
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
        const totalPages = Math.ceil(jardinCards.length / itemsPerPage);
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

// Gestion des fonctionnalités des boutons dans la page jardins
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('gardenCanvas');
    if (!canvas) {
        console.error('Canvas not found!');
        return;
    }

    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let elements = [];
    let selectedTool = 'plant'; // Outil par défaut

    // Configuration du canvas
    function initCanvas() {
        // Définir la taille du canvas en pixels pour une meilleure qualité
        const container = canvas.parentElement;
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
        ctx.strokeStyle = '#2c8a4b';
        ctx.lineWidth = 2;
        redrawCanvas();
    }

    // Fonction pour ajouter une plante
    function addPlant(x, y) {
        elements.push({
            type: 'plant',
            x: x,
            y: y,
            size: 20,
            color: '#2c8a4b'
        });
        redrawCanvas();
    }

    // Fonction pour ajouter un chemin
    function addPath(points) {
        elements.push({
            type: 'path',
            points: points,
            color: '#8b4513'
        });
        redrawCanvas();
    }

    // Fonction pour ajouter un point d'eau
    function addWaterPoint(x, y) {
        elements.push({
            type: 'water',
            x: x,
            y: y,
            radius: 15,
            color: '#4a90e2'
        });
        redrawCanvas();
    }

    // Fonction pour redessiner le canvas
    function redrawCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dessiner une grille de fond
        drawGrid();
        
        elements.forEach(element => {
            switch(element.type) {
                case 'plant':
                    drawPlant(element);
                    break;
                case 'path':
                    drawPath(element);
                    break;
                case 'water':
                    drawWaterPoint(element);
                    break;
            }
        });
    }

    // Fonction pour dessiner la grille
    function drawGrid() {
        const gridSize = 20;
        ctx.strokeStyle = '#e0e0e0';
        ctx.lineWidth = 0.5;

        for (let x = 0; x < canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }

        for (let y = 0; y < canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }
    }

    // Fonctions de dessin
    function drawPlant(plant) {
        ctx.beginPath();
        ctx.fillStyle = plant.color;
        ctx.arc(plant.x, plant.y, plant.size/2, 0, Math.PI * 2);
        ctx.fill();
        
        // Dessiner les feuilles
        for(let i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.save();
            ctx.translate(plant.x, plant.y);
            ctx.rotate(i * Math.PI/2);
            ctx.ellipse(plant.size/2, 0, plant.size/2, plant.size/4, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    function drawPath(path) {
        if (path.points.length < 2) return;
        ctx.beginPath();
        ctx.strokeStyle = path.color;
        ctx.lineWidth = 5;
        ctx.moveTo(path.points[0].x, path.points[0].y);
        for(let i = 1; i < path.points.length; i++) {
            ctx.lineTo(path.points[i].x, path.points[i].y);
        }
        ctx.stroke();
    }

    function drawWaterPoint(water) {
        ctx.beginPath();
        ctx.fillStyle = water.color;
        ctx.arc(water.x, water.y, water.radius, 0, Math.PI * 2);
        ctx.fill();
        
        // Effet d'ondulation
        ctx.beginPath();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.arc(water.x, water.y, water.radius * 0.7, 0, Math.PI * 2);
        ctx.stroke();
    }

    // Gestionnaires d'événements pour les boutons
    const toolButtons = document.querySelectorAll('[data-tool]');
    toolButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            toolButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter la classe active au bouton cliqué
            button.classList.add('active');
            selectedTool = button.dataset.tool;
        });
    });

    // Gestionnaires d'événements pour le canvas
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        if (selectedTool === 'path') {
            elements.push({
                type: 'path',
                points: [{x, y}],
                color: '#8b4513'
            });
        } else if (selectedTool === 'plant') {
            addPlant(x, y);
        } else if (selectedTool === 'water') {
            addWaterPoint(x, y);
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing || selectedTool !== 'path') return;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const currentPath = elements[elements.length - 1];
        if (currentPath && currentPath.type === 'path') {
            currentPath.points.push({x, y});
            redrawCanvas();
        }
    });

    canvas.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    canvas.addEventListener('mouseleave', () => {
        isDrawing = false;
    });

    // Bouton Sauvegarder
    const saveButton = document.querySelector('[data-action="save"]');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            localStorage.setItem('gardenElements', JSON.stringify(elements));
            alert('Plan du jardin sauvegardé !');
        });
    }

    // Bouton Effacer
    const clearButton = document.querySelector('[data-action="clear"]');
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            if (confirm('Voulez-vous vraiment effacer tout le plan ?')) {
                elements = [];
                redrawCanvas();
            }
        });
    }

    // Bouton Télécharger PDF
    const downloadButton = document.querySelector('[data-action="download-pdf"]');
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            const pdf = new jsPDF();
            const imgData = canvas.toDataURL('image/png');
            pdf.addImage(imgData, 'PNG', 10, 10);
            pdf.save('plan-jardin.pdf');
        });
    }

    // Charger les éléments sauvegardés au chargement
    const savedElements = localStorage.getItem('gardenElements');
    if (savedElements) {
        try {
            elements = JSON.parse(savedElements);
            redrawCanvas();
        } catch (e) {
            console.error('Erreur lors du chargement des éléments sauvegardés:', e);
        }
    }

    // Initialiser le canvas
    initCanvas();

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener('resize', initCanvas);

    // Sélectionner l'outil "plant" par défaut
    const defaultTool = document.querySelector('[data-tool="plant"]');
    if (defaultTool) {
        defaultTool.classList.add('active');
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Fonction pour afficher un message d'erreur
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #ff4444;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.2);
            z-index: 1000;
        `;
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        // Supprimer le message après 5 secondes
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Fonction pour exporter en PDF
    function exportToPDF(articleCard) {
        // Options pour la génération du PDF
        const options = {
            margin: 1,
            filename: 'jardin.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' }
        };

        // Créer une copie de l'article pour le PDF
        const pdfContent = articleCard.cloneNode(true);
        
        // Supprimer le bouton d'export du PDF
        const exportButton = pdfContent.querySelector('.export-pdf-btn');
        if (exportButton) {
            exportButton.remove();
        }

        // Ajouter des styles spécifiques pour le PDF
        pdfContent.style.padding = '20px';
        pdfContent.style.maxWidth = '100%';
        pdfContent.style.backgroundColor = 'white';

        // Générer le PDF
        html2pdf().set(options).from(pdfContent).save();
    }

    // Ajouter les écouteurs d'événements pour les boutons d'export
    document.querySelectorAll('.export-pdf-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const articleCard = this.closest('.article-card');
            if (articleCard) {
                // Changer le texte du bouton pendant la génération
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Génération...';
                this.disabled = true;

                // Exporter en PDF
                exportToPDF(articleCard);

                // Remettre le bouton dans son état initial après un court délai
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.disabled = false;
                }, 2000);
            }
        });
    });
});
