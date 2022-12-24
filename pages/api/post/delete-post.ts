import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  if (req.method !== "DELETE") {
    return res
      .status(405)
      .json({ message: "Method not allowed (DELETE ONLY)" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const post = await collection.find({ _id: id });

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const result = await collection.deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 1) {
    return res.status(200).json({ deletedId: id, message: "Post deleted successfully" });
  }

  return res.status(500).json({ message: "Something went wrong" });
};
