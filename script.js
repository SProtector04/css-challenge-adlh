// Control del contenido de las tablas
const clasesDocente = [
    { cod: "0413", nombre: "Programación Web", grupo: "1", color: "dark", dia: "Martes", hora: "10:00 - 11:40", aula_badge: "primary", aula: "E201" },
    { cod: "0413", nombre: "Programación Web", grupo: "1", color: "dark", dia: "Jueves", hora: "15:00 - 16:40", aula_badge: "primary", aula: "E201" },
    { cod: "0402", nombre: "Introducción a la Ingeniería", grupo: "3", color: "danger", dia: "Lunes", hora: "8:00 - 9:40", aula_badge: "success", aula: "D104" },
    { cod: "0402", nombre: "Introducción a la Ingeniería", grupo: "3", color: "danger", dia: "Miércoles", hora: "8:00 - 9:40", aula_badge: "success", aula: "D104" },
    { cod: "0402", nombre: "Introducción a la Ingeniería", grupo: "4", color: "warning", dia: "Lunes", hora: "10:00 - 11:40", aula_badge: "primary", aula: "E201" },
    { cod: "0402", nombre: "Introducción a la Ingeniería", grupo: "4", color: "warning", dia: "Jueves", hora: "8:00 - 9:40", aula_badge: "primary", aula: "E201" },
    { cod: "0402", nombre: "Introducción a la Ingeniería", grupo: "7", color: "secondary", dia: "Lunes", hora: "15:00 - 16:40", aula_badge: "success", aula: "D104" },
    { cod: "0402", nombre: "Introducción a la Ingeniería", grupo: "7", color: "secondary", dia: "Jueves", hora: "13:00 - 14:40", aula_badge: "success", aula: "D104" },
    { cod: "0402", nombre: "Introducción a la Ingeniería", grupo: "8", color: "info", dia: "Martes", hora: "15:00 - 16:40", aula_badge: "success", aula: "D104" },
    { cod: "0402", nombre: "Introducción a la Ingeniería", grupo: "8", color: "info", dia: "Miércoles", hora: "13:00 - 14:40", aula_badge: "success", aula: "D104" },
];

// Función para cargar los horarios en ambas vistas
function cargarHorarios() {
    const listBody = document.querySelector('#list_view tbody');
    const calendarBody = document.getElementById('calendar-body');
    const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];

    listBody.innerHTML = '';
    
    //Estructura del Calendario con IDs únicos por bloque
    calendarBody.innerHTML = `
        <tr id="row-morning_1">
            <td class="bg-light text-muted small font-weight-bold">08:00 AM a 9:40 AM</td>
            ${dias.map(d => `<td id="cell-8am-${d}" class="p-2 bg-white" style="vertical-align: top; height: 120px;"></td>`).join('')}
        </tr>
        <tr id="row-morning_2">
            <td class="bg-light text-muted small font-weight-bold">10:00 AM a 11:40 AM</td>
            ${dias.map(d => `<td id="cell-10am-${d}" class="p-2 bg-white" style="vertical-align: top; height: 120px;"></td>`).join('')}
        </tr>
        <tr class="bg-secondary text-white font-italic text-center">
            <td colspan="6" class="py-1">Almuerzo</td>
        </tr>
        <tr id="row-afternoon_1">
            <td class="bg-light text-muted small font-weight-bold">01:00 PM a 2:40 AM</td>
            ${dias.map(d => `<td id="cell-1pm-${d}" class="p-2 bg-white" style="vertical-align: top; height: 120px;"></td>`).join('')}
        </tr>
        <tr id="row-afternoon_2">
            <td class="bg-light text-muted small font-weight-bold">03:00 PM a 4:40 AM</td>
            ${dias.map(d => `<td id="cell-3pm-${d}" class="p-2 bg-white" style="vertical-align: top; height: 120px;"></td>`).join('')}
        </tr>
    `;

    // Lógica de Vista Lista
    clasesDocente.forEach(clase => {
        listBody.innerHTML += `
            <tr>
                <th scope="row">${clase.cod}</th>
                <td>${clase.nombre}</td>
                <td><span class="badge bg-${clase.color} text-white">Grupo ${clase.grupo}</span></td>
                <td>${clase.dia}</td>
                <td>${clase.hora}</td>
                <td><span class="badge bg-${clase.aula_badge} text-white">${clase.aula}</span></td>
            </tr>`;

        //Lógica de Vista Calendario
        const horaTexto = clase.hora.split(':')[0];
        const horaInicio = parseInt(horaTexto);
        
        let bloque = "";
        // Mapeo de hora de inicio al ID de la celda
        if (horaInicio === 8) bloque = "8am";
        else if (horaInicio === 10) bloque = "10am";
        else if (horaInicio === 13 || (horaInicio === 1 && clase.hora.includes("15:00") == false)) bloque = "1pm";
        else if (horaInicio === 15 || horaInicio === 3) bloque = "3pm";

        const celdaDestino = document.getElementById(`cell-${bloque}-${clase.dia}`);

        if (celdaDestino) {
            const card = document.createElement('div');
            card.className = `card bg-${clase.color} text-white mb-1 shadow-sm border-0 w-100`;
            card.style.cursor = 'pointer';
            card.style.fontSize = '0.75rem';
            card.style.minHeight = '75px';;
            card.innerHTML = `
                <article class="card-body p-2 d-flex flex-column justify-content-center align-items-center text-center" style="min-height: inherit;">
                    <header class="d-flex justify-content-center align-items-center">
                        <strong style="line-height: 1.2;">${clase.nombre}</strong>
                    </header>
                    <section class="extra-info d-none mt-2 border-top border-light pt-2 w-100">
                        <span>G${clase.grupo}</span> | <span class="badge badge-light text-${clase.color}">${clase.aula}</span>
                    </section>
                </article>
            `;

            card.addEventListener('click', function(e) {
                e.stopPropagation();
                const info = this.querySelector('.extra-info');
                info.classList.toggle('d-none');
            });

            celdaDestino.appendChild(card);
        }
    });
}

// Dinamismo para alternar entre vista de lista y calendario
document.addEventListener('DOMContentLoaded', function() {
    cargarHorarios();
    const toggleButton = document.querySelector('.bg-info.rounded.border-0');
    const listView = document.getElementById('list_view');
    const calendarView = document.getElementById('calendar_view');
    
    const transitionStyle = 'opacity 0.4s ease, max-height 0.4s ease';
    
    // Función para resetear estados
    const setElementVisible = (el, isVisible) => {
        if (isVisible) {
            el.style.display = 'block';
            el.style.opacity = '1';
            el.style.maxHeight = '2000px';
            el.style.width = '100%'; 
            el.style.overflowX = 'auto'; // Permitir scroll horizontal siempre
            el.style.overflowY = 'hidden'; // Evitar scroll vertical durante transición
        } else {
            el.style.opacity = '0';
            el.style.maxHeight = '0';
            el.style.overflow = 'hidden';
        }
    };

    // Configuración inicial
    listView.style.transition = transitionStyle;
    calendarView.style.transition = transitionStyle;
    setElementVisible(listView, true);
    setElementVisible(calendarView, false);
    
    let showingList = true;
    
    toggleButton.addEventListener('click', function() {
        if (showingList) {
            setElementVisible(listView, false);
            setElementVisible(calendarView, true);
            toggleButton.textContent = 'Ver vista Lista | Calendario';
        } else {
            setElementVisible(calendarView, false);
            setElementVisible(listView, true);
            toggleButton.textContent = 'Ver vista Lista | Calendario';
        }
        showingList = !showingList;
    });
});