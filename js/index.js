const cardContainer = document.getElementById("products-container");

/** Crea las tarjetas de productos teniendo en cuenta la lista en bicicletas.js */
function createCardProductStart(products){
    products.forEach(product => {
    const newPhone = document.createElement("div");
    newPhone.classList = "card-product"
    newPhone.innerHTML = `
    <img src="./img/${product.id}.jpg">
    <h3>${product.name}</h3>
    <p class="precio">$${product.price}</p>
    <button>Add to the Cart</button>`
    cardContainer.appendChild(newPhone);
    newPhone.getElementsByTagName("button")[0].addEventListener("click",() => addToCart(product))
    });
}
createCardProductStart(products);