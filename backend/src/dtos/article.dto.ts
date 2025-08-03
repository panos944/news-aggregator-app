// Data structure needed for new article
export type CreateArticleDto = {
    title: string;
    url: string;
    source: string;
    publishedAt: Date;
    description: string;
    imageUrl: string;
};

// Mapping of raw item from RSS to the DTO structure as above
export const fromRssItemToDto = (item: any, sourceName: string): CreateArticleDto => {
    // Trying multiple ways to extract image URL from RSS feeds
    let imageUrl = "https://via.placeholder.com/600x400?text=No+Image"; // Default placeholder

     // Method 1: Check mapped media content
     if (item.mediaContent) {
        const mediaContent = Array.isArray(item.mediaContent) ? item.mediaContent[0] : item.mediaContent;
        if (mediaContent && mediaContent.$ && mediaContent.$.url) {
            imageUrl = mediaContent.$.url;
        }
    }
  
    // Method 2: Check enclosure (common for media files)
    if (item.enclosure && item.enclosure.url) {
        imageUrl = item.enclosure.url;
    }

    // Method 3: Check media:thumbnail
    else if (item['media:thumbnail'] && item['media:thumbnail']['$'] && item['media:thumbnail']['$'].url) {
        imageUrl = item['media:thumbnail']['$'].url;
    }

    // Method 4: Extract from content field (since it exists)
    else if (item.content) {
        const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/i);
        if (imgMatch && imgMatch[1]) {
            imageUrl = imgMatch[1];
        }
    }

    // Method 5: Extract from description HTML
    else if (item.description) {
        const patterns = [
            /<img[^>]+src="([^">]+)"/i,
            /<img[^>]+src='([^'>]+)'/i,
            /src="([^"]*\.(?:jpg|jpeg|png|gif|webp)[^"]*)"]/i,
        ];
        
        for (const pattern of patterns) {
            const match = item.description.match(pattern);
            if (match && match[1] && !match[1].includes('data:')) {
                imageUrl = match[1];
                break;
            }
        }
    }

    // Method 6: Check for image in various other fields
    else if (item.image) {
        imageUrl = typeof item.image === 'string' ? item.image : item.image.url;
    }

    // Method 7: Check content:encoded (WordPress often uses this)
    else if (item['content:encoded']) {
        const imgMatch = item['content:encoded'].match(/<img[^>]+src="([^">]+)"/i);
        if (imgMatch && imgMatch[1] && !imgMatch[1].includes('data:')) {
            imageUrl = imgMatch[1];
        }
    }

    if (imageUrl === "https://via.placeholder.com/600x400?text=No+Image") {
        if (sourceName === "Real.gr") {
            imageUrl = "https://via.placeholder.com/600x400/1e40af/ffffff?text=Real.gr";
        }
    }
  
    return {
        title: item.title,
        url: item.link,
        source: sourceName,
        publishedAt: new Date(item.pubDate),
        description: item.contentSnippet || item['content:encodedSnippet'] || '',
        imageUrl: imageUrl,
    };
  };

import { IRealPlayerProgram } from "../models/RealPlayerProgram";
import { IArticle } from "../models/Article";

export function fromRealPlayerProgramToDto(program: IRealPlayerProgram): Partial<IArticle> {
  return {
    title: program.title,
    description: program.description,
    imageUrl: program.imageUrl || "https://player.real.gr/wp-content/uploads/2024/06/Logo-e1718700920635.png",
    source: "Real Player",
    url: program.url || "https://player.real.gr",
    publishedAt: program.startTime
  };
}