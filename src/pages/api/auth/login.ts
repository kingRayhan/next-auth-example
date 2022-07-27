// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { api } from "@/app/api/client/api.client";
import { AxiosError } from "axios";
import { serialize } from "cookie";
import { deleteCookie, setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

type AuthSessionPayload = {
  email: string | null;
  password: string | null;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: AuthSessionPayload;
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    api
      .post("/auth/login", req.body)
      .then(({ data }) => {
        setCookie("token", JSON.stringify(data), {
          path: "/",
          req,
          res,
        });
        res.status(200).json(data);
      })
      .catch((err: AxiosError<any>) => {
        res.status(err.response?.status || 403).json({
          message: err.response?.data.message,
        });
      });
  }

  if (req.method === "DELETE") {
    deleteCookie("token", {
      path: "/",
    });
    res.status(200).json({ message: "User session removed" });
  }
}
