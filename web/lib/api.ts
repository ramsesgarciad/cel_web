// Configuración base para las llamadas a la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://161.97.172.97:8000/api"

// Función para obtener el token de autenticación del almacenamiento local
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken")
  }
  return null
}

// Función para realizar solicitudes a la API
export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const token = getAuthToken()

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  })

  // Si la respuesta no es exitosa, lanzar un error
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || "Error en la solicitud a la API")
  }

  // Si la respuesta es 204 No Content, devolver null
  if (response.status === 204) {
    return null
  }

  // Devolver los datos de la respuesta
  return response.json()
}

// Función para iniciar sesión
export async function login(email: string, password: string, isAdmin = false) {
  const formData = new FormData();
  formData.append('username', email); // El backend espera 'username' para el email
  formData.append('password', password);
  
  const endpoint = isAdmin ? "/api/auth/admin/login" : "/api/auth/login";
  
  // Bypass fetchApi para este caso especial ya que necesitamos enviar form-data
  const response = await fetch(`${API_URL}${endpoint}`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Error en el inicio de sesión");
  }

  const data = await response.json();
  
  // Guardar el token y los datos del usuario en el almacenamiento local
  if (typeof window !== "undefined" && data.access_token) {
    localStorage.setItem("authToken", data.access_token);
    localStorage.setItem("user", JSON.stringify(data.user));
  }
  
  return data;
}

// Función para cerrar sesión
export async function logout() {
  localStorage.removeItem("authToken")
  localStorage.removeItem("user")
}

// Función para obtener el perfil del usuario actual
export async function getCurrentUser() {
  return fetchApi("/users/me")
}

// Funciones para proyectos
export async function getProjects() {
  return fetchApi("/projects")
}

export async function getProject(id: string) {
  return fetchApi(`/projects/${id}`)
}

export async function createProject(projectData: any) {
  return fetchApi("/projects", {
    method: "POST",
    body: JSON.stringify(projectData),
  })
}

export async function updateProject(id: string, projectData: any) {
  // Depuración: imprimir la petición antes de enviarla
  console.log('[API] updateProject:', {
    endpoint: `/projects/${id}`,
    method: 'PUT',
    body: projectData
  });
  return fetchApi(`/projects/${id}`, {
    method: "PUT",
    body: JSON.stringify(projectData),
  })
}

export async function deleteProject(id: string) {
  return fetchApi(`/projects/${id}`, {
    method: "DELETE",
  })
}

export async function updateProjectProgress(id: string, progress: number) {
  return fetchApi(`/projects/${id}/progress`, {
    method: "PATCH",
    body: JSON.stringify({ progress }),
  })
}

// Funciones para tareas
export async function getProjectTasks(projectId: string) {
  return fetchApi(`/projects/${projectId}/tasks`)
}

export async function createTask(projectId: string, taskData: any) {
  return fetchApi(`/projects/${projectId}/tasks`, {
    method: "POST",
    body: JSON.stringify(taskData),
  })
}

export async function updateTask(projectId: string, taskId: string, taskData: any) {
  return fetchApi(`/projects/${projectId}/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  })
}

export async function deleteTask(projectId: string, taskId: string) {
  return fetchApi(`/projects/${projectId}/tasks/${taskId}`, {
    method: "DELETE",
  })
}

// Funciones para actualizaciones
export async function getProjectUpdates(projectId: string) {
  return fetchApi(`/projects/${projectId}/updates`)
}

export async function createUpdate(projectId: string, updateData: any) {
  return fetchApi(`/projects/${projectId}/updates`, {
    method: "POST",
    body: JSON.stringify(updateData),
  })
}

// Funciones para documentos
export async function getProjectDocuments(projectId: string) {
  return fetchApi(`/projects/${projectId}/documents`)
}

export async function uploadDocument(projectId: string, formData: FormData) {
  return fetch(`${API_URL}/projects/${projectId}/documents`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error al subir el documento")
    }
    return response.json()
  })
}

export async function deleteDocument(projectId: string, documentId: string) {
  return fetchApi(`/projects/${projectId}/documents/${documentId}`, {
    method: "DELETE",
  })
}

// Funciones para usuarios
export async function getUsers() {
  return fetchApi("/users")
}

export async function getUser(id: string) {
  return fetchApi(`/users/${id}`)
}

export async function createUser(userData: any) {
  return fetchApi("/users", {
    method: "POST",
    body: JSON.stringify(userData),
  })
}

export async function updateUser(id: string, userData: any) {
  return fetchApi(`/users/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  })
}

export async function deleteUser(id: string) {
  return fetchApi(`/users/${id}`, {
    method: "DELETE",
  })
}

// Funciones para modelos 3D
export async function getModels() {
  return fetchApi("/models")
}

export async function getModel(id: string) {
  return fetchApi(`/models/${id}`)
}

export async function uploadModel(formData: FormData) {
  return fetch(`${API_URL}/models`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: formData,
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Error al subir el modelo")
    }
    return response.json()
  })
}

export async function deleteModel(id: string) {
  return fetchApi(`/models/${id}`, {
    method: "DELETE",
  })
}

export async function assignModelToProject(modelId: string, projectId: string) {
  return fetchApi(`/models/${modelId}/assign`, {
    method: "POST",
    body: JSON.stringify({ project_id: projectId }),
  })
}

