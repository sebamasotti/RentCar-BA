//Seccion Usuario.

//Creo un Objeto (Usuario).
class Usuario {
    constructor(nombre, apellido, documento, email) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.documento = documento;
        this.email = email;
    }
};

//Guardar informacion que esta en el LocalStorage.
let usuarios;

if(localStorage.getItem('usuarios')) {
    //Si existe un elemento el el LStorage, "usuarios" se iguala a esa info.
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
} else {
    //Si no existe, Creo un Array vacio para ir cargando Usuarios.
    usuarios = [];
}

//Id de Variables.
let formUsuario = document.getElementById('formUsuario');
let botonUsuarios = document.getElementById('botonUsuarios');
let divUsuarios = document.getElementById('divUsuarios');
let parrafoError =document.getElementById('parrafoError');
let usuarioEliminado = document.getElementById('usuarioEliminado');
let divAutos = document.getElementById('divAutos');
let div = document.getElementsByTagName('div'); 
let botonAutos = document.getElementById('botonAutos');
let divReservar = document.getElementById('divReservar');
let errorReservar = document.getElementById('errorReservar');

//Creo un Nuevo objeto (Usuario).

//JQuery para el Formulario.
$(() => {
    $('#formUsuario').submit((e) => {
        e.preventDefault()

        let objetoUsuario = new Usuario($('#nombre').val(), $('#apellido').val(), $('#documento').val(), $('#email').val(), $('#saldo').val());

        //Ingreso un nuevo Usuario al Array.
        usuarios.push(objetoUsuario);

        localStorage.setItem('usuarios', JSON.stringify(usuarios));

        $('#formUsuario').trigger("reset")
    })
});

//Agrego un evento al Boton.
document.getElementById('botonUsuarios')?.addEventListener('click', () => {
    let usuarioStorage = JSON.parse(localStorage.getItem('usuarios'));

    //Si no tengo usuarios en el LStorage, cargo el usuario ingresado.
    if (divUsuarios.children.length == 0) {
        //Por cada elemento del array de usuarios se inserta una Card.
        usuarioStorage?.forEach((usuarioArray, indice) => {
        divUsuarios.innerHTML += `
            <div class="card" id="usuario${indice}" style="width: 18rem; margin: 1rem;">
                <div class="card-body">
                    <h5 class="card-title">${usuarioArray.nombre} ${usuarioArray.apellido}</h5>
                    <p class="card-text">${usuarioArray.documento}</p>
                    <p class="card-text">${usuarioArray.email}</p>
                    <button id="boton${indice}" class="btn btn-danger">Eliminar</button>
                </div>
            </div>
            `
            
        });
        //Eliminar Usuario.
        usuarioStorage.forEach((usuarioArray, indice) => {
            document.getElementById(`boton${indice}`).addEventListener('click', () => {
                //Elimino del DOM.
                document.getElementById(`usuario${indice}`).remove();
                //Elimino del Array.
                usuarios.splice(indice,1);
                //Elimino del LStorage (Se actualiza con los nuevos valores).
                localStorage.setItem('usuarios',JSON.stringify(usuarios));
                usuarioEliminado.innerText =  `El usuario ${usuarioArray.nombre} ${usuarioArray.apellido} ha sido Eliminado`;
            })
        });
    } else {
        parrafoError.innerText = "Usuarios Mostrados";
    };
});



//Seccion Modelos de automoviles.

//Si hay Usuario registrado, mostrar los automoviles.
if (usuarios.length > 0) {
    
    //Peticiones Fetch para traer los vehiculos disponibles.
    fetch('/models.json')
    .then(response => response.json())
    .then(dataAuto => {
        dataAuto.forEach(auto => {
            let div =document.createElement('div')
            div.classList.add("col")
            //Agrego un div para mostrar cada cards con los diferentes vehiculos.
            div.innerHTML += `
            
            <div class="card" id="auto${auto.id}" style="margin: 1rem; padding: 2rem; width: 24rem;">
                <h3 id="autoCard" class="card-header">${auto.nombre}</h3>
                <div class="card-body">
                <h5 id="modelosCards"class="card-title">${auto.modelos}</h5>
                    <h5 class="card-subtitle text-muted"> Valor del uso diario del Automovil: ${auto.valor}</h5>
                </div>
                <img src="../assets/${auto.img}" class="card-img-top" style="height: 12rem" />
            <div class="card-body">
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's
                        content.</p>
            </div> 
                <button id ="botonReservar${auto.id}" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" style="margin: 1rem; padding: 1rem;">Reservar</button>       
            </div>
        `
            divAutos?.appendChild(div)
            
            document.getElementById(`botonReservar${auto.id}`)?.addEventListener('click', () => {
                //Agrego la Reserva al LocalStorage
                let nuevaReserva = new Reserva(auto.id, auto.nombre, auto.modelos, auto.valor)
                arrayReserva.push(nuevaReserva)
                localStorage.setItem('reserva', JSON.stringify(arrayReserva));  

            })

        });
        
    });


} else {

    let divNoAuto =document.createElement('div')
        divNoAuto.innerHTML += `
            <p>No hay Usuario Registrado. Por favor registrese para que le mostremos los Automoviles disponibles</p>
        `
        divAutos?.appendChild(divNoAuto)

    let footerCar = document.getElementById('footerCar')
        footerCar?.classList.add('footerCar')
};


