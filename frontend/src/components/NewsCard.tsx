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
        {/* Large Featured Image */}
        <div className="mb-6 overflow-hidden">
          <img 
            src={article.imageUrl} 
            alt={article.title}
            className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.02] ${
              hero 
                ? "aspect-[16/10]" 
                : "aspect-[4/3]"
            }`}
          />
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          {/* Elegant Serif Headline */}
          <h3 className={`font-serif font-semibold leading-tight text-black group-hover:opacity-70 transition-opacity duration-300 line-clamp-2 ${
            hero ? "text-2xl" : "text-xl"
          }`}>
            {article.title}
          </h3>

          {/* Body Text */}
          <p className="text-base leading-relaxed text-gray-700 line-clamp-3">
            {truncateText(article.description, descriptionMaxLength)}
          </p>

          {/* Meta Information */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                {article.source}
              </span>
              <span className="text-gray-300">•</span>
              <time className="text-sm text-gray-500 font-serif">
                {formatDate(article.publishedAt)}
              </time>
            </div>
            <span className="text-sm text-gray-400 font-serif">
              {estimateReadingTime(article.description)} min read
            </span>
          </div>
        </div>
      </a>
    </article>
  );
};

export default NewsCard;