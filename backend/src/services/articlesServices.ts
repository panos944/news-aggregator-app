import { fromRssItemToDto } from "../dtos/article.dto";
import { IArticle } from "../models/Article";
import { ArticleRepository } from "../repositories/article.repository";
import { SourceRepository } from "../repositories/source.repository";
import { RssService } from "./rss.service";

class ArticleService {
    // The service depends on all three components
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly sourceRepository: SourceRepository,
    private readonly rssService: RssService
  ) {}

  public async getLatestArticles(): Promise<IArticle[]> {
    return this.articleRepository.findLatest()
  }

  public async getArticlesBySource(sourceName:string): Promise<IArticle[]> {
    return this.articleRepository.findBySource(sourceName)
  }

  public async getArticlesByAllSources(): Promise<{ [key: string]: IArticle[] }> {
    const sources = await this.sourceRepository.findAll();
    
    const result: { [key: string]: IArticle[] } = {};
    
    for (const source of sources) {
      const articles = await this.articleRepository.findBySource(source.name);
      
      if (articles.length > 0) {
        result[source.name] = articles.slice(0, 4);
      }
    }
      return result;
  }

    // Method that orchestrates the fetching process
  public async fetchAndSaveFromAllSources(): Promise<void> {
    console.log("Fetching articles from sources")
    const sources = await this.sourceRepository.findAll()

    for (const source of sources){
      console.log(`Fetching articles for ${source.name}`);
      const rssItems = await this.rssService.fetchFeed(source.rssUrl)
      
      if (rssItems.length > 0) {
      // Map the raw RSS items to the Article DTO
        const articlesToSave = rssItems.map(item => fromRssItemToDto(item, source.name))
         // Save the new articles to the database
         await this.articleRepository.addMany(articlesToSave);
        console.log(`Saved ${articlesToSave.length} new articles from ${source.name}`)
      }
    }
    console.log("Fetching completed")
  }
}

export const articleService = new ArticleService(
  new ArticleRepository(),
  new SourceRepository(),
  new RssService()
)
