const formLogin = document.getElementById('formLogin');
const userInput = document.getElementById('userNameCreate');
const passwordInput = document.getElementById('passwordCreate');
const nicknameInput = document.getElementById('nicknameCreate');
const emailInput = document.getElementById('emailCreate');
const birthDateInput = document.getElementById('birthDateCreate');
const alerta = document.getElementById('alerta');
const userAcount = document.getElementById('userAcount');

//USER ADMIN
const administrador = {
    user: 'admin1',
    password: 'admin1',
};

//OUT USERS
const formCreate = document.getElementById('formCreate')
const userCreateInput = document.getElementById('userNameCreate')
const passwordCreateInput = document.getElementById('passwordCreate')

formCreate.onsubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = userCreateInput.value;
    const password = passwordCreateInput.value;
    const nickname = nicknameCreate.value;
    const email = emailCreate.value;
    const birthDate = birthDateCreate.value;


    users.push({
        user,
        password,
        nickname,
        email,
        birthDate,
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
        alert('Bienvenido/a');
        window.location.href = './admin.html';
    } else if (findOutUser) {
        alert('Bienvenido/a');
        window.location.href = './index.html';
    }else{
        alerta.classList.remove('d-none');
    }
    
}