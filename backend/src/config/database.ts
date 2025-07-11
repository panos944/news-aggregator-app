import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config();

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI;
    if (!mongoURI) {
      console.error("MONGO_URI is not defined in the .env file");
      process.exit(1)
    }

    console.log("Connecting to DB defined by MONGO_URI...")

    await mongoose.connect(mongoURI)
    console.log("MongoDB connected...")
  } catch (err:any) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB;