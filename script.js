document.addEventListener('DOMContentLoaded', function () {
    const menuSection = document.getElementById('menu');
    const cartSection = document.getElementById('cart');
    const cartCount = document.getElementById('cart-count');
    const viewCartButton = document.getElementById('view-cart-button');

    const menuItems = [
        {
            category: "Appetizers",
            items: [
                { item_name: "Burger", item_description: "Crispy and delicious", price: 5 },
                { item_name: "Pizza", item_description: "Cheesy delight", price: 3 }
            ]
        },
        {
            category: "Main Course",
            items: [
                { item_name: "Chips", item_description: "Crisp, golden slices", price: 12 },
                { item_name: "Pasta", item_description: "Italian delight", price: 10 }
            ]
        }
    ];

    let cart = [];

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <span>${item.item_name}</span>
                <span>$${item.price.toFixed(2)} x ${item.quantity}</span>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-from-cart" data-name="${item.item_name}">Remove</button>
            `;
            cartItems.appendChild(cartItem);
            total += item.price * item.quantity;
        });

        document.getElementById('cart-total').textContent = `Total: $${total.toFixed(2)}`;

        const removeFromCartButtons = document.querySelectorAll('.remove-from-cart');
        removeFromCartButtons.forEach(button => {
            button.addEventListener('click', function () {
                const itemName = this.getAttribute('data-name');
                cart = cart.filter(item => item.item_name !== itemName);
                updateCart();
                updateCartCount();
            });
        });
    }

    function updateCartCount() {
        cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    menuItems.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.classList.add('menu-category');

        const categoryTitle = document.createElement('h3');
        categoryTitle.textContent = category.category;
        categoryDiv.appendChild(categoryTitle);

        category.items.forEach(item => {
            const menuCard = document.createElement('div');
            menuCard.classList.add('menu-card');

            const img = document.createElement('img');
            img.classList.add('menu-card-img');
            img.src = `images/${item.item_name.replace(/\s+/g, '').toLowerCase()}.jpg`; 
            img.alt = item.item_name;
            menuCard.appendChild(img);

            const menuCardContent = document.createElement('div');
            menuCardContent.classList.add('menu-card-content');

            const itemName = document.createElement('h3');
            itemName.textContent = item.item_name;
            menuCardContent.appendChild(itemName);

            const itemDescription = document.createElement('p');
            itemDescription.textContent = item.item_description;
            menuCardContent.appendChild(itemDescription);

            const itemPrice = document.createElement('p');
            itemPrice.textContent = `$${item.price.toFixed(2)}`;
            menuCardContent.appendChild(itemPrice);

            const quantityLabel = document.createElement('label');
            quantityLabel.textContent = 'Quantity:';
            menuCardContent.appendChild(quantityLabel);

            const quantityInput = document.createElement('input');
            quantityInput.type = 'number';
            quantityInput.min = '1';
            quantityInput.value = '1';
            menuCardContent.appendChild(quantityInput);

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.classList.add('add-to-cart-btn');
            addToCartButton.addEventListener('click', function () {
                const quantity = parseInt(quantityInput.value);
                const cartItem = cart.find(cartItem => cartItem.item_name === item.item_name);

                if (cartItem) {
                    cartItem.quantity += quantity;
                } else {
                    cart.push({ ...item, quantity });
                }

                updateCart();
                updateCartCount();
            });

            menuCardContent.appendChild(addToCartButton);
            menuCard.appendChild(menuCardContent);
            categoryDiv.appendChild(menuCard);
        });

        menuSection.appendChild(categoryDiv);
    });

    const bookingForm = document.getElementById('booking-form');
    bookingForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const formData = new FormData(bookingForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const date = formData.get('date');
        const time = formData.get('time');
        const guests = formData.get('guests');

        alert(`Thank you, ${name}! Your table for ${guests} on ${date} at ${time} has been booked. We will send a confirmation to ${email}.`);
    });

    viewCartButton.addEventListener('click', function () {
        cartSection.style.display = cartSection.style.display === 'none' ? 'block' : 'none';
    });

    document.getElementById('checkout-button').addEventListener('click', function () {
        if (cart.length === 0) {
            alert('Your cart is empty!');
        } else {
            alert('Thank you for your purchase!');
            cart = [];
            updateCart();
            updateCartCount();
        }
    });
});
