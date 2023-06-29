import axios from "axios";
import { useNavigate } from "react-router-dom";

const useCreateApi = () => {
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    withCredentials: true,
  });

  api.interceptors.request.use(
    (config) => {
      const csrfToken = localStorage.getItem("csrfToken");
      if (csrfToken) {
        config.headers["X-CSRF-TOKEN"] = csrfToken;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      if (response.headers["x-csrf-token"]) {
        if (typeof window !== undefined) {
          localStorage.setItem("csrfToken", response.headers["x-csrf-token"]);
        }
      }
      return response;
    },
    (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        if (typeof window !== undefined) {
          localStorage.removeItem("csrfToken");
        }
        navigate("/login");
      }
      return Promise.reject(err);
    }
  );

  return api;
};

export default useCreateApi;
