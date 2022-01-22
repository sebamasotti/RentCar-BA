let botonReserva = document.getElementById('botonReserva');

//Muestro el boton de "Ver Reserva" si hay Usuarios registrados y hay alguna Reserva.

if (!usuarios.length >0 ) {
    let botonReserva = document.getElementById('botonReserva')
    botonReserva?.remove()    
}

//Muestro la reserva en una card.
function mostrarReserva(reservaStorage) {
    if(divReservar.children.length == 0) {
        reservaStorage?.forEach(auto => {
            divReservar.innerHTML += `
            <div id="reservado${auto.id}" class="card border-success mb-3" style="max-width: 20rem;">
            <div class="card-header">¡CONFIRMADO!</div>
            <div class="card-body">
                <h4 class="card-title"> El automovil ${auto.nombre} ${auto.modelos} ha sido reservado.</h4>
                <p class="card-text">Podes pasar a retirarlo de Lunes a Sabados. De 08hs a 20hs.</p>
                <button id="boton${auto.id}" class="btn btn-danger">Eliminar Reserva</button>
            </div>
        `
            //Eliminar Reserva.
            reservaStorage.forEach(() => {
                document.getElementById(`boton${auto.id}`).addEventListener('click', () => {
                    //Elimino del DOM.
                    document.getElementById(`reservado${auto.id}`).remove();
                    //Elimino del LStorage (Se actualiza con los nuevos valores).
                    localStorage.removeItem('reserva');
                    //Mensaje
                    errorReservar.innerText = "Reserva Eliminada";
                })
            });
        });
                
    } else {
        errorReservar.innerText = "Reserva Mostrada";
    }
}

botonReserva?.addEventListener('click', () => {
    let reservaStorage = JSON.parse(localStorage.getItem('reserva'))
    mostrarReserva(reservaStorage)
})
