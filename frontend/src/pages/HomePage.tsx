import NewsCard from "../components/NewsCard";
import SecondaryStory from "../components/SecondaryStory";
import NewsSection from "../components/NewsSection";
import LatestNewsFeed from "../components/LatestNewsFeed";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import type { Article } from "../types/news";
import { logos } from "../data/logo-data";
import Footer from "../components/Footer";

const logoMap = logos.reduce((acc, logo) => {
  acc[logo.name] = logo.imageUrl;
  return acc;
}, {} as Record<string, string>)

const getUrlFriendlySourceId = (sourceName: string): string => {
  const sourceNameMap: Record<string, string> = {
    'Real.gr': 'real',
    'Instyle': 'instyle',
    'Real Kiosk': 'realkiosk',
    'The Cars': 'thecars',
    'Real Player': 'realplayer'
  };
  
  return sourceNameMap[sourceName] || sourceName.toLowerCase().replace(/\s/g, '');
};

const HomePage = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [articlesBySource, setArticlesBySource] = useState<{ [key: string]: Article[] }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const latestResponse = await fetch("http://localhost:8000/api/articles/latest");
        if (!latestResponse.ok) {
          throw new Error("Failed to fetch latest articles");
        }
        const latestData: Article[] = await latestResponse.json();
        setArticles(latestData);

        const sourceResponse = await fetch("http://localhost:8000/api/articles/by-sources");
        if (!sourceResponse.ok) {
          throw new Error("Failed to fetch articles by sources");
        }
        const sourceData: { [key: string]: Article[] } = await sourceResponse.json();
        setArticlesBySource(sourceData);

      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  if (loading) return (
    <div className="container mx-auto p-4 text-center">
      <div className="text-xl">Loading articles...</div>
    </div>
  );
  if (error) return (
    <div className="container mx-auto p-4 text-center text-red-500">
      <div className="text-xl">Error: {error}</div>
      <div className="mt-2">Make sure the backend is running on http://localhost:8000</div>
    </div>
  );
  if (articles.length === 0) return <div className="container mx-auto p-4 text-center">No articles found.</div>;

  // HERO ARTICLES - Taking 5 total (1 main + 4 sub)
  const heroArticles = articles.slice(0, 5);
  const [mainHeroArticle, ...subHeroArticles] = heroArticles; // First one is main, next 4 are sub
  
  // Create set of hero article URLs to filter out duplicates
  const heroArticleUrls = new Set(heroArticles.map(article => article.url));
  
  // Filter hero articles and backfill with other articles from the same sources
  const filteredArticlesBySource = Object.fromEntries(
    Object.entries(articlesBySource).map(([sourceName, sourceArticles]) => {
      // Filter out hero articles
      const filtered = sourceArticles.filter(article => !heroArticleUrls.has(article.url));
      
      // If we need more articles, backfill from the main articles array
      const needed = sourceArticles.length - filtered.length;
      if (needed > 0) {
        const backfillArticles = articles
          .filter(article => 
            article.source === sourceName && 
            !heroArticleUrls.has(article.url) &&
            !sourceArticles.some(sa => sa.url === article.url)
          )
          .slice(0, needed);
        
        return [sourceName, [...filtered, ...backfillArticles]];
      }
      
      return [sourceName, filtered];
    })
  );

  // Calculate articles used in news sections and exclude them from feed
  const articlesUsedInSections = Object.values(filteredArticlesBySource).flat();
  const usedArticleUrls = new Set([
    ...heroArticles.map(article => article.url),
    ...articlesUsedInSections.map(article => article.url)
  ]);

  const latestFeedArticles = articles
    .filter(article => !usedArticleUrls.has(article.url))
    .slice(0, 50);

  return (
    <>
      <TopBar />
      <Header />
      <div className="container mx-auto p-4">
        {/* Centered Hero Section */}
        <div className="mb-12">
          {/* Main Hero Article - Centered */}
          <article className="mb-12">
            <a 
              href={mainHeroArticle.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative overflow-hidden">
                <img 
                  src={mainHeroArticle.imageUrl}
                  alt={mainHeroArticle.title}
                  className="w-full aspect-[3/4] lg:aspect-[16/10] object-cover transition-all duration-500 group-hover:scale-105"
                />
                
                {/* Headline Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <div className="mb-3">
                      <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium tracking-wide">
                        {mainHeroArticle.source}
                      </span>
                    </div>
                    <h1 className="font-serif text-4xl lg:text-5xl font-bold text-white leading-tight mb-4">
                      {mainHeroArticle.title}
                    </h1>
                    <p className="font-serif text-lg text-white/90 leading-relaxed line-clamp-3 max-w-2xl">
                      {mainHeroArticle.description}
                    </p>
                    <time className="block mt-4 text-white/70 font-serif text-sm tracking-wide">
                      {formatDate(mainHeroArticle.publishedAt)}
                    </time>
                  </div>
                </div>
              </div>
            </a>
          </article>

          {/* Sub Hero Articles - 4 column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {subHeroArticles.map((article) => (
              <article key={article.id || article.url}>
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="mb-4">
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full aspect-[4/3] object-cover transition-all duration-300 group-hover:opacity-80"
                    />
                  </div>
                  <div className="mb-2">
                    <span className="text-xs font-medium text-neutral-500 tracking-wide uppercase">
                      {article.source}
                    </span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-black leading-tight mb-3 group-hover:opacity-70 transition-all duration-300 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-base leading-relaxed text-neutral-600 mb-3 line-clamp-2">
                    {article.description}
                  </p>
                  <time className="text-sm text-neutral-500 font-serif">
                    {formatDate(article.publishedAt)}
                  </time>
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* News Sections by source */}
        {Object.keys(filteredArticlesBySource).map((sourceName) => (
           <NewsSection
            key={sourceName}
            sourceId={getUrlFriendlySourceId(sourceName)}
            logoUrl={logoMap[sourceName]}
            logoAlt={sourceName}
            articles={filteredArticlesBySource[sourceName]}
          />
        ))}

        {/* Latest News Section - Full Width */}
        <div className="mt-8">
          <LatestNewsFeed articles={latestFeedArticles} />
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default HomePage;