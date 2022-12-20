import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = await getToken({ req });
  if (token) {
    console.log("JSON Web Token", JSON.stringify(token, null, 2));
  } else {
    res.status(401);
  }
  res.end();
};