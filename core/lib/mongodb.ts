import { MongoClient } from "mongodb";
import { MONGODB_URI } from "./constant";

const uri = MONGODB_URI;
const options = {};

let client;
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

export default clientPromise;
