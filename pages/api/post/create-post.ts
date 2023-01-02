import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";
import { postReq, post } from "@core/@types/post";
import { getSession } from "next-auth/react";
import {
  validate_email,
  validate_facebook,
  validate_instagram,
  validate_line,
  validate_phone,
  validate_twitter,
} from "@core/lib/validator";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const client = await clientPromise;
  const session = await getSession({ req });

  if (session) {
    if (req.method !== "POST") {
      res
        .status(405)
        .json({ success: "error", message: "Method not allowed (POST ONLY)" });
    }
    const db = client.db();
    const collection = db.collection("posts");
    const { title, content, img, contact, categories, keywords } =
      req.body as postReq;

    // convert categories and keywords to lowercase
    const categoriesArr = categories.map(category => category.toLowerCase());
    const keywordsArr = keywords.map(keyword => keyword.toLowerCase());

    if (!title || !content) {
      return res
        .status(400)
        .json({ success: "error", message: "Title and content are required" });
    }

    if (!validate_email(contact?.email)) {
      return res.status(400).json({
        success: "error",
        message: "Invalid contact email.",
        example: "BEMKM@gmail.com",
      });
    }

    if (!validate_facebook(contact?.facebook)) {
      return res
        .status(400)
        .json({
          success: "error",
          message: "Invalid contact facebook.",
          example:
            "https://www.facebook.com/username or https://facebook.com/username",
        });
    }

    if (!validate_instagram(contact?.instagram)) {
      return res.status(400).json({
        success: "error",
        message: "Invalid contact instagram.",
        example:
          "https://www.instagram.com/username or https://instagram.com/username",
      });
    }

    if (!validate_twitter(contact?.twitter)) {
      return res.status(400).json({
        success: "error",
        message: "Invalid contact twitter.",
        example: "https://twitter.com/username",
      });
    }

    if (!validate_phone(contact?.phone)) {
      return res.status(400).json({
        success: "error",
        message: "Invalid contact phone.",
        example: "081234567890",
      });
    }

    if (!validate_line(contact?.line)) {
      return res.status(400).json({
        success: "error",
        message: "Invalid contact line.",
        example: "https://line.me/ti/p/username",
      });
    }

    const post = {
      title: title,
      content: content,
      img: img || [],
      contact: {
        name: contact?.name || null,
        email: contact?.email || null,
        facebook: contact?.facebook || null,
        phone: contact?.phone || null,
        instagram: contact?.instagram || null,
        twitter: contact?.twitter || null,
      },
      metadata: {
        tags: keywordsArr || [],
        categories: categoriesArr || [],
      },
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [{}],
    } as post;

    // insert if title not exists
    const postExists = await collection.findOne({ title: title });
    if (postExists) {
      res
        .status(400)
        .json({ success: false, message: "Post with title already exists" });
    }

    const result = await collection.insertOne(post);
    res
      .status(201)
      .json({ success: true, message: "Post created", id: result.insertedId });
  } else {
    res
      .status(401)
      .json({ success: false, message: "Not authenticated, please log in" });
  }

  res.end();
};
