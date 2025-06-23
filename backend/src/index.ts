import dotenv from "dotenv"
import express, { Express, Request, Response } from "express"
import cors from "cors"
import connectDB from "./config/database"
import articleRoutes from "./api/article.routes";

dotenv.config()

// Connect to MongoDB
connectDB()

const app: Express = express();
const port = process.env.PORT || 8000;


//Middleware
app.use(cors()); // Enable cors for all routes
app.use(express.json()); //Allow the server to accepot JSON

// API Routes
 app.use("/api/articles", articleRoutes);


// A simple test route
app.get("/", (req: Request, res: Response) => {
  res.send("News Aggregator API is running")
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
});