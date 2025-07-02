import Parser from "rss-parser"

// Define a type for the items we expect from the RSS feed for better type safety.
type RssItem = {
  title: string;
  link: string;
  pubDate: string;
  "content:encodedSnippet": string;
  creator: string;
  imageUrl?: string;
  mediaContent?: any;
  mediaThumbnail?: any;
  "content:encoded"?: string;
};

customFields: {
  item: [
      'media:content',
      'media:thumbnail',
      'media:group',
      'content:encoded',
      ['media:content', '$'] 
  ]
}

export class RssService {
  private parser: Parser<{}, RssItem>;

  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['media:content', 'mediaContent'],  // Map media:content to mediaContent
          ['media:thumbnail', 'mediaThumbnail'],
          'content:encoded'
        ]
      }
    });
  }

  public async fetchFeed(feedUrl: string) {
    try {
      const feed = await this.parser.parseURL(feedUrl);
      // Returns the items from the feed, which will be articles.
      return feed.items
    } catch (error) {
      console.error(`Error fetching RSS feed from ${feedUrl}:`, error);
      // Return an empty array if a feed fails so it doesn't stop the whole process.
      return [];
    }
  }
}
