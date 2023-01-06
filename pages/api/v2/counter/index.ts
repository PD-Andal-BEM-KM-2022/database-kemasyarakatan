import { protectMethod, protectRoute } from "@core/lib/api/middleware";
import { getCollection } from "@core/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  protectRoute(req, res);
  protectMethod(req, res, "POST");
  const [collection] = await getCollection(["posts"]);

  const { id } = req.body;

  const post = await collection.findOne({ _id: new ObjectId(id) });

  if (post) {
    post.views = 0;
    await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });
    return res.status(200).json({
      status: true,
      message: "Post views reset",
      post,
    });
  } else {
    return res.status(404).json({ message: "Post not found" });
  }
};
