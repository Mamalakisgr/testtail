// src/axios.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api', // Ensure this matches your backend URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;