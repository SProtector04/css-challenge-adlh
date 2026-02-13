document.addEventListener('DOMContentLoaded', function() {
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