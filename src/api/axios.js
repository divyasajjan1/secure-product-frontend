import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8001/api/", // Django backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach a request interceptor to include the JWT token automatically
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optional: response interceptor to handle expired tokens globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // token expired or invalid
      console.log("Unauthorized: token may have expired");
      // you can redirect to login page here if needed
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      window.location.reload(); // force redirect to login
    }
    return Promise.reject(error);
  }
);

export default api;
