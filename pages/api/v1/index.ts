import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  res.status(200).json({
    authenticated: !!session,
    message:
      "Welcome to Database Kemasyarakatan REST API V1",
  });
};
