import { getCollection } from "@core/lib/mongodb";
import getPost from "backend/controller/post/getPost";
import getAllPost from "backend/controller/post/getAllPost";
import { NextApiRequest, NextApiResponse } from "next";
import privateRoute from "@backend/middleware/privateRoute";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const [collection] = await getCollection(["posts"]);
  if (req.method === "GET") {
    const id = req.query.id as string;
    if (id) {
      getPost(req, res, id, collection);
    } else {
      getAllPost(req, res, collection);
    }
  } else if (req.method === "POST") {
    privateRoute(req, res, () => {
      getAllPost(req, res, collection);
    });
  } 
};
