//LOGIN USERS
const formLogin = document.getElementById('formLogin');
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');
const alerta = document.getElementById('alerta');
const userAcount = document.getElementById('userAcount');

//USER ADMIN
const administrador = {
    user: 'admin1',
    password: 'admin1',
};

//CREATE USERS
const formCreate = document.getElementById('formCreate');
const nombreApellidoInput = document.getElementById('nombreApellido');
const nickNameInput = document.getElementById('userCreate');
const passwordCreateInput = document.getElementById('passwordCreate');
const emailInput = document.getElementById('emailCreate');
const birthDateCreateInput = document.getElementById('birthDateCreate');

formCreate.onsubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = nickNameInput.value;
    const password = passwordCreateInput.value;
    const email =  emailInput.value;
    const nombreApellido = nombreApellidoInput.value;
    const birthDateCreate = birthDateCreateInput.value;
    //Funcion para crear el id unico para cada nota
    const generateId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    users.push({
        user,
        password,
        email,
        nombreApellido,
        birthDateCreate,
        id: generateId(),
    })
    
    localStorage.setItem('users', JSON.stringify(users));
    formCreate.reset();
    $('#modalCreateAccount').modal('hide');
}

formLogin.onsubmit = function (e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = userInput.value;
    const password = passwordInput.value;
    const findOutUser = users.find((u) => u.user === user && u.password === password);
    const userAdmin = user === administrador.user && password === administrador.password;
    if (userAdmin) {
        alert('Bienvenido/a😁');
        window.location.href = './admin.html';
    } else if (findOutUser) {
        alert('Bienvenido/a😁');
        window.location.href = './index.html';
    }else{
        alerta.classList.remove('d-none');
    }
}