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
            <td>${user.userCreateInput}</td>
            <td>${user.nicknameCreateInput}</td>
            <td>${user.emailCreateInput || ''}</td>
            <td>${user.birthDateCreateInput || ''}</td>
        </tr>
        `;
        // Agregamos el string de la fila al array rows.
        rows.push(tr);
    }
    // Unimos todas las filas en un solo string con join(),
    // y lo insertamos en el contenido de la tabla.
    usersTable.innerHTML = rows.join('');
}