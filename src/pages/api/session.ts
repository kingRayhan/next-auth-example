// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type AuthSessionPayload = {
  auth_uid: string | null;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AuthSessionPayload>
) {
  if (req.method === "POST") {
    const { auth_uid } = req.body;
    // @ts-ignore
    req.cookies.auth_uid = auth_uid;

    return res.status(201).json({
      // @ts-ignore
      message: "Session created",
      auth_uid: req.cookies?.auth_uid ?? null,
    });
  }

  if (req.method === "GET") {
    return res.status(200).json({
      // @ts-ignore
      message: "Session retrieved",
      auth_uid: req.cookies?.auth_uid ?? null,
    });
  }
}
