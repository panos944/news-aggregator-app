import { fromRssItemToDto } from "../dtos/article.dto";
import { IArticle } from "../models/Article";
import { ArticleRepository } from "../repositories/article.repository";
import { SourceRepository } from "../repositories/source.repository";
import { RssService } from "./rss.service";

class ArticleService {
  constructor(
    private readonly articleRepository: ArticleRepository,
    private readonly sourceRepository: SourceRepository,
    private readonly rssService: RssService
  ) {}

  public async getArticlesBySource(sourceName:string): Promise<IArticle[]> {
    return this.articleRepository.findbySource(sourceName)
  }

  public async fetchAndSaveFromAllSources(): Promise<void> {
    console.log("Fetching articles from sources")
    const sources = await this.sourceRepository.findAll()

    for (const source of sources){
      console.log(`Fetching articles for ${source.name}`);
      const rssItems = await this.rssService.fetchFeed(source.rssUrl)
      
      if (rssItems.length > 0) {
        const articlesToSave = rssItems.map(item => fromRssItemToDto(item, source.name))
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
