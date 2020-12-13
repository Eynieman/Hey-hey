//LOGIN USERS
const formLogin = document.getElementById('formLogin');
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');
//ALERTAS: CONTRASEÑA INVÁLIDA, LOGUEO, SUSPENDIDO, CREACION
const alerta = document.getElementById('alerta');
const alertaIn = document.getElementById('alertaIn');
const userSuspended = document.getElementById('userSuspended');
const userAcount = document.getElementById('userAcount');
const alertaCreate = document.getElementById('alertaCreate');
const alertaAdmin = document.getElementById('alertaAdmin');

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
    const email = emailInput.value;
    const nombreApellido = nombreApellidoInput.value;
    const birthDateCreate = birthDateCreateInput.value;
    const isSuspended = false;
    // Funcion para crear el id unico para cada usuario
    const generateId = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    users.push({
        user,
        password,
        email,
        nombreApellido,
        birthDateCreate,
        isSuspended,
        id: generateId(),
    })
    
    localStorage.setItem('users', JSON.stringify(users));
    formCreate.reset();
    alertaCreate.classList.remove('d-none');
    Ocultar();
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
        alertaAdmin.classList.remove('d-none');
        //Delay para el login de admin
        $('#error').show();
        setTimeout(function () {
            window.location.href = './admin.html';
        }, 1000);
    } else if (findOutUser) {
        if (findOutUser.isSuspended == true) {
            userSuspended.classList.remove('d-none');
            return;
        }
        localStorage.setItem('userLogged', JSON.stringify(findOutUser));
        alertaIn.classList.remove('d-none');
        //Delay para el login
        $('#error').show();
        setTimeout(function () {
            window.location.href = './index.html';
        }, 1000);
    }
    else {
        alerta.classList.remove('d-none');
        Ocultar();
    }
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