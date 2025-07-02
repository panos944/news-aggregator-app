import { Request, Response } from "express";
import Article from "../models/Article";
import { articleService } from "../services/articlesServices";

export const getLatestArticles = async (_req: Request, res: Response) => {
  try {
    const articles = await Article.find({})
      .sort({ publishedAt: -1 })
      .limit(20)
      .exec();
    
    res.status(200).json(articles);
  } catch (error) {
    console.error("Controller: Error fetching articles:", error);
    res.status(500).json({ message: "Error fetching latest articles", error });
  }
};

export const getArticlesBySource = async (req: Request, res: Response) => {
  try {
    const { sourceName } = req.params;
    if (!sourceName) {
      res.status(400).json({ message: "Source name is required" });
      return;
    }

    const articles = await Article.find({ source: sourceName })
      .sort({ publishedAt: -1 })
      .exec();
    
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: "Error fetching articles", error });
  }
};

export const getArticlesByAllSources = async (_req: Request, res: Response) => {
  try {
    const articlesBySource = await articleService.getArticlesByAllSources();
    res.status(200).json(articlesBySource);
  } catch (error) {
    console.error("Controller: Error fetching articles by sources:", error);
    res.status(500).json({ message: "Error fetching articles by sources", error });
  }
};