document.addEventListener('DOMContentLoaded', function() {
    const toggleButton = document.querySelector('.bg-info.rounded.border-0');
    const tableSection = document.querySelector('.card.table-responsive.rounded.border-0');
    
    // Configurar estilos iniciales para la transición
    tableSection.style.transition = 'opacity 0.4s ease, max-height 0.4s ease';
    tableSection.style.opacity = '1';
    tableSection.style.maxHeight = '2000px';
    
    let isVisible = true;
    
    toggleButton.addEventListener('click', function() {
        if (isVisible) {
            // Ocultar con transición
            tableSection.style.overflow = 'hidden';
            tableSection.style.opacity = '0';
            tableSection.style.maxHeight = '0';
            toggleButton.textContent = 'Ver vista Lista | Calendario (Mostrar)';
        } else {
            // Mostrar con transición
            tableSection.style.opacity = '1';
            tableSection.style.maxHeight = '2000px';
            toggleButton.textContent = 'Ver vista Lista | Calendario (Ocultar)';
            setTimeout(() => {
                if (isVisible) {
                    tableSection.style.overflow = 'visible';
                    tableSection.style.overflowX = 'auto';
                }
            }, 400);
        }
        isVisible = !isVisible;
    });
});
