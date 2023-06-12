
const valorTicket = 200;
// descuentos: sin categoria = 0; Estudiante = 80; Trainee = 50; Junior = 15
let descuentos = [0, 80, 50, 15]

// Elementos html
let nombre            = document.getElementById("nombre");
let apellido          = document.getElementById("apellido");
let mail              = document.getElementById("mail");
let ticketQty         = document.getElementById("cantidadTickets");
let categoria         = document.getElementById("categoriaSelect");

const resetCampos = () => {
    let listaNodos = document.querySelectorAll(".form-control, .form-select");
    for (let i = 0; i < listaNodos.length; i++) {
        listaNodos[i].classList.remove('is-invalid');
    }
}

// Cálculo total a pagar
const totalAPagar = () => {

    resetCampos();
    // En caso de que algun campo requerido no este lleno, se le aplica la clase is-invalid",
    // se coloca el foco en dicho campo y se devuelve el control al punto de la llamada

    for(elem of [nombre, apellido, mail]){
        if (elem.value === "") {
            totalPago.innerHTML = "";
            elem.classList.add("is-invalid");
            elem.focus();
            return;
        }
    }

    // Verificacion de E-mail
    const emailValido = mail => {return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail)}

    if (!emailValido(mail.value)) {
        totalPago.innerHTML = "";
        mail.classList.add("is-invalid");
        mail.focus();     
        return;
    }

    if ( (ticketQty.value < 1) || (isNaN(ticketQty.value)) ) {
        totalPago.innerHTML = "";
        ticketQty.classList.add("is-invalid");
        ticketQty.value = 1;
        ticketQty.focus();
        return;
    }
    // Luego de confirmar todos los campos se calcula el total asumiendo que todos los tikets son de la misma categoria :D
    ticketQty.value = parseInt(ticketQty.value); 
    let unityValue = valorTicket - (descuentos[categoria.value] / 100 *valorTicket );
    // Mostramos el total a pagar 
    totalPago.innerHTML = parseInt(ticketQty.value) * unityValue;
}

// Botón Resumen recibe un escuchador y la funcion del cálculo
btnResumen.addEventListener('click', totalAPagar);

// Función para el botón Borrar para que borre el valor
const limpiar = () => {
    resetCampos();
    totalPago.innerHTML = "";
}
btnBorrar.addEventListener('click', limpiar);