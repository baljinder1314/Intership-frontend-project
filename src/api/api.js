// src/api/api.js
import axios from "axios";
import store from "../store/store";
import { removeUser } from "../slices/userSlice";

const api = axios.create({
  baseURL: "http://localhost:8080/user",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

//attach access token to every request
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

    // ✅ skip refresh if user is not logged in
    if (!token) return Promise.reject(error);

    // ✅ skip refresh for login and register routes
    const skipRoutes = ["/login", "/register", "/refresh-token"];
    const isSkipRoute = skipRoutes.some((route) =>
      originalRequest.url.includes(route),
    );
    if (isSkipRoute) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // call refresh token endpoint
        const response = await axios.post(
          "http://localhost:8080/user/refresh-token",
          {},
          { withCredentials: true }, // refresh token is in cookie
        );

        const newAccessToken = response.data?.data?.accessToken;

        // save new access token
        localStorage.setItem("token", newAccessToken);

        // update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // ✅ retry failed request
      } catch (refreshError) {
        // refresh token also expired — force logout

        store.dispatch(removeUser());
        localStorage.removeItem("token");
        
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
