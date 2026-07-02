import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  withCredentials: true,
});

// Request interceptor placeholder for future use (e.g. CSRF token or headers)
api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor to normalize error handling matching the backend response contract
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const errorData = error.response?.data || {
      success: false,
      message: 'Network error or server is unreachable. Please try again.',
    };
    return Promise.reject(errorData);
  }
);

export default api;
