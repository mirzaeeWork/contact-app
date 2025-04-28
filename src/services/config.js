import axios from "axios";

export const apiInstance = axios.create({
  baseURL: "http://localhost:3001",})


apiInstance.interceptors.response.use((response) => response.data, (error) => Promise.reject(error));