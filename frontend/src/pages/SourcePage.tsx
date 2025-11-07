import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import type { Article } from "../types/news";
import NewsCard from "../components/NewsCard";
import LatestNewsFeed from "../components/LatestNewsFeed";
import SecondaryStory from "../components/SecondaryStory";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import { logos } from "../data/logo-data";

const SourcePage = () => {
  // Fix: Change sourceId to sourceName to match the route parameter
  const { sourceName: sourceId } = useParams<{ sourceName: string }>();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Create a mapping from URL-friendly IDs to source names
  const getSourceByUrlId = (urlId: string) => {
    const urlIdLower = urlId?.toLowerCase();
    
    // Manual mapping for known sources
    const urlToSource: Record<string, string> = {
      'real': 'Real.gr',
      'realgr': 'Real.gr',
      'instyle': 'Instyle', 
      'realkiosk': 'Real Kiosk',
      'thecars': 'The Cars',
      'realplayer': 'Real Player'
    };
    
    return urlToSource[urlIdLower] || null;
  };

  const sourceName = sourceId ? getSourceByUrlId(sourceId) : null;
  const currentSource = logos.find(logo => logo.name === sourceName);

  useEffect(() => {
    if (!sourceName || !currentSource) return;

    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`http://localhost:8000/api/articles/${encodeURIComponent(sourceName)}`);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch articles: ${response.status}`);
        }
        
        const data: Article[] = await response.json();
        setArticles(data);
      } catch (e: any) {
        console.error('Fetch error:', e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [sourceName, currentSource]);

  if (!sourceId) {
    return (
      <div className="container mx-auto px-4 my-8">
        <h1 className="ny-serif-bold text-3xl ny-text-primary">404</h1>
        <p className="ny-sans ny-text-secondary">No source specified</p>
      </div>
    );
  }

  if (!sourceName || !currentSource) {
    return (
      <div className="container mx-auto px-4 my-8">
        <h1 className="ny-serif-bold text-3xl ny-text-primary">404</h1>
        <p className="ny-sans ny-text-secondary">Sorry, this page does not exist</p>
        <p className="ny-sans ny-text-muted">Available sources: real, instyle, realkiosk, thecars, realplayer</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-32">
          <p className="ny-sans ny-text-secondary">Loading articles for {sourceName}...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center text-red-500">
          <p className="ny-sans">Error: {error}</p>
        </div>
      </div>
    );
  }

  const prominentArticle = articles.length > 0 ? articles[0] : null;
  const secondaryArticles = articles.length > 1 ? articles.slice(1, 7) : [];
  const latestArticles = articles.slice(7);

  return (
    <>
      <TopBar />
      <Header />
      <div className="container mx-auto px-4 py-8">
        <img 
          src={currentSource.imageUrl} 
          alt={`${currentSource.name} Logo`} 
          className="h-16 mb-4 mx-auto"
        />

        {prominentArticle ? (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div className="lg:col-span-2 group" data-size="large">
                <NewsCard article={prominentArticle}/>
              </div>

              <div className="lg:col-span-1">
                <h3 className="ny-serif-bold text-2xl ny-text-primary mb-4 border-b pb-2">
                  Περισσότερα
                </h3>
                <div className="flex flex-col">
                  {secondaryArticles.map((article) => (
                    <SecondaryStory key={article.id || article.url} title={article.title} url={article.url}/>
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
            <p className="ny-lora text-xl ny-text-muted">No articles found for {currentSource.name}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default SourcePage;