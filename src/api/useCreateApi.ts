import axios from "axios";
import { useNavigate } from "react-router-dom";

const useCreateApi = () => {
  const navigate = useNavigate();
  const api = axios.create({
    baseURL: "http://localhost:4000",
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
        localStorage.setItem("csrfToken", response.headers["x-csrf-token"]);
      }
      return response;
    },
    (err) => {
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("csrfToken");
        navigate("/login");
        // window.location.href = "/login";
      }
      return Promise.reject(err);
    }
  );

  return api;
};

export default useCreateApi;
