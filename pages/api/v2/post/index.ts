import { getCollection } from "@core/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import privateRoute from "@backend/middleware/privateRoute";
import deletePost from "@backend/controller/post/deletePost";
import {createPost, getAllPost, getPost, updatePost} from "@backend/controller/post";

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
  } else if (req.method === "PATCH") {
    return privateRoute(req, res, () => {
      return updatePost(req, res, postCollection);
    });
  } else {
    return res.status(400).json({ status: false, message: "Invalid request" });
  }
};
