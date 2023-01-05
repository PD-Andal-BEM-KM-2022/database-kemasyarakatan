import { NextApiRequest, NextApiResponse } from "next";
import { protectRoute } from "@core/lib/api/middleware";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  protectRoute(req, res);
  const IMG_URI = process.env.IMG_URI;

  if (!req.body) {
    res.status(400).json({ success: false, message: "Image is required" });
  }
  if (req.method === "POST") {
    const formData = req.body;
    console.log(req);
    res.status(200).json(formData);
    fetch(`${IMG_URI}`, {
      method: "POST",
      headers: { "Content-Type": req.headers["content-type"] },
      body: req.body,
    })
      .then(response => response.json())
      .then(result => res.json(result))
      .catch(error => console.log("error", error));
  } else {
    return res
      .status(405)
      .json({ success: "error", message: "Method not allowed" });
  }
};
