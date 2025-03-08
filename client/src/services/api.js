import axios from 'axios';

// Determine the base URL based on the environment
const isProduction = process.env.NODE_ENV === 'production';
const baseURL = isProduction 
  ? process.env.REACT_APP_API_URL || '/api'  // In production, use the environment variable or default to /api
  : 'http://localhost:5000/api';            // In development, use localhost

console.log('API Base URL:', baseURL);  // For debugging

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true  // Important for CORS with credentials
});

// Add a request interceptor to include the auth token in requests
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

// Add a response interceptor for debugging
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response || error.message || error);
    return Promise.reject(error);
  }
);

export default api; 