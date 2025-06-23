import { Router } from "express";
import { getArticlesBySource } from "../controllers/article.controller";

const articleRoutes = Router();

articleRoutes.get("/:sourceName", getArticlesBySource)

export default articleRoutes;