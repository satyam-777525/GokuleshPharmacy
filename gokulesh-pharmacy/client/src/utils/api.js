import axios from 'axios';

const API = axios.create({ baseURL: '/api' });

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('gp_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const register = (data) => API.post('/auth/register', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Users
export const getProfile = () => API.get('/users/profile');
export const updateProfile = (data) => API.put('/users/profile', data);
export const changePassword = (data) => API.put('/users/change-password', data);

// Products
export const getProducts = (params) => API.get('/products', { params });
export const getProduct = (slug) => API.get(`/products/${slug}`);

// Categories
export const getCategories = () => API.get('/categories');

// Orders
export const createOrder = (data) => API.post('/orders', data);
export const getMyOrders = () => API.get('/orders/my-orders');
export const getOrder = (id) => API.get(`/orders/${id}`);

// Admin
export const adminDashboard = () => API.get('/admin/dashboard');
export const adminGetProducts = () => API.get('/admin/products');
export const adminCreateProduct = (data) => API.post('/admin/products', data);
export const adminUpdateProduct = (id, data) => API.put(`/admin/products/${id}`, data);
export const adminDeleteProduct = (id) => API.delete(`/admin/products/${id}`);
export const adminGetCategories = () => API.get('/admin/categories');
export const adminCreateCategory = (data) => API.post('/admin/categories', data);
export const adminUpdateCategory = (id, data) => API.put(`/admin/categories/${id}`, data);
export const adminDeleteCategory = (id) => API.delete(`/admin/categories/${id}`);
export const adminGetOrders = () => API.get('/admin/orders');
export const adminUpdateOrderStatus = (id, status) => API.put(`/admin/orders/${id}/status`, { status });
export const adminGetUsers = () => API.get('/admin/users');

// Admin uploads
export const adminUploadImages = (formData) =>
  API.post('/admin/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });

// Payments (PhonePe)
export const createPhonePeOrder = (data) => API.post('/payments/phonepe/order', data);
export const confirmPhonePePayment = (data) => API.post('/payments/phonepe/confirm', data);

export default API;
