import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL+ "/api",
});

API.interceptors.request.use((req) => {
  const user = JSON.parse(localStorage.getItem("userInfo"));

  if (user?.token) {
    req.headers.Authorization = `Bearer ${user.token}`;
  }

  return req;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("userInfo");
      window.location.href = "/login";
    }

    return Promise.reject(error);
  }
);

export default API;