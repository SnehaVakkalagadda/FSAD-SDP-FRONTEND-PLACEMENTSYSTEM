import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
});

// Attach JWT token to every request from sessionStorage
API.interceptors.request.use((config) => {
  try {
    const raw = sessionStorage.getItem("placement_session");
    if (raw) {
      const session = JSON.parse(raw);
      if (session?.token) {
        config.headers["Authorization"] = `Bearer ${session.token}`;
      }
    }
  } catch { /* ignore parse errors */ }
  return config;
});

// On 401 (token expired / invalid) — clear session and redirect to login
// Skip redirect for public auth endpoints so login errors show properly
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const url = error.config?.url || "";
    const isPublicEndpoint =
      url.includes("/auth/login") ||
      url.includes("/student/register") ||
      url.includes("/employer/register");

    if (error.response?.status === 401 && !isPublicEndpoint) {
      sessionStorage.removeItem("placement_session");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
