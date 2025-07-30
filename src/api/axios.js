// src/api/axios.js
import axios from 'axios';

// Create an Axios instance with the API base URL
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL , // Set the API base URL from .env
  headers: { 
    'Content-Type': 'application/json' 
  },
  timeout: 10000 // Set a timeout (optional)
});

// Request interceptor: attach token if available in localStorage
apiClient.interceptors.request.use(config => {
  const token = JSON.parse(localStorage.getItem('user')).token; // Retrieve token from localStorage (or Vuex)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach the token to each request
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Response interceptor: Handle responses and errors globally
apiClient.interceptors.response.use(
  response => response,
  error => {
    const message = error.response?.data?.message || 'API request failed';
    console.error('[API ERROR]', message);
    return Promise.reject(new Error(message));
  }
);

export default apiClient;
