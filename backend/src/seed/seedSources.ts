import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../config/database";
import Source, {ISource} from "../models/Source";

dotenv.config();

const sources: Partial<ISource>[] = [
    {name: "Real.gr", rssUrl: "https://www.real.gr/teleutaies_eidiseis/feed/"},
    {name: "Instyle", rssUrl: "https://www.instyle.gr/feed/"},
    {name: "Real Kiosk", rssUrl: "https://placeholder-rss-feed.com/realkiosk/feed/"},
    {name: "The Cars", rssUrl: "https://www.thecars.gr/feed/"},
    {name: "Real Player", rssUrl: "https://radioshows.real.gr/TOC.xml"},
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