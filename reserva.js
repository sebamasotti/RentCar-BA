//Seccion Reserva.

class Reserva {
    constructor(id, nombre, modelos, valor) {
        this.id = id;
        this.nombre = nombre;
        this.modelos = modelos;
        this.valor = valor; 
    }
}

let arrayReserva = [];

if(!localStorage.getItem('reserva')) {
    localStorage.setItem('reserva', JSON.stringify([]))
}