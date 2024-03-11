
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
document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".signup-form form");
    const usernameInput = document.getElementById("signup-username");
    const passwordInput = document.getElementById("signup-password");
    const confirmPasswordInput = document.getElementById("confirm-password");
    const emailInput = document.getElementById("email");
    const signupButton = document.getElementById("signup-button");
    const messageBox = document.getElementById("messageBox");
    const message = document.getElementById("message");

    // Function to display messages
    const showMessage = (msg, isSuccess) => {
        message.textContent = msg;
        messageBox.style.display = "block";
        messageBox.className = isSuccess ? 'success' : 'error';
    };

    // Function to hide messages
    const hideMessage = () => {
        messageBox.style.display = "none";
    };

    // Function to validate username
    const validateUsername = () => {
        const username = usernameInput.value;
        const regex = /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/; // Username pattern
        return regex.test(username);
    };

    // Function to validate password
    const validatePassword = () => {
        const password = passwordInput.value;
        // Password pattern
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-_=+\[\]{}|;:'",.<>?/`~])[A-Za-z\d!@#$%^&*()-_=+\[\]{}|;:'",.<>?/`~]{8,}$/;
        return regex.test(password);
    };

    // Function to validate email
    const validateEmail = () => {
        const email = emailInput.value;
        // Email pattern
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    // Function to validate confirm password
    const validateConfirmPassword = () => {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        return password === confirmPassword;
    };

    // Event listener for form submission
    form.addEventListener("submit", function (e) {
        e.preventDefault(); // Prevent the form from submitting

        hideMessage(); // Hide any previous message

        // Check validation conditions
        const isValidUsername = validateUsername();
        const isValidPassword = validatePassword();
        const isValidConfirmPassword = validateConfirmPassword();
        const isValidEmail = validateEmail();

        if (!isValidUsername || !isValidPassword || !isValidConfirmPassword || !isValidEmail) {
            showMessage("Invalid input. Please check your inputs and try again.", false);
        } else {
            showMessage("Signup successful!", true);
            // Additional logic for submitting the form can go here
        }
    });
});
