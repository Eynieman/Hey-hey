const userNameEdit = document.getElementById('userNameCreate');
const nickNameEdit = document.getElementById('nicknameCreate');
const emailEdit = document.getElementById('emailCreate');
const birthDateEdit = document.getElementById('birthDateCreate');

//DECLARACIÓN DE VARIABLES PARA ALERTAS DE MODIFICO/ELIMINO/SUSPENDO USUARIOS
const userMod = document.getElementById('userMod');
const userDel = document.getElementById('userDel');
const userSus = document.getElementById('userSus');

const loadForm = (userId) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.id === userId);
    userNameEdit.value = user.nombreApellido;
    nickNameEdit.value = user.user;
    emailEdit.value = user.email;
    birthDateEdit.value = user.birthDateCreate;
    editUserId = userId;
}

function displayUsers(users) {
    const rows = [];
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        const tr = `
        <tr>
            <td>${user.nombreApellido}</td>
            <td>${user.user}</td>
            <td>${user.birthDateCreate || ''}</td>
            <td>${user.email}</td>
            <td>${user.isSuspended}</td>
            <td><button type="button" class="btn btn-warning text-white" data-toggle="modal" data-target="#editUserModal" onclick="loadForm('${user.id}')"><i class="far fa-edit"></i></button>
            <td><button onclick="deleteUser('${user.id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
            <td><button onclick="suspendUser('${user.id}')" class="btn btn-info"><i class="fab fa-expeditedssl"></i></button></td>
            </tr>
            `;
        rows.push(tr);
    }
    usersTable.innerHTML = rows.join('');
}

function displayAllUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    displayUsers(users);
}

function deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter((user) => user.id !== userId);
    const usersJson = JSON.stringify(filteredUsers);
    userDel.classList.remove('d-none');
    localStorage.setItem('users', usersJson);
    displayAllUsers();
}

function suspendUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const updateUsers = users.map((user) => (
        (user.id === userId) ? {...user, isSuspended:!user.isSuspended} : user
    ))
    const usersJson = JSON.stringify(updateUsers);
    userSus.classList.remove('d-none');
    localStorage.setItem('users', usersJson);
    displayAllUsers();
}

formUserEdit.onsubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const nombreApellido = userNameEdit.value;
    const user = nickNameEdit.value;
    const email = emailEdit.value;
    const birthDateCreate = birthDateEdit.value;

    const updatedUsers = users.map((u) => {
        if (u.id === editUserId) {
            const users = {
                ...u,
                nombreApellido,
                user,
                email,
                birthDateCreate,
            }
            return users;
        } else {
            return u;
        }
    });

    const usersJson = JSON.stringify(updatedUsers);
    localStorage.setItem('users', usersJson);
    formUserEdit.reset();
    displayAllUsers();
    $('#editUserModal').modal('hide');
    userMod.classList.remove('d-none');
}

//DECLARACIÓN DE VARIABLES PARA LA BÚSQUEDA DE USUARIOS
const searchUserFormInput = document.getElementById('searchUserForm');
const searchUserInput = document.getElementById('searchUser');

// MODIFICAR FUNCIÓN PARA BUSCAR USUARIOS! AGREGAR INPUT BUSQUEDA
searchUserForm.onsubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const term = searchUserInput.value.toLowerCase();
    const filteredUsers = users.filter((u) => (
        u.user.toLowerCase().includes(term) || u.nombreApellido.toLowerCase().includes(term)     ));
        displayUsers(filteredUsers);
    }
displayAllUsers(); 