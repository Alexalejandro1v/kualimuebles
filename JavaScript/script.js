// ============================================
// SCRIPT PRINCIPAL - MUEBLERÍA KUALI
// ============================================

// ============================================
// MENÚ DESPLEGABLE
// ============================================

/**
 * Función para abrir/cerrar el menú desplegable
 * Al hacer clic en el botón "Menú", alterna la clase 'active'
 */
function toggleMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.toggle('active');
}

/**
 * Función para cerrar el menú
 * Se ejecuta cuando el usuario hace clic en una opción del menú
 */
function closeMenu() {
    const nav = document.getElementById('mainNav');
    nav.classList.remove('active');
    
    // Cerrar todos los submenús
    const submenus = document.querySelectorAll('.submenu');
    const hasSubmenus = document.querySelectorAll('.has-submenu');
    
    submenus.forEach(submenu => {
        submenu.classList.remove('active');
    });
    
    hasSubmenus.forEach(item => {
        item.classList.remove('open');
    });
}

/**
 * Función para mostrar/ocultar submenús
 * @param {Event} event - Evento del clic
 * @param {string} submenuId - ID del submenú a mostrar/ocultar
 */
function toggleSubmenu(event, submenuId) {
    event.preventDefault();
    event.stopPropagation();
    
    const submenu = document.getElementById('submenu-' + submenuId);
    const parentLi = submenu.parentElement;
    
    // Cerrar otros submenús abiertos
    const allSubmenus = document.querySelectorAll('.submenu');
    const allParents = document.querySelectorAll('.has-submenu');
    
    allSubmenus.forEach(sm => {
        if (sm !== submenu) {
            sm.classList.remove('active');
        }
    });
    
    allParents.forEach(parent => {
        if (parent !== parentLi) {
            parent.classList.remove('open');
        }
    });
    
    // Alternar el submenú actual
    submenu.classList.toggle('active');
    parentLi.classList.toggle('open');
}

// ============================================
// CERRAR MENÚ AL HACER CLIC FUERA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Detectar clics en todo el documento
    document.addEventListener('click', function(event) {
        const nav = document.getElementById('mainNav');
        const menuBtn = document.querySelector('.menu-btn');
        
        // Verificar si el menú está abierto
        if (nav && nav.classList.contains('active')) {
            // Verificar si el clic fue fuera del menú y del botón
            const clickDentroMenu = nav.contains(event.target);
            const clickEnBoton = menuBtn.contains(event.target);
            
            if (!clickDentroMenu && !clickEnBoton) {
                closeMenu();
            }
        }
    });
    
    // Prevenir que los clics dentro del menú lo cierren
    const nav = document.getElementById('mainNav');
    if (nav) {
        nav.addEventListener('click', function(event) {
            // Solo permitir que se propague el evento si es un enlace sin submenú
            if (event.target.tagName === 'A' && !event.target.parentElement.classList.contains('has-submenu')) {
                // Permitir navegación
            } else {
                event.stopPropagation();
            }
        });
    }
});

// ============================================
// CARRUSEL AUTOMÁTICO DE IMÁGENES
// ============================================

// Variables del carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;

/**
 * Función para mostrar un slide específico
 * @param {number} index - Índice del slide a mostrar (0, 1, 2, 3)
 */
function showSlide(index) {
    // Remover clase 'active' de todos los slides e indicadores
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Agregar clase 'active' al slide e indicador correspondiente
    slides[index].classList.add('active');
    indicators[index].classList.add('active');
}

/**
 * Función para avanzar al siguiente slide
 * Incrementa el índice y vuelve a 0 cuando llega al final
 */
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

// ============================================
// INICIALIZACIÓN DEL CARRUSEL
// ============================================

// Cambiar slide automáticamente cada 3 segundos (3000 milisegundos)
if (slides.length > 0) {
    setInterval(nextSlide, 3000);
}

// ============================================
// NAVEGACIÓN MANUAL CON INDICADORES
// ============================================

/**
 * Agregar eventos de clic a cada indicador (círculos en la parte inferior)
 * Permite al usuario cambiar de slide manualmente
 */
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        currentSlide = index;
        showSlide(currentSlide);
    });
});

// ============================================
// SCROLL HORIZONTAL DEL MENÚ DE CATEGORÍAS
// ============================================

/**
 * Función para desplazar el menú de categorías
 * @param {string} direction - Dirección del desplazamiento ('left' o 'right')
 */
function scrollCategories(direction) {
    const container = document.getElementById('categoriesContainer');
    if (!container) return;
    
    const scrollAmount = 300; // Cantidad de píxeles a desplazar
    
    if (direction === 'left') {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    } else if (direction === 'right') {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }
}

// ============================================
// FIN DEL SCRIPT
// ============================================