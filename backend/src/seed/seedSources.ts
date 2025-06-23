import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/database";
import Source, {ISource} from "../models/Source";

dotenv.config({path: "../.env"});

const sources: Partial<ISource>[] = [
    // rss to be inputed later 
    {name: "Real.gr", rssUrl: ""},
    {name: "Instyle", rssUrl: ""},
    {name: "Ολο Υγεία", rssUrl: ""},
    {name: "The Cars", rssUrl: ""},
    {name: "Real Player", rssUrl: ""},
]

const seedDB = async () => {
    await connectDB()

    try {
        await Source.deleteMany({});
        console.log("Previous sources deleted")

        await Source.insertMany(sources);
        console.log("Sources seeded succesfully")

    } catch(error) {
        console.error("Error seeding sources:", error)
    } finally {
        mongoose.connection.close();
    }
};

seedDB();