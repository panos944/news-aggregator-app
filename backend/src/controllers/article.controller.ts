import { Request, Response } from "express";
import Article from "../models/Article";
import { articleService } from "../services/articlesServices";
import { skip } from "node:test";

export const getLatestArticles = async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 60, 100);

    const articles = await Article.find({})
      .sort({ publishedAt: -1 })
      .limit(limit) // Use the limit variable, not hardcoded 20
      .exec();
    
    res.status(200).json(articles);
  } catch (error) {
    console.error("Controller: Error fetching articles:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching latest articles", 
      error 
    });
  }
};

export const getArticlesBySource = async (req: Request, res: Response) => {
  try {
    const { sourceName } = req.params;
    if (!sourceName) {
      res.status(400).json({ message: "Source name is required" });
      return;
    };

    // Getting limit and page from query parameters
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 100);
    const page = Math.max(parseInt(req.query.page as string) || 1, 1);
    const skip = (page - 1) * limit;

    const articles = await Article.find({ source: sourceName })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .skip(skip)
      .exec();
    
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({
      success:false,
      message: "Error fetching articles", 
      error 
      });
  }
};


export const getArticlesByAllSources = async (req: Request, res: Response) => {
  try {
    const limitPerSource = 4
  
    const articlesBySource = await articleService.getArticlesByAllSources(limitPerSource);
    res.status(200).json(articlesBySource);
  } catch (error) {
    console.error("Controller: Error fetching articles by sources:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching articles by sources", 
      error 
    });
  }
};