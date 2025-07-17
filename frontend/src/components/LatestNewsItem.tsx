import type { Article } from "../types/news";

interface LatestNewsItemProps {
  article: Article;
}

const LatestNewsItem = ({ article }: LatestNewsItemProps) => {

  // Reduce the description text for each news item to max 150 words
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "..."
  };

  return (
    <div className="rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <a href={article.url} target="_blank" rel="noopener noreferrer" className="flex h-64">
        <div className="flex-shrink-0 w-100">
          <img 
            className="w-full h-full object-cover"
            src={article.imageUrl} 
            alt={article.title}
          />
        </div>
        <div className="p-4 flex flex-col justify-between flex-grow">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 hover:text-blue-600 transition-colors">
              {article.title}
            </h3>
            <p className="text-gray-700 text-base mb-4">
              {truncateText(article.description)}
            </p>
          </div>
          <div className="flex items-center gap-x-4 text-sm mt-4 flex-shrink-0">
            <span className="py-1 px-3 rounded-md text-xs font-bold">
              {article.source}
            </span>
            <span className="text-gray-500 font-medium">
            {new Date(article.publishedAt).toLocaleDateString('el-GR', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
            </span>
          </div>
        </div>
      </a>
    </div>
  );
};

export default LatestNewsItem;