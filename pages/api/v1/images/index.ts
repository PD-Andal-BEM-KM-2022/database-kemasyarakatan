import clientPromise from "@core/lib/mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import FormData from 'form-data';
import { getSession } from "next-auth/react";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  // read image from request body
  const session = await getSession();
  const IMG_URI = process.env.IMG_URI;


  // if (!session){
  //   res.status(401).json({ message: "Unauthorized" });
  // }
  if (!(req.body)) {
    res.status(400).json({ success: false, message: "Image is required" });
  }
  if (req.method === "POST"){
    const formData = req.body;
    console.log(req);
    res.status(200).json(formData)
    fetch(`${IMG_URI}`, {
      method: 'POST',
      headers : { 'Content-Type': req.headers["content-type"]},
      body: req.body
    })
    .then(response => response.json())
    .then(result => res.json(result))
    .catch(error => console.log('error', error));
  }else{
    res.status(405).json({ success: "error", message: "Method not allowed" });
  }



  // const client = await clientPromise;
  // const db = client.db();
  // const collection = db.collection("images");
  // const result = await collection.insertOne(image);

  // res.status(200).json();
};
