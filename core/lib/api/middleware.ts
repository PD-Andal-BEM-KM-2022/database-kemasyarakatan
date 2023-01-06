import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import {
  validate_email,
  validate_facebook,
  validate_instagram,
  validate_line,
  validate_phone,
  validate_twitter,
} from "@core/lib/validator";

export async function protectRoute(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return res
      .status(401)
      .json({ status: false, message: "Not authenticated" });
  }
  return session;
}

export async function protectMethod(
  req: NextApiRequest,
  res: NextApiResponse,
  method: "POST" | "GET" | "PUT" | "DELETE" | "PATCH"
) {
  if (req.method !== method) {
    return res
      .status(405)
      .json({ status: false, message: "Method not allowed" });
  }
}

export async function protectContactInput(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { contact } = req.body;
  if (!validate_email(contact?.email)) {
    return res.status(400).json({
      success: "error",
      message: "Invalid contact email.",
      example: "bemkm@gmail.com",
    });
  }
  if (!validate_phone(contact?.phone)) {
    return res.status(400).json({
      success: "error",
      message: "Invalid contact phone.",
      example: "0123456789",
    });
  }
  if (!validate_facebook(contact?.facebook)) {
    return res.status(400).json({
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
      example:
        "https://www.twitter.com/username or https://twitter.com/username",
    });
  }
  if (!validate_line(contact?.line)) {
    return res.status(400).json({
      success: "error",
      message: "Invalid contact line.",
      example: "https://line.me/R/ti/p/username",
    });
  }
}

