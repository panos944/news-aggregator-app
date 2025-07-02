import Article, { IArticle } from "../models/Article";

export class ArticleRepository {
    public async addMany(articles: Partial<IArticle>[]): Promise<void> {
        for (const article of articles) {
            try {
                await Article.findOneAndUpdate(
                    { url: article.url },
                    article,
                    { upsert: true }
                );
            } catch (error: any) {
                console.error(`ERROR SAVING ARTICLE: "${article.title}"`);
                console.error(JSON.stringify(error, null, 2));
            }
        }
    }

    public async findLatest(limit: number = 50): Promise<IArticle[]> {
        const foundArticles = await Article.find({})
            .sort({publishedAt: -1}) // Sort by newest first
            .limit(limit) // Limit to 20
            .exec();
        return foundArticles;
    };

    public async findBySource(sourceName: string): Promise<IArticle[]> {
        // Returns articles by source and sort by pub date
        return Article.find({source: sourceName}).sort({publishedAt: -1}).exec()
    };
};