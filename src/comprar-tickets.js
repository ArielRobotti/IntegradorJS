// Defino valor de ticket
const valorTicket = 200;

// Defino porcentajes de descuento según categoría
let descuentoEstudiante = 80;
let descuentoTrainee    = 50;
let descuentoJunior     = 15;

// Elementos en variables
let nombre            = document.getElementById("nombre");
let divErrorNombre    = document.getElementById("mensajeErrorNombre");
let apellido          = document.getElementById("apellido");
let divErrorApellido  = document.getElementById("mensajeErrorApellido");
let mail              = document.getElementById("mail");
let divErrorMail      = document.getElementById("mensajeErrorMail");
let cantidadTickets   = document.getElementById("cantidadTickets");
let mensajeErrorCantTickets  = document.getElementById("mensajeErrorCantTickets");
let categoria         = document.getElementById("categoriaSelect");
let mensajeErrorCategoria = document.getElementById("mensajeErrorCategoria");

// Función para quitar el estilo de error a los elementos del form
const quitarClaseError = () => {
//function quitarClaseError() {
    let listaNodos = document.querySelectorAll(".form-control, .form-select");
    for (let i = 0; i < listaNodos.length; i++) {
        listaNodos[i].classList.remove('is-invalid');
    }
    let listaNodosdiv = document.querySelectorAll(".invalid-feedback");
    for (let i = 0; i < listaNodosdiv.length; i++) {
        listaNodosdiv[i].classList.remove('propia');
    }
}

// Cálculo total a pagar
const totalAPagar = () => { 
//function total_a_pagar() {

    // Ejecuto función para que quite todos los estilos de error en los campos que los tuvieran
    quitarClaseError();

    // Verifico si lleno los siguientes campos, sino que aplique un estilo de error, haga foco en el campo y se detenga
    if (nombre.value === "") {
       // alert("Por favor, escribí tu nombre.");
        nombre.classList.add("is-invalid");
        divErrorNombre.classList.add("propia");/*lo que hace esta clase es poner un div en display:block, ya que tiene la clase class="invalid-feedback" */
        nombre.focus();
        return;
    }

    if (apellido.value === "" ) {
       // alert("Por favor, escribí tu apellido.");
        apellido.classList.add("is-invalid");
        divErrorApellido.classList.add("propia");
        apellido.focus();
        return;
    }

    if (mail.value === "") {
        //alert("Por favor, escribí tu email.");
        mail.classList.add("is-invalid");
        //console.log(divErrorMail);
        divErrorMail.classList.add("propia");
        mail.focus();
        return;
    }
   
    // Para determinar si el correo electrónico es válido o no
    const emailValido = mail => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(mail); // esto es expresiones regulares
    }

    if (!emailValido(mail.value)) {
    // alert("Por favor, escribí un correo electrónico válido.");
        mail.classList.add("is-invalid");
        divErrorMail.classList.add("propia");
        mail.focus();
        return;
    }

    // Verifico si está ingresado al menos 1 ticket, sino que aplique un estilo de error, haga foco en el campo y se detenga
    if ( (cantidadTickets.value == 0) || (isNaN(cantidadTickets.value)) ) {
        //alert("Por favor, ingresá correctamente cantidad de tickets.");
        cantidadTickets.classList.add("is-invalid");
        mensajeErrorCantTickets.classList.add("propia");
        cantidadTickets.focus();
        return;
    }

    // Verifico que haya seleccionado una categoría, sino que aplique un estilo de error, haga foco en el campo y se detenga
    if (categoria.value == "") {
        //alert("Por favor, seleccioná una categoría.");
        categoria.classList.add("is-invalid");
        mensajeErrorCategoria.classList.add("propia");
        categoria.focus();
        return;
    }

    // Multiplico cantidad de tickets por el valor
    let totalValorTickets = (cantidadTickets.value) * valorTicket;
    
    /* realizo un switch con categoria.value - Aplico descuentos según categoría */
    switch (categoria.value) {
        case "0":
            totalValorTickets = totalValorTickets ;
            break;
        case "1":
            totalValorTickets = totalValorTickets - (descuentoEstudiante / 100 * totalValorTickets);
            break;
        case "2":
            totalValorTickets = totalValorTickets - (descuentoTrainee / 100 * totalValorTickets);
            break;
        case "3":
            totalValorTickets = totalValorTickets - (descuentoJunior / 100 * totalValorTickets);
            break;
       
    }
    // Inserto el valor en el HTML
    totalPago.innerHTML = totalValorTickets;
}

// Botón Resumen recibe un escuchador y la funcion del cálculo
btnResumen.addEventListener('click', totalAPagar);

// Función para el botón Borrar para que borre el valor
const resetTotalAPagar = () => {
//function reset_total_a_pagar() {
    quitarClaseError();
    totalPago.innerHTML = "";
}
btnBorrar.addEventListener('click', resetTotalAPagar);