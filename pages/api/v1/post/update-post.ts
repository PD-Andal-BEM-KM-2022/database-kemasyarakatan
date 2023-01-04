import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";
import { getSession } from "next-auth/react";
import { ObjectId } from "mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.method !== "PATCH") {
    return res
      .status(405)
      .json({ message: "Method not allowed (PATCH ONLY)" });
  }

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection("posts");
  const { title, content, contact, id } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const post = await collection.findOne({ _id: new ObjectId(id) });

  if (!post) {
    return res.status(404).json({ message: `Post with id:${id} not found` });
  }

  post.title = title;
  post.content = content;
  post.contact = {
    name: contact.name || post.contact.name || null,
    email: contact.email || post.contact.email || null,
    phone: contact.phone || post.contact.phone || null,
    instagram: contact.instagram || post.contact.instagram || null,
    facebook: contact.facebook || post.contact.facebook || null,
    twitter: contact.twitter || post.contact.twitter || null,
    line: contact.line || post.contact.line || null,
  };

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: post }
  );

  if (result.modifiedCount === 0) {
    return res
      .status(500)
      .json({ message: `Failed to update post with id:${id} ` });
  } else {
    return res
      .status(200)
      .json({ message: `Post with id:${id} updated`, post });
  }
};
