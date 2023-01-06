import { getCollection } from "@core/lib/mongodb";
import getPost from "backend/controller/post/getPost";
import getAllPost from "backend/controller/post/getAllPost";
import { NextApiRequest, NextApiResponse } from "next";
import privateRoute from "@backend/middleware/privateRoute";
import createPost from "@backend/controller/post/createPost";
import deletePost from "@backend/controller/post/deletePost";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [postCollection, categoryCollection] = await getCollection([
    "posts",
    "categories",
  ]);
  if (req.method === "GET") {
    const id = req.query.id as string;
    if (id) {
      return getPost(req, res, id, postCollection);
    } else {
      return getAllPost(req, res, postCollection);
    }
  } else if (req.method === "POST") {
    return privateRoute(req, res, () => {
      return createPost(req, res, postCollection, categoryCollection);
    });
  } else if (req.method === "DELETE") {
    return privateRoute(req, res, () => {
      return deletePost(req, res, postCollection, categoryCollection);
    });
  } else {
    return res.status(400).json({ status: false, message: "Invalid request" });
  }

};
