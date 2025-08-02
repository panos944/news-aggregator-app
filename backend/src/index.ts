import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import cors from "cors";
import connectDB from "./config/database";
import articleRoutes from "./api/article.routes";
import cron from "node-cron";
import { articleService } from "./services/articlesServices";
import authRoutes from "./api/auth.routes"
import swaggerUI from "swagger-ui-express"
import { swaggerSpec } from "./config/swagger";
import { InitializationService } from "../src/services/initialisation.service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;

// Swagger Documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec, {
  explorer: true,
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'News Aggregator API Documentation'
}));

// CORS configuration
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  optionsSuccessStatus: 200
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// API Routes
app.use("/api/articles", articleRoutes);
app.use("/api/auth", authRoutes)

// Health check route
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "News Aggregator API is running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Auto-initialization on startup
const initializeApp = async () => {
  try {
    // Connect to database
    await connectDB();
    
    // Auto-initialize application (sources, etc.)
    await InitializationService.initializeApplication();
    
    // Initial article fetch
    console.log('Starting initial article fetch...');
    await articleService.fetchAndSaveFromAllSources();
    console.log('Initial article fetch completed');
    
    console.log('Application ready to serve requests!');
    
  } catch (error) {
    console.error('Failed to initialize application:', error);
    process.exit(1); // Exit if initialization fails
  }
};

// Automatic RSS updates every 30 minutes
cron.schedule('*/30 * * * *', async () => {
  console.log('Running scheduled article update...');
  try {
    await articleService.fetchAndSaveFromAllSources();
    console.log('Scheduled update completed');
  } catch (error) {
    console.error('Scheduled update failed:', error);
  }
});

// Start server
app.listen(port, async () => {
  console.log(`Server starting on http://localhost:${port}`);
  console.log(`API Docs: http://localhost:${port}/api-docs`);
  console.log(`Auto-updates: Every 30 minutes`);
  
  // Initialize application after server starts
  await initializeApp();
});