
const cartContainer = document.getElementById("cart-container");
const amountElement = document.getElementById("amount");
const priceElement = document.getElementById("price");
const emptyCartElement = document.getElementById("empty-cart");
const totalContainer = document.getElementById("total");


/** Creates product cards in the cart based on localStorage data */
function createCardProductCart() {
    if (!cartContainer) {
        console.error("Cart container not found!");
        return;
    }

    cartContainer.innerHTML = "";
    const products = JSON.parse(localStorage.getItem("products"));

    if (products && products.length > 0) {
        products.forEach((product) => {
            const newPhone = document.createElement("div");
            newPhone.classList.add("card-product");
            newPhone.innerHTML = `
                <img src="./img/${product.id}.jpg" alt="${product.name}">
                <h3>${product.name}</h3>
                <span>$${product.price}</span>
                <div>
                    <button class="decrease">-</button>
                    <span class="amount">${product.amount}</span>
                    <button class="increase">+</button>
                </div>
            `;
            cartContainer.appendChild(newPhone);

            // Event listener for the decrease button
            const decreaseButton = newPhone.querySelector("button.decrease");
            decreaseButton.addEventListener("click", () => {
                console.log(`Decreasing quantity of ${product.name}`);
                const newAmount = subtractFromCart(product);
                if (newAmount === 0) {
                    console.log(`${product.name} removed from the cart.`);
                } else {
                    console.log(`New amount of ${product.name}: ${newAmount}`);
                }
                createCardProductCart();
                refreshTotal();
            });

            // Event listener for the increase button
            const increaseButton = newPhone.querySelector("button.increase");
            increaseButton.addEventListener("click", () => {
                console.log(`Increasing quantity of ${product.name}`);
                addToCart(product);
                createCardProductCart();
                refreshTotal();
            });
        });
    }

    reviewMessageEmpty();
    refreshTotal();
    refreshCartCount();
}

createCardProductCart();

/** Updates the total price and quantity in the cart page */
function refreshTotal() {
    const products = JSON.parse(localStorage.getItem("products"));
    let amount = 0;
    let price = 0;

    if (products && products.length > 0) {
        products.forEach((product) => {
            amount += product.amount;
            price += product.price * product.amount;
        });
    }

    amountElement.innerText = amount;
    priceElement.innerText = price;

    if (price === 0) {
        refreshCart();
        reviewMessageEmpty();
    }
}

/** Event listener for the reset button */
document.getElementById("reset").addEventListener("click", () => {
    console.log("Resetting the cart.");
    refreshCart();
    createCardProductCart();
});

/** Shows or hides the empty cart message */
function reviewMessageEmpty() {
    const products = JSON.parse(localStorage.getItem("products"));
    const isEmpty = !products || products.length === 0;

    emptyCartElement.classList.toggle("hidden", !isEmpty);
    totalContainer.classList.toggle("hidden", isEmpty);
}