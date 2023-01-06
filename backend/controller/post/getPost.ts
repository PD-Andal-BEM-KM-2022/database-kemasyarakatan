import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { ClientError } from "backend/error/ClientError";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  id: string,
  collection: any
) => {
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("Invalid post id");
    }

    const post = await collection.findOne({ _id: new ObjectId(id) });

    if (post) {
      // update views
      post.views = post.views + 1;
      await collection.updateOne({ _id: new ObjectId(id) }, { $set: post });

      // format post object
      post.id = post._id;
      delete post._id;

      return res.status(200).json(post);
    }

    throw new ClientError("Post not found", 404);
  } catch (error) {
    return res.status(error.status || 400).json({
      success: false,
      message: error.message || "Something went wrong",
    });
  }
};
