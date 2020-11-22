//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS
const spaceCardsAdd = document.getElementById('spaceCardsAdd');

//Traer los productos de local storage
const products = JSON.parse(localStorage.getItem('products')) || [];

function createProduct() {
    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cardsProducts = [];
    
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const card = `
        <div class="card">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${product.imgProduct}"
                            alt="">
                    </div>
                    <div class="card-back">
                        <h3>${product.nameProduct}</h3>
                        <p>
                            ${product.descriptionProduct}
                        </p>
                            <div class="btn-group-m text-center fixed-bottom" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-dark btn-price" disabled>$${product.priceProduct}</button>
                                <button type="button" class="btn btn-secondary">Comprar <i class="fas fa-shopping-cart"></i></button>
                            </div>
                    </div>
                </div>
            </div>
        `
        
        cardsProducts.unshift(card);
        
    }
    spaceCardsAdd.innerHTML = cardsProducts.join('');
}
createProduct();