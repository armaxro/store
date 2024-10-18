

// Get the DOM element that displays the cart count
const countCartElement = document.getElementById("cart-count");

/** Adds a product to the cart */
function addToCart(product) {
    // Retrieve the current list of products from localStorage
    let memory = JSON.parse(localStorage.getItem("products"));
    let amountFinalItems;

    // If there are no products in the cart, initialize with the new product
    if (!memory || memory.length === 0) {
        const newProduct = getNewProductInMemory(product);
        localStorage.setItem("products", JSON.stringify([newProduct]));
        amountFinalItems = 1;
    } else {
        // Find the index of the product in the existing cart
        const indexProduct = memory.findIndex(p => p.id === product.id);
        // Create a copy of the current cart to avoid direct mutation
        let newMemory = [...memory];

        if (indexProduct === -1) {
            // If the product is not in the cart, add it as a new entry
            const newProduct = getNewProductInMemory(product);
            newMemory.push(newProduct);
            amountFinalItems = 1;
        } else {
            // If the product exists, increment its quantity
            newMemory[indexProduct].amount++;
            amountFinalItems = newMemory[indexProduct].amount;
        }

        // Update the cart in localStorage with the modified cart
        localStorage.setItem("products", JSON.stringify(newMemory));
    }

    // Refresh the cart count displayed in the UI
    refreshCartCount();
    return amountFinalItems;
}

/** Removes one unit of a product from the cart */
function subtractFromCart(product) {
    // Retrieve the current list of products from localStorage
    let memory = JSON.parse(localStorage.getItem("products"));
    let amountFinalItems = 0;

    // If there are no products in the cart, return zero
    if (!memory) return amountFinalItems;

    // Find the index of the product in the existing cart
    const indexProduct = memory.findIndex(p => p.id === product.id);
    if (indexProduct !== -1) {
        // Create a copy of the current cart to avoid direct mutation
        let newMemory = [...memory];
        // Decrement the quantity of the specified product
        newMemory[indexProduct].amount--;

        // If the product quantity reaches zero, remove it from the cart
        if (newMemory[indexProduct].amount === 0) {
            newMemory.splice(indexProduct, 1);
        }

        // Update the cart in localStorage with the modified cart
        localStorage.setItem("products", JSON.stringify(newMemory));
        // Determine the final amount of the product after subtraction
        amountFinalItems = newMemory[indexProduct] ? newMemory[indexProduct].amount : 0;
    }

    // Refresh the cart count displayed in the UI
    refreshCartCount();
    return amountFinalItems;
}

/** Initializes a new product object with an amount of 1 */
function getNewProductInMemory(product) {
    // Return a new product object with all existing properties and an initial amount of 1
    return { ...product, amount: 1 };
}

/** Updates the cart count displayed in the header */
function refreshCartCount() {
    let count = 0;
    // Retrieve the current list of products from localStorage
    const memory = JSON.parse(localStorage.getItem("products"));

    if (memory && memory.length > 0) {
        // Calculate the total count by summing up the amounts of all products
        count = memory.reduce((acum, current) => acum + current.amount, 0);
    }

    // Update the cart count element in the DOM with the new count
    countCartElement.innerText = count;
}

/** Resets the cart by clearing localStorage */
function refreshCart() {
    // Remove the 'products' item from localStorage to clear the cart
    localStorage.removeItem("products");
    // Refresh the cart count in the UI to reflect the cleared cart
    refreshCartCount();
}

// Expose functions globally so they can be accessed from other scripts
window.addToCart = addToCart;
window.subtractFromCart = subtractFromCart;
window.refreshCart = refreshCart;

// Initialize the cart count when the script is loaded
refreshCartCount();