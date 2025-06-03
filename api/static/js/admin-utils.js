/**
 * Utilidades comunes para el panel de administración
 */

// Función para realizar peticiones autenticadas
async function fetchWithAuth(path, options = {}) { // Cambiado 'url' a 'path' para claridad
    // Usar el subdominio API específico configurado en Nginx
    const apiBaseUrl = 'https://api.caribbeanembeddedlabs.com';
    
    let requestUrl;

    // Si 'path' ya es una URL completa, usarla directamente
    if (path.startsWith('http')) {
        requestUrl = path;
    } else {
        // Asegurarse de que el 'path' comience con '/'
        const cleanPath = path.startsWith('/') ? path : `/${path}`;
        // Añadir el prefijo /api si no está presente ya que la configuración del router lo requiere
        const apiPath = cleanPath.startsWith('/api/') ? cleanPath : `/api${cleanPath}`;
        requestUrl = `${apiBaseUrl}${apiPath}`;
        console.log(`URL construida: ${requestUrl}`);
    }

    console.log('Realizando petición a:', requestUrl);

    const fetchOptions = {
        ...options,
        credentials: 'include', // Importante para enviar cookies y que funcione con CORS
    };
    
    if (!fetchOptions.headers) {
        fetchOptions.headers = {};
    }
    
    // Content-Type se establece si no es GET y no está ya presente
    if (options.method && options.method.toUpperCase() !== 'GET' && !fetchOptions.headers['Content-Type']) {
        fetchOptions.headers['Content-Type'] = 'application/json';
    }
    
    // No intentamos acceder a la cookie httpOnly directamente
    // La cookie se enviará automáticamente con credentials: 'include'
    console.log('Enviando solicitud con credenciales incluidas');

    try {
        const response = await fetch(requestUrl, fetchOptions);
        
        console.log(`Respuesta de ${requestUrl}:`, response.status, response.statusText);
        
        if (response.status === 401) {
            console.warn('Error de autenticación 401. La sesión puede haber expirado o las credenciales son inválidas.');
            if (typeof showNotification === 'function') {
                showNotification('Sesión expirada o no autorizado. Redirigiendo al login...', 'warning');
            }
            setTimeout(() => {
                // Asegurarse de que la redirección al login sea a la URL correcta del frontend
                window.location.href = `${window.location.origin}/auth/login`; 
            }, 1500);
            // Devolver la respuesta original para que el llamador pueda inspeccionarla si es necesario,
            // aunque la redirección ocurrirá.
            return response; 
        }
        
        return response;
    } catch (error) {
        console.error('Error en fetchWithAuth:', error);
        if (typeof showNotification === 'function') {
            showNotification('Error de red o al contactar el servidor.', 'error');
        }
        throw error; // Re-lanzar el error para que el llamador pueda manejarlo si es necesario
    }
}

// Función para obtener el valor de una cookie por su nombre
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        const cookieValue = parts.pop().split(';').shift();
        console.log(`Cookie ${name} encontrada:`, cookieValue.substring(0, 10) + '...');
        return cookieValue;
    }
    return null;
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info', duration = 3000) {
    // Crear el elemento de notificación
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        type === 'warning' ? 'bg-yellow-500' : 
        'bg-blue-500'
    } text-white`;
    
    // Agregar icono según el tipo
    const icon = document.createElement('i');
    icon.className = `fas ${
        type === 'success' ? 'fa-check-circle' : 
        type === 'error' ? 'fa-exclamation-circle' : 
        type === 'warning' ? 'fa-exclamation-triangle' : 
        'fa-info-circle'
    } mr-2`;
    
    // Crear el contenido de la notificación
    const content = document.createElement('span');
    content.textContent = message;
    
    // Agregar icono y contenido a la notificación
    notification.appendChild(icon);
    notification.appendChild(content);
    
    // Agregar la notificación al DOM
    document.body.appendChild(notification);
    
    // Eliminar la notificación después de la duración especificada
    setTimeout(() => {
        notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, duration);
}

// Función para formatear fechas en formato español
function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    
    // Verificar que la fecha sea válida
    if (isNaN(date.getTime())) {
        console.error('Fecha inválida:', dateString);
        return 'Fecha inválida';
    }
    
    // Formatear como DD/MM/YYYY
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    
    return `${day}/${month}/${year}`;
}

// Función para validar formularios
function validateForm(formElement, rules = {}) {
    const formData = new FormData(formElement);
    const errors = {};
    
    for (const [field, value] of formData.entries()) {
        if (rules[field]) {
            // Requerido
            if (rules[field].required && !value) {
                errors[field] = `El campo ${field} es obligatorio`;
            }
            
            // Email
            if (rules[field].email && value && !validateEmail(value)) {
                errors[field] = `El campo ${field} debe ser un email válido`;
            }
            
            // Mínimo
            if (rules[field].min && value.length < rules[field].min) {
                errors[field] = `El campo ${field} debe tener al menos ${rules[field].min} caracteres`;
            }
            
            // Máximo
            if (rules[field].max && value.length > rules[field].max) {
                errors[field] = `El campo ${field} debe tener como máximo ${rules[field].max} caracteres`;
            }
        }
    }
    
    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
}

// Función auxiliar para validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Exportar las funciones para que estén disponibles globalmente
window.fetchWithAuth = fetchWithAuth;
window.showNotification = showNotification;
window.formatDate = formatDate;
window.validateForm = validateForm;
