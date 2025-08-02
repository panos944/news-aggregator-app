import NewsCard from "../components/NewsCard";
import SecondaryStory from "../components/SecondaryStory";
import NewsSection from "../components/NewsSection";
import LatestNewsFeed from "../components/LatestNewsFeed";
import TopBar from "../components/TopBar";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import type { Article } from "../types/news";
import { logos } from "../data/logo-data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const logoMap = logos.reduce((acc, logo) => {
  acc[logo.name] = logo.imageUrl;
  return acc;
}, {} as Record<string, string>)

const getUrlFriendlySourceId = (sourceName: string): string => {
  const sourceNameMap: Record<string, string> = {
    'Real.gr': 'real',
    'Instyle': 'instyle',
    'Ολο Υγεία': 'oloygeia',
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
        // ...existing code...
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

  if (loading) return <div className="container mx-auto p-4 text-center"></div>;
  if (error) return <div className="container mx-auto p-4 text-center text-red-500">Error: {error}</div>;
  if (articles.length === 0) return <div className="container mx-auto p-4 text-center">No articles found.</div>;

  // HERO CAROUSEL ARTICLES
  const heroArticles = articles.slice(0, 4); // Top 4 articles for carousel
  const secondaryStories = articles.slice(4, 10); // Next 6 for secondary section

  // Calculate articles used in news sections and exclude them from feed
  const articlesUsedInSections = Object.values(articlesBySource).flat();
  const usedArticleUrls = new Set([
    ...heroArticles.map(article => article.url),
    ...secondaryStories.map(article => article.url),
    ...articlesUsedInSections.map(article => article.url)
  ]);

  const latestFeedArticles = articles
    .filter(article => !usedArticleUrls.has(article.url))
    .slice(0, 50);

  // Carousel settings (customize as needed)
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    adaptiveHeight: false,
    customPaging: (i: number) => (
      <div className="thumbnail-wrapper">
        <img 
          src={heroArticles[i]?.imageUrl} 
          alt={heroArticles[i]?.title}
          className="thumbnail-image"
        />
        <div className="thumbnail-overlay">
          <p className="thumbnail-title">{heroArticles[i]?.title}</p>
        </div>
      </div>
    ),
    dotsClass: "slick-dots slick-thumb custom-thumbnails",
    appendDots: (dots: React.ReactNode) => (
      <div className="thumbnail-container">
        <div className="thumbnail-list"> {dots} </div>
      </div>
    ),
  };

  return (
    <>
      <TopBar />
      <Navbar />
      <div className="container mx-auto p-4">
        {/* Hero Carousel and Secondary Stories Side by Side */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          {/* Hero Carousel Section */}
          <div className="lg:col-span-3">
            <div className="carousel-wrapper">
              <Slider {...carouselSettings}>
                {heroArticles.map(article => (
                  <div key={article.id || article.url} className="carousel-slide">
                    <a href={article.url} target="_blank" rel="noopener noreferrer" className="relative block">
                      <div className="relative overflow-hidden rounded-lg">
                        <img 
                          className="w-full h-[500px] object-cover"
                          src={article.imageUrl} 
                          alt={article.title}
                        />
                        {/* Text Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent">
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="text-2xl font-bold mb-3 line-clamp-2">{article.title}</h3>
                            <p className="text-gray-200 text-sm line-clamp-3">{article.description}</p>
                          </div>
                        </div>
                      </div>
                    </a>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Secondary Stories */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-gray-800 mb-3 border-b pb-2">            
              Σχετική Ειδησεογραφία
            </h3>
            <div className="flex flex-col">
              {secondaryStories.map(story => (
                <SecondaryStory key={story.id || story.url} title={story.title}/>
              ))}
            </div>
          </div>
        </div>

        {/* News Sections by source */}
        {Object.keys(articlesBySource).map((sourceName) => (
           <NewsSection
            key={sourceName}
            sourceId={getUrlFriendlySourceId(sourceName)}
            logoUrl={logoMap[sourceName]}
            logoAlt={sourceName}
            articles={articlesBySource[sourceName]}
          />
        ))}

        {/* Latest News and Ads Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <LatestNewsFeed articles={latestFeedArticles} />
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage;