import clientPromise from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.body || req.query.id;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed (POST ONLY)" });
  }

  const post = await collection.findOne({ _id: new ObjectId(id) });

  if (post) {
    post.views = 0;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });
    res.status(200).json(post);
  } else {
    res.status(404).json({ message: "Post not found" });
  }
};
