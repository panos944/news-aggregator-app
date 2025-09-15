import NewsSection from "../components/NewsSection";
import LatestNewsFeed from "../components/LatestNewsFeed";
import TopBar from "../components/TopBar";
import Header from "../components/Header";
import { useEffect, useState } from "react";
import type { Article } from "../types/news";
import { logos } from "../data/logo-data";
import Footer from "../components/Footer";
import Slider from "react-slick";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

// Custom Carousel Arrows
const CustomPrevArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
    aria-label="Previous"
  >
    <ChevronLeft className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
  </button>
);

const CustomNextArrow = ({ onClick }: any) => (
  <button
    onClick={onClick}
    className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-3 transition-all duration-300 group"
    aria-label="Next"
  >
    <ChevronRight className="w-6 h-6 text-white group-hover:text-yellow-400 transition-colors" />
  </button>
);

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
      <div className="text-xl"></div>
    </div>
  );
  if (error) return (
    <div className="container mx-auto p-4 text-center text-red-500">
      <div className="text-xl">Error: {error}</div>
      <div className="mt-2">Make sure the backend is running on http://localhost:8000</div>
    </div>
  );
  if (articles.length === 0) return <div className="container mx-auto p-4 text-center">No articles found.</div>;

  // HERO ARTICLES - Taking 11 total (1 main + 3 sub-stories + 6 for most popular section + 1 buffer)
  const heroArticles = articles.slice(0, 11);
  const [mainHeroArticle] = heroArticles; // Main hero article
  const [, subStory1, subStory2, subStory3] = heroArticles; // 3 sub-stories (skip index 0)
  const mostPopularArticles = articles.slice(5, 11); // Articles 5-10 for most popular
  
  // Create set of all used article URLs to filter out duplicates
  const usedTopArticleUrls = new Set([
    ...heroArticles.slice(0, 4).map(article => article.url), // Hero + 3 sub-stories
    ...mostPopularArticles.map(article => article.url) // Most popular articles
  ]);
  
  // Filter articles and backfill with other articles from the same sources
  const filteredArticlesBySource = Object.fromEntries(
    Object.entries(articlesBySource).map(([sourceName, sourceArticles]) => {
      // Filter out all used top articles (hero + sub-stories + most popular)
      const filtered = sourceArticles.filter(article => !usedTopArticleUrls.has(article.url));
      
      // If we need more articles, backfill from the main articles array
      const needed = sourceArticles.length - filtered.length;
      if (needed > 0) {
        const backfillArticles = articles
          .filter(article => 
            article.source === sourceName && 
            !usedTopArticleUrls.has(article.url) &&
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
  const allUsedArticleUrls = new Set([
    ...usedTopArticleUrls, // Hero + sub-stories + most popular
    ...articlesUsedInSections.map(article => article.url) // News section articles
  ]);

  const latestFeedArticles = articles
    .filter(article => !allUsedArticleUrls.has(article.url))
    .slice(0, 50);

  return (
    <>
      <TopBar />
      <Header mostPopularArticles={mostPopularArticles} />
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Main Hero Article - Title overlay on image */}
        <div className="mb-16">
          <article className="group">
            <a 
              href={mainHeroArticle.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block"
            >
              {/* Featured image with text overlay */}
              <div className="relative overflow-hidden rounded-lg ny-sans">
                <img 
                  src={mainHeroArticle.imageUrl}
                  alt={mainHeroArticle.title}
                  className="w-full h-180 object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                />
                
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                
                {/* Text Overlay on Image - Center Bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-center p-8 md:p-12">
                  <div className="max-w-5xl text-center">
                    <div className="flex items-center justify-center gap-3 mb-6">
                      <span className="ny-sans-medium text-xs text-white/90 uppercase tracking-widest bg-red-600 px-3 py-1 rounded">
                        {mainHeroArticle.source}
                      </span>
                      <span className="text-white/70">•</span>
                      <time className="ny-sans text-sm text-white/80">{formatDate(mainHeroArticle.publishedAt)}</time>
                    </div>
                    
                    <h1 className="ny-serif-bold text-3xl md:text-4xl lg:text-4xl leading-tight mb-4 text-white group-hover:text-white/90 transition-colors">
                      {mainHeroArticle.title}
                    </h1>
                    
                    <p className="ny-lora text-lg md:text-xl leading-relaxed text-white/90 max-w-4xl mx-auto">
                      {mainHeroArticle.description?.slice(0, 150)}...
                    </p>
                  </div>
                </div>
              </div>
            </a>
          </article>
        </div>

        {/* 3 Sub-Stories Below Hero */}
        <div className="mb-20 ny-sans">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[subStory1, subStory2, subStory3].map((article) => (
              <article key={article.id || article.url} className="group">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="mb-4 overflow-hidden rounded-lg">
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-56 md:h-64 object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>
                  
                  <div className="flex items-center gap-3 mb-3">
                    <span className="ny-sans-medium text-xs ny-text-red uppercase tracking-widest">
                      {article.source}
                    </span>
                    <span className="ny-text-muted">•</span>
                    <time className="ny-sans text-xs ny-text-muted">{formatDate(article.publishedAt)}</time>
                  </div>
                  
                  <h3 className="ny-serif-bold text-lg md:text-xl leading-tight mb-3 ny-text-primary group-hover:ny-text-secondary transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  
                  <p className="ny-lora text-sm leading-relaxed ny-text-secondary line-clamp-2">
                    {article.description?.slice(0, 100)}...
                  </p>
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
      </div>

      {/* Featured Article Section - Blue Background with Carousel */}
      {latestFeedArticles.length > 0 && (
        <section className="bg-blue-900 text-white py-20">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="ny-serif-bold text-4xl md:text-5xl text-white mb-4">Editor's Pick</h2>
              <div className="w-24 h-px bg-yellow-500 mx-auto"></div>
            </div>
            
            {/* Main Featured Article */}
            <article className="group max-w-4xl mx-auto mb-16">
              <a 
                href={latestFeedArticles[0].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Featured Image */}
                  <div className="order-2 lg:order-1 overflow-hidden rounded-lg">
                    <img 
                      src={latestFeedArticles[0].imageUrl}
                      alt={latestFeedArticles[0].title}
                      className="w-full h-64 lg:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="order-1 lg:order-2 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className="ny-sans-medium text-xs text-yellow-500 uppercase tracking-widest">
                        {latestFeedArticles[0].source}
                      </span>
                      <span className="text-white/60">•</span>
                      <time className="ny-sans text-xs text-white/80">
                        {formatDate(latestFeedArticles[0].publishedAt)}
                      </time>
                    </div>
                    
                    <h3 className="ny-serif-bold text-3xl md:text-4xl leading-tight text-white group-hover:text-white/90 transition-colors">
                      {latestFeedArticles[0].title}
                    </h3>
                    
                    <p className="ny-lora text-lg leading-relaxed text-white/90">
                      {latestFeedArticles[0].description?.slice(0, 180)}...
                    </p>
                  </div>
                </div>
              </a>
            </article>

            {/* Carousel for Additional Articles */}
            {latestFeedArticles.length > 1 && (
              <div className="relative">
                <h3 className="ny-serif-bold text-2xl text-white mb-8 text-center">More Editor's Picks</h3>
                <Slider
                  {...{
                    dots: false,
                    infinite: true,
                    speed: 500,
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    arrows: true,
                    prevArrow: <CustomPrevArrow />,
                    nextArrow: <CustomNextArrow />,
                    responsive: [
                      {
                        breakpoint: 1024,
                        settings: {
                          slidesToShow: 2,
                          slidesToScroll: 1,
                        }
                      },
                      {
                        breakpoint: 640,
                        settings: {
                          slidesToShow: 1,
                          slidesToScroll: 1,
                        }
                      }
                    ]
                  }}
                  className="editor-picks-carousel"
                >
                  {latestFeedArticles.slice(1, 7).map((article) => (
                    <div key={article.id || article.url} className="px-4">
                      <article className="group">
                        <a 
                          href={article.url} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 h-full transition-all duration-300 hover:bg-white/20">
                            {/* Image */}
                            <div className="mb-4 overflow-hidden rounded-lg">
                              <img 
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-48 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <span className="ny-sans-medium text-xs text-yellow-400 uppercase tracking-widest">
                                  {article.source}
                                </span>
                                <span className="text-white/50">•</span>
                                <time className="ny-sans text-xs text-white/70">
                                  {formatDate(article.publishedAt)}
                                </time>
                              </div>
                              
                              <h4 className="ny-serif-bold text-lg leading-tight text-white group-hover:text-yellow-400 transition-colors line-clamp-3">
                                {article.title}
                              </h4>
                              
                              <p className="ny-lora text-sm leading-relaxed text-white/80 line-clamp-2">
                                {article.description?.slice(0, 100)}...
                              </p>
                            </div>
                          </div>
                        </a>
                      </article>
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </section>
      )}

      <div className="max-w-6xl mx-auto px-6">
        {/* Latest News Section - Blog Style */}
        <div className="py-20">
          <LatestNewsFeed articles={latestFeedArticles.slice(1)} />
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default HomePage;