import clientPromise from "@core/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");
  const posts = await collection.find({}).toArray();
  const result = posts.map(post => ({
    id: post._id.toString(),
    comment: post.comments || [],
  }));
  res.status(200).json(result);
};
