(function () {
    //creamos la base de datos si aun no ha sido creada
    let DB;

    // estraemos el formulario

    const formulario = document.querySelector('#formulario');


    document.addEventListener('DOMContentLoaded', () => {

        conectarDB();

        formulario.addEventListener('submit', validarCliente);
    });

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm',1);

        abrirConexion.onerror =function(){
             console.log('Hubo un error');
        }

        abrirConexion.onsuccess =function(){
            DB= abrirConexion.result;
        }
    }

    // validar si todos los campos estan llenos
    function validarCliente(e) {
        e.preventDefault();

        // Extraer todos los imputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if (nombre == '' || email == '' || telefono == '' || empresa == '') {

            imprimirAlerta('Todos los campos son obligatorios', 'error');

            return;
        }

        // crear un nuevo objeto con la informacion

        const cliente = {
            nombre,
            email,
            telefono,
            empresa,
        }

        cliente.id = Date.now();

        crearNuevoCliente(cliente);

    }


    function crearNuevoCliente(cliente) {
        const transaction = DB.transaction(['crm'], 'readwrite');

        const objectStore = transaction.objectStore('crm');

        objectStore.add(cliente);

        transaction.onerror = function () {
            console.log('Hubo un error');
            imprimirAlerta('Hubo un error', 'error');
        };

        transaction.oncomplete = function () {
            console.log('Cliente Agregado');
            imprimirAlerta('El Cliente se agrego correctamente');

            setTimeout(() => {
                window.location.href = 'index.html';
            }, 3000);
        };
    }


})();