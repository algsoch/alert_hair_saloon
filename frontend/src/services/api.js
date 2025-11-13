import axios from 'axios';

// Backend API URL - Automatically use network IP if not localhost
const getBackendUrl = () => {
  // If custom API URL is set, use it
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // Get current hostname (will be IP address when accessed from network)
  const currentHost = window.location.hostname;
  
  // If accessing via network IP, use same IP for backend
  if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
    return `http://${currentHost}:8080/api`;
  }
  
  // Default to localhost for development
  return 'http://localhost:8080/api';
};

const API_BASE_URL = getBackendUrl();
console.log('Using backend API URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

export const sendAlert = async (customerPhoto = null) => {
  try {
    const payload = customerPhoto ? { photo: customerPhoto } : {};
    console.log('Sending alert with photo:', customerPhoto ? `Yes (${customerPhoto.length} chars)` : 'No');
    const response = await api.post('/alert', payload);
    console.log('Alert response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error sending alert:', error);
    throw error;
  }
};

export const getShopInfo = async () => {
  try {
    const response = await api.get('/shop-info');
    return response.data;
  } catch (error) {
    console.error('Error fetching shop info:', error);
    throw error;
  }
};

export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

export default api;
