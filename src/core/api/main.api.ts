import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.tvmaze.com',
  withCredentials: false,
})

export default api;