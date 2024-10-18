// Select the HTML element with the ID 'products-container' to hold the product cards
const cardContainer = document.getElementById("products-container");

// Function to create and display product cards
function createCardProductStart(products) {
    // Iterate over each product in the provided products array
    products.forEach(product => {
        // Create a new div element to represent a single product card
        const newPhone = document.createElement("div");
        // Assign the CSS class 'card-product' to the new div for styling
        newPhone.classList = "card-product";
        // Set the inner HTML of the product card with product details
        newPhone.innerHTML = `
            <img src="./img/${product.id}.jpg" alt="${product.name}">
            <h3>${product.name}</h3>
            <p class="precio">EUR ${product.price}</p>
            <button>Add to the Cart</button>`;
        // Append the newly created product card to the card container in the DOM
        cardContainer.appendChild(newPhone);
        // Select the first button within the new product card and add a click event listener
        newPhone.getElementsByTagName("button")[0].addEventListener("click", () => addToCart(product));
    });
}

// Call the function to initialize and display the product cards using the 'products' array
createCardProductStart(products);