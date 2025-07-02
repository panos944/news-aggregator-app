import dotenv from "dotenv";
import connectDB from "../config/database";
import { articleService } from "../services/articlesServices";
import mongoose from "mongoose";

dotenv.config()

// Script manually triggers fetchAndSaveFromAllSources service method
const runFetcher = async () => {
    await connectDB()
    console.log("Starting manual article fetch")

    try {
        await articleService.fetchAndSaveFromAllSources();
        console.log("Manual article fetch succesfully completed")
    } catch (error) {
        console.error("An error occured during the manual fetch", error)
    } finally {
        await mongoose.connection.close();
        console.log("Databse connection closed")
    }
}

runFetcher();