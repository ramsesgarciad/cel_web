/**
 * API client for communicating with the FastAPI backend
 */

const API_URL = 'http://161.97.172.97:8000/api';

/**
 * Fetch wrapper with authentication and error handling
 */
export const fetchWithAuth = async (url, options = {}) => {
  try {
    console.log(`Haciendo petición autenticada a: ${url}`);
    
    // Obtener el token de autenticación
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    // En desarrollo, no mostrar advertencia si no hay token
    if (token) {
      console.log("Token encontrado, usando para autenticación");
    }
    
    // Preparar los headers con el token de autenticación
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Origin': typeof window !== 'undefined' ? window.location.origin : '',
      'Access-Control-Allow-Origin': '*',
      ...options.headers,
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Usar la URL de la API configurada
    const apiUrl = API_URL;
    const fullUrl = url.startsWith('http') ? url : `${apiUrl}${url}`;
    
    // Hacer la petición con fetch
    const response = await fetch(fullUrl, {
      ...options,
      headers,
      credentials: 'same-origin',
    });
    
    console.log(`Respuesta de ${url}: ${response.status} ${response.statusText}`);
    
    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      console.error(`Error en la respuesta: ${response.status} ${response.statusText}`);
      
      // Intentar obtener el texto del error
      let errorDetails = '';
      try {
        const errorText = await response.text();
        console.error(`Texto del error: ${errorText}`);
        errorDetails = errorText;
      } catch (textError) {
        console.error(`No se pudo obtener el texto del error: ${textError}`);
      }
      
      // Crear un error con información detallada
      const error = new Error(`Error ${response.status}: ${response.statusText}`);
      error.status = response.status;
      error.details = errorDetails;
      throw error;
    }
    
    // Verificar si la respuesta es JSON
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    // Si no es JSON, devolver el texto
    return await response.text();
  } catch (error) {
    console.error(`Error en fetchWithAuth para ${url}:`, error);
    throw error;
  }
};

/**
 * Set auth token in both localStorage and cookie
 */
function setAuthToken(token, userData) {
  // Store in localStorage for client-side access
  localStorage.setItem('authToken', token);
  localStorage.setItem('user', JSON.stringify(userData));
  
  // Store in cookie for middleware access
  // Set cookie to expire in 7 days, be accessible only via HTTP (not JS), and be valid for the entire site
  document.cookie = `authToken=${token}; path=/; max-age=604800; SameSite=Strict; HttpOnly`;
}

/**
 * Login function for regular users
 */
export async function login(email, password) {
  if (arguments.length > 2) {
    // Si se pasa un tercer argumento, asumimos que es isAdmin
    const isAdmin = arguments[2];
    if (isAdmin) {
      return adminLogin(email, password);
    }
  }
  
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Email and password must be strings');
  }
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  
  try {
    console.log(`Attempting regular login to ${API_URL}/auth/login with username: ${email}`);
    
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData,
    });
    
    console.log(`Login response status: ${response.status}`);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ detail: 'Unknown error' }));
      console.error('Login error data:', errorData);
      throw new Error(errorData.detail || `Login failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log('Login successful, received data:', data);
    
    // Store token and user data in both localStorage and cookie
    setAuthToken(data.access_token, data.user);
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
}

/**
 * Login function for admin users
 */
function adminLogin(email, password) {
  if (typeof email !== 'string' || typeof password !== 'string') {
    throw new Error('Email and password must be strings');
  }
  
  if (!email || !password) {
    throw new Error('Email and password are required');
  }
  
  const formData = new URLSearchParams();
  formData.append('username', email);
  formData.append('password', password);
  
  try {
    console.log(`Attempting admin login to ${API_URL}/auth/admin/login with username: ${email}`);
    
    return fetch(`${API_URL}/auth/admin/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
      },
      body: formData,
    })
    .then(response => {
      console.log(`Admin login response status: ${response.status}`);
      
      if (!response.ok) {
        return response.json()
          .catch(() => ({ detail: 'Unknown error' }))
          .then(errorData => {
            console.error('Admin login error data:', errorData);
            throw new Error(errorData.detail || `Admin login failed with status: ${response.status}`);
          });
      }
      
      return response.json();
    })
    .then(data => {
      console.log('Admin login successful, received data:', data);
      
      // Store token and user data in both localStorage and cookie
      setAuthToken(data.access_token, data.user);
      
      return data;
    });
  } catch (error) {
    console.error('Admin login error:', error);
    throw error;
  }
}

/**
 * Authentication API
 */
export const authApi = {
  login,
  
  logout: () => {
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    
    // Clear cookie
    document.cookie = 'authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Strict; HttpOnly';
    
    // Redirect to login
    window.location.href = '/login';
  },
  
  getCurrentUser: async () => {
    return fetchWithAuth('/users/me');
  },
};

/**
 * Projects API
 */
export const projectsApi = {
  getAll: async () => {
    return fetchWithAuth('/projects');
  },
  
  getById: async (id) => {
    return fetchWithAuth(`/projects/${id}`);
  },
  
  create: async (projectData) => {
    return fetchWithAuth('/projects', {
      method: 'POST',
      body: JSON.stringify(projectData),
    });
  },
  
  update: async (id, projectData) => {
    return fetchWithAuth(`/projects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(projectData),
    });
  },
  
  delete: async (id) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };
      
      const url = `${API_URL}/projects/${id}`;
      console.log("URL para eliminar proyecto:", url);
      
      const response = await fetch(url, {
        method: 'DELETE',
        headers: headers,
        mode: 'cors',
        credentials: 'same-origin', // Cambiado de 'include' a 'same-origin'
      });
      
      console.log(`Respuesta al eliminar proyecto ${id}:`, response.status, response.statusText);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error al eliminar proyecto:", errorText);
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      return true;
    } catch (error) {
      console.error(`Error al eliminar proyecto ${id}:`, error);
      throw error;
    }
  },
  
  updateProgress: async (id, progress) => {
    return fetchWithAuth(`/projects/${id}/progress`, {
      method: 'PATCH',
      body: JSON.stringify({ progress }),
    });
  },
};

/**
 * Tasks API
 */
export const tasksApi = {
  getByProjectId: async (projectId) => {
    return fetchWithAuth(`/projects/${projectId}/tasks`);
  },
  
  create: async (projectId, taskData) => {
    return fetchWithAuth(`/projects/${projectId}/tasks`, {
      method: 'POST',
      body: JSON.stringify(taskData),
    });
  },
  
  update: async (projectId, taskId, taskData) => {
    return fetchWithAuth(`/projects/${projectId}/tasks/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify(taskData),
    });
  },
  
  delete: async (projectId, taskId) => {
    return fetchWithAuth(`/projects/${projectId}/tasks/${taskId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Updates API
 */
export const updatesApi = {
  getByProjectId: async (projectId) => {
    return fetchWithAuth(`/projects/${projectId}/updates`);
  },
  
  create: async (projectId, updateData) => {
    return fetchWithAuth(`/projects/${projectId}/updates`, {
      method: 'POST',
      body: JSON.stringify(updateData),
    });
  },
};

/**
 * Documents API
 */
export const documentsApi = {
  getByProjectId: async (projectId) => {
    return fetchWithAuth(`/projects/${projectId}/documents`);
  },
  
  upload: async (projectId, formData) => {
    return fetchWithAuth(`/projects/${projectId}/documents`, {
      method: 'POST',
      headers: {
        // Don't set Content-Type here, it will be set automatically with the boundary
      },
      body: formData,
    });
  },
  
  delete: async (projectId, documentId) => {
    return fetchWithAuth(`/projects/${projectId}/documents/${documentId}`, {
      method: 'DELETE',
    });
  },
};

/**
 * Models API
 */
export const modelsApi = {
  getAll: async () => {
    return fetchWithAuth('/models');
  },
  
  getById: async (id) => {
    return fetchWithAuth(`/models/${id}`);
  },
  
  upload: async (formData) => {
    return fetchWithAuth('/models', {
      method: 'POST',
      headers: {
        // Don't set Content-Type here, it will be set automatically with the boundary
      },
      body: formData,
    });
  },
  
  delete: async (id) => {
    return fetchWithAuth(`/models/${id}`, {
      method: 'DELETE',
    });
  },
  
  assignToProject: async (modelId, projectId) => {
    return fetchWithAuth(`/models/${modelId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ project_id: projectId }),
    });
  },
};

/**
 * Users API
 */
export const usersApi = {
  getAll: async () => {
    return fetchWithAuth('/users');
  },
  
  getById: async (id) => {
    return fetchWithAuth(`/users/${id}`);
  },
  
  create: async (userData) => {
    return fetchWithAuth('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  update: async (id, userData) => {
    return fetchWithAuth(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },
  
  delete: async (id) => {
    return fetchWithAuth(`/users/${id}`, {
      method: 'DELETE',
    });
  },
};

export const getProjects = async () => {
  try {
    console.log("Obteniendo proyectos directamente con fetch");
    
    // Obtener el token de autenticación
    const token = typeof localStorage !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    const url = `${API_URL}/projects`;
    console.log("URL completa:", url);
    
    // Preparar los headers con el token de autenticación
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };
    
    // Añadir el token de autenticación si existe
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log("Token añadido a los headers");
    } else {
      console.warn("No se encontró token de autenticación");
    }
    
    // Configuración simplificada para evitar problemas de CORS
    const response = await fetch(url, {
      method: 'GET',
      headers: headers,
    });
    
    console.log("Estado de la respuesta:", response.status, response.statusText);
    
    if (!response.ok) {
      console.error(`Error en la respuesta: ${response.status} ${response.statusText}`);
      const errorText = await response.text();
      console.error("Texto del error:", errorText);
      throw new Error(`Error ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    console.log("Datos de proyectos recibidos:", data);
    return data;
  } catch (error) {
    console.error("Error al obtener proyectos:", error);
    throw error;
  }
};

export const getProjectById = (id) => projectsApi.getById(id);
export const createProject = (projectData) => projectsApi.create(projectData);
export const updateProject = (id, projectData) => projectsApi.update(id, projectData);
export const deleteProject = (id) => projectsApi.delete(id);
export const updateProjectProgress = (id, progress) => projectsApi.updateProgress(id, progress);

export const getModels = () => modelsApi.getAll();
export const uploadModel = (formData) => modelsApi.upload(formData);
export const deleteModel = (id) => modelsApi.delete(id);
export const assignModelToProject = (modelId, projectId) => modelsApi.assignToProject(modelId, projectId);
export const getProject = (id) => projectsApi.getById(id);

export default {
  login,
  auth: authApi,
  projects: projectsApi,
  tasks: tasksApi,
  updates: updatesApi,
  documents: documentsApi,
  models: modelsApi,
  users: usersApi,
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  updateProjectProgress,
  getModels,
  uploadModel,
  deleteModel,
  assignModelToProject,
  getProject,
};
