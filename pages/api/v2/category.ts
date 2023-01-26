import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("categories");
  const categories = await collection.find({}).toArray();
  res.status(200).json(categories);
};
