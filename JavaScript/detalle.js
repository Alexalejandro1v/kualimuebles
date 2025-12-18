// ============================================
// FUNCIONES PARA PÁGINA DE DETALLE DE PRODUCTO
// ============================================

/**
 * Cambiar imagen principal al hacer clic en miniatura
 * @param {string} src - URL de la imagen a mostrar
 */
function cambiarImagen(src) {
    const imagenPrincipal = document.getElementById('imagenPrincipal');
    
    if (!imagenPrincipal) return;
    
    // Añadir efecto de transición fade
    imagenPrincipal.style.opacity = '0';
    
    setTimeout(() => {
        imagenPrincipal.src = src;
        imagenPrincipal.style.opacity = '1';
    }, 150);
}

/**
 * Incrementar cantidad de productos
 */
function incrementarCantidad() {
    const input = document.getElementById('cantidad');
    
    if (!input) return;
    
    const max = parseInt(input.max);
    const actual = parseInt(input.value);
    
    if (actual < max) {
        input.value = actual + 1;
    }
}

/**
 * Decrementar cantidad de productos
 */
function decrementarCantidad() {
    const input = document.getElementById('cantidad');
    
    if (!input) return;
    
    const min = parseInt(input.min);
    const actual = parseInt(input.value);
    
    if (actual > min) {
        input.value = actual - 1;
    }
}

/**
 * Toggle del formulario de crédito
 * Muestra u oculta el formulario de solicitud de crédito
 */
function toggleFormulario() {
    const formulario = document.getElementById('formularioCredito');
    const boton = document.querySelector('.btn-toggle-form');
    
    if (!formulario || !boton) return;
    
    if (formulario.style.display === 'none' || formulario.style.display === '') {
        formulario.style.display = 'block';
        boton.textContent = 'Cerrar formulario de crédito';
        
        // Scroll suave hacia el formulario
        setTimeout(() => {
            formulario.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    } else {
        formulario.style.display = 'none';
        boton.textContent = 'Abrir formulario de crédito';
    }
}

/**
 * Enviar solicitud de crédito por WhatsApp
 * @param {Event} event - Evento del formulario
 */
function enviarSolicitud(event) {
    event.preventDefault();
    
    // Obtener valores del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensaje = document.getElementById('mensaje').value.trim();
    
    // Validación básica
    if (!nombre || !telefono || !email) {
        alert('Por favor, completa todos los campos obligatorios.');
        return;
    }
    
    // Obtener información del producto
    const productoTituloElement = document.querySelector('.producto-titulo');
    const productoSKUElement = document.querySelector('.producto-sku');
    
    const productoTitulo = productoTituloElement ? productoTituloElement.textContent : 'Producto';
    const productoSKU = productoSKUElement ? productoSKUElement.textContent : '';
    
    // Obtener cantidad seleccionada
    const cantidadElement = document.getElementById('cantidad');
    const cantidad = cantidadElement ? cantidadElement.value : '1';
    
    // Crear mensaje para WhatsApp
    const mensajeWhatsApp = `Hola, solicito información sobre crédito para:

📦 Producto: ${productoTitulo}
🔖 ${productoSKU}
📊 Cantidad: ${cantidad}

👤 Mis datos:
• Nombre: ${nombre}
• Teléfono: ${telefono}
• Email: ${email}${mensaje ? '\n• Mensaje: ' + mensaje : ''}

Gracias.`;
    
    // Codificar el mensaje para URL
    const mensajeCodificado = encodeURIComponent(mensajeWhatsApp);
    
    // Número de WhatsApp (reemplazar con el número real)
    const numeroWhatsApp = '5215564367354';
    
    // Abrir WhatsApp con el mensaje
    window.open(`https://wa.me/${numeroWhatsApp}?text=${mensajeCodificado}`, '_blank');
    
    // Limpiar formulario
    document.getElementById('nombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('mensaje').value = '';
    
    // Cerrar formulario después de enviar
    setTimeout(() => {
        toggleFormulario();
    }, 500);
    
    // Mostrar mensaje de confirmación
    alert('¡Solicitud enviada! Nos pondremos en contacto contigo pronto.');
}

// ============================================
// INICIALIZACIÓN Y EFECTOS VISUALES
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Agregar transición suave a la imagen principal
    const imagenPrincipal = document.getElementById('imagenPrincipal');
    if (imagenPrincipal) {
        imagenPrincipal.style.transition = 'opacity 0.3s ease';
    }
    
    // Prevenir valores no válidos en el input de cantidad
    const inputCantidad = document.getElementById('cantidad');
    if (inputCantidad) {
        inputCantidad.addEventListener('input', function() {
            const min = parseInt(this.min);
            const max = parseInt(this.max);
            let valor = parseInt(this.value);
            
            // Validación de rango
            if (isNaN(valor) || valor < min) {
                this.value = min;
            } else if (valor > max) {
                this.value = max;
            }
        });
        
        // Prevenir entrada de caracteres no numéricos
        inputCantidad.addEventListener('keypress', function(e) {
            if (e.key && !/[0-9]/.test(e.key)) {
                e.preventDefault();
            }
        });
    }
    
    // Agregar efecto a las miniaturas
    const miniaturas = document.querySelectorAll('.imagenes-miniatura img');
    miniaturas.forEach(miniatura => {
        miniatura.addEventListener('click', function() {
            // Remover clase active de todas las miniaturas
            miniaturas.forEach(m => m.classList.remove('active-thumbnail'));
            // Agregar clase active a la miniatura clickeada
            this.classList.add('active-thumbnail');
        });
    });
    
    // Marcar la primera miniatura como activa por defecto
    if (miniaturas.length > 0) {
        miniaturas[0].classList.add('active-thumbnail');
    }
    
    // Validación del formulario en tiempo real
    const formInputs = document.querySelectorAll('.formulario-credito input, .formulario-credito textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#e74c3c';
            } else {
                this.style.borderColor = '#ecf0f1';
            }
        });
        
        input.addEventListener('input', function() {
            if (this.style.borderColor === 'rgb(231, 76, 60)') {
                this.style.borderColor = '#ecf0f1';
            }
        });
    });
    
    // Animación de entrada para elementos
    const detalleContent = document.querySelector('.detalle-content');
    if (detalleContent) {
        detalleContent.style.opacity = '0';
        detalleContent.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            detalleContent.style.transition = 'all 0.5s ease';
            detalleContent.style.opacity = '1';
            detalleContent.style.transform = 'translateY(0)';
        }, 100);
    }
});

// ============================================
// FIN DEL SCRIPT
// ============================================