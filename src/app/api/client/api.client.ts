import axios from "axios";
import { parse } from "cookie";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://jwt-auth-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.response.use(
  (config) => {
    const token = config?.data;

    console.log("api.interceptors.request", { token });
    // if (token) {
    //   request.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (onErrorConfig) => {
    console.log("api.interceptors.response", {
      onErrorConfig: onErrorConfig.response,
    });
    return onErrorConfig;
  }
);
