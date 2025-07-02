import type { Article } from "../types/news";

interface NewsCardProps {
  article: Article;
}

const NewsCard = ({article}: NewsCardProps) => {

    // Reduce the description text for each news item to max 150 words
    const truncateText = (text: string, maxLength: number = 150) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + "..."
    };

  return (
    <>
      <div className="rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col">
        <a href={article.url} target="_blank" rel="noopener noreferer" className="flex flex-col flex-grow">
        <img 
        className="w-full h-48 object-cover group-data-[size=large]:h-96 transition-all duration-300" 
        src={article.imageUrl} 
        alt={article.title}/>
        <div className="py-4 flex-grow">
          <h3 className="text-lg font-bold text-grey-800 mb-2">{article.title}</h3>
          <p className="text-grey-800 text-sm">{truncateText(article.description)}</p>
        </div>
        </a>
      </div>
    </>
  )
}

export default NewsCard;