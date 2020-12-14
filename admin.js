//Traer los productos de local storage
const products = JSON.parse(localStorage.getItem('products')) || productsDefault;
//DECLARACIÓN DE VARIABLES FORMULARIO AGREGAR PRODUCTOS
const formAddProduct = document.getElementById('formAddProduct');
const nameProductInput = document.getElementById('nameProduct');
const descriptionProductInput = document.getElementById('descriptionProduct');
const priceProductInput = document.getElementById('priceProduct');
const imgProductInput = document.getElementById('imgProduct');

//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS
const tableProducts = document.getElementById('tableProducts');

//DECLARACIÓN DE VARIABLES FORMULARIO EDITAR PRODUCTOS
const formEditProduct = document.getElementById('formEditProduct');
const nameEditProductIn = document.getElementById('nameEditProduct');
const descriptionEditProductIn = document.getElementById('descriptionEditProduct');
const priceEditProductIn = document.getElementById('priceEditProduct');
const imgEditProductIn = document.getElementById('imgEditProduct');

//DECLARACIÓN DE VARIABLES PARA LA BÚSQUEDA DE PRODUCTOS
const searchForm = document.getElementById('searchForm');
const searchProductInput = document.getElementById('searchProductInput');
const productSearch = document.getElementById('productSearch');


//DECLARACIÓN DE VARIABLES PARA ALERTAS DE AGREGO/MODIFICO/ELIMINO PRODUCTOS
const productAdd = document.getElementById('productAdd');
const productMod = document.getElementById('productMod');
const productDel = document.getElementById('productDel');

//ALERTA DESLOGUEO ADMIN
const adminOut = document.getElementById('adminOut');

//Funcion LogOut
function logOutAdmin(){
    adminOut.classList.remove('d-none');
    //Delay para el deslogueo
    $('#error').show();
    setTimeout(function () {
        window.location.href = './index.html';
    }, 1000);
}




formAddProduct.onsubmit = (event) =>{
    //Evento para prevenir que la pagina se recargue
    event.preventDefault();

    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || productsDefault;

    //Tomar los valores de los input del producto
    const nameProduct = nameProductInput.value;
    const descriptionProduct = descriptionProductInput.value;
    const priceProduct = priceProductInput.value;
    const imgProduct = imgProductInput.value;

    //Funcion para crear el id unico para cada nota
    const generateId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    products.push({
        nameProduct,
        descriptionProduct,
        priceProduct,
        imgProduct,
        id: generateId(),
    })

    ////Guardar lista de usuarios en localStorage.
    localStorage.setItem('products', JSON.stringify(products));
    formAddProduct.reset();
    $('#modalAddProduct').modal('hide');
    productAdd.classList.remove('d-none');
    Ocultar();

    displayAllProducts();
}


function createProduct(products) {

    const trProducts = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        //<th scope="row">${[i]}</th>
        const tr = `
        <tr>
            <td><img class="size-img-ShopCart" src="${product.imgProduct}" alt=""></td>
            <td>${product.nameProduct}</td>
            <td>${product.descriptionProduct}</td>
            <td>${product.priceProduct}</td>
            <td>
                <button type="button" class="btn btn-sm btn-warning text-light" data-toggle="modal" data-target="#modalEditProduct" onclick="uploadFormEdit('${product.id}')">
                <i class="fas fa-user-edit"></i></button>  
            </td>
            <td>
                <button onclick="deleteProduct('${product.id}')" class="btn btn-sm btn-danger">
                <i class="fas fa-trash-alt"></i></button>
            </td>    
        </tr>
        `
        
        trProducts.unshift(tr);
    }
    tableProducts.innerHTML = trProducts.join('');
}
displayAllProducts();

function displayAllProducts() {
    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || productsDefault;
    createProduct(products);
}

function deleteProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || productsDefault;
    const filteredProducts = products.filter((product)=> product.id !== productId);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    productDel.classList.remove('d-none');
    Ocultar();
    displayAllProducts();
}

// Funcion Ocultar para divs:
function Ocultar() {
    setTimeout(function () {
        const alertas = $(".alert")
        for (let i = 0; i < alertas.length; i++) {
            const element = alertas[i];
            element.classList.add('d-none');
        }
    }, 2000);
}

const uploadFormEdit = (productId) =>{
    const products = JSON.parse(localStorage.getItem('products')) || productsDefault;
    const product = products.find((producto) => producto.id === productId);
    nameEditProductIn.value = product.nameProduct;
    descriptionEditProductIn.value = product.descriptionProduct;
    priceEditProductIn.value = product.priceProduct;
    imgEditProductIn.value = product.imgProduct;
    editProductId = product.id;
}


formEditProduct.onsubmit = (evento) =>{
    evento.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || productsDefault;

    //Tomar los valores de los input del producto
    const nameProduct = nameEditProductIn.value;
    const descriptionProduct = descriptionEditProductIn.value;
    const priceProduct = priceEditProductIn.value;
    const imgProduct = imgEditProductIn.value;
    
    const updateProduct = products.map((producto) => (
        (producto.id === editProductId) ? {...producto, nameProduct, descriptionProduct, priceProduct, imgProduct} : producto
    ))

    const productsEdit = JSON.stringify(updateProduct);
    localStorage.setItem('products', productsEdit);

    formEditProduct.reset();
    $('#modalEditProduct').modal('hide');
    productMod.classList.remove('d-none');
    Ocultar();
    displayAllProducts();
}

    searchForm.onsubmit = (e) => {
    e.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || productsDefault;
    const term = searchProductInput.value;
    const filteredProducts = products.filter(product =>(
        product.nameProduct.toLowerCase().includes(term.toLowerCase())
        ));
        searchForm.reset();
        productSearch.classList.remove('d-none');
        Ocultar();
        createProduct(filteredProducts);
};
