import { NextApiRequest, NextApiResponse } from "next";
import privateRoute from "@backend/middleware/privateRoute";
import { ObjectId } from "mongodb";

export default async (
  req: NextApiRequest,
  res: NextApiResponse,
  collection: any
) => {
  privateRoute(req, res, async () => {
    const { commentId} = req.body;

    if (!commentId) {
      res
        .status(400)
        .json({ status: false, message: "Comment id is required" });
      return;
    }

    const result = await collection.deleteOne({
      _id: new ObjectId(commentId),
    });

    return res.status(200).json(result);
  });
};
