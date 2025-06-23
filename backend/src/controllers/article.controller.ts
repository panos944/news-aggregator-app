import { Request, Response } from "express";
import { articleService } from "../services/articlesServices";

export const getArticlesBySource = async(req: Request, res: Response) => {
   try {
     const {sourceName} = req.params;
     if (!sourceName) {
        return;
        // return res.status(400).json({message: "Source name is required"});
     }
        
    const articles = await articleService.getArticlesBySource(sourceName);
     res.status(200).json(articles);
    } catch (error){
        res.status(500).json({message: "Error fetching articles", error})
    }
};
