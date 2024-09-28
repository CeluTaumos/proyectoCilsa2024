
// Espera a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Selecciona los enlaces dentro del menú de navegación
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    // Añade un evento de clic a cada enlace
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            // Colapsa el menú al hacer clic en un enlace
            if (window.innerWidth < 992) { // Verifica que estemos en mobile
                navbarCollapse.classList.remove('show');
            }
        });
    });
});

