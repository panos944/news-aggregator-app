import { Link } from "react-router-dom";
import type { Article } from "../types/news";
import NewsCard from "./NewsCard";

interface NewsSectionProps {
  logoUrl: string;
  logoAlt: string;
  articles: Article[];
  sourceId: string;
}

const NewsSection = ({ logoUrl, articles, logoAlt, sourceId }: NewsSectionProps) => {
  
  if (!articles || articles.length === 0) {
    return null;
  }

  return(
    <>
      <section className="mb-20">
        {/* Section Header - New Yorker inspired */}
        <div className="mb-12 pb-6 border-b border-gray-200">
          <Link 
            to={`/source/${sourceId}`}
            className="group inline-flex items-center"
          >
            <img 
              src={logoUrl} 
              alt={`${logoAlt} Logo`} 
              className="h-8 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
          </Link>
        </div>
        
        {/* Articles Grid - 4 articles per line */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default NewsSection;