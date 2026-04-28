import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:2007",
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

// Public endpoints — never redirect on 401
const PUBLIC = ["/auth/login", "/user/verify-otp", "/user/send-otp", "/otp/", "/student/register", "/employer/register"];

API.interceptors.response.use(
  (res) => res,
  (error) => {
    const url = error.config?.url || "";
    const isPublic = PUBLIC.some((p) => url.includes(p));
    if (error.response?.status === 401 && !isPublic) {
      sessionStorage.removeItem("placement_session");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default API;
