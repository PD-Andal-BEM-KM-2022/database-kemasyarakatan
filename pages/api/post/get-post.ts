import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed (GET ONLY)" });
  }

  const id = req.body.id || req.query.id;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");

  const post = await collection.findOne({ _id: new ObjectId(id) });

  if (post) {
    post.views = post.views + 1;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }

  res.end();
};
