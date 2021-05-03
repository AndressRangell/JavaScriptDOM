// conetamo la base de datos
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

function imprimirAlerta(mensaje, tipo) {

    const alerta = document.querySelector('.alerta');

    if (!alerta) {

        // crear la alerta
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'border', 'alerta');

        if (tipo == 'error') {
            divMensaje.classList.add('bg-red-100', 'border-red-400', 'text-red-700');
        } else {
            divMensaje.classList.add('bg-green-100', 'border-green-400', 'text-green-700');
        }

        divMensaje.textContent = mensaje;

        formulario.appendChild(divMensaje);

        setTimeout(() => {
            divMensaje.remove();
        }, 3000);
    }
}