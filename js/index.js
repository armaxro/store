const cardContainer = document.getElementById("products-container")
function createCardProductStart(products){
    products.forEach(product => {
        const newPhone = document.createElement("div");
        newPhone.classList = "card-product";
        newPhone.innerHTML = `
            <img src="./img/${product.id}.jpg"
            <h3>${product.name}</h3>
            <p>EUR ${product.price}</p>
            <button>Add to the cart</button>
        `
        cardContainer.appendChild(newPhone);
        
    });
}
createCardProductStart(products);