const maxCapacity = 50;
let reservations = {
    "2024-09-26": 30 // Ejemplo de reservas existentes.
};

// Función para ajustar el número de comensales
function changeGuests(amount) {
    const guestInput = document.getElementById('cantidadComensales'); // Cambiado a 'cantidadComensales'
    let guests = parseInt(guestInput.value);
    guests = Math.max(1, guests + amount); // Asegurarse de que el valor mínimo sea 1
    guestInput.value = guests;
}

// Función para realizar la reserva
function makeReservation() {
    const date = document.getElementById('fecha').value;
    const guests = parseInt(document.getElementById('cantidadComensales').value);
    const time = document.getElementById('hora').value;
    const endTime = document.getElementById('horaSalida').value;

    // Validar que la hora de salida sea posterior a la hora de ingreso
    if (endTime <= time) {
        alert('La hora de salida debe ser posterior a la hora de ingreso.');
        return;
    }

    if (!date) {
        alert('Por favor selecciona una fecha.');
        return;
    }

    const reserved = reservations[date] || 0;
    const availableCapacity = maxCapacity - reserved;

    if (availableCapacity <= 0) {
        alert('Lo sentimos, no hay disponibilidad para esa fecha.');
        return;
    }

    if (guests > availableCapacity) {
        mostrarModalError(availableCapacity, guests - availableCapacity);
        return;
    }

    reservations[date] = reserved + guests;
    alert(`Reserva confirmada para ${guests} personas el ${date} de ${time} a ${endTime}.`);

    const mensajeReserva = document.getElementById('mensajeReserva');
    mensajeReserva.innerHTML = `
        <h3>Reserva confirmada</h3>
        <p>A nombre de: ${document.getElementById('nombre').value}</p>
        <p>Número de comensales: ${guests}</p>
        <p>Fecha: ${date}</p>
        <p>Hora de ingreso: ${time}</p>
        <p>Hora de salida: ${endTime}</p>
    `;
    mensajeReserva.style.display = "block";
}

// Función para mostrar el modal de error cuando no hay suficiente disponibilidad
function mostrarModalError(disponible, sobrante) {
    var modal = document.getElementById("modalError");
    var disponibilidad = document.getElementById("disponibilidad");
    var sobranteTexto = document.getElementById("sobrante");

    disponibilidad.textContent = disponible;
    sobranteTexto.textContent = sobrante;

    modal.style.display = "block";
}

// Función para cerrar el modal de error
var closeModal = document.getElementsByClassName("close")[0];
closeModal.onclick = function() {
    document.getElementById("modalError").style.display = "none";
}

// Cerrar el modal si se hace clic fuera de él
window.onclick = function(event) {
    var modal = document.getElementById("modalError");
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Función para confirmar la reserva
function confirmarReserva() {
    var nombre = document.getElementById("nombre").value;
    var comensales = parseInt(document.getElementById("cantidadComensales").value);
    var fecha = document.getElementById("fecha").value;
    var hora = document.getElementById("hora").value;
    var horaSalida = document.getElementById("horaSalida").value;

    var capacidadMaxima = maxCapacity;
    var comensalesReservados = reservations[fecha] || 0;

    var mensajeReserva = document.getElementById("mensajeReserva");

    if (comensalesReservados + comensales > capacidadMaxima) {
        var sobrepaso = (comensalesReservados + comensales) - capacidadMaxima;
        mostrarModalError(capacidadMaxima - comensalesReservados, sobrepaso);
    } else {
        reservations[fecha] = comensalesReservados + comensales;
        mensajeReserva.innerHTML = `¡Reserva confirmada a nombre de ${nombre} para ${comensales} personas el día ${fecha} de ${hora} a ${horaSalida}. Por correo se enviarán los detalles!`;
        mensajeReserva.classList.add("mensaje-exito");
        mensajeReserva.classList.remove("mensaje-error");
        mensajeReserva.style.display = "block";
    }
}

// Mostrar y ocultar las notificaciones
function toggleNotifications() {
    const dropdown = document.getElementById("notificationDropdown");
    if (dropdown.style.display === "block") {
        dropdown.style.display = "none";
    } else {
        dropdown.style.display = "block";
    }
}

// Cambiar cantidad de comensales
function changeGuests(delta) {
    const guestInput = document.getElementById("cantidadComensales");
    let guests = parseInt(guestInput.value);
    if (guests + delta >= 1 && guests + delta <= 10) {
        guestInput.value = guests + delta;
    }
}

// Confirmar reserva (puedes añadir lógica para procesar la reserva)
function confirmarReserva() {
    alert("Reserva confirmada!");
}

// Cerrar modal de error (si aplicas)
function cerrarModal() {
    document.getElementById("modalError").style.display = "none";
}