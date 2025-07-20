import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error("MONGO_URI is not defined in environment variables");
      throw new Error("Database connection string missing");
    }

    console.log("Connecting to MongoDB...");

    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");
    
  } catch (err: any) {
    console.error("Database connection failed:", err.message);
    throw err; // Re-throw to let caller handle
  }
}

export default connectDB;