import { fromRssItemToDto, fromRealPlayerProgramToDto } from "../dtos/article.dto";
import { IArticle } from "../models/Article";
import { ArticleRepository } from "../repositories/article.repository";
import { SourceRepository } from "../repositories/source.repository";
import { RssService } from "./rss.service";
import { realPlayerService } from "./realPlayer.service";

class ArticleService {
    // The service depends on all three components
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly sourceRepository: SourceRepository,
    private readonly rssService: RssService
  ) {}

  // Find latest articles
  public async getLatestArticles(): Promise<IArticle[]> {
    return this.articleRepository.findLatest()
  }

  // First articles by source
  public async getArticlesBySource(sourceName:string): Promise<IArticle[]> {
    return this.articleRepository.findBySource(sourceName)
  }

    // Find all articles regardless
  public async getArticlesByAllSources(limitPerSource: number = 4): Promise<{ [key: string]: IArticle[] }> {
    const sources = await this.sourceRepository.findAll();
    
    const result: { [key: string]: IArticle[] } = {};
    
    for (const source of sources) {
      const articles = await this.articleRepository.findBySource(source.name);
      
      if (articles.length > 0) {
        result[source.name] = articles.slice(0, limitPerSource);
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
      
      // Special handling for Real Player
      if (source.name === "Real Player") {
        await this.handleRealPlayerFetch(source.name);
        continue;
      }
      
      // Standard RSS processing for other sources
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

  private async handleRealPlayerFetch(sourceName: string): Promise<void> {
    try {
      // Get recent Real Player programs instead of RSS feed
      const programs = await realPlayerService.getRecentPrograms();
      
      if (programs.length > 0) {
        await this.articleRepository.addMany(programs);
        console.log(`Saved ${programs.length} new articles from ${sourceName} (manual schedule)`);
      } else {
        console.log(`No scheduled programs found for ${sourceName}`);
      }
    } catch (error) {
      console.error(`Error fetching Real Player programs:`, error);
    }
  }
}

export const articleService = new ArticleService(
  new ArticleRepository(),
  new SourceRepository(),
  new RssService()
)
