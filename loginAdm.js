/*--------------------------LOGIN ADMIN-------------------------*/
const formLoginAdm = document.getElementById('formLogin');
const inputUserAdm = document.getElementById('user');
const inputPasswordAdm = document.getElementById('password');
const alertAdm = document.getElementById('alert');

const persona = {
    user: 'admin1',
    password: 'admin1',
};

formLoginAdm.onsubmit = function (e) {
    e.preventDefault();
    const user = inputUserAdm.value;
    const password = inputPasswordAdm.value;
    const usuarioValido = user === persona.user &&
        password === persona.password;
    if (usuarioValido) {
        window.location.href = './admin.html';
    } else {
        alertAdm.classList.remove('d-none');
    }
};