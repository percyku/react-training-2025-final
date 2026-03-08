import axios from "axios";
const VITE_APP_API_BASE = import.meta.env;
export const VITE_APP_API_PATH = import.meta.env;

// 後台 API（需要認證）
export const apiAuth = axios.create({
  baseURL: VITE_APP_API_BASE,
});

// 請求攔截器 - 自動加入 token
apiAuth.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("react-week2-token="))
      ?.split("=")[1];
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
