import type { Article } from "../types/news";
import NewsCard from "./NewsCard";

interface NewsSectionProps {
  logoUrl: string;
  logoAlt: string;
  articles: Article[]
}

const NewsSection = ({ logoUrl, logoAlt, articles }: NewsSectionProps) => {
  
  if (!articles || articles.length === 0) {
    return null;
  }

  return(
    <>
      <section className="mb-12">
        <div className="mb-6 border-b-2 border-gray-300 pb-4">
          <img 
          src={logoUrl} 
          alt={`${logoUrl} Logo`} 
          className="h-10"/>
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