import clientPromise from "@core/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // read image from request body
  const image = req.body;
  if (!image) {
    res.status(400).json({ success: false, message: "Image is required" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("images");
  const result = await collection.insertOne(image);

  res.status(200).json(result);
};
