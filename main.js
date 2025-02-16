document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const sections = document.querySelectorAll('.section');
    const navButtons = document.querySelectorAll('.nav-links a');
    const cartBadge = document.querySelector('.cart-badge');
    const cartItems = document.querySelector('.cart-items');
    const cartTotal = document.querySelector('.cart-total');
    const cartEmpty = document.querySelector('.cart-empty');
    
    let cart = [];

    // Toggle mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Navigation button clicks
    navButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('href').substring(1);
            
            sections.forEach(section => {
                section.classList.remove('active');
                if (section.id === targetId) {
                    section.classList.add('active');
                }
            });

            navButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            navLinks.classList.remove('active');
        });
    });

    // Add to cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const bookCard = button.closest('.book-card');
            const title = bookCard.querySelector('h3').textContent;
            const price = parseFloat(bookCard.querySelector('.book-price span').textContent.substring(1));
            const image = bookCard.querySelector('img').src;

            const item = { title, price, image };
            cart.push(item);
            updateCart();
        });
    });

    function updateCart() {
        cartBadge.textContent = cart.length;
        
        if (cart.length === 0) {
            cartEmpty.style.display = 'block';
            cartItems.style.display = 'none';
            cartTotal.style.display = 'none';
            return;
        }

        cartEmpty.style.display = 'none';
        cartItems.style.display = 'block';
        cartTotal.style.display = 'block';

        // Update cart items display
        cartItems.innerHTML = cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.title}">
                <div class="cart-item-info">
                    <h3>${item.title}</h3>
                    <p>₹${item.price.toFixed(2)}</p>  <!-- Price displayed in INR -->
                </div>
                <button class="remove-from-cart" data-index="${index}">Remove</button>
            </div>
        `).join('');

        // Calculate total price
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.innerHTML = `
            <div class="cart-total-amount">
                <span>Total:</span>
                <span>₹${total.toFixed(2)}</span>  <!-- Total in INR -->
            </div>
            <button class="checkout-button">Checkout</button>
        `;

        // Remove items from cart
        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', () => {
                const index = parseInt(button.dataset.index);
                cart.splice(index, 1);
                updateCart();
            });
        });
    }
});
document.querySelector(".signup-btn").addEventListener("click", function() {
    alert("Thank you for signing up!");
});

