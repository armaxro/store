"use strict";

const countCartElement = document.getElementById("cart-count");

/** Adds a product to the cart */
function addToCart(product) {
    let memory = JSON.parse(localStorage.getItem("products"));
    let amountFinalItems;

    if (!memory || memory.length === 0) {
        const newProduct = getNewProductInMemory(product);
        localStorage.setItem("products", JSON.stringify([newProduct]));
        amountFinalItems = 1;
    } else {
        const indexProduct = memory.findIndex(p => p.id === product.id);
        let newMemory = [...memory]; // Create a copy to avoid direct mutation

        if (indexProduct === -1) {
            const newProduct = getNewProductInMemory(product);
            newMemory.push(newProduct);
            amountFinalItems = 1;
        } else {
            newMemory[indexProduct].amount++;
            amountFinalItems = newMemory[indexProduct].amount;
        }

        localStorage.setItem("products", JSON.stringify(newMemory));
    }

    refreshCartCount();
    return amountFinalItems;
}

/** Removes one unit of a product from the cart */
function subtractFromCart(product) {
    let memory = JSON.parse(localStorage.getItem("products"));
    let amountFinalItems = 0;

    if (!memory) return amountFinalItems;

    const indexProduct = memory.findIndex(p => p.id === product.id);
    if (indexProduct !== -1) {
        let newMemory = [...memory];
        newMemory[indexProduct].amount--;

        if (newMemory[indexProduct].amount === 0) {
            newMemory.splice(indexProduct, 1);
        }

        localStorage.setItem("products", JSON.stringify(newMemory));
        amountFinalItems = newMemory[indexProduct] ? newMemory[indexProduct].amount : 0;
    }

    refreshCartCount();
    return amountFinalItems;
}

/** Initializes a new product object with an amount of 1 */
function getNewProductInMemory(product) {
    return { ...product, amount: 1 };
}

/** Updates the cart count displayed in the header */
function refreshCartCount() {
    let count = 0;
    const memory = JSON.parse(localStorage.getItem("products"));

    if (memory && memory.length > 0) {
        count = memory.reduce((acum, current) => acum + current.amount, 0);
    }

    countCartElement.innerText = count;
}

/** Resets the cart by clearing localStorage */
function refreshCart() {
    localStorage.removeItem("products");
    refreshCartCount();
}

// Expose functions globally
window.addToCart = addToCart;
window.subtractFromCart = subtractFromCart;
window.refreshCart = refreshCart;

refreshCartCount();