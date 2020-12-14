//ARRAY PRODUCTOS HARDCODEADOS
const productsDefault = [ 
    {nameProduct:'Nueces', descriptionProduct:'Nueces', priceProduct:'120', imgProduct:'https://frutosare.com.ar/wp-content/uploads/2019/07/nuez-dorada.jpg', id:'productDefault1'}, 
    {nameProduct:'Aceite de Coco', descriptionProduct:'Aceite de Coco', priceProduct:'130', imgProduct:'https://www.culturaalimentaria.com.ar/wp-content/uploads/2016/08/mk.jpg', id:'productDefault2'},
    {nameProduct:'Yogurt Griego', descriptionProduct:'Yogurt Griego', priceProduct:'150', imgProduct:'https://images.lider.cl/wmtcl?source=url[file:/productos/497326a.jpg]&sink', id:'productDefault3'},
    {nameProduct:'Leche de Almendras', descriptionProduct:'Leche de Almendras', priceProduct:'110', imgProduct:'https://d26lpennugtm8s.cloudfront.net/stores/942/490/products/diseno-sin-titulo-871-adfadedab943e1f32915650200181711-640-0.png', id:'productDefault4'},
    {nameProduct:'Chips de Mandioca', descriptionProduct:'Chips de Mandioca', priceProduct:'80', imgProduct:'https://d26lpennugtm8s.cloudfront.net/stores/837/566/products/mandioca-frita-11-330fe41a015343e3b815873637387875-640-01-f859b58a7bffa3a47d15916620869643-640-0.jpg', id:'productDefault5'},
    {nameProduct:'Arroz Integral', descriptionProduct:'Arroz Integral', priceProduct:'180', imgProduct:'https://supermercado.carrefour.com.ar/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/7/7/7790070411914_01.jpg', id:'productDefault6'},
    {nameProduct:'Pasta de Maní', descriptionProduct:'Pasta de Maní', priceProduct:'100', imgProduct:'https://www.casa-segal.com/wp-content/uploads/2020/10/pasta-mani-king-485g-insumos-de-resposteria-reposteria-casa-segal-mendoza.png', id:'productDefault7'},
    {nameProduct:'Dulce de Leche', descriptionProduct:'Dulce de Leche', priceProduct:'110', imgProduct:'https://d26lpennugtm8s.cloudfront.net/stores/001/163/250/products/beepure-dulce-de-leche-sin-azucar1-862b3fdacf20bd0d3016007978169527-1024-10241-851f71cfbc626712dc16009041190775-640-0.jpg', id:'productDefault8'},
    {nameProduct:'Aceite de Oliva', descriptionProduct:'Aceite de Oliva', priceProduct:'190', imgProduct:'https://d26lpennugtm8s.cloudfront.net/stores/942/490/products/capn-acks-5th-birthday-51-399690d571e305259115524962503353-640-0.png', id:'productDefault9'},
]

//Traer los productos de local storage
const products = JSON.parse(localStorage.getItem('products')) || productsDefault;
////Guardar lista de usuarios en localStorage.
localStorage.setItem('products', JSON.stringify(products));

//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS
const spaceCardsAdd = document.getElementById('spaceCardsAdd');
//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS EN EL CARRITO
const productosCart = document.getElementById('productosCart');
//TABLA DEL MODAL CARRITO
const tableCartProduct = document.getElementById('tableCartProduct');
//TOTAL PRODUCTOS MODAL CARRITO
const totalShopCart = document.getElementById('totalShopCart');
//BOTON BORRAR PRODUCTO DEL CARRITO
const btnDeleteProductCart = document.getElementById('btnDeleteProductCart');
//ALERTA DE DESLOGUEO
const alertaOut = document.getElementById('alertaOut');
//ALERTA EMPTY CART
const alertaEmptyCart = document.getElementById('alertaEmptyCart');
//ALERTA COMPRA EXITOSA
const alertaCompraExitosa = document.getElementById('alertaCompraExitosa');


function createProduct() {
    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || productsDefault;
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
                            <input id="inputQuantity${product.idProduct}" class="input-cantidad d-none" type="number" value="1"></td>
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
    alertaOut.classList.remove('d-none');
    localStorage.removeItem('userLogged');
    //Delay para el deslogueo
    $('#error').show();
    setTimeout(function () {
        location.reload();
    }, 1000);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////


//CARRITO DE COMPRAS


function alertAddProduct() {
    alertaProducto.classList.remove('d-none');
}

function Ocultar() {
    setTimeout(function () {
        const alertas = $(".alert")
        for (let i = 0; i < alertas.length; i++) {
            const element = alertas[i];
            element.classList.add('d-none');
        }
    }, 1000);
}

function addToCartClick(event){
    const productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
    const button = event.target;
    const itemProduct = button.closest('.itemProduct');

    const titleProduct = itemProduct.querySelector('.titleProduct').textContent;
    const priceProduct = itemProduct.querySelector('.priceProduct').textContent;
    const imgProduct = itemProduct.querySelector('.imgProduct').src;
    const idProduct = itemProduct.querySelector('.idProduct').textContent;
    const inputQuantity = parseFloat(itemProduct.querySelector('.input-cantidad').value);

    
    const isFound = increaseQuantity (idProduct);
    if (!isFound) {
        productsCart.push({
            titleProduct,
            priceProduct,
            imgProduct,
            idProduct,
            inputQuantity,
        })
        
        //Guardar el carrito de compras en localStorage.
        localStorage.setItem('productsCart', JSON.stringify(productsCart));
        showProducts(productsCart);
    }



    alertAddProduct();
    Ocultar();
    
    // Después de cargarse la tabla, se cargan los listeners de los inputs.
    addQuantityChangeEvents();
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
                <td><input id="inputQuantity${product.idProduct}" class="input-cantidad" type="number" value="${product.inputQuantity}"></td>
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
        const inputQuantity = parseFloat(document.getElementById(`inputQuantity${product.idProduct}`).value);
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
    alertaEmptyCart.classList.remove('d-none');
    localStorage.removeItem('productsCart');
    showProducts([]);
    setTimeout(function () {
        $('#cartModal').modal('hide');
    }, 1800);
}

//COMPRA EXITOSA
function compraExitosa() {
    alertaCompraExitosa.classList.remove('d-none');
    localStorage.removeItem('productsCart');
    showProducts([]);
    setTimeout(function () {
        $('#cartModal').modal('hide');
    }, 1800);
}

//CANTIDAD DE PRODUCTOS

function addQuantityChangeEvents() {
    function quantityChanged(event) {
        const input = event.target;
        input.value <= 0 ? (input.value = 1) : null;
        updateShopTotal();
    }
    const inputQuantities = document.querySelectorAll('.input-cantidad');
    for (const input of inputQuantities ) {
        input.addEventListener('change', quantityChanged);
    }
}

//VALIDACIÓN PARA AUMENTAR LA CANTIDAD EN CASO DE PRODUCTO REPETIDO

function increaseQuantity (idProduct) {
    const productsCart = JSON.parse(localStorage.getItem('productsCart')) || [];
        for (let i = 0; i < productsCart.length; i++) {
            const product = productsCart[i];
            if (product.idProduct === idProduct){
                product.inputQuantity += 1
                localStorage.setItem('productsCart', JSON.stringify(productsCart));
                showProducts(productsCart);
                return true;
            }
        }
        return false;
}

// AGREGAR PRODUCTOS AL CARRITO
function addToCartClickEvents() {
    const addToCartButtons = document.querySelectorAll('.addToCart');
    addToCartButtons.forEach((addToShopCartButtons) =>
        addToShopCartButtons.addEventListener('click', addToCartClick)
    );
}


createProduct();
addToCartClickEvents();
showProducts(JSON.parse(localStorage.getItem('productsCart')) || []);
addQuantityChangeEvents();

