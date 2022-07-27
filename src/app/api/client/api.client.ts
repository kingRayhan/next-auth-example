import axios from "axios";
import { getCookie } from "cookies-next";

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
      const { token } = JSON.parse(getCookie("token") as string) || null;
      console.log("request", getCookie("token"));
      return {
        ...config,
        headers: {
          ...config.headers,
          Authorization: `Bearer ${token.accessToken}`,
        },
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (config) => {
    const _request = config.config;
    const _response = config.response;
    if (
      (_response?.status === 401 || _response?.status === 403) &&
      Boolean(getCookie("token"))
    ) {
      try {
        const { token } = JSON.parse(getCookie("token") as string) || null;
        console.log("refreshing...", { token });

        const _refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
          null,
          {
            headers: {
              Authorization: `Bearer ${token.refreshToken}`,
            },
          }
        );

        await axios.post("/api/auth/token", _refreshResponse.data);

        return api({
          ..._request,
          headers: {
            ..._request.headers,
          },
        });
      } catch (error) {
        console.log("refreshing... error", error);
        await axios.delete("/api/auth/token");
        return Promise.reject(error);
      }
    }
    return config;
  }
);
