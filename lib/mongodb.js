import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;
console.log(MONGODB_URI)

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable in your .env.local file");
}

// Global cache to ensure a single connection in serverless environments like Vercel.
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // Return the cached connection if available.
  if (cached.conn) return cached.conn;

  // Create a new promise if not already cached.
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise; // Await the connection.
  return cached.conn;
}

export default dbConnect;
