import axios from 'axios';

const api = axios.create({
  baseURL: 'url',
});

api.interceptors.request
