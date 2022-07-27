// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";

type AuthSessionPayload = {
  auth_uid: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthSessionPayload>
) {
  if (req.method === "POST") {
    const token = "token";

    const _cookie = serialize("auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    res.setHeader("Set-Cookie", _cookie);

    return res.status(201).json({
      // @ts-ignore
      message: "Session created",
    });
  }
}
