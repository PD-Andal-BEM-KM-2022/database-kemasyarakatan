import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
  collection: any
) => {
  if (!id)
    return res.status(400).json({ success: false, message: "Id is required" });

  if (!ObjectId.isValid(id))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  // get all comments with post id
  const post = await collection.find({ postId: new ObjectId(id) }).toArray();

  if (!post || post.length === 0)
    return res
      .status(404)
      .json({ success: false, message: `Post with id:${id} not found` });

  return res.status(200).json({ status: true, length: post.length, comment: post });
};
