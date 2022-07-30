import { getCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";
import { api } from "../api/client/api.client";

export interface Session {
  isAuthenticated: boolean;
  user?: any;
}

export const getSession = async (
  context: GetServerSidePropsContext
): Promise<Session> => {
  const __token = getCookie("token", { req: context.req, res: context.res });
  let token = null;

  if (!__token) {
    return { isAuthenticated: false, user: null };
  }

  if (__token) {
    const { token: tokenObject } = JSON.parse(
      getCookie("token", { req: context.req, res: context.res }) as string
    );
    token = tokenObject;
  }

  try {
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token.accessToken}` },
    });
    return { isAuthenticated: true, user: res.data };
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
};
