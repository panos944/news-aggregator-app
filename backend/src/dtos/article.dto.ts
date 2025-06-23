// Data structure needed for new article
export type CreateArticleDto = {
    title: string;
    url: string;
    source: string;
    publishedAt: Date;
    description: string;
    imageUrl: string;
};

// Mapping of raw item from RSS to DTO
export const fromRssItemToDto = (item:any, sourceName: string): CreateArticleDto => {
    const imageUrl = item.enclosure?.url || "default_image_url_placeholder.jpg" // Placeholder

    return {
        title: item.title,
        url: item.link,
        source: sourceName,
        publishedAt: new Date(item.pubDate),
        description: item.contentSnippet || item['content:encodedSnippet'] || '',
        imageUrl: imageUrl,
    };
};