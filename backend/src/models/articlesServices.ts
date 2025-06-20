import Article, {IArticle} from "./Article";

// Saves multiple articles to the database. It checks for uniqueness based on the 'link' field 
// to prevent creating duplicate entries
export const addArticles = async (articles: Partial<IArticle>[]): Promise<void> => {
  try {
    await Article.insertMany(articles, {ordered: false})
  } catch (error:any) {
    if (error.code !== 11000) {

      // exprect a "duplicate key error"
      console.error("Error saving articles in database", error)
    }
  }
}

// Retrieves articles for a specific source, sorted by publication date
export const getArticlesBySource = async (sourceName: string): Promise<IArticle[]> => {
  return Article.find({source: sourceName}).sort({putDate: -1}).exec();
};
