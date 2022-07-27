// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { deleteCookie, setCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";

type AuthSessionPayload = {
  accessToken: string | null;
  refreshToken: string | null;
};

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    token: AuthSessionPayload;
  };
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    setCookie("token", JSON.stringify(req.body), {
      path: "/",
      req,
      res,
    });
    res.status(200).json({
      message: "User session created",
    });
  }

  if (req.method === "DELETE") {
    deleteCookie("token", {
      path: "/",
      req,
      res,
    });
    res.status(200).json({ message: "User token removed" });
  }
}
