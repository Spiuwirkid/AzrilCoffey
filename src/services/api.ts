import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // adjust based on your backend URL
  headers: {
    'Content-Type': 'application/json'
  }
});

export default api;