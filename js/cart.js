// Get references to various DOM elements related to the shopping cart
const cartContainer = document.getElementById("cart-container"); // Container for cart items
const amountElement = document.getElementById("amount"); // Element displaying total quantity
const priceElement = document.getElementById("price"); // Element displaying total price
const emptyCartElement = document.getElementById("empty-cart"); // Element displaying empty cart message
const totalContainer = document.getElementById("total"); // Container for total price and quantity

/** 
 * Creates product cards in the cart based on data stored in localStorage.
 */
function createCardProductCart() {
    // Check if the cart container exists
    if (!cartContainer) {
        console.error("Cart container not found!"); // Log error if cart container is missing
        return; // Exit the function early
    }

    cartContainer.innerHTML = ""; // Clear any existing content in the cart container
    const products = JSON.parse(localStorage.getItem("products")); // Retrieve products from localStorage

    // Check if there are products in the cart
    if (products && products.length > 0) {
        // Iterate over each product and create its corresponding card
        products.forEach((product) => {
            const newPhone = document.createElement("div"); // Create a new div element for the product
            newPhone.classList.add("card-product"); // Add the 'card-product' class for styling
            newPhone.innerHTML = `
                <img src="./img/${product.id}.jpg" alt="${product.name}"> <!-- Product image -->
                <h3>${product.name}</h3> <!-- Product name -->
                <span>EUR ${product.price}</span> <!-- Product price -->
                <div>
                    <button class="decrease">-</button> <!-- Button to decrease quantity -->
                    <span class="amount">${product.amount}</span> <!-- Display current quantity -->
                    <button class="increase">+</button> <!-- Button to increase quantity -->
                </div>
            `;
            cartContainer.appendChild(newPhone); // Add the product card to the cart container

            // Event listener for the decrease button
            const decreaseButton = newPhone.querySelector("button.decrease");
            decreaseButton.addEventListener("click", () => {
                console.log(`Decreasing quantity of ${product.name}`); // Log action
                const newAmount = subtractFromCart(product); // Decrease product quantity
                if (newAmount === 0) {
                    console.log(`${product.name} removed from the cart.`); // Log removal if quantity is zero
                } else {
                    console.log(`New amount of ${product.name}: ${newAmount}`); // Log new quantity
                }
                createCardProductCart(); // Refresh the cart display
                refreshTotal(); // Update total price and quantity
            });

            // Event listener for the increase button
            const increaseButton = newPhone.querySelector("button.increase");
            increaseButton.addEventListener("click", () => {
                console.log(`Increasing quantity of ${product.name}`); // Log action
                addToCart(product); // Increase product quantity
                createCardProductCart(); // Refresh the cart display
                refreshTotal(); // Update total price and quantity
            });
        });
    }

    reviewMessageEmpty(); // Check if the cart is empty and display appropriate message
    refreshTotal(); // Update total price and quantity
    refreshCartCount(); // Update the cart item count display
}

// Initial call to populate the cart on page load
createCardProductCart();

/** 
 * Updates the total price and quantity displayed in the cart.
 */
function refreshTotal() {
    const products = JSON.parse(localStorage.getItem("products")); // Retrieve products from localStorage
    let amount = 0; // Initialize total quantity
    let price = 0; // Initialize total price

    // Calculate total quantity and price
    if (products && products.length > 0) {
        products.forEach((product) => {
            amount += product.amount; // Add product quantity to total
            price += product.price * product.amount; // Add product total price to total
        });
    }

    amountElement.innerText = amount; // Display total quantity
    priceElement.innerText = price; // Display total price

    // If total price is zero, refresh the cart and display empty message
    if (price === 0) {
        refreshCart(); // Clear the cart data
        reviewMessageEmpty(); // Display empty cart message
    }
}

/** 
 * Event listener for the reset button to clear the cart.
 */
document.getElementById("reset").addEventListener("click", () => {
    console.log("Resetting the cart."); // Log action
    refreshCart(); // Clear the cart data
    createCardProductCart(); // Refresh the cart display
});

/** 
 * Shows or hides the empty cart message based on cart contents.
 */
function reviewMessageEmpty() {
    const products = JSON.parse(localStorage.getItem("products")); // Retrieve products from localStorage
    const isEmpty = !products || products.length === 0; // Determine if the cart is empty

    emptyCartElement.classList.toggle("hidden", !isEmpty); // Show empty cart message if cart is empty
    totalContainer.classList.toggle("hidden", isEmpty); // Hide total container if cart is empty
}