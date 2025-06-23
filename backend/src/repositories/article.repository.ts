import Article, { IArticle } from "../models/Article";

export class ArticleRepository {
    public async addMany(articles: Partial<IArticle>[]): Promise<void>{
        try {
            // Allow operation to continue even if error duplicate as is checked in url unique
            await Article.insertMany(articles, { ordered: false})
        } catch (error:any) {
            if (error.code !== 11000) {
                console.error("Error saving articles in database", error);
                throw error;
            }
        }
    }

    public async findbySource(sourceName: string): Promise<IArticle[]> {
        // Returns articles by source and sort by pub date
        return Article.find({source: sourceName}).sort({publishedAt: -1}).exec()
    }
}