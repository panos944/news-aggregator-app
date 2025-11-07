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
      <div className="ny-sans text-xl ny-text-secondary"></div>
    </div>
  );
  if (error) return (
    <div className="container mx-auto p-4 text-center text-red-500">
      <div className="ny-sans text-xl">Error: {error}</div>
      <div className="ny-sans mt-2">Make sure the backend is running on http://localhost:8000</div>
    </div>
  );
  if (articles.length === 0) return <div className="container mx-auto p-4 text-center ny-sans ny-text-secondary">No articles found.</div>;

  // HERO ARTICLES - Taking more for sidebar
  const heroArticles = articles.slice(0, 11);
  const [mainHeroArticle] = heroArticles; // Main hero article
  const [, subStory1, subStory2, subStory3] = heroArticles; // 3 sub-stories (skip index 0)
  const mostPopularArticles = articles.slice(5, 11); // Articles 5-10 for most popular
  
  // Sidebar "Τελευταία Νέα" articles - 5 articles starting after hero article
  const sidebarLatestArticles = articles.slice(11, 16);
  
  // Create set of all used article URLs to filter out duplicates
  const usedTopArticleUrls = new Set([
    ...heroArticles.slice(0, 4).map(article => article.url), // Hero + 3 sub-stories
    ...mostPopularArticles.map(article => article.url), // Most popular articles
    ...sidebarLatestArticles.map(article => article.url) // Sidebar latest articles
  ]);
  
  // Filter articles and backfill with other articles from the same sources
  // Exclude "The Cars" and "Real.gr" sections
  const filteredArticlesBySource = Object.fromEntries(
    Object.entries(articlesBySource)
      .filter(([sourceName]) => sourceName !== 'The Cars' && sourceName !== 'Real.gr')
      .map(([sourceName, sourceArticles]) => {
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
  
  // Collect all articles used in news sections (including Instyle, Real Kiosk, etc.)
  const articlesUsedInSections = Object.values(filteredArticlesBySource).flat();
  const sectionArticleUrls = new Set(articlesUsedInSections.map(article => article.url));
  
  // Get Top Stories - articles from various sources that haven't been used yet
  // Exclude articles from hero, sidebar, and all news sections (including Instyle)
  const topStoriesArticles = articles
    .filter(article => !usedTopArticleUrls.has(article.url) && !sectionArticleUrls.has(article.url))
    .slice(0, 6);

  // Calculate all used article URLs for the latest feed
  const allUsedArticleUrls = new Set([
    ...usedTopArticleUrls, // Hero + sub-stories + most popular
    ...topStoriesArticles.map(article => article.url), // Top Stories articles
    ...articlesUsedInSections.map(article => article.url) // News section articles
  ]);

  const latestFeedArticles = articles
    .filter(article => !allUsedArticleUrls.has(article.url))
    .slice(0, 50);

  return (
    <>
      <TopBar />
      <Header mostPopularArticles={mostPopularArticles} />
      <div className="max-w-[1400px] mx-auto px-8 py-6">

        {/* Main Hero Section with Sidebar */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-6 lg:h-[680px]">
            {/* Main Hero Article - Left Side (grows to fill space) */}
            <div className="flex-1 lg:max-w-[70%]">
              <article className="group h-full">
                <a 
                  href={mainHeroArticle.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {/* Featured image with text overlay */}
                  <div className="relative overflow-hidden rounded-lg ny-sans h-full min-h-[350px]">
                    <img 
                      src={mainHeroArticle.imageUrl}
                      alt={mainHeroArticle.title}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                    
                    {/* Dark gradient overlay for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                    
                    {/* Text Overlay on Image - Center Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center p-4 md:p-10">
                      <div className="max-w-4xl text-center">
                        <div className="flex items-center justify-center gap-2 mb-2 md:mb-4">
                          <span className="ny-sans-medium text-xs text-white/90 uppercase tracking-widest bg-red-600 px-2 py-1 rounded">
                            {mainHeroArticle.source}
                          </span>
                          <span className="text-white/70 hidden md:inline">•</span>
                          <time className="ny-sans text-xs md:text-sm text-white/80 hidden md:inline">{formatDate(mainHeroArticle.publishedAt)}</time>
                        </div>
                        
                        <h1 className="ny-serif-bold text-xl md:text-4xl lg:text-4xl leading-tight mb-2 md:mb-4 text-white group-hover:text-white/90 transition-colors">
                          {mainHeroArticle.title}
                        </h1>
                        
                        <p className="ny-lora text-base md:text-xl leading-relaxed text-white/90 hidden md:block">
                          {mainHeroArticle.description?.slice(0, 150)}...
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </article>
            </div>

            {/* Τελευταία Νέα Sidebar - Right Side (30% width) */}
            <div className="w-full lg:w-[30%] flex-shrink-0">
              <div className="bg-white border border-gray-200 rounded-lg p-6 h-full flex flex-col">
                <h2 className="ny-serif-bold text-2xl ny-text-primary mb-4 pb-2 border-b border-gray-200">
                  Τελευταία Νέα
                </h2>
                
                <div className="space-y-4 flex-1 overflow-y-auto">
                  {sidebarLatestArticles.map((article, index) => (
                    <article key={article.id || article.url} className="group">
                      <a 
                        href={article.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        {/* Article Number and Title */}
                        <div className="flex gap-3">
                          <span className="ny-serif-bold text-2xl ny-text-red flex-shrink-0">
                            {index + 1}.
                          </span>
                          <div className="flex-1">
                            <h3 className="ny-serif-bold text-base leading-tight ny-text-primary group-hover:ny-text-red transition-colors line-clamp-3 mb-2">
                              {article.title}
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="ny-sans text-xs ny-text-muted">
                                {article.source}
                              </span>
                              <span className="ny-text-muted">•</span>
                              <time className="ny-sans text-xs ny-text-muted">
                                {formatDate(article.publishedAt)}
                              </time>
                            </div>
                          </div>
                        </div>
                      </a>
                      
                      {/* Separator line between articles */}
                      {index < sidebarLatestArticles.length - 1 && (
                        <div className="border-b border-gray-200 mt-4"></div>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Sub-Stories Below Hero */}
        <div className="mb-16 ny-sans">
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
                  
                  <h3 className="ny-serif-bold text-xl md:text-2xl leading-tight mb-3 ny-text-primary group-hover:ny-text-secondary transition-colors line-clamp-3">
                    {article.title}
                  </h3>
                  
                  <p className="ny-lora text-base leading-relaxed ny-text-secondary line-clamp-2">
                    {article.description?.slice(0, 100)}...
                  </p>
                </a>
              </article>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div className="my-12">
          <div className="h-1 bg-blue-900 rounded-full"></div>
        </div>

        {/* Top Stories Section */}
        <section className="mb-16">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="ny-serif-bold text-4xl md:text-5xl ny-text-primary mb-3">
              Top Stories
            </h2>
            <div className="w-24 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          {/* Top Stories Grid - 3 columns, 2 rows */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topStoriesArticles.map((article) => (
              <article key={article.id || article.url} className="group">
                <a 
                  href={article.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  {/* Featured Image */}
                  <div className="mb-3 overflow-hidden rounded-lg">
                    <img 
                      src={article.imageUrl}
                      alt={article.title}
                      className="w-full h-64 md:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-[1.01]"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="space-y-2">
                    {/* Meta Information */}
                    <div className="flex items-center gap-3">
                      <span className="ny-sans-medium text-xs ny-text-red uppercase tracking-widest">
                        {article.source}
                      </span>
                      <span className="ny-text-muted">•</span>
                      <time className="ny-sans text-xs ny-text-muted">
                        {formatDate(article.publishedAt)}
                      </time>
                    </div>

                    {/* Title */}
                    <h3 className="ny-serif-bold text-xl md:text-2xl leading-tight ny-text-primary group-hover:ny-text-secondary transition-colors line-clamp-3">
                      {article.title}
                    </h3>

                    {/* Description */}
                    <p className="ny-lora text-base leading-relaxed ny-text-secondary line-clamp-2">
                      {article.description?.slice(0, 100)}...
                    </p>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </section>

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
        <section className="bg-blue-900 text-white py-12">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="text-center mb-10">
              <h2 className="ny-serif-bold text-5xl md:text-6xl text-white mb-3">Editor's Pick</h2>
              <div className="w-24 h-px bg-yellow-500 mx-auto"></div>
            </div>
            
            {/* Main Featured Article */}
            <article className="group max-w-4xl mx-auto mb-10">
              <a 
                href={latestFeedArticles[0].url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Featured Image */}
                  <div className="order-2 lg:order-1 overflow-hidden rounded-lg">
                    <img 
                      src={latestFeedArticles[0].imageUrl}
                      alt={latestFeedArticles[0].title}
                      className="w-full h-64 lg:h-80 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="order-1 lg:order-2 space-y-4">
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
                    
                    <p className="ny-lora text-xl leading-relaxed text-white/90">
                      {latestFeedArticles[0].description?.slice(0, 180)}...
                    </p>
                  </div>
                </div>
              </a>
            </article>

            {/* Carousel for Additional Articles */}
            {latestFeedArticles.length > 1 && (
              <div className="relative">
                <h3 className="ny-serif-bold text-3xl text-white mb-6 text-center">More Editor's Picks</h3>
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
                          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 h-full transition-all duration-300 hover:bg-white/20">
                            {/* Image */}
                            <div className="mb-3 overflow-hidden rounded-lg">
                              <img 
                                src={article.imageUrl}
                                alt={article.title}
                                className="w-full h-64 object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                              />
                            </div>
                            
                            {/* Content */}
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="ny-sans-medium text-xs text-yellow-400 uppercase tracking-widest">
                                  {article.source}
                                </span>
                                <span className="text-white/50">•</span>
                                <time className="ny-sans text-xs text-white/70">
                                  {formatDate(article.publishedAt)}
                                </time>
                              </div>
                              
                              <h4 className="ny-serif-bold text-xl leading-tight text-white group-hover:text-yellow-400 transition-colors line-clamp-3">
                                {article.title}
                              </h4>
                              
                              <p className="ny-lora text-base leading-relaxed text-white/80 line-clamp-2">
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

      <div className="max-w-[1400px] mx-auto px-8">
        {/* Latest News Section - Blog Style */}
        <div className="py-16">
          <LatestNewsFeed articles={latestFeedArticles.slice(1)} />
        </div>
      </div>
      <Footer/>
    </>
  )
}

export default HomePage;