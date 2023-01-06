import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
  action = () => {}
) {
  const session = await getSession({ req });

  if (session) {
    return action();
  } else {
    return res
      .status(401)
      .json({ status: false, message: "Not authenticated" });
  }
}
