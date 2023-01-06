import { NextApiRequest, NextApiResponse } from "next";
import privateRoute from "@backend/middleware/privateRoute";
import { ObjectId } from "mongodb";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  commentCollection: any,
  postCollection: any
) => {
  privateRoute(req, res, async () => {
    const { commentId } = req.body;

    if (!commentId) {
      res.status(400).json({
        status: false,
        message: "Comment id is required",
        details: {
          advice: "Please provide a commentId in the request body",
        },
      });
      return;
    }

    // get post id
    const comment = await commentCollection.findOne({
      _id: new ObjectId(commentId),
    });

    if (comment) {
      await postCollection.updateOne(
        { _id: new ObjectId(comment.postId) },
        { $pull: { comments: new ObjectId(commentId) } }
      );

      const result = await commentCollection.deleteOne({
        _id: new ObjectId(commentId),
      });

      return res.status(200).json(result);
    }

    return res.status(404).json({
      status: false,
      message: `Comment with id:${commentId} not found`,
    });
  });
};
