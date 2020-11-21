//DECLARACIÓN DE VARIABLES FORMULARIO AGREGAR PRODUCTOS
const formAddProduct = document.getElementById('formAddProduct');
const nameProductInput = document.getElementById('nameProduct');
const descriptionProductInput = document.getElementById('descriptionProduct');
const priceProductInput = document.getElementById('priceProduct');
const imgProductInput = document.getElementById('imgProduct');

//DECLARACIÓN DE VARIABLES PARA MOSTRAR LOS PRODUCTOS
const tableProducts = document.getElementById('tableProducts');


formAddProduct.onsubmit = (event) =>{
    //Evento para prevenir que la pagina se recargue
    event.preventDefault();

    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];

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
    alert('Su producto se guardó con correctamente')
    formAddProduct.reset();
    $('#modalAddProduct').modal('hide');
    createProduct();
}

function createProduct() {
    //Traer los productos de local storage
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const trProducts = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const tr = `
        <tr>
            <th scope="row">${[i]}</th>
            <td>${product.nameProduct}</td>
            <td>${product.descriptionProduct}</td>
            <td>${product.priceProduct}</td>
            <td>
                <button type="button" class="btn btn-sm btn-warning text-light ml-3" data-toggle="modal" data-target="#modalEditNote" onclick="">
                <i class="fas fa-user-edit"></i></button>  
                
                <button onclick="deleteProduct('${product.id}')" class="btn btn-sm btn-danger mx-2">
                <i class="fas fa-trash-alt"></i></button>
            </td>
        </tr>
        `
        
        trProducts.unshift(tr);
    }
    
    tableProducts.innerHTML = trProducts.join('');
}
createProduct();

function deleteProduct(productId) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const filteredProducts = products.filter((product)=> product.id !== productId);
    localStorage.setItem('products', JSON.stringify(filteredProducts));
    createProduct();
}

