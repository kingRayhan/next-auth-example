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
  const _token = getCookie("token", { req: context.req, res: context.res });
  if (!_token) {
    return { isAuthenticated: false, user: null };
  }

  console.log({ _token });

  try {
    const res = await api.get("/auth/me", {
      headers: {
        // @ts-ignore
        Authorization: `Bearer ${_token.accessToken}`,
      },
    });
    // console.log("getSession", res);
    return { isAuthenticated: true, user: "data" };
  } catch (error) {
    return { isAuthenticated: false, user: null };
  }
};
