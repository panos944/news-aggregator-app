import { IArticle } from "../models/Article";
import { ArticleRepository } from "../repositories/article.repository";

class ArticleService {
  constructor(private readonly articleRepository: ArticleRepository) {}

  public async addArticles(articles: Partial<IArticle>[]): Promise<void> {
    // Passes the data to the repository.
    return this.articleRepository.addMany(articles);
  }

  public async getArticlesBySource(sourceName: string): Promise<IArticle[]> {
    // Business logic could involve checking cache, validating sourceName, etc.
    return this.articleRepository.findbySource(sourceName);
  }
}

// Export a singleton instance of the service with the repository injected
export const articleService = new ArticleService(new ArticleRepository());
