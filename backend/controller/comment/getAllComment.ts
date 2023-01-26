import { NextApiRequest, NextApiResponse } from "next";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: any
) => {
  const posts = await collection.find({}).toArray();

  if (!posts || posts.length === 0)
    return res
      .status(404)
      .json({ success: false, message: "No comments found" });

  return res.status(200).json(posts);
};
