const formLogin = document.getElementById('formLogin');
const userInput = document.getElementById('user');
const passwordInput = document.getElementById('password');
const alerta = document.getElementById('alerta');

formLogin.onsubmit = function (e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = userInput.value;
    const password = passwordInput.value;
    const findOutUser = users.find((u) => u.user === user && u.password === password);


    if (findOutUser) {
        alert('Bienvenido/a');
        window.location.href = './index.html'
    } else {
        alerta.classList.remove('d-none');
    }
}


const formCreate = document.getElementById('formCreate');
const userCreateInput = document.getElementById('userNameCreate');
const passwordCreateInput = document.getElementById('passwordCreate');
const nicknameCreateInput = document.getElementById('nicknameCreate');
const emailCreateInput = document.getElementById('emailCreate');
const birthDateCreateInput = document.getElementById('birthDateCreate');


formCreate.onsubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = userCreateInput.value;
    const password = passwordCreateInput.value;
    const nickname = nicknameCreateInput.value;
    const email = emailCreateInput.value;
    const birthDate = birthDateCreateInput.value;


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

