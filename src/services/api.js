import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:2007",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request
API.interceptors.request.use((config) => {
  const raw = sessionStorage.getItem("placement_session");
  if (raw) {
    try {
      const session = JSON.parse(raw);
      if (session?.token) {
        config.headers["Authorization"] = `Bearer ${session.token}`;
      }
    } catch { /* ignore */ }
  }
  return config;
});

// Handle 401 — token expired or invalid → clear session and reload to login
API.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      sessionStorage.removeItem("placement_session");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
