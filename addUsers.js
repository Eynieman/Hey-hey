const loadForm = (userId) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((u) => u.id === userId);
    userCreateInput.value = user.user;
    nicknameCreateInput.value = user.nickname;
    emailCreateInput.value = user.email;
    birthDateCreateInput.value = user.birthDate;
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
            <td><button type="button" class="btn btn-warning text-white" data-toggle="modal" data-target="#editModal" onclick="loadForm('${user.id}')"><i class="far fa-edit"></i></button>
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
    alert("Usuario borrado!");
    localStorage.setItem('users', usersJson);
    displayAllUsers();
}


formUserEdit.onsubmit = (e) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = userCreateInput.value;
    const nickname = nicknameCreateInput.value;
    const email = emailCreateInput.value;
    const birthDate = birthDateCreateInput.value;

    const updatedUsers = users.map((u) => {
        if (u.id === editUserId) {
            const users = {
                ...u,
                user,
                nickname,
                email,
                birthDate,
            }
            return users;
        } else {
            return u;
        }
    });

    const usersJson = JSON.stringify(updatedUsers);
    localStorage.setItem('users', usersJson);
    formEdit.reset();
    displayAllUsers();
    $('#editUserModal').modal('hide');
}

searchForm.onsubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const term = search.value.toLowerCase();
    console.log("term", term);
    const filteredUsers = users.filter((u) => (
        u.user.toLowerCase().includes(term) || u.nickname.toLowerCase().includes(term)
    ));
    displayUsers(filteredUsers);
}
displayAllUsers();