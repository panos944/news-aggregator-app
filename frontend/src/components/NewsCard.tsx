import type { Article } from "../types/news";

interface NewsCardProps {
  article: Article;
  hero?: boolean;
}

const NewsCard = ({ article, hero }: NewsCardProps) => {
  // Reduce the description text to 1-2 lines maximum
  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "...";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const estimateReadingTime = (text: string) => {
    const wordsPerMinute = 200;
    const wordCount = text.split(' ').length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };

  const descriptionMaxLength = hero ? 120 : 100;

  return (
    <article className="group">
      <a 
        href={article.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="block"
      >
        {/* Large Featured Image - Increased width and height */}
        <div className="mb-6 overflow-hidden rounded-lg">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className={`w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01] ${
              hero 
                ? "h-80 md:h-96" 
                : "h-64 md:h-80"
            }`}
          />
        </div>

        {/* Content Section */}
        <div className="space-y-4">
          {/* Meta Information - Top placement like New Yorker */}
          <div className="flex items-center gap-3">
            <span className="ny-sans-medium text-xs ny-text-red uppercase tracking-widest">
              {article.source}
            </span>
            <span className="ny-text-muted">•</span>
            <time className="ny-sans text-xs ny-text-muted">
              {formatDate(article.publishedAt)}
            </time>
          </div>

          {/* Elegant Serif Headline */}
          <h3 className={`ny-serif-bold leading-tight ny-text-primary group-hover:ny-text-secondary transition-colors line-clamp-3 ${
            hero ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"
          }`}>
            {article.title}
          </h3>

          {/* Body Text */}
          <p className="ny-lora text-base leading-relaxed ny-text-secondary line-clamp-2">
            {truncateText(article.description, descriptionMaxLength)}
          </p>
        </div>
      </a>
    </article>
  );
};

export default NewsCard;