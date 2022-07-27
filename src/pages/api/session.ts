// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { api } from "@/app/api/client/api.client";
import { AxiosError } from "axios";
import { serialize } from "cookie";
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
    res.setHeader(
      "Set-Cookie",
      serialize("token", "ddd", {
        // httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      })
    );
    api
      .post("/auth/login", req.body)
      .then(({ data }) => {
        console.log({ data });
        res.status(200).json(data);
      })
      .catch((err: AxiosError<any>) => {
        res.status(err.response?.status || 403).json({
          message: err.response?.data.message || "Invalid credentials",
        });
      });
  }
}
