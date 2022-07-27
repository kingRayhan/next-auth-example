import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://jwt-auth-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getCookie("token");
  const { accessToken } = JSON.parse(token as string) || null;
  if (accessToken) {
    return { ...config, headers: { Authorization: `Bearer ${accessToken}` } };
  }
  return config;
});

// api.interceptors.response.use(undefined, async (config) => {
//   console.log(config.response);
//   // const token = getCookie("token");
//   // const _token = JSON.parse(token as string) || null;
//   // if (status === 401 && _token.refreshToken) {
//   //   try {
//   //     const _refreshResponse = await axios.post("/auth/refresh", null, {
//   //       headers: {
//   //         Authorization: `Bearer ${_token.refreshToken}`,
//   //       },
//   //     });
//   //     console.log({ _refreshResponse });
//   //   } catch (error) {
//   //     console.log("delete cookie");
//   //     deleteCookie("token");
//   //   }
//   // }
//   return config;
// });
