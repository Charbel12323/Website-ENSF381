
document.addEventListener('DOMContentLoaded', () => {
    let cart = {};

    const updateCartDisplay = () => {
        const cartItemsEl = document.getElementById('cartItems');
        cartItemsEl.innerHTML = ''; // Clear the cart display
        Object.keys(cart).forEach((productId) => {
            const product = cart[productId];
            const productEl = document.createElement('div');
            productEl.innerHTML = `
    <p>Name: ${product.name}</p>
    <p>Price: ${product.price}</p>
    <p>Quantity: ${product.quantity}</p>
    <button class="remove-from-cart" data-product-id="${productId}">Remove</button>
    `;
            cartItemsEl.appendChild(productEl);

            // Add click event listener to the Remove button
            productEl.querySelector('.remove-from-cart').addEventListener('click', () => {
                if (cart[productId].quantity > 1) {
                    cart[productId].quantity -= 1;
                } else {
                    delete cart[productId];
                }
                updateCartDisplay(); // Update the display after removing
            });
        });
    };

    const addToCart = (product) => {
        if (cart[product.id]) {
            cart[product.id].quantity += 1;
        } else {
            cart[product.id] = { ...product, quantity: 1 };
        }
        alert(`${product.name} has been added to the cart.`);
        updateCartDisplay();
    };

    document.querySelectorAll('.add-to-cart').forEach((button, index) => {
        button.addEventListener('click', () => {
            const productItem = button.closest('.product-item');
            const product = {
                id: index, // Assuming each product has a unique index as ID
                name: productItem.querySelector('.product-title').textContent,
                price: productItem.querySelector('.product-price').textContent,
            };
            addToCart(product);
        });
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Selecting the form and the button by its type within the form
    const form = document.querySelector(".login-form form");
    const loginButton = form.querySelector("button");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const messageBox = document.getElementById("messageBox");
    const message = document.getElementById("message");

    // Listen to the form submission event instead of button click
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(users => {
                const user = users.find(user => user.username === usernameInput.value && user.email === passwordInput.value);
                if (user) {
                    messageBox.style.display = "block";
                    messageBox.className = 'success';
                    message.textContent = "Login Successful!";
                } else {
                    messageBox.style.display = "block";
                    messageBox.className = 'error';
                    message.textContent = "Invalid username or password.";
                }
            })
            .catch(error => {
                alert("API call was unsuccessful.");
                console.error('There has been a problem with your fetch operation:', error);
            });
    });
});
