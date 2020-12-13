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
    localStorage.setItem('products', JSON.stringify(products));
    tableProducts.innerHTML = trProducts.join('');
}
displayAllProducts();

function displayAllProducts() {
    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || productsDefault;
    createProduct(products);
}

function deleteProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
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
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find((producto) => producto.id === productId);
    nameEditProductIn.value = product.nameProduct;
    descriptionEditProductIn.value = product.descriptionProduct;
    priceEditProductIn.value = product.priceProduct;
    imgEditProductIn.value = product.imgProduct;
    editProductId = product.id;
}


formEditProduct.onsubmit = (evento) =>{
    evento.preventDefault();
    const products = JSON.parse(localStorage.getItem('products')) || [];

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
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const term = searchProductInput.value;
    const filteredProducts = products.filter(product =>(
        product.nameProduct.toLowerCase().includes(term.toLowerCase())
        ));
        searchForm.reset();
        productSearch.classList.remove('d-none');
        Ocultar();
        createProduct(filteredProducts);    
};
