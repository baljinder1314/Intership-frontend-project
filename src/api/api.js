// src/api/api.js
import axios from "axios";
import store from "../store/store";
import { removeUser } from "../slices/userSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // /user
  headers: {
    "Content-Type": "application/json",
  },
});


// attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const token = localStorage.getItem("token");

    if (error.response?.status === 401 && token && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await api.post(
          "/refresh-token",
          {},
          { withCredentials: true },
        );
        const newToken = res.data.data.accessToken;

        localStorage.setItem("token", newToken);

        // retry previous request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;

        return api(originalRequest);
      } catch (error) {
        localStorage.removeItem("token");
      }
    }
    return Promise.reject(error);
  },
);

export default api;
