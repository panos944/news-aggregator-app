import type { Article } from "../types/news";
import LatestNewsItem from "./LatestNewsItem";

interface LatestNewsFeedProps {
  articles: Article[];
}

const LatestNewsFeed = ({ articles }: LatestNewsFeedProps) => {
  return (
    <section className="bg-white">
      {/* Blog-style section title */}
      <div className="text-center mb-16">
        <h2 className="ny-serif-bold text-3xl md:text-4xl ny-text-primary mb-4">
          Latest Stories
        </h2>
        <div className="w-24 h-px bg-gray-300 mx-auto"></div>
      </div>
      
      {/* Blog-style layout - Single column for better readability */}
      <div className="max-w-4xl mx-auto space-y-12">
        {articles.map((article, index) => (
          <article key={article.id || article.url} className="group">
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Image - Always on the left */}
                <div className="overflow-hidden">
                  <img 
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-80 md:h-72 object-cover object-top transition-transform duration-500 group-hover:scale-[1.01] rounded-lg"
                  />
                </div>
                
                {/* Content - Always on the right */}
                <div className="space-y-4">
                  {/* Meta Information */}
                  <div className="flex items-center gap-3">
                    <span className="ny-sans-medium text-xs ny-text-red uppercase tracking-widest">
                      {article.source}
                    </span>
                    <span className="ny-text-muted">•</span>
                    <time className="ny-sans text-xs ny-text-muted">
                      {new Date(article.publishedAt).toLocaleDateString('en-US', { 
                        month: 'long', 
                        day: 'numeric', 
                        year: 'numeric' 
                      })}
                    </time>
                  </div>

                  {/* Title */}
                  <h3 className="ny-serif-bold text-2xl md:text-3xl leading-tight ny-text-primary group-hover:ny-text-secondary transition-colors">
                    {article.title}
                  </h3>

                  {/* Description */}
                  <p className="ny-lora text-base leading-relaxed ny-text-secondary">
                    {article.description?.slice(0, 150)}...
                  </p>
                  
                  {/* Read more indicator */}
                  <div className="ny-sans-medium text-sm ny-text-red group-hover:underline">
                    Read More →
                  </div>
                </div>
              </div>
            </a>
            
            {/* Separator line between articles */}
            {index < articles.length - 1 && (
              <div className="border-b border-gray-200 mt-12"></div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default LatestNewsFeed;