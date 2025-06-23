import Parser from "rss-parser"

type RssItem = {
    title: string;
    link: string;
    pubDate: string;
    "content:encodedSnippet": string;
    creator: string;
    imageUrl?: string; 
};

export class RssService {
  private parser: Parser<{}, RssItem>;

  constructor() {
    this.parser = new Parser<{}, RssItem>({
     customFields: {
        item: [],
       }
     })
   }

   public async fetchFeed(feedUrl: string) {
    try {
      const feed = await this.parser.parseURL(feedUrl);
      return feed.items
    } catch (error) {
      console.error(`Error fetching RSS feed from ${feedUrl}:`, error);
      return [];
    }
   }

}
