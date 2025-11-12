import mongoose from 'mongoose';
import "dotenv/config";

export const connectDB = async () => {
  try {
    console.log("connecting to mongodb...");
    await mongoose.connect(process.env.NODE_ENV === "prod" ? process.env.MONGODB_URI : process.env.LOCAL_URI)
    console.log(">>> connected to mongodb");
  } catch (err) {
    console.error("error connecting to mongodb: ", err);
    process.exit(1);
  }
}