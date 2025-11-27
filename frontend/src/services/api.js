import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

// Auth API
export const authAPI = {
  register: (data) => axios.post(`${API_URL}/auth/register`, data),
  login: (data) => axios.post(`${API_URL}/auth/login`, data),
};

// Products API
export const productsAPI = {
  getAll: (params) => axios.get(`${API_URL}/products`, { params }),
  getOne: (id) => axios.get(`${API_URL}/products/${id}`),
};

// Cart API
export const cartAPI = {
  getCart: (sessionId, token) => {
    const headers = {};
    if (sessionId) headers['x-session-id'] = sessionId;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return axios.get(`${API_URL}/cart`, { headers });
  },
  addItem: (data, sessionId, token) => {
    const headers = {};
    if (sessionId) headers['x-session-id'] = sessionId;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return axios.post(`${API_URL}/cart`, data, { headers });
  },
  updateItem: (itemId, data, sessionId, token) => {
    const headers = {};
    if (sessionId) headers['x-session-id'] = sessionId;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return axios.put(`${API_URL}/cart/${itemId}`, data, { headers });
  },
  removeItem: (itemId, sessionId, token) => {
    const headers = {};
    if (sessionId) headers['x-session-id'] = sessionId;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return axios.delete(`${API_URL}/cart/${itemId}`, { headers });
  },
  clearCart: (sessionId, token) => {
    const headers = {};
    if (sessionId) headers['x-session-id'] = sessionId;
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return axios.delete(`${API_URL}/cart`, { headers });
  },
};

// Orders API
export const ordersAPI = {
  create: (data, token) =>
    axios.post(`${API_URL}/orders`, data, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getAll: (token) =>
    axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
  getOne: (id, token) =>
    axios.get(`${API_URL}/orders/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    }),
};
