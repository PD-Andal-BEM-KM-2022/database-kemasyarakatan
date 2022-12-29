import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });

  if (!session) {
    res.status(401).json({ status: false, message: "Not authenticated" });
    return;
  }

  if (req.method !== "POST") {
    res.status(400).json({ status: false, message: "Method not allowed" });
    return;
  }

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
