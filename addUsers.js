const loadForm = (userId) => {
    // Esta función carga los datos del usuario seleccionado,
    // en los campos del formulario del documento HTML.

    // Traer la lista de usuarios de localStorage,
    // sino existe la clave 'users', devuelve un arreglo vacío.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Buscar el usuario en el array usando el método find(),
    // comparando el id que recibe por parámetro la función hasta encontrar el usuario que coincide.
    const user = users.find((u) => u.id === userId);
    userCreateInput.value = user.user;
    nicknameCreateInput.value = user.nickname;
    emailCreateInput.value = user.email;
    birthDateCreateInput.value = user.birthDate;
    // Actualizar el valor de la variable global editUserId,
    // para guardar el id del usuario a editar.
    editUserId = userId;
}

function displayUsers(users) {
    // La función ahora recibe por parámetros el array de usuarios que debe insertar en el documento HTML.

    const rows = [];
    for (let i = 0; i < users.length; i++) {
        // Guardamos los datos de usuario en user.
        const user = users[i];
        // Creamos en un string una fila para la tabla,
        // con los datos del usuario separados en cada celda.
        const tr = `
        <tr>
            <td>${user.user}</td>
            <td>${user.nickname}</td>
            <td>${user.birthDate || ''}</td>
            <td>${user.email}</td>
            <td><button type="button" class="btn btn-warning text-white" data-toggle="modal" data-target="#editModal" onclick="loadForm('${user.id}')"><i class="far fa-edit"></i></button>
            <td><button onclick="deleteUser('${user.id}')" class="btn btn-danger"><i class="fas fa-trash-alt"></i></button></td>
            <td><button onclick="suspendUser('${user.id}')" class="btn btn-info"><i class="fab fa-expeditedssl"></i></button></td>
        </tr>
        `;
        // Agregamos el string de la fila al array rows.
        rows.push(tr);
    }
    // Unimos todas las filas en un solo string con join(),
    // y lo insertamos en el contenido de la tabla.
    usersTable.innerHTML = rows.join('');
}

function displayAllUsers() {
    //Traer los usuarios de local storage
    // Traer la lista de usuarios de localStorage,
    // sino existe la clave 'users', devuelve un arreglo vacío.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Llamar a la función displayUsers, pasando por parámetros la lista completa de usuarios.
    displayUsers(users);
}

function deleteUser(userId) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const filteredUsers = users.filter((user) => user.id !== userId);
    const usersJson = JSON.stringify(filteredUsers);
    alert("¡Dato borrado!");
    localStorage.setItem('users', usersJson);
    displayAllUsers();
}


formUserEdit.onsubmit = (e) => {
    // Al evento submit del formulario de edición le asignamos esta función,
    // que actualiza al usuario seleccionado, con los datos ingresados.

    e.preventDefault()
    // Traer la lista de usuarios de localStorage,
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Guardar en variables los valores ingresados por el usuario.
    const user = userCreateInput.value;
    const nickname = nicknameCreateInput.value;
    const email = emailCreateInput.value;
    const birthDate = birthDateCreateInput.value;

    // Actualizar un usuario del array, usando map().
    const updatedUsers = users.map((u) => {
        // Usamos el id de usuario guardado en editUserId,
        // para modificar solo al usuario que coincida con este.
        if (u.id === editUserId) {
            // Usar spread syntax para copiar las propiedades de un objeto a otro.
            const users = {
                ...u,
                user,
                nickname,
                email,
                birthDate,
            }
            return users;
        } else {
            // Retornar el usuario sin modificar en los casos que no coincida el id.
            return u;
        }
    });

    // Guardar lista de usuarios en localStorage.
    const usersJson = JSON.stringify(updatedUsers);
    localStorage.setItem('users', usersJson);
    formEdit.reset();
    console.log("El usuario se modificó exitosamente");
    displayAllUsers();
    // Ocultar el modal con las funciones incluidas en jQuery.
    $('#editUserModal').modal('hide');
}

searchForm.onsubmit = (e) => {
    // Al evento submit de la barra de búsqueda le asignamos esta función,
    // que filtra y muestra los usuarios que coinciden con la búsqueda.
    e.preventDefault();
    // Guardar en una variable la lista completa de usuarios.
    const users = JSON.parse(localStorage.getItem('users')) || [];
    // Transformar en minúsculas la palabra buscada y guardarla en una variable.
    const term = search.value.toLowerCase();
    console.log("term", term);
    // Guardar el array resultante de aplicar el método filter sobre el array de usuarios,
    // filtrando para obtener solo los que incluyen la palabra buscada.
    const filteredUsers = users.filter((u) => (
        // Usar el método toLowerCase() para transformar el nombre y apellido a minúscula,
        // y el método includes() que evalúa si se incluye o no la palabra buscada.
        u.user.toLowerCase().includes(term) || u.nickname.toLowerCase().includes(term)
    ));
    // Llamar a la función displayUsers, pasando por parámetros la lista filtrada de usuarios.
    displayUsers(filteredUsers);
}
displayAllUsers();