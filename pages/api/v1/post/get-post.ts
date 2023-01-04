import { NextApiRequest, NextApiResponse } from "next";
import { getCollection } from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { protectMethod } from "@core/lib/api/middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  protectMethod(req, res, "GET");
  const [collection] = await getCollection(["posts"]);

  const id = req.body.id || req.query.id;

  if (!id) {
    return res.status(400).json({ message: "ID is required" });
  }

  const post = await collection.findOne({ _id: new ObjectId(id) });

  if (post) {
    post.views = post.views + 1;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });

    // Convert _id to id, delete _id, and place in first position
    post.id = post._id;
    delete post._id;
    
    return res.status(200).json(post);
  }

  return res.status(404).json({ message: "Post not found" });
};
