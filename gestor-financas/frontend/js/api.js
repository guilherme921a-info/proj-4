const API_URL = 'http://localhost:3000/api';

function getToken() {
  return localStorage.getItem('token');
}

function getUsuario() {
  const usuario = localStorage.getItem('usuario');
  return usuario ? JSON.parse(usuario) : null;
}

function salvarSessao(resposta) {
  localStorage.setItem('token', resposta.token);
  localStorage.setItem('usuario', JSON.stringify(resposta.usuario));
}

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('usuario');
  window.location.href = 'login.html';
}

function protegerPagina() {
  if (!getToken()) {
    window.location.href = 'login.html';
  }
}

async function apiRequest(path, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.erro || 'Erro ao comunicar com a API');
  }

  return data;
}

function formatarMoeda(valor) {
  return Number(valor || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });
}

function mostrarMensagem(elemento, texto, tipo = 'success') {
  if (!elemento) return;
  elemento.textContent = texto;
  elemento.className = `message show ${tipo}`;
}
