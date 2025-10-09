import { API_CONFIG } from '../config/apiConfig';

// Simple API client wrapper around fetch to centralize headers, base URL and token handling
const BASE_URL = API_CONFIG?.BACKEND?.BASE_URL || '';

const TOKEN_KEY = 'coastAllyToken';

let token = null;
try {
  token = localStorage.getItem(TOKEN_KEY) || null;
} catch (e) {
  // ignore storage errors in some environments
}

const setToken = (t) => {
  token = t;
  try {
    if (t) localStorage.setItem(TOKEN_KEY, t);
    else localStorage.removeItem(TOKEN_KEY);
  } catch (e) {}
};

const clearToken = () => setToken(null);

const getAuthHeaders = () => {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
};

const decodeJwt = (jwt) => {
  try {
    const parts = jwt.split('.');
    if (parts.length !== 3) return null;
    const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    return payload;
  } catch (e) {
    return null;
  }
};

const isTokenExpired = (jwt) => {
  const payload = decodeJwt(jwt);
  if (!payload || !payload.exp) return false; // can't determine
  const now = Math.floor(Date.now() / 1000);
  return payload.exp <= now;
};

const request = async (path, { method = 'GET', body = null, headers = {}, requireAuth = false } = {}) => {
  const url = path.startsWith('http') ? path : `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

  const mergedHeaders = {
    'Content-Type': 'application/json',
    ...getAuthHeaders(),
    ...headers,
  };

  if (requireAuth && !token) {
    return Promise.reject({ message: 'No authentication token available' });
  }

  try {
    const res = await fetch(url, {
      method,
      headers: mergedHeaders,
      body: body ? JSON.stringify(body) : null,
    });

    const text = await res.text();
    let data = null;
    try {
      data = text ? JSON.parse(text) : null;
    } catch (e) {
      // not JSON
      data = text;
    }

    if (!res.ok) {
      // handle unauthorized centrally
      if (res.status === 401) clearToken();
      return Promise.reject(data || { message: res.statusText || 'Request failed' });
    }

    return data;
  } catch (err) {
    return Promise.reject({ message: err.message || 'Network error' });
  }
};

export default {
  request,
  setToken,
  clearToken,
  get token() {
    return token;
  },
  decodeJwt,
  isTokenExpired,
};
