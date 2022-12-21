import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@core/lib/mongodb";
import { post } from "@core/@types/post";
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
      res.status(405).json({ message: "Method not allowed (POST ONLY)" });
    }
    const db = client.db();
    const collection = db.collection("posts");
    const { title, content, img, contact, categories, keywords } = req.body;

    if (!title || !content) {
      res.status(400).json({ message: "Title and content are required" });
    }

    if (!validate_email(contact?.email)) {
      res.status(400).json({ message: "Invalid contact email." });
    }

    if (!validate_facebook(contact?.facebook)) {
      res.status(400).json({ message: "Invalid contact facebook." });
    }

    if (!validate_instagram(contact?.instagram)) {
      res.status(400).json({ message: "Invalid contact instagram." });
    }

    if (!validate_twitter(contact?.twitter)) {
      res.status(400).json({ message: "Invalid contact twitter." });
    }

    if (!validate_phone(contact?.phone)) {
      res.status(400).json({ message: "Invalid contact phone." });
    }

    if (!validate_line(contact?.line)) {
      res.status(400).json({ message: "Invalid contact line." });
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
      tags: {
        keywords: keywords || [],
        categories: categories || [],
      },
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comment: [{}],
    } as post;

    // insert if title not exists
    const postExists = await collection.findOne({ title: title });
    if (postExists) {
        res.status(400).json({ message: "Post with title already exists" });
    }

    const result = await collection.insertOne(post);
    console.log(result);
    res.status(201).json({ message: "Post created", id: result.insertedId });
  } else {
    res.status(401).json({ message: "Not authenticated" });
  }

  res.end();
};
