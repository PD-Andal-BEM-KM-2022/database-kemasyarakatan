import clientPromise from "@core/lib/mongodb";

export async function getPost(postID) {
  const client = await clientPromise;

  const db = client.db();

  const data = await db.collection("posts").find({}).toArray();

  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
}
