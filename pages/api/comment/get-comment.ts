import clientPromise from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body || req.query;
  if (!id)
    return res.status(400).json({ success: false, message: "Id is required" });

  if (!ObjectId.isValid(id))
    return res.status(400).json({ success: false, message: "Invalid ID" });

  if (req.method !== "GET")
    return res
      .status(405)
      .json({ success: false, message: "Method not allowed (GET ONLY)" });

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");
  const post = await collection.findOne({ _id: new ObjectId(id) });
  if (!post)
    return res
      .status(404)
      .json({ success: false, message: `Post with id:${id} not found` });
  if (!post.comments)
    return res
      .status(404)
      .json({
        success: false,
        message: `Comments with Post ID:${id} not found`,
      });

  return res.status(200).json(post.comments);
};
