import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { protectMethod, protectRoute } from "@core/lib/api/middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  protectRoute(req, res);
  protectMethod(req, res, "POST");

  const { commentId, postId } = req.body;

  if (!postId) {
    res.status(400).json({ status: false, message: "Post id is required" });
    return;
  }

  if (!commentId) {
    res.status(400).json({ status: false, message: "Comment id is required" });
    return;
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");
  const result = await collection.updateOne(
    { _id: new ObjectId(postId) },
    { $pull: { comments: { _id: new ObjectId(commentId) } } }
  );
  
  res.status(200).json(result);
};
