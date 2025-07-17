import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/database";
import articleRoutes from "./api/article.routes";
import cron from "node-cron";
import { articleService } from "./services/articlesServices";
import authRoutes from "./api/auth.routes"

dotenv.config();

// Connect to MongoDB
connectDB();

const app: Express = express();
const port = process.env.PORT || 8000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes - Mount the article routes
app.use("/api/articles", articleRoutes);
app.use("/api/auth", authRoutes)

// Test route
app.get("/", (req: Request, res: Response) => {
  res.send("News Aggregator API is running");
});

// Cron job (optional - can be disabled for testing)
cron.schedule('0 * * * *', async () => {
  console.log('Running scheduled job: fetching articles...');
  try {
    await articleService.fetchAndSaveFromAllSources();
    console.log('Scheduled job finished successfully.');
  } catch (error) {
    console.error('Error during scheduled article fetch:', error);
  }
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});