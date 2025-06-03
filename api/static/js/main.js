// Funciones comunes para las plantillas de Caribbean Embedded Labs

// Función para manejar tokens de autenticación
const authManager = {
    getToken: function() {
        return localStorage.getItem('authToken');
    },
    setToken: function(token) {
        localStorage.setItem('authToken', token);
    },
    removeToken: function() {
        localStorage.removeItem('authToken');
    },
    isAuthenticated: function() {
        return !!this.getToken();
    }
};

// Función para realizar peticiones a la API con autenticación
async function fetchWithAuth(url, options = {}) {
    const token = authManager.getToken();
    
    // Si hay token y no se ha especificado Authorization en los headers
    if (token && (!options.headers || !options.headers.Authorization)) {
        options.headers = {
            ...options.headers,
            'Authorization': `Bearer ${token}`
        };
    }
    
    try {
        const response = await fetch(url, options);
        
        // Si la respuesta es 401 (no autorizado), redirigir al login
        if (response.status === 401) {
            authManager.removeToken();
            window.location.href = '/auth/login';
            return null;
        }
        
        return response;
    } catch (error) {
        console.error('Error en la petición:', error);
        throw error;
    }
}

// Función para mostrar notificaciones
function showNotification(message, type = 'info', duration = 3000) {
    // Crear el elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Añadir la notificación al DOM
    const container = document.querySelector('.notification-container') || document.body;
    container.appendChild(notification);
    
    // Mostrar la notificación con una animación
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Eliminar la notificación después del tiempo especificado
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Función para formatear fechas
function formatDate(dateString) {
    if (!dateString) return 'No definida';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
}

// Función para formatear porcentajes
function formatProgress(progress) {
    return `${Math.round(progress)}%`;
}

// Función para confirmar acciones
function confirmAction(message, callback) {
    if (confirm(message)) {
        callback();
    }
}

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar tooltips
    const tooltips = document.querySelectorAll('[data-tooltip]');
    tooltips.forEach(tooltip => {
        tooltip.addEventListener('mouseenter', function() {
            const tooltipText = this.getAttribute('data-tooltip');
            const tooltipEl = document.createElement('div');
            tooltipEl.className = 'tooltip';
            tooltipEl.textContent = tooltipText;
            document.body.appendChild(tooltipEl);
            
            const rect = this.getBoundingClientRect();
            tooltipEl.style.top = `${rect.top - tooltipEl.offsetHeight - 5}px`;
            tooltipEl.style.left = `${rect.left + (rect.width / 2) - (tooltipEl.offsetWidth / 2)}px`;
            tooltipEl.classList.add('show');
            
            this.addEventListener('mouseleave', function() {
                tooltipEl.remove();
            }, { once: true });
        });
    });
    
    // Inicializar dropdowns
    const dropdowns = document.querySelectorAll('.dropdown-toggle');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            const dropdownMenu = this.nextElementSibling;
            dropdownMenu.classList.toggle('show');
            
            // Cerrar dropdown al hacer clic fuera
            document.addEventListener('click', function closeDropdown(e) {
                if (!dropdown.contains(e.target)) {
                    dropdownMenu.classList.remove('show');
                    document.removeEventListener('click', closeDropdown);
                }
            });
        });
    });
});

// Exportar funciones para uso global
window.authManager = authManager;
window.fetchWithAuth = fetchWithAuth;
window.showNotification = showNotification;
window.formatDate = formatDate;
window.formatProgress = formatProgress;
window.confirmAction = confirmAction;
