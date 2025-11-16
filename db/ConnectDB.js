import mongoose from "mongoose";

let cached = global.mongoose;

  if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
  }
const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`mongodb://localhost:27017/ai-agent`, {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: {conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
}

export default connectDB