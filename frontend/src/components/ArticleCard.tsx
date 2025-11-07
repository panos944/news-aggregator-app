import React from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Clock } from 'lucide-react';
import type { Article } from '../types/news';
import { cn } from '@/lib/utils';

interface ArticleCardProps {
  article: Article;
  variant?: 'hero' | 'featured' | 'standard';
  className?: string;
}

const ArticleCard = ({ article, variant = 'standard', className }: ArticleCardProps) => {
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + '...';
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.RelativeTimeFormat('el', { numeric: 'auto' }).format(
      Math.ceil((date.getTime() - Date.now()) / (1000 * 60 * 60 * 24)),
      'day'
    );
  };

  const getSourceColor = (source: string) => {
    const colors = {
      'Real.gr': 'bg-blue-100 text-blue-800 border-blue-200',
      'Instyle': 'bg-pink-100 text-pink-800 border-pink-200',
      'Real Kiosk': 'bg-green-100 text-green-800 border-green-200',
      'The Cars': 'bg-orange-100 text-orange-800 border-orange-200',
      'Real Player': 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[source as keyof typeof colors] || 'bg-neutral-100 text-neutral-800 border-neutral-200';
  };

  const cardVariants = {
    hero: {
      container: 'group cursor-pointer',
      card: 'overflow-hidden border border-real-gray-200 shadow-modern-lg hover:shadow-modern-xl transition-all duration-300',
      imageWrapper: 'relative overflow-hidden aspect-[16/9] lg:aspect-[21/9]',
      image: 'w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-105',
      content: 'p-8 lg:p-12',
      title: 'ny-serif-bold text-4xl lg:text-5xl ny-text-primary mb-6 line-clamp-2',
      description: 'ny-lora text-xl leading-relaxed ny-text-secondary mb-8 line-clamp-3',
      meta: 'flex items-center justify-between',
    },
    featured: {
      container: 'group cursor-pointer',
      card: 'overflow-hidden border border-real-gray-200 hover:shadow-modern-lg transition-all duration-300',
      imageWrapper: 'relative overflow-hidden aspect-[4/3]',
      image: 'w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-105',
      content: 'p-6',
      title: 'ny-serif-bold text-4xl ny-text-primary mb-4 line-clamp-2',
      description: 'ny-lora text-xl leading-relaxed ny-text-secondary mb-6 line-clamp-2',
      meta: 'flex items-center justify-between',
    },
    standard: {
      container: 'group cursor-pointer',
      card: 'overflow-hidden border border-real-gray-200 hover:shadow-modern transition-all duration-300',
      imageWrapper: 'relative overflow-hidden aspect-[4/3]',
      image: 'w-full h-full object-cover object-top transition-all duration-300 group-hover:scale-105',
      content: 'p-6',
      title: 'ny-serif-bold text-4xl ny-text-primary mb-3 line-clamp-2',
      description: 'ny-lora text-xl leading-relaxed ny-text-secondary mb-4 line-clamp-2',
      meta: 'flex items-center justify-between',
    },
  };

  const styles = cardVariants[variant];
  const maxDescLength = variant === 'hero' ? 200 : variant === 'featured' ? 120 : 80;

  return (
    <article className={cn(styles.container, className)}>
      <Card className={styles.card}>
        <div className={styles.imageWrapper}>
          {article.imageUrl && (
            <img
              src={article.imageUrl}
              alt={article.title}
              className={styles.image}
              loading={variant === 'hero' ? 'eager' : 'lazy'}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
        </div>
        
        <CardContent className={styles.content}>
          <h2 className={styles.title}>
            <a 
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-real-accent transition-all duration-300"
            >
              {article.title}
            </a>
          </h2>
          
          <p className={styles.description}>
            {truncateText(article.description, maxDescLength)}
          </p>
          
          <div className={styles.meta}>
            <Badge 
              variant="outline" 
              className={cn("ny-sans-medium text-xs uppercase tracking-widest", getSourceColor(article.source))}
            >
              {article.source}
            </Badge>
            
            <div className="flex items-center ny-sans text-sm ny-text-muted">
              <Clock className="h-4 w-4 mr-2" />
              <time dateTime={article.publishedAt}>
                {formatDate(article.publishedAt)}
              </time>
            </div>
          </div>
        </CardContent>
      </Card>
    </article>
  );
};

export default ArticleCard;