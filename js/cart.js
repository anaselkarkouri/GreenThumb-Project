// Cart functionality
class Cart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cart')) || [];
        this.cartIcon = document.getElementById('cartIcon');
        this.cartCount = document.querySelector('.cart-count');
        this.cartModal = null;
        this.init();
    }

    init() {
        this.updateCartCount();
        this.setupCartModal();
        this.setupCartIcon();
        this.setupAddToCartButtons();
    }

    setupCartModal() {
        // Create cart modal HTML
        const modalHTML = `
            <div id="cartModal" class="cart-modal">
                <div class="cart-modal-content">
                    <div class="cart-modal-header">
                        <h2>Mon Panier</h2>
                        <button class="close-cart">&times;</button>
                    </div>
                    <div class="cart-items"></div>
                    <div class="cart-total">
                        <span>Total: </span>
                        <span class="total-amount">0.00 DH</span>
                    </div>
                    <button class="checkout-btn">Commander</button>
                </div>
            </div>
        `;

        // Add modal to body
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.cartModal = document.getElementById('cartModal');

        // Setup close button
        const closeBtn = this.cartModal.querySelector('.close-cart');
        closeBtn.addEventListener('click', () => this.hideCart());

        // Setup checkout button
        const checkoutBtn = this.cartModal.querySelector('.checkout-btn');
        checkoutBtn.addEventListener('click', () => this.checkout());
    }

    setupCartIcon() {
        this.cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleCart();
        });
    }

    setupAddToCartButtons() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const productCard = e.target.closest('.product-card');
                if (productCard) {
                    const product = {
                        id: productCard.dataset.productId,
                        name: productCard.querySelector('.product-title').textContent,
                        price: parseFloat(productCard.querySelector('.product-price').textContent.replace('DH', '')),
                        image: productCard.querySelector('img').src,
                        quantity: 1
                    };
                    this.addItem(product);
                }
            });
        });
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push(product);
        }
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
        this.showAddedToCartNotification(product.name);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartCount();
        this.updateCartDisplay();
    }

    updateQuantity(productId, newQuantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, newQuantity);
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    updateCartCount() {
        const totalItems = this.items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCount.textContent = totalItems;
        this.cartCount.style.display = totalItems > 0 ? 'flex' : 'none';
    }

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(this.items));
    }

    updateCartDisplay() {
        const cartItems = this.cartModal.querySelector('.cart-items');
        cartItems.innerHTML = '';

        if (this.items.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
            return;
        }

        this.items.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-item';
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p class="cart-item-price">${item.price.toFixed(2)} DH</p>
                    <div class="quantity-controls">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="${item.quantity}" min="1" class="quantity-input">
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <button class="remove-item" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;

            // Add event listeners for quantity controls
            const quantityInput = itemElement.querySelector('.quantity-input');
            const minusBtn = itemElement.querySelector('.minus');
            const plusBtn = itemElement.querySelector('.plus');
            const removeBtn = itemElement.querySelector('.remove-item');

            quantityInput.addEventListener('change', (e) => {
                const newQuantity = parseInt(e.target.value);
                if (newQuantity > 0) {
                    this.updateQuantity(item.id, newQuantity);
                }
            });

            minusBtn.addEventListener('click', () => {
                const newQuantity = item.quantity - 1;
                if (newQuantity > 0) {
                    this.updateQuantity(item.id, newQuantity);
                }
            });

            plusBtn.addEventListener('click', () => {
                this.updateQuantity(item.id, item.quantity + 1);
            });

            removeBtn.addEventListener('click', () => {
                this.removeItem(item.id);
            });

            cartItems.appendChild(itemElement);
        });

        // Update total
        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        this.cartModal.querySelector('.total-amount').textContent = `${total.toFixed(2)} DH`;
    }

    showAddedToCartNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${productName} a été ajouté au panier</p>
        `;
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    toggleCart() {
        if (this.cartModal.style.display === 'block') {
            this.hideCart();
        } else {
            this.showCart();
        }
    }

    showCart() {
        this.cartModal.style.display = 'block';
        this.updateCartDisplay();
    }

    hideCart() {
        this.cartModal.style.display = 'none';
    }

    checkout() {
        // Implement checkout logic here
        alert('Fonctionnalité de paiement à venir !');
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.cart = new Cart();
});
