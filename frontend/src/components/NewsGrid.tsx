import React from 'react';
import ArticleCard from './ArticleCard';
import type { Article } from '../types/news';
import { cn } from '@/lib/utils';

interface NewsGridProps {
  articles: Article[];
  className?: string;
}

const NewsGrid = ({ articles, className }: NewsGridProps) => {
  if (!articles || articles.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="ny-lora text-xl leading-relaxed ny-text-muted">No articles available.</p>
      </div>
    );
  }

  const [heroArticle, ...remainingArticles] = articles;
  const featuredArticles = remainingArticles.slice(0, 2);
  const standardArticles = remainingArticles.slice(2);

  return (
    <div className={cn("max-w-container mx-auto px-6", className)}>
      <div className="space-y-12">
        {/* Hero Article - Full Width */}
        {heroArticle && (
          <section className="max-w-reading mx-auto">
            <ArticleCard article={heroArticle} variant="hero" />
          </section>
        )}

        {/* Featured Articles - 2 Column Grid */}
        {featuredArticles.length > 0 && (
          <section>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  variant="featured" 
                />
              ))}
            </div>
          </section>
        )}

        {/* Standard Articles - 3 Column Grid */}
        {standardArticles.length > 0 && (
          <section>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {standardArticles.map((article) => (
                <ArticleCard 
                  key={article.id} 
                  article={article} 
                  variant="standard" 
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default NewsGrid;