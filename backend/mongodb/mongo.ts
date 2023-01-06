import { MongoClient } from "mongodb";
import { MONGODB_URI } from "../typescript/constant";

const uri = MONGODB_URI;
const options = {};

let client: MongoClient;
let clientPromise: Promise<any>;

declare global {
  var _mongoClientPromise: Promise<any>;
}

if (!MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export function closeConnection() {
  client.close();
}

export async function getCollection(names: string[]) {
  // return multiple collections
  const client = await clientPromise;
  const db = client.db();
  return names.map(name => db.collection(name));
}

export default clientPromise;
