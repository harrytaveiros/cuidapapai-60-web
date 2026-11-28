export const BASE_URL = 'https://cuidapapai50-production.up.railway.app/api/v1';

/**
 * Tarefa 1: Função auxiliar getHeaders() que adiciona o Authorization Bearer se houver token
 */
export function getHeaders(customHeaders = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...customHeaders,
  };

  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = 'Bearer ' + token;
  }

  return headers;
}

/**
 * Tarefa 1: Função login(email, password) via POST para BASE_URL + '/auth/login'
 */
export async function login(email, password) {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok || data.success === false) {
      const errorMessage =
        data.message ||
        data.error ||
        (res.status === 401
          ? 'E-mail ou senha incorretos.'
          : 'Erro ao realizar login. Verifique seus dados.');
      throw new Error(errorMessage);
    }

    if (data.token) {
      localStorage.setItem('token', data.token);
    }

    return data;
  } catch (error) {
    console.error('Erro na requisição de login:', error);
    throw error;
  }
}

/**
 * Tarefa 1: Função logout() que remove o token do localStorage
 */
export function logout() {
  localStorage.removeItem('token');
}

/**
 * Função utilitária para requisições usando getHeaders() e tratamento de 401
 */
async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: getHeaders(options.headers),
    });

    if (res.status === 401) {
      logout();
      const authError = new Error('Sessão expirada ou não autorizada (401)');
      authError.status = 401;
      throw authError;
    }

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      const message =
        errorData.message ||
        errorData.error ||
        `Erro ${res.status}: falha na requisição para ${endpoint}`;
      const err = new Error(message);
      err.status = res.status;
      throw err;
    }

    if (res.status === 204) {
      return null;
    }

    const text = await res.text();
    return text ? JSON.parse(text) : null;
  } catch (error) {
    console.error(`Erro ao consumir endpoint [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Obter dados do usuário autenticado
 */
export async function getUser() {
  return request('/users/me');
}

/**
 * Obter medicamentos programados para hoje
 */
export async function getMedications() {
  return request('/medications/today');
}

/**
 * Obter próximos compromissos da agenda
 */
export async function getAppointments() {
  return request('/appointments/upcoming');
}

/**
 * Criar um novo compromisso
 */
export async function createAppointment(appointmentData) {
  return request('/appointments', {
    method: 'POST',
    body: JSON.stringify(appointmentData),
  });
}

/**
 * Atualizar um compromisso existente (PUT)
 */
export async function updateAppointment(id, appointmentData) {
  return request(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(appointmentData),
  });
}

/**
 * Excluir um compromisso (DELETE)
 */
export async function deleteAppointment(id) {
  return request(`/appointments/${id}`, {
    method: 'DELETE',
  });
}

/**
 * Obter tarefas de cuidado diárias
 */
export async function getCareTasks() {
  return request('/care-tasks/today');
}

/**
 * Criar uma nova meta/tarefa de cuidado (POST)
 */
export async function createCareTask(taskData) {
  return request('/care-tasks', {
    method: 'POST',
    body: JSON.stringify(taskData),
  });
}

/**
 * Atualizar uma meta/tarefa de cuidado (PUT)
 */
export async function updateCareTask(id, taskData) {
  return request(`/care-tasks/${id}`, {
    method: 'PUT',
    body: JSON.stringify(taskData),
  });
}

/**
 * Excluir uma meta/tarefa de cuidado (DELETE)
 */
export async function deleteCareTask(id) {
  return request(`/care-tasks/${id}`, {
    method: 'DELETE',
  });
}
