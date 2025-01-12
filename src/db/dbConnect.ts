import mongoose, { Connection } from 'mongoose';
import "@/db/Model/authorSchema";
import "@/db/Model/articleSchema"; 

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

interface Cached {
  conn: Connection | null; 
  promise: Promise<Connection> | null;
}

// Add global type declaration for TypeScript compatibility
declare global {
  // Use 'var' for global scope in Node.js
  var mongoose: Cached; // eslint-disable-line no-var
}

let cached: Cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI!).then(()=> {
      return mongoose.connection;
    });
  }
  cached.conn = await cached.promise;
  console.log('Connected to MongoDB (cache)', cached.conn.models);
  return cached.conn;
}

export default dbConnect;
