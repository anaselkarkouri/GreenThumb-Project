document.addEventListener('DOMContentLoaded', () => {
    // Filter functionality with animation
    const filterButtons = document.querySelectorAll('.filter-btn');
    const sortButtons = document.querySelectorAll('.sort-btn');
    const products = document.querySelectorAll('.product-card');
    let currentSort = { type: null, ascending: true };
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.dataset.category;
            filterAndSortProducts(category, currentSort);
        });
    });

    // Sorting functionality
    sortButtons.forEach(button => {
        button.addEventListener('click', () => {
            const sortType = button.dataset.sort;
            
            // Toggle sort direction if clicking the same button
            if (currentSort.type === sortType) {
                currentSort.ascending = !currentSort.ascending;
                // Update icon
                const icon = button.querySelector('i');
                icon.className = currentSort.ascending ? 
                    `fas fa-sort-${sortType === 'price' ? 'numeric' : 'alpha'}-down` :
                    `fas fa-sort-${sortType === 'price' ? 'numeric' : 'alpha'}-up`;
            } else {
                // Reset other buttons' icons
                sortButtons.forEach(btn => {
                    const icon = btn.querySelector('i');
                    icon.className = `fas fa-sort-${btn.dataset.sort === 'price' ? 'numeric' : 'alpha'}-down`;
                });
                currentSort.type = sortType;
                currentSort.ascending = true;
            }

            // Get current active category
            const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
            filterAndSortProducts(activeCategory, currentSort);
        });
    });

    function filterAndSortProducts(category, sort) {
        const productsArray = Array.from(products);
        
        // First filter by category
        const filteredProducts = productsArray.filter(product => {
            return category === 'all' || product.dataset.category === category;
        });

        // Then sort if a sort type is selected
        if (sort.type) {
            filteredProducts.sort((a, b) => {
                let aValue, bValue;
                
                if (sort.type === 'name') {
                    aValue = a.querySelector('.product-title').textContent;
                    bValue = b.querySelector('.product-title').textContent;
                } else if (sort.type === 'price') {
                    aValue = parseFloat(a.querySelector('.product-price').textContent);
                    bValue = parseFloat(b.querySelector('.product-price').textContent);
                }

                if (sort.ascending) {
                    return aValue > bValue ? 1 : -1;
                } else {
                    return aValue < bValue ? 1 : -1;
                }
            });
        }

        // Hide all products with animation
        products.forEach(product => {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
            setTimeout(() => {
                product.style.display = 'none';
            }, 300);
        });

        // Show filtered and sorted products with animation
        const productsGrid = document.querySelector('.products-grid');
        setTimeout(() => {
            filteredProducts.forEach((product, index) => {
                productsGrid.appendChild(product); // Reorder in DOM
                product.style.display = 'block';
                setTimeout(() => {
                    product.style.opacity = '1';
                    product.style.transform = 'translateY(0)';
                }, index * 50);
            });
        }, 300);
    }

    // Enhanced pagination functionality
    const itemsPerPage = 6;
    let currentPage = 1;
    
    const prevButton = document.querySelector('.prev-page');
    const nextButton = document.querySelector('.next-page');
    const pageNumbers = document.querySelectorAll('.page-number');
    
    function updatePagination() {
        const totalPages = Math.ceil(products.length / itemsPerPage);
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        
        // Fade out all products
        products.forEach(product => {
            product.style.opacity = '0';
            product.style.transform = 'translateY(20px)';
        });

        // After fade out, update visibility and fade in
        setTimeout(() => {
            products.forEach((product, index) => {
                if (index >= startIndex && index < endIndex) {
                    product.style.display = 'block';
                    setTimeout(() => {
                        product.style.opacity = '1';
                        product.style.transform = 'translateY(0)';
                    }, index % itemsPerPage * 100); // Stagger animation
                } else {
                    product.style.display = 'none';
                }
            });
        }, 300);
        
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
        const totalPages = Math.ceil(products.length / itemsPerPage);
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
    
    // Le panier est géré uniquement par cart.js.
});
