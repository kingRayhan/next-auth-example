import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://jwt-auth-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
