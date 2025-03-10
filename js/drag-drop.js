// Drag and Drop functionality
document.addEventListener('DOMContentLoaded', () => {
    const draggableItems = document.querySelectorAll('[draggable="true"]');
    const dropZone = document.getElementById('garden-planner');
    
    // Store the garden layout in local storage
    let gardenLayout = JSON.parse(localStorage.getItem('gardenLayout')) || [];
    
    // Initialize the garden with saved layout
    renderGardenLayout();
    
    draggableItems.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragend', handleDragEnd);
    });
    
    dropZone.addEventListener('dragover', handleDragOver);
    dropZone.addEventListener('drop', handleDrop);
    
    function handleDragStart(e) {
        e.target.classList.add('dragging');
        e.dataTransfer.setData('text/plain', e.target.innerHTML);
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
        const data = e.dataTransfer.getData('text/plain');
        
        // Create new plant element
        const newPlant = document.createElement('div');
        newPlant.className = 'category-card';
        newPlant.innerHTML = data;
        
        // Calculate position relative to drop zone
        const rect = dropZone.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        newPlant.style.position = 'absolute';
        newPlant.style.left = x + 'px';
        newPlant.style.top = y + 'px';
        
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '×';
        deleteBtn.className = 'delete-plant';
        deleteBtn.onclick = () => {
            newPlant.remove();
            updateGardenLayout();
        };
        newPlant.appendChild(deleteBtn);
        
        dropZone.appendChild(newPlant);
        updateGardenLayout();
    }
    
    function updateGardenLayout() {
        const plants = dropZone.querySelectorAll('.category-card');
        gardenLayout = Array.from(plants).map(plant => ({
            html: plant.innerHTML,
            position: {
                left: plant.style.left,
                top: plant.style.top
            }
        }));
        localStorage.setItem('gardenLayout', JSON.stringify(gardenLayout));
    }
    
    function renderGardenLayout() {
        gardenLayout.forEach(plant => {
            const newPlant = document.createElement('div');
            newPlant.className = 'category-card';
            newPlant.innerHTML = plant.html;
            newPlant.style.position = 'absolute';
            newPlant.style.left = plant.position.left;
            newPlant.style.top = plant.position.top;
            dropZone.appendChild(newPlant);
        });
    }
});
