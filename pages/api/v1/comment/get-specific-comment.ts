import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { commentType } from "@core/@types/post";
import { protectMethod, protectRoute } from "@core/lib/api/middleware";
import { getCollection } from "@core/lib/mongodb";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  protectMethod(req, res, "GET");
  const [collection] = await getCollection(["posts"]);
  
  const { postId, commentId } = req.body;
  if (!postId || !commentId) {
    return res.status(400).json({
      success: false,
      message: "Bad Request please provide commentId and postId",
    });
  }

  const post = await collection.findOne({ _id: new ObjectId(postId) });
  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: `Post with id:${postId} not found` });
  }
  const comment = post.comments.find(
    comment => comment._id.toString() === commentId
  );

  if (!comment) {
    return res.status(404).json({
      success: false,
      message: `Comment with id:${commentId} not found`,
    });
  }

  return res.status(200).json({
    success: true,
    message: "Comment found",
    comment: comment as commentType,
  });
};
