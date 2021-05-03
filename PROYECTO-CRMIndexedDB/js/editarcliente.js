(function () {
    let DB;

    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const eamilInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    const formulario = document.querySelector('#formulario');
    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();
        // verificar el Id de la URL

        // actualiza el registro de guardar a editar
        formulario.addEventListener('submit', actualizarCliente);
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if (idCliente) {

            setTimeout(() => {
                obtenerCliente(idCliente);
            }, 1000);

        }
    });

    function actualizarCliente(e) {
        e.preventDefault();
        if (nombreInput.value == '' || eamilInput.value == '' || telefonoInput.value == '' || empresaInput.value == '') {
            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        // actualizar cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: eamilInput.value,
            telefono: telefonoInput.value,
            empresa: empresaInput.value,
            id: Number(idCliente)
        }

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        objectStore.put(clienteActualizado);

        transaction.oncomplete = function () {
            imprimirAlerta('Editado Correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };

        transaction.onerror = function () {
            imprimirAlerta('Hubo un error', 'error');
        }
    }

    function obtenerCliente(id) {
        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function (e) {
            const cursor = e.target.result;

            if (cursor) {
                if (cursor.value.id == Number(id)) {
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function llenarFormulario(datosCliente) {
        const { nombre, email, telefono, empresa } = datosCliente;

        nombreInput.value = nombre;
        eamilInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;

    }


    function conectarDB() {
        // creamos la base de datos crm y nos conectamos
        const abrirConexion = window.indexedDB.open('crm', 1);
        /// mensaje para mostrar que hubo un eror
        abrirConexion.onerror = function () {
            console.log('Hubo un error');
        };
        // mensaje para  saber si no hubo ningun error
        abrirConexion.onsuccess = function () {
            DB = abrirConexion.result;
        }
    }

})();