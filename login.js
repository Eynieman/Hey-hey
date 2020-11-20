const formLogin = document.getElementById('formLogin');
const userInput = document.getElementById('user')
const passwordInput = document.getElementById('password')
const alert = document.getElementById('alert')

formLogin.onsubmit = function (e) {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = userInput.value;
    const password = passwordInput.value;
    const findOutUser = users.find((u) => u.user === user && u.password === password);


    if (findOutUser) {
        alert('Bienvenido/a');
        window.location.href = './login.html'
    } else {
        alert.classList.remove('d-none');
    }
}


const formCreate = document.getElementById('formCreate')
const userCreateInput = document.getElementById('userCreate')
const passwordCreateInput = document.getElementById('passwordCreate')

formCreate.onsubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = userCreateInput.value;
    const password = passwordCreateInput.value;


    users.push({
        user,
        password,
    })

    localStorage.setItem('users', JSON.stringify(users));
    formCreate.reset();
    $('#modalCreateAccount').modal('hide');
}

