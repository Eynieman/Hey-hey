//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS
const spaceCardsAdd = document.getElementById('spaceCardsAdd');

//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS EN EL CARRITO
const productosCart = document.getElementById('productosCart');

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
                                <button type="button" class="btn btn-secondary" onclick="agregarCarrito('${product.id}')">Comprar <i class="fas fa-shopping-cart"></i></button>
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



// TRAER EL USUARIO LOGUEADO DEL LOCALSTORAGE
const userLogged = JSON.parse(localStorage.getItem('userLogged'));

// AREA DONDE APARECE EL LOGIN DE USUARIO
const userNav = document.getElementById('userNav');

//MOSTRAR EL USUARIO EN CASO QUE ESTÉ LOGUEADO
if (userLogged !== null){
    userNav.innerHTML = 
    `
    <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fas fa-user mx-2"></i>${userLogged.nombreApellido}
            </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button class="dropdown-item">Carrito</button>
            <button type="button" class="dropdown-item" onclick="logOut()">Cerrar Sesión</button>
        </div>
    </div>

    `
}else {
    userNav.innerHTML =
    `
    <div id="btnLogin" class="">
            <a class="btn btn-secondary" href="./login.html" target="_blank" rel=""><i class="fas fa-user mx-2"></i>Mi Cuenta</a>
    </div>

    `
}

//ELIMINAR EL USUARIO LOGUEADO Y RECARGAR LA PAGINA
function logOut(){
    localStorage.removeItem('userLogged');
    location.reload();
}

//Agregar Productos al carrito

function agregrarCarrito(productid) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const tableCarrito = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const table = `
        <td>
        ${product.nameProduct}
        </td>
        <td>
        ${product.priceProduct}
        </td>
        `;
        tableCarrito.unshift(table);
    }
    productosCart.innerHTML = tableCarrito.join('')
}
agregrarCarrito();