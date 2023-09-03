import axios from "axios";

const api = axios.create({
    baseURL: process.env.REACT_APP_DJANGO_SERVER +'/api/',
    withCredentials: true,
  });

export default api;