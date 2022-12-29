import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession, useSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession({ req });
  if (!session) {
    res.status(401).json({ status: false, message: "Not authenticated" });
    return;
  }

  const { comment, postId } = req.body;

  if (req.method !== "POST") {
    res.status(400).json({ status: false, message: "Method not allowed" });
    return;
  }

  if (!postId) {
    res.status(400).json({ status: false, message: "Post id is required" });
    return;
  }

  if (!comment) {
    res.status(400).json({ status: false, message: "Comment is required" });
    return;
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");
  const result = await collection.updateOne(
    { _id: new ObjectId(postId) },
    { $push: { comments: comment } }
  );
  res.status(200).json(result);
};
