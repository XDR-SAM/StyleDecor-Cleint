import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/api/auth/register', data),
  login: (data) => api.post('/api/auth/login', data),
  getMe: () => api.get('/api/auth/me'),
};

// Services APIs
export const servicesAPI = {
  getAll: (params) => api.get('/api/services', { params }),
  getById: (id) => api.get(`/api/services/${id}`),
  create: (data) => api.post('/api/services', data),
  update: (id, data) => api.put(`/api/services/${id}`, data),
  delete: (id) => api.delete(`/api/services/${id}`),
};

// Bookings APIs
export const bookingsAPI = {
  create: (data) => api.post('/api/bookings', data),
  getMyBookings: (params) => api.get('/api/bookings/my-bookings', { params }),
  getAll: (params) => api.get('/api/bookings', { params }),
  updateStatus: (id, status) => api.patch(`/api/bookings/${id}/status`, { status }),
  assignDecorator: (id, decoratorEmail) => api.patch(`/api/bookings/${id}/assign-decorator`, { decoratorEmail }),
  cancel: (id) => api.patch(`/api/bookings/${id}/cancel`),
  getMyAssignments: () => api.get('/api/bookings/my-assignments'),
};

// Payments APIs
export const paymentsAPI = {
  createCheckoutSession: (bookingId) => api.post('/api/payments/create-checkout-session', { bookingId }),
  verifySession: (data) => api.post('/api/payments/verify-session', data),
  // legacy endpoints (kept for backward compatibility with any existing flows)
  createIntent: (bookingId) => api.post('/api/payments/create-intent', { bookingId }),
  confirm: (data) => api.post('/api/payments/confirm', data),
  getMyPayments: () => api.get('/api/payments/my-payments'),
};

// Decorators APIs
export const decoratorsAPI = {
  getAll: (params) => api.get('/api/decorators', { params }),
  makeDecorator: (email, data) => api.patch(`/api/users/${email}/make-decorator`, data),
  toggleStatus: (email) => api.patch(`/api/decorators/${email}/toggle-status`),
};

// Analytics APIs
export const analyticsAPI = {
  getStats: () => api.get('/api/analytics/stats'),
  getServiceDemand: () => api.get('/api/analytics/service-demand'),
};

// Image Upload API
export const uploadAPI = {
  uploadImage: (image) => api.post('/api/upload-image', { image }),
};

export default api;


