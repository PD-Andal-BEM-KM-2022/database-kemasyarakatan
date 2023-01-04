import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { protectMethod, protectRoute } from "@core/lib/api/middleware";
import { getCollection } from "@core/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  protectRoute(req, res);
  protectMethod(req, res, "POST");
  const [collection] = await getCollection(["posts"]);

  const { comment, postId } = req.body;

  if (!postId) {
    res.status(400).json({ status: false, message: "Post id is required" });
    return;
  }

  if (!comment) {
    res.status(400).json({ status: false, message: "Comment is required" });
    return;
  }

  const result = await collection.updateOne(
    { _id: new ObjectId(postId) },
    { $push: { comments: comment } }
  );
  res.status(200).json(result);
};
