import type { Article } from "../types/news";

interface NewsCardProps {
  article: Article;
  hero?: boolean;
}

const NewsCard = ({article, hero}: NewsCardProps) => {

    // Reduce the description text for each news item to max 150 words
    const truncateText = (text: string, maxLength: number = 150) => {
      if (text.length <= maxLength) return text;
      return text.substring(0, maxLength).trim() + "..."
    };

    const descriptionMaxLength = hero ? 320 : 150;

  return (
    <>
      <div className={`rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col ${hero ? "bg-white" : ""}`}>
        <a href={article.url} target="_blank" rel="noopener noreferer" className="flex flex-col flex-grow h-full">
          <div className={hero ? "flex-1 h-full w-full" : ""} style={hero ? { minHeight: 0 } : {}}>
            <img 
              className={hero 
                ? "w-full h-full object-cover max-h-[500px]" 
                : "w-full h-48 object-cover group-data-[size=large]:h-96 transition-all duration-300"} 
              src={article.imageUrl} 
              alt={article.title}
              style={hero ? { aspectRatio: "16/7", minHeight: 0 } : {}}
            />
          </div>
          <div className="py-4 flex-grow">
            <h3 className="text-lg font-bold text-grey-800 mb-2">{article.title}</h3>
            <p className="text-grey-800 text-sm">{truncateText(article.description, descriptionMaxLength)}</p>
          </div>
        </a>
      </div>
    </>
  )
}

export default NewsCard;