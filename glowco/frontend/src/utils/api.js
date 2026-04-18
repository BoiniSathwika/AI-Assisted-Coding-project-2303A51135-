import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('glowco_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401 globally (token expired)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('glowco_token');
      localStorage.removeItem('glowco_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ── Users ────────────────────────────────────────────────────────
export const registerUser    = (data)      => api.post('/users/register', data);
export const loginUser       = (data)      => api.post('/users/login', data);
export const getMyProfile    = ()          => api.get('/users/me');
export const updateProfile   = (data)      => api.put('/users/profile', data);
export const toggleWishlist  = (productId) => api.put(`/users/wishlist/${productId}`);

// ── Products ─────────────────────────────────────────────────────
export const getProducts       = (params)    => api.get('/products', { params });
export const getProduct        = (id)        => api.get(`/products/${id}`);
export const getRecommendations= (skinType)  => api.get(`/products/recommend/${skinType}`);

// ── Orders ───────────────────────────────────────────────────────
export const createOrder  = (data) => api.post('/orders', data);
export const getMyOrders  = ()     => api.get('/orders/mine');
export const getOrder     = (id)   => api.get(`/orders/${id}`);

// ── Reviews ──────────────────────────────────────────────────────
export const getReviews   = (productId)        => api.get(`/reviews/product/${productId}`);
export const addReview    = (productId, data)   => api.post(`/reviews/${productId}`, data);

// ── Admin ────────────────────────────────────────────────────────
export const getAdminStats   = ()          => api.get('/admin/stats');
export const getAllOrders     = ()          => api.get('/admin/orders');
export const getAllUsers      = ()          => api.get('/admin/users');
export const createProduct   = (data)      => api.post('/admin/products', data);
export const updateProduct   = (id, data)  => api.put(`/admin/products/${id}`, data);
export const deleteProduct   = (id)        => api.delete(`/admin/products/${id}`);
export const updateOrderStatus = (id, status) => api.put(`/admin/orders/${id}/status`, { status });

export default api;
