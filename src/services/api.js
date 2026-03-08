import axios from "axios";
const VITE_APP_API_BASE = import.meta.env;
export const VITE_APP_API_PATH = import.meta.env;

export const api = axios.create({
  baseURL: VITE_APP_API_BASE,
});
