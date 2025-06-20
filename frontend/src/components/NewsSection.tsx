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
      <section className="mb-6">
        <div className="mb-6 border-b border-gray-400 pb-4">
          <Link to={`/source/${sourceId}`}>
          <img 
          src={logoUrl} 
          alt={`${logoAlt} Logo`} 
          className="h-10"/>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
          {articles.map((article) => (
            <NewsCard key={article.id} article={article}/>
          ))}
        </div>
      </section>
    </>
  )
}

export default NewsSection;