import type { Article } from "../types/news";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard = ({ article }: ArticleCardProps) => {

  // Reduce the description text for each news item to max 150 words
  const truncateText = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength).trim() + "..."
  };

  return (
    <div className="border rounded-lg p-4 shadow-sm flex flex-col h-full">
      {article.imageUrl && (
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      )}
      <div className="flex-grow">
        <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
        <p className="text-gray-600 mb-4">{truncateText(article.description)}</p>
      </div>
      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline mt-auto"
      >
        Read more
      </a>
    </div>
  );
};

export default ArticleCard;