import { Router } from "express";
import { getArticlesBySource, getLatestArticles, getArticlesByAllSources } from "../controllers/article.controller";

const router = Router();

// IMPORTANT: Specific routes must come BEFORE parameterized routes
router.get("/latest", getLatestArticles);
router.get("/by-sources", getArticlesByAllSources); 
router.get("/:sourceName", getArticlesBySource);

export default router;