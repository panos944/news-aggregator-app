import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Article } from "../types/news";
import { sourceDetails, type SourceId } from "../data/sourceDetails";
import ArticleCard from "../components/ArticleCard";
import { mockArticles } from "../data/mock-data";
import NewsCard from "../components/NewsCard";
import LatestNewsFeed from "../components/LatestNewsFeed";
import SecondaryStory from "../components/SecondaryStory";


const SourcePage = () => {
  
  const {sourceId} = useParams<{ sourceId: SourceId }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  if (!sourceId || !sourceDetails[sourceId]) {
    return (
      <>
        <div className="containter mx-auto px-4 my-8">
          <h1 className="text-2xl font-bold">404</h1>
          <p>Sorry, this page does not exists</p>
        </div>
      </>
    )
  }

  const currentSource = sourceDetails[sourceId];

  useEffect(() => {
    setLoading(true);
    const sourceArticles = mockArticles.filter(
    (article) => article.source === currentSource.name
    );
    setArticles(sourceArticles);
    setLoading(false);
  }, [sourceId, currentSource.name]);

  const prominentArticle = articles.length > 0 ? articles[0] : null;
  const secondaryArticles = articles.length > 1 ? articles.slice(1, 7) : []
  const latestArticles = articles.slice(7)

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <img 
        src={currentSource.logoUrl} 
        alt={`${currentSource.name} Logo`} 
        className="h-16 mb-4 mx-auto"/>
          <p className="text-gray-600">{currentSource.description}</p>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <p>Loading articles...</p>
          </div>
        ) : prominentArticle? (
          <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            <div className="lg:col-span-2 group" data-size="large">
              <NewsCard article={prominentArticle}/>
            </div>

            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold text-gray-800 mb-4 border-b pb-2">
                Περισσότερα
              </h3>
              <div className="flex flex-col">
                {secondaryArticles.map((article) => (
                  <SecondaryStory key={article.id} title={article.title}/>
                ))}
              </div>
            </div>
          </div>
            {latestArticles.length > 0 && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                <div className="lg:col-span-2">
                  <LatestNewsFeed articles={latestArticles}/>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500">No articles found</p>
          </div>
        )}
      </div>
    </>
  )
}

export default SourcePage;