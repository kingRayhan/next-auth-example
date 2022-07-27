import axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://jwt-auth-api.vercel.app",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    if (Boolean(getCookie("token"))) {
      const _token = JSON.parse(getCookie("token") as string) || null;
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${_token.accessToken}`,
        },
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// api.interceptors.response.use(
//   (response) => response,
//   async (config) => {
//     const _request = config.config;
//     const _response = config.response;
//     if (_response?.status === 401 && Boolean(getCookie("token"))) {
//       try {
//         const _refreshResponse = await api.post("/auth/refresh");
//       } catch (error) {
//         deleteCookie("token", {
//           path: "/",
//           domain: "localhost",
//         });
//       }
//     }
//     // const _token = JSON.parse(token as string) || null;
//     // if (status === 401 && _token.refreshToken) {
//     //   try {
//     //     const _refreshResponse = await axios.post("/auth/refresh", null, {
//     //       headers: {
//     //         Authorization: `Bearer ${_token.refreshToken}`,
//     //       },
//     //     });
//     //     console.log({ _refreshResponse });
//     //   } catch (error) {
//     //     console.log("delete cookie");
//     //     deleteCookie("token");
//     //   }
//     // }
//     return config;
//   }
// );
