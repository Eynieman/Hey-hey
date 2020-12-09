
//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS
const spaceCardsAdd = document.getElementById('spaceCardsAdd');
//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS EN EL CARRITO
const productosCart = document.getElementById('productosCart');
//Traer los productos de local storage
const products = JSON.parse(localStorage.getItem('products')) || [];
//TABLA DEL MODAL CARRITO
const tableCartProduct = document.getElementById('tableCartProduct');
//TOTAL PRODUCTOS MODAL CARRITO
const totalShopCart = document.getElementById('totalShopCart');
//BOTON BORRAR PRODUCTO DEL CARRITO
const btnDeleteProductCart = document.getElementById('btnDeleteProductCart');

function createProduct() {
    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const cardsProducts = [];
    
    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const card = `
        <div class="card">
                <div class="card-inner itemProduct">
                    <div class="card-front">
                        <img class="imgProduct" src="${product.imgProduct}"
                            alt="">
                            <p class="d-none idProduct">${product.id}</p>
                    </div>
                    <div class="card-back">
                        <h3 class="titleProduct">${product.nameProduct}</h3>
                        <p>
                            ${product.descriptionProduct}
                        </p>
                            <div class="btn-group-m text-center fixed-bottom" role="group" aria-label="Basic example">
                                <button type="button" class="btn btn-dark btn-price priceProduct" disabled>$${product.priceProduct}</button>
                                <button type="button" class="btn btn-secondary addToCart">Comprar<i class="fas fa-shopping-cart"></i></button>
                            </div>
                    </div>
                </div>
            </div>
        `
        
        cardsProducts.unshift(card);
        
    }
    spaceCardsAdd.innerHTML = cardsProducts.join('');
    const productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
    showProducts(productsCart);
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
            <button class="dropdown-item" data-toggle="modal" data-target="#cartModal">Carrito</button>
            <button type="button" class="dropdown-item" onclick="logOut()">Cerrar Sesión</button>
        </div>
    </div>

    `
}else {
    userNav.innerHTML =
    `
    <div id="btnLogin" class="">
            <a class="btn btn-secondary" href="./login.html" rel=""><i class="fas fa-user mx-2"></i>Mi Cuenta</a>
    </div>

    `
}

//ELIMINAR EL USUARIO LOGUEADO Y RECARGAR LA PAGINA
function logOut(){
    localStorage.removeItem('userLogged');
    location.reload();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


//CARRITO DE COMPRAS


const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach(addToShopCartButtons =>
    addToShopCartButtons.addEventListener('click', addToCartClick));


function alertAddProduct() {
    alertaProducto.classList.remove('d-none');
}
function Ocultar() {
    setTimeout(function () {
        $(".alert").hide(3000);
    }, 900);
}
function addToCartClick(event){
    const productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
    const button = event.target;
    const itemProduct = button.closest('.itemProduct');

    const titleProduct = itemProduct.querySelector('.titleProduct').textContent;
    const priceProduct = itemProduct.querySelector('.priceProduct').textContent;
    const imgProduct = itemProduct.querySelector('.imgProduct').src;
    const idProduct = itemProduct.querySelector('.idProduct').textContent;
    

    productsCart.push({
        titleProduct,
        priceProduct,
        imgProduct,
        idProduct,
    })

    //Guardar el carrito de compras en localStorage.
    localStorage.setItem('productsCart', JSON.stringify(productsCart));

    alertAddProduct();
    Ocultar();
    showProducts(productsCart);
    updateShopTotal();

}

function showProducts (productsCart) {
    const trCartProduct = [];

    for (let i = 0; i < productsCart.length; i++) {
        const product = productsCart[i];
        const tr = `
            <tr>
                <td><img class="size-img-shopCart" src="${product.imgProduct}" alt=""></td>
                <td>${product.titleProduct}</td>
                <td>${product.priceProduct}</td>
                <td><input id="inputQuantity" class="input-cantidad" type="number" value="1"></td>
                <td>
                    <button class="btn btn-sm btn-danger" onclick="deleteProductCart('${product.idProduct}')"><i class="fas fa-trash-alt"></i></button>
                </td>    
            </tr>
        `
        trCartProduct.unshift(tr);
    }

    tableCartProduct.innerHTML = trCartProduct.join('');
    updateShopTotal();
}

function updateShopTotal() {
    let total = 0;
    const productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
    
    productsCart.forEach((product)=>{
        const productPrice = product.priceProduct;
        const numerPrice = parseFloat(productPrice.replace('$', ''));
        const inputQuantity = parseFloat(document.getElementById('inputQuantity').value);
        total = total + (numerPrice*inputQuantity);
    })
    totalShopCart.innerHTML = `${total}`;
}

//BORRAR PRODUCTO DEL CARRITO
function deleteProductCart(productId) {
    const productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
    const filteredProductsCart = productsCart.filter((productCart)=> productCart.idProduct !== productId);
    localStorage.setItem('productsCart', JSON.stringify(filteredProductsCart));
    showProducts(filteredProductsCart);
}

//VACIAR CARRITO
function emptyCart(){
    localStorage.removeItem('productsCart');
    showProducts([]);
}