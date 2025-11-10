import mongoose from "mongoose";

let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
const connectDB = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  
  cached.promise = mongoose.connect(process.env.MONGODB_URI, {
    dbName: "ai-agent",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  cached.conn = await cached.promise;
  return cached.conn
}

export default connectDB